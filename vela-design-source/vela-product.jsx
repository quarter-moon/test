// VELA — Product page (mobile)
// Image-led full-bleed gallery + info below + sticky bottom CTA.

function VProduct({ p, display, onNav }) {
  return (
    <div style={{ background: p.stone, color: p.ink, minHeight: '100%', position: 'relative', paddingBottom: 78 }}>
      <VAnnounce p={p}/>
      <VHeader p={p} display={display} onNav={onNav} active="product"/>
      <VPageNav p={p} active="product" onNav={onNav}/>

      {/* Breadcrumb */}
      <div style={{
        padding: '14px 24px',
        font: '9px/1 "DM Sans"', letterSpacing: '0.22em',
        textTransform: 'uppercase', color: p.mute,
        borderBottom: `1px solid ${p.rule}`,
      }}>
        <span onClick={() => onNav && onNav('collection')} style={{ cursor: 'pointer' }}>Shop</span>
        <span style={{ margin: '0 8px', opacity: 0.5 }}>/</span>
        <span onClick={() => onNav && onNav('collection')} style={{ cursor: 'pointer' }}>Resort 26</span>
        <span style={{ margin: '0 8px', opacity: 0.5 }}>/</span>
        <span style={{ color: p.ink }}>The Brera Trouser</span>
      </div>

      {/* Image gallery */}
      <VProductGallery p={p}/>

      {/* Title + price block */}
      <section style={{ padding: '24px 24px 12px', background: p.stone }}>
        <div style={{
          font: '9px/1 "DM Sans"', letterSpacing: '0.32em',
          textTransform: 'uppercase', color: p.clay, marginBottom: 10,
        }}>Resort 26 · New</div>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
          <h1 style={{
            font: `300 32px/1.1 ${display}`, color: p.ink,
            margin: 0, letterSpacing: '0.005em',
          }}>The Brera<br/>Trouser</h1>
          <button style={{
            background: 'transparent', border: `1px solid ${p.rule}`,
            width: 38, height: 38, borderRadius: 38, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: p.ink,
            flexShrink: 0,
          }}>
            <VIcon name="heart" size={16}/>
          </button>
        </div>
        <div style={{
          font: '12px/1.5 "DM Sans"', color: p.mute,
          letterSpacing: '0.06em', marginTop: 12,
        }}>Italian Linen · Bone · Tailored in Como</div>

        {/* Price + reviews */}
        <div style={{
          marginTop: 18, display: 'flex', alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div style={{ font: `300 22px/1 ${display}`, color: p.ink }}>$285</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ display: 'flex', gap: 1, color: p.clay }}>
              {[0,1,2,3,4].map((i) => <VIcon key={i} name="star" size={11} color={i < 4 ? p.clay : p.mute}/>)}
            </div>
            <div style={{
              font: '10px/1 "DM Sans"', color: p.mute,
              letterSpacing: '0.12em',
            }}>4.8 · 124</div>
          </div>
        </div>
        <VRule p={p} w="100%" color={p.rule}/>
        <p style={{
          font: `italic 300 15px/1.55 ${display}`, color: p.ink,
          margin: '8px 0 0',
        }}>"A high-waisted, wide-leg trouser drafted from a 1972 Milanese pattern, washed twice, and built to live in."</p>
      </section>

      {/* Color selector */}
      <section style={{ padding: '24px 24px 0' }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'baseline', marginBottom: 14,
        }}>
          <div style={{
            font: '10px/1 "DM Sans"', letterSpacing: '0.28em',
            textTransform: 'uppercase', color: p.ink,
          }}>Colour</div>
          <div style={{
            font: '11px/1 "DM Sans"', color: p.mute,
            letterSpacing: '0.06em',
          }}>Bone</div>
        </div>
        <div style={{ display: 'flex', gap: 14 }}>
          {[
            { c: '#E8E2D4', name: 'Bone', active: true },
            { c: '#1A1A1A', name: 'Ink' },
            { c: '#7B8068', name: 'Sage' },
            { c: '#C4A882', name: 'Clay' },
          ].map((s, i) => (
            <div key={i} style={{
              width: 44, height: 44, borderRadius: 44,
              border: s.active ? `1px solid ${p.ink}` : `1px solid ${p.rule}`,
              padding: 3, cursor: 'pointer',
            }}>
              <div style={{
                width: '100%', height: '100%', borderRadius: '50%',
                background: s.c, border: s.c === '#E8E2D4' ? `0.5px solid ${p.rule}` : 'none',
              }}/>
            </div>
          ))}
        </div>
      </section>

      {/* Size selector */}
      <section style={{ padding: '28px 24px 0' }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'baseline', marginBottom: 14,
        }}>
          <div style={{
            font: '10px/1 "DM Sans"', letterSpacing: '0.28em',
            textTransform: 'uppercase', color: p.ink,
          }}>Size · UK</div>
          <a style={{
            font: '10px/1 "DM Sans"', letterSpacing: '0.18em',
            textTransform: 'uppercase', color: p.mute,
            borderBottom: `1px solid ${p.rule}`, paddingBottom: 2,
            cursor: 'pointer',
          }}>Size guide</a>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 6 }}>
          {[
            { l: '6', stock: 'in' },
            { l: '8', stock: 'in', active: true },
            { l: '10', stock: 'in' },
            { l: '12', stock: 'low' },
            { l: '14', stock: 'out' },
            { l: '16', stock: 'in' },
          ].map((s, i) => (
            <div key={i} style={{
              padding: '12px 0', textAlign: 'center',
              border: s.active ? `1px solid ${p.ink}` : `1px solid ${p.rule}`,
              background: s.active ? p.ink : 'transparent',
              color: s.stock === 'out' ? p.mute : (s.active ? p.stone : p.ink),
              font: '12px/1 "DM Sans"',
              cursor: s.stock === 'out' ? 'not-allowed' : 'pointer',
              position: 'relative',
              textDecoration: s.stock === 'out' ? 'line-through' : 'none',
            }}>
              {s.l}
              {s.stock === 'low' && (
                <div style={{
                  position: 'absolute', top: -7, right: -3,
                  background: p.clay, color: '#fff',
                  font: '7px/1 "DM Sans"', letterSpacing: '0.1em',
                  padding: '2px 4px', textTransform: 'uppercase',
                }}>1 left</div>
              )}
            </div>
          ))}
        </div>
        <div style={{
          marginTop: 14, display: 'flex', alignItems: 'center', gap: 8,
          font: '11px/1.4 "DM Sans"', color: p.mute,
        }}>
          <VIcon name="check" size={12} color={p.clay}/>
          Model is 5'10" wearing size 8. Hips are 88cm.
        </div>
      </section>

      {/* Shipping note */}
      <section style={{
        margin: '28px 24px 0', padding: '16px 18px',
        border: `1px solid ${p.rule}`, background: p.bone,
        display: 'flex', gap: 14, alignItems: 'flex-start',
      }}>
        <div style={{ flexShrink: 0 }}>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke={p.clay} strokeWidth="0.8">
            <path d="M3 7h11v8H3zM14 9h4l2 3v3h-6z"/>
            <circle cx="7" cy="16" r="1.5"/>
            <circle cx="17" cy="16" r="1.5"/>
          </svg>
        </div>
        <div>
          <div style={{
            font: '11px/1.4 "DM Sans"', letterSpacing: '0.06em',
            color: p.ink, marginBottom: 4,
          }}>Complimentary delivery · arrives Wed–Fri</div>
          <div style={{ font: '11px/1.5 "DM Sans"', color: p.mute }}>
            Wrapped in our recycled tissue. Free returns within 30 days.
          </div>
        </div>
      </section>

      {/* Accordion: Details */}
      <section style={{ padding: '28px 24px 0' }}>
        {VELA_PRODUCT_ACCORDION.map((a, i) => (
          <details key={i} open={i === 0} style={{
            borderBottom: `1px solid ${p.rule}`,
            padding: '16px 0',
          }}>
            <summary style={{
              listStyle: 'none', display: 'flex',
              justifyContent: 'space-between', alignItems: 'center',
              cursor: 'pointer',
              font: '11px/1 "DM Sans"', letterSpacing: '0.24em',
              textTransform: 'uppercase', color: p.ink,
            }}>
              {a.title}
              <span style={{ color: p.mute, fontSize: 16, lineHeight: 1 }}>+</span>
            </summary>
            <div style={{
              marginTop: 14, font: '13px/1.7 "DM Sans"', color: p.mute,
            }}>{a.body}</div>
            {a.list && (
              <ul style={{ marginTop: 10, paddingLeft: 16 }}>
                {a.list.map((l) => (
                  <li key={l} style={{
                    font: '12px/1.7 "DM Sans"', color: p.mute,
                  }}>{l}</li>
                ))}
              </ul>
            )}
          </details>
        ))}
      </section>

      {/* The story (editorial block) */}
      <section style={{ background: p.bone, marginTop: 36, padding: '48px 0' }}>
        <div style={{ padding: '0 20px', marginBottom: 22 }}>
          {vimg(p, 'Atelier · Como Mill · 4:5', { ratio: '4/5', tone: 'warm' })}
        </div>
        <div style={{ padding: '0 24px', textAlign: 'center' }}>
          <VEyebrow p={p} align="center">The Making</VEyebrow>
          <h3 style={{
            font: `300 26px/1.25 ${display}`, color: p.ink,
            margin: '0 0 12px',
          }}>One trouser, fifty‑two days.</h3>
          <p style={{
            font: '13px/1.7 "DM Sans"', color: p.mute,
            margin: '0 auto', maxWidth: 290,
          }}>The linen is grown in Normandy, milled in Como, washed twice, and cut in a quiet room above a Milanese café.</p>
        </div>
      </section>

      {/* Reviews */}
      <section style={{ padding: '48px 24px', background: p.stone }}>
        <VEyebrow p={p} align="center">What the Studio Hears</VEyebrow>
        <h3 style={{
          font: `300 24px/1.2 ${display}`, textAlign: 'center',
          margin: '0 0 24px', color: p.ink,
        }}>4.8 · from 124 reviews</h3>

        {[
          { name: 'Mira K.', size: '8 · Bone', body: 'Better than the linen I bought in Tokyo for twice the price. The drape is unreal.', rating: 5, when: '2 weeks ago' },
          { name: 'Anouk D.', size: '10 · Ink', body: 'Run a half-size narrower at the waist if you are between sizes. Otherwise — perfect.', rating: 5, when: 'Last month' },
        ].map((r, i) => (
          <div key={i} style={{
            borderTop: `1px solid ${p.rule}`,
            padding: '18px 0',
          }}>
            <div style={{
              display: 'flex', justifyContent: 'space-between',
              alignItems: 'center', marginBottom: 8,
            }}>
              <div style={{ display: 'flex', gap: 1 }}>
                {[0,1,2,3,4].map((i) => <VIcon key={i} name="star" size={11} color={p.clay}/>)}
              </div>
              <div style={{
                font: '9px/1 "DM Sans"', letterSpacing: '0.22em',
                textTransform: 'uppercase', color: p.mute,
              }}>{r.when}</div>
            </div>
            <p style={{
              font: `italic 300 15px/1.5 ${display}`, color: p.ink,
              margin: '0 0 10px',
            }}>"{r.body}"</p>
            <div style={{
              font: '10px/1 "DM Sans"', letterSpacing: '0.16em',
              textTransform: 'uppercase', color: p.mute,
            }}>{r.name} · {r.size}</div>
          </div>
        ))}
        <button style={{
          display: 'block', margin: '24px auto 0',
          background: 'transparent', border: 0, color: p.ink,
          font: '10px/1 "DM Sans"', letterSpacing: '0.28em',
          textTransform: 'uppercase', cursor: 'pointer',
          borderBottom: `1px solid ${p.clay}`, paddingBottom: 4,
        }}>Read all 124 reviews →</button>
      </section>

      {/* You might also (paired with) */}
      <section style={{ padding: '48px 20px', background: p.stone, borderTop: `1px solid ${p.rule}` }}>
        <VEyebrow p={p} align="center">Pairs With</VEyebrow>
        <h3 style={{
          font: `300 24px/1.2 ${display}`, textAlign: 'center',
          margin: '0 0 24px', color: p.ink,
        }}>The studio styled it with —</h3>
        <div style={{ display: 'flex', gap: 12, overflowX: 'auto' }}>
          {[
            { name: 'The Camisole', fabric: 'Washed Silk', price: 195, tone: 'warm' },
            { name: 'The Plaster Knit', fabric: 'Merino Cashmere', price: 340, tone: 'clay' },
            { name: 'The Field Coat', fabric: 'Brushed Wool', price: 620, tone: 'cool' },
          ].map((prod, i) => (
            <div key={i} style={{ flex: '0 0 140px', cursor: 'pointer' }} onClick={() => onNav && onNav('product')}>
              {vimg(p, null, { ratio: '4/5', tone: prod.tone })}
              <div style={{ paddingTop: 8 }}>
                <div style={{ font: `300 13px/1.25 ${display}`, color: p.ink }}>{prod.name}</div>
                <div style={{
                  font: '9px/1.4 "DM Sans"', color: p.mute,
                  letterSpacing: '0.12em', textTransform: 'uppercase',
                  marginTop: 2,
                }}>{prod.fabric}</div>
                <div style={{ font: '11px/1 "DM Sans"', color: p.ink, marginTop: 6 }}>${prod.price}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recently viewed strip */}
      <section style={{
        padding: '36px 20px 48px', background: p.bone,
        borderTop: `1px solid ${p.rule}`,
      }}>
        <div style={{
          font: '9px/1 "DM Sans"', letterSpacing: '0.32em',
          textTransform: 'uppercase', color: p.mute, marginBottom: 18,
        }}>Recently Considered</div>
        <div style={{ display: 'flex', gap: 10, overflowX: 'auto' }}>
          {[0,1,2,3].map((i) => (
            <div key={i} style={{ flex: '0 0 80px' }}>
              {vimg(p, null, { ratio: '4/5', tone: i % 2 ? 'warm' : 'cool' })}
            </div>
          ))}
        </div>
      </section>

      <VFooter p={p} display={display}/>

      {/* Sticky bottom CTA */}
      <div style={{
        position: 'sticky', bottom: 0, left: 0, right: 0,
        background: p.stone, borderTop: `1px solid ${p.rule}`,
        padding: '12px 18px', zIndex: 6,
        display: 'flex', alignItems: 'center', gap: 10,
        boxShadow: '0 -8px 24px rgba(0,0,0,0.04)',
      }}>
        <div style={{ flex: 1 }}>
          <div style={{ font: '10px/1.2 "DM Sans"', color: p.mute, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Bone · 8</div>
          <div style={{ font: `300 18px/1 ${display}`, color: p.ink, marginTop: 4 }}>$285</div>
        </div>
        <button style={{
          flex: 2, background: p.ink, border: 0, color: p.stone,
          padding: '16px',
          font: '10px/1 "DM Sans"', letterSpacing: '0.32em',
          textTransform: 'uppercase', cursor: 'pointer',
        }}>Add to Bag</button>
      </div>
    </div>
  );
}

// ─── Gallery ────────────────────────────────────────────────
function VProductGallery({ p }) {
  const [idx, setIdx] = React.useState(0);
  const slides = [
    { tone: 'warm', label: '01 · Look · Front' },
    { tone: 'cool', label: '02 · Detail · Waist' },
    { tone: 'clay', label: '03 · Detail · Hem' },
    { tone: 'warm', label: '04 · Look · On Body' },
  ];
  return (
    <section style={{ position: 'relative', background: p.bone }}>
      <div style={{ position: 'relative' }}>
        {vimg(p, slides[idx].label, { ratio: '4/5', tone: slides[idx].tone })}
        {/* Side arrows */}
        <button onClick={() => setIdx((idx - 1 + slides.length) % slides.length)} style={{
          position: 'absolute', left: 8, top: '50%',
          transform: 'translateY(-50%)',
          width: 36, height: 36, borderRadius: 36,
          background: 'rgba(245,244,242,0.7)', border: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer',
        }}>
          <span style={{ transform: 'rotate(180deg)', display: 'flex' }}>
            <VIcon name="chev-r" size={14} color={p.ink}/>
          </span>
        </button>
        <button onClick={() => setIdx((idx + 1) % slides.length)} style={{
          position: 'absolute', right: 8, top: '50%',
          transform: 'translateY(-50%)',
          width: 36, height: 36, borderRadius: 36,
          background: 'rgba(245,244,242,0.7)', border: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer',
        }}>
          <VIcon name="chev-r" size={14} color={p.ink}/>
        </button>
        {/* Index */}
        <div style={{
          position: 'absolute', top: 16, right: 16,
          background: 'rgba(26,26,26,0.7)', color: '#fff',
          padding: '5px 10px',
          font: '9px/1 "DM Sans"', letterSpacing: '0.22em',
          textTransform: 'uppercase',
        }}>{idx + 1} / {slides.length}</div>
      </div>
      {/* Thumbnails */}
      <div style={{
        display: 'flex', gap: 6, padding: '12px 20px 16px',
        overflowX: 'auto',
      }}>
        {slides.map((s, i) => (
          <div key={i} onClick={() => setIdx(i)} style={{
            flex: '0 0 56px', cursor: 'pointer',
            outline: i === idx ? `1px solid ${p.ink}` : `0.5px solid ${p.rule}`,
            outlineOffset: 1,
          }}>
            {vimg(p, null, { ratio: '4/5', tone: s.tone })}
          </div>
        ))}
      </div>
    </section>
  );
}

const VELA_PRODUCT_ACCORDION = [
  {
    title: 'The Details',
    body: 'A wide-leg, high-waisted trouser cut on a 1972 Milanese pattern. The waistband sits at the natural waist; the leg falls in a long, unbroken line.',
    list: ['Side button & concealed hook closure', 'Belt loops, lined waistband', 'Slant pockets at hip, welt pockets at back', 'Unfinished hem, dressed at 32"'],
  },
  {
    title: 'Fabric & Care',
    body: '100% European linen, 220gsm. Pre-washed twice for softness. Wash cold, hang dry, iron damp. Lives well rumpled.',
  },
  {
    title: 'Provenance',
    body: 'Linen grown in Normandy. Woven and milled at the Albini family mill, Como. Cut and sewn in a small atelier in Milan, by a team of eleven.',
  },
  {
    title: 'Shipping & Returns',
    body: 'Complimentary worldwide shipping over $150. Free returns within 30 days. Made-to-order pieces ship in 4 weeks.',
  },
];

Object.assign(window, { VProduct });
