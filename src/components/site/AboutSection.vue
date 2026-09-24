<template>
  <section id="about" class="section">
    <div class="shell">
      <div class="sec-head">
        <span class="sec-eyebrow">Get to know me better</span>
        <h2 class="sec-title">About Me</h2>
        <div class="sec-rule"></div>
      </div>

      <div class="about-grid">
        <div class="photo-card reveal">
          <span class="avail"><i class="d"></i> Available</span>
          <img
            :src="photo"
            alt="Ahmad Ridwan Rezani"
            width="840"
            height="1260"
            decoding="async"
          />
        </div>

        <div class="about-copy reveal" style="--i: 1">
          <p v-for="(p, i) in paragraphs" :key="i">{{ p }}</p>

          <div class="info-grid">
            <a
              v-for="f in facts"
              :key="f.label"
              class="info"
              :href="f.href || null"
              :target="f.href && f.href.startsWith('http') ? '_blank' : null"
              rel="noopener"
            >
              <span class="info-ic"><i :class="f.icon"></i></span>
              <span class="info-txt">
                <small>{{ f.label }}</small>
                <strong>{{ f.value }}</strong>
              </span>
            </a>
          </div>

          <div class="socials">
            <a
              v-for="s in socials"
              :key="s.icon"
              :href="s.href"
              target="_blank"
              rel="noopener"
              :aria-label="s.label"
            >
              <i :class="s.icon"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import reveal from '../../mixins/reveal';

export default {
  name: 'AboutSection',
  mixins: [reveal],
  data() {
    return {
      // TODO(ridwan): ganti dengan fotomu di src/assets/
      photo: require('../../assets/profile.jpg'),
      paragraphs: [
        'Senior IT and software engineering professional with 9+ years across enterprise application development, system architecture, business analysis, DevOps, cloud technology, and IT operations. I have worked the full lifecycle — requirements analysis, solution design, development, integration, testing, deployment, and the production support afterwards.',
        'Currently at Indomobil Group, designing microservice-based architecture for Dealer Management System initiatives: service communication, REST APIs, database interaction, and system integration. Before that, DevOps and automation at Smartfren Telecom, business analysis, and data center engineering.',
        'What I enjoy most is the translation work — turning operational processes that business users describe in their own words into systems that actually hold up when the data gets messy.',
      ],
      facts: [
        {
          label: 'Email',
          value: 'ridwanrezani@gmail.com',
          icon: 'fas fa-envelope',
          href: 'mailto:ridwanrezani@gmail.com',
        },
        {
          label: 'Location',
          value: 'Jakarta, Indonesia',
          icon: 'fas fa-map-marker-alt',
        },
        { label: 'Experience', value: '9+ years', icon: 'fas fa-briefcase' },
        {
          label: 'Education',
          value: 'Post Graduate — BINUS University',
          icon: 'fas fa-graduation-cap',
        },
        {
          label: 'Languages',
          value: 'Indonesian, English',
          icon: 'fas fa-language',
        },
        {
          label: 'Website',
          value: 'rezanii.netlify.app',
          icon: 'fas fa-globe',
          href: 'https://rezanii.netlify.app',
        },
      ],
      socials: [
        {
          icon: 'fab fa-github',
          href: 'https://github.com/rezanii',
          label: 'GitHub',
        },
        {
          icon: 'fab fa-linkedin-in',
          href: 'https://www.linkedin.com/in/rezani/',
          label: 'LinkedIn',
        },
        {
          icon: 'fas fa-envelope',
          href: 'mailto:ridwanrezani@gmail.com',
          label: 'Email',
        },
      ],
    };
  },
};
</script>

<style scoped>
.about-grid {
  display: grid;
  grid-template-columns: minmax(0, 0.78fr) minmax(0, 1.4fr);
  gap: clamp(1.5rem, 4vw, 3.5rem);
  align-items: stretch;
}

.photo-card {
  position: relative;
  border-radius: var(--radius);
  overflow: hidden;
  border: 1px solid var(--border);
  background: var(--bg-alt);
  display: grid;
}

.photo-card img {
  width: 100%;
  height: 100%;
  min-height: 0;
  object-fit: cover;
  object-position: 50% 22%;
  display: block;
}

.avail {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.28rem 0.7rem;
  border-radius: var(--radius-pill);
  background: rgba(255, 255, 255, 0.92);
  color: #047857;
  font-size: 0.7rem;
  font-weight: 600;
}

.avail .d {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #10b981;
}

.about-copy p {
  color: var(--fg-muted);
  font-size: 0.97rem;
  line-height: 1.8;
  margin-bottom: 1rem;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap: 0.75rem;
  margin-top: 1.75rem;
}

.info {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding: 0.85rem 1rem;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface);
  transition: border-color 240ms ease, transform 240ms var(--ease);
}

.info:hover {
  border-color: var(--accent);
  transform: translateY(-2px);
}

.info-ic {
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  flex: none;
  border-radius: 9px;
  background: var(--accent-soft);
  color: var(--accent);
  font-size: 0.85rem;
}

.info-txt {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.info-txt small {
  font-size: 0.7rem;
  color: var(--fg-faint);
}

.info-txt strong {
  font-size: 0.85rem;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.socials {
  display: flex;
  gap: 0.6rem;
  margin-top: 1.5rem;
}

.socials a {
  width: 38px;
  height: 38px;
  display: grid;
  place-items: center;
  border: 1px solid var(--border);
  border-radius: 50%;
  color: var(--fg-muted);
  font-size: 0.85rem;
  transition: all 240ms var(--ease);
}

.socials a:hover {
  background: var(--accent);
  border-color: var(--accent);
  color: #fff;
  transform: translateY(-3px);
}

@media (max-width: 860px) {
  .about-grid {
    grid-template-columns: 1fr;
  }
  .photo-card {
    max-width: 280px;
  }
  .photo-card img {
    height: auto;
    aspect-ratio: 4 / 5;
  }
}
</style>
