import { useState } from "react";
import { postAdd } from "./DataRequester";
import { v4 as uuidv4 } from "uuid";

const PostAdd = () => {
  const [message, setMessage] = useState("");
  const [showInfo, setShowInfo] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    year: "",
    bio: "",
    director: "",
    starring: [],
    genres: [],
  });

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    if (name.startsWith("starring")) {
      const index = parseInt(name.split(".")[1]);
      const field = name.split(".")[2];

      const updatedStarring = formData.starring.map(
        (currentElement, currentIndex) =>
          currentIndex === index
            ? { ...currentElement, [field]: value }
            : currentElement
      );

      setFormData({ ...formData, starring: updatedStarring });
    } else if (name.startsWith("genre")) {
      const id = name.split(".")[1];

      const updatedGenres = formData.genres.map((currentElement) =>
        currentElement.id === id
          ? { ...currentElement, value: value }
          : currentElement
      );

      setFormData({ ...formData, genres: updatedGenres });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    const response = await postAdd(formData);

    if (response.errors) {
      const formattedErrors = Object.keys(response.errors)
        .map((key) => `${key}: ${response.errors[key].message}`)
        .join(", ");
      setMessage(formattedErrors);
    } else {
      setMessage(response.message);
      resetFormValues(response.message);
    }
  };

  const addStarringInput = () => {
    if (formData.starring.length < 10) {
      setFormData({
        ...formData,
        starring: [...formData.starring, { actor: "", role: "" }],
      });
    }
  };

  const removeStarringInput = (index) => {
    setFormData({
      ...formData,
      starring: formData.starring.filter(
        (currentElement, currentIndex) => currentIndex !== index
      ),
    });
  };

  const addGenreInput = () => {
    if (formData.genres.length < 5) {
      setFormData({
        ...formData,
        genres: [...formData.genres, { id: uuidv4(), value: "" }],
      });
    }
  };

  const removeGenreInput = (id) => {
    setFormData({
      ...formData,
      genres: formData.genres.filter((genre) => genre.id !== id),
    });
  };

  const resetFormValues = (message) => {
    if (message === "Succesfully created movie") {
      setFormData({
        name: "",
        year: "",
        bio: "",
        director: "",
        starring: [],
        genres: [],
      });
    }
  };

  const showInfoDiv = () => {
    setShowInfo(
      "Name and year are mandatory. Name should be string, and year should be between 1800 and 2030. The rest of the fields are optional, but should be string if filled. A starring input won't be included unless both actor and role fields are filled."
    );
    setTimeout(() => {
      setShowInfo("");
    }, 15000);
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <div className="form-div form-name">
          <label htmlFor="name">Name: </label>
          <input
            id="name"
            name="name"
            onChange={handleFormChange}
            value={formData.name}
            required
            minLength="2"
            maxLength="100"
            pattern="^[A-z0-9À-ž\s._:'\-]{2,}$"
          />
        </div>
        <div className="form-div form-year">
          <label htmlFor="year">Year: </label>
          <input
            id="year"
            name="year"
            type="number"
            min="1800"
            max="2030"
            onChange={handleFormChange}
            value={formData.year}
            required
            pattern="([0-9]){4}"
          />
        </div>
        <div className="form-div form-bio">
          <label htmlFor="bio">Bio: </label>
          <textarea
            id="bio"
            name="bio"
            maxLength="500"
            onChange={handleFormChange}
            value={formData.bio}
          />
        </div>
        <div className="form-div form-director">
          <label htmlFor="director">Director: </label>
          <input
            id="director"
            name="director"
            minLength="2"
            maxLength="100"
            onChange={handleFormChange}
            value={formData.director}
            pattern="^[A-z0-9À-ž\s._:'\-]{2,}$"
          />
        </div>
        <div className="form-stars">
          {formData.starring.map((currentElement, currentIndex) => (
            <div key={currentIndex} className="form-div form-star">
              {currentIndex === 0 && <label>Starring: </label>}
              <input
                className="star-actor"
                name={`starring.${currentIndex}.actor`}
                value={currentElement.actor}
                onChange={handleFormChange}
                placeholder="Actor"
                minLength="2"
                maxLength="100"
                pattern="^[A-z0-9À-ž\s._:'\-]{2,}$"
              />
              <input
                className="star-role"
                name={`starring.${currentIndex}.role`}
                onChange={handleFormChange}
                placeholder="Role"
                minLength="1"
                maxLength="100"
                pattern="^[A-z0-9À-ž\s._:'\-]{1,}$"
              />
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => removeStarringInput(currentIndex)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="form-genres">
          {formData.genres.map((currentElement, currentIndex) => (
            <div key={currentElement.id} className="form-div form-genre">
              {currentIndex === 0 && <label>Genre: </label>}
              <input
                className="genre"
                name={`genre.${currentElement.id}`}
                value={currentElement.value}
                onChange={handleFormChange}
                placeholder="Genre"
                minLength="2"
                maxLength="100"
                pattern="^[A-z0-9À-ž\s._:'\-]{2,}$"
              />
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => removeGenreInput(currentElement.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <button
          type="button"
          className="btn btn-primary"
          onClick={addStarringInput}
        >
          Add Actor/Role
        </button>

        <button
          type="button"
          className="btn btn-primary"
          onClick={addGenreInput}
        >
          Add Genre
        </button>
        <button type="submit" className="btn btn-success">
          Submit
        </button>
      </form>
      <p>{message}</p>
      <button type="button" className="btn btn-info" onClick={showInfoDiv}>
        Info
      </button>
      <div className="info-div">
        <p>{showInfo}</p>
      </div>
    </div>
  );
};

export default PostAdd;
