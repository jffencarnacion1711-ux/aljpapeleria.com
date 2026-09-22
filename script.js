/* =========================================================
   ALJ PAPELERÍA Y MÁS — lógica de la tienda
   ========================================================= */

/* ---------- Número de WhatsApp de la tienda ---------- */
const WHATSAPP_NUMBER = "18295764196"; // 829-576-4196 (código de país 1 incluido)

/* ---------- Datos bancarios (EDITAR con los datos reales) ---------- */
const BANK_DETAILS = {
  BHD: {
    titular: "ALJ Papelería y Más",
    cuenta: "000-0000000-0 (agregar número real)",
    tipo: "Cuenta de ahorros"
  },
  Banreserva: {
    titular: "ALJ Papelería y Más",
    cuenta: "000-0000000-0 (agregar número real)",
    tipo: "Cuenta de ahorros"
  }
};

/* ---------- Catálogo (precios tomados de la lista de servicios) ---------- */
const CATALOG = [
  {
    id: "impresiones",
    icon: "🖨️",
    title: "Impresiones",
    desc: "Papel normal, blanco y negro o color.",
    items: [
      { name: "B/N — documento", price: 5 },
      { name: "B/N — imagen", price: 10 },
      { name: "Color — documento", price: 20 },
      { name: "Color — imagen", price: 25 },
      { name: "Color — página con mucho contenido/fondo", price: 30 },
    ],
    note: "Por volumen: 10–30 páginas desde RD$15 c/u · 31+ páginas desde RD$12 c/u."
  },
  {
    id: "fotocopias",
    icon: "📄",
    title: "Fotocopias",
    desc: "Copias sencillas o a doble cara.",
    items: [
      { name: "Fotocopia B/N", price: 5 },
      { name: "Fotocopia B/N doble cara", price: 8 },
      { name: "Fotocopia color", price: 20 },
      { name: "Fotocopia color doble cara", price: 35 },
    ]
  },
  {
    id: "fotografico",
    icon: "📷",
    title: "Papel fotográfico",
    desc: "Impresión de fotos en distintos tamaños.",
    items: [
      { name: "Foto 4x6", price: 50 },
      { name: "Foto 5x7", price: 70 },
      { name: "Foto 8x10", price: 100 },
      { name: "Papel fotográfico adhesivo A4", price: 100 },
    ],
    note: "Si traes tu propio papel fotográfico, la impresión tiene un costo de RD$40–60 según tamaño y tinta."
  },
  {
    id: "forrado",
    icon: "📓",
    title: "Forrado de cuadernos",
    desc: "Haz que cada cuaderno sea único.",
    items: [
      { name: "Forrado sencillo (incluye material + mano de obra)", price: 75 },
      { name: "Forrado personalizado (diseño, nombre, impresión a color, material y forrado)", price: 200, from: true },
      { name: "Forrado personalizado premium (diseños elaborados, personajes, varios elementos)", price: 275, from: true },
    ],
    note: "Por cantidad: 5–9 cuadernos desde RD$180 c/u · 10+ cuadernos desde RD$165 c/u (diseños similares, solo cambia nombre/material)."
  },
  {
    id: "acabados",
    icon: "🗂️",
    title: "Acabados",
    desc: "Dale un toque especial a tus trabajos.",
    items: [
      { name: "Laminado pequeño", price: 50 },
      { name: "Laminado A4", price: 100 },
      { name: "Laminado A3", price: 150 },
      { name: "Encuadernado con espiral", price: 100, from: true },
      { name: "Perforado", price: 20, from: true },
      { name: "Engrapado", price: 10 },
      { name: "Plastificado de documentos", price: 100, from: true },
    ]
  },
  {
    id: "servicios",
    icon: "🧾",
    title: "Servicios de papelería",
    desc: "Escaneo, diseño, digitación y más.",
    items: [
      { name: "Escaneo de documento", price: 25 },
      { name: "Escaneo + envío por WhatsApp/Email", price: 30 },
      { name: "Digitación sencilla (por página)", price: 50 },
      { name: "Transcripción de texto (por página)", price: 50, from: true },
      { name: "Diseño sencillo en Canva", price: 100, from: true },
      { name: "Diseño personalizado", price: 200, from: true },
      { name: "Etiquetas escolares personalizadas", price: 150, from: true },
      { name: "Stickers personalizados", price: 150, from: true },
      { name: "Invitación digital sencilla", price: 250 },
      { name: "Invitación personalizada", price: 350, from: true },
      { name: "Tarjetas de presentación (50 und.)", price: 500 },
      { name: "Certificados/diplomas personalizados (c/u)", price: 100, from: true },
      { name: "Carteles escolares", price: 150, from: true },
      { name: "Portadas de trabajos escolares", price: 50, from: true },
      { name: "Trabajos escolares impresos y organizados", price: 100, from: true },
    ],
    note: "¿Tienes una idea o quieres algo diferente? Escríbenos y lo cotizamos."
  },
  {
    id: "paquetes",
    icon: "🎒",
    title: "Paquetes escolares",
    desc: "Todo listo para el colegio.",
    items: [
      { name: "Paquete Básico — 5 impresiones a color, 5 portadas, 5 nombres personalizados", price: 500 },
      { name: "Paquete Cuadernos — 5 cuadernos personalizados, temática, nombre, impresión + forrado", price: 900 },
      { name: "Paquete Escolar — 10 cuadernos personalizados, nombre, temática, impresión + forrado", price: 1500 },
      { name: "Paquete Premium — personaliza prácticamente todo tu material escolar", price: 2000, from: true },
    ]
  },
];

