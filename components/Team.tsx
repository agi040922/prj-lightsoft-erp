export default function Team() {
  const teamMembers = [
    {
      image: 'https://cdn.midjourney.com/6f1e16bb-1c36-4d96-a63a-07d287befbb5/0_3.png',
      name: 'Alexandra Chen',
      role: 'Creative Director'
    },
    {
      image: 'https://cdn.midjourney.com/435bc734-6093-48be-8671-a03dac8c0646/0_0.png',
      name: 'Marcus Johnson',
      role: 'Lead Designer'
    },
    {
      image: 'https://cdn.midjourney.com/435bc734-6093-48be-8671-a03dac8c0646/0_1.png',
      name: 'Sofia Martinez',
      role: 'Typography Specialist'
    },
    {
      image: 'https://cdn.midjourney.com/435bc734-6093-48be-8671-a03dac8c0646/0_2.png',
      name: 'David Kim',
      role: 'Motion Designer'
    }
  ];

  return (
    <section id="team">
      <div className="container">
        <h2 className="section-title fade-in">Meet Our Team</h2>
        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <div key={index} className="team-member fade-in">
              <div className="member-image">
                <img src={member.image} alt={member.name} />
              </div>
              <h3 className="member-name">{member.name}</h3>
              <p className="member-role">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
