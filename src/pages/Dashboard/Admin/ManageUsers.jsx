import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { baseUrl } from "../../../componets/constant/constant";
import useTitle from "../../../hooks/useTitle";

const ManageUsers = () => {
  useTitle("Manage Users");
  const [axiosSecure] = useAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["all-users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-users");
      return res.data;
    },
  });

  const handleUpdateStatus = (user, newRole) => {
    axiosSecure
      .patch(`${baseUrl}/users/admin/${user?._id}`, { role: newRole })
      .then((response) => {
        const data = response.data;
        if (data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "center",
            icon: "success",
            title: `${user?.name} is now ${newRole}`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  const handleMakeAdmin = (user) => {
    handleUpdateStatus(user, "admin");
  };

  const handleMakeInstructor = (user) => {
    handleUpdateStatus(user, "instructor");
  };

  const handleDelete = (user) => {
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
        axiosSecure.delete(`/users/${user._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
          }
        });
      }
    });
  };

  return (
    <div className="w-full container mx-auto flex flex-col min-h-screen">
      <h3 className="text-3xl font-semibold my-4">
        Total Users: {users.length}
      </h3>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <div className="flex">
                    <button
                      onClick={() => handleMakeAdmin(user)}
                      className={`btn btn-ghost bg-blue-600 text-white ${
                        user.role === "admin" ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                      disabled={user.role === "admin"}
                    >
                      Make Admin
                    </button>
                    <button
                      onClick={() => handleMakeInstructor(user)}
                      className={`btn btn-ghost ml-3 bg-green-600 text-white ${
                        user.role === "instructor" ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                      disabled={user.role === "instructor"}
                    >
                      Make Instructor
                    </button>
                  </div>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(user)}
                    className="btn btn-ghost bg-red-600 text-white"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
