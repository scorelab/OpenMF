// page to render filter case

import React from "react";
import HomeLogo from "../../components/core/HomeLogo";
import ManagementLayout from "../../components/Management/ManagementLayout";
import { useSelector } from "react-redux";
import FilterCase from "../../components/Management/FilterCase";

const FilterCasePage = () => {
  const auth = useSelector((state) => state.auth);

  if (auth && auth.isAuthenticated) {
    return (
      <ManagementLayout sidebarBool={false}>
        <FilterCase />
      </ManagementLayout>
    );
  }
  return (
    <ManagementLayout sidebarBool={true}>
      <HomeLogo />
    </ManagementLayout>
  );
};

export default FilterCasePage;
