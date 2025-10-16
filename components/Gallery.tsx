'use client';

import { useState } from 'react';

export default function Gallery() {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const galleryImages = [
    'https://cdn.midjourney.com/921d92cb-996f-4d3a-aa06-257595ab9574/0_3.png',
    'https://cdn.midjourney.com/7e67b738-f518-4963-ab7f-0f6aee68631f/0_0.png',
    'https://cdn.midjourney.com/7e67b738-f518-4963-ab7f-0f6aee68631f/0_1.png',
    'https://cdn.midjourney.com/7e67b738-f518-4963-ab7f-0f6aee68631f/0_2.png',
    'https://cdn.midjourney.com/7e67b738-f518-4963-ab7f-0f6aee68631f/0_3.png',
    'https://cdn.midjourney.com/a727665f-52bb-4f12-8ab5-a14de7d37fa0/0_0.png',
    'https://cdn.midjourney.com/a727665f-52bb-4f12-8ab5-a14de7d37fa0/0_1.png',
    'https://cdn.midjourney.com/a727665f-52bb-4f12-8ab5-a14de7d37fa0/0_2.png',
    'https://cdn.midjourney.com/a727665f-52bb-4f12-8ab5-a14de7d37fa0/0_3.png',
    'https://cdn.midjourney.com/6f1e16bb-1c36-4d96-a63a-07d287befbb5/0_0.png',
    'https://cdn.midjourney.com/6f1e16bb-1c36-4d96-a63a-07d287befbb5/0_1.png',
    'https://cdn.midjourney.com/6f1e16bb-1c36-4d96-a63a-07d287befbb5/0_2.png'
  ];

  return (
    <section id="gallery">
      <div className="container">
        <h2 className="section-title fade-in">Visual Gallery</h2>
        <div className="gallery-wrapper">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="gallery-item fade-in"
              onClick={() => setLightboxImage(image)}
            >
              <img src={image} alt={`Gallery ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>

      {lightboxImage && (
        <div
          className="lightbox"
          onClick={() => setLightboxImage(null)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0,0,0,0.9)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 10000
          }}
        >
          <img src={lightboxImage} alt="Lightbox" style={{ maxWidth: '90%', maxHeight: '90%' }} />
        </div>
      )}
    </section>
  );
}
