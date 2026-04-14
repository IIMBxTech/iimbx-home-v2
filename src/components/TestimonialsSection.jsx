const TESTIMONIALS = [
  {
    text: 'The Hospital Management Programme completely transformed my understanding of healthcare administration. The IIM Bangalore faculty brought real-world depth that I couldn\'t find anywhere else.',
    name: 'Dr. Priya Nair',
    role: 'Medical Director, Apollo Hospitals',
    avatar: 'PN',
    color: '#B01116',
  },
  {
    text: 'As an airline professional, the Airlines Management Programme gave me frameworks I apply every single week. It\'s executive education that genuinely moves the needle.',
    name: 'Capt. Arjun Mehta',
    role: 'Operations Head, IndiGo',
    avatar: 'AM',
    color: '#00E5FF',
  },
  {
    text: 'The AI for Managers programme was eye-opening. I went from being skeptical about AI to championing our company\'s entire digital transformation initiative.',
    name: 'Sneha Krishnan',
    role: 'VP Technology, TCS',
    avatar: 'SK',
    color: '#0066FF',
  },
  {
    text: 'FinTech Certificate Programme is phenomenal value. The course content is current, the case studies are relevant, and the network I built is invaluable.',
    name: 'Rohan Desai',
    role: 'Senior Analyst, PayU',
    avatar: 'RD',
    color: '#FFD700',
  },
  {
    text: 'What sets IIMBx apart is the quality of instruction. Every module felt like a masterclass delivered by practitioners who\'ve actually lived these challenges.',
    name: 'Meera Sharma',
    role: 'Strategy Consultant, Deloitte',
    avatar: 'MS',
    color: '#B01116',
  },
  {
    text: 'I enrolled in the FinTech programme while working full-time and the flexibility was incredible. The learning platform is intuitive and the support team is always responsive.',
    name: 'Karthik Subramanian',
    role: 'Product Manager, Razorpay',
    avatar: 'KS',
    color: '#00E5FF',
  },
  {
    text: 'The strategic management framework I learned through IIMBx helped us pivot our startup during a critical phase. The ROI on this programme is incalculable.',
    name: 'Ananya Joshi',
    role: 'Co-Founder, EdTech Venture',
    avatar: 'AJ',
    color: '#0066FF',
  },
  {
    text: 'From Swayam to the professional certificate track — the breadth of what IIMBx offers is unmatched. World-class education made genuinely accessible.',
    name: 'Ramesh Pillai',
    role: 'Government Officer, IAS',
    avatar: 'RP',
    color: '#FF9933',
  },
];

const TestimonialCard = ({ t }) => (
  <div className="testimonial-card">
    <div className="testimonial-quote">"</div>
    <p className="testimonial-text">{t.text}</p>
    <div className="testimonial-author">
      <div
        className="author-avatar"
        style={{ background: `linear-gradient(135deg, ${t.color}, ${t.color}88)` }}
      >
        {t.avatar}
      </div>
      <div className="author-info">
        <strong>{t.name}</strong>
        <span>{t.role}</span>
      </div>
    </div>
  </div>
);

const TestimonialsSection = () => {
  const row1 = [...TESTIMONIALS, ...TESTIMONIALS];
  const row2 = [...TESTIMONIALS.slice(4), ...TESTIMONIALS.slice(4), ...TESTIMONIALS];

  return (
    <section className="testimonials-section" id="testimonials">
      <div className="testimonials-header">
        <span className="section-tag">Student Voices</span>
        <h2 className="testimonials-title">
          Real Impact. <span style={{ color: 'var(--accent-cyan)' }}>Real Results.</span>
        </h2>
        <p className="testimonials-subtitle">
          Hear from professionals who transformed their careers with IIMBx.
        </p>
      </div>

      <div className="marquee-wrapper">
        <div className="marquee-fade-left" />
        <div className="marquee-fade-right" />

        <div className="marquee-row row-1">
          {row1.map((t, i) => <TestimonialCard key={i} t={t} />)}
        </div>
        <div className="marquee-row row-2">
          {row2.map((t, i) => <TestimonialCard key={i} t={t} />)}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
