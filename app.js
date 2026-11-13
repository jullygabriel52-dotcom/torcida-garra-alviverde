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
    muralAviso: 'Salve Família Alviverde! Fique ligado nos próximos jogos do Esporte Clube Rio Verde no Estádio Velosão. Sócios em dia (a partir da 1ª parcela paga) têm ingresso garantido nos jogos em casa e desconto imediato nos materiais oficiais da Garra!',
    linkGrupoVipWhatsapp: '',
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
  auditoriaLogs: [],
  materiais: [
    {
      id: 'mat-1',
      nome: 'Camisa Oficial Garra Alviverde (TGA) 2026',
      categoria: 'Lançamento Oficial',
      descricao: 'Malha Dry-Fit Premium com escudo E.C.R.V. e logo oficial da Garra Alviverde.',
      valorSocio: 75.0,
      valorNaoSocio: 110.0,
      tamanhos: 'P, M, G, GG, XG',
      estoqueStatus: 'Disponível',
      fotoDataUrl: '/assets/logo-tga.jpg',
      createdAt: '2026-11-05T12:00:00.000Z'
    },
    {
      id: 'mat-2',
      nome: 'Regata Oficial Bancada Velosão (TGA)',
      categoria: 'Bateria & Bancada',
      descricao: 'Ideal para os jogos no Estádio Velosão e viagens de caravana com o Verdão do Sudoeste.',
      valorSocio: 60.0,
      valorNaoSocio: 85.0,
      tamanhos: 'P, M, G, GG, XG',
      estoqueStatus: 'Disponível',
      fotoDataUrl: '/assets/logo-tga.jpg',
      createdAt: '2026-11-05T12:00:00.000Z'
    },
    {
      id: 'mat-3',
      nome: 'Boné Oficial Garra Alviverde 19/05/2015',
      categoria: 'Acessórios TGA',
      descricao: 'Aba curva verde e branco com bordado frontal 3D da Torcida Organizada Garra Alviverde.',
      valorSocio: 45.0,
      valorNaoSocio: 70.0,
      tamanhos: 'Tamanho Único Ajustável',
      estoqueStatus: 'Disponível',
      fotoDataUrl: '/assets/logo-tga.jpg',
      createdAt: '2026-11-05T12:00:00.000Z'
    }
  ],
  pedidosMateriais: [],
  jogosEcrv: [
    {
      id: 'jog-1',
      campeonato: 'Campeonato Goiano',
      rodada: 'Próximo Jogo em Casa',
      mando: 'Em Casa (Velosão)',
      adversario: 'Esporte Clube Rio Verde (E.C.R.V.) vs. Adversário Estadual',
      dataJogo: '2026-11-15',
      horario: '16:00',
      estadio: 'Estádio Mozart Veloso do Carmo (Velosão) — Rio Verde - GO',
      placar: '',
      status: 'Check-in de Ingresso Aberto'
    },
    {
      id: 'jog-2',
      campeonato: 'Campeonato Goiano',
      rodada: 'Jogo Fora de Casa',
      mando: 'Fora de Casa',
      adversario: 'Adversário Regional vs. Esporte Clube Rio Verde (E.C.R.V.)',
      dataJogo: '2026-11-22',
      horario: '15:30',
      estadio: 'Estádio Visitante — Interior / Goiânia - GO',
      placar: '',
      status: 'Agendado'
    }
  ],
  checkinsJogos: [],
  eventosTga: [
    {
      id: 'ev-1',
      categoria: 'Doação de Sangue',
      titulo: 'Campanha Sangue Alviverde — Hemocentro de Rio Verde',
      dataEvento: '2026-11-28',
      horario: '07:30 às 11:30',
      local: 'Saída do Estádio Velosão → Hemocentro Regional de Rio Verde',
      descricao: 'Convocação geral da Garra Alviverde para salvar vidas! Leve documento oficial com foto. Sócios participantes ganham isenção de 1 parcela (R$ 35,00) do Sócio TGA.',
      isentaParcela: true,
      status: 'Aberto',
      createdAt: '2026-11-12T12:00:00.000Z'
    },
    {
      id: 'ev-2',
      categoria: 'Natal',
      titulo: 'Natal Solidário da Garra Alviverde',
      dataEvento: '2026-12-20',
      horario: '14:00',
      local: 'Concentração no Velosão → Bairros de Rio Verde - GO',
      descricao: 'Arrecadação e entrega de brinquedos, cestas básicas e chegada do Papai Noel Alviverde para as famílias de Rio Verde.',
      isentaParcela: true,
      status: 'Aberto',
      createdAt: '2026-11-12T12:00:00.000Z'
    },
    {
      id: 'ev-3',
      categoria: 'Páscoa',
      titulo: 'Páscoa Solidária TGA — Sorriso Alviverde',
      dataEvento: '2027-04-04',
      horario: '09:00',
      local: 'Bairros e Comunidades de Rio Verde - GO',
      descricao: 'Ação social de Páscoa da Garra Alviverde com distribuição de ovos de chocolate e caixas de bombom para as crianças.',
      isentaParcela: true,
      status: 'Aberto',
      createdAt: '2026-11-12T12:00:00.000Z'
    },
    {
      id: 'ev-4',
      categoria: 'Dia das Crianças',
      titulo: 'Festa do Dia das Crianças Garra Alviverde (12/10)',
      dataEvento: '2027-10-12',
      horario: '13:30 às 18:00',
      local: 'Arredores do Estádio Velosão / Praça Comunitária',
      descricao: 'Tarde recreativa com pula-pula, pipoca, algodão-doce, cachorro-quente e entrega de brinquedos para a criançada.',
      isentaParcela: true,
      status: 'Aberto',
      createdAt: '2026-11-12T12:00:00.000Z'
    },
    {
      id: 'ev-5',
      categoria: 'Ações Sociais',
      titulo: 'Mutirão Solidário TGA — Arrecadação de Alimentos',
      dataEvento: '2027-02-15',
      horario: '08:30',
      local: 'Portaria do Estádio Mozart Veloso do Carmo (Velosão)',
      descricao: 'Arrecadação de alimentos não perecíveis e montagem de cestas básicas para famílias assistidas pela torcida.',
      isentaParcela: true,
      status: 'Aberto',
      createdAt: '2026-11-12T12:00:00.000Z'
    }
  ],
  participantesEventos: []
};

let appState = JSON.parse(JSON.stringify(FALLBACK_STATE));
let currentPhotoDataUrl = '';
let currentMaterialPhotoDataUrl = '';
let currentLoggedSocio = null;
let isAdminAuthenticated = false;
let currentAdminUser = null;
let currentPublicEventoCategoryFilter = 'todos';

function ensureClientState(state) {
  if (!state) return;
  state.socios = Array.isArray(state.socios) ? state.socios : [];
  state.caravanas = Array.isArray(state.caravanas) ? state.caravanas : [];
  state.inscricoesCaravana = Array.isArray(state.inscricoesCaravana) ? state.inscricoesCaravana : [];
  state.auditoriaLogs = Array.isArray(state.auditoriaLogs) ? state.auditoriaLogs : [];
  state.usuariosDiretoria = Array.isArray(state.usuariosDiretoria) ? state.usuariosDiretoria : [];
  state.materiais = Array.isArray(state.materiais) ? state.materiais : JSON.parse(JSON.stringify(FALLBACK_STATE.materiais));
  state.pedidosMateriais = Array.isArray(state.pedidosMateriais) ? state.pedidosMateriais : [];
  state.jogosEcrv = Array.isArray(state.jogosEcrv) ? state.jogosEcrv : JSON.parse(JSON.stringify(FALLBACK_STATE.jogosEcrv));
  state.checkinsJogos = Array.isArray(state.checkinsJogos) ? state.checkinsJogos : [];
  state.eventosTga = Array.isArray(state.eventosTga) && state.eventosTga.length > 0
    ? state.eventosTga
    : JSON.parse(JSON.stringify(FALLBACK_STATE.eventosTga));
  state.participantesEventos = Array.isArray(state.participantesEventos) ? state.participantesEventos : [];

  if (state.config) {
    if (!state.config.muralAviso) {
      state.config.muralAviso = FALLBACK_STATE.config.muralAviso;
    }
    if (typeof state.config.linkGrupoVipWhatsapp !== 'string') {
      state.config.linkGrupoVipWhatsapp = '';
    }
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
const ALL_FEATURE_WINDOWS = [
  'windowSocio',
  'windowCaravanas',
  'windowHistoria',
  'windowPortalSocio',
  'windowLojaMateriais',
  'windowJogosEcrv',
  'windowEventosTga'
];

function openFeatureWindow(windowId) {
  ALL_FEATURE_WINDOWS.forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.hidden = id !== windowId;
  });
}

function closeFeatureWindows() {
  ALL_FEATURE_WINDOWS.forEach((id) => {
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
  if (janela === 'painel-socio' || janela === 'area-socio') openFeatureWindow('windowPortalSocio');
  if (janela === 'loja' || janela === 'materiais') openFeatureWindow('windowLojaMateriais');
  if (janela === 'jogos' || janela === 'ingressos') openFeatureWindow('windowJogosEcrv');
  if (janela === 'eventos' || janela === 'acoes') openFeatureWindow('windowEventosTga');
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
  const lojaPixEl = document.getElementById('formLojaPixText');
  if (lojaPixEl) lojaPixEl.textContent = cfg.chavePix;
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

  // Contadores
  const totalNotifications = appState.socios.length + appState.inscricoesCaravana.length + (appState.pedidosMateriais || []).length;
  document.getElementById('adminBadgeCount').textContent = totalNotifications;
  const statSociosEl = document.getElementById('statSociosCount');
  if (statSociosEl) statSociosEl.textContent = appState.socios.length;
  document.getElementById('statCaravanasCount').textContent = appState.caravanas.filter(c => c.status === 'Aberta').length;

  renderPixQrSvg(cfg.chavePix);
  renderHeroNextCaravana();
  renderCaravanasSection();
  renderLojaMateriaisSection();
  renderJogosEcrvSection();
  renderEventosTgaSection();
  if (currentLoggedSocio) {
    const refreshed = appState.socios.find(s => s.id === currentLoggedSocio.id);
    if (refreshed) {
      currentLoggedSocio = refreshed;
      renderPortalSocioLogado(currentLoggedSocio);
    }
  }
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

function getSocioParcelasIsentas(s) {
  if (!s) return 0;
  if (typeof s.parcelasIsentas === 'number' && !isNaN(s.parcelasIsentas)) {
    return Math.min(3, Math.max(0, Math.round(s.parcelasIsentas)));
  }
  if (Boolean(s.isento) || String(s.statusPagamento || '').includes('Isento (Diretoria)') || String(s.formaPagamento || '').includes('Isento — Diretoria')) {
    return 3;
  }
  if (String(s.statusPagamento || '').includes('2 Parcelas Isentas')) return 2;
  if (String(s.statusPagamento || '').includes('1 Parcela Isenta') || String(s.statusPagamento || '').includes('+ 1 Isenta') || String(s.statusPagamento || '').includes('+ 2 Isentas')) {
    return String(s.statusPagamento || '').includes('2 Isentas') ? 2 : 1;
  }
  return 0;
}

function getSocioValorIsento(s) {
  return getSocioParcelasIsentas(s) * 35;
}

function hasSocioAnyIsencao(s) {
  return getSocioParcelasIsentas(s) > 0;
}

function isSocioIsento(s) {
  if (!s) return false;
  return getSocioParcelasIsentas(s) >= 3;
}

function getSocioValorPagoEfetivo(s) {
  if (!s || isSocioIsento(s)) return 0;
  const maxPagavel = Math.max(0, 105 - getSocioValorIsento(s));
  if (typeof s.valorPago === 'number' && !isNaN(s.valorPago)) {
    return Math.max(0, Math.min(maxPagavel, s.valorPago));
  }
  if (s.statusPagamento === 'Pago / Ativo') return maxPagavel;
  if (s.statusPagamento === '2ª Parcela Paga (R$ 70)') return Math.min(maxPagavel, 70);
  if (s.statusPagamento === '1ª Parcela Paga (R$ 35)' || String(s.statusPagamento || '').includes('1ª Parcela Paga')) return Math.min(maxPagavel, 35);
  return 0;
}

function getSocioParcelasPagasPix(s) {
  return Math.min(3, Math.round(getSocioValorPagoEfetivo(s) / 35));
}

function getSocioValorLiquidoPrevisto(s) {
  if (!s) return 105;
  return Math.max(0, 105 - getSocioValorIsento(s));
}

function getSocioFaltaPagarPix(s) {
  if (!s) return 105;
  return Math.max(0, getSocioValorLiquidoPrevisto(s) - getSocioValorPagoEfetivo(s));
}

function findSocioByCpf(cpfRaw) {
  const clean = String(cpfRaw || '').replace(/\D/g, '');
  if (clean.length < 6) return null;
  return (appState.socios || []).find((s) => String(s.cpf || '').replace(/\D/g, '') === clean) || null;
}

function isSocioEligibleForBenefits(socio) {
  if (!socio) return false;
  if (getSocioParcelasPagasPix(socio) + getSocioParcelasIsentas(socio) >= 1) return true;
  if (socio.statusPagamento === 'Pago / Ativo' || String(socio.statusPagamento || '').includes('Parcela')) {
    return true;
  }
  return getSocioValorPagoEfetivo(socio) >= 35;
}

// ============================================================================
// ÁREA EXCLUSIVA DO SÓCIO TGA (LOGIN POR CPF + CARTEIRINHA + 3 PARCELAS)
// ============================================================================
function renderPortalSocioLogado(socio) {
  const emptyEl = document.getElementById('portalSocioEmptyState');
  const dashEl = document.getElementById('portalSocioDashboard');
  if (!emptyEl || !dashEl) return;

  if (!socio) {
    emptyEl.hidden = false;
    dashEl.hidden = true;
    return;
  }

  emptyEl.hidden = true;
  dashEl.hidden = false;

  const isIsento = isSocioIsento(socio);
  const qtdIsentas = getSocioParcelasIsentas(socio);
  const qtdPagasPix = getSocioParcelasPagasPix(socio);
  const valorIsento = getSocioValorIsento(socio);
  const valorPago = getSocioValorPagoEfetivo(socio);
  const valorLiquidoPrevisto = getSocioValorLiquidoPrevisto(socio);
  const faltaPagar = getSocioFaltaPagarPix(socio);
  const isAtivo = isSocioEligibleForBenefits(socio);
  const isQuitado = isIsento || faltaPagar === 0 || (qtdPagasPix + qtdIsentas >= 3);
  const motivoIsencao = socio.motivoIsencao || (isIsento ? '👑 Diretoria TGA' : '🩸 Ação Social TGA');

  const badgeEl = document.getElementById('portalSocioBadgeStatus');
  const sealEl = document.getElementById('portalSocioValidSeal');
  if (badgeEl) {
    badgeEl.textContent = isIsento
      ? '👑 DIRETORIA TGA • ISENTO'
      : (isQuitado
        ? '🏆 SÓCIO QUITADO TOTAL'
        : (isAtivo ? '✅ SÓCIO EM DIA (ATIVO)' : '⏳ PENDENTE PIX'));
    badgeEl.style.background = isAtivo ? '#eab308' : '#fef3c7';
    badgeEl.style.color = isAtivo ? '#052e16' : '#92400e';
  }
  if (sealEl) {
    sealEl.textContent = isIsento
      ? '● DIRETORIA TGA • BENEFÍCIOS LIBERADOS ✔'
      : (isAtivo ? '● BENEFÍCIOS LIBERADOS ✔' : '● AGUARDANDO 1ª PARCELA / PIX');
  }

  document.getElementById('portalSocioNome').textContent = (socio.nome || '—').toUpperCase();
  document.getElementById('portalSocioApelido').textContent = (socio.apelido || '—').toUpperCase();
  document.getElementById('portalSocioPelotao').textContent = `${socio.pelotao || '—'} (${socio.cidade || 'Rio Verde - GO'})`;
  document.getElementById('portalSocioCpf').textContent = socio.cpf || '—';
  document.getElementById('portalSocioCamisaSangue').textContent = `Tam. ${socio.tamanhoCamisa || 'G'} • ${socio.tipoSanguineo || 'O+'}`;
  document.getElementById('portalSocioNumeroCamisa').textContent = socio.numeroCamisa ? `CAMISA Nº ${socio.numeroCamisa}` : 'Nº —';

  const fotoImg = document.getElementById('portalSocioFotoImg');
  const fotoPh = document.getElementById('portalSocioFotoPlaceholder');
  if (fotoImg && fotoPh) {
    if (socio.fotoDataUrl) {
      fotoImg.src = socio.fotoDataUrl;
      fotoImg.hidden = false;
      fotoPh.hidden = true;
    } else {
      fotoImg.hidden = true;
      fotoPh.hidden = false;
    }
  }

  const modPill = document.getElementById('portalSocioModalidadePill');
  if (modPill) {
    modPill.textContent = isIsento
      ? '👑 Isento Total — Diretoria TGA'
      : (qtdIsentas > 0
        ? `🎁 ${qtdIsentas} Parcela(s) Isenta(s) (-${formatBRL(valorIsento)})`
        : (socio.formaPagamento || 'À Vista no PIX (R$ 105,00)'));
  }

  // Grade das 3 Parcelas (Mostra Paga PIX, Isenta ou Em Aberto)
  const parcGrid = document.getElementById('portalSocioParcelasGrid');
  if (parcGrid) {
    const boxes = [];
    for (let i = 1; i <= 3; i++) {
      if (i <= qtdPagasPix) {
        boxes.push(`
          <div style="padding:10px; border-radius:10px; text-align:center; background:#dcfce7; border:1px solid #86efac;">
            <div style="font-size:0.75rem; font-weight:800; color:#166534;">${i}ª PARCELA</div>
            <div style="font-size:0.98rem; font-weight:900; color:#064e3b; margin:2px 0;">R$ 35,00</div>
            <div style="font-size:0.72rem; font-weight:700; color:#15803d;">✔ PAGA NO PIX</div>
          </div>
        `);
      } else if (i <= qtdPagasPix + qtdIsentas) {
        boxes.push(`
          <div style="padding:10px; border-radius:10px; text-align:center; background:#fef9c3; border:2px solid #eab308;">
            <div style="font-size:0.75rem; font-weight:800; color:#854d0e;">${i}ª PARCELA</div>
            <div style="font-size:0.95rem; font-weight:900; color:#713f12; margin:2px 0;">ISENTA (-R$ 35)</div>
            <div style="font-size:0.69rem; font-weight:800; color:#a16207;">${escapeHtml(motivoIsencao)}</div>
          </div>
        `);
      } else {
        const subText = i === 1 ? 'Pagar no PIX' : (socio.boletosEnviados ? '📄 Boleto Enviado' : 'Boleto WhatsApp');
        boxes.push(`
          <div style="padding:10px; border-radius:10px; text-align:center; background:#fef3c7; border:1px solid #fde68a;">
            <div style="font-size:0.75rem; font-weight:800; color:#92400e;">${i}ª PARCELA</div>
            <div style="font-size:0.98rem; font-weight:900; color:#78350f; margin:2px 0;">R$ 35,00</div>
            <div style="font-size:0.72rem; font-weight:700; color:#b45309;">⏳ ${subText}</div>
          </div>
        `);
      }
    }
    parcGrid.innerHTML = boxes.join('');
  }

  const finResumo = document.getElementById('portalSocioFinanceiroResumo');
  if (finResumo) {
    finResumo.innerHTML = isIsento
      ? `
        <div style="display:flex; justify-content:space-between; flex-wrap:wrap; gap:6px;">
          <span><strong>Status Atual:</strong> 👑 Isento Total (Diretoria TGA)</span>
          <span><strong>Saldo Isento:</strong> <strong style="color:#a16207;">R$ 105,00 (3 Parcelas)</strong></span>
        </div>
        <div style="margin-top:6px; color:#047857; font-weight:700;">
          👑 Membro Isento da Diretoria TGA! Todos os seus benefícios de Sócio (Ingresso no Velosão + Desconto nos Materiais + Caravanas) estão LIBERADOS!
        </div>
      `
      : `
        <div style="display:flex; justify-content:space-between; flex-wrap:wrap; gap:6px;">
          <span><strong>Pago em PIX:</strong> <strong style="color:#047857;">${formatBRL(valorPago)}</strong></span>
          <span><strong>Saldo Isento:</strong> <strong style="color:#a16207;">${formatBRL(valorIsento)} (${qtdIsentas} parc.)</strong></span>
          <span><strong>Falta Pagar:</strong> <strong style="color:${faltaPagar > 0 ? '#b45309' : '#047857'};">${formatBRL(faltaPagar)}</strong></span>
        </div>
        ${qtdIsentas > 0 ? `<div style="margin-top:4px; font-size:0.8rem; color:#854d0e; font-weight:700;">🎁 Benefício aplicado: ${escapeHtml(motivoIsencao)} (-${formatBRL(valorIsento)} de R$ 105,00 • Líquido a pagar: ${formatBRL(valorLiquidoPrevisto)})</div>` : ''}
        <div style="margin-top:6px; color:${isAtivo ? '#047857' : '#b45309'}; font-weight:700;">
          ${isAtivo
            ? '🎉 Seus benefícios de Sócio TGA (Ingresso em casa no Velosão + Desconto nos Materiais + Prioridade em Caravanas) estão ATIVOS!'
            : `⏳ Pague a 1ª parcela (R$ 35,00) no PIX (${escapeHtml(appState.config.chavePix)}) ou participe de uma Ação Social elegível para ativar seus benefícios!`}
        </div>
      `;
  }

  const muralEl = document.getElementById('portalSocioMuralAviso');
  if (muralEl) {
    muralEl.textContent = appState.config.muralAviso || FALLBACK_STATE.config.muralAviso;
  }

  const rawWa = (appState.config.whatsappDiretoria || '').replace(/\D/g, '');
  const cleanWa = rawWa.startsWith('55') ? rawWa : `55${rawWa}`;
  const msgFin = encodeURIComponent(
    `\uD83D\uDFE2\u26AA Salve Diretoria TGA! Sou o sócio *${socio.nome}* (CPF: ${socio.cpf} | Camisa Nº ${socio.numeroCamisa || '—'}) e estou acessando minha Área do Sócio no site.`
  );
  const btnFinWa = document.getElementById('btnPortalFalarFinanceiroWa');
  if (btnFinWa) {
    btnFinWa.href = `https://api.whatsapp.com/send?phone=${cleanWa}&text=${msgFin}`;
  }

  const btnVip = document.getElementById('btnPortalGrupoVipWa');
  if (btnVip) {
    if (appState.config.linkGrupoVipWhatsapp && appState.config.linkGrupoVipWhatsapp.trim()) {
      btnVip.href = appState.config.linkGrupoVipWhatsapp.trim();
    } else {
      btnVip.href = `https://api.whatsapp.com/send?phone=${cleanWa}&text=${encodeURIComponent(`\uD83D\uDFE2\u26AA Salve Diretoria! Sou o sócio ${socio.nome} (CPF ${socio.cpf}) e quero entrar no Grupo VIP de Sócios da Garra Alviverde!`)}`;
    }
  }
}

// ============================================================================
// LOJA OFICIAL DE MATERIAIS GARRA ALVIVERDE (COM DESCONTO DE SÓCIO PELO CPF)
// ============================================================================
function renderLojaMateriaisSection() {
  const container = document.getElementById('lojaMateriaisCardsContainer');
  const select = document.getElementById('pedSelectMaterial');
  if (!container || !select) return;

  const currentSelected = select.value;
  container.innerHTML = '';
  select.innerHTML = '';

  const lista = Array.isArray(appState.materiais) ? appState.materiais : [];
  if (lista.length === 0) {
    container.innerHTML = `<div class="admin-subcard" style="text-align:center;">Nenhum material cadastrado no momento.</div>`;
    return;
  }

  lista.forEach((mat) => {
    const isDisponivel = mat.estoqueStatus !== 'Esgotado';
    const economia = Math.max(0, (Number(mat.valorNaoSocio) || 0) - (Number(mat.valorSocio) || 0));

    const card = document.createElement('div');
    card.className = 'caravana-card';
    card.innerHTML = `
      <div class="caravana-top">
        <h4>👕 ${escapeHtml(mat.nome)}</h4>
        <span class="caravana-status" style="background:${isDisponivel ? '#dcfce7' : '#fee2e2'}; color:${isDisponivel ? '#166534' : '#991b1b'};">
          ${escapeHtml(mat.estoqueStatus || 'Disponível')}
        </span>
      </div>
      <div style="display:flex; gap:14px; align-items:center; margin:10px 0;">
        <img src="${mat.fotoDataUrl || '/assets/logo-tga.jpg'}" alt="${escapeHtml(mat.nome)}" style="width:78px; height:78px; border-radius:12px; object-fit:cover; border:2px solid #006437; background:#fff; flex-shrink:0;" />
        <div>
          <div style="font-size:0.78rem; font-weight:800; color:#047857; text-transform:uppercase;">${escapeHtml(mat.categoria || 'Material Oficial TGA')}</div>
          <p style="font-size:0.88rem; color:#334155; margin:4px 0;">${escapeHtml(mat.descricao || '')}</p>
          <small style="color:#475569; font-weight:700;">📏 Tamanhos: ${escapeHtml(mat.tamanhos || 'P, M, G, GG, XG')}</small>
        </div>
      </div>
      <div class="caravana-prices-bar">
        <div class="price-col">
          <small>🟢 Preço Exclusivo Sócio TGA</small>
          <strong style="color:#006437; font-size:1.2rem;">${formatBRL(mat.valorSocio)}</strong>
          ${economia > 0 ? `<small style="color:#047857; font-weight:700;">Economia de ${formatBRL(economia)}!</small>` : ''}
        </div>
        <div class="price-col">
          <small>⚪ Preço Não-Sócio</small>
          <strong style="color:#64748b; text-decoration:line-through;">${formatBRL(mat.valorNaoSocio)}</strong>
        </div>
        <button type="button" class="btn btn-primary btn-sm" data-select-material="${mat.id}" ${!isDisponivel ? 'disabled' : ''}>
          ${isDisponivel ? '🛒 Escolher este Material →' : 'Esgotado'}
        </button>
      </div>
    `;
    container.appendChild(card);

    if (isDisponivel) {
      const opt = document.createElement('option');
      opt.value = mat.id;
      opt.textContent = `${mat.nome} — Sócio: ${formatBRL(mat.valorSocio)} | Não-Sócio: ${formatBRL(mat.valorNaoSocio)}`;
      select.appendChild(opt);
    }
  });

  if (currentSelected && Array.from(select.options).some(o => o.value === currentSelected)) {
    select.value = currentSelected;
  }

  container.querySelectorAll('[data-select-material]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-select-material');
      select.value = id;
      updatePedidoMaterialPriceDisplay();
      document.getElementById('pedCpf')?.focus();
      showToast('👕 Material selecionado! Digite seu CPF ao lado para calcular o desconto.');
    });
  });

  updatePedidoMaterialPriceDisplay();
}

