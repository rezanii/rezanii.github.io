<template>
    <div class="contact view-page">
        <div class="main" ref="main">
            <div class="text">
                <div class="title">
                    <h1>
                        <div class="outline-text">Contact</div>
                        <span class="hov">C</span>
                        <span class="hov">o</span>
                        <span class="hov">n</span>
                        <span class="hov">t</span>
                        <span class="hov">a</span>
                        <span class="hov">c</span>
                        <span class="hov">t</span>
                        <span class="space"></span>
                        <span class="hov">M</span>
                        <span class="hov">e</span>
                    </h1>
                </div>
                <form @submit="send" class="form">
                    <input type="hidden" name="_captcha" value="false" />
                    <div class="input-wrapper">
                        <input
                            type="text"
                            placeholder="Name"
                            required
                            v-model="name"
                            name="name"
                            class="input"
                        />

                        <input
                            type="email"
                            placeholder="Email address"
                            name="email"
                            required
                            v-model="email"
                            class="input"
                        />
                    </div>
                    <input
                        type="text"
                        placeholder="Subject"
                        required
                        v-model="subject"
                        name="name"
                        class="input"
                    />
                    <textarea
                        id
                        cols="30"
                        rows="10"
                        placeholder="Your Message"
                        name="message"
                        required
                        v-model="message"
                        class="textarea"
                    ></textarea>
                    <div class="buttons">
                        <div class="social">
                            <a class="email media" href="mailto:ridwanrezani@gmail" target="_blank">
                                <i class="fas fa-envelope"></i>
                            </a>
                            <a class="twitter media" href="https://twitter.com/rezanii" target="_blank">
                                <i class="fab fa-twitter"></i>
                            </a>
                            <a class="github media" href="https://github.com/rezanii" target="_blank">
                                <i class="fab fa-github"></i>
                            </a>
                            <a
                                class="Linkedln media"
                                href="https://www.linkedin.com/in/rezanii/"
                                target="_blank"
                            >
                                <i class="fab fa-linkedin"></i>
                            </a>
                        </div>
                        <button type="submit" class="btn">
                            Send Message!
                        </button>
                    </div>
                </form>
            </div>
            
        </div>

        <div class="loader " v-if="isShowingStatus">
            <div class="lds-ring" v-if="isLoading"></div>
            <div v-else class="message-status">
                <b>{{ sendMessageStatus }}</b>
                <p>{{ statusMessage }}</p>
                <button @click="toggleStatusPage" class="btn">OK</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
    data() {
        return {
            name: "",
            email: "",
            subject: "",
            message: "",
            statusMessage:
                "Your Message has been sent successfully, I will contact you very soon !",
            sendMessageStatus: "Thank you !",
            isLoading: false,
            isShowingStatus: false,
        };
    },
    methods: {
        send(e) {
            e.preventDefault();
            this.isLoading = true;
            this.toggleStatusPage();
            axios.defaults.headers.post["Content-Type"] = "application/json";
            axios
                .post("https://formsubmit.co/ajax/ridwanrezani@gmail.com", {
                    name: this.name,
                    email: this.email,
                    message: this.message,
                })
                .then((res) => {
                    console.log(res);
                    this.email = "";
                    this.name = "";
                    this.message = "";
                    this.checkAnswer = "";
                    this.isLoading = false;
                    this.isShowingStatus = true;
                    this.statusMessage =
                        "Your Message has been sent successfully, I will contact you very soon !";
                    this.sendMessageStatus = "Thank you !";
                })
                .catch((err) => {
                    console.log(err);
                    this.isShowingStatus = true;
                    this.isLoading = false;
                    this.statusMessage =
                        "Some error has occured, Please try again next time !";
                    this.sendMessageStatus = "Sorry !";
                });
        },
        toggleStatusPage() {
            this.isShowingStatus = !this.isShowingStatus;
        },
    },
};
</script>

<style scoped src="../styles/contact.css"></style>
