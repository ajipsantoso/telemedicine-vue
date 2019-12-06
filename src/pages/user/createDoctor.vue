<template>
  <div>
    <v-card text dark color="accent" class="mb-3">
      <v-card-title class="subheading">
        Create New Doctor / Nurse
      </v-card-title>
    </v-card>
    <v-card class="pa-3">
      <v-form @submit.prevent="save" data-vv-scope="createForm">
        <v-layout px-10 py-5 column>
          <v-layout row>
            <v-flex xs3>
              <v-subheader>Account Type</v-subheader>
            </v-flex>
            <v-flex xs9>
              <v-select
                :items="items['status']"
                v-model="userdata.status"
                v-validate="'required'"
                data-vv-name="status"
                :error-messages="errors.collect('createForm.status')"
                @change="fetchDoctor()"
              ></v-select>
            </v-flex>
          </v-layout>
          <v-layout row v-if="userdata.status === 'Nurse'">
            <v-flex xs3>
              <v-subheader>as Nurse of Doctor</v-subheader>
            </v-flex>
            <v-flex xs9>
              <v-select
                :items="doctorList"
                v-model="userdata.doctor_id"
                v-validate="'required'"
                data-vv-name="doctor"
                item-text="name"
                item-value="id"
                :loading="loadDoctor"
                :error-messages="errors.collect('createForm.doctor')"
              ></v-select>
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
      name: '',
      email: '',
      password: '',
      phone_number: '',
      status: 1,
      doctor_id: 0,
    },
    items: {
      status: ['Doctor', 'Nurse']
    },
    loadDoctor: false,
    creating: false,
    updating: false,
    doctorList: null
  }),
  computed: {
    // ...mapGetters(['updating', 'creating'])
  },
  created() {
    // this.$store.dispatch('doctor/getDoctors').then(data => {
    //   console.log('hehehehehhe', data)
    // });
    // if (this.userEdit) {
    //   this.userdata = this.userEdit;
    // }
  },
  methods: {
    fetchDoctor() {
      if (this.userdata.status === 'Nurse') {
        this.loadDoctor = true
        this.$store.dispatch('doctor/getDoctors').then(res => {
          console.log(res)
          this.loadDoctor = false
          this.doctorList = res
        })
      }
    },
    cancel() {
      this.$router.push('/');
    },
    async save() {
      const validated = await this.$validator.validateAll('createForm');
      if (validated) {
        this.userdata.status = this.userdata.status === 'Doctor' ? 1 : 2;
        let res = await this.$store.dispatch('doctor/addDoctor', this.userdata);
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
