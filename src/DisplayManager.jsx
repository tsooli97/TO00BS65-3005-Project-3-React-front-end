import { useEffect, useState } from "react";
import GetAll from "./GetAll";
import GetId from "./GetId";
import PostAdd from "./PostAdd";
import DeleteId from "./DeleteId";
import PatchId from "./PatchId";
import { getAll } from "./DataRequester";

const DisplayManager = () => {
  const [movieData, setMovieData] = useState([]);
  const [displayedMovies, setDisplayedMovies] = useState([]);
  const [currentView, setCurrentView] = useState("getAll");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (currentView === "getAll") {
      fetchMovies();
    }
  }, [currentView]);

  const fetchMovies = async () => {
    try {
      const movies = await getAll();
      setMovieData(movies.message);
      setDisplayedMovies(movies.message);
    } catch (err) {
      setError("Failed to fetch movies: " + err.message);
    }
  };

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const filteredMovies = movieData.filter((movie) =>
      movie.name.toLowerCase().includes(searchTerm)
    );
    setDisplayedMovies(filteredMovies);
  };

  const handleSelect = (event) => {
    if (event.target.value === "getAll") {
      setCurrentView("getAll");
    } else if (event.target.value === "getId") {
      setCurrentView("getId");
    } else if (event.target.value === "postId") {
      setCurrentView("postId");
    } else if (event.target.value === "patchId") {
      setCurrentView("patchId");
    } else if (event.target.value === "deleteId") {
      setCurrentView("deleteId");
    }
  };

  if (error)
    return (
      <div className="error-div">
        <hr />
        <h2>{error}</h2>
      </div>
    );

  return (
    <div className="display-manager-div">
      <p>There are {movieData.length} movies currently in the database.</p>
      <div className="select-div">
        <select onChange={handleSelect}>
          <option value="getAll">View All Movies</option>
          <option value="getId">Find Movie By Id</option>
          <option value="postId">Add Movie</option>
          <option value="patchId">Update Movie</option>
          <option value="deleteId">Delete Movie</option>
        </select>
      </div>
      <hr />
      {currentView === "getAll" && (
        <GetAll movies={displayedMovies} handleSearch={handleSearch} />
      )}
      {currentView === "getId" && <GetId />}
      {currentView === "postId" && <PostAdd />}
      {currentView === "patchId" && <PatchId />}
      {currentView === "deleteId" && <DeleteId />}
    </div>
  );
};

export default DisplayManager;
