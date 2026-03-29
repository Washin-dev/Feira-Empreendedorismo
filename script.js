const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 },
);

document
  .querySelectorAll(".reveal")
  .forEach((el) => revealObserver.observe(el));

/* ─────────────────────────────
       MODAL + VALIDAÇÃO + TOAST
    ───────────────────────────── */
const confirmModal = document.getElementById("confirmModal");
const bsModal = new bootstrap.Modal(confirmModal);
const btnEnviar = document.getElementById("btnEnviar");
const inputNome = document.getElementById("nomeCompleto");
const nomeError = document.getElementById("nomeError");
const successToast = document.getElementById("successToast");

// Limpa validação ao reabrir o modal
confirmModal.addEventListener("show.bs.modal", () => {
  inputNome.value = "";
  inputNome.style.borderColor = "";
  nomeError.style.display = "none";
});

// Foca no campo ao abrir
confirmModal.addEventListener("shown.bs.modal", () => inputNome.focus());

// Envio com validação
btnEnviar.addEventListener("click", () => {
  const nome = inputNome.value.trim();

  if (!nome) {
    inputNome.style.borderColor = "#ef4444";
    nomeError.style.display = "block";
    inputNome.focus();
    return;
  }

  // Fecha o modal
  bsModal.hide();

  // Exibe o toast de sucesso
  const primeiroNome = nome.split(" ")[0];
  document.querySelector("#toastName strong").textContent = primeiroNome + "!";

  successToast.classList.add("show");
  setTimeout(() => successToast.classList.remove("show"), 5000);
});

// Permite envio com Enter
inputNome.addEventListener("keydown", (e) => {
  if (e.key === "Enter") btnEnviar.click();
});

// Remove erro ao digitar
inputNome.addEventListener("input", () => {
  if (inputNome.value.trim()) {
    inputNome.style.borderColor = "";
    nomeError.style.display = "none";
  }
});

/* ─────────────────────────────
       NAVBAR HIDE/SHOW ON SCROLL
    ───────────────────────────── */
let lastScroll = 0;
const navbar = document.querySelector(".site-navbar");

window.addEventListener("scroll", () => {
  const currentScroll = window.scrollY;
  if (currentScroll > lastScroll && currentScroll > 120) {
    navbar.style.transform = "translateY(-100%)";
    navbar.style.transition = "transform .3s ease";
  } else {
    navbar.style.transform = "translateY(0)";
  }
  lastScroll = currentScroll;
});
