<template>
  <div>
    <v-card text dark color="accent" class="mb-3">
      <v-card-title class="subheading" v-if="isCreated">
        Create New User
      </v-card-title>
      <v-card-title class="pwcOrange" v-else>
        <span class="white--text">
          Edit User
        </span>
      </v-card-title>
    </v-card>
    <v-card class="pa-3">
      <v-form @submit.prevent="save" data-vv-scope="createForm">
        <v-layout px-10 py-5 column>
          <v-layout row>
            <v-flex xs3>
              <v-subheader>Device ID</v-subheader>
            </v-flex>
            <v-flex xs9>
              <v-text-field
                v-model="userdata.device_id"
                required
                v-validate="'required'"
                data-vv-name="deviceId"
                :error-messages="errors.collect('createForm.deviceId')"
              />
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs3>
              <v-subheader>Nama Lengkap</v-subheader>
            </v-flex>
            <v-flex xs9>
              <v-text-field
                label=""
                v-model="userdata.name"
                required
                v-validate="'required'"
                data-vv-name="name"
                :error-messages="errors.collect('createForm.name')"
              />
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs3>
              <v-subheader>Email</v-subheader>
            </v-flex>
            <v-flex xs9>
              <v-text-field
                label=""
                v-model="userdata.email"
                required
                v-validate="'required|email'"
                data-vv-name="email"
                :error-messages="errors.collect('createForm.email')"
              />
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs3>
              <v-subheader>Password</v-subheader>
            </v-flex>
            <v-flex xs9>
              <v-text-field
                label=""
                v-model="userdata.password"
                required
                type="password"
                v-validate="'required'"
                data-vv-name="password"
                :error-messages="errors.collect('createForm.password')"
              />
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs3>
              <v-subheader>Jenis Kelamin</v-subheader>
            </v-flex>
            <v-flex xs9>
              <v-select
                :items="items['jk']"
                v-model="userdata.gender"
                v-validate="'required'"
                data-vv-name="jenis-kelamin"
                :error-messages="errors.collect('createForm.jenis-kelamin')"
              ></v-select>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs3>
              <v-subheader>Alamat</v-subheader>
            </v-flex>
            <v-flex xs9>
              <v-text-field
                label=""
                v-model="userdata.address"
                required
                v-validate="'required'"
                data-vv-name="address"
                :error-messages="errors.collect('createForm.address')"
              />
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs3>
              <v-subheader>Phone Number</v-subheader>
            </v-flex>
            <v-flex xs9>
              <v-text-field
                label=""
                v-model="userdata.phone_number"
                required
                v-validate="'required'"
                data-vv-name="phone"
                :error-messages="errors.collect('createForm.phone')"
              />
            </v-flex>
          </v-layout>
        </v-layout>
        <v-divider />
        <v-card-actions class="mt-3">
          <v-layout justify-space-between>
            <div>
              <v-btn text color="primary" @click="cancel">Cancel</v-btn>
            </div>
            <div>
              <v-btn
                :v-model="(publish = 1)"
                color="error"
                :disabled="updating || creating"
                :loading="updating || creating"
                type="submit"
                >
                Save
              </v-btn>
            </div>
          </v-layout>
        </v-card-actions>
      </v-form>
    </v-card>
  </div>
</template>

<script>

export default {
  props: ['userEdit'],
  data: () => ({
    isCreated: true,
    userdata: {
      device_id: '',
      name: '',
      email: '',
      password: '',
      address: '',
      gender: '',
      phone_number: '',
    },
    items: {
      jk: ['Laki - Laki', 'Perempuan']
    },
    creating: false,
    updating: false,
  }),
  computed: {
    // ...mapGetters(['updating', 'creating'])
  },
  created() {
    // if (this.userEdit) {
    //   this.userdata = this.userEdit;
    // }
  },
  methods: {
    cancel() {
      this.$router.push('/');
    },
    async save() {
      const validated = await this.$validator.validateAll('createForm');
      if (validated) {
        this.userdata.gender = this.userdata.gender === 'Perempuan' ? false : true;
        let res = await this.$store.dispatch('doctor/addPatient', this.userdata);
        if (res) {
          console.log('hore', res);
          this.$router.push('/');
        }
      }
    }
  }
}
</script>
<style>
.checkbox-announcement {
  display: none;
}
/* .croppie-container .cr-boundary {
  height: 350px !important;
} */
</style>
