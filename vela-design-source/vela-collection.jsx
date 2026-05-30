// VELA — Collection page (mobile)
// Mixed irregular grid: 2-col product flow, broken up by feature tiles & editorial cards.

function VCollection({ p, display, density = 'mixed', onNav }) {
  return (
    <div style={{ background: p.stone, color: p.ink, minHeight: '100%' }}>
      <VAnnounce p={p}/>
      <VHeader p={p} display={display} onNav={onNav} active="collection"/>
      <VPageNav p={p} active="collection" onNav={onNav}/>

      {/* Page header */}
      <section style={{
        padding: '36px 24px 24px', textAlign: 'center',
        background: p.stone, borderBottom: `1px solid ${p.rule}`,
      }}>
        <div style={{
          font: '9px/1 "DM Sans"', letterSpacing: '0.32em',
          textTransform: 'uppercase', color: p.mute, marginBottom: 12,
        }}>Shop · The Collection</div>
        <h1 style={{
          font: `300 38px/1.05 ${display}`, color: p.ink,
          margin: '0 0 10px', letterSpacing: '0.005em',
        }}>Resort 26</h1>
        <p style={{
          font: `italic 300 14px/1.5 ${display}`, color: p.mute,
          margin: '0 auto', maxWidth: 280,
        }}>Twelve pieces. Photographed over three days, in one room, by Anouk Reinart.</p>
        <VRule p={p} w={32}/>
        <div style={{
          font: '10px/1.5 "DM Sans"', color: p.mute,
          letterSpacing: '0.12em',
        }}>48 pieces · Linen, Silk, Wool, Cashmere</div>
      </section>

      {/* Filter / Sort bar */}
      <VFilterBar p={p} display={display}/>

      {/* Category chips */}
      <VCategoryChips p={p}/>

      {/* The mixed grid */}
      {density === 'mixed' && <VMixedGrid p={p} display={display} onNav={onNav}/>}
      {density === 'spacious' && <VSpaciousGrid p={p} display={display} onNav={onNav}/>}
      {density === 'standard' && <VStandardGrid p={p} display={display} onNav={onNav}/>}

      {/* Load more */}
      <section style={{ padding: '8px 24px 64px', textAlign: 'center' }}>
        <div style={{
          font: '11px/1.5 "DM Sans"', color: p.mute,
          letterSpacing: '0.06em', marginBottom: 18,
        }}>Showing 24 of 48</div>
        <div style={{
          width: '60%', height: 1, background: p.rule, margin: '0 auto 18px',
          position: 'relative',
        }}>
          <div style={{
            position: 'absolute', left: 0, top: 0, height: 1,
            width: '50%', background: p.clay,
          }}/>
        </div>
        <button style={{
          background: 'transparent', border: `1px solid ${p.ink}`,
          color: p.ink, padding: '14px 36px',
          font: '10px/1 "DM Sans"', letterSpacing: '0.28em',
          textTransform: 'uppercase', cursor: 'pointer',
        }}>Load 24 more</button>
      </section>

      <VNewsletter p={p} display={display}/>
      <VFooter p={p} display={display}/>
    </div>
  );
}

// ─── Filter bar (sticky) ──────────────────────────────────
function VFilterBar({ p, display }) {
  return (
    <div style={{
      position: 'sticky', top: 60, zIndex: 4,
      background: p.stone, borderBottom: `1px solid ${p.rule}`,
      padding: '14px 20px', display: 'flex',
      alignItems: 'center', justifyContent: 'space-between',
    }}>
      <button style={{
        background: 'transparent', border: `1px solid ${p.rule}`,
        padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 8,
        font: '10px/1 "DM Sans"', letterSpacing: '0.18em',
        textTransform: 'uppercase', color: p.ink, cursor: 'pointer',
      }}>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M1 3h10M3 6h6M5 9h2"/>
        </svg>
        Filter
        <span style={{
          background: p.clay, color: '#fff', borderRadius: 8,
          padding: '1px 5px', fontSize: 8, letterSpacing: 0,
        }}>3</span>
      </button>
      <button style={{
        background: 'transparent', border: 0, padding: '10px 4px',
        display: 'flex', alignItems: 'center', gap: 6,
        font: '10px/1 "DM Sans"', letterSpacing: '0.18em',
        textTransform: 'uppercase', color: p.ink, cursor: 'pointer',
      }}>
        Sort · Newest
        <VIcon name="chev-d" size={11}/>
      </button>
    </div>
  );
}

