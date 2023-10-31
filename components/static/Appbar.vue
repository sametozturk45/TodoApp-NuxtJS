<template>
    <v-app-bar width="100%" max-height="64">
        <v-toolbar-title>TO-DO App</v-toolbar-title>
        <v-spacer />
        <ThemeSwitcher class="mx-2" />
    </v-app-bar>
</template>

<script>
export default {
    name: 'Appbar',
    components:{
        ThemeSwitcher:()=>import('@/components/addOns/ThemeSwitcher')
    }
}
</script>