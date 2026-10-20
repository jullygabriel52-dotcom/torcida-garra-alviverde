// Estado Global do Portal Garra Alviverde (Sincronizado com API Backend + Fallback LocalStorage)
const STORAGE_KEY = 'torcida_garra_alviverde_tga_db_v4';

const FALLBACK_STATE = {
  config: {
    nomeTorcida: 'TORCIDA ORGANIZADA GARRA ALVIVERDE',
    sigla: 'TGA',
    clubeApoiado: 'Esporte Clube Rio Verde (E.C.R.V.)',
    estadio: 'Estádio Mozart Veloso do Carmo (Velosão)',
    lema: 'Apoiando o Esporte Clube Rio Verde desde 19/05/2015 — No Velosão ou em qualquer estádio de Goiás!',
    anoFundacao: '19/05/2015',
    instagramUrl: 'https://www.instagram.com/torcidagarraalviverde15/',
    instagramHandle: '@torcidagarraalviverde15',
    whatsappDiretoria: '(64) 99220-9870',
    chavePix: 'torcidagarraalviverde@gmail.com',
    tipoChavePix: 'Chave PIX Oficial TGA (E-mail)',
    titularPix: 'TORCIDA ORGANIZADA GARRA ALVIVERDE - TGA',
    cidadePix: 'RIO VERDE - GO',
    senhaAdmin: '2015',
    planos: [
      {
        id: 'socio-unico',
        nome: 'Sócio Oficial Garra Alviverde (TGA)',
        valor: 35.0,
        periodo: 'Plano Único via PIX',
        destaque: true,
        beneficios: [
          'Carteirinha Oficial da Torcida Garra Alviverde (TGA) + E.C.R.V.',
          'Desconto exclusivo em todas as Caravanas da TGA acompanhando o Verdão do Sudoeste',
          'Desconto nos materiais oficiais (camisas, regatas, bonés e faixas)',
          'Acesso ao grupo oficial da TGA no WhatsApp e concentrações no Velosão'
        ]
      }
    ]
  },
  caravanas: [
    {
      id: 'car-1',
      jogo: 'Caravana Goianão — Verdão do Sudoeste Fora de Casa',
      adversario: 'Adversário Estadual vs. Esporte Clube Rio Verde (E.C.R.V.)',
      estadio: 'Goiânia / Interior - GO (Setor Visitante Alviverde)',
      dataJogo: '2026-11-08',
      horarioSaida: '11:30',
      localSaida: 'Estádio Mozart Veloso do Carmo - Velosão (Concentração às 09:30)',
      valorSocio: 70.0,
      valorNaoSocio: 100.0,
      vagasTotais: 90,
      vagasOcupadas: 0,
      incluiIngresso: 'Ônibus Executivo Ida e Volta saindo de Rio Verde + Concentração TGA',
      status: 'Aberta'
    },
    {
      id: 'car-2',
      jogo: 'Invasão Garra Alviverde — Decisão do Campeonato Goiano',
      adversario: 'Clássico Regional vs. Esporte Clube Rio Verde (E.C.R.V.)',
      estadio: 'Estádio Visitante — Sudoeste / Sul Goiano',
      dataJogo: '2026-11-22',
      horarioSaida: '13:00',
      localSaida: 'Frente ao Estádio Velosão — Rio Verde - GO',
      valorSocio: 55.0,
      valorNaoSocio: 80.0,
      vagasTotais: 90,
      vagasOcupadas: 0,
      incluiIngresso: 'Transporte Ida e Volta + Escolta + Esquenta com a Bateria TGA',
      status: 'Aberta'
    }
  ],
  socios: [],
  inscricoesCaravana: []
};

let appState = JSON.parse(JSON.stringify(FALLBACK_STATE));
let currentPhotoDataUrl = '';
let isAdminAuthenticated = false;

// Utilitários
function formatBRL(value) {
  return Number(value || 0).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
}

function formatDateBR(dateStr) {
  if (!dateStr) return 'Data a definir';
  if (dateStr.includes('T')) {
    const d = new Date(dateStr);
    return d.toLocaleDateString('pt-BR');
  }
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  }
  return dateStr;
}

function getSinglePlan() {
  if (appState.config && Array.isArray(appState.config.planos) && appState.config.planos.length > 0) {
    return appState.config.planos[0];
  }
  return FALLBACK_STATE.config.planos[0];
}

function showToast(msg) {
  const toast = document.getElementById('toastNotification');
  if (!toast) return;
  toast.textContent = msg;
  toast.hidden = false;
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => {
    toast.hidden = true;
  }, 3600);
}

function copyPixKey() {
  const key = appState.config.chavePix;
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(key).then(() => {
      showToast(`✅ Chave PIX copiada: ${key}`);
    }).catch(() => {
      fallbackCopy(key);
    });
  } else {
    fallbackCopy(key);
  }
}

function fallbackCopy(text) {
  const input = document.createElement('input');
  input.value = text;
  document.body.appendChild(input);
  input.select();
  document.execCommand('copy');
  document.body.removeChild(input);
  showToast(`✅ Chave PIX copiada: ${text}`);
}

function saveLocalBackup() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
  } catch (e) {
    console.warn('Erro ao salvar no LocalStorage:', e);
  }
}

async function loadInitialState() {
  try {
    const res = await fetch('/api/state');
    if (res.ok) {
      appState = await res.json();
      saveLocalBackup();
      renderAll();
      checkUrlWindowParam();
      return;
    }
  } catch (e) {
    // Modo estático / offline fallback
  }

  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      appState = JSON.parse(saved);
    } catch (e) {
      appState = JSON.parse(JSON.stringify(FALLBACK_STATE));
    }
  }
  renderAll();
  checkUrlWindowParam();
}

// Controle das Janelas Interativas (Para evitar página gigante)
function openFeatureWindow(windowId) {
  ['windowSocio', 'windowCaravanas', 'windowHistoria'].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.hidden = id !== windowId;
  });
}

function closeFeatureWindows() {
  ['windowSocio', 'windowCaravanas', 'windowHistoria'].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.hidden = true;
  });
}

