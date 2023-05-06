import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FormMeet = () => {
  const navigate = useNavigate();

  const [selectedOption, setSelectedOption] = useState([]);
  const [select, setSelect] = useState();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    company: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get("http://localhost:8000/api/company");
        setSelectedOption(result.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
    console.log(event.target.value);
  };

  const handleClicks = () => {
    navigate("/meetlist");
  };

  const handleChangeCompany = (event) => {
    const selected = event.target.value;
    setSelect(selected);
    console.log(event.target.value);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/api/meet", {
        ...formData,
        company: select,
      });
      console.log(response.data);
      setFormData({
        title: "",
        description: "",
        date: "",
        company: "",
      });
      setSelect("");
    } catch (error) {}
  };

  return (
    <div className="container">
      <div className="row">
        <h3 className="col">Ingreso de Reuniones</h3>
        <div className="col">
          <button className="btn btn-info" onClick={handleClicks}>
            Listado de Reuniones
          </button>
        </div>
      </div>
      <hr></hr>
      <div className="form1">
        <form onSubmit={onSubmitHandler}>
          <div className="row">
            <div className="col">
              <label htmlFor="title" className="form-label">
                Titulo
              </label>
              <input
                type="text"
                name="title"
                className="form-control"
                id="title"
                required
                onChange={handleChange}
                value={formData.title}
              />
              <div id="titleHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
            <div className="col">
              <label htmlFor="date" className="form-label">
                Fecha
              </label>
              <input
                type="date"
                name="date"
                className="form-control"
                id="date"
                required
                onChange={handleChange}
                value={formData.date}
              />
              <div id="dateHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col">
              {
                <select
                  className="form-select"
                  id="company"
                  name="company"
                  required
                  value={select}
                  onChange={handleChangeCompany}
                >
                  <option value="">Selecciona la Compañia</option>
                  {selectedOption.map((option) => (
                    <option key={option._id} value={option._id}>
                      {option.name}
                    </option>
                  ))}
                </select>
              }
            </div>

            <div className="col">
              {/* {
                <select
                  className="form-select"
                  id="company"
                  name="company"
                  required
                  value={select}
                  onChange={handleChangeCompany}
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

          <div className="row">
            <div className="col">
              <label htmlFor="description" className="form-label">
                Descripcion
              </label>
              <input
                type="text"
                name="description"
                className="form-control"
                id="description"
                required
                onChange={handleChange}
                value={formData.description}
              />
              <div id="descriptionHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            style={{ marginBottom: "5px" }}
          >
            Ingresar Reunion
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormMeet;