/* ---------- Estado del carrito ---------- */
let cart = []; // { catTitle, name, price, from, qty }

/* ---------- Utilidades ---------- */
const fmt = (n) => "RD$" + n.toLocaleString("es-DO");

function findCartLine(catTitle, name){
  return cart.find(l => l.catTitle === catTitle && l.name === name);
}

function cartTotal(){
  return cart.reduce((sum, l) => sum + l.price * l.qty, 0);
}

function cartCount(){
  return cart.reduce((sum, l) => sum + l.qty, 0);
}

/* ---------- Construir el catálogo en el DOM ---------- */
function renderCatalog(){
  const main = document.getElementById("catalogo");
  main.innerHTML = "";

  CATALOG.forEach(cat => {
    const section = document.createElement("section");
    section.className = "category";
    section.id = cat.id;

    section.innerHTML = `
      <div class="category__head">
        <span class="category__icon">${cat.icon}</span>
        <h2 class="category__title">${cat.title}</h2>
      </div>
      <p class="category__desc">${cat.desc}</p>
      <div class="grid" data-grid="${cat.id}"></div>
      ${cat.note ? `<p class="category__note">${cat.note}</p>` : ""}
    `;

    const grid = section.querySelector(".grid");
    cat.items.forEach(item => {
      const card = document.createElement("article");
      card.className = "card";
      const priceLabel = (item.from ? "Desde " : "") + fmt(item.price);
      card.innerHTML = `
        <div class="card__name">${item.name}</div>
        <div class="card__price">${priceLabel}</div>
        <div class="card__row">
          <div class="qty" data-qty>
            <button type="button" data-step="-1">−</button>
            <span data-qty-value>1</span>
            <button type="button" data-step="1">+</button>
          </div>
        </div>
        <button type="button" class="btn btn--add" data-add>Agregar</button>
      `;

      const qtyValue = card.querySelector("[data-qty-value]");
      let qty = 1;
      card.querySelectorAll("[data-step]").forEach(btn => {
        btn.addEventListener("click", () => {
          const step = parseInt(btn.dataset.step, 10);
          qty = Math.max(1, qty + step);
          qtyValue.textContent = qty;
        });
      });

      card.querySelector("[data-add]").addEventListener("click", () => {
        addToCart(cat.title, item.name, item.price, !!item.from, qty);
        qty = 1;
        qtyValue.textContent = qty;
      });

      grid.appendChild(card);
    });

    main.appendChild(section);
  });
}

/* ---------- Acciones del carrito ---------- */
function addToCart(catTitle, name, price, from, qty){
  const existing = findCartLine(catTitle, name);
  if (existing){
    existing.qty += qty;
  } else {
    cart.push({ catTitle, name, price, from, qty });
  }
  renderCart();
  openCart();
}

function removeFromCart(catTitle, name){
  cart = cart.filter(l => !(l.catTitle === catTitle && l.name === name));
  renderCart();
}

function renderCart(){
  const container = document.getElementById("cartItems");
  const totalEl = document.getElementById("cartTotal");
  const countEl = document.getElementById("cartCount");
  const checkoutBtn = document.getElementById("checkoutBtn");

  countEl.textContent = cartCount();
  totalEl.textContent = fmt(cartTotal());
  checkoutBtn.disabled = cart.length === 0;

  if (cart.length === 0){
    container.innerHTML = `<p class="drawer__empty">Todavía no has agregado nada. Explora el catálogo y dale a "Agregar".</p>`;
    return;
  }

  container.innerHTML = "";
  cart.forEach(line => {
    const row = document.createElement("div");
    row.className = "line-item";
    const priceLabel = (line.from ? "Desde " : "") + fmt(line.price);
    row.innerHTML = `
      <div>
        <div class="line-item__name">${line.name}</div>
        <div class="line-item__cat">${line.catTitle} · x${line.qty}</div>
        <button type="button" class="line-item__remove">Quitar</button>
      </div>
      <div class="line-item__right">
        <div class="line-item__price">${priceLabel}</div>
      </div>
    `;
    row.querySelector(".line-item__remove").addEventListener("click", () => removeFromCart(line.catTitle, line.name));
    container.appendChild(row);
  });
}

