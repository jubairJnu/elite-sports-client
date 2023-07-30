
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import app from '../../firebase.config';
import { createContext, useEffect, useState } from "react";


export const AuthContext = createContext();

const auth = getAuth(app);

const AuthProvider = ({children}) => {
  const [user, setuser] = useState(null);
  const [loading, setLoading] = useState(true);

  const SignUP = (email, password) =>{
    setLoading(true)
    return createUserWithEmailAndPassword (auth, email, password);
  }

  const logIn = (email, password) =>{
    setLoading(true)
    return signInWithEmailAndPassword (auth, email,password);
  }

  const logOut =()=>{
    return signOut(auth)
  }
  const updateUserProfile =(name,photo)=>{
    return updateProfile(auth.currentUser, {
       displayName: name, photoURL: photo
     })
     
   }

  useEffect(()=>{
    const unsubscribed = onAuthStateChanged(auth, currentUser=>{   
      setuser(currentUser)
      setLoading(false);    
   });
   return () => {
    unsubscribed();
  }

  },[])

  const authInfo = {
    user,
    loading,
    SignUP,
    logIn,
    logOut,
    updateUserProfile
  }

  return (
    <AuthContext.Provider value={authInfo}>
{children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;