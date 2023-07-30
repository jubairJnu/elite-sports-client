import{ useEffect, useState } from 'react';
import Inst from './Inst';

const PopularInsts = () => {
  const [instructors , setInstructors] = useState([]);


  useEffect(()=>{
    fetch('http://localhost:5000/popularinst')
    .then(res => res.json())
    .then(data => setInstructors(data))
  },[])

  return (
    <div>
      <div className="w-1/3 mx-auto">
    <h1 className="text-3xl font-semibold text-center bordr border-b-2 border-slate-500 p-5">Popular Instruction</h1>
    </div>
    <div className="grid md:grid-cols-3 gap-5">
      {
        instructors.map(inst => <Inst
        key={inst._id}
        inst={inst}></Inst>)
      }
    </div>
      
    </div>
  );
};

export default PopularInsts;