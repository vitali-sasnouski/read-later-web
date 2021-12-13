const packageJson = require('../../package.json');

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  appVersion: packageJson.version + '-dev',
  firebase: {
    apiKey: "AIzaSyBN2Sqrg4BJq4htAzMzgBq4OU2m-t3AE8k",
    authDomain: "read-later-dev.firebaseapp.com",
    databaseURL: "https://read-later-dev.firebaseio.com",
    projectId: "read-later-dev",
    storageBucket: "read-later-dev.appspot.com",
    messagingSenderId: "550748117995",
    appId: "1:550748117995:web:8825000c788e5f58fe57ae"    
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
