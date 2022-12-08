// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDs-Cykh10wMchUKhaMhA__tM5-FImMnhw",
  authDomain: "markdown-editor-cbaba.firebaseapp.com",
  projectId: "markdown-editor-cbaba",
  storageBucket: "markdown-editor-cbaba.appspot.com",
  messagingSenderId: "121820578310",
  appId: "1:121820578310:web:c4e9a2214928f1de90f987"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export default app