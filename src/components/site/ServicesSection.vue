<template>
    <section id="services" class="section section-alt">
        <div class="shell">
            <div class="sec-head">
                <span class="sec-eyebrow">What I can do for you</span>
                <h2 class="sec-title">Services</h2>
                <div class="sec-rule"></div>
                <p class="sec-lead">
                    Hover — or tap on mobile — to see what each one covers.
                </p>
            </div>

            <div class="svc-grid">
                <article
                    v-for="(s, i) in services"
                    :key="s.title"
                    class="flip reveal"
                    :class="{ 'is-flipped': flipped === i }"
                    :style="{ '--i': i % 3 }"
                    tabindex="0"
                    role="button"
                    :aria-label="s.title + ' — show details'"
                    @click="toggle(i)"
                    @keydown.enter.prevent="toggle(i)"
                    @keydown.space.prevent="toggle(i)"
                >
                    <div class="flip-inner">
                        <div class="face front">
                            <span class="svc-ic"><i :class="s.icon"></i></span>
                            <h3>{{ s.title }}</h3>
                            <span class="hint">
                                <i class="fas fa-sync-alt"></i> details
                            </span>
                        </div>

                        <div class="face back">
                            <span class="back-ic"><i :class="s.icon"></i></span>
                            <h3>{{ s.title }}</h3>
                            <p>{{ s.desc }}</p>
                        </div>
                    </div>
                </article>
            </div>
        </div>

        <!-- CTA band -->
        <div class="cta-band reveal">
            <div class="shell cta-inner">
                <h2>
                    Let's Build Something
                    <span class="hl">Amazing</span> Together
                </h2>
                <p>
                    I'm open to freelance projects and full-time roles. Tell me
                    what you're building and let's see how I can help.
                </p>
                <a
                    href="#contact"
                    class="cta-btn"
                    @click.prevent="go('#contact')"
                >
                    Get in Touch <i class="fas fa-arrow-right"></i>
                </a>
            </div>
            <span class="blob b1" aria-hidden="true"></span>
            <span class="blob b2" aria-hidden="true"></span>
            <span class="sq" aria-hidden="true"></span>
        </div>
    </section>
</template>

<script>
import reveal from "../../mixins/reveal";

export default {
    name: "ServicesSection",
    mixins: [reveal],
    data() {
        return {
            // kartu yang sedang dibalik lewat tap / keyboard (-1 = tidak ada)
            flipped: -1,
            services: [
                {
                    title: "LLM Integration & RAG Systems",
                    desc: "Bringing language models into systems that already run - document extraction, retrieval over internal knowledge, and assistants that answer from your data instead of guessing. Built as ordinary services with the same logging, error handling, and cost control as the rest of the stack.",
                    icon: "fas fa-brain",
                },
                {
                    title: "AI Agents & Workflow Automation",
                    desc: "Agentic automation for work that is repetitive but not quite scriptable: multi-step workflows, tool calling, and MCP-based tooling wired into existing business processes - with humans kept in the loop where the decision actually matters.",
                    icon: "fas fa-robot",
                },
                {
                    title: "Enterprise Application Development",
                    desc: "End-to-end business applications - requirements analysis, solution design, development, integration, and the production support that comes after. DMS, CRM, and finance systems.",
                    icon: "fas fa-university",
                },
                {
                    title: "Microservice Architecture & REST APIs",
                    desc: "Microservice-based systems with clear service boundaries: service communication, REST API design, database interaction, and integration between systems that already run.",
                    icon: "fas fa-project-diagram",
                },
                {
                    title: "DevOps & CI/CD Automation",
                    desc: "Build, test, release, and deployment pipelines. Branching and release-management practices, environment management, and automating the repetitive work away.",
                    icon: "fas fa-sync-alt",
                },
                {
                    title: "Business Analysis & Solution Design",
                    desc: "Translating operational processes into technical requirements and implementable designs - and keeping business users and technical teams talking to each other.",
                    icon: "fas fa-lightbulb",
                },
                {
                    title: "Database & Data Engineering",
                    desc: "Database design, data migration between environments, cross-system data integration, and repairing data that has already gone wrong in production.",
                    icon: "fas fa-database",
                },
                {
                    title: "Troubleshooting & System Integration",
                    desc: "Tracing complex issues across application, database, API, infrastructure, and network layers - finding the root cause rather than patching the symptom.",
                    icon: "fas fa-bug",
                },
            ],
        };
    },
    methods: {
        // untuk layar sentuh & keyboard; di desktop hover sudah cukup
        toggle(i) {
            this.flipped = this.flipped === i ? -1 : i;
        },
        go(hash) {
            const el = document.querySelector(hash);
            if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        },
    },
};
</script>

