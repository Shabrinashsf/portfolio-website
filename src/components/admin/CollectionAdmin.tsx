"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { COLLECTIONS, type CollectionName, type FieldDef } from "@/lib/collections";
import { ALL_TAGS } from "@/data/tech-logos";

type Row = Record<string, unknown> & { id: number };
type Product = { name: string; url?: string; description?: string; tags: string[] };

function splitLines(v: string): string[] {
  return v.split("\n").map((s) => s.trim()).filter(Boolean);
}

const inputCls =
  "w-full px-3 py-2 rounded-lg text-sm bg-[var(--bg-page)] border outline-none focus:border-[var(--accent)] transition-colors";
const inputStyle = { borderColor: "var(--border-color)", color: "var(--text-primary)" };

function emptyForm(collection: CollectionName): Record<string, unknown> {
  const form: Record<string, unknown> = {};
  for (const f of COLLECTIONS[collection].fields) {
    if (f.type === "stringlist" || f.type === "productlist") form[f.name] = [];
    else if (f.type === "sort") form[f.name] = "";
    else if (f.enum) form[f.name] = f.enum[0];
    else form[f.name] = "";
  }
  return form;
}

function rowToForm(collection: CollectionName, row: Row): Record<string, unknown> {
  const form: Record<string, unknown> = {};
  for (const f of COLLECTIONS[collection].fields) {
    const v = row[f.name];
    if (f.type === "productlist") form[f.name] = Array.isArray(v) ? v.map((p) => ({ ...p })) : [];
    else if (v === null || v === undefined) form[f.name] = "";
    else form[f.name] = v;
  }
  return form;
}

function formToPayload(collection: CollectionName, form: Record<string, unknown>): Record<string, unknown> {
  const payload: Record<string, unknown> = {};
  for (const f of COLLECTIONS[collection].fields) {
    const v = form[f.name];
    if (f.type === "stringlist") payload[f.name] = Array.isArray(v) ? v : splitLines(String(v ?? ""));
    else if (f.type === "productlist") {
      const list = Array.isArray(v) ? v : [];
      payload[f.name] = (list as Product[]).map((p) => ({
        name: (p.name ?? "").trim(),
        url: (p.url ?? "").trim() || undefined,
        description: (p.description ?? "").trim() || undefined,
        tags: Array.isArray(p.tags) ? p.tags : splitLines(String(p.tags ?? "")),
      }));
    } else if (f.type === "sort") payload[f.name] = String(v ?? "").trim() === "" ? undefined : Number(v);
    else payload[f.name] = String(v ?? "").trim();
  }
  return payload;
}

function TagPicker({
  form,
  set,
  errors,
}: {
  form: Record<string, unknown>;
  set: (name: string, value: unknown) => void;
  errors: Record<string, string>;
}) {
  const selected = (Array.isArray(form.tags) ? form.tags : []) as string[];
  const custom = selected.filter((t) => !ALL_TAGS.includes(t));
  const err = errors.tags;

  const toggle = (tag: string) =>
    set("tags", selected.includes(tag) ? selected.filter((t) => t !== tag) : [...selected, tag]);

  return (
    <div>
      <label className="block text-[11px] font-mono font-semibold uppercase tracking-wider mb-1" style={{ color: "var(--text-muted)" }}>
        Tech Tags
      </label>
      <div className="flex flex-wrap gap-1.5">
        {[
          ...custom,
          ...ALL_TAGS.filter((t) => selected.includes(t)),
        ].map((tag) => (
          <button
            type="button"
            key={tag}
            onClick={() => toggle(tag)}
            className="px-2 py-0.5 rounded-md border text-[11px] font-medium cursor-pointer transition-colors"
            style={{
              backgroundColor: "var(--accent)",
              color: "#FDF8F2",
              borderColor: "var(--accent)",
            }}
          >
            {tag} ✕
          </button>
        ))}
        {ALL_TAGS.filter((t) => !selected.includes(t)).map((tag) => (
          <button
            type="button"
            key={tag}
            onClick={() => toggle(tag)}
            className="px-2 py-0.5 rounded-md border text-[11px] font-medium cursor-pointer transition-colors"
            style={{
              backgroundColor: "var(--bg-page)",
              color: "var(--text-muted)",
              borderColor: "var(--border-color)",
            }}
          >
            + {tag}
          </button>
        ))}
      </div>
      {custom.length === 0 && (
        <input
          className={`${inputCls} mt-2`}
          style={inputStyle}
          placeholder='Add custom tag, lalu tekan Enter'
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              const v = (e.target as HTMLInputElement).value.trim();
              if (v && !selected.includes(v)) set("tags", [...selected, v]);
              (e.target as HTMLInputElement).value = "";
            }
          }}
        />
      )}
      {err && <p className="text-xs text-rose-400 mt-1">{err}</p>}
    </div>
  );
}