// ─── Active filter chips ──────────────────────────────────
function VCategoryChips({ p }) {
  const chips = ['All', 'Dresses', 'Tops', 'Knitwear', 'Trousers', 'Outerwear'];
  const active = 'All';
  const tag = (label, isFilter = false) => (
    <div key={label} style={{
      padding: '7px 14px',
      border: isFilter ? `1px dashed ${p.clay}` : (label === active ? `1px solid ${p.ink}` : `1px solid ${p.rule}`),
      background: label === active ? p.ink : 'transparent',
      color: label === active ? p.stone : (isFilter ? p.clay : p.ink),
      font: '10px/1 "DM Sans"', letterSpacing: '0.18em',
      textTransform: 'uppercase', whiteSpace: 'nowrap',
      cursor: 'pointer',
      display: 'flex', alignItems: 'center', gap: 6,
    }}>
      {label}
      {isFilter && (<svg width="9" height="9" viewBox="0 0 9 9" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="m2 2 5 5M2 7l5-5"/></svg>)}
    </div>
  );
  return (
    <div style={{ padding: '14px 20px 18px', background: p.stone }}>
      <div style={{ display: 'flex', gap: 8, overflowX: 'auto', marginBottom: 12 }}>
        {chips.map((c) => tag(c))}
      </div>
      <div style={{ display: 'flex', gap: 8, overflowX: 'auto' }}>
        {['Linen', 'Under $300', 'Bone'].map((c) => tag(c, true))}
      </div>
    </div>
  );
}

// ─── The mixed irregular grid ─────────────────────────────
// Pattern (mobile, 2 columns):
//   row 1: 2-up product
//   row 2: full-width feature image (look)
//   row 3: 2-up product
//   row 4: full-width editorial card (with copy)
//   row 5: 2-up product (tall left, two stacked right)
//   row 6: 2-up product
//   row 7: full-width quote block
//   row 8: 2-up product

