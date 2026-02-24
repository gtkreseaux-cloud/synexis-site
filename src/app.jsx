import { useState, useEffect } from "react";

const N = "#0b1e2d", NL = "#132d42", NM = "#1a3a54";
const CY = "#00a8e8", CD = "#0088c2";
const G2 = "#c8d3de", G3 = "#94a3b8", G4 = "#64748b";
const GR = "#10b981", RD = "#ef4444", OR = "#f59e0b", PU = "#a855f7";

const techs = [
  { id:1,n:"Zaouni Julien",t:"cuivre",s:"GTK",cc:10164.94,nc:166,cf:0,nf:0,m:0 },
  { id:2,n:"Houacine Ahcene",t:"fibre",s:"Mycall",cc:0,nc:0,cf:6206.06,nf:56,m:649.35 },
  { id:3,n:"Si Abdallah Mehdi",t:"fibre",s:"GTK",cc:0,nc:0,cf:5531.91,nf:91,m:167.38 },
  { id:4,n:"Zaki-Ahmad Ziyad",t:"cuivre",s:"GTK",cc:5338.85,nc:92,cf:0,nf:0,m:0 },
  { id:5,n:"Sanchez Arnaud",t:"fibre",s:"GTK",cc:0,nc:0,cf:5168.34,nf:72,m:205.59 },
  { id:6,n:"El Haboub Zakaria",t:"fibre",s:"Mycall",cc:0,nc:0,cf:5114.02,nf:49,m:535.69 },
  { id:7,n:"Costa Lucas",t:"fibre",s:"GTK",cc:0,nc:0,cf:4781.44,nf:44,m:535.69 },
  { id:8,n:"Rodiel Ethan",t:"fibre",s:"GTK",cc:0,nc:0,cf:4581.01,nf:48,m:441.83 },
  { id:9,n:"Caralp Florian",t:"cuivre",s:"GTK",cc:4430.49,nc:78,cf:0,nf:0,m:0 },
  { id:10,n:"Zouine Wassim",t:"fibre",s:"GTK",cc:0,nc:0,cf:4420.55,nf:46,m:410.23 },
  { id:11,n:"Mahi Ouassim",t:"cuivre",s:"GTK",cc:4212.44,nc:75,cf:0,nf:0,m:0 },
  { id:12,n:"Sedira Elies",t:"fibre",s:"GTK",cc:0,nc:0,cf:3916.61,nf:61,m:122.86 },
  { id:13,n:"Bellini Remy",t:"fibre",s:"GTK",cc:0,nc:0,cf:3714.08,nf:74,m:0 },
  { id:14,n:"Cherifi Ahmed",t:"fibre",s:"GTK",cc:0,nc:0,cf:3332.91,nf:33,m:357.04 },
  { id:15,n:"Darbal Benjamin",t:"fibre",s:"GTK",cc:0,nc:0,cf:3163.08,nf:45,m:135.23 },
  { id:16,n:"Bettayeb Axel",t:"fibre",s:"GTK",cc:0,nc:0,cf:2670.81,nf:53,m:0 },
  { id:17,n:"Louknane Razik",t:"fibre",s:"GTK",cc:0,nc:0,cf:2559.12,nf:33,m:149.80 },
  { id:18,n:"Cherifi Massil",t:"fibre",s:"Mycall",cc:0,nc:0,cf:1591.58,nf:32,m:0 },
];

const penData = [
  {tech:"Si Abdallah Mehdi",mt:250,motif:"Retard intervention",mois:"Déc"},
  {tech:"Bellini Remy",mt:150,motif:"Dossier incomplet",mois:"Déc"},
  {tech:"Rodiel Ethan",mt:180,motif:"Photo manquante",mois:"Déc"},
  {tech:"Bettayeb Axel",mt:300,motif:"Malfaçon",mois:"Déc"},
  {tech:"Zaouni Julien",mt:75,motif:"SAV non résolu",mois:"Déc"},
  {tech:"Caralp Florian",mt:200,motif:"Retard",mois:"Nov"},
  {tech:"Mahi Ouassim",mt:120,motif:"Matériel manquant",mois:"Nov"},
  {tech:"Costa Lucas",mt:90,motif:"Photo manquante",mois:"Nov"},
];

