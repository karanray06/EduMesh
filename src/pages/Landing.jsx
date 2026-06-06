import React, { useState, useEffect, useRef } from "react"
import * as THREE from "three"
import { Link } from "react-router-dom"

const fonts = `@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;900&family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;1,400&display=swap');`

const C = {
 bg: "#05050E",
 surface: "#0C0C1E",
 glass: "rgba(255,255,255,0.03)",
 glassBorder: "rgba(255,255,255,0.07)",
 indigo: "#4F46E5",
 cyan: "#06B6D4",
 violet: "#7C3AED",
 amber: "#F59E0B",
 text1: "#FFFFFF",
 text2: "#94A3B8",
 text3: "#64748B",
}

const subjects = ["JEE Main", "JEE Advanced", "NEET", "Class 6–10", "Class 11–12", "B.Tech", "BCA", "BSc"]

const features = [
 { n: "01", title: "AI Tutor Arya", sub: "Your personal 24/7 guide", body: "Arya knows your weak topics, exam date, and learning style. She explains like India's best teacher — step-by-step, Hinglish-friendly, and never just gives the answer.", color: "#4F46E5", icon: "🧠" },
 { n: "02", title: "Adaptive Engine", sub: "Study smarter, not harder", body: "Our AI maps every chapter to your proficiency level and builds a personalized path. Spaced repetition keeps concepts fresh. Weak zones get targeted daily until they become green zones.", color: "#06B6D4", icon: "⚡" },
 { n: "03", title: "Mock Battle Mode", sub: "Win before exam day", body: "Full-length JEE/NEET replicas with post-test AI analysis. Error patterns, time management insights, topic breakdown, and a live rank predictor — all in one session.", color: "#7C3AED", icon: "🎯" },
 { n: "04", title: "PYQ Intelligence", sub: "20 years of exam patterns", body: "Every JEE (2000–2025) and NEET (2005–2025) question tagged, analyzed, and pattern-mapped by AI. Know which concepts appear most, predict next year's paper.", color: "#F59E0B", icon: "📊" },
]

const stats = [
 { val: "5", unit: "Free AI APIs", sub: "Groq · Gemini · DeepSeek · OpenRouter · Cloudflare" },
 { val: "₹299", unit: "/month", sub: "Cheaper than any competitor" },
 { val: "Class 6", unit: "→ Degree", sub: "Only full-lifecycle platform" },
 { val: "10K+", unit: "PYQs", sub: "JEE 2000–2025 + NEET 2005–2025" },
]

const orbStyle = (top, left, w, h, color1, color2, opacity = 0.35, delay = "0s") => ({
 position: "absolute", top, left, width: w, height: h,
 background: `radial-gradient(circle, ${color1} 0%, ${color2} 60%, transparent 100%)`,
 borderRadius: "50%", filter: "blur(80px)", opacity,
 animation: `orbFloat 8s ease-in-out infinite`, animationDelay: delay,
 pointerEvents: "none", zIndex: 0,
})

const glassCard = (extra = {}) => ({
 background: C.glass,
 border: `1px solid ${C.glassBorder}`,
 borderRadius: "20px",
 backdropFilter: "blur(20px)",
 WebkitBackdropFilter: "blur(20px)",
 ...extra,
})

