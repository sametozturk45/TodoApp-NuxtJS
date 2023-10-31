<template>
  <div class="d-flex justify-center align-center fill-height">
    <v-card class="col-12 col-md-6 col-lg-4 py-10 position-relative">
      <ThemeSwitcher class="theme-switcher" />
      <v-card-title class="d-flex flex-column text-center">
        <v-icon size="64">mdi-mail</v-icon>
        <h1 class="mt-4">To-Do App</h1>
      </v-card-title>
      <v-card-text class="mt-10">
        <v-text-field label="Kullanıcı adı yada E-posta Adresi" placeholder="ex: example@gmail.com" v-model="model.username" outlined required />
        <v-text-field label="Şifre" placeholder="Şifrenizi giriniz" :type="isHidden ? 'password':'text'" :append-icon="isHidden ? 'mdi-eye':'mdi-eye-off'" v-model="model.password" @click:append="showPassword" outlined required />
      </v-card-text>
      <v-card-actions class="d-flex flex-column text-center px-4">
        <v-btn color="primary" @click="login" block>
          GİRİŞ YAP
        </v-btn>
        <span class="mt-4">Hesabınız yok mu ? <nuxt-link to="" class="text-decoration-none">Kayıt Olun</nuxt-link></span>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  layout:'flat',
  head() {
    return {
      title: 'Giriş Yap'
    }
  },
  data(){
    return{
      model:{id:0},
      isHidden:true
    }
  },
  methods:{
    showPassword(){
      this.isHidden = !this.isHidden
    },
    login(){
      this.$router.push('/workspaces')
    }
  },
  components:{
    ThemeSwitcher:()=>import('@/components/addOns/ThemeSwitcher')
  }
}
</script>

<style scoped>
.fill-height{
  height: 100dvh !important;
}

.position-relative{
  position: relative;
}

.theme-switcher{
  position: absolute;
  top:1rem;
  right:1rem;
}
</style>