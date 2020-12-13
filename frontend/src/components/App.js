import "./App.css";
import Form from "./Form";
import Zoom from "@material-ui/core/Zoom";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Zoom in={true}>
          <img
            className="logo"
            src="https://www.flaticon.com/svg/static/icons/svg/887/887742.svg"
            alt="bitcoin-avatar"
          />
        </Zoom>
        <Form />
      </header>
    </div>
  );
}

export default App;
