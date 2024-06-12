import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";

import dotenv from 'dotenv';

dotenv.config();
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: "mombabymilk-inventory.firebaseapp.com",
  projectId: "mombabymilk-inventory",
  storageBucket: "mombabymilk-inventory.appspot.com",
  messagingSenderId: "355943726006",
  appId: "1:355943726006:web:2b834a23ed34989dc75f17"
};

const app = initializeApp(firebaseConfig);
const imageDb = getStorage(app);
export  {imageDb} 