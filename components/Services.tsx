export default function Services() {
  const services = [
    {
      icon: '🎨',
      title: 'Brand Design',
      description: 'Creating unique visual identities that capture the essence of your brand through innovative typography and design systems.'
    },
    {
      icon: '💻',
      title: 'Web Development',
      description: 'Building responsive, typography-focused websites that deliver exceptional user experiences across all devices.'
    },
    {
      icon: '📱',
      title: 'UI/UX Design',
      description: 'Designing intuitive interfaces with a strong emphasis on typographic hierarchy and visual communication.'
    },
    {
      icon: '🎬',
      title: 'Motion Graphics',
      description: 'Bringing typography to life through dynamic animations and engaging motion design solutions.'
    }
  ];

  return (
    <section id="services">
      <div className="container">
        <h2 className="section-title fade-in">Our Services</h2>
        <div className="services-container">
          {services.map((service, index) => (
            <div key={index} className="service-card fade-in">
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