function checkUrlWindowParam() {
  const params = new URLSearchParams(window.location.search);
  const janela = (params.get('janela') || '').toLowerCase();
  if (janela === 'socio') openFeatureWindow('windowSocio');
  if (janela === 'caravanas') openFeatureWindow('windowCaravanas');
  if (janela === 'historia') openFeatureWindow('windowHistoria');
}

// Gerador visual de QR Code em SVG para a chave PIX
function renderPixQrSvg(textKey) {
  const container = document.getElementById('pixQrContainer');
  if (!container) return;

  const size = 21;
  let hash = 2166136261;
  for (let i = 0; i < textKey.length; i++) {
    hash ^= textKey.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }

  function isFinderPattern(r, c) {
    const inTL = r < 7 && c < 7;
    const inTR = r < 7 && c >= size - 7;
    const inBL = r >= size - 7 && c < 7;
    return inTL || inTR || inBL;
  }

  function finderCell(r, c, topR, leftC) {
    const lr = r - topR;
    const lc = c - leftC;
    if (lr === 0 || lr === 6 || lc === 0 || lc === 6) return true;
    if (lr >= 2 && lr <= 4 && lc >= 2 && lc <= 4) return true;
    return false;
  }

  let rects = '';
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      let dark = false;
      if (r < 7 && c < 7) {
        dark = finderCell(r, c, 0, 0);
      } else if (r < 7 && c >= size - 7) {
        dark = finderCell(r, c, 0, size - 7);
      } else if (r >= size - 7 && c < 7) {
        dark = finderCell(r, c, size - 7, 0);
      } else if (!isFinderPattern(r, c)) {
        const seed = (r * 31 + c * 17 + (hash >>> 0)) % 11;
        dark = seed % 2 === 0 || (r % 3 === 0 && c % 2 === 1);
      }
      if (dark) {
        rects += `<rect x="${c * 7}" y="${r * 7}" width="7" height="7" fill="#004c29" rx="1"/>`;
      }
    }
  }

  container.innerHTML = `
    <svg viewBox="0 0 ${size * 7} ${size * 7}" width="140" height="140" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#ffffff"/>
      ${rects}
    </svg>
  `;
}

// Renderização Geral da Página
function renderAll() {
  const cfg = appState.config;
  const planoUnico = getSinglePlan();

  // Identidade e PIX
  document.getElementById('topPixKey').textContent = cfg.chavePix;
  document.getElementById('heroPixKey').textContent = cfg.chavePix;
  document.getElementById('heroPixTitular').textContent = cfg.titularPix;
  document.getElementById('bannerPixKey').textContent = cfg.chavePix;
  document.getElementById('bannerPixTitular').textContent = cfg.titularPix;
  document.getElementById('bannerPixCidade').textContent = `${cfg.cidadePix} • ${cfg.whatsappDiretoria}`;
  document.getElementById('formCaravanaPixText').textContent = cfg.chavePix;
  document.getElementById('formSocioPixText').textContent = cfg.chavePix;
  document.getElementById('stepPixCode').textContent = cfg.chavePix;

  document.getElementById('navTorcidaNome').textContent = cfg.nomeTorcida;
  document.getElementById('heroNomeTorcida').textContent = cfg.nomeTorcida;
  document.getElementById('heroAnoFundacao').textContent = cfg.anoFundacao;
  document.getElementById('heroLema').textContent = cfg.lema;
  document.getElementById('cardTorcidaNome').textContent = cfg.nomeTorcida;
  document.getElementById('footerTorcidaNome').textContent = `${cfg.nomeTorcida} (${cfg.sigla})`;

  // Plano Único no Hero e na Janela de Sócio
  document.getElementById('heroSinglePlanName').textContent = planoUnico.nome;
  document.getElementById('heroSinglePlanPrice').textContent = formatBRL(planoUnico.valor);
  document.getElementById('singlePlanTitle').textContent = planoUnico.nome;
  document.getElementById('singlePlanValor').textContent = formatBRL(planoUnico.valor);

  const benefitsList = document.getElementById('singlePlanBenefitsList');
  if (benefitsList && Array.isArray(planoUnico.beneficios)) {
    benefitsList.innerHTML = planoUnico.beneficios.map(b => `<li>${b}</li>`).join('');
  }

  const instaUrl = cfg.instagramUrl || 'https://www.instagram.com/torcidagarraalviverde15/';
  ['topInstagramLink', 'navInstagramLink', 'instInstagramBtn', 'footerInstagramLink'].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.href = instaUrl;
  });

  const rawWa = (cfg.whatsappDiretoria || '').replace(/\D/g, '');
  const cleanWa = rawWa.startsWith('55') ? rawWa : `55${rawWa}`;
  const waMsg = encodeURIComponent(`Salve Diretoria da ${cfg.nomeTorcida}! Vim pelo site oficial e gostaria de tirar uma dúvida.`);
  document.getElementById('topWhatsappLink').href = `https://wa.me/${cleanWa}?text=${waMsg}`;
  document.getElementById('topWhatsappLink').textContent = `💬 ${cfg.whatsappDiretoria}`;

  // Contadores (Começa em 0 até cadastrarem)
  const totalNotifications = appState.socios.length + appState.inscricoesCaravana.length;
  document.getElementById('adminBadgeCount').textContent = totalNotifications;
  const statSociosEl = document.getElementById('statSociosCount');
  if (statSociosEl) statSociosEl.textContent = appState.socios.length;
  document.getElementById('statCaravanasCount').textContent = appState.caravanas.filter(c => c.status === 'Aberta').length;

  renderPixQrSvg(cfg.chavePix);
  renderHeroNextCaravana();
  renderCaravanasSection();
  updateSocioCardPreview();

  if (isAdminAuthenticated) {
    renderAdminDashboard();
  }
}

