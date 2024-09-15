import { useState } from "react";
import { getById } from "./DataRequester";

const GetId = () => {
  const [searchValue, setSearchValue] = useState("");
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = (event) => {
    setSearchValue(event.target.value);
  };

  const getMovieById = async () => {
    const response = await getById(searchValue);

    if (typeof response.message === "string") {
      setError(response.message);
      setMovie(null);
    } else {
      setMovie(response.message);
      setError(null);
    }
  };

  return (
    <div className="get-id-div">
      <p>Search database for movie using ID</p>
      <label className="label-id">ID: </label>
      <input value={searchValue} onChange={handleSearch} />
      <button onClick={getMovieById}>Search</button>

      {error ? (
        <p>{error}</p>
      ) : (
        movie && (
          <div className="movie-div" key={movie._id}>
            <strong>{movie.name}</strong>, {movie.year}
            <table>
              <tbody>
                <tr>
                  <th className="th-id">ID:</th>
                  <td className="td-id">{movie._id}</td>
                </tr>
                {movie.bio && (
                  <tr>
                    <th className="th-bio">Bio:</th>
                    <td className="td-bio">{movie.bio}</td>
                  </tr>
                )}

                {movie.director && (
                  <tr>
                    <th className="th-director">Director:</th>
                    <td className="td-director">{movie.director}</td>
                  </tr>
                )}

                {movie.starring && movie.starring.length > 0 && (
                  <tr>
                    <th className="th-starring">Starring:</th>
                    <td>
                      <table className="starring-table">
                        <tbody>
                          {movie.starring.map((star, index) => (
                            <tr className="star-row" key={index}>
                              <td className="star-actor">{star.actor}</td>
                              <td className="star-as">as</td>
                              <td className="star-role">{star.role}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                )}

                {movie.genres && movie.genres.length > 0 && (
                  <tr>
                    <th className="th-genres">Genres:</th>
                    <td>
                      <table className="genre-table">
                        <tbody>
                          {movie.genres.map((genre, index) => (
                            <tr key={index} className="td-genres">
                              <td className="td-genre">{genre}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )
      )}
    </div>
  );
};

export default GetId;
