<template>
  <div>
    <h1 class="text-center my-4">Çalışma Ortamları</h1>
    <v-card outlined>
      <v-card-text>
    <v-row cols="12" v-if="getWorkspaces.length > 0">
      <v-col class="col-12 col-md-6 col-lg-4" v-for="(workspace,index) in getWorkspaces" :key="index">
        <v-card color="third-card">
          <div class="d-flex">
            <v-spacer />
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn class="px-0" v-bind="attrs" v-on="on" icon>
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>
              <v-list class="py-0">
                <v-list-item
                  @click="editWorkspace(workspace)">
                  <v-list-item-title>Düzenle</v-list-item-title>
                </v-list-item>
                <v-list-item
                  @click="deleteWorkspace(workspace)">
                  <v-list-item-title>Sil</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
          <v-card-title tag="nuxt-link" :to="`/workspaces/${workspace.id}`" class="d-flex flex-column text-center mt-4 text-decoration-none" :style="`color:${workspace?.color};`">
            <v-icon :style="`color:${workspace?.color};`">{{ workspace?.icon }}</v-icon>
            {{ workspace?.name }}
          </v-card-title>
          <v-card-text>
            {{ workspace?.description }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <span v-else>Hiç çalışma alanınız yok gibi görünüyor. Lütfen çalışma alanı ekleyerek devam edin.</span>
  </v-card-text>
  </v-card>
    <FabMenu @clicked-plus="addWorkspace" @clicked-trash="openTrashCan" />
    <TrashCan :value.sync="dialogs.trashCan" :items="getDeletedWorkspaces" />
    <WorkspaceDialog :value.sync="dialogs.workspace" :model.sync="model" />
    <WorkspaceRemoveDialog :value.sync="dialogs.workspaceRemove" :model.sync="model" />
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  head() {
    return {
      title: 'Çalışma Ortamları'
    }
  },
  data(){
    return{
      model:{id:0,color:'#fff'},
      dialogs:{
        workspace:false,
        workspaceRemove:false,
        trashCan:false
      }
    }
  },
  methods:{
    addWorkspace(){
      this.model = {id:0,color:'#fff'},
      this.dialogs.workspace = true
    },
    editWorkspace(item){
      this.model = JSON.parse(JSON.stringify(item)),
      this.dialogs.workspace = true
    },
    deleteWorkspace(item){
      this.model = JSON.parse(JSON.stringify(item))
      this.dialogs.workspaceRemove = true
    },
    workspaceHandler(){
      this.model = {id:0,color:'#fff'},
      this.dialogs.workspace = true
    },
    removeWorkspaceHandler(){
      this.model = JSON.parse(JSON.stringify(item))
    },
    openTrashCan(){
      this.dialogs.trashCan = true
    }
  },
  computed: {
    getWorkspaces(){
      return this.$store.getters['workspaces/getWorkspaces']
    },
    getDeletedWorkspaces(){
      return this.$store.getters['workspaces/getDeletedWorkspaces']
    }
  },
  components:{
    WorkspaceDialog:()=>import('@/components/dialogs/Workspace/InsertOrUpdate'),
    WorkspaceRemoveDialog:()=>import('@/components/dialogs/Workspace/Remove'),
    FabMenu:()=>import('@/components/addOns/FabMenu'),
    TrashCan:()=>import('@/components/dialogs/TrashCan/Workspace')
  }
}
</script>

<style scoped>
.theme--light .third-card{
  background-color: #ffffff;
}
.theme--dark .third-card{
  background-color: #111;
}
</style>