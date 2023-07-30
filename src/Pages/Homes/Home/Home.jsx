
import PopularInsts from "../Instructors/PopularInsts";
import PopularClass from "../PopularClass/PopularClass";
import Carousel from "./Carousel";



const Home = () => {
  return (
    <div>
     <Carousel></Carousel>
     <PopularClass></PopularClass>
     <PopularInsts></PopularInsts>   
    
      
    </div>
  );
};

export default Home;