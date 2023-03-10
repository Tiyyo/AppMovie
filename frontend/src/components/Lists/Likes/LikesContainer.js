import React, { useEffect, useState } from "react";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import { useSelector } from "react-redux";
import useMediaId from "../../../utils/hooks/useMediaId";
import SmallCard from "../SmallCard";
import LoaderUI from "../../Loader/LoaderUI";

const LikesContainer = () => {
  let mediaTypeTvv = "tv";
  let mediaTypeMovie = "movie";

  const { ids: movies_liked_ids } = useSelector((state) => state.movieLiked);

  const { ids: tvshow_liked_ids } = useSelector((state) => state.tvshowLiked);

  const { fetchContent: moviesLiked, loading: loadingFetchMoviesLiked } =
    useMediaId(movies_liked_ids, mediaTypeMovie);

  const { fetchContent: tvshowsLiked, loading: loadingFetchTvLiked } =
    useMediaId(tvshow_liked_ids, mediaTypeTvv);

  const [isLoading, setLoading] = useState(true);

  const handleLoadingState = () => {
    let arr = [loadingFetchMoviesLiked, loadingFetchTvLiked];
    return arr.every((l) => l === "idle");
  };

  useEffect(() => {
    setLoading(!handleLoadingState());
  }, [loadingFetchMoviesLiked, loadingFetchTvLiked]);

  return (
    <>
      {isLoading ? (
        <LoaderUI fixed={true} />
      ) : (
        <div className="favorite-resume__container__likes">
          <div className="favorite-resume__container__likes--title">
            <BookmarkAddedIcon />
            <h2>My Favorites</h2>
          </div>
          <div className="favorite-resume__container__likes--content">
            <SmallCard
              list={{
                content: moviesLiked,
                name: "Movie you Liked",
                _id: "1",
              }}
              typeList={"like"}
            />
            <SmallCard
              list={{
                content: tvshowsLiked,
                name: "TvShow you Liked",
                _id: "2",
              }}
              typeList={"like"}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default LikesContainer;
