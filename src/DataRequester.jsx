const getAll = async () => {
  try {
    const response = await fetch(
      "https://to00bs65-3005-project-2-rest-api.onrender.com/api/getall"
    );
    const data = await response.json();
    return data;
  } catch (err) {
    return "Failed to fetch movies: ", err;
  }
};

const getById = async (id) => {
  try {
    const response = await fetch(
      `https://to00bs65-3005-project-2-rest-api.onrender.com/api/${id}`
    );
    const data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    return "Failed to fetch movie by ID: ", err;
  }
};

const deleteById = async (id) => {
  try {
    const response = await fetch(
      `https://to00bs65-3005-project-2-rest-api.onrender.com/api/delete/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    return "Failed to delete movie by ID: ", err;
  }
};

const postAdd = async (formData) => {
  console.log("Initial Data:", formData);

  const filteredStarring = formData.starring.filter(
    (star) => star.actor.trim() !== "" && star.role.trim() !== ""
  );
  formData.starring = filteredStarring;

  const filteredGenres = formData.genres
    .filter((genre) => genre.value && genre.value.trim() !== "")
    .map((genre) => genre.value);

  formData.genres = filteredGenres;

  console.log("Filtered data", formData);

  try {
    const response = await fetch(
      `https://to00bs65-3005-project-2-rest-api.onrender.com/api/add/`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );
    const data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    return "Failed to add movie: ", err;
  }
};

const patchById = async (id, formData) => {
  console.log("Initial Data:", formData);

  if (formData.starring) {
    const filteredStarring = formData.starring.filter(
      (star) => star.actor.trim() !== "" && star.role.trim() !== ""
    );
    formData.starring = filteredStarring;
  }

  if (formData.genres) {
    const filteredGenres = formData.genres
      .filter((genre) => genre.value && genre.value.trim() !== "")
      .map((genre) => genre.value);

    formData.genres = filteredGenres;
  }

  console.log("Filtered data", formData);

  try {
    const response = await fetch(
      `https://to00bs65-3005-project-2-rest-api.onrender.com/api/update/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );
    const data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    return "Failed to update movie by ID: ", err;
  }
};

export { getAll, getById, deleteById, postAdd, patchById };
