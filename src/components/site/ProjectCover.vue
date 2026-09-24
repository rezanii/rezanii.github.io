<template>
    <svg
        class="cover"
        viewBox="0 0 400 240"
        preserveAspectRatio="xMidYMid slice"
        role="img"
        :aria-label="title"
    >
        <defs>
            <linearGradient :id="gid" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" :stop-color="theme.from" />
                <stop offset="100%" :stop-color="theme.to" />
            </linearGradient>

            <radialGradient :id="gid + '-glow'" cx="50%" cy="50%" r="50%">
                <stop offset="0%" :stop-color="theme.accent" stop-opacity="0.5" />
                <stop offset="100%" :stop-color="theme.accent" stop-opacity="0" />
            </radialGradient>

            <pattern
                :id="gid + '-dots'"
                width="16"
                height="16"
                patternUnits="userSpaceOnUse"
            >
                <circle cx="2" cy="2" r="1" fill="#fff" opacity="0.14" />
            </pattern>
        </defs>

        <rect width="400" height="240" :fill="`url(#${gid})`" />
        <rect width="400" height="240" :fill="`url(#${gid}-dots)`" />
        <ellipse
            cx="312"
            cy="46"
            rx="150"
            ry="110"
            :fill="`url(#${gid}-glow)`"
        />

        <g :stroke="theme.accent" :fill="theme.accent" class="art">
            <g v-if="motif === 'neural'" fill="none" stroke-width="1.5">
                <g opacity="0.5" class="flow">
                    <line
                        v-for="(e, i) in neuralEdges"
                        :key="'e' + i"
                        :x1="e.x1"
                        :y1="e.y1"
                        :x2="e.x2"
                        :y2="e.y2"
                    />
                </g>
                <circle
                    v-for="(n, i) in neuralNodes"
                    :key="'u' + i"
                    :cx="n.x"
                    :cy="n.y"
                    :r="n.r"
                    :fill="theme.from"
                    stroke-width="2"
                    class="pulse"
                    :style="{ '--d': n.d + 's' }"
                />
            </g>

            <g v-else-if="motif === 'mesh'" fill="none" stroke-width="1.5">
                <g opacity="0.55" class="flow">
                    <line
                        v-for="(n, i) in meshNodes"
                        :key="'l' + i"
                        x1="200"
                        y1="120"
                        :x2="n.x"
                        :y2="n.y"
                    />
                </g>
                <circle cx="200" cy="120" r="24" stroke-width="2" class="core" />
                <circle
                    cx="200"
                    cy="120"
                    r="9"
                    :fill="theme.accent"
                    stroke="none"
                />
                <circle
                    v-for="(n, i) in meshNodes"
                    :key="'n' + i"
                    :cx="n.x"
                    :cy="n.y"
                    r="11"
                    :fill="theme.from"
                    stroke-width="2"
                    class="pulse"
                    :style="{ '--d': i * 0.28 + 's' }"
                />
            </g>

            <g v-else-if="motif === 'pipeline'" fill="none" stroke-width="2">
                <g v-for="(x, i) in [52, 142, 232, 322]" :key="'s' + x">
                    <rect
                        :x="x"
                        y="96"
                        width="46"
                        height="48"
                        rx="10"
                        :fill="theme.from"
                        fill-opacity="0.75"
                    />
                    <circle
                        :cx="x + 23"
                        cy="120"
                        r="7"
                        :fill="i < 3 ? theme.accent : 'none'"
                        stroke="none"
                        class="pulse"
                        :style="{ '--d': i * 0.4 + 's' }"
                    />
                    <path
                        v-if="i === 3"
                        :d="`M${x + 13} 120 l7 8 l14 -17`"
                        stroke-width="3"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </g>
                <g stroke-width="1.5" opacity="0.7" class="flow">
                    <path
                        v-for="x in [98, 188, 278]"
                        :key="'a' + x"
                        :d="`M${x} 120 h34 m-8 -5 l8 5 l-8 5`"
                    />
                </g>
            </g>

            <g v-else-if="motif === 'signal'" fill="none" stroke-width="2">
                <path
                    d="M24 150 q26 -54 52 0 t52 0 t52 0 t52 0 t52 0 t52 0"
                    opacity="0.85"
                    class="wave"
                />
                <rect
                    x="168"
                    y="60"
                    width="64"
                    height="64"
                    rx="12"
                    :fill="theme.from"
                    fill-opacity="0.8"
                    stroke-width="2"
                />
                <circle cx="200" cy="92" r="8" :fill="theme.accent" stroke="none" />
                <g stroke-width="1.5" opacity="0.6">
                    <path
                        v-for="(d, i) in ['M168 76 h-26', 'M168 108 h-26', 'M232 76 h26', 'M232 108 h26', 'M186 60 v-22', 'M214 60 v-22']"
                        :key="'p' + i"
                        :d="d"
                    />
                </g>
                <circle
                    v-for="(c, i) in [{ x: 142, y: 76 }, { x: 142, y: 108 }, { x: 258, y: 76 }, { x: 258, y: 108 }, { x: 186, y: 38 }, { x: 214, y: 38 }]"
                    :key="'c' + i"
                    :cx="c.x"
                    :cy="c.y"
                    r="5"
                    :fill="theme.accent"
                    stroke="none"
                    opacity="0.85"
                    class="pulse"
                    :style="{ '--d': i * 0.24 + 's' }"
                />
            </g>

            <g v-else-if="motif === 'docs'" fill="none" stroke-width="2">
                <g v-for="(o, i) in [{ x: 118, y: 52 }, { x: 140, y: 68 }, { x: 162, y: 84 }]" :key="'d' + i">
                    <rect
                        :x="o.x"
                        :y="o.y"
                        width="120"
                        height="104"
                        rx="10"
                        :fill="theme.from"
                        :fill-opacity="0.6 + i * 0.18"
                        class="float"
                        :style="{ '--d': i * 0.5 + 's' }"
                    />
                </g>
                <g stroke-width="3" stroke-linecap="round" opacity="0.9">
                    <path
                        v-for="(y, i) in [112, 130, 148]"
                        :key="'t' + y"
                        :d="`M180 ${y} h${[72, 56, 64][i]}`"
                    />
                </g>
            </g>

            <g v-else fill="none" stroke-width="2">
                <rect
                    x="68"
                    y="46"
                    width="264"
                    height="148"
                    rx="12"
                    :fill="theme.from"
                    fill-opacity="0.72"
                />
                <path d="M68 76 h264" stroke-width="1.5" opacity="0.7" />
                <circle
                    v-for="(x, i) in [86, 100, 114]"
                    :key="'b' + i"
                    :cx="x"
                    cy="61"
                    r="4"
                    :fill="theme.accent"
                    stroke="none"
                />
                <rect
                    x="88"
                    y="94"
                    width="112"
                    height="12"
                    rx="6"
                    :fill="theme.accent"
                    stroke="none"
                    opacity="0.9"
                />
                <rect
                    x="88"
                    y="114"
                    width="76"
                    height="8"
                    rx="4"
                    :fill="theme.accent"
                    stroke="none"
                    opacity="0.5"
                />
                <rect
                    v-for="(x, i) in [88, 172, 256]"
                    :key="'k' + i"
                    :x="x"
                    y="140"
                    width="56"
                    height="36"
                    rx="8"
                    stroke-width="1.5"
                    opacity="0.75"
                    class="shimmer"
                    :style="{ '--d': i * 0.45 + 's' }"
                />
            </g>
        </g>
    </svg>
