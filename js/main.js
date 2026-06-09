/* ============================================================
   THE HOLE · main.js
   Vanilla, sem dependências. Compositor-friendly + reduced-motion.
   ============================================================ */
(function () {
  "use strict";

  // ⚠️ TROCAR antes de publicar: WhatsApp oficial da casa (formato 55 + DDD + número)
  const WHATSAPP = "5511978590128";

  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* ---------- Footer year ---------- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ---------- Header scroll state ---------- */
  const header = document.querySelector(".site-header");
  if (header) {
    const onScroll = function () {
      header.classList.toggle("scrolled", window.scrollY > 24);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Active nav link ---------- */
  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("[data-nav]").forEach(function (a) {
    if (a.getAttribute("href") === path) {
      a.setAttribute("aria-current", "page");
    }
  });

  /* ---------- Mobile drawer ---------- */
  const toggle = document.querySelector(".nav-toggle");
  const drawer = document.querySelector(".drawer");
  if (toggle && drawer) {
    const setOpen = function (open) {
      drawer.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", String(open));
      document.body.classList.toggle("no-scroll", open);
    };
    toggle.addEventListener("click", function () {
      setOpen(!drawer.classList.contains("open"));
    });
    drawer.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        setOpen(false);
      });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setOpen(false);
    });
  }

  /* ---------- Hero load sequence ---------- */
  const hero = document.querySelector(".hero");
  if (hero) {
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        hero.classList.add("loaded");
      });
    });
  }

  /* ---------- Scroll reveals ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  if (prefersReduced || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) {
      el.classList.add("in");
    });
  } else {
    const io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    revealEls.forEach(function (el) {
      io.observe(el);
    });
  }

  /* ---------- Age gate (18+) ---------- */
  const gate = document.querySelector(".age-gate");
  if (gate) {
    const KEY = "thehole_age_ok";
    let approved = false;
    try {
      approved = sessionStorage.getItem(KEY) === "1";
    } catch (err) {
      approved = false;
    }

    if (approved) {
      gate.hidden = true;
    } else {
      gate.hidden = false;
      document.body.classList.add("no-scroll");

      const enterBtn = gate.querySelector("[data-age-enter]");
      const leaveBtn = gate.querySelector("[data-age-leave]");

      if (enterBtn) {
        enterBtn.addEventListener("click", function () {
          try {
            sessionStorage.setItem(KEY, "1");
          } catch (err) {
            /* segue sem persistir */
          }
          gate.classList.add("closing");
          document.body.classList.remove("no-scroll");
          window.setTimeout(function () {
            gate.hidden = true;
          }, 420);
        });
      }
      if (leaveBtn) {
        leaveBtn.addEventListener("click", function () {
          window.location.href = "https://www.google.com";
        });
      }
    }
  }

  /* ---------- Reservas → WhatsApp ---------- */
  const form = document.querySelector("[data-reserve-form]");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const data = new FormData(form);
      const get = function (k) {
        return (data.get(k) || "").toString().trim();
      };

      const tipo = get("tipo") || "Reserva";
      const nome = get("nome");
      const pessoas = get("pessoas");
      const dataReserva = get("data");
      const obs = get("mensagem");

      let msg = "Olá, The Hole! Quero fazer uma reserva.%0A%0A";
      msg += "*Tipo:* " + tipo + "%0A";
      if (nome) msg += "*Nome:* " + nome + "%0A";
      if (pessoas) msg += "*Pessoas:* " + pessoas + "%0A";
      if (dataReserva) msg += "*Data:* " + dataReserva + "%0A";
      if (obs) msg += "*Observações:* " + obs + "%0A";

      const url =
        "https://wa.me/" + WHATSAPP + "?text=" + encodeURI(msg).replace(/#/g, "%23");
      window.open(url, "_blank", "noopener");
    });
  }
})();
