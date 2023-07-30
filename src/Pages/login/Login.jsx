import { Link } from 'react-router-dom';
import loginImg from '../../assets/login.jpg';
import { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';

const Login = () => {
  const {logIn} = useContext(AuthContext);

  const handleLogin = event =>{
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
    logIn(email, password)
    .then(result =>{
      const loggedUser = result.user;
      console.log(loggedUser);
    })
    .catch(error=>{
      console.log(error);
    })
  }

  return (
    <div className="hero min-h-screen bg-base-200">
    <div className="hero-content flex-col lg:flex-row">
      <div className="text-center lg:text-left">
        
       <img className='w-[400px] rounded-md' src={loginImg} alt="" />
      </div>
      <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <div className="card-body">
        <h1 className="text-5xl font-bold">Login now!</h1>
        {/* ---form-- */}
         <form onSubmit={handleLogin} >
         <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input type="email"  name='email' placeholder="email" className="input input-bordered"  required/>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input type="password" name='password' placeholder="password" className="input input-bordered"  required/>
          
          </div>
          <div className="form-control mt-6">
            <input className='btn btn-primary' type="submit" value="Login" />
          </div>
         </form>
         <p><small>New to elite sports <Link to='/signup'> Sign Up</Link></small></p>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Login;