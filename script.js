const NS = "http://www.w3.org/2000/svg";

// ---------- REAL DIMENSIONS (mm) — Mazda3 BL sedán 2010 ----------
const L  = 4590;   // largo total
const W  = 1755;   // ancho total
const H  = 1470;   // alto total
const WB = 2640;   // batalla (distancia entre ejes)
const WHEEL_D = 630; // diámetro de llanta+neumático aprox (16", 205/55R16)
const WHEEL_R = WHEEL_D / 2;

const X0 = 80;                 // origen (defensa delantera) en el plano
const GROUND_Y = 1650;         // línea de piso (vista lateral)
const ROOF_Y = GROUND_Y - H;   // techo
const FRONT_OVERHANG = 850;
const X_FRONT_WHEEL = X0 + FRONT_OVERHANG;
const X_REAR_WHEEL  = X_FRONT_WHEEL + WB;
const X_REAR_BUMPER = X0 + L;

// ---------- DATA (posiciones en mm reales) ----------
const sideParts = [
  {n:1,  name:"Defensa delantera", x:110,  y:1210, desc:"Parachoques frontal, absorbe impactos de baja velocidad."},
  {n:2,  name:"Parrilla / rejilla frontal", x:170, y:960, desc:"Entrada de aire frontal, sobre la defensa."},
  {n:3,  name:"Faros delanteros", x:260, y:850, desc:"Luces principales, a cada lado de la parrilla."},
  {n:4,  name:"Cofre / capó", x:650, y:830, desc:"Cubierta superior del compartimento del motor."},
  {n:5,  name:"Parabrisas", x:1380, y:420, desc:"Cristal frontal inclinado, base del techo."},
  {n:6,  name:"Espejos laterales", x:1260, y:700, desc:"Montados en el marco de las puertas delanteras."},
  {n:7,  name:"Puertas delanteras", x:1750, y:920, desc:"Par de puertas, incluyen manijas y vidrios eléctricos."},
  {n:8,  name:"Puertas traseras", x:2650, y:920, desc:"Par de puertas traseras."},
  {n:9,  name:"Techo", x:2250, y:200, desc:"Panel superior entre parabrisas y luneta."},
  {n:10, name:"Salpicadera delantera", x:930, y:1010, desc:"Guardafango que cubre la llanta delantera."},
  {n:11, name:"Salpicadera trasera", x:3570, y:1010, desc:"Guardafango que cubre la llanta trasera."},
  {n:12, name:"Molduras / estribos laterales", x:2200, y:1260, desc:"Franja inferior entre las llantas."},
  {n:13, name:"Luneta trasera", x:3120, y:410, desc:"Cristal trasero, con desempañante integrado."},
  {n:14, name:"Cajuela / maletero", x:4350, y:900, desc:"Compartimento de carga trasero."},
  {n:15, name:"Calaveras (faros traseros)", x:4560, y:950, desc:"Luces traseras, a los costados de la cajuela."},
  {n:16, name:"Defensa trasera", x:4600, y:1210, desc:"Parachoques posterior."},
  {n:17, name:"Rines / llantas (16\")", x:3570, y:1500, desc:"Ruedas y neumáticos 205/55R16, delanteras y traseras."},
  {n:18, name:"Antena", x:2900, y:210, desc:"Ubicada sobre el techo, hacia la parte trasera."},
];

const planParts = [
  {n:1,  name:"Motor 2.0L MZR (LF)", x:650,  y:500,  desc:"Motor transversal, compartimento delantero."},
  {n:2,  name:"Transmisión", x:950,  y:1350, desc:"Junto al motor, manual o automática 5 velocidades."},
  {n:3,  name:"Radiador", x:230,  y:977,  desc:"En el frente, delante del motor."},
  {n:4,  name:"Batería", x:500,  y:250,  desc:"Esquina del compartimento del motor."},
  {n:5,  name:"Alternador", x:800,  y:350,  desc:"Montado sobre el motor, movido por banda."},
  {n:6,  name:"Motor de arranque (marcha)", x:850,  y:1300, desc:"Parte baja del motor, junto a la transmisión."},
  {n:7,  name:"Filtro de aire / admisión", x:550,  y:1420, desc:"Caja de admisión, lado del motor."},
  {n:8,  name:"Sistema de dirección (cremallera)", x:750,  y:977,  desc:"Bajo el motor, conecta con el volante."},
  {n:9,  name:"Flechas homocinéticas (ejes CV)", x:X_FRONT_WHEEL,  y:500,  desc:"Del diferencial a cada llanta delantera."},
  {n:10, name:"Suspensión delantera (McPherson)", x:X_FRONT_WHEEL,  y:170,  desc:"En cada rueda delantera."},
  {n:11, name:"Suspensión trasera (multilink)", x:X_REAR_WHEEL,  y:170,  desc:"En cada rueda trasera."},
  {n:12, name:"Frenos delanteros (discos ventilados)", x:X_FRONT_WHEEL,  y:430,  desc:"En cada rueda delantera."},
  {n:13, name:"Frenos traseros (discos sólidos)", x:X_REAR_WHEEL,  y:430,  desc:"En cada rueda trasera."},
  {n:14, name:"Tanque de combustible", x:4300, y:977,  desc:"Bajos del auto, cerca del eje trasero."},
  {n:15, name:"Bomba de gasolina", x:4400, y:800,  desc:"Dentro o junto al tanque de combustible."},
  {n:16, name:"Sistema de escape (mofle + catalizador)", x:2200, y:977,  desc:"Recorre el centro, de motor a la parte trasera."},
  {n:17, name:"Diferencial", x:1050, y:977,  desc:"Integrado a la transmisión (auto FWD)."},
];