</template>

<script>
const THEMES = {
    AI: { from: "#0a1633", to: "#3730a3", accent: "#a5b4fc", motif: "neural" },
    Enterprise: { from: "#0f2350", to: "#1e3a8a", accent: "#7dd3fc", motif: "mesh" },
    DevOps: { from: "#07302c", to: "#115e59", accent: "#5eead4", motif: "pipeline" },
    "IoT / AI": { from: "#2b0f63", to: "#5b21b6", accent: "#d8b4fe", motif: "signal" },
    Business: { from: "#43160a", to: "#9a3412", accent: "#fdba74", motif: "docs" },
    Landing: { from: "#4a0620", to: "#9f1239", accent: "#fda4af", motif: "frame" },
};

const FALLBACK = {
    from: "#1c1f2b",
    to: "#374151",
    accent: "#cbd5e1",
    motif: "frame",
};

export default {
    name: "ProjectCover",
    props: {
        category: { type: String, required: true },
        title: { type: String, default: "" },
    },
    computed: {
        theme() {
            return THEMES[this.category] || FALLBACK;
        },
        motif() {
            return this.theme.motif;
        },
        gid() {
            return "pc" + this._uid;
        },
        neuralLayers() {
            return [
                { x: 96, n: 3, r: 10 },
                { x: 200, n: 5, r: 8 },
                { x: 304, n: 2, r: 11 },
            ].map((L) => ({
                ...L,
                ys: Array.from(
                    { length: L.n },
                    (_, i) => 120 + (i - (L.n - 1) / 2) * (150 / L.n)
                ),
            }));
        },
        neuralNodes() {
            const out = [];
            this.neuralLayers.forEach((L, li) =>
                L.ys.forEach((y, i) =>
                    out.push({
                        x: L.x,
                        y: +y.toFixed(1),
                        r: L.r,
                        d: +(li * 0.35 + i * 0.16).toFixed(2),
                    })
                )
            );
            return out;
        },
        neuralEdges() {
            const out = [];
            const L = this.neuralLayers;
            for (let i = 0; i < L.length - 1; i++) {
                L[i].ys.forEach((y1) =>
                    L[i + 1].ys.forEach((y2) =>
                        out.push({
                            x1: L[i].x,
                            y1: +y1.toFixed(1),
                            x2: L[i + 1].x,
                            y2: +y2.toFixed(1),
                        })
                    )
                );
            }
            return out;
        },
        meshNodes() {
            return Array.from({ length: 6 }, (_, i) => {
                const a = (Math.PI / 3) * i - Math.PI / 2;
                return {
                    x: +(200 + 82 * Math.cos(a)).toFixed(1),
                    y: +(120 + 62 * Math.sin(a)).toFixed(1),
                };
            });
        },
    },
};
</script>

