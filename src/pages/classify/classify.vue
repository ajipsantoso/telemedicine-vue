<template>
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
            <v-tab ripple @click="fetch" :key="1">
              Upload File
            </v-tab>
            <v-tab ripple disabled :key="2">
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
                          <v-flex xs5 class="title black--text" v-if="user">
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
                            <v-file-input
                              v-validate="'required|ext:txt'"
                              data-vv-name="fileUpload"
                              v-model="fileUpload"
                              label="File Upload (txt)"
                              :error-messages="errors.collect('fileUpload')"
                              outlined
                              :disabled="loadUpload"
                            ></v-file-input>
                          </v-flex>
                          <v-flex xs5>
                            <v-layout justify-center align-center>
                              <v-btn color="info" elevation="4" class="mt-2" :disabled="loadUpload" :loading="loadUpload" @click="uploadFile">
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
                            <v-btn v-if="item.status === 0" @click="onProcess(item)" color="info" :disabled="processing" small elevation="4">
                              <v-icon>mdi-sync</v-icon>
                              Process
                            </v-btn>
                            <v-btn v-else-if="item.status === 1" :loading="item.status === 1" color="info" small elevation="4">
                              <v-icon>mdi-sync</v-icon>
                              Loading
                            </v-btn>
                            <v-btn v-else color="success" small elevation="4" @click="fetchGraph(item)">
                              <v-icon>mdi-dots-vertical</v-icon>
                              Detail
                            </v-btn>
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
                    <v-layout column>
                      <v-flex>
                        <Plotly :data="dataTable" :layout="layout" @click="addAnot($event, 'add')" @clickannotation="changeAnot($event, 'change')"></Plotly>
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
        </v-container>
      </v-card-text>
      <v-dialog v-model="isViewing" max-width="600px">
        <v-card>
          <v-card-title class="secondary pa-5">
            <span class="headline white--text">Hasil Keputusan</span>
          </v-card-title>
          <v-layout wrap justify-center py-5>
            <v-flex xs12 sm6 pa-5>
              <v-select
                :items="['VT', 'VF', 'AF', 'PAC', 'PVC', 'Normal']"
                label="Label"
                outlined
                v-model="anot.label"
                v-validate="'required'"
                data-vv-name="label"
                :error-messages="errors.collect('label')"
              ></v-select>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs12 :class="{'sm6': mode === 'change'}" pa-5 v-if="mode === 'change'">
              <v-btn block value="RM" @click="modifyAnot({rm: true})">Remove</v-btn>
            </v-flex>
            <v-flex xs12 :class="{'sm6': mode === 'change'}" pa-5>
              <v-btn block @click="modifyAnot({rm: false})">Save</v-btn>
            </v-flex>
          </v-layout>
        </v-card>
      </v-dialog>
    </v-card>
</template>
<script>
import { Plotly } from 'vue-plotly'
import VuePlotly from '@statnett/vue-plotly'
import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
  components: {
    Plotly,
    VuePlotly
  },
  data: () => ({
    active: 0,
    baseURL: "https://ecglabel.herokuapp.com",
    dataTable:[],
    fileUpload: null,
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
    options: {},
    search: '',
    isLoading: false,
    user: null,
    viewing: false,
    editing: false,
    processing: false,
    loadUpload: false,
    mode: '',
    anotEvent: {},
    label: 'Normal',
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
  }),
  computed: {
    ...mapGetters({
      listRecord: 'classify/listRecord'
    }),
    isViewing: {
      get: function() {
        this.errors.clear();
        return this.$store.getters['classify/viewing'];
      },
      set: function() {
        this.anot = {
          label: '',
        };
        this.$store.commit('classify/VIEWED');
      }
    }
  },
  methods: {
    async uploadFile() {
      const validated = await this.$validator.validateAll();
      if (validated) {
        const forms = new FormData();
        forms.append('patient_id', this.user.patient_id);
        forms.append('record', this.fileUpload);
        this.loadUpload = true;
        this.$store.dispatch('classify/uploadFile', forms).then(data => {
          this.fetch();
          this.fileUpload = null;
          this.loadUpload = false;
        });
      }
    },
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
    onProcess(item) {
      // this.processing = true;
      item.status = 1;
      this.$store.dispatch('classify/processFile', {
        id: item.id,
        filename: item.filename,
        type: item.type
      }).then(data => {
        if (!data) {
          setTimeout(()=> {
            this.$store.dispatch('classify/processFile', {
            id: item.id,
            filename: item.filename,
            type: item.type
            })
          },5000);
        }
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
    fetch() {
      this.intervalId = setInterval(()=> {
        this.isLoading = true;
        this.$store.dispatch('classify/getRecord', { id: this.user.patient_id }).then(data => {
          this.isLoading = false;
        })
      }, 10000);
      /* later */
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
    updateFile() {
      // console.log(this.dataAnot);
      const { x, y } = this.dataTable[0];
      this.dataTable
      this.$store.dispatch('classify/updateFile', {
        filePath: `${this.fileSelected.filename.split('.')[0]}/ECG-${this.fileSelected.id}-${this.currentPage}.json`,
        fileData: {
          diagram: { x, y },
          label: [...this.dataAnot]
        }
      })
    }
  },
  destroyed() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  },
  created() {
    const userData = this.$store.getters['classify/userData']
    if (!userData) {
      this.$router.push({ path: `/doctor/` })
    } else {
      this.user = userData;
      this.isLoading = true;
      this.$store.dispatch('classify/getRecord', { id: this.user.patient_id }).then(data => {
        this.isLoading = false;
      })
      this.fetch()
    }
  }
}
</script>