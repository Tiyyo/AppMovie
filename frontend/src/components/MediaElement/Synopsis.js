import React, { useState, useEffect } from "react";

const Synopsis = (props) => {
  const { content } = props;
  const [synopsisIsOpen, setSynopsisIsOpen] = useState(false);
  const [isEnough, setIsEnough] = useState(false);

  const toggleSynopsis = () => {
    synopsisIsOpen ? setSynopsisIsOpen(false) : setSynopsisIsOpen(true);
  };

  const sysnopsis = () => {
    const synopsisContainer = document.querySelector(
      ".media-element__synopsis--container"
    );
    if (synopsisContainer.offsetHeight === synopsisContainer.scrollHeight) {
      setIsEnough(true);
    } else {
      setIsEnough(false);
    }
  };

  useEffect(() => {
    sysnopsis();
  }, []);

  return (
    <div className="media-element__synopsis">
      <div
        className="media-element__synopsis--container"
        style={
          synopsisIsOpen ? { maxHeight: "fit-content" } : { maxHeight: "62px" }
        }
      >
        {content.overview}
      </div>
      <span
        onClick={toggleSynopsis}
        style={isEnough ? { display: "none" } : { display: "inline" }}
      >
        <span>{synopsisIsOpen ? "Reduce" : "See More"}</span>
      </span>
    </div>
  );
};

export default Synopsis;
