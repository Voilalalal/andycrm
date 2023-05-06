import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { useParams, Link, useNavigate } from "react-router-dom";

const ListUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [user, setUser] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/usercompany/" + id).then((res) => {
      
      setUser(res.data);
      console.log(res.data);
    });
  }, [id]);

  const deleteUser = (prodId) => {
    axios.delete("http://localhost:8000/api/user/" + prodId).then((res) => {
      setUser(user.filter((prods) => prods._id !== prodId));
    });
  };

  const handleClick = () => {
    navigate("/users");
  };

  const handleClicks = () => {
    navigate("/companylist");
  };
  return (
    <div className="container">
      <div className="row">
        <h3 className="col">Listado de Usuarios</h3>
        <div className="col">
          <button className="btn btn-secondary" onClick={handleClick}>
            Agregar Usuarios
          </button>
        </div>
      </div>
      <hr></hr>
      <table className="table align-middle mb-0 bg-white">
        <thead className="bg-light">
          <tr>
            <th>Name</th>
            <th>Apellido</th>
            <th>Email</th>
            <th>Roles</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {user.map((user) => (
            <tr key={user._id}>
              <td>
                <div className="d-flex align-items-center">
                  <img
                    src={`/${user.photo}`}
                    alt="..."
                    style={{ width: "45px", height: "45px" }}
                    className="rounded-circle"
                  />
                  
                  <div className="ms-3">
                    <p className="fw-bold mb-1">{user.name}</p>
                  </div>
                </div>
              </td>
              <td>
                <p className="fw-normal mb-1">{user.lastName}</p>
              </td>
              <td>
                <p className="fw-normal mb-1">{user.email}</p>
              </td>
              <td>{user.role}</td>
              <td>
                <Button as={Link} to={`/user/${user._id}`}>
                  {" "}
                  Editar{" "}
                </Button>{" "}
                <button
                  className="btn btn-danger"
                  onClick={(e) => {
                    deleteUser(`${user._id}`);
                  }}
                >
                  {" "}
                  Eliminar{" "}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    
      <div className="row">
        <button className="btn btn-success" onClick={handleClicks}>
          Volver al Listado de Compañia
        </button>
      </div>
    </div>
  );
};

export default ListUser;
