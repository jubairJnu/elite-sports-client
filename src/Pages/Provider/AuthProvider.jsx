
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from '../../firebase.config';
import { createContext, useEffect, useState } from "react";


export const AuthContext = createContext();

const auth = getAuth(app);

const AuthProvider = ({children}) => {
  const [user, setuser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState('student')
  const googleProvider = new GoogleAuthProvider();

  const SignUP = (email, password) =>{
    setLoading(true)
    return createUserWithEmailAndPassword (auth, email, password);
  }
 
  const googleSignUp =()=>{
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
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
      if(currentUser){
        setUserRole(currentUser.role || 'student')
      }
      else{
        setUserRole('student')
      }
      setLoading(false);    
   });
   return () => {
    unsubscribed();
  }

  },[])

  const authInfo = {
    user,
    loading,
    userRole,
    SignUP,
    googleSignUp,
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