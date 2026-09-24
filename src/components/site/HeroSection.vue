<template>
    <section id="home" class="hero-wrap">
        <div class="hero">
            <StarField
                dim-color="#ffffff"
                hot-color="#ef4444"
                :radius="190"
                :density="7000"
                :max-stars="200"
            />

            <div class="hero-inner shell">
                <div class="copy">
                    <span class="badge">
                        <i class="dot"></i> Available for Hire
                    </span>

                    <span class="hello">
                        <i class="fas fa-asterisk"></i> Hello, I'm
                    </span>

                    <h1 class="name">
                        Ahmad Ridwan <span class="grad">Rezani</span>
                    </h1>

                    <p class="role">
                        {{ typed }}<span class="caret">|</span>
                    </p>

                    <p class="blurb">
                        9+ years across enterprise application development,
                        software engineering, system architecture, business
                        analysis, and DevOps. I design microservice-based
                        systems, REST APIs, and CI/CD pipelines — and translate
                        business requirements into solutions that hold up in
                        production.
                    </p>

                    <div class="cta">
                        <a
                            href="#contact"
                            class="btn btn-primary"
                            @click.prevent="go('#contact')"
                            >Hire Me</a
                        >
                        <a class="btn btn-outline btn-on-dark" :href="cvUrl" download>
                            <i class="fas fa-download"></i> Download CV
                        </a>
                    </div>
                </div>

                <div
                    class="orbit"
                    :class="{ 'has-active': activeSlug }"
                    aria-hidden="true"
                >
                    <div class="sun">
                        <span class="sun-core">
                            <transition name="sun-swap" mode="out-in">
                                <img
                                    :key="sunIcon.slug"
                                    :src="iconUrl(sunIcon)"
                                    :alt="sunIcon.name"
                                    width="26"
                                    height="26"
                                    decoding="async"
                                />
                            </transition>
                        </span>
                    </div>

                    <div class="ring ring-outer">
                        <span
                            v-for="(t, i) in orbitOuter"
                            :key="t.slug"
                            class="node"
                            :class="{ 'is-on': activeSlug === t.slug }"
                            :style="nodeStyle(i, orbitOuter.length, 43)"
                        >
                            <span class="node-face" @click="toggleNode(t)">
                                <img
                                    :src="iconUrl(t)"
                                    :alt="t.name"
                                    width="22"
                                    height="22"
                                    decoding="async"
                                />
                                <span class="node-label">{{ t.name }}</span>
                            </span>
                        </span>
                    </div>

                    <div class="ring ring-inner">
                        <span
                            v-for="(t, i) in orbitInner"
                            :key="t.slug"
                            class="node node-sm"
                            :class="{ 'is-on': activeSlug === t.slug }"
                            :style="nodeStyle(i, orbitInner.length, 26)"
                        >
                            <span class="node-face" @click="toggleNode(t)">
                                <img
                                    :src="iconUrl(t)"
                                    :alt="t.name"
                                    width="18"
                                    height="18"
                                    decoding="async"
                                />
                                <span class="node-label">{{ t.name }}</span>
                            </span>
                        </span>
                    </div>
                </div>
            </div>

            <button class="scroll-cue" type="button" @click="go('#about')">
                <span class="cue-label">SCROLL</span>
                <span class="cue-circle"><i class="fas fa-arrow-down"></i></span>
            </button>
        </div>
    </section>
</template>

<script>
import StarField from "./StarField.vue";
import { STACK, ORBIT_OUTER, ORBIT_INNER, iconUrl } from "../../data/stack";

export default {
    name: "HeroSection",
    components: { StarField },
    data() {
        return {
            cvUrl: "/Ahmad-Ridwan-Rezani-CV.pdf",
            roles: [
                "Senior Software Developer Specialist",
                "Software Engineer",
                "System Architect",
                "DevOps Specialist",
                "Business Analyst",
            ],
            typed: "",
            roleIndex: 0,
            charIndex: 0,
            deleting: false,
            timer: null,
            orbitOuter: ORBIT_OUTER,
            orbitInner: ORBIT_INNER,
            sunIcon: STACK[0],
            sunTimer: null,
            activeSlug: null,
        };
    },
    mounted() {
        this.tick();
        this.rollSun();
        if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            this.sunTimer = setInterval(this.rollSun, 2600);
        }
    },
    beforeDestroy() {
        clearTimeout(this.timer);
        clearInterval(this.sunTimer);
    },
    methods: {
        iconUrl,

        go(hash) {
            const el = document.querySelector(hash);
            if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        },

        nodeStyle(i, count, r) {
            const rad = ((2 * Math.PI) / count) * i;
            return {
                left: `${50 + r * Math.cos(rad)}%`,
                top: `${50 + r * Math.sin(rad)}%`,
            };
        },

        toggleNode(t) {
            this.activeSlug = this.activeSlug === t.slug ? null : t.slug;
        },

        rollSun() {
            let next = this.sunIcon;
            while (next === this.sunIcon && STACK.length > 1) {
                next = STACK[Math.floor(Math.random() * STACK.length)];
            }
            this.sunIcon = next;
        },


        tick() {
            const word = this.roles[this.roleIndex];

            if (!this.deleting) {
                this.charIndex++;
                this.typed = word.slice(0, this.charIndex);
                if (this.charIndex === word.length) {
                    this.deleting = true;
                    this.timer = setTimeout(this.tick, 1600);
                    return;
                }
            } else {
                this.charIndex--;
                this.typed = word.slice(0, this.charIndex);
                if (this.charIndex === 0) {
                    this.deleting = false;
                    this.roleIndex = (this.roleIndex + 1) % this.roles.length;
                }
            }

            this.timer = setTimeout(this.tick, this.deleting ? 45 : 95);
        },
    },
};
</script>

