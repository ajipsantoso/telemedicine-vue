<template>
  <v-navigation-drawer
    :clipped="$vuetify.breakpoint.mdAndUp"
    app
    v-model="drawer"
  >
    <v-list dense>
      <template v-for="(item, index) in items">
      <!-- <template> -->
        <!-- <v-layout
          row
          v-if="item.heading"
          align-center
          :key="item.heading"
        >
          <v-flex xs6>
            <v-subheader v-if="item.heading">
              {{ item.heading }}
            </v-subheader>
          </v-flex>
          <v-flex xs6 class="text-xs-center">
            <a href="#!" class="body-2 black--text">dawdwad</a>
          </v-flex>
        </v-layout>
        <v-list-group
          v-else-if="item.children"
          v-model="item.model"
          :key="item.text"
          :prepend-icon="item.model ? item.icon : item['icon-alt']"
          append-icon=""
        >
          <v-list-tile slot="activator">
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile
            v-for="(child, i) in item.children"
            :key="i"
            @click=""
          >
            <v-list-tile-action v-if="child.icon">
              <v-icon>{{ child.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                wadwad
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list-group> -->
        <template>
          <v-list-item
          :to="item.to"
          :key="index"
          active-class="accent--text">
            <v-list-item-action>
              <v-icon>{{item.icon}}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{item.title}}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
        <!-- <v-list-tile :to=>
          <v-list-tile-action>
            <v-icon>people</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              Person
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile> -->
      </template>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
export default {
  data: () => ({
    items: [
      {
        icon: 'mdi-home',
        title: 'Dashboard',
        to: '/',
      },
      // {
      //   icon: 'people',
      //   title: 'Detail user',
      //   to: '/#',
      // },
    ],
  }),
  computed: {
    drawer: {
      get() {
        return this.$store.getters.sidebar;
      },
      set() {
      },
    },
  },
};
</script>
