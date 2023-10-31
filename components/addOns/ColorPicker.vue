<template>
    <div>
        <v-menu v-model="menu" :close-on-content-click="false" :close-on-click="false" offset-y>
            <template v-slot:activator="{ on, attrs }">
                <div v-bind="attrs" v-on="on" class="d-flex justify-space-between align-center outlined-color-picker pa-3">
                    <h4>Renk Seçin :</h4>
                    <v-sheet class="mx-2 rounded-pill" :color="value" width="300" height="1rem"/>
                </div>
            </template>
            <v-card width="300">
                <v-color-picker v-model="color" dot-size="10" mode="hexa" hide-inputs />
                <v-btn @click="confirmColor" outlined block>ONAYLA</v-btn>
            </v-card>
        </v-menu>
    </div>
</template>

<script>
export default {
    name: 'ColorPicker',
    data(){
        return{
            menu:false,
            color:'#fff'
        }
    },
    methods:{
        confirmColor(){
            this.$emit('input', this.color);
            this.menu = false
        }
    },
    props:{
        value:{
            type:String,
            required:true,
            default:'#fff'
        }
    },
    mounted(){
        this.color = this.value
    },
    watch:{
        'value':{
            handler(value){
                this.color = value
            },
            deep:true
        }
    }
}
</script>

<style scoped>
.outlined-color-picker{
    border:thin solid rgba(0, 0, 0, 0.48);
    border-radius: 4px;
    line-height: 20px;
}
.theme--dark .outlined-color-picker{
    border:thin solid hsla(0, 0%, 100%, 0.48);
}
</style>
