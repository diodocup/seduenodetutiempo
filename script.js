const state = {
  gastos: {
    b4: 7800,
    b5: 500,
    b6: 0.4,
    b7: 15000,
    b8: 235000,
    b9: 400000,
    rows: [
      { cat: 'Vivienda', type: 'Necesario', c: 2000, d: 2000, e: 2000 },
      { cat: 'Comida', type: 'Necesario', c: 500, d: 500, e: 500 },
      { cat: 'Transporte', type: 'Necesario', c: 0, d: 0, e: 0 },
      { cat: 'Ocio', type: 'Discrecional', c: 300, d: 320, e: 350 },
      { cat: 'Vicios', type: 'Discrecional', c: 50, d: 40, e: 50 },
      { cat: 'Suscripciones', type: 'Discrecional', c: 35, d: 35, e: 35 },
      { cat: 'Otros', type: 'Discrecional', c: 1000, d: 1000, e: 1000 }
    ]
  },
  interes: { b4: 0, b5: 300, b6: 0.07, b7: 30, b8: 0.02, b9: 5, f8: 300, f9: 30 },
  paz: { b5: 0, b9: 0.07, b10: 25, b11: 28, b12: 30 },
  alquiler: { b4: 100000, b5: 600, b6: 0.1, b7: 350, b8: 600, b9: 200, b10: 500, b11: 500, b12: 0, b13: 0.8, b14: 0.026, b15: 25, b16: 10000 },
  vivienda: { b4: 250000, b5: 0.8, b6: 0.1, b7: 30000, b8: 1000, b9: 0.026, b10: 25, b11: 1000, b12: 9, b13: 0.02, b14: 600000 },
  allocation: { b4: 16, b5: 700000 },
  bolsillos: { b4: 2500, b5: 1500, b6: 1800, b7: 600 }
};

const $ = (id) => document.getElementById(id);
const num = (v) => Number.isFinite(+v) ? +v : 0;
const fmtMoney = (v) => new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(num(v));
const fmtMoney2 = (v) => new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(num(v));
const fmtPct = (v, digits = 1) => `${(num(v) * 100).toFixed(digits).replace('.', ',')}%`;
const fmtNum = (v, digits = 1) => num(v).toFixed(digits).replace('.', ',');
const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
const setText = (id, value, cls = '') => {
  const el = $(id); if (!el) return;
  el.textContent = value;
  el.className = cls;
};
const setBar = (id, pct) => { const el = $(id); if (el) el.style.width = `${clamp(pct, 0, 100)}%`; };

function pmt(rate, nper, pv, fv = 0, type = 0) {
  rate = num(rate); nper = num(nper); pv = num(pv); fv = num(fv);
  if (nper === 0) return 0;
  if (rate === 0) return -(pv + fv) / nper;
  const pvif = Math.pow(1 + rate, nper);
  let result = rate / (pvif - 1) * -(pv * pvif + fv);
  if (type === 1) result /= (1 + rate);
  return result;
}
function fv(rate, nper, pmtVal, pv = 0, type = 0) {
  rate = num(rate); nper = num(nper); pmtVal = num(pmtVal); pv = num(pv);
  if (rate === 0) return -(pv + pmtVal * nper);
  const pvif = Math.pow(1 + rate, nper);
  return -(pv * pvif + pmtVal * (1 + rate * type) * (pvif - 1) / rate);
}
function nper(rate, pmtVal, pv, fvVal = 0, type = 0) {
  rate = num(rate); pmtVal = num(pmtVal); pv = num(pv); fvVal = num(fvVal);
  if (rate === 0) return (-(fvVal + pv)) / pmtVal;
  const payment = pmtVal * (1 + rate * type) / rate;
  const nume = payment - fvVal;
  const deno = payment + pv;
  if (nume <= 0 || deno <= 0) return NaN;
  return Math.log(nume / deno) / Math.log(1 + rate);
}

