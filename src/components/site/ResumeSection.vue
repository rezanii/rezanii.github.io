<template>
    <section id="resume" class="section">
        <div class="shell">
            <!-- 01 Experience -->
            <div class="num-head reveal">
                <span class="num">01</span>
                <h2>Experience</h2>
            </div>

            <div class="xp">
                <article
                    v-for="(job, i) in jobs"
                    :key="job.company + job.role"
                    class="xp-row reveal"
                    :style="{ '--i': i }"
                >
                    <div class="xp-left">
                        <span
                            class="xp-brand"
                            :style="{ background: brand(job.company).color }"
                            :title="job.company"
                        >
                            <img
                                v-if="brand(job.company).logo"
                                :src="brand(job.company).logo"
                                :alt="job.company"
                                decoding="async"
                            />
                            <template v-else>{{
                                brand(job.company).short
                            }}</template>
                        </span>
                        <span class="xp-date">{{ job.period }}</span>
                        <strong class="xp-company">{{ job.company }}</strong>
                        <span class="xp-loc">{{ job.location }}</span>
                        <span v-if="job.current" class="xp-now">PRESENT</span>
                    </div>

                    <div class="xp-right">
                        <h3 class="xp-role">{{ job.role }}</h3>
                        <ul class="xp-points">
                            <li v-for="p in job.points" :key="p">{{ p }}</li>
                        </ul>
                        <div class="xp-tags">
                            <span v-for="t in job.stack" :key="t">{{ t }}</span>
                        </div>
                    </div>
                </article>
            </div>

            <!-- 02 Expertise -->
            <div class="num-head reveal spaced">
                <span class="num">02</span>
                <h2>Expertise</h2>
            </div>

            <div class="exp-space">
                <StarField :radius="170" />
                <div class="exp">
                    <div
                        v-for="(g, i) in expertise"
                        :key="g.group"
                        class="exp-row reveal"
                        :style="{ '--i': i }"
                    >
                        <span class="exp-label">{{ g.group }}</span>
                        <div class="exp-items">
                            <span
                                v-for="item in g.items"
                                :key="item"
                                class="exp-item"
                                >{{ item }}</span
                            >
                        </div>
                    </div>
                </div>
            </div>

            <!-- 03 Academic -->
            <div class="num-head reveal spaced">
                <span class="num">03</span>
                <h2>Academic</h2>
            </div>

            <div class="edu">
                <div
                    v-for="(e, i) in education"
                    :key="e.title"
                    class="edu-row reveal"
                    :style="{ '--i': i }"
                >
                    <span class="edu-date">{{ e.period }}</span>
                    <h3 class="edu-title">{{ e.title }}</h3>
                    <span class="edu-major">{{ e.major }}</span>
                    <span class="edu-school">{{ e.school }}</span>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import reveal from "../../mixins/reveal";
import StarField from "./StarField.vue";

const COMPANIES = {
    "PT. Indomobil Sukses Internasional Tbk": {
        short: "IMS",
        color: "#0d4c92",
    },
    "PT. Smartfren Telecom Tbk": { short: "SF", color: "#e11d48" },
    "Professional Human Resource": { short: "PHR", color: "#64748b" },
    "PT. Telekomunikasi Indonesia": { short: "TLK", color: "#c8102e" },
};

