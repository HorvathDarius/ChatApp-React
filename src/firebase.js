import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB4jWvXWavSskySiPUNDg8eJc8w7I6d9nA",
    authDomain: "chat-bde47.firebaseapp.com",
    projectId: "chat-bde47",
    storageBucket: "chat-bde47.appspot.com",
    messagingSenderId: "977812124428",
    appId: "1:977812124428:web:bf1e7ee27697ee5a65cf29",
    measurementId: "G-G37VSB7S5R"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();