function computeGastos() {
  const s = state.gastos;
  const b26 = s.b4 + s.b5;
  const rows = s.rows.map(r => {
    const f = (r.c + r.d + r.e) / 3;
    const g = b26 === 0 ? 0 : f / b26;
    return { ...r, f, g };
  });
  const b27 = rows.filter(r => r.type === 'Necesario').reduce((a, r) => a + r.f, 0);
  const b28 = rows.filter(r => r.type === 'Discrecional').reduce((a, r) => a + r.f, 0);
  const b29 = b27 + b28;
  const b30 = b26 - b29;
  const b31 = b26 === 0 ? 0 : b30 / b26;
  const b32 = Math.max(b30, 0);
  const b33 = b26 * s.b6;
  const b34 = b30 - b33;
  const b35 = b27 === 0 ? 0 : s.b7 / b27;
  const read26 = b27 <= 0 ? 'Revisar inputs' : (b27 / b26 <= 0.5 ? 'Ligero' : 'Pesado');
  const read27 = b28 / b26 <= 0.15 ? 'Contenido' : (b28 / b26 <= 0.3 ? 'Moderado' : 'Alto');
  const read28 = b30 < 0 ? 'Negativo' : (b31 < 0.1 ? 'Bajo' : (b31 < 0.2 ? 'Medio' : 'Fuerte'));
  const read29 = b30 < 0 ? 'Recorta gasto o sube ingresos' : (b33 < 0 ? 'Ajusta para llegar al objetivo' : 'Mantén el sistema');
  return { rows, b26, b27, b28, b29, b30, b31, b32, b33, b34, b35, read26, read27, read28, read29 };
}

function computeFondo(g) {
  const b4 = g.b27;
  const b5 = state.gastos.b7;
  const targets = [3,4,5,6].map(m => {
    const objective = m * b4;
    const gap = b5 - objective;
    return { months: m, objective, gap, status: gap >= 0 ? 'Cumplido' : 'Pendiente', comment: m === 3 ? 'Mínimo razonable' : m === 4 || m === 5 ? 'Suficiente' : 'Robusto' };
  });
  const b19 = b4 === 0 ? 0 : b5 / b4;
  const b20 = 6 * b4;
  const b21 = Math.max(b20 - b5, 0);
  const b22 = b19 < 3 ? 'Prioridad alta' : (b19 < 6 ? 'Bien encaminado' : 'Fondo robusto');
  return { b4, b5, targets, b19, b20, b21, b22 };
}

function computeInteres() {
  const s = state.interes;
  const f4 = fv(s.b6 / 12, s.b7 * 12, -s.b5, -s.b4, 0);
  const f5 = s.b7 <= s.b9 ? 0 : fv(s.b6 / 12, (s.b7 - s.b9) * 12, -s.b5, -s.b4, 0);
  const f6 = f4 - f5;
  const f10 = fv(s.b6 / 12, s.f9 * 12, -s.f8, 0, 0);
  const b13 = fv(s.b6 / 12, s.b7 * 12, -s.b5, -s.b4, 0);
  const b14 = s.b4 + (s.b5 * 12 * s.b7);
  const b15 = b13 - b14;
  const b16 = b13 / Math.pow(1 + s.b8, s.b7);
  return { f4, f5, f6, f10, b13, b14, b15, b16 };
}

function computePaz(g) {
  const s = state.paz;
  const b4 = g.b29;
  const b6 = s.b5 > 0 ? s.b5 : b4;
  const b7 = state.gastos.b8;
  const b8 = Math.max(g.b30, 0) * 12;
  const b15 = b6 * 12;
  const b16 = b15 * s.b10;
  const b17 = b15 * s.b11;
  const b18 = b15 * s.b12;
  const b19 = b16 === 0 ? 0 : b7 / b16;
  const b20 = b17 === 0 ? 0 : b7 / b17;
  const b21 = b18 === 0 ? 0 : b8 / b18; // replicated from sheet logic
  const b22 = b16 * 0.10;
  const b23 = b16 * 0.50;
  const b24 = b16;
  const b25 = b7 >= b16 ? 0 : ((s.b9 <= 0 || b8 <= 0) ? NaN : nper(s.b9, -b8, -b7, b16));
  const b26 = b7 >= b17 ? 0 : ((s.b9 <= 0 || b8 <= 0) ? NaN : nper(s.b9, -b8, -b7, b17));
  const b27 = b7 >= b18 ? 0 : ((s.b9 <= 0 || b8 <= 0) ? NaN : nper(s.b9, -b8, -b7, b18));
  const f4 = b22, f5 = b23, f6 = b24;
  const f8 = b19 < 0.10 ? 'Arranque' : (b19 < 0.50 ? 'Hibridación' : (b19 < 1 ? 'Transición avanzada' : 'Tranquilidad total'));
  const f9 = b19 < 0.10 ? 'Construyendo base' : (b19 < 0.50 ? 'Ya reduce dependencia' : (b19 < 1 ? 'Se acerca al objetivo' : 'Objetivo alcanzado'));
  return { b4, b6, b7, b8, b15, b16, b17, b18, b19, b20, b21, b22, b23, b24, b25, b26, b27, f4, f5, f6, f8, f9 };
}

