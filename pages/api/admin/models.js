import fs from "fs";
import path from "path";

const MODELS_PATH = path.join(process.cwd(), "data", "models.json");
const DELETED_PATH = path.join(process.cwd(), "data", "borradas_models.json");

function readJsonAsArray(filePath) {
  if (!fs.existsSync(filePath)) return [];
  const raw = fs.readFileSync(filePath, "utf8").trim();
  if (!raw) return [];
  try {
    const data = JSON.parse(raw);
    if (Array.isArray(data)) return data;
    return [data];
  } catch (e) {
    // Tolera formatos legacy: "{...},\n{...}," (objetos sueltos sin []
    // o con coma final). Lo envolvemos y reintentamos.
    const stripped = raw.replace(/,\s*$/, "");
    const wrapped = `[${stripped}]`;
    try {
      const data = JSON.parse(wrapped);
      if (Array.isArray(data)) return data;
      return [data];
    } catch (e2) {
      throw new Error(
        `JSON inválido en ${path.basename(filePath)}: ${e.message}`
      );
    }
  }
}

function writeJsonArray(filePath, arr) {
  fs.writeFileSync(filePath, JSON.stringify(arr, null, 2) + "\n", "utf8");
}

function isDevOnly(req, res) {
  if (process.env.NODE_ENV !== "development") {
    res.status(404).json({ error: "Not found" });
    return false;
  }
  return true;
}

function validateModel(model, { existingSlugs = [], allowSlug = null } = {}) {
  if (!model || typeof model !== "object") return "Modelo inválido";
  if (!model.slug || !/^[a-z0-9-]+$/.test(model.slug))
    return "Slug inválido (solo minúsculas, números y guiones)";
  if (!model.name || !model.name.trim()) return "Falta el nombre";
  if (
    existingSlugs.includes(model.slug) &&
    model.slug !== allowSlug
  )
    return `Ya existe una modelo con slug "${model.slug}"`;
  return null;
}

function normalizeModel(model) {
  const clean = { ...model };
  clean.category = clean.category || "model";
  clean.url = `/es/modelos/${clean.slug}`;
  ["height", "bust", "waist", "hips", "shoes"].forEach((k) => {
    if (clean[k] !== undefined && clean[k] !== "" && clean[k] !== null) {
      const n = Number(clean[k]);
      clean[k] = Number.isFinite(n) ? n : clean[k];
    }
  });
  ["gallery", "digitales", "videoGallery", "ugcGallery"].forEach((k) => {
    if (!Array.isArray(clean[k])) clean[k] = [];
  });
  return clean;
}

export default function handler(req, res) {
  if (!isDevOnly(req, res)) return;

  try {
    const active = readJsonAsArray(MODELS_PATH);
    const deleted = readJsonAsArray(DELETED_PATH);

    if (req.method === "GET") {
      return res.status(200).json({ active, deleted });
    }

    if (req.method === "POST") {
      const { action, model, slug } = req.body || {};

      if (action === "create") {
        const err = validateModel(model, {
          existingSlugs: [...active, ...deleted].map((m) => m.slug),
        });
        if (err) return res.status(400).json({ error: err });
        const next = [...active, normalizeModel(model)];
        writeJsonArray(MODELS_PATH, next);
        return res.status(200).json({ ok: true });
      }

      if (action === "update") {
        if (!slug) return res.status(400).json({ error: "Falta slug" });
        const idx = active.findIndex((m) => m.slug === slug);
        if (idx === -1)
          return res.status(404).json({ error: "Modelo no encontrada" });
        const otherSlugs = [
          ...active.filter((_, i) => i !== idx),
          ...deleted,
        ].map((m) => m.slug);
        const err = validateModel(model, {
          existingSlugs: otherSlugs,
          allowSlug: slug,
        });
        if (err) return res.status(400).json({ error: err });
        const next = [...active];
        next[idx] = normalizeModel(model);
        writeJsonArray(MODELS_PATH, next);
        return res.status(200).json({ ok: true });
      }

      if (action === "delete") {
        if (!slug) return res.status(400).json({ error: "Falta slug" });
        const idx = active.findIndex((m) => m.slug === slug);
        if (idx === -1)
          return res.status(404).json({ error: "Modelo no encontrada" });
        const moved = active[idx];
        const nextActive = active.filter((_, i) => i !== idx);
        const nextDeleted = [...deleted, moved];
        writeJsonArray(MODELS_PATH, nextActive);
        writeJsonArray(DELETED_PATH, nextDeleted);
        return res.status(200).json({ ok: true });
      }

      if (action === "restore") {
        if (!slug) return res.status(400).json({ error: "Falta slug" });
        const idx = deleted.findIndex((m) => m.slug === slug);
        if (idx === -1)
          return res.status(404).json({ error: "Modelo no encontrada" });
        if (active.some((m) => m.slug === slug))
          return res
            .status(400)
            .json({ error: "Ya existe una modelo activa con ese slug" });
        const moved = deleted[idx];
        const nextDeleted = deleted.filter((_, i) => i !== idx);
        const nextActive = [...active, moved];
        writeJsonArray(MODELS_PATH, nextActive);
        writeJsonArray(DELETED_PATH, nextDeleted);
        return res.status(200).json({ ok: true });
      }

      return res.status(400).json({ error: "Acción desconocida" });
    }

    res.setHeader("Allow", ["GET", "POST"]);
    return res.status(405).json({ error: `Método ${req.method} no permitido` });
  } catch (e) {
    console.error("[admin/models] error", e);
    return res.status(500).json({ error: e.message || "Error interno" });
  }
}

export const config = {
  api: {
    bodyParser: { sizeLimit: "5mb" },
  },
};
