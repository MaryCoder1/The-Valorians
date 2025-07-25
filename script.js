document.addEventListener('DOMContentLoaded', () => {
  console.log('🛠️ script.js loaded');

  // helper to create elements
  function createEl(tag, className, text) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (text) el.textContent = text;
    return el;
  }

  function scrollToCollections() {
    document
      .getElementById('collections')
      .scrollIntoView({ behavior: 'smooth' });
  }

  // fetch & render
  fetch('collections.json')
    .then(res => {
      console.log('Fetch status:', res.status);
      return res.json();
    })
    .then(data => {
      console.log('Collections data:', data);
      const container = document.querySelector('.collections-container');
      if (!container) {
        console.error('No .collections-container found');
        return;
      }

      data.collections.forEach(seasonBlock => {
        const section = createEl('section', 'season-section');
        section.id = seasonBlock.season.toLowerCase();

        const h2 = createEl('h2', null, seasonBlock.label);
        section.appendChild(h2);

        const gallery = createEl('div', 'gallery');
        seasonBlock.items.forEach(item => {
          const card = createEl('div', 'item');
          const img = document.createElement('img');
          img.src = item.image;
          img.alt = item.title;

          const title = createEl('h3', null, item.title);
          const desc = createEl('p', null, item.description);

          card.append(img, title, desc);
          gallery.appendChild(card);
        });

        section.appendChild(gallery);
        container.appendChild(section);
      });
    })
    .catch(err => console.error('Error loading collections.json:', err));
});



document.getElementById('exploreBtn').addEventListener('click', function() {
  document.getElementById('collections').scrollIntoView({ behavior: 'smooth' });
});

document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  document.getElementById('formMessage').textContent = 'Thank you for reaching out! We will get back to you soon.';
  this.reset();
});
