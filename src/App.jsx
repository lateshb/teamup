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
  {id:1,name:"Priya Mehta",program:"MBA 2025",section:"A",skills:["Strategy","Presentation","Market Research"],roles:["Strategist","Presenter"],availability:"Weekends + evenings",repScore:4.8,matchScore:94,verified:true,completedComps:5,bio:"IIM-L topper, ex-BCG intern. Love building stories from data.",avatar:"PM",color:C.teal,interest:null},
  {id:2,name:"Ankit Kumar",program:"MBA 2025",section:"B",skills:["Analytics","Python","Excel Modelling"],roles:["Analyst","Researcher"],availability:"Flexible",repScore:4.6,matchScore:89,verified:true,completedComps:3,bio:"Data-first thinker. Built dashboards at HDFC before MBA.",avatar:"AK",color:C.amber,interest:null},
  {id:3,name:"Shruti Rao",program:"MBA 2025",section:"A",skills:["Research","Communication","Slides"],roles:["Researcher","Slide Maker"],availability:"Evenings only",repScore:4.5,matchScore:84,verified:true,completedComps:4,bio:"Journalist turned MBA. I make complex ideas simple.",avatar:"SR",color:C.coral,interest:null},
  {id:4,name:"Dev Patel",program:"MBA 2024",section:"C",skills:["Finance","Valuation","Excel"],roles:["Analyst","Strategist"],availability:"Weekends",repScore:4.9,matchScore:91,verified:true,completedComps:8,bio:"CFA L2. Former VC analyst. Numbers are my language.",avatar:"DP",color:C.purple,interest:null},
  {id:5,name:"Kavya Nair",program:"MBA 2025",section:"B",skills:["Marketing","Branding","GTM"],roles:["Strategist","Presenter"],availability:"Flexible",repScore:4.4,matchScore:78,verified:true,completedComps:2,bio:"Brand manager before MBA. I build narratives that stick.",avatar:"KN",color:C.green,interest:null},
];

const MATCH_REASONS = {
  1:["Complementary skills — you bring Ops, she brings Strategy","Both prefer weekends + evenings","High reputation score (4.8)","Same section — easy coordination"],
  2:["You lack Analytics — he fills the gap","Flexible schedule matches yours","Python skills add quantitative depth","Verified track record in 3 competitions"],
  3:["Research + Comms covers your weak area","Evening availability aligns","Slide-making complements your analytical side","Low free-rider risk based on past feedback"],
  4:["Finance depth you don't have","Senior — brings mentor-like perspective","CFA level signals reliability","8 completed comps = battle-tested"],
  5:["Marketing + GTM rounds out a 4-person team","Branding skill complements Ops framing","Flexible availability — lowest scheduling risk","High communicator score from past teammates"],
};

const INIT_NOTIFS = [
  {id:1,type:"match",msg:"New match: Priya Mehta (94%) for IIM-A Conclave",time:"2m ago",read:false},
  {id:2,type:"interest",msg:"Dev Patel expressed interest in your open slot",time:"1h ago",read:false},
  {id:3,type:"deadline",msg:"XLRI Finance Cup deadline in 3 days — team incomplete",time:"3h ago",read:true},
  {id:4,type:"feedback",msg:"Feedback received from ISB Analytics Cup teammate",time:"1d ago",read:true},
];

const TEAM = [
  {name:"Priya Mehta",role:"Strategist",avatar:"PM",color:C.teal,tasks:4,done:3},
  {name:"Ankit Kumar",role:"Analyst",avatar:"AK",color:C.amber,tasks:3,done:2},
  {name:"Latesh Sharma",role:"Ops Lead",avatar:"LS",color:C.navy,tasks:3,done:1},
];

const ME = {name:"Latesh Sharma",program:"MBA 2025",section:"A",skills:["Operations","Strategy","Quantitative Analysis"],roles:["Analyst","Strategist"],repScore:4.2,completedComps:1,bio:"IIM-L student. Supply chain & ops background. Looking to build on case comp experience.",avatar:"LS",color:C.navy,verified:true,availability:"Weekends + evenings"};

