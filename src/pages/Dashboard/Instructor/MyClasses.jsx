import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { AiFillMessage } from "react-icons/ai";
import ViewFeedbackModal from "../../../componets/Modal/ViewFeedbackModal";
import { baseUrl } from "../../../componets/constant/constant";
import useTitle from "../../../hooks/useTitle";

const MyClasses = () => {
  useTitle("My Classes");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState("");
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();

  const openModal = (feedback) => {
    setSelectedFeedback(feedback);
    setIsOpen(true);
  };

  const closeModal = () => {
    setSelectedFeedback("");
    setIsOpen(false);
  };

  const { data: classes = [] } = useQuery({
    queryKey: ["class-by-instructor"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `${baseUrl}/class-by-instructor?email=${user?.email}`
      );
      return res.data;
    },
  });

  return (
    <>
      <ViewFeedbackModal
        isOpen={isOpen}
        feedback={selectedFeedback}
        onClose={closeModal}
      />
      <div className="w-full  container mx-auto flex flex-col min-h-screen">
        <div className="uppercase font-semibold h-[60px] flex justify-evenly items-center"></div>
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Instructor</th>
                <th>Seats</th>
                <th>Total Students</th>
                <th>Class Name</th>
                <th>Price</th>
                <th>Status</th>
                <th>Feedback</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {classes.map((c, index) => (
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
                  <td>{c?.instructor_name}</td>
                  <td>{c?.available_seats}</td>
                  <td>{c?.total_student}</td>
                  <td>{c?.name}</td>
                  <td className="">${c?.price}</td>
                  <td className="">{c?.status}</td>
                  <td>
                    {c?.feedback ? (
                      <button
                        onClick={() => openModal(c?.feedback)}
                        className="btn text-2xl btn-ghost"
                      >
                        <AiFillMessage></AiFillMessage>
                      </button>
                    ) : (
                      ""
                    )}
                  </td>
                  <td className=""><button className="btn btn-warning">Update</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default MyClasses;
