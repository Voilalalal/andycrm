import React, { useState } from "react";
import axios from "axios";


const FormCompany = () => {
  
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    zipcode: "",
  });

  const [errorname, setErrorname] = useState("");
  const [erroraddress, setErroradress] = useState("");
  const [errorphone, setErrorphone] = useState("");
  const [erroremail, setErroremail] = useState("");
  const [errorzipcode, setErrorzipcode] = useState("");

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
    console.log(event.target.value);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setErrorname("");
    setErroradress("");
    setErrorphone("");
    setErroremail("");
    setErrorzipcode("");

    try {
      const response = await axios.post("http://localhost:8000/api/company", {
        ...formData,
      });
      console.log(response.data);
      setFormData({
        name: "",
        address: "",
        phone: "",
        email: "",
        zipcode: "",
      });
    } catch (error) {
      if (error.response.data.errors.name) {
        const errorMessage = error.response.data.errors.name.message;
        setErrorname(errorMessage);
      } else if (error.response.data.errors.address) {
        const errorMessage = error.response.data.errors.address.message;
        setErroradress(errorMessage);
      } else if (error.response.data.errors.phone) {
        const errorMessage = error.response.data.errors.phone.message;
        setErrorphone(errorMessage);
      } else if (error.response.data.errors.email) {
        const errorMessage = error.response.data.errors.email.message;
        setErroremail(errorMessage);
      } else {
        setErrorzipcode("Ha ocurrido un error");
      }
    }
  };

  return (
    <div className="container my-5">
      <div className="row mb-3">
        <div className="col">
          <div className="bg-success text-white py-2 px-4 rounded">
            <h4 className="fw-bold mb-0 text-center">Ingreso de Compañías</h4>
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
                <label htmlFor="nameCompany" className="form-label fw-bold">
                  Nombre de la Empresa
                </label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  id="nameCompany"
                  required
                  onChange={handleChange}
                  value={formData.name}
                />
                {errorname && (
                  <div id="emailHelp" className="form-text text-danger">
                    {errorname}
                  </div>
                )}
              </div>
              <div className="col">
                <label htmlFor="phone" className="form-label fw-bold">
                  Teléfono
                </label>
                <input
                  type="text"
                  name="phone"
                  className="form-control"
                  id="phone"
                  required
                  onChange={handleChange}
                  value={formData.phone}
                />
                {errorphone && (
                  <div id="emailHelp" className="form-text text-danger">
                    {errorphone}
                  </div>
                )}
              </div>
            </div>
            <div className="row mb-3">
              <div className="col">
                <label htmlFor="email" className="form-label fw-bold">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  id="email"
                  required
                  onChange={handleChange}
                  value={formData.email}
                />
                {erroremail && (
                  <div id="emailHelp" className="form-text text-danger">
                    {erroremail}
                  </div>
                )}
              </div>
              <div className="col">
                <label htmlFor="zipcode" className="form-label fw-bold">
                  Código Postal
                </label>
                <input
                  type="number"
                  name="zipcode"
                  className="form-control"
                  id="zipcode"
                  required
                  onChange={handleChange}
                  value={formData.zipcode}
                />
                {errorzipcode && (
                  <div id="emailHelp" className="form-text text-danger">
                    {errorzipcode}
                  </div>
                )}
              </div>
            </div>
            <div className="row mb-3">
              <div className="col">
                <label htmlFor="direccion" className="form-label fw-bold">
                  Dirección
                </label>
                <input
                  type="text"
                  name="address"
                  className="form-control"
                  id="direccion"
                  required
                  onChange={handleChange}
                  value={formData.address}
                />
                {erroraddress && (
                  <div id="emailHelp" className="form-text text-danger">
                    {erroraddress}
                  </div>
                )}
              </div>
            </div>
            <div className="row">
              <div className="col text-center">
                <button type="submit" className="btn btn-primary">
                  Crear Nuevo Cliente
                </button>
              </div>
            </div>
          </form>
         
        </div>
      </div>
    </div>
  );
};

export default FormCompany;
