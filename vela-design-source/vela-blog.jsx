// VELA — Blog / Journal (mobile)
// Quiet index — list of titles with tap-to-reveal previews.

function VBlog({ p, display, onNav }) {
  const [openId, setOpenId] = React.useState(2); // one open by default

  return (
    <div style={{ background: p.stone, color: p.ink, minHeight: '100%' }}>
      <VAnnounce p={p}/>
      <VHeader p={p} display={display} onNav={onNav} active="blog"/>
      <VPageNav p={p} active="blog" onNav={onNav}/>

      {/* Masthead */}
      <section style={{
        padding: '48px 24px 36px', borderBottom: `1px solid ${p.rule}`,
        textAlign: 'center', background: p.stone,
      }}>
        <div style={{
          font: '9px/1 "DM Sans"', letterSpacing: '0.4em',
          textTransform: 'uppercase', color: p.clay, marginBottom: 14,
        }}>Vol. 06 · Resort 26</div>
        <h1 style={{
          font: `300 60px/1 ${display}`, color: p.ink,
          margin: 0, letterSpacing: '0.005em',
        }}>The <em style={{ fontStyle: 'italic', color: p.clay }}>Journal</em></h1>
        <VRule p={p} w={50}/>
        <p style={{
          font: `italic 300 16px/1.55 ${display}`, color: p.mute,
          margin: '0 auto', maxWidth: 290,
        }}>Reading material from the studio. Notes on craft, slowness, and getting dressed.</p>
      </section>

      {/* Featured story */}
      <section style={{ background: p.bone, padding: '0 0 36px' }}>
        <div onClick={() => onNav && onNav('product')} style={{ cursor: 'pointer' }}>
          <div style={{ position: 'relative' }}>
            {vimg(p, 'Atelier · Como Mill · 16:9', { ratio: '16/10', tone: 'warm' })}
            <div style={{
              position: 'absolute', top: 16, left: 16,
              background: p.stone, padding: '5px 10px',
              font: '9px/1 "DM Sans"', letterSpacing: '0.24em',
              textTransform: 'uppercase', color: p.ink,
            }}>Featured · Atelier</div>
          </div>
          <div style={{ padding: '24px 24px 0' }}>
            <div style={{
              font: '9px/1 "DM Sans"', letterSpacing: '0.32em',
              textTransform: 'uppercase', color: p.clay, marginBottom: 10,
            }}>Essay · 7 min read</div>
            <h2 style={{
              font: `300 32px/1.15 ${display}`, color: p.ink,
              margin: '0 0 12px', letterSpacing: '0.005em',
            }}>The case for owning fewer trousers, made better.</h2>
            <p style={{
              font: '14px/1.7 "DM Sans"', color: p.mute,
              margin: '0 0 16px',
            }}>A long thought on the discipline of fewer things, and what one trip to a Milanese atelier taught us about pattern.</p>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10,
              font: '10px/1 "DM Sans"', letterSpacing: '0.16em',
              textTransform: 'uppercase', color: p.mute,
            }}>
              <div style={{
                width: 24, height: 24, borderRadius: 24,
                background: p.clay,
              }}/>
              Mae Lindqvist
              <span style={{ opacity: 0.4 }}>·</span>
              May 12, 2026
            </div>
          </div>
        </div>
      </section>

      {/* Filter chips */}
      <section style={{ background: p.stone, padding: '24px 20px 18px', borderTop: `1px solid ${p.rule}`, borderBottom: `1px solid ${p.rule}` }}>
        <div style={{
          font: '9px/1 "DM Sans"', letterSpacing: '0.32em',
          textTransform: 'uppercase', color: p.mute, marginBottom: 14,
        }}>The Index</div>
        <div style={{ display: 'flex', gap: 6, overflowX: 'auto' }}>
          {[
            { label: 'All', count: 64, active: true },
            { label: 'Atelier', count: 12 },
            { label: 'Style', count: 18 },
            { label: 'Object', count: 9 },
            { label: 'Conversation', count: 11 },
            { label: 'Travel', count: 14 },
          ].map((c) => (
            <div key={c.label} style={{
              padding: '7px 12px',
              border: c.active ? `1px solid ${p.ink}` : `1px solid ${p.rule}`,
              background: c.active ? p.ink : 'transparent',
              color: c.active ? p.stone : p.ink,
              font: '10px/1 "DM Sans"', letterSpacing: '0.16em',
              textTransform: 'uppercase', whiteSpace: 'nowrap',
              display: 'flex', alignItems: 'center', gap: 6,
              cursor: 'pointer',
            }}>
              {c.label}
              <span style={{ opacity: 0.5, fontSize: 9 }}>{c.count}</span>
            </div>
          ))}
        </div>
      </section>

      {/* The quiet index — minimal list */}
      <section style={{ background: p.stone, padding: '20px 0 36px' }}>
        {VELA_JOURNAL.map((post, i) => {
          const isOpen = openId === i;
          return (
            <article key={i} onClick={() => setOpenId(isOpen ? null : i)}
              style={{
                borderBottom: `1px solid ${p.rule}`,
                cursor: 'pointer',
                background: isOpen ? p.bone : 'transparent',
                transition: 'background 0.2s',
              }}>
              {/* Row */}
              <div style={{
                padding: '22px 24px', display: 'flex', alignItems: 'flex-start',
                gap: 16,
              }}>
                {/* Index number */}
                <div style={{
                  font: `300 14px/1 ${display}`, color: p.clay,
                  flexShrink: 0, minWidth: 24, paddingTop: 4,
                }}>{String(i + 1).padStart(2, '0')}</div>

                {/* Title + meta */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    font: '9px/1 "DM Sans"', letterSpacing: '0.28em',
                    textTransform: 'uppercase', color: p.mute, marginBottom: 8,
                  }}>{post.cat} · {post.read}</div>
                  <h3 style={{
                    font: `300 22px/1.2 ${display}`,
                    color: p.ink, margin: 0,
                    letterSpacing: '0.005em',
                  }}>{post.title}</h3>
                  <div style={{
                    marginTop: 10,
                    font: '10px/1 "DM Sans"', letterSpacing: '0.14em',
                    textTransform: 'uppercase', color: p.mute,
                  }}>{post.author} · {post.date}</div>
                </div>

                {/* Expand indicator */}
                <div style={{
                  width: 24, height: 24, borderRadius: 24,
                  border: `1px solid ${p.rule}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: p.ink, flexShrink: 0,
                  transform: isOpen ? 'rotate(45deg)' : 'rotate(0)',
                  transition: 'transform 0.2s',
                }}>
                  <VIcon name="plus" size={12}/>
                </div>
              </div>

              {/* Expanded panel */}
              {isOpen && (
                <div style={{ padding: '4px 24px 28px' }}>
                  <div style={{ marginBottom: 18 }}>
                    {vimg(p, post.imgLabel, { ratio: '4/3', tone: post.tone || 'warm' })}
                  </div>
                  <p style={{
                    font: `italic 300 16px/1.55 ${display}`, color: p.ink,
                    margin: '0 0 18px',
                  }}>"{post.excerpt}"</p>
                  <a style={{
                    font: '10px/1 "DM Sans"', letterSpacing: '0.28em',
                    textTransform: 'uppercase', color: p.ink,
                    borderBottom: `1px solid ${p.clay}`, paddingBottom: 4,
                    display: 'inline-block',
                  }}>Continue reading →</a>
                </div>
              )}
            </article>
          );
        })}
      </section>

      {/* Archive link */}
      <section style={{
        padding: '32px 24px 56px', background: p.stone,
        textAlign: 'center',
      }}>
        <div style={{
          font: '11px/1.6 "DM Sans"', color: p.mute,
          marginBottom: 14,
        }}>Showing 8 of 64 · Vol. 01–06</div>
        <button style={{
          background: 'transparent', border: `1px solid ${p.ink}`,
          color: p.ink, padding: '14px 36px',
          font: '10px/1 "DM Sans"', letterSpacing: '0.28em',
          textTransform: 'uppercase', cursor: 'pointer',
        }}>Browse the archive</button>
      </section>

      {/* Reading more */}
      <section style={{ background: p.bone, padding: '48px 24px 56px' }}>
        <VEyebrow p={p} align="center">Curated</VEyebrow>
        <h3 style={{
          font: `300 26px/1.2 ${display}`, textAlign: 'center',
          color: p.ink, margin: '0 0 28px',
        }}>From the studio reading list</h3>
        {[
          { num: '01', name: 'Anne Berest', book: 'The Postcard', pub: 'Europa Editions, 2023' },
          { num: '02', name: 'Junichirō Tanizaki', book: 'In Praise of Shadows', pub: 'Leetes Island, 1977' },
          { num: '03', name: 'Robert Bresson', book: 'Notes on the Cinematograph', pub: 'NYRB Classics, 1975' },
        ].map((b, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 16,
            padding: '14px 0',
            borderTop: i === 0 ? `1px solid ${p.rule}` : 'none',
            borderBottom: `1px solid ${p.rule}`,
          }}>
            <div style={{
              font: `300 16px/1 ${display}`, color: p.clay,
              width: 26, flexShrink: 0,
            }}>{b.num}</div>
            <div style={{ flex: 1 }}>
              <div style={{ font: `300 16px/1.2 ${display}`, color: p.ink }}>{b.book}</div>
              <div style={{
                marginTop: 4,
                font: '10px/1 "DM Sans"', letterSpacing: '0.14em',
                textTransform: 'uppercase', color: p.mute,
              }}>{b.name} · {b.pub}</div>
            </div>
          </div>
        ))}
      </section>

      <VNewsletter p={p} display={display}/>
      <VFooter p={p} display={display}/>
    </div>
  );
}

const VELA_JOURNAL = [
  {
    cat: 'Atelier', read: '6 min',
    title: 'Inside the Biella mill where we make the wool.',
    author: 'Mae Lindqvist', date: 'May 02',
    excerpt: 'There is a particular sound a wool loom makes after eighty years. We sat next to it for three days.',
    imgLabel: 'Biella · Mill', tone: 'warm',
  },
  {
    cat: 'Style', read: '4 min',
    title: 'How three women are wearing the Brera trouser.',
    author: 'Anouk Reinart', date: 'Apr 26',
    excerpt: 'A lawyer in Stockholm, a baker in Paris, an architect in Mexico City. Same trouser, three lives.',
    imgLabel: 'Three Women · Editorial', tone: 'cool',
  },
  {
    cat: 'Object', read: '3 min',
    title: 'A small case for why we still iron things.',
    author: 'Mae Lindqvist', date: 'Apr 18',
    excerpt: 'The iron is not nostalgic. It is a fifteen-minute ritual that interrupts the day for the better.',
    imgLabel: 'Object Study · Iron', tone: 'warm',
  },
  {
    cat: 'Conversation', read: '12 min',
    title: 'In conversation with the woman who taught us to hem.',
    author: 'Studio Notes', date: 'Apr 04',
    excerpt: 'Marisa Bianchi has been hemming trousers in Milan for forty-one years. We brought a tape recorder.',
    imgLabel: 'Marisa · Portrait', tone: 'clay',
  },
  {
    cat: 'Travel', read: '8 min',
    title: 'A weekend with one bag, two pieces, and three plans.',
    author: 'Anouk Reinart', date: 'Mar 22',
    excerpt: 'Lisbon in April, packed in a Globe-Trotter. What we wore, what we returned with, and what we left behind.',
    imgLabel: 'Travel · Lisbon', tone: 'warm',
  },
  {
    cat: 'Atelier', read: '5 min',
    title: 'The morning we washed every linen twice.',
    author: 'Mae Lindqvist', date: 'Mar 10',
    excerpt: 'A note on why softness is a decision made in the laundry room, long before the cutting table.',
    imgLabel: 'Atelier · Wash', tone: 'cool',
  },
  {
    cat: 'Object', read: '2 min',
    title: 'On a particular shade of bone.',
    author: 'Studio Notes', date: 'Feb 24',
    excerpt: 'We tested forty-two off-whites for Resort 26. The one we picked is the colour of dried bread.',
    imgLabel: 'Colour Study', tone: 'warm',
  },
  {
    cat: 'Style', read: '5 min',
    title: 'Why uniformity is the most personal style there is.',
    author: 'Mae Lindqvist', date: 'Feb 11',
    excerpt: 'The painter Agnes Martin wore the same outfit for thirty years. There is a discipline worth borrowing.',
    imgLabel: 'Agnes · Editorial', tone: 'cool',
  },
];

Object.assign(window, { VBlog });
