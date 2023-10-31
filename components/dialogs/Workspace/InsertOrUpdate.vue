<template>
    <v-dialog :value="value" max-width="480" @click:outside="closeModal">
        <v-card width="100%">
            <v-card-title>
                {{ model.id === 0 ? 'Çalışma Ortamı Ekle':'Çalışma Ortamını Güncelle' }}
                <v-spacer />
                <v-btn icon @click="closeModal">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>
            <v-divider />
            <v-card-text class="mt-4">
                <v-form ref="workspaceForm" v-model="isValid" lazy-validation>
                    <v-text-field v-model="model.name" label="Ortam Adı *" placeholder="ex: Alışveriş Listesi" :rules="rules.name" outlined required></v-text-field>
                    <v-autocomplete @input="iconChanged" v-model="model.icon" label="İkon *" :items="getIcons" item-value="name" :rules="rules.icon" outlined required>
                        <template v-slot:item="{item}">
                            <v-list-item-icon>
                                <v-icon :color="item.defaultColor">{{ item.name }}</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title>{{ item.tags.tr.join(', ') }}</v-list-item-title>
                                <v-list-item-subtitle>{{ item.tags.eng.join(', ') }}</v-list-item-subtitle>
                            </v-list-item-content>
                        </template>
                        <template v-slot:selection="{item}">
                            <v-list-item-icon>
                                <v-icon :color="item.defaultColor">{{ item.name }}</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title>{{ item.tags.tr.join(', ') }}</v-list-item-title>
                                <v-list-item-subtitle>{{ item.tags.eng.join(', ') }}</v-list-item-subtitle>
                            </v-list-item-content>
                        </template>
                    </v-autocomplete>
                    <ColorPicker v-model="model.color" />
                    <v-textarea class="mt-6" label="Açıklama *" placeholder="Bir açıklama giriniz..." v-model="model.description" :rules="rules.description" outlined required />
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-spacer />
                <v-btn color="error" @click="closeModal" text>İptal</v-btn>
                <v-btn :color="model.id === 0 ? 'success':'warning'" @click="model.id === 0 ? insertWorkspaceHandler() : updateWorkspaceHandler()" outlined>{{ model.id === 0 ? 'Ekle':'Güncelle' }}</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        name:'WorkspaceAddDialog',
        data(){
            return{
                rules:{
                    name:[
                        v => !!v || 'Ortam adı boş bırakılamaz!',
                        v => (v && v.length >= 3) || 'Ortam adı en az 3 karakter uzunluğunda olmalıdır.'
                    ],
                    color:[
                        v => !!v || 'Renk boş bırakılamaz!',
                    ],
                    icon:[
                        v => !!v || 'İkon boş bırakılamaz!',
                    ],
                    description:[
                        v => !!v || 'Açıklama boş bırakılamaz!',
                        v => (v && v.length >= 10) || 'Açıklama en az 10 karakter uzunluğunda olmalıdır.'
                    ],
                },
                isValid:false,
            }       
        },
        methods:{
            async insertWorkspaceHandler(){
                try {
                    await this.$refs.workspaceForm.validate()
                    if (this.isValid) {
                        await this.$store.dispatch('workspaces/insertItem',this.model)
                        this.$nuxt.$emit('show-alert', { text: 'Çalışma ortamı başarıyla eklendi !', color: 'success' })
                        this.closeModal()
                    }else
                        this.$nuxt.$emit('show-alert', { text: 'Gerekli alanları doldurunuz !', color: 'warning' })
                } catch (error) {
                    this.$nuxt.$emit('show-alert', { text: 'Çalışma ortamı eklenirken bir hata oluştu !', color: 'error' })
                    throw error
                }
            },
            async updateWorkspaceHandler(){
                try {
                    await this.$refs.workspaceForm.validate()
                    if (this.isValid) {
                        await this.$store.dispatch('workspaces/updateItem',this.model)
                        this.$nuxt.$emit('show-alert', { text: 'Çalışma ortamı başarıyla güncellendi !', color: 'success' })
                        this.closeModal()
                    }else
                        this.$nuxt.$emit('show-alert', { text: 'Gerekli alanları doldurunuz !', color: 'warning' })
                } catch (error) {
                    this.$nuxt.$emit('show-alert', { text: 'Çalışma ortamı güncellenirken bir hata oluştu !', color: 'error' })
                    throw error
                }
            },
            closeModal(){
                this.$emit('update:model',{id:0,color:'#fff'})
                this.$emit('update:value',false)
            },
            iconChanged(icon){
                if(icon)
                    this.model.color = this.getIcons.find(x=>x.name == icon).defaultColor
            }
        },
        computed:{
            getIcons(){
                return this.$store.state.icons.items
            }
        },
        props:{
            value:{
                type:Boolean,
                required:true
            },
            model:{
                type:Object,
                required:true
            }
        },
        components:{
            ColorPicker:()=>import('@/components/addOns/ColorPicker')
        }
    }
</script>