import React, { Fragment, useEffect, useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { CardElement } from "@stripe/react-stripe-js";
import "./PaymentForm.css";

const PaymentForm = (props) => {
  const service = props.service;

  const stripe = useStripe();
  const elements = useElements();

  const [showDiscount, setShowDiscount] = useState(false);
  const [discountCode, setDiscountCode] = useState("");

  const options = {
    // passing the client secret obtained from the server
    clientSecret:
      "pi_1Dt1iX2eZvKYlo2CbnmT5bWv_secret_FL7l1yIGkVNfKP21jXySth5lC",
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: "https://example.com/order/123/complete",
      },
    });

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(result.error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  const onCardElementChange = (e) => {
    console.log(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-500 dark:text-white">
          Card Details
        </label>
        <CardElement onChange={(e) => onCardElementChange(e)} />
      </div>
      <div className="mt-4 relative">
        <div className="flex items-center mb-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 text-blue-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
            />
          </svg>
          <label
            className="block ml-2 text-sm font-medium text-blue-500 dark:text-white hover:underline cursor-pointer"
            onClick={() => setShowDiscount(true)}
          >
            Discount Code
          </label>
        </div>
        {showDiscount && (
          <Fragment>
            <input
              type="text"
              className="bg-gray-50 border border-solid border-gray-300 text-gray-900 text-sm rounded focus:ring-gray-300 focus:border-gray-300 block w-full p-2"
              placeholder="Discount code"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
            />
            <span className="absolute inset-y-0 right-4 top-6 flex items-center pl-3 text-xs font-bold text-blue-600 cursor-pointer">
              Apply
            </span>
          </Fragment>
        )}
      </div>
      <hr className="h-px my-6 mx-8 bg-gray-200 border-0"></hr>
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold">2022 Hobbyist Report</div>
        <div className="text-sm font-semibold">$ 49.99</div>
      </div>
      {service && (
        <div className="flex items-center justify-between mt-4">
          <div className="text-sm font-semibold">Expert Review Service</div>
          <div className="text-sm font-semibold">$ 499.00</div>
        </div>
      )}
      <div className="flex items-center justify-between mt-4">
        <div className="text-lg font-semibold">Total</div>
        <div className="text-lg font-semibold">
          $ {service ? "548.99" : "49.99"}
        </div>
      </div>
      <div className="mt-6">
        {stripe ? (
          <button
            type="button"
            className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Purchase Report
          </button>
        ) : (
          <button
            type="button"
            className="w-full text-white bg-blue-400 cursor-not-allowed font-medium rounded text-sm px-5 py-2 text-center"
            disabled
          >
            Purchase Report
          </button>
        )}
      </div>
      <div className="mt-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4 inline-flex text-gray-400"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
          />
        </svg>
        <span className="text-gray-400 text-xs ml-2">
          All credit card data is securely processed through our partner Stripe.
        </span>
      </div>
    </form>
  );
};

export default PaymentForm;
