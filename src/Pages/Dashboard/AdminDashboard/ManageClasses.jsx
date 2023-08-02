
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/UseAxiosSecure';
import { useQuery } from 'react-query';

const ManageClasses = () => {
  const [axiosSecure] = useAxiosSecure();
  const { data: classes = [] } = useQuery(['classes'], async () => {
    const res = await axiosSecure.get('/classPending')
    console.log(res.data)
    return res.data;
  });

  const handleApprove = cls => {
    fetch(`http://localhost:5000/classApprove/admin/${cls._id}`,{
      method: 'PATCH'
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        if (data.modifiedCount) {
          
          Swal.fire({
            title: 'The Class Is Approved',
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

  const handleDeny = cls => {
    console.log(cls);
  }

  return (
    <div className='w-full'>
      <h1 className='text-3xl font-semibold text-center'>Manage Classes</h1>
      <h2 className='text-2xl font-semibold'>Total Class:{classes.length} </h2>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead >
            <tr>
              <th> # </th>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              classes?.map((cls, index) => <tr
                key={cls._id}>
                <th>
                  {index + 1}
                </th>
                <td>
                  {cls.className}
                </td>
                <td>
                  {cls.InstEmail}
                </td>
                <td>
                  <div className="flex">

                    {
                      cls.Status == 'approved' ? 'approved' :
                        <button onClick={() => handleApprove(cls)} className="btn  btn-xs bg-emerald-500 text-white">Approve</button>
                    }

                    <button onClick={() => handleDeny(cls)} className="btn  btn-xs ml-5 bg-red-600 text-white">Deny</button>
                  </div>
                </td>
                
              </tr>)
            }


          </tbody>
          {/* foot */}


        </table>
      </div>

    </div>
  );
};

export default ManageClasses;
