export default function Hero() {
  return (
    <section id="home">
      <div className="floating-shapes">
        <div className="shape"></div>
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title">
            <span style={{ '--i': 0 } as React.CSSProperties}>CREATIVE</span><br />
            <span style={{ '--i': 1 } as React.CSSProperties} className="glitch">TYPOGRAPHY</span><br />
            <span style={{ '--i': 2 } as React.CSSProperties}>STUDIO</span>
          </h1>
          <p className="subtitle text-reveal">
            <span style={{ '--i': 0 } as React.CSSProperties}>Where</span>{' '}
            <span style={{ '--i': 1 } as React.CSSProperties}>Letters</span>{' '}
            <span style={{ '--i': 2 } as React.CSSProperties}>Come</span>{' '}
            <span style={{ '--i': 3 } as React.CSSProperties}>To</span>{' '}
            <span style={{ '--i': 4 } as React.CSSProperties}>Life</span>
          </p>
        </div>
      </div>
      <div className="scroll-indicator"></div>
    </section>
  );
}
