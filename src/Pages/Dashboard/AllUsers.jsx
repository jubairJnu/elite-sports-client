import { FaTrashAlt } from 'react-icons/fa';
import { useQuery } from 'react-query';
import useAxiosSecure from '../../hooks/UseAxiosSecure';
import Swal from 'sweetalert2';
import { useState } from 'react';

const AllUsers = () => {
const [axiosSecure] = useAxiosSecure();
const [isAdmin, setAdmin] = useState(false);
const [isInstructor, setInstructor] = useState(false);
const [isModified, setModified] = useState(false);


  const {data: users = [], refetch} = useQuery(['users'], async () => {
    const res = await axiosSecure.get('/users')
    // console.log(res.data)
    return res.data;
      },
      {
        initialData: [],
      });

  const handleMakeAdmin= user =>{
    fetch(`https://elite-sports-server.vercel.app/users/admin/${user._id}`, {
      method: 'PATCH'
    })
      .then(res => res.json())
      .then(data => {
        if (data.modifiedCount) {
          setAdmin(true)
          setInstructor(false)
          isModified(true);  //disabel button
          refetch();
          Swal.fire({
            title: `${user.name} is an admin now`,
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            }
          })
        }
      })
  }

  const handleMakeInst = user =>{
    fetch(`https://elite-sports-server.vercel.app/users/instructor/${user._id}`, {
      method: 'PATCH'
    })
      .then(res => res.json())
      .then(data => {
        if (data.modifiedCount) {
          setAdmin(false) 
          setInstructor(true)
          setModified(true) //disable system
          refetch();
          Swal.fire({
            title: `${user.name} is an Instructor now`,
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            }
          })
        }
      })
  }

  const handleDelete = user =>{
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {

        fetch(`https://elite-sports-server.vercel.app/users/admin/${user._id}`,{
          method:"DELETE"
        })
          .then(res => res.json())
          .then(data => {
            if (data.deletedCount > 0) {
              refetch()
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
            }
          })

      }
    })
  }

  return (
    <div>
        <h1 className='text-3xl'>Total Users:{users.length} </h1>

<div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead >
      <tr>
        <th> # </th>
        <th>Name</th>
        <th>Email</th>
        <th>Role</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {
        users?.map((user, index) => <tr
          key={user._id}>
          <th>
            {index + 1}
          </th>
          <td>
            {user.name}
          </td>
          <td>
            {user.email}
          </td>
          <td>
            <div className="flex">
              <div>
              {
            user.role == 'admin' ? 'admin' :
              <button disabled={isInstructor || isModified } onClick={() => handleMakeAdmin(user)} className="btn  btn-xs bg-orange-600 text-white">Make Admin</button>
          }
              </div>
              <div>
              {
            user.role == 'instructor' ? 'instructor' :
              <button disabled={isAdmin || isModified} onClick={() => handleMakeInst(user)} className="btn  btn-xs bg-orange-600 text-white">Make Instructor</button>
          }
              </div>
            </div>
          </td>
          <th>
            <button onClick={() => handleDelete(user)} className="btn  btn-xs bg-red-600 text-white"><FaTrashAlt /></button>
          </th>
        </tr>)
      }


    </tbody>
    {/* foot */}


  </table>
</div>

    </div>
  );
};

export default AllUsers;