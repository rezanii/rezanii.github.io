<template>
    <div class="work view-page">
        <div class="text">
            <h1 class="title">
                <div class="outline-text">Projects</div>
                <span class="hov">M</span>
                <span class="hov">y</span>
                <span class="space"></span>
                <span class="hov">p</span>
                <span class="hov">r</span>
                <span class="hov">o</span>
                <span class="hov">j</span>
                <span class="hov">e</span>
                <span class="hov">c</span>
                <span class="hov">t</span>
                <span class="hov">s</span>
            </h1>
        </div>

        <div class="work-list">
            <div class="work" v-for="(work, index) in myProjects" :key="index">
                <div class="information">
                    <h2 class="work-number">0{{ index + 1 }}.</h2>
                    <h1 class="work-title">
                        {{ work.title }}
                    </h1>
                    <img
                        :src="require(`@/assets/${work.img}`)"
                        alt=""
                        class="mobile-img"
                    />
                    <p class="description">
                        {{ work.description }}
                    </p>
                    <div class="tools">
                        <p>
                            Code Tools:
                            <span>{{ work.codeTools.join(", ") }}</span>
                        </p>
                        <p class="design">
                            Design: <span>{{ work.design }}</span>
                        </p>
                    </div>
                    <div class="links">
                        <a
                            target="_blank"
                            class="btn"
                            :href="work.link"
                            :class="work.link === '' ? 'disabled' : ''"
                            >Visit</a
                        >
                        <a
                            target="_blank"
                            class="btn"
                            :href="work.source"
                            :class="work.source === '' ? 'disabled' : ''"
                            >Source Code</a
                        >
                    </div>
                </div>
                <div class="img">
                    <img :src="require(`@/assets/${work.img}`)" alt="" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isExpand: false,
            icon: "fas fa-expand",
            isDetail: false,
            myProjects: [
                {
                    title: "Document Replenishment Online",
                    description:
                        "Sorting visualizer is visualization tool for famous sorting algorithm such as Insertion and Selection. The user can random the array and it's also included the pseudo code visualization and a bit of information of the algorithm.",
                    source:
                        "https://github.com/arrezani/",
                    link: "https://rezanii.github.io/arrezani/",
                    img: "sortin.png",
                    codeTools: ["Vue JS"],
                    design: "Design by Me with Figma",
                },
                {
                    title: "FPIS.io (Landing Page)",
                    description:
                        "Collaboration tool website for collection projects.",
                    source: "https://github.com/arrezani/",
                    link: "https://fpis.vercel.app/",
                    img: "idea.png",
                    codeTools: ["HTML", "Tailwind CSS", "Javascript"],
                    design: "Design by Me with Figma",
                },
                {
                    title: "Reconcilliation Payment Gateway (Landing Page)",
                    description:
                        "Online shop for statue customization with 3d look.",
                    source: "https://github.com/arrezani/",
                    link: "https://recon.vercel.app/",
                    img: "statue.png",
                    codeTools: [
                        "HTML",
                        "Tailwind CSS",
                        "Javascript",
                        "Three Js",
                    ],
                    design: "Design by Me with Figma",
                },
            ],
        };
    },
    mounted() {},
    methods: {},
};
</script>

<style scoped src="../styles/work.css"></style>