export default {
    name: "ResumeSection",
    components: { StarField },
    mixins: [reveal],
    data() {
        return {
            jobs: [
                {
                    role: "Senior Software Developer Specialist",
                    company: "PT. Indomobil Sukses Internasional Tbk",
                    location: "Jakarta, Indonesia",
                    period: "Mar 2024 - Present",
                    current: true,
                    points: [
                        "Oversee implementation, enhancement, maintenance, and technical support of enterprise IT systems - particularly Dealer Management System (DMS) and CRM applications supporting automotive business operations",
                        "Design and develop microservice-based application architecture for DMS initiatives: service communication, REST APIs, database interaction, and system integration",
                        "Analyze business requirements and translate operational processes into technical requirements, solution designs, and implementation approaches",
                        "Collaborate with business users, automotive management, central IT, and development teams to keep solutions aligned with operational objectives",
                        "Participate in technical decision-making on application architecture, database design, system integration, development standards, and application modernization",
                        "Troubleshoot complex application, database, API, infrastructure, network, and integration issues across operational environments",
                        "Conduct application and IT reviews to ensure alignment with company standards and operational procedures",
                        "Promote software engineering best practices, maintainability, automation, and standardized development approaches across the team",
                        "Contributed to modernization of automotive enterprise applications through microservice-based architecture and API-driven integration",
                    ],
                    stack: [
                        "Go",
                        "Microservices",
                        "REST API",
                        "SQL Server",
                        "System Integration",
                        "Solution Design",
                        "Application Architecture",
                    ],
                },
                {
                    role: "IT Developer, Business & Automation / IT DevOps Specialist",
                    company: "PT. Smartfren Telecom Tbk",
                    location: "Jakarta, Indonesia",
                    period: "Jul 2020 - Feb 2024",
                    current: false,
                    points: [
                        "Managed source code, change control, configuration management, issue tracking, build, release, deployment, and environment management within the IT Finance Division",
                        "Developed and maintained enterprise applications and internal systems using PHP, JavaScript, React.js, Next.js, Express.js, and Node.js",
                        "Designed and implemented CI/CD processes supporting application build, testing, release, deployment, and configuration",
                        "Supported development teams in establishing effective branching, merging, release management, and common-library practices",
                        "Automated repetitive development, deployment, and environment-management activities to improve delivery efficiency and consistency",
                        "Managed application performance and data migration between development, testing, and production environments",
                        "Investigated application and deployment issues, performed root-cause analysis, and coordinated corrective actions",
                        "Evaluated and implemented new technologies and tools to improve development efficiency, reliability, and maintainability",
                        "Improved source-code governance and release consistency through structured branching, configuration, and change-management practices",
                    ],
                    stack: [
                        "React.js",
                        "Next.js",
                        "Node.js",
                        "Express.js",
                        "PHP",
                        "CI/CD",
                        "DevOps",
                        "Automation",
                    ],
                },
                {
                    role: "IT Business Analyst",
                    company: "PT. Smartfren Telecom Tbk",
                    location: "Jakarta, Indonesia",
                    period: "Jul 2018 - Jul 2020",
                    current: false,
                    points: [
                        "Managed IT projects from initiation through closure: planning, team coordination, stakeholder identification, requirements, execution, and monitoring",
                        "Gathered, analyzed, and documented business and system requirements from internal and external stakeholders",
                        "Coordinated cross-functional teams to keep project activities aligned with business objectives and delivery timelines",
                        "Managed approval processes and stakeholder communication throughout implementation",
                        "Monitored project progress, milestones, and deliverables, improving visibility through structured tracking",
                        "Identified operational and system issues, then coordinated recommendations and corrective actions with technical teams",
                        "Supported business process analysis and continuous improvement by spotting opportunities for system and operational optimization",
                        "Strengthened communication between business users and technical teams by turning business needs into actionable IT requirements",
                        "Built the business process analysis foundation that underpins my later work in engineering, architecture, and DevOps",
                    ],
                    stack: [
                        "Business Analysis",
                        "Requirements Engineering",
                        "Project Coordination",
                        "Stakeholder Management",
                        "Process Improvement",
                    ],
                },
                {
                    role: "IT Data Center Development & Data Engineer",
                    company: "Professional Human Resource",
                    location: "Jakarta, Indonesia",
                    period: "Jan 2016 - Jul 2018",
                    current: false,
                    points: [
                        "Supervised data center maintenance and operations covering power, cooling, environmental conditions, physical security, and infrastructure availability",
                        "Led and coordinated data center technicians, engineers, and support personnel - providing technical guidance, training, and performance feedback",
                        "Supported 24/7 availability through structured monitoring, incident response, preventive maintenance, and operational readiness",
                        "Investigated infrastructure incidents and coordinated corrective actions to minimize service disruption",
                        "Participated in disaster recovery planning, procedures, and recovery exercises, improving incident preparedness",
                        "Managed operational expenses and supported cost-optimization initiatives",
                        "Built the combined infrastructure, data, and engineering grounding that later fed directly into my application development and DevOps work",
                    ],
                    stack: [
                        "Data Center Operations",
                        "Infrastructure",
                        "Disaster Recovery",
                        "Incident Management",
                        "Team Leadership",
                        "Cost Optimization",
                    ],
                },
                {
                    role: "Assistant Research - Core IT System",
                    company: "PT. Telekomunikasi Indonesia",
                    location: "Bandung, Indonesia",
                    period: "Jul 2014 - Oct 2014",
                    current: false,
                    points: [
                        "Supported research on Software Defined Networking (SDN) and its potential application within telecommunications products",
                        "Developed a PHP-based application supporting SDN best-practice research",
                        "Assisted project management activities across the SDN research initiative",
                        "Analyzed technology and product development approaches, and provided recommendations to the team",
                        "Conducted technology and vendor comparisons to support analysis and decision-making",
                        "Prepared technical findings and reports for stakeholders",
                    ],
                    stack: [
                        "SDN",
                        "PHP",
                        "Technical Research",
                        "Technology Evaluation",
                        "Technical Reporting",
                    ],
                },
                {
                    role: "Software Engineer - R&D",
                    company: "PT. Telekomunikasi Indonesia",
                    location: "Bandung, Indonesia",
                    period: "Jun 2013 - Aug 2013",
                    current: false,
                    points: [
                        "Conducted broadband penetration analysis and telecommunications business development research",
                        "Supported quality-control activities before and after implementation of Business Support System (BSS) services and products",
                        "Researched video-conferencing technology trends and their potential business applications",
                        "Conducted business model and technology comparisons to support product direction",
                        "Prepared analysis and reports for project stakeholders",
                    ],
                    stack: [
                        "R&D",
                        "Business Analysis",
                        "BSS",
                        "Quality Control",
                        "Market Research",
                    ],
                },
            ],
            expertise: [
                {
                    group: "AI & Automation",
                    items: ["LLM Integration", "Claude API", "OpenAI API", "Prompt Engineering", "RAG", "Embeddings", "Vector Search", "Tool Calling", "MCP (Model Context Protocol)", "AI Agents", "Workflow Automation", "Document Extraction", "Anomaly Detection", "Predictive Modelling", "AI-Assisted Development", "Claude Code", "GitHub Copilot"],
                },
                {
                    group: "Languages",
                    items: ["Go", "Java", "Kotlin", "JavaScript", "TypeScript", "Python", "PHP", "Dart", "C / C++", "C#", "SQL"],
                },
                {
                    group: "Frontend",
                    items: ["React.js", "Next.js", "HTML", "CSS", "Chakra UI"],
                },
                {
                    group: "Backend & Architecture",
                    items: ["Node.js", "Express.js", "REST API", "Microservices", "System Integration", "Enterprise Applications"],
                },
                {
                    group: "Mobile",
                    items: ["Flutter", "Android", "Jetpack Compose"],
                },
                {
                    group: "Cloud & DevOps",
                    items: ["Docker", "Kubernetes", "AWS", "Google Cloud", "Microsoft Azure", "Git & GitHub", "GitHub Actions", "Travis CI", "CI/CD", "Deployment Automation"],
                },
                {
                    group: "Databases",
                    items: ["Microsoft SQL Server", "MySQL", "PostgreSQL", "MongoDB", "Firebase", "Data Migration", "Data Integration"],
                },
                {
                    group: "Microsoft & Data",
                    items: ["SharePoint", "Power Platform", "Power Automate", "Dataverse", "Power BI", "ServiceNow", "Grafana", "Tableau", "Qlik Sense"],
                },
            ],
            education: [
                {
                    period: "Apr 2017 - Jan 2020",
                    title: "Master of Computer Science (M.T.I.)",
                    major: "Computer Science",
                    school: "BINUS University, Jakarta",
                },
                {
                    period: "Jul 2011 - Sep 2015",
                    title: "Bachelor of Computer Science (S.Kom.)",
                    major: "Computer Science",
                    school: "Telkom University, Bandung",
                },
            ],
        };
    },
    methods: {
        brand(company) {
            if (COMPANIES[company]) return COMPANIES[company];
            const short = company
                .replace(/^PT\.?\s*/i, "")
                .split(/\s+/)
                .slice(0, 3)
                .map((w) => w[0])
                .join("")
                .toUpperCase();
            return { short, color: "#64748b" };
        },
    },
};
</script>

