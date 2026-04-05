import Head from 'next/head';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

const phonePrefixes = [
  { code: "+34", label: "ES" },
  { code: "+49", label: "DE" },
  { code: "+43", label: "AT" },
  { code: "+32", label: "BE" },
  { code: "+33", label: "FR" },
  { code: "+39", label: "IT" },
  { code: "+351", label: "PT" },
  { code: "+44", label: "UK" },
  { code: "+1", label: "US" },
  { code: "+1", label: "CA" },
  { code: "+54", label: "AR" },
  { code: "+55", label: "BR" },
  { code: "+56", label: "CL" },
  { code: "+57", label: "CO" },
  { code: "+52", label: "MX" },
  { code: "+51", label: "PE" },
  { code: "+58", label: "VE" },
  { code: "+593", label: "EC" },
  { code: "+595", label: "PY" },
  { code: "+598", label: "UY" },
  { code: "+506", label: "CR" },
  { code: "+507", label: "PA" },
  { code: "+502", label: "GT" },
  { code: "+504", label: "HN" },
  { code: "+503", label: "SV" },
  { code: "+505", label: "NI" },
  { code: "+591", label: "BO" },
  { code: "+1809", label: "DO" },
  { code: "+31", label: "NL" },
  { code: "+41", label: "CH" },
  { code: "+46", label: "SE" },
  { code: "+47", label: "NO" },
  { code: "+45", label: "DK" },
  { code: "+48", label: "PL" },
  { code: "+30", label: "GR" },
];

