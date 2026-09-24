export default {
  mounted() {
    this.$nextTick(() => {
      const nodes = this.$el.querySelectorAll(".reveal");
      if (!nodes.length) return;

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)")
        .matches;

      if (reduce || !("IntersectionObserver" in window)) {
        nodes.forEach((el) => el.classList.add("is-visible"));
        return;
      }

      this._revealObs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (!e.isIntersecting) return;
            e.target.classList.add("is-visible");
            this._revealObs.unobserve(e.target);
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
      );

      nodes.forEach((el) => this._revealObs.observe(el));
    });
  },
  beforeDestroy() {
    if (this._revealObs) this._revealObs.disconnect();
  },
};
