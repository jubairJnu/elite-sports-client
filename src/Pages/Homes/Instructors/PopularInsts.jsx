import { useEffect, useState } from 'react';
import Inst from './Inst';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import the AOS styles

const PopularInsts = () => {
  useEffect(() => {
    // Initialize AOS when the component mounts
    AOS.init({ duration: 800 });
  }, []);

  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/popularinst')
      .then(res => res.json())
      .then(data => setInstructors(data));
  }, []);

  return (
    <div>
      <div className="w-1/3 mx-auto">
        <h1
          data-aos="fade-up"
          data-aos-duration="1500"
          className="text-3xl font-semibold text-center bordr border-b-2 border-slate-500 p-5"
        >
          Popular Instruction
        </h1>
      </div>
      <div className="grid md:grid-cols-3 gap-5">
        {instructors.map(inst => (
          <div
            key={inst._id}
            data-aos="zoom-in-left"
            data-aos-duration="1200"
            // Apply the AOS attributes to the child element you want to animate (e.g., the <Inst> component)
          >
            <Inst inst={inst} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularInsts;
