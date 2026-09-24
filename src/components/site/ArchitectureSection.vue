<template>
    <section class="section arch">
        <div class="shell">
            <div class="sec-head">
                <span class="sec-eyebrow">
                    Microservice architecture, API-driven integration, and
                    production debugging
                </span>
                <h2 class="sec-title">How the systems fit together</h2>
                <div class="sec-rule"></div>
            </div>

            <div class="arch-grid">
                <!-- ============ diagram ============ -->
                <div class="panel diagram">
                    <div class="panel-head">
                        <span class="panel-tag">
                            <i class="dot"></i> Service Network
                        </span>
                        <span class="panel-meta">
                            {{ laidOut.length }} services · all healthy
                        </span>
                    </div>

                    <div class="net">
                        <svg
                            class="wires"
                            viewBox="0 0 100 100"
                            preserveAspectRatio="none"
                            aria-hidden="true"
                        >
                            <line
                                v-for="(n, i) in laidOut"
                                :key="'w' + i"
                                class="wire"
                                :class="{ lit: active === i }"
                                x1="50"
                                y1="50"
                                :x2="n.x"
                                :y2="n.y"
                            />
                            <line
                                v-for="(n, i) in laidOut"
                                :key="'p' + i"
                                class="pulse"
                                :class="{ lit: active === i }"
                                :style="{
                                    animationDelay: i * 0.42 + 's',
                                    stroke: n.color,
                                }"
                                x1="50"
                                y1="50"
                                :x2="n.x"
                                :y2="n.y"
                            />
                        </svg>

                        <div class="core">
                            <span class="core-ring r1"></span>
                            <span class="core-ring r2"></span>
                            <span class="core-dash"></span>
                            <i class="fas fa-project-diagram"></i>
                            <span class="core-label">API<br />GATEWAY</span>
                        </div>

                        <div
                            v-for="(n, i) in laidOut"
                            :key="n.label"
                            class="node"
                            :class="{ on: active === i }"
                            :style="{
                                left: n.x + '%',
                                top: n.y + '%',
                                animationDelay: i * 0.26 + 's',
                                '--c': n.color,
                            }"
                            @mouseenter="active = i"
                            @mouseleave="active = -1"
                        >
                            <span class="node-ic"><i :class="n.icon"></i></span>
                            <span class="node-label">{{ n.label }}</span>
                            <span class="node-tech">{{ n.tech }}</span>
                            <span class="node-dot"></span>
                        </div>
                    </div>

                    <div class="legend">
                        <span
                            v-for="n in laidOut"
                            :key="'l' + n.label"
                            class="chip"
                            :style="{ '--c': n.color }"
                        >
                            <i :class="n.icon"></i> {{ n.label }}
                        </span>
                    </div>
                </div>

                <!-- ============ terminal ============ -->
                <div class="panel term" ref="term">
                    <div class="term-bar">
                        <span class="prompt">&gt;_</span>
                        <span class="fname">integration_trace.sh</span>
                        <span class="dots">
                            <i class="r"></i><i class="y"></i><i class="g"></i>
                        </span>
                    </div>

                    <div class="term-body" ref="body">
                        <p
                            v-for="(l, i) in shown"
                            :key="i"
                            class="ln"
                            :class="l.kind"
                        >
                            <span class="mark">{{ mark(l.kind) }}</span>
                            <span class="txt"
                                >{{ l.text
                                }}<span
                                    v-if="i === shown.length - 1 && !done"
                                    class="caret"
                                    >▌</span
                                ></span
                            >
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: "ArchitectureSection",
    data() {
        return {
            active: -1,

            // Posisinya TIDAK ditulis manual — dihitung di computed `laidOut`.
            // Tambah atau hapus node, lingkarannya menata ulang sendiri.
            nodes: [
                { label: "Work Order", tech: "Go", icon: "fas fa-clipboard-list", color: "#58a6ff" },
                { label: "Inventory", tech: "Go", icon: "fas fa-boxes", color: "#f0883e" },
                { label: "Finance", tech: "REST", icon: "fas fa-file-invoice-dollar", color: "#3fb950" },
                { label: "SQL Server", tech: "T-SQL", icon: "fas fa-database", color: "#ff7b72" },
                { label: "Message Queue", tech: "RabbitMQ", icon: "fas fa-broadcast-tower", color: "#d2a8ff" },
                { label: "Auth", tech: "JWT", icon: "fas fa-shield-alt", color: "#79c0ff" },
                { label: "CRM", tech: "REST", icon: "fas fa-users", color: "#ffa657" },
            ],

            // TODO(ridwan): ganti kalimatnya kapan saja — ini cuma data
            script: [
                { kind: "sys", text: "Service mesh online. DMS v2 — 7 services registered." },
                { kind: "sys", text: "Connected: work-order, inventory, finance, queue, auth, crm, gateway" },
                { kind: "user", text: 'Ticket: "Invoice submit returns 500 on second page"' },
                { kind: "llm", text: "Tracing the request path before touching any code…" },
                { kind: "exec", text: "trace --route POST /work-order/invoice/submit" },
                { kind: "act", text: "Walking 8 cross-service calls inside one open transaction." },
                { kind: "ok", text: "Found it — upstream paginates, then paginates again in memory." },
                { kind: "llm", text: "Root cause sits in the shared helper, not this endpoint." },
                { kind: "exec", text: "patch --target pagination.NewDataFramePaginate" },
                { kind: "act", text: "Clamping start index — negative slice length was the panic." },
                { kind: "ok", text: "15 call sites protected by one guard. Tests green." },
                { kind: "llm", text: "Shipping the fix where every caller routes through." },
            ],

            shown: [],
            done: false,
            timers: [],
            obs: null,
            started: false,
        };
    },
    computed: {
        // Sebar node merata di satu lingkaran, mulai dari atas.
        // rx/ry beda karena kotaknya tidak persis persegi.
        laidOut() {
            const n = this.nodes.length;
            const rx = 37;
            const ry = 39;

            return this.nodes.map((node, i) => {
                const rad = ((-90 + (360 / n) * i) * Math.PI) / 180;
                return {
                    ...node,
                    x: +(50 + rx * Math.cos(rad)).toFixed(2),
                    y: +(50 + ry * Math.sin(rad)).toFixed(2),
                };
            });
        },
    },
    mounted() {
        this.$nextTick(this.arm);
    },
    beforeDestroy() {
        this.stop();
        if (this.obs) this.obs.disconnect();
    },
    methods: {
        mark(kind) {
            return {
                sys: "i",
                user: "❯",
                llm: "❯",
                exec: "⚡",
                act: "❯",
                ok: "✓",
            }[kind];
        },

        // tanpa animasi: tampilkan seluruh log sekaligus
        showAll() {
            this.shown = this.script.slice();
            this.done = true;
        },

        arm() {
            const reduce = window.matchMedia("(prefers-reduced-motion: reduce)")
                .matches;

            if (reduce || !("IntersectionObserver" in window)) {
                this.showAll();
                return;
            }

            this.obs = new IntersectionObserver(
                (entries) => {
                    entries.forEach((e) => {
                        if (e.isIntersecting && !this.started) {
                            this.started = true;
                            this.play();
                        }
                    });
                },
                { threshold: 0.25 }
            );

            this.obs.observe(this.$refs.term);

            // jaring pengaman: kalau observer tidak pernah terpicu,
            // log tetap muncul daripada panel kosong
            this.timers.push(
                setTimeout(() => {
                    if (!this.shown.length) this.showAll();
                }, 5000)
            );
        },

        stop() {
            this.timers.forEach(clearTimeout);
            this.timers = [];
        },

        play() {
            this.stop();
            this.shown = [];
            this.done = false;

            let delay = 0;

            this.script.forEach((line) => {
                // baris panjang butuh jeda lebih lama, biar terbaca
                const hold = 320 + Math.min(line.text.length * 14, 900);
                delay += hold;

                this.timers.push(
                    setTimeout(() => {
                        this.shown.push(line);
                        this.$nextTick(this.scrollDown);
                    }, delay)
                );
            });

            // tandai selesai, lalu ulang dari awal
            this.timers.push(
                setTimeout(() => {
                    this.done = true;
                }, delay + 400)
            );

            this.timers.push(
                setTimeout(() => {
                    this.play();
                }, delay + 4200)
            );
        },

        scrollDown() {
            const b = this.$refs.body;
            if (b) b.scrollTop = b.scrollHeight;
        },
    },
};
</script>

