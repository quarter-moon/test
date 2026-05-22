// VELA — shared brand system + primitives
// Mobile-first. Loaded as a Babel script; exports to window.

// ─── Palette ──────────────────────────────────────────────
const VELA_PALETTES = {
  default: {
    ink: '#1A1A1A',
    stone: '#F5F4F2',
    bone: '#F0EEE9',
    border: '#E8E6E2',
    clay: '#C4A882',
    mute: '#888780',
    rule: 'rgba(26,26,26,0.08)',
    promo: '#D94F3D',
  },
  // Accent swap — clay → slate olive
  olive: {
    ink: '#1A1A1A',
    stone: '#F5F4F2',
    bone: '#F0EEE9',
    border: '#E8E6E2',
    clay: '#7B8068',
    mute: '#888780',
    rule: 'rgba(26,26,26,0.08)',
    promo: '#D94F3D',
  },
  // Inverted: clay-forward
  warm: {
    ink: '#2A211B',
    stone: '#F2EBE0',
    bone: '#ECE3D4',
    border: '#DCD0BD',
    clay: '#B8895A',
    mute: '#8A7B6B',
    rule: 'rgba(42,33,27,0.08)',
    promo: '#C2452F',
  },
  // Cool minimal
  ice: {
    ink: '#16181B',
    stone: '#F4F5F6',
    bone: '#EDEEF0',
    border: '#E2E4E7',
    clay: '#8693A3',
    mute: '#7A7F87',
    rule: 'rgba(22,24,27,0.08)',
    promo: '#D94F3D',
  },
};

const veladark = (p) => ({
  ink: p.stone,
  stone: p.ink,
  bone: '#0F0F0F',
  border: 'rgba(245,244,242,0.12)',
  clay: p.clay,
  mute: 'rgba(245,244,242,0.5)',
  rule: 'rgba(245,244,242,0.1)',
  promo: p.promo,
});

const veladisplay = {
  cormorant: '"Cormorant Garamond", "Cormorant", Georgia, serif',
  playfair: '"Playfair Display", Georgia, serif',
  lora: '"Lora", Georgia, serif',
};

// ─── Helpers ──────────────────────────────────────────────
function vimg(p, label, opts = {}) {
  // Editorial placeholder. label like "Editorial · 4:5".
  const { tone = 'warm', ratio = '4/5', radius = 0, src = null, fill = null } = opts;
  const bg = fill || (tone === 'warm'
    ? `linear-gradient(135deg, ${p.border} 0%, #DAD3C7 100%)`
    : tone === 'dark'
    ? `linear-gradient(160deg, #2a2724 0%, #1a1816 100%)`
    : tone === 'clay'
    ? `linear-gradient(160deg, ${p.clay} 0%, #a88e6a 100%)`
    : `linear-gradient(135deg, ${p.stone} 0%, ${p.border} 100%)`);
  const fg = tone === 'dark' || tone === 'clay' ? 'rgba(255,255,255,0.55)' : 'rgba(26,26,26,0.4)';
  return (
    <div style={{
      width: '100%', aspectRatio: ratio, position: 'relative',
      background: bg, borderRadius: radius, overflow: 'hidden',
      display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-start',
    }}>
      {/* Subtle photo-feel grain */}
      <div style={{
        position: 'absolute', inset: 0,
        background: tone === 'dark'
          ? 'radial-gradient(120% 80% at 30% 20%, rgba(255,255,255,0.06) 0%, transparent 60%), radial-gradient(80% 60% at 70% 100%, rgba(0,0,0,0.4) 0%, transparent 70%)'
          : 'radial-gradient(120% 80% at 70% 20%, rgba(255,255,255,0.5) 0%, transparent 60%), radial-gradient(80% 60% at 30% 100%, rgba(0,0,0,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      {label && (
        <div style={{
          position: 'absolute', left: 10, bottom: 8,
          font: '8px/1 "DM Sans", sans-serif', letterSpacing: '0.18em',
          textTransform: 'uppercase', color: fg, opacity: 0.7,
        }}>{label}</div>
      )}
    </div>
  );
}

