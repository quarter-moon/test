// VELA — Home page (mobile)
// Cinematic full-bleed hero + editorial sections + product row + journal teaser.

function VHome({ p, display, heroVariant = 'cinematic', onNav }) {
  return (
    <div style={{ background: p.stone, color: p.ink, minHeight: '100%' }}>
      <VAnnounce p={p}/>
      <VHeader p={p} display={display} onNav={onNav} active="home"/>
      <VPageNav p={p} active="home" onNav={onNav}/>

      {heroVariant === 'cinematic' && <VHeroCinematic p={p} display={display} onNav={onNav}/>}
      {heroVariant === 'split' && <VHeroSplit p={p} display={display} onNav={onNav}/>}
      {heroVariant === 'duotone' && <VHeroDuotone p={p} display={display} onNav={onNav}/>}

      {/* Category navigation strip */}
      <VCategoryStrip p={p} display={display} onNav={onNav}/>

      {/* Featured pieces */}
      <section style={{ padding: '64px 20px 32px', background: p.stone }}>
        <VEyebrow p={p} align="center">Resort 26 · The Edit</VEyebrow>
        <h2 style={{
          font: `300 30px/1.15 ${display}`,
          textAlign: 'center', margin: '0 0 6px', letterSpacing: '0.005em',
        }}>The first ten pieces.</h2>
        <p style={{
          font: 'italic 300 15px/1.5 ' + display, color: p.mute,
          textAlign: 'center', margin: '0 0 32px',
        }}>Slow staples, drawn from the wardrobe of someone who plans nothing.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px 12px' }}>
          {VELA_HOME_PRODUCTS.map((prod, i) => (
            <VProductCard key={i} p={p} display={display} prod={prod} onNav={onNav}/>
          ))}
        </div>

        <button onClick={() => onNav && onNav('collection')} style={{
          display: 'block', margin: '36px auto 0',
          background: 'transparent', border: `1px solid ${p.ink}`,
          color: p.ink, padding: '14px 36px',
          font: '10px/1 "DM Sans"', letterSpacing: '0.28em',
          textTransform: 'uppercase', cursor: 'pointer',
        }}>Shop all Resort 26</button>
      </section>

      {/* Editorial split */}
      <section style={{ background: p.bone, padding: '64px 0' }}>
        <div style={{ padding: '0 20px' }}>
          {vimg(p, 'Editorial · The Studio · 4:5', { ratio: '4/5', tone: 'warm' })}
        </div>
        <div style={{ padding: '32px 24px 0', textAlign: 'center' }}>
          <VEyebrow p={p} align="center">A Note From The Studio</VEyebrow>
          <h3 style={{
            font: `300 26px/1.25 ${display}`, margin: '0 0 12px',
            letterSpacing: '0.005em',
          }}>The discipline of fewer things, chosen well.</h3>
          <p style={{
            font: '14px/1.7 "DM Sans"', color: p.mute,
            margin: '0 auto 22px', maxWidth: 310,
          }}>Each collection is built around twelve pieces. We make them in small runs, in Portugal and Italy, with mills we visit by hand.</p>
          <a style={{
            font: '10px/1 "DM Sans"', letterSpacing: '0.28em',
            textTransform: 'uppercase', color: p.ink,
            borderBottom: `1px solid ${p.clay}`, paddingBottom: 4,
            cursor: 'pointer',
          }}>Read the studio journal →</a>
        </div>
      </section>

      {/* Lookbook double-image */}
      <section style={{ background: p.stone, padding: '64px 20px' }}>
        <VEyebrow p={p} align="center">Look 04 · Worn With Nothing</VEyebrow>
        <h3 style={{
          font: `300 26px/1.2 ${display}`, textAlign: 'center',
          margin: '0 0 24px',
        }}>An almost-uniform.</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {vimg(p, 'Look 04 · Front', { ratio: '3/4', tone: 'cool' })}
          {vimg(p, 'Look 04 · Side', { ratio: '3/4', tone: 'warm' })}
        </div>
        <div style={{ marginTop: 14, font: '11px/1.6 "DM Sans"', color: p.mute, textAlign: 'center' }}>
          The Brera Trouser · The Linen Camisole · The Field Coat
        </div>
      </section>

      {/* Journal teaser */}
      <section style={{ background: p.ink, color: p.stone, padding: '64px 24px' }}>
        <div style={{
          font: '9px/1 "DM Sans"', letterSpacing: '0.32em',
          textTransform: 'uppercase', color: p.clay, marginBottom: 14,
        }}>The Journal</div>
        <h3 style={{
          font: `300 28px/1.25 ${display}`, color: p.stone,
          margin: '0 0 32px', letterSpacing: '0.01em',
        }}>What we are<br/>thinking about<br/><em style={{ color: p.clay, fontStyle: 'italic' }}>this season.</em></h3>

        {VELA_JOURNAL_TEASERS.map((j, i) => (
          <div key={i} style={{
            borderTop: `1px solid rgba(245,244,242,0.15)`,
            padding: '18px 0', display: 'flex', alignItems: 'center', gap: 14,
          }}>
            <div style={{ width: 72, flexShrink: 0 }}>
              {vimg(p, null, { ratio: '1/1', tone: i % 2 ? 'dark' : 'warm' })}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{
                font: '9px/1 "DM Sans"', letterSpacing: '0.24em',
                textTransform: 'uppercase', color: 'rgba(245,244,242,0.5)',
                marginBottom: 6,
              }}>{j.cat}</div>
              <div style={{ font: `300 16px/1.3 ${display}`, color: p.stone }}>{j.title}</div>
            </div>
            <VIcon name="arrow-r" size={14} color={p.clay}/>
          </div>
        ))}

        <button onClick={() => onNav && onNav('blog')} style={{
          marginTop: 32, width: '100%',
          background: 'transparent', border: `1px solid ${p.clay}`,
          color: p.stone, padding: '14px',
          font: '10px/1 "DM Sans"', letterSpacing: '0.28em',
          textTransform: 'uppercase', cursor: 'pointer',
        }}>Visit the journal</button>
      </section>

      {/* Provenance strip */}
      <section style={{
        background: p.stone, padding: '48px 24px 56px',
        textAlign: 'center',
      }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24,
          paddingBottom: 32, borderBottom: `1px solid ${p.rule}`,
        }}>
          {[
            ['IT', 'Tailored in Italy'],
            ['PT', 'Knit in Portugal'],
            ['—', 'Small batch only'],
            ['☉', 'Carbon-considered'],
          ].map(([icon, label]) => (
            <div key={label}>
              <div style={{
                font: `300 22px/1 ${display}`, color: p.clay,
                marginBottom: 8,
              }}>{icon}</div>
              <div style={{
                font: '10px/1.5 "DM Sans"', letterSpacing: '0.18em',
                textTransform: 'uppercase', color: p.mute,
              }}>{label}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 28 }}>
          <VEyebrow p={p} align="center">Atelier</VEyebrow>
          <p style={{
            font: `italic 300 18px/1.5 ${display}`, color: p.ink,
            margin: 0, maxWidth: 290, marginLeft: 'auto', marginRight: 'auto',
          }}>"Restraint, not refusal. We design for the woman who has already decided."</p>
          <div style={{
            marginTop: 14,
            font: '9px/1 "DM Sans"', letterSpacing: '0.32em',
            textTransform: 'uppercase', color: p.mute,
          }}>— Mae Lindqvist, Founder</div>
        </div>
      </section>

      <VNewsletter p={p} display={display}/>
      <VFooter p={p} display={display}/>
    </div>
  );
}

