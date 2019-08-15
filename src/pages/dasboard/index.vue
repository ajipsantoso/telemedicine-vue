<template>
  <div>
    <!-- <v-layout row fluid> -->
      <v-card class="elevation-4">
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
          <!-- <v-progress-linear v-slot:progress color="blue" indeterminate></v-progress-linear> -->
          <!-- <template v-slot:items="props">
            <td class="text-xs-left">{{ props.item.deviceId }}</td>
            <td class="text-xs-left">{{ props.item.name }}</td>
            <td class="text-xs-left">{{ props.item.doctor }}</td>
            <td class="text-xs-left">{{ props.item.address }}</td>
            <td class="text-xs-left">{{ props.item.gender }}</td>
            <td class="text-xs-left"> {{ props.item.gender }}
              <v-menu offset-y>
                <template v-slot:activator="{ on }">
                  <v-btn v-on="on" color="primary" light small fab slot="activator">
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item @click="monitoring(props.item)">
                    <v-list-item-title>
                      <v-icon>favorite_border</v-icon>
                      Monitoring Interval
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="view(props.item)">
                    <v-list-item-title>
                      <v-icon>mdi-magnify</v-icon>
                      User Detail
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="edit(props.item)">
                    <v-list-item-title>
                      <v-icon>edit</v-icon>
                      Edit User
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </td>
          </template> -->
          <!-- <template v-slot:no-results>
            <v-alert :value="true" color="error" icon="warning">
              Your search for "{{ search }}" found no results.
            </v-alert>
          </template> -->
        </v-data-table>
        <v-dialog v-model="viewing" max-width="468px">
          <user-detail-card :user="user" :is-viewing="isViewing" :close="closeModalDetail" />
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
        text: 'Nama Dokter',
        value: 'doctor',
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
      isViewing : 'viewing',
      listPatient: 'doctor/listPatient'
    }),
  },
  methods:{
    closeModalDetail() {
      this.viewing = false
      this.user = null
    },
    monitoring(user){
      console.log(user)
      this.$router.push({ path: `/monitoring/${user.deviceId}`, params: {userdata: user}})
    },
    view(user) {
      this.viewing = true
      this.user = user
      // this.$store.dispatch('users/detail', user.id).then(data => {
      //   if (data) {
      //     this.user = data.data
      //   }
      // })
    },
    edit(user) {
      this.$router.push({ name: 'edit', params: {userdata: user}})
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
