<template>
    <v-dialog :value="value" max-width="1200" @click:outside="closeModal">
        <v-card width="100%">
            <v-card-title>
                Çöp Kutusu
                <v-spacer />
                <v-btn icon @click="closeModal">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>
            <v-divider />
            <div class="d-flex my-2 me-4">
                <v-spacer />
                <v-text-field v-model="search" placeholder="Aramak için bir şeyler yazınız..." append-icon="mdi-magnify" single-line hide-details outlined dense />
            </div>
            <v-card-text class="mt-4">
                <v-data-table
                    :items="items"
                    :headers="headers"
                    :search="search"
                >
                <template v-slot:item.description="{item}" >
                    <span :title="item?.description">
                        {{ item?.description?.length > 180 ? item.description.slice(0,180)+'...' : item?.description }}
                    </span>
                </template>
                <template v-slot:item.deleteDate="{item}" >
                    <span>
                        {{new Date(item?.deleteDate).toLocaleString('tr') }}
                    </span>
                </template>
                <template v-slot:item.actions="{ item }">
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn @click="saveItem(item)" v-bind="attrs" v-on="on" small icon>
                                <v-icon small>
                                    mdi-history
                                </v-icon>
                            </v-btn>
                        </template>
                        <span>Kurtar</span>
                    </v-tooltip>
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn @click="removeItem(item)" v-bind="attrs" v-on="on" small icon>
                                <v-icon small>
                                    mdi-delete
                                </v-icon>
                            </v-btn>
                        </template>
                        <span>Sil</span>
                    </v-tooltip>
                </template>
                </v-data-table>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        name:'TrashCan',
        data(){
            return{
                model:{id:0},
                search:'',
                headers:[
                    {text:'Adı',value:'name',align:'start',width:'250'},
                    {text:'Açıklaması',value:'description'},
                    {text:'Silinme Tarihi',value:'deleteDate'},
                    {text:'Eylemler',value:'actions',sortable:false,align:'right',width:'100'},
                ]
            }
        },
        methods:{
            saveItem(item){
                this.model = JSON.parse(JSON.stringify(item))
                this.saveHandler()
            },
            removeItem(item){
                this.model = JSON.parse(JSON.stringify(item))
                this.removeHandler()
            },
            async saveHandler(){
                try {
                    this.model.isDeleted = false
                    await this.$store.dispatch(`workspaces/updateItem`,this.model)
                    this.$nuxt.$emit('show-alert', { text: 'Başarıyla kurtarıldı !', color: 'success' })
                    this.closeModal()
                } catch (error) {
                    this.$nuxt.$emit('show-alert', { text: 'Çalışma ortamı kurtarılırken bir hata oluştu !', color: 'error' })
                    throw error
                }
            },
            async removeHandler(){
                try {
                    await this.$store.dispatch(`workspaces/removeItem`,this.model)
                    this.$nuxt.$emit('show-alert', { text: 'Başarıyla silindi !', color: 'success' })
                    this.closeModal()
                } catch (error) {
                    this.$nuxt.$emit('show-alert', { text: 'Çalışma ortamı silinirken bir hata oluştu !', color: 'error' })
                    throw error
                }
            },
            closeModal(){
                this.search = ''
                this.$emit('update:value',false)
            },
        },
        props:{
            value:{
                type:Boolean,
                required:true
            },
            items:{
                type:Array,
                required:true
            },
        },
    }
</script>