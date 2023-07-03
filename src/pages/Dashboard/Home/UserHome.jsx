import React from "react";
import useAdmin from "../../../hooks/useAdmin";
import useInstructor from "../../../hooks/useInstructor";
import useAuth from "../../../hooks/useAuth";
import usePaymentHistory from "../../../hooks/usePaymentHistory";
import useCart from "../../../hooks/useCart";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { baseUrl } from "../../../componets/constant/constant";
import useTitle from "../../../hooks/useTitle";

const UserHome = () => {
  useTitle("User Home");
  const [axiosSecure] = useAxiosSecure();
  const [isAdmin] = useAdmin();
  const [isInstructor] = useInstructor();
  const { user } = useAuth();
  const [paymentHistory] = usePaymentHistory();
  const [cart] = useCart();

  const { data: users = [] } = useQuery({
    queryKey: ["all-users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-users");
      return res.data;
    },
  });

  const { data: classes = [] } = useQuery({
    queryKey: ["class-by-instructor"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `${baseUrl}/class-by-instructor?email=${user?.email}`
      );
      return res.data;
    },
  });

  const sumTotalStudent = classes.reduce((sum, c) => sum + c?.total_student, 0);

  return (
    <div>
      {isAdmin && (
        <>
          <h1 className="text-center font-bold text-2xl my-10">
            Welcome back, {user?.displayName}
          </h1>
          <div className="flex  justify-center items-center">
            <div className="stats stats-vertical lg:stats-horizontal shadow">
              <div className="stat">
                <div className="stat-title">Total Enrolled</div>
                <div className="stat-value">{sumTotalStudent}</div>
              </div>
              <div className="stat">
                <div className="stat-title">Total Users</div>
                <div className="stat-value">{users?.length}</div>
              </div>
              <div className="stat">
                <div className="stat-title">Total Classes</div>
                <div className="stat-value">{classes?.length}</div>
              </div>
            </div>
          </div>
        </>
      )}

      {isInstructor && (
        <>
          <h1 className="text-center font-bold text-2xl my-10">
            Welcome back, {user?.displayName}
          </h1>
          <div className="flex  justify-center items-center">
            <div className="stats stats-vertical lg:stats-horizontal shadow">
              <div className="stat">
                <div className="stat-title">Total Enrolled</div>
                <div className="stat-value">{sumTotalStudent}</div>
              </div>
              <div className="stat">
                <div className="stat-title">Total Student</div>
                <div className="stat-value">{sumTotalStudent}</div>
              </div>
              <div className="stat">
                <div className="stat-title">Total Classes</div>
                <div className="stat-value">{classes?.length}</div>
              </div>
            </div>
          </div>
        </>
      )}

      {!isAdmin && !isInstructor && (
        <>
          <h1 className="text-center font-bold text-2xl my-10">
            Welcome back, {user?.displayName}
          </h1>
          <div className="flex  justify-center items-center">
            <div className="stats stats-vertical lg:stats-horizontal shadow">
              <div className="stat">
                <div className="stat-title"> Selected Classes</div>
                <div className="stat-value">{cart?.length}</div>
              </div>
              <div className="stat">
                <div className="stat-title"> Payment History</div>
                <div className="stat-value">{paymentHistory?.length}</div>
              </div>
              <div className="stat">
                <div className="stat-title">Enrolled Classes</div>
                <div className="stat-value">{paymentHistory?.length}</div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserHome;
