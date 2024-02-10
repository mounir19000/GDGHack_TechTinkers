// Pages importation
import Accueil from "./Pages/Accueil";
import Error from "./Pages/404";
import Footer from "./components/footer";
import Signin from "./Pages/Singin";
import Signup from "./Pages/Signup";
import UserPage from "./Pages/UserPage";
import AdminPage from "./Pages/AdminPage";

// Style
import "./index.css";

// Importations
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Accueil />}>
            {" "}
          </Route>
          <Route path="/signin" element={<Signin />}>
            {" "}
          </Route>
          <Route path="/signup" element={<Signup />}>
            {" "}
          </Route>
          <Route path="/user" element={<UserPage />}>
            {" "}
          </Route>
          <Route path="/admin" element={<AdminPage />}>
            {" "}
          </Route>
          <Route path="*" element={<Error />}>
            {" "}
          </Route>
        </Routes>
      </Router>

      <Footer></Footer>
    </>
  );
}

export default App;
