// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    projectId: 'quizgame-ddf16',
    appId: '1:320310874671:web:8a1fa1e0b0d7a539d1ecda',
    databaseURL: 'https://quizgame-ddf16-default-rtdb.europe-west1.firebasedatabase.app',
    storageBucket: 'quizgame-ddf16.appspot.com',
    locationId: 'europe-west',
    apiKey: 'AIzaSyBglRy3giw_3-56ZAvAWev8w3QClhj9XPs',
    authDomain: 'quizgame-ddf16.firebaseapp.com',
    messagingSenderId: '320310874671',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
