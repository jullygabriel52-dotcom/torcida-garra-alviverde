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
    whatsappDiretoria: '(64) 99330-2283',
    chavePix: 'torcidagarraalviverde@gmail.com',
    tipoChavePix: 'Chave PIX Oficial TGA (E-mail)',
    titularPix: 'TORCIDA ORGANIZADA GARRA ALVIVERDE - TGA',
    cidadePix: 'RIO VERDE - GO',
    senhaAdmin: 'Tga@2015',
    planos: [
      {
        id: 'socio-unico',
        nome: 'Sócio Garra Alviverde (TGA)',
        valor: 105.0,
        valorParcela: 35.0,
        maxParcelas: 3,
        periodo: 'R$ 105,00 à vista ou em até 3x de R$ 35,00',
        destaque: true,
        beneficios: [
          '🎟️ Ingressos garantidos nos jogos em casa',
          '👕 Descontos exclusivos nos materiais oficiais da Garra (pague a 1ª parcela de entrada e já garanta na hora!)',
          '🚌 Prioridade em caravanas e viagens no grupo de sócios'
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
  inscricoesCaravana: [],
  usuariosDiretoria: [
    {
      id: 'dir-master',
      usuario: 'jully',
      nome: 'Jully Gabriel (Master)',
      cargo: 'Presidente / Master TGA',
      senha: 'Tga@2015',
      isMaster: true,
      ativo: true,
      permissoes: {
        aprovarPixSocio: true,
        editarSocio: true,
        excluirSocio: true,
        aprovarPixCaravana: true,
        excluirPassageiroCaravana: true,
        gerenciarCaravanas: true,
        exportarPlanilhas: true,
        alterarConfiguracoes: true
      }
    }
  ],
  auditoriaLogs: []
};

let appState = JSON.parse(JSON.stringify(FALLBACK_STATE));
let currentPhotoDataUrl = '';
let isAdminAuthenticated = false;
let currentAdminUser = null;

function ensureClientState(state) {
  if (!state) return;
  state.socios = Array.isArray(state.socios) ? state.socios : [];
  state.caravanas = Array.isArray(state.caravanas) ? state.caravanas : [];
  state.inscricoesCaravana = Array.isArray(state.inscricoesCaravana) ? state.inscricoesCaravana : [];
  state.auditoriaLogs = Array.isArray(state.auditoriaLogs) ? state.auditoriaLogs : [];
  state.usuariosDiretoria = Array.isArray(state.usuariosDiretoria) ? state.usuariosDiretoria : [];

  if (state.config) {
    if (!state.config.whatsappDiretoria || state.config.whatsappDiretoria === '(64) 99220-9870') {
      state.config.whatsappDiretoria = '(64) 99330-2283';
    }
    if (!state.config.senhaAdmin || state.config.senhaAdmin === '2015') {
      state.config.senhaAdmin = 'Tga@2015';
    }
    if (!Array.isArray(state.config.planos) || state.config.planos.length === 0 || Number(state.config.planos[0].valor) < 105) {
      state.config.planos = JSON.parse(JSON.stringify(FALLBACK_STATE.config.planos));
    } else {
      state.config.planos[0].valorParcela = Number(state.config.planos[0].valorParcela) || Math.round((Number(state.config.planos[0].valor) / 3) * 100) / 100;
      state.config.planos[0].maxParcelas = 3;
      state.config.planos[0].beneficios = FALLBACK_STATE.config.planos[0].beneficios;
    }
  }

  const masterPass = (state.config && state.config.senhaAdmin) ? state.config.senhaAdmin : 'Tga@2015';
  const masterIdx = state.usuariosDiretoria.findIndex(
    (u) => u.isMaster || u.id === 'dir-master' || (u.usuario && u.usuario.toLowerCase() === 'jully')
  );
  const masterDefault = {
    id: 'dir-master',
    usuario: 'jully',
    nome: 'Jully Gabriel (Master)',
    cargo: 'Presidente / Master TGA',
    senha: masterPass,
    isMaster: true,
    ativo: true,
    permissoes: {
      aprovarPixSocio: true,
      editarSocio: true,
      excluirSocio: true,
      aprovarPixCaravana: true,
      excluirPassageiroCaravana: true,
      gerenciarCaravanas: true,
      exportarPlanilhas: true,
      alterarConfiguracoes: true
    }
  };
  if (masterIdx === -1) {
    state.usuariosDiretoria.unshift(masterDefault);
  } else {
    state.usuariosDiretoria[masterIdx] = {
      ...state.usuariosDiretoria[masterIdx],
      ...masterDefault,
      nome: state.usuariosDiretoria[masterIdx].nome || masterDefault.nome,
      usuario: state.usuariosDiretoria[masterIdx].usuario || 'jully',
      senha: masterPass
    };
  }
}

function hasPerm(permKey) {
  if (!currentAdminUser) return false;
  if (currentAdminUser.isMaster) return true;
  return Boolean(currentAdminUser.permissoes && currentAdminUser.permissoes[permKey]);
}

function buildAuditPayload(categoria, acao, detalhes) {
  const entry = {
    id: 'log-' + Date.now() + '-' + Math.random().toString(36).slice(2, 6),
    dataHora: new Date().toISOString(),
    diretorNome: currentAdminUser ? currentAdminUser.nome : 'Diretoria TGA',
    diretorUsuario: currentAdminUser ? currentAdminUser.usuario : 'diretoria',
    categoria,
    acao,
    detalhes: detalhes || ''
  };
  appState.auditoriaLogs = Array.isArray(appState.auditoriaLogs) ? appState.auditoriaLogs : [];
  appState.auditoriaLogs.unshift(entry);
  return entry;
}

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

function formatDateTimeBR(isoStr) {
  if (!isoStr) return '—';
  try {
    const d = new Date(isoStr);
    if (isNaN(d.getTime())) return isoStr;
    return `${d.toLocaleDateString('pt-BR')} às ${d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`;
  } catch (e) {
    return isoStr;
  }
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
      ensureClientState(appState);
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
      ensureClientState(appState);
    } catch (e) {
      appState = JSON.parse(JSON.stringify(FALLBACK_STATE));
    }
  }
  ensureClientState(appState);
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

// Exibe o QR Code Oficial da Chave PIX da Torcida Garra Alviverde
function renderPixQrSvg() {
  const container = document.getElementById('pixQrContainer');
  if (!container) return;
  container.innerHTML = `<img src="/assets/qrcode-pix.jpg" alt="QR Code PIX Oficial TGA" class="qr-official-img" />`;
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
  document.getElementById('topWhatsappLink').href = `https://api.whatsapp.com/send?phone=${cleanWa}&text=${waMsg}`;
  document.getElementById('topWhatsappLink').textContent = `💬 ${cfg.whatsappDiretoria}`;
  document.querySelectorAll('.wa-dynamic-text').forEach((el) => {
    el.textContent = cfg.whatsappDiretoria;
  });
  const footerSub = document.getElementById('footerSubText');
  if (footerSub) {
    footerSub.textContent = `Fundada em ${cfg.anoFundacao} • Apoio ao Esporte Clube Rio Verde (E.C.R.V.) • WhatsApp: ${cfg.whatsappDiretoria}`;
  }
  const btnWaSuccess = document.getElementById('btnSuccessWhatsapp');
  if (btnWaSuccess) {
    btnWaSuccess.textContent = `📲 Enviar Comprovante no WhatsApp ${cfg.whatsappDiretoria}`;
  }

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
  const valorTotal = Number(plano?.valor) || 105;
  const valorParcela = Number(plano?.valorParcela) || Math.round((valorTotal / 3) * 100) / 100;
  const formaSelect = document.getElementById('socFormaPagamento');
  const isParcelado = formaSelect && formaSelect.value === 'parcelado_3x';

  const labelEl = document.getElementById('socValorLabel');
  const priceEl = document.getElementById('socValorCalculado');
  const hintEl = document.getElementById('socPaymentMethodHint');

  if (isParcelado) {
    if (labelEl) labelEl.textContent = 'Valor da 1ª Parcela de Entrada no PIX (1/3):';
    if (priceEl) priceEl.textContent = `${formatBRL(valorParcela)} (de ${formatBRL(valorTotal)})`;
    if (hintEl) {
      hintEl.textContent = `✔ Pague a 1ª parcela de ${formatBRL(valorParcela)} de entrada no PIX e já garanta o benefício dos materiais na hora! Os boletos da 2ª e 3ª parcela serão gerados e enviados no seu WhatsApp.`;
    }
  } else {
    if (labelEl) labelEl.textContent = 'Valor para pagar agora no PIX (À Vista):';
    if (priceEl) priceEl.textContent = formatBRL(valorTotal);
    if (hintEl) {
      hintEl.textContent = `✔ Pagamento à vista de ${formatBRL(valorTotal)} no PIX. Garante todos os benefícios do Sócio Garra na hora!`;
    }
  }

  const previewPlanoEl = document.getElementById('previewPlanoNome');
  if (previewPlanoEl) previewPlanoEl.textContent = 'SÓCIO GARRA TGA';

  const nome = document.getElementById('socNome')?.value.trim();
  const apelido = document.getElementById('socApelido')?.value.trim();
  const cpf = document.getElementById('socCpf')?.value.trim();
  const pelotao = document.getElementById('socPelotao')?.value.trim();
  const camisa = document.getElementById('socCamisa')?.value || 'G';
  const numeroCamisa = document.getElementById('socNumeroCamisa')?.value.trim();
  const sangue = document.getElementById('socSangue')?.value || 'O+';

  document.getElementById('previewNome').textContent = nome ? nome.toUpperCase() : 'NOME DO TORCEDOR ALVIVERDE';
  document.getElementById('previewApelido').textContent = apelido ? apelido.toUpperCase() : '—';
  document.getElementById('previewPelotao').textContent = pelotao || '—';
  document.getElementById('previewCpf').textContent = cpf || '000.000.000-00';
  document.getElementById('previewCamisaSangue').textContent = `${camisa} • ${sangue}`;

  const previewNumEl = document.getElementById('previewNumeroCamisa');
  if (previewNumEl) {
    previewNumEl.textContent = numeroCamisa ? `Nº ${numeroCamisa}` : 'Nº —';
  }
}

// Modal de Sucesso com botão direto para WhatsApp (usando api.whatsapp.com/send para preservar emojis)
function openSuccessModal({ titulo, descricao, valor, subtextoValor, mensagemWhatsapp }) {
  closeFeatureWindows();
  const modal = document.getElementById('modalSuccess');
  document.getElementById('successModalTitle').textContent = titulo;
  document.getElementById('successModalDesc').textContent = descricao;
  document.getElementById('successModalPix').textContent = appState.config.chavePix;
  document.getElementById('successModalValor').textContent = subtextoValor || `Valor para PIX agora: ${formatBRL(valor)}`;

  const rawWa = (appState.config.whatsappDiretoria || '').replace(/\D/g, '');
  const cleanWa = rawWa.startsWith('55') ? rawWa : `55${rawWa}`;
  const encoded = encodeURIComponent(mensagemWhatsapp);
  document.getElementById('btnSuccessWhatsapp').href = `https://api.whatsapp.com/send?phone=${cleanWa}&text=${encoded}`;

  modal.hidden = false;
}

function getSocioValorPagoEfetivo(s) {
  if (typeof s.valorPago === 'number' && !isNaN(s.valorPago)) {
    return s.valorPago;
  }
  if (s.statusPagamento === 'Pago / Ativo') return Number(s.valorPlano) || 105;
  if (s.statusPagamento === '2ª Parcela Paga (R$ 70)') return 70;
  if (s.statusPagamento === '1ª Parcela Paga (R$ 35)') return 35;
  return 0;
}

// Painel Administrativo da Diretoria
function renderAdminDashboard() {
  ensureClientState(appState);

  // Atualiza banner do diretor logado
  if (currentAdminUser) {
    const freshUser = appState.usuariosDiretoria.find(u => u.id === currentAdminUser.id);
    if (freshUser) currentAdminUser = freshUser;

    const nameEl = document.getElementById('adminLoggedName');
    const badgeEl = document.getElementById('adminLoggedRoleBadge');
    const summaryEl = document.getElementById('adminLoggedPermsSummary');
    if (nameEl) {
      nameEl.textContent = `${currentAdminUser.isMaster ? '👑' : '👤'} ${currentAdminUser.nome} (@${currentAdminUser.usuario})`;
    }
    if (badgeEl) {
      badgeEl.textContent = currentAdminUser.isMaster ? 'USUÁRIO MASTER • ACESSO TOTAL' : (currentAdminUser.cargo || 'DIRETOR TGA').toUpperCase();
      badgeEl.style.background = currentAdminUser.isMaster ? '#047857' : '#0369a1';
    }
    if (summaryEl) {
      if (currentAdminUser.isMaster) {
        summaryEl.textContent = 'Você está no comando Master: pode criar diretores, liberar/bloquear permissões e auditar todas as alterações.';
      } else {
        const p = currentAdminUser.permissoes || {};
        const liberadas = [
          p.aprovarPixSocio ? 'Confirmar PIX Sócio' : null,
          p.editarSocio ? 'Editar Ficha Sócio' : null,
          p.excluirSocio ? 'Excluir Sócio' : null,
          p.aprovarPixCaravana ? 'PIX Caravana' : null,
          p.gerenciarCaravanas ? 'Gerenciar Caravanas' : null,
          p.exportarPlanilhas ? 'Exportar Excel' : null
        ].filter(Boolean);
        summaryEl.textContent = `Permissões ativas no seu usuário: ${liberadas.length ? liberadas.join(' • ') : 'Somente visualização'}. Toda ação fica registrada em seu nome.`;
      }
    }
  }

  // Controle de visibilidade das abas e botões conforme permissão do diretor
  const isMaster = Boolean(currentAdminUser && currentAdminUser.isMaster);
  const btnTabCar = document.getElementById('btnTabGerenciarCaravanas');
  const btnTabDir = document.getElementById('btnTabDiretores');
  const btnTabAud = document.getElementById('btnTabAuditoria');
  const btnTabBkp = document.getElementById('btnTabBackups');
  const btnTabCfg = document.getElementById('btnTabConfig');

  if (btnTabCar) btnTabCar.hidden = !hasPerm('gerenciarCaravanas');
  if (btnTabDir) btnTabDir.hidden = !isMaster;
  if (btnTabAud) btnTabAud.hidden = !isMaster;
  if (btnTabBkp) btnTabBkp.hidden = !isMaster;
  if (btnTabCfg) btnTabCfg.hidden = !isMaster;

  const canExport = hasPerm('exportarPlanilhas');
  ['btnExportSociosCsv', 'btnPrintSocios', 'btnExportCaravanasCsv', 'btnPrintCaravanas'].forEach((btnId) => {
    const el = document.getElementById(btnId);
    if (el) el.hidden = !canExport;
  });

  // KPIs
  document.getElementById('kpiTotalSocios').textContent = appState.socios.length;
  document.getElementById('kpiTotalCaravanasInscritos').textContent = appState.inscricoesCaravana.length;

  const pendentesSocios = appState.socios.filter(s => s.statusPagamento !== 'Pago / Ativo').length;
  const pendentesCar = appState.inscricoesCaravana.filter(i => i.statusPix !== 'PIX Confirmado').length;
  document.getElementById('kpiTotalPendentes').textContent = pendentesSocios + pendentesCar;

  const recebidoSocios = appState.socios.reduce((acc, s) => acc + getSocioValorPagoEfetivo(s), 0);
  const previstoSocios = appState.socios.reduce((acc, s) => acc + (Number(s.valorPlano) || 105), 0);
  const recebidoCaravanas = appState.inscricoesCaravana.reduce((acc, i) => acc + (i.statusPix === 'PIX Confirmado' ? (Number(i.valorPago) || 0) : 0), 0);
  const previstoCaravanas = appState.inscricoesCaravana.reduce((acc, i) => acc + (Number(i.valorPago) || 0), 0);

  const totalRecebido = recebidoSocios + recebidoCaravanas;
  const totalPrevisto = previstoSocios + previstoCaravanas;
  document.getElementById('kpiReceitaTotal').textContent = `${formatBRL(totalRecebido)} / ${formatBRL(totalPrevisto)}`;

  document.getElementById('tabCountSocios').textContent = appState.socios.length;
  document.getElementById('tabCountCaravanas').textContent = appState.inscricoesCaravana.length;
  const countDirEl = document.getElementById('tabCountDiretores');
  if (countDirEl) countDirEl.textContent = (appState.usuariosDiretoria || []).length;
  const countAudEl = document.getElementById('tabCountAuditoria');
  if (countAudEl) countAudEl.textContent = (appState.auditoriaLogs || []).length;

  renderAdminSociosTable();
  renderAdminCaravanasFilterOptions();
  renderAdminCaravanasInscritosTable();
  renderAdminManageCaravanasList();
  renderAdminDiretoresList();
  renderAdminAuditoriaTable();
  populateAdminConfigForm();
  if (isMaster) {
    loadAndRenderBackups();
  }
}

function openEditSocioModal(socioId) {
  if (!hasPerm('editarSocio')) {
    showToast('🚫 Seu usuário não tem permissão para editar dados de sócios.');
    return;
  }
  const socio = appState.socios.find(s => s.id === socioId);
  if (!socio) return;
  document.getElementById('editSocId').value = socio.id;
  document.getElementById('editSocNome').value = socio.nome || '';
  document.getElementById('editSocApelido').value = socio.apelido || '';
  document.getElementById('editSocCpf').value = socio.cpf || '';
  document.getElementById('editSocRg').value = socio.rg || '';
  document.getElementById('editSocNascimento').value = socio.dataNascimento || '';
  document.getElementById('editSocWhatsapp').value = socio.whatsapp || '';
  document.getElementById('editSocEmail').value = socio.email || '';
  document.getElementById('editSocPelotao').value = socio.pelotao || '';
  document.getElementById('editSocCidade').value = socio.cidade || 'Rio Verde - GO';
  document.getElementById('editSocCamisa').value = socio.tamanhoCamisa || 'G';
  document.getElementById('editSocNumeroCamisa').value = socio.numeroCamisa || '';
  document.getElementById('editSocSangue').value = socio.tipoSanguineo || 'O+';

  const formaEl = document.getElementById('editSocFormaPagamento');
  if (formaEl) {
    formaEl.value = (socio.formaPagamento && socio.formaPagamento.includes('3x'))
      ? 'Parcelado em 3x de R$ 35,00'
      : 'À Vista no PIX (R$ 105,00)';
  }
  document.getElementById('editSocValor').value = Number(socio.valorPlano) || 105;
  const valPagoEl = document.getElementById('editSocValorPago');
  if (valPagoEl) valPagoEl.value = getSocioValorPagoEfetivo(socio);
  document.getElementById('editSocStatus').value = socio.statusPagamento || 'Pendente PIX';
  const bolEl = document.getElementById('editSocBoletosEnviados');
  if (bolEl) bolEl.checked = Boolean(socio.boletosEnviados);
  document.getElementById('editSocObs').value = socio.observacoes || '';

  // Se o diretor não tiver permissão de aprovar PIX, trava os campos financeiros no modal
  const canApprovePix = hasPerm('aprovarPixSocio');
  document.getElementById('editSocStatus').disabled = !canApprovePix;
  document.getElementById('editSocValor').disabled = !canApprovePix;
  if (valPagoEl) valPagoEl.disabled = !canApprovePix;
  if (formaEl) formaEl.disabled = !canApprovePix;
  if (bolEl) bolEl.disabled = !canApprovePix;

  document.getElementById('modalEditSocio').hidden = false;
}

function renderAdminSociosTable() {
  const tbody = document.getElementById('adminSociosTableBody');
  const query = (document.getElementById('searchSociosInput')?.value || '').toLowerCase();
  const statusFilter = document.getElementById('filterSociosStatus')?.value || 'todos';

  const filtrados = appState.socios.filter((s) => {
    const matchStatus = statusFilter === 'todos' || s.statusPagamento === statusFilter;
    const text = `${s.numeroCamisa || ''} ${s.matricula || ''} ${s.nome} ${s.apelido} ${s.cpf} ${s.pelotao} ${s.cidade} ${s.formaPagamento || ''}`.toLowerCase();
    return matchStatus && text.includes(query);
  });

  if (filtrados.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align:center;padding:24px;">Nenhum sócio cadastrado até o momento. Assim que alguém se inscrever no site, aparecerá aqui!</td></tr>`;
    return;
  }

  const canPix = hasPerm('aprovarPixSocio');
  const canEdit = hasPerm('editarSocio');
  const canDel = hasPerm('excluirSocio');

  tbody.innerHTML = filtrados.map((s) => {
    const isPaid = s.statusPagamento === 'Pago / Ativo';
    const isPartial = s.statusPagamento === '1ª Parcela Paga (R$ 35)' || s.statusPagamento === '2ª Parcela Paga (R$ 70)';
    const isParcelado = String(s.formaPagamento || '').includes('3x');
    const valorTotal = Number(s.valorPlano) || 105;
    const valorJaPago = getSocioValorPagoEfetivo(s);
    const faltaPagar = Math.max(0, valorTotal - valorJaPago);

    const cleanPhone = (s.whatsapp || '').replace(/\D/g, '');
    const msgCobrancaOuContato = isParcelado
      ? `\uD83D\uDFE2\u26AA Salve ${s.nome}! Aqui é da Diretoria da ${appState.config.nomeTorcida} referente ao seu Sócio Garra (${s.formaPagamento}) e envio dos boletos das parcelas.`
      : `\uD83D\uDFE2\u26AA Salve ${s.nome}! Aqui é da Diretoria da ${appState.config.nomeTorcida} referente à sua inscrição de Sócio Garra Alviverde.`;
    const waLink = `https://api.whatsapp.com/send?phone=55${cleanPhone.replace(/^55/, '')}&text=${encodeURIComponent(msgCobrancaOuContato)}`;
    const numCamisaDisplay = s.numeroCamisa ? `Nº ${s.numeroCamisa}` : 'Nº —';

    let btnPixLabel = '✔ Confirmar PIX (R$ 105)';
    if (isParcelado) {
      if (s.statusPagamento === 'Pendente PIX') btnPixLabel = '✔ Confirmar 1ª Parc. (R$ 35)';
      else if (s.statusPagamento === '1ª Parcela Paga (R$ 35)') btnPixLabel = '✔ Confirmar 2ª Parc. (R$ 70)';
      else if (s.statusPagamento === '2ª Parcela Paga (R$ 70)') btnPixLabel = '✔ Quitar 3ª Parc. (R$ 105)';
      else btnPixLabel = 'Voltar p/ Pendente';
    } else {
      btnPixLabel = isPaid ? 'Marcar Pendente' : '✔ Confirmar PIX (R$ 105)';
    }

    const boletoBadgeHtml = isParcelado
      ? `<div style="margin-top:5px;">
           <button type="button" class="btn-table" data-toggle-boleto="${s.id}" style="font-size:0.72rem; padding:3px 8px; background:${s.boletosEnviados ? '#dcfce7' : '#fef3c7'}; color:${s.boletosEnviados ? '#166534' : '#92400e'}; border:1px solid ${s.boletosEnviados ? '#86efac' : '#fde68a'};">
             ${s.boletosEnviados ? '📄 Boletos Enviados ✔' : '📄 Marcar Boleto Enviado'}
           </button>
         </div>`
      : '';

    const aprovadoInfoHtml = s.aprovadoPor
      ? `<div style="font-size:0.72rem; color:#047857; margin-top:4px; line-height:1.25;">
           👤 Por: <strong>${s.aprovadoPor.nome}</strong><br>
           <span>${formatDateTimeBR(s.aprovadoPor.dataHora)}</span>
         </div>`
      : '';

    const editadoInfoHtml = s.ultimaEdicao
      ? `<div style="font-size:0.72rem; color:#0369a1; margin-top:3px; line-height:1.25;" title="${(s.ultimaEdicao.resumo || '').replace(/"/g, '&quot;')}">
           ✏️ Editado por: <strong>${s.ultimaEdicao.nome}</strong> (${formatDateTimeBR(s.ultimaEdicao.dataHora)})
         </div>`
      : '';

    return `
      <tr>
        <td>
          <strong>\uD83D\uDC55 ${numCamisaDisplay}</strong><br>
          <small>${formatDateBR(s.createdAt)}</small>
        </td>
        <td>
          <strong>${s.nome}</strong><br>
          <small>Apelido: ${s.apelido || '—'} | Nasc: ${formatDateBR(s.dataNascimento)}</small>
          ${editadoInfoHtml}
        </td>
        <td>
          CPF: ${s.cpf}<br>
          <small>RG: ${s.rg || '—'}</small>
        </td>
        <td>
          ${s.whatsapp}<br>
          <small>${s.pelotao || '—'} (${s.cidade || ''})</small>
        </td>
        <td>
          <strong>${s.formaPagamento || 'À Vista no PIX (R$ 105,00)'}</strong><br>
          <small style="color:${faltaPagar === 0 ? '#047857' : '#b45309'}; font-weight:700;">
            Pago: ${formatBRL(valorJaPago)} de ${formatBRL(valorTotal)} ${faltaPagar > 0 ? `(Falta ${formatBRL(faltaPagar)})` : '(Quitado)'}
          </small><br>
          <small>Camisa: <strong>${s.tamanhoCamisa} (${numCamisaDisplay})</strong> | Sangue: ${s.tipoSanguineo}</small>
        </td>
        <td>
          <span class="status-badge ${isPaid ? 'status-paid' : 'status-pending'}" style="${isPartial ? 'background:#e0f2fe;color:#0369a1;' : ''}">
            ${s.statusPagamento}
          </span>
          ${boletoBadgeHtml}
          ${aprovadoInfoHtml}
        </td>
        <td>
          <div class="action-btns">
            ${canPix ? `
              <button type="button" class="btn-table btn-approve" data-toggle-socio="${s.id}">
                ${btnPixLabel}
              </button>
            ` : ''}
            ${canEdit ? `
              <button type="button" class="btn-table btn-edit" data-edit-socio="${s.id}" style="background:#e0f2fe;color:#0369a1;border-color:#7dd3fc;">
                ✏️ Editar
              </button>
            ` : ''}
            <a href="${waLink}" target="_blank" rel="noopener" class="btn-table btn-wa">
              💬 WhatsApp
            </a>
            ${canDel ? `
              <button type="button" class="btn-table btn-del" data-del-socio="${s.id}">
                🗑️
              </button>
            ` : ''}
          </div>
        </td>
      </tr>
    `;
  }).join('');

  tbody.querySelectorAll('[data-toggle-socio]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      if (!hasPerm('aprovarPixSocio')) {
        showToast('🚫 Você não tem permissão para alterar status de pagamento PIX.');
        return;
      }
      const id = btn.getAttribute('data-toggle-socio');
      const socio = appState.socios.find(x => x.id === id);
      if (!socio) return;

      const isParcelado = String(socio.formaPagamento || '').includes('3x');
      const statusAntigo = socio.statusPagamento;
      let novoStatus = 'Pago / Ativo';
      let novoValorPago = 105;
      let novasParcelas = 1;

      if (isParcelado) {
        if (statusAntigo === 'Pendente PIX') {
          novoStatus = '1ª Parcela Paga (R$ 35)';
          novoValorPago = 35;
          novasParcelas = 1;
        } else if (statusAntigo === '1ª Parcela Paga (R$ 35)') {
          novoStatus = '2ª Parcela Paga (R$ 70)';
          novoValorPago = 70;
          novasParcelas = 2;
        } else if (statusAntigo === '2ª Parcela Paga (R$ 70)') {
          novoStatus = 'Pago / Ativo';
          novoValorPago = 105;
          novasParcelas = 3;
        } else {
          novoStatus = 'Pendente PIX';
          novoValorPago = 0;
          novasParcelas = 0;
        }
      } else {
        if (statusAntigo === 'Pago / Ativo') {
          novoStatus = 'Pendente PIX';
          novoValorPago = 0;
          novasParcelas = 0;
        } else {
          novoStatus = 'Pago / Ativo';
          novoValorPago = Number(socio.valorPlano) || 105;
          novasParcelas = 1;
        }
      }

      const dirNome = currentAdminUser ? currentAdminUser.nome : 'Diretoria';
      const ok = window.confirm(
        `Confirmar atualização financeira de "${socio.nome}" para:\n• Status: ${novoStatus}\n• Total Pago: ${formatBRL(novoValorPago)}\n\nEsta ação ficará registrada em seu usuário: ${dirNome}.`
      );
      if (!ok) return;

      const aprovadoPor = {
        nome: dirNome,
        usuario: currentAdminUser ? currentAdminUser.usuario : 'diretoria',
        dataHora: new Date().toISOString(),
        status: novoStatus
      };
      socio.statusPagamento = novoStatus;
      socio.valorPago = novoValorPago;
      socio.parcelasPagas = novasParcelas;
      socio.aprovadoPor = aprovadoPor;

      const audit = buildAuditPayload(
        'PIX Sócio',
        `Atualizou pagamento do sócio ${socio.nome} para "${novoStatus}"`,
        `Status: "${statusAntigo}" ➔ "${novoStatus}" | Valor Pago: ${formatBRL(novoValorPago)} de ${formatBRL(socio.valorPlano || 105)}`
      );

      try {
        await fetch(`/api/socios/${id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            statusPagamento: novoStatus,
            valorPago: novoValorPago,
            parcelasPagas: novasParcelas,
            aprovadoPor,
            _auditoria: audit
          })
        });
      } catch (e) {}
      saveLocalBackup();
      renderAll();
      showToast(`Financeiro de ${socio.nome} atualizado por ${dirNome}: ${novoStatus}`);
    });
  });

  // Botão rápido de marcar/desmarcar Boletos Enviados no WhatsApp
  tbody.querySelectorAll('[data-toggle-boleto]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      if (!hasPerm('aprovarPixSocio') && !hasPerm('editarSocio')) {
        showToast('🚫 Você não tem permissão para alterar status de boletos.');
        return;
      }
      const id = btn.getAttribute('data-toggle-boleto');
      const socio = appState.socios.find(x => x.id === id);
      if (!socio) return;
      socio.boletosEnviados = !socio.boletosEnviados;
      const dirNome = currentAdminUser ? currentAdminUser.nome : 'Diretoria';

      const audit = buildAuditPayload(
        'PIX Sócio',
        `${socio.boletosEnviados ? 'Marcou que enviou os boletos no WhatsApp' : 'Desmarcou envio de boletos'} do sócio ${socio.nome}`,
        `Boletos WhatsApp: ${socio.boletosEnviados ? 'Enviados ✔' : 'Pendente'}`
      );

      try {
        await fetch(`/api/socios/${id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ boletosEnviados: socio.boletosEnviados, _auditoria: audit })
        });
      } catch (e) {}
      saveLocalBackup();
      renderAll();
      showToast(`📄 Boletos de ${socio.nome}: ${socio.boletosEnviados ? 'Marcado como Enviado no WhatsApp!' : 'Marcado como Pendente'}`);
    });
  });

  tbody.querySelectorAll('[data-edit-socio]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-edit-socio');
      openEditSocioModal(id);
    });
  });

  tbody.querySelectorAll('[data-del-socio]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      if (!hasPerm('excluirSocio')) {
        showToast('🚫 Apenas usuários com permissão de exclusão podem remover sócios.');
        return;
      }
      const id = btn.getAttribute('data-del-socio');
      const socio = appState.socios.find(x => x.id === id);
      if (!socio) return;
      const ok = window.confirm(
        `Tem certeza que deseja EXCLUIR o cadastro do sócio "${socio.nome}"?\n\nEsta exclusão ficará registrada no Histórico de Auditoria em nome de ${currentAdminUser?.nome || 'Diretoria'}.`
      );
      if (!ok) return;

      const audit = buildAuditPayload(
        'Exclusão de Sócio',
        `Excluiu o cadastro do sócio ${socio.nome}`,
        `CPF: ${socio.cpf} | Camisa Nº ${socio.numeroCamisa || '—'} | Status era: ${socio.statusPagamento}`
      );

      appState.socios = appState.socios.filter(x => x.id !== id);
      try {
        await fetch(`/api/socios/${id}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ _auditoria: audit })
        });
      } catch (e) {}
      saveLocalBackup();
      renderAll();
      showToast('Cadastro de sócio removido e registrado na auditoria.');
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

  const canPixCar = hasPerm('aprovarPixCaravana');
  const canDelCar = hasPerm('excluirPassageiroCaravana');

  tbody.innerHTML = filtrados.map((i) => {
    const isPaid = i.statusPix === 'PIX Confirmado';
    const cleanPhone = (i.whatsapp || '').replace(/\D/g, '');
    const waLink = `https://api.whatsapp.com/send?phone=55${cleanPhone.replace(/^55/, '')}&text=${encodeURIComponent(
      `Salve ${i.nome}! Aqui é da Diretoria da ${appState.config.nomeTorcida} sobre sua reserva na caravana "${i.caravanaTitulo}" (${i.onibusEscolhido}).`
    )}`;
    const aprovadoCarHtml = i.aprovadoPor
      ? `<div style="font-size:0.72rem; color:#047857; margin-top:4px; line-height:1.25;">
           👤 Por: <strong>${i.aprovadoPor.nome}</strong><br>
           <span>${formatDateTimeBR(i.aprovadoPor.dataHora)}</span>
         </div>`
      : '';

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
          ${aprovadoCarHtml}
        </td>
        <td>
          <div class="action-btns">
            ${canPixCar ? `
              <button type="button" class="btn-table btn-approve" data-toggle-car-ins="${i.id}">
                ${isPaid ? 'Pendente' : '✔ Confirmar PIX'}
              </button>
            ` : ''}
            <a href="${waLink}" target="_blank" rel="noopener" class="btn-table btn-wa">
              💬 WhatsApp
            </a>
            ${canDelCar ? `
              <button type="button" class="btn-table btn-del" data-del-car-ins="${i.id}">
                🗑️
              </button>
            ` : ''}
          </div>
        </td>
      </tr>
    `;
  }).join('');

  tbody.querySelectorAll('[data-toggle-car-ins]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      if (!hasPerm('aprovarPixCaravana')) return;
      const id = btn.getAttribute('data-toggle-car-ins');
      const item = appState.inscricoesCaravana.find(x => x.id === id);
      if (!item) return;
      const statusAntigo = item.statusPix;
      const novoStatus = statusAntigo === 'PIX Confirmado' ? 'Aguardando PIX' : 'PIX Confirmado';
      const dirNome = currentAdminUser ? currentAdminUser.nome : 'Diretoria';

      const ok = window.confirm(
        `Confirmar alteração do PIX do passageiro "${item.nome}" para "${novoStatus}"?\n\nEsta ação ficará registrada em seu usuário: ${dirNome}.`
      );
      if (!ok) return;

      const aprovadoPor = {
        nome: dirNome,
        usuario: currentAdminUser ? currentAdminUser.usuario : 'diretoria',
        dataHora: new Date().toISOString(),
        status: novoStatus
      };
      item.statusPix = novoStatus;
      item.aprovadoPor = aprovadoPor;

      const audit = buildAuditPayload(
        'PIX Caravana',
        `Alterou status PIX do passageiro ${item.nome} na caravana "${item.caravanaTitulo}"`,
        `Status PIX: "${statusAntigo}" ➔ "${novoStatus}" (${item.onibusEscolhido})`
      );

      try {
        await fetch(`/api/inscricoes-caravana/${id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ statusPix: novoStatus, aprovadoPor, _auditoria: audit })
        });
      } catch (e) {}
      saveLocalBackup();
      renderAll();
      showToast(`Status do passageiro ${item.nome} atualizado por ${dirNome}: ${novoStatus}`);
    });
  });

  tbody.querySelectorAll('[data-del-car-ins]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      if (!hasPerm('excluirPassageiroCaravana')) return;
      const id = btn.getAttribute('data-del-car-ins');
      const target = appState.inscricoesCaravana.find(x => x.id === id);
      if (!target) return;
      const ok = window.confirm(`Deseja remover o passageiro "${target.nome}" da lista da caravana?`);
      if (!ok) return;

      const audit = buildAuditPayload(
        'PIX Caravana',
        `Removeu o passageiro ${target.nome} da caravana "${target.caravanaTitulo}"`,
        `Doc: ${target.documento} | Ônibus: ${target.onibusEscolhido} | Status era: ${target.statusPix}`
      );

      const car = appState.caravanas.find(c => c.id === target.caravanaId);
      if (car && car.vagasOcupadas > 0) car.vagasOcupadas -= 1;
      appState.inscricoesCaravana = appState.inscricoesCaravana.filter(x => x.id !== id);
      try {
        await fetch(`/api/inscricoes-caravana/${id}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ _auditoria: audit })
        });
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
  const canManage = hasPerm('gerenciarCaravanas');
  list.innerHTML = appState.caravanas.map((c) => `
    <div class="manage-item">
      <div>
        <strong>${c.jogo}</strong> (${c.status})<br>
        <small>${c.adversario} • ${formatDateBR(c.dataJogo)} • Sócio TGA: ${formatBRL(c.valorSocio)} / Não-Sócio: ${formatBRL(c.valorNaoSocio)}</small>
      </div>
      <div class="action-btns">
        ${canManage ? `<button type="button" class="btn-table btn-del" data-del-caravana="${c.id}">Excluir</button>` : ''}
      </div>
    </div>
  `).join('');

  list.querySelectorAll('[data-del-caravana]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      if (!hasPerm('gerenciarCaravanas')) return;
      const id = btn.getAttribute('data-del-caravana');
      const car = appState.caravanas.find(c => c.id === id);
      if (!car) return;
      const ok = window.confirm(`Deseja excluir a caravana "${car.jogo}"?`);
      if (!ok) return;

      const audit = buildAuditPayload(
        'Caravanas',
        `Excluiu a caravana "${car.jogo}"`,
        `Data: ${formatDateBR(car.dataJogo)} | Adversário: ${car.adversario}`
      );

      appState.caravanas = appState.caravanas.filter(c => c.id !== id);
      try {
        await fetch(`/api/caravanas/${id}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ _auditoria: audit })
        });
      } catch (e) {}
      saveLocalBackup();
      renderAll();
      showToast('Caravana removida.');
    });
  });
}

function renderAdminDiretoresList() {
  const container = document.getElementById('adminDiretoresList');
  if (!container) return;
  ensureClientState(appState);

  const permLabels = [
    { key: 'aprovarPixSocio', label: '✔ Confirmar PIX de Sócios' },
    { key: 'editarSocio', label: '✏️ Editar Ficha de Sócio' },
    { key: 'excluirSocio', label: '🗑️ Excluir Cadastro de Sócio' },
    { key: 'aprovarPixCaravana', label: '🚌 Confirmar PIX Caravana' },
    { key: 'excluirPassageiroCaravana', label: '🚫 Remover Passageiro Caravana' },
    { key: 'gerenciarCaravanas', label: '➕ Criar/Excluir Caravanas' },
    { key: 'exportarPlanilhas', label: '📥 Baixar Planilhas Excel' }
  ];

  container.innerHTML = appState.usuariosDiretoria.map((d) => {
    if (d.isMaster) {
      return `
        <div class="manage-item" style="flex-direction:column; align-items:stretch; gap:8px; background:#ecfdf5; border:2px solid #10b981;">
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
            <div>
              <strong style="color:#065f46; font-size:1rem;">👑 ${d.nome}</strong>
              <span class="status-badge status-paid" style="margin-left:6px;">MASTER PRINCIPAL</span><br>
              <small>Usuário de login: <strong>${d.usuario}</strong> (ou <strong>master</strong>) • Senha atual: <code>${d.senha}</code></small>
            </div>
            <button type="button" class="btn-table btn-approve" data-change-pass-dir="${d.id}">
              🔑 Alterar Senha Master
            </button>
          </div>
          <small style="color:#047857;">Possui todas as permissões liberadas permanentemente e controle sobre todos os diretores.</small>
        </div>
      `;
    }

    const p = d.permissoes || {};
    const isAtivo = d.ativo !== false;

    return `
      <div class="manage-item" style="flex-direction:column; align-items:stretch; gap:10px; opacity:${isAtivo ? '1' : '0.68'};">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:8px;">
          <div>
            <strong style="font-size:0.98rem;">👤 ${d.nome}</strong>
            <span class="status-badge ${isAtivo ? 'status-paid' : 'status-pending'}" style="margin-left:6px;">
              ${isAtivo ? 'Acesso Ativo' : 'Bloqueado'}
            </span><br>
            <small>Cargo: <strong>${d.cargo || 'Diretor'}</strong> • Login: <code>${d.usuario}</code> • Senha: <code>${d.senha}</code></small>
          </div>
          <div class="action-btns">
            <button type="button" class="btn-table" style="background:#e0f2fe;color:#0369a1;border-color:#7dd3fc;" data-change-pass-dir="${d.id}">
              🔑 Senha
            </button>
            <button type="button" class="btn-table btn-approve" data-toggle-active-dir="${d.id}">
              ${isAtivo ? '🚫 Bloquear' : '✅ Liberar'}
            </button>
            <button type="button" class="btn-table btn-del" data-del-dir="${d.id}">
              🗑️
            </button>
          </div>
        </div>

        <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:10px;">
          <div style="font-size:0.76rem; font-weight:700; color:#475569; margin-bottom:6px; text-transform:uppercase;">
            Permissões deste Diretor (Clique para ativar/desativar na hora):
          </div>
          <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(210px, 1fr)); gap:6px; font-size:0.82rem;">
            ${permLabels.map((item) => `
              <label style="display:flex; align-items:center; gap:6px; cursor:pointer;">
                <input type="checkbox" data-perm-dir="${d.id}" data-perm-key="${item.key}" ${p[item.key] ? 'checked' : ''} />
                <span>${item.label}</span>
              </label>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }).join('');

  // Eventos de ligar/desligar permissão em tempo real
  container.querySelectorAll('[data-perm-dir]').forEach((checkbox) => {
    checkbox.addEventListener('change', async () => {
      const dirId = checkbox.getAttribute('data-perm-dir');
      const permKey = checkbox.getAttribute('data-perm-key');
      const dir = appState.usuariosDiretoria.find(u => u.id === dirId);
      if (!dir || dir.isMaster) return;

      dir.permissoes = dir.permissoes || {};
      const novoValor = checkbox.checked;
      dir.permissoes[permKey] = novoValor;

      const audit = buildAuditPayload(
        'Diretoria',
        `${novoValor ? 'Liberou' : 'Removeu'} permissão "${permKey}" do diretor ${dir.nome} (@${dir.usuario})`,
        `Permissão ${permKey}: ${novoValor ? 'ATIVADA' : 'DESATIVADA'}`
      );

      try {
        await fetch(`/api/diretores/${dirId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ permissoes: dir.permissoes, _auditoria: audit })
        });
      } catch (e) {}
      saveLocalBackup();
      renderAdminAuditoriaTable();
      showToast(`✅ Permissão de ${dir.nome} atualizada!`);
    });
  });

  // Trocar senha de um diretor (ou Master)
  container.querySelectorAll('[data-change-pass-dir]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const dirId = btn.getAttribute('data-change-pass-dir');
      const dir = appState.usuariosDiretoria.find(u => u.id === dirId);
      if (!dir) return;
      const novaSenha = window.prompt(`Digite a nova senha para ${dir.nome} (@${dir.usuario}):`, dir.senha);
      if (!novaSenha || !novaSenha.trim()) return;
      dir.senha = novaSenha.trim();
      if (dir.isMaster) {
        appState.config.senhaAdmin = dir.senha;
      }

      const audit = buildAuditPayload(
        'Diretoria',
        `Alterou a senha de acesso de ${dir.nome} (@${dir.usuario})`,
        `Credencial atualizada pelo Master`
      );

      try {
        await fetch(`/api/diretores/${dirId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ senha: dir.senha, _auditoria: audit })
        });
      } catch (e) {}
      saveLocalBackup();
      renderAdminDashboard();
      showToast(`🔑 Nova senha salva para ${dir.nome}!`);
    });
  });

  // Bloquear / Desbloquear diretor
  container.querySelectorAll('[data-toggle-active-dir]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const dirId = btn.getAttribute('data-toggle-active-dir');
      const dir = appState.usuariosDiretoria.find(u => u.id === dirId);
      if (!dir || dir.isMaster) return;
      dir.ativo = dir.ativo === false ? true : false;

      const audit = buildAuditPayload(
        'Diretoria',
        `${dir.ativo ? 'Desbloqueou' : 'Bloqueou'} o acesso do diretor ${dir.nome} (@${dir.usuario})`,
        `Status da conta: ${dir.ativo ? 'Ativo' : 'Bloqueado'}`
      );

      try {
        await fetch(`/api/diretores/${dirId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ativo: dir.ativo, _auditoria: audit })
        });
      } catch (e) {}
      saveLocalBackup();
      renderAdminDashboard();
      showToast(`${dir.ativo ? '✅ Acesso liberado' : '🚫 Acesso bloqueado'} para ${dir.nome}.`);
    });
  });

  // Excluir diretor
  container.querySelectorAll('[data-del-dir]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const dirId = btn.getAttribute('data-del-dir');
      const dir = appState.usuariosDiretoria.find(u => u.id === dirId);
      if (!dir || dir.isMaster) return;
      const ok = window.confirm(`Tem certeza que deseja excluir o usuário do diretor "${dir.nome}" (@${dir.usuario})?`);
      if (!ok) return;

      const audit = buildAuditPayload(
        'Diretoria',
        `Excluiu a credencial do diretor ${dir.nome} (@${dir.usuario})`,
        `Cargo: ${dir.cargo}`
      );

      appState.usuariosDiretoria = appState.usuariosDiretoria.filter(u => u.id !== dirId);
      try {
        await fetch(`/api/diretores/${dirId}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ _auditoria: audit })
        });
      } catch (e) {}
      saveLocalBackup();
      renderAdminDashboard();
      showToast(`🗑️ Credencial de ${dir.nome} removida.`);
    });
  });
}

function renderAdminAuditoriaTable() {
  const tbody = document.getElementById('adminAuditoriaTableBody');
  if (!tbody) return;
  const query = (document.getElementById('searchAuditoriaInput')?.value || '').toLowerCase();
  const catFilter = document.getElementById('filterAuditoriaCategoria')?.value || 'todas';

  const logs = Array.isArray(appState.auditoriaLogs) ? appState.auditoriaLogs : [];
  const filtrados = logs.filter((l) => {
    const matchCat = catFilter === 'todas' || l.categoria === catFilter;
    const text = `${l.diretorNome} ${l.diretorUsuario} ${l.categoria} ${l.acao} ${l.detalhes}`.toLowerCase();
    return matchCat && text.includes(query);
  });

  if (filtrados.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;padding:24px;">Nenhum registro de alteração até o momento. Toda aprovação de PIX ou edição de dados aparecerá aqui com nome do diretor, data e hora!</td></tr>`;
    return;
  }

  tbody.innerHTML = filtrados.map((l) => `
    <tr>
      <td style="white-space:nowrap;">
        <strong>${formatDateTimeBR(l.dataHora)}</strong>
      </td>
      <td>
        <strong>👤 ${l.diretorNome}</strong><br>
        <small>@${l.diretorUsuario}</small>
      </td>
      <td>
        <span class="status-badge status-paid" style="background:#e0f2fe;color:#0369a1;">
          ${l.categoria}
        </span>
      </td>
      <td>
        <strong>${l.acao}</strong>
      </td>
      <td>
        <small style="color:#334155; font-size:0.83rem;">${l.detalhes || '—'}</small>
      </td>
    </tr>
  `).join('');
}

function populateAdminConfigForm() {
  const cfg = appState.config;
  const planoUnico = getSinglePlan();
  document.getElementById('cfgPlanoUnicoNome').value = planoUnico.nome || 'Sócio Garra Alviverde (TGA)';
  document.getElementById('cfgPlanoUnicoValor').value = planoUnico.valor ?? 105;
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
  document.getElementById('cfgSenhaAdmin').value = (!cfg.senhaAdmin || cfg.senhaAdmin === '2015') ? 'Tga@2015' : cfg.senhaAdmin;
}

// ============================================================================
// PLANILHAS PROFISSIONAIS FORMATADAS (.XLS COM CABEÇALHO VERDE E LOGO + PDF)
// ============================================================================
function escapeHtml(val) {
  return String(val ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function getStatusCellStyles(val) {
  const s = String(val ?? '');
  if (s === 'Pago / Ativo' || s === 'PIX Confirmado' || s === 'Sim') {
    return 'background-color:#dcfce7; color:#166534; font-weight:bold; text-align:center;';
  }
  if (s.includes('Parcela Paga')) {
    return 'background-color:#dbeafe; color:#1e40af; font-weight:bold; text-align:center;';
  }
  if (s.includes('Pendente') || s.includes('Aguardando')) {
    return 'background-color:#fef3c7; color:#92400e; font-weight:bold; text-align:center;';
  }
  return '';
}

function downloadStyledExcel({ filename, sheetName, reportTitle, subtitle, summaryItems = [], headers = [], rows = [], textCols = [] }) {
  const origin = window.location.origin;
  const logoTgaUrl = `${origin}/assets/logo-tga.jpg`;
  const logoEcrvUrl = `${origin}/assets/escudo-ecrv.jpg`;
  const emittedAt = formatDateTimeBR(new Date().toISOString());
  const emittedBy = currentAdminUser ? `${currentAdminUser.nome} (@${currentAdminUser.usuario})` : 'Diretoria TGA';
  const colSpan = Math.max(headers.length, 4);
  const textColSet = new Set(textCols);

  const summaryBarText = [
    `Emitido em: ${emittedAt}`,
    `Responsável: ${emittedBy}`,
    ...summaryItems
  ].join('   |   ');

  const headerCellsHtml = headers.map((h) => `
    <th style="background-color:#006437; color:#ffffff; font-weight:bold; font-family:'Segoe UI',Arial,sans-serif; font-size:10.5pt; border:1px solid #052e16; padding:10px 12px; text-align:center; vertical-align:middle; white-space:nowrap;">
      ${escapeHtml(h)}
    </th>
  `).join('');

  const bodyRowsHtml = rows.length === 0
    ? `<tr><td colspan="${colSpan}" style="padding:18px; text-align:center; font-family:'Segoe UI',Arial,sans-serif; font-size:10pt; border:1px solid #cbd5e1;">Nenhum registro encontrado para esta planilha.</td></tr>`
    : rows.map((row, rowIndex) => {
        const rowBg = rowIndex % 2 === 0 ? '#ffffff' : '#f0fdf4';
        const cells = row.map((cellVal, colIndex) => {
          const isTextCol = textColSet.has(colIndex);
          const statusStyle = getStatusCellStyles(cellVal);
          const textFormat = isTextCol ? "mso-number-format:'\\@';" : '';
          const alignStyle = isTextCol ? 'text-align:center;' : '';
          return `<td style="background-color:${rowBg}; color:#0f172a; font-family:'Segoe UI',Arial,sans-serif; font-size:10pt; border:1px solid #cbd5e1; padding:8px 10px; vertical-align:middle; ${textFormat} ${alignStyle} ${statusStyle}">${escapeHtml(cellVal)}</td>`;
        }).join('');
        return `<tr>${cells}</tr>`;
      }).join('');

  const excelHtml = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <!--[if gte mso 9]>
  <xml>
    <x:ExcelWorkbook>
      <x:ExcelWorksheets>
        <x:ExcelWorksheet>
          <x:Name>${escapeHtml((sheetName || 'Planilha TGA').slice(0, 30))}</x:Name>
          <x:WorksheetOptions>
            <x:DisplayGridlines/>
          </x:WorksheetOptions>
        </x:ExcelWorksheet>
      </x:ExcelWorksheets>
    </x:ExcelWorkbook>
  </xml>
  <![endif]-->
</head>
<body style="margin:0; padding:0; font-family:'Segoe UI',Arial,sans-serif;">
  <table border="1" cellspacing="0" cellpadding="0" style="border-collapse:collapse; width:100%;">
    <tr>
      <td colspan="${colSpan}" style="background-color:#006437; color:#ffffff; padding:14px 18px; border:2px solid #052e16; text-align:left; vertical-align:middle;">
        <table border="0" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
          <tr>
            <td style="background-color:#006437; border:none; padding-right:12px; vertical-align:middle;">
              <img src="${logoTgaUrl}" width="54" height="54" alt="Logo TGA" style="border-radius:50%; display:block;" />
            </td>
            <td style="background-color:#006437; border:none; padding-right:14px; vertical-align:middle;">
              <img src="${logoEcrvUrl}" width="54" height="54" alt="Escudo ECRV" style="border-radius:50%; display:block;" />
            </td>
            <td style="background-color:#006437; border:none; color:#ffffff; vertical-align:middle;">
              <div style="font-size:14pt; font-weight:bold; color:#ffffff; letter-spacing:0.5px;">
                TORCIDA ORGANIZADA GARRA ALVIVERDE (TGA) • ESPORTE CLUBE RIO VERDE (E.C.R.V.)
              </div>
              <div style="font-size:12pt; font-weight:bold; color:#fde047; margin-top:2px;">
                ${escapeHtml(reportTitle)}
              </div>
              <div style="font-size:9.5pt; color:#d1fae5; margin-top:2px;">
                ${escapeHtml(subtitle || 'Fundada em 19/05/2015 • Estádio Mozart Veloso do Carmo (Velosão) • Rio Verde - GO • WhatsApp: (64) 99330-2283')}
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td colspan="${colSpan}" style="background-color:#052e16; color:#ffffff; font-weight:bold; font-size:9.5pt; padding:8px 14px; border:1px solid #052e16;">
        ${escapeHtml(summaryBarText)}
      </td>
    </tr>
    <tr>
      ${headerCellsHtml}
    </tr>
    ${bodyRowsHtml}
    <tr>
      <td colspan="${colSpan}" style="background-color:#ecfdf5; color:#065f46; font-weight:bold; font-size:9.5pt; padding:9px 14px; border-top:2px solid #006437; border-bottom:2px solid #006437;">
        Documento Oficial — ${escapeHtml(appState.config.nomeTorcida || 'TORCIDA ORGANIZADA GARRA ALVIVERDE')} (${escapeHtml(appState.config.sigla || 'TGA')}) • Total de registros listados: ${rows.length}
      </td>
    </tr>
  </table>
</body>
</html>`;

  const blob = new Blob(['\uFEFF' + excelHtml], { type: 'application/vnd.ms-excel;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename.endsWith('.xls') ? filename : `${filename}.xls`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function printStyledReport({ reportTitle, subtitle, summaryItems = [], headers = [], rows = [] }) {
  const origin = window.location.origin;
  const logoTgaUrl = `${origin}/assets/logo-tga.jpg`;
  const logoEcrvUrl = `${origin}/assets/escudo-ecrv.jpg`;
  const emittedAt = formatDateTimeBR(new Date().toISOString());
  const emittedBy = currentAdminUser ? `${currentAdminUser.nome} (@${currentAdminUser.usuario})` : 'Diretoria TGA';

  const headerCellsHtml = headers.map((h) => `<th>${escapeHtml(h)}</th>`).join('');
  const bodyRowsHtml = rows.length === 0
    ? `<tr><td colspan="${headers.length}" style="text-align:center; padding:20px;">Nenhum registro encontrado.</td></tr>`
    : rows.map((row) => {
        const cells = row.map((cellVal) => {
          const st = getStatusCellStyles(cellVal);
          return `<td style="${st}">${escapeHtml(cellVal)}</td>`;
        }).join('');
        return `<tr>${cells}</tr>`;
      }).join('');

  const printWin = window.open('', '_blank');
  if (!printWin) {
    showToast('⚠️ Permita pop-ups no navegador para abrir a tela de Impressão / PDF.');
    return;
  }

  printWin.document.write(`<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <title>${escapeHtml(reportTitle)} — TGA</title>
  <style>
    @page { size: landscape; margin: 10mm; }
    * { box-sizing: border-box; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
    body { font-family: 'Segoe UI', Arial, sans-serif; margin: 0; padding: 16px; color: #0f172a; background: #ffffff; }
    .banner {
      display: flex; align-items: center; justify-content: space-between; gap: 16px;
      background: #006437; color: #ffffff; padding: 16px 20px; border-radius: 12px 12px 0 0;
      border-bottom: 3px solid #eab308;
    }
    .banner-left { display: flex; align-items: center; gap: 14px; }
    .banner-logos { display: flex; gap: 8px; }
    .banner-logos img { width: 58px; height: 58px; border-radius: 50%; border: 2px solid #eab308; background: #fff; object-fit: cover; }
    .banner-title h1 { margin: 0; font-size: 17px; text-transform: uppercase; letter-spacing: 0.4px; }
    .banner-title h2 { margin: 3px 0 0; font-size: 14px; color: #fde047; }
    .banner-title p { margin: 3px 0 0; font-size: 11px; color: #d1fae5; }
    .summary-bar {
      background: #052e16; color: #ffffff; padding: 8px 20px; font-size: 11.5px; font-weight: 700;
      display: flex; flex-wrap: wrap; gap: 18px; border-radius: 0 0 10px 10px; margin-bottom: 12px;
    }
    table { width: 100%; border-collapse: collapse; font-size: 10.5px; }
    th {
      background: #006437; color: #ffffff; font-weight: 700; padding: 8px 8px;
      border: 1px solid #052e16; text-align: left;
    }
    td { padding: 6px 8px; border: 1px solid #cbd5e1; vertical-align: middle; }
    tr:nth-child(even) td { background: #f0fdf4; }
    .no-print { margin-bottom: 12px; display: flex; gap: 10px; justify-content: flex-end; }
    .btn-print {
      background: #006437; color: #fff; border: none; padding: 8px 16px; border-radius: 8px;
      font-weight: 700; cursor: pointer; font-size: 13px;
    }
    @media print { .no-print { display: none !important; } body { padding: 0; } }
  </style>
</head>
<body>
  <div class="no-print">
    <button class="btn-print" onclick="window.print()">🖨️ Imprimir ou Salvar como PDF</button>
  </div>
  <div class="banner">
    <div class="banner-left">
      <div class="banner-logos">
        <img src="${logoTgaUrl}" alt="TGA" />
        <img src="${logoEcrvUrl}" alt="ECRV" />
      </div>
      <div class="banner-title">
        <h1>TORCIDA ORGANIZADA GARRA ALVIVERDE (TGA) • ESPORTE CLUBE RIO VERDE (E.C.R.V.)</h1>
        <h2>${escapeHtml(reportTitle)}</h2>
        <p>${escapeHtml(subtitle || 'Fundada em 19/05/2015 • Estádio Mozart Veloso do Carmo (Velosão) • Rio Verde - GO')}</p>
      </div>
    </div>
  </div>
  <div class="summary-bar">
    <span>📅 Emitido em: ${escapeHtml(emittedAt)}</span>
    <span>👤 Emitido por: ${escapeHtml(emittedBy)}</span>
    ${summaryItems.map(item => `<span>• ${escapeHtml(item)}</span>`).join('')}
  </div>
  <table>
    <thead><tr>${headerCellsHtml}</tr></thead>
    <tbody>${bodyRowsHtml}</tbody>
  </table>
  <script>
    window.addEventListener('load', () => { setTimeout(() => window.print(), 350); });
  </script>
</body>
</html>`);
  printWin.document.close();
}

function buildSociosReportConfig() {
  const totalSocios = appState.socios.length;
  const quitados = appState.socios.filter(s => s.statusPagamento === 'Pago / Ativo').length;
  const emParcelamento = appState.socios.filter(s => String(s.statusPagamento || '').includes('Parcela')).length;
  const recebido = appState.socios.reduce((acc, s) => acc + getSocioValorPagoEfetivo(s), 0);
  const previsto = appState.socios.reduce((acc, s) => acc + (Number(s.valorPlano) || 105), 0);

  const headers = [
    'Nº Camiseta', 'Matrícula', 'Nome Completo do Sócio', 'Apelido', 'CPF', 'RG', 'Nascimento',
    'WhatsApp', 'Setor / Bairro', 'Cidade / UF', 'Tam. Camisa', 'Sangue',
    'Modalidade de Pagamento', 'Valor do Plano', 'Valor Já Pago', 'Status PIX / Parcelas', 'Boletos Enviados',
    'PIX Confirmado Por', 'Última Edição Por', 'Observações', 'Data Inscrição'
  ];

  const rows = appState.socios.map((s) => [
    s.numeroCamisa ? `Nº ${s.numeroCamisa}` : '—',
    s.matricula || '—',
    s.nome || '—',
    s.apelido || '—',
    s.cpf || '—',
    s.rg || '—',
    formatDateBR(s.dataNascimento),
    s.whatsapp || '—',
    s.pelotao || '—',
    s.cidade || 'Rio Verde - GO',
    s.tamanhoCamisa || 'G',
    s.tipoSanguineo || '—',
    s.formaPagamento || 'À Vista no PIX (R$ 105,00)',
    formatBRL(Number(s.valorPlano) || 105),
    formatBRL(getSocioValorPagoEfetivo(s)),
    s.statusPagamento || 'Pendente PIX',
    s.boletosEnviados ? 'Sim' : 'Não',
    s.aprovadoPor ? `${s.aprovadoPor.nome} (${formatDateTimeBR(s.aprovadoPor.dataHora)})` : '—',
    s.ultimaEdicao ? `${s.ultimaEdicao.nome} (${formatDateTimeBR(s.ultimaEdicao.dataHora)})` : '—',
    s.observacoes || '—',
    formatDateBR(s.createdAt)
  ]);

  return {
    filename: `Relacao_Oficial_Socios_TGA_${new Date().toISOString().slice(0, 10)}.xls`,
    sheetName: 'Socios Garra Alviverde',
    reportTitle: 'RELAÇÃO OFICIAL DE MEMBROS E CONTROLE FINANCEIRO — SÓCIO GARRA ALVIVERDE',
    subtitle: 'Investimento: R$ 105,00 à vista ou em até 3x de R$ 35,00 • Torcida Organizada Garra Alviverde (TGA)',
    summaryItems: [
      `Total de Sócios: ${totalSocios}`,
      `Quitados (R$ 105): ${quitados}`,
      `Em Parcelamento (3x): ${emParcelamento}`,
      `Arrecadado: ${formatBRL(recebido)} de ${formatBRL(previsto)}`
    ],
    headers,
    rows,
    textCols: [0, 1, 4, 5, 6, 7, 10, 11, 20]
  };
}

function buildCaravanasReportConfig() {
  const caravanaFiltro = document.getElementById('filterCaravanaSelect')?.value || 'todas';
  const lista = appState.inscricoesCaravana.filter((i) => caravanaFiltro === 'todas' || i.caravanaId === caravanaFiltro);
  const confirmados = lista.filter(i => i.statusPix === 'PIX Confirmado').length;
  const recebido = lista.reduce((acc, i) => acc + (i.statusPix === 'PIX Confirmado' ? (Number(i.valorPago) || 0) : 0), 0);

  const headers = [
    'Nº', 'Caravana / Jogo do E.C.R.V.', 'Ônibus / Setor de Embarque', 'Nome do Passageiro',
    'Documento (RG / CPF)', 'WhatsApp', 'Setor / Bairro', 'Modalidade', 'Nº Camisa / Sócio',
    'Valor Passagem', 'Status PIX', 'PIX Confirmado Por', 'Data Reserva'
  ];

  const rows = lista.map((i, idx) => [
    String(idx + 1).padStart(2, '0'),
    i.caravanaTitulo || 'Caravana TGA',
    i.onibusEscolhido || '—',
    i.nome || '—',
    i.documento || '—',
    i.whatsapp || '—',
    i.pelotao || '—',
    i.tipoPassageiro || '—',
    i.numeroMatricula || '—',
    formatBRL(Number(i.valorPago) || 0),
    i.statusPix || 'Aguardando PIX',
    i.aprovadoPor ? `${i.aprovadoPor.nome} (${formatDateTimeBR(i.aprovadoPor.dataHora)})` : '—',
    formatDateBR(i.createdAt)
  ]);

  return {
    filename: `Lista_Passageiros_Caravanas_TGA_${new Date().toISOString().slice(0, 10)}.xls`,
    sheetName: 'Passageiros Caravanas TGA',
    reportTitle: 'LISTA OFICIAL DE PASSAGEIROS E EMBARQUE — CARAVANAS GARRA ALVIVERDE (E.C.R.V.)',
    subtitle: 'Controle de Ônibus, Documentos e Confirmação de PIX • Torcida Organizada Garra Alviverde',
    summaryItems: [
      `Total de Passageiros: ${lista.length}`,
      `PIX Confirmados: ${confirmados}`,
      `Pendentes: ${lista.length - confirmados}`,
      `Total Confirmado: ${formatBRL(recebido)}`
    ],
    headers,
    rows,
    textCols: [0, 4, 5, 8, 12]
  };
}

function buildAuditoriaReportConfig() {
  const logs = Array.isArray(appState.auditoriaLogs) ? appState.auditoriaLogs : [];
  const headers = [
    'Data e Hora', 'Diretor Responsável', 'Login (@)', 'Categoria',
    'Ação Realizada no Painel', 'Detalhes da Alteração (Antes ➔ Depois)'
  ];

  const rows = logs.map((l) => [
    formatDateTimeBR(l.dataHora),
    l.diretorNome || 'Diretoria TGA',
    `@${l.diretorUsuario || 'diretoria'}`,
    l.categoria || 'Sistema',
    l.acao || '—',
    l.detalhes || '—'
  ]);

  return {
    filename: `Relatorio_Auditoria_Diretoria_TGA_${new Date().toISOString().slice(0, 10)}.xls`,
    sheetName: 'Auditoria Diretoria TGA',
    reportTitle: 'RELATÓRIO OFICIAL DE AUDITORIA E HISTÓRICO DE ALTERAÇÕES DA DIRETORIA',
    subtitle: 'Rastreamento de Aprovações de PIX, Edições de Cadastros e Credenciais • Controle Master TGA',
    summaryItems: [
      `Total de Ações Registradas: ${logs.length}`,
      `Diretores Cadastrados: ${(appState.usuariosDiretoria || []).length}`
    ],
    headers,
    rows,
    textCols: [0, 2]
  };
}

// ============================================================================
// COFRE DE BACKUPS AUTOMÁTICOS (00:00) & RECUPERAÇÃO CONTRA INVASÃO/QUEDA
// ============================================================================
let cloudBackupsCache = [];

function downloadJsonFile(filename, dataObj) {
  const jsonStr = JSON.stringify(dataObj, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

async function loadAndRenderBackups() {
  const tbody = document.getElementById('adminBackupsTableBody');
  if (!tbody) return;

  try {
    const res = await fetch('/api/backups');
    if (res.ok) {
      const data = await res.json();
      cloudBackupsCache = Array.isArray(data.backups) ? data.backups : [];
    }
  } catch (err) {
    console.warn('Usando cache local de backups:', err);
  }

  if (cloudBackupsCache.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="5" style="text-align:center; padding:24px;">
          Nenhum ponto de backup listado ainda. Clique em <strong>"💾 Criar Backup na Nuvem Agora"</strong> acima para gerar o primeiro ponto imediatamente!
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = cloudBackupsCache.map((b) => {
    const isAuto = String(b.tipo || '').includes('Automático');
    const isPreRestore = String(b.tipo || '').includes('Pré-Restauração');
    const badgeStyle = isAuto
      ? 'background:#dcfce7; color:#166534;'
      : (isPreRestore ? 'background:#fef3c7; color:#92400e;' : 'background:#dbeafe; color:#1e40af;');
    const r = b.resumo || {};

    return `
      <tr>
        <td>
          <strong>📅 ${formatDateTimeBR(b.dataHora)}</strong><br>
          <small style="color:#047857; font-weight:700;">Data Ref: ${escapeHtml(b.dataReferencia || '—')}</small>
        </td>
        <td>
          <span class="status-badge" style="${badgeStyle}">
            ${isAuto ? '🕛 ' : (isPreRestore ? '🛡️ ' : '💾 ')}${escapeHtml(b.tipo || 'Backup TGA')}
          </span>
        </td>
        <td>
          <strong>${escapeHtml(b.autor || 'Sistema Automático TGA')}</strong>
        </td>
        <td>
          <div style="font-size:0.84rem; line-height:1.4;">
            🪪 <strong>${r.totalSocios ?? 0}</strong> Sócios •
            🚌 <strong>${r.totalInscritosCaravana ?? 0}</strong> Passageiros •
            🏟️ <strong>${r.totalCaravanas ?? 0}</strong> Caravanas •
            🕵️‍♂️ <strong>${r.totalLogs ?? 0}</strong> Logs
          </div>
        </td>
        <td>
          <div class="action-btns">
            <button type="button" class="btn-table" data-download-bkp="${b.id}" style="background:#e0f2fe;color:#0369a1;border-color:#7dd3fc;">
              📥 Baixar .JSON
            </button>
            <button type="button" class="btn-table btn-approve" data-restore-bkp="${b.id}">
              ⏪ Restaurar Sistema
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');

  tbody.querySelectorAll('[data-download-bkp]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-download-bkp');
      const bkp = cloudBackupsCache.find(x => x.id === id);
      if (!bkp) return;
      downloadJsonFile(`Backup_TGA_${bkp.dataReferencia || 'data'}_${bkp.id}.json`, bkp);
      showToast('📥 Arquivo de backup (.JSON) baixado para o seu dispositivo!');
    });
  });

  tbody.querySelectorAll('[data-restore-bkp]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      if (!currentAdminUser || !currentAdminUser.isMaster) {
        showToast('🚫 Apenas o Usuário Master pode restaurar backups.');
        return;
      }
      const id = btn.getAttribute('data-restore-bkp');
      const bkp = cloudBackupsCache.find(x => x.id === id);
      if (!bkp) return;

      const r = bkp.resumo || {};
      const ok = window.confirm(
        `⚠️ CONFIRMAR RESTAURAÇÃO DO SISTEMA?\n\n` +
        `Você está prestes a restaurar todo o banco de dados da Garra Alviverde para o ponto:\n` +
        `• Data/Hora: ${formatDateTimeBR(bkp.dataHora)}\n` +
        `• Tipo: ${bkp.tipo}\n` +
        `• Conteúdo: ${r.totalSocios ?? 0} Sócios e ${r.totalInscritosCaravana ?? 0} Passageiros nas Caravanas\n\n` +
        `(O sistema criará automaticamente uma cópia de segurança do estado atual antes de restaurar). Deseja continuar?`
      );
      if (!ok) return;

      try {
        const res = await fetch('/api/backups/restore', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            backupId: bkp.id,
            autor: currentAdminUser.nome,
            _auditoria: buildAuditPayload(
              'Configurações',
              `Restaurou o sistema para o Backup de ${formatDateTimeBR(bkp.dataHora)} (${bkp.tipo})`,
              `Sócios restaurados: ${r.totalSocios ?? 0} | Passageiros: ${r.totalInscritosCaravana ?? 0}`
            )
          })
        });
        if (res.ok) {
          const data = await res.json();
          if (data.state) {
            appState = data.state;
            ensureClientState(appState);
            saveLocalBackup();
          }
          if (Array.isArray(data.backups)) {
            cloudBackupsCache = data.backups;
          }
          renderAll();
          loadAndRenderBackups();
          showToast(`✅ Sistema restaurado com sucesso para o backup de ${formatDateTimeBR(bkp.dataHora)}!`);
        } else {
          showToast('❌ Erro ao restaurar backup na nuvem.');
        }
      } catch (err) {
        if (bkp.snapshot) {
          appState = { ...appState, ...bkp.snapshot };
          ensureClientState(appState);
          saveLocalBackup();
          renderAll();
          showToast('✅ Sistema restaurado localmente a partir do ponto de backup!');
        }
      }
    });
  });
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

  // Atualização em tempo real da Carteirinha de Sócio e Forma de Pagamento
  ['socNome', 'socApelido', 'socCpf', 'socPelotao', 'socCamisa', 'socNumeroCamisa', 'socSangue', 'socFormaPagamento'].forEach((id) => {
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

    const msgWa = `\uD83D\uDFE2\u26AA *INSCRIÇÃO EM CARAVANA - ${appState.config.nomeTorcida} (ECRV)* \uD83D\uDFE2\u26AA\n\n` +
      `\uD83D\uDE8C *Caravana:* ${payload.caravanaTitulo}\n` +
      `\uD83D\uDC64 *Passageiro:* ${payload.nome}\n` +
      `\uD83C\uDD94 *Documento (RG/CPF):* ${payload.documento}\n` +
      `\uD83D\uDCCD *Setor/Bairro:* ${payload.pelotao}\n` +
      `\uD83D\uDE8D *Ônibus:* ${payload.onibusEscolhido}\n` +
      `\u26BD *Modalidade:* ${payload.tipoPassageiro}\n` +
      `\u2705 *Valor no PIX:* ${formatBRL(payload.valorPago)}\n\n` +
      `Segue meu comprovante do PIX (${appState.config.chavePix}) para confirmar meu lugar no ônibus!`;

    openSuccessModal({
      titulo: '🚌 Reserva na Caravana Registrada!',
      descricao: `Salve, ${payload.nome}! Seu nome já entrou na lista de embarque do ${payload.onibusEscolhido} no painel da diretoria da Garra Alviverde.`,
      valor: payload.valorPago,
      mensagemWhatsapp: msgWa
    });
  });

  // Envio do Formulário de Inscrição de Sócio (À Vista R$ 105,00 ou Parcelado 3x de R$ 35,00)
  document.getElementById('formCadastroSocio')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const plano = getSinglePlan();
    const valorTotal = Number(plano.valor) || 105;
    const valorParcela = Number(plano.valorParcela) || Math.round((valorTotal / 3) * 100) / 100;
    const isParcelado = document.getElementById('socFormaPagamento')?.value === 'parcelado_3x';
    const formaPagamentoDesc = isParcelado ? 'Parcelado em 3x de R$ 35,00' : 'À Vista no PIX (R$ 105,00)';
    const valorPagarAgora = isParcelado ? valorParcela : valorTotal;

    const payload = {
      nome: document.getElementById('socNome').value.trim(),
      apelido: document.getElementById('socApelido').value.trim(),
      cpf: document.getElementById('socCpf').value.trim(),
      rg: document.getElementById('socRg').value.trim(),
      dataNascimento: document.getElementById('socNascimento').value,
      whatsapp: document.getElementById('socWhatsapp').value.trim(),
      email: document.getElementById('socEmail').value.trim(),
      pelotao: document.getElementById('socPelotao').value.trim(),
      cidade: document.getElementById('socCidade').value.trim(),
      tamanhoCamisa: document.getElementById('socCamisa').value,
      numeroCamisa: document.getElementById('socNumeroCamisa').value.trim(),
      tipoSanguineo: document.getElementById('socSangue').value,
      planoId: plano.id,
      planoNome: plano.nome || 'Sócio Garra Alviverde (TGA)',
      formaPagamento: formaPagamentoDesc,
      valorPlano: valorTotal,
      valorEntradaPix: valorPagarAgora,
      valorPago: 0,
      parcelasPagas: 0,
      boletosEnviados: false,
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

    const linhaFinanceiraWa = isParcelado
      ? `\uD83D\uDCB0 *Forma de Pagamento:* Parcelado em 3x de ${formatBRL(valorParcela)} (Total ${formatBRL(valorTotal)})\n` +
        `\uD83D\uDCB5 *1ª Parcela de Entrada (PIX):* ${formatBRL(valorParcela)}\n` +
        `\uD83D\uDCC4 *Boletos:* Aguardo o envio dos boletos das demais parcelas aqui no WhatsApp!\n\n` +
        `\u2705 Segue meu comprovante da 1ª parcela (${formatBRL(valorParcela)}) para já garantir o benefício dos materiais na hora!`
      : `\uD83D\uDCB0 *Forma de Pagamento:* À Vista no PIX (${formatBRL(valorTotal)})\n\n` +
        `\u2705 Segue meu comprovante do PIX à vista (${formatBRL(valorTotal)}) para ativar meu Sócio Garra Alviverde!`;

    const msgWa = `\uD83D\uDFE2\u26AA *NOVA INSCRIÇÃO - SÓCIO GARRA ALVIVERDE* \uD83D\uDFE2\u26AA\n\n` +
      `\uD83D\uDC64 *Nome:* ${criado.nome} (${criado.apelido || 'Sem apelido'})\n` +
      `\uD83C\uDD94 *CPF:* ${criado.cpf} | *RG:* ${criado.rg}\n` +
      `\uD83D\uDCCD *Bairro/Cidade:* ${criado.pelotao} - ${criado.cidade}\n` +
      `\uD83D\uDC55 *Camiseta:* Tam. ${criado.tamanhoCamisa} | *Nº da Camiseta:* ${criado.numeroCamisa || '—'}\n` +
      `\u2764\uFE0F *Sangue:* ${criado.tipoSanguineo}\n` +
      linhaFinanceiraWa;

    openSuccessModal({
      titulo: `🪪 Ficha de Sócio TGA Enviada! (Camisa Nº ${criado.numeroCamisa || '—'})`,
      descricao: isParcelado
        ? `Bem-vindo à Garra Alviverde, ${criado.nome}! Faça o PIX da 1ª parcela (${formatBRL(valorParcela)}) abaixo e envie o comprovante no WhatsApp para receber seus boletos das próximas parcelas.`
        : `Bem-vindo à Garra Alviverde, ${criado.nome}! Faça o PIX à vista (${formatBRL(valorTotal)}) abaixo e envie o comprovante no WhatsApp da Diretoria.`,
      valor: valorPagarAgora,
      subtextoValor: isParcelado
        ? `Valor da 1ª Parcela de Entrada no PIX: ${formatBRL(valorParcela)} (Plano 3x de ${formatBRL(valorParcela)})`
        : `Valor à Vista no PIX: ${formatBRL(valorTotal)}`,
      mensagemWhatsapp: msgWa
    });
  });

  // Quando o diretor muda o Status de Pagamento no modal de edição, preenche automaticamente o Valor Pago correspondente
  document.getElementById('editSocStatus')?.addEventListener('change', (e) => {
    const st = e.target.value;
    const valPagoEl = document.getElementById('editSocValorPago');
    if (!valPagoEl) return;
    if (st === 'Pendente PIX') valPagoEl.value = 0;
    else if (st === '1ª Parcela Paga (R$ 35)') valPagoEl.value = 35;
    else if (st === '2ª Parcela Paga (R$ 70)') valPagoEl.value = 70;
    else if (st === 'Pago / Ativo') valPagoEl.value = Number(document.getElementById('editSocValor')?.value) || 105;
  });

  // Fechar / Salvar Modal de Edição de Sócio (Diretoria)
  ['btnCloseEditSocio', 'btnCancelEditSocio'].forEach((id) => {
    document.getElementById(id)?.addEventListener('click', () => {
      document.getElementById('modalEditSocio').hidden = true;
    });
  });

  document.getElementById('formEditSocio')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!hasPerm('editarSocio')) {
      showToast('🚫 Você não tem permissão para editar dados de sócios.');
      return;
    }
    const id = document.getElementById('editSocId').value;
    const idx = appState.socios.findIndex(s => s.id === id);
    if (idx === -1) return;

    const oldSocio = appState.socios[idx];
    const canApprovePix = hasPerm('aprovarPixSocio');

    const updates = {
      nome: document.getElementById('editSocNome').value.trim(),
      apelido: document.getElementById('editSocApelido').value.trim(),
      cpf: document.getElementById('editSocCpf').value.trim(),
      rg: document.getElementById('editSocRg').value.trim(),
      dataNascimento: document.getElementById('editSocNascimento').value,
      whatsapp: document.getElementById('editSocWhatsapp').value.trim(),
      email: document.getElementById('editSocEmail').value.trim(),
      pelotao: document.getElementById('editSocPelotao').value.trim(),
      cidade: document.getElementById('editSocCidade').value.trim(),
      tamanhoCamisa: document.getElementById('editSocCamisa').value,
      numeroCamisa: document.getElementById('editSocNumeroCamisa').value.trim(),
      tipoSanguineo: document.getElementById('editSocSangue').value,
      formaPagamento: canApprovePix
        ? (document.getElementById('editSocFormaPagamento')?.value || oldSocio.formaPagamento || 'À Vista no PIX (R$ 105,00)')
        : oldSocio.formaPagamento,
      valorPlano: canApprovePix ? (Number(document.getElementById('editSocValor').value) || 105) : oldSocio.valorPlano,
      valorPago: canApprovePix ? (Number(document.getElementById('editSocValorPago')?.value) || 0) : getSocioValorPagoEfetivo(oldSocio),
      statusPagamento: canApprovePix ? document.getElementById('editSocStatus').value : oldSocio.statusPagamento,
      boletosEnviados: canApprovePix ? Boolean(document.getElementById('editSocBoletosEnviados')?.checked) : Boolean(oldSocio.boletosEnviados),
      observacoes: document.getElementById('editSocObs').value.trim()
    };

    const fieldMap = [
      { key: 'nome', label: 'Nome' },
      { key: 'apelido', label: 'Apelido' },
      { key: 'cpf', label: 'CPF' },
      { key: 'rg', label: 'RG' },
      { key: 'dataNascimento', label: 'Nascimento' },
      { key: 'whatsapp', label: 'WhatsApp' },
      { key: 'pelotao', label: 'Bairro' },
      { key: 'cidade', label: 'Cidade' },
      { key: 'tamanhoCamisa', label: 'Tamanho Camisa' },
      { key: 'numeroCamisa', label: 'Nº Camiseta' },
      { key: 'tipoSanguineo', label: 'Sangue' },
      { key: 'formaPagamento', label: 'Modalidade' },
      { key: 'valorPlano', label: 'Valor Total' },
      { key: 'valorPago', label: 'Valor Pago' },
      { key: 'statusPagamento', label: 'Status PIX' },
      { key: 'boletosEnviados', label: 'Boletos Enviados' },
      { key: 'observacoes', label: 'Obs' }
    ];

    const diffs = [];
    fieldMap.forEach(({ key, label }) => {
      const before = String(oldSocio[key] ?? '');
      const after = String(updates[key] ?? '');
      if (before !== after) {
        diffs.push(`${label}: "${before || '—'}" ➔ "${after || '—'}"`);
      }
    });

    const dirNome = currentAdminUser ? currentAdminUser.nome : 'Diretoria';
    const dirUsuario = currentAdminUser ? currentAdminUser.usuario : 'diretoria';
    const resumoMudancas = diffs.length > 0 ? diffs.join(' | ') : 'Dados salvos sem alteração de valores';

    updates.ultimaEdicao = {
      nome: dirNome,
      usuario: dirUsuario,
      dataHora: new Date().toISOString(),
      resumo: resumoMudancas
    };

    if (oldSocio.statusPagamento !== updates.statusPagamento || getSocioValorPagoEfetivo(oldSocio) !== updates.valorPago) {
      updates.aprovadoPor = {
        nome: dirNome,
        usuario: dirUsuario,
        dataHora: new Date().toISOString(),
        status: updates.statusPagamento
      };
    }

    const audit = buildAuditPayload(
      oldSocio.statusPagamento !== updates.statusPagamento ? 'PIX Sócio' : 'Edição de Sócio',
      `Editou ficha do sócio ${updates.nome}`,
      resumoMudancas
    );

    appState.socios[idx] = { ...oldSocio, ...updates };
    try {
      await fetch(`/api/socios/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...updates, _auditoria: audit })
      });
    } catch (err) {}

    saveLocalBackup();
    document.getElementById('modalEditSocio').hidden = true;
    renderAll();
    showToast(`✅ Dados do sócio ${updates.nome} atualizados por ${dirNome}!`);
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
      if (isAdminAuthenticated && currentAdminUser) {
        renderAdminDashboard();
      } else {
        const userInput = document.getElementById('adminUsernameInput');
        const passInput = document.getElementById('adminPasswordInput');
        if (passInput) passInput.value = '';
        if (userInput) userInput.focus();
      }
    });
  });

  function logoutAdminSession() {
    isAdminAuthenticated = false;
    currentAdminUser = null;
    document.getElementById('adminLoginView').hidden = false;
    document.getElementById('adminDashboardView').hidden = true;
    const passInput = document.getElementById('adminPasswordInput');
    if (passInput) passInput.value = '';
    // Volta para a primeira aba por padrão
    document.querySelectorAll('.admin-tab').forEach(b => b.classList.remove('active'));
    document.getElementById('btnTabSocios')?.classList.add('active');
    ['tab-socios', 'tab-caravanas-inscritos', 'tab-gerenciar-caravanas', 'tab-diretores', 'tab-auditoria', 'tab-backups', 'tab-config'].forEach((panelId) => {
      const el = document.getElementById(panelId);
      if (el) el.hidden = panelId !== 'tab-socios';
    });
  }

  document.getElementById('btnLogoutAdmin')?.addEventListener('click', () => {
    logoutAdminSession();
    showToast('🔒 Sessão encerrada. Faça login com seu usuário de diretor.');
  });

  document.getElementById('btnCloseAdmin')?.addEventListener('click', () => {
    document.getElementById('modalAdmin').hidden = true;
    logoutAdminSession();
  });

  // Login no Painel Admin por Usuário + Senha (Master + Diretores Individuais)
  document.getElementById('formAdminLogin')?.addEventListener('submit', (e) => {
    e.preventDefault();
    ensureClientState(appState);
    const userInput = document.getElementById('adminUsernameInput');
    const passInput = document.getElementById('adminPasswordInput');
    const loginTyped = (userInput?.value || '').trim().toLowerCase();
    const passTyped = (passInput?.value || '').trim();

    const matchedUser = appState.usuariosDiretoria.find((u) => {
      const uLogin = String(u.usuario || '').toLowerCase();
      if (u.isMaster && (loginTyped === uLogin || loginTyped === 'jully' || loginTyped === 'master' || loginTyped === 'admin')) {
        return true;
      }
      return uLogin === loginTyped;
    });

    if (!matchedUser) {
      if (passInput) passInput.value = '';
      showToast('❌ Usuário não encontrado! Verifique seu login com o Administrador Master.');
      return;
    }

    if (matchedUser.ativo === false && !matchedUser.isMaster) {
      if (passInput) passInput.value = '';
      showToast('🚫 Seu usuário de diretor está bloqueado pelo Administrador Master.');
      return;
    }

    const expectedPass = matchedUser.isMaster
      ? ((appState.config.senhaAdmin && appState.config.senhaAdmin !== '2015') ? appState.config.senhaAdmin : 'Tga@2015')
      : String(matchedUser.senha || '');

    if (passTyped === expectedPass) {
      isAdminAuthenticated = true;
      currentAdminUser = matchedUser;
      if (passInput) passInput.value = '';
      document.getElementById('adminLoginView').hidden = true;
      document.getElementById('adminDashboardView').hidden = false;
      renderAdminDashboard();
      showToast(`🔓 Bem-vindo(a), ${matchedUser.nome}!`);
    } else {
      if (passInput) passInput.value = '';
      showToast('❌ Senha incorreta para este usuário!');
    }
  });

  // Troca de Abas no Admin
  document.querySelectorAll('.admin-tab').forEach((tabBtn) => {
    tabBtn.addEventListener('click', () => {
      const targetId = tabBtn.getAttribute('data-tab');
      if ((targetId === 'tab-diretores' || targetId === 'tab-auditoria' || targetId === 'tab-backups' || targetId === 'tab-config') && !(currentAdminUser && currentAdminUser.isMaster)) {
        showToast('🚫 Esta aba é exclusiva do Usuário Master.');
        return;
      }
      document.querySelectorAll('.admin-tab').forEach(b => b.classList.remove('active'));
      tabBtn.classList.add('active');
      ['tab-socios', 'tab-caravanas-inscritos', 'tab-gerenciar-caravanas', 'tab-diretores', 'tab-auditoria', 'tab-backups', 'tab-config'].forEach((panelId) => {
        const panel = document.getElementById(panelId);
        if (panel) panel.hidden = panelId !== targetId;
      });
      if (targetId === 'tab-backups') {
        loadAndRenderBackups();
      }
    });
  });

  // Filtros do Admin
  document.getElementById('searchSociosInput')?.addEventListener('input', renderAdminSociosTable);
  document.getElementById('filterSociosStatus')?.addEventListener('change', renderAdminSociosTable);
  document.getElementById('filterCaravanaSelect')?.addEventListener('change', renderAdminCaravanasInscritosTable);
  document.getElementById('searchCaravanaInscritos')?.addEventListener('input', renderAdminCaravanasInscritosTable);
  document.getElementById('searchAuditoriaInput')?.addEventListener('input', renderAdminAuditoriaTable);
  document.getElementById('filterAuditoriaCategoria')?.addEventListener('change', renderAdminAuditoriaTable);

  // Cadastrar Novo Diretor (Exclusivo Master)
  document.getElementById('formNovoDiretor')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!currentAdminUser || !currentAdminUser.isMaster) {
      showToast('🚫 Apenas o Usuário Master pode cadastrar diretores.');
      return;
    }

    const nome = document.getElementById('dirNome').value.trim();
    const cargo = document.getElementById('dirCargo').value.trim();
    const usuario = document.getElementById('dirUsuario').value.trim().toLowerCase().replace(/\s+/g, '');
    const senha = document.getElementById('dirSenha').value.trim();

    if (appState.usuariosDiretoria.some(u => String(u.usuario || '').toLowerCase() === usuario)) {
      showToast('⚠️ Já existe um diretor cadastrado com esse nome de usuário!');
      return;
    }

    const permissoes = {
      aprovarPixSocio: document.getElementById('permAprovarPixSocio').checked,
      editarSocio: document.getElementById('permEditarSocio').checked,
      excluirSocio: document.getElementById('permExcluirSocio').checked,
      aprovarPixCaravana: document.getElementById('permAprovarPixCaravana').checked,
      excluirPassageiroCaravana: document.getElementById('permExcluirPassageiroCaravana').checked,
      gerenciarCaravanas: document.getElementById('permGerenciarCaravanas').checked,
      exportarPlanilhas: document.getElementById('permExportarPlanilhas').checked,
      alterarConfiguracoes: false
    };

    const audit = buildAuditPayload(
      'Diretoria',
      `Cadastrou novo diretor: ${nome} (@${usuario})`,
      `Cargo: ${cargo}`
    );

    const payload = { nome, cargo, usuario, senha, permissoes, _auditoria: audit };

    try {
      const res = await fetch('/api/diretores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.usuariosDiretoria)) {
          appState.usuariosDiretoria = data.usuariosDiretoria;
        }
      } else {
        throw new Error('Fallback local');
      }
    } catch (err) {
      appState.usuariosDiretoria.push({
        id: 'dir-' + Date.now(),
        nome,
        cargo,
        usuario,
        senha,
        isMaster: false,
        ativo: true,
        permissoes,
        createdAt: new Date().toISOString()
      });
    }

    saveLocalBackup();
    e.target.reset();
    document.getElementById('permAprovarPixSocio').checked = true;
    document.getElementById('permEditarSocio').checked = true;
    document.getElementById('permAprovarPixCaravana').checked = true;
    document.getElementById('permGerenciarCaravanas').checked = true;
    document.getElementById('permExportarPlanilhas').checked = true;
    renderAdminDashboard();
    showToast(`👑 Credencial criada para ${nome}! Usuário: ${usuario}`);
  });

  // Exportar Planilha Formatada de Sócios (.XLS Oficial com Cabeçalho Verde e Logo)
  document.getElementById('btnExportSociosCsv')?.addEventListener('click', () => {
    if (!hasPerm('exportarPlanilhas')) return;
    downloadStyledExcel(buildSociosReportConfig());
    showToast('📊 Planilha Oficial de Sócios TGA (.XLS Formatada) baixada com sucesso!');
  });

  document.getElementById('btnPrintSocios')?.addEventListener('click', () => {
    if (!hasPerm('exportarPlanilhas')) return;
    printStyledReport(buildSociosReportConfig());
  });

  // Exportar Planilha Formatada de Passageiros das Caravanas (.XLS Oficial com Cabeçalho Verde e Logo)
  document.getElementById('btnExportCaravanasCsv')?.addEventListener('click', () => {
    if (!hasPerm('exportarPlanilhas')) return;
    downloadStyledExcel(buildCaravanasReportConfig());
    showToast('📊 Planilha Oficial de Passageiros das Caravanas (.XLS Formatada) baixada!');
  });

  document.getElementById('btnPrintCaravanas')?.addEventListener('click', () => {
    if (!hasPerm('exportarPlanilhas')) return;
    printStyledReport(buildCaravanasReportConfig());
  });

  // Exportar Planilha Formatada de Auditoria da Diretoria (.XLS Oficial com Cabeçalho Verde e Logo)
  document.getElementById('btnExportAuditoriaCsv')?.addEventListener('click', () => {
    downloadStyledExcel(buildAuditoriaReportConfig());
    showToast('📊 Planilha Oficial de Auditoria da Diretoria (.XLS Formatada) baixada!');
  });

  document.getElementById('btnPrintAuditoria')?.addEventListener('click', () => {
    printStyledReport(buildAuditoriaReportConfig());
  });

  // ==========================================================================
  // EVENTOS DO COFRE DE BACKUPS DIÁRIOS (00:00) E RECUPERAÇÃO (MASTER)
  // ==========================================================================
  document.getElementById('btnRefreshBackupsList')?.addEventListener('click', () => {
    loadAndRenderBackups();
    showToast('🔄 Lista de backups atualizada!');
  });

  document.getElementById('btnCreateManualBackup')?.addEventListener('click', async () => {
    if (!currentAdminUser || !currentAdminUser.isMaster) {
      showToast('🚫 Apenas o Usuário Master pode criar pontos de backup.');
      return;
    }
    const audit = buildAuditPayload(
      'Configurações',
      `Criou ponto de backup manual no Cofre Anti-Invasão`,
      `Sócios protegidos: ${appState.socios.length} | Passageiros: ${appState.inscricoesCaravana.length}`
    );
    try {
      const res = await fetch('/api/backups', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tipo: 'Manual (Master)',
          autor: currentAdminUser.nome,
          _auditoria: audit
        })
      });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.backups)) {
          cloudBackupsCache = data.backups;
        }
        loadAndRenderBackups();
        renderAdminAuditoriaTable();
        showToast('💾 Ponto de backup criado e blindado na nuvem com sucesso!');
        return;
      }
    } catch (err) {}

    // Fallback caso offline
    const fallbackEntry = {
      id: 'bkp-' + Date.now(),
      dataReferencia: new Date().toISOString().slice(0, 10),
      dataHora: new Date().toISOString(),
      tipo: 'Manual (Master)',
      autor: currentAdminUser.nome,
      resumo: {
        totalSocios: appState.socios.length,
        totalCaravanas: appState.caravanas.length,
        totalInscritosCaravana: appState.inscricoesCaravana.length,
        totalDiretores: (appState.usuariosDiretoria || []).length,
        totalLogs: (appState.auditoriaLogs || []).length
      },
      snapshot: JSON.parse(JSON.stringify(appState))
    };
    cloudBackupsCache.unshift(fallbackEntry);
    loadAndRenderBackups();
    showToast('💾 Ponto de backup criado com sucesso!');
  });

  document.getElementById('btnDownloadFullBackupJson')?.addEventListener('click', () => {
    if (!currentAdminUser || !currentAdminUser.isMaster) {
      showToast('🚫 Apenas o Usuário Master pode baixar o backup completo.');
      return;
    }
    const todayStr = new Date().toISOString().slice(0, 10);
    const fullBackupObj = {
      id: 'bkp-download-' + Date.now(),
      dataReferencia: todayStr,
      dataHora: new Date().toISOString(),
      tipo: 'Cópia Completa Baixada no PC (Master)',
      autor: currentAdminUser.nome,
      resumo: {
        totalSocios: appState.socios.length,
        totalCaravanas: appState.caravanas.length,
        totalInscritosCaravana: appState.inscricoesCaravana.length,
        totalDiretores: (appState.usuariosDiretoria || []).length,
        totalLogs: (appState.auditoriaLogs || []).length
      },
      snapshot: {
        config: appState.config,
        caravanas: appState.caravanas,
        socios: appState.socios,
        inscricoesCaravana: appState.inscricoesCaravana,
        usuariosDiretoria: appState.usuariosDiretoria,
        auditoriaLogs: appState.auditoriaLogs
      }
    };
    downloadJsonFile(`Backup_Completo_Garra_Alviverde_TGA_${todayStr}.json`, fullBackupObj);
    showToast('📥 Backup Completo (.JSON) salvo no seu dispositivo!');
  });

  document.getElementById('btnTriggerUploadBackup')?.addEventListener('click', () => {
    if (!currentAdminUser || !currentAdminUser.isMaster) {
      showToast('🚫 Apenas o Usuário Master pode restaurar backups.');
      return;
    }
    document.getElementById('inputRestoreBackupFile')?.click();
  });

  document.getElementById('inputRestoreBackupFile')?.addEventListener('change', (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const parsed = JSON.parse(String(reader.result || '{}'));
        const snap = parsed.snapshot ? parsed.snapshot : parsed;
        if (!snap || (!Array.isArray(snap.socios) && !snap.config)) {
          showToast('❌ O arquivo selecionado não é um backup válido da TGA.');
          return;
        }
        const qtdSocios = Array.isArray(snap.socios) ? snap.socios.length : 0;
        const qtdPass = Array.isArray(snap.inscricoesCaravana) ? snap.inscricoesCaravana.length : 0;
        const ok = window.confirm(
          `⚠️ RESTAURAR A PARTIR DO ARQUIVO "${file.name}"?\n\n` +
          `• Sócios encontrados no arquivo: ${qtdSocios}\n` +
          `• Passageiros nas caravanas: ${qtdPass}\n\n` +
          `Deseja substituir os dados atuais por este backup?`
        );
        if (!ok) {
          e.target.value = '';
          return;
        }

        const audit = buildAuditPayload(
          'Configurações',
          `Restaurou o sistema a partir do arquivo "${file.name}"`,
          `Sócios restaurados: ${qtdSocios} | Passageiros: ${qtdPass}`
        );

        const res = await fetch('/api/backups/restore', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            snapshot: snap,
            origem: `Arquivo: ${file.name}`,
            autor: currentAdminUser?.nome || 'Jully Gabriel (Master)',
            _auditoria: audit
          })
        });

        if (res.ok) {
          const data = await res.json();
          if (data.state) {
            appState = data.state;
            ensureClientState(appState);
            saveLocalBackup();
          }
          if (Array.isArray(data.backups)) {
            cloudBackupsCache = data.backups;
          }
          renderAll();
          loadAndRenderBackups();
          showToast(`✅ Sistema restaurado com sucesso a partir de "${file.name}"!`);
        } else {
          throw new Error('Fallback local');
        }
      } catch (err) {
        showToast('❌ Erro ao ler ou restaurar o arquivo de backup.');
      } finally {
        e.target.value = '';
      }
    };
    reader.readAsText(file);
  });

  // Criar Nova Caravana pelo Admin
  document.getElementById('formNovaCaravana')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!hasPerm('gerenciarCaravanas')) {
      showToast('🚫 Você não tem permissão para criar caravanas.');
      return;
    }
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

    const audit = buildAuditPayload(
      'Caravanas',
      `Publicou nova caravana: "${payload.jogo}"`,
      `Data: ${formatDateBR(payload.dataJogo)} | Sócio: ${formatBRL(payload.valorSocio)} / Não-Sócio: ${formatBRL(payload.valorNaoSocio)}`
    );

    try {
      const res = await fetch('/api/caravanas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, _auditoria: audit })
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
    if (!currentAdminUser || !currentAdminUser.isMaster) {
      showToast('🚫 Apenas o Usuário Master pode alterar as configurações gerais.');
      return;
    }
    const planoAtual = getSinglePlan();
    const valorNovo = Number(document.getElementById('cfgPlanoUnicoValor').value) || 105;
    const novoPlanoUnico = {
      ...planoAtual,
      nome: document.getElementById('cfgPlanoUnicoNome').value.trim() || 'Sócio Garra Alviverde (TGA)',
      valor: valorNovo,
      valorParcela: Math.round((valorNovo / 3) * 100) / 100,
      maxParcelas: 3
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
      senhaAdmin: document.getElementById('cfgSenhaAdmin').value.trim() || 'Tga@2015',
      planos: [novoPlanoUnico]
    };

    const audit = buildAuditPayload(
      'Configurações',
      `Atualizou configurações gerais do portal TGA`,
      `PIX: ${novasConfigs.chavePix} | WhatsApp: ${novasConfigs.whatsappDiretoria} | Valor Sócio: ${formatBRL(novoPlanoUnico.valor)}`
    );

    appState.config = { ...appState.config, ...novasConfigs };
    ensureClientState(appState);
    try {
      await fetch('/api/config', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...novasConfigs, _auditoria: audit })
      });
    } catch (err) {}

    saveLocalBackup();
    renderAll();
    showToast('💾 Configurações do Plano Único e Chave PIX atualizadas!');
  });
});