// ─── Hero variants ────────────────────────────────────────
function VHeroCinematic({ p, display, onNav }) {
  return (
    <section style={{
      position: 'relative', height: 660, overflow: 'hidden',
      background: '#1a1a1a',
    }}>
      {/* Full-bleed image */}
      <div style={{ position: 'absolute', inset: 0 }}>
        {vimg(p, 'Hero · Editorial · 9:16', { ratio: '9/16', tone: 'dark' })}
      </div>
      {/* Soft gradient for text contrast */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.55) 100%)',
      }}/>
      {/* Corner marks (from brand spec) */}
      {[[18,18,'tl'],[18,18,'tr'],[18,18,'bl'],[18,18,'br']].map(([x,y,c], i) => (
        <CornerMark key={i} color={p.clay} corner={c}/>
      ))}
      {/* Top tag */}
      <div style={{
        position: 'absolute', top: 36, left: 0, right: 0, textAlign: 'center',
        font: '9px/1 "DM Sans"', letterSpacing: '0.4em',
        textTransform: 'uppercase', color: p.clay,
      }}>Resort 26</div>

      {/* Center content */}
      <div style={{
        position: 'absolute', top: '50%', left: 0, right: 0,
        transform: 'translateY(-55%)', textAlign: 'center',
        padding: '0 24px',
      }}>
        <h1 style={{
          font: `300 56px/1.05 ${display}`,
          color: '#F5F4F2', margin: 0,
          letterSpacing: '0.01em',
        }}>Dressed<br/>with <em style={{ fontStyle: 'italic', color: p.clay }}>intention.</em></h1>
        <div style={{
          width: 40, height: 1, background: p.clay,
          margin: '24px auto', opacity: 0.8,
        }}/>
        <p style={{
          font: `italic 300 15px/1.55 ${display}`,
          color: 'rgba(245,244,242,0.75)',
          margin: '0 auto', maxWidth: 270,
        }}>A wardrobe of twelve, photographed in a room with nothing in it.</p>
      </div>

      {/* Bottom CTAs */}
      <div style={{
        position: 'absolute', bottom: 36, left: 24, right: 24,
        display: 'flex', flexDirection: 'column', gap: 12,
      }}>
        <button onClick={() => onNav && onNav('collection')} style={{
          background: p.clay, border: 0, color: '#fff',
          padding: '15px', font: '10px/1 "DM Sans"',
          letterSpacing: '0.3em', textTransform: 'uppercase', cursor: 'pointer',
        }}>Shop Resort 26</button>
        <button style={{
          background: 'transparent', border: '1px solid rgba(245,244,242,0.4)',
          color: '#F5F4F2', padding: '15px',
          font: '10px/1 "DM Sans"', letterSpacing: '0.3em',
          textTransform: 'uppercase', cursor: 'pointer',
        }}>Watch the film  ▶</button>
      </div>
    </section>
  );
}

