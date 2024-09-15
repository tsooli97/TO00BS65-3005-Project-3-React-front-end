import { useState } from "react";
import { deleteById } from "./DataRequester";

const DeleteId = () => {
  const [searchValue, setSearchValue] = useState("");
  const [message, setMessage] = useState("");

  const handleSearch = (event) => {
    setSearchValue(event.target.value);
  };

  const deleteMovieById = async () => {
    const response = await deleteById(searchValue);
    setMessage(response.message);

    if (response.message.includes("successfully")) {
      setSearchValue("");
    }
  };

  return (
    <div className="delete-id-div">
      <p>Delete a movie in the database using ID</p>
      <label className="label-id">ID: </label>
      <input value={searchValue} onChange={handleSearch} />
      <button onClick={deleteMovieById}>Delete</button>

      <p>{message}</p>
    </div>
  );
};

export default DeleteId;
