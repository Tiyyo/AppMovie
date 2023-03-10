import React from "react";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import BannerCard from "../../Cards/Banner/BannerCard";
import { Link } from "react-router-dom";
import LoaderUI from "../../Loader/LoaderUI";

const TrendsBanner = ({ content, title }) => {
  //   const { content, title } = props;

  return (
    <div className="trends">
      <h2>{title}</h2>
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination]}
        className="trends__swiper"
      >
        {content ? (
          content
            .filter((el) => el.backdrop_path)
            .map((el) => {
              return (
                <SwiperSlide key={el.id}>
                  <Link to={el.id.toString()} state={{ content: el }}>
                    <BannerCard element={el} />
                  </Link>
                </SwiperSlide>
              );
            })
        ) : (
          <LoaderUI />
        )}
      </Swiper>
    </div>
  );
};

export default TrendsBanner;
