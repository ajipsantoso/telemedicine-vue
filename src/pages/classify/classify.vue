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
          {{active}}
            <v-tab ripple :key="1">
              Upload File
            </v-tab>
            <v-tab disabled ripple :key="2">
              Permission
            </v-tab>
            <v-tab-item :key="1">
              <v-card flat>
                <v-card-text>
                  <v-container>
                    <v-layout row wrap>
                      <v-flex xs12 sm6 md2>
                        <v-layout column justify-space-between fill-height>
                          <span class="subheading pt-4">Upload File (txt) </span>
                        </v-layout>
                      </v-flex>
                      <v-flex xs12 sm6 md10>
                        <v-layout row wrap>
                          <v-flex xs1>
                            <v-layout column justify-space-between fill-height>
                              <span class="pt-4"> : </span>
                            </v-layout>
                          </v-flex>
                          <v-flex xs11>
                            <v-file-input label="File input"></v-file-input>
                          </v-flex>
                        </v-layout>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card-text>
              </v-card>
            </v-tab-item>

            <v-tab-item :key="2">
              <v-card flat>
                <v-card-text>
                  <v-container>
                    <v-layout row wrap>
                      HUEHUE
                    </v-layout>
                  </v-container>
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
    </v-card>
  <!-- </v-layout> -->
  
</template>
<script>
export default {
  data: () => ({
    active: 1,
  })
}
</script>