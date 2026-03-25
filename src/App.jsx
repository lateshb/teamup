import { useState, useEffect } from "react";

const C = {
  navy:"#102A43", navy2:"#1A3A56", teal:"#0EA5A8", tealDark:"#0C8F92",
  tealLight:"#E0F7F8", amber:"#F59E0B", amberLight:"#FEF3C7",
  coral:"#F97316", coralLight:"#FFF0E8", green:"#22C55E", greenLight:"#DCFCE7",
  red:"#EF4444", dark:"#1F2937", muted:"#64748B", bg:"#F7F9FC",
  white:"#FFFFFF", border:"#DCE3EC", purple:"#8B5CF6",
};

const COMPETITIONS = [
  {id:1,name:"IIM-A Conclave 2025",category:"Strategy",deadline:"Apr 12",teamSize:"3-4",prize:"₹1.5L",spotsLeft:2,posted:"2d ago"},
  {id:2,name:"XLRI Finance Cup",category:"Finance",deadline:"Apr 18",teamSize:"2-3",prize:"₹80K",spotsLeft:1,posted:"5d ago"},
  {id:3,name:"IIM-C Strategy Sprint",category:"Strategy",deadline:"Apr 22",teamSize:"3-4",prize:"₹1L",spotsLeft:3,posted:"1d ago"},
  {id:4,name:"MDI Operations War",category:"Operations",deadline:"Apr 30",teamSize:"4",prize:"₹60K",spotsLeft:4,posted:"3d ago"},
  {id:5,name:"ISB Analytics Cup",category:"Analytics",deadline:"May 5",teamSize:"2-4",prize:"₹2L",spotsLeft:2,posted:"today"},
  {id:6,name:"FMS Marketing Blitz",category:"Marketing",deadline:"May 10",teamSize:"3",prize:"₹50K",spotsLeft:1,posted:"6d ago"},
];

const INIT_STUDENTS = [
  {id:1,name:"Amey",program:"MBA 2025",section:"A",skills:["Finance","Valuation","Financial Modeling"],roles:["Analyst","Strategist"],availability:"Weekends + evenings",repScore:4.8,matchScore:94,verified:true,completedComps:5,bio:"CFA aspirant. Expert in financial modeling and valuation frameworks. Loves solving complex financial cases.",avatar:"AM",color:C.teal,interest:null},
  {id:2,name:"Deepak",program:"MBA 2025",section:"B",skills:["Design","Presentation","UI/UX"],roles:["Designer","Presenter"],availability:"Flexible",repScore:4.6,matchScore:89,verified:true,completedComps:3,bio:"Creative problem-solver with strong design and presentation skills. Brings visual clarity to complex ideas.",avatar:"DK",color:C.amber,interest:null},
  {id:3,name:"Shivam",program:"MBA 2025",section:"A",skills:["Analytics","Python","Data Science"],roles:["Analyst","Researcher"],availability:"Evenings only",repScore:4.5,matchScore:84,verified:true,completedComps:4,bio:"Data enthusiast with strong Python skills. Transforms raw data into actionable insights.",avatar:"SH",color:C.coral,interest:null},
  {id:4,name:"Piyush",program:"MBA 2024",section:"C",skills:["Marketing","Go-to-Market","Brand Strategy"],roles:["Strategist","Presenter"],availability:"Weekends",repScore:4.9,matchScore:91,verified:true,completedComps:8,bio:"Marketing veteran with GTM expertise. Builds brands that resonate with target audiences.",avatar:"PY",color:C.purple,interest:null},
  {id:5,name:"Vikas",program:"MBA 2025",section:"B",skills:["Research","Communication","Slide Design"],roles:["Researcher","Communicator"],availability:"Flexible",repScore:4.4,matchScore:78,verified:true,completedComps:2,bio:"Research-driven analyst who excels at breaking down complex topics. Clear communicator.",avatar:"VK",color:C.green,interest:null},
  {id:6,name:"Anshul",program:"MBA 2025",section:"A",skills:["Operations","Process Optimization","Supply Chain"],roles:["Operator","Strategist"],availability:"Weekends + evenings",repScore:4.7,matchScore:87,verified:true,completedComps:6,bio:"Operations excellence specialist. Expert in process optimization and supply chain management.",avatar:"AS",color:C.teal,interest:null},
  {id:7,name:"Abhishek",program:"MBA 2025",section:"B",skills:["Speaking","Communication","Negotiation"],roles:["Presenter","Communicator"],availability:"Flexible",repScore:4.5,matchScore:82,verified:true,completedComps:4,bio:"Outstanding speaker and communicator. Excels at presenting ideas persuasively to stakeholders.",avatar:"AB",color:C.amber,interest:null},
];

const MATCH_REASONS = {
  1:["Finance expertise — complements your operations focus","Both prefer weekends + evenings","High reputation score (4.8)","Same section — easy coordination"],
  2:["Design & presentation skills bring visual clarity","Flexible schedule matches yours","Strong design background adds professional polish","Verified track record in 3 competitions"],
  3:["Analytics depth fills your skill gap","Evening availability aligns","Python/data science skills strengthen quantitative analysis","Low free-rider risk based on past feedback"],
  4:["Marketing & GTM strategy rounds out the team","Senior — brings mentor-like perspective","Extensive marketing case experience","8 completed comps = battle-tested"],
  5:["Research + communication covers analysis & messaging","Flexible availability — lowest scheduling risk","High communicator score from past teammates","Complements your operational strength"],
  6:["Operations synergy — both understand process flow","Weekends + evenings preference aligns","Strong operations background complements yours","6 completed competitions together"],
  7:["Speaking & communication delivers your ideas","Flexible availability — perfect for scheduling","Excellent negotiation & presentation skills","4 successful competitions on record"],
};

const INIT_NOTIFS = [
  {id:1,type:"match",msg:"New match: Amey (94%) for IIM-A Conclave",time:"2m ago",read:false},
  {id:2,type:"interest",msg:"Piyush expressed interest in your open slot",time:"1h ago",read:false},
  {id:3,type:"deadline",msg:"XLRI Finance Cup deadline in 3 days — team incomplete",time:"3h ago",read:true},
  {id:4,type:"feedback",msg:"Feedback received from ISB Analytics Cup teammate",time:"1d ago",read:true},
];

const TEAM = [
  {name:"Amey",role:"Finance Lead",avatar:"AM",color:C.teal,tasks:4,done:3},
  {name:"Deepak",role:"Design & Presentation",avatar:"DK",color:C.amber,tasks:3,done:2},
  {name:"Latesh Bayad",role:"Ops Lead",avatar:"LS",color:C.navy,tasks:3,done:1},
];

const ME = {name:"Latesh Bayad",program:"MBA 2025",section:"A",skills:["Operations","Strategy","Quantitative Analysis"],roles:["Analyst","Strategist"],repScore:4.2,completedComps:1,bio:"IIM-L student. Supply chain & ops background. Looking to build on case comp experience.",avatar:"LS",color:C.navy,verified:true,availability:"Weekends + evenings"};

const TT = {
  match:"Match score = skill complementarity (40%) + schedule overlap (25%) + reputation (20%) + role balance (15%). Rules-based, fully transparent — no black-box AI.",
  rep:"Average of post-competition peer ratings across: reliability, communication, workload-sharing, and meeting deadlines. Requires at least 2 competitions.",
  verified:"This student logged in with their IIM Lucknow institute email (@iiml.ac.in). Skills are self-declared but get flagged if inconsistent with peer feedback.",
  mutual:"You can express interest privately. The other student is only notified if BOTH of you are interested — no awkward one-sided rejections.",
  health:"Computed from task completion rate + last activity + self-reported blockers. Green = on track, Amber = at risk, Red = needs attention.",
  avail:"Availability is self-declared during profile setup. Teams where <50% of members share common slots get a coordination-risk warning.",
};

// ── Primitives ─────────────────────────────────────────────────────
function Tip({text,children}) {
  const [s,setS]=useState(false);
  return (
    <span style={{position:"relative",display:"inline-flex",alignItems:"center"}} onMouseEnter={()=>setS(true)} onMouseLeave={()=>setS(false)}>
      {children}
      {s&&<span style={{position:"absolute",bottom:"calc(100% + 8px)",left:"50%",transform:"translateX(-50%)",width:230,background:C.navy,color:"#fff",fontSize:11,lineHeight:1.5,padding:"8px 10px",borderRadius:8,zIndex:9999,boxShadow:"0 4px 20px rgba(0,0,0,.25)",pointerEvents:"none",whiteSpace:"normal",textAlign:"left"}}>
        <span style={{display:"block",marginBottom:3,color:C.teal,fontWeight:700,fontSize:10}}>ℹ WHY THIS?</span>{text}
        <span style={{position:"absolute",top:"100%",left:"50%",transform:"translateX(-50%)",borderWidth:6,borderStyle:"solid",borderColor:`transparent transparent ${C.navy} transparent`,rotate:"180deg"}}/>
      </span>}
    </span>
  );
}
function IIcon({tip}){return <Tip text={tip}><span style={{display:"inline-flex",alignItems:"center",justifyContent:"center",width:16,height:16,borderRadius:"50%",background:C.tealLight,color:C.teal,fontSize:10,fontWeight:800,cursor:"help",marginLeft:4,flexShrink:0}}>?</span></Tip>;}
function Av({init,color,size=36,ring=false}){return <div style={{width:size,height:size,borderRadius:"50%",background:`linear-gradient(135deg,${color},${color}99)`,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:800,fontSize:size*.33,flexShrink:0,boxShadow:ring?`0 0 0 3px #fff,0 0 0 5px ${color}`:`0 2px 8px ${color}44`}}>{init}</div>;}
function Bdg({label,color,size="sm"}){return <span style={{display:"inline-block",padding:size==="sm"?"2px 8px":"4px 12px",borderRadius:20,background:`${color}20`,color,fontSize:size==="sm"?11:13,fontWeight:700,whiteSpace:"nowrap"}}>{label}</span>;}
function Bar({value,color=C.teal,h=6}){const[w,setW]=useState(0);useEffect(()=>{const t=setTimeout(()=>setW(value),100);return()=>clearTimeout(t);},[value]);return <div style={{width:"100%",height:h,borderRadius:h,background:"#E8EDF2",overflow:"hidden"}}><div style={{width:`${w}%`,height:"100%",background:color,borderRadius:h,transition:"width .9s cubic-bezier(.4,0,.2,1)"}}/></div>;}
function Stars({v}){return <span style={{color:C.amber,fontSize:13}}>{"★".repeat(Math.round(v))}{"☆".repeat(5-Math.round(v))}</span>;}
function Counter({val}){const[d,setD]=useState(0);useEffect(()=>{let n=0,e=parseFloat(val),st=e/62,ti=setInterval(()=>{n=Math.min(n+st,e);setD(String(val).includes(".")?n.toFixed(1):Math.floor(n));if(n>=e)clearInterval(ti);},16);return()=>clearInterval(ti);},[val]);return <>{d}</>;}

