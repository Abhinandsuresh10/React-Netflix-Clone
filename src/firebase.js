
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth/cordova";
import { addDoc, collection, getFirestore } from "firebase/firestore/lite";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyCtTRqcCJwv6ooEox1gYGiEqjz3qGFPeGQ",
  authDomain: "netflix-clone-28344.firebaseapp.com",
  projectId: "netflix-clone-28344",
  storageBucket: "netflix-clone-28344.firebasestorage.app",
  messagingSenderId: "787975309119",
  appId: "1:787975309119:web:9c093eff3befb9a031358a"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


const signup = async (name, email, password) => {
      try {
       const res =  await createUserWithEmailAndPassword(auth, email, password);
       const user = res.user;
       await addDoc(collection(db, "user"), {
        uid: user.uid,
        name,
        authProvider: "local",
        email,
       });
      } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(' '));
      }
}

const login = async (email, password) => {
    try {
       await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
        console.log(error)
        toast.error(error.code.split('/')[1].split('-').join(' '));
    }
}

const logout = async () => {
    signOut(auth);
}


export {auth, db, login, signup, logout}