<style scoped>
.hero-wrap {
    padding: 0;
}

.hero {
    position: relative;
    overflow: hidden;
    min-height: min(92vh, 820px);
    display: flex;
    align-items: center;
    background: linear-gradient(
        135deg,
        var(--hero-from) 0%,
        var(--hero-via) 55%,
        var(--hero-to) 100%
    );
}

/* ---------- isi ---------- */

.hero-inner {
    position: relative;
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 0.9fr);
    align-items: center;
    gap: 2rem;
    padding-top: calc(72px + clamp(2.5rem, 6vw, 4.5rem));
    padding-bottom: clamp(3rem, 7vw, 5rem);
}

.badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.4rem 0.95rem;
    border-radius: var(--radius-pill);
    background: rgba(16, 185, 129, 0.16);
    border: 1px solid rgba(16, 185, 129, 0.4);
    color: #6ee7b7;
    font-size: 0.78rem;
    font-weight: 500;
}

.dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #10b981;
    box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.6);
    animation: pulse 2s infinite;
}

@keyframes pulse {
    to {
        box-shadow: 0 0 0 9px rgba(16, 185, 129, 0);
    }
}

.hello {
    display: block;
    margin-top: 1.6rem;
    font-size: 0.76rem;
    font-weight: 600;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--accent);
}

.hello i {
    font-size: 0.65rem;
    margin-right: 0.3rem;
}

.name {
    margin-top: 0.5rem;
    font-size: clamp(2.6rem, 7vw, 4.6rem);
    font-weight: 700;
    letter-spacing: -0.045em;
    line-height: 1;
    color: #fff;
}

