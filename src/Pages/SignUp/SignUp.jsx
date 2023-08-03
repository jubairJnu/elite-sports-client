import { Link, useNavigate } from 'react-router-dom';
import loginImg from '../../assets/login.jpg';
import { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import Swal from 'sweetalert2';
import GoogleLogin from '../SocialLogin/GoogleLogin';

const SignUp = () => {
const navigate = useNavigate();
  const {updateUserProfile, SignUP} = useContext(AuthContext);

  const handleSignUp = event =>{
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const confirm = form.confirm.value;
    const photo = form.photo.value;
    console.log(name, email, password, confirm, photo);
    // firebase sign up

    SignUP(email, password)
    .then(result =>{
      const signedUser = result.user;
      console.log(signedUser)
      updateUserProfile(name,photo)
      .then(()=>{
        const savedUser = {image: photo, name:name, email: email, role:"student" }
        fetch('https://elite-sports-server.vercel.app/users',{
          method:'POST',
          headers:{
            'content-type': 'application/json'
          },
          body:JSON.stringify(savedUser)
        })
        .then(res => res.json())
        .then(data =>{
          if(data.insertedId){
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Registered Successfully',
              showConfirmButton: false,
              timer: 1500
            })
            navigate('/')
          }
        })
      })
      
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
        <h1 className="text-5xl font-bold text-center">Sign Up!</h1>
        {/* ---form-- */}
         <form onSubmit={handleSignUp} >
         <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input type="name"  name='name' placeholder="name" className="input input-bordered"  required/>
          </div>
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
          <div className="form-control">
            <label className="label">
              <span className="label-text">Confirm Password</span>
            </label>
            <input type="password" name='confirm' placeholder="confirm password" className="input input-bordered"  required/>          
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Photo URL</span>
            </label>
            <input type="text" name='photo' placeholder="Photo URL" className="input input-bordered"  required/>          
          </div>
          <div className="form-control mt-6">
            <input className='btn btn-primary' type="submit" value="Sign Up" />
          </div>
         </form>
         <p><small>Already Have An Account <Link to='/login'> Login</Link></small></p>
        </div>
        <GoogleLogin></GoogleLogin>
      </div>
    </div>
  </div>
  );
};

export default SignUp;