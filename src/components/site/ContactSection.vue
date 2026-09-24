<template>
    <section id="contact" class="section">
        <div class="shell">
            <div class="sec-head">
                <span class="sec-eyebrow">Get in touch with me</span>
                <h2 class="sec-title">Contact</h2>
                <div class="sec-rule"></div>
            </div>

            <div class="ct-grid">
                <aside class="ct-side reveal">
                    <p class="ct-lead">
                        Have a project in mind? Let's talk about how we can work
                        together to bring your ideas to life.
                    </p>

                    <a
                        v-for="c in channels"
                        :key="c.label"
                        class="ct-item"
                        :href="c.href"
                    >
                        <span class="ct-ic"><i :class="c.icon"></i></span>
                        <span class="ct-txt">
                            <small>{{ c.label }}</small>
                            <strong>{{ c.value }}</strong>
                        </span>
                    </a>
                </aside>

                <form class="ct-form card reveal" style="--i: 1" @submit.prevent="send">
                    <p class="line">
                        Hello! My name is
                        <input
                            v-model.trim="form.name"
                            class="fill"
                            type="text"
                            placeholder="John Doe"
                            required
                            :size="inputSize(form.name, 'John Doe')"
                        />.
                    </p>

                    <p class="line">
                        I am reaching out to discuss a
                        <span class="select-wrap">
                            <select v-model="form.topic" class="fill accent">
                                <option v-for="t in topics" :key="t">{{ t }}</option>
                            </select>
                        </span>
                    </p>

                    <p class="line">
                        You can reach me back at
                        <input
                            v-model.trim="form.email"
                            class="fill"
                            type="email"
                            placeholder="john@example.com"
                            required
                            :size="inputSize(form.email, 'john@example.com')"
                        />.
                    </p>

                    <p class="line">
                        Regarding
                        <input
                            v-model.trim="form.subject"
                            class="fill"
                            type="text"
                            placeholder="e.g. Website redesign"
                            required
                            :size="inputSize(form.subject, 'e.g. Website redesign')"
                        />.
                    </p>

                    <label class="details-label" for="ct-message">
                        Here are the details:
                    </label>
                    <textarea
                        id="ct-message"
                        v-model.trim="form.message"
                        rows="5"
                        placeholder="Tell me more about your project goals, timeline, or just say hi…"
                        required
                    ></textarea>

                    <div class="ct-foot">
                        <span v-if="status" class="status" :class="status.kind">
                            {{ status.text }}
                        </span>
                        <button class="send" type="submit" :disabled="sending">
                            {{ sending ? "Sending…" : "Send Message" }}
                            <i class="fas fa-paper-plane"></i>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </section>
</template>

<script>
import reveal from "../../mixins/reveal";

export default {
    name: "ContactSection",
    mixins: [reveal],
    data() {
        return {
            sending: false,
            status: null,
            topics: [
                "Pre-Sales Inquiry",
                "Freelance Project",
                "Full-time Role",
                "Technical Consultation",
                "Just saying hi",
            ],
            form: {
                name: "",
                email: "",
                subject: "",
                topic: "Pre-Sales Inquiry",
                message: "",
            },
            channels: [
                {
                    label: "Email",
                    value: "ridwanrezani@gmail.com",
                    icon: "fas fa-envelope",
                    href: "mailto:ridwanrezani@gmail.com",
                },
                {
                    label: "LinkedIn",
                    value: "linkedin.com/in/rezani",
                    icon: "fab fa-linkedin-in",
                    href: "https://www.linkedin.com/in/rezani/",
                },
                {
                    label: "GitHub",
                    value: "github.com/rezanii",
                    icon: "fab fa-github",
                    href: "https://github.com/rezanii",
                },
                {
                    label: "Location",
                    value: "Jakarta, Indonesia",
                    icon: "fas fa-map-marker-alt",
                    href: "#contact",
                },
            ],
        };
    },
    methods: {
        // input melebar mengikuti isi, supaya kalimatnya tetap mengalir
        inputSize(value, placeholder) {
            const len = (value || placeholder || "").length;
            return Math.min(Math.max(len, 8), 34);
        },

        send() {
            this.sending = true;
            this.status = null;

            fetch("/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                    "form-name": "contact",
                    name: this.form.name,
                    email: this.form.email,
                    topic: this.form.topic,
                    subject: this.form.subject,
                    message: this.form.message,
                }).toString(),
            })
                .then((res) => {
                    if (!res.ok) throw new Error(res.status);
                    this.status = {
                        kind: "ok",
                        text: "Thanks — your message is on its way.",
                    };
                    this.form.name = "";
                    this.form.email = "";
                    this.form.subject = "";
                    this.form.message = "";
                })
                .catch(() => {
                    this.status = {
                        kind: "err",
                        text: "Something went wrong. Email me directly instead.",
                    };
                })
                .finally(() => {
                    this.sending = false;
                });
        },
    },
};
</script>