function computeAlquiler() {
  const s = state.alquiler;
  const b19 = s.b5 * 12;
  const b20 = s.b4 * s.b6;
  const b21 = s.b4 + b19 + s.b16; // replicated from sheet formula
  const b22 = s.b7 + s.b8 + s.b9 + s.b10 + s.b11 + s.b12;
  const b23 = b19 - b22;
  const b24 = s.b4 === 0 ? 0 : b19 / s.b4;
  const b25 = b21 === 0 ? 0 : b23 / b21;
  const b26 = s.b4 * s.b13;
  const b27 = b21 - b26;
  const b28 = -pmt(s.b14 / 12, s.b15 * 12, b26);
  const b29 = b28 * 12;
  const b30 = b23 - b29;
  const b31 = b30 / 12;
  const b32 = b27 === 0 ? 0 : b30 / b27;
  const f4 = b24 >= 0.08 ? 'Cumple >8%' : 'Revisar';
  const f5 = b25 < 0.05 ? 'Baja' : (b25 < 0.06 ? 'Aceptable' : (b25 < 0.07 ? 'Buena' : 'Muy buena'));
  const f6 = b30 > 0 ? 'Positivo' : 'Negativo';
  const f7 = (b24 >= 0.08 && b25 >= 0.05 && b30 > 0) ? 'Operación sana' : 'Merece revisión';
  return { b19,b20,b21,b22,b23,b24,b25,b26,b27,b28,b29,b30,b31,b32,f4,f5,f6,f7 };
}

function computeVivienda() {
  const s = state.vivienda;
  const b17 = s.b4 * (1 - s.b5);
  const b18 = s.b4 * s.b6;
  const b19 = b17 + b18;
  const b20 = Math.max(b19 - s.b7, 0);
  const b21 = s.b8 > 0 ? b20 / s.b8 : NaN;
  const b22 = -pmt(s.b9 / 12, s.b10 * 12, s.b4 * s.b5);
  const b23 = s.b11 - b22;
  const b24 = Math.max(b23, 0) * 12;
  const b25 = s.b4 * Math.pow(1 + s.b13, s.b12);
  const b26 = Math.abs(fv(s.b9 / 12, s.b12 * 12, -b22, s.b4 * s.b5));
  const b27 = b25 - b26;
  const b28 = b24 * s.b12;
  const b29 = b27 + b28;
  const b30 = s.b14 * (1 - s.b5) + s.b14 * s.b6;
  const b31 = b30 === 0 ? 0 : b29 / b30;
  const f4 = b21 <= 60 ? 'Menos de 5 años' : (b21 <= 120 ? 'Largo pero viable' : 'Muy lejana');
  const f5 = b23 >= 0 ? 'Hipoteca igual o menor que alquiler' : 'Hipoteca más exigente';
  const f6 = b31 >= 1 ? 'Podría facilitar el salto' : 'Necesitará ahorro extra';
  return { b17,b18,b19,b20,b21,b22,b23,b24,b25,b26,b27,b28,b29,b30,b31,f4,f5,f6 };
}

function computeAllocation() {
  const s = state.allocation;
  const b6 = state.gastos.b8;
  const b10 = s.b5 + b6;
  const b11 = b10 === 0 ? 0 : s.b5 / b10;
  const b12 = b10 === 0 ? 0 : b6 / b10;
  const b13 = b11 > 0.7 ? 'Mucho peso en ladrillo' : (b11 < 0.3 ? 'Patrimonio poco expuesto a inmobiliario' : 'Equilibrándose');
  const f12 = s.b4 > 15 ? 'Acumulación' : (s.b4 > 5 ? 'Transición' : (s.b4 > 0 ? 'Conservación' : 'Cosecha / libertad'));
  const f13 = b11 > 0.7 ? 'Prioriza liquidez e inversión financiera' : (b11 < 0.3 ? 'Puedes estar infraexpuesto a inmobiliario' : 'Mantén equilibrio y rebalanceo');
  return { b6, b10, b11, b12, b13, f12, f13 };
}

function computeBolsillos() {
  const s = state.bolsillos;
  const b11 = s.b4 + s.b5;
  const b12 = b11 === 0 ? 0 : s.b4 / b11;
  const b13 = b11 === 0 ? 0 : s.b5 / b11;
  const b14 = (s.b6 + s.b7) * b12;
  const b15 = (s.b6 + s.b7) * b13;
  const b16 = s.b4 - b14;
  const b17 = s.b5 - b15;
  return { b11,b12,b13,b14,b15,b16,b17 };
}

