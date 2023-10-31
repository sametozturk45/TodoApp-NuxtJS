<template>
    <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
            <v-btn class="px-0" v-bind="attrs" v-on="on" icon>
                <v-icon>mdi-translate</v-icon>
            </v-btn>
        </template>
        <v-list class="py-0">
            <v-list-item @click="changeLanguage('tr')">
                <v-list-item-title>Türkçe</v-list-item-title>
            </v-list-item>
            <v-list-item @click="changeLanguage('eng')">
                <v-list-item-title>English</v-list-item-title>
            </v-list-item>
        </v-list>
    </v-menu>
</template>

<script>
export default {
    name:'LanguageSwitcher',
    methods:{
        changeLanguage(language){

        }
    }
}
</script>