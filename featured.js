(function () {
  const FONTS = "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";

  // Local logo asset from the same directory
  const logoUrl = new URL("./logo.svg", window.location.href).href;
  const BD_LOGO = `<img src="${logoUrl}" width="18" height="18" alt="BD SaaS Zone logo" style="display:block;flex-shrink:0;">`;

  const RANK_META = {
    1: { color: "#F59E0B", label: "#1" },
    2: { color: "#94A3B8", label: "#2" },
    3: { color: "#CD7F32", label: "#3" },
  };

  const THEMES = {
    light: {
      card: "background:#fff;border:1px solid #e2e8f0;border-radius:6px;padding:6px 10px;box-shadow:0 1px 2px rgba(0,0,0,.05);",
      brand: "color:#64748b;font-size:7px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;",
      name: "color:#0f172a;font-size:11px;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;",
      cat: "color:#94a3b8;font-size:7px;font-weight:600;text-transform:uppercase;",
      stat: "color:#64748b;font-size:8px;font-weight:600;",
      rank: "background:#FEF3C7;color:#92400E;border:1px solid #F59E0B;",
    },
    dark: {
      card: "background:#1e293b;border:1px solid #334155;border-radius:6px;padding:6px 10px;box-shadow:0 1px 2px rgba(0,0,0,.2);",
      brand: "color:#94a3b8;font-size:7px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;",
      name: "color:#f1f5f9;font-size:11px;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;",
      cat: "color:#64748b;font-size:7px;font-weight:600;text-transform:uppercase;",
      stat: "color:#94a3b8;font-size:8px;font-weight:600;",
      rank: "background:#334155;color:#fbbf24;border:1px solid #475569;",
    },
    minimal: {
      card: "background:transparent;border:none;padding:0;",
      brand: "color:#94a3b8;font-size:7px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;",
      name: "color:#334155;font-size:10px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;",
      cat: "color:#94a3b8;font-size:7px;font-weight:600;text-transform:uppercase;",
      stat: "color:#94a3b8;font-size:8px;font-weight:600;",
      rank: "background:#f1f5f9;color:#475569;border:1px solid #e2e8f0;",
    },
    gradient: {
      card: "background:linear-gradient(135deg,#FF6154 0%,#ff8a65 100%);border:none;border-radius:6px;padding:6px 10px;box-shadow:0 2px 8px rgba(255,97,84,.25);",
      brand: "color:rgba(255,255,255,.8);font-size:7px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;",
      name: "color:#fff;font-size:11px;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;",
      cat: "color:rgba(255,255,255,.6);font-size:7px;font-weight:600;text-transform:uppercase;",
      stat: "color:rgba(255,255,255,.85);font-size:8px;font-weight:600;",
      rank: "background:rgba(255,255,255,.2);color:#fff;border:1px solid rgba(255,255,255,.3);",
    },
    branded: {
      card: "background:#fff8f0;border:1px solid #FF6154;border-radius:6px;padding:6px 10px;box-shadow:0 1px 4px rgba(255,97,84,.1);",
      brand: "color:#FF6154;font-size:7px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;",
      name: "color:#1a1a2e;font-size:11px;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;",
      cat: "color:#94a3b8;font-size:7px;font-weight:600;text-transform:uppercase;",
      stat: "color:#FF6154;font-size:8px;font-weight:600;",
      rank: "background:#FEF3C7;color:#92400E;border:1px solid #F59E0B;",
    },
  };

  const RANK_PILL = (rank, theme) => {
    const m = RANK_META[rank];
    if (!m) return "";
    const t = THEMES[theme] || THEMES.light;
    return ` <span style="display:inline-block;font-size:7px;font-weight:700;padding:1px 4px;border-radius:999px;vertical-align:middle;${t.rank}">${m.label}</span>`;
  };

  const HEART = `<svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor" style="vertical-align:-1px"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`;

  class BDSFeatured extends HTMLElement {
    connectedCallback() {
      const slug = this.getAttribute("slug");
      const theme = this.getAttribute("theme") || "light";
      const apiBase = this.getAttribute("api-base") || "https://www.bdsaaszone.site";

      if (!slug) return;

      this.innerHTML = this._skeleton(theme);

      fetch(`${apiBase}/api/embed/featured?slug=${encodeURIComponent(slug)}`)
        .then((r) => r.json())
        .then((d) => { d.error ? (this.style.display = "none") : this._render(d, theme); })
        .catch(() => { this.style.display = "none"; });
    }

    _skeleton(theme) {
      const t = THEMES[theme] || THEMES.light;
      return `<div style="${t.card}font-family:${FONTS};display:inline-flex;align-items:center;gap:6px;min-width:140px;">
        <div style="width:24px;height:24px;border-radius:5px;background:#e2e8f0;flex-shrink:0;"></div>
        <div style="flex:1;min-width:0"><div style="width:80%;height:7px;background:#e2e8f0;border-radius:3px"></div><div style="width:50%;height:6px;background:#e2e8f0;border-radius:3px;margin-top:4px"></div></div>
      </div>`;
    }

    _render(d, theme) {
      const t = THEMES[theme] || THEMES.light;
      const slug = d.name?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      const cat = d.category ? `<span style="${t.cat}"> · ${d.category}</span>` : "";
      const rank = d.rank ? RANK_PILL(d.rank, theme) : "";

      this.innerHTML = `<a href="https://www.bdsaaszone.site/startups/${encodeURIComponent(slug)}" target="_blank" rel="noopener noreferrer" style="text-decoration:none;display:inline-flex;align-items:center;gap:6px;${t.card}font-family:${FONTS};max-width:220px;transition:box-shadow .15s" onmouseover="this.style.boxShadow='0 2px 8px rgba(0,0,0,.1)'" onmouseout="this.style.boxShadow='none'">
        ${BD_LOGO}
        <div style="flex:1;min-width:0">
          <div style="display:flex;align-items:center;gap:3px">
            <span style="${t.brand}">Featured on BD SaaS Zone</span>${rank}
          </div>
          <div style="display:flex;align-items:center;gap:1px;margin-top:1px">
            <span style="${t.name}">${d.name}</span>${cat}
          </div>
          <span style="${t.stat}">${HEART} ${d.likes ?? 0}</span>
        </div>
      </a>`;
    }
  }

  customElements.define("bds-featured", BDSFeatured);
})();
