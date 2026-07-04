(function () {
  const FONTS = "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";

  // Official BD SaaS Zone logo from /public/logo.svg
  const BD_LOGO = `<svg width="18" height="18" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M23.25 0H0.96875C0.43291 0 0 0.43291 0 0.96875V23.25C0 23.7858 0.43291 24.2188 0.96875 24.2188H23.25C23.7858 24.2188 24.2188 23.7858 24.2188 23.25V0.96875C24.2188 0.43291 23.7858 0 23.25 0ZM12.1427 12.294L6.33018 17.1681C6.17275 17.3013 5.93359 17.1893 5.93359 16.9834V15.0853C5.93359 15.0156 5.96689 14.946 6.02139 14.9006L9.34541 12.1094L6.02139 9.31816C5.99356 9.29619 5.97117 9.2681 5.95594 9.23607C5.94072 9.20405 5.93307 9.16895 5.93359 9.1335V7.23535C5.93359 7.02949 6.17275 6.91748 6.33018 7.05068L12.1427 11.9217C12.2607 12.0186 12.2607 12.1972 12.1427 12.294ZM18.2852 16.9834C18.2852 17.1166 18.1822 17.2256 18.0581 17.2256H12.4575C12.3334 17.2256 12.2305 17.1166 12.2305 16.9834V15.5303C12.2305 15.3971 12.3334 15.2881 12.4575 15.2881H18.0581C18.1822 15.2881 18.2852 15.3971 18.2852 15.5303V16.9834Z" fill="#2B7FFF"/></svg>`;

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
          <div style="display:flex;align-items:center;gap:3px;margin-top:1px">
            <span style="${t.name}">${d.name}</span>${cat}
          </div>
          <span style="${t.stat}">${HEART} ${d.likes ?? 0}</span>
        </div>
      </a>`;
    }
  }

  customElements.define("bds-featured", BDSFeatured);
})();
