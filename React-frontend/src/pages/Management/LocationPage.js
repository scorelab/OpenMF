// page to render location component

import React from "react";
import HomeLogo from "../../components/core/HomeLogo";
import ManagementLayout from "../../components/Management/ManagementLayout";
import { useSelector } from "react-redux";
import Location from "../../components/Management/Location";

const LocationPage = () => {
  const auth = useSelector((state) => state.auth);

  if (auth && auth.isAuthenticated) {
    return (
      <ManagementLayout sidebarBool={false}>
        <Location />
      </ManagementLayout>
    );
  }
  return (
    <ManagementLayout sidebarBool={true}>
      <HomeLogo />
    </ManagementLayout>
  );
};

export default LocationPage;
