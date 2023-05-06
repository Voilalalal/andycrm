//import "./App.css";
//import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FormCompany from "./components/FormCompany";
import Main from "./views/Main";
import UpdateCompany from "./views/UpdateCompany";
import ListUser from "./components/ListUser";
import FormUser from "./components/FormUser";
import ListUsers from "./components/ListUsers";
import UpdateUser from "./views/UpdateUser";
import ListMeet from "./components/ListaMeet";
import FormMeet from "./components/FormMeet";
import FormProfile from "./components/FormProfile";
import FormLogin from "./components/FormLogin";

function App() {
  return (
    <div>
      <BrowserRouter>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            Navbar
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="/companylist">
                Compañias
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/userlist">
                  Usuarios
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/meetlist">
                  Reuniones
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
        <Routes>
          <Route path="/" element={<FormCompany />} />
          <Route path="/company/:id" element={<UpdateCompany />} />
          <Route path="/companylist" element={<Main />} />
          <Route path="/users/:id" element={<ListUser />} />
          <Route path="/users" element={<FormUser />} />
          <Route path="/userlist" element={<ListUsers />} />
          <Route path="/user/:id" element={<UpdateUser />} />
          <Route path="/meetlist" element={<ListMeet />} />
          <Route path="/meet" element={<FormMeet />} />
          <Route path="/auth/register" element={<FormProfile />} />
          <Route path="/auth/login" element={<FormLogin />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
