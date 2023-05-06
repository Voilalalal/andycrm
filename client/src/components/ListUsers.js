import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";

const ListUser = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/user").then((res) => {
      console.log();
      setUser(res.data);
    });
  }, []);

  const deleteUser = (prodId) => {
    axios.delete("http://localhost:8000/api/user/" + prodId).then((res) => {
      setUser(user.filter((prods) => prods._id !== prodId));
    });
  };

  const handleClick = () => {
    navigate("/users");
  };


  return (
    <div className="container p-4">
      <div className="row">
        <h3 className="col text-center">Listado de Usuarios</h3>
      </div>
      <hr></hr>
      <table className="table align-middle mb-0 bg-white">
        <thead className="bg-light">
          <tr>
            <th className="col">Nombre</th>
            <th className="col">Apellido</th>
            <th className="col">Email</th>
            <th className="col">Role </th>
            <th className="col">Acciones </th>
          </tr>
        </thead>
        <tbody>
          {user.map((user) => (
            <tr key={user._id}>
              <th>{user.name}</th>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
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
      <div className="row p-4">
          <button className="btn btn-secondary" onClick={handleClick}>
            Agregar Usuarios
          </button>
        </div>
    </div>
  );
};

export default ListUser;