function renderGastos(g) {
  ['ga_b4','ga_b5','ga_b6','ga_b7','ga_b8','ga_b9'].forEach(id => $(id).value = state.gastos[id.split('_')[1]]);
  const tbody = $('#gaTable tbody');
  tbody.innerHTML = '';
  g.rows.forEach((r, idx) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${r.cat}</td>
      <td>${r.type}</td>
      <td><input type="number" step="0.01" data-row="${idx}" data-key="c" value="${r.c}"></td>
      <td><input type="number" step="0.01" data-row="${idx}" data-key="d" value="${r.d}"></td>
      <td><input type="number" step="0.01" data-row="${idx}" data-key="e" value="${r.e}"></td>
      <td>${fmtMoney2(r.f)}</td>
      <td>${fmtPct(r.g, 1)}</td>`;
    tbody.appendChild(tr);
  });
  tbody.querySelectorAll('input').forEach(input => input.addEventListener('input', e => {
    const row = +e.target.dataset.row; const key = e.target.dataset.key;
    state.gastos.rows[row][key] = num(e.target.value);
    recalc();
  }));
  setText('ga_res_b26', fmtMoney(g.b26)); setText('ga_res_b27', fmtMoney(g.b27)); setText('ga_res_b28', fmtMoney(g.b28));
  setText('ga_res_b29', fmtMoney(g.b29)); setText('ga_res_b30', fmtMoney(g.b30), g.b30 >= 0 ? 'positive' : 'negative');
  setText('ga_res_b31', fmtPct(g.b31)); setText('ga_res_b32', fmtMoney(g.b32)); setText('ga_res_b33', fmtMoney(g.b33));
  setText('ga_res_b34', fmtMoney(g.b34), g.b34 >= 0 ? 'positive' : 'negative'); setText('ga_res_b35', fmtNum(g.b35, 1));
  setText('ga_read_26', g.read26); setText('ga_read_27', g.read27); setText('ga_read_28', g.read28); setText('ga_read_29', g.read29);
}

function renderFondo(ft) {
  setText('ft_b4', fmtMoney(ft.b4)); setText('ft_b5', fmtMoney(ft.b5)); setText('ft_b19', fmtNum(ft.b19, 1));
  setText('ft_b20', fmtMoney(ft.b20)); setText('ft_b21', fmtMoney(ft.b21)); setText('ft_b22', ft.b22);
  const tbody = $('#ftTable tbody'); tbody.innerHTML = '';
  ft.targets.forEach(t => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${t.months}</td><td>${fmtMoney(t.objective)}</td><td class="${t.gap>=0?'positive':'negative'}">${fmtMoney(t.gap)}</td><td class="center"><span class="badge ${t.status==='Cumplido'?'ok':'warn'}">${t.status}</span></td><td>${t.comment}</td>`;
    tbody.appendChild(tr);
  });
}

function renderInteres(ic) {
  ['b4','b5','b6','b7','b8','b9'].forEach(k => $('ic_'+k).value = state.interes[k]);
  ['f8','f9'].forEach(k => $('ic_'+k).value = state.interes[k]);
  ['f4','f5','f6','f10','b13','b14','b15','b16'].forEach(k => setText('ic_'+k, fmtMoney(ic[k]), (ic[k]||0) >= 0 ? 'positive' : 'negative'));
}

function renderPaz(np) {
  $('np_b5').value = state.paz.b5; $('np_b9').value = state.paz.b9; $('np_b10').value = state.paz.b10; $('np_b11').value = state.paz.b11; $('np_b12').value = state.paz.b12;
  ['b4','b6','b7','b8','b15','b16','b17','b18','b22','b23','b24'].forEach(k => setText('np_'+k, fmtMoney(np[k])));
  ['b19','b20','b21'].forEach(k => setText('np_'+k, fmtPct(np[k])));
  ['b25','b26','b27'].forEach(k => setText('np_'+k, Number.isFinite(np[k]) ? `${fmtNum(np[k],1)} años` : '-'));
  setText('np_f4', fmtMoney(np.f4)); setText('np_f5', fmtMoney(np.f5)); setText('np_f6', fmtMoney(np.f6)); setText('np_f8', np.f8); setText('np_f9', np.f9);
}

