import { useEffect, useRef } from 'react';
import './App.css';

function App() {
  const sliderRef = useRef(null);
  const animationRef = useRef(null);
  const lastTimestampRef = useRef(null);

  const techItems = [
    {
      name: 'React',
      icon: (
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="8" fill="#61dafb" />
          <path d="M50 12c12 0 23 6 29 15M50 88c-12 0-23-6-29-15M12 50c0-12 6-23 15-29M88 50c0 12-6 23-15 29" fill="none" stroke="#61dafb" strokeWidth="5" strokeLinecap="round" />
          <path d="M23 23l54 54" fill="none" stroke="#61dafb" strokeWidth="5" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      name: 'Angular',
      icon: (
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <polygon points="20,80 50,15 80,80" fill="#dd0031" stroke="#c3002f" strokeWidth="4" />
          <path d="M28 70h44" fill="none" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      name: 'Python',
      icon: (
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 30c10-13 22-18 35-18s25 5 35 18" fill="#4b8bbe" />
          <path d="M20 70c10 13 22 18 35 18s25-5 35-18" fill="#ffd43b" />
          <path d="M50 30c-20 5-27 18-27 30s7 25 27 30c20-5 27-18 27-30s-7-25-27-30z" fill="none" stroke="#ffffff" strokeWidth="3" />
        </svg>
      ),
    },
    {
      name: 'Flutter',
      icon: (
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <polygon points="20,20 50,80 80,20" fill="#02569b" />
          <path d="M30 28l20 24 20-24" fill="none" stroke="#33a8ff" strokeWidth="6" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      name: 'React Native',
      icon: (
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <polygon points="20,20 50,50 80,20 80,80 50,50 20,80" fill="#61dafb" />
          <path d="M20 20l30 30M80 20L50 50M20 80l30-30M80 80L50 50" fill="none" stroke="#7c3aed" strokeWidth="6" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      name: 'Node.js',
      icon: (
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 30l30-16 30 16v40l-30 16-30-16z" fill="#8cc84b" stroke="#5a7d45" strokeWidth="4" strokeLinejoin="round" />
          <text x="50" y="62" textAnchor="middle" fill="#ffffff" fontSize="34" fontWeight="700">N</text>
        </svg>
      ),
    },
    {
      name: 'PHP',
      icon: (
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <rect x="20" y="30" width="60" height="40" rx="8" fill="#777bb3" />
          <text x="50" y="58" textAnchor="middle" fill="#ffffff" fontSize="20" fontWeight="700">PHP</text>
        </svg>
      ),
    },
    {
      name: 'MySQL',
      icon: (
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 15c22 24 26 34 26 46a26 26 0 0 1-52 0c0-12 4-22 26-46z" fill="#f29111" stroke="#d17809" strokeWidth="3" />
          <circle cx="50" cy="60" r="12" fill="#d17809" />
        </svg>
      ),
    },
    {
      name: 'AWS',
      icon: (
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 55c0-11 9-20 20-20h4c2-8 9-14 18-14 9 0 16 6 18 14h4c11 0 20 9 20 20s-9 20-20 20H45c-11 0-20-9-20-20z" fill="#ff9900" stroke="#d17900" strokeWidth="4" strokeLinejoin="round" />
          <path d="M42 62l8 12 8-12" fill="none" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      name: 'Cloud',
      icon: (
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 58a18 18 0 0 1 18-18h4.5A23 23 0 0 1 73 28a18 18 0 0 1 0 36H27a11 11 0 0 1-5-2z" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="4" strokeLinejoin="round" />
          <path d="M40 62c0 6 4 10 10 10s10-4 10-10" fill="none" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" />
        </svg>
      ),
    },
  ];

  const repeatedTechItems = [...techItems, ...techItems];
  const autoScrollRef = useRef(true);
  const restartTimeoutRef = useRef(null);

  const scrollSlider = (distance) => {
    const slider = sliderRef.current;
    if (!slider) return;

    autoScrollRef.current = false; // Stop auto-scroll
    
    // Cancel any existing timeout
    if (restartTimeoutRef.current) {
        clearTimeout(restartTimeoutRef.current);
    }
    
    slider.scrollLeft += distance;

    const halfWidth = slider.scrollWidth / 2;
    if (slider.scrollLeft >= halfWidth) slider.scrollLeft -= halfWidth;
    if (slider.scrollLeft < 0) slider.scrollLeft += halfWidth;

    // Restart auto-scroll after 0.5 seconds (500ms)
    restartTimeoutRef.current = setTimeout(() => {
        autoScrollRef.current = true;
        // Sync timestamp to avoid jump
        lastTimestampRef.current = performance.now();
    }, 500);
};

  useEffect(() => {
    const slider = sliderRef.current;
    const speed = 0.12;

    const step = (timestamp) => {
      if (!slider || !autoScrollRef.current) return; // Add this check
      if (lastTimestampRef.current === null) {
        lastTimestampRef.current = timestamp;
      }

      const delta = timestamp - lastTimestampRef.current;
      lastTimestampRef.current = timestamp;
      const distance = delta * speed;
      const halfWidth = slider.scrollWidth / 2;

      let nextLeft = slider.scrollLeft + distance;
      if (nextLeft >= halfWidth) {
        nextLeft -= halfWidth;
      }
      slider.scrollLeft = nextLeft;

      animationRef.current = requestAnimationFrame(step);
    };

    animationRef.current = requestAnimationFrame(step);

    return () => {
    if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
    }
    if (restartTimeoutRef.current) {
        clearTimeout(restartTimeoutRef.current);
    }
    lastTimestampRef.current = null;
};
}, []);

  return (
    <div className="App">
      <header className="header">
        <div className="header-brand">
          <img src="/images/ai-powered-solution-logo.png" alt="AI Powered Solution logo" className="header-logo" />
          <h1 className="company-name">AI Powered Solution</h1>
        </div>
        <nav className="nav">
          <a href="#services">Services</a>
          <a href="#contact">Contact</a>
        </nav>
        <div className="contact-phone">Call on +91 9412333244</div>
      </header>

      <div className="floating-actions">
        <a href="tel:+919412333244" className="action-button action-call" aria-label="Call us">
          <span className="action-icon">📞</span>
        </a>
        <a href="https://wa.me/919412333244" target="_blank" rel="noreferrer" className="action-button action-whatsapp" aria-label="WhatsApp us">
          <span className="action-icon">💬</span>
        </a>
      </div>

      <section className="hero">
        <div className="hero-content">
          <div className="hero-logo">
            <img src="/images/ai-powered-solution-logo.png" alt="AI Powered Solution logo" className="hero-logo-img" />
          </div>
          <h2>Welcome to AI Powered Solution</h2>
          <p className="hero-text">
            We don't just build websites -- we grow your business.
          </p>
          <p className="hero-text">
We build AI-driven websites, mobile apps, and custom digital solutions that help businesses in India grow online. Our work is designed to be SEO-friendly, fast, and conversion focused.
          </p>
          <button className="cta-button" onClick={() => window.scrollTo({ top: document.getElementById('services').offsetTop, behavior: 'smooth' })}>
            Explore Our Services
          </button>
        </div>
      </section>

      <section className="why-us">
        <div className="why-us-inner">
          <div className="why-us-copy">
            <span className="why-label">WHY HIRE US!</span>
            <h2>AI Powered Solution delivers stronger experience and better digital results.</h2>
            <p>
              Our team builds secure, responsive, and SEO-friendly websites that work hard for your business. We deliver higher conversions, faster performance, and long-term growth across India.
            </p>
            <div className="why-grid">
              <div className="why-card">
                <div className="why-icon"></div>
                <p>Payment Gateway Integration</p>
              </div>
              <div className="why-card">
                <div className="why-icon"></div>
                <p>Affordable &amp; Lowest Pricing</p>
              </div>
              <div className="why-card">
                <div className="why-icon"></div>
                <p>100% Satisfaction Guaranteed</p>
              </div>
              <div className="why-card">
                <div className="why-icon"></div>
                <p>Professional Team</p>
              </div>
              <div className="why-card">
                <div className="why-icon"></div>
                <p>1 Year Free Support</p>
              </div>
            </div>
          </div>
          <div className="why-us-image">
            <div className="image-placeholder">Your image here</div>
          </div>
        </div>
      </section>

      <section id="services" className="services">
        <div className="services-container">
          <h2>Our Services</h2>
          <p className="services-subtitle">Comprehensive solutions tailored for your business needs</p>
          <div className="services-grid">
            <div className="service-card">
              <div className="icon-placeholder">
                <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                  <rect x="15" y="15" width="70" height="60" fill="none" stroke="currentColor" strokeWidth="2.5" rx="3"/>
                  <line x1="15" y1="28" x2="85" y2="28" stroke="currentColor" strokeWidth="2.5"/>
                  <line x1="20" y1="38" x2="80" y2="38" stroke="currentColor" strokeWidth="1.5" opacity="0.7"/>
                  <line x1="20" y1="48" x2="80" y2="48" stroke="currentColor" strokeWidth="1.5" opacity="0.7"/>
                  <line x1="20" y1="58" x2="65" y2="58" stroke="currentColor" strokeWidth="1.5" opacity="0.7"/>
                </svg>
              </div>
              <h3>Static Websites</h3>
              <p>Fast, reliable, and cost-effective static websites perfect for showcasing your business.</p>
            </div>
            <div className="service-card">
              <div className="icon-placeholder">
                <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="50" cy="35" r="8" fill="currentColor"/>
                  <circle cx="35" cy="55" r="8" fill="currentColor"/>
                  <circle cx="65" cy="55" r="8" fill="currentColor"/>
                  <circle cx="50" cy="70" r="8" fill="currentColor"/>
                  <line x1="50" y1="43" x2="50" y2="62" stroke="currentColor" strokeWidth="1.5"/>
                  <line x1="50" y1="43" x2="37" y2="52" stroke="currentColor" strokeWidth="1.5"/>
                  <line x1="50" y1="43" x2="63" y2="52" stroke="currentColor" strokeWidth="1.5"/>
                  <line x1="50" y1="62" x2="50" y2="62" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
              </div>
              <h3>Dynamic Websites</h3>
              <p>Interactive and engaging dynamic websites with databases and user interactions.</p>
            </div>
            <div className="service-card">
              <div className="icon-placeholder">
                <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                  <g transform="translate(50, 50)">
                    <path d="M-15,-15 L15,-15 L20,-5 L20,20 L-20,20 L-20,-5 Z" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"/>
                    <line x1="-10" y1="-8" x2="10" y2="-8" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="-5" cy="5" r="3" fill="currentColor"/>
                    <circle cx="5" cy="5" r="3" fill="currentColor"/>
                    <path d="M-8,12 L8,12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </g>
                </svg>
              </div>
              <h3>Customized Solutions</h3>
              <p>Tailored web solutions designed specifically for your unique business needs.</p>
            </div>
            <div className="service-card">
              <div className="icon-placeholder">
                <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="50" cy="50" r="38" fill="#e0f7ff"/>
                  <path d="M20 35h60v30a10 10 0 0 1-10 10H30a10 10 0 0 1-10-10V35z" fill="none" stroke="#1d8cff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M32 65h36" fill="none" stroke="#1d8cff" strokeWidth="6" strokeLinecap="round"/>
                  <path d="M40 45h20" fill="none" stroke="#1d8cff" strokeWidth="6" strokeLinecap="round"/>
                </svg>
              </div>
              <h3>AI-Powered Growth</h3>
              <p>Leverage AI to optimize your online presence and drive business growth.</p>
            </div>
            <div className="service-card">
              <div className="icon-placeholder">
                <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="50" cy="50" r="38" fill="#3ddc84"/>
                  <rect x="22" y="30" width="56" height="36" rx="10" fill="#1e4025"/>
                  <rect x="18" y="24" width="12" height="6" rx="3" fill="#fff"/>
                  <rect x="70" y="24" width="12" height="6" rx="3" fill="#fff"/>
                  <circle cx="36" cy="50" r="4" fill="#fff"/>
                  <circle cx="64" cy="50" r="4" fill="#fff"/>
                  <path d="M30 70h40" stroke="#fff" strokeWidth="6" strokeLinecap="round"/>
                </svg>
              </div>
              <h3>Android Apps</h3>
              <p>Custom mobile apps for Android to reach your audience on the go.</p>
            </div>
            <div className="service-card">
              <div className="icon-placeholder">
                <svg viewBox="0 0 814 1000" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="407" cy="500" r="390" fill="#1d8cff" opacity="0.15"/>
                  <path fill="#111" d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105.6-57-155.5-127C46.7 790.7 0 663 0 541.8c0-194.4 126.4-297.5 250.8-297.5 66.1 0 121.2 43.4 162.7 43.4 39.5 0 101.1-46 176.3-46 28.5 0 130.9 2.6 198.3 99.2zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z"/>
                </svg>
              </div>
              <h3>iOS Apps</h3>
              <p>Native iOS apps designed for seamless user experience on Apple devices.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="tech-stack">
        <div className="tech-container">
          <div className="tech-content">
            <h2>Our Technology Stack</h2>
            <p className="tech-description">
              We use industry-leading technologies to build robust, scalable solutions. Our expertise spans across modern web frameworks, backend systems, and cloud infrastructure to deliver high-performance applications for your business.
            </p>
            <div className="tech-features">
              <div className="feature-item">
                <span className="checkmark">✓</span>
                <span>Modern frontend frameworks</span>
              </div>
              <div className="feature-item">
                <span className="checkmark">✓</span>
                <span>Powerful backend solutions</span>
              </div>
              <div className="feature-item">
                <span className="checkmark">✓</span>
                <span>Reliable database systems</span>
              </div>
              <div className="feature-item">
                <span className="checkmark">✓</span>
                <span>Cloud-ready infrastructure</span>
              </div>
            </div>
          </div>

          <div className="tech-slider-wrapper">
            <div className="tech-slider" ref={sliderRef}>
              {repeatedTechItems.map((item, index) => (
                <div key={`${item.name}-${index}`} className="tech-slide">
                  <div className="tech-logo-item">
                    <div className="tech-logo-placeholder">{item.icon}</div>
                    <p>{item.name}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="slider-controls">
              <button type="button" className="slider-button" onClick={() => scrollSlider(-260)}>
                Prev
              </button>
              <button type="button" className="slider-button" onClick={() => scrollSlider(260)}>
                Next
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="contact">
        <div className="contact-container">
          <h2>Get in Touch</h2>
          <p>Ready to transform your business? Contact us today!</p>
          <form className="contact-form">
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <textarea placeholder="Tell us about your project" required></textarea>
            <button type="submit">Send Message</button>
          </form>
        </div>
      </section>

      <footer className="footer">
        
        <p>&copy; 2026 AI Powered Solution. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
