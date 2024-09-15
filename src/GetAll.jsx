const GetAll = ({ movies, handleSearch }) => {
  return (
    <div className="displayed-movies">
      <input placeholder="Filter by movie title.." onChange={handleSearch} />

      {!movies.length ? (
        <h2>No movies found!</h2>
      ) : (
        movies.map((movie) => (
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
        ))
      )}
    </div>
  );
};

export default GetAll;
