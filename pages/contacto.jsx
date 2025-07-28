export default function ContactoAgencias() {
  return (
    <div className="contacto">

      <div className="contacto__bloque">
        <h2 className="contacto__titulo">Valencia / España</h2>
        <hr className="contacto__linea" />

        <div className="contacto__hueco">
          <div className="hueco"></div>

          <div className="contacto__tarjetas">
            <div className="contacto__fila">
              <span className="contacto__etiqueta">Dirección</span>
              <span className="contacto__dato">C/ de Sant Vicent Màrtir, 338, Jesús, 46017 València, Valencia</span>
            </div>
            <div className="contacto__fila">
              <span className="contacto__etiqueta">Teléfono</span>
              <span className="contacto__dato">+34 661 85 56 12</span>
            </div>
            <div className="contacto__fila">
              <span className="contacto__etiqueta">Email</span>
              <span className="contacto__dato">info@ariannyrivasagency.com</span>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="contacto__bloque">
        <h2 className="contacto__titulo">Miami / Florida / USA</h2>
        <hr className="contacto__linea" />

        <div className="contacto__hueco">
          <div className="hueco"></div>

          <div className="contacto__tarjetas">
            <div className="contacto__fila">
              <span className="contacto__etiqueta">Adress</span>
              <span className="contacto__dato">1110 Collins Avenue, Suite 304</span>
            </div>
            <div className="contacto__fila">
              <span className="contacto__etiqueta">Phone</span>
              <span className="contacto__dato">+1 (305) 555-7219</span>
            </div>
            <div className="contacto__fila">
              <span className="contacto__etiqueta">Email</span>
              <span className="contacto__dato">miami@ariannyrivasagency.com</span>
            </div>
          </div>
        </div>
      </div> */}

    </div>
  );
}
