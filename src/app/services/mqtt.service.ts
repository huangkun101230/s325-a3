import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MqttService {
  // last (recent) location
  private recentLocation: any = "-";
  // initial battery levels
  private batteryLevels: number[] = [100, 100, 100, 100, 100];
  // the last time in a specific room
  private timeLastInRoom: string[] = ["-", "-", "-", "-", "-"];

  // record details of each room in a human readable form
  private living = {
    roomName: "Living Room",
    count: 0
  };
  private kitchen = {
    roomName: "Kitchen",
    count: 0
  };
  private dining = {
    roomName: "Dining Room",
    count: 0
  };
  private toilet = {
    roomName: "Toilet",
    count: 0
  };
  private bedroom = {
    roomName: "Bedroom",
    count: 0
  };

  // receives data from the broker, convert the new information to needed format
  public processMessage = message => {
    // convert the csv-formatted string into an array
    const sensorReading = message.payloadString;
    const sensorReadingArray = sensorReading.split(",");

    // update fields only if motion was detected in that room
    if (sensorReadingArray[2] == 1) {
      // get the time in hh:mm format to store
      var time = sensorReadingArray[0].substring(11, sensorReadingArray[0].length - 3
      );
      // update the most recent location, and increase the count of moving to the specific room
      switch (
      sensorReadingArray[1] // switching the case between each records
      ) {
        case "living":
          this.recentLocation = this.living.roomName;
          this.living.count++;
          this.timeLastInRoom[0] = time;
          break;
        case "kitchen":
          this.recentLocation = this.kitchen.roomName;
          this.kitchen.count++;
          this.timeLastInRoom[1] = time;
          break;
        case "dining":
          this.recentLocation = this.dining.roomName;
          this.dining.count++;
          this.timeLastInRoom[2] = time;
          break;
        case "toilet":
          this.recentLocation = this.toilet.roomName;
          this.toilet.count++;
          this.timeLastInRoom[3] = time;
          break;
        case "bedroom":
          this.recentLocation = this.bedroom.roomName;
          this.bedroom.count++;
          this.timeLastInRoom[4] = time;
          break;
      }
    }
    // update the battery status of each room
    this.updateBatteryStatus(sensorReadingArray[1], sensorReadingArray[3]);
  };

  // update the battery status for each room based on the new information
  public updateBatteryStatus = (room, battery) => {
    switch (
    room // switching the case between each records
    ) {
      case "living":
        this.batteryLevels[0] = battery;
        break;
      case "kitchen":
        this.batteryLevels[1] = battery;
        break;
      case "dining":
        this.batteryLevels[2] = battery;
        break;
      case "toilet":
        this.batteryLevels[3] = battery;
        break;
      case "bedroom":
        this.batteryLevels[4] = battery;
        break;
    }
  };

  // get the array of the battery levels
  public getBatteryLevels() {
    return this.batteryLevels;
  }

  // get an array of the time last seen in each given room
  public getTimeLastSeenInRoom() {
    return this.timeLastInRoom;
  }

  // get the last/recent room
  public getRecentLocation() {
    return this.recentLocation;
  }

  // get the total number of going to the toilet
  public getToiletCount() {
    return this.toilet.count;
  }

  // get the total number of going to the bedroom
  public getBedroomCount() {
    return this.bedroom.count;
  }

  // get the total number of going to the living room
  public getLivingCount() {
    return this.living.count;
  }

  // get the total number of going to kitchen
  public getKitchenCount() {
    return this.kitchen.count;
  }
  // get the total number of going to the dining room
  public getDiningCount() {
    return this.dining.count;
  }
}