function VMixedGrid({ p, display, onNav }) {
  return (
    <section style={{ padding: '12px 20px 36px', background: p.stone }}>
      {/* Row 1 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px 12px', marginBottom: 28 }}>
        <VProductCard p={p} display={display} prod={VELA_COLLECTION_PRODUCTS[0]} onNav={onNav}/>
        <VProductCard p={p} display={display} prod={VELA_COLLECTION_PRODUCTS[1]} onNav={onNav}/>
      </div>

      {/* Full-width feature */}
      <FeatureTile p={p} display={display}
        eyebrow="Look 02 · Worn With Bone"
        title="The Brera, three ways."
        cta="See the look →"
        tone="warm"
        height={460}
        onNav={onNav}
      />

      {/* Row 3 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px 12px', margin: '28px 0' }}>
        <VProductCard p={p} display={display} prod={VELA_COLLECTION_PRODUCTS[2]} onNav={onNav}/>
        <VProductCard p={p} display={display} prod={VELA_COLLECTION_PRODUCTS[3]} onNav={onNav}/>
      </div>

      {/* Editorial card */}
      <EditorialCard p={p} display={display}/>

      {/* Row 5 — irregular: tall left + 2 stacked right */}
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px',
        margin: '28px 0',
      }}>
        <div>
          <VProductCard p={p} display={display} prod={{ ...VELA_COLLECTION_PRODUCTS[4], tag: 'Last Few' }} onNav={onNav}/>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <VTinyProduct p={p} display={display} prod={VELA_COLLECTION_PRODUCTS[5]} onNav={onNav}/>
          <VTinyProduct p={p} display={display} prod={VELA_COLLECTION_PRODUCTS[6]} onNav={onNav}/>
        </div>
      </div>

      {/* Row 6 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px 12px', marginBottom: 28 }}>
        <VProductCard p={p} display={display} prod={VELA_COLLECTION_PRODUCTS[7]} onNav={onNav}/>
        <VProductCard p={p} display={display} prod={VELA_COLLECTION_PRODUCTS[8]} onNav={onNav}/>
      </div>

      {/* Quote */}
      <QuoteBlock p={p} display={display}/>

      {/* Row 8 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px 12px', margin: '28px 0 0' }}>
        <VProductCard p={p} display={display} prod={VELA_COLLECTION_PRODUCTS[9]} onNav={onNav}/>
        <VProductCard p={p} display={display} prod={VELA_COLLECTION_PRODUCTS[10]} onNav={onNav}/>
      </div>
    </section>
  );
}

function VSpaciousGrid({ p, display, onNav }) {
  // 1-col large editorial
  return (
    <section style={{ padding: '12px 20px 36px', background: p.stone }}>
      {VELA_COLLECTION_PRODUCTS.slice(0, 6).map((prod, i) => (
        <div key={i} style={{ marginBottom: 40 }}>
          <div style={{ marginBottom: 14 }}>
            {vimg(p, prod.name, { ratio: '4/5', tone: prod.tone || 'warm' })}
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ font: `300 18px/1.2 ${display}`, color: p.ink }}>{prod.name}</div>
            <div style={{
              font: '10px/1.5 "DM Sans"', color: p.mute,
              letterSpacing: '0.12em', textTransform: 'uppercase',
              marginTop: 4,
            }}>{prod.fabric}</div>
            <div style={{ font: '11px/1 "DM Sans"', color: p.ink, marginTop: 8 }}>${prod.price}</div>
          </div>
        </div>
      ))}
    </section>
  );
}

function VStandardGrid({ p, display, onNav }) {
  return (
    <section style={{ padding: '12px 20px 36px', background: p.stone }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px 12px' }}>
        {VELA_COLLECTION_PRODUCTS.map((prod, i) => (
          <VProductCard key={i} p={p} display={display} prod={prod} onNav={onNav}/>
        ))}
      </div>
    </section>
  );
}

// ─── Sub-components ────────────────────────────────────────
function FeatureTile({ p, display, eyebrow, title, cta, tone, height = 420, onNav }) {
  return (
    <div style={{ position: 'relative', height, overflow: 'hidden' }}
         onClick={() => onNav && onNav('product')}>
      {vimg(p, 'Editorial · Full Bleed', { ratio: '4/5', tone })}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 60%)',
      }}/>
      <div style={{
        position: 'absolute', left: 20, bottom: 22, right: 20,
        color: '#F5F4F2',
      }}>
        <div style={{
          font: '9px/1 "DM Sans"', letterSpacing: '0.32em',
          textTransform: 'uppercase', color: p.clay, marginBottom: 10,
        }}>{eyebrow}</div>
        <div style={{
          font: `300 28px/1.15 ${display}`, color: '#F5F4F2',
          marginBottom: 14,
        }}>{title}</div>
        <div style={{
          font: '10px/1 "DM Sans"', letterSpacing: '0.28em',
          textTransform: 'uppercase', color: '#F5F4F2',
          borderBottom: `1px solid ${p.clay}`, paddingBottom: 4,
          display: 'inline-block',
        }}>{cta}</div>
      </div>
    </div>
  );
}

function EditorialCard({ p, display }) {
  return (
    <div style={{
      background: p.bone, padding: '36px 24px',
      textAlign: 'center', border: `1px solid ${p.rule}`,
    }}>
      <div style={{
        font: '9px/1 "DM Sans"', letterSpacing: '0.32em',
        textTransform: 'uppercase', color: p.clay, marginBottom: 14,
      }}>The Fabric Notes</div>
      <h4 style={{
        font: `300 24px/1.25 ${display}`, color: p.ink,
        margin: '0 0 12px',
      }}>Why we washed every linen twice.</h4>
      <p style={{
        font: '13px/1.65 "DM Sans"', color: p.mute,
        margin: '0 auto 18px', maxWidth: 270,
      }}>The result is a drape that begins where most linens end — soft, lived-in, and unbothered by mornings.</p>
      <a style={{
        font: '10px/1 "DM Sans"', letterSpacing: '0.28em',
        textTransform: 'uppercase', color: p.ink,
        borderBottom: `1px solid ${p.clay}`, paddingBottom: 4,
      }}>Read the note →</a>
    </div>
  );
}

function QuoteBlock({ p, display }) {
  return (
    <div style={{
      background: p.ink, color: p.stone,
      padding: '44px 26px', textAlign: 'center',
    }}>
      <div style={{
        font: `300 56px/0.6 ${display}`, color: p.clay,
        marginBottom: 10, opacity: 0.7,
      }}>"</div>
      <p style={{
        font: `italic 300 19px/1.45 ${display}`, color: p.stone,
        margin: '0 auto 16px', maxWidth: 260,
      }}>The kind of clothes that survive being packed badly.</p>
      <div style={{
        font: '9px/1 "DM Sans"', letterSpacing: '0.32em',
        textTransform: 'uppercase', color: 'rgba(245,244,242,0.5)',
      }}>The Modist · Resort 26</div>
    </div>
  );
}

function VTinyProduct({ p, display, prod, onNav }) {
  return (
    <div onClick={() => onNav && onNav('product')} style={{ cursor: 'pointer' }}>
      {vimg(p, null, { ratio: '4/5', tone: prod.tone || 'warm' })}
      <div style={{ paddingTop: 8 }}>
        <div style={{ font: `300 13px/1.2 ${display}`, color: p.ink }}>{prod.name}</div>
        <div style={{ font: '10px/1 "DM Sans"', color: p.ink, marginTop: 4 }}>${prod.price}</div>
      </div>
    </div>
  );
}

// ─── Data ────────────────────────────────────────────────
const VELA_COLLECTION_PRODUCTS = [
  { name: 'The Brera Trouser', fabric: 'Italian Linen · Bone', price: 285, tone: 'warm', colors: ['#E8E2D4','#1A1A1A','#7B8068'] },
  { name: 'The Linen Camisole', fabric: 'Belgian Linen · Shell', price: 165, tone: 'cool', colors: ['#F2EAE0','#1A1A1A'] },
  { name: 'The Plaster Knit', fabric: 'Merino Cashmere · Clay', price: 340, tone: 'clay', tag: 'New', colors: ['#C4A882','#1A1A1A','#F2EAE0'] },
  { name: 'The Field Coat', fabric: 'Brushed Wool · Ash', price: 620, tone: 'warm', colors: ['#B8B0A4','#1A1A1A'] },
  { name: 'The Long Slip', fabric: 'Washed Silk · Pearl', price: 395, tone: 'cool', colors: ['#EAE3D6','#1A1A1A','#7B8068'] },
  { name: 'The Camisole', fabric: 'Washed Silk', price: 195, tone: 'warm' },
  { name: 'The Shell Top', fabric: 'Cotton Poplin', price: 145, tone: 'clay' },
  { name: 'The Brera Trouser (Black)', fabric: 'Italian Linen · Ink', price: 285, tone: 'cool', colors: ['#1A1A1A'] },
  { name: 'The Shirt Dress', fabric: 'Laundered Cotton · Ecru', price: 320, tone: 'warm', tag: 'New', colors: ['#F2EAE0','#1A1A1A'] },
  { name: 'The Long Skirt', fabric: 'Italian Linen · Sand', price: 245, tone: 'clay', colors: ['#E8D8C2','#1A1A1A'] },
  { name: 'The Wool Vest', fabric: 'Boiled Wool · Charcoal', price: 295, tone: 'cool', colors: ['#3A3A3A','#1A1A1A'] },
];

Object.assign(window, { VCollection });
