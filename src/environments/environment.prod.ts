const packageJson = require('../../package.json');

export const environment = {
  production: true,
  appVersion: packageJson.version,
  firebase: {
    apiKey: 'AIzaSyBH7gERawUrbt_3Wh7KnhD9Z1JSXyuaUvU',
    authDomain: 'read-later-b98df.firebaseapp.com',
    databaseURL: 'https://read-later-b98df.firebaseio.com',
    projectId: 'read-later-b98df',
    storageBucket: 'read-later-b98df.appspot.com',
    messagingSenderId: '507617627604',
    appId: "1:507617627604:web:2290b054282fe5048ada41"
  }
};
