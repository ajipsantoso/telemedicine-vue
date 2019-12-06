<template>
  <v-navigation-drawer
    :clipped="$vuetify.breakpoint.mdAndUp"
    app
    v-model="drawer"
  >
    <v-list dense>
      <template v-for="(item, index) in menu">
        <template>
          <v-list-group
            v-if="item.children && user.status === 1"
            v-model="item.model"
            :key="item.text"
            :prepend-icon="item.icon"
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>
                  {{ item.title }}
                </v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item
              class="pl-10"
              v-for="(child, i) in item.children"
              :key="i"
              active-class="primary--text"
              :to="child.to"
            >
              <template>
                <v-list-item-icon v-if="child.icon">
                  <v-icon>{{ child.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-title>
                  {{ child.title }}
                </v-list-item-title>
              </template>
            </v-list-item>
          </v-list-group>
          <v-list-item
            v-else-if="!item.children"
            :to="item.to"
            :key="index"
            active-class="primary--text"
            exact
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.title }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </template>
    </v-list>
    <v-dialog v-model="isPopUp" max-width="800px">
      <component :is="selectedPopup" v-bind="propsPopup" v-if="isPopUp"/>
    </v-dialog>
  </v-navigation-drawer>
</template>
<script>
import { mapGetters } from 'vuex';
import AddDoctorPopUp from '../pages/user/createDoctor'

export default {
  components: {
    AddDoctorPopUp
  },
  data: () => ({
    selectedPopup: null,
    propsPopup: null
  }),
  computed: {
    drawer: {
      get() {
        return this.$store.getters.sidebar;
      },
      set(val) {
         this.$store.commit('set_sidebar', val)
      },
    },
    isPopUp: {
      get: function() {
        return this.$store.getters['isPopUp'];
      },
      set: function() {
        this.$store.commit('POPED_UP');
      }
    },
    ...mapGetters({
      menu: 'auth/listMenu',
      user: 'auth/user'
    })
  },
  methods: {
    doAction(act) {
      if (act === 'addDoctor') {
        this.selectedPopup = 'AddDoctorPopUp'
        this.propsPopup = {
          
        }
        this.$store.commit('POPING_UP');
      }
    }
  }
};
</script>
