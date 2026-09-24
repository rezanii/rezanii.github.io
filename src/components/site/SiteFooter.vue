<template>
    <footer class="foot section-alt">
        <div class="shell">
            <div class="cols">
                <div class="col brand-col">
                    <a href="#home" class="brand" @click.prevent="go('#home')"
                        >AR<span>.</span></a
                    >
                    <p>
                        Senior software engineer - enterprise applications,
                        microservice architecture, DevOps, and system
                        integration. 9+ years in the field.
                    </p>
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

                <div v-for="col in columns" :key="col.title" class="col">
                    <h4>{{ col.title }}</h4>
                    <ul>
                        <li v-for="l in col.links" :key="l.label">
                            <a
                                :href="l.href"
                                @click="l.href.startsWith('#') ? jump($event, l.href) : null"
                                >{{ l.label }}</a
                            >
                        </li>
                    </ul>
                </div>
            </div>

            <div class="wordmark" aria-hidden="true">RIDWAN REZANI</div>

            <div class="bottom">
                <span class="built">
                    Built with <em>Vue</em> · <em>Vue CLI</em> · <em>Netlify</em>
                </span>
                <span>© {{ year }} Ahmad Ridwan Rezani. Made in Indonesia.</span>
            </div>
        </div>
    </footer>
</template>

<script>
export default {
    name: "SiteFooter",
    data() {
        return {
            year: new Date().getFullYear(),
            socials: [
                { icon: "fab fa-github", href: "https://github.com/rezanii", label: "GitHub" },
                { icon: "fab fa-linkedin-in", href: "https://www.linkedin.com/in/rezani/", label: "LinkedIn" },
                { icon: "fas fa-envelope", href: "mailto:ridwanrezani@gmail.com", label: "Email" },
            ],
            columns: [
                {
                    title: "Quick Links",
                    links: [
                        { label: "Home", href: "#home" },
                        { label: "About", href: "#about" },
                        { label: "Resume", href: "#resume" },
                        { label: "Projects", href: "#projects" },
                        { label: "Contact", href: "#contact" },
                    ],
                },
                {
                    title: "Services",
                    links: [
                        { label: "Enterprise Applications", href: "#services" },
                        { label: "Microservices & APIs", href: "#services" },
                        { label: "DevOps & CI/CD", href: "#services" },
                        { label: "Business Analysis", href: "#services" },
                        { label: "Database Engineering", href: "#services" },
                    ],
                },
                {
                    title: "Contact",
                    links: [
                        { label: "ridwanrezani@gmail.com", href: "mailto:ridwanrezani@gmail.com" },
                        { label: "linkedin.com/in/rezani", href: "https://www.linkedin.com/in/rezani/" },
                        { label: "github.com/rezanii", href: "https://github.com/rezanii" },
                        { label: "Jakarta, Indonesia", href: "#contact" },
                    ],
                },
            ],
        };
    },
    methods: {
        go(hash) {
            const el = document.querySelector(hash);
            if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        },
        jump(evt, hash) {
            evt.preventDefault();
            this.go(hash);
        },
    },
};
</script>

<style scoped>
.foot {
    padding-top: clamp(3rem, 6vw, 4.5rem);
    border-top: 1px solid var(--border);
    overflow: hidden;
}

.cols {
    display: grid;
    grid-template-columns: minmax(0, 1.4fr) repeat(3, minmax(0, 1fr));
    gap: 2rem;
}

.brand {
    font-size: 1.15rem;
    font-weight: 700;
}

.brand span {
    color: var(--accent);
}

.brand-col p {
    margin: 0.9rem 0 1.25rem;
    max-width: 34ch;
    font-size: 0.86rem;
    line-height: 1.7;
    color: var(--fg-muted);
}

.socials {
    display: flex;
    gap: 0.5rem;
}

.socials a {
    width: 34px;
    height: 34px;
    display: grid;
    place-items: center;
    border: 1px solid var(--border);
    border-radius: 50%;
    color: var(--fg-muted);
    font-size: 0.78rem;
    transition: all 240ms var(--ease);
}

.socials a:hover {
    background: var(--accent);
    border-color: var(--accent);
    color: #fff;
    transform: translateY(-3px);
}

.col h4 {
    font-size: 0.85rem;
    font-weight: 700;
    margin-bottom: 1rem;
}

.col ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0.55rem;
}

.col li a {
    font-size: 0.84rem;
    color: var(--fg-muted);
    transition: color 220ms ease, padding-left 220ms var(--ease);
}

.col li a:hover {
    color: var(--accent);
    padding-left: 4px;
}

/* wordmark outline raksasa */
.wordmark {
    margin-top: clamp(2.5rem, 6vw, 4rem);
    font-size: clamp(2.5rem, 11vw, 8rem);
    font-weight: 700;
    letter-spacing: 0.02em;
    text-align: center;
    line-height: 1;
    color: transparent;
    -webkit-text-stroke: 1px var(--accent);
    opacity: 0.18;
    user-select: none;
    white-space: nowrap;
}

.bottom {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    margin-top: 1.5rem;
    padding-block: 1.5rem;
    border-top: 1px solid var(--border);
    font-size: 0.78rem;
    color: var(--fg-muted);
}

.built em {
    font-style: normal;
    color: var(--accent);
}

@media (max-width: 860px) {
    .cols {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    .brand-col {
        grid-column: 1 / -1;
    }
}
</style>
