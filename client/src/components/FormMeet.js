import React, { useState, useEffect } from "react";
import axios from "axios";

const FormMeet = () => {
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
    <div className="container my-5">
      <div className="row mb-3">
        <div className="col">
          <div className="bg-warning text-white py-2 px-4 rounded">
            <h3 className="col text-center text-black">Ingreso de Reuniones</h3>
          </div>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col">
          <form
            onSubmit={onSubmitHandler}
            className="border border-black rounded p-3"
          >
            <div className="row mb-3">
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
            <div className="row mb-3">
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
            <div className="row mb-3">
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
            <div className="row">
              <div className="col text-center">
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ marginBottom: "5px" }}
                >
                  Ingresar Reunion
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormMeet;
