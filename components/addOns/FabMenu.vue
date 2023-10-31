<template>
    <v-menu @input="menuStateChanged" transition="slide-y-reverse-transition" content-class="elevation-0" :value="menuState" :nudge-top="4" top offset-y>
        <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" class="fab-button" fab>
                <v-icon>{{menuState ? 'mdi-close' : 'mdi-menu'}}</v-icon>
            </v-btn>
        </template>
        <div class="d-flex flex-column-reverse pa-2 me-n1">
            <v-btn class="my-1" @click="clickedPlus" fab>
                <v-icon>mdi-plus</v-icon>
            </v-btn>
            <v-btn class="my-1" @click="clickedTrash" fab>
                <v-icon>mdi-trash-can</v-icon>
            </v-btn>
        </div>
    </v-menu>
</template>

<script>
export default {
    name:'FabMenu',
    data(){
        return{
            menuState:false
        }
    },
    methods:{
        menuStateChanged(value){
            this.menuState = value
            return value
        },
        clickedPlus(){
            this.$emit('clicked-plus',true)
        },
        clickedTrash(){
            this.$emit('clicked-trash',true)
        }
    }
}
</script>

<style scoped>
.fab-button{
  position: fixed;
  bottom:1rem;
  right:1rem;
}
</style>