<style scoped>
.arch-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 1.25rem;
}

.panel {
    position: relative;
    border: 1px solid var(--border);
    border-radius: var(--radius);
    background: var(--surface);
    overflow: hidden;
}

/* ============ diagram ============ */

.diagram {
    padding: 1.35rem 1.5rem 1.5rem;
    border-top: 2px solid var(--accent);
}

.panel-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    flex-wrap: wrap;
}

.panel-meta {
    font-size: 0.66rem;
    letter-spacing: 0.08em;
    color: var(--fg-faint);
}

.panel-tag {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.66rem;
    font-weight: 700;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--accent);
}

.panel-tag .dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--accent);
    animation: blip 1.8s ease-in-out infinite;
}

@keyframes blip {
    50% {
        opacity: 0.25;
    }
}

.net {
    position: relative;
    margin-top: 1rem;
    aspect-ratio: 1 / 0.92;
    width: 100%;
}

.wires {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
}

.wire {
    stroke: var(--border);
    stroke-width: 0.4;
    vector-effect: non-scaling-stroke;
    transition: stroke 260ms ease;
}

.wire.lit {
    stroke: var(--fg-faint);
}

.pulse {
    stroke-width: 1.1;
    vector-effect: non-scaling-stroke;
    stroke-dasharray: 7 93;
    stroke-dashoffset: 100;
    animation: flow 3s linear infinite;
    opacity: 0.8;
    transition: opacity 260ms ease, stroke-width 260ms ease;
}

