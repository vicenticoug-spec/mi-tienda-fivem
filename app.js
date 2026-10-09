// CONFIGURA AQUÍ LOS ENLACES PÚBLICOS DE TU TIENDA.
const CONFIG = {
  brand: "NYX Development",
  discordUrl: "https://discord.gg/REEMPLAZAR",
  currency: "USD",
  locale: "es-CL"
};

// Catálogo de ejemplo: cambia nombres, precios, compatibilidad y descripciones
// por datos reales antes de publicar. Los botones no simulan una compra completada.
const products = [
  {id:"inventory",name:"Nexus Inventory",category:"UI",tag:"BEST SELLER",icon:"▦",code:"UI / 001",price:19.99,framework:"QBCore",runtime:"Optimizado",short:"Inventario compacto con una interfaz moderna y navegación intuitiva.",description:"Una base de inventario diseñada para una experiencia limpia. Antes de venderlo, agrega capturas reales, dependencias y documentación.",features:["Interfaz adaptable","Diseño compacto","Documentación de instalación"],compatibility:"QBCore — confirmar versión y dependencias",status:"Disponible al configurar entrega"},
  {id:"ems",name:"Pulse EMS",category:"RP",tag:"ROLEPLAY",icon:"✚",code:"RP / 002",price:24.99,framework:"QBCore",runtime:"Configurable",short:"Herramientas de atención médica para mejorar el flujo del trabajo EMS.",description:"Sistema de ejemplo para personal médico, con enfoque en una interfaz clara y procesos configurables.",features:["Panel de atención","Opciones configurables","Flujo pensado para roleplay"],compatibility:"QBCore — requiere pruebas en tu build",status:"Demo de catálogo"},
  {id:"graffiti",name:"Urban Graffiti",category:"RP",tag:"NEW RESOURCE",icon:"✳",code:"RP / 003",price:14.99,framework:"QBCore / ESX",runtime:"Configurable",short:"Sistema de grafitis para dar identidad visual a barrios y bandas.",description:"Una ficha de muestra para un recurso de grafitis. Especifica aquí los permisos, persistencia, límites y dependencias reales.",features:["Gestión de diseños","Configuración de zonas","Opciones de permisos"],compatibility:"QBCore / ESX — validar versiones",status:"Demo de catálogo"},
  {id:"heists",name:"Vault Heists",category:"RP",tag:"IMMERSIVE RP",icon:"◈",code:"RP / 004",price:29.99,framework:"QBCore",runtime:"Configurable",short:"Base para diseñar robos con etapas, requisitos y minijuegos.",description:"Ficha de ejemplo para un recurso de robos. Añade una lista precisa de minijuegos y dependencias que realmente incluya.",features:["Etapas configurables","Requisitos por robo","Puntos de integración"],compatibility:"QBCore — revisar dependencias",status:"Demo de catálogo"},
  {id:"admin",name:"Command Center",category:"Admin",tag:"STAFF TOOL",icon:"⌘",code:"ADM / 005",price:22.99,framework:"QBCore",runtime:"Permisos",short:"Panel de administración para centralizar acciones y herramientas del staff.",description:"Plantilla de producto para un panel administrativo. Define permisos, registros de auditoría y protección de eventos antes de vender.",features:["Permisos por rol","Acciones configurables","Registro de actividad"],compatibility:"QBCore — configurar ACL y permisos",status:"Demo de catálogo"},
  {id:"mechanic",name:"Apex Customs",category:"UI",tag:"GARAGE SYSTEM",icon:"⚙",code:"UI / 006",price:17.99,framework:"QBCore",runtime:"Responsive UI",short:"Interfaz de personalización de vehículos con presentación premium.",description:"Ficha de ejemplo para una interfaz de mecánico. Indica las integraciones, recursos y vehículos probados en tu versión.",features:["Interfaz responsive","Categorías de modificación","Opciones configurables"],compatibility:"QBCore — confirmar recursos requeridos",status:"Demo de catálogo"}
];

const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];
let activeFilter = "Todos";
const money = n => new Intl.NumberFormat(CONFIG.locale,{style:"currency",currency:CONFIG.currency,maximumFractionDigits:2}).format(n);
const escapeHTML = s => String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));

