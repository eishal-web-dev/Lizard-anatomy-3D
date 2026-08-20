"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const layers = [
  { name: "Skin", kicker: "The living surface", src: "/lizard/01-skin.webp", title: "Built to disappear.", copy: "Thousands of overlapping scales hold moisture in, danger out, and a whole living system together." },
  { name: "Flesh", kicker: "First reveal", src: "/lizard/02-flesh.webp", title: "Skin, swept away.", copy: "One scroll. One clean pull. The protective blanket leaves the structure beneath exposed." },
  { name: "Muscles", kicker: "Motion engine", src: "/lizard/03-muscles.webp", title: "Every movement has a map.", copy: "Long fibres store energy, tiny tendons transfer it, and four gripping limbs turn it into motion." },
  { name: "Organs", kicker: "Life support", src: "/lizard/04-organs.webp", title: "A city under the surface.", copy: "Heart, lungs, liver and gut work in a compact rhythm—quietly keeping the animal alive." },
  { name: "Skeleton", kicker: "Final structure", src: "/lizard/05-skeleton.webp", title: "Only the architecture remains.", copy: "A flexible spine, delicate ribs and articulated toes: the final framework beneath every layer." },
] as const;

export default function Home() {
  const [active, setActive] = useState(0);
  const [previous, setPrevious] = useState(0);
  const sections = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      const next = Number((visible.target as HTMLElement).dataset.layer);
      setActive((current) => { if (current !== next) setPrevious(current); return next; });
    }, { rootMargin: "-34% 0px -34% 0px", threshold: [0, .25, .6] });
    sections.current.forEach((section) => section && observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <main>
      <nav className="nav-shell">
        <a className="brand" href="#top"><span>ASHES</span> / FIELD LAB 01</a>
        <p><i /> Live specimen</p>
        <a className="nav-link" href="#dissection">Begin dissection ↓</a>
      </nav>
      <section className="hero" id="top">
        <div className="hero-grid" />
        <div className="hero-copy">
          <p className="eyebrow">Digital specimen № 01 · Hemidactylus frenatus</p>
          <h1>What&apos;s<br />under the<br /><em>surface?</em></h1>
          <p className="intro">Scroll to peel back a living system—one layer at a time.</p>
        </div>
        <div className="hero-lizard">
          <div className="halo" />
          <Image src={layers[0].src} alt="Realistic green gecko" width={1672} height={941} priority />
          <span className="spec-tag">Living specimen / 01</span>
        </div>
        <a className="scroll-cue" href="#dissection"><span>Scroll to dissect</span><b>↓</b></a>
      </section>
      <section className="dissection" id="dissection">
        <div className="sticky-stage">
          <div className="stage-grid" />
          <div className="stage-meta"><span>Layer 0{active + 1}</span><span>{layers[active].name}</span></div>
          <div className="specimen" style={{ transform: `translateY(${active * 5}px)` }}>
            <div className="pulse" key={`pulse-${active}`} />
            {layers.map((layer, index) => <Image key={layer.name} className={index === active ? "layer-image active" : "layer-image"} src={layer.src} alt={`${layer.name} anatomy of a gecko`} width={1672} height={941} priority={index < 2} />)}
            {previous !== active && <Image key={`peel-${active}`} className="peel-image" src={layers[previous].src} alt="" aria-hidden width={1672} height={941} />}
          </div>
          <div className="progress">{layers.map((layer, index) => <span key={layer.name} className={index <= active ? "filled" : ""} />)}</div>
          <p className="whoosh" key={`word-${active}`}>WHOOSH</p>
        </div>
        <div className="chapters">
          {layers.map((layer, index) => (
            <article key={layer.name} data-layer={index} ref={(node) => { sections.current[index] = node; }}>
              <p className="eyebrow">0{index + 1} / {layer.kicker}</p>
              <h2>{layer.title}</h2>
              <p>{layer.copy}</p>
              {index < layers.length - 1 && <span>Keep scrolling to remove {index === 0 ? "the skin" : index === 1 ? "the flesh" : index === 2 ? "the muscles" : "the organs"} ↓</span>}
            </article>
          ))}
        </div>
      </section>
      <section className="explore">
        <p className="eyebrow">The specimen ends. Curiosity doesn&apos;t.</p>
        <h2>Want to<br /><em>explore more?</em></h2>
        <p>Objects. Products. Creatures. Ideas.<br />We turn them into experiences people cannot ignore.</p>
        <a href="mailto:hello@ashesstack.cloud">Tell us what to transform next <span>↗</span></a>
      </section>
      <footer>
        <div className="footer-logo">ASHES<span>STACK</span></div>
        <p>Interactive web experiences<br />AI / 3D / Creative technology</p>
        <p>Specimen 01 / 2026<br />Built for the curious.</p>
      </footer>
    </main>
  );
}
