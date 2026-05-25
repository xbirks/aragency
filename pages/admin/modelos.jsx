import { useEffect, useMemo, useState } from "react";
import Head from "next/head";
import ModelForm from "../../components/admin/ModelForm";
import s from "../../styles/admin.module.scss";

export default function AdminModelos({ enabled }) {
  const [tab, setTab] = useState("model");
  const [data, setData] = useState({ active: [], deleted: [] });
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [busy, setBusy] = useState(null);
  const [msg, setMsg] = useState(null);
  const [query, setQuery] = useState("");

  const load = async () => {
    setLoading(true);
    try {
      const r = await fetch("/api/admin/models");
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || "Error cargando datos");
      setData(d);
    } catch (e) {
      setMsg({ type: "error", text: e.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (enabled) load();
  }, [enabled]);

  const flash = (text, type = "ok") => {
    setMsg({ type, text });
    setTimeout(() => setMsg(null), 4000);
  };

  const action = async (body, okMsg) => {
    setBusy(body.slug || "new");
    try {
      const r = await fetch("/api/admin/models", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || "Error");
      await load();
      flash(okMsg);
    } catch (e) {
      flash(e.message, "error");
    } finally {
      setBusy(null);
    }
  };

  const onDelete = (slug, name) => {
    if (!confirm(`¿Mover "${name}" a borradas?`)) return;
    action({ action: "delete", slug }, `"${name}" movida a borradas`);
  };
  const onRestore = (slug, name) =>
    action({ action: "restore", slug }, `"${name}" restaurada`);

  const counts = useMemo(() => {
    const models = data.active.filter((m) => m.category === "model").length;
    const newfaces = data.active.filter((m) => m.category === "newface").length;
    return { models, newfaces, deleted: data.deleted.length };
  }, [data]);

  const list = useMemo(() => {
    let base;
    if (tab === "model") base = data.active.filter((m) => m.category === "model");
    else if (tab === "newface") base = data.active.filter((m) => m.category === "newface");
    else base = data.deleted;
    const sorted = [...base].sort((a, b) =>
      a.name.localeCompare(b.name, "es", { sensitivity: "base" })
    );
    if (!query.trim()) return sorted;
    const q = query.toLowerCase();
    return sorted.filter(
      (m) => m.name.toLowerCase().includes(q) || m.slug.toLowerCase().includes(q)
    );
  }, [data, tab, query]);

  if (!enabled) {
    return (
      <div className={s.wrap}>
        <div className={s.notFound}>404 — Not found</div>
      </div>
    );
  }

  if (editing) {
    const isCreate = editing.mode === "create";
    return (
      <div className={s.wrap}>
        <Head>
          <title>{isCreate ? "Nueva" : "Editar"} · Admin</title>
        </Head>
        <header className={s.hd}>
          <div>
            <button type="button" className={s.backBtn} onClick={() => setEditing(null)}>
              ← Volver
            </button>
            <h1 className={s.title}>
              {isCreate
                ? `Nueva ${editing.category === "newface" ? "new face" : "modelo"}`
                : `Editar · ${editing.model.name}`}
            </h1>
          </div>
        </header>
        <ModelForm
          mode={isCreate ? "create" : "edit"}
          initial={isCreate ? { category: editing.category } : editing.model}
          onSaved={() => {
            const wasCreate = isCreate;
            const cat = isCreate ? editing.category : editing.model.category;
            setEditing(null);
            load();
            flash(wasCreate ? "Modelo creada" : "Cambios guardados");
            setTab(cat === "newface" ? "newface" : "model");
          }}
          onCancel={() => setEditing(null)}
        />
      </div>
    );
  }

  const emptyText =
    tab === "model"
      ? "No hay modelos."
      : tab === "newface"
      ? "No hay new faces."
      : "Papelera vacía.";

  return (
    <div className={s.wrap}>
      <Head>
        <title>Admin · Modelos</title>
      </Head>

      <header className={s.hd}>
        <div>
          <p className={s.eyebrow}>AR Agency</p>
          <h1 className={s.title}>Gestión de modelos</h1>
        </div>
        <div className={s.hdActions}>
          <button
            type="button"
            className={`${s.btn} ${s.btnGhost}`}
            onClick={() => setEditing({ mode: "create", category: "newface" })}
          >
            + New Face
          </button>
          <button
            type="button"
            className={`${s.btn} ${s.btnPrimary}`}
            onClick={() => setEditing({ mode: "create", category: "model" })}
          >
            + Modelo
          </button>
        </div>
      </header>

      {msg && (
        <div className={`${s.flash} ${msg.type === "error" ? s.err : s.ok}`}>
          {msg.text}
        </div>
      )}

      <div className={s.tabsRow}>
        <nav className={s.tabs}>
          <button type="button" className={tab === "model" ? s.on : ""} onClick={() => setTab("model")}>
            Modelos <span>{counts.models}</span>
          </button>
          <button type="button" className={tab === "newface" ? s.on : ""} onClick={() => setTab("newface")}>
            New Faces <span>{counts.newfaces}</span>
          </button>
          <button type="button" className={tab === "deleted" ? s.on : ""} onClick={() => setTab("deleted")}>
            Borradas <span>{counts.deleted}</span>
          </button>
        </nav>
        <input
          type="search"
          className={s.search}
          placeholder="Buscar..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {loading ? (
        <p className={s.state}>Cargando…</p>
      ) : list.length === 0 ? (
        <p className={s.state}>{emptyText}</p>
      ) : (
        <div className={s.grid}>
          {list.map((m) => (
            <article key={m.slug} className={s.card}>
              <div className={s.cardImg}>
                {m.images?.default ? (
                  <img src={m.images.default} alt={m.name} loading="lazy" />
                ) : (
                  <div className={s.cardImgEmpty}>Sin imagen</div>
                )}
                {m.category === "newface" && <span className={s.badge}>New face</span>}
              </div>
              <div className={s.cardBody}>
                <h3 className={s.cardName}>{m.name}</h3>
                <p className={s.cardSlug}>{m.slug}</p>
              </div>
              <div className={s.cardActions}>
                {tab === "deleted" ? (
                  <button
                    type="button"
                    onClick={() => onRestore(m.slug, m.name)}
                    disabled={busy === m.slug}
                  >
                    Restaurar
                  </button>
                ) : (
                  <>
                    <a
                      className={s.ghost}
                      href={`/es/modelos/${m.slug}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Ver
                    </a>
                    <button
                      type="button"
                      onClick={() => setEditing({ mode: "edit", model: m })}
                      disabled={busy === m.slug}
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      className={s.danger}
                      onClick={() => onDelete(m.slug, m.name)}
                      disabled={busy === m.slug}
                    >
                      Borrar
                    </button>
                  </>
                )}
              </div>
            </article>
          ))}
        </div>
      )}

      <footer className={s.ft}>
        Tras editar ejecuta <code>git add data/ && git commit && git push</code>
      </footer>
    </div>
  );
}

export async function getServerSideProps() {
  return {
    props: {
      enabled: process.env.NODE_ENV === "development",
    },
  };
}