<style scoped>
.cover {
    display: block;
    width: 100%;
    height: 100%;
    transition: transform 620ms var(--ease);
}

.flow {
    stroke-dasharray: 5 9;
    animation: flow 2.4s linear infinite;
}

@keyframes flow {
    to {
        stroke-dashoffset: -28;
    }
}

.pulse {
    animation: pulse 2.6s ease-in-out infinite;
    animation-delay: var(--d, 0s);
    transform-box: fill-box;
    transform-origin: center;
}

@keyframes pulse {
    0%,
    100% {
        transform: scale(1);
        opacity: 0.75;
    }
    50% {
        transform: scale(1.22);
        opacity: 1;
    }
}

.wave {
    stroke-dasharray: 22 14;
    animation: flow 3.2s linear infinite;
}

.float {
    animation: float 5s ease-in-out infinite;
    animation-delay: var(--d, 0s);
    transform-box: fill-box;
}

@keyframes float {
    50% {
        transform: translateY(-7px);
    }
}

.shimmer {
    animation: shimmer 3s ease-in-out infinite;
    animation-delay: var(--d, 0s);
}

@keyframes shimmer {
    50% {
        opacity: 0.3;
    }
}

@media (prefers-reduced-motion: reduce) {
    .cover {
        transition: none;
    }

    .flow,
    .pulse,
    .wave,
    .float,
    .shimmer {
        animation: none;
    }
}
</style>
