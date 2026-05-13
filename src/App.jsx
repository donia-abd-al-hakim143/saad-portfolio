import { useState, useEffect, useRef } from "react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import "./App.css"; 
/* MARQUEE */
const MW = ["Commercials", "Documentary", "Events", "Social Media", "Drone", "Cinematic", "4K", "Editing"];
function Marquee() {
  const all = [...MW, ...MW];
  return (
    <div className="marquee">
      <div className="marquee-track">
        {all.map((w, i) => (
          <span key={i} className="marquee-item">{w} {i % 2 === 0 ? "•" : "○"}</span>
        ))}
      </div>
    </div>
  );
}
export default function App() {
  /* contact visibility */
  const contactRef = useRef(null);
  const [cv, setCv] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setCv(true); }, { threshold: 0.1 });
    if (contactRef.current) obs.observe(contactRef.current);
    return () => obs.disconnect();
  }, []);
  const mainVideos = [
    { title: "theaddressinvestments", src: "https://res.cloudinary.com/dj7vwskg5/video/upload/v1774533737/snapinst_5ae657d5d4_ayjh80.mp4" },
    { title: "theaddressinvestments", src: "https://res.cloudinary.com/dj7vwskg5/video/upload/v1774530745/0326_1_2_pqhh5l.mp4" },
    { title: "Red Crescent Event", src: "https://res.cloudinary.com/dj7vwskg5/video/upload/v1774532434/ramdan2026_xs2bmp.mp4" },
    { title: "Red Crescent Event", src: "https://res.cloudinary.com/dj7vwskg5/video/upload/v1774532450/work1_orsszo.mp4" },
    { title: "Red Crescent Event", src: "https://res.cloudinary.com/dj7vwskg5/video/upload/v1774531364/ourreel_byzagf.mp4" },
     { title: "Red Crescent Event", src: "https://res.cloudinary.com/dj7vwskg5/video/upload/v1778681139/%D9%81%D9%8A-%D8%A3%D9%85%D8%A7%D9%83%D9%86-%D9%83%D8%AA%D9%8A%D8%B1-%D8%A7%D9%84%D9%83%D8%A7%D9%85%D9%8A%D8%B1%D8%A7-%D9%81%D9%8A%D9%87%D8%A7-%D9%85%D8%B4-%D9%85%D8%AC%D8%B1%D8%AF-%D8%AA%D8%B5%D9%88%D9%8A%D8%B1-%D8%A8%D8%AA%D9%83%D9%88%D9%86-%D9%88%D8%B3%D9%8A%D9%84%D8%A9-%D8%AA%D9%86%D9%82%D9%84-%D8%A5_-%D8%B3%D8%A7%D8%B3-%D9%88%D8%AA_-%D9%83%D9%8A-_-%D9%83%D8%A7%D9%8A%D8%A9-%D9%86%D8%A7%D8%B3-%D9%8A%D9%85%D9%83%D9%86-%D8%B5%D9%88%D8%AA%D9%87%D9%85-%D9%85%D8%B4-%D9%88%D8%A7%D8%B5%D9%84-%D8%AA%D8%B4%D8%B1%D9%81%D8%AA-%D8%A5%D9%86%D9%8A-%D8%A3%D9%83%D9%88%D9%86-%D8%AC%D8%B2%D8%A1-%D9%85%D9%86-%D8%AA%D8%BA%D8%B7%D9%8A%D8%A9-%D9%85%D8%B9%D8%B1%D8%B6-%D8%AA%D8%A7%D8%A8%D8%B9-%D9%84%D9%80-e_ydvflv.mp4" },
     { title: "Red Crescent", src: "https://res.cloudinary.com/dj7vwskg5/video/upload/v1774532444/work2_w3msdb.mp4" },
    { title: "RAWAD AL-ZAHB Campany ", src: "https://res.cloudinary.com/dj7vwskg5/video/upload/v1778681282/one-of-my-projects-with-view-media-marketing-company-_-video-production-for-a-gold-mining-company-saad-mahmoud-givefastlink_ghdtba.mp4" },
    { title: "AMINA GALAL Fashoin", src: "https://res.cloudinary.com/dj7vwskg5/video/upload/v1778683008/aminaagalal-_%EF%B8%8F__%EF%B8%8F__-givefastlink_f19nqq.mp4" },
    { title: "Al ABD Campany", src: "https://res.cloudinary.com/dj7vwskg5/video/upload/v1774532412/v12_bjvp3g.mp4" },
    { title: "Al ABD Campany", src: "https://res.cloudinary.com/dj7vwskg5/video/upload/v1774532393/v6_cv5oby.mp4" },
    { title: "Al ABD Campany", src: "https://res.cloudinary.com/dj7vwskg5/video/upload/v1774532416/v13_mktneo.mp4" },
    { title: "Al ABD Campany", src: "https://res.cloudinary.com/dj7vwskg5/video/upload/v1774532401/v10_gs7vda.mp4" },
    { title: "Al ABD Campany", src: "https://res.cloudinary.com/dj7vwskg5/video/upload/v1774532459/v11_uhumde.mp4" },
    { title: "Al ABD Campany", src: "https://res.cloudinary.com/dj7vwskg5/video/upload/v1774532389/v7_kep3wp.mp4" },

  ];
  
  const behindTheScenes = [
    { title: "Behind the Scenes", src: "AQMsfVzGRZm2Z203o-cZgAGPPFoIyQYR1H2pmeBELhwVerOEKIdM5z8CrY5MGMkJLDzsuJypHa3zagAi0xZOChBtbb049Y8aW8u0CaK2JwSDWw.mp4" },
    { title: "Behind the Scenes", src: "beginning.mp4" },
  ];

  /* scroll reveal */
  useEffect(() => {
    const els = document.querySelectorAll(".fade");
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("show"); });
    });
    els.forEach(el => obs.observe(el));
  }, []);

  return (
    <div >
      {/* ══════════════════════════════════
          CONTACT — cinematic full-screen
          ══════════════════════════════════ */}
      <section className="contact" ref={contactRef}>
        {/* ── decorative background ── */}
        <div className="c-bg">
          <div className="c-grid-lines" />
          <div className="c-glow c-glow-l" />
          <div className="c-glow c-glow-r" />
          <div className="c-scan-line" />
        </div>
        {/* ── corner frame ── */}
        {["tl", "tr", "bl", "br"].map((pos, i) => (
          <div key={pos} className={`c-corner c-corner-${pos}`}
            style={{ opacity: cv ? 1 : 0, transition: `opacity .5s ease ${i * .1}s` }} />
        ))}
        {/* ── eyebrow ── */}
        <p className="c-eyebrow" style={{ opacity: cv ? 1 : 0, transition: "opacity .7s ease .15s" }}>
          ✦  MEDIA PRODUCER · EGYPT ✦
        </p>
        {/* ── logo with 3 pulse rings ── */}
        <div className="logo-wrap" style={{ opacity: cv ? 1 : 0, transform: cv ? "scale(1)" : "scale(.75)", transition: "opacity 1s ease .3s, transform 1s ease .3s" }}>
          <img src="logo.png" className="logo" alt="SP Production" />
          <div className="logo-ring ring1" /><div className="logo-ring ring2" /><div className="logo-ring ring3" />
        </div>
        {/* ── tagline ── */}
        <p className="c-tagline" style={{ opacity: cv ? 1 : 0, transition: "opacity .8s ease .6s" }}>
          Where every frame tells a story
        </p>
        {/* ── gold line divider ── */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", justifyContent: "center" }}>
          <div className="c-divider-line" style={{ width: cv ? "60px" : "0px", transition: "width .9s ease .7s" }} />
          <span className="c-divider-diamond" style={{ opacity: cv ? 1 : 0, transition: "opacity .6s ease .9s" }}>◆</span>
          <div className="c-divider-line" style={{ width: cv ? "60px" : "0px", transition: "width .9s ease .7s" }} />
        </div>
        {/* ── contact info cards ── */}
      <div className="c-cards">

  {/* CONTACT ITEMS */}
  <div className="c-cards">

  {/* CONTACT ITEMS */}
  <div className="contact-row">
    {[
      { icon: "✉", val: "sm6709394@gmail.com" },
      { icon: "☎", val: "01157792112" },
    ].map((item, i) => (
      <div key={i} className="c-pill">
        <span className="c-icon">{item.icon}</span>
        <span>{item.val}</span>
      </div>
    ))}
  </div>

  {/* SOCIAL */}
  <div className="socials">
    <a href="https://facebook.com" className="social-btn">
      <FaFacebookF />
    </a>
    <a href="https://instagram.com" className="social-btn">
      <FaInstagram />
    </a>
  </div>

</div>

</div>
      </section>
      {/* ══ end contact ══ */}
      {/* hero text */}
      <div className="hero-text">
        <h1>Cinematic Storytelling</h1>
        <p><b>Media Production</b></p>
      </div>
      {/* MARQUEE — now before video */}
      <Marquee />
      {/* HERO VIDEO */}
      <section className="hero">
        <video autoPlay muted loop playsInline className="hero-video">
          <source src="https://res.cloudinary.com/dj7vwskg5/video/upload/v1774532376/ourreel_azhvev.mp4" type="video/mp4" />
        </video>
      </section>
      {/* CLIENTS */}
      <section className="clients fade">
        <h2>Our Clients</h2>
        <div className="logos">
          <img src="/theaddressinvestments.jpg" alt="theaddressinvestments" />
          <img src="/440582692_833017858873940_4609254405662983498_n.jpg" alt="RCLOGO" />
          <img src="/el3bd.jpg" alt="client" />
          <img src="/safwa.png" alt="client" />
          <img src="/457050036_122105156324487086_5797865914465276891_n.jpg" alt="client" />
        </div>
      </section>
      {/* OUR WORK */}
      <section className="portfolio fade">
        <h2>Our Work</h2>
        <div className="grid">
          {mainVideos.map((video, index) => (
            <div className="card" key={index} style={{ transitionDelay: `${index * 0.1}s` }}>
              <video src={video.src} controls onMouseOver={e => e.target.play()} onMouseOut={e => e.target.pause()} />
              <h3>{video.title}</h3>
            </div>
          ))}
          
        </div>
      </section>
      {/* BEHIND THE SCENES */}
      <section className="behind-scenes fade">
        <div className="bts-container">
          <h2>Behind the Scenes</h2>
          <p className="bts-subtitle">Glimpses from our creative journey</p>
          <div className="bts-grid">
            {behindTheScenes.map((video, index) => (
              <div className="bts-card" key={index}>
                <div className="bts-card-frame">
                  <video src={video.src} controls onMouseOver={e => e.target.play()} onMouseOut={e => e.target.pause()} />
                  <div className="bts-overlay" />
                </div>
                <h3>{video.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* ABOUT */}
      <section >
        <div className="about-side-label">ABOUT</div>
        <div className="about-container">
          <div className="about-img-wrap">
            <img src="/saad.jpg" className="about-img" alt="Saad Mahmoud" />
            <div className="about-img-border" />
            <div className="about-img-dot dot1" />
            <div className="about-img-dot dot2" />
          </div>
          <div className="about-text-col">
            <p className="about-eyebrow"> MEDIA PRODUCER</p>
            <h2 className="about-heading">Every Frame<br /><span className="about-heading-gold">Tells a Story</span></h2>
            <p className="about-para">
              Saad is a media producer specializing in documentary storytelling,
              humanitarian media and cinematic video production. His work includes
              collaborations with organizations such as the Egyptian Red Crescent —
              capturing moments that matter, with a lens shaped by empathy and craft.
            </p>
            <p className="about-para" style={{ marginTop: "1rem" }}>
              From intimate wedding films to large-scale awareness campaigns, every
              project is approached with the same commitment: <em>tell the truth beautifully.</em>
            </p>
            <div className="about-sig">
              <div className="about-sig-line" />
              <span className="about-sig-text">Saad Mahmoud</span>
            </div>
          </div>
        </div>
      </section>
      <footer className="footer"><p>© 2026 Saad Media Production</p></footer>
    </div>
  );
}