export default function Landing() {
 const canvasRef = useRef(null)
 const [active, setActive] = useState(0)
 const [hoveredSub, setHoveredSub] = useState(null)
 const [loaded, setLoaded] = useState(false)

 useEffect(() => {
 setTimeout(() => setLoaded(true), 100)
 const t = setInterval(() => setActive(a => (a + 1) % features.length), 4000)
 return () => clearInterval(t)
 }, [])

 useEffect(() => {
 const canvas = canvasRef.current
 if (!canvas) return

 const scene = new THREE.Scene()
 const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100)
 camera.position.z = 4.2

 const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
 renderer.setSize(480, 480)
 renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

 const vs = `
 uniform float uTime;
 varying vec3 vNormal;
 varying float vD;
 void main() {
 vNormal = normal;
 vec3 p = position;
 float d = sin(p.x*3.0+uTime*1.2)*cos(p.y*2.5+uTime*0.8)*sin(p.z*3.0+uTime);
 vD = d; p += normal * d * 0.13;
 gl_Position = projectionMatrix * modelViewMatrix * vec4(p,1.0);
 }
 `
 const fs = `
 uniform float uTime;
 varying vec3 vNormal;
 varying float vD;
 void main() {
 vec3 c1=vec3(0.31,0.27,0.91), c2=vec3(0.05,0.72,0.84), c3=vec3(0.49,0.23,0.93);
 float t=vD*0.5+0.5+sin(uTime*0.2)*0.1;
 vec3 col=mix(c1,c2,clamp(t,0.0,1.0));
 col=mix(col,c3,abs(vNormal.x)*0.35+sin(uTime*0.3)*0.1);
 vec3 vd=normalize(vec3(0.0,0.0,1.0));
 float fr=pow(1.0-max(dot(vNormal,vd),0.0),3.0);
 col += vec3(0.35,0.65,1.0)*fr*0.75;
 gl_FragColor = vec4(col, 0.88+fr*0.12);
 }
 `

 const geo = new THREE.SphereGeometry(1.42, 128, 128)
 const mat = new THREE.ShaderMaterial({ uniforms: { uTime: { value: 0 } }, vertexShader: vs, fragmentShader: fs, transparent: true })
 const mesh = new THREE.Mesh(geo, mat)
 scene.add(mesh)

 const bgGeo = new THREE.SphereGeometry(1.85, 32, 32)
 const bgMat = new THREE.MeshBasicMaterial({ color: 0x3730a3, transparent: true, opacity: 0.07, side: THREE.BackSide })
 scene.add(new THREE.Mesh(bgGeo, bgMat))

 const ringGeo = new THREE.TorusGeometry(2.1, 0.012, 8, 200)
 const ringMat = new THREE.MeshBasicMaterial({ color: 0x818cf8, transparent: true, opacity: 0.25 })
 const ring = new THREE.Mesh(ringGeo, ringMat)
 ring.rotation.x = Math.PI / 3
 scene.add(ring)

 const r2Geo = new THREE.TorusGeometry(2.6, 0.008, 8, 200)
 const r2Mat = new THREE.MeshBasicMaterial({ color: 0x06b6d4, transparent: true, opacity: 0.18 })
 const ring2 = new THREE.Mesh(r2Geo, r2Mat)
 ring2.rotation.x = Math.PI / 4
 ring2.rotation.z = Math.PI / 5
 scene.add(ring2)

 const n = 2000
 const pos = new Float32Array(n * 3)
 for (let i = 0; i < n; i++) {
 const th = Math.random() * Math.PI * 2, ph = Math.acos(2 * Math.random() - 1), r = 2.1 + Math.random() * 2
 pos[i*3] = r*Math.sin(ph)*Math.cos(th); pos[i*3+1] = r*Math.sin(ph)*Math.sin(th); pos[i*3+2] = r*Math.cos(ph)
 }
 const pGeo = new THREE.BufferGeometry()
 pGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3))
 const pMat = new THREE.PointsMaterial({ size: 0.018, color: 0x818cf8, transparent: true, opacity: 0.45, blending: THREE.AdditiveBlending })
 const pts = new THREE.Points(pGeo, pMat)
 scene.add(pts)

 const clk = new THREE.Clock()
 let raf
 const animate = () => {
 raf = requestAnimationFrame(animate)
 const t = clk.getElapsedTime()
 mat.uniforms.uTime.value = t
 mesh.rotation.y = t * 0.08; mesh.rotation.x = Math.sin(t * 0.15) * 0.08
 mesh.position.y = Math.sin(t * 0.4) * 0.07
 pts.rotation.y = t * 0.03; pts.rotation.z = t * 0.01
 ring.rotation.y = t * 0.14; ring2.rotation.y = -t * 0.09
 renderer.render(scene, camera)
 }
 animate()

 return () => {
 cancelAnimationFrame(raf); renderer.dispose()
 mat.dispose(); geo.dispose(); bgMat.dispose(); bgGeo.dispose()
 ringMat.dispose(); ringGeo.dispose(); r2Mat.dispose(); r2Geo.dispose()
 pMat.dispose(); pGeo.dispose()
 }
 }, [])

 const f = features[active]

 return (
 <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'Outfit', sans-serif", color: C.text1, position: "relative", overflowX: "hidden" }}>
 <style>{`
 ${fonts}
 * { box-sizing: border-box; margin: 0; padding: 0; }
 @keyframes orbFloat { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-24px) scale(1.04)} }
 @keyframes fadeUp { from{opacity:0;transform:translateY(32px)} to{opacity:1;transform:translateY(0)} }
 @keyframes ticker { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
 @keyframes pulse { 0%,100%{opacity:0.6} 50%{opacity:1} }
 @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
 .fade-in { animation: fadeUp 0.8s ease-out both; }
 .d1 { animation-delay: 0.1s; }
 .d2 { animation-delay: 0.25s; }
 .d3 { animation-delay: 0.4s; }
 .d4 { animation-delay: 0.55s; }
 .btn-primary { background: linear-gradient(135deg, #4F46E5, #7C3AED); border: none; color: #fff; padding: 14px 32px; border-radius: 100px; font-family: 'Outfit', sans-serif; font-size: 15px; font-weight: 600; cursor: pointer; transition: all 0.2s; letter-spacing: 0.01em; text-decoration: none; display: inline-block; }
 .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 12px 40px rgba(79,70,229,0.4); }
 .btn-ghost { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); color: #fff; padding: 14px 32px; border-radius: 100px; font-family: 'Outfit', sans-serif; font-size: 15px; font-weight: 500; cursor: pointer; transition: all 0.2s; text-decoration: none; display: inline-block; }
 .btn-ghost:hover { background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.18); transform: translateY(-2px); }
 .feat-btn { background: none; border: 1px solid rgba(255,255,255,0.06); color: #94A3B8; padding: 10px 20px; border-radius: 100px; font-family: 'Outfit', sans-serif; font-size: 13px; cursor: pointer; transition: all 0.25s; white-space: nowrap; }
 .feat-btn.on { background: rgba(79,70,229,0.15); border-color: rgba(79,70,229,0.4); color: #a5b4fc; }
 .feat-btn:hover { color: #fff; border-color: rgba(255,255,255,0.15); }
 .sub-pill { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); color: #94A3B8; padding: 8px 18px; border-radius: 100px; font-size: 13px; font-weight: 500; cursor: pointer; transition: all 0.2s; white-space: nowrap; }
 .sub-pill:hover, .sub-pill.active { background: rgba(79,70,229,0.12); border-color: rgba(99,102,241,0.35); color: #c7d2fe; }
 .nav-link { color: #94A3B8; text-decoration: none; font-size: 14px; font-weight: 500; transition: color 0.2s; }
 .nav-link:hover { color: #fff; }
 ::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-track { background: #0a0a1a; } ::-webkit-scrollbar-thumb { background: #2d2d60; border-radius: 3px; }
 `}</style>

 {/* BG Orbs */}
 <div style={orbStyle("-10%", "-5%", "55vw", "55vw", "#3730a3", "#1e1b4b", 0.3, "0s")} />
 <div style={orbStyle("30%", "55%", "45vw", "45vw", "#0e7490", "#164e63", 0.25, "2s")} />
 <div style={orbStyle("70%", "10%", "38vw", "38vw", "#5b21b6", "#4c1d95", 0.2, "4s")} />
 <div style={orbStyle("5%", "40%", "30vw", "30vw", "#6d28d9", "#4c1d95", 0.15, "1s")} />

 {/* Nav */}
 <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)", borderBottom: `1px solid ${C.glassBorder}`, background: "rgba(5,5,14,0.7)" }}>
 <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2.5rem", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
 <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
 <div style={{ width: 32, height: 32, borderRadius: 10, background: "linear-gradient(135deg, #4F46E5, #06B6D4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>✦</div>
 <span style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-0.02em" }}>EduMesh</span>
 <span style={{ background: "rgba(79,70,229,0.2)", border: "1px solid rgba(79,70,229,0.35)", color: "#a5b4fc", fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: 100, marginLeft: 6, letterSpacing: "0.08em" }}>v2.5</span>
 </div>
 <div style={{ display: "flex", gap: 32 }} className="hidden md:flex">
 {["Features", "Courses", "Pricing", "Blog"].map(l => <Link key={l} to={`/${l.toLowerCase()}`} className="nav-link">{l}</Link>)}
 </div>
 <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
 <Link to="/login" className="btn-ghost" style={{ padding: "8px 20px", fontSize: 14 }}>Log In</Link>
 <Link to="/onboarding/step1" className="btn-primary" style={{ padding: "9px 22px", fontSize: 14 }}>Start Free →</Link>
 </div>
 </div>
 </nav>

 {/* Hero */}
 <section style={{ position: "relative", zIndex: 1, maxWidth: 1280, margin: "0 auto", padding: "130px 2.5rem 80px", display: "flex", flexDirection: "column", gap: "4rem" }} className="md:flex-row md:items-center">
 {/* Left */}
 <div style={{ flex: 1, minWidth: 0 }}>
 <div className="fade-in d1" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(79,70,229,0.12)", border: "1px solid rgba(79,70,229,0.3)", borderRadius: 100, padding: "6px 16px 6px 8px", marginBottom: 28 }}>
 <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 8px #4ade80", animation: "pulse 2s ease-in-out infinite" }} />
 <span style={{ fontSize: 12, fontWeight: 600, color: "#a5b4fc", letterSpacing: "0.04em" }}>INDIA'S FIRST FULL-LIFECYCLE AI LEARNING OS</span>
 </div>

 <h1 className="fade-in d2" style={{ fontSize: "clamp(2.6rem, 4.5vw, 3.8rem)", fontWeight: 900, lineHeight: 1.05, letterSpacing: "-0.03em", marginBottom: 24 }}>
 From{" "}
 <span style={{ background: "linear-gradient(135deg, #818cf8 0%, #06B6D4 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Class 6</span>{" "}
 to{" "}
 <span style={{ background: "linear-gradient(135deg, #a78bfa 0%, #f472b6 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>JEE / NEET</span>{" "}
 to{" "}
 <span style={{ background: "linear-gradient(135deg, #34d399 0%, #06B6D4 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Degree</span>
 </h1>

 <p className="fade-in d3" style={{ fontSize: "1.1rem", color: C.text2, lineHeight: 1.7, maxWidth: 520, marginBottom: 36, fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 400 }}>
 One AI platform for every stage of your academic journey. Powered by 5 free AI models — Groq, Gemini, DeepSeek, OpenRouter & Cloudflare — delivering personalized tutoring at ₹299/month.
 </p>

 <div className="fade-in d3" style={{ display: "flex", gap: 12, marginBottom: 48, flexWrap: "wrap" }}>
 <Link to="/onboarding/step1" className="btn-primary">Start Learning Free →</Link>
 <button className="btn-ghost">Watch Demo ▶</button>
 </div>

 {/* Stats row */}
 <div className="fade-in d4" style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
 {[["50K+", "Students Enrolled"], ["99%", "Syllabus Coverage"], ["₹0", "To Start Today"], ["5 AIs", "Working For You"]].map(([v, l]) => (
 <div key={l}>
 <div style={{ fontSize: "1.4rem", fontWeight: 800, letterSpacing: "-0.02em", background: "linear-gradient(135deg,#fff,#a5b4fc)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{v}</div>
 <div style={{ fontSize: 12, color: C.text3, fontWeight: 500 }}>{l}</div>
 </div>
 ))}
 </div>
 </div>

 {/* Right — Three.js Orb */}
 <div style={{ position: "relative", width: "100%", maxWidth: 480, height: 480, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }} className="mx-auto md:w-[480px]">
 <div style={{ position: "absolute", inset: "-40px", background: "radial-gradient(circle, rgba(79,70,229,0.15) 0%, transparent 70%)", borderRadius: "50%" }} />
 <canvas ref={canvasRef} style={{ display: "block", position: "relative", zIndex: 2, width: '100%', height: '100%' }} />

 {/* Floating UI cards */}
 <div style={{ ...glassCard({ padding: "12px 16px", position: "absolute", top: 40, left: -30, zIndex: 3, animation: "orbFloat 6s ease-in-out infinite" }) }}>
 <div style={{ fontSize: 11, color: C.text3, fontWeight: 500, marginBottom: 4 }}>ARYA AI TUTOR</div>
 <div style={{ fontSize: 13, color: "#c7d2fe", fontWeight: 600, lineHeight: 1.4, maxWidth: 180 }}>"Explain Newton's 3rd Law with cricket analogy 🏏"</div>
 </div>

 <div style={{ ...glassCard({ padding: "12px 16px", position: "absolute", bottom: 60, right: -20, zIndex: 3, animation: "orbFloat 7s ease-in-out infinite", animationDelay: "1.5s" }) }}>
 <div style={{ fontSize: 11, color: C.text3, fontWeight: 500, marginBottom: 6 }}>MOCK TEST RESULT</div>
 <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
 <div style={{ fontSize: 24, fontWeight: 900, color: "#4ade80" }}>215</div>
 <div>
 <div style={{ fontSize: 11, color: C.text2 }}>Score / 300</div>
 <div style={{ fontSize: 11, color: "#fbbf24" }}>↑ +18 from last mock</div>
 </div>
 </div>
 </div>

 <div style={{ ...glassCard({ padding: "10px 14px", position: "absolute", top: "50%", right: -10, transform: "translateY(-50%)", zIndex: 3, animation: "orbFloat 9s ease-in-out infinite", animationDelay: "3s" }) }}>
 <div style={{ fontSize: 11, color: "#fbbf24", marginBottom: 4 }}>🔥 STREAK</div>
 <div style={{ fontSize: 22, fontWeight: 900, color: "#fff" }}>47</div>
 <div style={{ fontSize: 11, color: C.text3 }}>days</div>
 </div>
 </div>
 </section>

 {/* Ticker */}
 <div style={{ position: "relative", zIndex: 1, borderTop: `1px solid ${C.glassBorder}`, borderBottom: `1px solid ${C.glassBorder}`, overflow: "hidden", padding: "14px 0", background: "rgba(255,255,255,0.015)" }}>
 <div style={{ display: "flex", animation: "ticker 25s linear infinite", gap: 0, width: "max-content" }}>
 {[...subjects, ...subjects].map((s, i) => (
 <span key={i} style={{ padding: "0 40px", fontSize: 13, fontWeight: 600, color: C.text2, letterSpacing: "0.06em", display: "flex", alignItems: "center", gap: 16 }}>
 {s} <span style={{ color: C.indigo }}>✦</span>
 </span>
 ))}
 </div>
 </div>

 {/* Subject Pills */}
 <section style={{ position: "relative", zIndex: 1, maxWidth: 1280, margin: "0 auto", padding: "64px 2.5rem 0" }}>
 <div style={{ textAlign: "center", marginBottom: 40 }}>
 <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", color: C.indigo, marginBottom: 16 }}>WHAT ARE YOU PREPARING FOR?</div>
 <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
 {subjects.map(s => (
 <button key={s} className={`sub-pill${hoveredSub === s ? " active" : ""}`} onMouseEnter={() => setHoveredSub(s)} onMouseLeave={() => setHoveredSub(null)}>{s}</button>
 ))}
 </div>
 </div>
 </section>

 {/* Features */}
 <section style={{ position: "relative", zIndex: 1, maxWidth: 1280, margin: "0 auto", padding: "80px 2.5rem" }}>
 <div style={{ textAlign: "center", marginBottom: 56 }}>
 <h2 style={{ fontSize: "clamp(2rem, 3vw, 2.8rem)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 16 }}>
 Everything your AI brain needs
 </h2>
 <p style={{ color: C.text2, fontSize: "1rem", fontFamily: "'Plus Jakarta Sans', sans-serif", maxWidth: 480, margin: "0 auto" }}>
 From adaptive learning to post-exam analysis — EduMesh AI works 24/7 so you study smarter.
 </p>
 </div>

 <div style={{ display: "flex", gap: 12, marginBottom: 40, justifyContent: "center", flexWrap: "wrap" }}>
 {features.map((f, i) => (
 <button key={i} className={`feat-btn${active === i ? " on" : ""}`} onClick={() => setActive(i)}>{f.n} {f.title}</button>
 ))}
 </div>

 <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 20 }} className="md:grid-cols-2">
 {/* Feature Detail */}
 <div style={{ ...glassCard({ padding: "40px", position: "relative", overflow: "hidden" }) }}>
 <div style={{ position: "absolute", top: -60, right: -60, width: 220, height: 220, background: `radial-gradient(circle, ${f.color}33 0%, transparent 70%)`, borderRadius: "50%", pointerEvents: "none" }} />
 <div style={{ fontSize: 64, fontWeight: 900, color: `${f.color}30`, letterSpacing: "-0.04em", marginBottom: 16, lineHeight: 1 }}>{f.n}</div>
 <div style={{ fontSize: 32, marginBottom: 8 }}>{f.icon}</div>
 <h3 style={{ fontSize: "1.6rem", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 8 }}>{f.title}</h3>
 <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", color: f.color, marginBottom: 16 }}>{f.sub.toUpperCase()}</div>
 <p style={{ color: C.text2, lineHeight: 1.7, fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.95rem" }}>{f.body}</p>
 <div style={{ marginTop: 28 }}>
 <button className="btn-primary" style={{ background: `linear-gradient(135deg, ${f.color}, ${f.color}aa)`, fontSize: 13, padding: "10px 24px" }}>Explore {f.title} →</button>
 </div>
 </div>

 {/* Stats Grid */}
 <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16 }} className="sm:grid-cols-2">
 {stats.map((s, i) => (
 <div key={i} style={{ ...glassCard({ padding: "24px", display: "flex", flexDirection: "column", justifyContent: "space-between" }) }}>
 <div style={{ fontSize: "2rem", fontWeight: 900, letterSpacing: "-0.03em", background: "linear-gradient(135deg, #fff 40%, #818cf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", lineHeight: 1, marginBottom: 4 }}>{s.val}</div>
 <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "#e2e8f0", marginBottom: 6 }}>{s.unit}</div>
 <div style={{ fontSize: 11, color: C.text3, lineHeight: 1.5 }}>{s.sub}</div>
 </div>
 ))}
 </div>
 </div>
 </section>

 {/* AI Stack */}
 <section style={{ position: "relative", zIndex: 1, maxWidth: 1280, margin: "0 auto", padding: "0 2.5rem 80px" }}>
 <div style={{ ...glassCard({ padding: "48px" }), background: "rgba(79,70,229,0.04)" }}>
 <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 40, flexWrap: "wrap", gap: 24 }}>
 <div>
 <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", color: "#818cf8", marginBottom: 12 }}>THE FREE AI STACK</div>
 <h3 style={{ fontSize: "1.8rem", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 8 }}>5 AI models, zero API cost</h3>
 <p style={{ color: C.text2, fontFamily: "'Plus Jakarta Sans', sans-serif", maxWidth: 420 }}>A smart router picks the best free AI for each task — speed, vision, math, or reasoning.</p>
 </div>
 <button className="btn-primary" style={{ flexShrink: 0 }}>See Architecture →</button>
 </div>

 <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 12 }} className="sm:grid-cols-2 md:grid-cols-5">
 {[
 { name: "Groq", role: "Live Tutor Chat", speed: "370 tok/s", color: "#f97316", tag: "FASTEST" },
 { name: "Gemini", role: "Image Doubts + Notes", speed: "1M context", color: "#4285f4", tag: "VISION" },
 { name: "DeepSeek R1", role: "Math & Physics", speed: "GPT-4 level", color: "#06b6d4", tag: "REASONING" },
 { name: "OpenRouter", role: "Fallback + 200+ Models", speed: "50 req/day", color: "#10b981", tag: "VERSATILE" },
 { name: "Cloudflare", role: "Edge Inference", speed: "Global <50ms", color: "#f59e0b", tag: "EDGE" },
 ].map(ai => (
 <div key={ai.name} style={{ ...glassCard({ padding: "20px 16px", textAlign: "center" }), position: "relative", overflow: "hidden" }}>
 <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: ai.color, borderRadius: "2px 2px 0 0" }} />
 <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: "0.12em", color: ai.color, marginBottom: 10 }}>{ai.tag}</div>
 <div style={{ fontSize: 14, fontWeight: 800, marginBottom: 6, color: "#e2e8f0" }}>{ai.name}</div>
 <div style={{ fontSize: 11, color: C.text3, marginBottom: 10, lineHeight: 1.4 }}>{ai.role}</div>
 <div style={{ fontSize: 11, color: ai.color, fontWeight: 600, background: `${ai.color}15`, borderRadius: 100, padding: "3px 8px", display: "inline-block" }}>{ai.speed}</div>
 </div>
 ))}
 </div>
 </div>
 </section>

 {/* CTA */}
 <section style={{ position: "relative", zIndex: 1, maxWidth: 1280, margin: "0 auto", padding: "0 2.5rem 100px" }}>
 <div style={{ textAlign: "center", position: "relative" }}>
 <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "60%", height: 300, background: "radial-gradient(circle, rgba(79,70,229,0.2) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
 <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", color: "#818cf8", marginBottom: 20 }}>START YOUR JOURNEY</div>
 <h2 style={{ fontSize: "clamp(2.2rem, 4vw, 3.6rem)", fontWeight: 900, letterSpacing: "-0.03em", marginBottom: 20, lineHeight: 1.05 }}>
 Your rank won't improve<br />by waiting.
 </h2>
 <p style={{ color: C.text2, fontFamily: "'Plus Jakarta Sans', sans-serif", maxWidth: 400, margin: "0 auto 40px", lineHeight: 1.7 }}>
 Join thousands of students from Class 6 to B.Tech who study smarter with EduMesh AI — free to start, forever affordable.
 </p>
 <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
 <Link to="/onboarding/step1" className="btn-primary" style={{ padding: "16px 40px", fontSize: 16 }}>Start Free Today →</Link>
 <Link to="/pricing" className="btn-ghost" style={{ padding: "16px 40px", fontSize: 16 }}>View Pricing</Link>
 </div>
 <p style={{ color: C.text3, fontSize: 12, marginTop: 20 }}>No credit card · ₹299/mo Pro · ₹0 forever free tier</p>
 </div>
 </section>

 {/* Footer */}
 <footer style={{ borderTop: `1px solid ${C.glassBorder}`, position: "relative", zIndex: 1, padding: "40px 2.5rem 32px", maxWidth: 1280, margin: "0 auto" }}>
 <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
 <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
 <div style={{ width: 28, height: 28, borderRadius: 8, background: "linear-gradient(135deg, #4F46E5, #06B6D4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>✦</div>
 <span style={{ fontSize: 16, fontWeight: 700 }}>EduMesh</span>
 </div>
 <div style={{ display: "flex", gap: 24 }}>
 {["Privacy", "Terms", "GitHub", "Twitter"].map(l => <Link key={l} to="#" className="nav-link" style={{ fontSize: 13 }}>{l}</Link>)}
 </div>
 <div style={{ fontSize: 12, color: C.text3 }}>© 2026 EduMesh. Built for India's students.</div>
 </div>
 </footer>
 </div>
 )
}
