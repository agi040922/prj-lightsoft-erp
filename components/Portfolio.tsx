export default function Portfolio() {
  const portfolioItems = [
    {
      image: 'https://cdn.midjourney.com/e2961bd3-5f3e-4df5-97b0-372cde33881e/0_2.png',
      title: 'BRAND IDENTITY',
      subtitle: 'Visual Storytelling'
    },
    {
      image: 'https://cdn.midjourney.com/e2961bd3-5f3e-4df5-97b0-372cde33881e/0_1.png',
      title: 'WEB DESIGN',
      subtitle: 'Digital Innovation'
    },
    {
      image: 'https://cdn.midjourney.com/e2961bd3-5f3e-4df5-97b0-372cde33881e/0_0.png',
      title: 'TYPOGRAPHY ART',
      subtitle: 'Letter Crafting'
    },
    {
      image: 'https://cdn.midjourney.com/921d92cb-996f-4d3a-aa06-257595ab9574/0_1.png',
      title: 'MOTION DESIGN',
      subtitle: 'Dynamic Typography'
    },
    {
      image: 'https://cdn.midjourney.com/921d92cb-996f-4d3a-aa06-257595ab9574/0_0.png',
      title: 'PRINT DESIGN',
      subtitle: 'Tangible Beauty'
    },
    {
      image: 'https://cdn.midjourney.com/921d92cb-996f-4d3a-aa06-257595ab9574/0_2.png',
      title: 'EXPERIMENTAL',
      subtitle: 'Pushing Boundaries'
    }
  ];

  return (
    <section id="portfolio">
      <div className="container">
        <h2 className="section-title fade-in">Featured Works</h2>
        <div className="portfolio-grid">
          {portfolioItems.map((item, index) => (
            <div key={index} className="portfolio-item scale-in">
              <img src={item.image} alt={`Project ${index + 1}`} />
              <div className="portfolio-overlay">
                <h3 className="portfolio-title">{item.title}</h3>
                <p className="subtitle">{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
