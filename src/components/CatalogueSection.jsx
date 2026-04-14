const COURSES = [
  {
    icon: '👥',
    tag: 'Management',
    tagColor: '#00E5FF',
    title: 'People Management',
    frontBg: '#00E5FF',
    desc: 'Master the art and science of leading teams. Learn how to recruit, motivate, develop, and retain talent in a dynamic, modern workplace.',
    modules: ['Team Dynamics', 'Performance Management', 'Conflict Resolution', 'Leadership Styles'],
    duration: '8 Weeks',
    level: 'Intermediate',
  },
  {
    icon: '📊',
    tag: 'Finance',
    tagColor: '#0066FF',
    title: 'Financial Accounting',
    frontBg: '#0066FF',
    desc: 'Build a solid foundation in financial accounting principles. Interpret financial statements and make data-driven business decisions confidently.',
    modules: ['Balance Sheet Analysis', 'P&L Statements', 'Cash Flow Management', 'Financial Ratios'],
    duration: '10 Weeks',
    level: 'Beginner',
  },
  {
    icon: '♟️',
    tag: 'Strategy',
    tagColor: '#B01116',
    title: 'Strategic Management',
    frontBg: '#B01116',
    desc: 'Develop the frameworks to craft, execute, and adapt long-term competitive strategies. Navigate uncertainty with precision and vision.',
    modules: ['Porter\'s Five Forces', 'Blue Ocean Strategy', 'Competitive Analysis', 'Strategic Execution'],
    duration: '12 Weeks',
    level: 'Advanced',
  },
  {
    icon: '📱',
    tag: 'Marketing',
    tagColor: '#FFD700',
    title: 'Digital Marketing',
    frontBg: '#FFD700',
    desc: 'Drive business growth in the digital era. From SEO to performance marketing, build end-to-end digital strategies that deliver measurable results.',
    modules: ['SEO & SEM', 'Social Media Strategy', 'Content Marketing', 'Analytics & Attribution'],
    duration: '8 Weeks',
    level: 'Intermediate',
  },
];

const CatalogueSection = () => {
  return (
    <section className="catalogue-section" id="catalogue">
      <div className="catalogue-inner">
        <div className="catalogue-header">
          <span className="section-tag">Course Catalogue</span>
          <h2 className="catalogue-title">
            Knowledge That <span style={{ color: 'var(--primary)' }}>Powers Careers</span>
          </h2>
          <p className="catalogue-subtitle">
            Hover over any course to explore what you'll learn and unlock your next milestone.
          </p>
        </div>

        <div className="courses-grid">
          {COURSES.map((course) => (
            <div className="flip-card" key={course.title}>
              <div className="flip-card-inner">
                {/* FRONT */}
                <div className="flip-card-front">
                  <div
                    className="flip-front-bg"
                    style={{ color: course.frontBg }}
                  >
                    {course.icon}
                  </div>
                  <div>
                    <p className="flip-front-tag" style={{ color: course.tagColor }}>
                      {course.tag}
                    </p>
                    <h3 className="flip-front-title">{course.title}</h3>
                  </div>
                </div>

                {/* BACK */}
                <div className="flip-card-back">
                  <div>
                    <div className="flip-back-icon">{course.icon}</div>
                    <h3 className="flip-back-title">{course.title}</h3>
                    <p className="flip-back-desc">{course.desc}</p>
                  </div>

                  <div>
                    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
                      {course.modules.map(m => (
                        <span key={m} style={{
                          fontSize: '0.7rem',
                          fontWeight: 600,
                          padding: '0.3rem 0.8rem',
                          borderRadius: '100px',
                          background: 'rgba(255,255,255,0.05)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          color: 'var(--text-muted)',
                        }}>
                          {m}
                        </span>
                      ))}
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.5rem' }}>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        ⏱ {course.duration}
                      </span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        📈 {course.level}
                      </span>
                    </div>

                    <a href="https://iimbx.iimb.ac.in/catalog/" className="flip-back-cta">
                      Enroll Now →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CatalogueSection;
