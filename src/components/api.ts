import axios from "axios";

const BASE_PATH = "https://api.themoviedb.org/3";
const API_KEY = "fb0dde4eb75a49cb4fb7577c2dbf459a";

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
