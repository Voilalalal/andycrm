import React, { useState, useEffect } from "react";
import axios from "axios";

const FormUser = () => {
  

  const [selectedOption, setSelectedOption] = useState([]);
  const [select, setSelect] = useState();
  const [photo, setPhoto] = useState();

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

  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    role: "",
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
    console.log(event.target.value);
  };

  const handleFileChange = (event) => {
    const photo = event.target.files[0];
    setPhoto(photo);
    console.log(photo);
  };

  const handleChangeCompany = (event) => {
    const selected = event.target.value;
    setSelect(selected);
    console.log(event.target.value);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formDataWithFile = new FormData();
      formDataWithFile.append("name", formData.name);
      formDataWithFile.append("lastName", formData.lastName);
      formDataWithFile.append("email", formData.email);
      formDataWithFile.append("role", formData.role);
      formDataWithFile.append("company", select);
      formDataWithFile.append("photo", photo);

      console.log(formDataWithFile);
      const response = await axios.post(
        "http://localhost:8000/api/user",
        formDataWithFile
      );
      console.log(response.data);
      setPhoto("");
      setSelect("");
      setFormData({
        name: "",
        lastName: "",
        email: "",
        role: "",
      });
    } catch (error) {}
  };

  return (
    <div className="container p-4">
      <div className="row mb-3">
        <div className="col">
          <div className="bg-secondary text-white py-2 px-4 rounded">
            <h4 className="fw-bold mb-0 text-center">Ingreso de Usuarios</h4>
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
                <label htmlFor="name" className="form-label fw-bold">
                  Nombre Usuario
                </label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  id="name"
                  required
                  onChange={handleChange}
                  value={formData.name}
                />
              </div>
              <div className="col">
                <label htmlFor="lastName" className="form-label fw-bold">
                  Apellido
                </label>
                <input
                  type="text"
                  name="lastName"
                  className="form-control"
                  id="lastname"
                  required
                  onChange={handleChange}
                  value={formData.lastName}
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col">
                <select
                  className="form-select"
                  id="role"
                  name="role"
                  required
                  onChange={handleChange}
                  value={formData.role}
                >
                  <option value="">Escoge tu Perfil</option>
                  <option value="admin">Administrador</option>
                  <option value="regular">Normal</option>
                </select>
              </div>
              <div className="col">
                <select
                  className="form-select"
                  id="company"
                  name="company"
                  required
                  value={select}
                  onChange={handleChangeCompany}
                >
                  <option value="">Elige la Compañia</option>
                  {selectedOption.map((option) => (
                    <option key={option._id} value={option._id}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
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
            </div>
            <div className="row mb-3">
              <label htmlFor="photo" className="form-label fw-bold">
                Agrega tu Foto:
              </label>
              <input
                type="file"
                id="photo"
                filename="photo"
                onChange={handleFileChange}
              />
            </div>

            <div className="row mb-3">
              <div className="col text-center">
                <button type="submit" className="btn btn-primary">
                  Crear Nuevo Usuario
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormUser;
