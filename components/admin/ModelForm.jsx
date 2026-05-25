import { useState } from "react";
import GalleryEditor from "./GalleryEditor";
import s from "../../styles/admin.module.scss";

const EMPTY_MODEL = {
  slug: "",
  name: "",
  category: "model",
  description: "",
  images: { default: "", hover: "" },
  height: "",
  bust: "",
  waist: "",
  hips: "",
  hair: "",
  eyes: "",
  shoes: "",
  hero: "",
  portfolioCover: "",
  digitalesCover: "",
  videoCover: "",
  ugcCover: "",
  gallery: [],
  digitales: [],
  videoGallery: [],
  ugcGallery: [],
};

function slugify(str) {
  return (str || "")
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function ModelForm({ initial, mode = "create", onSaved, onCancel }) {
  const [model, setModel] = useState(() => ({
    ...EMPTY_MODEL,
    ...(initial || {}),
    images: { ...EMPTY_MODEL.images, ...(initial?.images || {}) },
  }));
  const [slugTouched, setSlugTouched] = useState(mode === "edit");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const update = (patch) => setModel((m) => ({ ...m, ...patch }));
  const updateImages = (key, val) =>
    setModel((m) => ({ ...m, images: { ...m.images, [key]: val } }));

  const onName = (val) => {
    const next = { name: val };
    if (!slugTouched) next.slug = slugify(val);
    update(next);
  };

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    setSaving(true);
    try {
      const body =
        mode === "create"
          ? { action: "create", model }
          : { action: "update", slug: initial.slug, model };
      const r = await fetch("/api/admin/models", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error || "Error al guardar");
      onSaved?.();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const thumbs = [
    ["default (card)", model.images.default, (v) => updateImages("default", v)],
    ["hover (card)", model.images.hover, (v) => updateImages("hover", v)],
    ["hero", model.hero, (v) => update({ hero: v })],
    ["portada portfolio", model.portfolioCover, (v) => update({ portfolioCover: v })],
    ["portada digitales", model.digitalesCover, (v) => update({ digitalesCover: v })],
    ["portada vídeo", model.videoCover, (v) => update({ videoCover: v })],
    ["portada ugc", model.ugcCover, (v) => update({ ugcCover: v })],
  ];

  const measures = [
    ["height", "Altura (cm)"],
    ["bust", "Pecho (cm)"],
    ["waist", "Cintura (cm)"],
    ["hips", "Cadera (cm)"],
    ["shoes", "Zapato (EU)"],
  ];

  return (
    <form onSubmit={submit} className={s.form}>
      {error && <div className={s.formError}>{error}</div>}

      <section className={s.section}>
        <h2 className={s.sectionTitle}>Datos básicos</h2>
        <div className={s.grid2}>
          <label className={s.field}>
            <span>Nombre</span>
            <input
              type="text"
              required
              value={model.name}
              onChange={(e) => onName(e.target.value)}
              placeholder="Ej: Alba García"
            />
          </label>
          <label className={s.field}>
            <span>
              Slug <small>· /es/modelos/{model.slug || "..."}</small>
            </span>
            <input
              type="text"
              required
              pattern="[a-z0-9-]+"
              value={model.slug}
              onChange={(e) => {
                setSlugTouched(true);
                update({ slug: slugify(e.target.value) });
              }}
              disabled={mode === "edit"}
              placeholder="alba-garcia-riera"
            />
          </label>
          <label className={s.field}>
            <span>Categoría</span>
            <select
              value={model.category}
              onChange={(e) => update({ category: e.target.value })}
            >
              <option value="model">Modelo</option>
              <option value="newface">New Face</option>
            </select>
          </label>
        </div>

        <label className={`${s.field} ${s.full}`}>
          <span>
            Descripción <small>· acepta HTML (&lt;strong&gt;, &lt;br&gt;)</small>
          </span>
          <textarea
            rows={6}
            value={model.description}
            onChange={(e) => update({ description: e.target.value })}
            placeholder="<strong>Nombre completo</strong> es una modelo..."
          />
        </label>
      </section>

      <section className={s.section}>
        <h2 className={s.sectionTitle}>Medidas</h2>
        <div className={s.gridNarrow}>
          {measures.map(([k, label]) => (
            <label key={k} className={s.field}>
              <span>{label}</span>
              <input
                type="number"
                value={model[k]}
                onChange={(e) => update({ [k]: e.target.value })}
              />
            </label>
          ))}
          <label className={s.field}>
            <span>Pelo</span>
            <input
              type="text"
              value={model.hair}
              onChange={(e) => update({ hair: e.target.value })}
            />
          </label>
          <label className={s.field}>
            <span>Ojos</span>
            <input
              type="text"
              value={model.eyes}
              onChange={(e) => update({ eyes: e.target.value })}
            />
          </label>
        </div>
      </section>

      <section className={s.section}>
        <h2 className={s.sectionTitle}>Imágenes principales</h2>
        <p className={s.hint}>
          Pega las URLs de Cloudinary. El preview aparece al momento.
        </p>
        <div className={s.thumbs}>
          {thumbs.map(([label, val, setter]) => (
            <div key={label} className={s.thumb}>
              <div className={s.thumbPreview}>
                {val ? <img src={val} alt="" /> : <span>Sin imagen</span>}
              </div>
              <label className={s.field}>
                <span>{label}</span>
                <input
                  type="text"
                  inputMode="url"
                  value={val || ""}
                  onChange={(e) => setter(e.target.value)}
                  placeholder="https://... o /ruta/local.jpg"
                />
              </label>
            </div>
          ))}
        </div>
      </section>

      <section className={s.section}>
        <h2 className={s.sectionTitle}>Galerías</h2>
        <GalleryEditor
          label="Portfolio"
          items={model.gallery}
          onChange={(items) => update({ gallery: items })}
          allowVideo={false}
        />
        <GalleryEditor
          label="Digitales"
          items={model.digitales}
          onChange={(items) => update({ digitales: items })}
          allowVideo={false}
        />
        <GalleryEditor
          label="Vídeos"
          items={model.videoGallery}
          onChange={(items) => update({ videoGallery: items })}
          allowVideo={true}
        />
        <GalleryEditor
          label="UGC"
          items={model.ugcGallery}
          onChange={(items) => update({ ugcGallery: items })}
          allowVideo={true}
        />
      </section>

      <div className={s.formActions}>
        <button type="button" className={`${s.btn} ${s.btnGhost}`} onClick={onCancel} disabled={saving}>
          Cancelar
        </button>
        <button type="submit" className={`${s.btn} ${s.btnPrimary}`} disabled={saving}>
          {saving ? "Guardando…" : mode === "edit" ? "Guardar cambios" : "Crear"}
        </button>
      </div>
    </form>
  );
}
