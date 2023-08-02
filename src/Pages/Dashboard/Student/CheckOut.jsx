import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useContext, useEffect } from 'react';
import { useState } from 'react';
import useAxiosSecure from '../../../hooks/UseAxiosSecure';
import { AuthContext } from '../../Provider/AuthProvider';


const CheckOut = ({cart, price }) => {
  const [axiosSecure] = useAxiosSecure();
  const stripe = useStripe();
  const elements = useElements();
  const {user} = useContext(AuthContext);
  const [cardError, setCardError] = useState('')
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const [transjectionId, setTrasjectionId] = useState('');

  useEffect(() => {
    axiosSecure.post('/create-payment-intent',  {price} )
      .then(res => {
        console.log(res.data.clientSecret);
        setClientSecret(res.data.clientSecret);
      })
  }, [price, axiosSecure]);


  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });
    if (error) {
      setCardError(error.message)
      console.log('card error', error)
    }
    else {
      setCardError('')
      console.log('paymentMethod', paymentMethod)
    }
setProcessing(true);
    const {paymentIntent, error:confirmCardError} = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || 'annonymous',
            email: user?.email || 'annonymous'
          },
        },
      },
    );
    if(confirmCardError){
console.log(confirmCardError)
    }
setProcessing(false)
    console.log(paymentIntent);
    if(paymentIntent.status.succeeded){
      setTrasjectionId(paymentIntent.id)
      // const transjectionId =paymentIntent.id;
      const payment ={
        email: user?.email,
        transjectionId: paymentIntent.id,
        price,
        quantity: cart.length,
        items: cart.map(item=> item._id),
        itemName: cart.map(item=> item.name)
      }
      axiosSecure.post('/payment', payment)
      .then(res=>{
        console.log(res.data);
      })
    }

  }
  return (
    <div>
      <form className='m-10 w-2/3' onSubmit={handleSubmit}>
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
        <button className='btn btn-primary btn-sm mt-5' type="submit" disabled={!stripe || !clientSecret || processing}>
          Pay
        </button>
      </form>
      {cardError && <p className='text-red-600'>{cardError} </p>}
      {transjectionId && <p className='text-green-500'>Transjection successfully with TrxId {transjectionId} </p>}
    </div>
  );
};

export default CheckOut;