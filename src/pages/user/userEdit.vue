<template>
  <div>
    <v-card flat dark color="accent" class="mb-3">
      <v-card-title class="subheading" v-if="isCreated">
        Edit User
      </v-card-title>
      <v-card-title class="pwcOrange" v-else>
        <span class="white--text">
          Edit User
        </span>
      </v-card-title>
    </v-card>
    <v-card class="pa-3">
      <v-form ref="createForm">
        <!-- <v-layout align-center>
          <v-flex xs6 class="pa-2">
            <v-container fluid grid-list-lg>
              <v-layout row>
                <v-flex xs4 md3>
                  <v-avatar tile size="100%">
                    <img v-if="img" :src="img" alt="square-avatar" @click="showImage" />
                    <img v-else src="../../assets/square.png" alt="square-avatar" />
                  </v-avatar>
                </v-flex>
                <v-flex xs8 md9 class="">
                  <div style="font-size: 20px; color: #5b5b5b">News Photo</div>
                  <v-layout raw wrap>
                    <v-flex xs12>
                      <input
                        v-if="!img"
                        id="files"
                        style="margin-left:-1px; display: none;"
                        type="file"
                        accept="image/jpg,image/jpeg"
                        class="btn btn-primary pa-1"
                        @change="attemptUpload($event)"
                      />
                      <label v-if="!img" style="cursor: pointer" class="body-1 red--text text--darken-1" for="files"
                        >Choose Photo</label
                      >
                      <a v-else @click="onRemoved(img)" class="body-1 grey--text text--darken-1">Delete Photo</a>
                      <br />
                      <span class="text--red caption">*require max image size 1 MB &amp; .jpg</span>
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex> -->
          <!-- <v-flex xs6 class="pa-2" v-if="croppedImg">
            <v-container fluid grid-list-lg>
              <v-layout row>
                <v-flex xs4 md3>
                  <v-avatar tile size="100%">
                    <img :src="croppedImg" alt="square-avatar" @click="showCroppedImage" />
                  </v-avatar>
                </v-flex>
                <v-flex xs8 md9  class="">
                  <div style="font-size: 20px; color: #5b5b5b">News Thumbnail</div>
                  <v-layout raw wrap>
                    <v-flex xs12>
                      <a @click="openCropDialog()" class="body-1 grey--text text--darken-1">Adjust Thumbnail</a>
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>
        </v-layout>
        <v-divider class="mt-2 mb-2" /> -->

        <!-- <v-layout row v-if="!isCreated">
          <v-flex xs3>
            <v-subheader>Created Date</v-subheader>
          </v-flex>
          <v-flex xs9>
            <v-text-field label="Created Date" disabled v-model="news.createdAt" />
          </v-flex>
        </v-layout> -->

        <!-- <v-layout row v-if="!isCreated">
          <v-flex xs3>
            <v-subheader>Publish Date</v-subheader>
          </v-flex>
          <v-flex xs9>
            <v-text-field label="Publish Date" disabled v-model="news.publish_date" />
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs3>
            <v-subheader>Department</v-subheader>
          </v-flex>
          <v-flex xs9>
            <v-autocomplete
              label="Department"
              :items="listdepartement"
              :loading="listdepartement.length == 0"
              item-text="departement"
              item-value="id"
              required
              v-model="news.departement_id"
              :rules="validations.selectRules"
            ></v-autocomplete>
          </v-flex>
        </v-layout> -->
        <v-layout row>
          <v-flex xs3>
            <v-subheader>Device ID</v-subheader>
          </v-flex>
          <v-flex xs9>
            <v-text-field label="" v-model="userData.deviceId" required :rules="textRules" />
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs3>
            <v-subheader>Nama Lengkap</v-subheader>
          </v-flex>
          <v-flex xs9>
            <v-text-field label="" v-model="userData.name" required :rules="textRules" />
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs3>
            <v-subheader>Email</v-subheader>
          </v-flex>
          <v-flex xs9>
            <v-text-field label="" v-model="userData.email" required :rules="textRules" />
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs3>
            <v-subheader>Jenis Kelamin {{userData.gender}}</v-subheader>
          </v-flex>
          <v-flex xs9>
            <v-select
              :items="items['jk']"
              :rules="validations.selectRules"
              v-model="userData.gender"
            ></v-select>
            <!-- <v-text-field label="" v-model="userdata.email" required :rules="textRules" /> -->
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs3>
            <v-subheader>Usia</v-subheader>
          </v-flex>
          <v-flex xs9>
            <v-text-field label="" v-model="userData.age" required :rules="textRules" />
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs3>
            <v-subheader>Phone Number</v-subheader>
          </v-flex>
          <v-flex xs9>
            <v-text-field label="" v-model="userData.phone" required :rules="textRules" />
          </v-flex>
        </v-layout>
        <!-- <v-layout row class="pb-2">
          <v-flex xs3>
            <v-subheader>Content</v-subheader>
          </v-flex>
          <v-flex xs9>
            <vue-editor 
              v-model="news.detail_news"
              ref="cont"
              name="content"
              :rules="textRules"
              @imageAdded="handleImageAdded"
              useCustomImageHandler
            />
          </v-flex>
        </v-layout> -->
        <!-- <v-layout row class="pb-2 mt-3">
          <v-flex xs4>
            <v-subheader>
              <v-checkbox :label="`Highlight Article`" :value="1" v-model="news.is_highlight" color="red"></v-checkbox>
            </v-subheader>
          </v-flex>

          <v-flex xs4>
            <v-subheader>
              <v-checkbox
                :label="`Publish Article`"
                :value="1"
                v-model="news.is_publish"
                color="red"
              ></v-checkbox>
            </v-subheader>
          </v-flex>
        </v-layout> -->
        <v-divider />
        <v-card-actions class="mt-3">
          <v-layout justify-space-between>
            <div>
              <v-btn flat color="primary" @click="cancel">Cancel</v-btn>
            </div>
            <!-- <div>
              <v-btn v-if="news.is_publish === null || news.is_publish === 0" color="error" :disabled="updating" :loading="updating" type="submit">Save as Draft</v-btn>
              <v-btn v-if="news.is_publish === 1" color="error" :disabled="updating" :loading="updating" type="submit">Save as Publish</v-btn>
            </div> -->
            <div>
              <v-btn
                :v-model="(publish = 1)"
                color="error"
                >Create
              </v-btn>
              <!-- :disabled="updating || creating"
                :loading="updating || creating" -->
            </div>
          </v-layout>
        </v-card-actions>
      </v-form>
    </v-card>
  </div>
