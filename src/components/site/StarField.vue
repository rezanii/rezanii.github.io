<template>
    <canvas ref="cv" class="starfield" aria-hidden="true"></canvas>
</template>

<script>
const LERP = 0.12;
const PULL = 0.75;

export default {
    name: "StarField",
    props: {
        radius: { type: Number, default: 150 },
        density: { type: Number, default: 9000 },
        minStars: { type: Number, default: 40 },
        maxStars: { type: Number, default: 170 },
        dimColor: { type: String, default: "" },
        hotColor: { type: String, default: "" },
    },
    data() {
        return { reduce: false };
    },
    mounted() {
        this.stars = [];
        this.px = -1;
        this.py = -1;
        this.raf = 0;
        this.w = 0;
        this.h = 0;
        this.reduce = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        this.readColors();
        this.resize();

        this.onResize = () => this.resize();
        if ("ResizeObserver" in window) {
            this.sizeObs = new ResizeObserver(this.onResize);
            this.sizeObs.observe(this.$el.parentElement);
        } else {
            window.addEventListener("resize", this.onResize, { passive: true });
        }

        this.host = this.$el.parentElement;
        if (!this.reduce && this.host) {
            this.onMove = (e) => {
                const b = this.$el.getBoundingClientRect();
                this.px = e.clientX - b.left;
                this.py = e.clientY - b.top;
            };
            this.onLeave = () => {
                this.px = -1;
                this.py = -1;
            };
            this.host.addEventListener("pointermove", this.onMove, {
                passive: true,
            });
            this.host.addEventListener("pointerleave", this.onLeave, {
                passive: true,
            });
        }

        this.themeObs = new MutationObserver(() => this.readColors());
        this.themeObs.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["data-theme"],
        });

        if (this.reduce) {
            this.draw(0);
            return;
        }

        if ("IntersectionObserver" in window) {
            this.visObs = new IntersectionObserver(
                ([e]) => (e.isIntersecting ? this.start() : this.stop()),
                { threshold: 0 }
            );
            this.visObs.observe(this.$el);
        } else {
            this.start();
        }
    },
    beforeDestroy() {
        this.stop();
        if (this.sizeObs) this.sizeObs.disconnect();
        else window.removeEventListener("resize", this.onResize);
        if (this.host && this.onMove) {
            this.host.removeEventListener("pointermove", this.onMove);
            this.host.removeEventListener("pointerleave", this.onLeave);
        }
        if (this.visObs) this.visObs.disconnect();
        if (this.themeObs) this.themeObs.disconnect();
    },
    methods: {
        readColors() {
            const cs = getComputedStyle(document.documentElement);
            this.dim = this.toRGB(
                this.dimColor || cs.getPropertyValue("--fg-faint"),
                [156, 163, 175]
            );
            this.hot = this.toRGB(
                this.hotColor || cs.getPropertyValue("--accent"),
                [239, 68, 68]
            );
        },

        toRGB(value, fallback) {
            const hex = (value || "").trim();
            if (!/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(hex)) return fallback;
            const full =
                hex.length === 4
                    ? "#" + [...hex.slice(1)].map((c) => c + c).join("")
                    : hex;
            return [
                parseInt(full.slice(1, 3), 16),
                parseInt(full.slice(3, 5), 16),
                parseInt(full.slice(5, 7), 16),
            ];
        },

        resize() {
            const cv = this.$refs.cv;
            if (!cv || !cv.parentElement) return;

            const b = cv.parentElement.getBoundingClientRect();
            this.w = Math.max(1, Math.round(b.width));
            this.h = Math.max(1, Math.round(b.height));

            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            cv.width = this.w * dpr;
            cv.height = this.h * dpr;

            this.ctx = cv.getContext("2d");
            this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            const want = Math.round(
                Math.min(
                    this.maxStars,
                    Math.max(this.minStars, (this.w * this.h) / this.density)
                )
            );
            if (want !== this.stars.length) this.seed(want);

            if (this.reduce) this.draw(0);
        },

        seed(want) {
            this.stars = Array.from({ length: want }, () => {
                const hx = Math.random();
                const hy = Math.random();
                return {
                    hx,
                    hy,
                    x: hx * this.w,
                    y: hy * this.h,
                    r: 0.4 + Math.random() * 1.1,
                    ph: Math.random() * Math.PI * 2,
                    ds: 0.12 + Math.random() * 0.28,
                    da: 3 + Math.random() * 9,
                    tws: 0.6 + Math.random() * 1.6,
                };
            });
        },

        start() {
            if (this.raf) return;
            const tick = (now) => {
                this.draw(now);
                this.raf = requestAnimationFrame(tick);
            };
            this.raf = requestAnimationFrame(tick);
        },

        stop() {
            if (this.raf) cancelAnimationFrame(this.raf);
            this.raf = 0;
        },

        draw(now) {
            const ctx = this.ctx;
            if (!ctx) return;

            const t = now * 0.001;
            const R = this.radius;
            const live = !this.reduce && this.px >= 0;

            ctx.clearRect(0, 0, this.w, this.h);

            for (const s of this.stars) {
                const homeX = this.reduce
                    ? s.hx * this.w
                    : s.hx * this.w + Math.sin(t * s.ds + s.ph) * s.da;
                const homeY = this.reduce
                    ? s.hy * this.h
                    : s.hy * this.h + Math.cos(t * s.ds * 0.8 + s.ph) * s.da;

                let tx = homeX;
                let ty = homeY;
                let grab = 0;

                if (live) {
                    const dx = this.px - homeX;
                    const dy = this.py - homeY;
                    const d = Math.sqrt(dx * dx + dy * dy);
                    if (d < R) {
                        grab = 1 - d / R;
                        tx = homeX + dx * grab * PULL;
                        ty = homeY + dy * grab * PULL;
                    }
                }

                if (this.reduce) {
                    s.x = tx;
                    s.y = ty;
                } else {
                    s.x += (tx - s.x) * LERP;
                    s.y += (ty - s.y) * LERP;
                }

                const twinkle = this.reduce
                    ? 0.7
                    : 0.55 + 0.45 * Math.sin(t * s.tws + s.ph);
                const alpha = Math.min(1, twinkle * (0.42 + grab * 0.9));

                const c = [
                    Math.round(this.dim[0] + (this.hot[0] - this.dim[0]) * grab),
                    Math.round(this.dim[1] + (this.hot[1] - this.dim[1]) * grab),
                    Math.round(this.dim[2] + (this.hot[2] - this.dim[2]) * grab),
                ];

                if (grab > 0.3) {
                    ctx.strokeStyle = `rgba(${c[0]},${c[1]},${c[2]},${
                        (grab - 0.3) * 0.5
                    })`;
                    ctx.lineWidth = 0.6;
                    ctx.beginPath();
                    ctx.moveTo(s.x, s.y);
                    ctx.lineTo(this.px, this.py);
                    ctx.stroke();
                }

                ctx.fillStyle = `rgba(${c[0]},${c[1]},${c[2]},${alpha})`;
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.r * (1 + grab * 1.3), 0, Math.PI * 2);
                ctx.fill();
            }
        },
    },
};
</script>

<style scoped>
.starfield {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 0;
}
</style>
