const PLATFORMS = [
  {
    emoji: '🎓',
    name: 'IIMBx',
    tagline: 'Flagship Platform',
    desc: 'Delivers customized learning solutions tailored to diverse professional training needs, backed by IIM Bangalore faculty excellence.',
    tag: 'Core Platform',
    color: '#B01116',
    tagColor: 'rgba(176,17,22,0.2)',
    tagBorder: '#B01116',
  },
  {
    iconNode: <img src="https://flagcdn.com/w40/in.png" alt="India Flag" style={{ width: '28px', borderRadius: '4px' }} />,
    name: 'Swayam',
    tagline: 'National MOOC Platform',
    desc: 'IIM Bangalore promotes Access, Equity and Quality in education through SWAYAM\'s nationwide online course infrastructure.',
    tag: 'Government',
    color: '#FF9933',
    tagColor: 'rgba(255,153,51,0.15)',
    tagBorder: '#FF9933',
  },
  {
    emoji: '🌐',
    name: 'edX',
    tagline: 'Global Learning Partner',
    desc: 'As India\'s first institution on edX — founded by Harvard & MIT — IIM Bangalore offers world-class global learning opportunities.',
    tag: 'International',
    color: '#00E5FF',
    tagColor: 'rgba(0,229,255,0.1)',
    tagBorder: '#00E5FF',
  },
  {
    emoji: '⚡',
    name: 'iGOT Karmayogi',
    tagline: 'Civil Services Upskilling',
    desc: 'iGOT Karmayogi is a government digital platform for continuous learning, enhancing civil servants\' competencies and future readiness.',
    tag: 'Public Sector',
    color: '#0066FF',
    tagColor: 'rgba(0,102,255,0.15)',
    tagBorder: '#0066FF',
  },
];

const PlatformsSection = () => {
  return (
    <section className="platforms-section" id="platforms">
      <div className="platforms-inner">
        <div className="platforms-header">
          <span className="section-tag">Our Ecosystem</span>
          <h2 className="platforms-title">
            One Mission.<br />
            <span style={{ color: 'var(--accent-cyan)' }}>Four Platforms.</span>
          </h2>
          <p className="platforms-subtitle">
            IIMBx delivers exceptional education across four powerful platforms, ensuring world-class learning is accessible to every professional, everywhere.
          </p>
        </div>

        <div className="platforms-grid">
          {PLATFORMS.map((p) => (
            <div
              key={p.name}
              className="platform-card"
              style={{ '--card-color': p.color }}
            >
              <div
                className="platform-logo-area"
                style={{
                  background: `linear-gradient(135deg, ${p.color}20, ${p.color}08)`,
                  boxShadow: `0 0 20px ${p.color}20`,
                }}
              >
                <span style={{ filter: `drop-shadow(0 0 8px ${p.color})`, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                  {p.iconNode || p.emoji}
                </span>
              </div>

              <p style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: p.color, marginBottom: '0.5rem', position: 'relative', zIndex: 1 }}>
                {p.tagline}
              </p>

              <h3 className="platform-name">{p.name}</h3>
              <p className="platform-desc">{p.desc}</p>

              <span
                className="platform-tag"
                style={{
                  background: p.tagColor,
                  borderColor: p.tagBorder,
                  color: p.tagBorder,
                }}
              >
                {p.tag}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlatformsSection;
