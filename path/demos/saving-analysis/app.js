// ============================================
//  WEDDING CODING — Preventivo Matrimonio
//  app.js — Logica applicazione
// ============================================

const CATEGORIES = [
  { id: 'venue',       icon: '🏛️',  name: 'Location',            items: [{ name: 'Affitto location cerimonia', amount: '' }, { name: 'Affitto location ricevimento', amount: '' }] },
  { id: 'catering',    icon: '🍽️',  name: 'Catering & Banchetto', items: [{ name: 'Menu per persona', amount: '' }, { name: 'Torta nuziale', amount: '' }, { name: 'Bevande', amount: '' }] },
  { id: 'foto',        icon: '📷',  name: 'Fotografia & Video',   items: [{ name: 'Fotografo', amount: '' }, { name: 'Videomaker', amount: '' }] },
  { id: 'fiori',       icon: '💐',  name: 'Fiori & Decorazioni',  items: [{ name: 'Bouquet sposa', amount: '' }, { name: 'Centrotavola', amount: '' }, { name: 'Addobbi chiesa/sala', amount: '' }] },
  { id: 'abiti',       icon: '👗',  name: 'Abiti & Bellezza',     items: [{ name: 'Abito sposa', amount: '' }, { name: 'Abito sposo', amount: '' }, { name: 'Acconciatura & Trucco', amount: '' }] },
  { id: 'musica',      icon: '🎶',  name: 'Musica & Intrattenimento', items: [{ name: 'DJ / Band', amount: '' }, { name: 'Animazione', amount: '' }] },
  { id: 'cancelleria', icon: '✉️',  name: 'Partecipazioni & Bomboniere', items: [{ name: 'Partecipazioni', amount: '' }, { name: 'Menu & Tableau', amount: '' }, { name: 'Bomboniere', amount: '' }] },
  { id: 'trasporti',   icon: '🚗',  name: 'Trasporti',            items: [{ name: 'Auto sposi', amount: '' }, { name: 'Navette ospiti', amount: '' }] },
  { id: 'viaggio',     icon: '✈️',  name: 'Viaggio di Nozze',    items: [{ name: 'Luna di miele', amount: '' }, { name: 'Prima notte hotel', amount: '' }] },
  { id: 'altro',       icon: '💍',  name: 'Altro',                items: [{ name: 'Fedi nuziali', amount: '' }, { name: 'Officiante', amount: '' }, { name: 'Imprevisti', amount: '' }] },
];

// Stato in memoria (nessun DB, solo JS)
let state = {
  budget: 0,
  guests: 0,
  categories: CATEGORIES.map(c => ({
    ...c,
    collapsed: false,
    items: c.items.map(i => ({ ...i, id: uid() }))
  }))
};

