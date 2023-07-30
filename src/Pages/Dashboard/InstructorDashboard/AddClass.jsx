import  { useContext } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import Swal from 'sweetalert2';

const AddClass = () => {

  const { user } = useContext(AuthContext);


  const handleAddClass = event =>{
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const image = form.image.value;
    const Instname = form.Instname.value;
    const InstEmail = form.InstEmail.value;
    const seat = form.seat.value;
    const price = form.price.value;
    const newClass = {name, image, Instname, InstEmail, seat, price, Status: "pending"}
    console.log(newClass);
    fetch('http://localhost:5000/class',{
      method:'POST',
      headers:{
        'content-type': 'application/json'
      },
      body: JSON.stringify(newClass)
    })
    .then(res => res.json())
    .then(data =>{
      if(data.insertedId){
        Swal.fire({
          title: 'Success!',
          text: 'Class Added Successfully',
          icon: 'success',
          confirmButtonText: 'Ok'
        })
      }
      
    })
  }

  return (
    <div>
      <h1 className='text-3xl font-semibold text-center text-blue-500'>Add A Class</h1>

      <form onSubmit={handleAddClass}>
        <div className="flex gap-5">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Class Name*</span>
            </label>
            <label className="input-group">
              <input type="text" placeholder="Class Name" name='name' required className="input input-bordered" />
            </label>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Class Image</span>
            </label>
            <label className="input-group">

              <input type="text" name='image' placeholder="Image" className="input input-bordered" />
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
              <input type="text" defaultValue={user?.displayName} readOnly name='Instname' required className="input input-bordered" />
            </label>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Instructor Email</span>
            </label>
            <label className="input-group">

              <input type="text" name='InstEmail' readOnly defaultValue={user?.email} className="input input-bordered" />
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
              <input type="number" placeholder="Seats" name='seat' required className="input input-bordered" />
            </label>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Price</span>
            </label>
            <label className="input-group">

              <input type="number" name='price' placeholder="Price" className="input input-bordered" />
            </label>
          </div>
        </div>
        <div className="form-control mt-6">
          <input className='btn btn-primary' type="submit" value="Add Class" />
        </div>

      </form>


      {/* <input
      type="text"
      placeholder="Class Title"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
    />
    <textarea
      placeholder="Class Description"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
    />
    <button onClick={handleAddClass}>Add Class</button> */}
    </div>
  );
};

export default AddClass;