// Tiny icon set (line-stroke)
function VIcon({ name, size = 18, color = 'currentColor', stroke = 1.2 }) {
  const s = { width: size, height: size, fill: 'none', stroke: color, strokeWidth: stroke, strokeLinecap: 'round', strokeLinejoin: 'round' };
  switch (name) {
    case 'menu': return (<svg viewBox="0 0 24 24" style={s}><path d="M3 7h18M3 17h18"/></svg>);
    case 'search': return (<svg viewBox="0 0 24 24" style={s}><circle cx="11" cy="11" r="6.5"/><path d="m20 20-4-4"/></svg>);
    case 'bag': return (<svg viewBox="0 0 24 24" style={s}><path d="M5 8h14l-1 12H6L5 8Z"/><path d="M9 8a3 3 0 0 1 6 0"/></svg>);
    case 'user': return (<svg viewBox="0 0 24 24" style={s}><circle cx="12" cy="9" r="3.2"/><path d="M5 20c1.5-3.5 4.5-5 7-5s5.5 1.5 7 5"/></svg>);
    case 'heart': return (<svg viewBox="0 0 24 24" style={s}><path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10Z"/></svg>);
    case 'arrow-r': return (<svg viewBox="0 0 24 24" style={s}><path d="M5 12h14m-5-5 5 5-5 5"/></svg>);
    case 'arrow-d': return (<svg viewBox="0 0 24 24" style={s}><path d="M12 5v14m-5-5 5 5 5-5"/></svg>);
    case 'plus': return (<svg viewBox="0 0 24 24" style={s}><path d="M12 5v14M5 12h14"/></svg>);
    case 'minus': return (<svg viewBox="0 0 24 24" style={s}><path d="M5 12h14"/></svg>);
    case 'check': return (<svg viewBox="0 0 24 24" style={s}><path d="m5 12 5 5 9-10"/></svg>);
    case 'star': return (<svg viewBox="0 0 24 24" style={s}><path d="m12 3 2.6 5.6 6.1.7-4.6 4.2 1.3 6L12 16.7 6.6 19.5l1.3-6L3.3 9.3l6.1-.7L12 3Z"/></svg>);
    case 'chev-r': return (<svg viewBox="0 0 24 24" style={s}><path d="m9 5 7 7-7 7"/></svg>);
    case 'chev-d': return (<svg viewBox="0 0 24 24" style={s}><path d="m5 9 7 7 7-7"/></svg>);
    case 'x': return (<svg viewBox="0 0 24 24" style={s}><path d="M6 6l12 12M18 6 6 18"/></svg>);
    case 'instagram': return (<svg viewBox="0 0 24 24" style={s}><rect x="3.5" y="3.5" width="17" height="17" rx="4.5"/><circle cx="12" cy="12" r="4"/><circle cx="17" cy="7" r=".8" fill={color}/></svg>);
    case 'pinterest': return (<svg viewBox="0 0 24 24" style={s}><circle cx="12" cy="12" r="9"/><path d="M10.5 21 13 12m-1.2-.5a2.2 2.2 0 1 0 0-4.4 2.2 2.2 0 0 0 0 4.4Z"/></svg>);
    case 'tiktok': return (<svg viewBox="0 0 24 24" style={s}><path d="M14 4v10.5a3.5 3.5 0 1 1-3.5-3.5"/><path d="M14 4c.5 2.5 2.5 4.5 5 5"/></svg>);
    case 'play': return (<svg viewBox="0 0 24 24" style={s}><path d="M8 5v14l11-7L8 5Z"/></svg>);
    default: return null;
  }
}

// ─── Announcement bar ─────────────────────────────────────
function VAnnounce({ p, dark }) {
  return (
    <div style={{
      background: p.ink, color: p.stone, height: 32,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      font: '9px/1 "DM Sans", sans-serif',
      letterSpacing: '0.22em', textTransform: 'uppercase',
      opacity: 0.95, whiteSpace: 'nowrap', overflow: 'hidden',
      padding: '0 16px',
    }}>
      <span style={{ opacity: 0.85 }}>Free shipping over $150</span>
      <span style={{ opacity: 0.4, margin: '0 10px' }}>·</span>
      <span style={{ color: p.clay }}>Resort 26 — New In</span>
    </div>
  );
}

// ─── Header ───────────────────────────────────────────────
function VHeader({ p, display, onNav, active }) {
  const links = [
    { id: 'home', label: 'Home' },
    { id: 'collection', label: 'Shop' },
    { id: 'product', label: 'Product' },
    { id: 'blog', label: 'Journal' },
  ];
  return (
    <header style={{
      background: p.stone, color: p.ink,
      borderBottom: `1px solid ${p.rule}`,
      padding: '14px 18px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      position: 'sticky', top: 0, zIndex: 5,
    }}>
      <button style={{ background: 'none', border: 0, padding: 4, color: p.ink, cursor: 'pointer' }}>
        <VIcon name="menu" size={20}/>
      </button>
      <div style={{
        font: `300 22px/1 ${display}`,
        letterSpacing: '0.32em', color: p.ink,
        cursor: 'pointer',
      }} onClick={() => onNav && onNav('home')}>VELA</div>
      <div style={{ display: 'flex', gap: 14 }}>
        <button style={{ background: 'none', border: 0, padding: 4, color: p.ink, cursor: 'pointer' }}>
          <VIcon name="search" size={18}/>
        </button>
        <button style={{ background: 'none', border: 0, padding: 4, color: p.ink, cursor: 'pointer', position: 'relative' }}>
          <VIcon name="bag" size={18}/>
          <span style={{
            position: 'absolute', top: 2, right: 0,
            background: p.clay, color: '#fff', borderRadius: 8,
            font: '8px/1 "DM Sans"', padding: '2px 4px',
            minWidth: 12, textAlign: 'center',
          }}>2</span>
        </button>
      </div>
    </header>
  );
}

// Page-level nav tabs that show inside the prototype (so users
// can hop between Home/Shop/Product/Journal in fullscreen mode)
function VPageNav({ p, active, onNav }) {
  const tabs = [
    { id: 'home', label: 'Home' },
    { id: 'collection', label: 'Shop' },
    { id: 'product', label: 'Product' },
    { id: 'blog', label: 'Journal' },
  ];
  return (
    <nav style={{
      background: p.stone,
      borderBottom: `1px solid ${p.rule}`,
      display: 'flex', overflowX: 'auto', padding: '0 8px',
      gap: 0,
    }}>
      {tabs.map((t) => {
        const on = t.id === active;
        return (
          <button key={t.id} onClick={() => onNav(t.id)} style={{
            background: 'none', border: 0, cursor: 'pointer',
            padding: '12px 14px',
            font: '9px/1 "DM Sans", sans-serif',
            letterSpacing: '0.22em', textTransform: 'uppercase',
            color: on ? p.ink : p.mute,
            borderBottom: on ? `1px solid ${p.ink}` : '1px solid transparent',
            whiteSpace: 'nowrap',
          }}>{t.label}</button>
        );
      })}
    </nav>
  );
}

// ─── Newsletter ────────────────────────────────────────────
function VNewsletter({ p, display }) {
  return (
    <section style={{
      background: p.bone, padding: '56px 24px',
      textAlign: 'center', borderTop: `1px solid ${p.rule}`,
    }}>
      <div style={{
        font: '9px/1 "DM Sans"', letterSpacing: '0.32em',
        textTransform: 'uppercase', color: p.clay, marginBottom: 14,
      }}>The Studio Letter</div>
      <h3 style={{
        font: `300 28px/1.2 ${display}`, color: p.ink, margin: '0 0 8px',
        letterSpacing: '0.01em',
      }}>Considered, never crowded.</h3>
      <p style={{
        font: '13px/1.6 "DM Sans"', color: p.mute,
        margin: '0 auto 24px', maxWidth: 280,
      }}>A monthly note on new arrivals, editorial stories, and the rituals of dressing.</p>
      <form style={{
        display: 'flex', maxWidth: 320, margin: '0 auto',
        borderBottom: `1px solid ${p.ink}`,
      }} onSubmit={(e) => e.preventDefault()}>
        <input placeholder="Email address" style={{
          flex: 1, background: 'transparent', border: 0, outline: 'none',
          padding: '10px 0', font: '13px/1 "DM Sans"', color: p.ink,
        }}/>
        <button style={{
          background: 'transparent', border: 0, color: p.ink,
          font: '9px/1 "DM Sans"', letterSpacing: '0.24em',
          textTransform: 'uppercase', padding: '10px 8px', cursor: 'pointer',
        }}>Subscribe →</button>
      </form>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────
function VFooter({ p, display }) {
  const cols = [
    { title: 'Shop', items: ['New In', 'Dresses', 'Knitwear', 'Outerwear', 'Sale'] },
    { title: 'Studio', items: ['Our Story', 'Sustainability', 'Journal', 'Press'] },
    { title: 'Care', items: ['Contact', 'Shipping', 'Returns', 'Size Guide', 'FAQ'] },
  ];
  return (
    <footer style={{ background: p.ink, color: p.stone, padding: '48px 24px 24px' }}>
      <div style={{
        font: `300 38px/1 ${display}`,
        letterSpacing: '0.32em', textAlign: 'center',
        opacity: 0.9, marginBottom: 6,
      }}>VELA</div>
      <div style={{
        font: '9px/1 "DM Sans"', letterSpacing: '0.32em',
        textTransform: 'uppercase', color: p.clay,
        textAlign: 'center', marginBottom: 36,
      }}>Studio</div>

      {cols.map((c) => (
        <details key={c.title} style={{
          borderTop: `1px solid rgba(245,244,242,0.1)`, padding: '14px 0',
        }}>
          <summary style={{
            font: '11px/1 "DM Sans"', letterSpacing: '0.24em',
            textTransform: 'uppercase', cursor: 'pointer',
            display: 'flex', justifyContent: 'space-between',
            listStyle: 'none', color: p.stone, opacity: 0.95,
          }}>
            {c.title}
            <span style={{ opacity: 0.5 }}>+</span>
          </summary>
          <ul style={{ listStyle: 'none', padding: '14px 0 4px', margin: 0 }}>
            {c.items.map((it) => (
              <li key={it} style={{
                font: '12px/1.8 "DM Sans"', color: 'rgba(245,244,242,0.6)',
              }}>{it}</li>
            ))}
          </ul>
        </details>
      ))}

      <div style={{
        borderTop: `1px solid rgba(245,244,242,0.1)`,
        marginTop: 24, paddingTop: 24,
        display: 'flex', justifyContent: 'center', gap: 18,
      }}>
        {['instagram', 'pinterest', 'tiktok'].map((n) => (
          <div key={n} style={{ color: 'rgba(245,244,242,0.5)' }}>
            <VIcon name={n} size={16}/>
          </div>
        ))}
      </div>
      <div style={{
        textAlign: 'center', marginTop: 20,
        font: '9px/1.7 "DM Sans"', letterSpacing: '0.18em',
        textTransform: 'uppercase', color: 'rgba(245,244,242,0.3)',
      }}>
        © 2026 VELA Studio<br/>
        <span style={{ letterSpacing: '0.1em', textTransform: 'none', fontSize: 10 }}>
          Designed in Copenhagen · Made considerately
        </span>
      </div>
    </footer>
  );
}

// ─── Section eyebrow ────────────────────────────────────────
function VEyebrow({ p, children, align = 'left' }) {
  return (
    <div style={{
      font: '9px/1 "DM Sans"', letterSpacing: '0.32em',
      textTransform: 'uppercase', color: p.clay,
      textAlign: align, marginBottom: 14,
    }}>{children}</div>
  );
}

function VRule({ p, w = 60, color }) {
  return (
    <div style={{
      width: w, height: 1,
      background: color || p.clay, margin: '14px auto',
      opacity: 0.7,
    }}/>
  );
}

// Export
Object.assign(window, {
  VELA_PALETTES, veladark, veladisplay,
  vimg, VIcon, VAnnounce, VHeader, VPageNav,
  VNewsletter, VFooter, VEyebrow, VRule,
});