.pulse.lit {
    opacity: 1;
    stroke-width: 2;
    animation-duration: 1.1s;
}

@keyframes flow {
    to {
        stroke-dashoffset: 0;
    }
}

/* ---------- core ---------- */

.core {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: grid;
    place-items: center;
    gap: 0.15rem;
    width: 92px;
    height: 92px;
    border-radius: 50%;
    background: var(--accent-soft);
    border: 1px solid var(--accent);
    color: var(--accent);
    font-size: 1.1rem;
    z-index: 3;
}

.core-ring {
    position: absolute;
    inset: -6px;
    border-radius: 50%;
    border: 1px solid var(--accent);
    opacity: 0.35;
    animation: halo 3s ease-out infinite;
}

.core-ring.r2 {
    animation-delay: 1.5s;
}

@keyframes halo {
    0% {
        transform: scale(1);
        opacity: 0.45;
    }
    100% {
        transform: scale(1.45);
        opacity: 0;
    }
}

/* cincin putus-putus yang berputar pelan */
.core-dash {
    position: absolute;
    inset: -14px;
    border-radius: 50%;
    border: 1px dashed var(--accent);
    opacity: 0.4;
    animation: spin 18s linear infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

.core-label {
    font-size: 0.46rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    line-height: 1.35;
    text-align: center;
}

/* ---------- node ---------- */

.node {
    position: absolute;
    transform: translate(-50%, -50%);
    display: grid;
    justify-items: center;
    gap: 0.22rem;
    padding: 0.6rem 0.55rem 0.5rem;
    min-width: 82px;
    border: 1px solid var(--border);
    border-radius: 11px;
    background: var(--bg);
    z-index: 2;
    cursor: default;
    animation: bob 3.6s ease-in-out infinite;
    transition: border-color 260ms ease, box-shadow 260ms ease;
}

.node.on {
    border-color: var(--c);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--c) 18%, transparent);
    z-index: 4;
}

