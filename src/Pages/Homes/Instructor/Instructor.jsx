import React, { useEffect, useState } from 'react';
import InstCard from './InstCard';

const Instructor = () => {
  const [instructors, setInstructors] = useState();
  useEffect(()=>{
    fetch('http://localhost:5000/user/instructor')
    .then(res => res.json())
    .then(data => setInstructors(data))
  },[])
  return (
    <div className='pt-20 grid md:grid-cols-3'>
      {
        instructors?.map(inst => <InstCard
        key={inst._id}
        inst={inst}></InstCard>)
      }
    </div>
  );
};

export default Instructor;