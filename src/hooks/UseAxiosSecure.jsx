import { useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Pages/Provider/AuthProvider';



const axiosSecure = axios.create({
  baseURL: 'https://elite-sports-server.vercel.app', 
});

const useAxiosSecure = () => {
  const { logOut } = useContext(AuthContext);
  const navigate = useNavigate(); 

 
  useEffect(() => {
    axiosSecure.interceptors.request.use((config) => {
      const token = localStorage.getItem('access-token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
       }
      return config;
    });
    axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          await logOut();
          navigate('/login');
          // Swal.fire({
          //   title: 'Custom animation with Animate.css',
          //   showClass: {
          //     popup: 'animate__animated animate__fadeInDown'
          //   },
          //   hideClass: {
          //     popup: 'animate__animated animate__fadeOutUp'
          //   }
          // })
        }
        return Promise.reject(error);
      }
    );
  }, [logOut, navigate]);

  return [axiosSecure];
};

export default useAxiosSecure;