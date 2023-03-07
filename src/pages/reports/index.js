import React, { Fragment, useEffect, useState, useRef } from "react";
import { MOCKUP_REPORTS } from "../../services/mockus";
import MissingCost from "../../components/MissingCost";
import CalculationBox from "./components/CalculationBox";
import SummaryBox from "./components/SummaryBox";
import DownloadBox from "./components/DownloadBox";
import ExpertReview from "./components/ExpertReviewBox";

const Reports = () => {
  const reportRef = useRef(null);

  const [showReportMenu, setShowReportMenu] = useState(false);
  const [report, setReport] = useState({});

  useEffect(() => {
    setReport(MOCKUP_REPORTS[0]);

    document.addEventListener("mousedown", Clickout);
    return () => {
      document.removeEventListener("mousedown", Clickout);
    };
  }, []);

  const Clickout = ({ target }) => {
    if (reportRef.current && !reportRef.current.contains(target)) {
      setShowReportMenu(false);
    }
  };

  const onReportSelect = (report) => {
    setReport(report);
    setShowReportMenu(false);
  };

  return (
    <div className="mt-24 mb-8">
      <div className="flex">
        <div ref={reportRef} className="w-52">
          <button
            className="w-full bg-transparent hover:bg-gray-100 font-medium text-2xl text-center inline-flex items-center"
            type="button"
            onClick={() => setShowReportMenu(!showReportMenu)}
          >
            {report.year} Tax Report
            <svg
              className="w-4 h-4 ml-2"
              aria-hidden="true"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </button>
          <div
            className={`${
              !showReportMenu ? "hidden" : ""
            } z-10 absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-52 dark:bg-gray-700`}
          >
            <ul
              className="py-2 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownDefaultButton"
            >
              {MOCKUP_REPORTS.map((_report) => (
                <li
                  key={_report.id}
                  className="cursor-pointer flex items-center hover:bg-gray-100"
                  onClick={() => onReportSelect(_report)}
                >
                  <span className="block px-4 py-2">
                    {_report.year} Tax Report
                  </span>
                  {report.id === _report.id && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4 ml-12"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="text-base mt-1 ml-4">
          Jan 1, {report.year} - Dec 31, {report.year}
        </div>
      </div>
      <div className="grid grid-cols-4 gap-8 mt-4">
        <div className="col-span-3">
          <MissingCost />
          <div className="p-4 bg-white border border-solid border-gray-300 rounded mt-4">
            <span className="text-xs text-gray-600 font-medium">SUMMARY</span>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <SummaryBox
                  data={report.capital_gains}
                  caption="Capital Gains"
                />
                <SummaryBox data={report.others} caption="Other" />
              </div>
              <div>
                <SummaryBox
                  data={report.taxable_income}
                  caption="Taxable Income"
                />
              </div>
            </div>
          </div>
          <ExpertReview />
        </div>
        <div>
          <CalculationBox data={report.calculation} />
          <DownloadBox />
        </div>
      </div>
    </div>
  );
};

export default Reports;
