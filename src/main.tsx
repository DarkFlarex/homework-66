import ReactDOM from 'react-dom/client'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.min.css';
import {BrowserRouter} from "react-router-dom";
import {ToastContainer} from "react-toastify";

ReactDOM.createRoot(document.getElementById('root')!).render(
  //<React.StrictMode>
      <BrowserRouter>
          <ToastContainer  position="bottom-right"/>
          <App />
      </BrowserRouter>
 // </React.StrictMode>,
)