</template>

<script>
// import {mapGetters} from 'vuex'
// import hasError from '../../mixins/hasError'
// import PhotoField from '../../components/file-input/photo-field'
// import ProgressDialog from '../../components/progress_dialog'
// import typesAndStatuses from '../../mixins/typesAndStatuses'
import validations from '../../utils/validations'
// import {VueEditor} from 'vue2-editor'
// import host from '../../api/hosts'
// import moment from 'moment'
// import {imageURL, b64toBlob} from '../../utils/helpers'

// let defaultFilter = {
//   page: 1,
//   perPage: 100000000000000,
//   sortBy: 'name',
//   descending: false,
//   key: ''
// }

export default {
  // mixins: [hasError, typesAndStatuses],
  // components: {PhotoField, VueEditor, 'progress-dialog': ProgressDialog},
  props:{
    userdata: {
      type: Object,
      default: null,
    },
  },
  data: () => ({
    // host,
    validations,
    isAlreadyClicked: true,
    viewing: false,
    viewingCropped: false,
    croppedUID: false,
    idnews: null,
    img: false,
    publish: null,
    isCreated: true,
    progressDialogLoading: false,
    id: '',
    textRules: [v => !!v || 'Cannot be empty'],
    userData: {
      deviceId: '',
      name: '',
      email: '',
      address: '',
      gender: '',
      phone: '',
    },
    file: null,
    changePhoto: false,
    poi: {
      facilities: [
        {
          id: '',
          total: 0
        }
      ]
    },
    items: {
      jk: ["Laki - Laki", 'Perempuan']
    },
    cropping: false,
    croppedImg: false
  }),
  computed: {
    // userdata() {
    //   console.log('computed data')
    //   return this.userData
    // }
    // ...mapGetters(['updating', 'creating'])
  },
  mounted(){
    if (!this.userdata){
      this.$router.push('/')
    }
  else{
      if (this.userdata.gender === 'L') {
        this.userdata.gender = this.items.jk[0];
      } else {
        this.userdata.gender = this.items.jk[1];
      }
      this.userData = this.userdata;
      console.log(this.userData)
  }
  },
  methods: {
    cancel(){
      this.$router.push('/')
    }
  },
  created(){
    if (!this.userdata){
      this.$router.push('/')
    }
  },
//   methods: {
//     onRemoved() {
//       this.photo = null
//       this.img = false
//     },
//     openCropDialog() {
//       this.cropping = true

//       setTimeout(() => {
//         if (!this.$refs.croppieRef.croppie.data.url) {
//           this.$refs.croppieRef.bind({url: this.img})
//         }
//       }, 500) // ugly hack but it works
//     },
//     closeCropDialog() {
//       this.cropping = false
//     },
//     crop() {
//       let options = {
//         format: 'jpeg',
//         square: true
//       }

//       this.$refs.croppieRef.result(options, output => {
//         const block = output.split(';')
//         const contentType = block[0].split(':')[1]
//         const realData = block[1].split(',')[1]
//         const blob = b64toBlob(realData, contentType)

//         this.progressDialogLoading = true
//         this.$store.dispatch('uploader/upload', blob).then(data => {
//           const fileName = data.uniqueId

//           this.croppedImg = imageURL(fileName)
//           this.croppedUID = fileName
//           this.cropping = false

//           this.progressDialogLoading = false
//         })
//       })
//     }
//   }
}
</script>
<style>
.checkbox-announcement {
  display: none;
}
/* .croppie-container .cr-boundary {
  height: 350px !important;
} */
</style>
