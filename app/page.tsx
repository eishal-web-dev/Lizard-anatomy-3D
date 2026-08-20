"use client";

import { useMemo, useState } from "react";

const layers = [
  { id: "external", index: "01", label: "External", title: "Living armour", copy: "Overlapping scales create a flexible barrier that limits water loss and protects the body." },
  { id: "muscle", index: "02", label: "Muscles", title: "Motion, mapped", copy: "Segmented muscle groups convert stored chemical energy into bursts of climbing, gripping and escape." },
  { id: "organs", index: "03", label: "Organs", title: "Systems in sync", copy: "A compact respiratory, digestive and circulatory system keeps the lizard fast and thermally responsive." },
  { id: "skeleton", index: "04", label: "Skeleton", title: "Built to bend", copy: "A lightweight spine, mobile ribs and splayed limbs balance flexibility with structural support." },
] as const;

type LayerId = (typeof layers)[number]["id"];

function LizardModel({ layer }: { layer: LayerId }) {
  return (
    <div className={`lizard-model layer-${layer}`} aria-label={`${layer} anatomical view of a lizard`}>
      <div className="tail"><i /><i /><i /><i /><i /></div>
      <div className="body">
        <span className="scale-noise" />
        <div className="muscle-fibres"><b /><b /><b /><b /><b /><b /></div>
        <div className="organs">
          <span className="lung left" /><span className="lung right" />
          <span className="heart">♥</span><span className="liver" /><span className="gut" />
        </div>
        <div className="skeleton">
          <span className="spine" />
          {Array.from({ length: 9 }).map((_, i) => <span className="rib" key={i} style={{ "--i": i } as React.CSSProperties} />)}
        </div>
      </div>
      <div className="neck" />
      <div className="head"><span className="eye" /><span className="jaw" /></div>
      <div className="leg leg-fl"><span /><i /></div><div className="leg leg-fr"><span /><i /></div>
      <div className="leg leg-bl"><span /><i /></div><div className="leg leg-br"><span /><i /></div>
      <span className="scan-line" />
      <span className="label label-a">Cranial structure</span><span className="label label-b">Thoracic cavity</span><span className="label label-c">Caudal vertebrae</span>
    </div>
  );
}

export default function Home() {
  const [layer, setLayer] = useState<LayerId>("external");
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const active = useMemo(() => layers.find((item) => item.id === layer)!, [layer]);
  return (
    <main>
      <nav className="nav-shell">
        <a className="brand" href="#top"><span>ASHES</span> / FIELD LAB 01</a>
        <div className="nav-meta"><span className="live-dot" /> Interactive specimen</div>
        <a className="nav-link" href="#anatomy">Explore anatomy ↘</a>
      </nav>
      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span>Digital specimen № 01</span><span>Hemidactylus frenatus</span></p>
          <h1>What if a<br /><em>website</em><br />had a pulse?</h1>
          <p className="hero-note">An interactive anatomical study of the common house gecko—designed, layered and brought to life on the web.</p>
        </div>
        <div className="hero-stage" onPointerMove={(e) => { const rect=e.currentTarget.getBoundingClientRect(); setRotation({x:((e.clientY-rect.top)/rect.height-.5)*-8,y:((e.clientX-rect.left)/rect.width-.5)*12}); }} onPointerLeave={() => setRotation({x:0,y:0})}>
          <div className="orb" /><div className="model-wrap" style={{transform:`rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`}}><LizardModel layer={layer} /></div>
          <span className="coordinate top">34.1872° N</span><span className="coordinate bottom">73.2421° E</span><span className="drag-note">MOVE CURSOR TO INSPECT</span>
        </div>
      </section>
      <section className="anatomy" id="anatomy">
        <header className="section-head"><p>Scroll through the specimen</p><h2>Four layers.<br />One living system.</h2></header>
        <div className="lab-grid">
          <div className="layer-nav" role="tablist" aria-label="Anatomical layers">
            {layers.map((item)=><button key={item.id} className={layer===item.id?"active":""} onClick={()=>setLayer(item.id)} role="tab" aria-selected={layer===item.id}><span>{item.index}</span>{item.label}<b>→</b></button>)}
          </div>
          <div className="specimen-card"><div className="card-grid"/><div className="model-wrap large"><LizardModel layer={layer}/></div><div className="card-index">{active.index}</div><div className="card-caption">Layer / {active.label}</div></div>
          <article className="layer-story" key={layer}><p className="eyebrow">Layer {active.index}</p><h3>{active.title}</h3><p>{active.copy}</p><dl><div><dt>View mode</dt><dd>{active.label}</dd></div><div><dt>Rendering</dt><dd>Real-time</dd></div><div><dt>Interaction</dt><dd>Touch / Cursor</dd></div></dl></article>
        </div>
      </section>
      <section className="manifesto"><p>NOT JUST A PAGE</p><h2>We turn the things people overlook into experiences they can’t ignore.</h2><div className="manifesto-bottom"><p>Objects. Products. Ideas. Organisms.<br/>Anything can become interactive.</p><a href="mailto:hello@ashesstack.cloud">What should we transform next? <span>↗</span></a></div></section>
      <footer><div className="footer-brand">ASHES<span>STACK</span></div><p>Interactive web experiences<br/>AI / 3D / Creative technology</p><p className="footer-right">Specimen 01 / 2026<br/>Built for the curious.</p></footer>
    </main>
  );
}
