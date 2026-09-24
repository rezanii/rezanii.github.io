<template>
    <section class="mq" aria-label="Tech stack">
        <div
            v-for="(row, r) in rows"
            :key="r"
            class="mq-row"
            :class="{ rev: r % 2 === 1 }"
        >
            <ul class="mq-track">
                <li
                    v-for="(t, i) in row.concat(row)"
                    :key="t.name + '-' + i"
                    class="mq-item"
                    :aria-hidden="i >= row.length ? 'true' : null"
                >
                    <img
                        class="mq-icon"
                        :src="iconUrl(t)"
                        :alt="t.name"
                        width="20"
                        height="20"
                        decoding="async"
                    />
                    <span>{{ t.name }}</span>
                </li>
            </ul>
        </div>
    </section>
</template>

<script>
import { STACK, iconUrl } from "../../data/stack";

export default {
    name: "TechMarquee",
    computed: {
        rows() {
            const half = Math.ceil(STACK.length / 2);
            return [STACK.slice(0, half), STACK.slice(half)];
        },
    },
    methods: { iconUrl },
};
</script>

<style scoped>
.mq {
    overflow: hidden;
    border-block: 1px solid var(--border);
    background: var(--bg-alt);
    padding-block: 2rem;
    display: grid;
    gap: 1.5rem;
}

.mq-row {
    overflow: hidden;
}

.mq-track {
    display: flex;
    align-items: center;
    gap: 3rem;
    width: max-content;
    margin: 0;
    padding: 0;
    list-style: none;
    animation: mq-scroll 46s linear infinite;
}

.rev .mq-track {
    animation-direction: reverse;
}

@keyframes mq-scroll {
    to {
        transform: translateX(-50%);
    }
}

.mq-row:hover .mq-track {
    animation-play-state: paused;
}

.mq-item {
    display: inline-flex;
    align-items: center;
    gap: 0.55rem;
    font-size: 1.05rem;
    font-weight: 600;
    white-space: nowrap;
    color: var(--fg-faint);
    transition: color 260ms var(--ease);
}

.mq-item:hover {
    color: var(--accent);
}

.mq-icon {
    width: 20px;
    height: 20px;
    filter: grayscale(1);
    opacity: 0.55;
    transition: filter 260ms var(--ease), opacity 260ms var(--ease),
        transform 260ms var(--ease);
}

/* 20px -> 30px */
.mq-item:hover .mq-icon {
    filter: none;
    opacity: 1;
    transform: scale(1.5);
}

@media (prefers-reduced-motion: reduce) {
    .mq-row {
        overflow-x: auto;
    }

    .mq-track {
        animation: none;
    }

    .mq-item:hover .mq-icon {
        transform: none;
    }
}
</style>
