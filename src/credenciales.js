// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZdk9PN5o7molEyooMjNC0x_CegDfdMQg",
  authDomain: "tutorial-react-firebasev-76cb1.firebaseapp.com",
  projectId: "tutorial-react-firebasev-76cb1",
  storageBucket: "tutorial-react-firebasev-76cb1.appspot.com",
  messagingSenderId: "990220925846",
  appId: "1:990220925846:web:747614111bd54f229c7bb7"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);

export default appFirebase;