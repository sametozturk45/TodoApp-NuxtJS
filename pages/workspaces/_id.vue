<template>
    <div>
        <nuxt-link to="/workspaces" class="text-decoration-none">
            <v-icon small>mdi-arrow-left</v-icon>
            Geri Dön
        </nuxt-link>
        <div class="d-flex flex-column text-center mt-6">
            <v-icon :style="`color:${getWorkspace?.color};`">{{ getWorkspace?.icon }}</v-icon>
            <h1>{{ getWorkspace?.name }}</h1>
        </div> 
        <v-card class="mt-4" outlined>
            <v-card-text>
                <v-list class="py-0" v-if="getTodoList.length > 0" outlined>
                    <template v-for="(item,index) in getTodoList">
                    <v-list-item :input-value="item.isCompleted" active-class="info" :key="item.id" :dark="item.isCompleted">
                        <v-list-item-content :class="{'white--text text-decoration-line-through':item.isCompleted}">
                            {{ item?.text }}
                        </v-list-item-content>
                        <div class="d-flex flex-row ms-2">
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn @click="toggleTodoStatus(item)" v-bind="attrs" v-on="on" small icon>
                                        <v-icon small>
                                            {{item.isCompleted ? 'mdi-arrow-u-left-top':'mdi-check'}}
                                        </v-icon>
                                    </v-btn>
                                </template>
                                <span>{{item.isCompleted ? 'Geri Al':'Bitir'}}</span>
                            </v-tooltip>
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn @click="editTodo(item)" v-bind="attrs" v-on="on" small icon>
                                        <v-icon small>
                                            mdi-pencil
                                        </v-icon>
                                    </v-btn>
                                </template>
                                <span>Güncelle</span>
                            </v-tooltip>
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn @click="deleteTodo(item)" v-bind="attrs" v-on="on" small icon>
                                        <v-icon small>
                                            mdi-trash-can
                                        </v-icon>
                                    </v-btn>
                                </template>
                                <span>Kaldır</span>
                            </v-tooltip>
                        </div>
                    </v-list-item>
                    <v-divider
                        v-if="index < getTodoList.length - 1"
                        :key="index"
                    ></v-divider>
                    </template>
                </v-list>
                <span v-else>Liste boş. Lütfen görüntülemek için bir kaç iş ekleyin.</span>
            </v-card-text>
        </v-card>
        <FabMenu @clicked-plus="addTodo" @clicked-trash="openTrashCan" />
        <TrashCan :value.sync="dialogs.trashCan" :items="getDeletedTodos" />
        <TodoDialog :value.sync="dialogs.todo" :model.sync="model" />
    </div>
</template>

<script>
    export default {
        name:'WorkspaceDetailPage',
        head(){
            return{
                title:this.getWorkspace?.name
            }
        },
        data(){
            return{
                model:{id:0},
                dialogs:{
                    todo:false,
                    trashCan:false
                }
            }
        },
        methods:{
            addTodo(){
                this.model = {id:0,workspaceId:this.$route.params.id},
                this.dialogs.todo = true
            },
            editTodo(item){
                this.model = JSON.parse(JSON.stringify(item)),
                this.dialogs.todo = true
            },
            openTrashCan(){
                this.dialogs.trashCan = true
            },
            async deleteTodo(item){
                this.model = JSON.parse(JSON.stringify(item))
                try {
                    await this.$store.dispatch('todos/deleteItem',this.model)
                    this.$nuxt.$emit('show-alert', { text: 'Yapılacak iş geri dönüşüm kutusuna taşındı !', color: 'success' })
                } catch (error) {
                    this.$nuxt.$emit('show-alert', { text: 'Yapılacak iş geri dönüşüm kutusuna taşınırken bir hata oluştu !', color: 'error' })
                    throw error
                }
            },
            async toggleTodoStatus(item){
                this.model = JSON.parse(JSON.stringify(item))
                this.model.isCompleted = !this.model.isCompleted
                try {
                    await this.$store.dispatch('todos/updateItem',this.model)
                    this.$nuxt.$emit('show-alert', { text: 'Yapılacak işin durumu güncellendi !', color: 'success' })
                } catch (error) {
                    this.$nuxt.$emit('show-alert', { text: 'Yapılacak işin durumu güncellenirken bir hata oluştu !', color: 'error' })
                    throw error
                }
            }
        },
        computed:{
            getWorkspace(){
                // Get current workspace
                return this.$store.getters['workspaces/getWorkspace'](this.$route.params.id)
            },
            getTodoList(){
                return this.$store.getters['todos/getTodoListByWorkspaceId'](this.$route.params.id)
            },
            getDeletedTodos(){
                return this.$store.getters['todos/getDeletedTodos'](this.$route.params.id)
            }
        },
        components:{
            FabMenu:()=>import('@/components/addOns/FabMenu'),
            TrashCan:()=>import('@/components/dialogs/TrashCan/Todo'),
            TodoDialog:()=>import('@/components/dialogs/Todo/InsertOrUpdate')
        }
    }
</script>

<style scoped>

</style>