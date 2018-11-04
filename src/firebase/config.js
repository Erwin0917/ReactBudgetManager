import firebase from "firebase";

var config = {
    apiKey: "AIzaSyALb3L9W7CwmTJgIwBItpURfhQgi-au_HU",
    authDomain: "budget-manager-988bf.firebaseapp.com",
    databaseURL: "https://budget-manager-988bf.firebaseio.com",
    projectId: "budget-manager-988bf",
    storageBucket: "budget-manager-988bf.appspot.com",
    messagingSenderId: "275305586659"
};
const fire = firebase.initializeApp(config);

export const GoogleAuthProvider = new firebase.auth.GoogleAuthProvider();

export default fire;