function IconDropdown({
  form,
  set,
  errors,
  iconOptions,
}: {
  form: Record<string, unknown>;
  set: (name: string, value: unknown) => void;
  errors: Record<string, string>;
  iconOptions: string[];
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const value = String(form.icon ?? "");
  const text = query ?? value;
  const filtered = iconOptions.filter((p) => p.toLowerCase().includes(text.toLowerCase()));

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  return (
    <div>
      <label className="block text-[11px] font-mono font-semibold uppercase tracking-wider mb-1" style={{ color: "var(--text-muted)" }}>
        Icon
      </label>
      <div ref={ref} className="relative flex items-center gap-2">
        {value && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value} alt="" className="w-8 h-8 object-contain shrink-0" />
        )}
        <input
          className={inputCls}
          style={inputStyle}
          placeholder="/img/… or pick below"
          value={text}
          onChange={(e) => { set("icon", e.target.value); setQuery(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
        />
        <button
          type="button"
          aria-label="Toggle icon list"
          onClick={() => setOpen(!open)}
          className="shrink-0 p-2 rounded-md border cursor-pointer hover:border-[var(--accent)] transition-colors"
          style={{ borderColor: "var(--border-color)", color: "var(--text-primary)" }}
        >
          ▾
        </button>

        {open && (
          <div className="modal-scrollable absolute top-full mt-1 z-[10000] w-full max-h-64 overflow-y-auto rounded-xl border shadow-xl bg-[var(--bg-page)] p-1.5" style={{ borderColor: "var(--border-color)" }}>
            <div className="grid grid-cols-4 gap-1.5">
              {filtered.map((p) => (
                <button
                  type="button"
                  key={p}
                  onClick={() => { set("icon", p); setQuery(null); setOpen(false); }}
                  className={`flex flex-col items-center gap-0.5 px-1 py-2 rounded-lg cursor-pointer transition-colors hover:bg-[var(--subcard-bg)] ${
                    value === p ? "ring-1 ring-[var(--accent)]" : ""
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p} alt="" className="w-6 h-6 object-contain" />
                  <span className="text-[9px] font-mono truncate w-full text-center" style={{ color: "var(--text-muted)" }}>
                    {p.replace("/img/", "")}
                  </span>
                </button>
              ))}
              {filtered.length === 0 && (
                <p className="col-span-4 text-xs text-center py-3" style={{ color: "var(--text-muted)" }}>
                  No match dipakai apa adanya sebagai path
                </p>
              )}
            </div>
          </div>
        )}
      </div>
      {errors.icon && <p className="text-xs text-rose-400 mt-1">{errors.icon}</p>}
    </div>
  );
}

function FieldInput({
  def,
  form,
  set,
  errors,
  iconOptions,
}: {
  def: FieldDef;
  form: Record<string, unknown>;
  set: (name: string, value: unknown) => void;
  errors: Record<string, string>;
  iconOptions: string[];
}) {
  const value = form[def.name];
  const err = errors[def.name];

  const label = (
    <label className="block text-[11px] font-mono font-semibold uppercase tracking-wider mb-1" style={{ color: "var(--text-muted)" }}>
      {def.label}
      {def.required && <span className="text-rose-400"> *</span>}
    </label>
  );

  if (def.type === "text" && def.enum) {
    return (
      <div>
        {label}
        <select className={inputCls} style={inputStyle} value={String(value ?? "")} onChange={(e) => set(def.name, e.target.value)}>
          {def.enum.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
        {err && <p className="text-xs text-rose-400 mt-1">{err}</p>}
      </div>
    );
  }

  if (def.type === "text" && def.name === "description") {
    return (
      <div>
        {label}
        <textarea rows={4} className={`${inputCls} resize-y`} style={inputStyle} value={String(value ?? "")} onChange={(e) => set(def.name, e.target.value)} />
        {err && <p className="text-xs text-rose-400 mt-1">{err}</p>}
      </div>
    );
  }

  if (def.type === "text") {
    return (
      <div>
        {label}
        <input className={inputCls} style={inputStyle} value={String(value ?? "")} onChange={(e) => set(def.name, e.target.value)} />
        {err && <p className="text-xs text-rose-400 mt-1">{err}</p>}
      </div>
    );
  }

  if (def.type === "stringlist") {
    if (def.name === "tags") {
      return <TagPicker form={form} set={set} errors={errors} />;
    }
    return (
      <div>
        {label}
        <textarea
          rows={def.name === "bullets" ? 5 : 3}
          className={`${inputCls} resize-y font-mono text-xs`}
          style={inputStyle}
          placeholder={"One per line"}
          value={Array.isArray(value) ? (value as string[]).join("\n") : String(value ?? "")}
          onChange={(e) => set(def.name, splitLines(e.target.value))}
        />
        {err && <p className="text-xs text-rose-400 mt-1">{err}</p>}
      </div>
    );
  }

  if (def.type === "icon") {
    return <IconDropdown form={form} set={set} errors={errors} iconOptions={iconOptions} />;
  }

  if (def.type === "sort") {
    return (
      <div>
        {label}
        <input type="number" className={inputCls} style={inputStyle} placeholder="auto" value={String(value ?? "")} onChange={(e) => set(def.name, e.target.value)} />
        {err && <p className="text-xs text-rose-400 mt-1">{err}</p>}
      </div>
    );
  }

  // productlist (works only): nested products editor
  const products = (Array.isArray(value) ? value : []) as Product[];
  return (
    <div>
      {label}
      <div className="space-y-3">
        {products.map((p, i) => (
          <div key={i} className="rounded-xl border p-3 space-y-2" style={{ borderColor: "var(--border-color)", backgroundColor: "var(--bg-page)" }}>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold uppercase" style={{ color: "var(--accent)" }}>Product {i + 1}</span>
              <button
                type="button"
                className="text-xs font-semibold px-2 py-1 rounded-md border cursor-pointer hover:text-rose-400 transition-colors"
                style={{ borderColor: "var(--border-color)" }}
                onClick={() => set("products", products.filter((_, j) => j !== i))}
              >
                Remove
              </button>
            </div>
            <input className={inputCls} style={inputStyle} placeholder="Product name (e.g. Tracer Study)" value={p.name ?? ""} onChange={(e) => { const next = [...products]; next[i] = { ...p, name: e.target.value }; set("products", next); }} />
            <input className={inputCls} style={inputStyle} placeholder="URL (optional)" value={p.url ?? ""} onChange={(e) => { const next = [...products]; next[i] = { ...p, url: e.target.value }; set("products", next); }} />
            <textarea rows={3} className={`${inputCls} resize-y`} style={inputStyle} placeholder="Description (optional)" value={p.description ?? ""} onChange={(e) => { const next = [...products]; next[i] = { ...p, description: e.target.value }; set("products", next); }} />
            <textarea
              rows={2}
              className={`${inputCls} resize-y font-mono text-xs`}
              style={inputStyle}
              placeholder="Tags (one per line)"
              value={Array.isArray(p.tags) ? p.tags.join("\n") : String(p.tags ?? "")}
              onChange={(e) => { const next = [...products]; next[i] = { ...p, tags: splitLines(e.target.value) }; set("products", next); }}
            />
          </div>
        ))}
        <button
          type="button"
          className="tactile-btn-sm px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer"
          style={{ backgroundColor: "var(--subcard-bg)", color: "var(--text-primary)" }}
          onClick={() => set("products", [...products, { name: "", url: "", description: "", tags: [] }])}
        >
          + Add product
        </button>
        <p className="text-[11px]" style={{ color: "var(--text-muted)" }}>
          Untuk 1 posisi dengan beberapa project (mis. BKI + Tracer), tambahkan tiap project di sini.
        </p>
      </div>
    </div>
  );
}

export default function CollectionAdmin({
  collection,
  iconOptions,
}: {
  collection: CollectionName;
  iconOptions: string[];
}) {
  const def = COLLECTIONS[collection];
  const [rows, setRows] = useState<Row[] | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [reloadTick, setReloadTick] = useState(0);
  const [editing, setEditing] = useState<Row | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState<Record<string, unknown>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  // reload by bumping reloadTick after mutations
  const reload = useCallback(() => setReloadTick((t) => t + 1), []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`/api/content/${collection}`);
        const json = await res.json();
        if (!res.ok) throw new Error(json.error ?? "Failed to load");
        if (!cancelled) {
          setRows(Array.isArray(json.data) ? json.data : []);
          setLoadError(null);
        }
      } catch (e) {
        if (!cancelled) setLoadError(e instanceof Error ? e.message : "Failed to load");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [collection, reloadTick]);

  const set = (name: string, value: unknown) => setForm((f) => ({ ...f, [name]: value }));

  const openNew = () => {
    setEditing(null);
    setCreating(true);
    setErrors({});
    setForm(emptyForm(collection));
  };

  const openEdit = (row: Row) => {
    setCreating(false);
    setEditing(row);
    setErrors({});
    setForm(rowToForm(collection, row));
  };

  const close = () => {
    setCreating(false);
    setEditing(null);
    setErrors({});
  };

  const save = async () => {
    setSaving(true);
    setErrors({});
    try {
      const isNew = creating;
      const url = isNew ? `/api/content/${collection}` : `/api/content/${collection}/${editing!.id}`;
      const res = await fetch(url, {
        method: isNew ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formToPayload(collection, form)),
      });
      const json = await res.json();
      if (!res.ok) {
        if (json.errors) setErrors(json.errors);
        else setErrors({ _global: json.error ?? "Failed to save" });
        return;
      }
      close();
      reload();
    } catch (e) {
      setErrors({ _global: e instanceof Error ? e.message : "Failed to save" });
    } finally {
      setSaving(false);
    }
  };

  const remove = async (row: Row) => {
    const label = String(row[def.summary[0]] ?? `#${row.id}`);
    if (!window.confirm(`Delete "${label}"? This cannot be undone.`)) return;
    try {
      const res = await fetch(`/api/content/${collection}/${row.id}`, { method: "DELETE" });
      if (!res.ok) {
        const json = await res.json();
        setLoadError(json.error ?? "Failed to delete");
        return;
      }
      reload();
    } catch (e) {
      setLoadError(e instanceof Error ? e.message : "Failed to delete");
    }
  };

  const drawerOpen = creating || editing !== null;

  return (
    <div>
      {loadError && (
        <div className="mb-4 px-4 py-3 rounded-xl border text-sm" style={{ borderColor: "rgba(244,63,94,.4)", backgroundColor: "rgba(244,63,94,.08)", color: "var(--text-primary)" }}>
          {loadError}
        </div>
      )}

      <div className="flex items-center justify-between mb-4">
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          {rows === null ? "Loading…" : `${rows.length} item(s), ordered by Sort`}
        </p>
        <button className="tactile-btn px-4 py-2 rounded-xl text-sm font-semibold cursor-pointer" style={{ backgroundColor: "var(--accent)", color: "#FDF8F2" }} onClick={openNew}>
          + Add {def.title}
        </button>
      </div>

      <div className="space-y-1.5">
        {(rows ?? []).map((row) => (
          <div
            key={row.id}
            className="rounded-lg border px-3 py-1.5 flex flex-wrap items-center gap-2 text-[13px]"
            style={{ borderColor: "var(--border-color)", backgroundColor: "var(--bg-card)" }}
          >
            <span className="font-mono text-[10px] w-6 shrink-0" style={{ color: "var(--text-muted)" }}>#{String(row.sort ?? row.id)}</span>
            {def.summary.includes("icon") && typeof row.icon === "string" && row.icon && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={row.icon} alt="" className="w-4 h-4 object-contain shrink-0" />
            )}
            {def.summary.map((s) => (
              <span key={s} className="font-medium truncate max-w-[140px] sm:max-w-[220px]" style={{ color: "var(--text-primary)" }} title={String(row[s] ?? "")}>
                {String(row[s] ?? "") || <span style={{ color: "var(--text-muted)" }}>—</span>}
              </span>
            ))}
            <div className="ml-auto flex items-center gap-1.5 shrink-0">
              <button className="px-2.5 py-1 rounded-md border text-[11px] font-semibold cursor-pointer hover:border-[var(--accent)] transition-colors" style={{ borderColor: "var(--border-color)", color: "var(--text-primary)" }} onClick={() => openEdit(row)}>
                Edit
              </button>
              <button className="px-2.5 py-1 rounded-md border text-[11px] font-semibold cursor-pointer hover:!text-rose-400 hover:!border-rose-400 transition-colors" style={{ borderColor: "var(--border-color)", color: "var(--text-primary)" }} onClick={() => remove(row)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {drawerOpen && (
        <div className="fixed inset-0 z-[9999] flex justify-end" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-black/50" onClick={close} />
          <div className="relative w-full max-w-lg h-full overflow-y-auto border-l p-5 sm:p-6" style={{ backgroundColor: "var(--bg-page)", borderColor: "var(--border-color)" }}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-[Outfit] text-xl font-bold" style={{ color: "var(--text-primary)" }}>
                {creating ? "Add" : "Edit"} {def.title}
              </h2>
              <button className="p-2 rounded-lg border cursor-pointer" style={{ borderColor: "var(--border-color)", color: "var(--text-primary)" }} onClick={close} aria-label="Close">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            {errors._global && (
              <div className="mb-4 px-3 py-2 rounded-lg border text-sm" style={{ borderColor: "rgba(244,63,94,.4)", backgroundColor: "rgba(244,63,94,.08)", color: "var(--text-primary)" }}>
                {errors._global}
              </div>
            )}

            <div className="space-y-4">
              {def.fields.map((f) => (
                <FieldInput key={f.name} def={f} form={form} set={set} errors={errors} iconOptions={iconOptions} />
              ))}
            </div>

            <div className="flex items-center gap-3 mt-6">
              <button
                className="tactile-btn flex-1 px-4 py-2.5 rounded-xl text-sm font-bold cursor-pointer disabled:opacity-60"
                style={{ backgroundColor: "var(--accent)", color: "#FDF8F2" }}
                onClick={save}
                disabled={saving}
              >
                {saving ? "Saving…" : "Save"}
              </button>
              <button className="tactile-btn px-4 py-2.5 rounded-xl text-sm font-semibold cursor-pointer" style={{ backgroundColor: "var(--bg-card)", color: "var(--text-primary)" }} onClick={close}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
