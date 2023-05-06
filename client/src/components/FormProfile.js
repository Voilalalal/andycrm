import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FormProfile = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    pass_confirm: "",
  });

  const handleClick = () => {
    navigate("/auth/login");
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
    console.log(event.target.value);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/register",
        {
          ...formData,
        }
      );
      console.log(response.data);
      setFormData({
        email: "",
        password: "",
        pass_confirm: "",
      });
    } catch (error) {}
  };

  return (
    <div className="container">
      <div className="row mb-3">
        <div className="col">
          <div className="bg-primary text-white py-2 px-4 rounded">
            <h4 className="fw-bold mb-0 text-center">Registrate</h4>
          </div>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col">
          <form
            onSubmit={onSubmitHandler}
            className="border border-black rounded p-3"
            encType="multipart/form-data"
          >
            <div className="row mb-3">
              <div className="col">
                <label htmlFor="email" className="form-label fw-bold">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  id="email"
                  required
                  onChange={handleChange}
                  value={formData.email}
                  autoComplete="off"
                />
              </div>
              <div className="col">
                <label htmlFor="password" className="form-label fw-bold">
                  Contraseña
                </label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  id="password"
                  required
                  onChange={handleChange}
                  value={formData.password}
                  autoComplete="off"
                />
              </div>
              <div className="col">
                <label htmlFor="pass_confirm" className="form-label fw-bold">
                  Repite Contraseña
                </label>
                <input
                  type="password"
                  name="pass_confirm"
                  className="form-control"
                  id="pass_confirm"
                  required
                  onChange={handleChange}
                  value={formData.pass_confirm}
                  autoComplete="off"
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col text-center">
                <button type="submit" className="btn btn-primary">
                  Crear Perfil
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="row">
        <div className="col text-center">
          <button className="btn btn-secondary" onClick={handleClick}>
            Ingresa si ya tienes cuenta!
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormProfile;
