import  { useContext } from 'react';
import { AuthContext } from '../Pages/Provider/AuthProvider';
import useAxiosSecure from './UseAxiosSecure';
import { useQuery } from 'react-query';

const UseCart = () => {
  const {user, loading} =useContext(AuthContext);

  // const token = localStorage.getItem('access-token')
  const [axiosSecure] = useAxiosSecure();

  const { refetch, data: cart = [] } = useQuery({
    
    enabled: !loading,

    queryFn:async () =>{
      const res = await axiosSecure(`/myCarts?email=${user?.email}`)
          return res.data;
    },
    queryKey: ['cart', user?.email],
  })
  return [cart, refetch];

};

export default UseCart;