"use client";
import { motion } from "framer-motion";

const HEX: Record<string, string> = {
  cyan:   "#06b6d4",
  blue:   "#3b82f6",
  orange: "#f97316",
  rose:   "#f43f5e",
  purple: "#a855f7",
  green:  "#22c55e",
};

function rgba(hex: string, a: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${a})`;
}

const inf = (delay = 0, dur = 2) => ({
  duration: dur,
  repeat: Infinity,
  ease: "easeInOut" as const,
  delay,
});

// ─── GRADIENT DEFS (shared fade pattern) ───────────────────────
function FadeEdges({ id, bg }: { id: string; bg: string }) {
  return (
    <defs>
      <linearGradient id={`${id}-fl`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0"    stopColor={bg} stopOpacity="1" />
        <stop offset="0.07" stopColor={bg} stopOpacity="0" />
      </linearGradient>
      <linearGradient id={`${id}-fr`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0.93" stopColor={bg} stopOpacity="0" />
        <stop offset="1"    stopColor={bg} stopOpacity="1" />
      </linearGradient>
      <linearGradient id={`${id}-fb`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0.78" stopColor={bg} stopOpacity="0" />
        <stop offset="1"    stopColor={bg} stopOpacity="1" />
      </linearGradient>
      <linearGradient id={`${id}-area`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={bg} stopOpacity="0" />
      </linearGradient>
    </defs>
  );
}

function Fades({ id, w, h }: { id: string; w: number; h: number }) {
  return (
    <>
      <rect width={w} height={h} fill={`url(#${id}-fl)`} />
      <rect width={w} height={h} fill={`url(#${id}-fr)`} />
      <rect width={w} height={h} fill={`url(#${id}-fb)`} />
    </>
  );
}