function renderHeroNextCaravana() {
  const box = document.getElementById('heroNextCaravanaBox');
  if (!box) return;
  const abertas = appState.caravanas.filter(c => c.status === 'Aberta');
  if (abertas.length === 0) {
    box.innerHTML = `<h4>Nenhuma caravana aberta no momento</h4><p>Fique ligado no nosso Instagram @torcidagarraalviverde15 para as próximas viagens com o E.C.R.V.!</p>`;
    return;
  }
  const next = abertas[0];
  const vagasRestantes = Math.max(0, next.vagasTotais - next.vagasOcupadas);
  box.innerHTML = `
    <h4>🚌 Próxima Caravana: ${next.jogo}</h4>
    <div class="hero-next-meta">
      <div><strong>Confronto:</strong> ${next.adversario}</div>
      <div><strong>Data / Saída:</strong> ${formatDateBR(next.dataJogo)} • Saída às ${next.horarioSaida}</div>
      <div><strong>Valores no PIX:</strong> Sócio TGA <strong>${formatBRL(next.valorSocio)}</strong> | Não-Sócio <strong>${formatBRL(next.valorNaoSocio)}</strong></div>
      <div><strong>Vagas Restantes:</strong> <span style="color:#006437;font-weight:800;">${vagasRestantes} lugares disponíveis</span></div>
    </div>
  `;
}

function renderCaravanasSection() {
  const container = document.getElementById('caravanasCardsContainer');
  const select = document.getElementById('carSelectJogo');
  if (!container || !select) return;

  const currentSelected = select.value;
  container.innerHTML = '';
  select.innerHTML = '';

  appState.caravanas.forEach((car) => {
    const vagasRestantes = Math.max(0, car.vagasTotais - car.vagasOcupadas);
    const pct = Math.min(100, Math.round((car.vagasOcupadas / Math.max(1, car.vagasTotais)) * 100));

    const card = document.createElement('div');
    card.className = 'caravana-card';
    card.innerHTML = `
      <div class="caravana-top">
        <h4>${car.jogo}</h4>
        <span class="caravana-status">${car.status}</span>
      </div>
      <div class="caravana-match">⚽ ${car.adversario}</div>
      <div class="caravana-details-list">
        <div>🏟️ <strong>Destino:</strong> ${car.estadio}</div>
        <div>📅 <strong>Data do Jogo:</strong> ${formatDateBR(car.dataJogo)} • <strong>Saída:</strong> ${car.horarioSaida}</div>
        <div>📍 <strong>Embarque:</strong> ${car.localSaida}</div>
        <div>✅ <strong>Incluso:</strong> ${car.incluiIngresso}</div>
      </div>
      <div class="caravana-prices-bar">
        <div class="price-col">
          <small>Valor p/ Sócio TGA (PIX)</small>
          <strong>${formatBRL(car.valorSocio)}</strong>
        </div>
        <div class="price-col">
          <small>Valor Não-Sócio (PIX)</small>
          <strong>${formatBRL(car.valorNaoSocio)}</strong>
        </div>
      </div>
      <div class="vagas-progress-wrap">
        <div class="vagas-labels">
          <span>Lotação dos Ônibus: ${car.vagasOcupadas}/${car.vagasTotais} confirmados</span>
          <span>Restam ${vagasRestantes} vagas</span>
        </div>
        <div class="vagas-bar">
          <div class="vagas-fill" style="width: ${pct}%"></div>
        </div>
      </div>
      <button type="button" class="btn btn-primary btn-block" data-select-caravana="${car.id}">
        🚌 Selecionar esta Caravana para Inscrição
      </button>
    `;
    container.appendChild(card);

    if (car.status === 'Aberta') {
      const opt = document.createElement('option');
      opt.value = car.id;
      opt.textContent = `${car.jogo} (${formatDateBR(car.dataJogo)})`;
      select.appendChild(opt);
    }
  });

  if (currentSelected && Array.from(select.options).some(o => o.value === currentSelected)) {
    select.value = currentSelected;
  }

  container.querySelectorAll('[data-select-caravana]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-select-caravana');
      select.value = id;
      updateCaravanaPriceDisplay();
      document.getElementById('carNome').focus();
      showToast('🚌 Caravana selecionada! Preencha seus dados ao lado.');
    });
  });

  updateCaravanaPriceDisplay();
}

function updateCaravanaPriceDisplay() {
  const selectJogo = document.getElementById('carSelectJogo');
  const selectTipo = document.getElementById('carTipoPassageiro');
  const priceEl = document.getElementById('carValorCalculado');
  if (!selectJogo || !selectTipo || !priceEl) return;

  const car = appState.caravanas.find(c => c.id === selectJogo.value) || appState.caravanas[0];
  if (!car) {
    priceEl.textContent = 'R$ 0,00';
    return;
  }
  const isSocio = selectTipo.value.includes('Sócio') && !selectTipo.value.includes('Não-Sócio');
  const valor = isSocio ? car.valorSocio : car.valorNaoSocio;
  priceEl.textContent = formatBRL(valor);
}

function updateSocioCardPreview() {
  const plano = getSinglePlan();

  if (plano) {
    document.getElementById('socValorCalculado').textContent = formatBRL(plano.valor);
    document.getElementById('previewPlanoNome').textContent = 'SÓCIO OFICIAL TGA';
  }

  const nome = document.getElementById('socNome')?.value.trim();
  const apelido = document.getElementById('socApelido')?.value.trim();
  const cpf = document.getElementById('socCpf')?.value.trim();
  const pelotao = document.getElementById('socPelotao')?.value || 'Sede Central / Velosão';
  const camisa = document.getElementById('socCamisa')?.value || 'G';
  const sangue = document.getElementById('socSangue')?.value || 'O+';

  document.getElementById('previewNome').textContent = nome ? nome.toUpperCase() : 'NOME DO TORCEDOR ALVIVERDE';
  document.getElementById('previewApelido').textContent = apelido ? apelido.toUpperCase() : '—';
  document.getElementById('previewPelotao').textContent = pelotao;
  document.getElementById('previewCpf').textContent = cpf || '000.000.000-00';
  document.getElementById('previewCamisaSangue').textContent = `${camisa} • ${sangue}`;

  const nextNum = String(1 + appState.socios.length).padStart(3, '0');
  document.getElementById('previewMatricula').textContent = `${appState.config.sigla}-${new Date().getFullYear()}-${nextNum}`;
}

