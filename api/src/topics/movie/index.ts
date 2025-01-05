import { TMDB_API_KEY } from "../../config/env";
import UpdateDB from "../../util/update-db";

const url = "https://api.themoviedb.org/3/trending/movie/day?language=en-US";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${TMDB_API_KEY()}`,
  },
};

export default async function Movie() {
  try {
    const response = await fetch(url, options);
    const responseBody = await response.json();
    if (!response.ok) {
      console.error("❌ Movie", responseBody.message);
      return;
    }
    await UpdateDB("movie", JSON.stringify(responseBody));
  } catch (error) {
    console.error("❌ Fetch failed:", error);
  }
}
