// ─── IS 456 Table 26 — Moment Coefficients ───
const MOMENT_COEFFICIENTS = {
  case1: { αxPos: 0.024, αxNeg: 0.032, αyPos: 0.024, αyNeg: 0.032 },
  case2: { αxPos: 0.028, αxNeg: 0.037, αyPos: 0.028, αyNeg: 0.037 },
  case3: { αxPos: 0.030, αxNeg: 0.039, αyPos: 0.030, αyNeg: 0.039 },
  case4: { αxPos: 0.035, αxNeg: 0.047, αyPos: 0.035, αyNeg: 0.047 },
  case5: { αxPos: 0.034, αxNeg: 0.046, αyPos: 0.034, αyNeg: 0.046 },
  case6: { αxPos: 0.035, αxNeg: 0.045, αyPos: 0.035, αyNeg: 0.045 },
  case7: { αxPos: 0.043, αxNeg: 0.057, αyPos: 0.043, αyNeg: 0.057 },
  case8: { αxPos: 0.042, αxNeg: 0.054, αyPos: 0.042, αyNeg: 0.054 },
  case9: { αxPos: 0.056, αxNeg: 0.0, αyPos: 0.056, αyNeg: 0.0 },
};

// Table 26 coefficients more precise (IS 456 Table 26 uses r=Ly/Lx)
// We compute based on r ratio per IS 456 Table 26 interpolation
function getMomentCoefficients(panelType, r) {
  // Table 26 entries for Case 4 (two adj. edges discontinuous)
  const tables = {
    case1: {
      r: [1.0, 1.1, 1.2, 1.3, 1.4, 1.5, 1.75, 2.0, 2.5, 3.0],
      axp: [0.024, 0.028, 0.032, 0.036, 0.039, 0.041, 0.045, 0.049, 0.052, 0.053],
      axn: [0.032, 0.037, 0.043, 0.047, 0.051, 0.053, 0.060, 0.065, 0.069, 0.070],
      ayp: [0.024, 0.023, 0.022, 0.021, 0.020, 0.019, 0.017, 0.016, 0.014, 0.013],
      ayn: [0.032, 0.030, 0.028, 0.026, 0.025, 0.024, 0.022, 0.020, 0.018, 0.017],
    },
    case2: {
      r: [1.0, 1.1, 1.2, 1.3, 1.4, 1.5, 1.75, 2.0, 2.5, 3.0],
      axp: [0.029, 0.033, 0.036, 0.039, 0.042, 0.044, 0.048, 0.052, 0.055, 0.056],
      axn: [0.038, 0.043, 0.047, 0.051, 0.055, 0.057, 0.064, 0.069, 0.074, 0.075],
      ayp: [0.029, 0.028, 0.026, 0.024, 0.023, 0.022, 0.019, 0.017, 0.015, 0.014],
      ayn: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
    },
    case3: {
      r: [1.0, 1.1, 1.2, 1.3, 1.4, 1.5, 1.75, 2.0, 2.5, 3.0],
      axp: [0.024, 0.028, 0.032, 0.036, 0.039, 0.041, 0.045, 0.049, 0.052, 0.053],
      axn: [0.032, 0.037, 0.043, 0.047, 0.051, 0.053, 0.060, 0.065, 0.069, 0.070],
      ayp: [0.024, 0.024, 0.023, 0.023, 0.022, 0.022, 0.020, 0.018, 0.016, 0.015],
      ayn: [0.032, 0.032, 0.031, 0.031, 0.030, 0.030, 0.027, 0.025, 0.022, 0.020],
    },
    case4: {
      r: [1.0, 1.1, 1.2, 1.3, 1.4, 1.5, 1.75, 2.0, 2.5, 3.0],
      axp: [0.035, 0.040, 0.045, 0.050, 0.054, 0.057, 0.062, 0.067, 0.070, 0.071],
      axn: [0.047, 0.053, 0.060, 0.065, 0.071, 0.076, 0.084, 0.091, 0.095, 0.097],
      ayp: [0.035, 0.033, 0.031, 0.029, 0.027, 0.026, 0.022, 0.019, 0.017, 0.016],
      ayn: [0.047, 0.045, 0.043, 0.041, 0.040, 0.039, 0.034, 0.029, 0.024, 0.022],
    },
    case5: {
      r: [1.0, 1.1, 1.2, 1.3, 1.4, 1.5, 1.75, 2.0, 2.5, 3.0],
      axp: [0.034, 0.038, 0.043, 0.047, 0.051, 0.053, 0.058, 0.062, 0.066, 0.067],
      axn: [0.046, 0.050, 0.058, 0.063, 0.068, 0.071, 0.077, 0.083, 0.087, 0.089],
      ayp: [0.034, 0.033, 0.031, 0.030, 0.029, 0.027, 0.024, 0.021, 0.019, 0.017],
      ayn: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
    },
    case6: {
      r: [1.0, 1.1, 1.2, 1.3, 1.4, 1.5, 1.75, 2.0, 2.5, 3.0],
      axp: [0.035, 0.040, 0.045, 0.050, 0.054, 0.057, 0.062, 0.067, 0.070, 0.071],
      axn: [0.045, 0.051, 0.057, 0.062, 0.067, 0.070, 0.078, 0.085, 0.089, 0.091],
      ayp: [0.035, 0.035, 0.034, 0.034, 0.034, 0.033, 0.031, 0.029, 0.025, 0.023],
      ayn: [0.047, 0.046, 0.045, 0.044, 0.044, 0.043, 0.041, 0.039, 0.033, 0.030],
    },
    case7: {
      r: [1.0, 1.1, 1.2, 1.3, 1.4, 1.5, 1.75, 2.0, 2.5, 3.0],
      axp: [0.043, 0.049, 0.055, 0.061, 0.065, 0.069, 0.074, 0.078, 0.082, 0.083],
      axn: [0.057, 0.065, 0.073, 0.081, 0.087, 0.092, 0.099, 0.104, 0.109, 0.110],
      ayp: [0.043, 0.041, 0.039, 0.037, 0.035, 0.033, 0.029, 0.026, 0.022, 0.020],
      ayn: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
    },
    case8: {
      r: [1.0, 1.1, 1.2, 1.3, 1.4, 1.5, 1.75, 2.0, 2.5, 3.0],
      axp: [0.042, 0.047, 0.053, 0.058, 0.062, 0.065, 0.071, 0.075, 0.079, 0.080],
      axn: [0.054, 0.061, 0.069, 0.076, 0.081, 0.085, 0.092, 0.097, 0.101, 0.103],
      ayp: [0.042, 0.042, 0.041, 0.041, 0.040, 0.039, 0.037, 0.035, 0.031, 0.028],
      ayn: [0.054, 0.054, 0.054, 0.054, 0.054, 0.054, 0.054, 0.054, 0.054, 0.054],
    },
    case9: {
      r: [1.0, 1.1, 1.2, 1.3, 1.4, 1.5, 1.75, 2.0, 2.5, 3.0],
      axp: [0.056, 0.062, 0.069, 0.074, 0.078, 0.080, 0.084, 0.086, 0.088, 0.089],
      axn: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
      ayp: [0.056, 0.053, 0.051, 0.048, 0.045, 0.043, 0.038, 0.034, 0.029, 0.025],
      ayn: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
    },
  };

  const t = tables[panelType] || tables['case4'];
  const rv = t.r;

  function interp(arr, r) {
    if (r <= rv[0]) return arr[0];
    if (r >= rv[rv.length - 1]) return arr[arr.length - 1];
    for (let i = 0; i < rv.length - 1; i++) {
      if (r >= rv[i] && r <= rv[i + 1]) {
        const frac = (r - rv[i]) / (rv[i + 1] - rv[i]);
        return arr[i] + frac * (arr[i + 1] - arr[i]);
      }
    }
    return arr[arr.length - 1];
  }

  return {
    αxPos: interp(t.axp, r),
    αxNeg: interp(t.axn, r),
    αyPos: interp(t.ayp, r),
    αyNeg: interp(t.ayn, r),
  };
}

