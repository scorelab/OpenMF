// page to render common word component

import React from "react";
import HomeLogo from "../../components/core/HomeLogo";
import ManagementLayout from "../../components/Management/ManagementLayout";
import { useSelector } from "react-redux";
import Commonword from "../../components/Management/Commonword";

const CommonWordsPage = () => {
  const auth = useSelector((state) => state.auth);

  if (auth && auth.isAuthenticated) {
    return (
      <ManagementLayout sidebarBool={false}>
        <Commonword />
      </ManagementLayout>
    );
  }
  return (
    <ManagementLayout sidebarBool={true}>
      <HomeLogo />
    </ManagementLayout>
  );
};

export default CommonWordsPage;
