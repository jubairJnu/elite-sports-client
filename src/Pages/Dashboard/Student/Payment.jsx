import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import { loadStripe } from '@stripe/stripe-js';
import UseCart from '../../../hooks/UseCart';

const stripePromise = loadStripe(`${import.meta.env.VITE_PAYMENT_PK}`);

const Payment = () => {
  const [cart] = UseCart();
  const total = cart.reduce((sum, item) => sum + parseFloat(item.price), 0);
  const price = parseFloat(total.toFixed(2));

  return (
    <div className="w-full">
      <h1 className='text-purple-500 text-xl text-center'>Make Payment</h1>
      <Elements stripe={stripePromise}>
        <CheckoutForm cart={cart} price={price}></CheckoutForm>
      </Elements>
    </div>
  );
};

export default Payment;
