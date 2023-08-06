import "./App.css";
import Form from "./Form";
import logo from "../images/logo.png"
import {makeStyles, Zoom} from "@material-ui/core"

const useStyles = makeStyles({
  root: {
    fontFamily: "Montserrat",
  },
});

function App() {
    const classes = useStyles();
  return (
    <div className={`App ${classes.root}`}>
      <Zoom in={true}>
        <img className="logo" src={logo} alt="bitcoin-avatar" />
      </Zoom>
      <Form />
      <a className="attribute-link" href="https://www.flaticon.com/free-icons/crypto" title="crypto icons">
        Crypto icons created by microstd - Flaticon
      </a>
    </div>
  );
}

export default App;
