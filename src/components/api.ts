import axios from "axios";

const BASE_PATH = "https://api.themoviedb.org/3";
const API_KEY = "";

export function getNowPlaying() {
  return (
    axios
      .get(`${BASE_PATH}/movie/now_playing`, {
        params: {
          api_key: API_KEY,
        }
      })
      .then((res) => res.data)
  );
}

export function getMovieDetail(id: string) {
  return (
    axios
      .get(`${BASE_PATH}/movie/${id}`, {
        params: {
          api_key: API_KEY,
        }
      })
      .then((res) => res.data)
  );
}
