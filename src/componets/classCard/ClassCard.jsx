import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../componets/constant/constant";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import useCart from "../../hooks/useCart";

const ClassCard = ({ c }) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [, refetch] = useCart();

  const handleAddToCart = (c) => {
    const { _id, name, price, image } = c;
    if (user && user?.email) {
      const cartItem = {
        classId: _id,
        name,
        image,
        price,
        email: user.email,
      };
      axios
        .post(`${baseUrl}/enrolls`, cartItem, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          const data = response.data;
          if (data.insertedId) {
            refetch();
            toast.success("Item added to cart");
          }
        });
    } else {
      Swal.fire({
        title: "Please login to enroll this class",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login now!",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { from: location } });
        }
      });
    }
  };

  return (
    <div
      className={`${
        c?.available_seats == 0 ? "bg-error" : "bg-white"
      } w-full max-w-md mx-auto rounded-xl shadow-xl overflow-hidden`}
    >
      <div className="max-w-md mx-auto">
        <div
          className="h-[236px]"
          style={{
            backgroundImage: `url(${c.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
        <div className="px-4 sm:px-6 py-2">
          <div className="mt- h-[180px] justify-between flex flex-col ">
            <div className="justify-around flex flex-col">
              <div>
                <h1 className="text-md font-bold text-gray-900">{c?.name}</h1>
              </div>
            </div>
            <div>
              <div className="mt-2">
                <h1 className="text-sm  text-gray-700">
                  Instructor: {c?.instructor_name}
                </h1>
                <h1 className="text-sm  text-gray-700">
                  Total student:   {c?.total_student == 0 ? (
    <span>0</span>
  ) : (
    <span>{c?.total_student}</span>
  )}
                </h1>
                {c?.available_seats == 0 ? (
                  <h1 className="text-sm mt-1 text-gray-900">
                    <span className="text-sm mt-1 text-gray-900">
                      Available Seats:
                    </span>
                    No seat left
                  </h1>
                ) : (
                  <h1 className="text-sm mt-1 text-gray-900">
                    Available Seats: {c?.available_seats}
                  </h1>
                )}
              </div>
              <div className="mt-3 flex items-end justify-between">
                <div>
                  <p className="text-lg font-bold text-blue-500">
                    Price: ${c?.price}
                  </p>
                </div>

                {c?.available_seats == 0 ? (
                  <div className="flex items-center space-x-1.5 rounded-lg btn btn-primary px-4 py-1.5 text-white duration-100 opacity-50 cursor-not-allowed">
                    <button disabled className="text-sm">
                      Enroll Now
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleAddToCart(c)}
                    className="btn btn-primary"
                  >
                    Enroll Now
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassCard;
