import React, { useState } from "react";
import Compressor from "compressorjs";
import Link from "next/link";


function ModelApplicationForm() {
  const [formData, setFormData] = useState({
    gender: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    instagram: "",
    country: "",
    city: "",
    height: "",
    images: [],
  });

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [acceptedData, setAcceptedData] = useState(false);
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 3); // máximo 3
    files.forEach((file) => {
      new Compressor(file, {
        quality: 0.6,
        maxWidth: 1920,
        maxHeight: 1080,
        success(result) {
          const reader = new FileReader();
          reader.readAsDataURL(result);
          reader.onloadend = () => {
            setFormData((prev) => ({
              ...prev,
              images: [...prev.images, reader.result],
            }));
            setSelectedFiles((prev) => [...prev, result.name]);
          };
        },
        error(err) {
          console.error("Error al comprimir la imagen:", err.message);
        },
      });
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!acceptedTerms || !acceptedData) {
      alert("Debes aceptar los términos y la política de datos antes de enviar.");
      return;
    }

    try {
      const res = await fetch("/api/modelApplication", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({
          gender: "",
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          instagram: "",
          country: "",
          city: "",
          height: "",
          images: [],
        });
        setSelectedFiles([]);
        setAcceptedTerms(false);
        setAcceptedData(false);
      } else {
        const error = await res.text();
        throw new Error(error);
      }
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      setStatus("error");
    }
  };

  return (
    <div className="form-model">
      <h1 className="form-model__title">SER MODELO</h1>

      <p className="form-model__intro">
        PARA QUE PODAMOS VALORAR TU PERFIL, COMPLETA EL SIGUIENTE FORMULARIO E
        INCLUYE ALGUNAS FOTOS TUYAS, TANTO DE CARA COMO DE CUERPO ENTERO, SIN
        MAQUILLAJE Y CON EL PELO AL NATURAL, HECHAS EN UN SITIO BIEN ILUMINADO.
        <br></br><br></br>NO HACE FALTA QUE SEAN FOTOS PROFESIONALES: UNAS HECHAS CON EL MÓVIL POR
        UN AMIGO O UN FAMILIAR NOS SIRVEN PERFECTAMENTE.
      </p>

      <form onSubmit={handleSubmit} className="form-model__fields">
        {/* GÉNERO */}
        <fieldset className="gender-group">
          {/* <legend>GÉNERO</legend> */}
          {[
            { label: "MUJER", value: "Mujer" },
            { label: "HOMBRE", value: "Hombre" },
            { label: "OTROS", value: "Otros" },
          ].map(({ label, value }) => (
            <label key={value} className="gender-option">
              <input
                type="radio"
                name="gender"
                value={value}
                checked={formData.gender === value}
                onChange={handleChange}
                required
              />
              {label}
            </label>
          ))}
        </fieldset>

        {/* DATOS PERSONALES */}
        <input
          type="text"
          name="firstName"
          placeholder="Nombre"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Apellidos"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Teléfono"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="instagram"
          placeholder="Instagram"
          value={formData.instagram}
          onChange={handleChange}
        />

        <div className="row-two">
          <input
            type="text"
            name="country"
            placeholder="País"
            value={formData.country}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="city"
            placeholder="Ciudad"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>

        <input
          type="text"
          name="height"
          placeholder="Altura (cm)"
          value={formData.height}
          onChange={handleChange}
          required
        />

        {/* SECCIÓN FOTO */}
        <section className="photos-info">
          <h2>TUS FOTOS</h2>
          <p>/ CUERPO ENTERO, PRIMER PLANO Y PERFIL.</p>
          <p>/ SIN MAQUILLAJE.</p>
          <p>/ LUZ NATURAL.</p>
          <p>/ FOTOGRAFÍAS SENCILLAS Y SOBRIAS.</p>
        </section>

        <input
          type="file"
          id="file-upload"
          multiple
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        <label htmlFor="file-upload" className="upload-placeholder">
          SUBIR FOTOS
        </label>
        <div className="file-list">
          {selectedFiles.length > 0
            ? selectedFiles.join(", ")
            : "Ninguna foto seleccionada"}
        </div>

        {/* CHECKBOXES */}
        <label className="checkbox-line">
          <input
            type="checkbox"
            checked={acceptedTerms}
            onChange={() => setAcceptedTerms((prev) => !prev)}
          />
          He leído y acepto los <Link href="#">términos y condiciones</Link>.
        </label>

        <label className="checkbox-line">
          <input
            type="checkbox"
            checked={acceptedData}
            onChange={() => setAcceptedData((prev) => !prev)}
          />
          Entiendo y acepto que mis datos sean almacenados y utilizados para
          fines informativos, incluyendo la posibilidad de ser compartidos con
          terceros con los que exista una relación contractual, como clientes,
          socios o colaboradores.
        </label>

        <button
          type="submit"
          className="submit-button"
          disabled={!acceptedTerms || !acceptedData}
        >
          ENVIAR
        </button>

        {status === "success" && (
          <p className="success-msg">¡Formulario enviado correctamente!</p>
        )}
        {status === "error" && (
          <p className="error-msg">Ha ocurrido un error. Inténtalo de nuevo.</p>
        )}
      </form>
    </div>
  );
}

export default ModelApplicationForm;