// ─────────────────────────────────────────────────────────────────
// 1. TRADEFINLYTIX — Stock chart + stacked ensemble neural net
// ─────────────────────────────────────────────────────────────────
function IllustTrade({ c }: { c: string }) {
  type Bar = { x: number; oY: number; cY: number; hiY: number; loY: number; up: boolean };
  const bars: Bar[] = [
    { x: 52,  oY: 142, cY: 115, hiY: 108, loY: 150, up: true  },
    { x: 88,  oY: 115, cY: 128, hiY: 108, loY: 134, up: false },
    { x: 124, oY: 128, cY: 108, hiY: 100, loY: 135, up: true  },
    { x: 160, oY: 108, cY: 120, hiY: 102, loY: 126, up: false },
    { x: 196, oY: 120, cY: 102, hiY: 94,  loY: 127, up: true  },
    { x: 232, oY: 102, cY: 114, hiY: 96,  loY: 118, up: false },
    { x: 268, oY: 114, cY: 93,  hiY: 85,  loY: 120, up: true  },
    { x: 304, oY: 93,  cY: 72,  hiY: 64,  loY: 100, up: true  },
  ];

  const closePath = `M ${bars.map(b => `${b.x} ${b.cY}`).join(" L ")}`;
  const areaPath  = `M ${bars[0].x} ${bars[0].cY} ${bars.map(b => `L ${b.x} ${b.cY}`).join(" ")} L ${bars[bars.length-1].x} 200 L ${bars[0].x} 200 Z`;

  type NNode = { x: number; y: number; label: string };
  const nnNodes: NNode[] = [
    { x: 398, y: 75,  label: "XGB"  },
    { x: 398, y: 104, label: "LGB"  },
    { x: 398, y: 133, label: "LSTM" },
    { x: 495, y: 104, label: "Ridge"},
    { x: 595, y: 104, label: "SIG"  },
  ];
  const nnEdges: [number,number,number,number][] = [
    [406,75,487,104],[406,104,487,104],[406,133,487,104],[503,104,587,104],
  ];

  return (
    <svg width="100%" height="100%" viewBox="0 0 840 208" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="ta-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={rgba(c, 0.22)} />
          <stop offset="1" stopColor={rgba(c, 0)} />
        </linearGradient>
        <linearGradient id="ta-fl" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0"    stopColor="#141414" stopOpacity="1" />
          <stop offset="0.07" stopColor="#141414" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="ta-fr" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0.93" stopColor="#141414" stopOpacity="0" />
          <stop offset="1"    stopColor="#141414" stopOpacity="1" />
        </linearGradient>
        <linearGradient id="ta-fb" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0.78" stopColor="#141414" stopOpacity="0" />
          <stop offset="1"    stopColor="#141414" stopOpacity="1" />
        </linearGradient>
      </defs>

      {/* Chart grid */}
      {[80,104,128,152].map(y => (
        <line key={y} x1="30" y1={y} x2="320" y2={y} stroke={rgba(c, 0.05)} strokeWidth="1" />
      ))}

      {/* Price area */}
      <path d={areaPath} fill="url(#ta-area)" />

      {/* OHLC bars */}
      {bars.map(b => (
        <g key={b.x}>
          <line x1={b.x} y1={b.hiY} x2={b.x} y2={b.loY}
            stroke={b.up ? c : rgba(c,0.28)} strokeWidth="1.5" />
          <rect x={b.x-9} y={Math.min(b.oY,b.cY)} width={18}
            height={Math.max(Math.abs(b.oY-b.cY),3)}
            fill={b.up ? rgba(c,0.75) : "#282828"} rx="1.5" />
          {/* Volume */}
          <rect x={b.x-9} y={194-(b.up?14:8)} width={18} height={b.up?14:8}
            fill={b.up ? rgba(c,0.35) : "rgba(255,255,255,0.05)"} rx="1" />
        </g>
      ))}

      {/* Price line */}
      <motion.path
        d={closePath} fill="none" stroke={c} strokeWidth="2.5"
        strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 2.5, ease: "easeOut" }}
      />

      {/* Live dot */}
      <motion.circle cx={304} cy={72} r={5} fill={c}
        animate={{ opacity: [0.5,1,0.5], r: [5,7,5] }}
        transition={inf(0, 1.8)} />
      <motion.circle cx={304} cy={72} r={12} fill="none" stroke={c} strokeWidth="1.5"
        animate={{ r: [8,16,8], opacity: [0.4,0,0.4] }}
        transition={inf(0, 2)} />

      {/* Divider */}
      <line x1="340" y1="20" x2="340" y2="188" stroke={rgba(c,0.07)} strokeWidth="1" strokeDasharray="4,4" />

      {/* Ensemble label */}
      <text x="497" y="22" textAnchor="middle" fill={rgba(c,0.3)}
        fontSize="7.5" fontFamily="monospace" letterSpacing="2">STACKED ENSEMBLE</text>

      {/* Connections */}
      {nnEdges.map(([x1,y1,x2,y2],i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={rgba(c,0.14)} strokeWidth="1.5" />
      ))}

      {/* Nodes */}
      {nnNodes.map((n,i) => {
        const isOut = i === nnNodes.length - 1;
        const isMeta = i === nnNodes.length - 2;
        const r = isOut ? 21 : isMeta ? 16 : 13;
        return (
          <g key={i}>
            <motion.circle cx={n.x} cy={n.y} r={r}
              fill={isOut ? rgba(c,0.22) : rgba(c,0.08)}
              stroke={c} strokeWidth={isOut ? 2 : 1.5}
              animate={{ opacity: [0.55,1,0.55] }}
              transition={inf(i*0.18)} />
            <motion.circle cx={n.x} cy={n.y} r={r}
              fill="none" stroke={c} strokeWidth="1"
              animate={{ r: [r, r*1.6, r], opacity: [0.25,0,0.25] }}
              transition={inf(i*0.18, 3)} />
            <text x={n.x} y={n.y+4} textAnchor="middle"
              fill={isOut ? c : rgba(c,0.65)}
              fontSize={isOut?8:8} fontFamily="monospace" fontWeight={isOut?"700":"400"}>
              {n.label}
            </text>
          </g>
        );
      })}

      {/* SHAP waterfall */}
      <text x="628" y="55" fill={rgba(c,0.3)} fontSize="7.5" fontFamily="monospace">SHAP</text>
      {([
        { label:"RSI",  val:42, y:64  },
        { label:"MACD", val:32, y:78  },
        { label:"BB",   val:26, y:92  },
        { label:"Vol",  val:-18,y:106 },
      ] as {label:string;val:number;y:number}[]).map(s => (
        <g key={s.label}>
          <rect x={628} y={s.y} width={Math.abs(s.val)} height={11}
            fill={s.val>0 ? rgba(c,0.65) : "rgba(239,68,68,0.45)"} rx="2" />
          <text x={674} y={s.y+9} fill={rgba(c,0.32)} fontSize="7.5" fontFamily="monospace">{s.label}</text>
        </g>
      ))}

      {/* BUY badge */}
      <rect x="720" y="84" width="82" height="28" rx="14"
        fill={rgba(c,0.18)} stroke={c} strokeWidth="1.5" />
      <text x="761" y="102" textAnchor="middle" fill={c}
        fontSize="10" fontFamily="monospace" fontWeight="700">BUY ↑ 87%</text>

      {/* PSX label */}
      <text x="308" y="38" textAnchor="end" fill={rgba(c,0.22)} fontSize="8" fontFamily="monospace">PSX</text>

      <Fades id="ta" w={840} h={208} />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────
