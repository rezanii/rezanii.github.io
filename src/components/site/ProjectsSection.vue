<template>
    <section id="projects" class="section">
        <div class="shell">
            <div class="sec-head">
                <span class="sec-eyebrow">Some of my recent work</span>
                <h2 class="sec-title">Projects</h2>
                <div class="sec-rule"></div>
            </div>

            <div class="filters">
                <button
                    v-for="c in categories"
                    :key="c"
                    class="filter"
                    :class="{ on: active === c }"
                    type="button"
                    @click="active = c"
                >
                    {{ c }}
                </button>
            </div>

            <div class="proj-grid">
                <article
                    v-for="(p, i) in visible"
                    :key="p.title"
                    class="proj card"
                    :style="{ '--i': i % 3 }"
                >
                    <div class="proj-media">
                        <img v-if="p.img" :src="p.img" :alt="p.title" />
                        <ProjectCover
                            v-else
                            :category="p.category"
                            :title="p.title"
                        />

                        <a
                            v-if="p.link || p.source"
                            class="proj-open"
                            :href="p.link || p.source"
                            target="_blank"
                            rel="noopener"
                            :aria-label="'Open ' + p.title + ' in a new tab'"
                        >
                            <span class="proj-open-ic">
                                <i
                                    class="fas fa-external-link-alt"
                                ></i>
                            </span>
                        </a>

                        <span v-if="p.featured" class="tag-featured">Featured</span>
                        <span class="tag-cat">{{ p.category }}</span>
                    </div>

                    <div class="proj-body">
                        <h3>{{ p.title }}</h3>
                        <p>{{ p.desc }}</p>

                        <div class="proj-tags">
                            <span v-for="t in p.stack" :key="t" class="pill">{{ t }}</span>
                        </div>

                        <div class="proj-links">
                            <a
                                v-if="p.link"
                                :href="p.link"
                                target="_blank"
                                rel="noopener"
                                >Visit <i class="fas fa-external-link-alt"></i
                            ></a>
                            <a
                                v-if="p.source"
                                :href="p.source"
                                target="_blank"
                                rel="noopener"
                                >Source <i class="fab fa-github"></i
                            ></a>
                        </div>
                    </div>
                </article>
            </div>
        </div>
    </section>
</template>

<script>
import ProjectCover from "./ProjectCover.vue";

export default {
    name: "ProjectsSection",
    components: { ProjectCover },
    data() {
        return {
            active: "All",
            // TODO(ridwan): tambah / koreksi daftar project kamu di sini
            projects: [
                {
                    title: "Enterprise RAG Assistant",
                    desc: "Retrieval-augmented assistant over internal enterprise documents - embedding and indexing source material, grounding model answers in retrieved passages, and returning citations so an answer can be checked rather than trusted.",
                    category: "AI",
                    featured: true,
                    stack: ["LLM", "RAG", "Embeddings", "Vector Search", "REST API"],
                    link: "",
                    source: "",
                    img: null,
                },
                {
                    title: "Agentic Workflow Automation",
                    desc: "Multi-step agents for business processes that were repetitive but never quite scriptable - tool calling against existing internal APIs, MCP-based tooling, and human approval kept on the steps where a wrong decision actually costs something.",
                    category: "AI",
                    featured: true,
                    stack: ["AI Agents", "MCP", "Tool Calling", "Automation"],
                    link: "",
                    source: "",
                    img: null,
                },
                {
                    title: "Dealer Management System (DMS)",
                    desc: "Microservice-based enterprise system for automotive operations - work order, supply slip, inventory, and invoicing modules, plus the integrations between aftersales and finance services.",
                    category: "Enterprise",
                    featured: true,
                    stack: ["Go", "Microservices", "REST API", "SQL Server"],
                    link: "",
                    source: "",
                    img: null,
                },
                {
                    title: "CI/CD & Deployment Automation",
                    desc: "Build, test, release, and deployment pipelines for enterprise application delivery, with structured branching and environment management that cut manual deployment work.",
                    category: "DevOps",
                    featured: true,
                    stack: ["CI/CD", "Docker", "GitHub Actions", "Automation"],
                    link: "",
                    source: "",
                    img: null,
                },
                {
                    title: "IoT & AI Agricultural Advisory System",
                    desc: "IoT and AI-enabled advisory system for Vannamei shrimp cultivation - sensor ingestion, water-quality prediction and anomaly detection over the resulting time series, plus the system architecture and integration design tying sensors, models, and the advisory application together.",
                    category: "IoT / AI",
                    featured: true,
                    stack: ["IoT", "Machine Learning", "Anomaly Detection", "System Architecture"],
                    link: "",
                    source: "",
                    img: null,
                },
                {
                    title: "Document Replenishment Online",
                    desc: "Internal tool for managing document replenishment requests, built as a single-page application.",
                    category: "Business",
                    featured: false,
                    stack: ["Vue.js", "JavaScript"],
                    link: "",
                    source: "https://github.com/rezanii",
                    img: null,
                },
                {
                    title: "FPIS.io",
                    desc: "Landing page for a collaboration tool aimed at project collections.",
                    category: "Landing",
                    featured: false,
                    stack: ["HTML", "Tailwind CSS", "JavaScript"],
                    link: "https://fpis.vercel.app/",
                    source: "https://github.com/rezanii",
                    img: null,
                },
                {
                    title: "Reconciliation Payment Gateway",
                    desc: "Landing page for a payment reconciliation product, with 3D visual elements.",
                    category: "Landing",
                    featured: false,
                    stack: ["HTML", "Tailwind CSS", "Three.js"],
                    link: "https://recon.vercel.app/",
                    source: "https://github.com/rezanii",
                    img: null,
                },
            ],
        };
    },
    computed: {
        categories() {
            const set = new Set(this.projects.map((p) => p.category));
            return ["All", ...Array.from(set)];
        },
        visible() {
            if (this.active === "All") return this.projects;
            return this.projects.filter((p) => p.category === this.active);
        },
    },
};
</script>

