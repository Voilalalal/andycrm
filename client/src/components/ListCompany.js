import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "../App.css";
import axios from "axios";
import Button from "react-bootstrap/Button";

const ListCompany = (props) => {
  const navigate = useNavigate();

  const { removeFromDom } = props;

  const { companies } = props;

  const deleteCompany = (prodId) => {
    axios.delete("http://localhost:8000/api/company/" + prodId).then((res) => {
      removeFromDom(prodId);
    });
  };

  const handleClick = () => {
    navigate("/");
  };

  return (
    <div className="container">
      <div className="row">
        <h3 className="text-center">Listado de Compañias</h3>
      </div>
      <hr></hr>

      <table className="table align-middle mb-0 bg-white">
        <thead className="bg-light">
          <tr>
            <th className="col">Nombre</th>
            <th className="col">Email</th>
            <th className="col">Telefono</th>
            <th className="col">Acciones </th>
            <th className="col">Contactos </th>
            {/* <th className="col">Reuniones </th> */}
          </tr>
        </thead>
        <tbody>
          {companies.map((cmp) => (
            <tr key={cmp._id}>
              <th>{cmp.name}</th>
              <td>{cmp.email}</td>
              <td>{cmp.phone}</td>
              <td>
                <Button as={Link} to={`/company/${cmp._id}`} variant="outline-primary">
                  {" "}
                  Editar{" "}
                </Button>{" "}
                <button
                  className="btn btn-outline-danger"
                  onClick={(e) => {
                    deleteCompany(cmp._id);
                  }}
                >
                  {" "}
                  Eliminar{" "}
                </button>
              </td>
              <td>
                <Button
                  variant="outline-success"
                  as={Link}
                  to={`/users/${cmp._id}`}
                >
                  {" "}
                  ir a Contactos{" "}
                </Button>
              </td>
              {/* <td>
                <Button
                  className="btn btn-warning"
                  as={Link}
                  to={`/ListMeet/${cmp._id}`}
                >
                  {" "}
                  ir a{" "}
                </Button>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="row p-4">
          <button className="btn btn-success" onClick={handleClick}>
            Agregar Compañia
          </button>
        </div>
    </div>
  );
};

export default ListCompany;