<style scoped>
.ct-grid {
    display: grid;
    grid-template-columns: minmax(0, 0.62fr) minmax(0, 1.3fr);
    gap: clamp(1.5rem, 4vw, 3.5rem);
    align-items: start;
}

.ct-lead {
    font-size: 0.95rem;
    line-height: 1.8;
    color: var(--fg-muted);
    margin-bottom: 1.75rem;
}

.ct-item {
    display: flex;
    align-items: center;
    gap: 0.85rem;
    padding: 0.9rem 1rem;
    margin-bottom: 0.7rem;
    border: 1px solid var(--border);
    border-radius: var(--radius);
    background: var(--surface);
    transition: border-color 240ms ease, transform 240ms var(--ease);
}

.ct-item:hover {
    border-color: var(--accent);
    transform: translateY(-2px);
}

.ct-ic {
    display: grid;
    place-items: center;
    width: 36px;
    height: 36px;
    flex: none;
    border-radius: 9px;
    background: var(--accent-soft);
    color: var(--accent);
    font-size: 0.85rem;
}

.ct-txt {
    display: flex;
    flex-direction: column;
    min-width: 0;
}

.ct-txt small {
    font-size: 0.7rem;
    color: var(--fg-faint);
}

.ct-txt strong {
    font-size: 0.85rem;
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
}

/* ---------- form percakapan ---------- */

.ct-form {
    padding: clamp(1.5rem, 4vw, 2.5rem);
}

.line {
    font-size: clamp(1rem, 2vw, 1.22rem);
    font-weight: 500;
    line-height: 2.4;
    color: var(--fg);
}

.fill {
    font-family: var(--font);
    font-size: inherit;
    font-weight: 500;
    color: var(--fg);
    background: transparent;
    border: 0;
    border-bottom: 1px solid var(--border);
    padding: 0.1rem 0.35rem;
    outline: none;
    transition: border-color 240ms ease;
}

.fill::placeholder {
    color: var(--fg-faint);
}

.fill:focus {
    border-bottom-color: var(--accent);
}

.select-wrap {
    position: relative;
    display: inline-block;
}

.select-wrap::after {
    content: "\f078";
    font-family: "Font Awesome 6 Free";
    font-weight: 900;
    position: absolute;
    right: 0.5rem;
    top: 50%;
    transform: translateY(-50%);
    font-size: 0.6rem;
    color: var(--accent);
    pointer-events: none;
}

select.fill {
    appearance: none;
    padding-right: 1.6rem;
    cursor: pointer;
}

.accent {
    color: var(--accent);
    font-weight: 600;
}

.details-label {
    display: block;
    margin: 1.75rem 0 0.6rem;
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--fg-faint);
}

textarea {
    width: 100%;
    font-family: var(--font);
    font-size: 0.92rem;
    line-height: 1.7;
    color: var(--fg);
    background: var(--bg-alt);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 1rem;
    resize: vertical;
    outline: none;
    transition: border-color 240ms ease;
}

textarea:focus {
    border-color: var(--accent);
}

.ct-foot {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 1.25rem;
}

.status {
    font-size: 0.82rem;
}

.status.ok {
    color: #059669;
}

.status.err {
    color: var(--accent);
}

.send {
    display: inline-flex;
    align-items: center;
    gap: 0.55rem;
    padding: 0.8rem 1.6rem;
    border: 0;
    border-radius: 10px;
    background: var(--fg);
    color: var(--bg);
    font-family: var(--font);
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    transition: transform 240ms var(--ease), opacity 240ms ease;
}

.send:hover:not(:disabled) {
    transform: translateY(-2px);
}

.send:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

@media (max-width: 860px) {
    .ct-grid {
        grid-template-columns: 1fr;
    }
}
</style>