<style scoped>
.svc-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.25rem;
}

/* ---------- kartu flip ---------- */

.flip {
    perspective: 1400px;
    min-height: 290px;
    cursor: pointer;
    outline: none;
    border-radius: var(--radius);
    -webkit-tap-highlight-color: transparent;
}

.flip-inner {
    position: relative;
    width: 100%;
    height: 100%;
    min-height: inherit;
    transform-style: preserve-3d;
    transition: transform 720ms var(--ease);
}

.flip:hover .flip-inner,
.flip:focus-visible .flip-inner,
.flip.is-flipped .flip-inner {
    transform: rotateY(180deg);
}

.face {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 2rem 1.6rem;
    border: 1px solid var(--border);
    border-radius: var(--radius);
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
}

/* ---------- sisi depan ---------- */

.front {
    background: var(--surface);
    border-top: 2px solid var(--accent);
}

.svc-ic {
    display: grid;
    place-items: center;
    width: 54px;
    height: 54px;
    margin-bottom: 1.15rem;
    border-radius: 15px;
    background: var(--accent-soft);
    color: var(--accent);
    font-size: 1.25rem;
    transition: transform 520ms var(--ease);
}

.flip:hover .svc-ic {
    transform: translateY(-4px) scale(1.06);
}

.front h3 {
    font-size: 1.05rem;
    font-weight: 700;
    line-height: 1.35;
}

.hint {
    margin-top: 1rem;
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.68rem;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--fg-faint);
}

.hint i {
    font-size: 0.6rem;
}

/* ---------- sisi belakang ---------- */

.back {
    transform: rotateY(180deg);
    background: var(--accent);
    border-color: var(--accent);
    color: #fff;
    gap: 0.7rem;
}

.back-ic {
    font-size: 1.1rem;
    opacity: 0.55;
}

.back h3 {
    font-size: 0.95rem;
    font-weight: 700;
    line-height: 1.35;
}

.back p {
    font-size: 0.84rem;
    line-height: 1.7;
    color: rgba(255, 255, 255, 0.92);
}

/* fokus keyboard tetap terlihat */
.flip:focus-visible {
    box-shadow: 0 0 0 3px var(--accent-soft), 0 0 0 5px var(--accent);
}

/* ---------- CTA band ---------- */

.cta-band {
    position: relative;
    overflow: hidden;
    margin-top: clamp(3.5rem, 7vw, 5.5rem);
    padding-block: clamp(3.5rem, 7vw, 5rem);
    background: var(--accent-soft);
    text-align: center;
}

:root[data-theme="dark"] .cta-band {
    background: rgba(239, 68, 68, 0.08);
}

.cta-inner {
    position: relative;
    z-index: 2;
}

.cta-band h2 {
    font-size: clamp(1.7rem, 4.2vw, 2.7rem);
    font-weight: 700;
    letter-spacing: -0.03em;
    line-height: 1.2;
    max-width: 20ch;
    margin-inline: auto;
}

.hl {
    color: var(--accent);
}

.cta-band p {
    margin: 1.1rem auto 2rem;
    max-width: 46ch;
    font-size: 0.95rem;
    line-height: 1.7;
    color: var(--fg-muted);
}

.cta-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.9rem 1.8rem;
    border-radius: 10px;
    background: var(--surface);
    color: var(--accent);
    font-size: 0.9rem;
    font-weight: 600;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
    transition: transform 260ms var(--ease), gap 260ms var(--ease);
}

.cta-btn:hover {
    transform: translateY(-3px);
    gap: 1rem;
}

.blob,
.sq {
    position: absolute;
    opacity: 0.5;
}

.blob {
    border-radius: 50%;
    background: var(--accent);
    opacity: 0.09;
}

.b1 {
    width: 46px;
    height: 46px;
    left: 8%;
    top: 34%;
}

.b2 {
    width: 26px;
    height: 26px;
    right: 26%;
    top: 30%;
}

.sq {
    width: 30px;
    height: 30px;
    right: 12%;
    bottom: 32%;
    border: 1px solid var(--accent);
    opacity: 0.25;
    transform: rotate(22deg);
}

@media (max-width: 720px) {
    .blob,
    .sq {
        display: none;
    }
}

/* ---------- hormati preferensi gerak ---------- */

@media (prefers-reduced-motion: reduce) {
    .flip-inner,
    .svc-ic {
        transition: none;
    }
}
</style>
