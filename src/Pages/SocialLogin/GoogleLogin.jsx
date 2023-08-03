import React, { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';

const GoogleLogin = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const {googleSignUp} = useContext(AuthContext);

  const handleSigInGoogle = () =>{
    googleSignUp()
    .then(result=>{
      const signedUser = result.user;
      console.log(signedUser);
      const savedUser = {image:signedUser.PhotoURL, name:signedUser.displayName, email: signedUser.email, role:"student" }
      fetch('https://elite-sports-server.vercel.app/users',{
          method:'POST',
          headers:{
            'content-type': 'application/json'
          },
          body:JSON.stringify(savedUser)
        })
        .then(res => res.json())
        .then(() =>{
          navigate(from, { replace: true });
          })

     
    })
    .catch(error=>{
      console.log(error);
    })
  
  }

  return (
    <div>
      <div className="divider divider-horizontal"></div>
      <div className="text-center my-4">
        <button onClick={handleSigInGoogle} className="btn btn-circle btn-outline">
          G
        </button>
      </div>
    </div>
  );
};

export default GoogleLogin;