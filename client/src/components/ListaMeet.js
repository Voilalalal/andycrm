import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";

const ListMeet = () => {
  const navigate = useNavigate();
  const [meet, setMeet] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/meet").then((res) => {
      console.log();
      setMeet(res.data);
    });
  }, []);

  const deleteUser = (prodId) => {
    axios.delete("http://localhost:8000/api/meet/" + prodId).then((res) => {
      setMeet(meet.filter((prods) => prods._id !== prodId));
    });
  };

  const handleClick = () => {
    navigate("/meet");
  };

  return (
    <div className="container">
      <div className="row">
        <h3 className="col text-center">Listado de Reuniones</h3>
      </div>
      <hr></hr>
      <table className="table align-middle mb-0 bg-white">
        <thead className="bg-light">
          <tr>
            <th className="col">Titulo</th>
            <th className="col">Descripcion</th>
            <th className="col">Fecha</th>
            <th className="col">Acciones </th>
          </tr>
        </thead>
        <tbody>
          {meet.map((meets) => (
            <tr key={meets._id}>
              <th>{meets.title}</th>
              <td>{meets.description}</td>
              <td>{meets.date}</td>
              <td>
                <Button as={Link} to={`/user/${meets._id}`}>
                  {" "}
                  Editar{" "}
                </Button>{" "}
                <button
                  className="btn btn-danger"
                  onClick={(e) => {
                    deleteUser(`${meets._id}`);
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
        <button className="btn btn-warning" onClick={handleClick}>
          Agregar Reuniones
        </button>
      </div>
    </div>
  );
};

export default ListMeet;
