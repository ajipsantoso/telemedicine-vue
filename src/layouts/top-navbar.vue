<template>
    <v-app-bar
      color="secondary"
      dark
      app
      :clipped-left="$vuetify.breakpoint.mdAndUp"
    >
      <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
        <v-layout>
          <v-app-bar-nav-icon @click.stop="toggleSidebar()"></v-app-bar-nav-icon>
          <img style="width:60%;" src="../assets/logo.png" alt="logo"/>
        </v-layout>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- <v-btn icon>
        <v-icon>apps</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>notifications</v-icon>
      </v-btn> -->
      <v-menu offset-y>
      <!-- <v-btn icon slot="activator" class="mr-3">
        <v-avatar size="28" v-if="user">
          <img :src="avatarImageUrl" align="menu" />
        </v-avatar>
      </v-btn> -->
      <template v-slot:activator="{ on }">
        <v-btn icon large v-on="on" slot="activator" class="mr-3">
          <v-avatar size="41" color="secondary">
            <v-icon>mdi-account</v-icon>
          </v-avatar>
        </v-btn>
      </template>
      <v-card>
        <v-list>
          <v-list-item avatar>
            <v-list-item-avatar>
              <v-avatar size="40" color="secondary">
              <v-icon dark>mdi-account</v-icon>
              </v-avatar>
              <!-- <img :src="avatarImageUrl" :alt="user.name" /> -->
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ user.name }}</v-list-item-title>
              <v-list-item-sub-title>{{ user.email }}</v-list-item-sub-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-card-actions>
          <v-spacer />
          <v-btn color="accent" text @click="logout">Logout</v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
    </v-app-bar>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      user: 'auth/user'
    })
  },
  methods: {
    toggleSidebar() {
      this.$store.dispatch('toggleSidebar');
    },
    logout() {

    },
  },
};
</script>
