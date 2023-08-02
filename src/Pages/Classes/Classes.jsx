import { useEffect, useState } from 'react';
import Class from './Class';

const Classes = () => {
  const [classes, setClasses] = useState([]);

  useEffect(()=>{
    fetch('http://localhost:5000/classApproved')
    .then(res => res.json())
    .then(data => setClasses(data));
  },[])

  return (
    <div >
    <div className='grid md:grid-cols-3 gap-6 pt-20'>
    {
        classes.map(clas => <Class
          key={clas._id}
          clas={clas}></Class>)
      }
    </div>
    </div>
  );
};

export default Classes;