export default function App() {
  const [page,setPage]=useState("dashboard");
  const [students,setStudents]=useState(INIT_STUDENTS);
  const [notifs,setNotifs]=useState(INIT_NOTIFS);
  const [showN,setShowN]=useState(false);
  const [toast,setToast]=useState(null);
  const [loading,setLoading]=useState(true);
  const [search,setSearch]=useState("");
  const [fRole,setFRole]=useState("All");
  const [fAvail,setFAvail]=useState("All");
  const [modal,setModal]=useState(null); // {type, data}
  const [fbScores,setFbScores]=useState({reliability:0,communication:0,workload:0,deadline:0});
  const [fbNote,setFbNote]=useState("");
  const [showOnb,setShowOnb]=useState(false);
  const [sidebarOpen,setSidebarOpen]=useState(true);
  const [isMobile,setIsMobile]=useState(window.innerWidth<768);

  useEffect(()=>{setTimeout(()=>setLoading(false),1000);},[]);

  useEffect(()=>{
    const handleResize=()=>setIsMobile(window.innerWidth<768);
    window.addEventListener("resize",handleResize);
    return ()=>window.removeEventListener("resize",handleResize);
  },[]);

  useEffect(()=>{
    if(isMobile) setSidebarOpen(false);
  },[isMobile]);

  const toast_=(msg,type="success")=>{setToast({msg,type});setTimeout(()=>setToast(null),3500);};
  const unread=notifs.filter(n=>!n.read).length;

  const sendInterest=(id)=>{
    setStudents(p=>p.map(s=>s.id===id?{...s,interest:s.interest==="sent"?null:"sent"}:s));
    const s=students.find(s=>s.id===id);
    if(!s.interest){toast_(`Interest sent to ${s.name}! Mutual-only — they'll only know if they also like you.`,"success");setNotifs(p=>[{id:Date.now(),type:"match",msg:`You expressed interest in ${s.name}`,time:"just now",read:false},...p]);}
    else toast_(`Interest withdrawn from ${s.name}.`,"info");
  };

  const filtered=students.filter(s=>{
    const q=search.toLowerCase();
    return (!q||s.name.toLowerCase().includes(q)||s.skills.some(sk=>sk.toLowerCase().includes(q))||s.roles.some(r=>r.toLowerCase().includes(q)))
      &&(fRole==="All"||s.roles.includes(fRole))
      &&(fAvail==="All"||s.availability.toLowerCase().includes(fAvail.toLowerCase()));
  });

  const NAV=[
    {k:"dashboard",i:"⊞",l:"Dashboard"},{k:"browse",i:"⊙",l:"Browse"},
    {k:"matches",i:"⟺",l:"Matches"},{k:"myteam",i:"◎",l:"My Team"},
    {k:"competitions",i:"◈",l:"Competitions"},{k:"profile",i:"◉",l:"Profile"},
    {k:"flowmap",i:"⊕",l:"Flow Map"},{k:"prd",i:"≡",l:"PRD / Docs"},
  ];

  return (
    <div style={{display:"flex",height:"100vh",fontFamily:"'Segoe UI',system-ui,sans-serif",background:C.bg,overflow:"hidden"}}>
      <style>{`
        *{box-sizing:border-box;margin:0;padding:0}
        ::-webkit-scrollbar{width:4px;height:4px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:#C4D0DC;border-radius:4px}
        @keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        @keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}
        @keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.2)}}
        @keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}
        @keyframes slideRight{from{transform:translateX(110%)}to{transform:translateX(0)}}
        @keyframes matchGlow{0%,100%{box-shadow:0 0 0 0 rgba(14,165,168,.4)}70%{box-shadow:0 0 0 8px rgba(14,165,168,0)}}
        @media (max-width:767px){
          .sidebar{position:fixed;left:0;top:0;bottom:0;z-index:999;transform:translateX(-100%);transition:transform .3s ease}
          .sidebar.open{transform:translateX(0)}
          .sidebar-overlay{position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:998;display:none}
          .sidebar-overlay.open{display:block}
          .main-content{width:100%}
          .hamburger-btn{display:flex;gap:6px;flex-direction:column;cursor:pointer;background:none;border:none;padding:8px;font-size:20px}
          .hamburger-btn span{width:24px;height:2px;background:${C.navy};transition:all .3s}
        }
        @media (min-width:768px){
          .hamburger-btn{display:none}
          .sidebar-overlay{display:none!important}
          .sidebar{transform:translateX(0)!important}
        }
        .nav-item{cursor:pointer;border-radius:10px;transition:all .2s;padding:9px 12px;display:flex;align-items:center;gap:9px;color:#8BAAC5;font-size:13px;font-weight:500}
        .nav-item:hover{background:rgba(255,255,255,.08);color:#fff}
        .nav-item.active{background:rgba(14,165,168,.18);color:${C.teal};font-weight:700}
        .card{background:#fff;border-radius:14px;border:1px solid ${C.border};box-shadow:0 2px 12px rgba(16,42,67,.06);transition:box-shadow .2s}
        .card:hover{box-shadow:0 4px 24px rgba(16,42,67,.1)}
        .btn{border:none;cursor:pointer;font-family:inherit;font-weight:600;border-radius:8px;transition:all .18s;display:inline-flex;align-items:center;gap:6px}
        .btn:active{transform:scale(.97)}
        .bp{background:${C.teal};color:#fff;padding:9px 18px;font-size:13px}.bp:hover{background:${C.tealDark||"#0C8F92"};box-shadow:0 4px 12px ${C.teal}44}
        .bo{background:transparent;color:${C.teal};border:1.5px solid ${C.teal};padding:8px 16px;font-size:12.5px}.bo:hover{background:${C.tealLight}}
        .bg{background:transparent;color:${C.muted};padding:8px 14px;font-size:12.5px}.bg:hover{background:${C.bg};color:${C.dark}}
        .inp{width:100%;padding:9px 13px;border:1.5px solid ${C.border};border-radius:9px;font-family:inherit;font-size:13.5px;color:${C.dark};background:#fff;outline:none;transition:border .18s}
        .inp:focus{border-color:${C.teal};box-shadow:0 0 0 3px ${C.teal}18}
        .inp::placeholder{color:#A8B8C8}
        .sel{padding:8px 12px;border:1.5px solid ${C.border};border-radius:9px;font-family:inherit;font-size:12.5px;color:${C.dark};background:#fff;outline:none;cursor:pointer}
        .tab{padding:7px 16px;border-radius:8px;cursor:pointer;font-size:13px;font-weight:600;transition:all .18s;border:none;background:transparent;font-family:inherit}
        .tab.on{background:${C.teal};color:#fff}
        .tab:not(.on){color:${C.muted}}.tab:not(.on):hover{background:${C.tealLight};color:${C.teal}}
        .sc{cursor:pointer;transition:transform .15s,box-shadow .2s}.sc:hover{transform:translateY(-2px);box-shadow:0 8px 28px rgba(16,42,67,.12)!important}
        .sstar{background:none;border:none;cursor:pointer;font-size:26px;transition:transform .15s;padding:2px}.sstar:hover{transform:scale(1.2)}
        .ov{position:fixed;inset:0;background:rgba(16,42,67,.5);backdrop-filter:blur(3px);z-index:1000;display:flex;align-items:center;justify-content:center;animation:fadeUp .2s}
        .mbox{background:#fff;border-radius:18px;padding:26px;width:90%;max-width:500px;box-shadow:0 20px 60px rgba(16,42,67,.25);animation:fadeUp .25s;max-height:88vh;overflow-y:auto}
        .enter{animation:fadeUp .3s}
        @media (max-width:640px){
          .mbox{width:95%;max-width:calc(100vw-20px);padding:18px}
          .inp{font-size:16px}
        }
      `}</style>

      {/* SIDEBAR OVERLAY FOR MOBILE */}
      {isMobile && <div className={`sidebar-overlay${sidebarOpen?" open":""}`} onClick={()=>setSidebarOpen(false)}/>}

      {/* SIDEBAR */}
      <aside className={`sidebar${sidebarOpen?" open":""}`} style={{width:212,background:C.navy,display:"flex",flexDirection:"column",padding:"0 10px 14px",flexShrink:0,transition:"transform .3s ease"}}>
        <div style={{padding:"18px 6px 14px",borderBottom:"1px solid rgba(255,255,255,.08)",marginBottom:6}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <div style={{width:36,height:36,borderRadius:10,background:`linear-gradient(135deg,${C.teal},#0C8F92)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:17}}>⟺</div>
            <div>
              <div style={{color:"#fff",fontSize:18,fontWeight:800,lineHeight:1}}>TeamUp</div>
              <div style={{color:C.teal,fontSize:10,fontWeight:700,letterSpacing:1}}>IIM LUCKNOW</div>
            </div>
          </div>
        </div>
        <nav style={{flex:1,overflowY:"auto",display:"flex",flexDirection:"column",gap:2}}>
          {NAV.map(n=>(
            <div key={n.k} className={`nav-item${page===n.k?" active":""}`} onClick={()=>{setPage(n.k);if(isMobile)setSidebarOpen(false);}}>
              <span style={{fontSize:15}}>{n.i}</span><span>{n.l}</span>
            </div>
          ))}
        </nav>
        <div style={{borderTop:"1px solid rgba(255,255,255,.08)",paddingTop:12,marginTop:6}}>
          <div style={{display:"flex",alignItems:"center",gap:8,padding:"6px"}}>
            <Av init={ME.avatar} color={ME.color} size={32}/>
            <div><div style={{color:"#fff",fontSize:12.5,fontWeight:700}}>{ME.name}</div><div style={{color:"#8BAAC5",fontSize:10.5}}>{ME.program}</div></div>
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <div className="main-content" style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
        {/* Topbar */}
        <header style={{height:54,background:"#fff",borderBottom:`1px solid ${C.border}`,display:"flex",alignItems:"center",padding:"0 12px 0 20px",gap:12,flexShrink:0}}>
          {isMobile && <button className="hamburger-btn" onClick={()=>setSidebarOpen(!sidebarOpen)} style={{display:"flex"}}>☰</button>}
          <div style={{flex:1,position:"relative"}}>
            <span style={{position:"absolute",left:11,top:"50%",transform:"translateY(-50%)",color:C.muted,fontSize:14}}>⊙</span>
            <input className="inp" style={{paddingLeft:34,height:36,fontSize:13}} placeholder="Search students by name, skill, or role… try 'Python' or 'Strategist'" value={search} onChange={e=>{setSearch(e.target.value);if(e.target.value)setPage("browse");}}/>
          </div>
          <button className="btn bg" style={{fontSize:12,padding:"6px 12px",whiteSpace:"nowrap"}} onClick={()=>setShowOnb(true)}>👋 Onboarding</button>
          <div style={{position:"relative"}}>
            <button className="btn bg" style={{fontSize:17,padding:"5px 9px",position:"relative"}} onClick={()=>setShowN(p=>!p)}>
              🔔{unread>0&&<span style={{position:"absolute",top:-4,right:-4,width:17,height:17,borderRadius:"50%",background:C.coral,color:"#fff",fontSize:10,fontWeight:800,display:"flex",alignItems:"center",justifyContent:"center",border:"2px solid #fff",animation:"pulse 2s infinite"}}>{unread}</span>}
            </button>
            {showN&&(
              <div className="card" style={{position:"absolute",right:0,top:"calc(100% + 6px)",width:330,zIndex:200,padding:0,overflow:"hidden",maxWidth:"calc(100vw - 20px)"}}>
                <div style={{padding:"12px 16px",borderBottom:`1px solid ${C.border}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <span style={{fontWeight:700,color:C.dark,fontSize:14}}>Notifications</span>
                  <button className="btn bg" style={{fontSize:11,padding:"3px 8px"}} onClick={()=>setNotifs(p=>p.map(n=>({...n,read:true})))}>Mark all read</button>
                </div>
                {notifs.map(n=>(
                  <div key={n.id} style={{padding:"10px 16px",borderBottom:`1px solid ${C.border}`,background:n.read?"#fff":C.tealLight,display:"flex",gap:10,alignItems:"flex-start"}}>
                    <span style={{fontSize:16}}>{n.type==="match"?"⟺":n.type==="interest"?"💌":n.type==="deadline"?"⏰":"⭐"}</span>
                    <div style={{flex:1}}><div style={{fontSize:12.5,color:C.dark,lineHeight:1.4}}>{n.msg}</div><div style={{fontSize:11,color:C.muted,marginTop:2}}>{n.time}</div></div>
                    {!n.read&&<div style={{width:7,height:7,borderRadius:"50%",background:C.teal,flexShrink:0,marginTop:3}}/>}
                  </div>
                ))}
              </div>
            )}
          </div>
        </header>

        <main style={{flex:1,overflowY:"auto",padding:"20px",paddingTop:"12px"}} onClick={()=>showN&&setShowN(false)}>
          {loading?(
            <div style={{display:"flex",flexDirection:"column",gap:16}}>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:12}}>
                {[1,2,3,4].map(i=><div key={i} className="card" style={{padding:20,height:90,background:"linear-gradient(90deg,#e8edf2 25%,#f0f4f7 50%,#e8edf2 75%)",backgroundSize:"200% 100%",animation:"shimmer 1.4s infinite"}}/>)}
              </div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:12}}>
                <div className="card" style={{padding:20,height:220,background:"linear-gradient(90deg,#e8edf2 25%,#f0f4f7 50%,#e8edf2 75%)",backgroundSize:"200% 100%",animation:"shimmer 1.4s infinite"}}/>
                <div className="card" style={{padding:20,height:220,background:"linear-gradient(90deg,#e8edf2 25%,#f0f4f7 50%,#e8edf2 75%)",backgroundSize:"200% 100%",animation:"shimmer 1.4s infinite"}}/>
              </div>
            </div>
          ):(
            <div className="enter">
              {page==="dashboard"&&<Dashboard setPage={setPage} students={students} sendInterest={sendInterest} setModal={setModal}/>}
              {page==="browse"&&<Browse students={filtered} sendInterest={sendInterest} setModal={setModal} search={search} setSearch={setSearch} fRole={fRole} setFRole={setFRole} fAvail={fAvail} setFAvail={setFAvail}/>}
              {page==="matches"&&<Matches students={students} sendInterest={sendInterest} setModal={setModal}/>}
              {page==="myteam"&&<MyTeam team={TEAM} setModal={setModal} toast_={toast_}/>}
              {page==="competitions"&&<Comps competitions={COMPETITIONS} setModal={setModal} toast_={toast_}/>}
              {page==="profile"&&<Profile toast_={toast_}/>}
              {page==="flowmap"&&<FlowMap/>}
              {page==="prd"&&<PRD/>}
            </div>
          )}
        </main>
      </div>

      {/* MODALS */}
      {modal?.type==="student"&&<StudentModal s={modal.data} reasons={MATCH_REASONS[modal.data.id]||[]} onClose={()=>setModal(null)} onInterest={()=>{sendInterest(modal.data.id);setModal(null);}}/>}
      {modal?.type==="comp"&&<CompModal comp={modal.data} onClose={()=>setModal(null)} toast_={toast_}/>}
      {modal?.type==="feedback"&&<FbModal member={modal.data} scores={fbScores} setScores={setFbScores} note={fbNote} setNote={setFbNote} onSubmit={()=>{toast_("Feedback submitted! Reputation score updated.","success");setModal(null);setFbScores({reliability:0,communication:0,workload:0,deadline:0});setFbNote("");}} onClose={()=>setModal(null)}/>}
      {showOnb&&<OnbModal onClose={()=>setShowOnb(false)}/>}

      {/* TOAST */}
      {toast&&<div style={{position:"fixed",bottom:22,right:22,zIndex:9999,background:toast.type==="success"?C.green:toast.type==="info"?C.teal:C.coral,color:"#fff",padding:"12px 18px",borderRadius:12,fontSize:13,fontWeight:600,boxShadow:"0 8px 24px rgba(0,0,0,.2)",maxWidth:340,lineHeight:1.5,animation:"slideRight .3s"}}>
        {toast.type==="success"?"✓ ":toast.type==="info"?"ℹ ":"⚠ "}{toast.msg}
      </div>}
    </div>
  );
}

