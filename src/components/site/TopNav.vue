<template>
    <header class="topnav" :class="{ scrolled: isScrolled }">
        <div class="shell bar">
            <a href="#home" class="brand" @click.prevent="go('#home')">
                AR<span>.</span>
            </a>

            <nav class="links" :class="{ open: menuOpen }">
                <a
                    v-for="item in items"
                    :key="item.id"
                    :href="'#' + item.id"
                    class="link"
                    :class="{ active: active === item.id }"
                    @click.prevent="go('#' + item.id)"
                >
                    {{ item.label }}
                </a>

                <a class="cv" :href="cvUrl" download>
                    <i class="fas fa-download"></i> CV
                </a>
            </nav>

            <div class="tools">
                <button
                    class="icon-btn"
                    type="button"
                    :aria-label="isDark ? 'Switch to light' : 'Switch to dark'"
                    @click="$emit('toggle-theme')"
                >
                    <i :class="isDark ? 'fas fa-sun' : 'fas fa-moon'"></i>
                </button>

                <button
                    class="icon-btn burger"
                    type="button"
                    aria-label="Menu"
                    @click="menuOpen = !menuOpen"
                >
                    <i :class="menuOpen ? 'fas fa-times' : 'fas fa-bars'"></i>
                </button>
            </div>
        </div>
    </header>
</template>

<script>
export default {
    name: "TopNav",
    props: {
        isDark: { type: Boolean, default: false },
    },
    data() {
        return {
            menuOpen: false,
            isScrolled: false,
            active: "home",
            spy: null,
            // TODO(ridwan): taruh CV di public/ lalu sesuaikan nama file
            cvUrl: "/Ahmad-Ridwan-Rezani-CV.pdf",
            items: [
                { id: "home", label: "Home" },
                { id: "about", label: "About" },
                { id: "resume", label: "Resume" },
                { id: "services", label: "Services" },
                { id: "projects", label: "Projects" },
                { id: "testimonials", label: "Testimonials" },
                { id: "contact", label: "Contact" },
            ],
        };
    },
    mounted() {
        window.addEventListener("scroll", this.onScroll, { passive: true });
        this.onScroll();
        this.$nextTick(this.initSpy);
    },
    beforeDestroy() {
        window.removeEventListener("scroll", this.onScroll);
        if (this.spy) this.spy.disconnect();
    },
    methods: {
        onScroll() {
            this.isScrolled = window.scrollY > 24;
        },

        go(hash) {
            this.menuOpen = false;
            const el = document.querySelector(hash);
            if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        },

        initSpy() {
            if (!("IntersectionObserver" in window)) return;

            this.spy = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) this.active = entry.target.id;
                    });
                },
                { rootMargin: "-45% 0px -50% 0px" }
            );

            this.items.forEach((item) => {
                const el = document.getElementById(item.id);
                if (el) this.spy.observe(el);
            });
        },
    },
};
</script>

<style scoped>
.topnav {
    position: fixed;
    inset: 0 0 auto 0;
    z-index: 100;
    transition: background 280ms ease, border-color 280ms ease,
        backdrop-filter 280ms ease;
    border-bottom: 1px solid transparent;
}

.topnav.scrolled {
    background: color-mix(in srgb, var(--bg) 82%, transparent);
    backdrop-filter: saturate(150%) blur(12px);
    border-bottom-color: var(--border);
}

.bar {
    height: 72px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
}

.brand {
    font-size: 1.15rem;
    font-weight: 700;
    letter-spacing: -0.02em;
}

.brand span {
    color: var(--accent);
}

.topnav:not(.scrolled) .brand,
.topnav:not(.scrolled) .link:hover,
.topnav:not(.scrolled) .icon-btn {
    color: #fff;
}

.topnav:not(.scrolled) .link {
    color: rgba(255, 255, 255, 0.72);
}

.topnav:not(.scrolled) .link.active,
.topnav:not(.scrolled) .cv {
    color: #ff9c9c;
}

.topnav:not(.scrolled) .link.active::after,
.topnav:not(.scrolled) .link::after {
    background: #ff9c9c;
}

.topnav:not(.scrolled) .icon-btn {
    border-color: rgba(255, 255, 255, 0.28);
}

.topnav:not(.scrolled) .icon-btn:hover {
    background: #fff;
    color: #0f1115;
}

.links {
    display: flex;
    align-items: center;
    gap: 1.6rem;
    margin-left: auto;
}

.link {
    position: relative;
    font-size: 0.88rem;
    font-weight: 500;
    color: var(--fg-muted);
    padding-block: 0.4rem;
    transition: color 220ms ease;
}

.link:hover {
    color: var(--fg);
}

.link.active {
    color: var(--accent);
}

.link::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: -2px;
    height: 2px;
    background: var(--accent);
    border-radius: 2px;
    transform: scaleX(0);
    transform-origin: center;
    transition: transform 280ms var(--ease);
}

.link.active::after {
    transform: scaleX(1);
}

.cv {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--accent);
    transition: opacity 220ms ease;
}

.cv:hover {
    opacity: 0.75;
}

.tools {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-left: 1.25rem;
}

.icon-btn {
    width: 38px;
    height: 38px;
    display: grid;
    place-items: center;
    border: 1px solid var(--border);
    border-radius: 50%;
    background: transparent;
    color: var(--fg);
    font-size: 0.85rem;
    cursor: pointer;
    transition: background 240ms ease, color 240ms ease, transform 240ms var(--ease);
}

.icon-btn:hover {
    background: var(--fg);
    color: var(--bg);
    transform: translateY(-2px);
}

.burger {
    display: none;
}

@media (max-width: 960px) {
    .burger {
        display: grid;
    }

    .tools {
        margin-left: 0;
    }

    .links {
        position: fixed;
        inset: 72px 0 auto 0;
        flex-direction: column;
        align-items: flex-start;
        gap: 0;
        padding: 1rem var(--gutter) 1.5rem;
        background: var(--bg);
        border-bottom: 1px solid var(--border);
        transform: translateY(-120%);
        opacity: 0;
        pointer-events: none;
        transition: transform 320ms var(--ease), opacity 320ms ease;
    }

    .links.open {
        transform: translateY(0);
        opacity: 1;
        pointer-events: auto;
    }

    .link,
    .cv {
        width: 100%;
        padding-block: 0.85rem;
        font-size: 1rem;
        border-bottom: 1px solid var(--border);
    }

    .link::after {
        display: none;
    }

    .topnav:not(.scrolled) .link {
        color: var(--fg-muted);
    }

    .topnav:not(.scrolled) .link:hover {
        color: var(--fg);
    }

    .topnav:not(.scrolled) .link.active,
    .topnav:not(.scrolled) .cv {
        color: var(--accent);
    }
}
</style>
