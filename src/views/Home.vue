<template>
    <div class="home view-page">
        <div class="home container">
            <img
                class="logo-outline"
                
                alt=""
            />
            <!-- src="../assets/logo-outline-white.svg" -->
            <div>
                <div class="text">
                    <div class="title">
                        <h1>
                            <span class="hov">H</span>
                            <span class="hov">i</span>
                            <span class="hov">,</span>
                        </h1>
                        <h1>
                            <span class="hov">I</span>
                            <span class="hov">'</span>
                            <span class="hov">m</span>
                            <span class="space"></span>
                            <span class="hov">R</span>
                            <span class="hov">i</span>
                            <span class="hov">d</span>
                            <span class="hov">w</span>
                            <span class="hov">a</span>
                            <span class="hov">n</span>
                            <span class="hov">,</span>
                        </h1>

                        <h1 class="bottom-text">
                            <span class="hov">I</span>
                            <span class="hov">T</span>
                            <span class="space"></span>
                            <span class="hov">D</span>
                            <span class="hov">e</span>
                            <span class="hov">v</span>
                            <!-- <span class="hov">o</span> -->

                            <div class="eye">
                                <div class="pupil">
                                    <div class="light"></div>
                                </div>
                            </div>
                            <span class="hov">p</span>
                            <span class="hov">s</span>
                            <span class="hov">.</span>
                        </h1>
                        <div class="desc">
                            <p>Backend and Front End Developer</p>
                        </div>
                    </div>

                    <!-- <div class="cursor"></div> -->
                </div>
                <div @click="menuBackgroundAnim(1)" ref="btn" class="btn">
                    <router-link to="/about">
                        about me
                    </router-link>
                </div>
            </div>
            <div class="logo-con">
               <!-- <img src="../assets/logo.svg" alt="" /> --> 
            </div>
        </div>
        <About class="about" />
        <Portfolio class="portfolio" />
        <Contact class="contact section" />
        <div style="height : 3rem"></div>
    </div>
</template>

<script>
// // @ is an alias to /src
// import anime from "animejs";
import TransitionMixin from "../mixins/transition";
import Portfolio from "../components/portfolio.vue";
import About from "./about.vue";
import Contact from "./contact.vue";

export default {
    name: "Home",
    mixins: [TransitionMixin],
    components: {
        Portfolio,
        About,
        Contact,
    },
    data() {
        return {
            toggle: false,
            counter: 1,
            isBoxSupport: true,
        };
    },

    mounted() {
        this.$store.state.hover.push(this.$refs.btn);

        if (window.getComputedStyle(document.body).transformBox !== undefined) {
            this.isBoxSupport = true;
        } else {
            this.isBoxSupport = false;
        }

        const eyes = document.querySelectorAll(".pupil");
        document.onmousemove = function(event) {
            var x = (event.clientX * 100) / window.innerWidth + "%";
            var y = (event.clientY * 100) / window.innerHeight + "%";
            eyes.forEach((eye) => {
                eye.style.left = x;
                eye.style.top = y;
                eye.style.transform = "translate(-" + x + ", -" + y + ")";
            });
        };
    },
};
</script>

<style scoped src="../styles/home.css"></style>
