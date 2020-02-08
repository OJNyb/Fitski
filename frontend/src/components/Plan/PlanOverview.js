import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { NavContext } from "../../context/navContext";
import { setBackLink } from "../../utils/setBackLink";

const Overview = ({ woPlan }) => {
  const [showOverview, setShowOverview] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const { state, dispatch } = useContext(NavContext);

  const {
    name,
    goal,
    weeks,
    difficulty,
    description,
    _id: planId,
    user: author
  } = woPlan;

  const { avatar, username, _id: authorId } = author;

  function onLinkClick() {
    if (state[authorId]) return;
    setBackLink(dispatch, authorId, { planId });
  }
  return (
    <>
      <h2 className="color-gray text-center margin-10">{name}</h2>
      <div className="plan-overview-category-container">
        <CategoryHeader
          header={"Overview"}
          rotateIcon={showOverview}
          onClick={() => setShowOverview(!showOverview)}
        />
        {showOverview && (
          <div className="plan-overview-dropdown-content flex-col-cen">
            {/* <div className="plan-overview-autho-container">
              <img src={`/api/image/avatar/${avatar}_sm.jpg`} alt="Avatar" />
              <div className="flex-col">
                <span className="font-w-300 font-14 black">Author</span>
                <Link
                  to={`/profile/${username}`}
                  className="tc line-height-11"
                  onClick={onLinkClick}
                >
                  {username}
                </Link>
              </div>
            </div> */}
            <div>
              <Label label={"Author"} />

              <Link
                to={`/profile/${username}`}
                className="tc font-15"
                onClick={onLinkClick}
              >
                {username}
              </Link>
            </div>
            <div>
              <Label label={"Length"} />
              <Content
                content={`${weeks.length} ${
                  weeks.length === 1 ? "week" : "weeks"
                }`}
              />
            </div>
            <div>
              <Label label={"Difficulty"} />
              <Content content={difficulty ? difficulty : "N/A"} />
            </div>
            <div>
              <Label label={"Goal"} />
              <Content content={goal} />
            </div>
          </div>
        )}
      </div>

      <div className="plan-overview-category-container">
        <CategoryHeader
          header={"Description"}
          rotateIcon={showDescription}
          onClick={() => setShowDescription(!showDescription)}
        />

        {showDescription && (
          <div className="flex-col-cen plan-overview-dropdown-content">
            <p className="margin-0 font-w-300 font-15 line-height-12 black">
              {description}
            </p>
          </div>
        )}
      </div>
    </>
  );
};

const CategoryHeader = ({ header, rotateIcon, onClick }) => {
  return (
    <div className="plan-overview-header-wrapper color-gray" onClick={onClick}>
      {header}
      <i
        className={
          "material-icons-round plan-overview-arrow-icon" +
          (rotateIcon ? " rotate-180" : "")
        }
      >
        keyboard_arrow_down
      </i>
    </div>
  );
};

const Label = ({ label }) => {
  return <span className="black font-15">{label}: </span>;
};
const Content = ({ content }) => {
  return <span className="black font-w-300 font-15">{content}</span>;
};

export default Overview;