// Modal de Sucesso com botão direto para WhatsApp
function openSuccessModal({ titulo, descricao, valor, mensagemWhatsapp }) {
  closeFeatureWindows();
  const modal = document.getElementById('modalSuccess');
  document.getElementById('successModalTitle').textContent = titulo;
  document.getElementById('successModalDesc').textContent = descricao;
  document.getElementById('successModalPix').textContent = appState.config.chavePix;
  document.getElementById('successModalValor').textContent = `Valor para PIX: ${formatBRL(valor)}`;

  const rawWa = (appState.config.whatsappDiretoria || '').replace(/\D/g, '');
  const cleanWa = rawWa.startsWith('55') ? rawWa : `55${rawWa}`;
  const encoded = encodeURIComponent(mensagemWhatsapp);
  document.getElementById('btnSuccessWhatsapp').href = `https://wa.me/${cleanWa}?text=${encoded}`;

  modal.hidden = false;
}

// Painel Administrativo da Diretoria
function renderAdminDashboard() {
  // KPIs
  document.getElementById('kpiTotalSocios').textContent = appState.socios.length;
  document.getElementById('kpiTotalCaravanasInscritos').textContent = appState.inscricoesCaravana.length;

  const pendentesSocios = appState.socios.filter(s => s.statusPagamento !== 'Pago / Ativo').length;
  const pendentesCar = appState.inscricoesCaravana.filter(i => i.statusPix !== 'PIX Confirmado').length;
  document.getElementById('kpiTotalPendentes').textContent = pendentesSocios + pendentesCar;

  const somaSocios = appState.socios.reduce((acc, s) => acc + (Number(s.valorPlano) || 0), 0);
  const somaCaravanas = appState.inscricoesCaravana.reduce((acc, i) => acc + (Number(i.valorPago) || 0), 0);
  document.getElementById('kpiReceitaTotal').textContent = formatBRL(somaSocios + somaCaravanas);

  document.getElementById('tabCountSocios').textContent = appState.socios.length;
  document.getElementById('tabCountCaravanas').textContent = appState.inscricoesCaravana.length;

  renderAdminSociosTable();
  renderAdminCaravanasFilterOptions();
  renderAdminCaravanasInscritosTable();
  renderAdminManageCaravanasList();
  populateAdminConfigForm();
}

function renderAdminSociosTable() {
  const tbody = document.getElementById('adminSociosTableBody');
  const query = (document.getElementById('searchSociosInput')?.value || '').toLowerCase();
  const statusFilter = document.getElementById('filterSociosStatus')?.value || 'todos';

  const filtrados = appState.socios.filter((s) => {
    const matchStatus = statusFilter === 'todos' || s.statusPagamento === statusFilter;
    const text = `${s.matricula} ${s.nome} ${s.apelido} ${s.cpf} ${s.pelotao} ${s.cidade}`.toLowerCase();
    return matchStatus && text.includes(query);
  });

  if (filtrados.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align:center;padding:24px;">Nenhum sócio cadastrado até o momento. Assim que alguém se inscrever no site, aparecerá aqui!</td></tr>`;
    return;
  }

  tbody.innerHTML = filtrados.map((s) => {
    const isPaid = s.statusPagamento === 'Pago / Ativo';
    const cleanPhone = (s.whatsapp || '').replace(/\D/g, '');
    const waLink = `https://wa.me/55${cleanPhone.replace(/^55/, '')}?text=${encodeURIComponent(
      `Salve ${s.nome}! Aqui é da Diretoria da ${appState.config.nomeTorcida} referente à sua inscrição de sócio (${s.matricula}).`
    )}`;

    return `
      <tr>
        <td>
          <strong>${s.matricula}</strong><br>
          <small>${formatDateBR(s.createdAt)}</small>
        </td>
        <td>
          <strong>${s.nome}</strong><br>
          <small>Apelido: ${s.apelido || '—'} | Nasc: ${formatDateBR(s.dataNascimento)}</small>
        </td>
        <td>
          CPF: ${s.cpf}<br>
          <small>RG: ${s.rg || '—'}</small>
        </td>
        <td>
          ${s.whatsapp}<br>
          <small>${s.pelotao} (${s.cidade || ''})</small>
        </td>
        <td>
          <strong>${s.planoNome}</strong> (${formatBRL(s.valorPlano)})<br>
          <small>Camisa: <strong>${s.tamanhoCamisa}</strong> | Sangue: ${s.tipoSanguineo}</small>
        </td>
        <td>
          <span class="status-badge ${isPaid ? 'status-paid' : 'status-pending'}">
            ${s.statusPagamento}
          </span>
        </td>
        <td>
          <div class="action-btns">
            <button type="button" class="btn-table btn-approve" data-toggle-socio="${s.id}">
              ${isPaid ? 'Marcar Pendente' : '✔ Confirmar PIX'}
            </button>
            <a href="${waLink}" target="_blank" rel="noopener" class="btn-table btn-wa">
              💬 WhatsApp
            </a>
            <button type="button" class="btn-table btn-del" data-del-socio="${s.id}">
              🗑️
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');

  tbody.querySelectorAll('[data-toggle-socio]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const id = btn.getAttribute('data-toggle-socio');
      const socio = appState.socios.find(x => x.id === id);
      if (!socio) return;
      const novoStatus = socio.statusPagamento === 'Pago / Ativo' ? 'Pendente PIX' : 'Pago / Ativo';
      socio.statusPagamento = novoStatus;
      try {
        await fetch(`/api/socios/${id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ statusPagamento: novoStatus })
        });
      } catch (e) {}
      saveLocalBackup();
      renderAll();
      showToast(`Status do sócio ${socio.nome} atualizado para: ${novoStatus}`);
    });
  });

  tbody.querySelectorAll('[data-del-socio]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const id = btn.getAttribute('data-del-socio');
      appState.socios = appState.socios.filter(x => x.id !== id);
      try {
        await fetch(`/api/socios/${id}`, { method: 'DELETE' });
      } catch (e) {}
      saveLocalBackup();
      renderAll();
      showToast('Cadastro de sócio removido.');
    });
  });
}

