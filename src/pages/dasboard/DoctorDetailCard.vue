<template>
  <v-card v-if="userData">
    <v-layout column>
      <v-card-title>
        <v-btn small icon>
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <v-spacer />
        <!-- <v-progress-circular v-if="isViewing" indeterminate color="primary" /> -->
        <v-btn
          icon
          small
          class="mr-3"
          v-if="!isEdit"
          @click="isEdit = true"
        >
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <!--<v-btn dark icon>-->
        <!--<v-icon>more_vert</v-icon>-->
        <!--</v-btn>-->
      </v-card-title>
      <div column class="centered display-1" v-if="!isEdit">
        {{ userData.name ? userData.name : '-' }}
      </div>
      <div column class="centered display-1" v-else>
        Edit User
      </div>
    </v-layout>
    <!-- <div class="centered" column>
      <img
        class="centered"
        :src="profilePhotoUrls(profilePhotoUrl, 'https://via.placeholder.com/400x150')"
        min-height="100%"
        width="400px"
      />
    </div> -->
    <!-- <v-divider /> -->
    <v-list two-line v-if="!isEdit">
      <v-list-item>
        <v-list-item-action>
          <v-icon>mdi-account-badge</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <!-- {{userData}} -->
          <v-list-item-title>{{ userData.status ? userData.status : '-' }}</v-list-item-title>
          <v-list-item-subtitle>Status</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item v-if="userData.status === 'Nurse'">
        <v-list-item-action>
          <v-icon>mdi-doctor</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <!-- {{userData}} -->
          <v-list-item-title>{{doctorList[userData.status === 'Doctor' ? 1 : 2].name}}</v-list-item-title>
          <v-list-item-subtitle>Doctor</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      
      <v-divider inset />
      <v-list-item>
        <v-list-item-action>
          <v-icon>mdi-email</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>{{ userData.email ? userData.email : '-' }}</v-list-item-title>
          <v-list-item-subtitle>Email</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-action>
          <v-icon>mdi-phone</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>{{ userData.phone_number ? userData.phone_number : '-' }}</v-list-item-title>
          <v-list-item-subtitle>Mobile Phone</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-list two-line v-else>
      <!-- <v-list-item>
        <v-list-item-action>
          <v-icon>mdi-calendar</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>{{ user.age ? user.age : '-' }}</v-list-item-title>
          <v-list-item-subtitle>Usia</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item> -->
      <v-form @submit.prevent="save" data-vv-scope="editForm">
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-account</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <!-- <v-list-item-title>{{ user.doctor ? user.doctor : '-' }}</v-list-item-title>
            <v-list-item-subtitle>Nama Dokter</v-list-item-subtitle> -->
            <v-text-field
              label="Name"
              v-model="userData.name"
              required
              v-validate="'required'"
              data-vv-name="name"
              :error-messages="errors.collect('editForm.name')"
              outlined
            ></v-text-field>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-action>
            <v-icon>mdi-account-badge</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <!-- <v-list-item-title>{{ user.gender ? 'Laki - laki' : 'Perempuan' }}</v-list-item-title>
            <v-list-item-subtitle>Jenis Kelamin</v-list-item-subtitle> -->
            <!-- <v-text-field
              label="Name"
              v-model="user.gender"
              required
              v-validate="'required'"
              data-vv-name="gender"
              :error-messages="errors.collect('editForm.gender')"
              outlined
            ></v-text-field> -->
            <v-select
              label="Status"
              :items="status"
              v-model="userData.status"
              v-validate="'required'"
              data-vv-name="status"
              :error-messages="errors.collect('createForm.status')"
              outlined
              required
              @change="fetchDoctor()"
            ></v-select>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="userData.status === 'Nurse'">
          <v-list-item-icon>
            <v-icon>mdi-doctor</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <!-- <v-list-item-title>{{ user.doctor ? user.doctor : '-' }}</v-list-item-title>
            <v-list-item-subtitle>Nama Dokter</v-list-item-subtitle> -->
            <v-select
              :items="doctorList"
              v-model="userData.doctor_id"
              v-validate="'required'"
              data-vv-name="doctor"
              item-text="name"
              item-value="id"
              :loading="loadDoctor"
              :error-messages="errors.collect('createForm.doctor')"
              outlined
            ></v-select>
          </v-list-item-content>
        </v-list-item>
        <v-divider inset />
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-email</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <!-- <v-list-item-title>{{ user.email ? user.email : '-' }}</v-list-item-title>
            <v-list-item-subtitle>Email</v-list-item-subtitle> -->
            <v-text-field
              label="Email"
              v-model="userData.email"
              required
              v-validate="'required|email'"
              data-vv-name="email"
              :error-messages="errors.collect('editForm.email')"
              outlined
            ></v-text-field>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-phone</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <!-- <v-list-item-title>{{ user.phone_number ? user.phone_number : '-' }}</v-list-item-title>
            <v-list-item-subtitle>Mobile Phone</v-list-item-subtitle> -->
            <v-text-field
              label="Mobile Phone"
              v-model="userData.phone_number"
              required
              v-validate="'required'"
              data-vv-name="phone"
              :error-messages="errors.collect('editForm.phone')"
              outlined
            ></v-text-field>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-account</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <!-- <v-list-item-title>{{ user.doctor ? user.doctor : '-' }}</v-list-item-title>
            <v-list-item-subtitle>Nama Dokter</v-list-item-subtitle> -->
            <v-text-field
              label="Password"
              type="password"
              v-model="userData.password"
              required
              v-validate="'required'"
              data-vv-name="password"
              :error-messages="errors.collect('editForm.password')"
              outlined
            ></v-text-field>
          </v-list-item-content>
        </v-list-item>
        <v-layout justify-end>
          <!-- <v-spacer></v-spacer> -->
          <v-flex shrink mx-3>
            <v-btn
              text
              type="submit"
            >
              Save
            </v-btn>
          </v-flex>
        </v-layout>
      </v-form>
    </v-list>
  </v-card>
</template>

<script>

export default {
  props: ['user', 'isEdit'],
  data: () => ({
    status: ['Doctor', 'Nurse'],
    userData: null,
    doctorList: null,
    loadDoctor: false
  }),
  computed: {
    // contactPersons() {
    //   return this.user.contact_person;
    // },
  },
  methods: {
    fetchDoctor() {
      if (this.userData.status === 'Nurse') {
        this.loadDoctor = true
        this.$store.dispatch('doctor/getDoctors').then(res => {
          console.log(res)
          this.loadDoctor = false
          this.doctorList = res
        })
      }
    },
    async save() {
      const validated = await this.$validator.validateAll('editForm');
      if (validated) {
        this.userData.status = this.userData.status === 'Doctor' ? 1 : 2;
        console.log(this.userData)
        let res = await this.$store.dispatch('admin/updateDoctor', this.userData);
        if (res) {
          console.log('hore', res);
          this.$store.dispatch(`admin/getAdminDoctors`);
          this.$store.commit('viewed');
        }
      }
    }
  },
  created() {
    this.userData = {...this.user};
    this.userData.status = this.userData.status === 1 ? 'Doctor' : 'Nurse';
    this.fetchDoctor()
    if (this.isEdit) {
      
      this.userData.password = '';
    }
  },
  watch: {
    isEdit(newVal) {
      this.userData = {...this.user};
      if (newVal) {
        this.userData.status = this.userData.status === 1 ? 'Doctor' : 'Nurse';
        this.userData.password = '';
        this.fetchDoctor()
      }
    }
  }
};
</script>
<style scoped>
.centered {
  margin-left: auto;
  margin-right: auto;
  display: block;
}
</style>
