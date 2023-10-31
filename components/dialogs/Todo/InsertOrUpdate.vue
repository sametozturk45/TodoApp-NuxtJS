<template>
    <v-dialog :value="value" max-width="480" @click:outside="closeModal">
        <v-card width="100%">
            <v-card-title>
                {{ model.id === 0 ? 'Yapılacak İş Ekle':'Yapılacak İşi Güncelle' }}
                <v-spacer />
                <v-btn icon @click="closeModal">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>
            <v-divider />
            <v-card-text class="mt-4">
                <v-form ref="todoForm" v-model="isValid" lazy-validation>
                    <v-text-field v-model="model.text" label="İş Adı *" placeholder="ex: Ekmek alınacak" :rules="rules.text" outlined required />
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-spacer />
                <v-btn color="error" @click="closeModal" text>İptal</v-btn>
                <v-btn :color="model.id === 0 ? 'success':'warning'" @click="model.id === 0 ? insertTodoHandler() : updateTodoHandler()" outlined>{{ model.id === 0 ? 'Ekle':'Güncelle' }}</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        name:'TodoAddDialog',
        data(){
            return{
                rules:{
                    text:[
                        v => !!v || 'İş adı boş bırakılamaz!',
                        v => (v && v.length >= 3) || 'İş adı en az 3 karakter uzunluğunda olmalıdır.'
                    ],
                },
                isValid:false,
            }       
        },
        methods:{
            async insertTodoHandler(){
                try {
                    await this.$refs.todoForm.validate()
                    if (this.isValid) {
                        await this.$store.dispatch('todos/insertItem',this.model)
                        this.$nuxt.$emit('show-alert', { text: 'Yapılacak iş başarıyla eklendi !', color: 'success' })
                        this.closeModal()
                    }else
                        this.$nuxt.$emit('show-alert', { text: 'Gerekli alanları doldurunuz !', color: 'warning' })
                } catch (error) {
                    this.$nuxt.$emit('show-alert', { text: 'Yapılacak iş eklenirken bir hata oluştu !', color: 'error' })
                    throw error
                }
            },
            async updateTodoHandler(){
                try {
                    await this.$refs.todoForm.validate()
                    if (this.isValid) {
                        await this.$store.dispatch('todos/updateItem',this.model)
                        this.$nuxt.$emit('show-alert', { text: 'Yapılacak iş başarıyla güncellendi !', color: 'success' })
                        this.closeModal()
                    }else
                        this.$nuxt.$emit('show-alert', { text: 'Gerekli alanları doldurunuz !', color: 'warning' })
                } catch (error) {
                    this.$nuxt.$emit('show-alert', { text: 'Yapılacak iş güncellenirken bir hata oluştu !', color: 'error' })
                    throw error
                }
            },
            closeModal(){
                this.$emit('update:model',{id:0})
                this.$emit('update:value',false)
            },
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
    }
</script>