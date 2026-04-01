import React from "react";
import { useLocation } from "react-router-dom";

const Reports = () => {

  const location = useLocation();
  const data = location.state;

  return (
    <div>
        hello,this report is for {data}
    </div>
  );
};

export default Reports;