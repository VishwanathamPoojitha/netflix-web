
import { initializeApp } from "firebase/app";

import { addDoc, collection, getFirestore } from "firebase/firestore";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyAbHRknvLXQaCEcYLAgFvQY8K4UBXueqdA",
  authDomain: "netflix-clone-b1dcc.firebaseapp.com",
  projectId: "netflix-clone-b1dcc",
  storageBucket: "netflix-clone-b1dcc.firebasestorage.app",
  messagingSenderId: "351402837837",
  appId: "1:351402837837:web:da3cb93c631b1db1d69904",
  measurementId: "G-DTDEYTBC8W"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore()

const signUp = async(name,email,password)=>{
    try {
        const res = await createUserWithEmailAndPassword(auth , email , password)
        const user = res.user
        await addDoc(collection(db,"user"),{
            uid:user.uid,
            name,
            authProvider:"local",
            email,

        })
    } catch (error) {
        console.log(error)
        toast.error(error.code.split('/')[1].split('-').join(" "))
    }
}

const login = async(email,password)=>{
   try {
        await signInWithEmailAndPassword(auth,email,password)
   } catch (error) {
      console.log(error)
      toast.error(error.code.split('/')[1].split('-').join(" "))
   }
}
const logout = ()=>{
    signOut(auth)
}

export {auth,db,login,signUp,logout}