function renderAlquiler(ra) {
  Object.keys(state.alquiler).forEach(k => $('ra_'+k).value = state.alquiler[k]);
  ['b19','b20','b21','b22','b23','b26','b27','b28','b29','b30','b31'].forEach(k => setText('ra_'+k, fmtMoney(ra[k]), (ra[k]||0) >= 0 ? 'positive' : 'negative'));
  ['b24','b25','b32'].forEach(k => setText('ra_'+k, fmtPct(ra[k])));
  setText('ra_f4', ra.f4); setText('ra_f5', ra.f5); setText('ra_f6', ra.f6); setText('ra_f7', ra.f7);
}

function renderVivienda(pv) {
  Object.keys(state.vivienda).forEach(k => $('pv_'+k).value = state.vivienda[k]);
  ['b17','b18','b19','b20','b22','b23','b24','b25','b26','b27','b28','b29','b30'].forEach(k => setText('pv_'+k, fmtMoney(pv[k]), (pv[k]||0) >= 0 ? 'positive' : 'negative'));
  setText('pv_b21', Number.isFinite(pv.b21) ? `${fmtNum(pv.b21,1)} meses` : '-');
  setText('pv_b31', fmtPct(pv.b31)); setText('pv_f4', pv.f4); setText('pv_f5', pv.f5); setText('pv_f6', pv.f6);
}

function renderAllocation(aa) {
  $('aa_b4').value = state.allocation.b4; $('aa_b5').value = state.allocation.b5;
  setText('aa_b6', fmtMoney(aa.b6)); setText('aa_b10', fmtMoney(aa.b10)); setText('aa_b11', fmtPct(aa.b11)); setText('aa_b12', fmtPct(aa.b12));
  setText('aa_b13', aa.b13); setText('aa_f12', aa.f12); setText('aa_f13', aa.f13);
}

function renderBolsillos(tb) {
  Object.keys(state.bolsillos).forEach(k => $('tb_'+k).value = state.bolsillos[k]);
  setText('tb_b11', fmtMoney(tb.b11)); setText('tb_b12', fmtPct(tb.b12)); setText('tb_b13', fmtPct(tb.b13));
  setText('tb_b14', fmtMoney(tb.b14)); setText('tb_b15', fmtMoney(tb.b15)); setText('tb_b16', fmtMoney(tb.b16), tb.b16 >= 0 ? 'positive' : 'negative'); setText('tb_b17', fmtMoney(tb.b17), tb.b17 >= 0 ? 'positive' : 'negative');
}

function renderDashboard(g, ft, ic, np, ra, pv, aa, tb) {
  setText('kpiAhorro', fmtMoney(g.b30), g.b30 >= 0 ? 'positive' : 'negative');
  setText('kpiFondo', `${fmtNum(ft.b19,1)} meses`);
  setText('kpiPaz', fmtPct(np.b19));
  setText('kpiAlquiler', fmtMoney(ra.b31), ra.b31 >= 0 ? 'positive' : 'negative');

  setText('dashGastoNecesario', fmtMoney(g.b27)); setBar('dashGastoNecesarioBar', g.b26 ? g.b27 / g.b26 * 100 : 0);
  setText('dashGastoDiscrecional', fmtMoney(g.b28)); setBar('dashGastoDiscrecionalBar', g.b26 ? g.b28 / g.b26 * 100 : 0);
  setText('dashAhorro', fmtMoney(Math.max(g.b30,0))); setBar('dashAhorroBar', g.b26 ? Math.max(g.b30,0) / g.b26 * 100 : 0);

  const ladder = $('fundLadder'); ladder.innerHTML = '';
  ft.targets.forEach(t => {
    const pct = t.objective === 0 ? 0 : ft.b5 / t.objective * 100;
    const div = document.createElement('div');
    div.className = 'ladder-item';
    div.innerHTML = `<div class="tag">${t.months} meses</div><div><div class="progress"><span style="width:${clamp(pct,0,100)}%"></span></div></div><div>${fmtMoney(t.objective)}</div><div><span class="badge ${t.status==='Cumplido'?'ok':'warn'}">${t.status}</span></div>`;
    ladder.appendChild(div);
  });

  const wait = $('waitGrid'); wait.innerHTML = '';
  for (let years = 0; years <= 6; years++) {
    const val = state.interes.b7 <= years ? 0 : fv(state.interes.b6 / 12, (state.interes.b7 - years) * 12, -state.interes.b5, -state.interes.b4, 0);
    const cost = ic.b13 - val;
    const row = document.createElement('div');
    row.className = 'wait-row';
    row.innerHTML = `<div>${years}a</div><div class="progress"><span style="width:${clamp(val / (ic.b13 || 1) * 100,0,100)}%"></span></div><div>${fmtMoney(cost)}</div>`;
    wait.appendChild(row);
  }

  const circumference = 2 * Math.PI * 48;
  const progress = clamp(np.b19, 0, 1);
  $('peaceRing').style.strokeDasharray = `${circumference}`;
  $('peaceRing').style.strokeDashoffset = `${circumference * (1 - progress)}`;
  setText('peaceRingText', fmtPct(np.b19));
  setText('peaceRingState', np.f8);

  setText('dashIngresoNeto', fmtMoney(ra.b23)); setText('dashHipoteca', fmtMoney(ra.b29)); setText('dashCashFlowAnual', fmtMoney(ra.b30), ra.b30 >= 0 ? 'positive' : 'negative'); setText('dashCashFlowMensual', fmtMoney(ra.b31), ra.b31 >= 0 ? 'positive' : 'negative');
  setText('dashPatrimonioInmo', fmtPct(aa.b11)); setBar('dashPatrimonioInmoBar', aa.b11 * 100); setText('dashPatrimonioLiquido', fmtPct(aa.b12)); setBar('dashPatrimonioLiquidoBar', aa.b12 * 100);
  setText('dashAhorrosActuales', fmtMoney(state.vivienda.b7)); setText('dashCapitalSalto', fmtMoney(pv.b29)); setText('dashProximaEntrada', fmtMoney(pv.b30)); setText('dashCoberturaSalto', fmtPct(pv.b31));
  setText('dashAportaA', fmtMoney(tb.b14)); setText('dashAportaB', fmtMoney(tb.b15)); setText('dashLibreA', fmtMoney(tb.b16), tb.b16 >= 0 ? 'positive' : 'negative'); setText('dashLibreB', fmtMoney(tb.b17), tb.b17 >= 0 ? 'positive' : 'negative');
}