// ---- Utility ----
function uid() {
  return Math.random().toString(36).slice(2, 9);
}
function fmt(n) {
  if (!n || isNaN(n)) return '€ 0';
  return '€ ' + Number(n).toLocaleString('it-IT', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}
function parseMoney(val) {
  const n = parseFloat(String(val).replace(',', '.'));
  return isNaN(n) ? 0 : n;
}

// ---- Render ----
function render() {
  renderCategories();
  recalc();
}

function renderCategories() {
  const grid = document.getElementById('categoriesGrid');
  grid.innerHTML = '';
  state.categories.forEach(cat => {
    const card = document.createElement('div');
    card.className = 'cat-card' + (cat.collapsed ? ' collapsed' : '');
    card.id = 'cat-' + cat.id;

    const catTotal = cat.items.reduce((s, i) => s + parseMoney(i.amount), 0);

    card.innerHTML = `
      <div class="cat-header" onclick="toggleCat('${cat.id}')">
        <div class="cat-header-left">
          <span class="cat-icon">${cat.icon}</span>
          <span class="cat-name">${cat.name}</span>
        </div>
        <div style="display:flex;align-items:center;gap:0.4rem">
          <span class="cat-total">${catTotal > 0 ? fmt(catTotal) : ''}</span>
          <span class="cat-toggle">▾</span>
        </div>
      </div>
      <div class="cat-body">
        <div class="item-list" id="items-${cat.id}">
          ${cat.items.map(item => renderItemRow(cat.id, item)).join('')}
        </div>
        <button class="btn-add-item" onclick="addItem('${cat.id}')">+ Aggiungi voce</button>
      </div>
    `;
    grid.appendChild(card);
  });
}

function renderItemRow(catId, item) {
  return `
    <div class="item-row" id="row-${item.id}">
      <input
        class="item-name"
        type="text"
        placeholder="Descrizione..."
        value="${escHtml(item.name)}"
        onchange="updateItem('${catId}','${item.id}','name',this.value)"
      />
      <input
        class="item-amount"
        type="number"
        placeholder="€ 0"
        min="0"
        value="${item.amount}"
        onchange="updateItem('${catId}','${item.id}','amount',this.value)"
        oninput="updateItem('${catId}','${item.id}','amount',this.value)"
      />
      <button class="item-delete" title="Rimuovi" onclick="deleteItem('${catId}','${item.id}')">✕</button>
    </div>
  `;
}

function escHtml(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// ---- Actions ----
function toggleCat(catId) {
  const cat = state.categories.find(c => c.id === catId);
  if (cat) cat.collapsed = !cat.collapsed;
  const card = document.getElementById('cat-' + catId);
  if (card) card.classList.toggle('collapsed', cat.collapsed);
}

function addItem(catId) {
  const cat = state.categories.find(c => c.id === catId);
  if (!cat) return;
  const newItem = { id: uid(), name: '', amount: '' };
  cat.items.push(newItem);

  const list = document.getElementById('items-' + catId);
  if (list) {
    const div = document.createElement('div');
    div.innerHTML = renderItemRow(catId, newItem);
    list.appendChild(div.firstElementChild);
  }
  recalc();
}

function updateItem(catId, itemId, field, value) {
  const cat = state.categories.find(c => c.id === catId);
  if (!cat) return;
  const item = cat.items.find(i => i.id === itemId);
  if (item) item[field] = value;

  // Aggiorna il totale nell'header della card senza re-render completo
  updateCatHeader(catId);
  recalc();
}

function deleteItem(catId, itemId) {
  const cat = state.categories.find(c => c.id === catId);
  if (!cat) return;
  cat.items = cat.items.filter(i => i.id !== itemId);
  const row = document.getElementById('row-' + itemId);
  if (row) row.remove();
  updateCatHeader(catId);
  recalc();
}

function updateCatHeader(catId) {
  const cat = state.categories.find(c => c.id === catId);
  if (!cat) return;
  const catTotal = cat.items.reduce((s, i) => s + parseMoney(i.amount), 0);
  const card = document.getElementById('cat-' + catId);
  if (card) {
    const totalEl = card.querySelector('.cat-total');
    if (totalEl) totalEl.textContent = catTotal > 0 ? fmt(catTotal) : '';
  }
}

// ---- Recalculate summary ----
function recalc() {
  const budget = state.budget;
  const guests = state.guests;

  let totalSpent = 0;
  state.categories.forEach(cat => {
    cat.items.forEach(i => { totalSpent += parseMoney(i.amount); });
  });

  const remaining = budget - totalSpent;
  const pct = budget > 0 ? Math.min((totalSpent / budget) * 100, 100) : 0;
  const perGuest = guests > 0 ? totalSpent / guests : 0;

  document.getElementById('sumTotal').textContent = budget > 0 ? fmt(budget) : '—';
  document.getElementById('sumSpent').textContent = fmt(totalSpent);
  document.getElementById('sumRemaining').textContent = budget > 0 ? fmt(remaining) : '—';
  document.getElementById('sumPerGuest').textContent = guests > 0 ? fmt(perGuest) : '—';

  const fill = document.getElementById('progressFill');
  fill.style.width = pct + '%';
  fill.classList.toggle('over', totalSpent > budget && budget > 0);
  document.getElementById('progressPct').textContent = budget > 0 ? Math.round((totalSpent / budget) * 100) + '%' : '—';

  // Color remaining
  const remEl = document.getElementById('sumRemaining');
  if (budget > 0) {
    remEl.style.color = remaining < 0 ? 'var(--danger)' : 'var(--success)';
  } else {
    remEl.style.color = '';
  }

  renderTotalsTable(totalSpent);
}

function renderTotalsTable(grandTotalAmt) {
  const tbody = document.getElementById('totalsBody');
  tbody.innerHTML = '';

  state.categories.forEach(cat => {
    const catTotal = cat.items.reduce((s, i) => s + parseMoney(i.amount), 0);
    if (catTotal === 0) return;
    const pct = grandTotalAmt > 0 ? ((catTotal / grandTotalAmt) * 100).toFixed(1) + '%' : '—';
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><span class="table-icon">${cat.icon}</span>${cat.name}</td>
      <td>${fmt(catTotal)}</td>
      <td>${pct}</td>
    `;
    tbody.appendChild(tr);
  });

  document.getElementById('grandTotal').innerHTML = `<strong>${fmt(grandTotalAmt)}</strong>`;
  document.getElementById('grandPct').innerHTML = `<strong>100%</strong>`;
}

// ---- Export CSV ----
function exportCSV() {
  const rows = [['Categoria', 'Voce', 'Importo (€)']];
  state.categories.forEach(cat => {
    cat.items.forEach(item => {
      const amt = parseMoney(item.amount);
      if (amt > 0 || item.name) {
        rows.push([cat.name, item.name, amt]);
      }
    });
  });

  const totalAmt = state.categories.flatMap(c => c.items).reduce((s, i) => s + parseMoney(i.amount), 0);
  rows.push(['', 'TOTALE', totalAmt]);
  if (state.budget > 0) rows.push(['', 'Budget impostato', state.budget]);
  if (state.guests > 0) rows.push(['', 'Numero ospiti', state.guests]);

  const csv = rows.map(r => r.map(cell => `"${String(cell).replace(/"/g,'""')}"`).join(',')).join('\n');
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'preventivo-matrimonio.csv';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// ---- Print ----
function printPage() {
  window.print();
}

// ---- Reset ----
function resetAll() {
  if (!confirm('Sei sicuro di voler azzerare tutti i dati?')) return;
  state.budget = 0;
  state.guests = 0;
  state.categories = CATEGORIES.map(c => ({
    ...c,
    collapsed: false,
    items: c.items.map(i => ({ ...i, id: uid(), amount: '' }))
  }));
  document.getElementById('totalBudget').value = '';
  document.getElementById('guestCount').value = '';
  render();
}

// ---- Budget inputs ----
document.getElementById('totalBudget').addEventListener('input', function () {
  state.budget = parseMoney(this.value);
  recalc();
});
document.getElementById('guestCount').addEventListener('input', function () {
  state.guests = parseMoney(this.value);
  recalc();
});

// ---- Init ----
render();