/* ---------- Abrir / cerrar carrito ---------- */
const cartDrawer = document.getElementById("cartDrawer");
const cartOverlay = document.getElementById("cartOverlay");

function openCart(){
  cartDrawer.classList.add("open");
  cartOverlay.classList.add("show");
  cartDrawer.setAttribute("aria-hidden", "false");
}
function closeCart(){
  cartDrawer.classList.remove("open");
  cartOverlay.classList.remove("show");
  cartDrawer.setAttribute("aria-hidden", "true");
}

document.getElementById("cartFab").addEventListener("click", openCart);
document.getElementById("cartClose").addEventListener("click", closeCart);
cartOverlay.addEventListener("click", closeCart);

/* ---------- Modal de checkout ---------- */
const checkoutModal = document.getElementById("checkoutModal");
const checkoutOverlay = document.getElementById("checkoutOverlay");
const bankChoice = document.getElementById("bankChoice");
const bankDetails = document.getElementById("bankDetails");

function openCheckout(){
  document.getElementById("modalItemCount").textContent = cartCount();
  document.getElementById("modalTotal").textContent = fmt(cartTotal());
  updatePayMethodView();
  updateBankDetails();
  checkoutModal.classList.add("open");
  checkoutOverlay.classList.add("show");
  checkoutModal.setAttribute("aria-hidden", "false");
}
function closeCheckout(){
  checkoutModal.classList.remove("open");
  checkoutOverlay.classList.remove("show");
  checkoutModal.setAttribute("aria-hidden", "true");
}

document.getElementById("checkoutBtn").addEventListener("click", () => {
  closeCart();
  openCheckout();
});
document.getElementById("checkoutClose").addEventListener("click", closeCheckout);
checkoutOverlay.addEventListener("click", closeCheckout);

function getSelectedPayMethod(){
  return document.querySelector('input[name="payMethod"]:checked').value;
}
function getSelectedBank(){
  return document.querySelector('input[name="bank"]:checked').value;
}

function updatePayMethodView(){
  bankChoice.style.display = getSelectedPayMethod() === "transferencia" ? "block" : "none";
}
function updateBankDetails(){
  const bank = getSelectedBank();
  const info = BANK_DETAILS[bank];
  bankDetails.innerHTML = `
    <strong>${bank}</strong>
    Titular: ${info.titular}<br>
    Cuenta: ${info.cuenta}<br>
    Tipo: ${info.tipo}
  `;
}

document.querySelectorAll('input[name="payMethod"]').forEach(r => r.addEventListener("change", updatePayMethodView));
document.querySelectorAll('input[name="bank"]').forEach(r => r.addEventListener("change", updateBankDetails));

/* ---------- Enviar pedido por WhatsApp ---------- */
document.getElementById("sendWhatsapp").addEventListener("click", () => {
  if (cart.length === 0) return;

  const payMethod = getSelectedPayMethod();
  const lines = [];

  lines.push("Hola ALJ Papelería y Más, quiero hacer este pedido:");
  lines.push("");
  cart.forEach(l => {
    const priceLabel = (l.from ? "desde " : "") + fmt(l.price);
    lines.push(`• ${l.name} (${l.catTitle}) x${l.qty} — ${priceLabel} c/u`);
  });
  lines.push("");
  lines.push(`Total estimado: ${fmt(cartTotal())}`);
  lines.push("");

  if (payMethod === "transferencia"){
    const bank = getSelectedBank();
    lines.push(`Método de pago: Transferencia bancaria — ${bank}`);
  } else {
    lines.push("Método de pago: Efectivo");
  }

  lines.push("");
  lines.push("Quedo atento/a para confirmar detalles. ¡Gracias!");

  const message = encodeURIComponent(lines.join("\n"));
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
  window.open(url, "_blank", "noopener");
});

/* ---------- Tema claro / oscuro ---------- */
const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");

function applyTheme(theme){
  root.setAttribute("data-theme", theme);
  localStorage.setItem("alj-theme", theme);
}

function initTheme(){
  const saved = localStorage.getItem("alj-theme");
  if (saved){
    applyTheme(saved);
  } else {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    applyTheme(prefersDark ? "dark" : "light");
  }
}

themeToggle.addEventListener("click", () => {
  const current = root.getAttribute("data-theme");
  applyTheme(current === "dark" ? "light" : "dark");
});

/* ---------- Inicialización ---------- */
initTheme();
renderCatalog();
renderCart();