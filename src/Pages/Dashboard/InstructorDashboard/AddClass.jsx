import { useContext } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
const img_hosting_token = import.meta.env.VITE_img_upload_token;

const AddClass = () => {
  const { register, handleSubmit, } = useForm();
  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`
  const { user } = useContext(AuthContext);

  const onSubmit = data => {
     const formData = new FormData();
    formData.append('image', (data.image[0]));
    fetch(img_hosting_url, {
      method: 'POST',
      body: formData
    })
      .then(res => res.json())
      .then(responseImage => {
        if (responseImage.success) {
          const imgURL = responseImage.data.display_url;
          const { className, InstName, InstEmail, seats,price } = data;
          const newClass = {className, InstName, InstEmail, seats, price: parseFloat(price), Status: "pending", image: imgURL }
          
          fetch('https://elite-sports-server.vercel.app/class', {
            method: 'POST',
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify(newClass)
          })
          .then(res => res.json())
          
          .then(data => {
            console.log('afeter posting', data.insertedId);
      if(data.insertedId){
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Added Class Successfully',
          showConfirmButton: false,
          timer: 1500
        })
      }
            
          })
         


          
        }
        })

  }



  return (
    <div>
      <h1 className='text-3xl font-semibold text-center text-blue-500'>Add A Class</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-5">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Class Name*</span>
            </label>
            <label className="input-group">
              <input type="text" placeholder="Class Name" {...register("className", { required: true })} className="input input-bordered" />
            </label>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Class Image*</span>
            </label>
            <label className="input-group">
              <input type="file" {...register("image", { required: true })} className="file-input w-full max-w-xs" />
              {/* <input type="text" name='image' placeholder="Image" className="input input-bordered" /> */}
            </label>
          </div>
        </div>
        {/* 2 row */}
        <div className="flex gap-5">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Instructor Name</span>
            </label>
            <label className="input-group">
              <input type="text" defaultValue={user?.displayName} readOnly {...register("InstName", { required: true })} className="input input-bordered" />
            </label>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Instructor Email</span>
            </label>
            <label className="input-group">

              <input type="text"{...register("InstEmail", { required: true })} readOnly defaultValue={user?.email} className="input input-bordered" />
            </label>
          </div>
        </div>
        {/* 3 row */}
        <div className="flex gap-5">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Availbale Seat*</span>
            </label>
            <label className="input-group">
              <input type="number" placeholder="Seats" {...register("seats", { required: true })} className="input input-bordered" />
            </label>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Price*</span>
            </label>
            <label className="input-group">

              <input type="number" {...register("price", { required: true })} placeholder="Price" className="input input-bordered" />
            </label>
          </div>
        </div>
        <div className="form-control mt-6">
          <input className='btn btn-primary' type="submit" value="Add Class" />
        </div>

      </form>

    </div>
  );
};

export default AddClass;