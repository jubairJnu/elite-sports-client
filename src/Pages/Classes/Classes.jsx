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
    <div>
      {
        classes.map(clas => <Class
          key={clas._id}
          clas={clas}></Class>)
      }
    </div>
  );
};

export default Classes;