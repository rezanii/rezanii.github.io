<template>
    <section class="section-alt stats-wrap">
        <div class="shell">
            <div class="stats">
                <div
                    v-for="(s, i) in stats"
                    :key="s.label"
                    class="stat card"
                    :class="{ landed: landed[i] }"
                    :style="{ '--i': i }"
                >
                    <span class="stat-ic"><i :class="s.icon"></i></span>
                    <span class="stat-num"
                        >{{ counts[i] }}<span class="suffix">{{
                            parsed[i].suffix
                        }}</span></span
                    >
                    <span class="stat-label">{{ s.label }}</span>
                </div>
            </div>
        </div>

        <div class="marquee" aria-hidden="true">
            <div class="track">
                <span v-for="(t, i) in loop" :key="i" class="mq">
                    <i :class="t.icon"></i> {{ t.name }}
                </span>
            </div>
        </div>
    </section>
</template>

<script>
import reveal from "../../mixins/reveal";

export default {
    name: "StatsSection",
    mixins: [reveal],
    data() {
        return {
            counts: [],
            landed: [],
            counter: null,
            safety: null,
            // Semua angka ini dihitung dari CV, bukan karangan
            stats: [
                { value: "9+", label: "Years Experience", icon: "fas fa-calendar" },
                { value: "4", label: "Companies Worked", icon: "fas fa-building" },
                { value: "6", label: "Roles Held", icon: "fas fa-briefcase" },
                { value: "40+", label: "Technologies Used", icon: "fas fa-code" },
            ],
            techs: [
                { name: "Go", icon: "fas fa-code" },
                { name: "Java", icon: "fab fa-java" },
                { name: "Kotlin", icon: "fas fa-mobile-alt" },
                { name: "TypeScript", icon: "fab fa-js" },
                { name: "Python", icon: "fab fa-python" },
                { name: "PHP", icon: "fab fa-php" },
                { name: "React.js", icon: "fab fa-react" },
                { name: "Next.js", icon: "fas fa-forward" },
                { name: "Node.js", icon: "fab fa-node-js" },
                { name: "Express.js", icon: "fas fa-server" },
                { name: "Flutter", icon: "fas fa-mobile" },
                { name: "Docker", icon: "fab fa-docker" },
                { name: "Kubernetes", icon: "fas fa-dharmachakra" },
                { name: "AWS", icon: "fab fa-aws" },
                { name: "Azure", icon: "fab fa-microsoft" },
                { name: "GCP", icon: "fab fa-google" },
                { name: "GitHub Actions", icon: "fab fa-github" },
                { name: "CI/CD", icon: "fas fa-sync-alt" },
                { name: "SQL Server", icon: "fas fa-database" },
                { name: "PostgreSQL", icon: "fas fa-database" },
                { name: "MongoDB", icon: "fas fa-leaf" },
                { name: "Grafana", icon: "fas fa-chart-line" },
                { name: "Power BI", icon: "fas fa-chart-pie" },
                { name: "Microservices", icon: "fas fa-project-diagram" },
            ],
        };
    },
    computed: {
        // digandakan supaya marquee-nya mulus tanpa jeda
        loop() {
            return [...this.techs, ...this.techs];
        },

        // "9+" -> { target: 9, suffix: "+" }
        parsed() {
            return this.stats.map((s) => {
                const m = String(s.value).match(/^(\d+)(.*)$/);
                return {
                    target: m ? parseInt(m[1], 10) : 0,
                    suffix: m ? m[2] : String(s.value),
                };
            });
        },
    },
    created() {
        this.counts = this.stats.map(() => 0);
        this.landed = this.stats.map(() => false);
    },
    mounted() {
        this.$nextTick(this.initCounter);
    },
    beforeDestroy() {
        if (this.counter) this.counter.disconnect();
        clearTimeout(this.safety);
    },
    methods: {
        finish() {
            this.counts = this.parsed.map((p) => p.target);
            this.landed = this.stats.map(() => true);
        },

        initCounter() {
            const reduce = window.matchMedia("(prefers-reduced-motion: reduce)")
                .matches;

            if (reduce || !("IntersectionObserver" in window)) {
                this.finish();
                return;
            }

            const host = this.$el.querySelector(".stats");
            if (!host) {
                this.finish();
                return;
            }

            this.counter = new IntersectionObserver(
                (entries) => {
                    entries.forEach((e) => {
                        if (!e.isIntersecting) return;
                        this.counter.disconnect();
                        clearTimeout(this.safety);
                        this.runCountUp();
                    });
                },
                { threshold: 0.35 }
            );

            this.counter.observe(host);

            // jaring pengaman: kalau observer tidak pernah terpicu
            // (layar sangat tinggi, tab di background, dll), angka tetap tampil
            this.safety = setTimeout(() => {
                if (this.counts.every((c) => c === 0)) this.finish();
            }, 4000);
        },

        runCountUp() {
            const DURATION = 1500;
            const STAGGER = 120;
            // pelan di akhir, supaya angkanya terasa "mendarat"
            const ease = (t) => 1 - Math.pow(1 - t, 3);

            this.parsed.forEach((p, i) => {
                const startAt = performance.now() + i * STAGGER;

                const step = (now) => {
                    if (now < startAt) {
                        requestAnimationFrame(step);
                        return;
                    }

                    const t = Math.min((now - startAt) / DURATION, 1);
                    this.$set(this.counts, i, Math.round(ease(t) * p.target));

                    if (t < 1) {
                        requestAnimationFrame(step);
                    } else {
                        this.$set(this.landed, i, true);
                    }
                };

                requestAnimationFrame(step);
            });
        },
    },
};
</script>

