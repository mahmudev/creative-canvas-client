import React from "react";
import usePaymentHistory from "../../../hooks/usePaymentHistory";
import useTitle from "../../../hooks/useTitle";
const PaymentHistory = () => {
  const [paymentHistory] = usePaymentHistory();
  useTitle("Payment History");
  return (
    <>
      <div className="w-full container mx-auto flex flex-col min-h-screen">
        {paymentHistory?.length ? (
          <>
            <div className="uppercase font-semibold h-[60px] flex justify-evenly items-center">
              <h3 className="text-3xl">Payment history</h3>
            </div>
            <div className="overflow-x-auto w-full">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>#</th>
                    <th className=" text-center">Class Name</th>
                    <th className=" text-center">Price</th>
                    <th className=" text-center">Date</th>
                    <th className=" text-center">Status</th>
                    <th className="text-end">Transaction Id</th>
                  </tr>
                </thead>
                <tbody>
                  {paymentHistory.map((item, index) => (
                    <tr key={item?._id}>
                      <td>{index + 1}</td>
                      <td className=" text-center">{item?.itemNames}</td>
                      <td className=" text-center">${item?.price}</td>

                      <td className=" text-center">
                        {item?.date
                          ? new Date(item.date).toLocaleDateString()
                          : ""}
                      </td>
                      <td className=" text-center">{item?.status}</td>
                      <td className="text-end">{item?.transactionId}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <div className="flex justify-center items-center min-h-screen">
            <h3 className="text-3xl text-center">Payment History is empty.</h3>
          </div>
        )}
      </div>
    </>
  );
};

export default PaymentHistory;
