# CS Unipi Mobile <img src="https://github.com/kapposds/csunipi-mobile/blob/master/resources/android/icon/drawable-xxxhdpi-icon.png" width="85" height="85" />

Part of Bachelors Thesis. Hybrid mobile application intended to function as the main mobile app of the Computer Science department of the University of Piraeus, where users (students, professors, staff, interested guests etc) can access department news, members, activities, services and other information. 

The application is only in Greek. Developed with Ionic Framework 1.

## Requirements
* This application communicates with a web **API** to get data and therefore work normally. In order to setup the server side project, visit https://github.com/kapposds/csunipi-api 
* Ionic Framework utilizes **npm** package manager for its dependencies, which comes with **Node.js** version >=6 (visit https://nodejs.org/en/download/) 
* This guide assumes you already have an <u>emulator/real device</u> setup for Android or iOS. Details about **requirements** to **deploy** an Ionic Framework app, can be found on https://ionicframework.com/docs/intro/deploying/ 
* However the app is only tested for android yet. For more information about related requirements (i.e. JDK, Android Studio, Android SDK dependencies) to add a platform and therefore build on **android** visit https://cordova.apache.org/docs/en/latest/guide/platforms/android/ . In most cases its nescessary to install Android SDK Platform Tools, your Android Platform version , Android Support Repository, Google Repository, Google Play Services through SDK Manager.

## Installation
* Open a terminal and type `npm install -g ionic` to install globally Ionic CLI 
  & type `npm install -g cordova@6.5.0`, to install Cordova module (tool that wraps the app into a native container). Use 6.5.0 version for compatibility with the project's plugins
* type `git clone https://github.com/kapposds/csunipi-mobile` to clone the repository
* type `cd csunipi-mobile` to navigate to the project's directory
* type `npm install` to install dependencies 
  * optionally  type `npm update` to update all outdated dependencies, but this could cause problem related to cordova plugins versions.
  
 ## API Endpoint Configuration
 In order for the application communicate with the API, you need to set the Endpoint (in other words the address where the API is served). The default value for the api endpoint is `http://localhost:8000`, if you want to change it do the following:
 * open the file `app.js` located in `www\js` directory
 * replace `http://localhost:8000` ApiEndpoint url value with the address that you are serving the API

## Testing
Substitute `android` for `ios` below to use iOS (only on mac) on the following commands, in order to run on different platforms:

### Add a platform and plugins

* type `ionic cordova platform add android`,
* type `ionic cordova prepare`, to install the required plugins
* type `ionic build android`, to build  and make sure everything went right
  * optionally add `--prod --release` parameters to build or run app for production

Run one of the following commands from the project root, and choose between different ways to run the application:

#### Emulate

* type `ionic cordova emulate android`

#### Run on real device

* type `ionic cordova run android`

#### Serve 
Alternatively you can serve the app to your browser:
* type `ionic serve`

* use --device parameter with the previous commands to specify which will device lanch the app.

## Bug Reports

If you discover bug within CS Unipi Mobile, please send an e-mail to Alexandros Kappos at kapposds@gmail.com.

## License

The current application is licensed under the [MIT license](https://opensource.org/licenses/MIT).