<style scoped>
.filters {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.5rem;
    margin-bottom: 2.5rem;
}

.filter {
    padding: 0.5rem 1.15rem;
    border: 1px solid var(--border);
    border-radius: var(--radius-pill);
    background: var(--surface);
    color: var(--fg-muted);
    font-family: var(--font);
    font-size: 0.82rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 240ms var(--ease);
}

.filter:hover {
    border-color: var(--accent);
    color: var(--accent);
}

.filter.on {
    background: var(--accent);
    border-color: var(--accent);
    color: #fff;
}

.proj-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.25rem;
}

.proj {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    animation: pop 420ms var(--ease) both;
    animation-delay: calc(var(--i, 0) * 70ms);
}

@keyframes pop {
    from {
        opacity: 0;
        transform: translateY(18px) scale(0.98);
    }
}

.proj-media {
    position: relative;
    aspect-ratio: 16 / 10;
    display: grid;
    place-items: center;
    background: var(--bg-alt);
    border-bottom: 1px solid var(--border);
    overflow: hidden;
}

.proj-media img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 620ms var(--ease);
}

.proj:hover .proj-media img,
.proj:hover .cover {
    transform: scale(1.06);
}

.proj-open {
    position: absolute;
    inset: 0;
    z-index: 3;
    display: grid;
    place-items: center;
    background: rgba(8, 10, 18, 0.55);
    opacity: 0;
    transition: opacity 320ms var(--ease);
}

.proj-open-ic {
    display: grid;
    place-items: center;
    width: 46px;
    height: 46px;
    border-radius: 50%;
    color: #fff;
    background: var(--accent);
    font-size: 0.95rem;
    transform: scale(0.7);
    transition: transform 320ms var(--ease);
    box-shadow: 0 10px 28px -10px rgba(0, 0, 0, 0.7);
}

.proj:hover .proj-open,
.proj-open:focus-visible {
    opacity: 1;
}

.proj:hover .proj-open-ic,
.proj-open:focus-visible .proj-open-ic {
    transform: scale(1);
}

@media (prefers-reduced-motion: reduce) {
    .proj-open,
    .proj-open-ic {
        transition: none;
    }
}

.tag-featured,
.tag-cat {
    position: absolute;
    z-index: 4;
    pointer-events: none;
    top: 10px;
    padding: 0.26rem 0.65rem;
    border-radius: var(--radius-pill);
    font-size: 0.68rem;
    font-weight: 600;
}

.tag-featured {
    left: 10px;
    background: var(--accent);
    color: #fff;
}

.tag-cat {
    right: 10px;
    background: rgba(20, 20, 24, 0.82);
    color: #fff;
}

.proj-body {
    padding: 1.35rem 1.25rem 1.5rem;
    display: flex;
    flex-direction: column;
    flex: 1;
}

.proj-body h3 {
    font-size: 1.02rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
}

.proj-body p {
    font-size: 0.87rem;
    line-height: 1.7;
    color: var(--fg-muted);
}

.proj-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem;
    margin-top: 1rem;
}

.proj-links {
    display: flex;
    gap: 1.1rem;
    margin-top: 1.25rem;
    padding-top: 1rem;
    border-top: 1px solid var(--border);
}

.proj-links a {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--fg-muted);
    transition: color 220ms ease, gap 220ms var(--ease);
}

.proj-links a:hover {
    color: var(--accent);
    gap: 0.6rem;
}
</style>
