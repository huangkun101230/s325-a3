# s325-a3

### Smart Eldercare App

This is an Smart ELdercare mobile app for the third assignment of SWEN325 [Software Development for Mobile Platforms]
My name is Kun Huang (300291127), and I accomplished this assignment by myslef.

### File structure
<pre>
--app
  |--battery
  |  --tab1-routing.module.ts
  |  --tab1.module.ts //loading modules
  |  --tab1.page.html //battery(tab1) screen
  |  --tab1.page.scss
  |  --tab1.page.ts
  |  --tab1.page.spec.ts
  |
  |--status
  |  --tab2-routing.module.ts
  |  --tab2.module.ts //loading modules
  |  --tab2.page.html //status/homepage (tab2) screen
  |  --tab2.page.scss
  |  --tab2.page.ts
  |  --tab2.page.spec.ts
  |
  |--map
  |  --tab1-routing.module.ts
  |  --tab1.module.ts //loading modules
  |  --tab1.page.html //map/self-designed (tab3) screen
  |  --tab1.page.scss
  |  --tab1.page.ts
  |  --tab1.page.spec.ts
  |
  |--services
  |  --mqtt.service.ts //mqtt client services
  |  --mqtt.service.spec.ts
  |
  |--tabs
  |  --tabs-routing.module.ts //setting tabs
  |  --tabs.module.ts
  |  --tabs.page.html
  |  --tabs.page.scss
  |  --tabs.page.ts
  |  --tabs.page.spec.ts
--assets
  |--js
  |  --paho-mqtt.js //Paho MQTT js library
--index.html
--README.md
</pre>

### How to run my app

This app uses the ionic 5 framework.

<pre>
Ionic:

   Ionic CLI                     : 5.4.16 (/usr/local/lib/node_modules/ionic)
   Ionic Framework               : @ionic/angular 5.3.5
   @angular-devkit/build-angular : 0.1000.8
   @angular-devkit/schematics    : 10.0.8
   @angular/cli                  : 10.0.8
   @ionic/angular-toolkit        : 2.3.3

Cordova:

   Cordova CLI       : 10.0.0
   Cordova Platforms : 6.0.0, android 9.0.0, browser, ios 6.1.1
   Cordova Plugins   : cordova-plugin-ionic-keyboard 2.2.0, cordova-plugin-ionic-webview 4.2.1, (and 6 other plugins)

Utility:

   cordova-res                          : not installed
   native-run (update available: 1.2.1) : 1.0.0

System:

   Android SDK Tools : 26.1.1 (/Users/Kun/Library/Android/sdk)
   ios-sim           : 8.0.2
   NodeJS            : v14.7.0 (/usr/local/bin/node)
   npm               : 6.14.8
   OS                : macOS Catalina
   Xcode             : Xcode 11.7 Build version 11E801a
</pre>

1. Clone the git repository
<pre>
git clone https://github.com/huangkun101230/s325-a3.git
</pre>

2. Navigate into the folder
<pre>
cd s325-a3
</pre>

3. Install dependencies
<pre>
npm install
</pre>

4. Run the application in your browser/emulator
<pre>
ionic serve

or

ionic cordova run ios

or

ionic cordova run android
</pre>

5. Explore the application at http://localhost:8100/ or in your emulator


6. Enjoy!



### Screens and functions
* battery (tab1)
  * NgCircleProgressModule module implementation
  * Swiping to switch the segments of the slides in a cube display format
  * Mqtt service access: Realtime update for getting the new status of the battery status of each room
  * Styling
  
* status (tab2)
  * LocalNotifications module implementation
  * Mqtt service access: Realtime update for getting the overall information, such as the location and time
  * Push notifications to the main screen
  * Styling
  
* map (tab3)
  * Self-designed interaction/screen
  * A top view map of rooms and also display overall informaiton
  * Mqtt service access access: Realtime update for getting the overall information
  * Styling
  
  
### Components used
1. ion-header
2. ion-title
3. ion-content
4. ion-row
5. ion-col
6. ion-toolbar
7. ion-slides
8. ion-icon
9. ion-slide
10. ion-card
11. ion-card-header
12. ion-grid
13. ion-card-content
14. circle-progress