// 2. AI PHYSIOTHERAPY — Pose skeleton + F1 stats
// ─────────────────────────────────────────────────────────────────
function IllustPhysio({ c }: { c: string }) {
  // Joint positions [x, y, label?]
  const joints: [number, number][] = [
    [200, 18],  // 0 head-top
    [200, 32],  // 1 neck
    [162, 52],  // 2 L shoulder
    [238, 52],  // 3 R shoulder
    [138, 82],  // 4 L elbow
    [262, 82],  // 5 R elbow
    [118, 110], // 6 L wrist
    [282, 110], // 7 R wrist
    [200, 100], // 8 hip center
    [175, 100], // 9 L hip
    [225, 100], // 10 R hip
    [165, 132], // 11 L knee
    [235, 132], // 12 R knee
    [158, 152], // 13 L ankle
    [242, 152], // 14 R ankle
  ];

  const bones: [number,number][] = [
    [1,2],[1,3],[2,3],   // neck-shoulders
    [2,4],[4,6],          // L arm
    [3,5],[5,7],          // R arm
    [1,8],                // spine
    [8,9],[8,10],         // hips
    [9,11],[11,13],       // L leg
    [10,12],[12,14],      // R leg
  ];

  return (
    <svg width="100%" height="100%" viewBox="0 0 560 160" preserveAspectRatio="xMidYMid slice">
      <FadeEdges id="ph" bg="#141414" />

      {/* Detection bounding box */}
      <rect x="103" y="5" width="196" height="150"
        fill="none" stroke={rgba(c,0.3)} strokeWidth="1.5" strokeDasharray="5,4" rx="4" />
      {/* Corner ticks */}
      {([[103,5],[299,5],[103,155],[299,155]] as [number,number][]).map(([x,y],i) => (
        <g key={i}>
          <line x1={x} y1={y} x2={x+(i%2===0?8:-8)} y2={y} stroke={c} strokeWidth="2" />
          <line x1={x} y1={y} x2={x} y2={y+(i<2?8:-8)} stroke={c} strokeWidth="2" />
        </g>
      ))}

      {/* Skeleton bones */}
      {bones.map(([a,b],i) => (
        <line key={i}
          x1={joints[a][0]} y1={joints[a][1]}
          x2={joints[b][0]} y2={joints[b][1]}
          stroke={rgba(c,0.4)} strokeWidth="2" strokeLinecap="round" />
      ))}

      {/* Head circle */}
      <circle cx={200} cy={10} r={12} fill={rgba(c,0.1)} stroke={c} strokeWidth="1.5" />

      {/* Joint dots */}
      {joints.slice(1).map(([x,y],i) => (
        <motion.circle key={i} cx={x} cy={y} r={4}
          fill={rgba(c,0.25)} stroke={c} strokeWidth="1.5"
          animate={{ opacity: [0.5,1,0.5] }}
          transition={inf(i*0.1, 2.5)} />
      ))}

      {/* Confidence label top-left of box */}
      <text x="106" y="18" fill={c} fontSize="7.5" fontFamily="monospace">POSE DETECTED</text>

      {/* ── Right panel: stats ── */}
      <line x1="335" y1="15" x2="335" y2="145" stroke={rgba(c,0.08)} strokeWidth="1" />

      <text x="352" y="32" fill={rgba(c,0.55)} fontSize="8.5" fontFamily="monospace" fontWeight="700">
        POSE DETECTION
      </text>
      <text x="352" y="48" fill="rgba(255,255,255,0.2)" fontSize="7.5" fontFamily="monospace">
        CNN + Bi-LSTM
      </text>

      {/* F1 score bar */}
      <text x="352" y="68" fill="rgba(255,255,255,0.25)" fontSize="7.5" fontFamily="monospace">F1 Score</text>
      <rect x="352" y="74" width="168" height="12" rx="6" fill="rgba(255,255,255,0.06)" />
      <motion.rect x="352" y="74" width="0" height="12" rx="6" fill={rgba(c,0.75)}
        animate={{ width: 126 }} transition={{ duration: 1.8, ease: "easeOut", delay: 0.5 }} />
      <text x="484" y="84" fill={c} fontSize="8" fontFamily="monospace" fontWeight="700">0.75</text>

      {/* Stats list */}
      {([
        "14,000+ training videos",
        "24 GB dataset",
        "XGBoost stack ensemble",
      ] as string[]).map((t,i) => (
        <g key={i}>
          <circle cx="355" cy={102+i*18} r="2.5" fill={rgba(c,0.5)} />
          <text x="362" y={106+i*18} fill="rgba(255,255,255,0.22)" fontSize="7.5" fontFamily="monospace">{t}</text>
        </g>
      ))}

      <Fades id="ph" w={560} h={160} />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────
// 3. RAG LINKEDIN — Pipeline: doc → embed → retrieve → resume
// ─────────────────────────────────────────────────────────────────
function IllustRAG({ c }: { c: string }) {
  return (
    <svg width="100%" height="100%" viewBox="0 0 560 160" preserveAspectRatio="xMidYMid slice">
      <FadeEdges id="rl" bg="#141414" />

      {/* ── LEFT: LinkedIn job doc ── */}
      <rect x="30" y="25" width="80" height="108" rx="4"
        fill={rgba(c,0.07)} stroke={rgba(c,0.35)} strokeWidth="1.5" />
      {/* doc header bar */}
      <rect x="30" y="25" width="80" height="22" rx="4"
        fill={rgba(c,0.2)} />
      <rect x="30" y="39" width="80" height="8" rx="0" fill={rgba(c,0.2)} />
      <text x="70" y="40" textAnchor="middle" fill={c} fontSize="7.5" fontFamily="monospace" fontWeight="700">in</text>
      {/* text lines */}
      {[56,70,84,98,112,124].map((y,i) => (
        <rect key={y} x="40" y={y} width={i%2===0?52:38} height="6" rx="3" fill={rgba(c,0.15)} />
      ))}
      <text x="70" y="148" textAnchor="middle" fill={rgba(c,0.3)} fontSize="7.5" fontFamily="monospace">JOB DESC</text>

      {/* ── Arrow 1 ── */}
      <motion.path d="M 118 79 L 155 79" fill="none" stroke={rgba(c,0.5)} strokeWidth="2"
        strokeDasharray="4,3"
        animate={{ strokeDashoffset: [0, -14] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }} />
      <path d="M 153 74 L 160 79 L 153 84" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" />

      {/* ── CENTER: ChromaDB vector store ── */}
      {/* Cylinder */}
      <ellipse cx="215" cy="50" rx="35" ry="10" fill={rgba(c,0.12)} stroke={rgba(c,0.45)} strokeWidth="1.5" />
      <rect x="180" y="50" width="70" height="58" fill={rgba(c,0.08)} stroke={rgba(c,0.4)} strokeWidth="1.5" />
      <ellipse cx="215" cy="108" rx="35" ry="10" fill={rgba(c,0.15)} stroke={rgba(c,0.45)} strokeWidth="1.5" />
      <text x="215" y="82" textAnchor="middle" fill={c} fontSize="8" fontFamily="monospace" fontWeight="700">CHROMA</text>
      <text x="215" y="95" textAnchor="middle" fill={rgba(c,0.45)} fontSize="7.5" fontFamily="monospace">VECTOR DB</text>
      {/* scatter dots inside */}
      {([
        [195,62],[210,58],[226,64],[200,74],[220,70],[208,82],[228,78],
      ] as [number,number][]).map(([x,y],i) => (
        <motion.circle key={i} cx={x} cy={y} r={2.5}
          fill={rgba(c,0.5)}
          animate={{ opacity: [0.3,1,0.3] }}
          transition={inf(i*0.15, 2)} />
      ))}
      <text x="215" y="148" textAnchor="middle" fill={rgba(c,0.3)} fontSize="7.5" fontFamily="monospace">k=4 RETRIEVED</text>

      {/* ── Arrow 2 ── */}
      <motion.path d="M 252 79 L 290 79" fill="none" stroke={rgba(c,0.5)} strokeWidth="2"
        strokeDasharray="4,3"
        animate={{ strokeDashoffset: [0, -14] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "linear", delay: 0.3 }} />
      <path d="M 288 74 L 295 79 L 288 84" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" />

      {/* ── RIGHT: Tailored PDF resume ── */}
      <rect x="300" y="25" width="80" height="108" rx="4"
        fill={rgba(c,0.07)} stroke={rgba(c,0.35)} strokeWidth="1.5" />
      <rect x="300" y="25" width="80" height="18" rx="4" fill={rgba(c,0.2)} />
      <rect x="300" y="35" width="80" height="8" rx="0" fill={rgba(c,0.2)} />
      <text x="340" y="37" textAnchor="middle" fill={c} fontSize="7" fontFamily="monospace" fontWeight="700">PDF</text>
      {/* tailored content lines — highlighted */}
      {[52,64,76,88,100,112,122].map((y,i) => (
        <rect key={y} x="310" y={y} width={i%3===0?52:i%3===1?40:30} height="6" rx="3"
          fill={i%3===0 ? rgba(c,0.4) : rgba(c,0.15)} />
      ))}
      <text x="340" y="148" textAnchor="middle" fill={rgba(c,0.3)} fontSize="7.5" fontFamily="monospace">TAILORED CV</text>

      {/* ── Right stats ── */}
      <line x1="408" y1="15" x2="408" y2="145" stroke={rgba(c,0.07)} strokeWidth="1" />
      <text x="422" y="34" fill={rgba(c,0.55)} fontSize="8.5" fontFamily="monospace" fontWeight="700">RAG PIPELINE</text>
      {([
        "ChromaDB + FAISS",
        "text-embedding-ada-002",
        "GPT-4.1-mini rewriter",
        "SSE live streaming",
        "ReportLab PDF gen",
      ] as string[]).map((t,i) => (
        <g key={i}>
          <circle cx="422" cy={50+i*18} r="2" fill={rgba(c,0.5)} />
          <text x="428" y={54+i*18} fill="rgba(255,255,255,0.2)" fontSize="7" fontFamily="monospace">{t}</text>
        </g>
      ))}

      <Fades id="rl" w={560} h={160} />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────
// 4. BOOKNFIX — Multi-agent radial network
// ─────────────────────────────────────────────────────────────────
function IllustBookNFix({ c }: { c: string }) {
  const cx = 210, cy = 82, r = 65;
  // 5 agents at 72° intervals starting from 270° (top)
  const agents: { label: string; x: number; y: number; icon: string }[] = [
    { label: "PARSE",  x: cx + r*Math.cos(-90*Math.PI/180),  y: cy + r*Math.sin(-90*Math.PI/180),  icon: "⚙" },
    { label: "SEARCH", x: cx + r*Math.cos(-18*Math.PI/180),  y: cy + r*Math.sin(-18*Math.PI/180),  icon: "◎" },
    { label: "RANK",   x: cx + r*Math.cos(54*Math.PI/180),   y: cy + r*Math.sin(54*Math.PI/180),   icon: "▲" },
    { label: "BOOK",   x: cx + r*Math.cos(126*Math.PI/180),  y: cy + r*Math.sin(126*Math.PI/180),  icon: "□" },
    { label: "VAPI",   x: cx + r*Math.cos(198*Math.PI/180),  y: cy + r*Math.sin(198*Math.PI/180),  icon: "♪" },
  ];

  return (
    <svg width="100%" height="100%" viewBox="0 0 560 160" preserveAspectRatio="xMidYMid slice">
      <FadeEdges id="bn" bg="#141414" />

      {/* Spoke lines — animated dashes flowing outward */}
      {agents.map((a,i) => (
        <motion.line key={i}
          x1={cx} y1={cy} x2={a.x} y2={a.y}
          stroke={rgba(c,0.25)} strokeWidth="1.5" strokeDasharray="5,4"
          animate={{ strokeDashoffset: [0, -18] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "linear", delay: i*0.15 }} />
      ))}

      {/* Agent nodes */}
      {agents.map((a,i) => (
        <g key={i}>
          <motion.circle cx={a.x} cy={a.y} r={18}
            fill={rgba(c,0.1)} stroke={c} strokeWidth="1.5"
            animate={{ opacity: [0.5,1,0.5] }}
            transition={inf(i*0.2, 2.5)} />
          <text x={a.x} y={a.y+4} textAnchor="middle" fill={c}
            fontSize="8" fontFamily="monospace" fontWeight="700">{a.label}</text>
        </g>
      ))}

      {/* Central LLM node */}
      <motion.circle cx={cx} cy={cy} r={28}
        fill={rgba(c,0.18)} stroke={c} strokeWidth="2"
        animate={{ opacity: [0.7,1,0.7] }}
        transition={inf(0, 2)} />
      <motion.circle cx={cx} cy={cy} r={28}
        fill="none" stroke={c} strokeWidth="1.5"
        animate={{ r: [28,40,28], opacity: [0.2,0,0.2] }}
        transition={inf(0, 2.5)} />
      <text x={cx} y={cy-4} textAnchor="middle" fill={c} fontSize="9" fontFamily="monospace" fontWeight="700">LLM</text>
      <text x={cx} y={cy+8} textAnchor="middle" fill={rgba(c,0.55)} fontSize="7" fontFamily="monospace">Groq</text>

      {/* ── Right stats panel ── */}
      <line x1="308" y1="15" x2="308" y2="145" stroke={rgba(c,0.07)} strokeWidth="1" />
      <text x="322" y="32" fill={rgba(c,0.55)} fontSize="8.5" fontFamily="monospace" fontWeight="700">AGENTIC CORE</text>
      {([
        "5 specialized agents",
        "6 autonomous tools",
        "Groq LLaMA-3.3-70B",
        "VAPI voice AI calls",
        "SSE live step stream",
        "Urdu + English NLP",
      ] as string[]).map((t,i) => (
        <g key={i}>
          <circle cx="322" cy={48+i*17} r="2" fill={rgba(c,0.5)} />
          <text x="328" y={52+i*17} fill="rgba(255,255,255,0.22)" fontSize="7" fontFamily="monospace">{t}</text>
        </g>
      ))}

      <Fades id="bn" w={560} h={160} />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────
// 5. FACE DETECTION — Face mesh + bounding box
// ─────────────────────────────────────────────────────────────────
function IllustFace({ c }: { c: string }) {
  const landmarks: [number,number][] = [
    [200,18],                                             // forehead
    [170,38],[183,33],[197,34],[213,34],[227,33],[242,38], // eyebrows
    [173,54],[187,51],[201,53],                           // L eye
    [199,53],[213,51],[228,54],                           // R eye
    [200,66],[195,79],[200,84],[205,79],                  // nose
    [181,104],[200,107],[219,104],                        // upper lip
    [200,118],                                            // lower lip
    [144,90],[158,120],[175,140],[200,150],[225,140],[242,120],[256,90], // jaw
  ];

  return (
    <svg width="100%" height="100%" viewBox="0 0 560 160" preserveAspectRatio="xMidYMid slice">
      <FadeEdges id="fd" bg="#141414" />

      {/* Detection bounding box */}
      <rect x="126" y="4" width="148" height="150"
        fill="none" stroke={rgba(c,0.35)} strokeWidth="1.5" strokeDasharray="6,4" rx="3" />
      {/* Corner brackets */}
      {([[126,4],[274,4],[126,154],[274,154]] as [number,number][]).map(([x,y],i) => (
        <g key={i}>
          <line x1={x} y1={y} x2={x+(i%2===0?10:-10)} y2={y} stroke={c} strokeWidth="2.5" />
          <line x1={x} y1={y} x2={x} y2={y+(i<2?10:-10)} stroke={c} strokeWidth="2.5" />
        </g>
      ))}

      {/* Face oval */}
      <ellipse cx={200} cy={82} rx={70} ry={74}
        fill={rgba(c,0.06)} stroke={rgba(c,0.35)} strokeWidth="1.5" />

      {/* Landmark dots */}
      {landmarks.map(([x,y],i) => (
        <motion.circle key={i} cx={x} cy={y} r={2.5}
          fill={c} opacity={0.7}
          animate={{ opacity: [0.35,0.9,0.35] }}
          transition={inf(i*0.06, 3)} />
      ))}

      {/* Confidence badge */}
      <rect x="278" y="4" width="68" height="22" rx="11"
        fill={rgba(c,0.18)} stroke={rgba(c,0.5)} strokeWidth="1" />
      <text x="312" y="19" textAnchor="middle" fill={c}
        fontSize="9" fontFamily="monospace" fontWeight="700">97.3%</text>

      {/* ── Right stats panel ── */}
      <line x1="348" y1="15" x2="348" y2="145" stroke={rgba(c,0.07)} strokeWidth="1" />
      <text x="362" y="32" fill={rgba(c,0.55)} fontSize="8.5" fontFamily="monospace" fontWeight="700">FACE DETECTION</text>

      {/* Confidence bar */}
      <text x="362" y="50" fill="rgba(255,255,255,0.25)" fontSize="7.5" fontFamily="monospace">Confidence</text>
      <rect x="362" y="56" width="148" height="10" rx="5" fill="rgba(255,255,255,0.06)" />
      <motion.rect x="362" y="56" width="0" height="10" rx="5" fill={rgba(c,0.75)}
        animate={{ width: 144 }}
        transition={{ duration: 1.8, ease: "easeOut", delay: 0.5 }} />

      {([
        "32-frame verification",
        "Facebook RetinaFace-50",
        "Frozen layers retrained",
        "ArcFace embeddings",
        "40% proxy reduction",
      ] as string[]).map((t,i) => (
        <g key={i}>
          <circle cx="362" cy={78+i*17} r="2" fill={rgba(c,0.5)} />
          <text x="368" y={82+i*17} fill="rgba(255,255,255,0.22)" fontSize="7" fontFamily="monospace">{t}</text>
        </g>
      ))}

      <Fades id="fd" w={560} h={160} />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────
// 6. NETWORK SECURITY — MLOps cloud topology
// ─────────────────────────────────────────────────────────────────
function IllustNetwork({ c }: { c: string }) {
  // Diamond topology: center=AWS, top=GitHub, right=S3, bottom=Docker, left=MLflow
  type TNode = { x: number; y: number; label: string; sub: string; shape: "circle"|"rect" };
  const center = { x: 240, y: 80 };
  const nodes: TNode[] = [
    { x: 240, y: 18,  label: "GitHub",  sub: "Source",   shape: "circle" },
    { x: 320, y: 80,  label: "S3",      sub: "Artifacts",shape: "circle" },
    { x: 240, y: 142, label: "Docker",  sub: "Container",shape: "rect"   },
    { x: 160, y: 80,  label: "MLflow",  sub: "Registry", shape: "circle" },
  ];

  const edges: [number, number, number, number][] = [
    [240, 30, 240, 50],   // GitHub → center
    [310, 80, 260, 80],   // S3 → center
    [240, 130, 240, 110], // Docker → center
    [172, 80, 220, 80],   // MLflow → center
  ];

  return (
    <svg width="100%" height="100%" viewBox="0 0 560 160" preserveAspectRatio="xMidYMid slice">
      <FadeEdges id="ns" bg="#141414" />

      {/* Connecting lines with animated packets */}
      {edges.map(([x1,y1,x2,y2],i) => (
        <g key={i}>
          <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={rgba(c,0.18)} strokeWidth="1.5" />
          {/* Animated packet */}
          <motion.circle r={3} fill={c}
            animate={{
              cx: [x1, x2],
              cy: [y1, y2],
              opacity: [0, 1, 0],
            }}
            transition={{ duration: 1.8, repeat: Infinity, delay: i*0.4, ease: "linear" }} />
        </g>
      ))}

      {/* Satellite nodes */}
      {nodes.map((n,i) => (
        <g key={i}>
          {n.shape === "circle" ? (
            <motion.circle cx={n.x} cy={n.y} r={18}
              fill={rgba(c,0.1)} stroke={rgba(c,0.5)} strokeWidth="1.5"
              animate={{ opacity: [0.55,1,0.55] }}
              transition={inf(i*0.25, 2.5)} />
          ) : (
            <motion.rect x={n.x-18} y={n.y-14} width={36} height={28} rx={5}
              fill={rgba(c,0.1)} stroke={rgba(c,0.5)} strokeWidth="1.5"
              animate={{ opacity: [0.55,1,0.55] }}
              transition={inf(i*0.25, 2.5)} />
          )}
          <text x={n.x} y={n.y+4} textAnchor="middle" fill={rgba(c,0.75)}
            fontSize="8" fontFamily="monospace" fontWeight="700">{n.label}</text>
          <text x={n.x} y={n.y+18} textAnchor="middle" fill={rgba(c,0.3)}
            fontSize="6.5" fontFamily="monospace">{n.sub}</text>
        </g>
      ))}

      {/* Center: AWS EC2 shield */}
      <motion.circle cx={center.x} cy={center.y} r={26}
        fill={rgba(c,0.18)} stroke={c} strokeWidth="2"
        animate={{ opacity: [0.7,1,0.7] }}
        transition={inf(0, 2)} />
      <motion.circle cx={center.x} cy={center.y} r={26}
        fill="none" stroke={c} strokeWidth="1"
        animate={{ r: [26, 38, 26], opacity: [0.25,0,0.25] }}
        transition={inf(0, 2.5)} />
      <text x={center.x} y={center.y-3} textAnchor="middle" fill={c}
        fontSize="8.5" fontFamily="monospace" fontWeight="700">EC2</text>
      <text x={center.x} y={center.y+9} textAnchor="middle" fill={rgba(c,0.5)}
        fontSize="7" fontFamily="monospace">AWS</text>

      {/* 92% accuracy badge */}
      <rect x="312" y="4" width="58" height="22" rx="11"
        fill={rgba(c,0.2)} stroke={c} strokeWidth="1.5" />
      <text x="341" y="19" textAnchor="middle" fill={c}
        fontSize="9" fontFamily="monospace" fontWeight="700">92% ACC</text>

      {/* ── Right stats panel ── */}
      <line x1="388" y1="15" x2="388" y2="145" stroke={rgba(c,0.07)} strokeWidth="1" />
      <text x="402" y="32" fill={rgba(c,0.55)} fontSize="8.5" fontFamily="monospace" fontWeight="700">MLOPS STACK</text>
      {([
        "GitHub Actions CI/CD",
        "Docker container",
        "AWS EC2 deployment",
        "MLflow experiment log",
        "Amazon S3 artifacts",
        "ECR image registry",
      ] as string[]).map((t,i) => (
        <g key={i}>
          <circle cx="402" cy={48+i*17} r="2" fill={rgba(c,0.5)} />
          <text x="408" y={52+i*17} fill="rgba(255,255,255,0.22)" fontSize="7" fontFamily="monospace">{t}</text>
        </g>
      ))}

      <Fades id="ns" w={560} h={160} />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────
// Main export
// ─────────────────────────────────────────────────────────────────
export function ProjectIllustration({ index, accentColor }: { index: number; accentColor: string }) {
  const col = HEX[accentColor] ?? "#f97316";
  switch (index) {
    case 0: return <IllustTrade c={col} />;
    case 1: return <IllustPhysio c={col} />;
    case 2: return <IllustRAG c={col} />;
    case 3: return <IllustBookNFix c={col} />;
    case 4: return <IllustFace c={col} />;
    case 5: return <IllustNetwork c={col} />;
    default: return null;
  }
}
