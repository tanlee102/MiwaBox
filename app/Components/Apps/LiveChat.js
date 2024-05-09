import React from 'react'

import firebase, { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyCkIvp8D10dn-z1pQdPODLTZRATUIN_yZg",
  authDomain: "hfc-one-piece.firebaseapp.com",
  projectId: "hfc-one-piece",
  storageBucket: "hfc-one-piece.appspot.com",
  messagingSenderId: "1070422132043",
  appId: "1:1070422132043:web:0f5b5e9a018d85001454ce",
  measurementId: "G-MPX0P5W9S0"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();



const LiveChat = () => {
  return (
    <div>
      
    </div>
  )
}

export default LiveChat