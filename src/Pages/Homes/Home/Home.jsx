
import Faq from "../FAQ/Faq";
import PopularInsts from "../Instructors/PopularInsts";
import PopularClass from "../PopularClass/PopularClass";
import Carousel from "./Carousel";



const Home = () => {
  return (
    <div>
     <Carousel></Carousel>
     <PopularClass></PopularClass>
     <PopularInsts></PopularInsts>  
     <Faq></Faq> 
    
      
    </div>
  );
};

export default Home;