<style scoped>
.stats-wrap {
    padding-block: clamp(3rem, 6vw, 4.5rem) 0;
    overflow: hidden;
}

.stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
    gap: 1rem;
}

.stat {
    padding: 1.75rem 1.25rem;
    text-align: center;
}

.stat-ic {
    display: grid;
    place-items: center;
    width: 40px;
    height: 40px;
    margin: 0 auto 0.9rem;
    border-radius: 10px;
    background: var(--accent-soft);
    color: var(--accent);
    font-size: 0.95rem;
}

.stat-num {
    display: block;
    font-size: clamp(1.9rem, 4vw, 2.6rem);
    font-weight: 700;
    letter-spacing: -0.03em;
    color: var(--accent);
    line-height: 1;
    /* angka selebar sel yang sama, jadi kartunya tidak bergoyang saat mencacah */
    font-variant-numeric: tabular-nums;
    font-feature-settings: "tnum";
}

.stat.landed .stat-num {
    animation: land 520ms var(--ease);
}

@keyframes land {
    0% {
        transform: scale(1);
    }
    40% {
        transform: scale(1.12);
    }
    100% {
        transform: scale(1);
    }
}

@media (prefers-reduced-motion: reduce) {
    .stat.landed .stat-num {
        animation: none;
    }
}

.stat-label {
    display: block;
    margin-top: 0.5rem;
    font-size: 0.82rem;
    color: var(--fg-muted);
}

/* ---------- marquee ---------- */

.marquee {
    margin-top: clamp(2.5rem, 5vw, 4rem);
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
    background: var(--bg);
    overflow: hidden;
    -webkit-mask-image: linear-gradient(
        90deg,
        transparent,
        #000 8%,
        #000 92%,
        transparent
    );
    mask-image: linear-gradient(
        90deg,
        transparent,
        #000 8%,
        #000 92%,
        transparent
    );
}

.track {
    display: flex;
    gap: 2.75rem;
    width: max-content;
    padding-block: 1.1rem;
    animation: slide 34s linear infinite;
}

.marquee:hover .track {
    animation-play-state: paused;
}

@keyframes slide {
    to {
        transform: translateX(-50%);
    }
}

.mq {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.88rem;
    font-weight: 500;
    color: var(--fg-muted);
    white-space: nowrap;
}

.mq i {
    color: var(--fg-faint);
}

@media (prefers-reduced-motion: reduce) {
    .track {
        animation: none;
    }
}
</style>
