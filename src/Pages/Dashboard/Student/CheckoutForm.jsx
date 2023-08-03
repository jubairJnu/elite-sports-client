import {CardElement, useElements, useStripe} from '@stripe/react-stripe-js';
import './CheckOut.css'
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import useAxiosSecure from '../../../hooks/UseAxiosSecure';
const CheckoutForm = ({cart, price}) => {
  const {user} = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [transjectionId, setTrasjectionId] = useState('');

  useEffect(()=>{
    // fetch url payment
   if(price>0){
    axiosSecure.post('/create-payment-intent', {price})
    .then(res =>{
      console.log(res.data.clientSecret)
      setClientSecret(res.data.clientSecret)
    })
   }

  },[])

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      console.log('[error]', error);
      setCardError(error.message)
    } else {
      console.log('[PaymentMethod]', paymentMethod);
    }

    // confirm Card

    const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.disPlayName || 'annonymous',
            email: user?.email || 'annonymous',
          },
        },
      },
    );
    if (confirmError) {
      console.log('[error]', confirmError);
      setCardError(confirmError.message)
    } else {
      console.log('[paymentIntent]', paymentIntent);
      if(paymentIntent.status === 'succeeded'){
        setTrasjectionId(paymentIntent.id)
        // const transjectionId =paymentIntent.id;
        const paymentInfo ={
          email: user?.email,
          transjectionId: paymentIntent.id,
          data: new Date(),
          price,
          quantity: cart.length,
          items: cart.map(item=> item._id),
          ClassItem: cart.map(item => item.classId),
          itemName: cart.map(item=> item.name)
        }
        axiosSecure.post('/payment', paymentInfo)
        .then(res=>{
          console.log(res.data);
          if(res.data.result.deletedResult){
            // 
          }

        })
      }
    }

  };

  return (
   <div className='w-full '>
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <button className='btn btn-primary mt-4' type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
    {cardError && <p className='text-red-600 ml-8'>{cardError}</p>}
    {transjectionId && <p className='text-green-500'>Transjection successfully with TrxId {transjectionId} </p>}
   </div>
  );
};

export default CheckoutForm;