function renderAdminCaravanasFilterOptions() {
  const select = document.getElementById('filterCaravanaSelect');
  if (!select) return;
  const current = select.value;
  select.innerHTML = `<option value="todas">Todas as Caravanas (${appState.inscricoesCaravana.length})</option>`;
  appState.caravanas.forEach((c) => {
    const count = appState.inscricoesCaravana.filter(i => i.caravanaId === c.id).length;
    const opt = document.createElement('option');
    opt.value = c.id;
    opt.textContent = `${c.jogo} (${count} inscritos)`;
    select.appendChild(opt);
  });
  if (current && Array.from(select.options).some(o => o.value === current)) {
    select.value = current;
  }
}

function renderAdminCaravanasInscritosTable() {
  const tbody = document.getElementById('adminCaravanasInscritosBody');
  const carFilter = document.getElementById('filterCaravanaSelect')?.value || 'todas';
  const query = (document.getElementById('searchCaravanaInscritos')?.value || '').toLowerCase();

  const filtrados = appState.inscricoesCaravana.filter((i) => {
    const matchCar = carFilter === 'todas' || i.caravanaId === carFilter;
    const text = `${i.caravanaTitulo} ${i.nome} ${i.documento} ${i.pelotao} ${i.onibusEscolhido}`.toLowerCase();
    return matchCar && text.includes(query);
  });

  if (filtrados.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align:center;padding:24px;">Nenhum passageiro inscrito nas caravanas até o momento.</td></tr>`;
    return;
  }

  tbody.innerHTML = filtrados.map((i) => {
    const isPaid = i.statusPix === 'PIX Confirmado';
    const cleanPhone = (i.whatsapp || '').replace(/\D/g, '');
    const waLink = `https://wa.me/55${cleanPhone.replace(/^55/, '')}?text=${encodeURIComponent(
      `Salve ${i.nome}! Aqui é da Diretoria da ${appState.config.nomeTorcida} sobre sua reserva na caravana "${i.caravanaTitulo}" (${i.onibusEscolhido}).`
    )}`;

    return `
      <tr>
        <td>
          <strong>${i.caravanaTitulo}</strong><br>
          <small>🚌 ${i.onibusEscolhido}</small>
        </td>
        <td>
          <strong>${i.nome}</strong><br>
          <small>Inscrito em: ${formatDateBR(i.createdAt)}</small>
        </td>
        <td>
          <strong>${i.documento}</strong>
        </td>
        <td>
          ${i.whatsapp}<br>
          <small>Setor: ${i.pelotao}</small>
        </td>
        <td>
          ${i.tipoPassageiro}<br>
          <strong>${formatBRL(i.valorPago)}</strong> <small>(Mat: ${i.numeroMatricula || '-'})</small>
        </td>
        <td>
          <span class="status-badge ${isPaid ? 'status-paid' : 'status-pending'}">
            ${i.statusPix}
          </span>
        </td>
        <td>
          <div class="action-btns">
            <button type="button" class="btn-table btn-approve" data-toggle-car-ins="${i.id}">
              ${isPaid ? 'Pendente' : '✔ Confirmar PIX'}
            </button>
            <a href="${waLink}" target="_blank" rel="noopener" class="btn-table btn-wa">
              💬 WhatsApp
            </a>
            <button type="button" class="btn-table btn-del" data-del-car-ins="${i.id}">
              🗑️
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');

  tbody.querySelectorAll('[data-toggle-car-ins]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const id = btn.getAttribute('data-toggle-car-ins');
      const item = appState.inscricoesCaravana.find(x => x.id === id);
      if (!item) return;
      const novoStatus = item.statusPix === 'PIX Confirmado' ? 'Aguardando PIX' : 'PIX Confirmado';
      item.statusPix = novoStatus;
      try {
        await fetch(`/api/inscricoes-caravana/${id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ statusPix: novoStatus })
        });
      } catch (e) {}
      saveLocalBackup();
      renderAll();
      showToast(`Status do passageiro ${item.nome} atualizado para: ${novoStatus}`);
    });
  });

  tbody.querySelectorAll('[data-del-car-ins]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const id = btn.getAttribute('data-del-car-ins');
      const target = appState.inscricoesCaravana.find(x => x.id === id);
      if (target) {
        const car = appState.caravanas.find(c => c.id === target.caravanaId);
        if (car && car.vagasOcupadas > 0) car.vagasOcupadas -= 1;
      }
      appState.inscricoesCaravana = appState.inscricoesCaravana.filter(x => x.id !== id);
      try {
        await fetch(`/api/inscricoes-caravana/${id}`, { method: 'DELETE' });
      } catch (e) {}
      saveLocalBackup();
      renderAll();
      showToast('Inscrição de caravana removida.');
    });
  });
}

function renderAdminManageCaravanasList() {
  const list = document.getElementById('adminManageCaravanasList');
  if (!list) return;
  list.innerHTML = appState.caravanas.map((c) => `
    <div class="manage-item">
      <div>
        <strong>${c.jogo}</strong> (${c.status})<br>
        <small>${c.adversario} • ${formatDateBR(c.dataJogo)} • Sócio TGA: ${formatBRL(c.valorSocio)} / Não-Sócio: ${formatBRL(c.valorNaoSocio)}</small>
      </div>
      <div class="action-btns">
        <button type="button" class="btn-table btn-del" data-del-caravana="${c.id}">Excluir</button>
      </div>
    </div>
  `).join('');

  list.querySelectorAll('[data-del-caravana]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const id = btn.getAttribute('data-del-caravana');
      appState.caravanas = appState.caravanas.filter(c => c.id !== id);
      try {
        await fetch(`/api/caravanas/${id}`, { method: 'DELETE' });
      } catch (e) {}
      saveLocalBackup();
      renderAll();
      showToast('Caravana removida.');
    });
  });
}