// ---------- HELPERS ----------
function el(tag, attrs){
  const e = document.createElementNS(NS, tag);
  for(const k in attrs) e.setAttribute(k, attrs[k]);
  return e;
}

function drawRuler(svg, y, totalLen, label){
  const g = el('g', {class:'ruler'});
  g.appendChild(el('line',{x1:X0, y1:y, x2:X0+totalLen, y2:y}));
  for(let d=0; d<=totalLen; d+=500){
    const x = X0 + d;
    g.appendChild(el('line',{x1:x, y1:y-14, x2:x, y2:y+14}));
    const t = el('text',{x:x, y:y+50, 'text-anchor':'middle'});
    t.textContent = d;
    g.appendChild(t);
  }
  const lbl = el('text',{x:X0+totalLen/2, y:y+95, 'text-anchor':'middle', fill:'var(--line)'});
  lbl.setAttribute('font-family',"'IBM Plex Mono', monospace");
  lbl.setAttribute('font-size','28');
  lbl.textContent = label;
  g.appendChild(lbl);
  svg.appendChild(g);
}

// ---------- SIDE VIEW (real mm) ----------
function drawSideCar(svg){
  const g = el('g', {});

  // ground line
  g.appendChild(el('line',{x1:X0-40,y1:GROUND_Y,x2:X0+L+40,y2:GROUND_Y, stroke:'var(--grid)','stroke-width':4}));

  // wheels — real diameter, real wheelbase
  [X_FRONT_WHEEL, X_REAR_WHEEL].forEach(cx=>{
    g.appendChild(el('circle',{cx, cy:GROUND_Y-WHEEL_R, r:WHEEL_R, fill:'none', stroke:'var(--line-dim)','stroke-width':10}));
    g.appendChild(el('circle',{cx, cy:GROUND_Y-WHEEL_R, r:WHEEL_R*0.4, fill:'none', stroke:'var(--line-dim)','stroke-width':6}));
  });

  // body silhouette (envelope = real L x H; curves are schematic)
  const body = `M${X0},${GROUND_Y-300}
    L${X0},${GROUND_Y-400}
    Q${X0+30},${GROUND_Y-560} ${X0+270},${GROUND_Y-700}
    L${X0+570},${GROUND_Y-820}
    Q${X0+800},${GROUND_Y-880} ${X0+1020},${GROUND_Y-853}
    L${X0+1220},${GROUND_Y-1220}
    Q${X0+1370},${GROUND_Y-1440} ${X0+1520},${GROUND_Y-1460}
    L${X0+2920},${GROUND_Y-1460}
    Q${X0+3070},${GROUND_Y-1440} ${X0+3150},${GROUND_Y-1180}
    L${X0+3270},${GROUND_Y-820}
    Q${X0+3520},${GROUND_Y-880} ${X0+3820},${GROUND_Y-820}
    L${X0+4270},${GROUND_Y-700}
    Q${X0+4510},${GROUND_Y-560} ${X0+4560},${GROUND_Y-400}
    L${X0+4590},${GROUND_Y-300}
    Z`;
  g.appendChild(el('path',{d:body, fill:'rgba(111,168,220,0.06)', stroke:'var(--line)','stroke-width':6, 'stroke-linejoin':'round'}));

  // windows (cowl -> roof -> rear window)
  const windows = `M${X0+1050},${GROUND_Y-853}
    L${X0+1240},${GROUND_Y-1220}
    Q${X0+1380},${GROUND_Y-1400} ${X0+1560},${GROUND_Y-1410}
    L${X0+2880},${GROUND_Y-1410}
    Q${X0+3040},${GROUND_Y-1400} ${X0+3130},${GROUND_Y-1170}
    L${X0+3230},${GROUND_Y-853}
    Z`;
  g.appendChild(el('path',{d:windows, fill:'rgba(111,168,220,0.10)', stroke:'var(--line)','stroke-width':4}));

  // door seam (approx over wheelbase midpoint)
  const seamX = X0 + FRONT_OVERHANG + WB*0.5;
  g.appendChild(el('line',{x1:seamX,y1:GROUND_Y-1300,x2:seamX,y2:GROUND_Y-350, stroke:'var(--grid)','stroke-width':4}));

  svg.appendChild(g);
  drawRuler(svg, GROUND_Y+120, L, `LARGO 4,590 mm  ·  BATALLA 2,640 mm  ·  ALTO 1,470 mm`);
}

