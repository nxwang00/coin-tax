import React, { Fragment, useState } from "react";
import Sidebar from "../../components/Sidebar";
import MissingCost from "../../components/MissingCost";
import ReviewList from "./components/ReviewList";

const Review = () => {
  const [val, setVal] = useState({});

  return (
    <Fragment>
      <Sidebar onChanged={(val) => setVal(val)} />
      <div className="mt-28" style={{ marginRight: 400 }}>
        <MissingCost />
        <ReviewList filters={val} />
      </div>
    </Fragment>
  );
};

export default Review;
