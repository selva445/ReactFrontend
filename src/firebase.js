import * as firebase from "firebase";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDfCRYVjoRtaK6k8xMXo3OlLdXVbtExLRg",
  authDomain: "ecommerce-b6036.firebaseapp.com",
  projectId: "ecommerce-b6036",
  storageBucket: "ecommerce-b6036.appspot.com",
  messagingSenderId: "561404599572",
  appId: "1:561404599572:web:4d95d391ff1e281a3b3601"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// export
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