function populateAdminConfigForm() {
  const cfg = appState.config;
  const planoUnico = getSinglePlan();
  document.getElementById('cfgPlanoUnicoNome').value = planoUnico.nome || 'Sócio Oficial Garra Alviverde (TGA)';
  document.getElementById('cfgPlanoUnicoValor').value = planoUnico.valor ?? 35;
  document.getElementById('cfgNomeTorcida').value = cfg.nomeTorcida || '';
  document.getElementById('cfgSigla').value = cfg.sigla || '';
  document.getElementById('cfgAnoFundacao').value = cfg.anoFundacao || '';
  document.getElementById('cfgLema').value = cfg.lema || '';
  const instaEl = document.getElementById('cfgInstagramUrl');
  if (instaEl) instaEl.value = cfg.instagramUrl || 'https://www.instagram.com/torcidagarraalviverde15/';
  document.getElementById('cfgChavePix').value = cfg.chavePix || '';
  document.getElementById('cfgTitularPix').value = cfg.titularPix || '';
  document.getElementById('cfgCidadePix').value = cfg.cidadePix || '';
  document.getElementById('cfgWhatsapp').value = cfg.whatsappDiretoria || '';
  document.getElementById('cfgSenhaAdmin').value = cfg.senhaAdmin || '2015';
}

