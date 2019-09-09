<template>
  <!-- <v-layout> -->
    <v-card class="mt-3 mx-5">
      <v-card-text>
        <v-container>
          <v-tabs
            v-model="active"
            color="primary"
            grow
            slider-color="red"
            icons-and-text
          >
            <v-tab ripple :key="1">
              Upload File
            </v-tab>
            <v-tab ripple @click="addData" :key="2">
              Graph
            </v-tab>
            <v-tab-item  :key="1">
              <v-card v-if="active === 0" flat>
                <v-card-text>
                  <v-container>
                    <v-layout row wrap class="mt-4">
                      <v-flex xs12 sm6 md2>
                        <v-layout column justify-space-between fill-height>
                          <span class="subheading ">Patient Name</span>
                        </v-layout>
                      </v-flex>
                      <v-flex xs12 sm6 md10>
                        <v-layout row wrap>
                          <v-flex xs2>
                            <v-layout column justify-space-between fill-height>
                              <span> : </span>
                            </v-layout>
                          </v-flex>
                          <v-flex xs5 class="title black--text">
                            {{user.name}}
                          </v-flex>
                        </v-layout>
                      </v-flex>
                    </v-layout>
                    <v-layout row wrap class="mt-4">
                      <v-flex xs12 sm6 md2>
                        <v-layout column justify-space-between fill-height>
                          <span class="subheading pt-4">Upload File (txt) </span>
                        </v-layout>
                      </v-flex>
                      <v-flex xs12 sm6 md10>
                        <v-layout row wrap>
                          <v-flex xs2>
                            <v-layout column justify-space-between fill-height>
                              <span class="pt-4"> : </span>
                            </v-layout>
                          </v-flex>
                          <v-flex xs5>
                            <v-file-input label="File input" outlined></v-file-input>
                          </v-flex>
                          <v-flex xs5>
                            <v-layout justify-center align-center>
                              <v-btn color="info" elevation="4" class="mt-2">
                                <v-icon>mdi-file-upload-outline</v-icon>
                                Upload
                              </v-btn>
                            </v-layout>
                          </v-flex>
                        </v-layout>
                      </v-flex>
                    </v-layout>
                    <v-layout row wrap>
                      <v-flex xs12>
                        <v-data-table
                          :headers="headers"
                          :search="search"
                          :items="listRecord"
                          :loading="isLoading"
                        >
                          <template v-slot:item.action="{ item }" class="text-xs-center">
                            <v-btn v-if="item.status === 0" color="info" :disabled="processing" small elevation="4">
                              <v-icon>mdi-sync</v-icon>
                              Process
                            </v-btn>
                            <v-btn v-else-if="item.status === 1" :loading="item.status === 1" color="info" small elevation="4">
                              <v-icon>mdi-sync</v-icon>
                              Loading
                            </v-btn>
                            <v-btn v-else color="success" small elevation="4">
                              <v-icon>mdi-dots-vertical</v-icon>
                              Detail
                            </v-btn>
                            <!-- <v-menu offset-y>
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
                              </v-menu> -->
                          </template>
                        </v-data-table>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card-text>
              </v-card>
            </v-tab-item>

            <v-tab-item :key="2">
              <v-card v-if="active === 1" flat>
                <v-card-text>
                  <v-container>
                    <v-layout row wrap>
                      {{layout.annotations}}
                      <v-flex xs12>
                        <Plotly :data="dataTable" :layout="layout" @click="addAnot($event, 'add')" @clickannotation="changeAnot($event, 'change')"></Plotly>
                      </v-flex>
                    </v-layout>
                  </v-container><!-- <v-flex xs12>
                        <vue-plotly :data="dataTable" :layout="layout" :options="options" @click="addAnot($event)"/>
                      </v-flex> -->
                </v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs>
          <!-- <v-card-actions class="pa-0 mt-5">
            <input type="number"  v-model="countSelect" v-validate="'checkSelected'" style="display: none;"
              name="count"
            > 
            <div class="errImg caption pl-2 red--text">
              {{errors.first('count')}}
            </div>
            <v-spacer></v-spacer>
            <v-btn @click="back()" color="blue darken-1" dark class="mt-4">
              Back
            </v-btn>
            <v-btn color="blue darken-1" dark class="mt-4" @click="save">
              Save
            </v-btn>
          </v-card-actions> -->
        </v-container>
      </v-card-text>
      <v-dialog v-model="isViewing" max-width="800px">
        <v-card>
          <v-card-title class="secondary pa-5">
            <span class="headline white--text">Hasil Keputusan</span>
          </v-card-title>
          <v-layout wrap justify-center>
              <v-flex xs12 sm6 pa-5>
                <v-btn block value="N" @click="modifyAnot('N')">Normal</v-btn>
              </v-flex>
              <v-flex xs12 sm6 pa-5>
                <v-btn block value="A" @click="modifyAnot('A')">PAC</v-btn>
              </v-flex>
              <v-flex xs12 sm6 pa-5>
                <v-btn block value="V" @click="modifyAnot('V')">PVC</v-btn>
              </v-flex>
              <v-flex xs12 sm6 pa-5>
                <v-btn block value="AF" @click="modifyAnot('AF')">AF</v-btn>
              </v-flex>
              <v-flex xs12 sm6 pa-5>
                <v-btn block value="O" @click="modifyAnot('O')">Lainnya</v-btn>
              </v-flex>
              <v-flex xs12 sm6 pa-5 v-if="mode === 'change'">
                <v-btn block value="RM" @click="modifyAnot('RM')">Remove</v-btn>
              </v-flex>
          </v-layout>
          <v-divider></v-divider>
          <v-card-actions>
            <!-- <v-flex class="caption pl-2 red--text" shrink>
              {{ errors.first('comment') }}
            </v-flex>
            <v-spacer></v-spacer>
            <v-btn color="red darken-1" text @click="onCancel">Cancel</v-btn>
            <v-btn color="blue darken-1" text @click="onSubmit">Save</v-btn> -->
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>
  <!-- </v-layout> -->
