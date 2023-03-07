import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import LongTermGainsReport from "../../assets/imgs/long_term_gains_report.svg";
import Form8949 from "../../assets/imgs/form_8949.svg";
import Mining from "../../assets/imgs/mining.svg";
import LongTermSale from "../../assets/imgs/long_term_sale.svg";
import TaxLossHarvesting from "../../assets/imgs/tax_loss_harvesting.svg";
import Integrations from "../../assets/imgs/integrations.svg";
import PaymentForm from "./components/PaymentForm";

// creating the stripe object
const stripePromise = loadStripe(
  "pk_test_51MG8BHBbj0brRoCCvv24fspc9mTjGQ1tgZ29axzXQbzjrlDA1RSXEsAthaL24COZipsAtWvn9IZUVjbNP4W3N0b500Ln4NCKOq"
);

const Unlock = () => {
  const navigate = useNavigate();

  const [isService, setIsService] = useState(false);

  return (
    <div className="pt-10 px-44 relative">
      <div className="absolute top-6 right-8">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 cursor-pointer"
          onClick={() => navigate(-1)}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>
      <span className="text-2xl font-medium">
        Purchase Your 2022 Tax Report
      </span>
      <div className="text-lg mt-2">
        <span>
          After purchase, you can re-run a report as many times needed for no
          additional charge.
        </span>
        <span className="ml-2 text-blue-500 cursor-pointer">
          Pricing FAQ{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3}
            stroke="currentColor"
            className="w-3 h-3 inline-flex"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
            />
          </svg>
        </span>
      </div>
      <div className="mt-4">
        <div className="flex items-center">
          <input
            checked={isService}
            onChange={() => setIsService(!isService)}
            type="checkbox"
            id="service-checkbox"
            className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded"
          />
          <label
            htmlFor="service-checkbox"
            className="ml-2 text-lg font-medium"
          >
            Expert Review Service — $499
          </label>
        </div>
        <p className="mt-2 text-gray-500 w-1/2">
          Have one of our experts review your imported data, highlight any
          issues, and provide guidance on your account. Ideal for new users.
          <span className="ml-2 text-blue-500 cursor-pointer">
            Learn what's included{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={3}
              stroke="currentColor"
              className="w-3 h-3 inline-flex"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
              />
            </svg>
          </span>
        </p>
      </div>
      <hr className="h-px my-10 bg-gray-200 border-0"></hr>
      <div className="grid grid-cols-5 gap-10">
        <div className="col-span-3">
          <div className="text-sm text-yellow-500 font-medium mt-4 mb-6">
            WHAT IS INCLUDED ON THE ACTUAL REPORT
          </div>
          <div>
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full text-center items-center flex justify-center bg-green-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4 text-green-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
              </div>
              <p className="ml-2 font-medium">
                Short & Long Term Capital Gains Report
              </p>
            </div>
            <p className="mt-2 text-gray-500">
              The short and long term gains report contains all of your gains or
              losses from your trading history. For each trade, you will be able
              to view the calculated Cost Basis, Proceeds, and Net Gain/Loss.
            </p>
            <img
              className="w-full mt-4"
              src={LongTermGainsReport}
              alt="long term gains report"
            />
          </div>
          <hr className="h-px my-8 bg-gray-200 border-0"></hr>
          <div>
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full text-center items-center flex justify-center bg-green-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4 text-green-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
              </div>
              <p className="ml-2 font-medium">IRS Form 8949</p>
            </div>
            <p className="mt-2 text-gray-500">
              CoinLedger will generate and auto-fill this required tax form for
              you to attach to your return. This report includes all of your
              short term and long term gains from cryptocurrency trading.
            </p>
            <img className="w-full mt-4" src={Form8949} alt="form 8949" />
          </div>
          <hr className="h-px my-8 bg-gray-200 border-0"></hr>
          <div>
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full text-center items-center flex justify-center bg-green-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4 text-green-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
              </div>
              <p className="ml-2 font-medium">Cryptocurrency Income Report</p>
            </div>
            <p className="mt-2 text-gray-500">
              Your income report allows you to view the Fiat value of all
              incoming transactions throughout the tax year. This report is
              split up into Gifts, Mining, and Income to make completing your
              full return as easy as possible.
            </p>
            <img className="w-full mt-4" src={Mining} alt="mining" />
          </div>
          <hr className="h-px my-8 bg-gray-200 border-0"></hr>
          <div>
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full text-center items-center flex justify-center bg-green-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4 text-green-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
              </div>
              <p className="ml-2 font-medium">Audit Trail Report</p>
            </div>
            <p className="mt-2 text-gray-500">
              As a part of your tax report, CoinLedger will generate an audit
              trail that details the numbers used for each step in calculating
              your trading gains. Every single taxable event is shown for your
              records.
            </p>
            <img
              className="w-full mt-4"
              src={LongTermSale}
              alt="long term sale"
            />
          </div>
          <hr className="h-px my-8 bg-gray-200 border-0"></hr>
          <div>
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full text-center items-center flex justify-center bg-green-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4 text-green-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
              </div>
              <p className="ml-2 font-medium">Tax Loss Harvest Report</p>
            </div>
            <p className="mt-2 text-gray-500">
              Built in tax loss harvesting tools help you offset and reduce your
              capital gains. Cryptocurrencies with the largest tax savings
              opportunities appear on the tax loss harvesting report to help you
              plan your future trades.
            </p>
            <img
              className="w-full mt-4"
              src={TaxLossHarvesting}
              alt="long term sale"
            />
          </div>
          <hr className="h-px my-8 bg-gray-200 border-0"></hr>
          <div>
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full text-center items-center flex justify-center bg-green-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4 text-green-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
              </div>
              <p className="ml-2 font-medium">
                TurboTax / TaxAct Compatibility
              </p>
            </div>
            <p className="mt-2 text-gray-500">
              Directly import your capital gains and losses from cryptocurrency
              trading into TurboTax Online or TurboTax desktop versions! After
              creating your report, CoinLedger will generate a CSV for you to
              upload directly into their platform.
            </p>
            <img
              className="w-full mt-4"
              src={Integrations}
              alt="integrations"
            />
          </div>
        </div>
        <div className="col-span-2">
          <div className="border border-solid border-gray-200 py-4 px-6">
            <div className="text-sm text-gray-900 font-medium mb-8">
              PAYMENT INFORMATION
            </div>
            <Elements stripe={stripePromise} className="stripe-payment">
              <PaymentForm service={isService} />
            </Elements>
          </div>
          <div className="mt-6">
            <div className="flex justify-center items-center">
              {[1, 2, 3, 4, 5].map((item) => (
                <div className="bg-green-500 p-1 ml-1" key={item}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                    className="w-4 h-4 text-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                    />
                  </svg>
                </div>
              ))}
            </div>
            <div className="text-center text-blue-500 cursor-pointer hover:underline text-sm mt-2">
              600+ Reviews on Trustpilot
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Unlock;
