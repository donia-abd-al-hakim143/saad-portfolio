import { useState, useEffect, useRef } from "react";

const GOLD  = "#c9a84c";
const GOLD2 = "#e8c97a";
const BLACK = "#050505";
const DARK  = "#0d0d0d";
const DARK2 = "#111111";
const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Inter:wght@300;400;500&family=Cormorant+Garamond:ital,wght@0,300;0,600;1,300;1,600&display=swap');
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box;}
html{scroll-behavior:smooth;}
body{background:${BLACK};color:#e8e0d0;font-family:'Inter',sans-serif;overflow-x:hidden;cursor:none;}
::-webkit-scrollbar{width:3px;}
::-webkit-scrollbar-thumb{background:${GOLD};}
@keyframes fadeUp  {from{opacity:0;transform:translateY(36px);}to{opacity:1;transform:translateY(0);}}
@keyframes shimmer {0%{background-position:-200% center;}100%{background-position:200% center;}}
@keyframes grain   {0%,100%{transform:translate(0,0);}20%{transform:translate(2%,-3%);}40%{transform:translate(-2%,2%);}60%{transform:translate(3%,1%);}80%{transform:translate(-1%,-2%)}}
@keyframes spin    {from{transform:rotate(0deg);}to{transform:rotate(360deg);}}
@keyframes spinRev {from{transform:rotate(0deg);}to{transform:rotate(-360deg);}}
@keyframes marquee {from{transform:translateX(0);}to{transform:translateX(-50%);}}
@keyframes pulse   {0%,100%{transform:translate(-50%,-50%) scale(1);opacity:.4;}50%{transform:translate(-50%,-50%) scale(1.25);opacity:.08;}}
@keyframes float   {0%,100%{transform:translateY(0);}50%{transform:translateY(-12px);}}
@keyframes barIn   {from{width:0;}to{width:var(--w);}}
@keyframes scaleIn {from{transform:scale(.92);opacity:0;}to{transform:scale(1);opacity:1;}}
@media(max-width:900px){
  .hide-mobile{display:none!important;}
  .g2{grid-template-columns:1fr!important;}
  .g3{grid-template-columns:1fr!important;}
  .pgrid{grid-template-columns:1fr 1fr!important;}
  .pcol7{grid-column:span 2!important;}
  .pcol5{grid-column:span 2!important;}
  .pcol4{grid-column:span 1!important;}
  .pcol3{grid-column:span 1!important;}
  .hero-h1{font-size:clamp(2.8rem,11vw,5rem)!important;}
  .sp{padding:5rem 6vw!important;}
  .cgrid{grid-template-columns:1fr!important;gap:3rem!important;}
  .vgrid{grid-template-columns:1fr!important;}
  .vtabs{flex-wrap:wrap!important;}
}
@media(max-width:480px){
  .hero-h1{font-size:clamp(2.2rem,9vw,3.5rem)!important;}
  .pgrid{grid-template-columns:1fr!important;}
  .pcol7,.pcol5,.pcol4,.pcol3{grid-column:span 1!important;}
}
`;

/* ── utils ── */
function useInView(t=.12){
  const r=useRef(null),[v,sv]=useState(false);
  useEffect(()=>{
    const o=new IntersectionObserver(([e])=>{
      if(e.isIntersecting) sv(true);
    },{threshold:t});
    if(r.current) o.observe(r.current);
    return()=>o.disconnect();
  },[t]);
  return[r,v];
}

function Reveal({children,delay=0,style={},className=""}){
  const[r,v]=useInView();
  return<div ref={r} className={className} style={{opacity:v?1:0,transform:v?"translateY(0)":"translateY(36px)",transition:`opacity .9s ease ${delay}s,transform .9s ease ${delay}s`,...style}}>{children}</div>;
}

function Label({children,center}){
  return<div style={{display:"flex",alignItems:"center",gap:"1rem",marginBottom:"1rem",justifyContent:center?"center":"flex-start"}}>
    <div style={{width:36,height:1,background:GOLD}}/>
    <span style={{fontFamily:"'Cinzel',serif",fontSize:".6rem",letterSpacing:".5em",color:GOLD}}>{children}</span>
    {center&&<div style={{width:36,height:1,background:GOLD}}/>}
  </div>;
}

function Btn({children,onClick,full,ghost}){
  const[h,sh]=useState(false);

  // determine appearance based on hover state and ghost prop
  const baseStyle = {
    border:`1px solid ${GOLD}`,
    fontFamily:"'Cinzel',serif",
    fontSize:".68rem",
    letterSpacing:".3em",
    padding:"1rem 2.5rem",
    transition:"all .4s cubic-bezier(.4,0,.2,1)",
    width:full?"100%":"auto",
    cursor:"pointer",
    transform:h?"translateY(-2px) scale(1.02)":"translateY(0) scale(1)",
    boxShadow:h?`0 8px 25px rgba(201,168,76,.3)`:"none",
    position:"relative",
    overflow:"hidden",
  };
  const bg = ghost ? "transparent" : (h ? GOLD : "transparent");
  const color = ghost ? (h ? BLACK : GOLD) : (h ? BLACK : GOLD);

  return<button
    onClick={onClick}
    onMouseEnter={()=>sh(true)}
    onMouseLeave={()=>sh(false)}
    style={{...baseStyle,background:bg,color:color}}
    onMouseMove={e=>{if(h){const rect=e.target.getBoundingClientRect();const x=e.clientX-rect.left;e.target.style.setProperty('--x',x+'px');}}}
  >
    <span style={{position:"relative",zIndex:2}}>{children}</span>
    <div style={{position:"absolute",inset:0,background:`radial-gradient(circle at var(--x,50%) 50%,rgba(201,168,76,.1),transparent 70%)`,opacity:h?1:0,transition:"opacity .3s"}}/>
  </button>;
}

/* ── cursor ── */
function Cursor(){
  const d=useRef(null),rg=useRef(null),p=useRef({mx:0,my:0,rx:0,ry:0});
  const[isMobile,setIsMobile]=useState(false);
  
  useEffect(()=>{
    // Detect if device is mobile or touch-enabled
    const checkMobile=()=>{
      const isTouchDevice=()=>
        ("touch" in window)||
        (navigator.maxTouchPoints>0)||
        (navigator.msMaxTouchPoints>0);
      setIsMobile(window.innerWidth<=900||isTouchDevice());
    };
    
    checkMobile();
    window.addEventListener("resize",checkMobile);
    return()=>window.removeEventListener("resize",checkMobile);
  },[]);
  
  useEffect(()=>{
    if(isMobile) return;
    
    const mv=e=>{
      p.current.mx=e.clientX;
      p.current.my=e.clientY;
      if(d.current){
        d.current.style.left=e.clientX+"px";
        d.current.style.top=e.clientY+"px";
      }
    };
    
    const enter=()=>{
      if(d.current) d.current.style.opacity="1";
      if(rg.current) rg.current.style.opacity=".5";
    };
    
    const leave=()=>{
      if(d.current) d.current.style.opacity="0";
      if(rg.current) rg.current.style.opacity="0";
    };
    
    window.addEventListener("mousemove",mv);
    window.addEventListener("mouseenter",enter);
    window.addEventListener("mouseleave",leave);
    
    let raf;
    const loop=()=>{
      p.current.rx+=(p.current.mx-p.current.rx)*.11;
      p.current.ry+=(p.current.my-p.current.ry)*.11;
      if(rg.current){
        rg.current.style.left=p.current.rx+"px";
        rg.current.style.top=p.current.ry+"px";
      }
      raf=requestAnimationFrame(loop);
    };
    loop();
    
    return()=>{
      window.removeEventListener("mousemove",mv);
      window.removeEventListener("mouseenter",enter);
      window.removeEventListener("mouseleave",leave);
      cancelAnimationFrame(raf);
    };
  },[isMobile]);
  
  if(isMobile) return null;
  
  const b={position:"fixed",borderRadius:"50%",pointerEvents:"none",transform:"translate(-50%,-50%)",zIndex:9999,opacity:0,transition:"opacity .2s"};
  return<>
    <div ref={d} style={{...b,width:8,height:8,background:GOLD,mixBlendMode:"difference"}}/>
    <div ref={rg} style={{...b,width:36,height:36,border:`1px solid ${GOLD}`,transition:"width .3s,height .3s,opacity .2s",zIndex:9998}}/>
  </>;
}

/* ── grain ── */
const Grain=()=><div style={{position:"fixed",inset:"-50%",width:"200%",height:"200%",pointerEvents:"none",zIndex:9990,opacity:.28,backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.05'/%3E%3C/svg%3E")`,animation:"grain .45s steps(1) infinite"}}/>;

