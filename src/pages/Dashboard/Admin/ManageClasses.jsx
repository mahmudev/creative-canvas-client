import { useState } from "react";
import useClasses from "../../../hooks/useClasses";
import { FaTrashAlt } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import axios from "axios";
import { baseUrl } from "../../../componets/constant/constant";
import FeedbackModal from "../../../componets/Modal/FeedbackModal";
import useTitle from "../../../hooks/useTitle";

const ManageClasses = () => {
  useTitle("Manage Classes");
  const [isOpen, setIsOpen] = useState(false);
  const [axiosSecure] = useAxiosSecure();
  const [classes] = useClasses();
  const [, , refetch] = useClasses();
  const [feedbackId, setFeedbackId] = useState("");

  const openModal = (feedbackId) => {
    setFeedbackId(feedbackId);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleUpdateStatus = (c, newStatus) => {
    axiosSecure
      .patch(`${baseUrl}/update-classes/${c?._id}`, { status: newStatus })
      .then((response) => {
        const data = response.data;
        if (data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Status Has been updated!",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  const handleSend = (feedbackId, message) => {
    const feedbackData = {
      feedback: message,
    };
    axios
      .patch(`${baseUrl}/send-feedback/${feedbackId}`, feedbackData)
      .then((response) => {
        const data = response.data;
        if (data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Feedback send to user",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

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
        axiosSecure.delete(`/classes/${c._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire("Deleted!", "User has been deleted.", "success");
          }
        });
      }
    });
  };

  return (
    <>
      <div>
        <FeedbackModal
          isOpen={isOpen}
          onClose={closeModal}
          handleSend={handleSend}
          feedbackId={feedbackId}
        />
      </div>
      <div className="w-full container mx-auto flex flex-col min-h-screen">
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Instructor</th>
                <th>Seats</th>
                <th>Total Student</th>
                <th>Class Name</th>
                <th>Price</th>
                <th>Status</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {classes.map((c, index) => (
                <tr key={c?._id}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={c?.image} alt="" />
                      </div>
                    </div>
                  </td>
                  <td>{c?.instructor_name}</td>
                  <td>{c?.available_seats}</td>
                  <td>{c?.total_student}</td>
                  <td>{c?.name}</td>
                  <td className="">${c?.price}</td>
                  <td>
               {c?.status}
                  </td>
                  <td>
                  <div className="flex gap-2">
                    <button
                        className={`btn btn-success ${
                          c?.status === "approved" ? "" : "disabled"
                        }`}
                        onClick={() => handleUpdateStatus(c, "approved")}
                        disabled={c?.status === "approved"}
                      >
                        Approve
                      </button>
                      <button
                        className={`btn btn-danger ${
                          c?.status === "denied" ? "" : "disabled"
                        }`}
                        onClick={() => handleUpdateStatus(c, "denied")}
                        disabled={c?.status === "denied"}
                      >
                        Deny 
                      </button>
                      {c?.status === "denied" && (
                        <button
                        onClick={() => openModal(c?._id)}
                        className="btn btn-warning  text-white"
                      >
                        Send Feedback
                      </button>
                    )}
              
                    <button
                      onClick={() => handleDelete(c)}
                      className="btn btn-ghost bg-red-600 text-white"
                    >
                      <FaTrashAlt></FaTrashAlt>
                    </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ManageClasses;
