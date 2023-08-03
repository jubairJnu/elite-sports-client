import { useContext } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import useAxiosSecure from '../../../hooks/UseAxiosSecure';
import { useQuery } from 'react-query';

const MyClasses = () => {
  const { user } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  const { data: myclasses = [], refetch } = useQuery(['myclasses'], async () => {
    const res = await axiosSecure.get(`/instructor/myclass?email=${user?.email}`)
    console.log(res.data)
    return res.data;

  });
  return (
    <div>
      <h2>My Total Class</h2>
    </div>
  );
};

export default MyClasses;