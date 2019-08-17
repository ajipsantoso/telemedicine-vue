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
          <v-icon>mdi-gender-male-female</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <!-- {{userData}} -->
          <v-list-item-title>{{ userData.gender ? 'Laki - laki' : 'Perempuan' }}</v-list-item-title>
          <v-list-item-subtitle>Jenis Kelamin</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-action>
          <v-icon>mdi-doctor</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>{{ userData.doctor ? userData.doctor : '-' }}</v-list-item-title>
          <v-list-item-subtitle>Nama Dokter</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-action>
          <v-icon>mdi-home</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>{{ userData.address ? userData.address : '-' }}</v-list-item-title>
          <v-list-item-subtitle>Alamat</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-action>
          <v-icon>mdi-cellphone-settings-variant</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>{{ userData.device_id ? userData.device_id : '-' }}</v-list-item-title>
          <v-list-item-subtitle>Device ID</v-list-item-subtitle>
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
            <v-icon>mdi-gender-male-female</v-icon>
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
              label="Jenis Kelamin"
              :items="jk"
              v-model="userData.gender"
              v-validate="'required'"
              data-vv-name="jenis-kelamin"
              :error-messages="errors.collect('createForm.jenis-kelamin')"
              outlined
              required
            ></v-select>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <!-- <v-list-item-title>{{ user.address ? user.address : '-' }}</v-list-item-title>
            <v-list-item-subtitle>Address</v-list-item-subtitle> -->
            <v-text-field
              label="Address"
              v-model="userData.address"
              required
              v-validate="'required'"
              data-vv-name="address"
              :error-messages="errors.collect('editForm.address')"
              outlined
            ></v-text-field>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-cellphone-settings-variant</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <!-- <v-list-item-title>{{ user.device_id ? user.device_id : '-' }}</v-list-item-title>
            <v-list-item-subtitle>Device ID</v-list-item-subtitle> -->
            <v-text-field
              label="Device ID"
              v-model="userData.device_id"
              required
              v-validate="'required'"
              data-vv-name="deviceId"
              :error-messages="errors.collect('editForm.deviceId')"
              outlined
            ></v-text-field>
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
    jk: ['Laki - Laki', 'Perempuan'],
    userData: {
      
    }
  }),
  computed: {
    // contactPersons() {
    //   return this.user.contact_person;
    // },
  },
  methods: {
    async save() {
      const validated = await this.$validator.validateAll('editForm');
      if (validated) {
        this.userData.gender = this.userData.gender === 'Perempuan' ? false : true;
        delete this.userData.session;
        let res = await this.$store.dispatch('doctor/updatePatient', this.userData);
        if (res) {
          console.log('hore', res);
          this.$store.commit('viewed');
        }
      }
    }
  },
  created() {
    console.log('USER', this.user)
    this.userData = this.user;
    if (this.isEdit) {
      console.log(this.userData.gender);
      this.userData.gender = this.userData.gender === true ? 'Laki - Laki' : 'Perempuan';
      this.userData.password = '';
    }
  },
  watch: {
    isEdit(newVal) {
      this.userData = this.user;
      if (newVal) {
        this.userData.gender = this.userData.gender === true ? 'Laki - Laki' : 'Perempuan';
        this.userData.password = '';
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