// ── DASHBOARD ─────────────────────────────────────────────────────
function Dashboard({setPage,students,sendInterest,setModal}) {
  const top=[...students].sort((a,b)=>b.matchScore-a.matchScore).slice(0,3);
  const kpis=[
    {l:"Open Competitions",v:6,c:C.teal,i:"◈",tip:"Active competitions you can browse and join right now."},
    {l:"Your Top Matches",v:students.filter(s=>s.matchScore>80).length,c:C.amber,i:"⟺",tip:TT.match},
    {l:"Pending Actions",v:2,c:C.coral,i:"⏰",tip:"Deadlines approaching + pending interest confirmations."},
    {l:"Your Rep Score",v:"4.2★",c:C.green,i:"◉",tip:TT.rep},
  ];
  return (
    <div style={{display:"flex",flexDirection:"column",gap:18}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:12}}>
        <div>
          <h1 style={{fontSize:24,fontWeight:800,color:C.navy}}>Good morning, Latesh 👋</h1>
          <p style={{color:C.muted,fontSize:13.5,marginTop:4}}>IIM-A Conclave deadline in <strong style={{color:C.coral}}>12 days</strong> — your team has 2 of 4 members filled.</p>
        </div>
        <button className="btn bp" onClick={()=>setPage("browse")} style={{whiteSpace:"nowrap",flexShrink:0}}>+ Find Teammates</button>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:12}}>
        {kpis.map((k,i)=>(
          <div key={i} className="card" style={{padding:"16px 18px",position:"relative",overflow:"hidden"}}>
            <div style={{position:"absolute",right:-6,top:-6,fontSize:52,opacity:.07}}>{k.i}</div>
            <div style={{display:"flex",alignItems:"center",gap:4,marginBottom:6}}>
              <span style={{fontSize:12.5,color:C.muted,fontWeight:600}}>{k.l}</span><IIcon tip={k.tip}/>
            </div>
            <div style={{fontSize:34,fontWeight:800,color:k.c,lineHeight:1}}>
              {typeof k.v==="number"?<Counter val={k.v}/>:k.v}
            </div>
          </div>
        ))}
      </div>

      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:14}}>
        <div className="card" style={{padding:20}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
            <div style={{display:"flex",alignItems:"center",gap:6}}><h3 style={{fontWeight:800,color:C.navy,fontSize:15}}>Top Matches For You</h3><IIcon tip={TT.match}/></div>
            <button className="btn bg" style={{fontSize:12}} onClick={()=>setPage("matches")}>See all →</button>
          </div>
          {top.map(s=>(
            <div key={s.id} className="card sc" style={{padding:"12px 14px",display:"flex",alignItems:"center",gap:12,marginBottom:10,border:`1px solid ${C.border}`}} onClick={()=>setModal({type:"student",data:s})}>
              <Av init={s.avatar} color={s.color} size={40}/>
              <div style={{flex:1,minWidth:0}}>
                <div style={{display:"flex",alignItems:"center",gap:6}}>
                  <span style={{fontWeight:700,color:C.dark,fontSize:13.5}}>{s.name}</span>
                  {s.verified&&<Tip text={TT.verified}><span style={{color:C.teal,fontSize:12,fontWeight:800}}>✓</span></Tip>}
                </div>
                <div style={{fontSize:11.5,color:C.muted,marginTop:1}}>{s.roles.join(" · ")}</div>
                <div style={{marginTop:5}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}>
                    <span style={{fontSize:11,color:C.muted}}>Fit score</span>
                    <span style={{fontSize:11,fontWeight:800,color:C.teal}}>{s.matchScore}%</span>
                  </div>
                  <Bar value={s.matchScore} color={C.teal} h={5}/>
                </div>
              </div>
              <button className="btn bp" style={{fontSize:11.5,padding:"6px 13px",flexShrink:0}} onClick={e=>{e.stopPropagation();sendInterest(s.id);}}>
                {s.interest==="sent"?"✓ Sent":"Connect"}
              </button>
            </div>
          ))}
        </div>

        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          <div className="card" style={{padding:18}}>
            <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:12}}>
              <h3 style={{fontWeight:800,color:C.navy,fontSize:15}}>Team Health</h3><IIcon tip={TT.health}/>
              <span style={{marginLeft:"auto"}}><Bdg label="On Track" color={C.green}/></span>
            </div>
            {TEAM.map((m,i)=>(
              <div key={i} style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
                <Av init={m.avatar} color={m.color} size={28}/>
                <div style={{flex:1}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}>
                    <span style={{fontSize:12,fontWeight:600,color:C.dark}}>{m.name.split(" ")[0]}</span>
                    <span style={{fontSize:11,color:C.muted}}>{m.done}/{m.tasks}</span>
                  </div>
                  <Bar value={(m.done/m.tasks)*100} color={m.done/m.tasks>.6?C.green:C.amber} h={4}/>
                </div>
              </div>
            ))}
          </div>
          <div className="card" style={{padding:18}}>
            <h3 style={{fontWeight:800,color:C.navy,fontSize:15,marginBottom:10}}>Upcoming Deadlines</h3>
            {COMPETITIONS.slice(0,4).map(c=>(
              <div key={c.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"7px 0",borderBottom:`1px solid ${C.border}`}}>
                <div><div style={{fontSize:12.5,fontWeight:600,color:C.dark}}>{c.name}</div><div style={{fontSize:11,color:C.muted}}>{c.category}</div></div>
                <Bdg label={c.deadline} color={C.coral}/>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── BROWSE ────────────────────────────────────────────────────────
function Browse({students,sendInterest,setModal,search,setSearch,fRole,setFRole,fAvail,setFAvail}) {
  return (
    <div style={{display:"flex",flexDirection:"column",gap:16}}>
      <div>
        <h2 style={{fontSize:22,fontWeight:800,color:C.navy}}>Browse Teammates</h2>
        <p style={{color:C.muted,fontSize:13,marginTop:2}}>Showing {students.length} student{students.length!==1?"s":""} · Filter by role and availability</p>
      </div>
      <div style={{display:"flex",gap:10,flexWrap:"wrap",alignItems:"center"}}>
        <div style={{position:"relative",flex:1,minWidth:200}}>
          <span style={{position:"absolute",left:11,top:"50%",transform:"translateY(-50%)",color:C.muted}}>⊙</span>
          <input className="inp" style={{paddingLeft:34,height:38}} placeholder="Search by name, skill, or role… e.g. 'analytics' or 'Priya'" value={search} onChange={e=>setSearch(e.target.value)}/>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:5}}>
          <span style={{fontSize:12.5,color:C.muted,fontWeight:600}}>Role:</span>
          <select className="sel" value={fRole} onChange={e=>setFRole(e.target.value)}>
            {["All","Analyst","Strategist","Researcher","Presenter","Slide Maker"].map(r=><option key={r}>{r}</option>)}
          </select>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:5}}>
          <span style={{fontSize:12.5,color:C.muted,fontWeight:600}}>Availability:</span><IIcon tip={TT.avail}/>
          <select className="sel" value={fAvail} onChange={e=>setFAvail(e.target.value)}>
            {["All","Weekends","Evenings","Flexible"].map(a=><option key={a}>{a}</option>)}
          </select>
        </div>
        {(search||fRole!=="All"||fAvail!=="All")&&<button className="btn bg" style={{fontSize:12}} onClick={()=>{setSearch("");setFRole("All");setFAvail("All");}}>✕ Clear</button>}
      </div>

      <div style={{background:C.amberLight,border:`1px solid ${C.amber}44`,borderRadius:10,padding:"9px 14px",display:"flex",gap:10,alignItems:"center"}}>
        <span>💡</span>
        <span style={{fontSize:13,color:C.dark}}><strong>How matching works:</strong> Scores use skill complementarity (40%) + schedule overlap (25%) + reputation (20%) + role balance (15%). Fully transparent. <IIcon tip={TT.match}/></span>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(270px,1fr))",gap:14}}>
        {students.length===0?(
          <div style={{gridColumn:"1/-1",textAlign:"center",padding:40,color:C.muted}}>
            <div style={{fontSize:40,marginBottom:10}}>⊙</div>
            <div style={{fontSize:16,fontWeight:600}}>No students match your filters</div>
            <div style={{fontSize:13,marginTop:4}}>Try clearing filters or use a broader search term</div>
          </div>
        ):students.map(s=>(
          <div key={s.id} className="card sc" style={{padding:18}} onClick={()=>setModal({type:"student",data:s})}>
            <div style={{display:"flex",gap:10,alignItems:"flex-start",marginBottom:12}}>
              <Av init={s.avatar} color={s.color} size={42}/>
              <div style={{flex:1}}>
                <div style={{display:"flex",alignItems:"center",gap:6,flexWrap:"wrap"}}>
                  <span style={{fontWeight:800,color:C.dark,fontSize:14}}>{s.name}</span>
                  {s.verified&&<Tip text={TT.verified}><span style={{background:C.tealLight,color:C.teal,fontSize:10,fontWeight:800,padding:"1px 6px",borderRadius:20}}>✓ VERIFIED</span></Tip>}
                </div>
                <div style={{fontSize:11.5,color:C.muted,marginTop:2}}>{s.program} · Sec {s.section}</div>
              </div>
            </div>
            <div style={{marginBottom:10}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}>
                <span style={{fontSize:11.5,color:C.muted,display:"flex",alignItems:"center",gap:2}}>Match Score<IIcon tip={TT.match}/></span>
                <span style={{fontSize:13.5,fontWeight:800,color:s.matchScore>85?C.green:s.matchScore>70?C.amber:C.coral}}>{s.matchScore}%</span>
              </div>
              <Bar value={s.matchScore} color={s.matchScore>85?C.green:s.matchScore>70?C.amber:C.coral}/>
            </div>
            <div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:8}}>
              {s.skills.map(sk=><Bdg key={sk} label={sk} color={C.navy}/>)}
            </div>
            <div style={{fontSize:12,color:C.muted,marginBottom:5,display:"flex",alignItems:"center",gap:3}}>⏰ {s.availability}</div>
            <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:14}}>
              <Stars v={s.repScore}/><span style={{fontSize:12,color:C.muted,display:"flex",alignItems:"center"}}>{s.repScore}<IIcon tip={TT.rep}/></span>
              <span style={{fontSize:12,color:C.muted,marginLeft:"auto"}}>{s.completedComps} comps</span>
            </div>
            <div style={{display:"flex",gap:8}}>
              <button className="btn bo" style={{flex:1,justifyContent:"center",fontSize:12}} onClick={e=>{e.stopPropagation();setModal({type:"student",data:s});}}>View Profile</button>
              <button className="btn bp" style={{flex:1,justifyContent:"center",fontSize:12,background:s.interest==="sent"?C.green:C.teal}} onClick={e=>{e.stopPropagation();sendInterest(s.id);}}>
                <Tip text={TT.mutual}>{s.interest==="sent"?"✓ Sent":"Express Interest"}</Tip>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── MATCHES ───────────────────────────────────────────────────────
