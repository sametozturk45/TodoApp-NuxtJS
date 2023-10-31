<template>
    <v-dialog :value="value" max-width="480" @click:outside="closeModal">
        <v-card width="100%">
            <v-card-title>
                Çalışma Ortamını Kaldır
                <v-spacer />
                <v-btn icon @click="closeModal">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>
            <v-divider />
            <v-card-text class="mt-4">
                <b>{{ model.name }}</b> adlı çalışma ortamını {{ removeMode ? 'kalıcı olarak silmek' : 'geri dönüşüm kutusuna taşımak' }} istediğinize emin misiniz ?
            </v-card-text>
            <v-card-actions>
                <v-spacer />
                <v-btn color="info" @click="closeModal" text>İptal</v-btn>
                <v-btn color="error" @click="removeMode ? removeWorkspaceHandler() : deleteWorkspaceHandler()" outlined><v-icon class="mr-2">mdi-trash-can</v-icon> Kaldır</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        name:'WorkspaceRemoveDialog',
        methods:{
            async deleteWorkspaceHandler(){
                try {
                    await this.$store.dispatch('workspaces/deleteItem',this.model)
                    this.$nuxt.$emit('show-alert', { text: 'Çalışma ortamı geri dönüşüm kutusuna taşındı !', color: 'success' })
                    this.closeModal()
                } catch (error) {
                    this.$nuxt.$emit('show-alert', { text: 'Çalışma ortamı geri dönüşüm kutusuna taşınırken bir hata oluştu !', color: 'error' })
                    throw error
                }
            },
            async removeWorkspaceHandler(){
                try {
                    await this.$store.dispatch('workspaces/removeItem',this.model)
                    this.$nuxt.$emit('show-alert', { text: 'Çalışma ortamı kalıcı olarak silindi !', color: 'success' })
                    this.closeModal()
                } catch (error) {
                    this.$nuxt.$emit('show-alert', { text: 'Çalışma ortamı silinirken bir hata oluştu !', color: 'error' })
                    throw error
                }
            },
            closeModal(){
                this.$emit('update:model',{id:0,color:'#fff'})
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
            },
            removeMode:{
                type:Boolean,
                default:false
            }
        },
    }
</script>