<style scoped>
.num-head.spaced {
    margin-top: clamp(3.5rem, 7vw, 5.5rem);
}

/* ============================================================
   Animasi kepala section bernomor (01 / 02 / 03)

   Polanya sengaja "additive": tanpa JS, elemen tetap terlihat
   penuh. Animasi hanya jalan saat class .is-visible datang,
   jadi tidak ada kondisi di mana judulnya hilang.
   ============================================================ */

.num-head.reveal {
    opacity: 1;
    transform: none;
    transition: none;
    position: relative;
}

/* garis aksen yang menyapu di atas border bawaan */
.num-head.reveal::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -1px;
    width: 100%;
    height: 2px;
    background: var(--accent);
    transform: scaleX(0);
    transform-origin: left center;
}

.num-head.reveal.is-visible::after {
    animation: lineSweep 820ms var(--ease) 180ms forwards;
}

@keyframes lineSweep {
    to {
        transform: scaleX(1);
    }
}

/* angka memantul masuk */
.num-head.reveal.is-visible .num {
    animation: numPop 680ms var(--ease) both;
}

@keyframes numPop {
    0% {
        opacity: 0;
        transform: translateY(16px) scale(0.6);
    }
    60% {
        opacity: 1;
        transform: translateY(0) scale(1.18);
    }
    100% {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}

/* judul menyusul dari kiri, huruf merapat */
.num-head.reveal.is-visible h2 {
    animation: titleIn 720ms var(--ease) 150ms both;
}

@keyframes titleIn {
    from {
        opacity: 0;
        transform: translateX(-20px);
        letter-spacing: 0.1em;
    }
    to {
        opacity: 1;
        transform: translateX(0);
        letter-spacing: -0.02em;
    }
}

/* hover: angkanya berdenyut halus */
.num-head .num {
    display: inline-block;
    transition: transform 300ms var(--ease);
}

.num-head:hover .num {
    transform: scale(1.12) rotate(-4deg);
}

@media (prefers-reduced-motion: reduce) {
    .num-head.reveal.is-visible::after {
        animation: none;
        transform: scaleX(1);
    }
    .num-head.reveal.is-visible .num,
    .num-head.reveal.is-visible h2 {
        animation: none;
    }
    .num-head:hover .num {
        transform: none;
    }
}

/* ---------- experience ---------- */

.xp-row {
    display: grid;
    grid-template-columns: minmax(0, 0.42fr) minmax(0, 1fr);
    gap: clamp(1rem, 3vw, 2.5rem);
    padding-block: 2rem;
    border-bottom: 1px solid var(--border);
}

.xp-row:last-child {
    border-bottom: 0;
}

.xp-left {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
}

.xp-date {
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--fg-faint);
}