function f(n, d = 3) { return n.toFixed(d); }

function calculate() {
  // ── READ INPUTS ──
  const Ly = parseFloat(document.getElementById('ly').value);
  const Lx = parseFloat(document.getElementById('lx').value);
  const D = parseFloat(document.getElementById('thickness').value);    // mm
  const cover = parseFloat(document.getElementById('cover').value);        // mm
  const fck = parseFloat(document.getElementById('fck').value);
  const fy = parseFloat(document.getElementById('fy').value);
  const ll = parseFloat(document.getElementById('ll').value);
  const ff = parseFloat(document.getElementById('ff').value);
  const density = parseFloat(document.getElementById('density').value);
  const phi = parseFloat(document.getElementById('barDia').value);
  const panelType = document.getElementById('panelType').value;

  // Ensure Lx <= Ly
  const shortSpan = Math.min(Lx, Ly);
  const longSpan = Math.max(Lx, Ly);

  // ── SEC 2: LOADS ──
  const selfWeight = (D / 1000) * density;                        // kN/m²
  const DL = selfWeight + ff;                              // kN/m²
  const totalLoad = DL + ll;                                     // kN/m²
  const wu = 1.5 * totalLoad;                             // kN/m² ultimate

  // ── SEC 3: SPAN & MOMENT COEFFICIENTS ──
  const r = longSpan / shortSpan;
  const coeff = getMomentCoefficients(panelType, r);

  const panelNames = {
    case1: 'Interior Panel', case2: 'One Short Edge Discontinuous',
    case3: 'One Long Edge Discontinuous', case4: 'Two Adjacent Edges Discontinuous',
    case5: 'Two Short Edges Discontinuous', case6: 'Two Long Edges Discontinuous',
    case7: 'Three Edges Disc. (Long Edge Cont.)', case8: 'Three Edges Disc. (Short Edge Cont.)',
    case9: 'Four Edges Discontinuous'
  };

  // ── SEC 4: DESIGN MOMENTS ──
  const MxPos = coeff.αxPos * wu * shortSpan * shortSpan;   // kNm/m
  const MxNeg = coeff.αxNeg * wu * shortSpan * shortSpan;
  const MyPos = coeff.αyPos * wu * shortSpan * shortSpan;
  const MyNeg = coeff.αyNeg * wu * shortSpan * shortSpan;

  // Critical moment for depth check
  const Mu_max = Math.max(MxPos, MxNeg, MyPos, MyNeg);

  // ── SEC 5: EFFECTIVE DEPTH ──
  // IS 456: d = D - cover - phi/2
  const d_x = D - cover - phi / 2;          // effective depth for short span
  const d_y = D - cover - phi - phi / 2;    // effective depth for long span (second layer)

  // Check d from bending: Mu = 0.138 * fck * b * d²
  const b = 1000; // per meter width (mm)
  const d_req = Math.sqrt((Mu_max * 1e6) / (0.138 * fck * b));  // mm

  // ── SEC 6: AREA OF STEEL (Main reinforcement) ──
  // As = Mu / (0.87 * fy * (d - xu/2))
  // Using simplified IS 456 formula: As = Mu*1e6 / (0.87*fy*(d - (0.42*xu)))
  // xu/d = (0.87*fy*As)/(0.36*fck*b*d), solve iteratively or use:
  // Mu = 0.87*fy*As*d*(1 - (fy*As)/(fck*b*d))
  // => quadratic in As

  function calcAs(Mu_kNm, d_mm) {
    const Mu = Mu_kNm * 1e6; // Nmm
    const a = (0.87 * fy * fy) / (fck * b * d_mm);
    const bCoef = -0.87 * fy * d_mm;
    const c = Mu;
    const disc = bCoef * bCoef - 4 * a * c;
    if (disc < 0) return null;
    const As = (-bCoef - Math.sqrt(disc)) / (2 * a);
    return As; // mm²/m
  }

  const As_xPos = calcAs(MxPos, d_x);
  const As_xNeg = calcAs(MxNeg, d_x);
  const As_yPos = calcAs(MyPos, d_y);
  const As_yNeg = calcAs(MyNeg, d_y);

  // Minimum steel (IS 456 clause 26.5.2.1): 0.12% of gross area for Fe415/500
  const As_min = (fy >= 415) ? 0.0012 * b * D : 0.0015 * b * D;

  const As_xPos_f = Math.max(As_xPos || 0, As_min);
  const As_xNeg_f = Math.max(As_xNeg || 0, As_min);
  const As_yPos_f = Math.max(As_yPos || 0, As_min);
  const As_yNeg_f = Math.max(As_yNeg || 0, As_min);

  // ── SEC 7: BAR SPACING ──
  const bar_area = Math.PI * phi * phi / 4;  // mm²

  function spacing(As) {
    const s = (bar_area / As) * 1000;
    // Round down to nearest 5mm, max 300mm (IS 456), min 75mm
    let sp = Math.min(300, Math.floor(s / 5) * 5);
    return Math.max(75, sp);
  }

  const sp_xPos = spacing(As_xPos_f);
  const sp_xNeg = spacing(As_xNeg_f);
  const sp_yPos = spacing(As_yPos_f);
  const sp_yNeg = spacing(As_yNeg_f);

  // Provided As
  const Asp_xPos = (bar_area / sp_xPos) * 1000;
  const Asp_xNeg = (bar_area / sp_xNeg) * 1000;
  const Asp_yPos = (bar_area / sp_yPos) * 1000;
  const Asp_yNeg = (bar_area / sp_yNeg) * 1000;

  // ── SEC 8: DISTRIBUTION REINFORCEMENT ──
  const As_dist = As_min;
  const sp_dist = spacing(As_dist);
  // Usually T8 @ 300 c/c
  const sp_dist_actual = Math.min(sp_dist, 300);

  // ── SEC 9: SHEAR CHECK ──
  // Vu = wu * Lx/2 (simply supported strip 1m wide)
  const Vu_x = wu * shortSpan / 2;   // kN/m
  const Vu_y = wu * longSpan / 2;   // kN/m

  // Nominal shear stress
  const tv_x = (Vu_x * 1000) / (b * d_x);   // N/mm²
  const tv_y = (Vu_y * 1000) / (b * d_y);

  // Concrete shear capacity IS 456 Table 19
  // τc = 0.16 * sqrt(fck) for pt < 0.15 (conservative)
  // More accurate: depends on pt (percent tension steel)
  const pt_x = (Asp_xPos / (b * d_x)) * 100;
  const pt_y = (Asp_yPos / (b * d_y)) * 100;

  function tauC(pt, fck) {
    // IS 456 Table 19 simplified
    const pts = [0.15, 0.25, 0.50, 0.75, 1.00, 1.25, 1.50, 1.75, 2.00, 2.25, 2.50, 2.75, 3.00];
    const tc20 = [0.28, 0.36, 0.48, 0.56, 0.62, 0.67, 0.72, 0.75, 0.79, 0.81, 0.82, 0.82, 0.82];
    const tc25 = [0.29, 0.36, 0.49, 0.57, 0.64, 0.70, 0.74, 0.78, 0.82, 0.85, 0.88, 0.90, 0.92];
    const tc30 = [0.29, 0.37, 0.50, 0.59, 0.66, 0.71, 0.76, 0.80, 0.84, 0.88, 0.91, 0.94, 0.96];
    const arr = fck >= 30 ? tc30 : fck >= 25 ? tc25 : tc20;
    const p = Math.min(pt, 3.0);
    if (p <= pts[0]) return arr[0];
    for (let i = 0; i < pts.length - 1; i++) {
      if (p >= pts[i] && p <= pts[i + 1]) {
        return arr[i] + (arr[i + 1] - arr[i]) * (p - pts[i]) / (pts[i + 1] - pts[i]);
      }
    }
    return arr[arr.length - 1];
  }

  const tc_x = tauC(pt_x, fck);
  const tc_y = tauC(pt_y, fck);

  const shear_x_ok = tv_x <= tc_x;
  const shear_y_ok = tv_y <= tc_y;

  // Required shear reinforcement if failing
  const Vs_x = shear_x_ok ? 0 : (Vu_x - tc_x * b * d_x / 1000);
  const Vs_y = shear_y_ok ? 0 : (Vu_y - tc_y * b * d_y / 1000);

  // Asv/s = Vs / (0.87*fy*d) * 1000
  const Asvs_x = shear_x_ok ? 0 : (Vs_x * 1000) / (0.87 * fy * d_x);
  const Asvs_y = shear_y_ok ? 0 : (Vs_y * 1000) / (0.87 * fy * d_y);

  // ── SEC 10: DEFLECTION CHECK ──
  // IS 456 clause 23.2 — Basic span/d ratios for two-way slabs
  // For two-way slab: treat as one-way for each direction
  const ld_short = shortSpan * 1000 / d_x;  // L/d provided
  const ld_long = longSpan * 1000 / d_y;

  // Basic L/d for simply supported = 20 (two-way: x1.0)
  const basic_ld = 20;
  // Modification factor for steel stress (simplified)
  const mf_x = Math.min(2.0, 310 / (0.58 * fy * (As_xPos_f / Asp_xPos)));
  const mf_y = Math.min(2.0, 310 / (0.58 * fy * (As_yPos_f / Asp_yPos)));
  const allow_ld_x = basic_ld * mf_x;
  const allow_ld_y = basic_ld * mf_y;

  // Minimum thickness per IS 456
  const min_D_short = (shortSpan * 1000) / (basic_ld * mf_x);
  const min_D_long = (longSpan * 1000) / (basic_ld * mf_y);

  const defl_x_ok = ld_short <= allow_ld_x;
  const defl_y_ok = ld_long <= allow_ld_y;
  const thick_ok = D >= min_D_short && D >= min_D_long;

  // ── SLAB TYPE DETERMINATION ──
  // IS 456: Two-way slab if Ly/Lx <= 2.0, else One-way slab
  const isOneWay = r > 2.0;
  const slabTypeLabel = isOneWay ? 'One-Way Slab' : 'Two-Way Slab';
  const slabTypeIcon = isOneWay ? '➡️' : '⬛';
  const slabTypeColor = isOneWay ? '#6C8EF5' : '#4CAF82';
  const slabTypeDesc = isOneWay
    ? `Ly/Lx = ${f(r, 3)} > 2.0 → Load transfers predominantly in the short direction only. Designed as one-way slab strips.`
    : `Ly/Lx = ${f(r, 3)} ≤ 2.0 → Load transfers in both directions. Designed using IS 456 Table 26 moment coefficients.`;

  // ── ASSUMED SLAB THICKNESS ──
  // One-way: D = Lx/20 (SS) to Lx/26 (continuous), cover+bar considered
  // Two-way: D = Lx/32 (rough rule), IS 456 recommends ~Lx/28 to Lx/35 for two-way
  const D_assume_ow_ss = Math.ceil((shortSpan * 1000) / 20 / 5) * 5;   // one-way simply supported
  const D_assume_ow_cont = Math.ceil((shortSpan * 1000) / 26 / 5) * 5;   // one-way continuous
  const D_assume_ow_cant = Math.ceil((shortSpan * 1000) / 10 / 5) * 5;   // one-way cantilever
  const D_assume_tw_ss = Math.ceil((shortSpan * 1000) / 28 / 5) * 5;   // two-way simply supported
  const D_assume_tw_cont = Math.ceil((shortSpan * 1000) / 32 / 5) * 5;   // two-way continuous
  // Minimum 100 mm per IS 456
  const D_ow_ss = Math.max(100, D_assume_ow_ss);
  const D_ow_cont = Math.max(100, D_assume_ow_cont);
  const D_ow_cant = Math.max(100, D_assume_ow_cant);
  const D_tw_ss = Math.max(100, D_assume_tw_ss);
  const D_tw_cont = Math.max(100, D_assume_tw_cont);
  const D_provided_status = isOneWay
    ? (D >= D_ow_cont && D <= D_ow_ss ? 'ok' : D < D_ow_cont ? 'thin' : 'heavy')
    : (D >= D_tw_cont && D <= D_tw_ss ? 'ok' : D < D_tw_cont ? 'thin' : 'heavy');
  const D_rec = isOneWay ? D_ow_ss : D_tw_ss;
  const D_min_rec = isOneWay ? D_ow_cont : D_tw_cont;

  // ─────────────────────────────────────────
  // BUILD HTML
  // ─────────────────────────────────────────
  const html = `
  <!-- SECTION 0: SLAB TYPE DETERMINATION -->
  <div class="result-section">
    <div class="rs-header">
      <span class="sec-num">§0</span>
      <h3>Slab Type Determination</h3>
    </div>
    <div class="rs-body">
      <div class="formula">IS 456 Cl. 24.1 — If Ly/Lx &gt; 2 → One-Way Slab &nbsp;|&nbsp; If Ly/Lx ≤ 2 → Two-Way Slab</div>
      <div class="sub-group">
        <div class="sub-group-title">Span Ratio Check</div>
        <div class="res-row"><span class="res-label">Short Span (Lx)</span><span class="res-val">${f(shortSpan, 3)}<span class="res-unit">m</span></span></div>
        <div class="res-row"><span class="res-label">Long Span (Ly)</span><span class="res-val">${f(longSpan, 3)}<span class="res-unit">m</span></span></div>
        <div class="res-row"><span class="res-label">Ly / Lx ratio (r)</span><span class="res-val">${f(r, 3)}</span></div>
        <div class="res-row"><span class="res-label">Threshold</span><span class="res-val">2.000 <span class="res-unit">(IS 456)</span></span></div>
      </div>
      <div style="background:${isOneWay ? 'rgba(108,142,245,0.10)' : 'rgba(76,175,130,0.10)'}; border:2px solid ${slabTypeColor}; border-radius:12px; padding:18px 20px; margin-top:10px; display:flex; align-items:center; gap:16px;">
        <div style="font-size:32px;">${slabTypeIcon}</div>
        <div>
          <div style="font-size:18px; font-weight:700; color:${slabTypeColor}; font-family:'JetBrains Mono',monospace;">${slabTypeLabel}</div>
          <div style="font-size:12px; color:var(--text-muted); margin-top:4px;">${slabTypeDesc}</div>
        </div>
      </div>
      ${isOneWay ? `<div class="warn-banner" style="margin-top:10px;">⚠️ Since Ly/Lx > 2.0, this panel behaves as a <strong>One-Way Slab</strong>. The moment coefficient method (IS 456 Table 26) is still applied for completeness, but the design should primarily follow one-way strip design in the short span direction.</div>` : `<div class="ok-banner" style="margin-top:10px;">✅ Ly/Lx ≤ 2.0 — This is a <strong>Two-Way Slab</strong>. Design proceeds using IS 456 Table 26 moment coefficients for both directions.</div>`}
    </div>
  </div>

  <!-- SECTION 1: ASSUMED SLAB THICKNESS -->
  <div class="result-section">
    <div class="rs-header">
      <span class="sec-num">§1</span>
      <h3>Assumed Slab Thickness (IS 456 Span/Depth Rules)</h3>
    </div>
    <div class="rs-body">
      <div class="formula">Rule of thumb based on short span Lx = ${f(shortSpan, 3)} m &nbsp;|&nbsp; Min. D = 100 mm (IS 456)</div>

      <!-- ONE-WAY THICKNESS TABLE -->
      <div class="sub-group">
        <div class="sub-group-title" style="color:${isOneWay ? '#6C8EF5' : 'var(--text-muted)'};">1.1 One-Way Slab — Assumed Thickness ${isOneWay ? '✦ (Active)' : ''}</div>
        <table>
          <thead>
            <tr><th>End Condition</th><th>L/d Ratio</th><th>Formula</th><th>Assumed D (mm)</th></tr>
          </thead>
          <tbody>
            <tr>
              <td>Simply Supported</td>
              <td>Lx / 20</td>
              <td>${f(shortSpan * 1000, 0)} / 20</td>
              <td style="color:var(--gold-light); font-weight:700;">${D_ow_ss} mm</td>
            </tr>
            <tr>
              <td>Continuous (Both ends)</td>
              <td>Lx / 26</td>
              <td>${f(shortSpan * 1000, 0)} / 26</td>
              <td style="color:var(--gold-light); font-weight:700;">${D_ow_cont} mm</td>
            </tr>
            <tr>
              <td>Cantilever</td>
              <td>Lx / 10</td>
              <td>${f(shortSpan * 1000, 0)} / 10</td>
              <td style="color:var(--gold-light); font-weight:700;">${D_ow_cant} mm</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- TWO-WAY THICKNESS TABLE -->
      <div class="sub-group">
        <div class="sub-group-title" style="color:${!isOneWay ? '#4CAF82' : 'var(--text-muted)'};">1.2 Two-Way Slab — Assumed Thickness ${!isOneWay ? '✦ (Active)' : ''}</div>
        <table>
          <thead>
            <tr><th>End Condition</th><th>L/d Ratio</th><th>Formula</th><th>Assumed D (mm)</th></tr>
          </thead>
          <tbody>
            <tr>
              <td>Simply Supported</td>
              <td>Lx / 28</td>
              <td>${f(shortSpan * 1000, 0)} / 28</td>
              <td style="color:var(--gold-light); font-weight:700;">${D_tw_ss} mm</td>
            </tr>
            <tr>
              <td>Continuous (Both ends)</td>
              <td>Lx / 32</td>
              <td>${f(shortSpan * 1000, 0)} / 32</td>
              <td style="color:var(--gold-light); font-weight:700;">${D_tw_cont} mm</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- PROVIDED VS RECOMMENDED -->
      <div class="sub-group">
        <div class="sub-group-title">1.3 Provided vs Recommended (${slabTypeLabel})</div>
        <div class="res-row"><span class="res-label">Recommended range (SS to Cont.)</span><span class="res-val">${D_min_rec} – ${D_rec}<span class="res-unit">mm</span></span></div>
        <div class="res-row"><span class="res-label">Provided D</span><span class="res-val">${D}<span class="res-unit">mm</span></span></div>
        ${D_provided_status === 'ok'
      ? `<div class="ok-banner">✅ Provided thickness D = ${D} mm is within the recommended range (${D_min_rec}–${D_rec} mm)</div>`
      : D_provided_status === 'thin'
        ? `<div class="warn-banner">⚠️ Provided D = ${D} mm is <strong>thinner</strong> than recommended minimum ${D_min_rec} mm for ${slabTypeLabel}. Consider increasing thickness.</div>`
        : `<div class="ok-banner" style="background:rgba(108,142,245,0.10);border-color:rgba(108,142,245,0.3);color:#6C8EF5;">ℹ️ Provided D = ${D} mm exceeds typical maximum ${D_rec} mm for ${slabTypeLabel}. Conservative — verify economy.</div>`}
      </div>
    </div>
  </div>

  <!-- SECTION 2: LOADS -->
  <div class="result-section">
    <div class="rs-header">
      <span class="sec-num">§2</span>
      <h3>Self-Weight &amp; Load Analysis</h3>
    </div>
    <div class="rs-body">
      <div class="formula">Self-weight = thickness × density of concrete</div>
      <div class="sub-group">
        <div class="sub-group-title">2.1 Self-Weight</div>
        <div class="res-row"><span class="res-label">Self-weight of slab</span><span class="res-val">${f(selfWeight)}<span class="res-unit">kN/m²</span></span></div>
      </div>
      <div class="sub-group">
        <div class="sub-group-title">2.2 Total Dead &amp; Live Loads</div>
        <div class="res-row"><span class="res-label">Dead Load (SW + FF)</span><span class="res-val">${f(DL)}<span class="res-unit">kN/m²</span></span></div>
        <div class="res-row"><span class="res-label">Live Load</span><span class="res-val">${f(ll)}<span class="res-unit">kN/m²</span></span></div>
        <div class="res-row"><span class="res-label">Total Load</span><span class="res-val">${f(totalLoad)}<span class="res-unit">kN/m²</span></span></div>
      </div>
      <div class="sub-group">
        <div class="sub-group-title">2.3 Ultimate Load (wu = 1.5 × Total)</div>
        <div class="highlight-box">
          <div class="hl-label">wu = 1.5 × Total Load</div>
          <div class="hl-val">${f(wu)} <span class="hl-unit">kN/m²</span></div>
        </div>
      </div>
    </div>
  </div>

  <!-- SECTION 3: SPAN & COEFFICIENTS -->
  <div class="result-section">
    <div class="rs-header">
      <span class="sec-num">§3</span>
      <h3>Span, Slab Type &amp; Moment Coefficients</h3>
    </div>
    <div class="rs-body">
      <div class="sub-group">
        <div class="sub-group-title">Span Classification</div>
        <div class="res-row"><span class="res-label">Short span Lx</span><span class="res-val">${f(shortSpan)}<span class="res-unit">m</span></span></div>
        <div class="res-row"><span class="res-label">Long span Ly</span><span class="res-val">${f(longSpan)}<span class="res-unit">m</span></span></div>
        <div class="res-row"><span class="res-label">Ly / Lx ratio (r)</span><span class="res-val">${f(r)}</span></div>
        <div class="res-row"><span class="res-label">Panel type</span><span class="res-val" style="font-size:11px;font-family:Inter,sans-serif;">${panelNames[panelType]}</span></div>
      </div>
      <div class="coeff-grid">
        <div class="coeff-card">
          <div class="cc-title">Short Span (x-direction)</div>
          <div class="cc-row"><span>Midspan +ve (αxPos)</span><span>${f(coeff.αxPos, 4)}</span></div>
          <div class="cc-row"><span>Support −ve (αxNeg)</span><span>${f(coeff.αxNeg, 4)}</span></div>
        </div>
        <div class="coeff-card">
          <div class="cc-title">Long Span (y-direction)</div>
          <div class="cc-row"><span>Midspan +ve (αyPos)</span><span>${f(coeff.αyPos, 4)}</span></div>
          <div class="cc-row"><span>Support −ve (αyNeg)</span><span>${f(coeff.αyNeg, 4)}</span></div>
        </div>
      </div>
    </div>
  </div>

  <!-- SECTION 4: DESIGN MOMENTS -->
  <div class="result-section">
    <div class="rs-header">
      <span class="sec-num">§4</span>
      <h3>Design Moments</h3>
    </div>
    <div class="rs-body">
      <div class="formula">M = α × wu × Lx²</div>
      <div class="two-col">
        <div class="sub-group">
          <div class="sub-group-title">Short Span Lx = ${f(shortSpan, 2)} m</div>
          <div class="res-row"><span class="res-label">Midspan +ve Mu</span><span class="res-val">${f(MxPos, 2)}<span class="res-unit">kNm/m</span></span></div>
          <div class="res-row"><span class="res-label">Support −ve Mu</span><span class="res-val">${f(MxNeg, 2)}<span class="res-unit">kNm/m</span></span></div>
        </div>
        <div class="sub-group">
          <div class="sub-group-title">Long Span Ly = ${f(longSpan, 2)} m</div>
          <div class="res-row"><span class="res-label">Midspan +ve Mu</span><span class="res-val">${f(MyPos, 2)}<span class="res-unit">kNm/m</span></span></div>
          <div class="res-row"><span class="res-label">Support −ve Mu</span><span class="res-val">${f(MyNeg, 2)}<span class="res-unit">kNm/m</span></span></div>
        </div>
      </div>
      <div class="res-row" style="background:rgba(245,196,0,0.07);border:1px solid rgba(245,196,0,0.2)">
        <span class="res-label" style="font-weight:600;">Critical Design Moment</span>
        <span class="res-val">${f(Mu_max, 2)}<span class="res-unit">kNm/m</span></span>
      </div>
    </div>
  </div>

  <!-- SECTION 5: EFFECTIVE DEPTH -->
  <div class="result-section">
    <div class="rs-header">
      <span class="sec-num">§5</span>
      <h3>Effective Depth</h3>
    </div>
    <div class="rs-body">
      <div class="formula">d = D − cover − ϕ/2 (short span) &nbsp;|&nbsp; d = D − cover − ϕ − ϕ/2 (long span)</div>
      <div class="two-col">
        <div class="sub-group">
          <div class="sub-group-title">Short Span (x-dir)</div>
          <div class="res-row"><span class="res-label">d (provided)</span><span class="res-val">${f(d_x, 1)}<span class="res-unit">mm</span></span></div>
        </div>
        <div class="sub-group">
          <div class="sub-group-title">Long Span (y-dir)</div>
          <div class="res-row"><span class="res-label">d (provided)</span><span class="res-val">${f(d_y, 1)}<span class="res-unit">mm</span></span></div>
        </div>
      </div>
      <div class="sub-group">
        <div class="sub-group-title">Check — Minimum d Required (from Mu_max)</div>
        <div class="formula">d_req = √(Mu / (0.138 × fck × b))</div>
        <div class="res-row"><span class="res-label">d required</span><span class="res-val">${f(d_req, 2)}<span class="res-unit">mm</span></span></div>
        <div class="res-row"><span class="res-label">d provided (short)</span><span class="res-val">${f(d_x, 1)}<span class="res-unit">mm</span></span></div>
        ${d_x >= d_req
      ? `<div class="ok-banner">✅ d provided (${f(d_x, 1)} mm) ≥ d required (${f(d_req, 2)} mm) — OK</div>`
      : `<div class="warn-banner">⚠️ d provided (${f(d_x, 1)} mm) &lt; d required (${f(d_req, 2)} mm) — Increase slab thickness!</div>`}
      </div>
    </div>
  </div>

  <!-- SECTION 6: AREA OF STEEL -->
  <div class="result-section">
    <div class="rs-header">
      <span class="sec-num">§6</span>
      <h3>Area of Steel — Main Reinforcement</h3>
    </div>
    <div class="rs-body">
      <div class="formula">As = Mu×10⁶ / (0.87×fy×s) &nbsp;|&nbsp; As_min = ${f(As_min, 0)} mm²/m (0.12% BH)</div>
      <div class="two-col">
        <div class="sub-group">
          <div class="sub-group-title">6.1 Short Span Lx</div>
          <div class="res-row"><span class="res-label">Midspan +ve As</span><span class="res-val">${f(As_xPos_f, 2)}<span class="res-unit">mm²/m</span></span></div>
          <div class="res-row"><span class="res-label">Support −ve As</span><span class="res-val">${f(As_xNeg_f, 2)}<span class="res-unit">mm²/m</span></span></div>
        </div>
        <div class="sub-group">
          <div class="sub-group-title">6.2 Long Span Ly</div>
          <div class="res-row"><span class="res-label">Midspan +ve As</span><span class="res-val">${f(As_yPos_f, 2)}<span class="res-unit">mm²/m</span></span></div>
          <div class="res-row"><span class="res-label">Support −ve As</span><span class="res-val">${f(As_yNeg_f, 2)}<span class="res-unit">mm²/m</span></span></div>
        </div>
      </div>
    </div>
  </div>

  <!-- SECTION 7: BAR SPACING TABLE -->
  <div class="result-section">
    <div class="rs-header">
      <span class="sec-num">§7</span>
      <h3>Bar Selection &amp; Spacing</h3>
    </div>
    <div class="rs-body">
      <div class="formula">φ${phi} mm bars &nbsp;|&nbsp; Abar = ${f(bar_area, 2)} mm² &nbsp;|&nbsp; s = (Abar / As) × 1000</div>
      <table>
        <thead>
          <tr>
            <th>Location</th>
            <th>Mu (kNm/m)</th>
            <th>Req. As (mm²/m)</th>
            <th>Bar</th>
            <th>Spacing (mm)</th>
            <th>Prov. As (mm²/m)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Short midspan</td>
            <td>${f(MxPos, 2)}</td>
            <td>${f(As_xPos_f, 2)}</td>
            <td>T${phi}</td>
            <td>${sp_xPos}</td>
            <td>${f(Asp_xPos, 2)}</td>
          </tr>
          <tr>
            <td>Short support</td>
            <td>${f(MxNeg, 2)}</td>
            <td>${f(As_xNeg_f, 2)}</td>
            <td>T${phi}</td>
            <td>${sp_xNeg}</td>
            <td>${f(Asp_xNeg, 2)}</td>
          </tr>
          <tr>
            <td>Long midspan</td>
            <td>${f(MyPos, 2)}</td>
            <td>${f(As_yPos_f, 2)}</td>
            <td>T${phi}</td>
            <td>${sp_yPos}</td>
            <td>${f(Asp_yPos, 2)}</td>
          </tr>
          <tr>
            <td>Long support</td>
            <td>${f(MyNeg, 2)}</td>
            <td>${f(As_yNeg_f, 2)}</td>
            <td>T${phi}</td>
            <td>${sp_yNeg}</td>
            <td>${f(Asp_yNeg, 2)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- SECTION 8: DISTRIBUTION REINF -->
  <div class="result-section">
    <div class="rs-header">
      <span class="sec-num">§8</span>
      <h3>Distribution Reinforcement</h3>
    </div>
    <div class="rs-body">
      <div class="formula">Minimum = 0.12% → ${f(As_min, 0)} mm²/m</div>
      <div class="res-row"><span class="res-label">Required As (minimum)</span><span class="res-val">${f(As_min, 0)}<span class="res-unit">mm²/m</span></span></div>
      <div class="res-row"><span class="res-label">Provided</span><span class="res-val">T8 bars @ ${sp_dist_actual} mm c/c (50.3 mm² each)</span></div>
      <div class="res-row"><span class="res-label">Prov. As</span><span class="res-val">${f((Math.PI * 64 / 4 / sp_dist_actual) * 1000, 2)}<span class="res-unit">mm²/m</span></span></div>
      <div class="ok-banner">ℹ️ Placed in both directions, on top of main bars</div>
    </div>
  </div>

  <!-- SECTION 9: SHEAR CHECK -->
  <div class="result-section">
    <div class="rs-header">
      <span class="sec-num">§9</span>
      <h3>Shear Check</h3>
    </div>
    <div class="rs-body">
      <div class="formula">Vu = wu × L/2 &nbsp;|&nbsp; τv = Vu×1000 / (b×d) &nbsp;|&nbsp; τc from IS 456 Table 19</div>
      <div class="two-col">
        <div class="sub-group">
          <div class="sub-group-title">Short Span (b = ${f(shortSpan, 2)} m)</div>
          <div class="res-row"><span class="res-label">Vu</span><span class="res-val">${f(Vu_x, 3)}<span class="res-unit">kN/m</span></span></div>
          <div class="res-row"><span class="res-label">τv (nominal)</span><span class="res-val">${f(tv_x, 4)}<span class="res-unit">N/mm²</span></span></div>
          <div class="res-row"><span class="res-label">pt (tension steel %)</span><span class="res-val">${f(pt_x, 4)}</span></div>
          <div class="res-row"><span class="res-label">τc (concrete capacity)</span><span class="res-val">${f(tc_x, 4)}<span class="res-unit">N/mm²</span></span></div>
          ${shear_x_ok
      ? `<div class="ok-banner">✅ τv (${f(tv_x, 4)}) ≤ τc (${f(tc_x, 4)}) — No stirrups needed</div>`
      : `<div class="warn-banner">⚠️ Shear fails → Need stirrups! Asv/s = ${f(Asvs_x, 6)} mm²/mm</div>`}
        </div>
        <div class="sub-group">
          <div class="sub-group-title">Long Span (b = ${f(longSpan, 2)} m)</div>
          <div class="res-row"><span class="res-label">Vu</span><span class="res-val">${f(Vu_y, 3)}<span class="res-unit">kN/m</span></span></div>
          <div class="res-row"><span class="res-label">τv (nominal)</span><span class="res-val">${f(tv_y, 4)}<span class="res-unit">N/mm²</span></span></div>
          <div class="res-row"><span class="res-label">pt (tension steel %)</span><span class="res-val">${f(pt_y, 4)}</span></div>
          <div class="res-row"><span class="res-label">τc (concrete capacity)</span><span class="res-val">${f(tc_y, 4)}<span class="res-unit">N/mm²</span></span></div>
          ${shear_y_ok
      ? `<div class="ok-banner">✅ τv (${f(tv_y, 4)}) ≤ τc (${f(tc_y, 4)}) — No stirrups needed</div>`
      : `<div class="warn-banner">⚠️ Shear fails along long span → Need stirrups! Asv/s = ${f(Asvs_y, 6)} mm²/mm</div>`}
        </div>
      </div>
    </div>
  </div>

  <!-- SECTION 10: DEFLECTION -->
  <div class="result-section">
    <div class="rs-header">
      <span class="sec-num">§10</span>
      <h3>Deflection Check (IS 456 Cl. 23.2)</h3>
    </div>
    <div class="rs-body">
      <div class="formula">Allowable L/d = basic L/d × modification factor (MF)</div>
      <div class="sub-group">
        <div class="sub-group-title">Step 1 — Span-to-Depth Ratio (Provided)</div>
        <div class="two-col">
          <div class="res-row"><span class="res-label">Short Span L/d</span><span class="res-val">${f(ld_short, 2)}</span></div>
          <div class="res-row"><span class="res-label">Long Span L/d</span><span class="res-val">${f(ld_long, 2)}</span></div>
        </div>
      </div>
      <div class="sub-group">
        <div class="sub-group-title">Step 2 — Allowable L/d (Basic = 20, SS)</div>
        <div class="two-col">
          <div class="res-row"><span class="res-label">MF (short span)</span><span class="res-val">${f(mf_x, 3)}</span></div>
          <div class="res-row"><span class="res-label">MF (long span)</span><span class="res-val">${f(mf_y, 3)}</span></div>
          <div class="res-row"><span class="res-label">Allow. L/d (short)</span><span class="res-val">${f(allow_ld_x, 2)}</span></div>
          <div class="res-row"><span class="res-label">Allow. L/d (long)</span><span class="res-val">${f(allow_ld_y, 2)}</span></div>
        </div>
      </div>
      <div class="sub-group">
        <div class="sub-group-title">Step 3 — Minimum Thickness Check (IS 456 L/20)</div>
        <div class="two-col">
          <div class="res-row"><span class="res-label">Min D (short span)</span><span class="res-val">${f(min_D_short, 2)}<span class="res-unit">mm</span></span></div>
          <div class="res-row"><span class="res-label">Min D (long span)</span><span class="res-val">${f(min_D_long, 2)}<span class="res-unit">mm</span></span></div>
        </div>
        <div class="res-row"><span class="res-label">Provided D</span><span class="res-val">${D}<span class="res-unit">mm</span></span></div>
        ${thick_ok
      ? `<div class="ok-banner">✅ D = ${D} mm satisfies minimum thickness requirement</div>`
      : `<div class="warn-banner">⚠️ Slab D = ${D} mm is too thin (min required: ${f(Math.max(min_D_short, min_D_long), 1)} mm) → may deflect excessively</div>`}
      </div>
      <hr class="divider">
      <table>
        <thead>
          <tr><th>Span</th><th>Provided L/d</th><th>Allowed L/d</th><th>Status</th></tr>
        </thead>
        <tbody>
          <tr>
            <td>Short span</td>
            <td>${f(ld_short, 2)}</td>
            <td>${f(allow_ld_x, 2)}</td>
            <td><span class="badge ${defl_x_ok ? 'badge-ok' : 'badge-fail'}">${defl_x_ok ? 'OK ✓' : 'FAIL ✗'}</span></td>
          </tr>
          <tr>
            <td>Long span</td>
            <td>${f(ld_long, 2)}</td>
            <td>${f(allow_ld_y, 2)}</td>
            <td><span class="badge ${defl_y_ok ? 'badge-ok' : 'badge-fail'}">${defl_y_ok ? 'OK ✓' : 'FAIL ✗'}</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  `;

  document.getElementById('resultsArea').innerHTML = html;
  document.getElementById('resultsArea').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Auto-calculate on load
window.addEventListener('load', calculate);

// Auto-recalculate on any input change
document.addEventListener('change', (e) => {
  if (e.target.matches('input, select')) calculate();
});
document.addEventListener('input', (e) => {
  if (e.target.matches('input[type="number"]')) calculate();
});