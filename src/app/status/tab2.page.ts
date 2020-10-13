import { Component, ViewChild } from "@angular/core";
import { MqttService } from "../services/mqtt.service";
import { DomSanitizer } from "@angular/platform-browser";
import { Chart } from "chart.js";
import { AlertController } from "@ionic/angular";
import { Router } from "@angular/router";
import { LocalNotifications } from "@ionic-native/local-notifications/ngx";

declare var Paho: any;

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

/*
This screen shows the mian status (home screen)
It displays the key information:
1. Last seen location
2. Time since last motion (minutes)
3. Activity (count the time of going to each room and visualized by a donut graph)
4. The connection status indicator
*/
export class Tab2Page {
  // keep trach of the idel time
  private secondsIdle;
  // trigger the notication in a certain peroid for demo
  private trigger;
  // initial a dummy filed for the donut graph (will not display nothing)
  private dummy = 1;
  // boolean flag to indicate if any movement has been detected
  private noMovement = true;
  // mqtt connection settings
  private mqttStatus = "Disconnected";
  private mqttClient: any = null;
  private message: any = "";
  private icon: any = "";
  private topic = "swen325/a3";
  private clientId = "300291127";
  private address = {
    path: "barretts.ecs.vuw.ac.nz",
    port: 8883,
    suffix: "/mqtt"
  };

  constructor(
    public MQTT: MqttService,
    public sanitizer: DomSanitizer,
    public alertController: AlertController,
    public router: Router,
    private localNotifications: LocalNotifications,
  ) {
    this.connect();
    this.generateColorArray();
    this.secondsIdle = 0;

    this.trigger = 0;

    // tigger the notification after 20 seconds, but should be 600 seconds
    setInterval(() => {
      this.secondsIdle++;
      if (this.secondsIdle == 20) {
        this.sendNotifications();
      }
    }, 1000);

    // tigger the notification after 5 seconds
    setInterval(() => {
      this.trigger++;
      if (this.trigger == 5) {
        this.sendNotifications();
      }
    }, 1000);
  }

  // push a notification
  sendNotifications() {
    // Schedule a single notification
    this.localNotifications.schedule({
      title: "ATTENTION!",
      text: "No movement sensed for 5 minutes",
      data: { page: "/tabs/tab2" },
    });
  }

  // create the empty pie/donut chart initially
  @ViewChild("pieChart", { static: true }) pieChart;
  pie: any;
  colorArray: any;

  ngOnInit() {
    this.createPieChart();
  }

  // attempt to connect
  public connect = () => {

    this.mqttStatus = `Connecting to ${this.address.path}:${this.address.port}`;
    this.mqttClient = new Paho.MQTT.Client(
      this.address.path,
      this.address.port,
      this.address.suffix,
      this.clientId
    );

    // set callback handlers
    this.mqttClient.onConnectionLost = this.onConnectionLost;
    this.mqttClient.onMessageArrived = this.onMessageArrived;

    // connect the client
    console.log(
      `Connecting to ${this.address.path} via websocket ${this.address.port}`
    );
    this.mqttClient.connect({
      timeout: 10,
      useSSL: false,
      onSuccess: this.onConnect,
      onFailure: this.onFailure
    });
  };

  public onConnect = () => {
    console.log("Connected");
    this.mqttStatus = "Connected";

    // subscribe
    this.mqttClient.subscribe(this.topic);
  };

  // set the MQTT status in the event of failing to connect
  public onFailure = () => {
    console.log("Failed to connect");
    this.mqttStatus = "Failed to connect";
  };

  // set the MQTT status in the event of disconnecting
  public onConnectionLost = responseObject => {
    if (responseObject.errorCode !== 0) {
      this.mqttStatus = "Disconnected";
    }
  };

  // messaging and handling feeds
  // on receving the message, forward the message to processMessage ()
  // to process it
  public onMessageArrived = message => {
    console.log(message.payloadString);
    this.message = message.payloadString;
    this.processMessage(message);
    this.dummy = 0;
  };


  // parse and process the received message
  public processMessage = message => {
    this.MQTT.processMessage(message);
    // convert the csv-formatted string into a string array
    const sensorReading = message.payloadString;
    const sensorReadingArray = sensorReading.split(",");

    // update only if motion was detected in that room
    // sensorReadingArray[2] means the motion_status
    if (sensorReadingArray[2] == 1) {
      this.noMovement = false; // movement has now been detected
      this.createPieChart(); // redraw the pie char
      this.secondsIdle = 0; // reset the timer for idle time
    }
  };

  // return the string of the MQTT status
  public getMQTTStatus() {
    return this.mqttStatus;
  }

  // generate the color array for the slices of the pie chart
  generateColorArray() {
    this.colorArray = [];
    this.colorArray.push("#fc5c65");  // red
    this.colorArray.push("#fa983a");  // yellow 
    this.colorArray.push("#26de81");  // green
    this.colorArray.push("#00a8ff");  // blue
    this.colorArray.push("#c56cf0");  // purple
  }

  // convert the idle time to a human readable string for displaying
  public getIdleTime() {
    var seconds = this.secondsIdle % 60;
    var minutes = (this.secondsIdle - seconds) / 60;

    if (this.noMovement) return "-";
    if (minutes == 1) return minutes + " minute";
    if (minutes == 0) return "Less than a minute";
    return minutes + " minutes";
  }

  // create the donut/pie chart from Chart.js 
  createPieChart() {
    this.pie = new Chart(this.pieChart.nativeElement, {
      type: "doughnut",
      options: {
        legend: {
          display: false
        }
      },
      data: {
        labels: ["living room", "kitchen", "dining", "toilet", "bedroom", ""],
        datasets: [
          {
            // fetch the latest data from mqtt server
            data: [
              this.MQTT.getLivingCount(),
              this.MQTT.getKitchenCount(),
              this.MQTT.getDiningCount(),
              this.MQTT.getToiletCount(),
              this.MQTT.getBedroomCount(),
              this.dummy
            ],
            backgroundColor: this.colorArray,
            borderColor: "#E3E3E3", //grey
            borderWidth: 1
          }
        ]
      }
    });
  }
}
