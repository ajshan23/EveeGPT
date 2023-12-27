import {initializeApp} from "firebase/app"
import {getAnalytics} from "firebase/analytics"


const firebaseConfig = {
    apiKey: "AIzaSyBeTll06CxUxTKYe8kkBhFAg875kec5Y1M",
    authDomain: "eveegpt.firebaseapp.com",
    projectId: "eveegpt",
    storageBucket: "eveegpt.appspot.com",
    messagingSenderId: "952423566741",
    appId: "1:952423566741:web:474a071a72af221ebdba9c",
    measurementId: "G-NKBZJEGBLY"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);