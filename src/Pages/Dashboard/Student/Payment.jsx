import { loadStripe } from "@stripe/stripe-js";
import { Elements } from '@stripe/react-stripe-js';
import  { useContext, useEffect, useState } from 'react';
import CheckOut from './CheckOut';
import { AuthContext } from '../../Provider/AuthProvider';

const stripePromise = loadStripe(`${import.meta.env.VITE_PAYMENT_PK}`); 

const Payment = () => {
  const {user} = useContext(AuthContext);
  const [cart, setCart] = useState([]);
  useEffect(()=>{
    fetch(`http://localhost:5000/myCarts?email=${user?.email}`)
    .then(res => res.json())
    .then(data => setCart(data))
  },[user?.email])
  const total = cart.reduce((sum, item) => item.price + sum, 0);
  // const price = parseFloat(total.toFixed(2))
  return (
    <div className="w-full">
      <h1 className='text-purple-500 text-xl text-center'>Make Payment</h1>
      <Elements stripe={stripePromise}>
        <CheckOut cart={cart} price ={cart?.price} ></CheckOut>
      </Elements>
    </div>
  );
};

export default Payment;