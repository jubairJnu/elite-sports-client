import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../Provider/AuthProvider";


const Class = ({clas}) => {
  const {user} = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const {image, name, price,Instname, seat, _id} = clas;
  console.log(clas);

  const handleAddToCart = clas => {
    console.log(clas);
    if (user && user.email) {
      const cartItem = {classId:_id,name, image, price, email: user.email}
      fetch('http://localhost:5000/carts',{
        method:'POST',
        headers:{
          'content-type': 'application/json'
        },
        body:JSON.stringify(cartItem)
      })
      .then(res => res.json())
      .then(data => {
        if(data.insertedId){
        
                  Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Added to Cart',
            showConfirmButton: false,
            timer: 1500
          })
        }
      }
       
        )
    }
    else{
      Swal.fire({
        title: 'Please log in to add cart',
               icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Log In'
      }).then((result) => {
        if (result.isConfirmed) {
         navigate('/login',{state:{from:location}})
        }
      })
      
    }
  }


  return (
    <div className="card w-96 bg-base-100 pt-20 shadow-xl">
  <figure className="px-10 pt-10">
    <img src={image} alt="Shoes" className="rounded-xl" />
  </figure>
  <div className="card-body items-center text-center">
    <h2 className="card-title">{name}</h2>
    <p>Insturctor: {Instname}</p>

    <div className='flex items-center text-xl font-medium gap-10'>
   <p>Seats: {seat} </p>
   <p>Price: ${price}</p>


    </div>
    <div className="card-actions">
      <button onClick={()=>handleAddToCart(clas)} className="btn btn-primary">Select</button>
    </div>
  </div>
</div>
  );
};

export default Class;