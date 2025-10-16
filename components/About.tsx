import Image from 'next/image';

export default function About() {
  return (
    <section id="about">
      <div className="container">
        <h2 className="section-title fade-in">About Our Vision</h2>
        <div className="about-grid">
          <div className="about-text fade-in">
            <h3 className="subtitle">Crafting Digital Experiences</h3>
            <p>We are a creative studio specializing in typography-driven design. Our passion lies in transforming letters into powerful visual narratives that captivate and inspire. With a blend of artistic innovation and technical expertise, we create memorable digital experiences that push the boundaries of conventional design.</p>
            <p>Our approach combines cutting-edge technology with timeless design principles, ensuring every project we undertake is both visually stunning and functionally superior. We believe that great typography is the foundation of exceptional design.</p>
          </div>
          <div className="about-image slide-in-right">
            <img src="https://cdn.midjourney.com/e2961bd3-5f3e-4df5-97b0-372cde33881e/0_3.png" alt="Creative Design" />
          </div>
        </div>
      </div>
    </section>
  );
}
