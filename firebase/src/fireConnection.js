import firebase from "firebase/app";
import 'firebase/database';
import 'firebase/auth';
import 'firebase/analytics';

let firebaseConfig = {
    apiKey: "AIzaSyCOHw-DbJybCO6NxADFD-418W5GKUbeWk4",
    authDomain: "reacthenrique-c08dc.firebaseapp.com",
    databaseURL: "https://reacthenrique-c08dc.firebaseio.com",
    projectId: "reacthenrique-c08dc",
    storageBucket: "reacthenrique-c08dc.appspot.com",
    messagingSenderId: "71354316549",
    appId: "1:71354316549:web:ec58f0d43b9e2d9a64296c",
    measurementId: "G-GN7EQ4FQYS"
};
// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
firebase.analytics();

export default firebase;