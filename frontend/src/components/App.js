import "./App.css";
import Form from "./Form";
import Zoom from "@material-ui/core/Zoom";

function App() {
  return (
    <div className="App">
      <Zoom in={true}>
        <img
          className="logo"
          src="https://www.flaticon.com/svg/static/icons/svg/887/887742.svg"
          alt="bitcoin-avatar"
        />
      </Zoom>
      <Form />
    </div>
  );
}

export default App;
