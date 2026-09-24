<template>
    <section v-if="quotes.length" id="testimonials" class="section section-alt">
        <div class="shell">
            <div class="sec-head">
                <span class="sec-eyebrow">How I work</span>
                <h2 class="sec-title">Principles</h2>
                <div class="sec-rule"></div>
            </div>

            <div class="tm-viewport">
                <button
                    class="arrow left"
                    type="button"
                    aria-label="Previous"
                    @click="prev"
                >
                    <i class="fas fa-arrow-left"></i>
                </button>

                <div class="tm-track" :style="trackStyle">
                    <figure v-for="q in quotes" :key="q.name" class="tm card">
                        <span class="mark-ic"><i :class="q.icon"></i></span>
                        <blockquote>{{ q.text }}</blockquote>
                        <figcaption>
                            <span class="who">
                                <strong>{{ q.name }}</strong>
                                <small>{{ q.role }}</small>
                            </span>
                        </figcaption>
                    </figure>
                </div>

                <button
                    class="arrow right"
                    type="button"
                    aria-label="Next"
                    @click="next"
                >
                    <i class="fas fa-arrow-right"></i>
                </button>
            </div>

            <div class="dots">
                <button
                    v-for="(q, i) in quotes"
                    :key="q.name"
                    class="dot"
                    :class="{ on: i === index }"
                    type="button"
                    :aria-label="'Go to principle ' + (i + 1)"
                    @click="index = i"
                ></button>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: "TestimonialsSection",
    data() {
        return {
            index: 0,
            quotes: [
                {
                    name: "Root cause, not symptom",
                    role: "Production support",
                    icon: "fas fa-search",
                    text: "A ticket names a symptom. Before changing anything I trace every caller of the function I am about to touch - because one guard in the shared path is a smaller change than a guard in each caller, and patching only the route the ticket mentions leaves every sibling still broken.",
                },
                {
                    name: "Design for the data you actually have",
                    role: "Architecture",
                    icon: "fas fa-database",
                    text: "Schemas outlive code. A nullable column that the application treats as zero will quietly corrupt reports years later. I check what production really contains before deciding what a field means - the data has the final say, not the design document.",
                },
                {
                    name: "Automate the work nobody wants to repeat",
                    role: "DevOps",
                    icon: "fas fa-sync-alt",
                    text: "Manual deployment is not just slow, it is inconsistent - every environment drifts its own way. Build, test, release and environment management belong in a pipeline so the boring parts stay boring and the team spends its attention on the parts that are not.",
                },
                {
                    name: "Translate before you build",
                    role: "Business analysis",
                    icon: "fas fa-comments",
                    text: "Most failed systems were built correctly from the wrong requirement. I sit with the operational process first, in the user's language, and only then turn it into services, APIs and tables. Being the bridge between business and engineering is the job, not a detour from it.",
                },
                {
                    name: "Boring code, at 3am",
                    role: "Engineering practice",
                    icon: "fas fa-shield-alt",
                    text: "Clever code is what someone decodes under pressure during an incident. I optimise for the engineer reading it later: clear boundaries, honest errors instead of swallowed ones, and no abstraction that a future requirement might justify but today does not.",
                },
            ],
        };
    },
    computed: {
        trackStyle() {
            return { transform: `translateX(-${this.index * 100}%)` };
        },
    },
    methods: {
        next() {
            this.index = (this.index + 1) % this.quotes.length;
        },
        prev() {
            this.index =
                (this.index - 1 + this.quotes.length) % this.quotes.length;
        },
    },
};
</script>

<style scoped>
.tm-viewport {
    position: relative;
    overflow: hidden;
    padding-inline: 3rem;
}

.tm-track {
    display: flex;
    transition: transform 520ms var(--ease);
}

.tm {
    flex: 0 0 100%;
    padding: 2.25rem;
}

.mark {
    font-size: 1.3rem;
    color: var(--accent);
    opacity: 0.35;
}

.tm blockquote {
    margin: 1.1rem 0 1.25rem;
    font-size: 1rem;
    font-style: italic;
    line-height: 1.8;
    color: var(--fg);
}

.tm figcaption {
    display: flex;
    align-items: center;
    margin-top: 1.5rem;
    padding-top: 1.25rem;
    border-top: 1px solid var(--border);
}

.mark-ic {
    display: grid;
    place-items: center;
    width: 46px;
    height: 46px;
    border-radius: 13px;
    background: var(--accent-soft);
    color: var(--accent);
    font-size: 1.05rem;
    transition: transform 380ms var(--ease);
}

.tm:hover .mark-ic {
    transform: translateY(-3px) rotate(-6deg);
}

.who {
    display: flex;
    flex-direction: column;
}

.who strong {
    font-size: 0.9rem;
}

.who small {
    font-size: 0.78rem;
    color: var(--fg-muted);
}

.arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 2;
    width: 36px;
    height: 36px;
    display: grid;
    place-items: center;
    border: 1px solid var(--border);
    border-radius: 50%;
    background: var(--surface);
    color: var(--fg-muted);
    cursor: pointer;
    font-size: 0.8rem;
    transition: all 240ms var(--ease);
}

.arrow:hover {
    background: var(--accent);
    border-color: var(--accent);
    color: #fff;
}

.left {
    left: 0;
}

.right {
    right: 0;
}

.dots {
    display: flex;
    justify-content: center;
    gap: 0.4rem;
    margin-top: 1.75rem;
}

.dot {
    width: 8px;
    height: 8px;
    padding: 0;
    border: 0;
    border-radius: var(--radius-pill);
    background: var(--border);
    cursor: pointer;
    transition: all 280ms var(--ease);
}

.dot.on {
    width: 26px;
    background: var(--accent);
}

@media (max-width: 640px) {
    .tm-viewport {
        padding-inline: 0;
    }
    .arrow {
        display: none;
    }
}
</style>