export default function SistemaPage() {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);
  const formRef = useRef(null);
  const [prefix, setPrefix] = useState("+34");
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    acceptTerms: false,
    acceptData: false,
  });

  const [fullLoaded, setFullLoaded] = useState(false);

  // Preload full video in background
  useEffect(() => {
    const full = document.createElement("video");
    full.src = "/vid/VSL_full.mp4";
    full.preload = "auto";
    full.oncanplaythrough = () => setFullLoaded(true);
    full.load();
  }, []);

  const handleActivateSound = () => {
    const current = videoRef.current;
    if (!current) return;

    // Switch to full video and play from the beginning with sound
    current.src = "/vid/VSL_full.mp4";
    current.muted = false;
    current.currentTime = 0;
    current.play().catch(() => {});
    setIsMuted(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Introduce tu nombre completo";
    if (!formData.email.trim())
      newErrors.email = "Introduce tu correo electrónico";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Introduce un correo electrónico válido";
    if (!formData.phone.trim())
      newErrors.phone = "Introduce tu número de teléfono";
    if (!formData.acceptTerms)
      newErrors.acceptTerms = "Debes aceptar los términos y condiciones";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setSending(true);

    try {
      const res = await fetch("/api/sistemaContact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: `${prefix}${formData.phone}`,
        }),
      });

      if (res.ok) {
        setSuccess(true);
      } else {
        setErrors({ general: "Error al enviar. Inténtalo de nuevo." });
      }
    } catch {
      setErrors({ general: "Error de conexión. Inténtalo de nuevo." });
    }

    setSending(false);
  };

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <>
      <Head>
        <title>AR Agency — El Sistema</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="googlebot" content="noindex, nofollow" />
      </Head>

      <main className="sistema">
        {/* ─── BRANDS BAR ─── */}
        <section className="sistema__brands">
          <p className="sistema__brands-text">Marcas como</p>
          <div className="sistema__brands-logos">
            <div className="sistema__brands-logos-track">
              <img src="/assets/landing/amazon.png" alt="Amazon" />
              <img src="/assets/landing/garnier.png" alt="Garnier" />
              <img src="/assets/landing/vogue.png" alt="Vogue" />
              <img src="/assets/landing/colgate.png" alt="Colgate" />
              <img src="/assets/landing/pantene.png" alt="Pantene" />
            </div>
            <div className="sistema__brands-logos-track sistema__brands-logos-track--clone" aria-hidden="true">
              <img src="/assets/landing/amazon.png" alt="" />
              <img src="/assets/landing/garnier.png" alt="" />
              <img src="/assets/landing/vogue.png" alt="" />
              <img src="/assets/landing/colgate.png" alt="" />
              <img src="/assets/landing/pantene.png" alt="" />
            </div>
          </div>
          <p className="sistema__brands-text">No improvisan su contenido</p>
        </section>

        {/* ─── HERO ─── */}
        <section className="sistema__hero">
          <h1 className="sistema__title">
            <span className="sistema__title-light">El sistema que usan </span>
            <span className="sistema__title-bold">
              las marcas que no tienen tiempo para errores en su contenido
            </span>
          </h1>
          <div className="sistema__subtitle">
            <p className="sistema__subtitle-main">Esto no es una agencia.</p>
            <p className="sistema__subtitle-under">
              Es tu equipo creativo externo, completamente formado y certificado.
            </p>
          </div>
        </section>

        {/* ─── DARK BAR ─── */}
        <div className="sistema__darkbar">
          <p>
            Trabajamos con un número limitado de marcas al mes para garantizar
            el nivel.
          </p>
        </div>

        {/* ─── PASO 1: VIDEO ─── */}
        <section className="sistema__step">
          <h2 className="sistema__step-title">
            <span className="sistema__step-num">Paso 1</span> Mira el vídeo
          </h2>
          <div className="sistema__video-wrapper">
            <video
              ref={videoRef}
              className="sistema__video"
              autoPlay
              loop={isMuted}
              muted={isMuted}
              playsInline
              controls
              preload="auto"
            >
              <source src="/vid/VSL_15seg.mp4" type="video/mp4" />
            </video>
            {isMuted && (
              <button
                className="sistema__sound-btn"
                onClick={handleActivateSound}
              >
                Haz click y activa el sonido
              </button>
            )}
          </div>
        </section>

        {/* ─── PASO 2: FORM ─── */}
        <section className="sistema__step" ref={formRef}>
          <h2 className="sistema__step-title">
            <span className="sistema__step-num">Paso 2</span> Agenda tu llamada
          </h2>
          <p className="sistema__step-subtitle">
            Producción al nivel de las mejores marcas
          </p>
          <div className="sistema__form-container">
                <div className="sistema__form-tab">
                  <span>1. Formulario de contacto</span>
                </div>

                <div className="sistema__form-body">
                  {success ? (
                    <div className="sistema__form-success">
                      <h3>Mensaje enviado</h3>
                      <p>
                        Hemos recibido tu solicitud. Nos pondremos en contacto
                        contigo lo antes posible.
                      </p>
                    </div>
                  ) : (
                    <>
                      <label className="sistema__label">Nombre completo</label>
                      <input
                        className={`sistema__input ${errors.name ? "sistema__input--error" : ""}`}
                        type="text"
                        name="name"
                        placeholder="CARLOS CORREA"
                        autoComplete="name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                      {errors.name && (
                        <span className="sistema__error">{errors.name}</span>
                      )}

                      <label className="sistema__label">
                        Correo electrónico
                      </label>
                      <input
                        className={`sistema__input ${errors.email ? "sistema__input--error" : ""}`}
                        type="email"
                        name="email"
                        placeholder="CARLOSCORREA@GMAIL.COM"
                        autoComplete="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                      {errors.email && (
                        <span className="sistema__error">{errors.email}</span>
                      )}

                      <label className="sistema__label">Teléfono</label>
                      <div className="sistema__phone-row">
                        <select
                          className="sistema__phone-prefix"
                          value={prefix}
                          onChange={(e) => setPrefix(e.target.value)}
                        >
                          {phonePrefixes.map((p, i) => (
                            <option key={`${p.label}-${i}`} value={p.code}>
                              {p.label} {p.code}
                            </option>
                          ))}
                        </select>
                        <input
                          className={`sistema__phone-input ${errors.phone ? "sistema__input--error" : ""}`}
                          type="tel"
                          name="phone"
                          placeholder="675 392 216"
                          autoComplete="tel-national"
                          inputMode="numeric"
                          value={formData.phone}
                          onChange={(e) => {
                            const val = e.target.value.replace(/[^0-9\s]/g, "");
                            setFormData((prev) => ({ ...prev, phone: val }));
                            if (errors.phone) {
                              setErrors((prev) => {
                                const next = { ...prev };
                                delete next.phone;
                                return next;
                              });
                            }
                          }}
                        />
                      </div>
                      {errors.phone && (
                        <span className="sistema__error">{errors.phone}</span>
                      )}

                      <div className="sistema__checkboxes">
                        <label
                          className={`sistema__checkbox ${errors.acceptTerms ? "sistema__checkbox--error" : ""}`}
                        >
                          <input
                            type="checkbox"
                            name="acceptTerms"
                            checked={formData.acceptTerms}
                            onChange={handleChange}
                          />
                          <span>
                            He leído y acepto los{" "}
                            <strong>términos y condiciones</strong>.
                          </span>
                        </label>

                        <label className="sistema__checkbox">
                          <input
                            type="checkbox"
                            name="acceptData"
                            checked={formData.acceptData}
                            onChange={handleChange}
                          />
                          <span>
                            Entiendo y acepto que mis datos sean almacenados y
                            utilizados para fines informativos, incluyendo la
                            posibilidad de ser compartidos con terceros con los
                            que exista una relación contractual, como clientes,
                            socios o colaboradores.
                          </span>
                        </label>
                      </div>

                      {errors.acceptTerms && (
                        <span className="sistema__error">
                          {errors.acceptTerms}
                        </span>
                      )}
                      {errors.general && (
                        <span className="sistema__error">
                          {errors.general}
                        </span>
                      )}

                      <button
                        className="sistema__submit"
                        onClick={handleSubmit}
                        disabled={sending}
                      >
                        <span>
                          {sending ? "Enviando..." : "Continuar"}
                        </span>
                        {!sending && (
                          <svg
                            width="13"
                            height="13"
                            viewBox="0 0 13 13"
                            fill="none"
                          >
                            <path
                              d="M1 12L12 1M12 1H3M12 1V10"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </button>
                    </>
                  )}
                </div>
              </div>
        </section>

        {/* ─── CASOS DE ÉXITO (CARRUSEL) ─── */}
        <section className="sistema__carousel">
          <div className="sistema__carousel-wrapper">
            <div className="sistema__carousel-track">
              {/* Original set */}
              <div className="sistema__carousel-slide">
                <img src="/assets/landing/caso1.jpg" alt="Caso de éxito" />
              </div>
              <div className="sistema__carousel-slide">
                <img src="/assets/landing/caso2.jpg" alt="Caso de éxito" />
              </div>
              <div className="sistema__carousel-slide">
                <video autoPlay loop muted playsInline preload="auto">
                  <source src="/assets/landing/caso3.mp4" type="video/mp4" />
                </video>
              </div>
              <div className="sistema__carousel-slide">
                <video autoPlay loop muted playsInline preload="auto">
                  <source src="/assets/landing/caso4.mp4" type="video/mp4" />
                </video>
              </div>
              {/* Duplicated for seamless loop */}
              <div className="sistema__carousel-slide">
                <img src="/assets/landing/caso1.jpg" alt="Caso de éxito" />
              </div>
              <div className="sistema__carousel-slide">
                <img src="/assets/landing/caso2.jpg" alt="Caso de éxito" />
              </div>
              <div className="sistema__carousel-slide">
                <video autoPlay loop muted playsInline preload="auto">
                  <source src="/assets/landing/caso3.mp4" type="video/mp4" />
                </video>
              </div>
              <div className="sistema__carousel-slide">
                <video autoPlay loop muted playsInline preload="auto">
                  <source src="/assets/landing/caso4.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
          </div>

          <div className="sistema__cta-center">
            <a
              href="https://www.ariannyrivasagency.com/es/modelos"
              target="_blank"
              rel="noopener noreferrer"
              className="sistema__cta-btn"
            >
              <span>Ver portafolio de la agencia</span>
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path
                  d="M1 12L12 1M12 1H3M12 1V10"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </section>

      </main>
    </>
  );
}
