import { Component } from '@angular/core';
import { MqttService } from "../services/mqtt.service";

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})

/*
This is the self-designed interaction/screen
It shows the map of the house
It displays the percentage of the battery, the last seen time, and current location (shown as green) for each room
*/
export class Tab3Page {
  // an array for holding infomation for each room
  // index 0 = living room, 
  // 1 = kitchen, 
  // 2 = dining room,
  // 3 = toilet, 
  // 4 = bedroom

  // keep information of battery levels
  public batteryLevels: number[];
  // keep information of time last seen in given room
  public timeLastSeenInRoom: string[];

  constructor(public MQTT: MqttService) {
    this.batteryLevels = this.MQTT.getBatteryLevels();
    this.timeLastSeenInRoom = this.MQTT.getTimeLastSeenInRoom();
  }

  ngOnInit() {
    this.batteryLevels = this.MQTT.getBatteryLevels();
    this.timeLastSeenInRoom = this.MQTT.getTimeLastSeenInRoom();
  }

  // check which room the elder just went
  public isActive(roomName) {
    if (roomName == this.MQTT.getRecentLocation()) {
      return true;
    }
    return false;
  }
}
