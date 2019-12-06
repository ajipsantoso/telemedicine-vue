<template>
  <v-container fluid pt-0>
    <v-layout justify-center pt-1 color="grey">
      <img style="width:12%;" src="../../assets/logo.png" alt="logo"/>
    </v-layout>
    <v-layout md7  row fill-height align-center justify-center wrap ma-4>
      <v-flex align-center justify-center class="red hidden-sm-and-down" warp>
        <v-card flat tile class="d-flex">
          <v-img
            :src="require('@/assets/login_cover.png')"
            aspect-ratio="1.5"
            contain
            lazy-src
          >
          </v-img>
        </v-card>
      </v-flex>
      <v-flex sm7 md4 mx-5>
        <v-form @submit.prevent="login" data-vv-scope="form-login">
        <v-card height="100%"  class="elevation-5 ">
          <v-toolbar centered dark color="primary">
            <v-spacer></v-spacer>
            <v-toolbar-title class="ma-0">Telemedicine</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-tabs
            v-model="tab"
            grow
            show-arrows
            mobile-break-point="0"
            touchless
          >
            <v-tabs-slider></v-tabs-slider>
            <v-tab
              :key="'doctor'"
              :href="`#tab-doctor`"
            >
              Doctor
            </v-tab>
            <v-tab
              :key="'patient'"
              :href="`#tab-patient`"
            >
              Patient
            </v-tab>
          </v-tabs>
          <v-card-text class="py-4">
              <v-text-field
                m-3
                v-model="loginData.email"
                name="email"
                label="Email"
                type="email"
                v-validate="'required|email'"
                data-vv-name="email"
                :error-messages="errors.collect('form-login.email')"
                required
              >
              </v-text-field>
              <v-text-field
                m-3
                v-model="loginData.password"
                name="password"
                label="Password"
                id="password"
                type="password"
                v-validate="'required'"
                data-vv-name="password"
                :error-messages="errors.collect('form-login.password')"
                required
              >
              </v-text-field>
            
          </v-card-text>
          <v-card-actions class="pa-4">
            <v-btn
              color="primary"
              type="submit"
              block
              lg
              :loading="loading"
              :disabled="loading"
              @click="login()"
            >
              Login
            </v-btn>
          </v-card-actions>
        </v-card>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    tab: null,
    loginData: {
      email: '',
      password: ''
    },
    loader: null,
    loading: false,
  }),
  methods: {
    async login() {
      const validated = await this.$validator.validateAll('form-login');
      if (validated) {
        this.loading = true;
        console.log(this.tab)
        const url = this.tab === 'tab-doctor' ? 'loginDoctor': 'loginPatient';
        let res = await this.$store.dispatch(`auth/${url}`, this.loginData);
        console.log(res);
        this.loading = false;
        if (res) {
          this.$router.push('/');
        }
      }
    }
  }
};
</script>
<style scoped>
  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
