(function() {
  const RANK_META = {
    1: { bg: "#FEF3C7", border: "#F59E0B", text: "#92400E", medal: "#F59E0B", label: "1st" },
    2: { bg: "#F1F5F9", border: "#94A3B8", text: "#1E293B", medal: "#94A3B8", label: "2nd" },
    3: { bg: "#FDF6EC", border: "#CD7F32", text: "#7C2D12", medal: "#CD7F32", label: "3rd" },
  };

  const getMedalSVG = (color, size = 14) => `
    <svg width="${size}" height="${size}" viewBox="0 0 16 16" fill="none" style="flex-shrink: 0">
      <circle cx="8" cy="10" r="5.5" fill="${color}" opacity="0.2" />
      <circle cx="8" cy="10" r="5.5" stroke="${color}" stroke-width="1.2" />
      <path d="M5.5 5.5L3.5 1.5H6.5L8 4.5" stroke="${color}" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" fill="none" />
      <path d="M10.5 5.5L12.5 1.5H9.5L8 4.5" stroke="${color}" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" fill="none" />
      <path d="M8 7.2L8.5 8.9H10.3L8.9 9.9L9.4 11.6L8 10.6L6.6 11.6L7.1 9.9L5.7 8.9H7.5L8 7.2Z" fill="${color}" />
    </svg>
  `;

  class BDSRankBadge extends HTMLElement {
    connectedCallback() {
      const slug = this.getAttribute('slug');
      const size = this.getAttribute('size') || 'large';
      
      // Default to production, but allow override for testing
      const apiBase = this.getAttribute('api-base') || 'https://www.bdsaaszone.site';

      if (!slug) return;

      fetch(`${apiBase}/api/embed/rank?slug=${encodeURIComponent(slug)}`)
        .then(res => res.json())
        .then(data => {
          if (data.rank) {
            this.render(data.rank, size);
          } else {
            this.style.display = 'none';
          }
        })
        .catch(err => {
          console.error('[BDS Widget Error]', err);
        });
    }

    render(rank, size) {
      const meta = RANK_META[rank];
      if (!meta) return;

      const svg = getMedalSVG(meta.medal, size === 'large' ? 20 : 10);
      let html = '';

      if (size === 'large') {
        const ordinal = rank === 1 ? "1st place" : rank === 2 ? "2nd place" : "3rd place";
        html = `
          <div style="display:inline-flex;flex-direction:column;align-items:center;gap:5px;padding:12px 18px;background:${meta.bg};border:1.5px solid ${meta.border};border-radius:14px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;box-sizing:border-box;line-height:1;text-decoration:none;">
            <div style="display:flex;align-items:center;gap:7px;">
              ${svg}
              <span style="font-size:14px;font-weight:700;color:${meta.text};letter-spacing:-0.01em;">${ordinal}</span>
            </div>
            <span style="font-size:10px;color:${meta.text};opacity:0.7;letter-spacing:0.06em;text-transform:uppercase;font-weight:600;">on BD SaaS Zone</span>
          </div>
        `;
      } else {
        html = `
          <span style="display:inline-flex;align-items:center;gap:3px;background:${meta.bg};border:1px solid ${meta.border};color:${meta.text};font-size:10px;font-weight:600;padding:2px 7px;border-radius:999px;white-space:nowrap;flex-shrink:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;box-sizing:border-box;line-height:1;text-decoration:none;">
            ${svg}
            ${meta.label} on BD SaaS Zone
          </span>
        `;
      }

      this.innerHTML = html;
    }
  }

  customElements.define('bds-rank-badge', BDSRankBadge);
})();
