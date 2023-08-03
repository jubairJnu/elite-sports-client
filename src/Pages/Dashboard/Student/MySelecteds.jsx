import { useQuery } from "react-query";
import useAxiosSecure from "../../../hooks/UseAxiosSecure";
import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";

const MySelecteds = () => {
  const { user } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  const { data: selecteds = [], refetch } = useQuery(['selecteds'], async () => {
    const res = await axiosSecure.get(`/myCarts?email=${user?.email}`)
    // console.log(res.data)
    return res.data;
  },
    {
      initialData: [],
    });
  const total = selecteds.reduce((sum, item) => sum + parseFloat(item.price), 0);

  const handleDelete = selected => {
    console.log(selected);
  }


  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold text-center text-blue-500">My Selected Classes</h1>
      <div className="flex justify-between items-center">
      <h1 className="text-3xl">Total Selected:{selecteds.length} </h1>
      <h1 className="text-3xl">Total Amount:{total} </h1>
      <div>
        <Link to='/dashboard/payment'><button className="btn btn-sm btn-primary">Pay</button></Link>
      </div>
      </div>
      {/* show data in table */}

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead >
            <tr>
              <th> # </th>
              <th>Image</th>
              <th>Class Name</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              selecteds?.map((selected, index) => <tr
                key={selected._id}>
                <th>
                  {index + 1}
                </th>
                <td>
                  <div className="mask mask-squircle w-12 h-12">
                    <img src={selected.image} alt="Class Image" />
                  </div>

                </td>
                <td>
                  {selected.className}
                </td>
                <td>
                  ${selected.price}
                </td>
                <th>
                  <div className="flex items-center gap-10">

                    <div>
                      <button onClick={() => handleDelete(selected)} className="btn  btn-sm bg-red-600 text-white"><FaTrashAlt /></button>
                    </div>
                  </div>
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

export default MySelecteds;