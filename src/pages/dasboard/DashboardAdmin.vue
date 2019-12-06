<template>
  <div>
    <!-- <v-layout row fluid> -->
      <v-card class="elevation-4 ma-5">
        <v-card-title class="primary">
          <!-- <v-layout
          align-center
          class="white--text"
          style="font-size: 20px; font-weight: 500; letter-spacing: .02em;">
            Data User
          </v-layout> -->
          <v-row no-gutters>
            <v-col cols="6" class="title white--text">
              Data User
            </v-col>
            <v-col cols="12">
              <v-tabs
                v-model="tab"
                dark
                background-color="transparent"
                grow
                show-arrows
                mobile-break-point="0"
                touchless
              >
                <v-tab :key="'doctor'">Doctor</v-tab>
                <v-tab :key="'patient'">Patient</v-tab>
              </v-tabs>
            </v-col>
          </v-row>
        </v-card-title>
        <v-container class="py-3 mx-1" fluid>
          <v-layout>
            <v-flex xs5>
              <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
            </v-flex>
            <v-spacer></v-spacer>
            <v-flex xs2 d-flex align-center justify-end>
              <v-btn @click="create()" to="" color="default" medium elevation="4">
                create +
              </v-btn>
            </v-flex>
          </v-layout>
        </v-container>
        <v-data-table
          :headers="headers"
          :items="listPatient"
          :search="search"
          :loading="isLoading"
        >
          <template v-slot:item.gender="{ item }" class="text-xs-center">
            {{ item.gender ? 'L' : 'P' }}
          </template>
          <template v-slot:item.status="{ item }" class="text-xs-center">
            {{ item.status === 1 ? 'Dokter' : 'Suster' }}
          </template>
          <template v-slot:item.action="{ item }" class="text-xs-center">
            <v-menu offset-y>
                <template v-slot:activator="{ on }">
                  <v-btn v-on="on" color="white" light small fab slot="activator" elevation="4">
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item @click="view(item)">
                    <v-list-item-title>
                      <v-icon>mdi-magnify</v-icon>
                      User Detail
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="edit(item)">
                    <v-list-item-title>
                      <v-icon>mdi-pencil-outline</v-icon>
                      Edit User
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
          </template>
        </v-data-table>
        <v-dialog v-model="isViewing" max-width="468px">
          <component :is="selectedComp" v-if="isViewing" :user="user" :isEdit="editing" />
        </v-dialog>
      </v-card>
    <!-- </v-layout> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import UserDetailCard from './UserDetailCard.vue';
import DoctorDetailCard from './DoctorDetailCard.vue';

export default {
  components: {
    UserDetailCard,
    DoctorDetailCard
  },
  data: () => ({
    tab: null,
    selectedComp: null,
    search: '',
    isLoading: false,
    user: null,
    viewing: false,
    editing: false,
    headersDoctor: [
      {
        text: 'Nama',
        value: 'name'
      },
      {
        text: 'Email',
        align: 'left',
        value: 'email'
      },
      {
        text: 'Status',
        value: 'status'
      },
      {
        text: 'Aksi',
        value: 'action',
        sortable: false,
        align: 'center',
        width: '10%'
      },
    ],
    headersPatient: [
      {
        text: 'Nama',
        value: 'name'
      },
      {
        text: 'Email',
        align: 'left',
        value: 'email'
      },
      {
        text: 'Gender',
        value: 'gender'
      },
      {
        text: 'Aksi',
        value: 'action',
        sortable: false,
        align: 'center',
        width: '10%'
      },
    ],
  }),
  computed: {
    ...mapGetters({
      listPatient: 'admin/listUser'
    }),
    headers() {
      console.log(this.tab === 0 ? 'doctor' : 'patient')
      return this.tab === 0 ? this.headersDoctor : this.headersPatient;
    },
    isViewing: {
      get: function() {
        return this.$store.getters['viewing'];
      },
      set: function(newVal) {
        this.user = null;
        this.editing = false;
        this.$store.commit('viewed');
      }
    }
  },
  methods:{
    monitoring(user){
      console.log(user)
      this.$router.push({ path: `/monitoring/${user.device_id}`, params: {userdata: user}})
    },
    create() {
      if (this.tab === 1) {
        this.$router.push('/create-user');
      } else {
        this.$router.push('/doctor/addDoctor');
      }
    },
    view(user) {
      this.viewing = true;
      this.user = user
      this.$store.commit('viewing');
      // this.$store.dispatch('users/detail', user.id).then(data => {
      //   if (data) {
      //     this.user = data.data
      //   }
      // })
    },
    edit(user) {
      this.editing = true;
      this.user = user
      this.$store.commit('viewing');
    },
    fetch() {
      this.selectedComp = this.tab === 0 ? 'DoctorDetailCard' : 'UserDetailCard';
      this.isLoading = true;
      this.$store.dispatch(`admin/getAdmin${ this.tab === 1 ? 'Patient' : 'Doctors'}`)
        .then((data) => {
          console.log(data)
          this.isLoading = false;
        })
    }
  },
  created() {
    this.fetch();
  },
  watch: {
    tab(val) {
      console.log(val)
      this.fetch()
    }
  }
};
</script>
