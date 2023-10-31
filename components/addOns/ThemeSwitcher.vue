<template>
    <v-btn v-bind="$attrs" @click="toggleDarkMode" icon>
        <v-icon>mdi-theme-light-dark</v-icon>
    </v-btn>
</template>

<script>
export default {
    name: 'ThemeSwitcher',
    methods: {
        toggleDarkMode() {
            this.$vuetify.theme.dark = !this.$vuetify.theme.dark;

            if (this.$vuetify.theme.dark) {
                this.$vuetify.theme.themes.dark = { ...this.$vuetify.theme.themes.dark };
            } else {
                this.$vuetify.theme.themes.light = { ...this.$vuetify.theme.themes.light };
            }
        },
    }
}
</script>