function bindTopLevelInputs() {
  ['ga_b4','ga_b5','ga_b6','ga_b7','ga_b8','ga_b9'].forEach(id => $(id).addEventListener('input', e => { state.gastos[id.split('_')[1]] = num(e.target.value); recalc(); }));
  ['ic_b4','ic_b5','ic_b6','ic_b7','ic_b8','ic_b9','ic_f8','ic_f9'].forEach(id => $(id).addEventListener('input', e => { state.interes[id.split('_')[1]] = num(e.target.value); recalc(); }));
  ['np_b5','np_b9','np_b10','np_b11','np_b12'].forEach(id => $(id).addEventListener('input', e => { state.paz[id.split('_')[1]] = num(e.target.value); recalc(); }));
  ['ra_b4','ra_b5','ra_b6','ra_b7','ra_b8','ra_b9','ra_b10','ra_b11','ra_b12','ra_b13','ra_b14','ra_b15','ra_b16'].forEach(id => $(id).addEventListener('input', e => { state.alquiler[id.split('_')[1]] = num(e.target.value); recalc(); }));
  ['pv_b4','pv_b5','pv_b6','pv_b7','pv_b8','pv_b9','pv_b10','pv_b11','pv_b12','pv_b13','pv_b14'].forEach(id => $(id).addEventListener('input', e => { state.vivienda[id.split('_')[1]] = num(e.target.value); recalc(); }));
  ['aa_b4','aa_b5'].forEach(id => $(id).addEventListener('input', e => { state.allocation[id.split('_')[1]] = num(e.target.value); recalc(); }));
  ['tb_b4','tb_b5','tb_b6','tb_b7'].forEach(id => $(id).addEventListener('input', e => { state.bolsillos[id.split('_')[1]] = num(e.target.value); recalc(); }));
}

function recalc() {
  const g = computeGastos();
  const ft = computeFondo(g);
  const ic = computeInteres();
  const np = computePaz(g);
  const ra = computeAlquiler();
  const pv = computeVivienda();
  const aa = computeAllocation();
  const tb = computeBolsillos();
  renderGastos(g); renderFondo(ft); renderInteres(ic); renderPaz(np); renderAlquiler(ra); renderVivienda(pv); renderAllocation(aa); renderBolsillos(tb); renderDashboard(g, ft, ic, np, ra, pv, aa, tb);
}

function initTabs() {
  document.querySelectorAll('.tab-btn').forEach(btn => btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    $('#tab-' + btn.dataset.tab).classList.add('active');
  }));
}

document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  bindTopLevelInputs();
  recalc();
});