function Matches({students,sendInterest,setModal}) {
  const sent=students.filter(s=>s.interest==="sent");
  const top=students.filter(s=>s.matchScore>80);
  return (
    <div style={{display:"flex",flexDirection:"column",gap:18}}>
      <h2 style={{fontSize:22,fontWeight:800,color:C.navy}}>Your Matches</h2>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:14}}>
        <div className="card" style={{padding:20}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14}}>
            <h3 style={{fontWeight:800,color:C.navy,fontSize:15}}>Interest Sent</h3><IIcon tip={TT.mutual}/>
            <Bdg label={`${sent.length} pending`} color={C.amber}/>
          </div>
          {sent.length===0?(
            <div style={{textAlign:"center",padding:"28px 0",color:C.muted}}>
              <div style={{fontSize:36}}>💌</div>
              <div style={{marginTop:8,fontSize:13}}>No interest sent yet.<br/>Browse to find teammates.</div>
            </div>
          ):sent.map(s=>(
            <div key={s.id} style={{display:"flex",gap:10,alignItems:"center",padding:"11px 12px",borderRadius:10,background:C.tealLight,marginBottom:8,animation:"matchGlow 2.5s infinite"}}>
              <Av init={s.avatar} color={s.color} size={36}/><div style={{flex:1}}><div style={{fontWeight:700,color:C.dark,fontSize:13.5}}>{s.name}</div><div style={{fontSize:12,color:C.muted}}>{s.roles.join(" · ")}</div></div>
              <Bdg label="Awaiting" color={C.teal}/>
            </div>
          ))}
        </div>
        <div className="card" style={{padding:20}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14}}>
            <h3 style={{fontWeight:800,color:C.navy,fontSize:15}}>High-Fit Students</h3><IIcon tip={TT.match}/>
          </div>
          {top.map(s=>(
            <div key={s.id} style={{display:"flex",gap:10,alignItems:"center",padding:"10px 0",borderBottom:`1px solid ${C.border}`,cursor:"pointer"}} onClick={()=>setModal({type:"student",data:s})}>
              <Av init={s.avatar} color={s.color} size={34}/><div style={{flex:1}}><div style={{fontWeight:700,color:C.dark,fontSize:13}}>{s.name}</div><div style={{fontSize:11.5,color:C.muted}}>{s.matchScore}% match</div></div>
              <button className="btn bp" style={{fontSize:11.5,padding:"5px 12px"}} onClick={e=>{e.stopPropagation();sendInterest(s.id);}}>{s.interest==="sent"?"✓":"Connect"}</button>
            </div>
          ))}
        </div>
      </div>
      <div className="card" style={{padding:20}}>
        <h3 style={{fontWeight:800,color:C.navy,marginBottom:14,display:"flex",alignItems:"center",gap:6,fontSize:15}}>How Match Scores Are Computed<IIcon tip={TT.match}/></h3>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:12}}>
          {[{l:"Skill Complementarity",p:40,c:C.teal,d:"Does this person fill your skill gaps?"},{l:"Schedule Overlap",p:25,c:C.amber,d:"Do your free hours actually align?"},{l:"Reputation Score",p:20,c:C.green,d:"How reliable were they in past comps?"},{l:"Role Balance",p:15,c:C.coral,d:"Does adding them complete the team?"}].map(f=>(
            <div key={f.l} style={{textAlign:"center"}}>
              <div style={{fontSize:28,fontWeight:800,color:f.c}}>{f.p}%</div>
              <div style={{fontSize:13,fontWeight:700,color:C.dark,margin:"5px 0 3px"}}>{f.l}</div>
              <div style={{fontSize:12,color:C.muted}}>{f.d}</div>
            </div>
          ))}
        </div>
        <div style={{marginTop:14,background:C.tealLight,borderRadius:8,padding:"10px 14px",fontSize:13,color:C.dark,lineHeight:1.6}}>
          <strong>Transparency note:</strong> Weights are fixed, visible, and not personalized. You can see why any student was recommended by clicking "View Profile".
        </div>
      </div>
    </div>
  );
}

