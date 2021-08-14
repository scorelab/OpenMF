// page to render compare component

import React from "react";
import HomeLogo from "../../components/core/HomeLogo";
import ManagementLayout from "../../components/Management/ManagementLayout";
import { useSelector } from "react-redux";
import Compare from "../../components/Management/Compare";


const ComparePage = () => {
  const auth = useSelector((state) => state.auth);

  if (auth && auth.isAuthenticated) {
    return (
      <ManagementLayout sidebarBool={false}>
        <Compare />
      </ManagementLayout>
    );
  }
  return (
    <ManagementLayout sidebarBool={true}>
      <HomeLogo />
    </ManagementLayout>
  );
};

export default ComparePage;
