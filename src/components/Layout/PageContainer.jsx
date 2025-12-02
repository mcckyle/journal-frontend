//Filename: src/components/layout/PageContainer.jsx

import React from "react";
//import "./PageContainer.css";

//Reusable Wrapper for Consistent Page Spacing.
const PageContainer = ({ children }) => (
  <div className="page-container">
    {children}
  </div>
);

export default PageContainer;