function setLinks(){
  ["discordNav","discordHero","catalogDiscord","customDiscord"].forEach(id=>{
    const el = document.getElementById(id);
    if(el) el.href = CONFIG.discordUrl;
  });
  document.title = `${CONFIG.brand} — FiveM Resources`;
  $$(".brand b").forEach(el=>{el.innerHTML=`${escapeHTML(CONFIG.brand.toUpperCase())}`;});
  $("#year").textContent = new Date().getFullYear();
}
function renderProducts(){
  const term = $("#searchInput").value.trim().toLowerCase();
  const shown = products.filter(p=>(activeFilter==="Todos"||p.category===activeFilter) && `${p.name} ${p.short} ${p.framework}`.toLowerCase().includes(term));
  $("#productGrid").innerHTML = shown.length ? shown.map(p=>`
    <article class="product-card">
      <div class="product-visual"><span class="product-tag ${p.tag==="BEST SELLER"?"hot":""}">${escapeHTML(p.tag)}</span><div class="visual-icon" aria-hidden="true">${escapeHTML(p.icon)}</div><span class="product-code">${escapeHTML(p.code)}</span></div>
      <div class="product-info"><div class="product-title-row"><h3>${escapeHTML(p.name)}</h3><div class="product-price">${money(p.price)}<small>pago único · demo</small></div></div>
      <p>${escapeHTML(p.short)}</p><div class="product-meta"><span>${escapeHTML(p.framework)}</span><span>${escapeHTML(p.runtime)}</span></div>
      <div class="product-bottom"><span>RECURSO DIGITAL</span><button class="details-btn" data-product="${escapeHTML(p.id)}">Ver detalles <span>↗</span></button></div></div>
    </article>`).join("") : `<div class="empty-state">No encontramos recursos con esa búsqueda.</div>`;
  $$("[data-product]").forEach(btn=>btn.addEventListener("click",()=>openProduct(btn.dataset.product)));
}
function openProduct(id){
  const p=products.find(item=>item.id===id); if(!p)return;
  $("#dialogContent").innerHTML=`<div class="dialog-symbol">${escapeHTML(p.icon)}</div><div class="eyebrow">${escapeHTML(p.code)} / PRODUCT DETAILS</div><h2>${escapeHTML(p.name)}</h2><div class="dialog-price">${money(p.price)} <small style="font-size:10px;color:#9993aa">· precio de ejemplo</small></div><p>${escapeHTML(p.description)}</p><h3 style="font-size:12px">Incluye (editar según el producto real)</h3><ul>${p.features.map(x=>`<li>${escapeHTML(x)}</li>`).join("")}</ul><p><b style="color:#ddd0ee">Compatibilidad:</b> ${escapeHTML(p.compatibility)}</p><p><b style="color:#ddd0ee">Estado:</b> ${escapeHTML(p.status)}</p><div class="dialog-actions"><a class="button primary" href="${escapeHTML(CONFIG.discordUrl)}" target="_blank" rel="noopener">Consultar / comprar <span>↗</span></a><button class="button ghost" id="copyProduct">Copiar nombre</button></div><p style="font-size:10px;color:#93869f;margin-top:18px">Aviso: esta versión es una plantilla. El pago y la entrega automática aún no están conectados.</p>`;
  const dlg=$("#productDialog"); if(typeof dlg.showModal==="function")dlg.showModal();
  $("#copyProduct").addEventListener("click",async()=>{try{await navigator.clipboard.writeText(p.name);toast("Nombre copiado.");}catch{toast("No se pudo copiar automáticamente.");}});
}
function toast(message){const el=$("#toast");el.textContent=message;el.classList.add("show");setTimeout(()=>el.classList.remove("show"),2600);}
$$(".filter").forEach(btn=>btn.addEventListener("click",()=>{$$(".filter").forEach(b=>b.classList.remove("active"));btn.classList.add("active");activeFilter=btn.dataset.filter;renderProducts();}));
$("#searchInput").addEventListener("input",renderProducts);
$("#dialogClose").addEventListener("click",()=>$("#productDialog").close());
$("#productDialog").addEventListener("click",e=>{if(e.target===$("#productDialog"))$("#productDialog").close();});
$("#menuToggle").addEventListener("click",()=>{const nav=$("#nav"),open=nav.classList.toggle("open");$("#menuToggle").setAttribute("aria-expanded",String(open));});
$$('#nav a').forEach(a=>a.addEventListener("click",()=>{$("#nav").classList.remove("open");$("#menuToggle").setAttribute("aria-expanded","false");}));
setLinks();renderProducts();