function updatePedidoMaterialPriceDisplay() {
  const selectMat = document.getElementById('pedSelectMaterial');
  const qtdEl = document.getElementById('pedQuantidade');
  const cpfEl = document.getElementById('pedCpf');
  const feedbackEl = document.getElementById('pedCpfDiscountFeedback');
  const labelEl = document.getElementById('pedLabelModalidadePreco');
  const priceEl = document.getElementById('pedValorTotalCalculado');
  if (!selectMat || !priceEl) return;

  const mat = (appState.materiais || []).find(m => m.id === selectMat.value) || (appState.materiais || [])[0];
  if (!mat) {
    priceEl.textContent = 'R$ 0,00';
    return;
  }

  const qtd = Math.max(1, Number(qtdEl?.value) || 1);
  const cpfTyped = cpfEl?.value || '';
  const socioFound = findSocioByCpf(cpfTyped);
  const temDesconto = isSocioEligibleForBenefits(socioFound);

  if (socioFound) {
    const nomeInput = document.getElementById('pedNome');
    const waInput = document.getElementById('pedWhatsapp');
    if (nomeInput && !nomeInput.value.trim()) nomeInput.value = socioFound.nome || '';
    if (waInput && !waInput.value.trim()) waInput.value = socioFound.whatsapp || '';
  }

  const unitario = temDesconto ? Number(mat.valorSocio) : Number(mat.valorNaoSocio);
  const total = unitario * qtd;

  if (feedbackEl) {
    if (temDesconto && socioFound) {
      feedbackEl.style.color = '#047857';
      feedbackEl.textContent = `✅ SÓCIO EM DIA VERIFICADO (${socioFound.nome})! Preço com Desconto Exclusivo liberado (${formatBRL(mat.valorSocio)} cada)!`;
    } else if (socioFound && !temDesconto) {
      feedbackEl.style.color = '#b45309';
      feedbackEl.textContent = `⏳ Cadastro encontrado (${socioFound.nome}), mas ainda está como "Pendente PIX". Pague a 1ª parcela (R$ 35) para liberar o desconto!`;
    } else if (cpfTyped.replace(/\D/g, '').length >= 11) {
      feedbackEl.style.color = '#0369a1';
      feedbackEl.textContent = `ℹ️ CPF Não-Sócio: Aplicado valor normal (${formatBRL(mat.valorNaoSocio)}). Seja Sócio por 3x de R$ 35 e pague apenas ${formatBRL(mat.valorSocio)}!`;
    } else {
      feedbackEl.style.color = '#047857';
      feedbackEl.textContent = `💡 Digite seu CPF acima: se você for Sócio em dia, o preço cai de ${formatBRL(mat.valorNaoSocio)} para ${formatBRL(mat.valorSocio)} na hora!`;
    }
  }

  if (labelEl) {
    labelEl.textContent = temDesconto
      ? `🟢 Valor c/ Desconto de Sócio TGA (${qtd}x):`
      : `⚪ Valor Não-Sócio (${qtd}x):`;
  }
  priceEl.textContent = formatBRL(total);
}

// ============================================================================
// CENTRAL DE JOGOS DO E.C.R.V., TABELA & CHECK-IN DE INGRESSO NO VELOSÃO
// ============================================================================
function renderJogosEcrvSection() {
  const selectChk = document.getElementById('chkSelectJogo');
  const tbody = document.getElementById('publicJogosTableBody');
  if (!tbody) return;

  const jogos = Array.isArray(appState.jogosEcrv) ? appState.jogosEcrv : [];

  if (selectChk) {
    const currentVal = selectChk.value;
    const jogosCheckin = jogos.filter(j => String(j.mando || '').includes('Casa') && j.status !== 'Encerrado');
    selectChk.innerHTML = jogosCheckin.length === 0
      ? `<option value="">Nenhum jogo em casa com check-in aberto no momento</option>`
      : jogosCheckin.map(j => `<option value="${j.id}">🏟️ ${j.adversario} (${formatDateBR(j.dataJogo)} às ${j.horario})</option>`).join('');
    if (currentVal && Array.from(selectChk.options).some(o => o.value === currentVal)) {
      selectChk.value = currentVal;
    }
  }

  if (jogos.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding:20px;">Nenhum jogo cadastrado na tabela no momento.</td></tr>`;
    return;
  }

  tbody.innerHTML = jogos.map((j) => {
    const isCasa = String(j.mando || '').includes('Casa');
    const isEncerrado = j.status === 'Encerrado';
    return `
      <tr>
        <td>
          <strong>${escapeHtml(j.campeonato || 'Campeonato Goiano')}</strong><br>
          <small>${escapeHtml(j.rodada || '')}</small>
        </td>
        <td>
          <span class="status-badge" style="background:${isCasa ? '#dcfce7' : '#dbeafe'}; color:${isCasa ? '#166534' : '#1e40af'};">
            ${isCasa ? '🏟️ EM CASA (Velosão)' : '🚌 FORA DE CASA'}
          </span>
        </td>
        <td>
          <strong style="font-size:0.95rem; color:#064e3b;">⚽ ${escapeHtml(j.adversario)}</strong>
          ${j.placar ? `<div style="margin-top:3px; font-weight:800; color:#047857; background:#ecfdf5; display:inline-block; padding:2px 8px; border-radius:6px;">Placar: ${escapeHtml(j.placar)}</div>` : ''}
        </td>
        <td>
          <strong>📅 ${formatDateBR(j.dataJogo)}</strong><br>
          <small>⏰ Horário: ${escapeHtml(j.horario || '16:00')}</small>
        </td>
        <td>
          <small>${escapeHtml(j.estadio || 'Estádio Velosão')}</small>
        </td>
        <td>
          <span class="status-badge ${isEncerrado ? 'status-pending' : 'status-paid'}">
            ${escapeHtml(j.status || 'Agendado')}
          </span>
        </td>
      </tr>
    `;
  }).join('');
}

// ============================================================================
// PAINEL DE EVENTOS & AÇÕES SOCIAIS DA TGA (DOAÇÃO DE SANGUE, PÁSCOA, NATAL, DIA DAS CRIANÇAS)
// ============================================================================
function getEventoCategoryIcon(cat) {
  const c = String(cat || '');
  if (c.includes('Sangue')) return '🩸';
  if (c.includes('Páscoa') || c.includes('Pascoa')) return '🐰';
  if (c.includes('Criança') || c.includes('Crianca')) return '🎈';
  if (c.includes('Natal')) return '🎄';
  return '🤝';
}

function renderEventosTgaSection() {
  const container = document.getElementById('eventosPublicCardsContainer');
  const selectEv = document.getElementById('evSelectEvento');
  const filterBar = document.getElementById('eventosCategoryFilterBar');
  if (!container || !selectEv) return;

  const eventos = Array.isArray(appState.eventosTga) ? appState.eventosTga : [];
  const participantes = Array.isArray(appState.participantesEventos) ? appState.participantesEventos : [];

  if (filterBar) {
    filterBar.querySelectorAll('[data-filter-evento-cat]').forEach((btn) => {
      const cat = btn.getAttribute('data-filter-evento-cat');
      const isActive = cat === currentPublicEventoCategoryFilter;
      btn.className = isActive ? 'btn btn-primary btn-sm' : 'btn btn-secondary btn-sm';
    });
  }

  const filtrados = currentPublicEventoCategoryFilter === 'todos'
    ? eventos
    : eventos.filter((ev) => String(ev.categoria || '') === currentPublicEventoCategoryFilter);

  const prevSelected = selectEv.value;
  const abertos = eventos.filter((ev) => ev.status !== 'Concluído');
  selectEv.innerHTML = abertos.length === 0
    ? `<option value="">Nenhum evento com inscrição aberta no momento</option>`
    : abertos.map((ev) => {
        const icone = getEventoCategoryIcon(ev.categoria);
        const tagIsenta = ev.isentaParcela !== false ? ' — [🎁 Isenta 1 Parcela de R$ 35]' : '';
        return `<option value="${ev.id}">${icone} ${ev.titulo} (${formatDateBR(ev.dataEvento)})${tagIsenta}</option>`;
      }).join('');
  if (prevSelected && Array.from(selectEv.options).some((o) => o.value === prevSelected)) {
    selectEv.value = prevSelected;
  }

  if (filtrados.length === 0) {
    container.innerHTML = `<div class="admin-subcard" style="text-align:center;">Nenhum evento encontrado nesta categoria no momento.</div>`;
    return;
  }

  container.innerHTML = filtrados.map((ev) => {
    const icone = getEventoCategoryIcon(ev.categoria);
    const isAberto = ev.status !== 'Concluído';
    const qtdInscritos = participantes.filter((p) => p.eventoId === ev.id).length;

    return `
      <div class="caravana-card" style="border: 2px solid ${ev.isentaParcela !== false ? '#006437' : '#cbd5e1'};">
        <div class="caravana-top">
          <h4>${icone} ${escapeHtml(ev.titulo)}</h4>
          <span class="caravana-status" style="background:${isAberto ? '#dcfce7' : '#e2e8f0'}; color:${isAberto ? '#166534' : '#475569'};">
            ${escapeHtml(ev.status || 'Aberto')}
          </span>
        </div>

        <div style="display:flex; flex-wrap:wrap; gap:8px; margin:6px 0 10px;">
          <span class="status-badge" style="background:#ecfdf5; color:#047857; border:1px solid #a7f3d0; font-weight:800;">
            ${icone} ${escapeHtml(ev.categoria || 'Ações Sociais')}
          </span>
          ${ev.isentaParcela !== false ? `
            <span class="status-badge" style="background:#fef08a; color:#052e16; border:1px solid #ca8a04; font-weight:800;">
              🎁 Vale Isenção de 1 Parcela (R$ 35,00) p/ Sócio TGA!
            </span>
          ` : ''}
        </div>

        <p style="font-size:0.9rem; color:#334155; margin:0 0 10px; line-height:1.45;">
          ${escapeHtml(ev.descricao || '')}
        </p>

        <div class="caravana-details-list">
          <div>📅 <strong>Data:</strong> ${formatDateBR(ev.dataEvento)} • <strong>Horário:</strong> ${escapeHtml(ev.horario || '08:00')}</div>
          <div>📍 <strong>Local / Concentração:</strong> ${escapeHtml(ev.local || 'Rio Verde - GO')}</div>
          <div>👥 <strong>Participantes Inscritos:</strong> <strong style="color:#006437;">${qtdInscritos} voluntário(s) / sócio(s)</strong></div>
        </div>

        <button type="button" class="btn btn-primary btn-block" data-select-evento="${ev.id}" ${!isAberto ? 'disabled' : ''}>
          ${isAberto ? '🙋‍♂️ Participar deste Evento & Garantir Benefício →' : 'Evento Concluído'}
        </button>
      </div>
    `;
  }).join('');

  container.querySelectorAll('[data-select-evento]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-select-evento');
      if (selectEv) selectEv.value = id;
      document.getElementById('evParticipanteCpf')?.focus();
      showToast('🤝 Evento selecionado! Preencha seu CPF ao lado para confirmar presença.');
    });
  });

  updateEventoParticipanteCpfFeedback();
}

