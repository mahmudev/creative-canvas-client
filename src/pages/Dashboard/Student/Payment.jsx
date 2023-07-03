import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { useLoaderData } from "react-router-dom";
import useTitle from "../../../hooks/useTitle";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
const Payment = () => {
  useTitle("Payment");

  const singleCart = useLoaderData();
  return (
    <div>
      <Elements stripe={stripePromise}>
        <CheckoutForm singleCart={singleCart}></CheckoutForm>
      </Elements>
    </div>
  );
};

export default Payment;
