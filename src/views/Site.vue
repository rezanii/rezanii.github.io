<template>
    <div class="site">
        <TopNav :is-dark="isDark" @toggle-theme="toggleTheme" />

        <main>
            <HeroSection />
            <TechMarquee />
            <AboutSection />
            <StatsSection />
            <ResumeSection />
            <ServicesSection />
            <ArchitectureSection />
            <ProjectsSection />
            <TestimonialsSection />
            <ContactSection />
        </main>

        <SiteFooter />
    </div>
</template>

<script>
import TopNav from "../components/site/TopNav.vue";
import HeroSection from "../components/site/HeroSection.vue";
import TechMarquee from "../components/site/TechMarquee.vue";
import AboutSection from "../components/site/AboutSection.vue";
import StatsSection from "../components/site/StatsSection.vue";
import ResumeSection from "../components/site/ResumeSection.vue";
import ServicesSection from "../components/site/ServicesSection.vue";
import ArchitectureSection from "../components/site/ArchitectureSection.vue";
import ProjectsSection from "../components/site/ProjectsSection.vue";
import TestimonialsSection from "../components/site/TestimonialsSection.vue";
import ContactSection from "../components/site/ContactSection.vue";
import SiteFooter from "../components/site/SiteFooter.vue";

export default {
    name: "SitePage",
    components: {
        TopNav,
        HeroSection,
        TechMarquee,
        AboutSection,
        StatsSection,
        ResumeSection,
        ServicesSection,
        ArchitectureSection,
        ProjectsSection,
        TestimonialsSection,
        ContactSection,
        SiteFooter,
    },
    data() {
        return { isDark: false };
    },
    mounted() {
        let saved = null;
        try {
            saved = localStorage.getItem("theme");
        } catch (e) {
            saved = null;
        }
        if (!saved) {
            saved = window.matchMedia("(prefers-color-scheme: dark)").matches
                ? "dark"
                : "light";
        }
        this.applyTheme(saved);

        this.$nextTick(() => {
            const hash = this.$route.hash;
            if (!hash) return;
            const el = document.querySelector(hash);
            if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        });
    },
    methods: {
        applyTheme(theme) {
            this.isDark = theme === "dark";
            document.documentElement.setAttribute("data-theme", theme);
            try {
                localStorage.setItem("theme", theme);
            } catch (e) {
                // storage diblokir — abaikan
            }
        },
        toggleTheme() {
            this.applyTheme(this.isDark ? "light" : "dark");
        },
    },
};
</script>