.grad {
    background: linear-gradient(100deg, #ff8a8a, var(--accent));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
}

.role {
    margin-top: 0.6rem;
    min-height: 1.9rem;
    font-size: clamp(1.05rem, 2.2vw, 1.4rem);
    font-weight: 600;
    color: var(--accent);
}

.caret {
    font-weight: 400;
    animation: blink 1s steps(1) infinite;
}

@keyframes blink {
    50% {
        opacity: 0;
    }
}

.blurb {
    margin-top: 1.2rem;
    max-width: 46ch;
    font-size: 0.95rem;
    line-height: 1.75;
    color: rgba(255, 255, 255, 0.62);
}

.cta {
    display: flex;
    flex-wrap: wrap;
    gap: 0.85rem;
    margin-top: 2rem;
}

/* ---------- orbit ---------- */

.orbit {
    position: relative;
    display: grid;
    place-items: center;
    aspect-ratio: 1;
    max-width: 420px;
    margin-inline: auto;
    width: 100%;
}

.ring {
    position: absolute;
    inset: 0;
    pointer-events: none;
}

.ring-outer {
    animation: spin 52s linear infinite;
}

.ring-inner {
    animation: spin 34s linear infinite reverse;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

.node {
    position: absolute;
    width: 52px;
    height: 52px;
    margin: -26px 0 0 -26px;
    pointer-events: auto;
}

.node-sm {
    width: 38px;
    height: 38px;
    margin: -19px 0 0 -19px;
}

.node-face {
    position: relative;
    display: grid;
    place-items: center;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: rgba(10, 12, 20, 0.72);
    border: 1px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(4px);
    transition: box-shadow 320ms var(--ease), border-color 320ms var(--ease);
}

.ring-outer .node-face {
    animation: spin-back 52s linear infinite;
}

.ring-inner .node-face {
    animation: spin-back 34s linear infinite reverse;
}

/* ---------- matahari ---------- */

.sun {
    position: absolute;
    display: grid;
    place-items: center;
    width: 30%;
    aspect-ratio: 1;
    border-radius: 50%;
    z-index: 2;
    pointer-events: none;
    background: radial-gradient(
        circle at 50% 50%,
        rgba(255, 236, 190, 0.95) 0%,
        rgba(255, 176, 92, 0.7) 38%,
        rgba(255, 120, 50, 0.28) 62%,
        rgba(255, 100, 40, 0) 78%
    );
    box-shadow: 0 0 44px 10px rgba(255, 160, 70, 0.34),
        0 0 110px 38px rgba(255, 110, 40, 0.16);
    animation: sun-pulse 5s ease-in-out infinite;
}

.sun::before {
    content: "";
    position: absolute;
    inset: -55%;
    border-radius: 50%;
    background: repeating-conic-gradient(
        from 0deg,
        rgba(255, 186, 110, 0.3) 0deg 4deg,
        transparent 4deg 16deg
    );
    -webkit-mask: radial-gradient(
        circle,
        transparent 28%,
        #000 42%,
        transparent 72%
    );
    mask: radial-gradient(
        circle,
        transparent 28%,
        #000 42%,
        transparent 72%
    );
    animation: spin 26s linear infinite;
}

.sun-core {
    position: relative;
    display: grid;
    place-items: center;
    width: 52%;
    aspect-ratio: 1;
    border-radius: 50%;
    background: rgba(8, 10, 18, 0.88);
    border: 1px solid rgba(255, 210, 150, 0.45);
    box-shadow: inset 0 0 18px rgba(255, 170, 90, 0.35);
}

@keyframes sun-pulse {
    50% {
        box-shadow: 0 0 58px 16px rgba(255, 160, 70, 0.46),
            0 0 140px 48px rgba(255, 110, 40, 0.22);
    }
}

.sun-swap-enter-active,
.sun-swap-leave-active {
    transition: opacity 320ms var(--ease), transform 320ms var(--ease);
}

.sun-swap-enter,
.sun-swap-leave-to {
    opacity: 0;
    transform: scale(0.6);
}

@keyframes spin-back {
    to {
        transform: rotate(-360deg);
    }
}

.orbit:hover .ring,
.orbit:hover .node-face,
.orbit.has-active .ring,
.orbit.has-active .node-face {
    animation-play-state: paused;
}

.node:hover,
.node.is-on {
    z-index: 3;
}

.node-face {
    cursor: pointer;
}

.node-label {
    position: absolute;
    top: calc(100% + 7px);
    left: 50%;
    padding: 0.22rem 0.5rem;
    border-radius: 6px;
    font-size: 0.66rem;
    font-weight: 700;
    letter-spacing: 0.01em;
    white-space: nowrap;
    color: #fff;
    background: rgba(8, 10, 18, 0.92);
    border: 1px solid rgba(255, 255, 255, 0.16);
    opacity: 0;
    pointer-events: none;
    transform: translate(-50%, 5px);
    transition: opacity 240ms var(--ease), transform 240ms var(--ease);
}

.node-face:hover .node-label,
.is-on .node-face .node-label {
    opacity: 1;
    transform: translate(-50%, 0);
}

.node-face img {
    filter: grayscale(1);
    opacity: 0.65;
    transition: filter 320ms var(--ease), opacity 320ms var(--ease),
        transform 320ms var(--ease);
}

.node-face:hover,
.is-on .node-face {
    border-color: rgba(255, 255, 255, 0.5);
    box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.07),
        0 0 26px 6px rgba(255, 255, 255, 0.22);
}

.node-face:hover img,
.is-on .node-face img {
    filter: none;
    opacity: 1;
}

/* 22px -> 34px */
.ring-outer .node-face:hover img,
.ring-outer .is-on .node-face img {
    transform: scale(1.545);
}

/* 18px -> 28px */
.ring-inner .node-face:hover img,
.ring-inner .is-on .node-face img {
    transform: scale(1.556);
}

/* ---------- scroll cue ---------- */

.scroll-cue {
    position: absolute;
    left: 50%;
    bottom: 1.5rem;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    background: none;
    border: 0;
    cursor: pointer;
    color: rgba(255, 255, 255, 0.55);
}

.cue-label {
    writing-mode: vertical-rl;
    font-size: 0.6rem;
    letter-spacing: 0.32em;
}

.cue-circle {
    width: 30px;
    height: 30px;
    display: grid;
    place-items: center;
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    font-size: 0.7rem;
    animation: bob 2s ease-in-out infinite;
}

@keyframes bob {
    50% {
        transform: translateY(6px);
    }
}

/* ---------- responsive ---------- */

@media (max-width: 900px) {
    .hero-inner {
        grid-template-columns: 1fr;
        text-align: left;
    }

    .orbit {
        max-width: 280px;
        order: -1;
    }

    .scroll-cue {
        display: none;
    }
}

@media (prefers-reduced-motion: reduce) {
    .ring-outer,
    .ring-inner,
    .node-face,
    .sun,
    .sun::before,
    .cue-circle,
    .dot {
        animation: none !important;
    }
}
</style>