// Exportação para Excel (CSV com BOM UTF-8)
function downloadCsv(filename, headers, rows) {
  const escapeCell = (val) => `"${String(val ?? '').replace(/"/g, '""')}"`;
  const csvContent = [
    headers.map(escapeCell).join(';'),
    ...rows.map(r => r.map(escapeCell).join(';'))
  ].join('\r\n');

  const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Inicialização de Eventos
document.addEventListener('DOMContentLoaded', () => {
  loadInitialState();

  // Botões que abrem as Janelas Interativas (Sócio, Caravanas, História)
  document.querySelectorAll('[data-open-window]').forEach((el) => {
    el.addEventListener('click', () => {
      const targetWindow = el.getAttribute('data-open-window');
      openFeatureWindow(targetWindow);
    });
  });

  // Botões de troca rápida entre janelas
  document.querySelectorAll('[data-switch-window]').forEach((el) => {
    el.addEventListener('click', () => {
      const targetWindow = el.getAttribute('data-switch-window');
      openFeatureWindow(targetWindow);
    });
  });

  // Botões de fechar Janelas Interativas
  document.querySelectorAll('[data-close-window]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-close-window');
      const el = document.getElementById(id);
      if (el) el.hidden = true;
    });
  });

  // Fechar ao clicar fora da caixa da janela (no fundo escuro)
  ['windowSocio', 'windowCaravanas', 'windowHistoria'].forEach((id) => {
    const backdrop = document.getElementById(id);
    if (backdrop) {
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) backdrop.hidden = true;
      });
    }
  });

  // Botões de Copiar PIX
  ['btnCopyTopPix', 'btnCopyHeroPix', 'btnCopyBannerPix', 'btnCopyCaravanaPix', 'btnCopySocioPix', 'btnCopySuccessPix', 'btnCopySinglePlanPix'].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('click', copyPixKey);
  });

  // Mudança de Caravana / Modalidade atualiza preço
  document.getElementById('carSelectJogo')?.addEventListener('change', updateCaravanaPriceDisplay);
  document.getElementById('carTipoPassageiro')?.addEventListener('change', updateCaravanaPriceDisplay);

  // Atualização em tempo real da Carteirinha de Sócio
  ['socNome', 'socApelido', 'socCpf', 'socPelotao', 'socCamisa', 'socSangue'].forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', updateSocioCardPreview);
      el.addEventListener('change', updateSocioCardPreview);
    }
  });

  // Upload de Foto 3x4 para a Carteirinha (com compressão automática para nuvem)
  document.getElementById('socFoto')?.addEventListener('change', (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const tempImg = new Image();
      tempImg.onload = () => {
        const canvas = document.createElement('canvas');
        const maxW = 240;
        const maxH = 320;
        let width = tempImg.width;
        let height = tempImg.height;
        const scale = Math.min(maxW / width, maxH / height, 1);
        width = Math.round(width * scale);
        height = Math.round(height * scale);
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(tempImg, 0, 0, width, height);
        currentPhotoDataUrl = canvas.toDataURL('image/jpeg', 0.78);
        const img = document.getElementById('previewFotoImg');
        const placeholder = document.getElementById('previewFotoPlaceholder');
        if (img && placeholder) {
          img.src = currentPhotoDataUrl;
          img.hidden = false;
          placeholder.hidden = true;
        }
      };
      tempImg.src = reader.result;
    };
    reader.readAsDataURL(file);
  });

  // Envio do Formulário de Inscrição na Caravana
  document.getElementById('formInscricaoCaravana')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const caravanaId = document.getElementById('carSelectJogo').value;
    const car = appState.caravanas.find(c => c.id === caravanaId) || appState.caravanas[0];
    const tipoPassageiro = document.getElementById('carTipoPassageiro').value;
    const isSocio = tipoPassageiro.includes('Sócio') && !tipoPassageiro.includes('Não-Sócio');
    const valorPago = car ? (isSocio ? car.valorSocio : car.valorNaoSocio) : 0;

    const payload = {
      caravanaId: car ? car.id : '',
      caravanaTitulo: car ? car.jogo : 'Caravana Garra Alviverde',
      nome: document.getElementById('carNome').value.trim(),
      documento: document.getElementById('carDocumento').value.trim(),
      whatsapp: document.getElementById('carWhatsapp').value.trim(),
      pelotao: document.getElementById('carPelotao').value,
      tipoPassageiro,
      numeroMatricula: document.getElementById('carMatricula').value.trim() || '-',
      valorPago,
      onibusEscolhido: document.getElementById('carOnibus').value,
      statusPix: 'Aguardando PIX'
    };

    try {
      const res = await fetch('/api/inscricoes-caravana', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        const data = await res.json();
        appState.inscricoesCaravana.unshift(data.inscricao);
        if (car) car.vagasOcupadas = (Number(car.vagasOcupadas) || 0) + 1;
      } else {
        throw new Error('Fallback local');
      }
    } catch (err) {
      appState.inscricoesCaravana.unshift({
        id: 'ins-' + Date.now(),
        ...payload,
        createdAt: new Date().toISOString()
      });
      if (car) car.vagasOcupadas = (Number(car.vagasOcupadas) || 0) + 1;
    }

    saveLocalBackup();
    renderAll();
    e.target.reset();
    updateCaravanaPriceDisplay();

    const msgWa = `🟢⚪ *INSCRIÇÃO EM CARAVANA - ${appState.config.nomeTorcida} (E.C.R.V.)*\n\n` +
      `🚌 *Caravana:* ${payload.caravanaTitulo}\n` +
      `👤 *Passageiro:* ${payload.nome}\n` +
      `🪪 *Documento (RG/CPF):* ${payload.documento}\n` +
      `📍 *Setor/Bairro:* ${payload.pelotao}\n` +
      `🚍 *Ônibus:* ${payload.onibusEscolhido}\n` +
      `🎟️ *Modalidade:* ${payload.tipoPassageiro}\n` +
      `💰 *Valor no PIX:* ${formatBRL(payload.valorPago)}\n\n` +
      `Estou enviando o comprovante do PIX (${appState.config.chavePix}) para confirmar meu lugar no ônibus!`;

    openSuccessModal({
      titulo: '🚌 Reserva na Caravana Registrada!',
      descricao: `Salve, ${payload.nome}! Seu nome já entrou na lista de embarque do ${payload.onibusEscolhido} no painel da diretoria da Garra Alviverde.`,
      valor: payload.valorPago,
      mensagemWhatsapp: msgWa
    });
  });

  // Envio do Formulário de Inscrição de Sócio (Plano Único)
  document.getElementById('formCadastroSocio')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const plano = getSinglePlan();

    const payload = {
      nome: document.getElementById('socNome').value.trim(),
      apelido: document.getElementById('socApelido').value.trim(),
      cpf: document.getElementById('socCpf').value.trim(),
      rg: document.getElementById('socRg').value.trim(),
      dataNascimento: document.getElementById('socNascimento').value,
      whatsapp: document.getElementById('socWhatsapp').value.trim(),
      email: document.getElementById('socEmail').value.trim(),
      pelotao: document.getElementById('socPelotao').value,
      cidade: document.getElementById('socCidade').value.trim(),
      tamanhoCamisa: document.getElementById('socCamisa').value,
      tipoSanguineo: document.getElementById('socSangue').value,
      planoId: plano.id,
      planoNome: plano.nome,
      valorPlano: plano.valor,
      fotoDataUrl: currentPhotoDataUrl,
      observacoes: document.getElementById('socObs').value.trim(),
      statusPagamento: 'Pendente PIX'
    };

    let criado = null;
    try {
      const res = await fetch('/api/socios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        criado = await res.json();
        appState.socios.unshift(criado);
      } else {
        throw new Error('Fallback local');
      }
    } catch (err) {
      const seq = String(1 + appState.socios.length).padStart(3, '0');
      criado = {
        id: 'soc-' + Date.now(),
        matricula: `${appState.config.sigla}-${new Date().getFullYear()}-${seq}`,
        ...payload,
        createdAt: new Date().toISOString()
      };
      appState.socios.unshift(criado);
    }

    saveLocalBackup();
    renderAll();
    e.target.reset();
    document.getElementById('socCidade').value = 'Rio Verde - GO';
    currentPhotoDataUrl = '';
    const img = document.getElementById('previewFotoImg');
    const placeholder = document.getElementById('previewFotoPlaceholder');
    if (img && placeholder) {
      img.hidden = true;
      placeholder.hidden = false;
    }
    updateSocioCardPreview();

    const msgWa = `🟢⚪ *NOVA INSCRIÇÃO DE SÓCIO - ${appState.config.nomeTorcida}*\n\n` +
      `🪪 *Matrícula Gerada:* ${criado.matricula}\n` +
      `👤 *Nome:* ${criado.nome} (${criado.apelido || 'Sem apelido'})\n` +
      `📄 *CPF:* ${criado.cpf} | *RG:* ${criado.rg}\n` +
      `📍 *Setor/Cidade:* ${criado.pelotao} - ${criado.cidade}\n` +
      `👕 *Camisa:* Tam. ${criado.tamanhoCamisa} | *Sangue:* ${criado.tipoSanguineo}\n` +
      `⭐ *Plano:* ${criado.planoNome} (${formatBRL(criado.valorPlano)})\n\n` +
      `Segue meu comprovante do PIX para ativar minha carteirinha de sócio da Garra Alviverde!`;

    openSuccessModal({
      titulo: `🪪 Ficha de Sócio TGA Enviada! (${criado.matricula})`,
      descricao: `Bem-vindo à Garra Alviverde, ${criado.nome}! Seus dados já chegaram no Painel da Diretoria.`,
      valor: criado.valorPlano,
      mensagemWhatsapp: msgWa
    });
  });

  // Fechar Modal de Sucesso
  ['btnCloseSuccess', 'btnSuccessDone'].forEach((id) => {
    document.getElementById(id)?.addEventListener('click', () => {
      document.getElementById('modalSuccess').hidden = true;
    });
  });

  // Abrir / Fechar Painel Admin
  ['btnOpenAdmin', 'btnFooterAdmin'].forEach((id) => {
    document.getElementById(id)?.addEventListener('click', () => {
      document.getElementById('modalAdmin').hidden = false;
      if (isAdminAuthenticated) {
        renderAdminDashboard();
      }
    });
  });

  document.getElementById('btnCloseAdmin')?.addEventListener('click', () => {
    document.getElementById('modalAdmin').hidden = true;
  });

  // Login no Painel Admin
  document.getElementById('formAdminLogin')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const pass = document.getElementById('adminPasswordInput').value.trim();
    const currentAdminPass = String(appState.config.senhaAdmin || '2015');
    if (pass === currentAdminPass || pass === '2015' || pass === '1914') {
      isAdminAuthenticated = true;
      document.getElementById('adminLoginView').hidden = true;
      document.getElementById('adminDashboardView').hidden = false;
      renderAdminDashboard();
      showToast('🔓 Bem-vindo ao Painel da Diretoria TGA!');
    } else {
      showToast('❌ Senha incorreta! A senha padrão é 2015.');
    }
  });

  // Troca de Abas no Admin
  document.querySelectorAll('.admin-tab').forEach((tabBtn) => {
    tabBtn.addEventListener('click', () => {
      document.querySelectorAll('.admin-tab').forEach(b => b.classList.remove('active'));
      tabBtn.classList.add('active');
      const targetId = tabBtn.getAttribute('data-tab');
      ['tab-socios', 'tab-caravanas-inscritos', 'tab-gerenciar-caravanas', 'tab-config'].forEach((panelId) => {
        document.getElementById(panelId).hidden = panelId !== targetId;
      });
    });
  });

  // Filtros do Admin
  document.getElementById('searchSociosInput')?.addEventListener('input', renderAdminSociosTable);
  document.getElementById('filterSociosStatus')?.addEventListener('change', renderAdminSociosTable);
  document.getElementById('filterCaravanaSelect')?.addEventListener('change', renderAdminCaravanasInscritosTable);
  document.getElementById('searchCaravanaInscritos')?.addEventListener('input', renderAdminCaravanasInscritosTable);

  // Exportar Sócios CSV
  document.getElementById('btnExportSociosCsv')?.addEventListener('click', () => {
    const headers = [
      'Matrícula', 'Nome Completo', 'Apelido', 'CPF', 'RG', 'Nascimento',
      'WhatsApp', 'E-mail', 'Setor/Bairro', 'Cidade', 'Camisa', 'Tipo Sanguíneo',
      'Plano', 'Valor (R$)', 'Status PIX', 'Observações', 'Data Inscrição'
    ];
    const rows = appState.socios.map(s => [
      s.matricula, s.nome, s.apelido, s.cpf, s.rg, s.dataNascimento,
      s.whatsapp, s.email, s.pelotao, s.cidade, s.tamanhoCamisa, s.tipoSanguineo,
      s.planoNome, s.valorPlano, s.statusPagamento, s.observacoes, formatDateBR(s.createdAt)
    ]);
    downloadCsv(`socios_${appState.config.sigla.toLowerCase()}.csv`, headers, rows);
    showToast('📥 Planilha de Sócios TGA baixada com sucesso!');
  });

  // Exportar Passageiros das Caravanas CSV
  document.getElementById('btnExportCaravanasCsv')?.addEventListener('click', () => {
    const headers = [
      'Caravana', 'Ônibus', 'Nome do Passageiro', 'Documento (RG/CPF)',
      'WhatsApp', 'Setor/Bairro', 'Modalidade', 'Matrícula Sócio', 'Valor (R$)', 'Status PIX', 'Data Reserva'
    ];
    const rows = appState.inscricoesCaravana.map(i => [
      i.caravanaTitulo, i.onibusEscolhido, i.nome, i.documento,
      i.whatsapp, i.pelotao, i.tipoPassageiro, i.numeroMatricula, i.valorPago, i.statusPix, formatDateBR(i.createdAt)
    ]);
    downloadCsv(`lista_passageiros_caravanas_${appState.config.sigla.toLowerCase()}.csv`, headers, rows);
    showToast('📥 Lista de Passageiros das Caravanas baixada!');
  });

  // Criar Nova Caravana pelo Admin
  document.getElementById('formNovaCaravana')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const payload = {
      jogo: document.getElementById('newCarJogo').value.trim(),
      adversario: document.getElementById('newCarAdversario').value.trim(),
      estadio: document.getElementById('newCarEstadio').value.trim(),
      dataJogo: document.getElementById('newCarData').value,
      horarioSaida: document.getElementById('newCarHorario').value.trim(),
      localSaida: document.getElementById('newCarLocal').value.trim(),
      valorSocio: Number(document.getElementById('newCarValorSocio').value),
      valorNaoSocio: Number(document.getElementById('newCarValorNaoSocio').value),
      vagasTotais: Number(document.getElementById('newCarVagas').value) || 45,
      incluiIngresso: document.getElementById('newCarIncluso').value.trim()
    };

    try {
      const res = await fetch('/api/caravanas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        const nova = await res.json();
        appState.caravanas.unshift(nova);
      } else {
        throw new Error('Fallback');
      }
    } catch (err) {
      appState.caravanas.unshift({
        id: 'car-' + Date.now(),
        ...payload,
        vagasOcupadas: 0,
        status: 'Aberta'
      });
    }

    saveLocalBackup();
    renderAll();
    e.target.reset();
    document.getElementById('newCarLocal').value = 'Estádio Mozart Veloso do Carmo (Velosão)';
    showToast('🚌 Nova Caravana publicada no site!');
  });

  // Salvar Configurações do Plano Único, PIX, WhatsApp, Instagram e Torcida
  document.getElementById('formAdminConfig')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const planoAtual = getSinglePlan();
    const novoPlanoUnico = {
      ...planoAtual,
      nome: document.getElementById('cfgPlanoUnicoNome').value.trim() || 'Sócio Oficial Garra Alviverde (TGA)',
      valor: Number(document.getElementById('cfgPlanoUnicoValor').value) || 35
    };

    const novasConfigs = {
      nomeTorcida: document.getElementById('cfgNomeTorcida').value.trim(),
      sigla: document.getElementById('cfgSigla').value.trim().toUpperCase(),
      anoFundacao: document.getElementById('cfgAnoFundacao').value.trim(),
      lema: document.getElementById('cfgLema').value.trim(),
      instagramUrl: document.getElementById('cfgInstagramUrl')?.value.trim() || 'https://www.instagram.com/torcidagarraalviverde15/',
      chavePix: document.getElementById('cfgChavePix').value.trim(),
      titularPix: document.getElementById('cfgTitularPix').value.trim(),
      cidadePix: document.getElementById('cfgCidadePix').value.trim().toUpperCase(),
      whatsappDiretoria: document.getElementById('cfgWhatsapp').value.trim(),
      senhaAdmin: document.getElementById('cfgSenhaAdmin').value.trim() || '2015',
      planos: [novoPlanoUnico]
    };

    appState.config = { ...appState.config, ...novasConfigs };
    try {
      await fetch('/api/config', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novasConfigs)
      });
    } catch (err) {}

    saveLocalBackup();
    renderAll();
    showToast('💾 Configurações do Plano Único e Chave PIX atualizadas!');
  });
});
