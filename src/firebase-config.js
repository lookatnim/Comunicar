import { initializeApp } from "firebase/app"
import { getFirestore } from "@firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyAdrs6_QcZttiUdF4fhOieI8NgCl-h_zGA",
    authDomain: "contact-b44bb.firebaseapp.com",
    projectId: "contact-b44bb",
    storageBucket: "contact-b44bb.appspot.com",
    messagingSenderId: "713776627835",
    appId: "1:713776627835:web:e407c3a29d84a70604a2de",
    measurementId: "G-LQBTXJLQPZ"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);