<template>
  <v-card v-if="user">
    <v-layout column>
      <v-card-title>
        <v-btn @click="close" small icon>
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <v-spacer />
        <v-progress-circular v-if="isViewing" indeterminate color="primary" />
        <v-btn
          icon
          small
          class="mr-3"
          :to="{
            name: 'users.edit',
            params: {
              id: user.id
            }
          }"
        >
          <v-icon>mdi-pencil</v-icon>
        </v-btn>

        <!--<v-btn dark icon>-->
        <!--<v-icon>more_vert</v-icon>-->
        <!--</v-btn>-->
      </v-card-title>
      <div column class="centered display-1">
        {{ user.name ? user.name : '-' }}
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
    <v-list two-line>
      <v-list-item>
        <v-list-item-action>
          <v-icon>mdi-calendar</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>{{ user.age ? user.age : '-' }}</v-list-item-title>
          <v-list-item-subtitle>Usia</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-action>
          <v-icon>mdi-doctor</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>{{ user.doctor ? user.doctor : '-' }}</v-list-item-title>
          <v-list-item-subtitle>Nama Dokter</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-action>
          <v-icon>mdi-home</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>{{ user.address ? user.address : '-' }}</v-list-item-title>
          <v-list-item-subtitle>Address</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-action>
          <v-icon>mdi-cellphone-settings-variant</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>{{ user.deviceId ? user.deviceId : '-' }}</v-list-item-title>
          <v-list-item-subtitle>Device ID</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider inset />
      <v-list-item>
        <v-list-item-action>
          <v-icon>mdi-email</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>{{ user.email ? user.email : '-' }}</v-list-item-title>
          <v-list-item-subtitle>Email</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-action>
          <v-icon>mdi-phone</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>{{ user.mobile_phone ? user.mobile_phone : '-' }}</v-list-item-title>
          <v-list-item-subtitle>Mobile Phone</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <!-- <v-divider inset />
      <template v-for="contact in contactPersons">
        <v-list-item :key="contact.id">
          <v-list-item-action>
            <v-icon>contact_phone</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ contact.user ? contact.user.name : '-' }}</v-list-item-title>
            <v-list-item-subtitle>Contact Person</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
      <v-divider inset />
      <v-list-item>
        <v-list-item-action>
          <v-icon>work</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>{{ user.remarks ? user.remarks : '-' }}</v-list-item-title>
          <v-list-item-subtitle>Remarks</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider inset />
      <v-list-item>
        <v-list-item-action>
          <v-icon>security</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>{{ user.type ? user.type : '-' }}</v-list-item-title>
          <v-list-item-subtitle>Type</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider inset />
      <v-list-item>
        <v-list-item-action>
          <v-icon>security</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>{{ user.hiris ? user.hiris.staffName : '-' }}</v-list-item-title>
          <v-list-item-subtitle>Staff Name</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-action>
          <v-icon>security</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>{{ user.hiris ? user.hiris.grade : '-' }}</v-list-item-title>
          <v-list-item-subtitle>Staff Grade</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-action>
          <v-icon>security</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>{{ user.hiris ? user.hiris.los : '-' }}</v-list-item-title>
          <v-list-item-subtitle>Staff LoS</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item> -->
    </v-list>
  </v-card>
</template>

<script>

export default {
  props: {
    user: {
      type: Object,
    },
    isViewing: {
      type: Boolean,
      default: false,
    },
    close: {},
  },
  computed: {
    contactPersons() {
      return this.user.contact_person;
    },
  },
  methods: {
  },
};
</script>
<style scoped>
.centered {
  margin-left: auto;
  margin-right: auto;
  display: block;
}
</style>
