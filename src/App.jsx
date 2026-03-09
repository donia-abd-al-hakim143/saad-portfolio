import { useState, useEffect, useRef } from "react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import "./App.css"; // bring in theme variables

/* MARQUEE */
const MW = ["Commercials","Documentary","Events","Social Media","Drone","Cinematic","4K","Editing"];
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
    { title: "Red Crescent Event", src: "/ramdan2026.mp4" },
    { title: "Red Crescent Event", src: "/work1.mp4" },
    { title: "Red Crescent Event", src: "/work2.mp4" },
    { title: "Red Crescent", src: "/ourreel.mp4" },
    { title: "Al ABD Campaign", src: "AQMY0DeXi4uWcDBmY3pUgFOaf8_pv4fiH-zpQ1bjdO6_cQ9lePbDImE9xK1e_clX-o3PKXiOfv4lYcbvDi4gahWe-X9nGZFE6_Dn60G6YbzAsA.mp4" },
    { title: "Al ABD Campaig", src: "/branding.mp4" },
    { title: "Al ABD Campaig", src: "AQMpUyBdFNUAsj-cuvYwp17U4jl5rT-9QEJp1jBxxfBGHReoFaXMN1Twjxl1JsiorODgAbBmqy86ui5eD5yVhRM1FfOBj4MrZyVAeIyAly75RQ.mp4" },
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

  /* about counter */
  // const [counted, setCounted] = useState(false);
  // const aboutRef = useRef(null);
  // useEffect(() => {
  //   const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setCounted(true); }, { threshold: 0.3 });
  //   if (aboutRef.current) obs.observe(aboutRef.current);
  //   return () => obs.disconnect();
  // }, []); const [counted, setCounted] = useState(false);
  // const aboutRef = useRef(null);
  // useEffect(() => {
  //   const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setCounted(true); }, { threshold: 0.3 });
  //   if (aboutRef.current) obs.observe(aboutRef.current);
  //   return () => obs.disconnect();
  // }, []);

  // const fade = (delay) => ({
  //   opacity: cv ? 1 : 0,
  //   transform: cv ? "translateY(0)" : "translateY(22px)",
  //   transition: `opacity .8s ease ${delay}, transform .8s ease ${delay}`,
  // });

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
        {["tl","tr","bl","br"].map((pos, i) => (
          <div key={pos} className={`c-corner c-corner-${pos}`}
            style={{ opacity: cv?1:0, transition:`opacity .5s ease ${i*.1}s` }} />
        ))}

        {/* ── eyebrow ── */}
        <p className="c-eyebrow" style={{ opacity: cv?1:0, transition:"opacity .7s ease .15s" }}>
          ✦ FILMMAKER · MEDIA PRODUCER · EGYPT ✦
        </p>

        {/* ── logo with 3 pulse rings ── */}
        <div className="logo-wrap" style={{ opacity: cv?1:0, transform: cv?"scale(1)":"scale(.75)", transition:"opacity 1s ease .3s, transform 1s ease .3s" }}>
          <img src="/logo.jpg" className="logo" alt="SP Production" />
          <div className="logo-ring ring1" /><div className="logo-ring ring2" /><div className="logo-ring ring3" />
        </div>


     

        {/* ── tagline ── */}
        <p className="c-tagline" style={{ opacity: cv?1:0, transition:"opacity .8s ease .6s" }}>
          Where every frame tells a story
        </p>

        {/* ── gold line divider ── */}
        <div style={{ display:"flex", alignItems:"center", gap:"1rem", justifyContent:"center" }}>
          <div className="c-divider-line" style={{ width: cv?"60px":"0px", transition:"width .9s ease .7s" }} />
          <span className="c-divider-diamond" style={{ opacity: cv?1:0, transition:"opacity .6s ease .9s" }}>◆</span>
          <div className="c-divider-line" style={{ width: cv?"60px":"0px", transition:"width .9s ease .7s" }} />
        </div>

        {/* ── contact info cards ── */}
        <div className="c-cards">
          {[
            { icon:"✉", label:"EMAIL", val:"sm6709394@gmail.com", d:".75s" },
            { icon:"☎", label:"PHONE", val:"01157792112",          d:".9s"  },
          ].map(({ icon, label, val, d }) => (
            <div key={label} className="c-card"
              style={{ opacity: cv?1:0, transform: cv?"translateY(0)":"translateY(20px)", transition:`opacity .7s ease ${d}, transform .7s ease ${d}` }}>
              <span className="c-card-icon">{icon}</span>
              <span className="c-card-label">{label}</span>
              <span className="c-card-val">{val}</span>
            </div>
          ))}
        </div>

        {/* ── social links ── */}
        <div className="socials">

          <a href="https://facebook.com" className="social-btn">
            <FaFacebookF />
          </a>

          <a href="https://instagram.com" className="social-btn">
            <FaInstagram />
          </a>

        </div>



      </section>
      {/* ══ end contact ══ */}

      {/* hero text */}
      <div className="hero-text">
        <h1>Cinematic Storytelling</h1>
        <p>Media Production & Documentary Films</p>
      </div>

      {/* MARQUEE — now before video */}
      <Marquee />

      {/* HERO VIDEO */}
      <section className="hero">
        <video autoPlay muted loop className="hero-video">
          <source src="ourreel.mp4" type="video/mp4" />
        </video>
      </section>

      {/* CLIENTS */}
      <section className="clients fade">
        <h2>Our Clients</h2>
        <div className="logos">
          <img src="/440582692_833017858873940_4609254405662983498_n.jpg" alt="client" />
          <img src="/el3bd.jpg"  alt="client" />
          <img src="/safwa.png"  alt="client" />
          <img src="/624300695_906759335636249_3573784821519415114_n.jpg" alt="client" />
        </div>
      </section>

      {/* OUR WORK */}
      <section className="portfolio fade">
        <h2>Our Work</h2>
        <div className="grid">
          {mainVideos.map((video, index) => (
            <div className="card" key={index}>
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
            <p className="about-para" style={{ marginTop:"1rem" }}>
              From intimate wedding films to large-scale awareness campaigns, every
              project is approached with the same commitment: <em>tell the truth beautifully.</em>
            </p>
            {/* <div className="about-stats">
              {[["200+","Projects"],["5+","Years"],["15+","Clients"]].map(([n, label]) => (
                <div key={label} className="about-stat">
                  <span className="about-stat-num" style={{ opacity: counted?1:0, transform: counted?"translateY(0)":"translateY(12px)", transition:"opacity .8s ease, transform .8s ease" }}>{n}</span>
                  <span className="about-stat-label">{label}</span>
                </div>
              ))}
            </div> */}
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