function VHeroSplit({ p, display, onNav }) {
  return (
    <section style={{ background: p.stone }}>
      <div style={{ position: 'relative' }}>
        {vimg(p, 'Hero · Editorial · 4:5', { ratio: '4/5', tone: 'warm' })}
        <div style={{
          position: 'absolute', top: 24, left: 24,
          font: '9px/1 "DM Sans"', letterSpacing: '0.32em',
          textTransform: 'uppercase', color: p.clay,
        }}>Resort 26</div>
      </div>
      <div style={{ padding: '36px 24px 24px', textAlign: 'left' }}>
        <h1 style={{
          font: `300 44px/1.05 ${display}`, color: p.ink,
          margin: '0 0 16px', letterSpacing: '0.01em',
        }}>Dressed<br/>with <em style={{ color: p.clay, fontStyle: 'italic' }}>intention.</em></h1>
        <p style={{
          font: '14px/1.7 "DM Sans"', color: p.mute,
          margin: '0 0 24px', maxWidth: 280,
        }}>A wardrobe of twelve, drawn this season from linen, raw silk, and laundered cotton.</p>
        <button onClick={() => onNav && onNav('collection')} style={{
          background: p.ink, border: 0, color: p.stone,
          padding: '14px 32px', font: '10px/1 "DM Sans"',
          letterSpacing: '0.3em', textTransform: 'uppercase', cursor: 'pointer',
        }}>Shop Resort 26 →</button>
      </div>
    </section>
  );
}