const stk = [
  {id:1,nom:"Jarretière SC/APC 3m",qty:245,seuil:50,cat:"Fibre"},
  {id:2,nom:"PBO 12FO",qty:32,seuil:20,cat:"Fibre"},
  {id:3,nom:"Câble fibre 4FO 100m",qty:18,seuil:10,cat:"Fibre"},
  {id:4,nom:"Connecteur SC/APC",qty:520,seuil:100,cat:"Fibre"},
  {id:5,nom:"Câble RJ45 Cat6",qty:180,seuil:50,cat:"Cuivre"},
  {id:6,nom:"Prise murale optique",qty:8,seuil:30,cat:"Fibre"},
  {id:7,nom:"Splitter 1:8",qty:45,seuil:15,cat:"Fibre"},
  {id:8,nom:"Protection splice",qty:890,seuil:200,cat:"Fibre"},
  {id:9,nom:"Câble borne 7kW",qty:12,seuil:5,cat:"Borne"},
  {id:10,nom:"Wallbox Pulsar Plus",qty:3,seuil:5,cat:"Borne"},
];

const vehs = [
  {id:1,im:"GA-234-FT",ty:"Kangoo",tech:"Zaouni Julien",loyer:450,km:34200,ct:"2025-09",ok:true},
  {id:2,im:"GH-891-AB",ty:"Berlingo",tech:"Si Abdallah Mehdi",loyer:450,km:28900,ct:"2025-06",ok:true},
  {id:3,im:"FX-456-CD",ty:"Kangoo",tech:"Sanchez Arnaud",loyer:450,km:52100,ct:"2025-03",ok:false},
  {id:4,im:"GJ-123-EF",ty:"Partner",tech:"Caralp Florian",loyer:450,km:41300,ct:"2025-11",ok:true},
  {id:5,im:"FK-789-GH",ty:"Kangoo",tech:"Costa Lucas",loyer:450,km:67800,ct:"2025-04",ok:false},
  {id:6,im:"GL-012-IJ",ty:"Berlingo",tech:"Mahi Ouassim",loyer:450,km:19500,ct:"2026-01",ok:true},
];

const f = n => new Intl.NumberFormat("fr-FR",{style:"currency",currency:"EUR"}).format(n);

const Bd = ({children,c=CY,bg}) => (
  <span style={{display:"inline-block",padding:"3px 10px",borderRadius:20,fontSize:11,fontWeight:600,color:c,background:bg||c+"18"}}>{children}</span>
);

const SC = ({label,value,sub,color=CY,icon}) => (
  <div style={{background:`linear-gradient(135deg,${NL},${NM})`,borderRadius:14,padding:"16px 20px",border:`1px solid ${NM}`,position:"relative",overflow:"hidden"}}>
    <div style={{position:"absolute",top:-20,right:-20,width:70,height:70,borderRadius:"50%",background:color,opacity:0.08}}/>
    <div style={{fontSize:11,color:G3}}>{icon} {label}</div>
    <div style={{fontSize:22,fontWeight:700,marginTop:2}}>{value}</div>
    {sub && <div style={{fontSize:10,color,marginTop:2}}>{sub}</div>}
  </div>
);

