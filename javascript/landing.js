/* ==========================================================================
   KALIMANIEZ PHOTO STUDIO — landing.js
   Versi statis (tanpa backend PHP) — untuk hosting di GitHub Pages.
   ========================================================================== */
(function(){
  "use strict";

  const $  = (s, ctx) => (ctx || document).querySelector(s);
  const $$ = (s, ctx) => Array.from((ctx || document).querySelectorAll(s));

  document.addEventListener("DOMContentLoaded", init);

  function init(){
    initMobileMenu();
    initSmoothAnchors();
    initScrollspy();
    initModals();
    initPasswordToggles();
    initStaticForms();
    initFooterYear();
  }

  /* ------------------------------------------------------------------ */
  /* MOBILE MENU                                                         */
  /* ------------------------------------------------------------------ */
  function initMobileMenu(){
    const toggle = $("#navToggle");
    const menu = $("#mobileMenu");
    if(!toggle || !menu) return;

    const close = () => { menu.classList.remove("is-open"); toggle.classList.remove("is-open"); };
    toggle.addEventListener("click", () => {
      const open = !menu.classList.contains("is-open");
      menu.classList.toggle("is-open", open);
      toggle.classList.toggle("is-open", open);
    });
    $$("a[data-nav]", menu).forEach(a => a.addEventListener("click", close));

    $("#openLoginMobile")?.addEventListener("click", (e) => { e.preventDefault(); close(); openModal("loginModal"); });
    $("#openRegisterMobile")?.addEventListener("click", (e) => { e.preventDefault(); close(); openModal("registerModal"); });
  }

  /* ------------------------------------------------------------------ */
  /* SMOOTH SCROLL ANCHOR                                                */
  /* ------------------------------------------------------------------ */
  function initSmoothAnchors(){
    $$('a[data-nav]').forEach(a => {
      a.addEventListener("click", (e) => {
        const id = a.getAttribute("href");
        if(!id || id.charAt(0) !== "#") return;
        const target = $(id);
        if(!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior:"smooth", block:"start" });
      });
    });
  }

  /* ------------------------------------------------------------------ */
  /* SCROLLSPY — tandai menu aktif sesuai section yang terlihat          */
  /* ------------------------------------------------------------------ */
  function initScrollspy(){
    const links = $$('.nav-links a[data-nav]');
    const sections = links.map(a => $(a.getAttribute("href"))).filter(Boolean);
    if(!sections.length) return;
    const spy = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(!entry.isIntersecting) return;
        links.forEach(a => a.classList.toggle("is-active", a.getAttribute("href") === "#" + entry.target.id));
      });
    }, { rootMargin:"-45% 0px -50% 0px", threshold:0 });
    sections.forEach(s => spy.observe(s));
  }

  /* ------------------------------------------------------------------ */
  /* LOGIN / REGISTER MODAL                                              */
  /* ------------------------------------------------------------------ */
  function openModal(id){
    $("#" + id)?.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }
  function closeModal(id){
    $("#" + id)?.classList.remove("is-open");
    document.body.style.overflow = "";
  }
  function initModals(){
    $("#openLogin")?.addEventListener("click", (e) => { e.preventDefault(); openModal("loginModal"); });
    $("#openLoginHero")?.addEventListener("click", (e) => { e.preventDefault(); openModal("loginModal"); });
    $("#openLoginAbout")?.addEventListener("click", (e) => { e.preventDefault(); openModal("loginModal"); });
    $("#openRegister")?.addEventListener("click", (e) => { e.preventDefault(); openModal("registerModal"); });
    $("#closeLogin")?.addEventListener("click", () => closeModal("loginModal"));
    $("#closeRegister")?.addEventListener("click", () => closeModal("registerModal"));

    $("#toRegister")?.addEventListener("click", (e) => { e.preventDefault(); closeModal("loginModal"); openModal("registerModal"); });
    $("#backLogin")?.addEventListener("click", (e) => { e.preventDefault(); closeModal("registerModal"); openModal("loginModal"); });

    $$(".login-modal").forEach(modal => {
      modal.addEventListener("click", (e) => { if(e.target === modal) closeModal(modal.id); });
    });
    document.addEventListener("keydown", (e) => {
      if(e.key === "Escape") $$(".login-modal.is-open").forEach(m => closeModal(m.id));
    });
  }

  /* ------------------------------------------------------------------ */
  /* SHOW / HIDE PASSWORD                                                */
  /* ------------------------------------------------------------------ */
  function initPasswordToggles(){
    const pairs = [
      ["#togglePassword", "#password"],
      ["#toggleRegisterPassword", "#registerPassword"],
      ["#toggleConfirmPassword", "#confirmPassword"],
    ];
    pairs.forEach(([btnSel, inputSel]) => {
      const btn = $(btnSel), input = $(inputSel);
      if(!btn || !input) return;
      btn.addEventListener("click", () => {
        const show = input.type === "password";
        input.type = show ? "text" : "password";
        btn.innerHTML = show
          ? '<i class="fa-solid fa-eye"></i>'
          : '<i class="fa-solid fa-eye-slash"></i>';
      });
    });
  }

  /* ------------------------------------------------------------------ */
  /* FORM LOGIN / DAFTAR — versi statis, belum tersambung ke backend     */
  /* ------------------------------------------------------------------ */
  function initStaticForms(){
    const loginForm = $("#loginForm");
    const registerForm = $("#registerForm");
    const note = "Halaman ini masih versi statis (tanpa server) — hubungkan formulir " +
                 "ini ke backend/API kamu sendiri agar login &amp; pendaftaran benar-benar berfungsi.";

    loginForm?.addEventListener("submit", (e) => {
      e.preventDefault();
      const el = $("#loginNote");
      if(el) el.innerHTML = note;
    });

    registerForm?.addEventListener("submit", (e) => {
      e.preventDefault();
      const pass = $("#registerPassword")?.value;
      const confirm = $("#confirmPassword")?.value;
      const el = $("#registerNote");
      if(pass !== confirm){
        if(el) el.textContent = "Password dan konfirmasi password tidak sama.";
        return;
      }
      if(el) el.innerHTML = note;
    });
  }

  /* ------------------------------------------------------------------ */
  /* FOOTER YEAR                                                         */
  /* ------------------------------------------------------------------ */
  function initFooterYear(){
    const el = $("#footerYear");
    if(el) el.textContent = String(new Date().getFullYear());
  }

})();
