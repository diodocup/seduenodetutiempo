document.addEventListener('DOMContentLoaded', () => {
  const fmtEUR = (n) => new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0
  }).format(Number.isFinite(n) ? n : 0);

  const fmtPct = (n, digits = 1) => `${(Number.isFinite(n) ? n : 0).toFixed(digits)}%`;
  const fmtNum = (n, digits = 0) => new Intl.NumberFormat('es-ES', {
    maximumFractionDigits: digits,
    minimumFractionDigits: digits
  }).format(Number.isFinite(n) ? n : 0);

  const getNum = (id) => {
    const el = document.getElementById(id);
    if (!el) return 0;
    const v = parseFloat(el.value);
    return Number.isFinite(v) ? v : 0;
  };

  const setText = (id, txt, cls = '') => {
    const el = document.getElementById(id);
    if (!el) return;
    el.textContent = txt;
    el.className = cls;
  };

  function pmt(rate, nper, pv) {
    if (nper <= 0) return 0;
    if (rate === 0) return pv / nper;
    return (rate * pv) / (1 - Math.pow(1 + rate, -nper));
  }

  function fv(rate, nper, pmtValue, pv = 0) {
    if (rate === 0) return -(pv + pmtValue * nper);
    return -(pv * Math.pow(1 + rate, nper) + pmtValue * ((Math.pow(1 + rate, nper) - 1) / rate));
  }

  function remainingBalance(principal, annualRate, years, yearsPaid) {
    const monthlyRate = annualRate / 12;
    const n = years * 12;
    const paid = Math.max(0, Math.min(n, Math.round(yearsPaid * 12)));
    if (principal <= 0) return 0;
    if (monthlyRate === 0) {
      const monthly = principal / n;
      return Math.max(0, principal - monthly * paid);
    }
    const payment = pmt(monthlyRate, n, principal);
    return principal * Math.pow(1 + monthlyRate, paid) - payment * ((Math.pow(1 + monthlyRate, paid) - 1) / monthlyRate);
  }

  function valueOrZero(n) {
    return Number.isFinite(n) ? Math.max(0, n) : 0;
  }

  function gastosResults() {
    const ingreso = getNum('ga_ingreso');
    const alquiler = getNum('ga_alquiler');
    const obj = getNum('ga_obj') / 100;
    const saldoFondo = getNum('ga_fondo');
    const capital = getNum('ga_capital');
    const equity = getNum('ga_equity');

    const avg = (...ids) => ids.map(getNum).reduce((a, b) => a + b, 0) / ids.length;
    const vivienda = avg('g_viv_1', 'g_viv_2', 'g_viv_3');
    const comida = avg('g_com_1', 'g_com_2', 'g_com_3');
    const transporte = avg('g_tra_1', 'g_tra_2', 'g_tra_3');
    const ocio = avg('g_oci_1', 'g_oci_2', 'g_oci_3');
    const vicios = avg('g_vic_1', 'g_vic_2', 'g_vic_3');
    const suscripciones = avg('g_sus_1', 'g_sus_2', 'g_sus_3');

    const ingresosTotales = ingreso + alquiler;
    const necesario = vivienda + comida + transporte;
    const discrecional = ocio + vicios + suscripciones;
    const total = necesario + discrecional;
    const ahorro = ingresosTotales - total;
    const tasa = ingresosTotales ? ahorro / ingresosTotales : 0;
    const ahorroObjetivo = ingresosTotales * obj;

    return { ingreso, alquiler, obj, saldoFondo, capital, equity, ingresosTotales, necesario, discrecional, total, ahorro, tasa, ahorroObjetivo };
  }

  function renderGastos() {
    const r = gastosResults();
    setText('ga_out_ingresos', fmtEUR(r.ingresosTotales));
    setText('ga_out_necesario', fmtEUR(r.necesario));
    setText('ga_out_discrecional', fmtEUR(r.discrecional));
    setText('ga_out_total', fmtEUR(r.total));
    setText('ga_out_ahorro', fmtEUR(r.ahorro), r.ahorro >= 0 ? 'positive' : 'negative');
    setText('ga_out_tasa', fmtPct(r.tasa * 100), r.tasa >= r.obj ? 'positive' : 'warning');
  }

  function renderFondo() {
    const r = gastosResults();
    setText('ft_gasto', fmtEUR(r.necesario));
    setText('ft_saldo', fmtEUR(r.saldoFondo));
    const cobertura = r.necesario ? r.saldoFondo / r.necesario : 0;
    setText('ft_cobertura', `${fmtNum(cobertura, 1)} meses`, cobertura >= 6 ? 'positive' : cobertura >= 3 ? 'warning' : 'negative');
    setText('ft_objetivo', fmtEUR(r.necesario * 6));

    const tbody = document.getElementById('ft_table');
    if (!tbody) return;
    tbody.innerHTML = '';
    const comments = { 3: 'Mínimo razonable', 4: 'Suficiente', 5: 'Suficiente', 6: 'Robusto' };
    [3, 4, 5, 6].forEach(m => {
      const target = r.necesario * m;
      const gap = r.saldoFondo - target;
      const estado = gap >= 0 ? 'Cumplido' : 'Pendiente';
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${m}</td><td>${fmtEUR(target)}</td><td class="${gap >= 0 ? 'positive' : 'negative'}">${fmtEUR(gap)}</td><td>${estado}</td><td>${comments[m]}</td>`;
      tbody.appendChild(tr);
    });
  }

  function renderInteres() {
    const capital = getNum('ic_capital');
    const aport = getNum('ic_aportacion');
    const rent = getNum('ic_rent') / 100;
    const anios = getNum('ic_anios');
    const infl = getNum('ic_inflacion') / 100;
    const espera = getNum('ic_espera');
    const hormiga = getNum('ic_hormiga');
    const hormAnios = getNum('ic_hormiga_anios');
    const mRate = rent / 12;

    const hoy = fv(mRate, anios * 12, -aport, -capital);
    const siEspera = espera >= anios ? 0 : fv(mRate, (anios - espera) * 12, -aport, -capital);
    const coste = hoy - siEspera;
    const nominal = hoy;
    const aportado = capital + aport * 12 * anios;
    const ganancia = nominal - aportado;
    const real = nominal / Math.pow(1 + infl, anios);
    const perdido = fv(mRate, hormAnios * 12, -hormiga, 0);

    setText('ic_hoy', fmtEUR(hoy));
    setText('ic_esperado', fmtEUR(siEspera));
    setText('ic_coste', fmtEUR(coste), coste > 0 ? 'negative' : '');
    setText('ic_nominal', fmtEUR(nominal));
    setText('ic_aportado', fmtEUR(aportado));
    setText('ic_ganancia', fmtEUR(ganancia), ganancia >= 0 ? 'positive' : 'negative');
    setText('ic_real', fmtEUR(real));
    setText('ic_perdido', fmtEUR(perdido), 'negative');
  }

  function renderPaz() {
    const g = gastosResults();
    const gastoManual = getNum('np_gasto_manual');
    const gastoCons = gastoManual > 0 ? gastoManual : g.total;
    const capital = getNum('np_capital') || g.capital;
    const aportacion = getNum('np_aportacion') || Math.max(g.ahorro, 0) * 12;
    const mult25 = getNum('np_mult25');
    const mult28 = getNum('np_mult28');
    const mult30 = getNum('np_mult30');

    const anual = gastoCons * 12;
    const n25 = anual * mult25;
    const n28 = anual * mult28;
    const n30 = anual * mult30;
    const p25 = n25 ? capital / n25 : 0;
    const p28 = n28 ? capital / n28 : 0;
    const p30 = n30 ? capital / n30 : 0;

    let estado, comentario;
    if (p25 < 0.10) {
      estado = 'Arranque';
      comentario = 'Construyendo base';
    } else if (p25 < 0.50) {
      estado = 'Hibridación';
      comentario = 'Ya reduce dependencia';
    } else if (p25 < 1) {
      estado = 'Transición avanzada';
      comentario = 'Se acerca al objetivo';
    } else {
      estado = 'Tranquilidad total';
      comentario = 'Objetivo alcanzado';
    }

    setText('np_anual', fmtEUR(anual));
    setText('np_25', fmtEUR(n25));
    setText('np_28', fmtEUR(n28));
    setText('np_30', fmtEUR(n30));
    setText('np_prog25', fmtPct(p25 * 100), p25 >= 1 ? 'positive' : p25 >= 0.5 ? 'warning' : '');
    setText('np_prog28', fmtPct(p28 * 100));
    setText('np_prog30', fmtPct(p30 * 100));
    setText('np_estado', estado, p25 >= 1 ? 'positive' : p25 >= 0.5 ? 'warning' : '');
    setText('np_comentario', `${comentario}. Aportación anual estimada: ${fmtEUR(aportacion)}.`);
  }

  function renderAlquiler() {
    const precio = getNum('ra_precio');
    const alquilerMensual = getNum('ra_alquiler');
    const gastosCompraPct = getNum('ra_compra_gastos') / 100;
    const ibi = getNum('ra_ibi');
    const comunidad = getNum('ra_comunidad');
    const segH = getNum('ra_seguro_hogar');
    const segI = getNum('ra_seguro_impago');
    const mant = getNum('ra_mantenimiento');
    const otros = getNum('ra_otros');
    const financiado = getNum('ra_financiado') / 100;
    const interes = getNum('ra_interes') / 100;
    const plazo = getNum('ra_plazo');
    const reforma = getNum('ra_reforma');

    const alquilerAnual = alquilerMensual * 12;
    const gastosCompra = precio * gastosCompraPct;
    const hipoteca = precio * financiado;
    const cuota = pmt(interes / 12, plazo * 12, hipoteca);
    const operativos = ibi + comunidad + segH + segI + mant + otros;
    const netoAntes = alquilerAnual - operativos;
    const bruta = precio ? alquilerAnual / precio : 0;
    const costeTotalActivo = precio + gastosCompra + reforma;
    const neta = costeTotalActivo ? netoAntes / costeTotalActivo : 0;
    const cashflowMensual = (netoAntes - cuota * 12) / 12;
    const capitalInicial = (precio * (1 - financiado)) + gastosCompra + reforma;
    const roi = capitalInicial ? ((cashflowMensual * 12) / capitalInicial) : 0;

    let lectura = 'Merece revisión';
    if (bruta >= 0.08 && neta >= 0.05 && cashflowMensual > 0) lectura = 'Operación sana';

    setText('ra_anual', fmtEUR(alquilerAnual));
    setText('ra_gastos_compra', fmtEUR(gastosCompra));
    setText('ra_hipoteca', fmtEUR(hipoteca));
    setText('ra_cuota', fmtEUR(cuota));
    setText('ra_operativos', fmtEUR(operativos));
    setText('ra_neto_antes', fmtEUR(netoAntes));
    setText('ra_bruta', fmtPct(bruta * 100), bruta >= 0.08 ? 'positive' : 'warning');
    setText('ra_neta', fmtPct(neta * 100), neta >= 0.05 ? 'positive' : 'warning');
    setText('ra_cashflow', fmtEUR(cashflowMensual), cashflowMensual > 0 ? 'positive' : 'negative');
    setText('ra_inicial', fmtEUR(capitalInicial));
    setText('ra_roi', fmtPct(roi * 100), roi > 0 ? 'positive' : 'negative');
    setText('ra_lectura', lectura, lectura === 'Operación sana' ? 'positive' : 'warning');
  }

  function renderVivienda() {
    const precio = getNum('pv_precio');
    const financiacion = getNum('pv_financiacion') / 100;
    const gastosPct = getNum('pv_gastos') / 100;
    const ahorros = getNum('pv_ahorros');
    const ahorroMensual = getNum('pv_ahorro_mensual');
    const interes = getNum('pv_interes') / 100;
    const plazo = getNum('pv_plazo');
    const alquilerActual = getNum('pv_alquiler_actual');
    const aniosSalto = getNum('pv_anios_salto');
    const reval = getNum('pv_reval') / 100;
    const siguiente = getNum('pv_siguiente');

    const entrada = precio * (1 - financiacion);
    const gastosCompra = precio * gastosPct;
    const necesario = entrada + gastosCompra;
    const gap = Math.max(necesario - ahorros, 0);
    const meses = ahorroMensual > 0 ? gap / ahorroMensual : Infinity;
    const hipoteca = precio * financiacion;
    const cuota = pmt(interes / 12, plazo * 12, hipoteca);
    const cuotaVsAlquiler = alquilerActual - cuota;
    const valorFuturo = precio * Math.pow(1 + reval, aniosSalto);
    const pendiente = remainingBalance(hipoteca, interes, plazo, aniosSalto);
    const equity = valueOrZero(valorFuturo - pendiente);
    const entradaSig = siguiente * (1 - financiacion);
    const cobertura = entradaSig ? equity / entradaSig : 0;

    setText('pv_entrada', fmtEUR(entrada));
    setText('pv_gastos_compra', fmtEUR(gastosCompra));
    setText('pv_total_necesario', fmtEUR(necesario));
    setText('pv_gap', fmtEUR(gap), gap === 0 ? 'positive' : 'warning');
    setText('pv_meses', Number.isFinite(meses) ? `${fmtNum(meses, 0)} meses` : 'No calculable');
    setText('pv_cuota', fmtEUR(cuota));
    setText('pv_vs_alquiler', fmtEUR(cuotaVsAlquiler), cuotaVsAlquiler >= 0 ? 'positive' : 'negative');
    setText('pv_valor_futuro', fmtEUR(valorFuturo));
    setText('pv_pendiente', fmtEUR(pendiente));
    setText('pv_equity', fmtEUR(equity), 'positive');
    setText('pv_entrada_sig', fmtEUR(entradaSig));
    setText('pv_cobertura', fmtPct(cobertura * 100), cobertura >= 1 ? 'positive' : 'warning');
  }

  function renderAllocation() {
    const anios = getNum('aa_anios');
    const equity = getNum('aa_equity');
    const liquido = getNum('aa_liquido');
    const total = equity + liquido;
    const pctInmo = total ? equity / total : 0;
    const pctLiq = total ? liquido / total : 0;

    let etapa = 'Cosecha / libertad', rv = .55, rf = .35, ob = .10;
    if (anios > 15) {
      etapa = 'Acumulación';
      rv = .80; rf = .10; ob = .10;
    } else if (anios > 5) {
      etapa = 'Transición';
      rv = .60; rf = .30; ob = .10;
    } else if (anios > 0) {
      etapa = 'Conservación';
      rv = .35; rf = .55; ob = .10;
    }

    let diag = 'Equilibrándose', idea = 'Mantén equilibrio y rebalanceo';
    if (pctInmo > .70) {
      diag = 'Mucho peso en ladrillo';
      idea = 'Prioriza liquidez e inversión financiera';
    } else if (pctInmo < .30) {
      diag = 'Patrimonio poco expuesto a inmobiliario';
      idea = 'Puedes estar infraexpuesto a inmobiliario';
    }

    setText('aa_total', fmtEUR(total));
    setText('aa_inmo', fmtPct(pctInmo * 100));
    setText('aa_liq', fmtPct(pctLiq * 100));
    setText('aa_etapa', etapa);
    setText('aa_diag', diag, pctInmo > .70 ? 'warning' : pctInmo < .30 ? 'warning' : 'positive');
    setText('aa_idea', idea);

    const rvBar = document.getElementById('aa_bar_rv');
    const rfBar = document.getElementById('aa_bar_rf');
    const obBar = document.getElementById('aa_bar_ob');
    if (rvBar) rvBar.style.width = `${rv * 100}%`;
    if (rfBar) rfBar.style.width = `${rf * 100}%`;
    if (obBar) obBar.style.width = `${ob * 100}%`;
  }

  function renderTresBolsillos() {
    const a = getNum('tb_a');
    const b = getNum('tb_b');
    const gastos = getNum('tb_gastos');
    const ahorro = getNum('tb_ahorro');
    const total = a + b;
    const pctA = total ? a / total : 0;
    const pctB = total ? b / total : 0;
    const apA = (gastos + ahorro) * pctA;
    const apB = (gastos + ahorro) * pctB;
    const restA = a - apA;
    const restB = b - apB;

    setText('tb_total', fmtEUR(total));
    setText('tb_pct_a', fmtPct(pctA * 100));
    setText('tb_pct_b', fmtPct(pctB * 100));
    setText('tb_ap_a', fmtEUR(apA));
    setText('tb_ap_b', fmtEUR(apB));
    setText('tb_rest_a', fmtEUR(restA), restA >= 0 ? 'positive' : 'negative');
    setText('tb_rest_b', fmtEUR(restB), restB >= 0 ? 'positive' : 'negative');
  }

  function renderAll() {
    renderGastos();
    renderFondo();
    renderInteres();
    renderPaz();
    renderAlquiler();
    renderVivienda();
    renderAllocation();
    renderTresBolsillos();
  }

  document.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', renderAll);
    input.addEventListener('change', renderAll);
  });

  document.querySelectorAll('.tab-button').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const panel = document.getElementById(`tab-${btn.dataset.tab}`);
      if (panel) panel.classList.add('active');
    });
  });

  renderAll();
});