function updateEventoParticipanteCpfFeedback() {
  const cpfEl = document.getElementById('evParticipanteCpf');
  const feedbackEl = document.getElementById('evCpfSocioFeedback');
  if (!cpfEl || !feedbackEl) return;

  const cpfTyped = cpfEl.value || '';
  const socioFound = findSocioByCpf(cpfTyped);

  if (socioFound) {
    const nomeInput = document.getElementById('evParticipanteNome');
    const waInput = document.getElementById('evParticipanteWhatsapp');
    const sangueSelect = document.getElementById('evParticipanteSangue');
    if (nomeInput && !nomeInput.value.trim()) nomeInput.value = socioFound.nome || '';
    if (waInput && !waInput.value.trim()) waInput.value = socioFound.whatsapp || '';
    if (sangueSelect && socioFound.tipoSanguineo) sangueSelect.value = socioFound.tipoSanguineo;

    const qtdIsentas = getSocioParcelasIsentas(socioFound);
    const falta = getSocioFaltaPagarPix(socioFound);
    feedbackEl.style.color = '#047857';
    feedbackEl.textContent = falta > 0
      ? `✅ SÓCIO IDENTIFICADO: ${socioFound.nome}! Ao participar e ter presença confirmada, você ganha ISENÇÃO de +1 Parcela (-R$ 35,00)!`
      : `✅ SÓCIO IDENTIFICADO: ${socioFound.nome} (${qtdIsentas === 3 ? 'Diretoria Isento' : 'Plano Quitado'})! Obrigado por fortalecer nossas ações sociais!`;
  } else if (cpfTyped.replace(/\D/g, '').length >= 11) {
    feedbackEl.style.color = '#0369a1';
    feedbackEl.textContent = `ℹ️ CPF ainda não consta como Sócio TGA. Você pode participar normalmente da ação social, ou fazer sua inscrição de Sócio para ganhar 1 parcela isenta!`;
  } else {
    feedbackEl.style.color = '#047857';
    feedbackEl.textContent = `💡 Digite seu CPF acima para vincular ao seu cadastro de Sócio TGA e receber a isenção de 1 parcela (R$ 35,00)!`;
  }
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
        summaryEl.textContent = 'Você está no comando Master: pode isentar sócios por parcela ou total, gerenciar eventos sociais, diretores e auditar todas as alterações.';
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
  ['btnExportSociosCsv', 'btnPrintSocios', 'btnExportCaravanasCsv', 'btnPrintCaravanas', 'btnExportIsentosXls', 'btnPrintIsentosPdf', 'btnExportEventosXls', 'btnPrintEventosPdf'].forEach((btnId) => {
    const el = document.getElementById(btnId);
    if (el) el.hidden = !canExport;
  });

  // KPIs Financeiros (Arrecadado, Previsto Líquido e Valores/Saldos Isentos)
  document.getElementById('kpiTotalSocios').textContent = appState.socios.length;
  document.getElementById('kpiTotalCaravanasInscritos').textContent = appState.inscricoesCaravana.length;

  const pendentesSocios = appState.socios.filter(s => getSocioFaltaPagarPix(s) > 0).length;
  const pendentesCar = appState.inscricoesCaravana.filter(i => i.statusPix !== 'PIX Confirmado').length;
  document.getElementById('kpiTotalPendentes').textContent = pendentesSocios + pendentesCar;

  const brutoSocios = appState.socios.length * 105;
  const recebidoSocios = appState.socios.reduce((acc, s) => acc + getSocioValorPagoEfetivo(s), 0);
  const previstoSocios = appState.socios.reduce((acc, s) => acc + getSocioValorLiquidoPrevisto(s), 0);
  const totalIsentoReais = appState.socios.reduce((acc, s) => acc + getSocioValorIsento(s), 0);
  const totalParcelasIsentas = appState.socios.reduce((acc, s) => acc + getSocioParcelasIsentas(s), 0);
  const totalSociosComIsencao = appState.socios.filter(s => hasSocioAnyIsencao(s)).length;

  const recebidoCaravanas = appState.inscricoesCaravana.reduce((acc, i) => acc + (i.statusPix === 'PIX Confirmado' ? (Number(i.valorPago) || 0) : 0), 0);
  const previstoCaravanas = appState.inscricoesCaravana.reduce((acc, i) => acc + (Number(i.valorPago) || 0), 0);

  const totalRecebido = recebidoSocios + recebidoCaravanas;
  const totalPrevisto = previstoSocios + previstoCaravanas;
  const totalBrutoGeral = brutoSocios + previstoCaravanas;
  const faltaReceberGeral = Math.max(0, totalPrevisto - totalRecebido);

  document.getElementById('kpiReceitaTotal').textContent = `${formatBRL(totalRecebido)} / ${formatBRL(totalPrevisto)}`;
  const kpiReceitaSubEl = document.getElementById('kpiReceitaSub');
  if (kpiReceitaSubEl) {
    kpiReceitaSubEl.textContent = `Bruto Tabelado: ${formatBRL(totalBrutoGeral)} • Falta Receber: ${formatBRL(faltaReceberGeral)}`;
  }

  const kpiIsentoValEl = document.getElementById('kpiTotalIsentoValor');
  const kpiIsentoSubEl = document.getElementById('kpiTotalIsentoSub');
  if (kpiIsentoValEl) kpiIsentoValEl.textContent = formatBRL(totalIsentoReais);
  if (kpiIsentoSubEl) {
    kpiIsentoSubEl.textContent = `${totalParcelasIsentas} parcela(s) isenta(s) (${totalSociosComIsencao} sócio(s))`;
  }

  renderExtratoIsentosPanel();

  document.getElementById('tabCountSocios').textContent = appState.socios.length;
  document.getElementById('tabCountCaravanas').textContent = appState.inscricoesCaravana.length;
  const countEventosEl = document.getElementById('tabCountEventos');
  if (countEventosEl) countEventosEl.textContent = (appState.participantesEventos || []).length;
  const countPedidosEl = document.getElementById('tabCountPedidosLoja');
  if (countPedidosEl) countPedidosEl.textContent = (appState.pedidosMateriais || []).length;
  const countCheckinsEl = document.getElementById('tabCountCheckins');
  if (countCheckinsEl) countCheckinsEl.textContent = (appState.checkinsJogos || []).length;
  const countDirEl = document.getElementById('tabCountDiretores');
  if (countDirEl) countDirEl.textContent = (appState.usuariosDiretoria || []).length;
  const countAudEl = document.getElementById('tabCountAuditoria');
  if (countAudEl) countAudEl.textContent = (appState.auditoriaLogs || []).length;

  renderAdminSociosTable();
  renderAdminEventosTab();
  renderAdminCaravanasFilterOptions();
  renderAdminCaravanasInscritosTable();
  renderAdminManageCaravanasList();
  renderAdminLojaTab();
  renderAdminJogosTab();
  renderAdminDiretoresList();
  renderAdminAuditoriaTable();
  populateAdminConfigForm();
  if (isMaster) {
    loadAndRenderBackups();
  }
}

function renderExtratoIsentosPanel() {
  const tbody = document.getElementById('tbodyExtratoIsentos');
  if (!tbody) return;

  const totalSocios = appState.socios.length;
  const brutoSocios = totalSocios * 105;
  const isentosDiretoriaList = appState.socios.filter(s => getSocioParcelasIsentas(s) === 3);
  const isentosParciaisList = appState.socios.filter(s => getSocioParcelasIsentas(s) > 0 && getSocioParcelasIsentas(s) < 3);

  const valorIsentoDiretoria = isentosDiretoriaList.reduce((acc, s) => acc + getSocioValorIsento(s), 0);
  const valorIsentoParciais = isentosParciaisList.reduce((acc, s) => acc + getSocioValorIsento(s), 0);
  const qtdParcelasParciais = isentosParciaisList.reduce((acc, s) => acc + getSocioParcelasIsentas(s), 0);

  const previstoLiquidoSocios = appState.socios.reduce((acc, s) => acc + getSocioValorLiquidoPrevisto(s), 0);
  const recebidoSocios = appState.socios.reduce((acc, s) => acc + getSocioValorPagoEfetivo(s), 0);
  const faltaSocios = Math.max(0, previstoLiquidoSocios - recebidoSocios);

  const elBruto = document.getElementById('extBrutoSocios');
  const elBrutoSub = document.getElementById('extBrutoSociosSub');
  const elDir = document.getElementById('extIsentoDiretoria');
  const elDirSub = document.getElementById('extIsentoDiretoriaSub');
  const elParc = document.getElementById('extIsentoParcelas');
  const elParcSub = document.getElementById('extIsentoParcelasSub');
  const elLiq = document.getElementById('extLiquidoPrevisto');
  const elLiqSub = document.getElementById('extLiquidoPrevistoSub');

  if (elBruto) elBruto.textContent = formatBRL(brutoSocios);
  if (elBrutoSub) elBrutoSub.textContent = `${totalSocios} sócio(s) × R$ 105,00`;
  if (elDir) elDir.textContent = `- ${formatBRL(valorIsentoDiretoria)}`;
  if (elDirSub) elDirSub.textContent = `${isentosDiretoriaList.length} diretor(es) isento(s) (3 parcelas)`;
  if (elParc) elParc.textContent = `- ${formatBRL(valorIsentoParciais)}`;
  if (elParcSub) elParcSub.textContent = `${qtdParcelasParciais} parcela(s) de R$ 35,00 (${isentosParciaisList.length} sócio(s) em ações)`;
  if (elLiq) elLiq.textContent = formatBRL(previstoLiquidoSocios);
  if (elLiqSub) elLiqSub.textContent = `Arrecadado: ${formatBRL(recebidoSocios)} | Falta: ${formatBRL(faltaSocios)}`;

  const todosComIsencao = appState.socios.filter(s => hasSocioAnyIsencao(s));
  const isMaster = Boolean(currentAdminUser && currentAdminUser.isMaster);

  if (todosComIsencao.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding:18px;">Nenhum sócio com parcela ou saldo isento até o momento. Use o botão <strong>"👑 Isentar Parcela / Sócio"</strong> na tabela abaixo para conceder isenção!</td></tr>`;
    return;
  }

  tbody.innerHTML = todosComIsencao.map((s) => {
    const qtdIsentas = getSocioParcelasIsentas(s);
    const valIsento = getSocioValorIsento(s);
    const valPago = getSocioValorPagoEfetivo(s);
    const valFalta = getSocioFaltaPagarPix(s);
    const motivo = s.motivoIsencao || (qtdIsentas === 3 ? '👑 Membro da Diretoria TGA' : '🩸 Ação Social / Doação de Sangue TGA');
    const numCamisa = s.numeroCamisa ? `Nº ${s.numeroCamisa}` : 'Nº —';

    return `
      <tr>
        <td>
          <strong>👕 ${escapeHtml(numCamisa)} — ${escapeHtml(s.nome)}</strong><br>
          <small>CPF: ${escapeHtml(s.cpf || '—')} | Apelido: ${escapeHtml(s.apelido || '—')}</small>
        </td>
        <td>
          <span class="status-badge" style="background:#fef08a; color:#713f12; border:1px solid #eab308; font-weight:800;">
            ${escapeHtml(motivo)}
          </span>
        </td>
        <td>
          <strong>${qtdIsentas} de 3 parcela(s)</strong>
        </td>
        <td>
          <strong style="color:#a16207; font-size:0.95rem;">${formatBRL(valIsento)}</strong>
        </td>
        <td>
          <strong style="color:#047857;">${formatBRL(valPago)}</strong>
        </td>
        <td>
          <strong style="color:${valFalta > 0 ? '#b45309' : '#047857'};">${valFalta > 0 ? formatBRL(valFalta) : 'Quitado (R$ 0,00)'}</strong>
        </td>
        <td>
          ${isMaster ? `
            <button type="button" class="btn-table" data-open-isentar-extrato="${s.id}" style="background:#fef08a; color:#052e16; border:1px solid #ca8a04; font-weight:800;">
              👑 Ajustar Isenção
            </button>
          ` : '<small>Restrito ao Master</small>'}
        </td>
      </tr>
    `;
  }).join('');

  tbody.querySelectorAll('[data-open-isentar-extrato]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-open-isentar-extrato');
      openModalIsentarSocioParcelas(id);
    });
  });
}

function openModalIsentarSocioParcelas(socioId) {
  if (!currentAdminUser || !currentAdminUser.isMaster) {
    showToast('🚫 Apenas o Usuário Master pode isentar parcelas ou sócios.');
    return;
  }
  const socio = appState.socios.find(s => s.id === socioId);
  if (!socio) return;

  document.getElementById('isencaoSocioId').value = socio.id;
  const qtdIsentasAtual = getSocioParcelasIsentas(socio);
  const qtdPagasPix = getSocioParcelasPagasPix(socio);
  const valPago = getSocioValorPagoEfetivo(socio);
  const valIsento = getSocioValorIsento(socio);
  const valFalta = getSocioFaltaPagarPix(socio);

  const infoBox = document.getElementById('isencaoSocioInfoBox');
  if (infoBox) {
    infoBox.innerHTML = `
      <div style="font-size:0.95rem; font-weight:800; color:#064e3b; margin-bottom:4px;">
        👤 Sócio: ${escapeHtml(socio.nome)} (${escapeHtml(socio.apelido || 'Sem apelido')}) • Camisa Nº ${escapeHtml(socio.numeroCamisa || '—')}
      </div>
      <div style="display:flex; flex-wrap:wrap; gap:12px; font-size:0.82rem; color:#1e293b;">
        <span>💵 <strong>Pago em PIX:</strong> ${formatBRL(valPago)} (${qtdPagasPix} parc.)</span>
        <span>👑 <strong>Isento Atual:</strong> ${formatBRL(valIsento)} (${qtdIsentasAtual} parc.)</span>
        <span>⏳ <strong>Falta Pagar:</strong> ${formatBRL(valFalta)}</span>
      </div>
    `;
  }

  const defaultChoice = qtdIsentasAtual > 0 ? String(qtdIsentasAtual) : '1';
  const radios = document.querySelectorAll('input[name="qtdParcelasIsentas"]');
  radios.forEach((r) => {
    r.checked = r.value === defaultChoice;
  });

  const motivoSelect = document.getElementById('isencaoMotivoSelect');
  if (motivoSelect && socio.motivoIsencao) {
    const exists = Array.from(motivoSelect.options).some(o => o.value === socio.motivoIsencao);
    if (exists) motivoSelect.value = socio.motivoIsencao;
  } else if (motivoSelect) {
    motivoSelect.value = defaultChoice === '3'
      ? '👑 Membro da Diretoria TGA'
      : '🩸 Campanha de Doação de Sangue TGA';
  }

  const motivoGroup = document.getElementById('isencaoMotivoGroup');
  if (motivoGroup) motivoGroup.hidden = defaultChoice === '0';

  document.getElementById('modalIsentarSocioParcelas').hidden = false;
}

