<template>
    <v-layout>
      <v-flex xs12>
        <v-container fluid>
            <v-layout>
              <v-flex  xs5>
                <div style="width:100%">
                  <chart
                    :chart-data="datacollection"
                    :options="chartOption"/>
                </div>
              </v-flex>
              <v-spacer></v-spacer>
              <v-flex xs5>
                <v-card
                  max-width="600"
                  class="mx-auto"
                >
                <v-list two-line subheader>
                  <v-subheader >Heart Rate Indicator {{ arr.length }}</v-subheader>
                    <v-list-item
                      v-for="(label,idx) in mqttLabels"
                      :key="idx"
                    >
                      <v-list-item-avatar>
                        <v-icon :class="'green lighten-1 white--text'" v-text="'mdi-heart'"></v-icon>
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title v-text="label.title"></v-list-item-title>
                        <v-list-item-subtitle v-text="label.time"></v-list-item-subtitle>
                      </v-list-item-content>
                      <v-list-item-action>
                        <!-- <v-btn icon>
                          <v-icon color="grey lighten-1">info</v-icon>
                        </v-btn> -->
                      </v-list-item-action>
                    </v-list-item>
                  </v-list>
                  <!-- <ul v-html="cobahtml">
                  </ul> -->
                </v-card>
              </v-flex>
            </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
</template>
<script>
import Chart from '@/components/Chart.vue';
import moment from 'moment';
import paho from 'paho-mqtt';