/* ══════════ NAV ══════════ */
function Nav({open,setOpen}){
  const[sc,ssc]=useState(false);
  useEffect(()=>{
    const h=()=>ssc(window.scrollY>60);
    window.addEventListener("scroll",h);
    return()=>window.removeEventListener("scroll",h);
  },[]);
  const links=[["#about","About"],["#services","Services"],["#work","Work"],["#reel","Showreel"],["#contact","Contact"]];
  return<>
    <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:200,padding:"1.3rem 6vw",display:"flex",justifyContent:"space-between",alignItems:"center",background:sc||open?"rgba(5,5,5,.96)":"transparent",backdropFilter:sc||open?"blur(18px)":"none",borderBottom:sc||open?`1px solid rgba(201,168,76,.1)`:"none",transition:"all .4s"}}>
      <span style={{fontFamily:"'Cinzel',serif",fontSize:".85rem",letterSpacing:".35em",color:GOLD}}>SP — PRODUCTION</span>
      <div className="hide-mobile" style={{display:"flex",gap:"2.5rem"}}>
        {links.map(([h,l])=><a key={h} href={h} style={{fontFamily:"'Inter',sans-serif",fontSize:".82rem",fontWeight:300,color:"#888",letterSpacing:".08em",transition:"all .4s cubic-bezier(.4,0,.2,1)",textDecoration:"none",position:"relative",overflow:"hidden",padding:"0.5rem 0"}} onMouseEnter={e=>{e.target.style.color=GOLD;e.target.style.transform="translateY(-2px)";e.target.style.textShadow=`0 0 20px rgba(201,168,76,.5)`;}} onMouseLeave={e=>{e.target.style.color="#888";e.target.style.transform="translateY(0)";e.target.style.textShadow="none";}}>
          <span style={{position:"relative",zIndex:2}}>{l}</span>
          <div style={{position:"absolute",bottom:0,left:0,width:"0%",height:1,background:GOLD,transition:"width .4s ease"}} onMouseEnter={e=>e.style.width="100%"} onMouseLeave={e=>e.style.width="0%"}/>
        </a>)}
      </div>
      <div style={{display:"flex",gap:"1rem",alignItems:"center"}}>
        <a href="#contact" className="hide-mobile" style={{fontFamily:"'Cinzel',serif",fontSize:".62rem",letterSpacing:".28em",color:GOLD,border:`1px solid ${GOLD}`,padding:".55rem 1.6rem",transition:"all .35s",textDecoration:"none"}} onMouseEnter={e=>{e.target.style.background=GOLD;e.target.style.color=BLACK;}} onMouseLeave={e=>{e.target.style.background="transparent";e.target.style.color=GOLD;}}>Book a Call</a>
        <button onClick={()=>setOpen(o=>!o)} style={{background:"transparent",border:"none",padding:".5rem",display:"flex",flexDirection:"column",gap:"5px",cursor:"pointer"}}>
          {[0,1,2].map(i=><div key={i} style={{width:i===1&&open?16:24,height:1.5,background:GOLD,transition:"all .3s",transformOrigin:"left center",transform:open?(i===0?"rotate(45deg) translate(2px,-1px)":i===2?"rotate(-45deg) translate(2px,1px)":"scaleX(0)"):"none"}}/>)}
        </button>
      </div>
    </nav>
    <div style={{position:"fixed",inset:0,zIndex:190,background:"rgba(5,5,5,.98)",backdropFilter:"blur(20px)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"2.5rem",opacity:open?1:0,pointerEvents:open?"all":"none",transition:"opacity .4s"}}>
      {links.map(([h,l])=><a key={h} href={h} onClick={()=>setOpen(false)} style={{fontFamily:"'Cinzel',serif",fontSize:"1.5rem",letterSpacing:".25em",color:"#e8e0d0",transition:"color .3s",textDecoration:"none"}} onMouseEnter={e=>e.target.style.color=GOLD} onMouseLeave={e=>e.target.style.color="#e8e0d0"}>{l}</a>)}
      <a href="#contact" onClick={()=>setOpen(false)} style={{fontFamily:"'Cinzel',serif",fontSize:".78rem",letterSpacing:".3em",color:GOLD,border:`1px solid ${GOLD}`,padding:".8rem 2.5rem",marginTop:"1rem",textDecoration:"none"}}>Book a Call</a>
    </div>
  </>;
}

/* ══════════ HERO ══════════ */
const HERO_SLIDES=[
  {num:"01",title:"Wedding Films",sub:"Cinematic stories of your most beautiful day"},
  {num:"02",title:"Commercials",sub:"Visual messages that make your brand unforgettable"},
  {num:"03",title:"Social Media",sub:"Content that builds real audiences, not just views"},
  {num:"04",title:"Documentary",sub:"Humanitarian stories told with depth and honesty"},
];

function Hero(){
  const[idx,si]=useState(0);
  const[anim,sa]=useState(true);
  const[rdy,sr]=useState(false);
  
  useEffect(()=>{
    setTimeout(()=>sr(true),100);
  },[]);
  
  useEffect(()=>{
    const t=setInterval(()=>{
      sa(false);
      setTimeout(()=>{
        si(p=>(p+1)%HERO_SLIDES.length);
        sa(true);
      },350);
    },4000);
    return()=>clearInterval(t);
  },[]);
  
  const s=HERO_SLIDES[idx];
  
  return<section id="hero" style={{minHeight:"100vh",position:"relative",overflow:"hidden",display:"flex",flexDirection:"column",justifyContent:"center",padding:"0 8vw"}}>
    <div style={{position:"absolute",inset:0,background:`linear-gradient(135deg,#0d0800 0%,${BLACK} 45%,#000d05 100%)`,zIndex:0}}>
      <div style={{position:"absolute",inset:0,opacity:.04,backgroundImage:`linear-gradient(${GOLD} 1px,transparent 1px),linear-gradient(90deg,${GOLD} 1px,transparent 1px)`,backgroundSize:"80px 80px"}}/>
      <div style={{position:"absolute",inset:0,background:`radial-gradient(ellipse at 65% 50%,rgba(201,168,76,.09) 0%,transparent 60%)`}}/>
    </div>
    <div style={{position:"absolute",top:0,bottom:0,left:"58%",width:1,background:`linear-gradient(to bottom,transparent,rgba(201,168,76,.2),transparent)`,zIndex:1}} className="hide-mobile"/>

    <div className="hide-mobile" style={{position:"absolute",right:"3vw",top:"50%",transform:"translateY(-50%)",display:"flex",flexDirection:"column",gap:".7rem",zIndex:3}}>
      {HERO_SLIDES.map((_,i)=><div key={i} onClick={()=>{sa(false);setTimeout(()=>{si(i);sa(true);},200);}} style={{width:i===idx?22:5,height:5,borderRadius:3,background:i===idx?GOLD:"rgba(201,168,76,.2)",transition:"all .4s",cursor:"pointer"}}/>)}
    </div>

    <div className="hide-mobile" style={{position:"absolute",top:"50%",right:"10vw",transform:"translateY(-50%)",zIndex:2,opacity:rdy?1:0,transition:"opacity 1s ease 1s"}}>
      <div style={{position:"relative",width:210,height:210}}>
        <div style={{position:"absolute",inset:-16,borderRadius:"50%",border:`1px solid rgba(201,168,76,.2)`,animation:"spin 22s linear infinite"}}/>
        <div style={{position:"absolute",inset:-34,borderRadius:"50%",border:`1px solid rgba(201,168,76,.07)`,animation:"spinRev 38s linear infinite"}}/>
        
        {/* تم التعديل هنا - الصورة بدل SP */}
        <img
          src="/logo.jpg"
          alt="Saad Mahmoud"
          style={{
            width:"100%",
            height:"100%",
            objectFit:"cover",
            borderRadius:"50%",
            border:`2px solid ${GOLD}`,
            boxShadow:`0 0 30px rgba(201,168,76,.4)`,
            transition:"all 0.3s ease"
          }}
          onMouseEnter={e=>e.target.style.transform="scale(1.05)"}
          onMouseLeave={e=>e.target.style.transform="scale(1)"}
        />
      </div>
    </div>

    <div style={{position:"relative",zIndex:3,maxWidth:680}}>
      <p style={{fontFamily:"'Cinzel',serif",fontSize:".62rem",letterSpacing:".55em",color:GOLD,marginBottom:"2rem",opacity:rdy?1:0,animation:rdy?"fadeUp .8s ease .3s both":"none"}}>
        FILMMAKER · MEDIA PRODUCER · EGYPT
      </p>
      <div style={{opacity:anim?1:0,transform:anim?"translateY(0)":"translateY(20px)",transition:"all .4s ease"}}>
        <p style={{fontFamily:"'Cinzel',serif",fontSize:".6rem",letterSpacing:".5em",color:"#444",marginBottom:".8rem"}}>{s.num} / 0{HERO_SLIDES.length}</p>
        <h1 className="hero-h1" style={{fontFamily:"'Cinzel',serif",fontWeight:900,fontSize:"clamp(3.2rem,8vw,8rem)",lineHeight:.88,color:"#e8e0d0",marginBottom:".3em"}}>
          Saad<br/><span style={{background:`linear-gradient(90deg,${GOLD},${GOLD2},${GOLD})`,backgroundSize:"200%",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",animation:"shimmer 3s linear infinite"}}>Mahmoud</span>
        </h1>
        <p style={{fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",fontSize:"clamp(1rem,2.2vw,1.6rem)",color:"#555",marginBottom:"3rem"}}>{s.sub}</p>
      </div>
      <div style={{display:"flex",gap:"1.2rem",flexWrap:"wrap",opacity:rdy?1:0,animation:rdy?"fadeUp .8s ease .9s both":"none"}}>
        <Btn onClick={()=>document.getElementById("work")?.scrollIntoView({behavior:"smooth"})}>View Work</Btn>
        <a href="#contact" style={{fontFamily:"'Cinzel',serif",fontSize:".68rem",letterSpacing:".28em",color:"#777",padding:"1rem 2.5rem",border:"1px solid rgba(255,255,255,.1)",transition:"all .35s",textDecoration:"none",display:"inline-block"}} onMouseEnter={e=>{e.target.style.borderColor="rgba(201,168,76,.4)";e.target.style.color=GOLD;}} onMouseLeave={e=>{e.target.style.borderColor="rgba(255,255,255,.1)";e.target.style.color="#777";}}>Book a Session</a>
      </div>
      <div style={{display:"flex",gap:"3rem",marginTop:"4rem",flexWrap:"wrap",opacity:rdy?1:0,animation:rdy?"fadeUp .8s ease 1.1s both":"none"}}>
        {[["100+","Projects"],["3+","Years"],["100%","Satisfaction"]].map(([n,l])=><div key={l}><span style={{display:"block",fontFamily:"'Cinzel',serif",fontSize:"2rem",fontWeight:700,background:`linear-gradient(90deg,${GOLD},${GOLD2})`,backgroundSize:"200%",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",animation:"shimmer 3s linear infinite"}}>{n}</span><span style={{fontFamily:"'Inter',sans-serif",fontSize:".75rem",color:"#555",fontWeight:300}}>{l}</span></div>)}
      </div>
    </div>
    <div style={{position:"absolute",bottom:"2.5rem",left:"50%",transform:"translateX(-50%)",display:"flex",flexDirection:"column",alignItems:"center",gap:".5rem",zIndex:3}}>
      <span style={{fontFamily:"'Cinzel',serif",fontSize:".52rem",letterSpacing:".4em",color:"#444"}}>SCROLL</span>
      <div style={{width:1,height:50,background:`linear-gradient(to bottom,${GOLD},transparent)`}}/>
    </div>
  </section>;
}
/* ══════════ MARQUEE ══════════ */
const MW=["Weddings","Commercials","Social Media","Documentary","Events","Editing","Cinematic","4K","Drone","Color Grade"];
function Marquee(){
  const all=[...MW,...MW,...MW,...MW];
  return<div style={{background:DARK,padding:"1.2rem 0",borderTop:`1px solid rgba(201,168,76,.1)`,borderBottom:`1px solid rgba(201,168,76,.1)`,overflow:"hidden"}}>
    <div style={{display:"flex",gap:"2.5rem",width:"max-content",animation:"marquee 22s linear infinite"}}>
      {all.map((w,i)=><span key={i} style={{fontFamily:"'Cinzel',serif",fontSize:".68rem",letterSpacing:".3em",color:i%3===0?GOLD:i%3===1?"#e8e0d0":"#2a2a2a",whiteSpace:"nowrap"}}>{w} {i%2===0?"·":"○"}</span>)}
    </div>
  </div>;
}

function About(){
  return<section id="about" className="sp" style={{background:DARK,padding:"8rem 8vw"}}>
    <div className="g2" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"6rem",alignItems:"center"}}>
      <Reveal>
        <div style={{position:"relative",aspectRatio:"3/4",background:DARK2,overflow:"hidden",maxWidth:460,cursor:"pointer"}} onMouseEnter={e=>{e.target.style.transform="scale(1.02)";e.target.style.boxShadow=`0 20px 40px rgba(201,168,76,.1)`;}} onMouseLeave={e=>{e.target.style.transform="scale(1)";e.target.style.boxShadow="none";}} transition="all .4s ease">
          <img src="/saad.jpg" alt="Saad Mahmoud" style={{width:"100%",height:"100%",objectFit:"cover",transition:"transform .4s ease"}} onMouseEnter={e=>e.target.style.transform="scale(1.05)"} onMouseLeave={e=>e.target.style.transform="scale(1)"}/>
          <div style={{position:"absolute",inset:0,background:"linear-gradient(135deg,rgba(5,5,5,.1) 0%,rgba(201,168,76,.05) 100%)",opacity:0,transition:"opacity .4s ease"}} onMouseEnter={e=>e.target.style.opacity=1} onMouseLeave={e=>e.target.style.opacity=0}/>
          <div style={{position:"absolute",top:0,left:0,width:50,height:50,borderTop:`2px solid ${GOLD}`,borderLeft:`2px solid ${GOLD}`,transition:"all .3s ease"}}/>
          <div style={{position:"absolute",bottom:0,right:0,width:50,height:50,borderBottom:`2px solid ${GOLD}`,borderRight:`2px solid ${GOLD}`,transition:"all .3s ease"}}/>
          <div style={{position:"absolute",bottom:20,left:20,right:20,background:"rgba(5,5,5,.8)",backdropFilter:"blur(10px)",padding:"1rem",borderRadius:"8px",transform:"translateY(100%)",transition:"transform .4s ease",border:`1px solid rgba(201,168,76,.2)`}} onMouseEnter={e=>{e.target.style.transform="translateY(0)";e.target.previousElementSibling.style.opacity=1;}} onMouseLeave={e=>{e.target.style.transform="translateY(100%)";e.target.previousElementSibling.style.opacity=0;}}>
            <p style={{fontFamily:"'Cinzel',serif",fontSize:".7rem",letterSpacing:".3em",color:GOLD,marginBottom:".3rem"}}>FILMMAKER</p>
            <p style={{fontFamily:"'Inter',sans-serif",fontSize:".8rem",color:"#e8e0d0",fontWeight:300}}>Specializing in cinematic storytelling</p>
          </div>
        </div>
      </Reveal>
      <Reveal delay={.15}>
        <Label>ABOUT ME</Label>
        <h2 style={{fontFamily:"'Cinzel',serif",fontSize:"clamp(1.8rem,3.5vw,3rem)",color:"#e8e0d0",marginBottom:"2rem",lineHeight:1.15}}>Every Frame<br/>Tells a Story</h2>
        <p style={{fontFamily:"'Inter',sans-serif",fontSize:".92rem",fontWeight:300,color:"#666",lineHeight:2.2,marginBottom:"2.5rem"}}>
          Saad Mahmoud is a filmmaker and media producer specializing in cinematic visual content. With extensive experience in weddings, commercials, social media videos, and Red Crescent humanitarian work, every project is crafted as a cinematic piece that speaks with depth and authenticity.
        </p>
        {[["Cinematography",97],["Video Editing",99],["Directing",95],["Color Grading",98]].map(([s,v])=><SkillBar key={s} skill={s} value={v}/>)}
      </Reveal>
    </div>
  </section>;
}
/* ══════════ ABOUT ══════════ */

function SkillBar({skill,value}){
  const[r,v]=useInView();
  return<div ref={r} style={{marginBottom:"1.2rem"}}>
    <div style={{display:"flex",justifyContent:"space-between",marginBottom:".4rem"}}>
      <span style={{fontFamily:"'Inter',sans-serif",fontSize:".8rem",color:"#888",fontWeight:300}}>{skill}</span>
      <span style={{fontFamily:"'Cinzel',serif",fontSize:".62rem",color:GOLD}}>{value}%</span>
    </div>
    <div style={{height:1,background:"rgba(255,255,255,.07)",position:"relative"}}>
      <div style={{position:"absolute",top:0,left:0,height:"100%",background:GOLD,width:v?`${value}%`:"0%",transition:"width 1.4s cubic-bezier(.4,0,.2,1)"}}/>
    </div>
  </div>;
}

/* ══════════ SERVICES ══════════ */
const SVCS=[
  {icon:"💍",tag:"WEDDINGS",    title:"Wedding Films",    desc:"Your most beautiful day deserves the most beautiful story. We shoot weddings cinematically so you relive every moment."},
  {icon:"📢",tag:"COMMERCIALS", title:"Commercial Ads",   desc:"Not just a beautiful ad — an ad that sells. We understand your brand and turn it into a visual message that stands out."},
  {icon:"📱",tag:"SOCIAL MEDIA",title:"Social Videos",    desc:"Digital content designed to attract and build a real audience — not just empty views."},
  {icon:"🌙",tag:"DOCUMENTARY", title:"Documentary",      desc:"Red Crescent activities and all humanitarian events — told through a visual story that touches hearts."},
  {icon:"🎥",tag:"EVENTS",      title:"Event Coverage",   desc:"Full coverage of conferences and ceremonies with multiple cameras and a final result that captures every moment."},
  {icon:"✂️",tag:"EDITING",     title:"Professional Edit", desc:"Video editing at the highest quality standards with music and visual effects aligned with your vision."},
];

function Services(){
  const[act,sa]=useState(0);
  const s=SVCS[act];
  return<section id="services" className="sp" style={{background:BLACK,padding:"8rem 8vw"}}>
    <Reveal><Label>SERVICES</Label><h2 style={{fontFamily:"'Cinzel',serif",fontSize:"clamp(2rem,4vw,3.5rem)",color:"#e8e0d0",marginBottom:"5rem"}}>What We Do</h2></Reveal>
    <div className="g2" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"5rem",alignItems:"start"}}>
      <div>
        {SVCS.map((sv,i)=><div key={i} onClick={()=>sa(i)} style={{padding:"1.7rem 0",borderBottom:`1px solid rgba(255,255,255,.06)`,cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",borderLeft:i===act?`2px solid ${GOLD}`:"2px solid transparent",paddingLeft:i===act?"1.2rem":"0",transition:"all .35s"}}>
          <div>
            <p style={{fontFamily:"'Cinzel',serif",fontSize:".56rem",letterSpacing:".4em",color:i===act?GOLD:"#444",marginBottom:".3rem",transition:"color .3s"}}>{sv.tag}</p>
            <h3 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:i===act?"1.9rem":"1.4rem",color:i===act?"#e8e0d0":"#444",transition:"all .4s",fontWeight:600}}>{sv.title}</h3>
          </div>
          <span style={{fontSize:"1.5rem",opacity:i===act?1:.18,transition:"opacity .3s"}}>{sv.icon}</span>
        </div>)}
      </div>
      <div key={act} style={{animation:"fadeUp .5s ease both",position:"sticky",top:"8rem"}}>
        <div style={{width:68,height:68,border:`1px solid ${GOLD}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"2rem",marginBottom:"2rem"}}>{s.icon}</div>
        <h2 style={{fontFamily:"'Cinzel',serif",fontSize:"clamp(1.5rem,3vw,2.5rem)",color:"#e8e0d0",marginBottom:"1.5rem"}}>{s.title}</h2>
        <p style={{fontFamily:"'Inter',sans-serif",fontSize:".9rem",fontWeight:300,color:"#666",lineHeight:2.2,marginBottom:"2.5rem"}}>{s.desc}</p>
        <a href="#contact" style={{fontFamily:"'Cinzel',serif",fontSize:".65rem",letterSpacing:".3em",color:GOLD,borderBottom:`1px solid ${GOLD}`,paddingBottom:".3rem",textDecoration:"none"}}>Start a Project →</a>
      </div>
    </div>
  </section>;
}

/* ══════════ VIDEO GALLERY ══════════ */
const VIDEOS=[
  {id:1, type:"file", src:"/wedding.mp4", title:"Wedding Film ",         cat:"Weddings",    dur:"3:24", year:"2024", desc:"Cinematic wedding film for a luxury ceremony."},
  {id:2, type:"file", src:"/branding.mp4", title:"Commercial — Brand Launch",    cat:"branding", dur:"1:05", year:"2024", desc:"Brand reveal video for a local startup."},
  {id:3, type:"file", src:"/ramdan2026.mp4", title:"Red Crescent — Ramadan",       cat:"Documentary", dur:"5:12", year:"2026", desc:"Humanitarian documentary capturing aid efforts."},
  {id:4, type:"file", src:"/work1.mp4", title:"Red Crescent-Aswan",              cat:"Social Media",dur:"0:45", year:"2025", desc:"Viral social media campaign content."},
  {id:5, type:"file", src:"/work2.mp4", title:"The 57th Cairo International Book Fair",     cat:"Events",      dur:"4:30", year:"2023", desc:"Full coverage of a corporate conference."},
  {id:6, type:"file", src:"/ourreel.mp4", title:"SUDAN Video",              cat:"Social Media",    dur:"2:18", year:"2024", desc:"Intimate engagement story."},
];
const CATS=["All","Weddings","Commercials","Social Media","Documentary","Events"];

/* Video Modal */
function VideoModal({video, onClose}){
  useEffect(()=>{
    const h=e=>{if(e.key==="Escape")onClose();};
    document.addEventListener("keydown",h);
    document.body.style.overflow="hidden";
    return()=>{document.removeEventListener("keydown",h);document.body.style.overflow="";};
  },[onClose]);

  const getSrc=()=>{
    if(video.type==="youtube"&&video.videoId) return `https://www.youtube.com/embed/${video.videoId}?autoplay=1&rel=0`;
    if(video.type==="vimeo"&&video.videoId)   return `https://player.vimeo.com/video/${video.videoId}?autoplay=1`;
    return null;
  };
  const src=getSrc();

  return<div onClick={onClose} style={{position:"fixed",inset:0,zIndex:1000,background:"rgba(0,0,0,.95)",display:"flex",alignItems:"center",justifyContent:"center",padding:"2rem",animation:"fadeUp .3s ease both"}}>
    <div onClick={e=>e.stopPropagation()} style={{width:"100%",maxWidth:960,animation:"scaleIn .4s ease both"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"1.5rem"}}>
        <div>
          <p style={{fontFamily:"'Cinzel',serif",fontSize:".58rem",letterSpacing:".45em",color:GOLD,marginBottom:".3rem"}}>{video.cat.toUpperCase()}</p>
          <h3 style={{fontFamily:"'Cinzel',serif",fontSize:"1.2rem",color:"#e8e0d0"}}>{video.title}</h3>
        </div>
        <button onClick={onClose} style={{background:"transparent",border:`1px solid rgba(201,168,76,.3)`,color:GOLD,fontFamily:"'Cinzel',serif",fontSize:".65rem",letterSpacing:".3em",padding:".6rem 1.4rem",cursor:"pointer",transition:"all .3s"}} onMouseEnter={e=>{e.target.style.background=GOLD;e.target.style.color=BLACK;}} onMouseLeave={e=>{e.target.style.background="transparent";e.target.style.color=GOLD;}}>✕ CLOSE</button>
      </div>

      <div style={{position:"relative",aspectRatio:"16/9",background:DARK2,border:`1px solid rgba(201,168,76,.15)`}}>
        {src ? (
          <iframe src={src} style={{position:"absolute",inset:0,width:"100%",height:"100%",border:"none"}} allow="autoplay; fullscreen" allowFullScreen title={video.title}/>
        ) : video.type==="file"&&video.src ? (
          <video src={video.src} controls autoPlay style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover"}}/>
        ) : (
          <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"1.5rem"}}>
            <div style={{width:80,height:80,border:`2px solid rgba(201,168,76,.3)`,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center"}}>
              <span style={{fontSize:"2rem",color:"#333"}}>🎬</span>
            </div>
            <div style={{textAlign:"center"}}>
              <p style={{fontFamily:"'Cinzel',serif",fontSize:".7rem",letterSpacing:".35em",color:"#444",marginBottom:".5rem"}}>NO VIDEO ADDED YET</p>
              <p style={{fontFamily:"'Inter',sans-serif",fontSize:".78rem",color:"#333",fontWeight:300}}>Set <code style={{color:GOLD,background:"rgba(201,168,76,.1)",padding:".1rem .4rem"}}>videoId</code> or <code style={{color:GOLD,background:"rgba(201,168,76,.1)",padding:".1rem .4rem"}}>src</code> in the VIDEOS array</p>
            </div>
          </div>
        )}
      </div>

      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:"1rem",paddingTop:"1rem",borderTop:`1px solid rgba(255,255,255,.05)`}}>
        <p style={{fontFamily:"'Inter',sans-serif",fontSize:".82rem",color:"#666",fontWeight:300}}>{video.desc}</p>
        <div style={{display:"flex",gap:"2rem",flexShrink:0}}>
          <span style={{fontFamily:"'Cinzel',serif",fontSize:".58rem",letterSpacing:".3em",color:"#444"}}>{video.dur}</span>
          <span style={{fontFamily:"'Cinzel',serif",fontSize:".58rem",letterSpacing:".3em",color:"#444"}}>{video.year}</span>
        </div>
      </div>
    </div>
  </div>;
}

/* Video Card */
function VideoCard({video,onClick,delay}){
  const[hov,sh]=useState(false);
  const thumb=video.thumb||(video.type==="youtube"&&video.videoId?`https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`:"");
  return<Reveal delay={delay}>
    <div onMouseEnter={()=>sh(true)} onMouseLeave={()=>sh(false)} onClick={onClick} style={{position:"relative",aspectRatio:"16/9",background:DARK2,overflow:"hidden",cursor:"pointer",transform:hov?"translateY(-8px)":"translateY(0)",transition:"all .4s cubic-bezier(.4,0,.2,1)",boxShadow:hov?`0 20px 40px rgba(201,168,76,.15)`:"none"}}>
      {thumb?(
        <img src={thumb} alt={video.title} style={{width:"100%",height:"100%",objectFit:"cover",transform:hov?"scale(1.08)":"scale(1)",transition:"transform .6s ease",filter:hov?"brightness(.8) saturate(.9)":"brightness(.65) saturate(.75)"}}/>
      ):(
        <div style={{width:"100%",height:"100%",background:`linear-gradient(135deg,${DARK2},#1a1a1a)`,display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:".7rem",transform:hov?"scale(1.02)":"scale(1)",transition:"transform .4s ease"}}>
          <span style={{fontSize:"2rem",opacity:hov?.3:.15,transition:"opacity .3s"}}>🎬</span>
          <span style={{fontFamily:"'Cinzel',serif",fontSize:".55rem",letterSpacing:".4em",color:hov?GOLD:"#333",transition:"color .3s"}}>{video.cat.toUpperCase()}</span>
        </div>
      )}
      <div style={{position:"absolute",inset:0,background:hov?"linear-gradient(to top,rgba(5,5,5,.85) 0%,rgba(5,5,5,.3) 60%,rgba(201,168,76,.1) 100%)":"linear-gradient(to top,rgba(5,5,5,.92) 0%,rgba(5,5,5,.2) 55%,transparent 100%)",transition:"all .4s ease"}}/>
      <div style={{position:"absolute",top:"50%",left:"50%",transform:`translate(-50%,-50%) scale(${hov?1.1:.8})`,width:56,height:56,borderRadius:"50%",border:`1.5px solid ${GOLD}`,display:"flex",alignItems:"center",justifyContent:"center",transition:"all .4s cubic-bezier(.4,0,.2,1)",background:hov?"rgba(201,168,76,.9)":"rgba(5,5,5,.5)",boxShadow:hov?`0 0 30px rgba(201,168,76,.3)`:"none"}}>
        <span style={{fontSize:"1.2rem",color:hov?BLACK:GOLD,marginRight:"-3px",lineHeight:1,transition:"color .3s"}}>▶</span>
      </div>
      <div style={{position:"absolute",bottom:0,left:0,right:0,padding:"1.2rem",transform:hov?"translateY(-4px)":"translateY(0)",transition:"transform .4s ease"}}>
        <p style={{fontFamily:"'Cinzel',serif",fontSize:".52rem",letterSpacing:".4em",color:GOLD,marginBottom:".3rem"}}>{video.cat.toUpperCase()}</p>
        <p style={{fontFamily:"'Inter',sans-serif",fontSize:".88rem",fontWeight:500,color:"#e8e0d0",marginBottom:".2rem"}}>{video.title}</p>
        <p style={{fontFamily:"'Inter',sans-serif",fontSize:".72rem",color:hov?"#ccc":"#666",fontWeight:300,transition:"color .3s"}}>{video.dur} · {video.year}</p>
      </div>
      <div style={{position:"absolute",top:0,left:0,width:hov?36:0,height:2,background:GOLD,transition:"width .4s cubic-bezier(.4,0,.2,1)"}}/>
      <div style={{position:"absolute",top:0,left:0,width:2,height:hov?36:0,background:GOLD,transition:"height .4s .1s cubic-bezier(.4,0,.2,1)"}}/>
      <div style={{position:"absolute",bottom:0,right:0,width:hov?36:0,height:2,background:GOLD,transition:"width .4s .2s cubic-bezier(.4,0,.2,1)"}}/>
      <div style={{position:"absolute",bottom:0,right:0,width:2,height:hov?36:0,background:GOLD,transition:"height .4s .3s cubic-bezier(.4,0,.2,1)"}}/>
    </div>
  </Reveal>;
}

function VideoGallery(){
  const[cat,sc]=useState("All");
  const[modal,sm]=useState(null);
  const filtered=cat==="All"?VIDEOS:VIDEOS.filter(v=>v.cat===cat);

  return<section id="work" className="sp" style={{background:"#070707",padding:"8rem 8vw"}}>
    <Reveal>
      <Label>WORK</Label>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:"3rem",flexWrap:"wrap",gap:"1.5rem"}}>
        <h2 style={{fontFamily:"'Cinzel',serif",fontSize:"clamp(2rem,4vw,3.5rem)",color:"#e8e0d0"}}>Featured Work</h2>
        <p style={{fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",fontSize:"1rem",color:"#555"}}>Click any video to watch</p>
      </div>
      <div className="vtabs" style={{display:"flex",gap:".6rem",flexWrap:"wrap",marginBottom:"3.5rem"}}>
        {CATS.map(c=><button key={c} onClick={()=>sc(c)} style={{background:cat===c?GOLD:"transparent",border:`1px solid ${cat===c?GOLD:"rgba(201,168,76,.2)"}`,color:cat===c?BLACK:"#777",fontFamily:"'Cinzel',serif",fontSize:".58rem",letterSpacing:".28em",padding:".55rem 1.4rem",cursor:"pointer",transition:"all .3s",borderRadius:2}}>{c.toUpperCase()}</button>)}
      </div>
    </Reveal>

    <div className="vgrid" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"1.5px"}}>
      {filtered.map((v,i)=><VideoCard key={v.id} video={v} onClick={()=>sm(v)} delay={i*.06}/>)}
    </div>

    {filtered.length===0&&<div style={{textAlign:"center",padding:"6rem 0",color:"#333",fontFamily:"'Cinzel',serif",fontSize:".65rem",letterSpacing:".4em"}}>NO PROJECTS IN THIS CATEGORY YET</div>}

    {modal&&<VideoModal video={modal} onClose={()=>sm(null)}/>}
  </section>;
}

/* ══════════ SHOWREEL ══════════ */
const SHOWREEL_VIDEO_ID=""; // ← paste YouTube ID here

function PlayBtn({onClick}){
  const[h,sh]=useState(false);
  return<div onMouseEnter={()=>sh(true)} onMouseLeave={()=>sh(false)} onClick={onClick} style={{width:88,height:88,borderRadius:"50%",border:`2px solid ${GOLD}`,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",position:"relative",zIndex:1,background:h?GOLD:"transparent",transition:"all .4s cubic-bezier(.4,0,.2,1)",transform:h?"scale(1.15) rotate(5deg)":"scale(1) rotate(0deg)",boxShadow:h?`0 0 40px rgba(201,168,76,.4), 0 20px 40px rgba(0,0,0,.3)`:"none"}}>
    <div style={{position:"absolute",top:"50%",left:"50%",width:115,height:115,borderRadius:"50%",border:`1px solid rgba(201,168,76,.22)`,animation:h?"pulse 1.5s ease-in-out infinite":"pulse 2.3s ease-in-out infinite"}}/>
    <div style={{position:"absolute",top:"50%",left:"50%",width:140,height:140,borderRadius:"50%",border:`1px solid rgba(201,168,76,.1)`,animation:h?"spin 8s linear infinite":"spin 12s linear infinite"}}/>
    <span style={{fontSize:"1.8rem",color:h?BLACK:GOLD,marginRight:"-5px",lineHeight:1,transition:"all .3s",transform:h?"scale(1.1)":"scale(1)"}}>▶</span>
  </div>;
}

function Reel(){
  const[playing,sp]=useState(false);
  return<section id="reel" className="sp" style={{background:DARK,padding:"8rem 8vw",textAlign:"center"}}>
    <Reveal><Label center>SHOWREEL</Label><h2 style={{fontFamily:"'Cinzel',serif",fontSize:"clamp(2rem,4vw,3.5rem)",color:"#e8e0d0",marginBottom:"4rem"}}>Watch Our Reel</h2></Reveal>
    <Reveal delay={.2}>
      <div style={{position:"relative",maxWidth:960,margin:"0 auto",aspectRatio:"16/7",background:DARK2,border:`1px solid rgba(201,168,76,.12)`,overflow:"hidden",display:"flex",alignItems:"center",justifyContent:"center"}}>
        {playing&&SHOWREEL_VIDEO_ID?(
          <iframe src={`https://www.youtube.com/embed/${SHOWREEL_VIDEO_ID}?autoplay=1&rel=0`} style={{position:"absolute",inset:0,width:"100%",height:"100%",border:"none"}} allow="autoplay; fullscreen" allowFullScreen title="Showreel"/>
        ):(
          <>
            <div style={{position:"absolute",inset:0,background:`radial-gradient(ellipse at center,rgba(201,168,76,.06) 0%,transparent 70%)`}}/>
            {/* showreel cover logo */}
            <img src="/logo.jpg" alt="logo" style={{position:"absolute",width:220,opacity:0.1,top:"50%",left:"50%",transform:"translate(-50%,-50%)"}}/>
            {[[{top:0,left:0},{borderTop:`1px solid rgba(201,168,76,.4)`,borderLeft:`1px solid rgba(201,168,76,.4)`}],[{top:0,right:0},{borderTop:`1px solid rgba(201,168,76,.4)`,borderRight:`1px solid rgba(201,168,76,.4)`}],[{bottom:0,left:0},{borderBottom:`1px solid rgba(201,168,76,.4)`,borderLeft:`1px solid rgba(201,168,76,.4)`}],[{bottom:0,right:0},{borderBottom:`1px solid rgba(201,168,76,.4)`,borderRight:`1px solid rgba(201,168,76,.4)`}]].map(([pos,brd],i)=><div key={i} style={{position:"absolute",width:30,height:30,...pos,...brd}}/>)}
            <PlayBtn onClick={()=>sp(true)}/>
            <p style={{position:"absolute",bottom:"1.5rem",fontFamily:"'Cinzel',serif",fontSize:".55rem",letterSpacing:".45em",color:"#3a3a3a"}}>SHOWREEL 2024 — SP PRODUCTION</p>
          </>
        )}
      </div>
    </Reveal>
  </section>;
}

/* ══════════ CONTACT ══════════ */
const EJS_SVC ="YOUR_SERVICE_ID";
const EJS_TPL ="YOUR_TEMPLATE_ID";
const EJS_KEY ="YOUR_PUBLIC_KEY";
const SVC_TYPES=["Wedding Film","Commercial","Social Media","Event Coverage","Editing","Other"];

function CF({label,placeholder,type,value,onChange}){
  return<div>
    <p style={{fontFamily:"'Cinzel',serif",fontSize:".55rem",letterSpacing:".3em",color:"#444",marginBottom:".6rem"}}>{label}</p>
    <input type={type} placeholder={placeholder} value={value} onChange={e=>onChange(e.target.value)} style={{width:"100%",background:"transparent",border:"none",borderBottom:`1px solid rgba(255,255,255,.1)`,color:"#e8e0d0",fontSize:".88rem",padding:".7rem 0",outline:"none",fontFamily:"'Inter',sans-serif",fontWeight:300}} onFocus={e=>e.target.style.borderBottomColor=GOLD} onBlur={e=>e.target.style.borderBottomColor="rgba(255,255,255,.1)"}/>
  </div>;
}

function Contact(){
  const[form,sf]=useState({name:"",email:"",phone:"",type:"",message:""});
  const[status,ss]=useState("idle");
  const set=(k,v)=>sf(p=>({...p,[k]:v}));

  const send=async()=>{
    if(!form.name||!form.email){alert("Please enter your name and email.");return;}
    ss("loading");
    setTimeout(()=>ss("success"),1500);
  };

  return<section id="contact" className="sp" style={{background:BLACK,padding:"8rem 8vw",position:"relative",overflow:"hidden"}}>
    <div style={{position:"absolute",left:"-5%",top:"50%",transform:"translateY(-50%)",width:500,height:500,borderRadius:"50%",background:`radial-gradient(circle,rgba(201,168,76,.04) 0%,transparent 70%)`,pointerEvents:"none"}}/>
    <div className="cgrid" style={{display:"grid",gridTemplateColumns:"1fr 1.2fr",gap:"7rem",position:"relative",zIndex:1,alignItems:"start"}}>
      <Reveal>
        <Label>CONTACT</Label>
        <h2 style={{fontFamily:"'Cinzel',serif",fontSize:"clamp(1.8rem,3.5vw,3rem)",color:"#e8e0d0",marginBottom:"1.5rem",lineHeight:1.2}}>Start Your<br/>Project Today</h2>
        <p style={{fontFamily:"'Inter',sans-serif",fontSize:".88rem",fontWeight:300,color:"#666",lineHeight:2.2,marginBottom:"3.5rem"}}>Have an idea, even a small one? Let's talk through it. We respond the same day.</p>
        {[
          {icon:"📞",label:"PHONE",   val:"+20 115 779 2112",link:null},
          {icon:"📘",label:"FACEBOOK",val:"SP-Production",    link:"https://www.facebook.com/saad.mahmmoud.3"},
          {icon:"📸",label:"INSTAGRAM",val:"@sp_production",  link:"#"},
          {icon:"📧",label:"EMAIL",   val:"info@sp-production.com",link:"mailto:info@sp-production.com"},
        ].map(({icon,label,val,link})=>(
          <div key={label} style={{display:"flex",gap:"1.5rem",alignItems:"center",paddingBottom:"1.5rem",marginBottom:"1.5rem",borderBottom:`1px solid rgba(255,255,255,.05)`}}>
            <div style={{width:42,height:42,border:`1px solid rgba(201,168,76,.3)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1rem",color:GOLD,flexShrink:0}}>{icon}</div>
            <div>
              <p style={{fontFamily:"'Cinzel',serif",fontSize:".55rem",letterSpacing:".28em",color:"#444",marginBottom:".25rem"}}>{label}</p>
              {link?<a href={link} target="_blank" rel="noreferrer" style={{fontFamily:"'Inter',sans-serif",fontSize:".88rem",color:"#e8e0d0",transition:"color .3s",textDecoration:"none"}} onMouseEnter={e=>e.target.style.color=GOLD} onMouseLeave={e=>e.target.style.color="#e8e0d0"}>{val}</a>
                   :<p style={{fontFamily:"'Inter',sans-serif",fontSize:".88rem",color:"#e8e0d0"}}>{val}</p>}
            </div>
          </div>
        ))}
      </Reveal>

      <Reveal delay={.15}>
        {status==="success"?(
          <div style={{textAlign:"center",padding:"5rem 0"}}>
            <div style={{fontSize:"4rem",marginBottom:"1.5rem",animation:"float 3s ease-in-out infinite"}}>✨</div>
            <p style={{fontFamily:"'Cinzel',serif",fontSize:"1.5rem",color:GOLD,letterSpacing:".2em",marginBottom:"1rem"}}>Thank You!</p>
            <p style={{fontFamily:"'Inter',sans-serif",fontSize:".88rem",color:"#555",lineHeight:2,fontWeight:300}}>Your message is on its way — we'll reply today.</p>
            <button onClick={()=>ss("idle")} style={{marginTop:"2rem",background:"transparent",border:`1px solid rgba(201,168,76,.25)`,color:"#555",fontFamily:"'Cinzel',serif",fontSize:".58rem",letterSpacing:".3em",padding:".7rem 2rem",cursor:"pointer"}}>Send Another</button>
          </div>
        ):(
          <div style={{display:"flex",flexDirection:"column",gap:"2rem"}}>
            <Label>SEND A MESSAGE</Label>
            <div className="g2" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1.5rem"}}>
              <CF label="NAME"  placeholder="Your name"   type="text"  value={form.name}  onChange={v=>set("name",v)}/>
              <CF label="EMAIL" placeholder="your@email.com" type="email" value={form.email} onChange={v=>set("email",v)}/>
            </div>
            <div className="g2" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1.5rem"}}>
              <CF label="PHONE" placeholder="+20 ..."      type="tel"  value={form.phone} onChange={v=>set("phone",v)}/>
              <div/>
            </div>
            <div>
              <p style={{fontFamily:"'Cinzel',serif",fontSize:".55rem",letterSpacing:".3em",color:"#444",marginBottom:".8rem"}}>SERVICE TYPE</p>
              <div style={{display:"flex",flexWrap:"wrap",gap:".6rem"}}>
                {SVC_TYPES.map(t=><button key={t} onClick={()=>set("type",t)} style={{background:form.type===t?GOLD:"transparent",border:`1px solid ${form.type===t?GOLD:"rgba(201,168,76,.18)"}`,color:form.type===t?BLACK:"#666",fontFamily:"'Inter',sans-serif",fontSize:".78rem",fontWeight:300,padding:".48rem 1.1rem",cursor:"pointer",transition:"all .3s",borderRadius:2}}>{t}</button>)}
              </div>
            </div>
            <div>
              <p style={{fontFamily:"'Cinzel',serif",fontSize:".55rem",letterSpacing:".3em",color:"#444",marginBottom:".6rem"}}>MESSAGE</p>
              <textarea placeholder="Tell us about your project..." rows={4} value={form.message} onChange={e=>set("message",e.target.value)} style={{width:"100%",background:"transparent",border:"none",borderBottom:`1px solid rgba(255,255,255,.1)`,color:"#e8e0d0",fontSize:".88rem",padding:".7rem 0",outline:"none",resize:"none",fontFamily:"'Inter',sans-serif",fontWeight:300}} onFocus={e=>e.target.style.borderBottomColor=GOLD} onBlur={e=>e.target.style.borderBottomColor="rgba(255,255,255,.1)"}/>
            </div>
            <Btn full onClick={send}>{status==="loading"?"Sending…":"Send Message"}</Btn>
            <p style={{fontFamily:"'Inter',sans-serif",fontSize:".72rem",color:"#333",textAlign:"center",fontWeight:300}}>We respond the same day · Message goes directly to Saad</p>
          </div>
        )}
      </Reveal>
    </div>
  </section>;
}

/* ══════════ FOOTER ══════════ */
function Footer(){
  return<footer style={{background:DARK,padding:"2.5rem 8vw",borderTop:`1px solid rgba(201,168,76,.1)`}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"1.5rem"}}>
      <span style={{fontFamily:"'Cinzel',serif",fontSize:".82rem",letterSpacing:".35em",color:GOLD}}>SP — PRODUCTION</span>
      <span style={{fontFamily:"'Inter',sans-serif",fontSize:".75rem",fontWeight:300,color:"#333"}}>© 2024 Saad Mahmoud · All rights reserved</span>
      <div style={{display:"flex",gap:"2rem"}}>
        {[["FACEBOOK","https://www.facebook.com/profile.php?id=100064332750755"],["WHATSAPP","https://api.whatsapp.com/send?phone=%2B201157792112"],["EMAIL","sm6709394@gmail.com"]].map(([l,h])=><a key={l} href={h} target={h.startsWith("http")?"_blank":"_self"} rel="noreferrer" style={{fontFamily:"'Cinzel',serif",fontSize:".55rem",letterSpacing:".22em",color:"#333",transition:"color .3s",textDecoration:"none"}} onMouseEnter={e=>e.target.style.color=GOLD} onMouseLeave={e=>e.target.style.color="#333"}>{l}</a>)}
      </div>
    </div>
  </footer>;
}

/* ══════════ APP ══════════ */
export default function App(){
  const[open,so]=useState(false);
  return<>
    <style>{GLOBAL_CSS}</style>
    <Grain/>
    <Cursor/>
    <Nav open={open} setOpen={so}/>
    <Hero/>
    <Marquee/>
    <About/>
    <Services/>
    <VideoGallery/>
    <Reel/>
    <Contact/>
    <Footer/>
  </>;
}