export default function App() {
  const [pg, setPg] = useState("site");
  const [em, setEm] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const [tab, setTab] = useState("ca");
  const [fT, setFT] = useState("Tous");
  const [fS, setFS] = useState("Tous");
  const [sel, setSel] = useState(null);
  const [pG, setPG] = useState(15);
  const [pM, setPM] = useState(10);

  const [mv, setMv] = useState({});
  const [eM, setEM] = useState(null);
  const [mI, setMI] = useState("");
  const [mO, setMO] = useState("");
  const [scr, setScr] = useState(false);

  useEffect(() => {
    const fn = () => setScr(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const pct = t => t.s === "Mycall" ? pM : pG;
  const calc = t => {
    const ca = t.cc + t.cf;
    const p = pct(t);
    const com = ca * p / 100;
    const mvt = (mv[t.id]||[]).reduce((a,x)=>a+x.mt,0);
    return {ca,p,com,mvt,pay:ca-com-mvt,marg:com+mvt,margP:ca>0?(com+mvt)/ca*100:0};
  };
  const sc = s => s === "Mycall" ? PU : CY;
  const fl = techs.filter(t => (fT==="Tous"||t.t===fT) && (fS==="Tous"||t.s===fS));
  const tot = fl.reduce((a,t)=>{const c=calc(t);return{ca:a.ca+c.ca,com:a.com+c.com,mvt:a.mvt+c.mvt,pay:a.pay+c.pay,nb:a.nb+t.nc+t.nf}},{ca:0,com:0,mvt:0,pay:0,nb:0});

  const addMv = id => {
    const a = parseFloat(mI);
    if(isNaN(a)||a<=0)return;
    setMv({...mv,[id]:[...(mv[id]||[]),{mt:a,mo:mO||"Déduction",id:Date.now()}]});
    setMI("");setMO("");setEM(null);
  };
  const rmMv = (id,mid) => setMv({...mv,[id]:(mv[id]||[]).filter(x=>x.id!==mid)});

  const doLogin = () => {
    if(!em||!pw){setErr("Remplir tous les champs");return;}
    setPg("dash");
  };

  // ── SITE ──
  if (pg === "site") return (
    <div style={{fontFamily:"'Segoe UI',system-ui,sans-serif",color:"#fff",background:N,minHeight:"100vh"}}>
      <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:100,background:scr?N+"ee":"transparent",backdropFilter:scr?"blur(16px)":"none",padding:"14px 48px",display:"flex",alignItems:"center",justifyContent:"space-between",transition:"all .3s"}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:32,height:32,borderRadius:8,background:CY,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,fontSize:14}}>S</div>
          <span style={{fontSize:20,fontWeight:800}}>SYNEXIS</span>
        </div>
        <button onClick={()=>setPg("login")} style={{padding:"10px 22px",background:CY,color:"#fff",border:"none",borderRadius:10,fontSize:13,fontWeight:600,cursor:"pointer"}}>🔒 Espace gestion</button>
      </nav>

      <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:"100px 48px",textAlign:"center"}}>
        <div style={{maxWidth:800}}>
          <h1 style={{fontSize:52,fontWeight:900,lineHeight:1.1,margin:"0 0 24px"}}>
            Vos infrastructures<br/><span style={{color:CY}}>télécoms et énergie</span>
          </h1>
          <p style={{fontSize:17,color:G3,lineHeight:1.7,margin:"0 0 40px"}}>Fibre optique, réseaux cuivre et bornes de recharge — 30+ techniciens en région Sud-Est depuis Gardanne (13).</p>
          <div style={{display:"flex",gap:16,justifyContent:"center",marginBottom:80}}>
            <button onClick={()=>setPg("login")} style={{padding:"14px 32px",background:CY,color:"#fff",border:"none",borderRadius:12,fontSize:15,fontWeight:600,cursor:"pointer"}}>Accéder au dashboard</button>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:1,borderRadius:16,overflow:"hidden",background:NM}}>
            {[{v:"6+",l:"Années"},{v:"30+",l:"Techniciens"},{v:"5",l:"Mandataires"},{v:"10K+",l:"Interventions"}].map((c,i)=>(
              <div key={i} style={{padding:"28px 20px",background:NL,textAlign:"center"}}>
                <div style={{fontSize:34,fontWeight:800,color:CY}}>{c.v}</div>
                <div style={{fontSize:12,color:G3,marginTop:4}}>{c.l}</div>
              </div>
            ))}
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:20,marginTop:60}}>
            {[{i:"📡",t:"Télécoms",d:"Fibre, cuivre, xDSL",c:CY},{i:"⚡",t:"Bornes IRVE",d:"7kW, 22kW, maintenance",c:GR},{i:"🔧",t:"Services",d:"Audit, déploiement, support",c:OR}].map((s,j)=>(
              <div key={j} style={{background:NL,borderRadius:16,padding:28,border:`1px solid ${NM}`,textAlign:"left"}}>
                <div style={{fontSize:28,marginBottom:12}}>{s.i}</div>
                <div style={{fontSize:18,fontWeight:700,marginBottom:4}}>{s.t}</div>
                <div style={{fontSize:13,color:G3}}>{s.d}</div>
              </div>
            ))}
          </div>
          <div style={{marginTop:60,fontSize:14,color:G3}}>📍 72 av. de Nice, 13120 Gardanne · 📞 04 844 96 700 · ✉️ contact@synexis.fr</div>
        </div>
      </div>
    </div>
  );

  // ── LOGIN ──
  if (pg === "login") return (
    <div style={{fontFamily:"'Segoe UI',system-ui,sans-serif",color:"#fff",background:N,minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center"}}>
      <div style={{width:420}}>
        <div style={{marginBottom:24}}><span onClick={()=>setPg("site")} style={{fontSize:13,color:G4,cursor:"pointer"}}>← Retour</span></div>
        <div style={{background:NL,border:`1px solid ${NM}`,borderRadius:20,padding:36}}>
          <div style={{textAlign:"center",marginBottom:28}}>
            <div style={{width:48,height:48,borderRadius:12,background:CY,display:"inline-flex",alignItems:"center",justifyContent:"center",fontWeight:800,fontSize:20}}>S</div>
            <div style={{fontSize:24,fontWeight:800,marginTop:10}}>SYNEXIS</div>
            <div style={{fontSize:13,color:G3,marginTop:4}}>Espace de gestion</div>
          </div>
          <label style={{fontSize:11,fontWeight:600,color:G3,display:"block",marginBottom:6}}>EMAIL</label>
          <input value={em} onChange={e=>setEm(e.target.value)} onKeyDown={e=>e.key==="Enter"&&doLogin()} placeholder="admin@synexis.fr" style={{width:"100%",padding:"12px 16px",background:NM,border:`1px solid ${NM}`,borderRadius:10,color:"#fff",fontSize:14,outline:"none",marginBottom:14,boxSizing:"border-box"}}/>
          <label style={{fontSize:11,fontWeight:600,color:G3,display:"block",marginBottom:6}}>MOT DE PASSE</label>
          <input type="password" value={pw} onChange={e=>setPw(e.target.value)} onKeyDown={e=>e.key==="Enter"&&doLogin()} placeholder="••••••••" style={{width:"100%",padding:"12px 16px",background:NM,border:`1px solid ${NM}`,borderRadius:10,color:"#fff",fontSize:14,outline:"none",marginBottom:20,boxSizing:"border-box"}}/>
          {err && <div style={{background:RD+"15",borderRadius:8,padding:"8px 12px",marginBottom:14,fontSize:12,color:RD}}>{err}</div>}
          <button onClick={doLogin} style={{width:"100%",padding:"14px",background:CY,color:"#fff",border:"none",borderRadius:12,fontSize:15,fontWeight:600,cursor:"pointer"}}>Se connecter →</button>
        </div>
      </div>
    </div>
  );

  // ── DASHBOARD ──
  const tabs = [{id:"ca",l:"📊 Chiffrage CA"},{id:"pen",l:"⚠️ Pénalités"},{id:"stk",l:"📦 Stock"},{id:"flt",l:"🚐 Flotte"}];

  return (
    <div style={{fontFamily:"'Segoe UI',system-ui,sans-serif",color:"#fff",background:N,minHeight:"100vh"}}>
      {/* Header */}
      <div style={{background:NL,borderBottom:`1px solid ${NM}`,padding:"10px 24px",display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:100}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:28,height:28,borderRadius:7,background:CY,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,fontSize:12}}>S</div>
          <div><div style={{fontSize:16,fontWeight:700}}>SYNEXIS</div><div style={{fontSize:9,color:G4,letterSpacing:2}}>DASHBOARD</div></div>
        </div>
        <div style={{display:"flex",gap:8}}>
          <div style={{background:NM,padding:"6px 12px",borderRadius:8,fontSize:11,color:G2}}>📅 Déc 2024 · Circet</div>
          <button onClick={()=>setPg("site")} style={{background:"none",border:`1px solid ${NM}`,borderRadius:8,padding:"6px 12px",fontSize:11,color:G3,cursor:"pointer"}}>← Site</button>
          <button onClick={()=>{setPg("site");setEm("");setPw("")}} style={{background:RD+"15",border:`1px solid ${RD}30`,borderRadius:8,padding:"6px 12px",fontSize:11,color:RD,cursor:"pointer"}}>Déco</button>
        </div>
      </div>

      <div style={{display:"flex",minHeight:"calc(100vh - 50px)"}}>
        {/* Sidebar */}
        <div style={{width:200,background:NL,borderRight:`1px solid ${NM}`,padding:"16px 8px",flexShrink:0}}>
          <div style={{fontSize:9,color:G4,letterSpacing:2,padding:"6px 10px",marginBottom:4}}>MODULES</div>
          {tabs.map(t=>(
            <button key={t.id} onClick={()=>{setTab(t.id);setSel(null)}} style={{display:"block",width:"100%",padding:"10px 12px",borderRadius:8,border:"none",cursor:"pointer",fontSize:12,fontWeight:tab===t.id?600:400,color:tab===t.id?"#fff":G3,background:tab===t.id?CY+"15":"transparent",borderLeft:tab===t.id?`3px solid ${CY}`:"3px solid transparent",textAlign:"left",fontFamily:"inherit",marginBottom:2}}>{t.l}</button>
          ))}
          <div style={{marginTop:"auto",background:CY+"10",borderRadius:10,padding:12,marginTop:20}}>
            <div style={{fontSize:10,fontWeight:600,color:CY}}>{techs.length} techs</div>
            <div style={{fontSize:9,color:G3}}>GTK: {techs.filter(t=>t.s==="GTK").length} · Mycall: {techs.filter(t=>t.s==="Mycall").length}</div>
          </div>
        </div>

        {/* Content */}
        <div style={{flex:1,padding:"20px 24px",overflowY:"auto"}}>

          {/* ═══ CA ═══ */}
          {tab === "ca" && (
            <div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:16,flexWrap:"wrap",gap:10}}>
                <div><h2 style={{margin:0,fontSize:20}}>Chiffrage CA</h2><p style={{color:G3,fontSize:12,margin:"4px 0 0"}}>Circet · Décembre 2024</p></div>
                <div style={{display:"flex",gap:3,flexWrap:"wrap"}}>
                  {["Tous","fibre","cuivre"].map(x=>(
                    <button key={x} onClick={()=>{setFT(x);setSel(null)}} style={{padding:"5px 10px",borderRadius:7,border:fT===x?`1px solid ${CY}`:`1px solid ${NM}`,background:fT===x?CY+"18":NL,color:fT===x?CY:G3,fontSize:10,cursor:"pointer"}}>{x==="Tous"?"Tous":x==="fibre"?"📡 Fibre":"🔌 Cuivre"}</button>
                  ))}
                  <div style={{width:1,background:NM,margin:"0 2px"}}/>
                  {["Tous","GTK","Mycall"].map(x=>(
                    <button key={x} onClick={()=>{setFS(x);setSel(null)}} style={{padding:"5px 10px",borderRadius:7,border:fS===x?`1px solid ${x==="Mycall"?PU:CY}`:`1px solid ${NM}`,background:fS===x?(x==="Mycall"?PU:CY)+"18":NL,color:fS===x?(x==="Mycall"?PU:CY):G3,fontSize:10,cursor:"pointer"}}>{x}</button>
                  ))}
                </div>
              </div>

              {/* Commission sliders */}
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:16}}>
                {[{l:"Commission GTK",v:pG,set:setPG,c:CY,sub:techs.filter(x=>x.s==="GTK").length+" techs"},
                  {l:"Commission Mycall",v:pM,set:setPM,c:PU,sub:"Houacine · El Haboub · Massil"}
                ].map((r,i)=>(
                  <div key={i} style={{background:NL,border:`1px solid ${r.c}25`,borderRadius:10,padding:"12px 16px"}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                      <div><div style={{fontSize:11,fontWeight:600,color:r.c}}>{r.l}</div><div style={{fontSize:9,color:G4}}>{r.sub}</div></div>
                      <span style={{fontSize:20,fontWeight:800,color:r.c}}>{r.v}%</span>
                    </div>
                    <input type="range" min={0} max={40} value={r.v} onChange={e=>r.set(+e.target.value)} style={{width:"100%",accentColor:r.c,cursor:"pointer"}}/>
                  </div>
                ))}
              </div>

              {/* Stats */}
              <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,marginBottom:16}}>
                <SC icon="💰" label="CA BRUT" value={f(tot.ca)} sub={tot.nb+" interv."}/>
                <SC icon="🏢" label="COMMISSION" value={f(tot.com)} sub="Marge" color={GR}/>
                <SC icon="⚠️" label="M-VALUES" value={f(tot.mvt)} color={tot.mvt>0?RD:G4}/>
                <SC icon="📤" label="À PAYER" value={f(tot.pay)} sub="Aux techs" color={OR}/>
              </div>

              {/* Table */}
              <div style={{background:NL,borderRadius:14,overflow:"hidden",border:`1px solid ${NM}`}}>
                <table style={{width:"100%",borderCollapse:"collapse"}}>
                  <thead><tr style={{borderBottom:`1px solid ${NM}`}}>
                    {["Tech","Société","Type","Nb","CA Brut","%","Com.","MV","À payer",""].map(h=>(
                      <th key={h} style={{padding:"10px 8px",textAlign:["Tech","Société","Type"].includes(h)?"left":"right",fontSize:9,fontWeight:600,color:G4,textTransform:"uppercase"}}>{h}</th>
                    ))}
                  </tr></thead>
                  <tbody>
                    {fl.map(t => {
                      const c = calc(t);
                      const open = sel === t.id;
                      const mvl = mv[t.id] || [];
                      return (
                        <tr key={t.id} onClick={() => setSel(open ? null : t.id)} style={{borderBottom:`1px solid ${NM}40`,background:open?CY+"08":"transparent",cursor:"pointer"}}>
                          <td style={{padding:"8px"}}>
                            <div style={{display:"flex",alignItems:"center",gap:6}}>
                              <div style={{width:26,height:26,borderRadius:"50%",background:sc(t.s)+"20",display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:600,color:sc(t.s)}}>{t.n.split(" ").map(x=>x[0]).join("")}</div>
                              <span style={{fontSize:12,fontWeight:600}}>{t.n}</span>
                            </div>
                          </td>
                          <td style={{padding:"8px"}}><Bd c={sc(t.s)} bg={t.s==="Mycall"?"#2d1650":undefined}>{t.s}</Bd></td>
                          <td style={{padding:"8px"}}><Bd c={t.t==="fibre"?CY:OR}>{t.t==="fibre"?"Fibre":"Cuivre"}</Bd></td>
                          <td style={{padding:"8px",textAlign:"right",fontSize:12,color:G2}}>{t.nc+t.nf}</td>
                          <td style={{padding:"8px",textAlign:"right",fontWeight:600,fontSize:12}}>{f(c.ca)}</td>
                          <td style={{padding:"8px",textAlign:"right",fontSize:11,color:G3}}>{c.p}%</td>
                          <td style={{padding:"8px",textAlign:"right",fontSize:12,color:GR}}>-{f(c.com)}</td>
                          <td style={{padding:"8px",textAlign:"right",fontSize:12,color:c.mvt>0?RD:G4}}>{c.mvt>0?"-"+f(c.mvt):"—"}</td>
                          <td style={{padding:"8px",textAlign:"right"}}><span style={{fontWeight:700,fontSize:13,color:OR}}>{f(c.pay)}</span></td>
                          <td style={{padding:"8px",textAlign:"center",fontSize:10,color:G4}}>{open?"▲":"▼"}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot><tr style={{borderTop:`2px solid ${CY}40`}}>
                    <td colSpan={3} style={{padding:"10px 8px",fontWeight:700,fontSize:11,color:CY}}>TOTAL ({fl.length})</td>
                    <td style={{padding:"10px 8px",textAlign:"right",fontSize:11,fontWeight:600}}>{tot.nb}</td>
                    <td style={{padding:"10px 8px",textAlign:"right",fontWeight:700,fontSize:12}}>{f(tot.ca)}</td>
                    <td/>
                    <td style={{padding:"10px 8px",textAlign:"right",fontSize:11,color:GR}}>-{f(tot.com)}</td>
                    <td style={{padding:"10px 8px",textAlign:"right",fontSize:11,color:tot.mvt>0?RD:G4}}>{tot.mvt>0?"-"+f(tot.mvt):"—"}</td>
                    <td style={{padding:"10px 8px",textAlign:"right",fontWeight:700,fontSize:13,color:OR}}>{f(tot.pay)}</td>
                    <td/>
                  </tr></tfoot>
                </table>
              </div>

              {/* Detail panel below table */}
              {sel && (() => {
                const t = techs.find(x => x.id === sel);
                if (!t) return null;
                const c = calc(t);
                const mvl = mv[t.id] || [];
                return (
                  <div style={{background:NL,borderRadius:14,border:`1px solid ${CY}30`,padding:20,marginTop:12}}>
                    <div style={{fontSize:14,fontWeight:700,marginBottom:14}}>{t.n} <Bd c={sc(t.s)}>{t.s}</Bd></div>
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:20}}>
                      {/* Ventilation */}
                      <div>
                        <div style={{fontSize:10,color:G4,textTransform:"uppercase",marginBottom:8}}>Ventilation</div>
                        {t.cf>0 && <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}><span style={{fontSize:11,color:G2}}>CA Fibre</span><span style={{fontSize:11,fontWeight:600,color:CY}}>{f(t.cf)}</span></div>}
                        {t.cc>0 && <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}><span style={{fontSize:11,color:G2}}>CA Cuivre</span><span style={{fontSize:11,fontWeight:600,color:OR}}>{f(t.cc)}</span></div>}
                        {t.m>0 && <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}><span style={{fontSize:11,color:G2}}>Matériel</span><span style={{fontSize:11,color:G3}}>{f(t.m)}</span></div>}
                        <div style={{borderTop:`1px solid ${NM}`,marginTop:6,paddingTop:6}}>
                          <div style={{display:"flex",justifyContent:"space-between"}}><span style={{fontSize:11,fontWeight:600}}>CA Brut</span><span style={{fontSize:12,fontWeight:700}}>{f(c.ca)}</span></div>
                          <div style={{display:"flex",justifyContent:"space-between",marginTop:2}}><span style={{fontSize:11,color:GR}}>Commission {c.p}%</span><span style={{fontSize:11,color:GR}}>-{f(c.com)}</span></div>
                          {c.mvt>0 && <div style={{display:"flex",justifyContent:"space-between",marginTop:2}}><span style={{fontSize:11,color:RD}}>Moins-values</span><span style={{fontSize:11,color:RD}}>-{f(c.mvt)}</span></div>}
                        </div>
                        <div style={{borderTop:`1px solid ${CY}30`,marginTop:6,paddingTop:6,display:"flex",justifyContent:"space-between"}}>
                          <span style={{fontSize:13,fontWeight:700,color:OR}}>À PAYER</span>
                          <span style={{fontSize:15,fontWeight:800,color:OR}}>{f(c.pay)}</span>
                        </div>
                      </div>
                      {/* Donut */}
                      <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
                        <div style={{width:110,height:110,borderRadius:"50%",background:`conic-gradient(${GR} 0% ${c.margP.toFixed(0)}%, ${NM} ${c.margP.toFixed(0)}% 100%)`,display:"flex",alignItems:"center",justifyContent:"center"}}>
                          <div style={{width:80,height:80,borderRadius:"50%",background:NL,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
                            <div style={{fontSize:8,color:G4}}>MARGE</div>
                            <div style={{fontSize:18,fontWeight:800,color:GR}}>{c.margP.toFixed(1)}%</div>
                          </div>
                        </div>
                      </div>
                      {/* Moins-values */}
                      <div>
                        <div style={{fontSize:10,color:G4,textTransform:"uppercase",marginBottom:8}}>Moins-values</div>
                        {mvl.length===0 && <div style={{fontSize:11,color:G4,fontStyle:"italic"}}>Aucune</div>}
                        {mvl.map(x=>(
                          <div key={x.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4,padding:"4px 8px",background:RD+"08",borderRadius:6}}>
                            <div><div style={{fontSize:10,color:G2}}>{x.mo}</div><div style={{fontSize:11,fontWeight:600,color:RD}}>-{f(x.mt)}</div></div>
                            <button onClick={()=>rmMv(t.id,x.id)} style={{background:"none",border:"none",color:G4,cursor:"pointer",fontSize:13}}>✕</button>
                          </div>
                        ))}
                        {eM===t.id ? (
                          <div style={{marginTop:6}}>
                            <input placeholder="Motif" value={mO} onChange={e=>setMO(e.target.value)} style={{width:"100%",padding:"6px 10px",fontSize:12,background:N,border:`1px solid ${NM}`,borderRadius:6,color:"#fff",outline:"none",marginBottom:4,boxSizing:"border-box"}}/>
                            <div style={{display:"flex",gap:4}}>
                              <input type="number" placeholder="€" value={mI} onChange={e=>setMI(e.target.value)} onKeyDown={e=>e.key==="Enter"&&addMv(t.id)} style={{flex:1,padding:"6px 10px",fontSize:12,background:N,border:`1px solid ${NM}`,borderRadius:6,color:"#fff",outline:"none",boxSizing:"border-box"}}/>
                              <button onClick={()=>addMv(t.id)} style={{padding:"6px 10px",background:RD,border:"none",borderRadius:6,color:"#fff",fontSize:10,fontWeight:600,cursor:"pointer"}}>OK</button>
                            </div>
                            <button onClick={()=>setEM(null)} style={{background:"none",border:"none",color:G4,cursor:"pointer",fontSize:10,marginTop:4}}>Annuler</button>
                          </div>
                        ) : (
                          <button onClick={()=>setEM(t.id)} style={{marginTop:6,padding:"6px 10px",background:RD+"10",border:`1px dashed ${RD}40`,borderRadius:6,color:RD,fontSize:10,cursor:"pointer",width:"100%"}}>+ Moins-value</button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })()}

              <div style={{marginTop:12,fontSize:10,color:G4}}>💡 À payer = CA Brut − Commission% − Moins-values</div>
            </div>
          )}

          {/* ═══ PÉNALITÉS ═══ */}
          {tab === "pen" && (
            <div>
              <h2 style={{margin:"0 0 16px",fontSize:20}}>Pénalités</h2>
              <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:20}}>
                <SC icon="⚠️" label="TOTAL" value={f(penData.reduce((s,p)=>s+p.mt,0))} sub={penData.length+" pénalités"} color={RD}/>
                <SC icon="📅" label="DÉCEMBRE" value={f(penData.filter(p=>p.mois==="Déc").reduce((s,p)=>s+p.mt,0))} color={OR}/>
                <SC icon="📅" label="NOVEMBRE" value={f(penData.filter(p=>p.mois==="Nov").reduce((s,p)=>s+p.mt,0))} color={G3}/>
              </div>
              <div style={{background:NL,borderRadius:14,overflow:"hidden",border:`1px solid ${NM}`}}>
                <table style={{width:"100%",borderCollapse:"collapse"}}>
                  <thead><tr style={{borderBottom:`1px solid ${NM}`}}>
                    {["Technicien","Motif","Mois","Montant"].map(h=>(
                      <th key={h} style={{padding:"10px 12px",textAlign:h==="Montant"?"right":"left",fontSize:9,fontWeight:600,color:G4,textTransform:"uppercase"}}>{h}</th>
                    ))}
                  </tr></thead>
                  <tbody>{penData.map((p,i)=>(
                    <tr key={i} style={{borderBottom:`1px solid ${NM}40`}}>
                      <td style={{padding:"8px 12px",fontSize:12}}>{p.tech}</td>
                      <td style={{padding:"8px 12px",fontSize:12,color:G3}}>{p.motif}</td>
                      <td style={{padding:"8px 12px"}}><Bd c={p.mois==="Déc"?OR:G3}>{p.mois}</Bd></td>
                      <td style={{padding:"8px 12px",textAlign:"right",fontWeight:600,color:RD}}>-{f(p.mt)}</td>
                    </tr>
                  ))}</tbody>
                </table>
              </div>
            </div>
          )}

          {/* ═══ STOCK ═══ */}
          {tab === "stk" && (
            <div>
              <h2 style={{margin:"0 0 16px",fontSize:20}}>Stock</h2>
              {stk.filter(i=>i.qty<=i.seuil).length > 0 && (
                <div style={{background:RD+"10",border:`1px solid ${RD}30`,borderRadius:10,padding:12,marginBottom:16,fontSize:12,color:RD,fontWeight:600}}>
                  🚨 {stk.filter(i=>i.qty<=i.seuil).length} articles sous le seuil
                </div>
              )}
              <div style={{background:NL,borderRadius:14,overflow:"hidden",border:`1px solid ${NM}`}}>
                <table style={{width:"100%",borderCollapse:"collapse"}}>
                  <thead><tr style={{borderBottom:`1px solid ${NM}`}}>
                    {["Article","Cat.","Qté","Seuil","État"].map(h=>(
                      <th key={h} style={{padding:"10px 12px",textAlign:["Qté","Seuil"].includes(h)?"right":"left",fontSize:9,fontWeight:600,color:G4,textTransform:"uppercase"}}>{h}</th>
                    ))}
                  </tr></thead>
                  <tbody>{stk.map(i=>{
                    const r=i.qty/i.seuil;
                    const col=r<=1?RD:r<=2?OR:GR;
                    return(
                      <tr key={i.id} style={{borderBottom:`1px solid ${NM}40`}}>
                        <td style={{padding:"8px 12px",fontSize:12}}>{i.nom}</td>
                        <td style={{padding:"8px 12px"}}><Bd c={i.cat==="Fibre"?CY:i.cat==="Borne"?OR:G3}>{i.cat}</Bd></td>
                        <td style={{padding:"8px 12px",textAlign:"right",fontSize:13,fontWeight:700,color:col}}>{i.qty}</td>
                        <td style={{padding:"8px 12px",textAlign:"right",fontSize:12,color:G4}}>{i.seuil}</td>
                        <td style={{padding:"8px 12px"}}>{r<=1?<Bd c={RD} bg="#3d1414">Critique</Bd>:r<=2?<Bd c={OR} bg="#3d2e0d">Bas</Bd>:<Bd c={GR} bg="#0d3d2e">OK</Bd>}</td>
                      </tr>
                    );
                  })}</tbody>
                </table>
              </div>
            </div>
          )}

          {/* ═══ FLOTTE ═══ */}
          {tab === "flt" && (
            <div>
              <h2 style={{margin:"0 0 16px",fontSize:20}}>Flotte</h2>
              <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:20}}>
                <SC icon="🚐" label="VÉHICULES" value={vehs.length} sub={f(vehs.reduce((s,v)=>s+v.loyer,0))+"/mois"}/>
                <SC icon="🔧" label="ATTENTION" value={vehs.filter(v=>!v.ok).length} sub="CT proche" color={OR}/>
                <SC icon="📏" label="KM MOYEN" value={Math.round(vehs.reduce((s,v)=>s+v.km,0)/vehs.length).toLocaleString("fr-FR")+" km"} color={G3}/>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12}}>
                {vehs.map(v=>(
                  <div key={v.id} style={{background:NL,borderRadius:14,padding:16,border:`1px solid ${v.ok?NM:OR+"40"}`}}>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
                      <div><div style={{fontSize:14,fontWeight:700}}>{v.im}</div><div style={{fontSize:10,color:G3}}>{v.ty}</div></div>
                      {v.ok?<Bd c={GR} bg="#0d3d2e">OK</Bd>:<Bd c={OR} bg="#3d2e0d">Attention</Bd>}
                    </div>
                    <div style={{borderTop:`1px solid ${NM}`,paddingTop:8}}>
                      {[{l:"Tech",v:v.tech},{l:"Loyer",v:f(v.loyer)+"/mois"},{l:"Km",v:v.km.toLocaleString("fr-FR")},{l:"CT",v:v.ct}].map(r=>(
                        <div key={r.l} style={{display:"flex",justifyContent:"space-between",marginBottom:3}}>
                          <span style={{fontSize:10,color:G4}}>{r.l}</span>
                          <span style={{fontSize:10,color:G2}}>{r.v}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
