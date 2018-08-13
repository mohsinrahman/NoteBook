import firebase from 'firebase';



// Initialize Firebase
var config = {
  apiKey: "AIzaSyD8e8GZUPlkgWToMZVMoMG7AM9SwJmCxig",
  authDomain: "note-book-d898c.firebaseapp.com",
  databaseURL: "https://note-book-d898c.firebaseio.com",
  projectId: "note-book-d898c",
  storageBucket: "",
  messagingSenderId: "348249176758"
};

firebase.initializeApp(config);


export default firebase;
