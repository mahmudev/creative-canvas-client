import React from "react";
import useCart from "../../../hooks/useCart";
import { FaTrashAlt } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import useTitle from "../../../hooks/useTitle";

const Cart = () => {
  useTitle("Cart");
  const [axiosSecure] = useAxiosSecure();
  const [cart, refetch] = useCart();
  const total = cart.reduce((sum, item) => item?.price + sum, 0);

  const handleDelete = (c) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/enrolls/${c._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
          }
        });
      }
    });
  };
  return (
    <>
      <div className="w-full container mx-auto flex flex-col min-h-screen">
        {cart?.length ? (
          <>
            <div className="uppercase font-semibold h-[60px] flex justify-evenly items-center">
              <h3 className="text-3xl">Total Items: {cart?.length}</h3>
              <h3 className="text-3xl">Total Price: ${total}</h3>
            </div>
            <div className="overflow-x-auto w-full">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Image</th>
                    <th>Instructor Email</th>
                    <th>Class Name</th>
                    <th>Price</th>
                    <th>Payment</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((c, index) => (
                    <tr key={c?._id}>
                      <td>{index + 1}</td>
                      <td>
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              src={c?.image}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                      </td>
                      <td>{c?.email}</td>
                      <td>{c?.name}</td>
                      <td className="">${c?.price}</td>
                      <td className="">
                        <Link to={`/dashboard/payment/${c?._id}`}>
                          <button className="btn btn-warning btn-sm">
                            PAY
                          </button>
                        </Link>
                      </td>
                      <td>
                        <button
                          onClick={() => handleDelete(c)}
                          className="btn btn-ghost bg-red-600  text-white"
                        >
                          <FaTrashAlt></FaTrashAlt>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <div className="flex justify-center items-center min-h-screen">
            <h3 className="text-3xl text-center">Selected Classes is empty.</h3>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