export default {
  components:{
    Chart,
  },
  data:()=>({
    datacollection: {},
    dataLen: 300,
    tempArr: [],
    arr:[],
    mqttLabels: [],
    cobahtml:''
  }),
  computed:{
    chartOption() {
      let self = this;
      return {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false,
        },
        elements: {
          point:{
              radius: 0,
          }
        },
        scales: {
          xAxes: [{
            type: 'realtime',
            time: {
              unit: 'second',
              displayFormats: {
                second: 'HH:mm:ss'
              }
            },
            frameRate: 60,
            realtime: {
              onRefresh: function(chart) {
                chart.data.datasets.forEach(function(dataset) {
                  if (dataset.data.length > self.dataLen) {
                    dataset.data.slice(0,400)
                  }
                  dataset.data = self.arr;
                });
              },
              duration: 4000,
              delay: 1000,
              refresh: 500,
            },
          }],
          yAxes: [{
            ticks: {
              min: 3,
              max: -3
            }
          }]
        },
        
      }
    }
  },
  methods:{
    testingMqtt() {
      const ipBroker = 'hantamsurga.net';
      const deviceId = this.$route.params.deviceId;
      const portBroker = '49878';
      const topic_monitoring = "rhythm/"+deviceId+"/ecg"
      const topic_notif = "rhythm/"+deviceId+"/n"
      let client = new paho.Client(ipBroker, Number(portBroker), "myclientid_" + parseInt(Math.random() * 100, 10));
      client.onConnectionLost = onConnectionLost;
      client.onMessageArrived = onMessageArrived;
      var options = {
          timeout: 3,
          //Gets Called if the connection has sucessfully been established
          onSuccess: onConnect,
          //Gets Called if the connection could not be established
          onFailure: function (message) {
              //alert("Connection failed: " + message.errorMessage);
          }
      };
      client.connect(options);
      function onConnect() {
          console.log("onConnect");
          client.subscribe(topic_monitoring); //ini untuk konek ke mosquito
          console.log(topic_monitoring)
      };
      function onConnectionLost(responseObject) {
          if (responseObject.errorCode !== 0)
              console.log("onConnectionLost:"+responseObject.errorMessage);
      };
      let self = this;
      // let count
      function onMessageArrived(message) {
        console.log('arive')
        let splitted = message.payloadString.split(":")
        splitted.shift()
        for (let i =0;i<splitted.length;i++){
          self.tempArr.push(parseFloat(splitted[i]))
        }
        let writerArr = setInterval(()=>{
          self.arr.push({x: new Date().getTime(), y: self.tempArr[0]});
          self.tempArr.shift();
          // console.log(self.tempArr)
          if (self.tempArr.length <=0) {
            clearInterval(writerArr)
          }
        },10)
      };//end fungsi messageonarrive
    },
    mqqtLabel() {
      const self = this;
      const ipBroker = 'hantamsurga.net';
      const deviceId = this.$route.params.deviceId;
      const portBroker = '49878';
      const topic_monitoring = "rhythm/"+deviceId+"/ecg"
      const topic_notif = "rhythm/"+deviceId+"/n"
      let client1 = new paho.Client(ipBroker, Number(portBroker), "myclientid_" + parseInt(Math.random() * 100, 10));
        //Gets  called if the websocket/mqtt connection gets disconnected for any reason
        client1.onConnectionLost = function (responseObject1) {
            //Depending on your scenario you could implement a reconnect logic here
            alert("connection lost: " + responseObject1.errorMessage);
        };
        var count_notif = 0;
        //Gets called whenever you receive a message for your subscriptions
        
        
         setInterval(function(){
         if(self.arr.length > 0){
         	publish('normal',topic_notif);
         }
         //     console.log(random.data.length)
         //    if (random.data.length % 300 == 0 && random.data.length > 0){
         //        	publish('normal','rhythm/<?php //echo $_GET['deviceid']; ?>///n');
         //    }
        
             }, 6000);
        document.onkeydown = checkKey;
        function checkKey(e) {
            e = e || window.event;
            if (e.keyCode == '80') {
                publish('pvc',topic_notif);
                //mencet P buat ngirim PVC notif
            }
            else if (e.keyCode == '78') {
                publish('normal',topic_notif);
                //mencet N buat ngirim normal notif
            }
            else if (e.keyCode == '86') {
                publish('vf',topic_notif);
                // mencet V buat ngirim VF
            }
            else if (e.keyCode == '67') {
                publish('vff',topic_notif);
                // mencet C buat ngirim VFF
            }else if (e.keyCode == '82') {
                // $('#mqttnotif li').last().remove();
                // mencet C buat ngirim VFF
            }
        }
        var publish = function (payload, topic) {
            //Send your message (also possible to serialize it as JSON or protobuf or just use a string, no limitations)
            var message = new paho.Message(payload);
            message.destinationName = topic;
            client1.send(message);
        }
        client1.onMessageArrived = function (message1) {
            //Do something with the push message you received
            var str = "";
            var currentTime = new Date()
            var hours = currentTime.getHours()
            var minutes = currentTime.getMinutes()
            var seconds = currentTime.getSeconds()
            var miliseconds = currentTime.getMilliseconds();
            str += hours + ":" + minutes + ":" + seconds + "." + miliseconds;
            //console.log(str);
            if(count_notif >= 5){
                self.mqttLabels.pop();
                if(message1.payloadString == "pvc"){
                    // $('#mqttnotif').append('<li><div class="smart-timeline-icon bg-color-red"><i class="fa fa-heart"></i></div><div class="smart-timeline-time"><small>'+str+'</small></div><div class="smart-timeline-content"><p><strong class="txt-color-red">Ventricular Arrhytmia Detected</strong></p><br></div></li>');
                }else if(message1.payloadString == "vf"){
                    // $('#mqttnotif').append('<li><div class="smart-timeline-icon bg-color-red"><i class="fa fa-heart"></i></div><div class="smart-timeline-time"><small>'+str+'</small></div><div class="smart-timeline-content"><p><strong class="txt-color-red">VF Detected</strong></p><br></div></li>');
                }else if(message1.payloadString == "vff"){
                    // $('#mqttnotif').append('<li><div class="smart-timeline-icon bg-color-red"><i class="fa fa-heart"></i></div><div class="smart-timeline-time"><small>'+str+'</small></div><div class="smart-timeline-content"><p><strong class="txt-color-red">VFL Detected</strong></p><br></div></li>');
                }else {
                  self.mqttLabels.unshift({
                    title: 'Normal Heartbeat',
                    time: str,
                  })
                  console.log('Normal')
                    // $('#mqttnotif').append('<li><div class="smart-timeline-icon bg-color-greenDark"><i class="fa fa-heart"></i></div><div class="smart-timeline-time"><small>'+str+'</small></div><div class="smart-timeline-content"><p><strong class="txt-color-greenDark">Normal Heartbeat</strong></p><br></div></li>');
                }
            }else{
                if(message1.payloadString == "pvc"){
                    // $('#mqttnotif').append('<li><div class="smart-timeline-icon bg-color-red"><i class="fa fa-heart"></i></div><div class="smart-timeline-time"><small>'+str+'</small></div><div class="smart-timeline-content"><p><strong class="txt-color-red">Ventricular Arrhytmia Detected</strong></p><br></div></li>');
                }else if(message1.payloadString == "vf"){
                    // $('#mqttnotif').append('<li><div class="smart-timeline-icon bg-color-red"><i class="fa fa-heart"></i></div><div class="smart-timeline-time"><small>'+str+'</small></div><div class="smart-timeline-content"><p><strong class="txt-color-red">VF Detected</strong></p><br></div></li>');
                }else if(message1.payloadString == "vff"){
                    // $('#mqttnotif').append('<li><div class="smart-timeline-icon bg-color-red"><i class="fa fa-heart"></i></div><div class="smart-timeline-time"><small>'+str+'</small></div><div class="smart-timeline-content"><p><strong class="txt-color-red">VFF Detected</strong></p><br></div></li>');
                }else {
                  console.log('Normal')
                  self.mqttLabels.unshift({
                    title: 'Normal Heartbeat',
                    time: str,
                  })
                    // $('#mqttnotif').append('<li><div class="smart-timeline-icon bg-color-greenDark"><i class="fa fa-heart"></i></div><div class="smart-timeline-time"><small>'+str+'</small></div><div class="smart-timeline-content"><p><strong class="txt-color-greenDark">Normal Heartbeat</strong></p><br></div></li>');
                }
            }
            count_notif += 1;
            //code di atas buat nampilin di bagian monitoring report biar setiap 5 kali report di hapus yang paling atas
            //console.log(count_notif);
        };
        //Connect Options
        var options1 = {
            timeout: 3,
            //Gets Called if the connection has sucessfully been established
            onSuccess: onConnect1,
            //Gets Called if the connection could not be established
            onFailure: function (message1) {
                // alert("Connection failed: " + message1.errorMessage);
            }
        };
        client1.connect(options1);
        function onConnect1() {
            // Once a connection has been made, make a subscription and send a message.
            console.log("onConnectnotif");
            client1.subscribe(topic_notif);
            /* message = new Messaging.Message("haaay");
             message.destinationName = "/testmqtt";
             client.send(message);*/
        };
    },
    fillData() {
      let self = this;
      this.datacollection = {
        datasets: [{
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          cubicInterpolationMode: 'monotone',
          pointBorderWidth: 0,
          borderWidth:1,
          data: [],
          fill: false,
        }],
      }
    },
  },
  mounted() {
    this.fillData();
    this.testingMqtt();
    this.mqqtLabel();
  },
}
</script>
