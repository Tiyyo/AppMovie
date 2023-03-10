import React, { useContext, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";
import AppContext from "../../utils/Context/AppContextProvider";
import { useSelector } from "react-redux";
import ItemList from "./ItemList";
import HeaderResume from "./HeaderResume";
import { motion } from "framer-motion";

const Watchlist = () => {
  const {
    state: {
      list: { content, name, _id: listID },
    },
    typeList,
  } = useLocation();

  // const contents = useSelector((state) => {
  //   let data = state.lists.lists;
  //   let index = data.findIndex((list) => list._id == listID);
  //   return data[index].content;
  // });

  const { config } = useContext(AppContext);

  const { header_resume } = useSelector((state) => state.header_resume);

  const carousel = useRef();

  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (carousel?.current) {
      setHeight(carousel.current.scrollHeight - carousel.current.offsetHeight);
    }
  });

  const pathImage = (hoveredEl, int) => {
    return Object.keys(header_resume).length === 0
      ? config.base_url + config.poster_sizes[int] + content[0].poster_path
      : config.base_url + config.poster_sizes[int] + hoveredEl.poster_path;
  };

  const header = () => {
    return Object.keys(header_resume).length === 0 ? (
      <HeaderResume content={content[0]} />
    ) : (
      <HeaderResume content={header_resume} />
    );
  };

  return (
    <div className="list-container">
      <div className="list-container__header">
        <h2 className="list-container__header--list-name">{name}</h2>
        <div className="list-container__header--image">
          <img
            src={pathImage(header_resume, 0)}
            alt="poster of current hover content"
          />
        </div>
        <div className="list-container__header__infos">
          <div className="list-container__header__infos--content">
            {header()}
          </div>
        </div>
      </div>
      <div className="list-container__main">
        <motion.div
          className="outer-vertical-carousel"
          ref={carousel}
          whiletap={{ cursor: "grabbing" }}
        >
          <motion.div
            className="vertical-carousel"
            drag="y"
            dragConstraints={{ top: 0, bottom: -height }}
          >
            {content?.map((content) => (
              <ItemList
                key={content.id}
                content={content}
                listID={listID}
                typeList={typeList}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Watchlist;
