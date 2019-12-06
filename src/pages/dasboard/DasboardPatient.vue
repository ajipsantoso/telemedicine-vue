<template>
  <v-card class="elevation-4 ma-5">
    <v-card-title class="primary">
      <v-layout
        align-center
        class="white--text"
        style="font-size: 20px; font-weight: 500; letter-spacing: .02em;"
      >
        Record Pasien
      </v-layout>
    </v-card-title>
    <v-tabs
      v-model="active"
      color="primary"
      grow
      slider-color="red"
      icons-and-text
    >
      <v-tab ripple @click="fetch" :key="1">
        Record
      </v-tab>
      <v-tab ripple disabled :key="2">
        Graph
      </v-tab>
      <v-tab-item  :key="1">
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
          </v-layout>
        </v-container>
        <v-data-table
          :headers="headers"
          :search="search"
          :items="listRecord"
          :loading="isLoading"
        >
          <template v-slot:item.action="{ item }" class="text-xs-center">
            <v-btn :disabled="item.status !== 2" color="success" small elevation="4" @click="fetchGraph(item)">
              <v-icon>mdi-dots-vertical</v-icon>
              Detail
            </v-btn>
          </template>
        </v-data-table>
        <v-dialog v-model="isViewing" max-width="468px">
          <user-detail-card :user="user" :isEdit="editing" />
        </v-dialog>
      </v-tab-item>

      <v-tab-item :key="2">
        <v-card v-if="active === 1" flat>
          <v-card-text>
            <v-container>
              <v-layout column>
                <v-flex>
                  <Plotly :data="dataTable" :layout="layout"></Plotly>
                </v-flex>
                <v-flex ma-5 mt-0>
                  <v-layout justify-space-between>
                    <v-flex shrink>
                      <v-btn class="primary" @click="prevFile">
                        Prev
                      </v-btn>
                    </v-flex>
                    <v-flex shrink>
                      {{`${currentPage}/${maxPage}`}}
                    </v-flex>
                    <v-flex shrink>
                      <v-btn class="primary" @click="nextFile">
                        Next
                      </v-btn>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex>
                  <v-layout>
                    
                  </v-layout>
                </v-flex>
              </v-layout>
              <v-layout>
                <v-flex>
                  <v-layout column>
                    <v-flex pl-10>
                      <v-layout row wrap pl-12>
                        <v-flex xs12 class="title">
                          Overall Status:
                        </v-flex>
                      </v-layout>
                      <v-layout row wrap pl-12 my-2>
                        <v-flex xs2>
                          Normal
                        </v-flex>
                        <v-flex shrink>
                          :
                        </v-flex>
                        <v-flex xs4 px-2>
                          {{ anotAvg.normal }}
                        </v-flex>
                      </v-layout>
                      <v-layout row wrap pl-12 my-2>
                        <v-flex xs2>
                          VT
                        </v-flex>
                        <v-flex shrink>
                          :
                        </v-flex>
                        <v-flex xs4 px-2>
                          {{ anotAvg.vt }}
                        </v-flex>
                      </v-layout>
                      <v-layout row wrap pl-12 my-2>
                        <v-flex xs2>
                          VF
                        </v-flex>
                        <v-flex shrink>
                          :
                        </v-flex>
                        <v-flex xs4 px-2>
                          {{ anotAvg.vf }}
                        </v-flex>
                      </v-layout>
                      <v-layout row wrap pl-12 my-2>
                        <v-flex xs2>
                          AF
                        </v-flex>
                        <v-flex shrink>
                          :
                        </v-flex>
                        <v-flex xs4 px-2>
                          {{ anotAvg.af }}
                        </v-flex>
                      </v-layout>
                      <v-layout row wrap pl-12 my-2>
                        <v-flex xs2>
                          PAC
                        </v-flex>
                        <v-flex shrink>
                          :
                        </v-flex>
                        <v-flex xs4 px-2>
                          {{ anotAvg.pac }}
                        </v-flex>
                      </v-layout>
                      <v-layout row wrap pl-12 my-2>
                        <v-flex xs2>
                          PVC
                        </v-flex>
                        <v-flex shrink>
                          :
                        </v-flex>
                        <v-flex xs4 px-2>
                          {{ anotAvg.pvc }}
                        </v-flex>
                      </v-layout>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex>
                  <v-layout column>
                    <v-flex pl-10>
                      <v-layout row wrap pl-12>
                        <v-flex xs12 class="title">
                          Current File Status:
                        </v-flex>
                      </v-layout>
                      <v-layout row wrap pl-12 my-2>
                        <v-flex xs2>
                          Normal
                        </v-flex>
                        <v-flex shrink>
                          :
                        </v-flex>
                        <v-flex xs4 px-2>
                          {{ anotPerPage.normal }}
                        </v-flex>
                      </v-layout>
                      <v-layout row wrap pl-12 my-2>
                        <v-flex xs2>
                          VT
                        </v-flex>
                        <v-flex shrink>
                          :
                        </v-flex>
                        <v-flex xs4 px-2>
                          {{ anotPerPage.vt }}
                        </v-flex>
                      </v-layout>
                      <v-layout row wrap pl-12 my-2>
                        <v-flex xs2>
                          VF
                        </v-flex>
                        <v-flex shrink>
                          :
                        </v-flex>
                        <v-flex xs4 px-2>
                          {{ anotPerPage.vf }}
                        </v-flex>
                      </v-layout>
                      <v-layout row wrap pl-12 my-2>
                        <v-flex xs2>
                          AF
                        </v-flex>
                        <v-flex shrink>
                          :
                        </v-flex>
                        <v-flex xs4 px-2>
                          {{ anotPerPage.af }}
                        </v-flex>
                      </v-layout>
                      <v-layout row wrap pl-12 my-2>
                        <v-flex xs2>
                          PAC
                        </v-flex>
                        <v-flex shrink>
                          :
                        </v-flex>
                        <v-flex xs4 px-2>
                          {{ anotPerPage.pac }}
                        </v-flex>
                      </v-layout>
                      <v-layout row wrap pl-12 my-2>
                        <v-flex xs2>
                          PVC
                        </v-flex>
                        <v-flex shrink>
                          :
                        </v-flex>
                        <v-flex xs4 px-2>
                          {{ anotPerPage.pvc }}
                        </v-flex>
                      </v-layout>
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>
    <!-- </v-layout> -->
  </v-card>