// ── MY TEAM ───────────────────────────────────────────────────────
function MyTeam({team,setModal,toast_}) {
  const [tab,setTab]=useState("overview");
  const tasks=[
    {id:1,title:"Market sizing for Slide 3",owner:"Ankit Kumar",status:"done",due:"Apr 8"},
    {id:2,title:"Problem statement framing",owner:"Priya Mehta",status:"done",due:"Apr 9"},
    {id:3,title:"Build financial model",owner:"Latesh Bayad",status:"in-progress",due:"Apr 11"},
    {id:4,title:"Draft executive summary",owner:"Priya Mehta",status:"todo",due:"Apr 12"},
    {id:5,title:"Final slide deck assembly",owner:"All",status:"todo",due:"Apr 13"},
  ];
  const health=Math.round(team.reduce((a,m)=>a+(m.done/m.tasks)*100,0)/team.length);
  return (
    <div style={{display:"flex",flexDirection:"column",gap:16}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <h2 style={{fontSize:22,fontWeight:800,color:C.navy}}>My Team — IIM-A Conclave 2025</h2>
        <Bdg label={`${health}% Healthy`} color={health>60?C.green:C.amber} size="md"/>
      </div>
      <div style={{display:"flex",gap:8}}>
        {["overview","tasks","feedback"].map(t=><button key={t} className={`tab${tab===t?" on":""}`} onClick={()=>setTab(t)}>{t.charAt(0).toUpperCase()+t.slice(1)}</button>)}
      </div>
      {tab==="overview"&&(
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:14}}>
          <div className="card" style={{padding:20}}>
            <h3 style={{fontWeight:800,color:C.navy,marginBottom:14,display:"flex",alignItems:"center",gap:6,fontSize:15}}>Team Members<IIcon tip="Roles shown are each member's primary working style. A balanced team needs Analyst + Strategist + Communicator."/></h3>
            {team.map((m,i)=>(
              <div key={i} style={{display:"flex",gap:12,alignItems:"center",padding:"11px 0",borderBottom:i<team.length-1?`1px solid ${C.border}`:"none"}}>
                <Av init={m.avatar} color={m.color} size={40}/>
                <div style={{flex:1}}><div style={{fontWeight:700,color:C.dark}}>{m.name}</div><div style={{fontSize:12.5,color:C.muted}}>{m.role}</div>
                  <div style={{marginTop:6}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}><span style={{fontSize:11,color:C.muted}}>Progress</span><span style={{fontSize:11,fontWeight:700}}>{m.done}/{m.tasks} tasks</span></div><Bar value={(m.done/m.tasks)*100} color={m.done/m.tasks>.6?C.green:C.amber} h={5}/></div>
                </div>
                <button className="btn bg" style={{fontSize:12,padding:"5px 10px"}} onClick={()=>setModal({type:"feedback",data:m})}>Rate</button>
              </div>
            ))}
          </div>
          <div className="card" style={{padding:20}}>
            <h3 style={{fontWeight:800,color:C.navy,marginBottom:14,display:"flex",alignItems:"center",gap:6,fontSize:15}}>Health Indicators<IIcon tip={TT.health}/></h3>
            {[{l:"Task Completion",v:health,c:health>60?C.green:C.amber},{l:"Role Coverage",v:85,c:C.teal},{l:"Schedule Alignment",v:72,c:C.amber},{l:"Communication",v:90,c:C.green}].map(h=>(
              <div key={h.l} style={{marginBottom:12}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}><span style={{fontSize:13,color:C.dark,fontWeight:600}}>{h.l}</span><span style={{fontSize:13,fontWeight:800,color:h.c}}>{h.v}%</span></div>
                <Bar value={h.v} color={h.c} h={7}/>
              </div>
            ))}
            <div style={{background:C.greenLight,borderRadius:8,padding:"9px 12px",fontSize:12.5,color:C.dark,marginTop:4}}>✓ Team is on track for the Apr 12 deadline.</div>
          </div>
        </div>
      )}
      {tab==="tasks"&&(
        <div className="card" style={{padding:20}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:14}}>
            <h3 style={{fontWeight:800,color:C.navy}}>Task Board</h3>
            <button className="btn bp" style={{fontSize:12}} onClick={()=>toast_("Task creation coming in MVP v2!","info")}>+ Add Task</button>
          </div>
          <table style={{width:"100%",borderCollapse:"collapse"}}>
            <thead><tr style={{background:C.bg}}>{["Task","Owner","Status","Due"].map(h=><th key={h} style={{padding:"9px 13px",textAlign:"left",fontSize:12,fontWeight:700,color:C.muted,borderBottom:`1px solid ${C.border}`}}>{h}</th>)}</tr></thead>
            <tbody>{tasks.map(t=>(
              <tr key={t.id} style={{borderBottom:`1px solid ${C.border}`}}>
                <td style={{padding:"11px 13px",fontSize:13.5,color:C.dark,textDecoration:t.status==="done"?"line-through":"none",opacity:t.status==="done"?.6:1}}>{t.title}</td>
                <td style={{padding:"11px 13px",fontSize:13,color:C.muted}}>{t.owner}</td>
                <td style={{padding:"11px 13px"}}><Bdg label={t.status} color={t.status==="done"?C.green:t.status==="in-progress"?C.amber:C.muted}/></td>
                <td style={{padding:"11px 13px",fontSize:13,color:C.muted}}>{t.due}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      )}
      {tab==="feedback"&&(
        <div className="card" style={{padding:24,textAlign:"center"}}>
          <div style={{fontSize:44,marginBottom:10}}>⭐</div>
          <h3 style={{fontWeight:800,color:C.navy,marginBottom:8}}>Post-Competition Feedback</h3>
          <p style={{color:C.muted,fontSize:14,marginBottom:20,maxWidth:380,margin:"0 auto 20px"}}>Rate teammates after the competition. Scores are averaged into their reputation profile.</p>
          <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
            {team.filter(m=>m.name!==ME.name).map((m,i)=>(
              <button key={i} className="btn bp" style={{gap:8}} onClick={()=>setModal({type:"feedback",data:m})}>
                <Av init={m.avatar} color={m.color} size={20}/> Rate {m.name.split(" ")[0]}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── COMPETITIONS ──────────────────────────────────────────────────
function Comps({competitions,setModal,toast_}) {
  const cats=["All","Strategy","Finance","Analytics","Operations","Marketing"];
  const [cat,setCat]=useState("All");
  const filtered=competitions.filter(c=>cat==="All"||c.category===cat);
  return (
    <div style={{display:"flex",flexDirection:"column",gap:16}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <h2 style={{fontSize:22,fontWeight:800,color:C.navy}}>Open Competitions</h2>
        <button className="btn bo" onClick={()=>toast_("Post a competition — coming in v2!","info")}>+ Post Competition</button>
      </div>
      <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
        {cats.map(c=><button key={c} className={`tab${cat===c?" on":""}`} onClick={()=>setCat(c)}>{c}</button>)}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:14}}>
        {filtered.map(c=>(
          <div key={c.id} className="card sc" style={{padding:18}} onClick={()=>setModal({type:"comp",data:c})}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}><Bdg label={c.category} color={C.teal}/><Bdg label={`${c.spotsLeft} spots left`} color={c.spotsLeft===1?C.coral:C.green}/></div>
            <div style={{fontWeight:800,fontSize:15.5,color:C.navy,marginBottom:8}}>{c.name}</div>
            <div style={{display:"flex",gap:14,fontSize:13,color:C.muted,marginBottom:14}}>
              <span>👥 {c.teamSize}</span><span>🏆 {c.prize}</span><span>📅 {c.deadline}</span>
            </div>
            <button className="btn bp" style={{width:"100%",justifyContent:"center",fontSize:13}} onClick={e=>{e.stopPropagation();setModal({type:"comp",data:c});}}>View & Join</button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── PROFILE ───────────────────────────────────────────────────────
function Profile({toast_}) {
  const [editing,setEditing]=useState(false);
  const [bio,setBio]=useState(ME.bio);
  const [skills,setSkills]=useState(ME.skills.join(", "));
  const [avail,setAvail]=useState(ME.availability);
  return (
    <div style={{display:"flex",flexDirection:"column",gap:16,maxWidth:680}}>
      <h2 style={{fontSize:22,fontWeight:800,color:C.navy}}>Your Profile</h2>
      <div className="card" style={{padding:24}}>
        <div style={{display:"flex",gap:18,alignItems:"flex-start"}}>
          <Av init={ME.avatar} color={ME.color} size={68} ring/>
          <div style={{flex:1}}>
            <div style={{display:"flex",alignItems:"center",gap:10,flexWrap:"wrap"}}>
              <h3 style={{fontSize:20,fontWeight:800,color:C.dark}}>{ME.name}</h3>
              <Tip text={TT.verified}><span style={{background:C.tealLight,color:C.teal,fontSize:10.5,fontWeight:800,padding:"2px 8px",borderRadius:20}}>✓ VERIFIED</span></Tip>
            </div>
            <div style={{fontSize:13.5,color:C.muted,marginTop:4}}>{ME.program} · Section {ME.section}</div>
            <div style={{display:"flex",gap:20,marginTop:12}}>
              <div style={{textAlign:"center"}}><div style={{fontSize:22,fontWeight:800,color:C.teal}}>{ME.repScore}</div><div style={{fontSize:11,color:C.muted}}>Rep Score</div></div>
              <div style={{textAlign:"center"}}><div style={{fontSize:22,fontWeight:800,color:C.amber}}>{ME.completedComps}</div><div style={{fontSize:11,color:C.muted}}>Competitions</div></div>
            </div>
          </div>
          <button className="btn bo" onClick={()=>setEditing(e=>!e)}>{editing?"Cancel":"Edit Profile"}</button>
        </div>
        <div style={{marginTop:18,borderTop:`1px solid ${C.border}`,paddingTop:18}}>
          <div style={{marginBottom:14}}>
            <label style={{fontSize:12.5,fontWeight:700,color:C.muted,display:"block",marginBottom:6}}>Bio</label>
            {editing?<textarea className="inp" value={bio} onChange={e=>setBio(e.target.value)} rows={3} style={{resize:"vertical"}}/>:<p style={{fontSize:14,color:C.dark,lineHeight:1.6}}>{bio}</p>}
          </div>
          <div style={{marginBottom:14}}>
            <label style={{fontSize:12.5,fontWeight:700,color:C.muted,display:"block",marginBottom:6}}>Skills</label>
            {editing?<input className="inp" value={skills} onChange={e=>setSkills(e.target.value)} placeholder="e.g. Strategy, Analytics, Excel"/>:<div style={{display:"flex",gap:6,flexWrap:"wrap"}}>{ME.skills.map(s=><Bdg key={s} label={s} color={C.navy}/>)}</div>}
          </div>
          <div style={{marginBottom:14}}>
            <label style={{fontSize:12.5,fontWeight:700,color:C.muted,display:"block",marginBottom:6,display:"flex",alignItems:"center"}}>Availability<IIcon tip={TT.avail}/></label>
            {editing?<input className="inp" value={avail} onChange={e=>setAvail(e.target.value)} placeholder="e.g. Weekends + evenings"/>:<span style={{fontSize:14,color:C.dark}}>⏰ {ME.availability}</span>}
          </div>
          {editing&&<button className="btn bp" onClick={()=>{setEditing(false);toast_("Profile updated successfully!","success");}}>Save Changes</button>}
        </div>
      </div>
      <div className="card" style={{padding:20}}>
        <h3 style={{fontWeight:800,color:C.navy,marginBottom:6,display:"flex",alignItems:"center",gap:6,fontSize:15}}>Reputation Breakdown<IIcon tip={TT.rep}/></h3>
        <p style={{fontSize:13,color:C.muted,marginBottom:14}}>Based on ratings from {ME.completedComps} completed competition.</p>
        {[{l:"Reliability",s:4.5},{l:"Communication",s:4.0},{l:"Workload Sharing",s:4.2},{l:"Met Deadlines",s:4.1}].map(r=>(
          <div key={r.l} style={{marginBottom:11}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}><span style={{fontSize:13,color:C.dark,fontWeight:600}}>{r.l}</span><span style={{fontSize:13,fontWeight:800,color:C.amber}}>{r.s} ★</span></div>
            <Bar value={(r.s/5)*100} color={C.amber}/>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── FLOW MAP ──────────────────────────────────────────────────────
function FlowMap() {
  const steps=[
    {id:"A",l:"Sign Up / Login",desc:"Institute email verification (IIM-L Google SSO)",c:C.teal,icon:"🔐",why:"Restricts access to IIM community. Zero manual verification. Free via Google OAuth."},
    {id:"B",l:"Build Profile",desc:"Skills, roles, availability, bio",c:C.navy,icon:"◉",why:"Self-declared data. Peer feedback flags inconsistencies over time — no manual review needed."},
    {id:"C",l:"Browse & Filter",desc:"Search by skill, role, availability",c:C.amber,icon:"⊙",why:"Rules-based match score overlay. Students see exactly why someone ranks high for them."},
    {id:"D",l:"Express Interest",desc:"One-sided — completely private",c:C.coral,icon:"💌",why:"Mutual interest only. No awkward rejections. Reduces social anxiety around cold outreach."},
    {id:"E",l:"Mutual Match",desc:"Both interested → connection unlocked",c:C.green,icon:"⟺",why:"Classic stable matching logic. Both parties must opt in before contact info is shared."},
    {id:"F",l:"Form Team",desc:"Assign roles, set competition, invite",c:C.teal,icon:"◎",why:"Team health tracker activates automatically. Workload, blockers, and schedule monitored passively."},
    {id:"G",l:"Compete",desc:"Coordination via platform + external tools",c:C.purple,icon:"◈",why:"Lightweight — doesn't try to replace WhatsApp/Notion. Just tracks team health and tasks."},
    {id:"H",l:"Rate Teammates",desc:"Post-comp structured feedback (4 dimensions)",c:C.amber,icon:"⭐",why:"Covers reliability, communication, workload, deadlines. Average feeds directly into rep score."},
    {id:"I",l:"Rep Score Updated",desc:"Improves future match quality for everyone",c:C.navy,icon:"↑",why:"The flywheel: more competitions → better reputation data → smarter matches → more competitions."},
  ];
  return (
    <div style={{display:"flex",flexDirection:"column",gap:16}}>
      <h2 style={{fontSize:22,fontWeight:800,color:C.navy}}>Platform Flow Diagram</h2>
      <p style={{color:C.muted,fontSize:13.5}}>End-to-end user journey with implementation rationale at each step. Hover the <strong>?</strong> icons for design logic.</p>
      {steps.map((s,i)=>(
        <div key={s.id} style={{display:"flex",gap:0,alignItems:"stretch"}}>
          <div style={{display:"flex",flexDirection:"column",alignItems:"center",width:56,flexShrink:0}}>
            <div style={{width:42,height:42,borderRadius:"50%",background:s.c,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:17,fontWeight:800,boxShadow:`0 4px 12px ${s.c}44`,flexShrink:0,zIndex:1}}>{s.id}</div>
            {i<steps.length-1&&<div style={{width:2,flex:1,background:`linear-gradient(${s.c},${steps[i+1].c})`,minHeight:16,marginTop:0}}/>}
          </div>
          <div className="card" style={{margin:"0 0 10px 12px",padding:"14px 16px",flex:1,borderLeft:`3px solid ${s.c}`}}>
            <div style={{display:"flex",gap:10,alignItems:"flex-start"}}>
              <span style={{fontSize:20}}>{s.icon}</span>
              <div style={{flex:1}}>
                <div style={{fontWeight:800,color:C.dark,fontSize:14}}>{s.l}</div>
                <div style={{fontSize:12.5,color:C.muted,marginTop:2}}>{s.desc}</div>
                <div style={{marginTop:8,background:C.bg,borderRadius:7,padding:"8px 12px",fontSize:12.5,color:C.dark,lineHeight:1.5}}>
                  <strong style={{color:s.c}}>Why:</strong> {s.why}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── PRD ───────────────────────────────────────────────────────────
function PRD() {
  const [tab,setTab]=useState("prd");
  return (
    <div style={{display:"flex",flexDirection:"column",gap:16}}>
      <h2 style={{fontSize:22,fontWeight:800,color:C.navy}}>Documentation</h2>
      <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
        {[["prd","PRD"],["feasibility","Feasibility"],["integration","Integration"],["impl","Impl. Plan"]].map(([k,l])=>(
          <button key={k} className={`tab${tab===k?" on":""}`} onClick={()=>setTab(k)}>{l}</button>
        ))}
      </div>
      {tab==="prd"&&<PrdDoc/>}
      {tab==="feasibility"&&<FeasDoc/>}
      {tab==="integration"&&<IntDoc/>}
      {tab==="impl"&&<ImplDoc/>}
    </div>
  );
}

function Sec({title,color=C.teal,children}){return <div style={{marginBottom:20}}><h3 style={{fontSize:15,fontWeight:800,color,marginBottom:10,paddingBottom:6,borderBottom:`2px solid ${color}`}}>{title}</h3>{children}</div>;}

function PrdDoc(){return(
  <div className="card" style={{padding:26}}>
    <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:20}}>
      {[["Product","TeamUp"],["Version","1.0 MVP"],["Status","Design Phase"],["Audience","IIM-L MBA Students"]].map(([k,v])=>(
        <div key={k} style={{background:C.bg,borderRadius:8,padding:"8px 14px"}}><div style={{fontSize:11,color:C.muted,fontWeight:700}}>{k}</div><div style={{fontSize:13,color:C.dark,fontWeight:600}}>{v}</div></div>
      ))}
    </div>
    <Sec title="Problem Statement" color={C.coral}><p style={{fontSize:14,color:C.dark,lineHeight:1.7}}>MBA students at IIM Lucknow face a fragmented, low-trust, and socially-biased process for forming case competition teams. Team formation today happens through informal WhatsApp messages, word-of-mouth, and existing social circles — leading to poor skill fit, unequal access to opportunity, and high search friction for students who are newer or less socially connected.</p></Sec>
    <Sec title="Goals" color={C.teal}>{["Reduce team formation time from days to hours","Enable skill-based, verified teammate discovery","Build a reputation layer that improves over time","Give all students equal visibility regardless of social circle","Provide full transparency in how recommendations are made"].map((g,i)=><div key={i} style={{display:"flex",gap:10,marginBottom:8}}><span style={{color:C.teal,fontWeight:800}}>G{i+1}</span><span style={{fontSize:14,color:C.dark}}>{g}</span></div>)}</Sec>
    <Sec title="User Stories" color={C.amber}>{[["New MBA student","discover teammates with skills I lack","form a strong team for my first competition"],["Experienced student","find reliable teammates with proven records","avoid free-rider risk"],["Less connected student","be visible based on skills, not social network","access the same opportunities as outgoing peers"]].map(([who,what,why],i)=>(
      <div key={i} style={{background:C.bg,borderRadius:8,padding:"10px 14px",marginBottom:8,fontSize:13.5,color:C.dark,lineHeight:1.5}}>As a <strong>{who}</strong>, I want to <em>{what}</em>, so that <em>{why}</em>.</div>
    ))}</Sec>
    <Sec title="Core Features (MVP)" color={C.navy}><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>{[["✓ Verified profiles","Institute email SSO"],["✓ Skill-based search","Filter by role & availability"],["✓ Transparent match scoring","Rules-based, 4-factor"],["✓ Mutual interest system","Private one-sided interest"],["✓ Team formation","Roles, competition, invite"],["✓ Task tracking","Basic task board"],["✓ Post-comp feedback","4-dimension rep scoring"],["○ AI recommendations","v2 — behavioral learning"]].map(([f,d])=>(
      <div key={f} style={{background:C.bg,borderRadius:8,padding:"10px 14px"}}><div style={{fontWeight:700,color:C.dark,fontSize:13}}>{f}</div><div style={{fontSize:12,color:C.muted}}>{d}</div></div>
    ))}</div></Sec>
  </div>
);}

function FeasDoc(){return(
  <div className="card" style={{padding:26}}>
    <Sec title="Technical Feasibility" color={C.teal}><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>{[["Frontend","React SPA on Vercel free tier"],["Backend","Node.js on Render.com free tier"],["Database","PostgreSQL via Supabase (500MB free)"],["Auth","Google OAuth — IIM-L domain restricted"],["Matching","Pure rules-based — no ML infra needed"],["Total Cost","₹0/month for up to 500 students"]].map(([a,d])=>(
      <div key={a} style={{background:C.bg,borderRadius:8,padding:"12px 14px"}}><div style={{display:"flex",justifyContent:"space-between"}}><span style={{fontWeight:700,color:C.dark}}>{a}</span><span style={{color:C.green,fontWeight:700,fontSize:12}}>✓ Feasible</span></div><div style={{fontSize:12,color:C.muted,marginTop:4}}>{d}</div></div>
    ))}</div></Sec>
    <Sec title="IIM Lucknow Context" color={C.coral}>{[["Student Adoption","MBA students are high-motivation users with direct career incentive to adopt tools that improve competition outcomes. Cold-start solved by piloting with one batch."],["Admin Buy-in","Student clubs (Consulting Club, Finance Club, AIESEC) are natural champions. PGP office backing removes trust barriers."],["Data Privacy","Only email, skills, and availability are shared. No sensitive data. Academic-context GDPR-light policy sufficient."]].map(([f,d])=>(
      <div key={f} style={{marginBottom:12}}><div style={{fontWeight:700,color:C.dark,fontSize:14}}>{f}</div><div style={{fontSize:13,color:C.muted,marginTop:3,lineHeight:1.6}}>{d}</div></div>
    ))}</Sec>
    <Sec title="Free Plan Cost Estimate" color={C.green}><table style={{width:"100%",borderCollapse:"collapse",fontSize:13.5}}><thead><tr style={{background:C.bg}}>{["Service","Usage","Cost"].map(h=><th key={h} style={{padding:"9px 13px",textAlign:"left",fontWeight:700,color:C.muted}}>{h}</th>)}</tr></thead><tbody>{[["Vercel","100GB bandwidth","₹0"],["Render.com","750 free hrs/month","₹0"],["Supabase","500MB DB + auth","₹0"],["Google OAuth","Unlimited","₹0"],["SendGrid","100 emails/day","₹0"],["Total","—","₹0/month"]].map(([s,u,c])=><tr key={s} style={{borderBottom:`1px solid ${C.border}`}}><td style={{padding:"9px 13px",fontWeight:c==="₹0/month"?800:400}}>{s}</td><td style={{padding:"9px 13px",color:C.muted}}>{u}</td><td style={{padding:"9px 13px",color:C.green,fontWeight:700}}>{c}</td></tr>)}</tbody></table></Sec>
  </div>
);}

function IntDoc(){return(
  <div className="card" style={{padding:26}}>
    <Sec title="Google Workspace SSO" color={C.teal}><p style={{fontSize:14,color:C.dark,lineHeight:1.7,marginBottom:10}}>IIM Lucknow uses Google Workspace (@iiml.ac.in). OAuth 2.0 with <code>hd:"iiml.ac.in"</code> parameter restricts login to institute emails only — no manual account creation or admin overhead.</p><div style={{background:C.tealLight,borderRadius:8,padding:"10px 14px",fontSize:13}}>✓ Free for all Google Workspace domains. Implementation: 2 hours.</div></Sec>
    <Sec title="WhatsApp / Email Notifications" color={C.amber}><p style={{fontSize:14,color:C.dark,lineHeight:1.7,marginBottom:10}}>Match alerts and deadline reminders via WhatsApp (Twilio sandbox — 1,000 msgs/month free) or email fallback (SendGrid 100/day free). Opt-in only.</p><div style={{background:C.amberLight,borderRadius:8,padding:"10px 14px",fontSize:13}}>⚠ WhatsApp requires Twilio sandbox approval for free-tier use.</div></Sec>
    <Sec title="IIML Student Portal Integration" color={C.coral}><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}><div style={{background:C.bg,borderRadius:8,padding:"12px 14px"}}><strong style={{color:C.green}}>v1 (MVP):</strong><div style={{fontSize:13,color:C.muted,marginTop:4}}>Simple link/banner on student portal homepage. No API access needed.</div></div><div style={{background:C.bg,borderRadius:8,padding:"12px 14px"}}><strong style={{color:C.amber}}>v2:</strong><div style={{fontSize:13,color:C.muted,marginTop:4}}>Embedded iframe or full API integration. Requires admin access.</div></div></div></Sec>
    <Sec title="Club Competition Listings" color={C.purple}><p style={{fontSize:14,color:C.dark,lineHeight:1.7}}>Consulting/Finance clubs publish competitions via WhatsApp. For MVP, club coordinators manually add competitions via a simple form. Automated scraping or API integration is v3 scope.</p></Sec>
  </div>
);}

function ImplDoc(){
  const phases=[
    {p:"Phase 1 — MVP Core",d:"Weeks 1–4",items:["Google SSO with IIM-L domain restriction","Student profile CRUD","Rules-based match scoring engine","Browse + filter UI","Express interest (private, one-sided)","Mutual match unlock + notification"]},
    {p:"Phase 2 — Team Features",d:"Weeks 5–7",items:["Team creation and management","Role assignment","Basic task board","Team health indicator","Competition listing + joining","Post-comp feedback collection"]},
    {p:"Phase 3 — Trust Layer",d:"Weeks 8–10",items:["Reputation score aggregation","Profile badges (verified, new, top-rated)","Cold-start handling","WhatsApp/email notifications","Mobile-responsive polish","User onboarding flow"]},
    {p:"Phase 4 — Growth",d:"Weeks 11–14",items:["Behavioral data logging (future ML)","Cross-batch features","Competition organizer portal","Analytics for student body","InstiApp integration prep","Load testing + security audit"]},
  ];
  return(
    <div className="card" style={{padding:26}}>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:14}}>
        {phases.map((ph,i)=>(
          <div key={i} style={{background:C.bg,borderRadius:12,padding:18}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
              <span style={{fontWeight:800,color:C.navy,fontSize:13.5}}>{ph.p}</span><Bdg label={ph.d} color={C.teal}/>
            </div>
            {ph.items.map((item,j)=>(
              <div key={j} style={{display:"flex",gap:8,marginBottom:6}}><span style={{color:C.teal,fontWeight:800,fontSize:12,flexShrink:0}}>✓</span><span style={{fontSize:13,color:C.dark}}>{item}</span></div>
            ))}
          </div>
        ))}
      </div>
      <div style={{marginTop:16,background:C.tealLight,borderRadius:10,padding:16}}>
        <div style={{fontWeight:800,color:C.navy,marginBottom:6}}>Total: 14 weeks · ₹0/month (free tier stack)</div>
        <div style={{fontSize:13,color:C.dark,lineHeight:1.7}}>Recommended team: 1 full-stack developer + 1 PM (proposing student). Stack: React + Node.js + Supabase + Vercel. Handles up to 500 students on free tiers. No subscription cost until scale demands it.</div>
      </div>
    </div>
  );
}

// ── MODALS ────────────────────────────────────────────────────────
function StudentModal({s,reasons,onClose,onInterest}){
  return(
    <div className="ov" onClick={onClose}>
      <div className="mbox" onClick={e=>e.stopPropagation()}>
        <div style={{display:"flex",gap:14,alignItems:"flex-start",marginBottom:18}}>
          <Av init={s.avatar} color={s.color} size={58} ring/>
          <div style={{flex:1}}>
            <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
              <h2 style={{fontSize:19,fontWeight:800,color:C.dark}}>{s.name}</h2>
              {s.verified&&<Tip text={TT.verified}><span style={{background:C.tealLight,color:C.teal,fontSize:10,fontWeight:800,padding:"2px 8px",borderRadius:20}}>✓ VERIFIED</span></Tip>}
            </div>
            <div style={{fontSize:13,color:C.muted,marginTop:3}}>{s.program} · Section {s.section}</div>
            <div style={{display:"flex",gap:16,marginTop:10}}>
              {[{v:s.matchScore+"%",l:"Match",c:C.teal},{v:s.repScore+"★",l:"Rep",c:C.amber},{v:s.completedComps,l:"Comps",c:C.coral}].map(x=>(
                <div key={x.l} style={{textAlign:"center"}}><div style={{fontSize:18,fontWeight:800,color:x.c}}>{x.v}</div><div style={{fontSize:11,color:C.muted}}>{x.l}</div></div>
              ))}
            </div>
          </div>
          <button onClick={onClose} style={{background:"none",border:"none",cursor:"pointer",fontSize:20,color:C.muted,padding:"0 4px"}}>×</button>
        </div>
        <p style={{fontSize:13.5,color:C.dark,lineHeight:1.6,marginBottom:14}}>{s.bio}</p>
        <div style={{marginBottom:14}}><div style={{fontWeight:700,color:C.dark,marginBottom:8,fontSize:13.5}}>Skills</div><div style={{display:"flex",gap:6,flexWrap:"wrap"}}>{s.skills.map(sk=><Bdg key={sk} label={sk} color={C.navy}/>)}</div></div>
        <div style={{marginBottom:14}}>
          <div style={{fontWeight:700,color:C.dark,marginBottom:8,fontSize:13.5,display:"flex",alignItems:"center",gap:5}}>Why this match?<IIcon tip={TT.match}/></div>
          {reasons.map((r,i)=><div key={i} style={{display:"flex",gap:8,alignItems:"flex-start",background:C.tealLight,borderRadius:8,padding:"8px 12px",marginBottom:6}}><span style={{color:C.teal,fontWeight:800,flexShrink:0}}>✓</span><span style={{fontSize:13,color:C.dark}}>{r}</span></div>)}
        </div>
        <div style={{background:C.amberLight,borderRadius:8,padding:"10px 14px",fontSize:13,color:C.dark,marginBottom:18}}>
          <strong>⚠ Mutual interest only:</strong> {s.name} will only be notified if they also express interest in you.
        </div>
        <div style={{display:"flex",gap:10}}>
          <button className="btn bp" style={{flex:1,justifyContent:"center"}} onClick={onInterest}>{s.interest==="sent"?"✓ Interest Sent":"Express Interest"}</button>
          <button className="btn bg" style={{flex:1,justifyContent:"center"}} onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

function CompModal({comp,onClose,toast_}){
  return(
    <div className="ov" onClick={onClose}>
      <div className="mbox" onClick={e=>e.stopPropagation()}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:16}}>
          <div><Bdg label={comp.category} color={C.teal}/><h2 style={{fontSize:19,fontWeight:800,color:C.dark,marginTop:8}}>{comp.name}</h2></div>
          <button onClick={onClose} style={{background:"none",border:"none",cursor:"pointer",fontSize:20,color:C.muted}}>×</button>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:16}}>
          {[["Prize",comp.prize,C.amber],["Deadline",comp.deadline,C.coral],["Team Size",comp.teamSize,C.teal],["Spots Left",`${comp.spotsLeft} open`,C.green]].map(([k,v,c])=>(
            <div key={k} style={{background:C.bg,borderRadius:8,padding:"12px 14px"}}><div style={{fontSize:11,color:C.muted,fontWeight:700}}>{k}</div><div style={{fontSize:17,fontWeight:800,color:c}}>{v}</div></div>
          ))}
        </div>
        <div style={{background:C.bg,borderRadius:10,padding:16,marginBottom:20}}>
          <div style={{fontWeight:700,color:C.dark,marginBottom:8}}>Roles you'll likely need:</div>
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>{["Strategist","Analyst","Presenter"].map(r=><Bdg key={r} label={r} color={C.navy}/>)}</div>
        </div>
        <div style={{display:"flex",gap:10}}>
          <button className="btn bp" style={{flex:1,justifyContent:"center"}} onClick={()=>{toast_(`Joined ${comp.name}! Head to Browse to find teammates.`,"success");onClose();}}>Join & Find Teammates</button>
          <button className="btn bg" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

function FbModal({member,scores,setScores,note,setNote,onSubmit,onClose}){
  const dims=[{k:"reliability",l:"Reliability",d:"Did they show up and deliver?"},{k:"communication",l:"Communication",d:"Clear, timely, constructive?"},{k:"workload",l:"Workload Sharing",d:"Did they pull their weight?"},{k:"deadline",l:"Met Deadlines",d:"Delivered on time?"}];
  const ok=Object.values(scores).every(v=>v>0);
  return(
    <div className="ov" onClick={onClose}>
      <div className="mbox" onClick={e=>e.stopPropagation()}>
        <h2 style={{fontSize:18,fontWeight:800,color:C.dark,marginBottom:14}}>Rate Teammate</h2>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:18}}><Av init={member.avatar} color={member.color} size={36}/><span style={{fontWeight:700,color:C.dark,fontSize:15}}>{member.name}</span></div>
        {dims.map(d=>(
          <div key={d.k} style={{marginBottom:16}}>
            <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:5}}>
              <span style={{fontSize:13.5,fontWeight:700,color:C.dark}}>{d.l}</span>
              <IIcon tip={TT.rep}/>
              <span style={{fontSize:12,color:C.muted}}>{d.d}</span>
            </div>
            <div style={{display:"flex",gap:3}}>
              {[1,2,3,4,5].map(v=><button key={v} className="sstar" style={{color:v<=scores[d.k]?C.amber:C.border}} onClick={()=>setScores(p=>({...p,[d.k]:v}))}>★</button>)}
            </div>
          </div>
        ))}
        <div style={{marginBottom:18}}>
          <label style={{fontSize:13,fontWeight:700,color:C.muted,display:"block",marginBottom:6}}>Additional notes (optional)</label>
          <textarea className="inp" rows={3} placeholder="Any specific feedback for this teammate…" value={note} onChange={e=>setNote(e.target.value)} style={{resize:"none"}}/>
        </div>
        <div style={{display:"flex",gap:10}}>
          <button className="btn bp" style={{flex:1,justifyContent:"center",opacity:ok?1:.5}} disabled={!ok} onClick={onSubmit}>Submit Feedback</button>
          <button className="btn bg" onClick={onClose}>Cancel</button>
        </div>
        {!ok&&<p style={{fontSize:12,color:C.muted,marginTop:8,textAlign:"center"}}>Please rate all 4 dimensions to submit.</p>}
      </div>
    </div>
  );
}

function OnbModal({onClose}){
  const [step,setStep]=useState(0);
  const steps=[
    {icon:"⟺",title:"Welcome to TeamUp",body:"The IIM Lucknow platform for finding verified, skilled case competition teammates — based on fit, not just who you know."},
    {icon:"✓",title:"Verified Profiles",body:"Everyone logs in with their IIM-L email. Skills are self-declared, then validated by peer feedback over time. No fake claims."},
    {icon:"💌",title:"Mutual Interest Only",body:"Express interest privately. The other student is only notified if BOTH of you are interested — no awkward one-sided rejections."},
    {icon:"⭐",title:"Reputation Scores",body:"After each competition, rate teammates on 4 dimensions. Scores build reputation and make future matching better for everyone."},
    {icon:"🚀",title:"You're Ready!",body:"Start by browsing teammates or post your team slot for the next competition. The platform gets smarter with every competition you complete."},
  ];
  const s=steps[step];
  return(
    <div className="ov" onClick={onClose}>
      <div className="mbox" style={{textAlign:"center",maxWidth:420}} onClick={e=>e.stopPropagation()}>
        <div style={{fontSize:52,marginBottom:14}}>{s.icon}</div>
        <h2 style={{fontSize:21,fontWeight:800,color:C.navy,marginBottom:10}}>{s.title}</h2>
        <p style={{fontSize:14.5,color:C.muted,lineHeight:1.7,marginBottom:24}}>{s.body}</p>
        <div style={{display:"flex",gap:6,justifyContent:"center",marginBottom:24}}>
          {steps.map((_,i)=><div key={i} style={{width:i===step?24:8,height:8,borderRadius:4,background:i===step?C.teal:C.border,transition:"width .3s"}}/>)}
        </div>
        <div style={{display:"flex",gap:10,justifyContent:"center"}}>
          {step>0&&<button className="btn bg" onClick={()=>setStep(p=>p-1)}>← Back</button>}
          {step<steps.length-1?<button className="btn bp" onClick={()=>setStep(p=>p+1)}>Next →</button>:<button className="btn bp" onClick={onClose}>Get Started 🚀</button>}
        </div>
      </div>
    </div>
  );
}