// ---------- PLAN VIEW (real mm, same length scale as side view) ----------
function drawPlanChassis(svg){
  const g = el('g', {});
  const topY = 100;
  const bottomY = topY + W;
  const midY = topY + W/2;

  // chassis outline — real length x real width
  g.appendChild(el('rect',{x:X0, y:topY, width:L, height:W, rx:520, fill:'rgba(111,168,220,0.05)', stroke:'var(--line)','stroke-width':6}));

  // cabin separators
  const cabinFrontX = X0 + FRONT_OVERHANG + 250;
  const cabinRearX  = X_REAR_BUMPER - 1100 + 200;
  g.appendChild(el('line',{x1:cabinFrontX,y1:topY,x2:cabinFrontX,y2:bottomY, stroke:'var(--grid)','stroke-width':4,'stroke-dasharray':'20,20'}));
  g.appendChild(el('line',{x1:cabinRearX,y1:topY,x2:cabinRearX,y2:bottomY, stroke:'var(--grid)','stroke-width':4,'stroke-dasharray':'20,20'}));

  // centerline / exhaust run
  g.appendChild(el('line',{x1:cabinFrontX,y1:midY,x2:cabinRearX+900,y2:midY, stroke:'var(--line-dim)','stroke-width':6,'stroke-dasharray':'10,25'}));

  // wheels at real track positions, real tire footprint (630mm x 205mm)
  const trackInset = (W-1500)/2;
  const wheelY = [topY+trackInset, bottomY-trackInset];
  [X_FRONT_WHEEL, X_REAR_WHEEL].forEach(cx=>{
    wheelY.forEach(cy=>{
      g.appendChild(el('rect',{x:cx-WHEEL_R, y:cy-100, width:WHEEL_D, height:200, rx:24, fill:'none', stroke:'var(--line-dim)','stroke-width':8}));
    });
  });

  svg.appendChild(g);
  drawRuler(svg, bottomY+120, L, `LARGO 4,590 mm  ·  ANCHO 1,755 mm`);
}

function renderDots(svg, parts, groupId){
  parts.forEach(p=>{
    const g = el('g', {class:'dot', 'data-id':groupId+'-'+p.n, transform:`translate(${p.x},${p.y})`});
    g.appendChild(el('circle',{class:'ring', r:48}));
    const t = el('text',{x:0,y:2});
    t.textContent = p.n;
    g.appendChild(t);
    svg.appendChild(g);
  });
}

function renderChips(containerId, parts, groupId){
  const container = document.getElementById(containerId);
  parts.forEach(p=>{
    const chip = document.createElement('div');
    chip.className = 'chip';
    chip.dataset.id = groupId+'-'+p.n;
    chip.innerHTML = `<span class="n">${p.n}</span><span>${p.name}</span>`;
    container.appendChild(chip);
  });
}

function setupInteraction(svgId, chipsId, readoutId, parts, groupId){
  const svg = document.getElementById(svgId);
  const readout = document.getElementById(readoutId);

  function select(id){
    const p = parts.find(pp => (groupId+'-'+pp.n) === id);
    if(!p) return;
    svg.querySelectorAll('.dot').forEach(d=>d.classList.toggle('active', d.dataset.id===id));
    document.querySelectorAll(`#${chipsId} .chip`).forEach(c=>c.classList.toggle('active', c.dataset.id===id));
    readout.innerHTML = `<span class="num">${p.n.toString().padStart(2,'0')}</span> — <span class="name">${p.name}</span><br>${p.desc}`;
  }

  svg.querySelectorAll('.dot').forEach(d=>{
    d.addEventListener('click', ()=> select(d.dataset.id));
  });
  document.querySelectorAll(`#${chipsId} .chip`).forEach(c=>{
    c.addEventListener('click', ()=> select(c.dataset.id));
  });
}

// ---------- INIT ----------
const svgSide = document.getElementById('svgSide');
drawSideCar(svgSide);
renderDots(svgSide, sideParts, 'side');
renderChips('chipsSide', sideParts, 'side');
setupInteraction('svgSide','chipsSide','readoutSide', sideParts, 'side');

const svgPlan = document.getElementById('svgPlan');
drawPlanChassis(svgPlan);
renderDots(svgPlan, planParts, 'plan');
renderChips('chipsPlan', planParts, 'plan');
setupInteraction('svgPlan','chipsPlan','readoutPlan', planParts, 'plan');