</template>

<script>
import { Plotly } from 'vue-plotly'
import VuePlotly from '@statnett/vue-plotly'
import { mapGetters } from 'vuex';
import UserDetailCard from './UserDetailCard.vue';

export default {
  components: {
    Plotly,
    VuePlotly,
    UserDetailCard,
  },
  data: () => ({
    active: null,
    search: '',
    isLoading: false,
    user: null,
    viewing: false,
    editing: false,
    
    dataTable:[],
    layout:{
      annotations: [],
      title: "ECG MONITORING",
      xaxis: {
        range: [0, 0]
      },
    },
    singleLead: false,
    anot: {
      label1: '',
      label2: ''
    },
    dataAnot: [],
    anotAvg: {
      normal: 0,
      vt: 0,
      vf: 0,
      af: 0,
      pvc: 0,
      pac: 0,
    },
    anotPerPage: {
      normal: 0,
      vt: 0,
      vf: 0,
      af: 0,
      pvc: 0,
      pac: 0,
    },
    intervalId: null,
    fileSelected: null,
    currentPage: 1,
    maxPage: 1,

    headers: [
      {
        text: 'Filename',
        align: 'left',
        value: 'filename',
        width: '40%'
      },
      {
        text: 'Type',
        value: 'type',
        width: '20%'
      },
      {
        text: 'Aksi',
        value: 'action',
        sortable: false,
        align: 'center',
        width: '30%'
      },
    ],
    fileSelected: null
  }),
  computed: {
    ...mapGetters({
      listRecord: 'patient/listRecord'
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
    initAnot(event) {
      this.layout.annotations = this.dataAnot;
      // this.layout.annotations = [];
    },
    addAnot(event, mode) {
      this.mode = mode;
      this.anotEvent = event;
      this.$store.commit('classify/VIEWING');
    },
    changeAnot(event, mode) {
      this.mode = mode;
      const anotation = event.annotation.text
      this.anot = {
        label: anotation
      }
      this.anotEvent = event;
      this.$store.commit('classify/VIEWING');
    },
    countAnot(label) {
      if (label.length > 0) {
        this.anotPerPage= {
          normal: 0,
          vt: 0,
          vf: 0,
          af: 0,
          pvc: 0,
          pac: 0,
        };
        label.forEach(elm => {
          console.log(elm)
          this.anotPerPage[elm.text.toLowerCase()] +=  1;
        })
      }
    },
    modifyAnot({rm}) {
      // console.log('value', value)
      if (this.mode === 'add') {
        this.dataAnot.push({
          x: this.anotEvent.points[0].x,
          y: this.anotEvent.points[0].y,
          text: this.anot.label,
          captureevents: true
        })
      } else {
        if (rm === true) {
          this.dataAnot.splice(this.anotEvent.index,1)
        } else {
          this.dataAnot[this.anotEvent.index].text = this.anot.label;
        }
      }
      this.countAnot(this.dataAnot);
      this.layout = {
        annotations: [...this.dataAnot],
        title: "ECG MONITORING",
        xaxis: this.layout.xaxis
      }
      this.anot = {
        label1: '',
        label2: ''
      };
      this.errors.clear();
      this.$store.commit('classify/VIEWED');
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
      this.$store.dispatch('patient/getRecord')
        .then(() => {
          this.isLoading = false;
        })
    },
    fetchGraph(item = null, page = 1) {
      this.active = 1;
      this.currentPage = page;
      this.fileSelected = item ? item : null;
      if (this.fileSelected) {
        if (page == 1) {
          clearInterval(this.intervalId);
          // console.log('buka file', this.fileSelected)
          this.maxPage = this.fileSelected.len_rec;
          this.anotAvg = {
            normal: this.fileSelected.normal,
            vt: this.fileSelected.vt,
            vf: this.fileSelected.vf,
            af: this.fileSelected.af,
            pvc: this.fileSelected.pvc,
            pac: this.fileSelected.pac
          }
        }
        this.$store.dispatch('classify/staticFile', {
          filePath: this.fileSelected.filename.split('.')[0],
          fileName: `${this.fileSelected.id}-${page}`,
        }).then(data => {
          // this.$store.dispatch('classify/getResRec', {
          //   filename: `ECG-${this.fileSelected.id}-${page}.json`,
          //   id: this.fileSelected.id
          // }).then(dataLabel => {
          //   console.log('HEI', dataLabel)
          //   this.label1 = dataLabel.label1;
          //   this.label2 = dataLabel.label2;
          // })
          console.log('fetch diagram', data)
          // data = JSON.parse(data)
          data.diagram.type = 'scattergl'
          this.dataTable =  [data.diagram];
          this.dataAnot = data.label;
          this.layout = {
            annotations: this.dataAnot,
            title: "ECG MONITORING",
            xaxis: {
              range: [0, data.diagram.y.length]
            },
          }
          this.countAnot(data.label);
        })
      }
    },
    nextFile() {
      console.log('next ',this.fileSelected)
      if (this.fileSelected.len_rec >= this.currentPage+1) {
        this.fetchGraph(this.fileSelected, this.currentPage+1)
      } else {
        this.$swal(
          "Edge of File",
          "Already on edge",
          'info'
        );
      }
    },
    prevFile() {
      if (this.currentPage-1 >= 1) {
        this.fetchGraph(this.fileSelected, this.currentPage-1)
      } else {
        this.$swal(
          "Edge of File",
          "Already on edge",
          'info'
        );
      }
    },
  },
  created() {
    this.fetch();
  }
};
</script>
