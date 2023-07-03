import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect } from "react";
import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import useCart from "../../../hooks/useCart";
import { TextField } from "@material-ui/core";

const CheckoutForm = ({ singleCart }) => {
  const [, refetch] = useCart();
  const { _id, name, classId, price } = singleCart;
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState("");

  useEffect(() => {
    if (price > 0) {
      axiosSecure.post("/create-payment-intent", { price }).then((res) => {
        setClientSecret(res.data.clientSecret);
      });
    }
  }, [price, axiosSecure]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const customername = form.customername.value;
    const email = form.email.value;
    const street = form.street.value;
    const city = form.city.value;
    const country = form.country.value;
    const zip = form.zip.value;

    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }
    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("error", error);
      setCardError(error.message);
    } else {
      setCardError("");
    }

    setProcessing(true);

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "unknown",
            name: user?.displayName || "anonymous",
          },
        },
      });

    setProcessing(false);
    if (paymentIntent.status === "succeeded") {
      setTransactionId(paymentIntent.id);
      const payment = {
        enrollId: _id,
        classId,
        name: customername,
        email: email,
        street,
        city,
        country,
        zip,
        transactionId: paymentIntent.id,
        price,
        date: new Date(),
        status: "payment confirmed",
        itemNames: name,
      };

      axiosSecure.post("/payments", payment).then((res) => {
        if (res.data.insertResult.insertedId) {
          refetch();
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your payment has been successful",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row">
        <div className=" text-white p-4 md:w-1/2">
          <form
            className=" m-4 p-4 bg-white rounded  border "
            onSubmit={handleSubmit}
          >
            <p className="text-gray-800 font-medium">Customer information</p>
            <div className="">
              <TextField
                type="text"
                name="customername"
                label="Your Name"
                variant="outlined"
                margin="normal"
                fullWidth
                required
                autoComplete="name"
                defaultValue={user?.displayName}
              />
            </div>
            <div className="mt-2">
              <TextField
                type="text"
                name="email"
                label="Email Address"
                variant="outlined"
                margin="normal"
                fullWidth
                required
                autoComplete="email"
                defaultValue={user?.email}
              />
            </div>
            <div className="mt-2">
              <label className=" block my-2 text-gray-800 font-medium">
                Address:
              </label>
              <TextField
                type="text"
                name="street"
                label="Street"
                variant="outlined"
                margin="normal"
                fullWidth
                autoComplete="Street"
              />
            </div>
            <div className="mt-2">
              <label
                className="hidden text-sm text-gray-600"
                htmlFor="cus_email"
              >
                City
              </label>
              <TextField
                type="text"
                name="city"
                label="City"
                variant="outlined"
                margin="normal"
                fullWidth
                autoComplete="City"
              />
            </div>
            <div className="inline-block mt-2 w-1/2 pr-1">
              <label
                className="hidden text-sm text-gray-600"
                htmlFor="cus_email"
              >
                Country
              </label>
              <TextField
                type="text"
                name="country"
                label="Country"
                variant="outlined"
                margin="normal"
                fullWidth
                autoComplete="Country"
              />
            </div>
            <div className="inline-block mt-2 -mx-1 pl-1 w-1/2">
              <label
                className="hidden text-sm text-gray-600"
                htmlFor="cus_email"
              >
                Zip
              </label>
              <TextField
                type="text"
                name="zip"
                label="Zip"
                variant="outlined"
                margin="normal"
                fullWidth
                autoComplete="Zip"
              />
            </div>
            <p className="my-4 text-gray-800 font-medium">Card information</p>
            <div className="">
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: "16px",
                      color: "#424770",
                      "::placeholder": {
                        color: "#aab7c4",
                      },
                    },
                    invalid: {
                      color: "#9e2146",
                    },
                  },
                }}
                className="border border-gray-300 p-3 rounded"
              />
            </div>
            <div className=" flex justify-center mt-4">
              <button
                className="btn btn-primary btn-sm mt-4"
                type="submit"
                disabled={!stripe || !clientSecret || processing}
              >
                Pay
              </button>
            </div>
          </form>
        </div>
        <div className=" text-white p-4 md:w-1/2">
          <div className="flex flex-col justify-start items-start bg-gray-50 p-6 md:p-14">
            <div>
              <h1 className="text-2xl font-semibold leading-6 text-gray-800">
                Order Summary
              </h1>
            </div>
            <div className="flex mt-7 flex-col items-end w-full space-y-6">
              <div className="flex justify-between w-full items-center">
                <p className="text-lg font-semibold leading-4 text-gray-600">
                  Name: {name}
                </p>
              </div>
              <div className="flex justify-between w-full items-center">
                <p className="text-lg leading-4 text-gray-600">Total Charges</p>
                <p className="text-lg font-semibold leading-4 text-gray-600">
                  ${price}
                </p>
              </div>
              <div className="flex justify-between w-full items-center">
                <p className="text-lg leading-4 text-gray-600">Sub total</p>
                <p className="text-lg font-semibold leading-4 text-gray-600">
                  ${price}
                </p>
              </div>
            </div>
            <div className="flex justify-between w-full items-center mt-32">
              <p className="text-xl font-semibold leading-4 text-gray-800">
                Estimated Total
              </p>
              <p className="text-lg font-semibold leading-4 text-gray-800">
                ${price}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center">
        {cardError && <p className="text-red-600 ml-8">{cardError}</p>}
        {transactionId && (
          <p className="text-green-500">
            Transaction Id: {transactionId}
          </p>
        )}
      </div>
    </>
  );
};

export default CheckoutForm;
