import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateUser = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const [info, setInfo] = useState({});

  useEffect(() => {
    axios.get("http://localhost:8000/api/user/" + id).then((res) => {
      setInfo(res.data);
    });
  }, [id]);

  const handleUpdate = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.put(
        "http://localhost:8000/api/user/" + id,
        info
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleClick = () => {
    navigate("/userlist");
  };

  return (
    <div className="container">
      <div className="row">
        <h2 className="col">Actualización de Usuario</h2>
        <div className="col">
          <button className="btn btn-info" onClick={handleClick}>
            Volver al listado Usuarios
          </button>
        </div>
      </div>
      <div className="form1">
        <form onSubmit={handleUpdate}>
          <div className="row">
            <div className="col">
              <label htmlFor="nameUser" className="form-label">
                Nombre Usuario
              </label>
              <input
                type="text"
                name="name"
                className="form-control"
                id="nameUser"
                required
                onChange={handleChange}
                value={info.name ? info.name : ""}
              />
              <div id="nameHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>

            <div className="col">
              <label htmlFor="lastName" className="form-label">
                Apellido
              </label>
              <input
                type="text"
                name="lastName"
                className="form-control"
                id="lastName"
                required
                onChange={handleChange}
                value={info.lastName ? info.lastName : ""}
              />
              <div id="lastNameHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <select
                className="form-select"
                id="role"
                name="role"
                required
                onChange={handleChange}
                value={info.role ? info.role : ""}
              >
                <option value="">Escoge tu Perfil</option>
                <option value="admin">Administrador</option>
                <option value="regular">Normal</option>
              </select>
            </div>

            <div className="col">
              {/* {
                <select
                  className="form-select"
                  id="company"
                  name="company"
                  required
                  value={selectedId}
                  onChange={(e) => setSelectedId(e.target.value)}
                >
                  <option value="">Selecciona una opción</option>
                  {selectedOption.map((option) => (
                    <option key={option._id} value={option._id}>
                      {option.name}
                    </option>
                  ))}
                </select>
              } */}
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="direccion" className="form-label">
              Email
            </label>
            <input
              type="text"
              name="email"
              className="form-control"
              id="direccion"
              required
              onChange={handleChange}
              value={info.email ? info.email : ""}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            style={{ marginBottom: "5px" }}
          >
            Actualizar el cliente
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateUser;
