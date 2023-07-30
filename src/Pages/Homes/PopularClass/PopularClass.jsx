import { useEffect, useState } from "react";
import PopularOne from "./PopularOne";
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import the AOS styles

const PopularClass = () => {
  useEffect(() => {
    // Initialize AOS when the component mounts
    AOS.init({ duration: 800 });
  }, []);
  const [populars, setPopulars] = useState([]);

  useEffect(()=>{
    fetch('http://localhost:5000/popular')
    .then(res => res.json())
    .then(data => setPopulars(data))
  },[])
  return (
    <div>
    <div className="w-1/3 mx-auto">
    <h1 className="text-3xl font-semibold text-center bordr border-b-2 border-slate-500 p-5">Popular Classe</h1>
    </div>
    <div  className="grid md:grid-cols-3 gap-5">
      {
        populars.map(popular => <div
                  key={popular._id}
                  data-aos="zoom-in-right"
                  data-aos-duration="1200"
                  >
       
          <PopularOne  popular={popular}>
        </PopularOne>
         </div> )
      }
    </div>
      
    </div>
  );
};

export default PopularClass;