export default function App() {
  const [tab, setTab] = useState("dashboard");
  const [students, setStudents] = useState(INIT_STUDENTS);
  const [notifs, setNotifs] = useState(INIT_NOTIFS);
  const [compFilter, setCompFilter] = useState("all");
  const [skillSearch, setSkillSearch] = useState("");

  const getCompCount = (cat) => COMPETITIONS.filter(c => cat === "all" || c.category === cat).length;
  const getUnreadCount = () => notifs.filter(n => !n.read).length;

  const completeNotif = (id) => setNotifs(notifs.map(n => n.id === id ? {...n, read:true} : n));

  const filteredComps = compFilter === "all" ? COMPETITIONS : COMPETITIONS.filter(c => c.category === compFilter);
  const filteredStudents = students.filter(s =>
    skillSearch === "" || s.skills.some(sk => sk.toLowerCase().includes(skillSearch.toLowerCase()))
  );

  return (
    <div style={{fontFamily:"'Inter', sans-serif",background:C.bg,minHeight:"100vh",color:C.dark}}>
      {/* Header */}
      <div style={{background:C.white,borderBottom:`1px solid ${C.border}`,padding:"1rem",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div style={{fontSize:"1.5rem",fontWeight:"bold",color:C.navy}}>TeamUp</div>
        <div style={{display:"flex",gap:"1rem"}}>
          {["dashboard","comps","people","team"].map(t => (
            <button key={t} onClick={()=>setTab(t)} style={{padding:"0.5rem 1rem",background:tab===t?C.teal:C.white,color:tab===t?C.white:C.navy,border:"none",borderRadius:"0.5rem",cursor:"pointer",fontWeight:tab===t?"bold":"normal"}}>
              {t.charAt(0).toUpperCase() + t.slice(1)} {t === "dashboard" && getUnreadCount() > 0 && <span style={{marginLeft:"0.5rem",background:C.red,color:C.white,borderRadius:"50%",padding:"0.1rem 0.3rem",fontSize:"0.8rem"}}>{getUnreadCount()}</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Dashboard Tab */}
      {tab === "dashboard" && (
        <div style={{padding:"2rem",maxWidth:"1200px",margin:"0 auto"}}>
          <div style={{background:C.white,padding:"1.5rem",borderRadius:"0.75rem",marginBottom:"2rem"}}>
            <h2 style={{color:C.navy,marginTop:0}}>Welcome, {ME.name}!</h2>
            <p style={{color:C.muted}}>Your profile: {ME.program}, {ME.section} | Completed: {ME.completedComps} competitions</p>
          </div>

          <h3>Notifications</h3>
          <div style={{display:"flex",flexDirection:"column",gap:"1rem"}}>
            {notifs.map(n => (
              <div key={n.id} onClick={()=>completeNotif(n.id)} style={{background:C.white,padding:"1rem",borderRadius:"0.5rem",borderLeft:`4px solid ${n.type==="match"?C.teal:n.type==="interest"?C.purple:n.type==="deadline"?C.red:C.green}`,cursor:"pointer",display:"flex",justifyContent:"space-between",opacity:n.read?0.6:1}}>
                <div>
                  <div style={{fontWeight:"bold"}}>{n.msg}</div>
                  <div style={{fontSize:"0.85rem",color:C.muted}}>{n.time}</div>
                </div>
                <div style={{fontSize:"0.8rem",background:n.read?C.bg:C.amber,padding:"0.25rem 0.5rem",borderRadius:"0.25rem"}}>{n.read?"Read":"New"}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Competitions Tab */}
      {tab === "comps" && (
        <div style={{padding:"2rem",maxWidth:"1200px",margin:"0 auto"}}>
          <h2>Find Competitions</h2>
          <div style={{display:"flex",gap:"0.5rem",marginBottom:"2rem",flexWrap:"wrap"}}>
            {["all","Strategy","Finance","Operations","Analytics","Marketing"].map(cat => (
              <button key={cat} onClick={()=>setCompFilter(cat)} style={{padding:"0.5rem 1rem",background:compFilter===cat?C.teal:C.white,color:compFilter===cat?C.white:C.navy,border:`1px solid ${C.border}`,borderRadius:"0.5rem",cursor:"pointer"}}>
                {cat} ({getCompCount(cat)})
              </button>
            ))}
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(300px, 1fr))",gap:"1.5rem"}}>
            {filteredComps.map(c => (
              <div key={c.id} style={{background:C.white,padding:"1.5rem",borderRadius:"0.75rem",border:`1px solid ${C.border}`,boxShadow:"0 1px 3px rgba(0,0,0,0.1)"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"start",marginBottom:"1rem"}}>
                  <div>
                    <div style={{fontWeight:"bold",fontSize:"1.1rem",color:C.navy}}>{c.name}</div>
                    <div style={{fontSize:"0.85rem",color:C.muted}}>{c.category}</div>
                  </div>
                  <div style={{background:C.tealLight,color:C.tealDark,padding:"0.25rem 0.75rem",borderRadius:"0.25rem",fontSize:"0.8rem",fontWeight:"bold"}}>{c.spotsLeft} spots</div>
                </div>
                <div style={{fontSize:"0.9rem",marginBottom:"1rem",color:C.muted}}>
                  <div>📅 Deadline: {c.deadline}</div>
                  <div>👥 Team size: {c.teamSize}</div>
                  <div>🏆 Prize: {c.prize}</div>
                  <div>⏰ Posted {c.posted}</div>
                </div>
                <button style={{width:"100%",padding:"0.75rem",background:C.teal,color:C.white,border:"none",borderRadius:"0.5rem",cursor:"pointer",fontWeight:"bold"}}>Register Interest</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* People Tab */}
      {tab === "people" && (
        <div style={{padding:"2rem",maxWidth:"1200px",margin:"0 auto"}}>
          <h2>Find Teammates</h2>
          <div style={{marginBottom:"2rem"}}>
            <input type="text" placeholder="Search by skill..." value={skillSearch} onChange={(e)=>setSkillSearch(e.target.value)} style={{width:"100%",maxWidth:"400px",padding:"0.75rem",border:`1px solid ${C.border}`,borderRadius:"0.5rem"}}/>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(300px, 1fr))",gap:"1.5rem"}}>
            {filteredStudents.map(s => (
              <div key={s.id} style={{background:C.white,padding:"1.5rem",borderRadius:"0.75rem",border:`1px solid ${C.border}`,boxShadow:"0 1px 3px rgba(0,0,0,0.1)"}}>
                <div style={{display:"flex",alignItems:"center",marginBottom:"1rem"}}>
                  <div style={{width:"50px",height:"50px",borderRadius:"50%",background:s.color,display:"flex",alignItems:"center",justifyContent:"center",color:C.white,fontWeight:"bold",marginRight:"1rem"}}>{s.avatar}</div>
                  <div>
                    <div style={{fontWeight:"bold",color:C.navy}}>{s.name}</div>
                    <div style={{fontSize:"0.85rem",color:C.muted}}>{s.program}</div>
                  </div>
                </div>
                <div style={{fontSize:"0.9rem",marginBottom:"1rem",color:C.muted}}>
                  <div>⭐ Rep: {s.repScore}/5 {s.verified && "✓"}</div>
                  <div>📊 Match: {s.matchScore}%</div>
                  <div>🏅 Comps: {s.completedComps}</div>
                  <div style={{marginTop:"0.5rem",fontSize:"0.85rem"}}><strong>Skills:</strong> {s.skills.join(", ")}</div>
                </div>
                <div style={{fontSize:"0.8rem",color:C.muted,marginBottom:"1rem",fontStyle:"italic"}}>{s.bio}</div>
                <button style={{width:"100%",padding:"0.75rem",background:C.amber,color:C.white,border:"none",borderRadius:"0.5rem",cursor:"pointer",fontWeight:"bold"}}>View Match Reasons</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Team Tab */}
      {tab === "team" && (
        <div style={{padding:"2rem",maxWidth:"1200px",margin:"0 auto"}}>
          <h2>Current Team</h2>
          <div style={{background:C.white,padding:"1.5rem",borderRadius:"0.75rem",border:`1px solid ${C.border}`,marginBottom:"2rem"}}>
            <h3 style={{color:C.navy,marginTop:0}}>IIM-A Conclave 2025 Squad</h3>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(250px, 1fr))",gap:"1rem"}}>
              {TEAM.map(m => (
                <div key={m.name} style={{padding:"1rem",background:C.bg,borderRadius:"0.5rem"}}>
                  <div style={{display:"flex",alignItems:"center",marginBottom:"0.75rem"}}>
                    <div style={{width:"40px",height:"40px",borderRadius:"50%",background:m.color,display:"flex",alignItems:"center",justifyContent:"center",color:C.white,fontWeight:"bold",marginRight:"0.75rem",fontSize:"0.9rem"}}>{m.avatar}</div>
                    <div>
                      <div style={{fontWeight:"bold",color:C.navy}}>{m.name}</div>
                      <div style={{fontSize:"0.85rem",color:C.muted}}>{m.role}</div>
                    </div>
                  </div>
                  <div style={{fontSize:"0.8rem",color:C.muted}}>Tasks: {m.done}/{m.tasks} done</div>
                  <div style={{width:"100%",height:"4px",background:C.bg,borderRadius:"2px",marginTop:"0.5rem",overflow:"hidden"}}>
                    <div style={{width:`${(m.done/m.tasks)*100}%`,height:"100%",background:C.green}}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
