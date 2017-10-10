### Mokup App (GoNear) 
Find near by destinations based on your location using Google Maps Javascript API + Places API


### Android Device Screenshots
![Alt text](/screenshots/animated_splash.png?raw=true "Animated Splash Screen") | ![Alt text](/screenshots/location_permission.png?raw=true "Location Permission Screen") | ![Alt text](/screenshots/custom_navigation_menu.png?raw=true "Custom Navigation Menu") | ![Alt text](/screenshots/custom_sidemenu_profile_ui.png?raw=true "Custom Side Menu Profile UI") 
--- | --- | --- | ---
![Alt text](/screenshots/interactive_dropdown_selection.png?raw=true "Interactive Dropdown") | ![Alt text](/screenshots/connection_state_custom_toast_ui.png?raw=true "Custom Connection State Toast UI") | ![Alt text](/screenshots/custom_google_map_ui.png?raw=true "Custom Styled Google Map UI")

### iPad Device Screenshots

![Alt text](/screenshots/ios_animated_splash.png?raw=true "Animated Splash Screen") | ![Alt text](/screenshots/ios_location_permission.png?raw=true "Location Permission Screen") | ![Alt text](/screenshots/ios_custom_navigation_ui.png?raw=true "Custom Navigation Menu") | ![Alt text](/screenshots/ios_custom_toast.png?raw=true "Custom Toast UI") 
--- | --- | --- | ---




### App Features

*Custom Animated Splash Screen

*Custom UX Navigation

*Custom Toast UI

*Custom Google Map & Markers

*Custom Side Menu Profile UI

### Adding Google Map Javascript API Key:

Open /src/index.html and update below:

```javascript
<script src="http://maps.google.com/maps/api/js?key=yourkey&libraries=places"></script>
```

Enable Google Maps Places API [https://console.developers.google.com/flows/enableapi?apiid=picker&credential=client_key&pli=1]

### With the Ionic CLI:

```bash
$ git clone <git url>
$ cd <project directory>
$ npm install
$ ionic cordova platform remove android or ios
$ ionic cordova platform add android or ios
```

Then, to run it on your connected device:

```bash
$ ionic cordova platform run [android or ios] --prod
```

Then, to run it on your browser:

```bash
$ ionic serve --lab
```

### Development Info
```
cli packages:

@ionic/cli-plugin-cordova       : 1.6.2
    @ionic/cli-plugin-ionic-angular : 1.4.1
    @ionic/cli-utils                : 1.7.0
    ionic (Ionic CLI)               : 3.7.0

global packages:

    Cordova CLI : 7.0.1 

local packages:

    @ionic/app-scripts : 2.1.3
    Cordova Platforms  : android 6.2.3 ios 4.4.0
    Ionic Framework    : ionic-angular 3.6.0

System:

    Android SDK Tools : 25.2.5
    Node              : v6.11.1
    OS                : macOS Sierra
    Xcode             : Xcode 8.3.3 Build version 8E3004b 
    ios-deploy        : 1.9.1 
    ios-sim           : 5.0.8 
    npm               : 3.10.10 

```
