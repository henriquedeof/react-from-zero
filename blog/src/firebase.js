import app from "firebase/app";
import 'firebase/database';
import 'firebase/auth';
import 'firebase/analytics';
import 'firebase/storage';


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


class Firebase {
    constructor() {
        // Initialize Firebase
        app.initializeApp(firebaseConfig);
        app.analytics();

        //Making this attribute available to the whole application.
        this.app = app.database();
        this.storage = app.storage();
    }

    login(email, password){
        return app.auth().signInWithEmailAndPassword(email, password);
    }

    logout(){
        return app.auth().signOut();
    }

    async register(nome, email, password){
        //When a user is added on the firebase, this user is automatically logged-in.
        await app.auth().createUserWithEmailAndPassword(email, password);
        const uid = app.auth().currentUser.uid;

        //adding 'nome' on firebase
        return app.database().ref('usuarios').child(uid).set({
            nome: nome //'nome' before colon is the field name of the firebase. 'nome' after colon is the parameter of this function.
        });
    }

    isInitialized(){
        return new Promise(resolve => {
           app.auth().onAuthStateChanged(resolve);
        });
    }

    getCurrentUser(){
        // Using the && on the line code below means that "if app.auth().currentUser is true execute the rest of the instruction"
        //If there is a logged user, then return its email.
        return app.auth().currentUser && app.auth().currentUser.email;
    }

    getCurrentUID(){
        return app.auth().currentUser && app.auth().currentUser.uid;
    }

    async getUserName(callback){
        if(!app.auth().currentUser){
            return null;//stop execution of this method
        }

        const uid = app.auth().currentUser.uid;

        //I passed callback as param and now I am setting and returning it back with name in it.
        await app.database().ref('usuarios').child(uid).once('value').then(callback);

    }

}

export default new Firebase();