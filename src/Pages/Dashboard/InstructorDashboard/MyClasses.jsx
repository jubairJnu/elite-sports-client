import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';

const MyClasses = () => {
  const {user} = useContext(AuthContext);
  const  [myCourses, setMyCourses] = useState([]);

  useEffect(()=>{
    fetch(`http://localhost:5000/instructor/myclass?email=${user?.email}`)
    .then(res => res.json())
    .then(data => console.log(data))
  },[])
  return (
    <div>
      
    </div>
  );
};

export default MyClasses;