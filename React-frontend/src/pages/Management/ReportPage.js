// Page to render report components

import React from "react";
import HomeLogo from "../../components/core/HomeLogo";
import ManagementLayout from "../../components/Management/ManagementLayout";
import { useSelector } from "react-redux";
import Report from "../../components/Management/Report";

const ReportPage = () => {
  const auth = useSelector((state) => state.auth);

  if (auth && auth.isAuthenticated) {
    return (
      <ManagementLayout sidebarBool={false}>
        <Report />
      </ManagementLayout>
    );
  }
  return (
    <ManagementLayout sidebarBool={true}>
      <HomeLogo />
    </ManagementLayout>
  );
};

export default ReportPage;
