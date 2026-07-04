(function () {
  const FONTS = "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";

  const LOGO_SVG = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="6" fill="#FF6154"/><path d="M7 7h4.5a3.5 3.5 0 0 1 0 7H7V7Z" fill="#fff"/><path d="M7 14h5a3.5 3.5 0 0 1 0 7H7v-7Z" fill="#fff" opacity=".6"/></svg>`;

  const RANK_META = {
    1: { color: "#F59E0B", label: "#1" },
    2: { color: "#94A3B8", label: "#2" },
    3: { color: "#CD7F32", label: "#3" },
  };

  const THEMES = {
    light: {
      card: "background:#fff;border:1px solid #e2e8f0;border-radius:12px;padding:14px 18px;box-shadow:0 1px 3px rgba(0,0,0,.06);",
      logo: "margin-right:8px;",
      brand: "color:#64748b;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;",
      name: "color:#0f172a;font-size:14px;font-weight:700;margin-top:4px;",
      desc: "color:#94a3b8;font-size:11px;margin-top:3px;line-height:1.4;",
      stat: "color:#64748b;font-size:11px;font-weight:600;",
      rank: "background:#FEF3C7;color:#92400E;border:1px solid #F59E0B;",
    },
    dark: {
      card: "background:#1e293b;border:1px solid #334155;border-radius:12px;padding:14px 18px;box-shadow:0 1px 3px rgba(0,0,0,.3);",
      logo: "margin-right:8px;",
      brand: "color:#94a3b8;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;",
      name: "color:#f1f5f9;font-size:14px;font-weight:700;margin-top:4px;",
      desc: "color:#64748b;font-size:11px;margin-top:3px;line-height:1.4;",
      stat: "color:#94a3b8;font-size:11px;font-weight:600;",
      rank: "background:#334155;color:#fbbf24;border:1px solid #475569;",
    },
    minimal: {
      card: "background:transparent;border:none;padding:0;",
      logo: "margin-right:6px;",
      brand: "color:#94a3b8;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;",
      name: "color:#334155;font-size:13px;font-weight:600;margin-top:0;",
      desc: "",
      stat: "color:#94a3b8;font-size:10px;font-weight:600;",
      rank: "background:#f1f5f9;color:#475569;border:1px solid #e2e8f0;",
    },
    gradient: {
      card: "background:linear-gradient(135deg,#FF6154 0%,#ff8a65 100%);border:none;border-radius:12px;padding:14px 18px;box-shadow:0 4px 14px rgba(255,97,84,.3);",
      logo: "margin-right:8px;filter:brightness(10);",
      brand: "color:rgba(255,255,255,.85);font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;",
      name: "color:#fff;font-size:14px;font-weight:700;margin-top:4px;",
      desc: "color:rgba(255,255,255,.75);font-size:11px;margin-top:3px;line-height:1.4;",
      stat: "color:rgba(255,255,255,.9);font-size:11px;font-weight:600;",
      rank: "background:rgba(255,255,255,.2);color:#fff;border:1px solid rgba(255,255,255,.3);",
    },
    branded: {
      card: "background:#fff8f0;border:1.5px solid #FF6154;border-radius:12px;padding:14px 18px;box-shadow:0 2px 8px rgba(255,97,84,.12);",
      logo: "margin-right:8px;",
      brand: "color:#FF6154;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;",
      name: "color:#1a1a2e;font-size:14px;font-weight:700;margin-top:4px;",
      desc: "color:#64748b;font-size:11px;margin-top:3px;line-height:1.4;",
      stat: "color:#FF6154;font-size:11px;font-weight:600;",
      rank: "background:#FEF3C7;color:#92400E;border:1px solid #F59E0B;",
    },
  };

  const RANK_PILL = (rank, theme) => {
    const m = RANK_META[rank];
    if (!m) return "";
    const t = THEMES[theme] || THEMES.light;
    return `<span style="display:inline-block;font-size:10px;font-weight:700;padding:2px 6px;border-radius:999px;margin-left:6px;${t.rank}">${m.label}</span>`;
  };

  const HEART_SVG = `<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`;

  class BDSFeatured extends HTMLElement {
    connectedCallback() {
      const slug = this.getAttribute("slug");
      const theme = this.getAttribute("theme") || "light";
      const showDesc = this.getAttribute("show-description") !== "false";
      const apiBase = this.getAttribute("api-base") || "https://www.bdsaaszone.site";

      if (!slug) return;

      // Skeleton
      this.innerHTML = this._skeleton(theme);

      fetch(`${apiBase}/api/embed/featured?slug=${encodeURIComponent(slug)}`)
        .then((r) => r.json())
        .then((data) => {
          if (data.error) {
            this.style.display = "none";
            return;
          }
          this._render(data, theme, showDesc);
        })
        .catch(() => {
          this.style.display = "none";
        });
    }

    _skeleton(theme) {
      const t = THEMES[theme] || THEMES.light;
      return `<div style="${t.card}font-family:${FONTS};display:inline-flex;align-items:center;min-width:220px;">
        <div style="width:36px;height:36px;border-radius:8px;background:#e2e8f0;flex-shrink:0;"></div>
        <div style="margin-left:10px;flex:1;">
          <div style="width:70%;height:10px;background:#e2e8f0;border-radius:4px;"></div>
          <div style="width:50%;height:8px;background:#e2e8f0;border-radius:4px;margin-top:6px;"></div>
        </div>
      </div>`;
    }

    _render(data, theme, showDesc) {
      const t = THEMES[theme] || THEMES.light;
      const logo = data.logoUrl
        ? `<img src="${data.logoUrl}" alt="" width="36" height="36" style="width:36px;height:36px;border-radius:8px;object-fit:cover;flex-shrink:0;${t.logo}" onerror="this.style.display='none'">`
        : `<div style="width:36px;height:36px;border-radius:8px;background:#FF6154;display:flex;align-items:center;justify-content:center;flex-shrink:0;${t.logo}"><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M7 7h4.5a3.5 3.5 0 0 1 0 7H7V7Z" fill="#fff"/><path d="M7 14h5a3.5 3.5 0 0 1 0 7H7v-7Z" fill="#fff" opacity=".6"/></svg></div>`;

      const rank = data.rank ? RANK_PILL(data.rank, theme) : "";
      const desc = showDesc && data.description
        ? `<div style="${t.desc}">${data.description.length > 80 ? data.description.slice(0, 80) + "..." : data.description}</div>`
        : "";
      const cat = data.category
        ? `<span style="font-size:9px;font-weight:600;text-transform:uppercase;letter-spacing:.05em;opacity:.6;">${data.category}</span>`
        : "";

      this.innerHTML = `<a href="https://www.bdsaaszone.site/startups/${encodeURIComponent(data.name?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""))}" target="_blank" rel="noopener noreferrer" style="text-decoration:none;display:inline-flex;align-items:center;${t.card}font-family:${FONTS};max-width:320px;transition:box-shadow .15s;" onmouseover="this.style.boxShadow='0 4px 12px rgba(0,0,0,.1)'" onmouseout="this.style.boxShadow='${t.card.match(/box-shadow:([^;]+)/)?.[1] || "none"}'">
        ${logo}
        <div style="flex:1;min-width:0;margin-left:2px;">
          <div style="display:flex;align-items:center;flex-wrap:wrap;">
            <span style="${t.brand}">Featured on BD SaaS Zone</span>${rank}
          </div>
          <div style="display:flex;align-items:center;gap:6px;margin-top:3px;">
            <span style="${t.name}">${data.name}</span>
            ${cat}
          </div>
          ${desc}
          <div style="display:flex;align-items:center;gap:4px;margin-top:5px;${t.stat}">
            ${HEART_SVG} <span>${data.likes}</span>
          </div>
        </div>
      </a>`;
    }
  }

  customElements.define("bds-featured", BDSFeatured);
})();
