import React from "react";
import NavMid from "../../shared/NavMid/NavMid";
import SearchThick from "../../shared/SVGs/SearchThick";

const ExploreNav = ({ search, onSearchChange }) => {
  return (
    <NavMid
      backText={"Explore"}
      midContent={
        <label className="flex-ai-center explore-web-search-container">
          <input value={search} onChange={onSearchChange} />
          <SearchThick stroke={null} />
        </label>
      }
    />
  );
};

export default ExploreNav;
