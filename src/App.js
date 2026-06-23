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
          {/* <a href="#contact">Contact</a> */}
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
                <div className="why-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <rect x="2" y="6" width="20" height="12" rx="2" ry="2" fill="none" stroke="currentColor" strokeWidth="2" />
                    <path d="M2 10h20" fill="none" stroke="currentColor" strokeWidth="2" />
                    <path d="M6 16v-2" fill="none" stroke="currentColor" strokeWidth="2" />
                    <path d="M10 16v-2" fill="none" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </div>
                <p>Payment Gateway Integration</p>
              </div>
              <div className="why-card">
                <div className="why-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 7h16v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7z" fill="none" stroke="currentColor" strokeWidth="2" />
                    <path d="M4 11h16" fill="none" stroke="currentColor" strokeWidth="2" />
                    <path d="M7 4h3" fill="none" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </div>
                <p>Affordable &amp; Lowest Pricing</p>
              </div>
              <div className="why-card">
                <div className="why-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22s10-4.5 10-10V7l-2-4H4L2 7v5c0 5.5 10 10 10 10z" fill="none" stroke="currentColor" strokeWidth="2" />
                    <path d="M9 12l2 2 4-4" fill="none" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </div>
                <p>100% Satisfaction Guaranteed</p>
              </div>
              <div className="why-card">
                <div className="why-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4z" fill="none" stroke="currentColor" strokeWidth="2" />
                    <path d="M4 20a8 8 0 0 1 16 0" fill="none" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </div>
                <p>Professional Team</p>
              </div>
              <div className="why-card">
                <div className="why-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 1.5a10.5 10.5 0 0 1 10.5 10.5A10.5 10.5 0 0 1 12 22.5 10.5 10.5 0 0 1 1.5 12 10.5 10.5 0 0 1 12 1.5z" fill="none" stroke="currentColor" strokeWidth="2" />
                    <path d="M12 7v5l3 3" fill="none" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </div>
                <p>1 Year Free Support</p>
              </div>
            </div>
          </div>
          <div className="why-us-image">
            <video className="why-us-video" src="/images/logo_ai.mp4" autoPlay muted loop playsInline>
              Your browser does not support the video tag.
            </video>
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
                <img src="/images/website-static.gif" alt="Animated static website icon" />
              </div>
              <h3>Static Websites</h3>
              <p>Fast, reliable, and cost-effective static websites perfect for showcasing your business.</p>
            </div>
            <div className="service-card">
              <div className="icon-placeholder">
                <img src="/images/website-dynamic.gif" alt="Animated dynamic website icon" />
              </div>
              <h3>Dynamic Websites</h3>
              <p>Interactive and engaging dynamic websites with databases and user interactions.</p>
            </div>
            <div className="service-card">
              <div className="icon-placeholder">
                <img src="/images/website-custom.gif" alt="Animated custom solution icon" />
              </div>
              <h3>Customized Solutions</h3>
              <p>Tailored web solutions designed specifically for your unique business needs.</p>
            </div>
            <div className="service-card">
              <div className="icon-placeholder">
                <img src="/images/website-support.gif" alt="Animated AI growth icon" />
              </div>
              <h3>AI-Powered Growth</h3>
              <p>Leverage AI to optimize your online presence and drive business growth.</p>
            </div>
            <div className="service-card">
              <div className="icon-placeholder">
                <img src="/images/website-android.gif" alt="Animated Android app icon" />
              </div>
              <h3>Android Apps</h3>
              <p>Custom mobile apps for Android to reach your audience on the go.</p>
            </div>
            <div className="service-card">
              <div className="icon-placeholder">
                <img src="/images/website-ios.gif" alt="Animated iOS app icon" />
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

      {/* <section id="contact" className="contact">
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
      </section> */}

      <footer className="footer">
        
        <p>&copy; 2026 AI Powered Solution. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