.node-ic {
    display: grid;
    place-items: center;
    width: 30px;
    height: 30px;
    border-radius: 9px;
    font-size: 0.82rem;
    color: var(--c);
    background: color-mix(in srgb, var(--c) 14%, transparent);
    transition: transform 320ms var(--ease);
}

.node.on .node-ic {
    transform: scale(1.14) rotate(-8deg);
}

.node-label {
    font-size: 0.5rem;
    font-weight: 700;
    letter-spacing: 0.07em;
    text-transform: uppercase;
    color: var(--fg);
    white-space: nowrap;
}

.node-tech {
    font-size: 0.44rem;
    letter-spacing: 0.06em;
    color: var(--fg-faint);
    white-space: nowrap;
}

/* titik status hijau */
.node-dot {
    position: absolute;
    top: 6px;
    right: 6px;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #3fb950;
    animation: blip 2.4s ease-in-out infinite;
}

@keyframes bob {
    50% {
        transform: translate(-50%, calc(-50% - 5px));
    }
}

/* ---------- legenda ---------- */

.legend {
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem;
    margin-top: 1.1rem;
    padding-top: 1rem;
    border-top: 1px solid var(--border);
}

.legend .chip {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    padding: 0.24rem 0.6rem;
    border-radius: var(--radius-pill);
    font-size: 0.64rem;
    font-weight: 500;
    color: var(--c);
    background: color-mix(in srgb, var(--c) 12%, transparent);
}

.legend .chip i {
    font-size: 0.6rem;
}

/* ============ terminal ============ */

.term {
    display: flex;
    flex-direction: column;
    background: #0d1117;
    border-color: #1f2630;
}

.term-bar {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.7rem 0.95rem;
    border-bottom: 1px solid #1f2630;
    background: #11161e;
}

.prompt {
    color: #4b5563;
    font-family: "Courier New", monospace;
    font-size: 0.8rem;
}

.fname {
    font-family: "Courier New", monospace;
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    color: #8b949e;
    text-transform: uppercase;
}

.dots {
    margin-left: auto;
    display: flex;
    gap: 0.32rem;
}

.dots i {
    width: 9px;
    height: 9px;
    border-radius: 50%;
    display: block;
}

.dots .r {
    background: #ff5f57;
}
.dots .y {
    background: #febc2e;
}
.dots .g {
    background: #28c840;
}

.term-body {
    flex: 1;
    min-height: 300px;
    max-height: 340px;
    overflow-y: auto;
    padding: 1rem 1.1rem 1.25rem;
    font-family: "Courier New", monospace;
    font-size: 0.74rem;
    line-height: 1.85;
    scroll-behavior: smooth;
}

.term-body::-webkit-scrollbar {
    width: 6px;
}

.term-body::-webkit-scrollbar-thumb {
    background: #21262d;
    border-radius: 3px;
}

.ln {
    display: flex;
    gap: 0.6rem;
    animation: lineIn 260ms var(--ease) both;
}

@keyframes lineIn {
    from {
        opacity: 0;
        transform: translateY(5px);
    }
}

.mark {
    flex: none;
    width: 0.9rem;
    text-align: center;
}

.txt {
    color: #8b949e;
    word-break: break-word;
}

.sys .mark {
    color: #58a6ff;
}
.user .mark,
.user .txt {
    color: #e6edf3;
}
.llm .mark {
    color: #d2a8ff;
}
.exec .mark {
    color: #febc2e;
}
.exec .txt {
    color: #febc2e;
}
.act .mark {
    color: #8b949e;
}
.ok .mark,
.ok .txt {
    color: #3fb950;
}

.caret {
    color: var(--accent);
    animation: blink 1s steps(1) infinite;
}

@keyframes blink {
    50% {
        opacity: 0;
    }
}

/* ============ gerak dikurangi ============ */

@media (prefers-reduced-motion: reduce) {
    .pulse,
    .core-ring,
    .core-dash,
    .node,
    .node-dot,
    .panel-tag .dot,
    .caret,
    .ln {
        animation: none !important;
    }
    .term-body {
        scroll-behavior: auto;
    }
}
</style>
