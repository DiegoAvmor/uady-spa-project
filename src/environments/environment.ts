// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  log: {
    debug: true,
  },
  host: 'http://127.0.0.1:4200',
  api: {
    jikan: {
      url: "https://api.jikan.moe/v4",
    },
    auth: {
      url: "http://localhost:8080/api",
    },
    qr: {
      url: "https://api.qrserver.com/v1",
    },
    contactemailReceiver: {
      email: "assertdominanceproject@gmail.com",
      pass: "AssertDom123!#@",
    }, 
    contactemailSender: {
      email: "assertdominance.noreply@gmail.com",
      pass: "Testpass12345!@#",
    }
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