function openEditSocioModal(socioId) {
  if (!hasPerm('editarSocio')) {
    showToast('🚫 Seu usuário não tem permissão para editar dados de sócios.');
    return;
  }
  const socio = appState.socios.find(s => s.id === socioId);
  if (!socio) return;
  const isMaster = Boolean(currentAdminUser && currentAdminUser.isMaster);
  const isIsento = isSocioIsento(socio);

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

  const optFormaIsento = document.getElementById('optFormaIsentoMaster');
  const optStatusIsento = document.getElementById('optStatusIsentoMaster');
  if (optFormaIsento) optFormaIsento.hidden = !isMaster && !isIsento;
  if (optStatusIsento) optStatusIsento.hidden = !isMaster && !isIsento;

  const formaEl = document.getElementById('editSocFormaPagamento');
  if (formaEl) {
    if (isIsento) {
      formaEl.value = 'Isento — Diretoria TGA (R$ 0,00)';
    } else {
      formaEl.value = (socio.formaPagamento && socio.formaPagamento.includes('3x'))
        ? 'Parcelado em 3x de R$ 35,00'
        : 'À Vista no PIX (R$ 105,00)';
    }
  }
  document.getElementById('editSocValor').value = getSocioValorLiquidoPrevisto(socio);
  const valPagoEl = document.getElementById('editSocValorPago');
  if (valPagoEl) valPagoEl.value = getSocioValorPagoEfetivo(socio);
  document.getElementById('editSocStatus').value = isIsento ? 'Isento (Diretoria)' : (socio.statusPagamento || 'Pendente PIX');
  const bolEl = document.getElementById('editSocBoletosEnviados');
  if (bolEl) bolEl.checked = Boolean(socio.boletosEnviados);
  document.getElementById('editSocObs').value = socio.observacoes || '';

  const canApprovePix = hasPerm('aprovarPixSocio') && (!hasSocioAnyIsencao(socio) || isMaster);
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
    const matchStatus = statusFilter === 'todos'
      || s.statusPagamento === statusFilter
      || (statusFilter === 'com_isencao' && hasSocioAnyIsencao(s))
      || (statusFilter === 'Isento (Diretoria)' && isSocioIsento(s));
    const text = `${s.numeroCamisa || ''} ${s.matricula || ''} ${s.nome} ${s.apelido} ${s.cpf} ${s.pelotao} ${s.cidade} ${s.formaPagamento || ''} ${s.statusPagamento || ''} ${s.motivoIsencao || ''}`.toLowerCase();
    return matchStatus && text.includes(query);
  });

  if (filtrados.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align:center;padding:24px;">Nenhum sócio encontrado para este filtro.</td></tr>`;
    return;
  }

  const isMaster = Boolean(currentAdminUser && currentAdminUser.isMaster);
  const canPix = hasPerm('aprovarPixSocio');
  const canEdit = hasPerm('editarSocio');
  const canDel = hasPerm('excluirSocio');

  tbody.innerHTML = filtrados.map((s) => {
    const isIsento = isSocioIsento(s);
    const qtdIsentas = getSocioParcelasIsentas(s);
    const qtdPagasPix = getSocioParcelasPagasPix(s);
    const valorIsento = getSocioValorIsento(s);
    const valorLiquido = getSocioValorLiquidoPrevisto(s);
    const valorJaPago = getSocioValorPagoEfetivo(s);
    const faltaPagar = getSocioFaltaPagarPix(s);
    const isPaid = faltaPagar === 0 || isIsento || s.statusPagamento === 'Pago / Ativo';
    const isPartial = !isPaid && (qtdPagasPix > 0 || qtdIsentas > 0);
    const isParcelado = !isIsento && (String(s.formaPagamento || '').includes('3x') || qtdIsentas > 0);

    const cleanPhone = (s.whatsapp || '').replace(/\D/g, '');
    const msgCobrancaOuContato = isIsento
      ? `\uD83D\uDFE2\u26AA Salve ${s.nome}! Aqui é da Diretoria da ${appState.config.nomeTorcida} referente à sua Carteirinha Oficial de Diretor Isento.`
      : (qtdIsentas > 0
        ? `\uD83D\uDFE2\u26AA Salve ${s.nome}! Aqui é da Diretoria da ${appState.config.nomeTorcida}. Você possui ${qtdIsentas} parcela(s) isenta(s) (-${formatBRL(valorIsento)}) no seu Sócio Garra!`
        : (isParcelado
          ? `\uD83D\uDFE2\u26AA Salve ${s.nome}! Aqui é da Diretoria da ${appState.config.nomeTorcida} referente ao seu Sócio Garra (${s.formaPagamento}) e envio dos boletos das parcelas.`
          : `\uD83D\uDFE2\u26AA Salve ${s.nome}! Aqui é da Diretoria da ${appState.config.nomeTorcida} referente à sua inscrição de Sócio Garra Alviverde.`));
    const waLink = `https://api.whatsapp.com/send?phone=55${cleanPhone.replace(/^55/, '')}&text=${encodeURIComponent(msgCobrancaOuContato)}`;
    const numCamisaDisplay = s.numeroCamisa ? `Nº ${s.numeroCamisa}` : 'Nº —';

    let btnPixLabel = '✔ Confirmar PIX';
    if (isParcelado) {
      if (faltaPagar > 0) {
        const proxParcelaNum = qtdPagasPix + 1;
        const novoTotalPago = Math.min(valorLiquido, (qtdPagasPix + 1) * 35);
        btnPixLabel = novoTotalPago >= valorLiquido
          ? `✔ Quitar PIX (${formatBRL(novoTotalPago)})`
          : `✔ Confirmar ${proxParcelaNum}ª PIX (${formatBRL(novoTotalPago)})`;
      } else {
        btnPixLabel = 'Voltar PIX p/ R$ 0';
      }
    } else {
      btnPixLabel = isPaid ? 'Marcar Pendente' : `✔ Confirmar PIX (${formatBRL(valorLiquido)})`;
    }

    const boletoBadgeHtml = isParcelado && faltaPagar > 0
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

    const motivoBadgeHtml = qtdIsentas > 0
      ? `<div style="margin-top:3px; display:inline-block; background:#fef08a; color:#713f12; border:1px solid #eab308; padding:1px 7px; border-radius:999px; font-size:0.71rem; font-weight:800;">
           ${escapeHtml(s.motivoIsencao || (isIsento ? '👑 Diretoria TGA' : '🩸 Ação Social TGA'))} (-${formatBRL(valorIsento)})
         </div><br>`
      : '';

    const planoColHtml = isIsento
      ? `<strong style="color:#047857;">👑 Isento Total — Diretoria TGA</strong><br>
         ${motivoBadgeHtml}
         <small style="color:#065f46; font-weight:800;">3/3 Parcelas Isentas • Benefícios 100% Ativos</small><br>
         <small>Camisa: <strong>${s.tamanhoCamisa} (${numCamisaDisplay})</strong> | Sangue: ${s.tipoSanguineo}</small>`
      : `<strong>${s.formaPagamento || 'À Vista no PIX (R$ 105,00)'}</strong><br>
         ${motivoBadgeHtml}
         <small style="color:${faltaPagar === 0 ? '#047857' : '#b45309'}; font-weight:700;">
           PIX: ${formatBRL(valorJaPago)} ${qtdIsentas > 0 ? `| Isento: ${formatBRL(valorIsento)} (${qtdIsentas}p)` : ''} | ${faltaPagar > 0 ? `Falta: ${formatBRL(faltaPagar)}` : 'Quitado ✔'}
         </small><br>
         <small>Camisa: <strong>${s.tamanhoCamisa} (${numCamisaDisplay})</strong> | Sangue: ${s.tipoSanguineo}</small>`;

    const statusBadgeStyle = isIsento
      ? 'background:linear-gradient(135deg,#fef08a,#fde047); color:#052e16; border:1px solid #ca8a04; font-weight:800;'
      : (qtdIsentas > 0 && !isPaid
        ? 'background:#fef9c3; color:#854d0e; border:1px solid #eab308; font-weight:800;'
        : (isPartial ? 'background:#e0f2fe;color:#0369a1;' : ''));

    const statusTextDisplay = isIsento
      ? '👑 Isento Total (Diretoria)'
      : (isPaid && qtdIsentas > 0
        ? `✅ Quitado (${qtdIsentas} Parc. Isenta)`
        : (s.statusPagamento || 'Pendente PIX'));

    return `
      <tr>
        <td>
          <strong>\uD83D\uDC55 ${numCamisaDisplay}</strong><br>
          <small>${formatDateBR(s.createdAt)}</small>
        </td>
        <td>
          <strong>${s.nome}</strong> ${qtdIsentas > 0 ? '<span title="Possui Isenção Master">👑</span>' : ''}<br>
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
          ${planoColHtml}
        </td>
        <td>
          <span class="status-badge ${isPaid ? 'status-paid' : 'status-pending'}" style="${statusBadgeStyle}">
            ${statusTextDisplay}
          </span>
          ${boletoBadgeHtml}
          ${aprovadoInfoHtml}
        </td>
        <td>
          <div class="action-btns">
            ${canPix && !isIsento ? `
              <button type="button" class="btn-table btn-approve" data-toggle-socio="${s.id}">
                ${btnPixLabel}
              </button>
            ` : ''}
            ${isMaster ? `
              <button type="button" class="btn-table" data-isentar-socio="${s.id}" title="Exclusivo Usuário Master: Isentar por Parcela (Doação de Sangue/Eventos) ou Total (Diretoria)" style="background:linear-gradient(135deg,#fde047,#eab308); color:#052e16; border:1px solid #ca8a04; font-weight:800;">
                👑 Isentar Parcela / Sócio
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

  // Botão EXCLUSIVO DO USUÁRIO MASTER: Abre modal para Isentar 1, 2 ou 3 Parcelas (ou remover isenção)
  tbody.querySelectorAll('[data-isentar-socio]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-isentar-socio');
      openModalIsentarSocioParcelas(id);
    });
  });

  tbody.querySelectorAll('[data-toggle-socio]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      if (!hasPerm('aprovarPixSocio')) {
        showToast('🚫 Você não tem permissão para alterar status de pagamento PIX.');
        return;
      }
      const id = btn.getAttribute('data-toggle-socio');
      const socio = appState.socios.find(x => x.id === id);
      if (!socio) return;

      const qtdIsentas = getSocioParcelasIsentas(socio);
      const valorLiquido = getSocioValorLiquidoPrevisto(socio);
      const qtdPagasAtual = getSocioParcelasPagasPix(socio);
      const isParcelado = String(socio.formaPagamento || '').includes('3x') || qtdIsentas > 0;
      const statusAntigo = socio.statusPagamento;

      let novoValorPago = 0;
      let novasParcelasPagas = 0;
      let novoStatus = 'Pendente PIX';

      if (isParcelado) {
        if (getSocioFaltaPagarPix(socio) > 0) {
          novasParcelasPagas = qtdPagasAtual + 1;
          novoValorPago = Math.min(valorLiquido, novasParcelasPagas * 35);
          if (novoValorPago >= valorLiquido) {
            novoStatus = 'Pago / Ativo';
          } else if (novasParcelasPagas === 1 && qtdIsentas === 0) {
            novoStatus = '1ª Parcela Paga (R$ 35)';
          } else if (novasParcelasPagas === 2 && qtdIsentas === 0) {
            novoStatus = '2ª Parcela Paga (R$ 70)';
          } else {
            novoStatus = `1ª Parcela Paga + ${qtdIsentas} Isenta`;
          }
        } else {
          novasParcelasPagas = 0;
          novoValorPago = 0;
          novoStatus = qtdIsentas > 0
            ? (qtdIsentas === 1 ? '1 Parcela Isenta (R$ 35)' : '2 Parcelas Isentas (R$ 70)')
            : 'Pendente PIX';
        }
      } else {
        if (statusAntigo === 'Pago / Ativo') {
          novoStatus = 'Pendente PIX';
          novoValorPago = 0;
          novasParcelasPagas = 0;
        } else {
          novoStatus = 'Pago / Ativo';
          novoValorPago = valorLiquido;
          novasParcelasPagas = Math.round(valorLiquido / 35);
        }
      }

      const dirNome = currentAdminUser ? currentAdminUser.nome : 'Diretoria';
      const ok = window.confirm(
        `Confirmar atualização financeira de "${socio.nome}" para:\n• Status: ${novoStatus}\n• Valor Pago em PIX: ${formatBRL(novoValorPago)} (Líquido previsto: ${formatBRL(valorLiquido)})\n\nEsta ação ficará registrada em seu usuário: ${dirNome}.`
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
      socio.parcelasPagas = novasParcelasPagas;
      socio.aprovadoPor = aprovadoPor;

      const audit = buildAuditPayload(
        'PIX Sócio',
        `Atualizou pagamento PIX do sócio ${socio.nome} para "${novoStatus}"`,
        `Status: "${statusAntigo}" ➔ "${novoStatus}" | Pago PIX: ${formatBRL(novoValorPago)} | Saldo Isento: ${formatBRL(getSocioValorIsento(socio))}`
      );

      try {
        await fetch(`/api/socios/${id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            statusPagamento: novoStatus,
            valorPago: novoValorPago,
            parcelasPagas: novasParcelasPagas,
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
  const muralEl = document.getElementById('cfgMuralAviso');
  if (muralEl) muralEl.value = cfg.muralAviso || FALLBACK_STATE.config.muralAviso;
  const vipEl = document.getElementById('cfgLinkGrupoVip');
  if (vipEl) vipEl.value = cfg.linkGrupoVipWhatsapp || '';
}

// ============================================================================
// ADMINISTRAÇÃO DE EVENTOS & AÇÕES SOCIAIS DA TGA E ISENÇÃO DE PARCELA
// ============================================================================
function renderAdminEventosTab() {
  const evListEl = document.getElementById('adminEventosList');
  const filterSelect = document.getElementById('filterEventoParticipantesSelect');
  const partBodyEl = document.getElementById('adminParticipantesEventosBody');

  const eventos = Array.isArray(appState.eventosTga) ? appState.eventosTga : [];
  const todosPart = Array.isArray(appState.participantesEventos) ? appState.participantesEventos : [];
  const isMaster = Boolean(currentAdminUser && currentAdminUser.isMaster);

  if (filterSelect) {
    const cur = filterSelect.value;
    filterSelect.innerHTML = `<option value="todos">Todos os Eventos e Ações Sociais (${todosPart.length})</option>` +
      eventos.map(ev => `<option value="${ev.id}">${escapeHtml(ev.titulo)} (${formatDateBR(ev.dataEvento)})</option>`).join('');
    if (cur && Array.from(filterSelect.options).some(o => o.value === cur)) {
      filterSelect.value = cur;
    }
  }

  if (evListEl) {
    evListEl.innerHTML = eventos.length === 0
      ? `<p style="padding:12px;">Nenhum evento ou ação social cadastrado.</p>`
      : eventos.map((ev) => {
          const icon = getEventoCategoryIcon(ev.categoria);
          const isAberto = ev.status !== 'Encerrado';
          const qtdInscritos = todosPart.filter(p => p.eventoId === ev.id).length;
          return `
            <div class="manage-item" style="flex-direction:column; align-items:stretch; gap:8px;">
              <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:8px; flex-wrap:wrap;">
                <div>
                  <strong>${icon} ${escapeHtml(ev.titulo)}</strong>
                  <span class="status-badge ${isAberto ? 'status-paid' : 'status-pending'}" style="margin-left:6px;">
                    ${escapeHtml(ev.status || 'Inscrições Abertas')}
                  </span>
                  ${ev.isentaParcela !== false ? `<span class="status-badge" style="background:#fef9c3;color:#854d0e;border:1px solid #eab308;margin-left:4px;">🎁 Isenta 1 Parcela (R$ 35)</span>` : ''}
                  <br>
                  <small><strong>${escapeHtml(ev.categoria)}</strong> • 📅 ${formatDateBR(ev.dataEvento)} às ${escapeHtml(ev.horario || '08:00')} • 📍 ${escapeHtml(ev.local)}</small><br>
                  <small style="color:#047857; font-weight:700;">👥 Participantes inscritos na lista: ${qtdInscritos} (Total c/ base: ${(Number(ev.inscritosCount) || 0)})</small>
                </div>
                <div class="action-btns">
                  <button type="button" class="btn-table btn-approve" data-toggle-evento-status="${ev.id}">
                    ${isAberto ? 'Encerrar Inscrições' : 'Reabrir Inscrições'}
                  </button>
                  <button type="button" class="btn-table btn-del" data-del-evento="${ev.id}">🗑️</button>
                </div>
              </div>
            </div>
          `;
        }).join('');

    evListEl.querySelectorAll('[data-toggle-evento-status]').forEach((btn) => {
      btn.addEventListener('click', async () => {
        const id = btn.getAttribute('data-toggle-evento-status');
        const ev = (appState.eventosTga || []).find(x => x.id === id);
        if (!ev) return;
        ev.status = ev.status === 'Encerrado' ? 'Inscrições Abertas' : 'Encerrado';
        const audit = buildAuditPayload('Eventos TGA', `Alterou status do evento "${ev.titulo}" para ${ev.status}`, '');
        try {
          await fetch(`/api/eventos/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: ev.status, _auditoria: audit })
          });
        } catch (e) {}
        saveLocalBackup();
        renderAll();
        showToast(`🤝 Status de "${ev.titulo}" alterado para: ${ev.status}`);
      });
    });

    evListEl.querySelectorAll('[data-del-evento]').forEach((btn) => {
      btn.addEventListener('click', async () => {
        const id = btn.getAttribute('data-del-evento');
        const ev = (appState.eventosTga || []).find(x => x.id === id);
        if (!ev) return;
        if (!window.confirm(`Deseja remover o evento "${ev.titulo}" do painel?`)) return;
        appState.eventosTga = (appState.eventosTga || []).filter(x => x.id !== id);
        const audit = buildAuditPayload('Eventos TGA', `Removeu o evento "${ev.titulo}"`, '');
        try {
          await fetch(`/api/eventos/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ _auditoria: audit })
          });
        } catch (e) {}
        saveLocalBackup();
        renderAll();
        showToast('🗑️ Evento removido do painel.');
      });
    });
  }

  if (partBodyEl) {
    const filtroId = filterSelect?.value || 'todos';
    const lista = todosPart.filter(p => filtroId === 'todos' || p.eventoId === filtroId);

    if (lista.length === 0) {
      partBodyEl.innerHTML = `<tr><td colspan="7" style="text-align:center; padding:22px;">Nenhum participante ou voluntário inscrito para este filtro até o momento.</td></tr>`;
      return;
    }

    partBodyEl.innerHTML = lista.map((p) => {
      const socioMatch = (p.socioId && appState.socios.find(s => s.id === p.socioId)) || findSocioByCpf(p.cpf);
      const isConfirmado = p.statusPresenca === 'Presença Confirmada ✔';
      const cleanWa = String(p.whatsapp || '').replace(/\D/g, '');
      const waLink = `https://api.whatsapp.com/send?phone=55${cleanWa.replace(/^55/, '')}&text=${encodeURIComponent(`\uD83D\uDFE2\u26AA Salve ${p.nome}! Aqui é da Diretoria da Garra Alviverde sobre sua participação na ação social "${p.eventoTitulo}".`)}`;

      let beneficioBadge = `<small style="color:#64748b;">Voluntário (Não-Sócio)</small>`;
      if (p.parcelaIsentaConcedida) {
        beneficioBadge = `<span class="status-badge" style="background:#fef9c3; color:#854d0e; border:1px solid #eab308; font-weight:800;">👑 1 Parcela Isenta (-R$ 35) ✔</span>`;
      } else if (socioMatch) {
        const qtdIsentasAtual = getSocioParcelasIsentas(socioMatch);
        beneficioBadge = `<span class="status-badge status-pending">Sócio Elegível (Atual: ${qtdIsentasAtual}/3 isentas)</span>`;
      }

      return `
        <tr>
          <td>
            <strong>${escapeHtml(p.eventoTitulo)}</strong><br>
            <small>${escapeHtml(p.eventoCategoria || 'Ações Sociais')} • ${formatDateBR(p.createdAt)}</small>
          </td>
          <td>
            <strong>${escapeHtml(p.nome)}</strong><br>
            <small>${socioMatch ? `<span style="color:#047857;font-weight:800;">🪪 Sócio (${escapeHtml(socioMatch.matricula || 'TGA')})</span>` : 'Voluntário (Não-Sócio)'}</small>
          </td>
          <td>
            <strong>${escapeHtml(p.cpf || '—')}</strong><br>
            <small>🩸 Sangue: <strong>${escapeHtml(p.tipoSanguineo || (socioMatch && socioMatch.tipoSanguineo) || '—')}</strong></small>
          </td>
          <td>${escapeHtml(p.whatsapp)}</td>
          <td><small style="font-weight:700; color:#1e293b;">${escapeHtml(p.modalidade || p.observacoes || 'Participante TGA')}</small></td>
          <td>
            <span class="status-badge ${isConfirmado ? 'status-paid' : 'status-pending'}">
              ${escapeHtml(p.statusPresenca || 'Inscrito — Aguardando Confirmação')}
            </span>
            <div style="margin-top:4px;">${beneficioBadge}</div>
          </td>
          <td>
            <div class="action-btns">
              ${(isMaster && socioMatch && !p.parcelaIsentaConcedida) ? `
                <button type="button" class="btn-table" style="background:#fef9c3;color:#854d0e;border-color:#eab308;font-weight:800;" data-isentar-evento-part="${p.id}" title="Exclusivo Master: Confirmar presença no evento e abater 1 parcela (R$ 35,00) do Sócio">
                  👑 Confirmar + Isentar 1 Parcela (R$ 35)
                </button>
              ` : ''}
              <button type="button" class="btn-table btn-approve" data-toggle-evento-part="${p.id}">
                ${isConfirmado ? 'Voltar Inscrito' : '✔ Confirmar Presença'}
              </button>
              <a href="${waLink}" target="_blank" rel="noopener" class="btn-table btn-wa">💬 WhatsApp</a>
              <button type="button" class="btn-table btn-del" data-del-evento-part="${p.id}">🗑️</button>
            </div>
          </td>
        </tr>
      `;
    }).join('');

    // Botão Master: Confirmar presença + Isentar 1 Parcela (R$ 35,00) automaticamente na ficha do sócio
    partBodyEl.querySelectorAll('[data-isentar-evento-part]').forEach((btn) => {
      btn.addEventListener('click', async () => {
        if (!currentAdminUser || !currentAdminUser.isMaster) {
          showToast('🚫 Apenas o Usuário Master pode conceder isenção de parcela.');
          return;
        }
        const partId = btn.getAttribute('data-isentar-evento-part');
        const part = (appState.participantesEventos || []).find(x => x.id === partId);
        if (!part) return;

        const socio = (part.socioId && appState.socios.find(s => s.id === part.socioId)) || findSocioByCpf(part.cpf);
        if (!socio) {
          showToast('⚠️ CPF deste participante não foi localizado na lista de Sócios TGA.');
          return;
        }

        const qtdAtual = getSocioParcelasIsentas(socio);
        const novaQtd = Math.min(3, qtdAtual + 1);
        const novoValorIsento = novaQtd * 35;
        const motivo = `${part.eventoCategoria || 'Ação Social'}: ${part.eventoTitulo || 'Evento TGA'}`;
        const pagasPix = getSocioParcelasPagasPix(socio);
        const totalCoberto = Math.min(3, pagasPix + novaQtd);

        let novoStatus = socio.statusPagamento;
        let novaForma = socio.formaPagamento;
        const isTotalIsento = novaQtd >= 3;

        if (isTotalIsento) {
          novoStatus = 'Isento (Diretoria)';
          novaForma = 'Isento — Diretoria TGA (R$ 0,00)';
        } else if (totalCoberto >= 3) {
          novoStatus = 'Pago / Ativo';
          novaForma = `Parcelado 3x (${pagasPix} Paga(s) PIX + ${novaQtd} Isenta(s) Ação Social)`;
        } else if (totalCoberto === 2) {
          novoStatus = `2ª Parcela Paga (R$ 70)`;
          novaForma = `Parcelado 3x (${pagasPix} PIX + ${novaQtd} Isenta = R$ ${novoValorIsento} abatido)`;
        } else if (totalCoberto === 1) {
          novoStatus = `1ª Parcela Paga (R$ 35)`;
          novaForma = `Parcelado 3x (1 Parcela Isenta - ${part.eventoCategoria || 'Ação Social'})`;
        }

        const dirNome = currentAdminUser.nome || 'Jully Gabriel (Master)';
        const dirUsuario = currentAdminUser.usuario || 'jully';

        const updatesSocio = {
          isento: isTotalIsento,
          parcelasIsentas: novaQtd,
          valorIsento: novoValorIsento,
          motivoIsencao: motivo,
          valorPlano: isTotalIsento ? 0 : 105,
          statusPagamento: novoStatus,
          formaPagamento: novaForma,
          aprovadoPor: {
            nome: dirNome,
            usuario: dirUsuario,
            dataHora: new Date().toISOString(),
            status: `Isenção ${novaQtd}/3 (${formatBRL(novoValorIsento)}) — ${motivo}`
          }
        };

        Object.assign(socio, updatesSocio);
        part.statusPresenca = 'Presença Confirmada ✔';
        part.parcelaIsentaConcedida = true;

        const audit = buildAuditPayload(
          'Isenção Sócio',
          `Confirmou presença no evento "${part.eventoTitulo}" e isentou +1 parcela (${formatBRL(35)}) do sócio ${socio.nome}`,
          `Total Isento do Sócio: ${novaQtd}/3 parcelas (${formatBRL(novoValorIsento)}) | Motivo: ${motivo}`
        );

        try {
          await fetch(`/api/socios/${socio.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...updatesSocio, _auditoria: audit })
          });
          await fetch(`/api/participantes-eventos/${part.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ statusPresenca: part.statusPresenca, parcelaIsentaConcedida: true })
          });
        } catch (e) {}

        saveLocalBackup();
        renderAll();
        showToast(`👑 Presença confirmada e +1 parcela (R$ 35,00) isentada para ${socio.nome}!`);
      });
    });

    partBodyEl.querySelectorAll('[data-toggle-evento-part]').forEach((btn) => {
      btn.addEventListener('click', async () => {
        const id = btn.getAttribute('data-toggle-evento-part');
        const part = (appState.participantesEventos || []).find(x => x.id === id);
        if (!part) return;
        part.statusPresenca = part.statusPresenca === 'Presença Confirmada ✔'
          ? 'Inscrito — Aguardando Confirmação'
          : 'Presença Confirmada ✔';
        try {
          await fetch(`/api/participantes-eventos/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ statusPresenca: part.statusPresenca })
          });
        } catch (e) {}
        saveLocalBackup();
        renderAll();
        showToast(`✅ Status de ${part.nome}: ${part.statusPresenca}`);
      });
    });

    partBodyEl.querySelectorAll('[data-del-evento-part]').forEach((btn) => {
      btn.addEventListener('click', async () => {
        const id = btn.getAttribute('data-del-evento-part');
        const part = (appState.participantesEventos || []).find(x => x.id === id);
        if (!part) return;
        if (!window.confirm(`Deseja remover a inscrição de "${part.nome}" deste evento?`)) return;
        appState.participantesEventos = (appState.participantesEventos || []).filter(x => x.id !== id);
        try {
          await fetch(`/api/participantes-eventos/${id}`, { method: 'DELETE' });
        } catch (e) {}
        saveLocalBackup();
        renderAll();
        showToast('🗑️ Participante removido da lista.');
      });
    });
  }
}

// ============================================================================
// ADMINISTRAÇÃO DA LOJA DE MATERIAIS E DA TABELA DE JOGOS / PORTARIA VELOSÃO
// ============================================================================
function renderAdminLojaTab() {
  const matListEl = document.getElementById('adminMateriaisList');
  const pedBodyEl = document.getElementById('adminPedidosMateriaisBody');

  if (matListEl) {
    const mats = Array.isArray(appState.materiais) ? appState.materiais : [];
    matListEl.innerHTML = mats.length === 0
      ? `<p style="padding:12px;">Nenhum material cadastrado na vitrine.</p>`
      : mats.map((m) => `
          <div class="manage-item">
            <div style="display:flex; gap:10px; align-items:center;">
              <img src="${m.fotoDataUrl || '/assets/logo-tga.jpg'}" alt="" style="width:46px; height:46px; border-radius:8px; object-fit:cover; border:1px solid #006437;" />
              <div>
                <strong>${escapeHtml(m.nome)}</strong>
                <span class="status-badge ${m.estoqueStatus === 'Esgotado' ? 'status-pending' : 'status-paid'}" style="margin-left:6px;">
                  ${escapeHtml(m.estoqueStatus || 'Disponível')}
                </span><br>
                <small>Sócio: <strong>${formatBRL(m.valorSocio)}</strong> | Não-Sócio: <strong>${formatBRL(m.valorNaoSocio)}</strong> • Tam: ${escapeHtml(m.tamanhos)}</small>
              </div>
            </div>
            <div class="action-btns">
              <button type="button" class="btn-table btn-approve" data-toggle-mat-status="${m.id}">
                ${m.estoqueStatus === 'Esgotado' ? 'Liberar Estoque' : 'Marcar Esgotado'}
              </button>
              <button type="button" class="btn-table btn-del" data-del-mat="${m.id}">🗑️</button>
            </div>
          </div>
        `).join('');

    matListEl.querySelectorAll('[data-toggle-mat-status]').forEach((btn) => {
      btn.addEventListener('click', async () => {
        const id = btn.getAttribute('data-toggle-mat-status');
        const mat = (appState.materiais || []).find(x => x.id === id);
        if (!mat) return;
        mat.estoqueStatus = mat.estoqueStatus === 'Esgotado' ? 'Disponível' : 'Esgotado';
        const audit = buildAuditPayload('Configurações', `Alterou estoque do material "${mat.nome}" para ${mat.estoqueStatus}`, '');
        try {
          await fetch(`/api/materiais/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ estoqueStatus: mat.estoqueStatus, _auditoria: audit })
          });
        } catch (e) {}
        saveLocalBackup();
        renderAll();
        showToast(`🏷️ Status de "${mat.nome}" atualizado para ${mat.estoqueStatus}!`);
      });
    });

    matListEl.querySelectorAll('[data-del-mat]').forEach((btn) => {
      btn.addEventListener('click', async () => {
        const id = btn.getAttribute('data-del-mat');
        const mat = (appState.materiais || []).find(x => x.id === id);
        if (!mat) return;
        if (!window.confirm(`Deseja remover o material "${mat.nome}" da vitrine da loja?`)) return;
        appState.materiais = (appState.materiais || []).filter(x => x.id !== id);
        const audit = buildAuditPayload('Configurações', `Removeu o material "${mat.nome}" da loja`, '');
        try {
          await fetch(`/api/materiais/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ _auditoria: audit })
          });
        } catch (e) {}
        saveLocalBackup();
        renderAll();
        showToast('🗑️ Material removido da vitrine.');
      });
    });
  }

  if (pedBodyEl) {
    const peds = Array.isArray(appState.pedidosMateriais) ? appState.pedidosMateriais : [];
    if (peds.length === 0) {
      pedBodyEl.innerHTML = `<tr><td colspan="7" style="text-align:center; padding:22px;">Nenhuma encomenda ou pedido de material registrado ainda.</td></tr>`;
      return;
    }

    pedBodyEl.innerHTML = peds.map((p) => {
      const isPago = p.statusPix === 'PIX Confirmado' || p.statusPix === 'Entregue ✔';
      const cleanWa = String(p.whatsapp || '').replace(/\D/g, '');
      const waLink = `https://api.whatsapp.com/send?phone=55${cleanWa.replace(/^55/, '')}&text=${encodeURIComponent(`\uD83D\uDFE2\u26AA Salve ${p.compradorNome}! Aqui é da Diretoria da Garra Alviverde sobre o seu pedido de ${p.quantidade}x ${p.materialNome} (Tam: ${p.tamanho}).`)}`;

      return `
        <tr>
          <td><small>${formatDateBR(p.createdAt)}</small></td>
          <td>
            <strong>👕 ${escapeHtml(p.materialNome)}</strong><br>
            <small>Tam: <strong>${escapeHtml(p.tamanho)}</strong> • Qtd: <strong>${p.quantidade || 1}</strong></small>
          </td>
          <td>
            <strong>${escapeHtml(p.compradorNome)}</strong><br>
            <small>CPF: ${escapeHtml(p.cpf)}</small>
          </td>
          <td>${escapeHtml(p.whatsapp)}</td>
          <td>
            <span class="status-badge" style="background:${p.isSocioDesconto ? '#dcfce7' : '#f1f5f9'}; color:${p.isSocioDesconto ? '#166534' : '#334155'};">
              ${p.isSocioDesconto ? '🟢 Preço Sócio TGA' : '⚪ Não-Sócio'}
            </span><br>
            <strong>${formatBRL(p.valorTotal)}</strong>
          </td>
          <td>
            <span class="status-badge ${isPago ? 'status-paid' : 'status-pending'}">
              ${escapeHtml(p.statusPix || 'Pendente PIX')}
            </span>
          </td>
          <td>
            <div class="action-btns">
              <button type="button" class="btn-table btn-approve" data-toggle-ped-pix="${p.id}">
                ${p.statusPix === 'Pendente PIX' ? '✔ Confirmar PIX' : (p.statusPix === 'PIX Confirmado' ? '📦 Marcar Entregue' : 'Voltar Pendente')}
              </button>
              <a href="${waLink}" target="_blank" rel="noopener" class="btn-table btn-wa">💬 WhatsApp</a>
              <button type="button" class="btn-table btn-del" data-del-ped="${p.id}">🗑️</button>
            </div>
          </td>
        </tr>
      `;
    }).join('');

    pedBodyEl.querySelectorAll('[data-toggle-ped-pix]').forEach((btn) => {
      btn.addEventListener('click', async () => {
        const id = btn.getAttribute('data-toggle-ped-pix');
        const ped = (appState.pedidosMateriais || []).find(x => x.id === id);
        if (!ped) return;
        if (ped.statusPix === 'Pendente PIX') ped.statusPix = 'PIX Confirmado';
        else if (ped.statusPix === 'PIX Confirmado') ped.statusPix = 'Entregue ✔';
        else ped.statusPix = 'Pendente PIX';

        const audit = buildAuditPayload('Configurações', `Atualizou pedido de material de ${ped.compradorNome} para "${ped.statusPix}"`, `${ped.materialNome} (${formatBRL(ped.valorTotal)})`);
        try {
          await fetch(`/api/pedidos-materiais/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ statusPix: ped.statusPix, _auditoria: audit })
          });
        } catch (e) {}
        saveLocalBackup();
        renderAll();
        showToast(`✅ Pedido de ${ped.compradorNome} atualizado para: ${ped.statusPix}!`);
      });
    });

    pedBodyEl.querySelectorAll('[data-del-ped]').forEach((btn) => {
      btn.addEventListener('click', async () => {
        const id = btn.getAttribute('data-del-ped');
        const ped = (appState.pedidosMateriais || []).find(x => x.id === id);
        if (!ped) return;
        if (!window.confirm(`Deseja excluir o pedido de "${ped.compradorNome}"?`)) return;
        appState.pedidosMateriais = (appState.pedidosMateriais || []).filter(x => x.id !== id);
        try {
          await fetch(`/api/pedidos-materiais/${id}`, { method: 'DELETE' });
        } catch (e) {}
        saveLocalBackup();
        renderAll();
        showToast('🗑️ Pedido removido.');
      });
    });
  }
}

function renderAdminJogosTab() {
  const jogosListEl = document.getElementById('adminJogosList');
  const filterSelect = document.getElementById('filterCheckinJogoSelect');
  const chkBodyEl = document.getElementById('adminCheckinsJogosBody');

  const jogos = Array.isArray(appState.jogosEcrv) ? appState.jogosEcrv : [];

  if (filterSelect) {
    const cur = filterSelect.value;
    filterSelect.innerHTML = `<option value="todos">Todos os Jogos em Casa (${(appState.checkinsJogos || []).length})</option>` +
      jogos.map(j => `<option value="${j.id}">${escapeHtml(j.adversario)} (${formatDateBR(j.dataJogo)})</option>`).join('');
    if (cur && Array.from(filterSelect.options).some(o => o.value === cur)) {
      filterSelect.value = cur;
    }
  }

  if (jogosListEl) {
    jogosListEl.innerHTML = jogos.length === 0
      ? `<p style="padding:12px;">Nenhum jogo cadastrado.</p>`
      : jogos.map((j) => `
          <div class="manage-item" style="flex-direction:column; align-items:stretch; gap:8px;">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:8px; flex-wrap:wrap;">
              <div>
                <strong>⚽ ${escapeHtml(j.adversario)}</strong>
                <span class="status-badge ${j.status === 'Encerrado' ? 'status-pending' : 'status-paid'}" style="margin-left:6px;">
                  ${escapeHtml(j.status)}
                </span><br>
                <small>${escapeHtml(j.campeonato)} (${escapeHtml(j.rodada)}) • ${formatDateBR(j.dataJogo)} às ${escapeHtml(j.horario)} • ${escapeHtml(j.mando)}</small>
                ${j.placar ? `<div style="font-size:0.82rem; font-weight:800; color:#047857; margin-top:2px;">Placar: ${escapeHtml(j.placar)}</div>` : ''}
              </div>
              <div class="action-btns">
                <button type="button" class="btn-table" style="background:#e0f2fe;color:#0369a1;border-color:#7dd3fc;" data-set-placar-jogo="${j.id}">
                  ⚽ Informar Placar
                </button>
                <button type="button" class="btn-table btn-approve" data-toggle-status-jogo="${j.id}">
                  ${j.status === 'Encerrado' ? 'Reabrir Check-in' : 'Encerrar Jogo'}
                </button>
                <button type="button" class="btn-table btn-del" data-del-jogo="${j.id}">🗑️</button>
              </div>
            </div>
          </div>
        `).join('');

    jogosListEl.querySelectorAll('[data-set-placar-jogo]').forEach((btn) => {
      btn.addEventListener('click', async () => {
        const id = btn.getAttribute('data-set-placar-jogo');
        const jogo = (appState.jogosEcrv || []).find(x => x.id === id);
        if (!jogo) return;
        const placar = window.prompt(`Digite o placar final para "${jogo.adversario}":\n(Ex: E.C.R.V. 2 x 0 Adversário)`, jogo.placar || '');
        if (placar === null) return;
        jogo.placar = placar.trim();
        if (jogo.placar) jogo.status = 'Encerrado';
        try {
          await fetch(`/api/jogos/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ placar: jogo.placar, status: jogo.status })
          });
        } catch (e) {}
        saveLocalBackup();
        renderAll();
        showToast('⚽ Placar atualizado na tabela!');
      });
    });

    jogosListEl.querySelectorAll('[data-toggle-status-jogo]').forEach((btn) => {
      btn.addEventListener('click', async () => {
        const id = btn.getAttribute('data-toggle-status-jogo');
        const jogo = (appState.jogosEcrv || []).find(x => x.id === id);
        if (!jogo) return;
        jogo.status = jogo.status === 'Encerrado' ? 'Check-in de Ingresso Aberto' : 'Encerrado';
        try {
          await fetch(`/api/jogos/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: jogo.status })
          });
        } catch (e) {}
        saveLocalBackup();
        renderAll();
        showToast(`📅 Status do jogo alterado para: ${jogo.status}`);
      });
    });

    jogosListEl.querySelectorAll('[data-del-jogo]').forEach((btn) => {
      btn.addEventListener('click', async () => {
        const id = btn.getAttribute('data-del-jogo');
        const jogo = (appState.jogosEcrv || []).find(x => x.id === id);
        if (!jogo) return;
        if (!window.confirm(`Deseja remover o jogo "${jogo.adversario}" da tabela?`)) return;
        appState.jogosEcrv = (appState.jogosEcrv || []).filter(x => x.id !== id);
        try {
          await fetch(`/api/jogos/${id}`, { method: 'DELETE' });
        } catch (e) {}
        saveLocalBackup();
        renderAll();
        showToast('🗑️ Jogo removido da tabela.');
      });
    });
  }

  if (chkBodyEl) {
    const filtroId = filterSelect?.value || 'todos';
    const checkins = (appState.checkinsJogos || []).filter(c => filtroId === 'todos' || c.jogoId === filtroId);
    if (checkins.length === 0) {
      chkBodyEl.innerHTML = `<tr><td colspan="8" style="text-align:center; padding:22px;">Nenhum sócio realizou check-in de ingresso para este filtro até o momento.</td></tr>`;
      return;
    }

    chkBodyEl.innerHTML = checkins.map((c) => `
      <tr>
        <td><strong>${escapeHtml(c.jogoTitulo)}</strong></td>
        <td><strong>👕 Nº ${escapeHtml(c.socioNumeroCamisa || '—')}</strong></td>
        <td><strong>${escapeHtml(c.socioNome)}</strong></td>
        <td>${escapeHtml(c.socioCpf)}</td>
        <td>${escapeHtml(c.socioWhatsapp || '—')}</td>
        <td><span class="status-badge status-paid">${escapeHtml(c.socioStatusPagamento)}</span></td>
        <td><span class="status-badge status-paid">🎟️ ${escapeHtml(c.statusPortaria || 'Ingresso Garantido ✔')}</span></td>
        <td>
          <button type="button" class="btn-table btn-del" data-del-checkin="${c.id}">🗑️</button>
        </td>
      </tr>
    `).join('');

    chkBodyEl.querySelectorAll('[data-del-checkin]').forEach((btn) => {
      btn.addEventListener('click', async () => {
        const id = btn.getAttribute('data-del-checkin');
        appState.checkinsJogos = (appState.checkinsJogos || []).filter(x => x.id !== id);
        try {
          await fetch(`/api/checkins-jogos/${id}`, { method: 'DELETE' });
        } catch (e) {}
        saveLocalBackup();
        renderAll();
        showToast('🗑️ Check-in removido.');
      });
    });
  }
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
  if (s.includes('Isento')) {
    return 'background-color:#fef9c3; color:#854d0e; font-weight:bold; text-align:center;';
  }
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
  const isentosTotal = appState.socios.filter(s => isSocioIsento(s)).length;
  const isentosParcial = appState.socios.filter(s => getSocioParcelasIsentas(s) > 0 && !isSocioIsento(s)).length;
  const quitados = appState.socios.filter(s => s.statusPagamento === 'Pago / Ativo' && !isSocioIsento(s)).length;
  const emParcelamento = appState.socios.filter(s => String(s.statusPagamento || '').includes('Parcela')).length;
  const recebido = appState.socios.reduce((acc, s) => acc + getSocioValorPagoEfetivo(s), 0);
  const totalIsentoValor = appState.socios.reduce((acc, s) => acc + getSocioValorIsento(s), 0);
  const previstoLiquido = appState.socios.reduce((acc, s) => acc + getSocioValorLiquidoPrevisto(s), 0);

  const headers = [
    'Nº Camiseta', 'Matrícula', 'Nome Completo do Sócio', 'Apelido', 'CPF', 'RG', 'Nascimento',
    'WhatsApp', 'Setor / Bairro', 'Cidade / UF', 'Tam. Camisa', 'Sangue',
    'Modalidade de Pagamento', 'Parcelas Isentas', 'Valor Isento (R$)', 'Motivo da Isenção',
    'Valor Líquido Previsto', 'Valor Pago no PIX', 'Falta Pagar PIX', 'Status PIX / Parcelas', 'Boletos Enviados',
    'PIX / Isenção Por', 'Última Edição Por', 'Observações', 'Data Inscrição'
  ];

  const rows = appState.socios.map((s) => {
    const isento = isSocioIsento(s);
    const qtdIsentas = getSocioParcelasIsentas(s);
    const valIsento = getSocioValorIsento(s);
    return [
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
      isento ? 'Isento — Diretoria TGA (R$ 0,00)' : (s.formaPagamento || 'À Vista no PIX (R$ 105,00)'),
      qtdIsentas > 0 ? `${qtdIsentas}/3 Parcela(s)` : '0/3',
      formatBRL(valIsento),
      s.motivoIsencao || (isento ? 'Diretoria TGA (3/3)' : '—'),
      formatBRL(getSocioValorLiquidoPrevisto(s)),
      formatBRL(getSocioValorPagoEfetivo(s)),
      formatBRL(getSocioFaltaPagarPix(s)),
      isento ? 'Isento (Diretoria)' : (s.statusPagamento || 'Pendente PIX'),
      isento ? 'Isento' : (s.boletosEnviados ? 'Sim' : 'Não'),
      s.aprovadoPor ? `${s.aprovadoPor.nome} (${formatDateTimeBR(s.aprovadoPor.dataHora)})` : '—',
      s.ultimaEdicao ? `${s.ultimaEdicao.nome} (${formatDateTimeBR(s.ultimaEdicao.dataHora)})` : '—',
      s.observacoes || '—',
      formatDateBR(s.createdAt)
    ];
  });

  return {
    filename: `Relacao_Oficial_Socios_TGA_${new Date().toISOString().slice(0, 10)}.xls`,
    sheetName: 'Socios Garra Alviverde',
    reportTitle: 'RELAÇÃO OFICIAL DE MEMBROS, ISENÇÕES E CONTROLE FINANCEIRO — SÓCIO GARRA ALVIVERDE',
    subtitle: 'Investimento: R$ 105,00 à vista ou em até 3x de R$ 35,00 • Torcida Organizada Garra Alviverde (TGA)',
    summaryItems: [
      `Total de Sócios: ${totalSocios}`,
      `Quitados PIX: ${quitados}`,
      `Isentos Diretoria (3/3): ${isentosTotal}`,
      `Isentos Parciais (Ações Sociais): ${isentosParcial}`,
      `Em Parcelamento: ${emParcelamento}`,
      `Saldo Isento: ${formatBRL(totalIsentoValor)}`,
      `Arrecadado PIX: ${formatBRL(recebido)} de ${formatBRL(previstoLiquido)} (Líquido)`
    ],
    headers,
    rows,
    textCols: [0, 1, 4, 5, 6, 7, 10, 11, 13, 24]
  };
}

function buildIsentosReportConfig() {
  const listaIsentos = appState.socios.filter(s => hasSocioAnyIsencao(s));
  const totalBruto = appState.socios.length * 105;
  const totalValorIsento = listaIsentos.reduce((acc, s) => acc + getSocioValorIsento(s), 0);
  const totalParcelasIsentas = listaIsentos.reduce((acc, s) => acc + getSocioParcelasIsentas(s), 0);
  const previstoLiquido = Math.max(0, totalBruto - totalValorIsento);

  const headers = [
    'Nº Camiseta', 'Matrícula', 'Nome Completo do Sócio', 'CPF', 'WhatsApp',
    'Tipo de Isenção', 'Motivo / Ação Social TGA', 'Parcelas Isentas',
    'Valor Abatido / Isento', 'Valor Pago no PIX', 'Saldo a Pagar no PIX', 'Autorizado pelo Master'
  ];

  const rows = listaIsentos.map((s) => {
    const qtd = getSocioParcelasIsentas(s);
    const valIsento = getSocioValorIsento(s);
    const valPago = getSocioValorPagoEfetivo(s);
    const falta = getSocioFaltaPagarPix(s);
    const isTotal = qtd >= 3 || isSocioIsento(s);
    return [
      s.numeroCamisa ? `Nº ${s.numeroCamisa}` : '—',
      s.matricula || '—',
      s.nome || '—',
      s.cpf || '—',
      s.whatsapp || '—',
      isTotal ? 'Isenção Total (Diretoria 3/3)' : `Isenção Parcial (${qtd}/3 Parcela${qtd > 1 ? 's' : ''})`,
      s.motivoIsencao || (isTotal ? 'Diretoria TGA — Isenção Total' : 'Doação de Sangue / Ação Social TGA'),
      `${qtd}/3 Parcela(s)`,
      `- ${formatBRL(valIsento)}`,
      formatBRL(valPago),
      falta === 0 ? 'R$ 0,00 (Quitado)' : formatBRL(falta),
      s.aprovadoPor ? `${s.aprovadoPor.nome} (${formatDateTimeBR(s.aprovadoPor.dataHora)})` : 'Jully Gabriel (Master)'
    ];
  });

  return {
    filename: `Extrato_Valores_e_Saldos_Isentos_TGA_${new Date().toISOString().slice(0, 10)}.xls`,
    sheetName: 'Saldos Isentos TGA',
    reportTitle: 'EXTRATO OFICIAL DE VALORES E SALDOS ISENTOS — DIRETORIA & AÇÕES SOCIAIS TGA',
    subtitle: 'Detalhamento de Isenções Totais (Diretoria 3/3) e Isenções por Parcela (Doação de Sangue e Ações Sociais)',
    summaryItems: [
      `Membros com Isenção: ${listaIsentos.length}`,
      `Total de Parcelas Isentas: ${totalParcelasIsentas}`,
      `Receita Bruta (s/ Isenção): ${formatBRL(totalBruto)}`,
      `Saldo Total Isento: - ${formatBRL(totalValorIsento)}`,
      `Previsto Líquido Real (PIX): ${formatBRL(previstoLiquido)}`
    ],
    headers,
    rows,
    textCols: [0, 1, 3, 4, 7]
  };
}

function buildEventosReportConfig() {
  const filtroId = document.getElementById('filterEventoParticipantesSelect')?.value || 'todos';
  const todos = Array.isArray(appState.participantesEventos) ? appState.participantesEventos : [];
  const lista = todos.filter(p => filtroId === 'todos' || p.eventoId === filtroId);
  const confirmados = lista.filter(p => p.statusPresenca === 'Presença Confirmada ✔').length;
  const isencoesConcedidas = lista.filter(p => p.parcelaIsentaConcedida).length;

  const headers = [
    'Nº', 'Evento / Ação Social TGA', 'Categoria', 'Nome do Participante',
    'CPF', 'Sangue', 'WhatsApp', 'Vínculo Sócio TGA',
    'Status de Presença', 'Isenção de Parcela (R$ 35)', 'Data Inscrição'
  ];

  const rows = lista.map((p, idx) => {
    const socioMatch = (p.socioId && appState.socios.find(s => s.id === p.socioId)) || findSocioByCpf(p.cpf);
    return [
      String(idx + 1).padStart(2, '0'),
      p.eventoTitulo || 'Ação Social TGA',
      p.eventoCategoria || 'Ações Sociais',
      p.nome || '—',
      p.cpf || '—',
      p.tipoSanguineo || (socioMatch && socioMatch.tipoSanguineo) || '—',
      p.whatsapp || '—',
      socioMatch ? `Sócio TGA (${socioMatch.matricula || 'Ativo'})` : 'Voluntário (Não-Sócio)',
      p.statusPresenca || 'Inscrito — Aguardando Confirmação',
      p.parcelaIsentaConcedida ? 'Sim — 1 Parcela Isenta (-R$ 35,00)' : (socioMatch ? 'Elegível após confirmação' : 'Não aplicável'),
      formatDateTimeBR(p.createdAt)
    ];
  });

  return {
    filename: `Lista_Participantes_Eventos_Sociais_TGA_${new Date().toISOString().slice(0, 10)}.xls`,
    sheetName: 'Eventos Sociais TGA',
    reportTitle: 'RELAÇÃO OFICIAL DE PARTICIPANTES E VOLUNTÁRIOS — EVENTOS E AÇÕES SOCIAIS TGA',
    subtitle: 'Doação de Sangue, Eventos da Páscoa, Dia das Crianças, Natal Solidário e Ações Sociais • Garra Alviverde',
    summaryItems: [
      `Total de Inscritos: ${lista.length}`,
      `Presenças Confirmadas: ${confirmados}`,
      `Isenções de Parcela Concedidas: ${isencoesConcedidas} (${formatBRL(isencoesConcedidas * 35)})`
    ],
    headers,
    rows,
    textCols: [0, 4, 5, 6, 10]
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

function buildPedidosLojaReportConfig() {
  const pedidos = Array.isArray(appState.pedidosMateriais) ? appState.pedidosMateriais : [];
  const pagos = pedidos.filter(p => p.statusPix === 'PIX Confirmado' || p.statusPix === 'Entregue ✔').length;
  const entregues = pedidos.filter(p => p.entregue || p.statusPix === 'Entregue ✔').length;
  const recebido = pedidos.reduce((acc, p) => acc + ((p.statusPix === 'PIX Confirmado' || p.statusPix === 'Entregue ✔') ? (Number(p.valorTotal) || 0) : 0), 0);

  const headers = [
    'Nº', 'Data do Pedido', 'Material Oficial TGA', 'Tamanho', 'Qtd',
    'Nome do Comprador', 'CPF', 'WhatsApp', 'Modalidade / Desconto',
    'Valor Total', 'Status PIX / Entrega'
  ];

  const rows = pedidos.map((p, idx) => [
    String(idx + 1).padStart(2, '0'),
    formatDateTimeBR(p.createdAt),
    p.materialNome || 'Material TGA',
    p.tamanho || 'Único',
    String(p.quantidade || 1),
    p.compradorNome || p.nome || '—',
    p.cpf || '—',
    p.whatsapp || '—',
    p.isSocioDesconto ? `Sócio TGA (${p.socioMatricula || 'Ativo'})` : 'Não-Sócio (Valor Normal)',
    formatBRL(Number(p.valorTotal) || 0),
    p.statusPix || 'Pendente PIX'
  ]);

  return {
    filename: `Relatorio_Pedidos_Loja_Materiais_TGA_${new Date().toISOString().slice(0, 10)}.xls`,
    sheetName: 'Pedidos Loja TGA',
    reportTitle: 'RELAÇÃO OFICIAL DE PEDIDOS E ENTREGAS — LOJA DE MATERIAIS GARRA ALVIVERDE',
    subtitle: 'Controle de Vendas de Camisas, Bonés, Faixas e Descontos Exclusivos de Sócio TGA',
    summaryItems: [
      `Total de Pedidos: ${pedidos.length}`,
      `PIX Confirmados: ${pagos}`,
      `Materiais Entregues: ${entregues}`,
      `Total Confirmado: ${formatBRL(recebido)}`
    ],
    headers,
    rows,
    textCols: [0, 1, 3, 4, 6, 7]
  };
}

function buildCheckinsPortariaReportConfig() {
  const filtroJogo = document.getElementById('filterCheckinJogoSelect')?.value || 'todos';
  const todosCheckins = Array.isArray(appState.checkinsJogos) ? appState.checkinsJogos : [];
  const lista = todosCheckins.filter(c => filtroJogo === 'todos' || c.jogoId === filtroJogo);

  const headers = [
    'Nº', 'Partida no Estádio Velosão', 'Nº Camisa', 'Nome Completo do Sócio',
    'CPF', 'WhatsApp', 'Status Financeiro Sócio', 'Status Portaria', 'Data/Hora do Check-in'
  ];

  const rows = lista.map((c, idx) => [
    String(idx + 1).padStart(2, '0'),
    c.jogoTitulo || 'Jogo do E.C.R.V. no Velosão',
    (c.socioNumeroCamisa || c.numeroCamisa) ? `Nº ${c.socioNumeroCamisa || c.numeroCamisa}` : '—',
    c.socioNome || '—',
    c.socioCpf || '—',
    c.socioWhatsapp || '—',
    c.socioStatusPagamento || c.statusSocio || 'Sócio Ativo',
    c.statusPortaria || 'Ingresso Garantido ✔',
    formatDateTimeBR(c.createdAt)
  ]);

  return {
    filename: `Lista_Oficial_Portaria_Velosao_TGA_${new Date().toISOString().slice(0, 10)}.xls`,
    sheetName: 'Portaria Velosao TGA',
    reportTitle: 'LISTA OFICIAL DA PORTARIA DO VELOSÃO — CHECK-IN DE SÓCIOS GARRA ALVIVERDE',
    subtitle: 'Relação de Sócios com Ingresso Garantido Confirmados para o Jogo em Casa do E.C.R.V.',
    summaryItems: [
      `Sócios Confirmados na Lista: ${lista.length}`,
      `Filtro de Jogo: ${filtroJogo === 'todos' ? 'Todos os Jogos em Casa' : (lista[0]?.jogoTitulo || 'Jogo Selecionado')}`
    ],
    headers,
    rows,
    textCols: [0, 2, 4, 5, 8]
  };
}

function printCarteirinhaSocio(socio) {
  if (!socio) return;
  const origin = window.location.origin;
  const logoTga = `${origin}/assets/logo-tga.jpg`;
  const logoEcrv = `${origin}/assets/escudo-ecrv.jpg`;
  const valPago = getSocioValorPagoEfetivo(socio);
  const valTotal = Number(socio.valorPlano) || 105;
  const statusLabel = isSocioIsento(socio)
    ? 'DIRETORIA TGA — ISENTO (ATIVO)'
    : (valPago >= valTotal
      ? 'SÓCIO QUITADO TOTAL (ATIVO)'
      : (isSocioEligibleForBenefits(socio) ? 'SÓCIO EM DIA — BENEFÍCIOS LIBERADOS' : 'AGUARDANDO CONFIRMAÇÃO PIX'));

  const win = window.open('', '_blank', 'width=720,height=640');
  if (!win) {
    showToast('⚠️ Permita pop-ups no navegador para imprimir ou salvar sua Carteirinha Digital.');
    return;
  }

  win.document.write(`<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Carteirinha Oficial TGA — ${escapeHtml(socio.nome)}</title>
  <style>
    body { font-family: 'Segoe UI', Arial, sans-serif; background: #f1f5f9; padding: 30px; display: flex; flex-direction: column; align-items: center; }
    .toolbar { margin-bottom: 20px; display: flex; gap: 10px; }
    .btn { background: #006437; color: #fff; border: none; padding: 10px 18px; border-radius: 8px; font-weight: 800; cursor: pointer; }
    .card { width: 520px; background: linear-gradient(135deg, #022c16 0%, #006437 60%, #044e29 100%); color: #fff; border-radius: 18px; border: 3px solid #f5c518; padding: 22px; box-shadow: 0 16px 40px rgba(0,0,0,0.35); }
    .card-top { display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.2); padding-bottom: 12px; margin-bottom: 16px; }
    .card-top img { width: 54px; height: 54px; border-radius: 10px; object-fit: contain; background: #fff; padding: 3px; }
    .card-title { text-align: center; flex: 1; }
    .card-title h2 { margin: 0; font-size: 16px; letter-spacing: 0.8px; color: #f5c518; }
    .card-title p { margin: 3px 0 0; font-size: 11px; opacity: 0.9; }
    .card-body { display: flex; gap: 16px; align-items: center; }
    .photo { width: 96px; height: 120px; border-radius: 10px; border: 2px solid #f5c518; background: rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; overflow: hidden; flex-shrink: 0; }
    .photo img { width: 100%; height: 100%; object-fit: cover; }
    .info { flex: 1; font-size: 13px; line-height: 1.55; }
    .info strong { color: #fde047; }
    .card-footer { margin-top: 16px; padding-top: 10px; border-top: 1px solid rgba(255,255,255,0.2); display: flex; justify-content: space-between; align-items: center; font-size: 11px; font-weight: 800; }
    .badge { background: #16a34a; color: #fff; padding: 4px 10px; border-radius: 999px; border: 1px solid #86efac; }
    @media print { .toolbar { display: none; } body { background: #fff; padding: 0; } }
  </style>
</head>
<body>
  <div class="toolbar">
    <button class="btn" onclick="window.print()">🖨️ Imprimir / Salvar Carteirinha em PDF</button>
    <button class="btn" style="background:#334155;" onclick="window.close()">✖ Fechar</button>
  </div>
  <div class="card">
    <div class="card-top">
      <img src="${logoTga}" alt="Logo TGA">
      <div class="card-title">
        <h2>TORCIDA ORGANIZADA GARRA ALVIVERDE</h2>
        <p>CARTEIRA OFICIAL DE SÓCIO • DESDE 2015 • E.C. RIO VERDE</p>
      </div>
      <img src="${logoEcrv}" alt="Logo ECRV">
    </div>
    <div class="card-body">
      <div class="photo">
        ${socio.fotoDataUrl ? `<img src="${socio.fotoDataUrl}" alt="Foto 3x4">` : `<img src="${logoTga}" alt="TGA">`}
      </div>
      <div class="info">
        <div><strong>NOME:</strong> ${escapeHtml(socio.nome)}</div>
        <div><strong>APELIDO:</strong> ${escapeHtml(socio.apelido || '—')} &nbsp;|&nbsp; <strong>SANGUE:</strong> ${escapeHtml(socio.tipoSanguineo || '—')}</div>
        <div><strong>CPF:</strong> ${escapeHtml(socio.cpf || '—')} &nbsp;|&nbsp; <strong>RG:</strong> ${escapeHtml(socio.rg || '—')}</div>
        <div><strong>SETOR / BAIRRO:</strong> ${escapeHtml(socio.pelotao || '—')} (${escapeHtml(socio.cidade || 'Rio Verde - GO')})</div>
        <div><strong>CAMISA TGA:</strong> Tam. ${escapeHtml(socio.tamanhoCamisa || 'G')} • Nº ${escapeHtml(socio.numeroCamisa || '—')}</div>
      </div>
    </div>
    <div class="card-footer">
      <span>MATRÍCULA: ${escapeHtml(socio.matricula || 'TGA-2025')}</span>
      <span class="badge">${statusLabel}</span>
    </div>
  </div>
</body>
</html>`);
  win.document.close();
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
  ['windowSocio', 'windowCaravanas', 'windowHistoria', 'windowPortalSocio', 'windowLojaMateriais', 'windowJogosEcrv', 'windowEventosTga'].forEach((id) => {
    const backdrop = document.getElementById(id);
    if (backdrop) {
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) backdrop.hidden = true;
      });
    }
  });

  // Botões de Copiar PIX
  ['btnCopyTopPix', 'btnCopyHeroPix', 'btnCopyBannerPix', 'btnCopyCaravanaPix', 'btnCopySocioPix', 'btnCopySuccessPix', 'btnCopySinglePlanPix', 'btnCopyPortalSocioPix', 'btnCopyLojaPix'].forEach((id) => {
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
    const valEl = document.getElementById('editSocValor');
    const valPagoEl = document.getElementById('editSocValorPago');
    const formaEl = document.getElementById('editSocFormaPagamento');
    if (!valPagoEl) return;
    if (st === 'Isento (Diretoria)') {
      if (!currentAdminUser || !currentAdminUser.isMaster) {
        showToast('🚫 Apenas o Usuário Master pode isentar membros de pagar o sócio.');
        e.target.value = 'Pendente PIX';
        return;
      }
      if (valEl) valEl.value = 0;
      valPagoEl.value = 0;
      if (formaEl) formaEl.value = 'Isento — Diretoria TGA (R$ 0,00)';
    } else if (st === 'Pendente PIX') {
      if (valEl && Number(valEl.value) === 0) valEl.value = 105;
      valPagoEl.value = 0;
    } else if (st === '1ª Parcela Paga (R$ 35)') {
      if (valEl && Number(valEl.value) === 0) valEl.value = 105;
      valPagoEl.value = 35;
    } else if (st === '2ª Parcela Paga (R$ 70)') {
      if (valEl && Number(valEl.value) === 0) valEl.value = 105;
      valPagoEl.value = 70;
    } else if (st === 'Pago / Ativo') {
      if (valEl && Number(valEl.value) === 0) valEl.value = 105;
      valPagoEl.value = Number(valEl?.value) || 105;
    }
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
    const isMaster = Boolean(currentAdminUser && currentAdminUser.isMaster);
    const canApprovePix = hasPerm('aprovarPixSocio') && (!isSocioIsento(oldSocio) || isMaster);

    const statusEscolhido = canApprovePix ? document.getElementById('editSocStatus').value : oldSocio.statusPagamento;
    const formaEscolhida = canApprovePix
      ? (document.getElementById('editSocFormaPagamento')?.value || oldSocio.formaPagamento || 'À Vista no PIX (R$ 105,00)')
      : oldSocio.formaPagamento;

    const querIsentar = statusEscolhido === 'Isento (Diretoria)' || String(formaEscolhida).includes('Isento');
    if (querIsentar && !isMaster && !isSocioIsento(oldSocio)) {
      showToast('🚫 Apenas o Usuário Master pode conceder isenção de pagamento.');
      return;
    }

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
      isento: querIsentar,
      formaPagamento: querIsentar ? 'Isento — Diretoria TGA (R$ 0,00)' : formaEscolhida,
      valorPlano: querIsentar ? 0 : (canApprovePix ? (Number(document.getElementById('editSocValor').value) || 105) : oldSocio.valorPlano),
      valorPago: querIsentar ? 0 : (canApprovePix ? (Number(document.getElementById('editSocValorPago')?.value) || 0) : getSocioValorPagoEfetivo(oldSocio)),
      statusPagamento: querIsentar ? 'Isento (Diretoria)' : statusEscolhido,
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
    ['tab-socios', 'tab-eventos', 'tab-loja', 'tab-jogos', 'tab-caravanas-inscritos', 'tab-gerenciar-caravanas', 'tab-diretores', 'tab-auditoria', 'tab-backups', 'tab-config'].forEach((panelId) => {
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
      ['tab-socios', 'tab-eventos', 'tab-loja', 'tab-jogos', 'tab-caravanas-inscritos', 'tab-gerenciar-caravanas', 'tab-diretores', 'tab-auditoria', 'tab-backups', 'tab-config'].forEach((panelId) => {
        const panel = document.getElementById(panelId);
        if (panel) panel.hidden = panelId !== targetId;
      });
      if (targetId === 'tab-backups') {
        loadAndRenderBackups();
      }
      if (targetId === 'tab-eventos') {
        renderAdminEventosTab();
      }
      if (targetId === 'tab-loja') {
        renderAdminLojaTab();
      }
      if (targetId === 'tab-jogos') {
        renderAdminJogosTab();
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

  // ==========================================================================
  // 1. EVENTOS DA ÁREA EXCLUSIVA DO SÓCIO TGA (LOGIN POR CPF)
  // ==========================================================================
  document.getElementById('formLoginSocioCpf')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.getElementById('inputSocioLoginCpf');
    const emptyStateEl = document.getElementById('portalSocioEmptyState');
    const dashEl = document.getElementById('portalSocioDashboard');
    const cpfDigitado = input?.value || '';

    const socio = findSocioByCpf(cpfDigitado);
    if (!socio) {
      currentLoggedSocio = null;
      if (dashEl) dashEl.hidden = true;
      if (emptyStateEl) {
        emptyStateEl.hidden = false;
        emptyStateEl.innerHTML = `
          <div style="font-size:2.4rem; margin-bottom:8px;">⚠️🪪</div>
          <h3 style="margin-bottom:6px; color:#991b1b;">CPF não encontrado na base de Sócios Garra Alviverde!</h3>
          <p style="color:#475569; max-width:540px; margin:0 auto 16px;">
            Verifique se digitou os 11 números corretamente. Ainda não é sócio? Faça sua inscrição agora por <strong>R$ 105,00 à vista</strong> ou em <strong>3x de R$ 35,00</strong> e já libere o benefício dos materiais na hora!
          </p>
          <button type="button" class="btn btn-primary" onclick="openFeatureWindow('windowSocio')">
            🪪 Quero Fazer Minha Inscrição de Sócio Agora
          </button>
        `;
      }
      showToast('❌ CPF não encontrado na lista de Sócios TGA.');
      return;
    }

    currentLoggedSocio = socio;
    renderPortalSocioLogado(socio);
    showToast(`🔓 Bem-vindo à sua Área Exclusiva, ${socio.nome}!`);
  });

  document.getElementById('btnPrintCarteirinhaSocio')?.addEventListener('click', () => {
    if (!currentLoggedSocio) return;
    const socio = appState.socios.find(s => s.id === currentLoggedSocio.id) || currentLoggedSocio;
    if (socio) printCarteirinhaSocio(socio);
  });

  document.getElementById('btnPortalIrLoja')?.addEventListener('click', () => {
    const socio = currentLoggedSocio ? (appState.socios.find(s => s.id === currentLoggedSocio.id) || currentLoggedSocio) : null;
    openFeatureWindow('windowLojaMateriais');
    if (socio) {
      const cpfInput = document.getElementById('pedCpf');
      const nomeInput = document.getElementById('pedNome');
      const waInput = document.getElementById('pedWhatsapp');
      const tamSelect = document.getElementById('pedTamanho');
      if (cpfInput) cpfInput.value = socio.cpf || '';
      if (nomeInput) nomeInput.value = socio.nome || '';
      if (waInput) waInput.value = socio.whatsapp || '';
      if (tamSelect && socio.tamanhoCamisa) tamSelect.value = socio.tamanhoCamisa;
      updatePedidoMaterialPriceDisplay();
    }
  });

  document.getElementById('btnPortalIrJogos')?.addEventListener('click', () => {
    const socio = currentLoggedSocio ? (appState.socios.find(s => s.id === currentLoggedSocio.id) || currentLoggedSocio) : null;
    openFeatureWindow('windowJogosEcrv');
    if (socio) {
      const chkCpf = document.getElementById('chkSocioCpf');
      if (chkCpf) chkCpf.value = socio.cpf || '';
    }
  });

  // ==========================================================================
  // 2. EVENTOS DA LOJA OFICIAL DE MATERIAIS GARRA ALVIVERDE
  // ==========================================================================
  ['pedSelectMaterial', 'pedQuantidade', 'pedCpf'].forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', updatePedidoMaterialPriceDisplay);
      el.addEventListener('change', updatePedidoMaterialPriceDisplay);
    }
  });

  document.getElementById('formPedidoMaterial')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const matId = document.getElementById('pedSelectMaterial')?.value;
    const mat = (appState.materiais || []).find(m => m.id === matId) || (appState.materiais || [])[0];
    if (!mat) {
      showToast('⚠️ Nenhum material disponível selecionado.');
      return;
    }

    const tamanho = document.getElementById('pedTamanho')?.value || 'G';
    const quantidade = Math.max(1, Number(document.getElementById('pedQuantidade')?.value) || 1);
    const nome = document.getElementById('pedNome')?.value.trim() || 'Torcedor';
    const cpf = document.getElementById('pedCpf')?.value.trim() || '';
    const whatsapp = document.getElementById('pedWhatsapp')?.value.trim() || '';

    const socioMatch = cpf ? findSocioByCpf(cpf) : null;
    const isSocioDesconto = Boolean(socioMatch && isSocioEligibleForBenefits(socioMatch));
    const valorUnitario = isSocioDesconto ? (Number(mat.valorSocio) || 0) : (Number(mat.valorNaoSocio) || 0);
    const valorTotal = valorUnitario * quantidade;

    const payload = {
      materialId: mat.id,
      materialNome: mat.nome,
      tamanho,
      quantidade,
      compradorNome: nome,
      nome,
      cpf: cpf || 'Não informado',
      whatsapp,
      isSocioDesconto,
      statusSocioVerificado: isSocioDesconto ? `Sócio TGA (${socioMatch.matricula || 'Ativo'})` : 'Não-Sócio',
      socioMatricula: socioMatch ? socioMatch.matricula : '',
      valorUnitario,
      valorTotal,
      statusPix: 'Pendente PIX'
    };

    try {
      const res = await fetch('/api/pedidos-materiais', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.pedidosMateriais)) {
          appState.pedidosMateriais = data.pedidosMateriais;
        } else if (data.pedido) {
          appState.pedidosMateriais.unshift(data.pedido);
        }
      } else {
        throw new Error('Fallback local');
      }
    } catch (err) {
      appState.pedidosMateriais.unshift({
        id: 'ped-' + Date.now(),
        ...payload,
        createdAt: new Date().toISOString()
      });
    }

    saveLocalBackup();
    renderAll();
    e.target.reset();
    document.getElementById('pedQuantidade').value = '1';
    updatePedidoMaterialPriceDisplay();

    const msgWa = `\uD83D\uDFE2\u26AA *PEDIDO NA LOJA OFICIAL - ${appState.config.nomeTorcida} (TGA)* \uD83D\uDFE2\u26AA\n\n` +
      `\uD83D\uDC55 *Material:* ${payload.materialNome}\n` +
      `\uD83D\uDCCF *Tamanho:* ${payload.tamanho} | *Quantidade:* ${payload.quantidade} un.\n` +
      `\uD83D\uDC64 *Torcedor:* ${payload.compradorNome} (CPF: ${payload.cpf})\n` +
      `\uD83C\uDFF7\uFE0F *Modalidade:* ${payload.isSocioDesconto ? `Sócio TGA c/ Desconto (${payload.socioMatricula})` : 'Não-Sócio (Valor Normal)'}\n` +
      `\uD83D\uDCB0 *Valor Total no PIX:* ${formatBRL(payload.valorTotal)}\n\n` +
      `Segue meu comprovante do PIX (${appState.config.chavePix}) para reservar meu material oficial da Garra Alviverde!`;

    openSuccessModal({
      titulo: '👕 Pedido de Material Oficial Registrado!',
      descricao: `Salve, ${payload.compradorNome}! Seu pedido de ${payload.quantidade}x ${payload.materialNome} (Tam. ${payload.tamanho}) foi registrado no painel da Diretoria.`,
      valor: payload.valorTotal,
      subtextoValor: payload.isSocioDesconto
        ? `Desconto Exclusivo de Sócio TGA Aplicado (${payload.socioMatricula})!`
        : `Valor no PIX: ${formatBRL(payload.valorTotal)}`,
      mensagemWhatsapp: msgWa
    });
  });

  // ==========================================================================
  // 3. EVENTOS DA CENTRAL DE JOGOS DO E.C.R.V. & CHECK-IN NO VELOSÃO
  // ==========================================================================
  document.getElementById('formCheckinJogoSocio')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const jogoId = document.getElementById('chkSelectJogo')?.value;
    const cpfInput = document.getElementById('chkSocioCpf');
    const feedbackBox = document.getElementById('checkinFeedbackBox');
    const cpf = cpfInput?.value.trim() || '';

    const jogo = (appState.jogosEcrv || []).find(j => j.id === jogoId);
    if (!jogo) {
      showToast('⚠️ Selecione um jogo em casa aberto para check-in.');
      return;
    }

    const socio = findSocioByCpf(cpf);
    if (!socio) {
      if (feedbackBox) {
        feedbackBox.hidden = false;
        feedbackBox.style.background = '#fee2e2';
        feedbackBox.style.color = '#991b1b';
        feedbackBox.style.border = '1px solid #f87171';
        feedbackBox.innerHTML = `❌ <strong>CPF não encontrado na base de Sócios Garra Alviverde!</strong> Somente sócios cadastrados têm ingresso garantido nos jogos em casa. Clique em <strong>"🪪 Seja Sócio"</strong> para se associar!`;
      }
      showToast('❌ CPF não localizado na lista de Sócios TGA.');
      return;
    }

    if (!isSocioEligibleForBenefits(socio)) {
      if (feedbackBox) {
        feedbackBox.hidden = false;
        feedbackBox.style.background = '#fef3c7';
        feedbackBox.style.color = '#92400e';
        feedbackBox.style.border = '1px solid #fbbf24';
        feedbackBox.innerHTML = `⏳ <strong>Olá, ${escapeHtml(socio.nome)}!</strong> Sua ficha consta como <strong>"Pendente PIX"</strong>. Pague a 1ª parcela (R$ 35,00) ou à vista e envie o comprovante no WhatsApp da Diretoria para liberar seu Ingresso Garantido na hora!`;
      }
      showToast('⏳ Confirme sua 1ª parcela com a Diretoria para liberar o Check-in.');
      return;
    }

    const payload = {
      jogoId: jogo.id,
      jogoTitulo: `${jogo.adversario} (${formatDateBR(jogo.dataJogo)})`,
      socioId: socio.id,
      socioMatricula: socio.matricula,
      socioNome: socio.nome,
      socioApelido: socio.apelido || '',
      socioCpf: socio.cpf,
      socioWhatsapp: socio.whatsapp,
      socioNumeroCamisa: socio.numeroCamisa || '—',
      numeroCamisa: socio.numeroCamisa || '—',
      pelotao: socio.pelotao || '',
      socioStatusPagamento: socio.statusPagamento || 'Em Dia',
      statusSocio: socio.statusPagamento || 'Em Dia'
    };

    try {
      const res = await fetch('/api/checkins-jogos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.checkinsJogos)) {
          appState.checkinsJogos = data.checkinsJogos;
        } else if (data.checkin && !data.duplicate) {
          appState.checkinsJogos.unshift(data.checkin);
        }
      } else {
        throw new Error('Fallback local');
      }
    } catch (err) {
      const cleanSocioCpf = String(socio.cpf || '').replace(/\D/g, '');
      const jaExiste = (appState.checkinsJogos || []).some(
        c => c.jogoId === jogo.id && String(c.socioCpf || '').replace(/\D/g, '') === cleanSocioCpf
      );
      if (!jaExiste) {
        appState.checkinsJogos.unshift({
          id: 'chk-' + Date.now(),
          ...payload,
          statusPortaria: 'Ingresso Garantido ✔',
          createdAt: new Date().toISOString()
        });
      }
    }

    saveLocalBackup();
    renderAll();

    if (feedbackBox) {
      feedbackBox.hidden = false;
      feedbackBox.style.background = '#dcfce7';
      feedbackBox.style.color = '#166534';
      feedbackBox.style.border = '2px solid #22c55e';
      feedbackBox.innerHTML = `✅ <strong>CHECK-IN CONFIRMADO NA LISTA DA PORTARIA DO VELOSÃO!</strong><br>Salve, <strong>${escapeHtml(socio.nome)}</strong> (Camisa Nº ${escapeHtml(socio.numeroCamisa || '—')})! Seu nome e CPF já estão na relação oficial da Diretoria para <strong>${escapeHtml(jogo.adversario)}</strong>.`;
    }
    showToast(`🎟️ Presença confirmada na Portaria do Velosão, ${socio.nome}!`);
  });

  // ==========================================================================
  // 4. EVENTOS DO ADMIN — ABA LOJA DE MATERIAIS E ABA JOGOS & PORTARIA
  // ==========================================================================
  document.getElementById('newMatFoto')?.addEventListener('change', (e) => {
    const file = e.target.files?.[0];
    if (!file) {
      currentMaterialPhotoDataUrl = '';
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const tempImg = new Image();
      tempImg.onload = () => {
        const canvas = document.createElement('canvas');
        const maxW = 420;
        const maxH = 420;
        let width = tempImg.width;
        let height = tempImg.height;
        const scale = Math.min(maxW / width, maxH / height, 1);
        width = Math.round(width * scale);
        height = Math.round(height * scale);
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(tempImg, 0, 0, width, height);
        currentMaterialPhotoDataUrl = canvas.toDataURL('image/jpeg', 0.8);
      };
      tempImg.src = reader.result;
    };
    reader.readAsDataURL(file);
  });

  document.getElementById('formNovoMaterial')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const descEl = document.getElementById('newMatDescricao') || document.getElementById('newMatDesc');
    const statusEl = document.getElementById('newMatStatus');

    const payload = {
      nome: document.getElementById('newMatNome')?.value.trim() || 'Material Oficial TGA',
      categoria: document.getElementById('newMatCategoria')?.value.trim() || 'Material Oficial TGA',
      valorSocio: Number(document.getElementById('newMatValorSocio')?.value) || 0,
      valorNaoSocio: Number(document.getElementById('newMatValorNaoSocio')?.value) || 0,
      tamanhos: document.getElementById('newMatTamanhos')?.value.trim() || 'P, M, G, GG, XG',
      estoqueStatus: statusEl ? statusEl.value : 'Disponível',
      descricao: descEl ? descEl.value.trim() : '',
      fotoDataUrl: currentMaterialPhotoDataUrl || '/assets/logo-tga.jpg'
    };

    const audit = buildAuditPayload(
      'Loja TGA',
      `Cadastrou novo material na Loja: "${payload.nome}"`,
      `Sócio: ${formatBRL(payload.valorSocio)} | Não-Sócio: ${formatBRL(payload.valorNaoSocio)}`
    );

    try {
      const res = await fetch('/api/materiais', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, _auditoria: audit })
      });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.materiais)) {
          appState.materiais = data.materiais;
        } else if (data.material) {
          appState.materiais.unshift(data.material);
        }
      } else {
        throw new Error('Fallback');
      }
    } catch (err) {
      appState.materiais.unshift({
        id: 'mat-' + Date.now(),
        ...payload,
        createdAt: new Date().toISOString()
      });
    }

    currentMaterialPhotoDataUrl = '';
    saveLocalBackup();
    renderAll();
    e.target.reset();
    const catInput = document.getElementById('newMatCategoria');
    const tamInput = document.getElementById('newMatTamanhos');
    if (catInput) catInput.value = 'Material Oficial TGA';
    if (tamInput) tamInput.value = 'P, M, G, GG, XG';
    showToast(`👕 Material "${payload.nome}" publicado na Loja Oficial TGA!`);
  });

  document.getElementById('btnExportPedidosLojaXls')?.addEventListener('click', () => {
    if (!hasPerm('exportarPlanilhas')) return;
    downloadStyledExcel(buildPedidosLojaReportConfig());
    showToast('📊 Planilha Oficial de Pedidos da Loja (.XLS Formatada) baixada!');
  });

  document.getElementById('btnPrintPedidosLoja')?.addEventListener('click', () => {
    if (!hasPerm('exportarPlanilhas')) return;
    printStyledReport(buildPedidosLojaReportConfig());
  });

  document.getElementById('formNovoJogo')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const estadioEl = document.getElementById('newJogoEstadio') || document.getElementById('newJogoLocal');
    const placarEl = document.getElementById('newJogoPlacar');

    const payload = {
      campeonato: document.getElementById('newJogoCampeonato')?.value.trim() || 'Campeonato Goiano',
      rodada: document.getElementById('newJogoRodada')?.value.trim() || 'Rodada Oficial',
      mando: document.getElementById('newJogoMando')?.value || 'Em Casa (Velosão)',
      status: document.getElementById('newJogoStatus')?.value || 'Check-in de Ingresso Aberto',
      adversario: document.getElementById('newJogoAdversario')?.value.trim() || '',
      dataJogo: document.getElementById('newJogoData')?.value || '',
      horario: document.getElementById('newJogoHorario')?.value.trim() || '16:00',
      placar: placarEl ? placarEl.value.trim() : '',
      estadio: estadioEl ? estadioEl.value.trim() : 'Estádio Mozart Veloso do Carmo (Velosão) — Rio Verde - GO'
    };

    const audit = buildAuditPayload(
      'Jogos ECRV',
      `Cadastrou jogo na tabela: ${payload.adversario}`,
      `Data: ${formatDateBR(payload.dataJogo)} | Mando: ${payload.mando} | Status: ${payload.status}`
    );

    try {
      const res = await fetch('/api/jogos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, _auditoria: audit })
      });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.jogosEcrv)) {
          appState.jogosEcrv = data.jogosEcrv;
        } else if (data.jogo) {
          appState.jogosEcrv.unshift(data.jogo);
        }
      } else {
        throw new Error('Fallback');
      }
    } catch (err) {
      appState.jogosEcrv.unshift({
        id: 'jog-' + Date.now(),
        ...payload
      });
    }

    saveLocalBackup();
    renderAll();
    e.target.reset();
    const campEl = document.getElementById('newJogoCampeonato');
    const horEl = document.getElementById('newJogoHorario');
    if (campEl) campEl.value = 'Campeonato Goiano';
    if (horEl) horEl.value = '16:00';
    if (estadioEl) estadioEl.value = 'Estádio Mozart Veloso do Carmo (Velosão) — Rio Verde - GO';
    showToast(`⚽ Jogo "${payload.adversario}" publicado na Tabela Oficial!`);
  });

  document.getElementById('filterCheckinJogoSelect')?.addEventListener('change', renderAdminJogosTab);

  document.getElementById('btnExportCheckinsXls')?.addEventListener('click', () => {
    if (!hasPerm('exportarPlanilhas')) return;
    downloadStyledExcel(buildCheckinsPortariaReportConfig());
    showToast('📊 Lista Oficial da Portaria do Velosão (.XLS Formatada) baixada!');
  });

  document.getElementById('btnPrintCheckins')?.addEventListener('click', () => {
    if (!hasPerm('exportarPlanilhas')) return;
    printStyledReport(buildCheckinsPortariaReportConfig());
  });

  // Salvar Configurações do Plano Único, PIX, WhatsApp, Instagram, Mural do Sócio e Torcida
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
      muralAviso: document.getElementById('cfgMuralAviso')?.value.trim() || appState.config.muralAviso,
      linkGrupoVipWhatsapp: document.getElementById('cfgLinkGrupoVip')?.value.trim() || appState.config.linkGrupoVipWhatsapp,
      chavePix: document.getElementById('cfgChavePix').value.trim(),
      titularPix: document.getElementById('cfgTitularPix').value.trim(),
      cidadePix: document.getElementById('cfgCidadePix').value.trim().toUpperCase(),
      whatsappDiretoria: document.getElementById('cfgWhatsapp').value.trim(),
      senhaAdmin: document.getElementById('cfgSenhaAdmin').value.trim() || 'Tga@2015',
      planos: [novoPlanoUnico]
    };

    const audit = buildAuditPayload(
      'Configurações',
      `Atualizou configurações gerais e Mural do Sócio TGA`,
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
    showToast('💾 Configurações, Mural do Sócio e Chave PIX atualizados!');
  });

  // ==========================================================================
  // 5. EVENTOS DO EXTRATO DE VALORES ISENTOS & MODAL DE ISENÇÃO POR PARCELA (MASTER)
  // ==========================================================================
  document.getElementById('btnToggleExtratoIsentos')?.addEventListener('click', () => {
    const panel = document.getElementById('panelExtratoIsentos');
    if (!panel) return;
    panel.hidden = !panel.hidden;
    if (!panel.hidden) {
      renderExtratoIsentosPanel();
    }
  });

  document.getElementById('btnCloseExtratoIsentos')?.addEventListener('click', () => {
    const panel = document.getElementById('panelExtratoIsentos');
    if (panel) panel.hidden = true;
  });

  document.getElementById('btnExportIsentosXls')?.addEventListener('click', () => {
    if (!hasPerm('exportarPlanilhas')) return;
    downloadStyledExcel(buildIsentosReportConfig());
    showToast('📊 Planilha Oficial de Valores e Saldos Isentos (.XLS) baixada!');
  });

  document.getElementById('btnPrintIsentosPdf')?.addEventListener('click', () => {
    if (!hasPerm('exportarPlanilhas')) return;
    printStyledReport(buildIsentosReportConfig());
  });

  ['btnCloseModalIsentarParcelas', 'btnCancelModalIsentarParcelas'].forEach((id) => {
    document.getElementById(id)?.addEventListener('click', () => {
      const m = document.getElementById('modalIsentarSocioParcelas');
      if (m) m.hidden = true;
    });
  });

  document.querySelectorAll('input[name="qtdParcelasIsentas"]').forEach((radio) => {
    radio.addEventListener('change', () => {
      const val = radio.value;
      const motivoGroup = document.getElementById('isencaoMotivoGroup');
      const motivoSelect = document.getElementById('isencaoMotivoSelect');
      if (motivoGroup) motivoGroup.hidden = val === '0';
      if (motivoSelect) {
        if (val === '3') {
          motivoSelect.value = '👑 Membro da Diretoria TGA';
        } else if ((val === '1' || val === '2') && motivoSelect.value === '👑 Membro da Diretoria TGA') {
          motivoSelect.value = '🩸 Campanha de Doação de Sangue TGA';
        }
      }
    });
  });

  document.getElementById('formIsentarSocioParcelas')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!currentAdminUser || !currentAdminUser.isMaster) {
      showToast('🚫 Apenas o Usuário Master pode conceder ou alterar isenções.');
      return;
    }

    const socioId = document.getElementById('isencaoSocioId')?.value;
    const idx = appState.socios.findIndex(s => s.id === socioId);
    if (idx === -1) return;

    const socio = appState.socios[idx];
    const selectedRadio = document.querySelector('input[name="qtdParcelasIsentas"]:checked');
    const novaQtdIsentas = Math.min(3, Math.max(0, Number(selectedRadio?.value || 0)));
    const novoValorIsento = novaQtdIsentas * 35;
    const motivoEscolhido = novaQtdIsentas === 0
      ? ''
      : (document.getElementById('isencaoMotivoSelect')?.value || '🩸 Campanha de Doação de Sangue TGA');

    const pagasPix = getSocioParcelasPagasPix(socio);
    const totalCoberto = Math.min(3, pagasPix + novaQtdIsentas);
    const isTotalIsento = novaQtdIsentas >= 3;

    let novoStatus = 'Pendente PIX';
    let novaForma = 'Parcelado em 3x de R$ 35,00';

    if (isTotalIsento) {
      novoStatus = 'Isento (Diretoria)';
      novaForma = 'Isento — Diretoria TGA (R$ 0,00)';
    } else if (novaQtdIsentas === 0) {
      if (pagasPix >= 3) {
        novoStatus = 'Pago / Ativo';
        novaForma = 'À Vista no PIX (R$ 105,00)';
      } else if (pagasPix === 2) {
        novoStatus = '2ª Parcela Paga (R$ 70)';
      } else if (pagasPix === 1) {
        novoStatus = '1ª Parcela Paga (R$ 35)';
      } else {
        novoStatus = 'Pendente PIX';
      }
    } else {
      if (totalCoberto >= 3) {
        novoStatus = 'Pago / Ativo';
        novaForma = `Parcelado 3x (${pagasPix} PIX + ${novaQtdIsentas} Isenta(s) = Quitado)`;
      } else if (totalCoberto === 2) {
        novoStatus = pagasPix === 0
          ? '2 Parcelas Isentas (R$ 70)'
          : `1ª Parcela Paga + 1 Isenta`;
        novaForma = `Parcelado 3x (${novaQtdIsentas} Parcela(s) Isenta(s) = -${formatBRL(novoValorIsento)})`;
      } else if (totalCoberto === 1) {
        novoStatus = '1 Parcela Isenta (R$ 35)';
        novaForma = `Parcelado 3x (1 Parcela Isenta = -R$ 35,00)`;
      }
    }

    const dirNome = currentAdminUser.nome || 'Jully Gabriel (Master)';
    const dirUsuario = currentAdminUser.usuario || 'jully';

    const updates = {
      isento: isTotalIsento,
      parcelasIsentas: novaQtdIsentas,
      valorIsento: novoValorIsento,
      motivoIsencao: motivoEscolhido,
      valorPlano: isTotalIsento ? 0 : 105,
      valorPago: isTotalIsento ? 0 : (pagasPix * 35),
      parcelasPagas: isTotalIsento ? 0 : pagasPix,
      statusPagamento: novoStatus,
      formaPagamento: novaForma,
      aprovadoPor: {
        nome: dirNome,
        usuario: dirUsuario,
        dataHora: new Date().toISOString(),
        status: novaQtdIsentas > 0
          ? `Isenção ${novaQtdIsentas}/3 (${formatBRL(novoValorIsento)}) — ${motivoEscolhido}`
          : `Isenção Removida (${novoStatus})`
      }
    };

    const audit = buildAuditPayload(
      'Isenção Sócio',
      novaQtdIsentas > 0
        ? `Concedeu isenção de ${novaQtdIsentas}/3 parcela(s) (${formatBRL(novoValorIsento)}) para ${socio.nome}`
        : `Removeu isenção de parcelas do sócio ${socio.nome}`,
      novaQtdIsentas > 0
        ? `Motivo: ${motivoEscolhido} | Saldo Líquido a Pagar: ${formatBRL(Math.max(0, 105 - novoValorIsento - (pagasPix * 35)))}`
        : `Retornou para o plano padrão de R$ 105,00`
    );

    appState.socios[idx] = { ...socio, ...updates };
    try {
      await fetch(`/api/socios/${socio.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...updates, _auditoria: audit })
      });
    } catch (err) {}

    saveLocalBackup();
    const modalEl = document.getElementById('modalIsentarSocioParcelas');
    if (modalEl) modalEl.hidden = true;
    renderAll();
    showToast(
      novaQtdIsentas > 0
        ? `👑 Isenção de ${novaQtdIsentas} parcela(s) (-${formatBRL(novoValorIsento)}) aplicada para ${socio.nome}!`
        : `↩️ Isenção removida da ficha de ${socio.nome}.`
    );
  });

  // ==========================================================================
  // 6. EVENTOS DO PAINEL DE EVENTOS & AÇÕES SOCIAIS DA TGA (PÚBLICO E ADMIN)
  // ==========================================================================
  document.getElementById('btnPortalIrEventos')?.addEventListener('click', () => {
    const socio = currentLoggedSocio ? (appState.socios.find(s => s.id === currentLoggedSocio.id) || currentLoggedSocio) : null;
    openFeatureWindow('windowEventosTga');
    if (socio) {
      const cpfInput = document.getElementById('evParticipanteCpf');
      const nomeInput = document.getElementById('evParticipanteNome');
      const waInput = document.getElementById('evParticipanteWhatsapp');
      const sangueSelect = document.getElementById('evParticipanteSangue');
      if (cpfInput) cpfInput.value = socio.cpf || '';
      if (nomeInput) nomeInput.value = socio.nome || '';
      if (waInput) waInput.value = socio.whatsapp || '';
      if (sangueSelect && socio.tipoSanguineo) sangueSelect.value = socio.tipoSanguineo;
      updateEventoParticipanteCpfFeedback();
    }
  });

  document.querySelectorAll('#eventosCategoryFilterBar [data-filter-evento-cat]').forEach((btn) => {
    btn.addEventListener('click', () => {
      currentEventoCategoryFilter = btn.getAttribute('data-filter-evento-cat') || 'todos';
      document.querySelectorAll('#eventosCategoryFilterBar [data-filter-evento-cat]').forEach((b) => {
        const isActive = (b.getAttribute('data-filter-evento-cat') || 'todos') === currentEventoCategoryFilter;
        b.className = isActive ? 'btn btn-primary btn-sm' : 'btn btn-secondary btn-sm';
      });
      renderEventosTgaSection();
    });
  });

  document.getElementById('evParticipanteCpf')?.addEventListener('input', updateEventoParticipanteCpfFeedback);
  document.getElementById('evParticipanteCpf')?.addEventListener('change', updateEventoParticipanteCpfFeedback);

  document.getElementById('formParticiparEventoTga')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const eventoId = document.getElementById('evSelectEvento')?.value;
    const ev = (appState.eventosTga || []).find(x => x.id === eventoId) || (appState.eventosTga || [])[0];
    if (!ev) {
      showToast('⚠️ Selecione um evento ou ação social da TGA.');
      return;
    }

    const cpf = document.getElementById('evParticipanteCpf')?.value.trim() || '';
    const nome = document.getElementById('evParticipanteNome')?.value.trim() || '';
    const whatsapp = document.getElementById('evParticipanteWhatsapp')?.value.trim() || '';
    const tipoSanguineo = document.getElementById('evParticipanteSangue')?.value || 'O+';
    const modalidade = document.getElementById('evParticipanteModalidade')?.value || 'Participante TGA';

    const socioMatch = cpf ? findSocioByCpf(cpf) : null;

    const payload = {
      eventoId: ev.id,
      eventoTitulo: ev.titulo,
      eventoCategoria: ev.categoria || 'Ações Sociais',
      nome: nome || (socioMatch ? socioMatch.nome : 'Torcedor TGA'),
      cpf,
      whatsapp: whatsapp || (socioMatch ? socioMatch.whatsapp : ''),
      tipoSanguineo: tipoSanguineo || (socioMatch ? socioMatch.tipoSanguineo : 'O+'),
      modalidade,
      observacoes: modalidade,
      isSocio: Boolean(socioMatch),
      socioId: socioMatch ? socioMatch.id : '',
      socioMatricula: socioMatch ? socioMatch.matricula : ''
    };

    try {
      const res = await fetch('/api/participantes-eventos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.participantesEventos)) {
          appState.participantesEventos = data.participantesEventos;
        } else if (data.participante && !data.duplicate) {
          appState.participantesEventos.unshift(data.participante);
        }
        if (Array.isArray(data.eventosTga)) {
          appState.eventosTga = data.eventosTga;
        }
      } else {
        throw new Error('Fallback local');
      }
    } catch (err) {
      appState.participantesEventos.unshift({
        id: 'pev-' + Date.now(),
        ...payload,
        statusPresenca: 'Inscrito — Aguardando Confirmação',
        parcelaIsentaConcedida: false,
        createdAt: new Date().toISOString()
      });
      ev.inscritosCount = (Number(ev.inscritosCount) || 0) + 1;
    }

    saveLocalBackup();
    renderAll();
    e.target.reset();
    updateEventoParticipanteCpfFeedback();

    const msgWa = `\uD83D\uDFE2\u26AA *PARTICIPAÇÃO EM AÇÃO SOCIAL - ${appState.config.nomeTorcida} (TGA)* \uD83D\uDFE2\u26AA\n\n` +
      `\uD83E\uDD1D *Evento:* ${ev.titulo} (${ev.categoria})\n` +
      `\uD83D\uDCC5 *Data:* ${formatDateBR(ev.dataEvento)} às ${ev.horario || '08:00'}\n` +
      `\uD83D\uDC64 *Participante:* ${payload.nome} (CPF: ${payload.cpf})\n` +
      `\uD83E\uDE78 *Sangue:* ${payload.tipoSanguineo} | *Como vou ajudar:* ${payload.modalidade}\n` +
      (socioMatch
        ? `\uD83C\uDF81 *Vínculo Sócio TGA:* ${socioMatch.matricula} (Elegível para Isenção de 1 Parcela = R$ 35,00 após presença confirmada!)`
        : `\uD83D\uDC9A *Vínculo:* Voluntário Garra Alviverde`);

    openSuccessModal({
      titulo: '🤝 Presença Registrada na Ação Social TGA!',
      descricao: socioMatch
        ? `Salve, ${payload.nome}! Sua inscrição em "${ev.titulo}" foi vinculada ao seu cadastro de Sócio (${socioMatch.matricula}). Compareça na ação para que o Administrador Master confirme sua presença e isente 1 parcela (R$ 35,00)!`
        : `Salve, ${payload.nome}! Sua inscrição em "${ev.titulo}" foi registrada na lista oficial da Garra Alviverde!`,
      valor: 0,
      subtextoValor: socioMatch
        ? '🎁 Benefício Sócio TGA: Vale 1 Parcela Isenta (- R$ 35,00) mediante presença!'
        : 'Evento Solidário Oficial — Torcida Organizada Garra Alviverde',
      mensagemWhatsapp: msgWa
    });
  });

  document.getElementById('formNovoEventoTga')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const statusRaw = document.getElementById('newEventoStatus')?.value || 'Inscrições Abertas';
    const statusNorm = statusRaw === 'Concluído' ? 'Encerrado' : 'Inscrições Abertas';

    const payload = {
      categoria: document.getElementById('newEventoCategoria')?.value || 'Doação de Sangue',
      titulo: document.getElementById('newEventoTitulo')?.value.trim() || 'Ação Social Garra Alviverde',
      dataEvento: document.getElementById('newEventoData')?.value || '',
      horario: document.getElementById('newEventoHorario')?.value.trim() || '08:00 às 12:00',
      local: document.getElementById('newEventoLocal')?.value.trim() || 'Rio Verde - GO',
      descricao: document.getElementById('newEventoDescricao')?.value.trim() || '',
      isentaParcela: Boolean(document.getElementById('newEventoIsentaParcela')?.checked),
      beneficioSocio: document.getElementById('newEventoIsentaParcela')?.checked
        ? 'Isenção de 1 Parcela do Sócio (R$ 35,00)'
        : 'Ação Solidária Oficial TGA',
      status: statusNorm
    };

    const audit = buildAuditPayload(
      'Eventos TGA',
      `Publicou novo evento social: "${payload.titulo}"`,
      `Categoria: ${payload.categoria} | Data: ${formatDateBR(payload.dataEvento)} | Isenta 1 Parcela: ${payload.isentaParcela ? 'Sim' : 'Não'}`
    );

    try {
      const res = await fetch('/api/eventos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, _auditoria: audit })
      });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.eventosTga)) {
          appState.eventosTga = data.eventosTga;
        } else if (data.evento) {
          appState.eventosTga.unshift(data.evento);
        }
      } else {
        throw new Error('Fallback');
      }
    } catch (err) {
      appState.eventosTga.unshift({
        id: 'evt-' + Date.now(),
        ...payload,
        inscritosCount: 0,
        createdAt: new Date().toISOString()
      });
    }

    saveLocalBackup();
    renderAll();
    e.target.reset();
    const horEl = document.getElementById('newEventoHorario');
    const locEl = document.getElementById('newEventoLocal');
    const chkEl = document.getElementById('newEventoIsentaParcela');
    if (horEl) horEl.value = '08:00 às 12:00';
    if (locEl) locEl.value = 'Saída do Estádio Velosão → Rio Verde - GO';
    if (chkEl) chkEl.checked = true;
    showToast(`🤝 Evento "${payload.titulo}" publicado no Painel de Ações Sociais TGA!`);
  });

  document.getElementById('filterEventoParticipantesSelect')?.addEventListener('change', renderAdminEventosTab);

  document.getElementById('btnExportEventosXls')?.addEventListener('click', () => {
    if (!hasPerm('exportarPlanilhas')) return;
    downloadStyledExcel(buildEventosReportConfig());
    showToast('📊 Lista Oficial de Participantes dos Eventos Sociais (.XLS) baixada!');
  });

  document.getElementById('btnPrintEventosPdf')?.addEventListener('click', () => {
    if (!hasPerm('exportarPlanilhas')) return;
    printStyledReport(buildEventosReportConfig());
  });
});