</template>
<script>
import { Plotly } from 'vue-plotly'
import VuePlotly from '@statnett/vue-plotly'
import { dbannotations } from './testing'
import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
  components: {
    Plotly,
    VuePlotly
  },
  data: () => ({
    active: 0,
    coba: 1,
    baseURL: "https://ecglabel.herokuapp.com",
    dataTable:[],
    layout:{
      annotations: [],
      title: "My graph",
      xaxis: {
        range: [0, 2700]
      },
    },
    dataAnot: [{"captureevents":true,"text":"N","x":602,"y":0.156},{"captureevents":true,"text":"N","x":1198,"y":0.17499999999999993},{"captureevents":true,"text":"N","x":1797,"y":0.20116932751858266},{"captureevents":true,"text":"N","x":2397,"y":0.1998092659902113},{"captureevents":true,"text":"N","x":2994,"y":0.208},{"captureevents":true,"text":"N","x":3585,"y":0.19157522199729785},{"captureevents":true,"text":"N","x":4175,"y":0.1654379945492723}],
    options: {},
    search: '',
    isLoading: false,
    user: null,
    viewing: false,
    editing: false,
    processing: false,
    mode: '',
    anotEvent: {},
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
      // {
      //   text: 'Status',
      //   value: 'status',
      //   width: '10%'
      // },
      {
        text: 'Aksi',
        value: 'action',
        sortable: false,
        align: 'center',
        width: '30%'
      },
    ],
  }),
  computed: {
    ...mapGetters({
      listRecord: 'classify/listRecord'
    }),
    isViewing: {
      get: function() {
        return this.$store.getters['classify/viewing'];
      },
      set: function() {
        this.idAccess = null;
        this.$store.commit('classify/VIEWED');
      }
    }
  },
  methods: {
    initAnot(event) {
      console.log(event)
      this.layout.annotations = this.dataAnot;
      // this.layout.annotations = [];
    },
    addAnot(event, mode) {
      console.log(event, mode)
      this.mode = mode;
      this.anotEvent = event;
      this.$store.commit('classify/VIEWING');
    },
    changeAnot(event, mode) {
      console.log(event, mode)
      this.mode = mode;
      this.anotEvent = event;
      this.$store.commit('classify/VIEWING');
    },
    modifyAnot(value) {
      console.log('value', value)
      if (this.mode === 'add') {
        console.log(this.anotEvent.points[0].x, this.anotEvent.points[0].y)
        this.dataAnot.push({
          x: this.anotEvent.points[0].x,
          y: this.anotEvent.points[0].y,
          text: value,
          captureevents: true
        })
      } else {
        if (value === 'RM') {
          this.dataAnot.splice(this.anotEvent.index,1)
        } else {
          this.dataAnot[this.anotEvent.index].text = value;
        }
      }
        this.layout = {
          annotations: [...this.dataAnot],
          title: "ECG MONITORING",
          xaxis: {
            range: [0, 2700]
          },
        }
      this.$store.commit('classify/VIEWED');
    },
    addData(){
      axios.get(`${this.baseURL}/signal/${'055resampled1'}`).then(data => {
        data.data.type = 'scattergl'
        console.log(data.data)
        this.dataTable =  [data.data]
      })
      this.initAnot()
    },
    onProcess() {
      this.processing = true;
    },
    fetch() {
      this.isLoading = true;
      this.$store.dispatch('classify/getRecord', { id: this.user.patient_id }).then(data => {
        this.isLoading = false;
      })
    }
  },
  created() {
    const userData = this.$store.getters['classify/userData']
    if (!userData) {
      this.$router.push({ path: `/doctor/` })
    } else {
      this.user = userData;
      this.fetch()
    }
  }
}
</script>