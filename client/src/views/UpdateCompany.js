import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from 'react-bootstrap/Modal';

const UpdateCompany = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const [info, setInfo] = useState({});

  useEffect(() => {
    axios.get("http://localhost:8000/api/company/" + id).then((res) => {
      setInfo(res.data);
    });
  }, [id]);

  const handleUpdate = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.put(
        "http://localhost:8000/api/company/" + id,
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
    navigate("/companylist");
  };

  return (
    <div className="modal show"
    style={{ display: 'block', position: 'initial' }} >

<Modal.Dialog>
      <div className="row">
        <h2 className="col">Actualización de Compañia</h2>
        <div className="col">
          <button className="btn btn-info" onClick={handleClick}>
            Volver al listado
          </button>
        </div>
      </div>
      <div className="form1">
        <form onSubmit={handleUpdate}>
          <div className="row">
            <div className="col">
              <label htmlFor="nameCompany" className="form-label">
                Nombre Empresa
              </label>
              <input
                type="text"
                name="name"
                className="form-control"
                id="nameCompany"
                required
                onChange={handleChange}
                value={info.name ? info.name : ""}
              />
              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>

            <div className="col">
              <label htmlFor="phone" className="form-label">
                Telefono
              </label>
              <input
                type="text"
                name="phone"
                className="form-control"
                id="phone"
                required
                onChange={handleChange}
                value={info.phone ? info.phone : ""}
              />
              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                name="email"
                className="form-control"
                id="email"
                required
                onChange={handleChange}
                value={info.email ? info.email : ""}
              />
            </div>

            <div className="col">
              <label htmlFor="zipcode" className="form-label">
                Codigo Postal
              </label>
              <input
                type="number"
                name="zipcode"
                className="form-control"
                id="zipcode"
                required
                onChange={handleChange}
                value={info.zipcode ? info.zipcode : ""}
              />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="direccion" className="form-label">
              Direccion
            </label>
            <input
              type="text"
              name="address"
              className="form-control"
              id="direccion"
              required
              onChange={handleChange}
              value={info.address ? info.address : ""}
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
      </Modal.Dialog>
    </div>
  );
};

export default UpdateCompany;
