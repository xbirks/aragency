import { useState } from "react";
import s from "../../styles/admin.module.scss";

function itemToRow(item) {
  if (!item) return { type: "image-single", srcA: "", srcB: "" };
  if (item.type === "video") {
    return { type: "video", srcA: item.src || "", srcB: "" };
  }
  if (Array.isArray(item.src)) {
    return {
      type: "image-pair",
      srcA: item.src[0] || "",
      srcB: item.src[1] || "",
    };
  }
  return { type: "image-single", srcA: item.src || "", srcB: "" };
}

function rowToItem(row) {
  if (row.type === "video") {
    return { type: "video", src: row.srcA.trim() };
  }
  if (row.type === "image-pair") {
    return {
      type: "image",
      src: [row.srcA.trim(), row.srcB.trim()],
      layout: "pair",
    };
  }
  return { type: "image", src: row.srcA.trim() };
}

export default function GalleryEditor({ label, items, onChange, allowVideo = true }) {
  const [rows, setRows] = useState(() =>
    Array.isArray(items) && items.length ? items.map(itemToRow) : []
  );
  const [collapsed, setCollapsed] = useState(false);

  const sync = (next) => {
    setRows(next);
    const cleaned = next
      .filter((r) => r.srcA.trim() || r.srcB.trim())
      .map(rowToItem)
      .filter((it) =>
        it.type === "video"
          ? !!it.src
          : Array.isArray(it.src)
          ? it.src.every(Boolean)
          : !!it.src
      );
    onChange(cleaned);
  };

  const updateRow = (idx, patch) => {
    const next = rows.map((r, i) => (i === idx ? { ...r, ...patch } : r));
    sync(next);
  };
  const addRow = (type) => {
    setCollapsed(false);
    sync([...rows, { type, srcA: "", srcB: "" }]);
  };
  const removeRow = (idx) => sync(rows.filter((_, i) => i !== idx));
  const moveRow = (idx, dir) => {
    const target = idx + dir;
    if (target < 0 || target >= rows.length) return;
    const next = [...rows];
    [next[idx], next[target]] = [next[target], next[idx]];
    sync(next);
  };

  return (
    <div className={s.ge}>
      <div className={s.geHead} onClick={() => setCollapsed((c) => !c)}>
        <div className={s.geHeadLeft}>
          <span className={s.geToggle}>{collapsed ? "▸" : "▾"}</span>
          <h3>{label}</h3>
          <span className={s.geCount}>{rows.length}</span>
        </div>
      </div>

      {!collapsed && (
        <>
          {rows.length === 0 && (
            <p className={s.geEmpty}>Vacío. Añade un elemento.</p>
          )}

          {rows.map((row, idx) => (
            <div key={idx} className={s.geRow}>
              <div className={s.geRowControls}>
                <select
                  value={row.type}
                  onChange={(e) => updateRow(idx, { type: e.target.value })}
                >
                  <option value="image-single">Imagen sola</option>
                  <option value="image-pair">Pareja de imágenes</option>
                  {allowVideo && <option value="video">Vídeo</option>}
                </select>
                <div className={s.geRowActions}>
                  <button
                    type="button"
                    onClick={() => moveRow(idx, -1)}
                    disabled={idx === 0}
                    title="Subir"
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    onClick={() => moveRow(idx, 1)}
                    disabled={idx === rows.length - 1}
                    title="Bajar"
                  >
                    ↓
                  </button>
                  <button
                    type="button"
                    className={s.geDel}
                    onClick={() => removeRow(idx)}
                    title="Eliminar"
                  >
                    ×
                  </button>
                </div>
              </div>

              <div className={s.geRowBody}>
                <div className={s.geRowInputs}>
                  <input
                    type="text"
                    inputMode="url"
                    placeholder={
                      row.type === "video"
                        ? "URL vídeo o /ruta/local.mp4"
                        : "URL imagen o /ruta/local.jpg"
                    }
                    value={row.srcA}
                    onChange={(e) => updateRow(idx, { srcA: e.target.value })}
                  />
                  {row.type === "image-pair" && (
                    <input
                      type="text"
                      inputMode="url"
                      placeholder="URL segunda imagen o /ruta/local.jpg"
                      value={row.srcB}
                      onChange={(e) => updateRow(idx, { srcB: e.target.value })}
                    />
                  )}
                </div>

                {row.type !== "video" && (row.srcA || row.srcB) && (
                  <div className={s.gePreview}>
                    {row.srcA && <img src={row.srcA} alt="" />}
                    {row.type === "image-pair" && row.srcB && <img src={row.srcB} alt="" />}
                  </div>
                )}
              </div>
            </div>
          ))}

          <div className={s.geAdd}>
            <button type="button" onClick={() => addRow("image-single")}>
              + Imagen
            </button>
            <button type="button" onClick={() => addRow("image-pair")}>
              + Pareja
            </button>
            {allowVideo && (
              <button type="button" onClick={() => addRow("video")}>
                + Vídeo
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