function VHeroDuotone({ p, display, onNav }) {
  return (
    <section style={{ background: p.stone, position: 'relative' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
        {vimg(p, 'Hero · Front · 4:5', { ratio: '4/5', tone: 'warm' })}
        {vimg(p, 'Hero · Back · 4:5', { ratio: '4/5', tone: 'clay' })}
      </div>
      <div style={{ padding: '32px 24px 8px', textAlign: 'center' }}>
        <VEyebrow p={p} align="center">Resort 26</VEyebrow>
        <h1 style={{
          font: `300 40px/1.08 ${display}`, color: p.ink,
          margin: '0 0 14px', letterSpacing: '0.01em',
        }}>Dressed with <em style={{ color: p.clay, fontStyle: 'italic' }}>intention.</em></h1>
        <p style={{
          font: 'italic 300 14px/1.5 ' + display, color: p.mute,
          margin: '0 auto 22px', maxWidth: 270,
        }}>Twelve pieces. One palette. A wardrobe that travels.</p>
        <button onClick={() => onNav && onNav('collection')} style={{
          background: p.ink, border: 0, color: p.stone,
          padding: '14px 32px', font: '10px/1 "DM Sans"',
          letterSpacing: '0.3em', textTransform: 'uppercase', cursor: 'pointer',
        }}>Shop Resort 26</button>
      </div>
    </section>
  );
}

function CornerMark({ color, corner }) {
  const base = { position: 'absolute', width: 18, height: 18 };
  const pos = {
    tl: { top: 18, left: 18 },
    tr: { top: 18, right: 18, transform: 'scaleX(-1)' },
    bl: { bottom: 18, left: 18, transform: 'scaleY(-1)' },
    br: { bottom: 18, right: 18, transform: 'scale(-1,-1)' },
  }[corner];
  return (
    <svg viewBox="0 0 18 18" style={{ ...base, ...pos }}>
      <path d="M0 0h6M0 0v6" fill="none" stroke={color} strokeWidth="1"/>
    </svg>
  );
}

// ─── Category strip ───────────────────────────────────────
function VCategoryStrip({ p, display, onNav }) {
  const cats = [
    { label: 'New In', tone: 'warm' },
    { label: 'Dresses', tone: 'cool' },
    { label: 'Knitwear', tone: 'clay' },
    { label: 'Outerwear', tone: 'dark' },
    { label: 'Tailoring', tone: 'warm' },
  ];
  return (
    <section style={{
      background: p.stone, padding: '28px 0 24px',
      borderBottom: `1px solid ${p.rule}`,
    }}>
      <div style={{
        display: 'flex', gap: 14, padding: '0 20px 4px',
        overflowX: 'auto',
      }}>
        {cats.map((c, i) => (
          <div key={i} onClick={() => onNav && onNav('collection')} style={{
            flex: '0 0 100px', cursor: 'pointer',
          }}>
            <div style={{ width: 100, height: 130 }}>
              {vimg(p, null, { ratio: '4/5', tone: c.tone })}
            </div>
            <div style={{
              marginTop: 10,
              font: `300 14px/1.2 ${display}`,
              color: p.ink, textAlign: 'left',
            }}>{c.label}</div>
            <div style={{
              font: '9px/1 "DM Sans"', letterSpacing: '0.22em',
              textTransform: 'uppercase', color: p.mute,
              marginTop: 4,
            }}>Shop →</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Product Card (compact) ────────────────────────────────
function VProductCard({ p, display, prod, compact = false, onNav }) {
  return (
    <div style={{ cursor: 'pointer' }} onClick={() => onNav && onNav('product')}>
      <div style={{ position: 'relative' }}>
        {vimg(p, null, { ratio: '4/5', tone: prod.tone || 'warm' })}
        {prod.tag && (
          <div style={{
            position: 'absolute', top: 8, left: 8,
            background: p.stone, color: p.ink,
            font: '8px/1 "DM Sans"', letterSpacing: '0.22em',
            textTransform: 'uppercase', padding: '5px 8px',
          }}>{prod.tag}</div>
        )}
        <button style={{
          position: 'absolute', top: 8, right: 8,
          width: 30, height: 30, borderRadius: 30,
          background: 'rgba(245,244,242,0.85)', border: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', color: p.ink,
        }} onClick={(e) => e.stopPropagation()}>
          <VIcon name="heart" size={14}/>
        </button>
      </div>
      <div style={{ paddingTop: 10 }}>
        <div style={{
          font: `300 15px/1.25 ${display}`, color: p.ink,
          marginBottom: 2,
        }}>{prod.name}</div>
        <div style={{
          font: '10px/1.4 "DM Sans"', color: p.mute,
          letterSpacing: '0.06em', marginBottom: 6,
        }}>{prod.fabric}</div>
        <div style={{
          font: '11px/1 "DM Sans"', color: p.ink,
          letterSpacing: '0.06em',
        }}>${prod.price}</div>
        {prod.colors && (
          <div style={{ display: 'flex', gap: 4, marginTop: 8 }}>
            {prod.colors.map((c, i) => (
              <div key={i} style={{
                width: 8, height: 8, borderRadius: 8,
                background: c, border: `0.5px solid ${p.rule}`,
              }}/>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Sample data ──────────────────────────────────────────
const VELA_HOME_PRODUCTS = [
  { name: 'The Brera Trouser', fabric: 'Italian Linen · Bone', price: 285, tone: 'warm', tag: 'New', colors: ['#E8E2D4', '#1A1A1A', '#7B8068'] },
  { name: 'The Field Coat', fabric: 'Brushed Wool · Ash', price: 620, tone: 'cool', colors: ['#B8B0A4', '#1A1A1A'] },
  { name: 'The Camisole', fabric: 'Washed Silk · Shell', price: 195, tone: 'warm', colors: ['#F2EAE0', '#1A1A1A', '#C4A882'] },
  { name: 'The Plaster Knit', fabric: 'Merino Cashmere · Stone', price: 340, tone: 'clay', tag: 'Just In', colors: ['#C4A882', '#1A1A1A', '#F2EAE0'] },
];

const VELA_JOURNAL_TEASERS = [
  { cat: 'Atelier · 04', title: 'Inside the Biella mill where we make the wool.' },
  { cat: 'Style · 09', title: 'How three women are wearing the Brera trouser.' },
  { cat: 'Object · 02', title: 'A small case for why we still iron things.' },
];

Object.assign(window, { VHome });
