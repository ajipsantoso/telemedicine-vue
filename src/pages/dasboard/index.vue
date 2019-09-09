<template>
  <div>
    <!-- <v-layout row fluid> -->
      <v-card class="elevation-4 ma-5">
        <v-card-title class="primary">
          <v-layout
          align-center
          class="white--text"
          style="font-size: 20px; font-weight: 500; letter-spacing: .02em;">
            Data Pasien
          </v-layout>
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
              <v-btn to="/create-user" color="default" medium elevation="4">
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
          <template v-slot:item.action="{ item }" class="text-xs-center">
            <v-menu offset-y>
                <template v-slot:activator="{ on }">
                  <v-btn v-on="on" color="white" light small fab slot="activator" elevation="4">
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item @click="monitoring(item)">
                    <v-list-item-title>
                      <v-icon>mdi-heart-outline</v-icon>
                      Monitoring Interval
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="classify(item)">
                    <v-list-item-title>
                      <v-icon>mdi-file-export-outline</v-icon>
                      Classification Offline
                    </v-list-item-title>
                  </v-list-item>
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
          <user-detail-card :user="user" :isEdit="editing" />
        </v-dialog>
      </v-card>
    <!-- </v-layout> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import UserDetailCard from './UserDetailCard.vue';

export default {
  components: {
    UserDetailCard,
  },
  data: () => ({
    search: '',
    isLoading: false,
    user: null,
    viewing: false,
    editing: false,
    headers: [
      {
        text: 'Device ID',
        align: 'left',
        value: 'device_id',
        width: '10%'
      },
      {
        text: 'Nama Pasien',
        value: 'name',
        width: '20%'
      },
      {
        text: 'Alamat',
        value: 'address',
        width: '30%'
      },
      {
        text: 'Jenis Kelamin',
        value: 'gender',
        sortable: false,
        width: '10%'
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
      listPatient: 'doctor/listPatient'
    }),
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
    classify(user) {
      this.$store.commit('classify/SET_USER_DATA', user);
      this.$router.push({ path: `/classify/${user.patient_id}`, params: {userdata: user}})
    },
    edit(user) {
      this.editing = true;
      this.user = user
      this.$store.commit('viewing');
    },
    fetch() {
      this.isLoading = true;
      this.$store.dispatch('doctor/getPatient')
        .then(() => {
          this.isLoading = false;
        })
    }
  },
  created() {
    this.fetch();
  }
};
</script>