.xp-brand {
    display: inline-grid;
    place-items: center;
    width: 40px;
    height: 40px;
    border-radius: 11px;
    margin-bottom: 0.6rem;
    font-size: 0.72rem;
    font-weight: 800;
    color: #fff;
    overflow: hidden;
    box-shadow: 0 6px 16px -8px rgba(0, 0, 0, 0.5);
    transition: transform 320ms var(--ease);
}

.xp-row:hover .xp-brand {
    transform: translateY(-3px) scale(1.06);
}

.xp-brand img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    background: #fff;
}

.xp-company {
    font-size: 1rem;
    font-weight: 700;
}

.xp-loc {
    font-size: 0.82rem;
    color: var(--fg-muted);
}

.xp-now {
    margin-top: 0.35rem;
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    color: var(--accent);
}

.xp-role {
    font-size: clamp(1.15rem, 2.6vw, 1.55rem);
    font-weight: 700;
    letter-spacing: -0.02em;
    margin-bottom: 0.9rem;
}

.xp-points {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
}

.xp-points li {
    position: relative;
    padding-left: 1rem;
    font-size: 0.92rem;
    line-height: 1.7;
    color: var(--fg-muted);
}

.xp-points li::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0.72em;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: var(--accent);
    opacity: 0.5;
}

.xp-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem 0.9rem;
    margin-top: 1.1rem;
}

.xp-tags span {
    font-size: 0.76rem;
    color: var(--accent);
}

/* ---------- expertise ---------- */

.exp-row {
    display: grid;
    grid-template-columns: minmax(0, 0.28fr) minmax(0, 1fr);
    gap: 1rem clamp(1rem, 3vw, 2rem);
    padding-block: 1.1rem;
}

.exp-label {
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--accent);
    padding-top: 0.15rem;
}

.exp-items {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem 0;
    align-items: baseline;
}

.exp-space {
    position: relative;
}

.exp-space .exp {
    position: relative;
    z-index: 1;
}

.exp-item {
    font-size: 0.92rem;
    color: var(--fg-muted);
    cursor: default;
    transition: color 200ms ease, transform 420ms var(--ease),
        text-shadow 420ms ease;
}

.exp-item:not(:last-child)::after {
    content: "/";
    color: var(--fg-faint);
    font-size: 0.8rem;
    margin-inline: 0.65rem;
    display: inline-block;
    transition: transform 420ms var(--ease);
}

.exp-item:hover {
    color: var(--accent);
    transform: translateY(-4px);
    text-shadow: 0 0 14px var(--accent-soft), 0 0 26px var(--accent-soft);
}

.exp-item:hover::after {
    transform: translateY(4px);
}

@media (prefers-reduced-motion: reduce) {
    .exp-item,
    .exp-item::after {
        transition: color 200ms ease;
    }

    .exp-item:hover,
    .exp-item:hover::after {
        transform: none;
        text-shadow: none;
    }
}

/* ---------- academic ---------- */

.edu-row {
    display: flex;
    flex-direction: column;
    gap: 0.28rem;
    padding: 0 0 1.5rem 1.5rem;
    border-left: 1px solid var(--border);
    position: relative;
}

.edu-row::before {
    content: "";
    position: absolute;
    left: -4px;
    top: 6px;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--accent);
}

.edu-date {
    font-size: 0.72rem;
    letter-spacing: 0.1em;
    color: var(--fg-faint);
}

.edu-title {
    font-size: 1.05rem;
    font-weight: 700;
}

.edu-major {
    font-size: 0.88rem;
    color: var(--accent);
}

.edu-school {
    font-size: 0.82rem;
    color: var(--fg-muted);
}

@media (max-width: 800px) {
    .xp-row,
    .exp-row {
        grid-template-columns: 1fr;
    }
}
</style>
