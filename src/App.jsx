import "./App.css";
import DisplayManager from "./DisplayManager";

const App = () => {
  return (
    <>
      <h1>Welcome to My Movie Database App</h1>

      <div className="allmovies-div">
        <DisplayManager />
      </div>
    </>
  );
};

export default App;
