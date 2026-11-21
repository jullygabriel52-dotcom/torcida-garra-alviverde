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
  renderHomeBentoModel1();
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

function isRioVerdeTeamName(name) {
  const n = String(name || '').toLowerCase();
  return n.includes('rio verde') || n.includes('e.c.r.v') || n.includes('ecrv') || n.includes('verdão do sudoeste');
}

function isJogoEmCasa(j) {
  if (!j) return true;
  const m = String(j.mando || '').toLowerCase();
  if (m.includes('fora')) return false;
  if (j.mandoExplicit) {
    return !m.includes('fora');
  }
  const est = String(j.estadio || '').toLowerCase();
  if (est && !est.includes('velos') && !est.includes('rio verde') && !est.includes('mozart')) {
    return false;
  }
  const partes = String(j.adversario || '').trim().split(/\s+(?:x|vs\.?|×)\s+/i);
  if (partes.length >= 2) {
    const t1IsEcrv = isRioVerdeTeamName(partes[0]);
    const t2IsEcrv = isRioVerdeTeamName(partes[1]);
    if (!t1IsEcrv && t2IsEcrv) return false;
  }
  return true;
}

function parseJogoDateMs(dateStr) {
  const s = String(dateStr || '').trim();
  if (!s) return 9999999999999;
  const isoMatch = s.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (isoMatch) {
    return Date.UTC(Number(isoMatch[1]), Number(isoMatch[2]) - 1, Number(isoMatch[3]));
  }
  const brMatch = s.match(/^(\d{2})\/(\d{2})\/(\d{4})/);
  if (brMatch) {
    return Date.UTC(Number(brMatch[3]), Number(brMatch[2]) - 1, Number(brMatch[1]));
  }
  const parsed = Date.parse(s);
  return isNaN(parsed) ? 9999999999999 : parsed;
}

function getJogosSortedByDate(jogosList) {
  const arr = Array.isArray(jogosList) ? [...jogosList] : [];
  return arr.sort((a, b) => {
    const diff = parseJogoDateMs(a.dataJogo) - parseJogoDateMs(b.dataJogo);
    if (diff !== 0) return diff;
    return String(a.rodada || '').localeCompare(String(b.rodada || ''), 'pt-BR', { numeric: true });
  });
}

function getNextUpcomingJogo(jogosList) {
  const sorted = getJogosSortedByDate(jogosList);
  if (sorted.length === 0) return null;
  const naoEncerrados = sorted.filter(j => j.status !== 'Encerrado');
  if (naoEncerrados.length === 0) return sorted[sorted.length - 1];

  const now = new Date();
  const todayUtcMs = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  const futuro = naoEncerrados.find(j => parseJogoDateMs(j.dataJogo) >= todayUtcMs);
  return futuro || naoEncerrados[0];
}

function isInvertedBwClub(teamName) {
  const lower = String(teamName || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  return (
    lower.includes('atletico') ||
    lower.includes('anapolina') ||
    lower.includes('aparecidense') ||
    lower.includes('goianesia') ||
    lower.includes('goianeisa')
  );
}

function getAutoClubShieldDataUri(teamName) {
  const raw = String(teamName || 'Clube').trim();
  const lower = raw.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  // Escudos oficiais embutidos (com Atlético-GO, Anapolina, Aparecidense e Goianésia em P&B e de cabeça pra baixo)
  const OFFICIAL_SHIELDS = window.__TGA_OFFICIAL_SHIELDS_B64 || {"aparecidense":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAEAiSURBVHhe3d11kCVXFQbw/QN3d3d3d3d3d3d3d3d3GdyCQyAkBEkIEBJkCZZkgZBkSUIgCQuEbFO/rvqmzp70m3kzOyvhVd2a3dfdt+895zvfkXu737rNmzc/evPmzQv/b+2EE05YOPbYYxcOP/zwhQMPPHBh/fr1C/vuu+/CXnvttbDHHnss7Lbbbgu77rrrYtt9990X9txzz4V99tlnYf/991844IADFjZs2LBwxBFHLGzatOlE/f+/tHWbN2/eZfg/+fz73/8ejjrqqOHPf/7z8Lvf/W749a9/PfzqV78afvnLX27RfvGLXww///nPh/3333+x+b/v+7muP+CAA4Y//OEPw6GHHjr8/e9/H0444YR+65PsBwAW+pcnhc9xxx03/OlPfxqV9sMf/nD47ne/O+yxxx5j+853vjN87WtfGz71qU8N73vf+4bXve51wwte8ILhKU95yvDoRz96eMhDHjLc//73H+5zn/sM9773vce/D3jAA4aHPvShw+Me97jh6U9/+vCSl7xkePOb3zx86EMfGj73uc8N3/zmN4fdd9998R7u96Mf/WgEx+GHHz6C76T4OUkB4B//+Mdw4IEHDj/+8Y8XFaF94xvfGBYWFobXvOY1w+Mf//jhLne5y3C9611vuNzlLjdc9KIXHc5//vMP5z73uYdznOMcw9nPfvbhbGc722I761nPusX/naOd5zznGS5wgQsMF7/4xYcrXelKw01ucpMRLMDxlre8ZfjMZz4zfOtb31ocw5577jnst99+I/ts2rSpD32n/ez0APjXv/41bNiwYQuls0QKeNWrXjVa841udKPhMpe5zKjoqmCKPNe5zjWc73znGy5ykYuM51DmNa95zeG6173ucIMb3GBs17/+9YfrXOc6wzWucY3hCle4wnCpS11quNCFLjSc97znHa/XT/o85znPOVzwghccrnjFKw63vvWtR8C99a1vHb785S+PrGBswMCtHHbYYTu9u9hpAcDX8r8RapT+whe+cLjDHe4wWjeFRzkUw2J9DxD3uMc9Rjp/0YteNFL5Bz7wgdElfPGLXxy+8pWvDF//+tdHWtcw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","jataiense":"data:image/png;base64,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","atletico-go":"data:image/png;base64,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","goianesia":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAADRJSURBVHhe3d0HlCxl0QbgVTEhZlHMOUfEnFAMmBAVAwbMAXNAwZwxR8wJRcasiFkxR1TMGXNWrjlivP2fp/9Te2rrft0zszu7d6HO6XNhdqan+6v01lv19Sxt3br1Plu3bp2cGI/jjz9+cuyxx06OOuqoyaGHHjo5+OCDJ/vvv/9k3333ney1116TPfbYY7L77rtP9txzz8k+++wz2W+//SYHHXTQ5JBDDpkcccQRk2OOOWayZcuWbc57YjqWtm7demR3IpD//Oc/3Te/+c3uiCOO6J70pCd1++23X3eDG9ygu/KVr9xd5jKX6Xbddddut91266561at217nOdbrrX//63Y1udKPuxje+cf++6173ut01r3nN7opXvGJ3+ctfvrvsZS/b/7v77rt3N7/5zbsHPehB3cte9rLuE5/4RHfcccfVrz/BCgOY1BdPCPL73/++++AHP9g96lGP6q597Wt35zrXubpddtmlu9SlLtXd9KY37Q444IDuhS98YffOd76z+/znP9/94Ac/6H7zm990f/nLX7p//etfvcGE/O9//+v+/e9/d//4xz+63/3ud93Pf/7z7utf/3r30Y9+tDvssMO6Jz/5yb1BXe1qV+vOd77zdWc961n777nTne7UvepVr+q+853vdFu3bl1xfScUOUEZwC9+8Yt+wW95y1t2F77whXulX+Ma1+juf//7d4cffniviL///e/1YwuVX//6171hPPWpT+322Wef7mIXu1h/HVe5ylW6hz3sYd1nPvOZ7r///W/92KaVTW8Af/3rX7u3ve1t3a1udat+oc9xjnN0t7nNbbrXvva1vVdvb/nTn/7UffzjH+8e+9jH9injLGc5S59GRI1vf/vb9e2bTjatAVCu8M7Tz3a2s3W3vvWtuze96U29B84rX/rSl/p08b73va97+9vf3keLV7/61d2LX/zi7pnPfGb3y1/+sn6k++Mf/9ht2bJlRaqYJjxfunnMYx7TXfrSl+7OfOYz9+no3e9+91zn2UjZdAZgAe9617t2Zz/72btLXvKSPaD73ve+V982lwB5S0tL3alOdaruFKc4RX+c8pSn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","crac":"data:image/png;base64,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","goias":"data:image/png;base64,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","goiatuba":"data:image/png;base64,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","anapolina":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAADefSURBVHhe3d33ky5F1Qfw/VP8Wa1SQMw5ohgxYhYTZjBhFhNmvWbMAUyIWYyYXUygmBVzwhwxo3fe+kzVd+vcpmfmeXb3Bt5T1bW7z870dJ/4Pad7+tnYu3fvqXv37t38/9QuvvjizQsvvHDz3HPP3Tz77LM3zzzzzM1TTz1185RTTtk86aSTNo8//vjNY489dvPoo4/ePOqoozaPOeaYzeOOO27zhBNO2Dz55JM39+zZs3n66advnnXWWZvnnHPO5gUXXLB50UUXXeI5/x/axt69e88fLuX0r3/9a/jxj388nHXWWcNLX/rS4elPf/rwsIc9bLjDHe4w3PrWtx5uc5vbjD+1W93qVmO75S1vuU/L57nOPWn3vve9hyc84QnD85///OH0008fvvrVrw5/+tOf2mFcKokCbLYfHur0z3/+c/jSl740vPrVrx4FQ0hHHXXUcP3rX3+41rWuNVz3utcdbnjDG46f3fSmN91xu/GNbzxc73rXG6597WsP17nOdYab3OQmw81udrPh/ve///DCF75weN/73jf8+te/bod5qaBLjQJcdNFFw+c+97nhRS960XD3u999FMw1rnGNUdgEFGETjOb3G93oRsMNbnCDUXgE51q/U5Re8z/X5FqfRZHSr+ZvTd/XvOY1x/tue9vbDieddNLwnve8Z/jJT37SDv+QpUNeAb71rW8NL3/5y4d73vOeI8NZIaHECiOQCJvgXOPn7W9/++E+97nP8NCHPnR45CMfOTz5yU8eXvaylw1vetObhre//e3DmWeeObzjHe8YzjjjjOHNb37z8JrXvGZ41rOeNTz60Y8eTjzxxOEBD3jAcLe73W3sn6ApRpSC0rXKRhF4IMrAM33iE58Y/vjHP7ZTOqTokFSAv//978NHP/rRURCYH8bHwv2kAATOCxDGne50p+H4448fXvKSlwwf+MAHhs3NzREX/OUvfxn27t3bPmIl+sc//jG69q985SvDxz72sVFJHvOYxwx3vetdR7xA2MYWDxSFoAwUUOOthKqf//znbfeHBB1SCsDNc6H3u9/9RoFjbmUswYex/mahrPZTn/rU8Nvf/nbbgl6XKOg3v/nN0Xs89alPHTEIoVOI6hm0eC3XvOAFLxi++93vtt0dVDokFIClvfe97x2OO+64UehcaY3nlCGx/hGPeMRw2mmnDT/4wQ/G+6bo3//+9/CrX/1qOP/884ePfOQjw7vf/e4Rwb/yla8c9uzZM7r6ZzzjGWPGcMoppwzPe97zxvDw+te/fgwJ8SI/+tGPhr/+9a9t9/vQ7373u+HjH//42KewEwxRw5SxU5Bb3OIW47N++MMftt0cFDroCvDJT35yeOADH7iPmz/66KNHyw94E/9f9apXDd/+9reHiy++uO1ipJ/+9KejwAj5sY997HDf+953uMtd7jL2dbWrXW0MFSzR71e96lXHn5rYns/yOUG53ngIlGLCEQAoZTIOXqBHF1544fChD31oBITm4Jm8Q1UEn0k1Tz311NFzHUw6aApwwQUXDI9//ONHIVeLT8zHNNaOmb2cW7j4xje+MSoGgEdQCQ8RrD40eT5F0AgTVpDCye8pFw/gWf4G+lyXWB5rvvKVr7yVBhqj8MODnH322ZMp4Ne//vUxTQQKKVVVBL8b453vfOfR+/3vf/9rbz8gdMAV4D//+c/owlkAplRgl/wd0DrnnHMuEdNZ/9e+9rXRjbPwWNOVrnSl4SpXucoonJvf/OajMB/0oAeN/6NkBEFg/ved73xn+MMf/rAFDmGOn/3sZ2Nt4b///e8Yo10HvH32s58dgShPwm0bc+oBFML4xXgChgU++MEPdpWVd6KolLTFCUlTeYyDgQ8OqAJwndKr1hqSg59wwgljrt8KnpsUwx/84AePinL1q199dNeY5++TTz55RNr+D6HDBlIwSvGc5zxn7AMAo2DCzaMe9ajhta997fg5wbBo6aLniPmUkMvP/3kLZAzHHHPM8NznPnfMNmQC4nziu3nIRl784hePitrSL37xizGldR8l8lzexhzcDyhKT9v57086YAqAeQCQiRK6iWOevwmNJQJulaRxGI2p3KVG6Fw6oXPl0jMC15SE5d8Y/f3vf3+M44THver/8pe//PDMZz5z+N73vrcFwl7xilcMhx9++Fg2/vOf/zx88YtfHI488sjRc6CnPe1p41jl87yEMaHPfOYzoxLHg7kmikDxfMYT8SItbhH+nvjEJ45zoTQxBIpnjuZ2oLDBflcAsVqsTFxPfA1KVrv//e9/v889cmZWRNBxs37nign12c9+9ngdxP63v/1tBFP3uMc9xt/PPffcEfn/5je/GS1NjPU570OYgByrFneRotARRxwxhhQEzVMaCoMe97jHjWNQ3QMy/RRCuHMCq8KnDDwJhXYPK49nk6oKMZUAYJiE0PEi3sB9xk0Z9zftVwWQqonFJhh3F6vH5C9/+cv7XI+x8nqx1j2E7XpMfN3rXjdaKAFJuxD3DrgR9GGHHTaGD8rEK8Tqf/nLX47Xwh7SORZMGfykaBZ4WCwFkDZC+YQcUMYSKennP//50QsQ4lOe8pRRSLFcwufd3Mt9wwFCUgAtUMrShZ52zsYrLc16Q/rM76qV+5P2mwIAccBRijaEz5JZDSvkGSphHismeNckX1YUwgxoXYqFCNb9XCWv4Fk+EwKsCAJU55133hj33/CGN4yKIvbf7na3G5WFVbuHpRJSUk/xXRNyCMs4ha4nPelJwxvf+MatcZpTLVAZn1CCLAwFX6gLMAChivdL3DcuylZJSDEXCpPxJAtxfRsed4v2iwJI3Wh0jW8mj7ksuBIrFA9rDR/ACwiDAXyGEfe6171G64faxXwMhta5fDGdtXgGJkPy7gMYNYqV/J5icrEsM4Un18Zt5zr3pR6gX14LUKso3rN4Kd5OOmjsnk0ZKQM3b46uS//Gcuyxx47KWsn9MEwNCe4zDkrYGs1u0K4rwDvf+c7RgrUa0zAPkyqJw6wSYwjjjne848gU7tMiEHrb2962BRwJ6yEPecjICIDM4g7mZHHGc5JRROiwA0sXm3kBjOT2YQwYgofwPFVACiVeGyuPI87rjxIYQ0BohK+Zn88IWpgxvne9613j2HkweweQ56gJ+Ixw0yeBV8CnD+NpeejZ6h3C5G7SriqAxRIMC9hLJUy5VfwOiZGYnSILdy894mazlCrmitXAk8mH4fq32UML8IqQ/M26MQpmeP/73z/WADB4XReqTgAnSCcpIeCpSMS6UxBKqdd8ZRFAWxA/L8hjwQ3AY3ALhWD9FFK5mfcT+sy30oc//OFReSlzgDOF4RmnCk/boV1TgLe85S2jIAghYA+jCLZWuaRggJvJuD65PLduYizwC1/4wgiO5OTcJ/db3a77KAUhsBJImkWzQhbSou3dImFHISnlZopLgQnJPIxRnUMhy+fwi7FQDDygSKqOshKfy1SMO15Ev5UoSyqcVQl4mTZz2i7tigJweT3hc3uVPv3pT4/CjPvjji21quxxj9w6i8cM8RP5P6uOtWd1TbjgRShL9S4HiqB93orXEloyrmAK41UwojSEzSMJS8atEgpcIiFAJTM4R4io6wyqg0Cp/1UloGi81E5pxwoAFbPCuP0In0eoZOnU/0zUhAg9sRIRYjyF3NyElWG5Vn1jsHu5S6Em6d0SYSbvAlMoynC7xibOApiQvjoCQRoPl0/p4JVV4y3ARxF5BUoKz8AQahK2rik+AYd4JVu47GUvO4YTJO2l/ATKiPBOCEvIQDyhsFGVgAf0vHVDW0s7UgBxi6YHrET4BFTJpBPvMYKLRBjD4lnTW9/61jFuUgTgUJ+xKD+FDZ8vLc2yCmVYAE8BiruU+gVUpfqWRai48ISjKLO5ECIL5aZlL1K3pfAiI1EnSCoLXAKhvJ5QQGAELA1FvBgF0j9PYCwsXFirW8v83iqBPs1xJ7RtBZB2cecYVwFf6/ZZGdeHuSalXs8KkZgtHQOUAC7WTlgmF2XiLSjHXAoEVFqI4XL1l4whOENfLLNtLZqvzXwIUT+sjaIrUKkxiNWwzByxfFZt0YiSud9cgNKQAlOqmrCO+oR7KI5nqgtYSArxBBUTJDtoeb4ObUsBCEOBA3PCvAC+SoRPS12XlTjEioUEMZ8rZDEYw73HKimMeDiHeLPcSugReKy3FfBOG4VItY5CQ+hCFLc+FYuFNIpJ8FFGfOABwj8eQ9FKCEG8ISXjKd1jblUJZEZqEfhDCYzJnHnS7dDaCmBSkGxNzZLqVfcorqaIQrPFQ+4Ow7g8CyII2HM/gWWNnOtVGeuR53OfFmvidVjqbgt8qUUZPF+6xytMIXNKzNKj3HgCJ6TYxb0zCrgDMNaXRlnwg5GkCoqUvKOQlIAy8E5tnWUVWlsBxGGam9o+BiicVCuwpSrXmCyFoRxW6DCL9tvMId5bR08a5aeYNrUSxq2yurjm5OEHuwW8cdmWc6d2Cwl9wiYloOwygvCB99QHXISgf/ygABosU7Mdz+Ehqhwo1Nw2uR6tpQDinvgUxE8QUjSxKSTVI5jk7SllpgQM3ZoMi6XZAWXumVr4gDes5OkzitUK4VBoSQUBVruae8QIbE4hVPxjudw8l69Cibh54FM2xGu6zvVCpUphiFfxvDyfQrRheIlWVgAPVqTxkIA+EwbkQhQkGk6ocXWsXEqVBRNYgMBj9e7h1lri7pWWlYuFk0NV8G2LqxcWe9vBgVYhjDIn7MEFSDjg+nk6BSOYQCYRbyB9DQkblCmgEE8pC0+5Kq2sAGJSjfsUQQ4dMikoP4KCTIE0QE4FDFkKlZPLBOLGxfseohY3rfZ5jmtbJh/qjYfDC25ebaElJeMsdDEEQFH6jF/WQ/yNjzCSkCJDYlCur95FfSNg0E/XCLNzWVOllRSAC5aexfUbhLhPQ0PcEQUxGcjXBPNWjI2TagaEz/0nv7dM2rMQGowBAYctcy8tLQBNA4p7NQQVwlzDW1obQIxEuIUR4CvKwBhcJ+xmZxKCuSqvXFc9xRwtKgA3LB4l1nAzWt3YANykYCOPRdw+hbCooQ+CN3jWTIG4rnZNHNH4KFkY2ebotbVMPxitHVM7NvzCCwi/V11UhQwQNne85VEZmNALGylGCRssnICF4wA+xmb7WdLy4K+k3XO0qADSMYMzIYPzcDEpxKrFaAMDZAgayRaAv2zKZO2punH7PctXvYuSmERbpUsLvohL9PNA44Okgb0xZmz5f9JUvJMB9crYSuOZCwtnCEIHA7JoFOIxXKcvawohaTXsEOEzRul3z+tUmlUA+bqFDhNJfFHWjGsHULgsguaubMWyvSn77QxcH3brBPApYrQx3yDdl6KRyWGCJV+7YSzrquOzjBRNgE8VQnsChCMM3t81gaS1xick8mKeDx8pYyvGyILwwbqCsbNU2Y55ERxe+bt9M6jWV3gM4QDPbXCVOSkO4ZHr9BmPXK2c2w9OC0jHtzmaVQBaaOBxaQSYMi7K9igMAWhCmMBtifvcW5THxKyNt4RRV7jCFUbhPfzhDx+f2zJojiiZBRwMoKABVq0At9vMHR9YFw+nionxS9YVYggUVo4v47F/EaircRwBexGu8WejqtTuMpe5zNYaCn7FWGQPGYewYYdUQgk+qA3MLRhNKoDByGcJDhN0Jr6nszzMQAxUrIJeswrIS8ABNBl4pDx19S8kNbQIYg9ebxescjErsMAjVWRlPAABqLy1b9QATJZaKQJGxiVut8Wls0AVyPZ5mC+uq8IZo9KusXHzxt6Ssi6BUnZAty11UxYeAr/wjTG5huHxuPqVbbk/eKpuLQPAg59itED4FE0qALcd6+dOPCz1amTjI3fD+uW7Uj5ukYsDVhQzaLzBuM41LUkPLW5Ia+rLEFwel6oIghkwhhBjHKn+KaC4V4iypCpzqMKhoOJq3HYr2KWWmE2R2vHJvzHVYg7lZ80s2/qAcRqbMasMAn5qGW2ZVvGM0ht/u5ZgLjEa/fCkvBx3bq5qBdI/BphScd5Ich0vhe+8gD5kFLWAVKmrANCluIpxOqEI1p7DBBaZV7tU6FguC/G3e1wfgfkb6GsPSgAueYgKiPyOqVn21CheFnj0FyXIIggL9Vx/A1gsoFoepSXEIORVmv4xEL6pZWmWSADmk6zH843D85MhZWzGngIOfnHhtUiDn3J/9RSCqwTs1fkLDZQJr+X4QB/v4P+8cF0RFG4CjIMFXNujrgIo2wb5x/rrnjUpCaZr4hE3aDJcEfcUIaXal7XvEBepzJk6gvt5g7xEuZ3Cj2caM6axAGAxRLFsz9I3hW7vrS3onvdIbJVmCV+pTZjTukAzZWyCYTSypxBjELbqG0SUmHegiAQsmxIeYB21AaFTOLa30Lx4oWwiyebUgHfPZaBt+EKXUACTVoaMxehE7A8zDJyrwwi1aYzSuXQl97NE9xlY6tshQmcFwRJqAULGdgXfaxl73ZXEkqWitXbeNgpLQJQzxOp5v9Tu23vWbSnoEFgto1v8qWsqCJ4IAJURWRHMFjieyP9lVZTEvPI+AhJCqxGbm0MtWrqEAojdcR0G7OERLsoaP43mbpGBQ+A8Ay+QFxxYTHWhvAQtjfC5MXFsf1T8uE39wiFxr4TJfWNMe30YnfUKJG5nA+tujy91g7xwgoDJFrHjt+cbc9w878bTcuuyKnOKUqVmwNDwNkqLF60xoksogJJlLMgAbdLIMiTUrbadOO9/ijf1NSqDiEZmDSDkungSaR6Xv05sXrcRGlDK5ca9sgJukYLkuhS4eL5cZ3zrYod1GyNiTHhYeVQJT/N+guthAesFMALiFey1YLDmCnCGKEzCHkVgmG0lch8FAC5oU039uJqQOJVCg/ozNGqAUhteQF0A2ME0GlrXCipBrNCzfFh/mJC2E4YnXtamf4ypTBYaXBurxhxMBm4zPiBYetrrL95xnZZaSNuf6mlK5lOk0MSgjNlCDyHmXCTFo9QPzFP4jRchn/omE94qUlXaRwG4kwAcjZWk0pTYbrDWr2spV0VOuoKRmGOg2dbdI27ZdQoqCkaUSaO93JQBr+NyXWvcmKGP9Kdvws7exYBRDEqF0/3Gm7eBhSloG7O8RVz78zt8IN1dVwnwBlaq/Zk/cCnMUBB7BXrEA6euwa3DYYyNgeEzhUjWhg8VsHtm6gJ+mlulfRRAOhKQhAEWGJI/yvMjXMzCCMgUZkDiUh5ikFPWr5jjGSbcVsKQ5wkt61TyMFdo6i2BypcpiGfyStlVLH4aq0YZkjrKgFxr/pjcI4o2Bybb5vmEUzOTkOcSLk+gLtCeJRCCFeIhAW8E08gCGI1xy3S86SxEhHiWKED4VBfhthTAQCpocFPd3g0cGQDrzAZESuBaDMnOFTGHR+gRMJa3fV2XhaKWxK51GIwpNoe2lLWK9MV7ZQGFF1AgwbCAWQqEocZHAf3eq+axsHi7diy9pj/rBr3tWrZ24XWMq2YGlQhbmEqZl3H6Gz8ZEg+dMjLwncIQYbuuLhLV/QRbCmChhaam4OL31OPFGDHbw21ztigBEOb4Vg80+GjY1J4+qUkQvwGJT4m7lbi49i3cqRb3Lz9uiUtNGuRa46vM4X4B0YBci07BBskKerGZlSbVbcfTNv3oswXECF+57vTjp/x9ao1BlmVM+MKjMDpVRPNRG0gtxDxr+deCFYPzDGNxX2hLAaRxLNxFGMotBkzo3EN1nONLfJadLgoZ7iHc2jkKqmWNdV8BxhhU0GxLnkPZTHSucZ1y5F6pk9eqnsQzMShClYbKepD7LURVEIpZ3HJPIGJvDn6Yawl3vSXghKHgnVQR20MkQnjuGn1mYYgsrL7yVLwbvIMnNQzAGqkJwHUqrfFGWwpAOIkVXGXdUQIM+YxVcimEKcYDH/J6rjweoC7ouC5ph/uAp2rVlCYvhrSkyMFtsoi8Ddw2K10sqBer9anvtniDeQpYiAUGzGafYnXrqYf0Dnwyb0JgKO24auM58a9H1uvD8zR8Ti2C4lXlo6T6dA0hUmDz5IlzHYCdJeesMcjS7BVIdVaZPkWhUQHE5rhcE84qFGLBlhxZqxRPzIFapSPAGgCTFEfMrFuiaWdWu6Qf+m3jpn6nMoYc/kS7p1ovrqIsZtVnaRQC1mn38LOiVhhRmLy90xKBLI0PP3oexJ6IuoEjjVGoWJIJA8K/Whtg5azZfcIZYEseeM9gKD0h43XeQuLJ/S/AmgKlSjoqABARbXejOJ6KEgsJiEi8TcNMLe5cjKok7YqF+V9qCLWZDEvuufDtkr4AvF6MDiKvr2ghxaKeApg3z9XbwbQTSoWvfV4sNCFDkacuFFGcKqvIIiEnCmXutaRdn+dnQsSoAFBwYoROaGC0Tm2AJSVO9ZrBGHhdcSIEVhjAZeWvh+zdS4nW2cq8RGIo5vTGHBxQX6ViaVMKoxn3lBvfDvE+jKpWIys/eFQhEOFLXUrmVQBQcmrvbceco+4QwJuSNoXhEch4VAB7/KIdmFB390gFpxiTRuug6VpmpMFWChEGK0hM9UPBINUemTAlkr/XBrlP1RooW8/9a1HyFH6QZ6SQ0l6vYVhdc68kI+iNL+i8RwpUU0YVY4qCMsBa3kXqNQHsU82YhevgADE/GEz/FvSMb8MXLNmsEfdHc+q2L0BlSnBpGAct11jF/ec1JzFQ3jrVT9xWu1cQATrK0+rYYncaC+qBPyVpLrSNrWlRAJW4EIGJoYmRvYY/lS8hGABGEo8zNtjI+GIAlVKFnFK2uPZkKkJA24//JfS299d+tFRyKQK8VusXViA3fLsWZFkLQNm3Z7A5u799QG29dM7GDsqDAiSnFECDD1oMgSgP95zDoDRKSpt728qtXfSwRloUoFoVFA2tz83T2I2jB+gsw0pZMz79GENv/2Mtt7fP0AiH8qZmLwNhALXKqcYPkE8puaZ/sqxgPrWcpIOesXHeeedt0tY82O9Zl8ZgltemUm0zWUWUSoRPsUIqclNuWQv4rCdjhNQbglFcSwFqnhvCpFrN7LUoQK2GwSti4pyC4o//995almZVgWC8ON3u8mkrk70Wy826BTzTls2FPh6nhyFqM141gFDSdf9LSXnD9+oZfMABV5i44ZAiDxcz2s7TTFo8qaiaW+Q5uMKkhXlzqL0/zfMxRmm0JYKVdhJcGNSieEQJp2JrfQ4mtMUWytrLAmozvimsorYQBXdde0oKAuaEpzl++h+eJxyyUnKpADuKNKewmv9XQ7GqmDH66X8bZ5xxxqYaQNCxwktiuRg7JzSNtYkttfyrlGsS+kypVym0WnGvEbCctreok9enCYkrbhdN/K0WPudlNApL4dtv9soLmO31tRGO3L23aqcAhhesEj/r+/whFrfK+HjhAEj3WJauu31Q3bcx1cynemGbdeJ9/A/22/CNmvEAOgTWQtb/e7lqbYQmttSdLKzT55gRSwM4PGNO+zVj6G1jzluzFLJFxchaQGoVbZ9t/+ZIYVhSYjoLW2Kohh/wTUsyCV6PsNQUWhLaFGnmgKZGwXmZbMCVyl3xilccj7+pxFMuGScZCG2Zo8wi8jQOW902fJ1qFCAPD2UjQttxbTQJqq0kTgashVlZCVyFAXbmtDtjMASuoAQ9nCDjWBJglDybQ6SqObdAxQ0GWYqr/m/vQ2/BS+HF+kDvVXd5+JLANNdkNdU8eVd9pnwdEu5WSQWrR+WlKgjkHTZ8l24UgDBrDWAVl+WevNEaMjgKQJg0MGCIG1sadOrxvRgvd++9X8A7tOsMvaZf88wqJ6tnBVG29sCFqTYV443DBtq2PM3bCFtzWYZGKBZzUgVksXiIx7xW9bLeEZgqdqWRAVCcqi4vHLCqMcgNX6SMeVGAunXKsu8SMHJPPScA8Rwmq08alxdK8j7BkpVhcGoIlaDf3itjUlCubWnLt2uqJdnHYH7JeqRcNU+eaubWrnsgApIRxH2HVt0/YHw15w/Q8zzV2XpEnpVBcpsLqfgsW8gWdGOLl3Mf5djwLdpQPGF5UN1KbWl3FQXIDpWQvwP43J+lS1RfYJxqySxaoNaj7GNcCi3BBymM6Nsz1BdSfyA4CrKEe2IsvYMfeiSsLnkWQqlzzncXERTlMcdaaVUgywmqbV+1T+EqRsOzJK03B2Bzw1eoVwWoeSN3u4SMCbh6DZSTL/yf1ntgav20WFxaUixCWOWQA2mSvuZcYfqr9Xw5MaFgIEvKUWx+csNztQTNM3OsyxzxLq6fs1RjN5a6eFO3nREkAFlxR84MnPOm5mYuSSnVdVIN9H9y3zjqqKN2rADtQYVCQhWw3+tbqhB7gEjbX1riV3V7LUG3Yu6cMgkLGFkPVFDfIJB4BcpRsUUWx+ZcdpZce/v8KlG6ORxlfDyiecgkkCJQDRmeY/2/nhOQgzXneLikADzMxjHHHLOPAtStS7RwFQWoW8eRnL3eFyZXTyGVM/Epy0j4mNorgAjSJKcEhbmYz1LiWlmRAhVkjRFCh7HaG2hMid854XTOs5jT1F4BlN28U94kyknRA/wU4XjIyj9CthhVsx+1CO59SQGEidQt1CZqZVe9YuO4447bAoEUoJ46oVI0Z12agbZHkxF0MECuI2h/1/cEPYuAphjk2VLMNiUMyY3n4jXmYlK+fAIpbsEoSsHSVSmbWG6FjiKHyZA7DEQJppQ0RaXemgSyyWQu9hs7BQkINU8rme2cUqGtq4uwzNK+ScrBS0T57WngSXzOaISVjRNPPHGfLKACOtWxOfeluafdB4iZvQUPn2FYTfGssPFAntNen0nICIyLomm2TLFQ2t0Tjs8wUT2+t/V8VSIQz42naJ+jEYCVUOPCr7S85dyzUOPj/SxB15dEzcu4Wz4wzPYQSAU2/5vyfppxs/hUJZWiAxw1nmbj5JNP3qcQVIUpvZrTYI0CiK+VVPKCNOu1XJ7raW7dZ8dCWbrJ93Jl91CQ2ow1dfNc53nGi+lS2B5+YNk2ZHCLNl3AI9bKCaJN60K2arMk4+sJ1Jjb8WmY3I7P5/qQ7tVzAdRIzKknUPfUegXiyZZkQ2mtocRzCJlZSzEGBrKxZ8+efUrBqnChHD/WdlybydPkmvvSzp4CaNk/yOpryRdA9Ly8j4cZldm1L7/n74Qu95iw8be7iygCIbJKY4UJKKGFGUDIWFgGi8VoZdb2hC3YgWXjFZ4sgcTajMs9ftp5XN/cUduQkRj/VH8Ur62LqCwuFdUim4BvxaOEF/LhuTZOO+20rcUgTK/WzD0vPcSk5Kj1HFvWtQTO3EfAhFItwS5XlUQ7iBQtMC4Kgelp/jYZE7ExEhNZc1VEqFmGwgpcHyF4rvHxIGn+9jmmcc85DRxOqH2Ko8JCDqYyhozNvfr3098ZO6WWZSiI1UUsb1Upx/bcfm3GUyu0yJtCLVZomzGw8hCDyz3GqD6xcdZZZ20pgA9VnJKOAEi9WF5bgEaNtVzs0rq8hvGYREBWqtr1c8xWDmWRGOAgaSCJsNUIgCzepj1ihatUNmbRCStzc+g1CkGwBGhBpl0BtIdAGKOsUj0FJMxWXlX48qaScVOgdt2AkgPK+Wq79tm1MSIyaLMhAN3Y2utrowC2+4ek+LnHc2UwG+ecc85WCCAw6Ua2cqsgLRUbojj1laasVy8NsA5UUy+vG0m3Q5jtBUiCnwJu67RYOSPxZtNOSJGJ5eIxxZ9D8GmMhKLUTIZLtwK7ZGB4WndqWUKOwnm+es3GBRdcsAkNxmVr+a47sZN7XWKkMNG++uSFxaXwUVtCkKZ+rQbBwrl1QuWV4ooVgJSAFThqbozBOQpmXYtfaphN0Ws10Xjk770vreIhjM2ePvUF2EK2xSiWBFdbijm1DIwf7Teptc38KUB9tU3lMt7QTx5h46KLLtrkJoK+Ma++Q56zZtoH1BZ3UglKTb7ZXj/XDM59+syagRgqDxaerC6Kv8IOpuatIrmusLMEWnfSWCOlrnUPgI5FGxMPpiUU+Nx8zAMPCWxdxXRfe+Jnton1UuC0KEAqlcJrjuePofvfuC2ctYZxGF+XOrmJJQVI6Ah2QHLPVZZol5pJJg+npFqATEqcLDBppIm3re1z1db2o5kPXuXMQ14A/2wKrSDVOI17TkirNMpTi3MoJ3+019bGiHjSVBjhqZSOCZ8CkdGoAARuUnENLCvEkpdieeJUTZ1ygHE8y242Y617B9UuWGbQdxXCEoidaxXRV6FiovlakkXZjLoUKtdtqXPUN58B3Bxg0V5fG0PG/3gO1U5jTw1AFRCWGBWg1tRdxOWmKNIeGtVrGGxA7Tdf0tx1cMAqjRBglrwUIrdlJSZkC5u4lib2Ck0YuY4SuBaTWLY+0p8KJ2MRfz1TeEzmAqUvWeW6redZAfSlZWCNkdS9BbxGZEE5svNrVAAu1D8IWcdy4Lw9ShGWtkxrvWpVvmJmabCrNoIx+HzrJsbk61eg9N4r2MqnvbeE5xols2DU7uxBtlWlhkDgSc8oJMC8mx6PENt1FlvYlrya/5lv3i5qdxFThIDZUQFcAMTEhZlYfXNG/r0ErjCEsOtXnKGlF0LWaaxSbh/kD6zq24QpQe+UECT9MaelHUNplLld4UTcqQJV3C9hE3oslAdcyutXbYwRT9tX0204XXL/7iWL7MiWQeQF34SAbGbZOh8A8+IiPEDBJWmXCtKS1mkm335lbE4Faa/dTiPEZBswhoJLmGFyOb+gJfWMVT0RBpln7zU1i1g1s0nIzJHsikWENhcuV214aY9ArRya29IegNzLGyf+exupCl8ISXFqSwFUtGJNyT3zDr24s5R3au6vx5Qh4WXdQ596LYPP+4CWUI01zA4OaRUwBDhZ868gsdeOPPLIUbF6r4DBBJ5RDYHnycsXcv+5dyDXaZ7TvvuoSLZkTMbmmprJwQLBJ+Sg/Bzj3lIAdXOagckBQanuuXjq9e724R7QHvu+yvbypUb5pJVxa5jTeiUuWYWst6on55UqWutgWb3mf67pvf6VQ5paLOFvpeyUo6sn3W4zD3WP+oLMqucS4RNvl1fKg+GCTShsLdptKQCi+XkAjalLw1y5TpbcW9xPpVVfiphryWvDlN57AAGJ7WGIIRaKkUutRyyqh/LjmbJWAKC2irluM69860rIFvZ46Pb62siIFwoYz05n96UmkfQV7aMAXEwmSZNofNYFuHKrc60FtC0xsD2YmGvuMXDVZvL1yPp6oHVtPmtj505JNlBPUK0tITNb3+XsS1W6uWaeqog1AzHnCj7nGguvX8xRt/brm4erp7HsowDZERuQ0cYhVcFVhMjdCxmVWO5O0iRjybmC4rM41nOHCV9LmzXXoZy/37M+nzGKLBTZrr20X3+qMRzzbF+NE1Ir+JxqxgEkxmizZT4813e7g3sfBUCWPqMxftZz5qHg6kqmmv+ziiwqhbjmFkSt2tyXNG/pmBTXWkzqkWVrns5eB0vQaawmX2jdUuVJ24J7UpsATrejANnAKm2utRTK3h5fN9VcU4s/FDfjznjaOV5CAeSHuYnGaYkZXJHBTDGjNl7AjpO6mQJZN+emVs3J0+rkZBlzi1QBjG1NAqmJm5PNnvrUjMfP9pVxlAMYpwQaD5CCUL5kc+r6qaYP5eX2q2UijyWjCRapdYN6LI/59d65vIQCWIuvdW2CrAUWOe8qYMT/Xdd+ibJq3SpYom2YEKumVIDOnCIS6tTBTnkppPYNN7TMQVK/rEr2WkJOCivW7ZfOAGibPgioXVKHu3IuQntP29xv1TBzMA6fpwxujr0jbi6hAEgVLLE+hYOUWVnfKocpaJSoVu5COfFjHSbpi9sPgOGW51JL46Zovc0l7fsE5tLb7CE1FlPn6h+xvJzqxUDiOdtrey0vhphPC1ztQZybY1oP96hN5F68s6bQ2yTbVQC5dt1zThmqNdVvE20HU1sm1+4VQDmZbKmPNGOhiBGonS5zY4jW19PAQuKqnN/9WfzqnVZqxXEp9lJiLj8GkoOup8bVNmPw/LaCKZsIlmrvaRs+sv6EWzjHek6VX/1mkkpdBUDcfvUCNSXkZsT3JeZoLKFnYSzZRpRVsgoNMyhU8IidNslv22vTMNcGjVqZDInZBOX57dvNKCeHL7lfc1M/ietVn1h1TiyzPV4HUfKptLNt+KLV2E92sX6y83JMq2ChSQXIeTbRIh3W7wz2wDlwVJuJSi/bL0VidXb5UKQlUEjQxhBNDlaZwxLuwcTeaV35+hv3t1vAEQS9ioITdvbdpew9N6Y0fCWcXtGKx1xVifCkHrsP5Ve56ad+D1JLkwqAxJFaGKKtNY2oNealxlKUJNsdvFB5vmRqSQn0Ub8qVZFjDqBpAUdtNoJYq8JIr+5fD8+eauFJXr3y2tsqVUBGQ3B1xTUECHruKhiCorHueh6RLEvfeOn/Fb/1aFYB2uPPdGxdOcy0oqQ8u4qr0gJ22nOBKRWwtWRxAVfZIWvFDrPnvFBQcL7ZpJK0r91ujfSLgUvxl/LXFzbqSWFTTZ/42G7zQgHHS8/VzMnz63lJFLCW6z2nPVyqpVkFQDkqXoc6puH1yDK7TldZI8igDap9yQEJD1KeJdTr//YnhHihJS/gnl6cRz18YHxLtYpUS+MRAa+5PZCxSPfVV/BDsgj3rxI+NIoGh8WYlI7z5ROeRSbWX9pT0VtaVAAdZCEnHRNUtkLzBjYpLAkhjaIYZFuSRDyKQhPNnlKoWLQTNJBUTao554VSIq3v10+RlHWVNXdKVV+krRtre41bFy56Md9c1vGk5iPO15dVavYRQ+tlQC0tKgBSKq3VKMKuFoVp8sxVJ0CIrm0PlkDQd0BQTwiU0OSEkiBvW58o6FwoMObewU4tcalzlTfPNzY1iexLlH8HjbfX68ezpXrt7h5E+P43VdVsW7KqKlwg1v/CL/+X5rZvWvVoJQUAkqQ6Jo4BKX7U49DyjddTLrBtrqMErKhXgQOQaHkvpmKqz+uql+KVdfgpz8FqKOnUCeMoX6wwJYzU61lrgJ/+ZDKY3oYM/AgI7QExCqGvqef1mjnWdQ6uX6obwIqvFLG+STRHKykAEqNzwpeJGrTQUPNLS76sc0oIbTNQAwekeps45PxQOia23sDfdfMq8qIpBvWUkNIYc7vLphKFppRT1m9uUseEH9Q7Wi4KSoF5nV6WYcUPPxnVKp4zyifO10zKptEafo1llbOVQisrALIt2sPCIAOSLlULrqnjKo2yWJjhsnpWQjEgWczUb9xslJAF1RdTHbTkmp5VGe/cwU5T7zPqz7Nhn3pMXU4mDz+iZElX24WdkIMghSzH1Cj4+IKsubCjUZJ6kDdSq2AIeFgVpLebeYrWUgCCNlhaFneHAVXjxPB8x1DrEmvzv3gATMMMRZT23f4QwOMV6wAc9+rD/TxRFUxe1zK2iqrdi1kyB8Ub49b8DvmzyBrHXa9/wnIcTS0XK0gRSq73OwGoHrYLYCG7c+2yMl/8UchKDj8HpAnZWOq5ApTLeAPOXcNIekWtOVpLARCXj+FJNzDAIOqkoW2aXRWlbQRhApgP0LBkSsB9E8qUFquRU8IoQuIs16w8HJKl8BysxnUEmQwC84UKDNf8XjMPSuMeP60S1kqivQgpk3u2fjWCh0l6oQwZmw0xnuV644Uj4ACeD/5gOK0Hwg+fAeIhimjXkM/xN3PqnaG8RGsrAMrXxAYPYJR4XDeAKCKp8PWUwN926KaEyXoxIqeDEIrY324oqQTkuD8FJMpDwGJuRb/WL1ir/qy3Y1S8DqtN87d+jJeCUzKFlVq0kvNLU43dGCkMBXGsXG+lDVFE2IQgjTGHP+ZYOkKXxvIOBCu7yFJ8ikb1NbisoVTc4fepb2Fdom0pAKLtGJb4g4HKkrVUTMMxs1UCCgO50nwCyiEGAA0LyWvUNJtrnsvf9WEDpSVqSnj44YeP1gjQtdkFwEhYYjcBZBcwlJ4DHaSUWfQKqYXIVszDuIQX6yJZAu6RpV1eMVYP57BaCz/e7oEnZBBWXgmdsuddBwoZ4bdfwyuEBHfgqWvwci67maNtKwASS3OWXuIxV16BCk/AsiswNAGxHnizSmji7lHbt56ek7UxwX3cuNJpfUe+RxSOMoinrMq7ACqVFKgtP4d6awTIYhO0D1RK85zSJVwpH9d39XokZPAMlAV/KDRBElJivrFpyRBy0DThJ6y1G0Sy9lH5jTf1pLF1aUcKgKkmEfBiUAaO+fWcXws+LI22BilTHsCOVQoB7svLpRQj1ccARF+HyvIUj3rfN9wS16tvCsayWSvLlkK1niFkPpTMeFkvRbQhk9Cm7gn5vxI5CyZA46XAQhTLt75gztldperJY/mfz1IPSBrafgVPvikswned++sW7+3QjhQA0eqg/lYJaqlSjEwGEfSvoAHZZos3IbEw8R0IVOvGIIss+nMvZRNqWAN32suxe0RAhK/fKWHqy3ymAGiPKKMNofYomgMhESS3DCtRRIs8+MILMIx8R4GycPYmBuxRmHqYpjGZa4pcwVwUoV63XdqxAiBWw0UGmEQJTKZudmBhFpeSWgV8sZasDQQQChEAHcURHoSSvOHCI2AchnguN83CthsH1yWZkEKOUAPNU/58a1iOm4MbCF7oUiAjMPEbIKTg+rColTyegOXwNZ3Frzbm45vro0Q7pV1RAMSlsYLqCQjXRpC8PBkSlzGqhgSLKVIlwtSPLWmYyAKsnomrqbphomuShrkfU4QZR78DeixNTWIqxq9KMgprHTwTJfVevTl5LsVNzPYeBIsn3HwFPO/AC8ITXDpl8XcOnmQklEZflKFiHHPPjqkI37Xm2e6u2gntmgIgSgDIVCWIxraARrbAel3L/Zmc6/3NwoULJD6yfuDO/3KOYU7hTv+pCxx22GHjZxRIXMVECB4OIATKKG4SBKxBUVidAooag9jPpUsdVTW9a0jgxsZKjzjiiPE5gB1waNzWLYSNZEAyDN6Bi6aMngc4wjXGZL7GaPzieF3TQMbGG8RAwkc8bV8a2SntqgIgMc8rXBWwJKVhwTVfxhQWb2KJg343WcxlwdYJWCDByL8pAlfPgmAJp4VkEQpIhBtUxHzGOlmpN3795Ep9Tng8EMFC0Tk51Hgpn+tTLyBgfbvP9YTLtRsT9A2jyGJslPVcHoO3oohcP+XlFSiyvjIu/DDW9kWNrBF4dozI7xSl911EO6VdVwDEGrg0DE/JlpViqjjeboLEIEAy2IAgMIq7ZZ3cL4ETnEobi2JNcmnIPgcnB0fkZFDXUzpFkuxyjjD9NKZ85rk+p1AUye9JW6OUhC2l5IKzHKt/6aLMwfNyKgcFVgMAdN0nTMUQgFheo25GwTN1EM9NeddzXU9B52oOO6H9ogBI7JU3txMiGL9jQPsKlBcX1AxSw2cphKQPHiVf7cIDsDL9SEN97hqWqZrGEvVhuxeLJDQvb+orC0Weo/iSHUX64vrFa9eL6Z4fBaCUmvhO0fIKPJCXbWG8guZ+oUe/BBiL92ygrv0qegota+gZjOf13nDaLdpvChACeFhfzRAIy9+svt2rl2NUaT0GJC9OXd7/rDNwiT6nUNx2Tr1ggSyP1QkxBERJWBscAKhJq3gQ5LPLXe5yW2fqwguusdgSbxQl8CxeSWyHEQhaSOOy4QWegUIJFa4nxAA9YbGuVSCKbD4BzC1/2pC5P2i/KwAK4DMpbtAkMRZz1MYxvd27RpgWhZJmEYbmdwytq3aUhMCR1Il3UFvghYQidQQulqfgZYQEqZprYRBjyBdde5/OeDC+/R5BzyRsfUg7E364dB5KMyeKYq7utXOpt8IJjAoT4UmeEWC4nYWd7dABUQAkdqvrE17VdpMnVEujcdmV5MusFHaIAmAs6wrTfM6CWS3hES60TeiskovlRuOKuVpeQmGIy2eZ2WBJITAfmOW5qqL53WfGKW2ldMbic03/+oZXLB/34jbFSXjBh3iY4ANKsepunt2gA6YAIbET85P+VSGyHDFPkaOt3ceyuVrCdX1QfeJz4rv/UTQbPAhfSZhlx6X7aQyUDci0wqcfgs+qHO8TRW2bvgkrlq7BHV5Y1UdvYwvllAlkm1uqeglj/naa2YEqZoUOuAIg7lUej5mYF2sOM1gHRWC9vRjIam3tYmVB7IRFIQIc9ecz7l0jtAjQ/2EGoSBb0QMQrSTCGFGs3JPMhPBcrz/CVPuHM+TuvRKzjMc4ZQituzdW/VnJ7HmLA0EHRQFCLFPsjfWH4X4SnmaXEKA0tb2KtSodA2XiLbdMkBjr/lho9QwE6Wfq9kkN/d+1qQFkDH7XeB5WDugBtyp9PaELLTISXoeVt4IPyANEeYzeuwkHig6qAoSsogGJYXh1jwRFIGIva1NZ67nYEOaLofqUarJyfYutyfEJEnCD1jXeQNy2gYX1q8IpK0vlpLI8kcyAwKdKy4pWFJFypA5hLhVDELy5eLYQ0742fzDokFAAxApU+7j+uMYK9FhQrFqKKB0DDoG7VVbv1BmEE6mbPJxHkZ0AZSkLW/blUVog2iOKAC+ozontQCplNcakrvFmUWKCV+zZyfr9btMhowAhYI/7lMaxnsTbKEKUITUC8R3z7dBRyBFW5tb8t0uUguIo1QpJagsU0RiDPSpmSA2AJ1B0EqJW2cdwoOmQU4AQAQJQ0q28PYyZVRmC/JMeasCW62EB7t8mExsqhQTVQGVbXoO1y+OlmRrhygiAMXV9a/W2wXu1WtwXOoSJFjtUL5UsxFj9TYmljL1vFDlU6JBVgEqKQsKDtC7fJBZlqDE23sHnlCLCCLDzGQXRByVhmWlqB1w0pYoyRelYt3vb+kPK1ElJfQY7wA29s4YPRbpUKEAlAJAyqL8TWur+hEwQFIJgqjuuHiOIn5LU5rPWout9Po/AKQUv4HcAEsi024f3WHWH0qFCFGDn+4oOEmVl0M4hBSJYQBmV0JKzBzgmBSRkShIFySJV6gCxaFafQk/iu2ulbgCoOoaCFe80lRlcGmjDOwvth5dWIggoXpwXw5WFKYbNGRZjFFxgA2VnAI73ACKlmAQrTVRSVhYmZIsxNmPakSQN5H2WdgRf2uj/AInEXx6jVfVSAAAAAElFTkSuQmCC"}
;
  window.__TGA_OFFICIAL_SHIELDS_B64 = OFFICIAL_SHIELDS;
  if (lower.includes('atletico') && OFFICIAL_SHIELDS['atletico-go']) return OFFICIAL_SHIELDS['atletico-go'];
  if (lower.includes('anapolina') && OFFICIAL_SHIELDS['anapolina']) return OFFICIAL_SHIELDS['anapolina'];
  if (lower.includes('aparecidense') && OFFICIAL_SHIELDS['aparecidense']) return OFFICIAL_SHIELDS['aparecidense'];
  if ((lower.includes('goianesia') || lower.includes('goianeisa')) && OFFICIAL_SHIELDS['goianesia']) return OFFICIAL_SHIELDS['goianesia'];
  if (lower.includes('goias') && OFFICIAL_SHIELDS['goias']) return OFFICIAL_SHIELDS['goias'];
  if (lower.includes('crac') && OFFICIAL_SHIELDS['crac']) return OFFICIAL_SHIELDS['crac'];
  if (lower.includes('goiatuba') && OFFICIAL_SHIELDS['goiatuba']) return OFFICIAL_SHIELDS['goiatuba'];
  if (lower.includes('jataiense') && OFFICIAL_SHIELDS['jataiense']) return OFFICIAL_SHIELDS['jataiense'];

  let bg1 = '#1e293b';
  let bg2 = '#0f172a';
  let border = '#eab308';
  let text = '#ffffff';
  let sigla = 'FC';

  if (lower.includes('vila nova')) {
    bg1 = '#dc2626'; bg2 = '#991b1b'; border = '#ffffff'; sigla = 'VNFC';
  } else if (lower.includes('anapolis')) {
    bg1 = '#b91c1c'; bg2 = '#1e3a8a'; border = '#ffffff'; sigla = 'AFC';
  } else if (lower.includes('inhumas')) {
    bg1 = '#6d28d9'; bg2 = '#4c1d95'; border = '#ffffff'; sigla = 'IEC';
  } else if (lower.includes('goiania')) {
    bg1 = '#18181b'; bg2 = '#09090b'; border = '#ffffff'; sigla = 'GEC';
  } else if (lower.includes('morrinhos')) {
    bg1 = '#15803d'; bg2 = '#ca8a04'; border = '#ffffff'; sigla = 'MFC';
  } else if (lower.includes('ipora')) {
    bg1 = '#1d4ed8'; bg2 = '#eab308'; border = '#ffffff'; sigla = 'IPEC';
  } else if (lower.includes('abecat')) {
    bg1 = '#ea580c'; bg2 = '#18181b'; border = '#ffffff'; sigla = 'ABE';
  } else if (lower.includes('santa helena')) {
    bg1 = '#dc2626'; bg2 = '#7f1d1d'; border = '#ffffff'; sigla = 'SHEC';
  } else if (lower.includes('mineiros')) {
    bg1 = '#16a34a'; bg2 = '#064e3b'; border = '#ffffff'; sigla = 'MEC';
  } else if (lower.includes('trindade')) {
    bg1 = '#1e40af'; bg2 = '#dc2626'; border = '#ffffff'; sigla = 'TAC';
  } else {
    const words = raw.replace(/[^a-zA-ZÀ-ÿ\s]/g, '').trim().split(/\s+/).filter(Boolean);
    if (words.length >= 2) {
      sigla = (words[0][0] + words[1][0] + (words[2] ? words[2][0] : '')).toUpperCase();
    } else if (words.length === 1) {
      sigla = words[0].slice(0, 3).toUpperCase();
    }
  }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
    <defs>
      <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${bg1}"/>
        <stop offset="100%" stop-color="${bg2}"/>
      </linearGradient>
    </defs>
    <circle cx="48" cy="48" r="45" fill="url(#g)" stroke="${border}" stroke-width="5"/>
    <path d="M48 14 L74 24 L74 49 C74 66 62 77 48 83 C34 77 22 66 22 49 L22 24 Z" fill="none" stroke="rgba(255,255,255,0.28)" stroke-width="2.5"/>
    <text x="48" y="55" text-anchor="middle" fill="${text}" font-family="Arial, sans-serif" font-weight="900" font-size="${sigla.length > 3 ? '18' : '21'}">${sigla}</text>
  </svg>`;

  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}

function getMatchTeamsAndLogos(jogo) {
  if (!jogo) {
    return {
      team1Name: 'E.C. Rio Verde',
      team1Logo: '/assets/escudo-ecrv.jpg',
      team2Name: 'Adversário',
      team2Logo: getAutoClubShieldDataUri('Adversário'),
      opponentName: 'Adversário',
      opponentLogo: getAutoClubShieldDataUri('Adversário')
    };
  }

  const rawConfronto = String(jogo.adversario || '').trim();
  const partes = rawConfronto.split(/\s+(?:x|vs\.?|×)\s+/i);
  const isCasa = isJogoEmCasa(jogo);

  let team1Name = 'E.C. Rio Verde';
  let team2Name = 'Adversário';

  if (partes.length >= 2) {
    team1Name = partes[0].trim();
    team2Name = partes.slice(1).join(' x ').trim();
  } else if (rawConfronto) {
    if (isRioVerdeTeamName(rawConfronto)) {
      team1Name = 'E.C. Rio Verde';
      team2Name = 'Adversário';
    } else if (isCasa) {
      team1Name = 'E.C. Rio Verde';
      team2Name = rawConfronto;
    } else {
      team1Name = rawConfronto;
      team2Name = 'E.C. Rio Verde';
    }
  }

  const t1IsEcrv = isRioVerdeTeamName(team1Name);
  const t2IsEcrv = isRioVerdeTeamName(team2Name);

  const oppName = t1IsEcrv ? team2Name : (t2IsEcrv ? team1Name : team2Name);
  const useDefaultInverted = isInvertedBwClub(oppName) && !jogo.logoInvertidoManual;
  const oppLogo = (!useDefaultInverted && jogo.logoAdversarioDataUrl && jogo.logoAdversarioDataUrl.trim())
    ? jogo.logoAdversarioDataUrl.trim()
    : getAutoClubShieldDataUri(oppName);

  const team1Logo = t1IsEcrv ? '/assets/escudo-ecrv.jpg' : oppLogo;
  const team2Logo = t2IsEcrv ? '/assets/escudo-ecrv.jpg' : (t1IsEcrv ? oppLogo : getAutoClubShieldDataUri(team2Name));

  const cleanDisplay = (n) => n
    .replace(/Esporte Clube Rio Verde\s*\(?E\.?C\.?R\.?V\.?\)?/i, 'E.C. Rio Verde')
    .trim();

  return {
    team1Name: cleanDisplay(team1Name),
    team1Logo,
    team2Name: cleanDisplay(team2Name),
    team2Logo,
    opponentName: cleanDisplay(oppName),
    opponentLogo: oppLogo
  };
}

function renderHomeBentoModel1() {
  // 1. Card Matchday no Hero (Identifica o Próximo Jogo automaticamente pela Data Mais Próxima)
  const matchBox = document.getElementById('homeMatchdayBox');
  if (matchBox) {
    const jogos = Array.isArray(appState.jogosEcrv) ? appState.jogosEcrv : [];
    const proxJogo = getNextUpcomingJogo(jogos);
    const sortedAbertos = getJogosSortedByDate(jogos).filter(j => j.status !== 'Encerrado');
    const proxJogoCasa = sortedAbertos.find(j => isJogoEmCasa(j));

    if (!proxJogo) {
      matchBox.innerHTML = `
        <div class="m1-matchday-top">
          <span>⚽ PRÓXIMO JOGO DO E.C.R.V.</span>
          <span class="m1-matchday-pill">Calendário Oficial</span>
        </div>
        <div class="m1-matchday-scoreboard">
          <div class="m1-team-col">
            <img src="/assets/escudo-ecrv.jpg" alt="E.C.R.V." />
            <strong>E.C. Rio Verde</strong>
          </div>
          <div class="m1-matchday-vs">
            <small>VELOSÃO</small>
            <strong>E.C.R.V.</strong>
            <span>Em breve</span>
          </div>
          <div class="m1-team-col">
            <img src="/assets/logo-tga.jpg" alt="TGA" />
            <strong>Garra Alviverde</strong>
          </div>
        </div>
        <div class="m1-matchday-stadium">
          📍 <strong>Estádio Mozart Veloso do Carmo (Velosão)</strong> • Rio Verde - GO
        </div>
      `;
    } else {
      const info = getMatchTeamsAndLogos(proxJogo);
      const isCasa = isJogoEmCasa(proxJogo);
      const mandoBadgeText = isCasa ? '🏟️ Em Casa (Velosão)' : '🚌 Fora de Casa';
      const rodadaText = proxJogo.rodada ? ` • ${proxJogo.rodada}` : '';

      const nextHomeHintHtml = (!isCasa && proxJogoCasa && proxJogoCasa.id !== proxJogo.id)
        ? `<div style="background:rgba(6,78,59,0.55); border:1px solid rgba(16,185,129,0.38); border-radius:10px; padding:7px 10px; margin-bottom:10px; font-size:0.73rem; color:#d1fae5; display:flex; justify-content:space-between; align-items:center; gap:6px;">
             <span>🏟️ <strong>Próximo em Casa (Velosão):</strong> ${formatDateBR(proxJogoCasa.dataJogo)} — ${escapeHtml(proxJogoCasa.adversario)}</span>
             <span style="color:#fde047; font-weight:800;">${escapeHtml(proxJogoCasa.rodada || '')}</span>
           </div>`
        : '';

      matchBox.innerHTML = `
        <div class="m1-matchday-top">
          <span>⚽ PRÓXIMO JOGO DO E.C.R.V.${escapeHtml(rodadaText.toUpperCase())}</span>
          <span class="m1-matchday-pill" style="${!isCasa ? 'background:rgba(59,130,246,0.22);color:#bfdbfe;border-color:rgba(96,165,250,0.45);' : ''}">${escapeHtml(mandoBadgeText)}</span>
        </div>
        <div class="m1-matchday-scoreboard">
          <div class="m1-team-col">
            <img src="${info.team1Logo}" alt="${escapeHtml(info.team1Name)}" style="background:#ffffff; object-fit:contain; padding:2px;" />
            <strong>${escapeHtml(info.team1Name)}</strong>
          </div>
          <div class="m1-matchday-vs">
            <small>${escapeHtml(proxJogo.campeonato || 'CAMPEONATO GOIANO')}${escapeHtml(rodadaText)}</small>
            <strong>${proxJogo.placar ? escapeHtml(proxJogo.placar) : 'VS'}</strong>
            <span>${formatDateBR(proxJogo.dataJogo)} • ${escapeHtml(proxJogo.horario || '16:00')}</span>
          </div>
          <div class="m1-team-col">
            <img src="${info.team2Logo}" alt="${escapeHtml(info.team2Name)}" style="background:#ffffff; object-fit:contain; padding:2px;" />
            <strong>${escapeHtml(info.team2Name)}</strong>
          </div>
        </div>
        <div class="m1-matchday-stadium">
          📍 <strong>${escapeHtml(proxJogo.estadio || 'Estádio Mozart Veloso do Carmo (Velosão)')}</strong>
        </div>
        ${nextHomeHintHtml}
      `;
    }
  }

  // 2. Bento Grid: Vitrine Rápida da Loja Oficial (até 3 produtos)
  const lojaGrid = document.getElementById('homeBentoLojaGrid');
  if (lojaGrid) {
    const mats = (Array.isArray(appState.materiais) ? appState.materiais : []).slice(0, 3);
    if (mats.length === 0) {
      lojaGrid.innerHTML = `
        <div class="m1-product-card" style="grid-column: 1 / -1; text-align:center;">
          <h4>👕 Loja Oficial Garra Alviverde</h4>
          <p>Clique em "Ver Loja Completa" para conferir nossos materiais oficiais.</p>
        </div>
      `;
    } else {
      lojaGrid.innerHTML = mats.map((m) => {
        const disponivel = m.estoqueStatus !== 'Esgotado';
        return `
          <div class="m1-product-card">
            <div>
              <div class="m1-product-pills">
                <span class="m1-pill-emerald">Masculino & Feminino</span>
                <span class="m1-pill-gold">Adulto & Infantil</span>
              </div>
              <div class="m1-product-thumb">
                <img src="${m.fotoDataUrl || '/assets/logo-tga.jpg'}" alt="${escapeHtml(m.nome)}" />
              </div>
              <h4>${escapeHtml(m.nome)}</h4>
              <p>Tamanhos: ${escapeHtml(m.tamanhos || 'P, M, G, GG, XG')} ${m.descricao ? `• ${escapeHtml(m.descricao)}` : ''}</p>
            </div>
            <div class="m1-product-footer">
              <div class="m1-product-price">
                <small>Preço Sócio TGA:</small>
                <strong>${formatBRL(m.valorSocio)}</strong>
                <span>${formatBRL(m.valorNaoSocio)}</span>
              </div>
              <button type="button" class="m1-btn-emerald" data-bento-select-mat="${m.id}">
                ${disponivel ? '🛒 Pedir' : 'Ver Loja'}
              </button>
            </div>
          </div>
        `;
      }).join('');

      lojaGrid.querySelectorAll('[data-bento-select-mat]').forEach((btn) => {
        btn.addEventListener('click', () => {
          const matId = btn.getAttribute('data-bento-select-mat');
          openFeatureWindow('windowLojaMateriais');
          const sel = document.getElementById('pedSelectMaterial');
          if (sel && Array.from(sel.options).some(o => o.value === matId)) {
            sel.value = matId;
            updatePedidoMaterialPriceDisplay();
          }
        });
      });
    }
  }

  // 3. Bento Card: Sócio Solidário / Eventos & Doação de Sangue
  const evBox = document.getElementById('homeBentoEventoBox');
  if (evBox) {
    const eventos = Array.isArray(appState.eventosTga) ? appState.eventosTga : [];
    const proxEv = eventos.find(e => e.status !== 'Encerrado') || eventos[0];
    const proxTitulo = proxEv ? `${getEventoCategoryIcon(proxEv.categoria)} Próxima: ${proxEv.titulo} (${formatDateBR(proxEv.dataEvento)})` : '📅 Campanhas Abertas em Rio Verde - GO';

    evBox.innerHTML = `
      <div>
        <div class="m1-bento-card-top">
          <span class="m1-tag-gold">🩸 SÓCIO SOLIDÁRIO TGA</span>
          <span class="m1-tag-sub">🎁 Vale 1 Parcela Isenta (-R$ 35,00)</span>
        </div>
        <h3>Eventos & Ações Sociais da Garra Alviverde</h3>
        <p>
          Campanha de <strong>Doação de Sangue</strong>, <strong>Páscoa Solidária</strong>, <strong>Dia das Crianças</strong> e <strong>Natal Solidário</strong>. Participe e ganhe isenção de 1 parcela no seu plano de Sócio!
        </p>
      </div>
      <div class="m1-bento-card-footer">
        <span style="font-size:0.78rem; color:#6ee7b7; font-weight:700;">${escapeHtml(proxTitulo)}</span>
        <button type="button" class="m1-btn-gold-lg" style="padding:9px 16px; font-size:0.8rem; border-radius:11px;" data-bento-open-eventos="true">
          🤝 Participar Agora →
        </button>
      </div>
    `;

    evBox.querySelector('[data-bento-open-eventos]')?.addEventListener('click', () => {
      openFeatureWindow('windowEventosTga');
    });
  }
}

function renderHeroNextCaravana() {
  const box = document.getElementById('heroNextCaravanaBox');
  if (!box) return;
  const abertas = appState.caravanas.filter(c => c.status === 'Aberta');
  if (abertas.length === 0) {
    box.innerHTML = `<p>Acompanhe o Esporte Clube Rio Verde fora de casa com os ônibus oficiais da Garra Alviverde saindo do Estádio Velosão.</p>`;
    return;
  }
  const next = abertas[0];
  const vagasRestantes = Math.max(0, next.vagasTotais - next.vagasOcupadas);
  box.innerHTML = `
    <h4>🚌 ${escapeHtml(next.jogo)} — ${escapeHtml(next.adversario)}</h4>
    <div class="hero-next-meta">
      <div>📅 <strong>Data / Saída:</strong> ${formatDateBR(next.dataJogo)} às ${escapeHtml(next.horarioSaida)}</div>
      <div>💰 <strong>PIX Sócio TGA:</strong> <strong style="color:#fde047;">${formatBRL(next.valorSocio)}</strong> | Não-Sócio: ${formatBRL(next.valorNaoSocio)} • Restam ${vagasRestantes} vagas</div>
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

function isSocioBateria50(s) {
  if (!s) return false;
  if (Boolean(s.isento) || String(s.statusPagamento || '').includes('Isento (Diretoria)') || String(s.formaPagamento || '').includes('Isento — Diretoria')) {
    return false;
  }
  return Boolean(s.isencaoBateria50)
    || Number(s.percentualIsencao) === 50
    || String(s.statusPagamento || '').includes('Bateria 50%')
    || String(s.formaPagamento || '').includes('50% Isento')
    || String(s.motivoIsencao || '').includes('50%');
}

function getSocioParcelasIsentas(s) {
  if (!s) return 0;
  if (isSocioBateria50(s)) return 0;
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
  if (!s) return 0;
  if (isSocioBateria50(s)) return 52.5;
  return getSocioParcelasIsentas(s) * 35;
}

function hasSocioAnyIsencao(s) {
  return getSocioParcelasIsentas(s) > 0 || isSocioBateria50(s);
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
  if (isSocioBateria50(socio)) return true;
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
  const isBateria50 = isSocioBateria50(socio);
  const qtdIsentas = getSocioParcelasIsentas(socio);
  const qtdPagasPix = getSocioParcelasPagasPix(socio);
  const valorIsento = getSocioValorIsento(socio);
  const valorPago = getSocioValorPagoEfetivo(socio);
  const valorLiquidoPrevisto = getSocioValorLiquidoPrevisto(socio);
  const faltaPagar = getSocioFaltaPagarPix(socio);
  const isAtivo = isSocioEligibleForBenefits(socio);
  const isQuitado = isIsento || faltaPagar === 0 || (!isBateria50 && (qtdPagasPix + qtdIsentas >= 3));
  const motivoIsencao = socio.motivoIsencao || (isIsento ? '👑 Diretoria TGA' : (isBateria50 ? '🥁 Turma da Bateria TGA (50%)' : '🩸 Ação Social TGA'));

  const badgeEl = document.getElementById('portalSocioBadgeStatus');
  const sealEl = document.getElementById('portalSocioValidSeal');
  if (badgeEl) {
    badgeEl.textContent = isIsento
      ? '👑 DIRETORIA TGA • ISENTO'
      : (isBateria50
        ? (isQuitado ? '🥁 BATERIA TGA • QUITADO' : '🥁 BATERIA TGA • 50% ISENTO')
        : (isQuitado
          ? '🏆 SÓCIO QUITADO TOTAL'
          : (isAtivo ? '✅ SÓCIO EM DIA (ATIVO)' : '⏳ PENDENTE PIX')));
    badgeEl.style.background = isAtivo ? '#eab308' : '#fef3c7';
    badgeEl.style.color = isAtivo ? '#052e16' : '#92400e';
  }
  if (sealEl) {
    sealEl.textContent = isIsento
      ? '● DIRETORIA TGA • BENEFÍCIOS LIBERADOS ✔'
      : (isBateria50
        ? '● TURMA DA BATERIA TGA (50% ISENTO) ✔'
        : (isAtivo ? '● BENEFÍCIOS LIBERADOS ✔' : '● AGUARDANDO 1ª PARCELA / PIX'));
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
      : (isBateria50
        ? '🥁 Turma da Bateria — 50% Isento (-R$ 52,50)'
        : (qtdIsentas > 0
          ? `🎁 ${qtdIsentas} Parcela(s) Isenta(s) (-${formatBRL(valorIsento)})`
          : (socio.formaPagamento || 'À Vista no PIX (R$ 105,00)')));
  }

  // Grade das 3 Parcelas (ou 2 metades de 50% quando for Bateria 50%)
  const parcGrid = document.getElementById('portalSocioParcelasGrid');
  if (parcGrid) {
    if (isBateria50) {
      parcGrid.innerHTML = `
        <div style="padding:10px; border-radius:10px; text-align:center; background:#fef9c3; border:2px solid #eab308;">
          <div style="font-size:0.75rem; font-weight:800; color:#854d0e;">50% BATERIA TGA</div>
          <div style="font-size:0.95rem; font-weight:900; color:#713f12; margin:2px 0;">ISENTO (-R$ 52,50)</div>
          <div style="font-size:0.69rem; font-weight:800; color:#a16207;">🥁 Turma da Bateria</div>
        </div>
        <div style="padding:10px; border-radius:10px; text-align:center; background:${faltaPagar === 0 ? '#dcfce7' : '#fef3c7'}; border:1px solid ${faltaPagar === 0 ? '#86efac' : '#fde68a'}; grid-column: span 2;">
          <div style="font-size:0.75rem; font-weight:800; color:${faltaPagar === 0 ? '#166534' : '#92400e'};">50% COTA SÓCIO BATERIA</div>
          <div style="font-size:0.98rem; font-weight:900; color:${faltaPagar === 0 ? '#064e3b' : '#78350f'}; margin:2px 0;">R$ 52,50</div>
          <div style="font-size:0.72rem; font-weight:700; color:${faltaPagar === 0 ? '#15803d' : '#b45309'};">
            ${faltaPagar === 0 ? '✔ QUITADO NO PIX' : `⏳ Falta pagar ${formatBRL(faltaPagar)} no PIX`}
          </div>
        </div>
      `;
    } else {
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
          <span><strong>Saldo Isento:</strong> <strong style="color:#a16207;">${formatBRL(valorIsento)} (${isBateria50 ? '50% Bateria' : `${qtdIsentas} parc.`})</strong></span>
          <span><strong>Falta Pagar:</strong> <strong style="color:${faltaPagar > 0 ? '#b45309' : '#047857'};">${formatBRL(faltaPagar)}</strong></span>
        </div>
        ${(qtdIsentas > 0 || isBateria50) ? `<div style="margin-top:4px; font-size:0.8rem; color:#854d0e; font-weight:700;">🎁 Benefício aplicado: ${escapeHtml(motivoIsencao)} (-${formatBRL(valorIsento)} de R$ 105,00 • Líquido a pagar: ${formatBRL(valorLiquidoPrevisto)})</div>` : ''}
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

  const rawJogos = Array.isArray(appState.jogosEcrv) ? appState.jogosEcrv : [];
  const jogos = getJogosSortedByDate(rawJogos);
  const proxJogo = getNextUpcomingJogo(rawJogos);

  if (selectChk) {
    const currentVal = selectChk.value;
    const jogosCheckin = jogos.filter(j => isJogoEmCasa(j) && j.status !== 'Encerrado');
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
    const isCasa = isJogoEmCasa(j);
    const isEncerrado = j.status === 'Encerrado';
    const isNext = proxJogo && j.id === proxJogo.id;
    const info = getMatchTeamsAndLogos(j);
    return `
      <tr style="${isNext ? 'background:#f0fdf4;' : ''}">
        <td>
          <strong>${escapeHtml(j.campeonato || 'Campeonato Goiano')}</strong>
          ${isNext ? `<span style="display:inline-block; margin-left:6px; background:#eab308; color:#052e16; font-weight:900; font-size:0.68rem; padding:1px 7px; border-radius:999px;">⭐ PRÓXIMO JOGO</span>` : ''}
          <br>
          <small>${escapeHtml(j.rodada || '')}</small>
        </td>
        <td>
          <span class="status-badge" style="background:${isCasa ? '#dcfce7' : '#dbeafe'}; color:${isCasa ? '#166534' : '#1e40af'}; border:1px solid ${isCasa ? '#86efac' : '#93c5fd'}; font-weight:800;">
            ${isCasa ? '🏟️ EM CASA (Velosão)' : '🚌 FORA DE CASA'}
          </span>
        </td>
        <td>
          <div style="display:flex; align-items:center; gap:10px; flex-wrap:wrap;">
            <div style="display:flex; align-items:center; gap:7px;">
              <img src="${info.team1Logo}" alt="${escapeHtml(info.team1Name)}" style="width:38px; height:38px; border-radius:50%; object-fit:contain; background:#ffffff; border:2px solid #006437; padding:2px; flex-shrink:0;" />
              <strong style="font-size:0.94rem; color:#064e3b;">${escapeHtml(info.team1Name)}</strong>
            </div>
            <span style="background:${j.placar ? '#006437' : '#f1f5f9'}; color:${j.placar ? '#fde047' : '#475569'}; font-weight:900; font-size:0.8rem; padding:3px 9px; border-radius:999px; border:1px solid ${j.placar ? '#eab308' : '#cbd5e1'};">
              ${j.placar ? escapeHtml(j.placar) : 'VS'}
            </span>
            <div style="display:flex; align-items:center; gap:7px;">
              <img src="${info.team2Logo}" alt="${escapeHtml(info.team2Name)}" style="width:38px; height:38px; border-radius:50%; object-fit:contain; background:#ffffff; border:2px solid #eab308; padding:2px; flex-shrink:0;" />
              <strong style="font-size:0.94rem; color:#0f172a;">${escapeHtml(info.team2Name)}</strong>
            </div>
          </div>
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
  const totalIsentoSocios = appState.socios.reduce((acc, s) => acc + getSocioValorIsento(s), 0);
  const totalParcelasIsentas = appState.socios.reduce((acc, s) => acc + getSocioParcelasIsentas(s), 0);
  const totalSociosBateria50 = appState.socios.filter(s => isSocioBateria50(s)).length;
  const totalSociosComIsencao = appState.socios.filter(s => hasSocioAnyIsencao(s)).length;

  const pedidosBateriaIsentos = (appState.pedidosMateriais || []).filter(p => p.isentoBateria);
  const valorIsentoLojaBateria = pedidosBateriaIsentos.reduce((acc, p) => acc + (Number(p.valorOriginal) || (Number(p.valorUnitario) || 80) * (Number(p.quantidade) || 1)), 0);
  const totalIsentoReais = totalIsentoSocios + valorIsentoLojaBateria;

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
    const extraBateria = (totalSociosBateria50 > 0 || pedidosBateriaIsentos.length > 0)
      ? ` • Bateria: ${totalSociosBateria50} sócio(s) 50% / ${pedidosBateriaIsentos.length} camisa(s)`
      : '';
    kpiIsentoSubEl.textContent = `${totalSociosComIsencao} sócio(s) c/ isenção (${totalParcelasIsentas} parc.)${extraBateria}`;
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
  const countPlanoAcaoEl = document.getElementById('tabCountPlanoAcao');
  if (countPlanoAcaoEl) countPlanoAcaoEl.textContent = Math.max(8, (appState.jogosEcrv || []).length);
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
  const isentosParciaisList = appState.socios.filter(s => (getSocioParcelasIsentas(s) > 0 && getSocioParcelasIsentas(s) < 3) || isSocioBateria50(s));
  const isentosBateria50List = appState.socios.filter(s => isSocioBateria50(s));

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
  if (elParcSub) {
    elParcSub.textContent = `${qtdParcelasParciais} parc. ações + ${isentosBateria50List.length} sócio(s) Bateria 50%`;
  }
  if (elLiq) elLiq.textContent = formatBRL(previstoLiquidoSocios);
  if (elLiqSub) elLiqSub.textContent = `Arrecadado: ${formatBRL(recebidoSocios)} | Falta: ${formatBRL(faltaSocios)}`;

  const todosComIsencao = appState.socios.filter(s => hasSocioAnyIsencao(s));
  const pedidosBateriaIsentos = (appState.pedidosMateriais || []).filter(p => p.isentoBateria);
  const isMaster = Boolean(currentAdminUser && currentAdminUser.isMaster);

  if (todosComIsencao.length === 0 && pedidosBateriaIsentos.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding:18px;">Nenhum sócio ou material com saldo isento até o momento. Use os botões <strong>"👑 Isentar Parcela / Sócio"</strong> ou <strong>"🥁 Isentar 50% Bateria"</strong> na tabela abaixo para conceder isenção!</td></tr>`;
    return;
  }

  const rowsSociosHtml = todosComIsencao.map((s) => {
    const isBat50 = isSocioBateria50(s);
    const qtdIsentas = getSocioParcelasIsentas(s);
    const valIsento = getSocioValorIsento(s);
    const valPago = getSocioValorPagoEfetivo(s);
    const valFalta = getSocioFaltaPagarPix(s);
    const motivo = s.motivoIsencao || (isBat50 ? '🥁 Turma da Bateria TGA — Isenção 50%' : (qtdIsentas === 3 ? '👑 Membro da Diretoria TGA' : '🩸 Ação Social / Doação de Sangue TGA'));
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
          <strong>${isBat50 ? '50% do Plano (-R$ 52,50)' : `${qtdIsentas} de 3 parcela(s)`}</strong>
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

  const rowsLojaBateriaHtml = pedidosBateriaIsentos.map((p) => {
    const valOrig = Number(p.valorOriginal) || ((Number(p.valorUnitario) || 80) * (Number(p.quantidade) || 1));
    return `
      <tr style="background:#fefce8;">
        <td>
          <strong>👕 [LOJA] ${escapeHtml(p.compradorNome)}</strong><br>
          <small>Material: ${escapeHtml(p.materialNome)} (${escapeHtml(p.modeloGenero || 'Masculino')} • ${escapeHtml(p.faixaEtaria || 'Adulto')} • Tam: ${escapeHtml(p.tamanho)})</small>
        </td>
        <td>
          <span class="status-badge" style="background:#dcfce7; color:#166534; border:1px solid #16a34a; font-weight:800;">
            🥁 Camiseta / Material — Turma da Bateria (100% Isento)
          </span>
        </td>
        <td>
          <strong>100% Isento (${p.quantidade || 1} un.)</strong>
        </td>
        <td>
          <strong style="color:#a16207; font-size:0.95rem;">${formatBRL(valOrig)}</strong>
        </td>
        <td>
          <strong style="color:#047857;">R$ 0,00</strong>
        </td>
        <td>
          <strong style="color:#047857;">Isento Bateria ✔</strong>
        </td>
        <td>
          <small style="color:#065f46; font-weight:700;">Loja de Materiais</small>
        </td>
      </tr>
    `;
  }).join('');

  tbody.innerHTML = rowsSociosHtml + rowsLojaBateriaHtml;

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
  const isBat50 = isSocioBateria50(socio);
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
        <span>💵 <strong>Pago em PIX:</strong> ${formatBRL(valPago)}</span>
        <span>👑 <strong>Isento Atual:</strong> ${formatBRL(valIsento)} (${isBat50 ? '50% Bateria' : `${qtdIsentasAtual} parc.`})</span>
        <span>⏳ <strong>Falta Pagar:</strong> ${formatBRL(valFalta)}</span>
      </div>
    `;
  }

  const defaultChoice = isBat50 ? 'bateria50' : (qtdIsentasAtual > 0 ? String(qtdIsentasAtual) : '1');
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
      : (defaultChoice === 'bateria50'
        ? '🥁 Turma da Bateria TGA — Isenção 50%'
        : '🩸 Campanha de Doação de Sangue TGA');
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
      || (statusFilter === 'bateria_50' && isSocioBateria50(s))
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
    const isBat50 = isSocioBateria50(s);
    const qtdIsentas = getSocioParcelasIsentas(s);
    const qtdPagasPix = getSocioParcelasPagasPix(s);
    const valorIsento = getSocioValorIsento(s);
    const valorLiquido = getSocioValorLiquidoPrevisto(s);
    const valorJaPago = getSocioValorPagoEfetivo(s);
    const faltaPagar = getSocioFaltaPagarPix(s);
    const isPaid = faltaPagar === 0 || isIsento || s.statusPagamento === 'Pago / Ativo';
    const isPartial = !isPaid && (qtdPagasPix > 0 || qtdIsentas > 0 || isBat50);
    const isParcelado = !isIsento && !isBat50 && (String(s.formaPagamento || '').includes('3x') || qtdIsentas > 0);

    const cleanPhone = (s.whatsapp || '').replace(/\D/g, '');
    const msgCobrancaOuContato = isIsento
      ? `\uD83D\uDFE2\u26AA Salve ${s.nome}! Aqui é da Diretoria da ${appState.config.nomeTorcida} referente à sua Carteirinha Oficial de Diretor Isento.`
      : (isBat50
        ? `\uD83D\uDFE2\u26AA Salve ${s.nome}! Aqui é da Diretoria da ${appState.config.nomeTorcida}. Sua inscrição de Sócio Garra está com 50% de Isenção da Turma da Bateria (Valor a pagar: ${formatBRL(valorLiquido)})!`
        : (qtdIsentas > 0
          ? `\uD83D\uDFE2\u26AA Salve ${s.nome}! Aqui é da Diretoria da ${appState.config.nomeTorcida}. Você possui ${qtdIsentas} parcela(s) isenta(s) (-${formatBRL(valorIsento)}) no seu Sócio Garra!`
          : (isParcelado
            ? `\uD83D\uDFE2\u26AA Salve ${s.nome}! Aqui é da Diretoria da ${appState.config.nomeTorcida} referente ao seu Sócio Garra (${s.formaPagamento}) e envio dos boletos das parcelas.`
            : `\uD83D\uDFE2\u26AA Salve ${s.nome}! Aqui é da Diretoria da ${appState.config.nomeTorcida} referente à sua inscrição de Sócio Garra Alviverde.`)));
    const waLink = `https://api.whatsapp.com/send?phone=55${cleanPhone.replace(/^55/, '')}&text=${encodeURIComponent(msgCobrancaOuContato)}`;
    const numCamisaDisplay = s.numeroCamisa ? `Nº ${s.numeroCamisa}` : 'Nº —';

    let btnPixLabel = '✔ Confirmar PIX';
    if (isBat50) {
      btnPixLabel = isPaid ? 'Voltar PIX p/ R$ 0' : `✔ Confirmar PIX (${formatBRL(faltaPagar)})`;
    } else if (isParcelado) {
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

    const motivoBadgeHtml = (qtdIsentas > 0 || isBat50)
      ? `<div style="margin-top:3px; display:inline-block; background:${isBat50 ? '#dcfce7' : '#fef08a'}; color:${isBat50 ? '#166534' : '#713f12'}; border:1px solid ${isBat50 ? '#16a34a' : '#eab308'}; padding:1px 7px; border-radius:999px; font-size:0.71rem; font-weight:800;">
           ${escapeHtml(s.motivoIsencao || (isIsento ? '👑 Diretoria TGA' : (isBat50 ? '🥁 Turma da Bateria TGA (50%)' : '🩸 Ação Social TGA')))} (-${formatBRL(valorIsento)})
         </div><br>`
      : '';

    const planoColHtml = isIsento
      ? `<strong style="color:#047857;">👑 Isento Total — Diretoria TGA</strong><br>
         ${motivoBadgeHtml}
         <small style="color:#065f46; font-weight:800;">3/3 Parcelas Isentas • Benefícios 100% Ativos</small><br>
         <small>Camisa: <strong>${s.tamanhoCamisa} (${numCamisaDisplay})</strong> | Sangue: ${s.tipoSanguineo}</small>`
      : `<strong>${isBat50 ? '🥁 Turma da Bateria — 50% Isento' : (s.formaPagamento || 'À Vista no PIX (R$ 105,00)')}</strong><br>
         ${motivoBadgeHtml}
         <small style="color:${faltaPagar === 0 ? '#047857' : '#b45309'}; font-weight:700;">
           PIX: ${formatBRL(valorJaPago)} ${(qtdIsentas > 0 || isBat50) ? `| Isento: ${formatBRL(valorIsento)}` : ''} | ${faltaPagar > 0 ? `Falta: ${formatBRL(faltaPagar)}` : 'Quitado ✔'}
         </small><br>
         <small>Camisa: <strong>${s.tamanhoCamisa} (${numCamisaDisplay})</strong> | Sangue: ${s.tipoSanguineo}</small>`;

    const statusBadgeStyle = isIsento
      ? 'background:linear-gradient(135deg,#fef08a,#fde047); color:#052e16; border:1px solid #ca8a04; font-weight:800;'
      : (isBat50 && !isPaid
        ? 'background:#dcfce7; color:#166534; border:1px solid #16a34a; font-weight:800;'
        : (qtdIsentas > 0 && !isPaid
          ? 'background:#fef9c3; color:#854d0e; border:1px solid #eab308; font-weight:800;'
          : (isPartial ? 'background:#e0f2fe;color:#0369a1;' : '')));

    const statusTextDisplay = isIsento
      ? '👑 Isento Total (Diretoria)'
      : (isBat50
        ? (isPaid ? '🥁 Quitado (Bateria 50%)' : '🥁 Bateria 50% (Falta R$ 52,50)')
        : (isPaid && qtdIsentas > 0
          ? `✅ Quitado (${qtdIsentas} Parc. Isenta)`
          : (s.statusPagamento || 'Pendente PIX')));

    return `
      <tr>
        <td>
          <strong>\uD83D\uDC55 ${numCamisaDisplay}</strong><br>
          <small>${formatDateBR(s.createdAt)}</small>
        </td>
        <td>
          <strong>${s.nome}</strong> ${(qtdIsentas > 0 || isBat50) ? `<span title="Possui Isenção Master">${isBat50 ? '🥁' : '👑'}</span>` : ''}<br>
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
              <button type="button" class="btn-table" data-isentar-bateria50-socio="${s.id}" title="Isentar em 50% (-R$ 52,50) a Turma da Bateria na inscrição de sócio" style="background:${isBat50 ? '#fee2e2' : 'linear-gradient(135deg,#bbf7d0,#4ade80)'}; color:${isBat50 ? '#991b1b' : '#052e16'}; border:1px solid ${isBat50 ? '#f87171' : '#16a34a'}; font-weight:800;">
                ${isBat50 ? '↩️ Tirar 50% Bateria' : '🥁 Isentar 50% (Bateria)'}
              </button>
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

  // Botão EXCLUSIVO MASTER: Isentar em 50% (-R$ 52,50) a Turma da Bateria na inscrição de Sócio
  tbody.querySelectorAll('[data-isentar-bateria50-socio]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      if (!currentAdminUser || !currentAdminUser.isMaster) {
        showToast('🚫 Apenas o Usuário Master pode conceder isenção da Bateria.');
        return;
      }
      const id = btn.getAttribute('data-isentar-bateria50-socio');
      const idx = appState.socios.findIndex(x => x.id === id);
      if (idx === -1) return;
      const socio = appState.socios[idx];
      const jaEraBateria50 = isSocioBateria50(socio);
      const dirNome = currentAdminUser.nome || 'Jully Gabriel (Master)';
      const dirUsuario = currentAdminUser.usuario || 'jully';

      let updates = {};
      let audit = null;

      if (!jaEraBateria50) {
        const jaPago = getSocioValorPagoEfetivo(socio);
        const novoPago = Math.min(52.5, jaPago);
        const quitado = novoPago >= 52.5;
        updates = {
          isento: false,
          isencaoBateria50: true,
          percentualIsencao: 50,
          parcelasIsentas: 0,
          valorIsento: 52.5,
          motivoIsencao: '🥁 Turma da Bateria TGA — Isenção 50%',
          valorPlano: 52.5,
          valorPago: novoPago,
          statusPagamento: quitado ? 'Pago / Ativo' : '🥁 Bateria 50% (Pagar R$ 52,50)',
          formaPagamento: '🥁 Turma da Bateria — 50% Isento (R$ 52,50)',
          aprovadoPor: {
            nome: dirNome,
            usuario: dirUsuario,
            dataHora: new Date().toISOString(),
            status: '🥁 Isenção 50% — Turma da Bateria TGA (-R$ 52,50)'
          }
        };
        audit = buildAuditPayload(
          'Isenção Sócio',
          `Concedeu isenção de 50% (-R$ 52,50) da Turma da Bateria para o sócio ${socio.nome}`,
          `Plano reduzido de R$ 105,00 para R$ 52,50 (50% Isento — Turma da Bateria TGA)`
        );
      } else {
        updates = {
          isento: false,
          isencaoBateria50: false,
          percentualIsencao: 0,
          parcelasIsentas: 0,
          valorIsento: 0,
          motivoIsencao: '',
          valorPlano: 105,
          valorPago: 0,
          statusPagamento: 'Pendente PIX',
          formaPagamento: 'À Vista no PIX (R$ 105,00)',
          aprovadoPor: {
            nome: dirNome,
            usuario: dirUsuario,
            dataHora: new Date().toISOString(),
            status: 'Isenção 50% Bateria Removida'
          }
        };
        audit = buildAuditPayload(
          'Isenção Sócio',
          `Removeu isenção de 50% da Bateria do sócio ${socio.nome}`,
          `Retornou ao valor integral de R$ 105,00`
        );
      }

      appState.socios[idx] = { ...socio, ...updates };
      try {
        await fetch(`/api/socios/${id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...updates, _auditoria: audit })
        });
      } catch (e) {}

      saveLocalBackup();
      renderAll();
      showToast(
        !jaEraBateria50
          ? `🥁 Isenção de 50% (Turma da Bateria: paga apenas R$ 52,50) aplicada para ${socio.nome}!`
          : `↩️ Isenção de 50% da Bateria removida de ${socio.nome}.`
      );
    });
  });

  // Botão EXCLUSIVO DO USUÁRIO MASTER: Abre modal para Isentar 1, 2 ou 3 Parcelas (ou 50% Bateria)
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

      const isBat50 = isSocioBateria50(socio);
      const qtdIsentas = getSocioParcelasIsentas(socio);
      const valorLiquido = getSocioValorLiquidoPrevisto(socio);
      const qtdPagasAtual = getSocioParcelasPagasPix(socio);
      const isParcelado = !isBat50 && (String(socio.formaPagamento || '').includes('3x') || qtdIsentas > 0);
      const statusAntigo = socio.statusPagamento;

      let novoValorPago = 0;
      let novasParcelasPagas = 0;
      let novoStatus = 'Pendente PIX';

      if (isBat50) {
        if (getSocioFaltaPagarPix(socio) > 0) {
          novoValorPago = 52.5;
          novasParcelasPagas = 2;
          novoStatus = 'Pago / Ativo';
        } else {
          novoValorPago = 0;
          novasParcelasPagas = 0;
          novoStatus = '🥁 Bateria 50% (Pagar R$ 52,50)';
        }
      } else if (isParcelado) {
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
let currentEditMaterialPhotoDataUrl = '';

function openEditMaterialModal(matId) {
  const mat = (appState.materiais || []).find(x => x.id === matId);
  if (!mat) return;

  document.getElementById('editMatId').value = mat.id;
  document.getElementById('editMatNome').value = mat.nome || '';
  document.getElementById('editMatCategoria').value = mat.categoria || 'Material Oficial TGA';
  document.getElementById('editMatValorSocio').value = Number(mat.valorSocio) || 0;
  document.getElementById('editMatValorNaoSocio').value = Number(mat.valorNaoSocio) || 0;
  document.getElementById('editMatEstoqueStatus').value = mat.estoqueStatus === 'Esgotado' ? 'Esgotado' : 'Disponível';
  document.getElementById('editMatTamanhos').value = mat.tamanhos || 'P, M, G, GG, XG';
  document.getElementById('editMatDescricao').value = mat.descricao || '';

  currentEditMaterialPhotoDataUrl = mat.fotoDataUrl || '/assets/logo-tga.jpg';
  const previewImg = document.getElementById('editMatFotoPreviewImg');
  if (previewImg) previewImg.src = currentEditMaterialPhotoDataUrl;

  const fileInput = document.getElementById('editMatFotoInput');
  if (fileInput) fileInput.value = '';

  const modal = document.getElementById('modalEditMaterial');
  if (modal) modal.hidden = false;
}

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
              <button type="button" class="btn-table" data-edit-mat="${m.id}" style="background:#e0f2fe;color:#0369a1;border-color:#7dd3fc;font-weight:800;">
                ✏️ Editar
              </button>
              <button type="button" class="btn-table btn-approve" data-toggle-mat-status="${m.id}">
                ${m.estoqueStatus === 'Esgotado' ? 'Liberar Estoque' : 'Marcar Esgotado'}
              </button>
              <button type="button" class="btn-table btn-del" data-del-mat="${m.id}">🗑️</button>
            </div>
          </div>
        `).join('');

    matListEl.querySelectorAll('[data-edit-mat]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-edit-mat');
        openEditMaterialModal(id);
      });
    });

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
    const isMaster = Boolean(currentAdminUser && currentAdminUser.isMaster);
    if (peds.length === 0) {
      pedBodyEl.innerHTML = `<tr><td colspan="9" style="text-align:center; padding:22px;">Nenhuma encomenda ou pedido de material registrado ainda.</td></tr>`;
      return;
    }

    pedBodyEl.innerHTML = peds.map((p) => {
      const isBateria = Boolean(p.isentoBateria) || String(p.statusPix || '').includes('Isento');
      const isPago = isBateria || p.statusPix === 'PIX Confirmado' || p.statusPix === 'Entregue ✔';
      const modeloGenero = p.modeloGenero || 'Masculino';
      const faixaEtaria = p.faixaEtaria || 'Adulto';
      const isFem = modeloGenero === 'Feminino';
      const isInf = faixaEtaria === 'Infantil';
      const valOrig = Number(p.valorOriginal) || ((Number(p.valorUnitario) || 80) * (Number(p.quantidade) || 1));

      const cleanWa = String(p.whatsapp || '').replace(/\D/g, '');
      const waLink = `https://api.whatsapp.com/send?phone=55${cleanWa.replace(/^55/, '')}&text=${encodeURIComponent(`\uD83D\uDFE2\u26AA Salve ${p.compradorNome}! Aqui é da Diretoria da Garra Alviverde sobre o seu pedido de ${p.quantidade || 1}x ${p.materialNome} (${modeloGenero} • ${faixaEtaria} • Tam: ${p.tamanho}).`)}`;

      const modalidadeHtml = isBateria
        ? `<span class="status-badge" style="background:#fef08a; color:#713f12; border:1px solid #eab308; font-weight:800;">
             🥁 Isento — Bateria TGA
           </span><br>
           <strong style="color:#047857;">R$ 0,00</strong>
           <small style="color:#64748b; text-decoration:line-through; margin-left:4px;">${formatBRL(valOrig)}</small>`
        : `<span class="status-badge" style="background:${p.isSocioDesconto ? '#dcfce7' : '#f1f5f9'}; color:${p.isSocioDesconto ? '#166534' : '#334155'};">
             ${p.isSocioDesconto ? '🟢 Preço Sócio TGA' : '⚪ Não-Sócio'}
           </span><br>
           <strong>${formatBRL(p.valorTotal)}</strong>`;

      const btnPixText = isBateria
        ? (p.statusPix === 'Entregue ✔' ? 'Voltar Isento Bateria' : '📦 Marcar Entregue')
        : (p.statusPix === 'Pendente PIX' ? '✔ Confirmar PIX' : (p.statusPix === 'PIX Confirmado' ? '📦 Marcar Entregue' : 'Voltar Pendente'));

      return `
        <tr>
          <td><small>${formatDateBR(p.createdAt)}</small></td>
          <td>
            <strong>👕 ${escapeHtml(p.materialNome)}</strong><br>
            <small>Tam: <strong>${escapeHtml(p.tamanho)}</strong> • Qtd: <strong>${p.quantidade || 1}</strong></small>
          </td>
          <td>
            <button type="button" class="btn-table" data-toggle-ped-genero="${p.id}" title="Clique para alternar entre Masculino e Feminino" style="background:${isFem ? '#fce7f3' : '#e0f2fe'}; color:${isFem ? '#9d174d' : '#0369a1'}; border:1px solid ${isFem ? '#f9a8d4' : '#7dd3fc'}; font-weight:800;">
              ${isFem ? '👚 Feminino' : '👕 Masculino'}
            </button>
          </td>
          <td>
            <button type="button" class="btn-table" data-toggle-ped-faixa="${p.id}" title="Clique para alternar entre Adulto e Infantil" style="background:${isInf ? '#fef3c7' : '#f0fdf4'}; color:${isInf ? '#92400e' : '#166534'}; border:1px solid ${isInf ? '#fde68a' : '#86efac'}; font-weight:800;">
              ${isInf ? '🧒 Infantil' : '🧑 Adulto'}
            </button>
          </td>
          <td>
            <strong>${escapeHtml(p.compradorNome)}</strong> ${isBateria ? '<span title="Turma da Bateria TGA">🥁</span>' : ''}<br>
            <small>CPF: ${escapeHtml(p.cpf)}</small>
          </td>
          <td>${escapeHtml(p.whatsapp)}</td>
          <td>${modalidadeHtml}</td>
          <td>
            <span class="status-badge ${isPago ? 'status-paid' : 'status-pending'}" style="${isBateria && p.statusPix !== 'Entregue ✔' ? 'background:#fef08a;color:#713f12;border:1px solid #eab308;font-weight:800;' : ''}">
              ${escapeHtml(p.statusPix || 'Pendente PIX')}
            </span>
          </td>
          <td>
            <div class="action-btns">
              <button type="button" class="btn-table btn-approve" data-toggle-ped-pix="${p.id}">
                ${btnPixText}
              </button>
              ${isMaster ? `
                <button type="button" class="btn-table" data-isentar-ped-bateria="${p.id}" title="Isentar a Turma da Bateria na compra de camiseta/material (R$ 0,00)" style="background:${isBateria ? '#fee2e2' : 'linear-gradient(135deg,#fde047,#eab308)'}; color:${isBateria ? '#991b1b' : '#052e16'}; border:1px solid ${isBateria ? '#f87171' : '#ca8a04'}; font-weight:800;">
                  ${isBateria ? '↩️ Tirar Isenção Bateria' : '🥁 Isentar Bateria'}
                </button>
              ` : ''}
              <a href="${waLink}" target="_blank" rel="noopener" class="btn-table btn-wa">💬 WhatsApp</a>
              <button type="button" class="btn-table btn-del" data-del-ped="${p.id}">🗑️</button>
            </div>
          </td>
        </tr>
      `;
    }).join('');

    // Alternar Modelo (Masculino / Feminino) diretamente na linha do pedido
    pedBodyEl.querySelectorAll('[data-toggle-ped-genero]').forEach((btn) => {
      btn.addEventListener('click', async () => {
        const id = btn.getAttribute('data-toggle-ped-genero');
        const ped = (appState.pedidosMateriais || []).find(x => x.id === id);
        if (!ped) return;
        ped.modeloGenero = ped.modeloGenero === 'Feminino' ? 'Masculino' : 'Feminino';
        try {
          await fetch(`/api/pedidos-materiais/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ modeloGenero: ped.modeloGenero })
          });
        } catch (e) {}
        saveLocalBackup();
        renderAll();
        showToast(`👕 Modelo de ${ped.compradorNome} alterado para: ${ped.modeloGenero}`);
      });
    });

    // Alternar Faixa Etária (Adulto / Infantil) diretamente na linha do pedido
    pedBodyEl.querySelectorAll('[data-toggle-ped-faixa]').forEach((btn) => {
      btn.addEventListener('click', async () => {
        const id = btn.getAttribute('data-toggle-ped-faixa');
        const ped = (appState.pedidosMateriais || []).find(x => x.id === id);
        if (!ped) return;
        ped.faixaEtaria = ped.faixaEtaria === 'Infantil' ? 'Adulto' : 'Infantil';
        try {
          await fetch(`/api/pedidos-materiais/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ faixaEtaria: ped.faixaEtaria })
          });
        } catch (e) {}
        saveLocalBackup();
        renderAll();
        showToast(`🧑 Faixa de ${ped.compradorNome} alterada para: ${ped.faixaEtaria}`);
      });
    });

    // Botão Master: Isentar Turma da Bateria na compra das camisetas / materiais
    pedBodyEl.querySelectorAll('[data-isentar-ped-bateria]').forEach((btn) => {
      btn.addEventListener('click', async () => {
        if (!currentAdminUser || !currentAdminUser.isMaster) {
          showToast('🚫 Apenas o Usuário Master pode isentar materiais para a Bateria.');
          return;
        }
        const id = btn.getAttribute('data-isentar-ped-bateria');
        const ped = (appState.pedidosMateriais || []).find(x => x.id === id);
        if (!ped) return;

        const jaIsento = Boolean(ped.isentoBateria) || String(ped.statusPix || '').includes('Isento');
        if (!jaIsento) {
          const valAntes = Number(ped.valorOriginal) || Number(ped.valorTotal) || ((Number(ped.valorUnitario) || 80) * (Number(ped.quantidade) || 1));
          ped.valorOriginal = valAntes;
          ped.isentoBateria = true;
          ped.valorTotal = 0;
          ped.statusPix = '🥁 Isento Bateria ✔';
        } else {
          const valRestaurado = Number(ped.valorOriginal) || ((Number(ped.valorUnitario) || 80) * (Number(ped.quantidade) || 1));
          ped.isentoBateria = false;
          ped.valorTotal = valRestaurado;
          ped.statusPix = 'Pendente PIX';
        }

        const audit = buildAuditPayload(
          'Loja TGA',
          ped.isentoBateria
            ? `Isentou compra de "${ped.materialNome}" para ${ped.compradorNome} (Turma da Bateria TGA — R$ 0,00)`
            : `Removeu isenção da Bateria do pedido de ${ped.compradorNome}`,
          `${ped.quantidade || 1}x ${ped.materialNome} (${ped.modeloGenero || 'Masculino'} • ${ped.faixaEtaria || 'Adulto'} • Tam: ${ped.tamanho})`
        );

        try {
          await fetch(`/api/pedidos-materiais/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              isentoBateria: ped.isentoBateria,
              valorOriginal: ped.valorOriginal,
              valorTotal: ped.valorTotal,
              statusPix: ped.statusPix,
              _auditoria: audit
            })
          });
        } catch (e) {}

        saveLocalBackup();
        renderAll();
        showToast(
          ped.isentoBateria
            ? `🥁 Material de ${ped.compradorNome} isentado para a Turma da Bateria (R$ 0,00)!`
            : `↩️ Isenção da Bateria removida do pedido de ${ped.compradorNome}.`
        );
      });
    });

    pedBodyEl.querySelectorAll('[data-toggle-ped-pix]').forEach((btn) => {
      btn.addEventListener('click', async () => {
        const id = btn.getAttribute('data-toggle-ped-pix');
        const ped = (appState.pedidosMateriais || []).find(x => x.id === id);
        if (!ped) return;
        if (ped.isentoBateria) {
          ped.statusPix = ped.statusPix === 'Entregue ✔' ? '🥁 Isento Bateria ✔' : 'Entregue ✔';
        } else {
          if (ped.statusPix === 'Pendente PIX') ped.statusPix = 'PIX Confirmado';
          else if (ped.statusPix === 'PIX Confirmado') ped.statusPix = 'Entregue ✔';
          else ped.statusPix = 'Pendente PIX';
        }

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

let currentJogoLogoEditTargetId = '';
let currentNovoJogoLogoDataUrl = '';

function openEditJogoModal(jogoId) {
  const jogo = (appState.jogosEcrv || []).find(x => x.id === jogoId);
  if (!jogo) return;

  const isCasa = isJogoEmCasa(jogo);
  document.getElementById('editJogoId').value = jogo.id;
  document.getElementById('editJogoCampeonato').value = jogo.campeonato || 'Campeonato Goiano';
  document.getElementById('editJogoRodada').value = jogo.rodada || 'Rodada 1';
  document.getElementById('editJogoMando').value = isCasa ? 'Em Casa (Velosão)' : 'Fora de Casa';
  document.getElementById('editJogoStatus').value = jogo.status || 'Agendado';
  document.getElementById('editJogoAdversario').value = jogo.adversario || '';
  document.getElementById('editJogoData').value = jogo.dataJogo || '';
  document.getElementById('editJogoHorario').value = jogo.horario || '16:00';
  document.getElementById('editJogoPlacar').value = jogo.placar || '';
  document.getElementById('editJogoEstadio').value = jogo.estadio || 'Estádio Mozart Veloso do Carmo (Velosão) — Rio Verde - GO';

  const modal = document.getElementById('modalEditJogo');
  if (modal) modal.hidden = false;
}

function renderAdminJogosTab() {
  const jogosListEl = document.getElementById('adminJogosList');
  const filterSelect = document.getElementById('filterCheckinJogoSelect');
  const chkBodyEl = document.getElementById('adminCheckinsJogosBody');

  const rawJogos = Array.isArray(appState.jogosEcrv) ? appState.jogosEcrv : [];
  const jogos = getJogosSortedByDate(rawJogos);

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
      : jogos.map((j) => {
          const info = getMatchTeamsAndLogos(j);
          const isCasa = isJogoEmCasa(j);
          return `
            <div class="manage-item" style="flex-direction:column; align-items:stretch; gap:8px;">
              <div style="display:flex; justify-content:space-between; align-items:center; gap:10px; flex-wrap:wrap;">
                <div style="display:flex; align-items:center; gap:10px;">
                  <div style="display:flex; align-items:center; gap:4px;">
                    <img src="${info.team1Logo}" alt="${escapeHtml(info.team1Name)}" style="width:36px; height:36px; border-radius:50%; object-fit:contain; background:#ffffff; border:2px solid #006437; padding:2px;" />
                    <img src="${info.team2Logo}" alt="${escapeHtml(info.team2Name)}" style="width:36px; height:36px; border-radius:50%; object-fit:contain; background:#ffffff; border:2px solid #eab308; padding:2px;" />
                  </div>
                  <div>
                    <strong>⚽ ${escapeHtml(info.team1Name)} x ${escapeHtml(info.team2Name)}</strong>
                    <span class="status-badge ${j.status === 'Encerrado' ? 'status-pending' : 'status-paid'}" style="margin-left:6px;">
                      ${escapeHtml(j.status)}
                    </span><br>
                    <small>${escapeHtml(j.campeonato)} (${escapeHtml(j.rodada)}) • 📅 <strong>${formatDateBR(j.dataJogo)}</strong> às ${escapeHtml(j.horario)} • 📍 ${escapeHtml(j.estadio || '')}</small>
                    ${j.placar ? `<div style="font-size:0.82rem; font-weight:800; color:#047857; margin-top:2px;">Placar: ${escapeHtml(j.placar)}</div>` : ''}
                  </div>
                </div>
                <div class="action-btns" style="align-items:center;">
                  <select data-change-mando-jogo="${j.id}" title="Alterar Mando de Campo (Em Casa ou Fora de Casa)" style="padding:4px 8px; border-radius:8px; font-size:0.76rem; font-weight:800; border:1px solid ${isCasa ? '#16a34a' : '#2563eb'}; background:${isCasa ? '#dcfce7' : '#dbeafe'}; color:${isCasa ? '#166534' : '#1e40af'}; cursor:pointer;">
                    <option value="Em Casa (Velosão)" ${isCasa ? 'selected' : ''}>🏟️ Em Casa (Velosão)</option>
                    <option value="Fora de Casa" ${!isCasa ? 'selected' : ''}>🚌 Fora de Casa</option>
                  </select>
                  <button type="button" class="btn-table" style="background:#dcfce7;color:#166534;border-color:#22c55e;font-weight:800;" data-open-plano-jogo="${j.id}" title="Abrir Plano de Ação deste Jogo (Tarefas, Instrumentos e PDF)">
                    📋 Plano de Ação
                  </button>
                  <button type="button" class="btn-table" style="background:#e0f2fe;color:#0369a1;border-color:#7dd3fc;font-weight:800;" data-edit-jogo="${j.id}">
                    ✏️ Editar
                  </button>
                  <button type="button" class="btn-table" style="background:#fef9c3;color:#854d0e;border-color:#eab308;font-weight:800;" data-change-logo-jogo="${j.id}" title="Enviar ou trocar a logo/escudo do time adversário">
                    🛡️ Escudo
                  </button>
                  <button type="button" class="btn-table" style="background:#e0f2fe;color:#0369a1;border-color:#7dd3fc;" data-set-placar-jogo="${j.id}">
                    ⚽ Placar
                  </button>
                  <button type="button" class="btn-table btn-approve" data-toggle-status-jogo="${j.id}">
                    ${j.status === 'Encerrado' ? 'Reabrir' : 'Encerrar'}
                  </button>
                  <button type="button" class="btn-table btn-del" data-del-jogo="${j.id}">🗑️</button>
                </div>
              </div>
            </div>
          `;
        }).join('');

    // Alterar Mando de Campo (Em Casa / Fora de Casa) diretamente na lista de jogos
    jogosListEl.querySelectorAll('[data-change-mando-jogo]').forEach((sel) => {
      sel.addEventListener('change', async () => {
        const id = sel.getAttribute('data-change-mando-jogo');
        const jogo = (appState.jogosEcrv || []).find(x => x.id === id);
        if (!jogo) return;
        jogo.mando = sel.value;
        jogo.mandoExplicit = true;
        const audit = buildAuditPayload('Jogos ECRV', `Alterou mando de campo do jogo "${jogo.adversario}" para ${jogo.mando}`, '');
        try {
          await fetch(`/api/jogos/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ mando: jogo.mando, mandoExplicit: true, _auditoria: audit })
          });
        } catch (e) {}
        saveLocalBackup();
        renderAll();
        showToast(`🏟️ Mando de campo de "${jogo.adversario}" alterado para: ${jogo.mando}!`);
      });
    });

    // Abrir Plano de Ação do Jogo selecionado
    jogosListEl.querySelectorAll('[data-open-plano-jogo]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-open-plano-jogo');
        const jogo = (appState.jogosEcrv || []).find(x => x.id === id);
        const tabBtn = document.getElementById('btnTabPlanoAcao');
        if (tabBtn) tabBtn.click();
        const iframe = document.getElementById('iframeAdminPlanoAcao');
        if (iframe && iframe.contentWindow && jogo) {
          const info = getMatchTeamsAndLogos(jogo);
          iframe.contentWindow.postMessage({
            type: 'TGA_SELECT_PLANO_JOGO',
            dataJogo: jogo.dataJogo || '',
            adversario: info.opponentName || jogo.adversario || ''
          }, '*');
        }
        showToast(`📋 Plano de Ação aberto para ${jogo ? jogo.adversario : 'o jogo'}!`);
      });
    });

    // Abrir modal completo de Edição de Jogo
    jogosListEl.querySelectorAll('[data-edit-jogo]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-edit-jogo');
        openEditJogoModal(id);
      });
    });

    jogosListEl.querySelectorAll('[data-change-logo-jogo]').forEach((btn) => {
      btn.addEventListener('click', () => {
        currentJogoLogoEditTargetId = btn.getAttribute('data-change-logo-jogo') || '';
        const fileInput = document.getElementById('inputChangeJogoLogoFile');
        if (fileInput) {
          fileInput.value = '';
          fileInput.click();
        }
      });
    });

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
  const isentosBateria50 = appState.socios.filter(s => isSocioBateria50(s)).length;
  const isentosParcial = appState.socios.filter(s => getSocioParcelasIsentas(s) > 0 && !isSocioIsento(s)).length;
  const quitados = appState.socios.filter(s => s.statusPagamento === 'Pago / Ativo' && !isSocioIsento(s)).length;
  const emParcelamento = appState.socios.filter(s => String(s.statusPagamento || '').includes('Parcela')).length;
  const recebido = appState.socios.reduce((acc, s) => acc + getSocioValorPagoEfetivo(s), 0);
  const totalIsentoValor = appState.socios.reduce((acc, s) => acc + getSocioValorIsento(s), 0);
  const previstoLiquido = appState.socios.reduce((acc, s) => acc + getSocioValorLiquidoPrevisto(s), 0);

  const headers = [
    'Nº Camiseta', 'Matrícula', 'Nome Completo do Sócio', 'Apelido', 'CPF', 'RG', 'Nascimento',
    'WhatsApp', 'Setor / Bairro', 'Cidade / UF', 'Tam. Camisa', 'Sangue',
    'Modalidade de Pagamento', 'Parcelas / % Isento', 'Valor Isento (R$)', 'Motivo da Isenção',
    'Valor Líquido Previsto', 'Valor Pago no PIX', 'Falta Pagar PIX', 'Status PIX / Parcelas', 'Boletos Enviados',
    'PIX / Isenção Por', 'Última Edição Por', 'Observações', 'Data Inscrição'
  ];

  const rows = appState.socios.map((s) => {
    const isento = isSocioIsento(s);
    const isBat50 = isSocioBateria50(s);
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
      isento ? 'Isento — Diretoria TGA (R$ 0,00)' : (isBat50 ? 'Turma da Bateria — 50% Isento (R$ 52,50)' : (s.formaPagamento || 'À Vista no PIX (R$ 105,00)')),
      isBat50 ? '50% (Bateria)' : (qtdIsentas > 0 ? `${qtdIsentas}/3 Parcela(s)` : '0/3'),
      formatBRL(valIsento),
      s.motivoIsencao || (isento ? 'Diretoria TGA (3/3)' : (isBat50 ? 'Turma da Bateria TGA (50%)' : '—')),
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
      `Bateria 50% (-R$ 52,50): ${isentosBateria50}`,
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
  const pedidosBateria = (appState.pedidosMateriais || []).filter(p => p.isentoBateria);
  const totalBruto = appState.socios.length * 105;
  const totalValorIsentoSocios = listaIsentos.reduce((acc, s) => acc + getSocioValorIsento(s), 0);
  const totalValorIsentoLoja = pedidosBateria.reduce((acc, p) => acc + (Number(p.valorOriginal) || (Number(p.valorUnitario) || 80) * (Number(p.quantidade) || 1)), 0);
  const totalValorIsento = totalValorIsentoSocios + totalValorIsentoLoja;
  const totalParcelasIsentas = listaIsentos.reduce((acc, s) => acc + getSocioParcelasIsentas(s), 0);
  const previstoLiquido = Math.max(0, totalBruto - totalValorIsentoSocios);

  const headers = [
    'Nº Camiseta / Origem', 'Matrícula', 'Nome Completo', 'CPF', 'WhatsApp',
    'Tipo de Isenção', 'Motivo / Ação Social / Bateria', 'Parcelas / % Isento',
    'Valor Abatido / Isento', 'Valor Pago no PIX', 'Saldo a Pagar no PIX', 'Autorizado pelo Master'
  ];

  const rowsSocios = listaIsentos.map((s) => {
    const isBat50 = isSocioBateria50(s);
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
      isTotal ? 'Isenção Total (Diretoria 3/3)' : (isBat50 ? 'Isenção 50% (Turma da Bateria)' : `Isenção Parcial (${qtd}/3 Parcela${qtd > 1 ? 's' : ''})`),
      s.motivoIsencao || (isTotal ? 'Diretoria TGA — Isenção Total' : (isBat50 ? 'Turma da Bateria TGA — Isenção 50%' : 'Doação de Sangue / Ação Social TGA')),
      isBat50 ? '50% (-R$ 52,50)' : `${qtd}/3 Parcela(s)`,
      `- ${formatBRL(valIsento)}`,
      formatBRL(valPago),
      falta === 0 ? 'R$ 0,00 (Quitado)' : formatBRL(falta),
      s.aprovadoPor ? `${s.aprovadoPor.nome} (${formatDateTimeBR(s.aprovadoPor.dataHora)})` : 'Jully Gabriel (Master)'
    ];
  });

  const rowsLoja = pedidosBateria.map((p) => {
    const valOrig = Number(p.valorOriginal) || ((Number(p.valorUnitario) || 80) * (Number(p.quantidade) || 1));
    return [
      'LOJA TGA',
      p.socioMatricula || '—',
      p.compradorNome || '—',
      p.cpf || '—',
      p.whatsapp || '—',
      'Isenção 100% Camiseta/Material (Bateria)',
      `${p.quantidade || 1}x ${p.materialNome} (${p.modeloGenero || 'Masculino'} • ${p.faixaEtaria || 'Adulto'} • Tam: ${p.tamanho})`,
      '100% Material',
      `- ${formatBRL(valOrig)}`,
      'R$ 0,00',
      'R$ 0,00 (Isento Bateria)',
      'Jully Gabriel (Master)'
    ];
  });

  return {
    filename: `Extrato_Valores_e_Saldos_Isentos_TGA_${new Date().toISOString().slice(0, 10)}.xls`,
    sheetName: 'Saldos Isentos TGA',
    reportTitle: 'EXTRATO OFICIAL DE VALORES E SALDOS ISENTOS — DIRETORIA, BATERIA & AÇÕES SOCIAIS TGA',
    subtitle: 'Detalhamento de Isenções Totais (Diretoria 3/3), Bateria (50% Sócio / 100% Camisetas) e Parcelas de Ações Sociais',
    summaryItems: [
      `Sócios com Isenção: ${listaIsentos.length}`,
      `Camisetas Isentas (Bateria): ${pedidosBateria.length}`,
      `Receita Bruta Sócios: ${formatBRL(totalBruto)}`,
      `Saldo Total Isento: - ${formatBRL(totalValorIsento)}`,
      `Previsto Líquido Real (PIX): ${formatBRL(previstoLiquido)}`
    ],
    headers,
    rows: [...rowsSocios, ...rowsLoja],
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
  const isentosBateria = pedidos.filter(p => p.isentoBateria || String(p.statusPix || '').includes('Isento')).length;
  const entregues = pedidos.filter(p => p.entregue || p.statusPix === 'Entregue ✔').length;
  const recebido = pedidos.reduce((acc, p) => acc + ((!p.isentoBateria && (p.statusPix === 'PIX Confirmado' || p.statusPix === 'Entregue ✔')) ? (Number(p.valorTotal) || 0) : 0), 0);

  const headers = [
    'Nº', 'Data do Pedido', 'Material Oficial TGA', 'Modelo (Masculino / Feminino)', 'Adulto / Infantil',
    'Tamanho', 'Qtd', 'Nome do Comprador', 'CPF', 'WhatsApp',
    'Modalidade / Desconto', 'Valor Total', 'Status PIX / Entrega'
  ];

  const rows = pedidos.map((p, idx) => [
    String(idx + 1).padStart(2, '0'),
    formatDateTimeBR(p.createdAt),
    p.materialNome || 'Material TGA',
    p.modeloGenero || 'Masculino',
    p.faixaEtaria || 'Adulto',
    p.tamanho || 'Único',
    String(p.quantidade || 1),
    p.compradorNome || p.nome || '—',
    p.cpf || '—',
    p.whatsapp || '—',
    p.isentoBateria
      ? 'Isento — Turma da Bateria TGA (R$ 0,00)'
      : (p.isSocioDesconto ? `Sócio TGA (${p.socioMatricula || 'Ativo'})` : 'Não-Sócio (Valor Normal)'),
    p.isentoBateria ? 'R$ 0,00 (Isento Bateria)' : formatBRL(Number(p.valorTotal) || 0),
    p.statusPix || 'Pendente PIX'
  ]);

  return {
    filename: `Relatorio_Pedidos_Loja_Materiais_TGA_${new Date().toISOString().slice(0, 10)}.xls`,
    sheetName: 'Pedidos Loja TGA',
    reportTitle: 'RELAÇÃO OFICIAL DE PEDIDOS E ENTREGAS — LOJA DE MATERIAIS GARRA ALVIVERDE',
    subtitle: 'Controle de Vendas de Camisas (Masculino/Feminino • Adulto/Infantil), Descontos de Sócio e Isenções da Bateria',
    summaryItems: [
      `Total de Pedidos: ${pedidos.length}`,
      `PIX Confirmados: ${pagos}`,
      `Isentos (Turma da Bateria): ${isentosBateria}`,
      `Materiais Entregues: ${entregues}`,
      `Total Confirmado PIX: ${formatBRL(recebido)}`
    ],
    headers,
    rows,
    textCols: [0, 1, 3, 4, 5, 6, 8, 9]
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
      document.querySelectorAll('.admin-tab-panel').forEach((panel) => {
        panel.hidden = panel.id !== targetId;
      });
      if (targetId === 'tab-plano-acao') {
        ensurePlanoAcaoIframeLoaded();
      }
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

    const modeloGenero = document.getElementById('pedModeloGenero')?.value || 'Masculino';
    const faixaEtaria = document.getElementById('pedFaixaEtaria')?.value || 'Adulto';
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
      modeloGenero,
      faixaEtaria,
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
      valorOriginal: valorTotal,
      isentoBateria: false,
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
      `\uD83D\uDC65 *Modelo:* ${payload.modeloGenero} | *Faixa:* ${payload.faixaEtaria}\n` +
      `\uD83D\uDCCF *Tamanho:* ${payload.tamanho} | *Quantidade:* ${payload.quantidade} un.\n` +
      `\uD83D\uDC64 *Torcedor:* ${payload.compradorNome} (CPF: ${payload.cpf})\n` +
      `\uD83C\uDFF7\uFE0F *Modalidade:* ${payload.isSocioDesconto ? `Sócio TGA c/ Desconto (${payload.socioMatricula})` : 'Não-Sócio (Valor Normal)'}\n` +
      `\uD83D\uDCB0 *Valor Total no PIX:* ${formatBRL(payload.valorTotal)}\n\n` +
      `Segue meu comprovante do PIX (${appState.config.chavePix}) para reservar meu material oficial da Garra Alviverde!`;

    openSuccessModal({
      titulo: '👕 Pedido de Material Oficial Registrado!',
      descricao: `Salve, ${payload.compradorNome}! Seu pedido de ${payload.quantidade}x ${payload.materialNome} (${payload.modeloGenero} • ${payload.faixaEtaria} • Tam. ${payload.tamanho}) foi registrado no painel da Diretoria.`,
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

  document.getElementById('newJogoLogoAdversario')?.addEventListener('change', (e) => {
    const file = e.target.files?.[0];
    if (!file) {
      currentNovoJogoLogoDataUrl = '';
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const tempImg = new Image();
      tempImg.onload = () => {
        const canvas = document.createElement('canvas');
        const maxW = 160;
        const maxH = 160;
        let width = tempImg.width;
        let height = tempImg.height;
        const scale = Math.min(maxW / width, maxH / height, 1);
        width = Math.round(width * scale);
        height = Math.round(height * scale);
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(tempImg, 0, 0, width, height);
        currentNovoJogoLogoDataUrl = canvas.toDataURL('image/png');
      };
      tempImg.src = reader.result;
    };
    reader.readAsDataURL(file);
  });

  document.getElementById('inputChangeJogoLogoFile')?.addEventListener('change', (e) => {
    const file = e.target.files?.[0];
    if (!file || !currentJogoLogoEditTargetId) return;
    const targetId = currentJogoLogoEditTargetId;
    const reader = new FileReader();
    reader.onload = () => {
      const tempImg = new Image();
      tempImg.onload = async () => {
        const canvas = document.createElement('canvas');
        const maxW = 160;
        const maxH = 160;
        let width = tempImg.width;
        let height = tempImg.height;
        const scale = Math.min(maxW / width, maxH / height, 1);
        width = Math.round(width * scale);
        height = Math.round(height * scale);
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(tempImg, 0, 0, width, height);
        const logoDataUrl = canvas.toDataURL('image/png');

        const jogo = (appState.jogosEcrv || []).find(x => x.id === targetId);
        if (jogo) {
          jogo.logoAdversarioDataUrl = logoDataUrl;
          jogo.logoInvertidoManual = true;
          try {
            await fetch(`/api/jogos/${targetId}`, {
              method: 'PATCH',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ logoAdversarioDataUrl: logoDataUrl, logoInvertidoManual: true })
            });
          } catch (err) {}
          saveLocalBackup();
          renderAll();
          showToast(`🛡️ Escudo do adversário atualizado no jogo "${jogo.adversario}"!`);
        }
      };
      tempImg.src = reader.result;
    };
    reader.readAsDataURL(file);
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
      logoAdversarioDataUrl: currentNovoJogoLogoDataUrl || '',
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

    currentNovoJogoLogoDataUrl = '';
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

  document.getElementById('btnPrintPlanoAcaoIframe')?.addEventListener('click', () => {
    const iframe = document.getElementById('iframeAdminPlanoAcao');
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.postMessage({ type: 'TGA_PRINT_PLANO_ACAO' }, '*');
    } else {
      window.open('/plano-de-acao.html', '_blank');
    }
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
        } else if (val === 'bateria50') {
          motivoSelect.value = '🥁 Turma da Bateria TGA — Isenção 50%';
        } else if ((val === '1' || val === '2') && (motivoSelect.value === '👑 Membro da Diretoria TGA' || motivoSelect.value === '🥁 Turma da Bateria TGA — Isenção 50%')) {
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
    const rawVal = selectedRadio?.value || '0';
    const isBateria50Selected = rawVal === 'bateria50';
    const dirNome = currentAdminUser.nome || 'Jully Gabriel (Master)';
    const dirUsuario = currentAdminUser.usuario || 'jully';

    let updates = {};
    let audit = null;

    if (isBateria50Selected) {
      const jaPago = getSocioValorPagoEfetivo(socio);
      const novoPago = Math.min(52.5, jaPago);
      const quitado = novoPago >= 52.5;
      const motivoEscolhido = document.getElementById('isencaoMotivoSelect')?.value || '🥁 Turma da Bateria TGA — Isenção 50%';

      updates = {
        isento: false,
        isencaoBateria50: true,
        percentualIsencao: 50,
        parcelasIsentas: 0,
        valorIsento: 52.5,
        motivoIsencao: motivoEscolhido,
        valorPlano: 52.5,
        valorPago: novoPago,
        statusPagamento: quitado ? 'Pago / Ativo' : '🥁 Bateria 50% (Pagar R$ 52,50)',
        formaPagamento: '🥁 Turma da Bateria — 50% Isento (R$ 52,50)',
        aprovadoPor: {
          nome: dirNome,
          usuario: dirUsuario,
          dataHora: new Date().toISOString(),
          status: `🥁 Isenção 50% (-R$ 52,50) — ${motivoEscolhido}`
        }
      };

      audit = buildAuditPayload(
        'Isenção Sócio',
        `Concedeu isenção de 50% (-R$ 52,50) da Turma da Bateria para ${socio.nome}`,
        `Motivo: ${motivoEscolhido} | Saldo Líquido a Pagar: ${formatBRL(Math.max(0, 52.5 - novoPago))}`
      );
    } else {
      const novaQtdIsentas = Math.min(3, Math.max(0, Number(rawVal || 0)));
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

      updates = {
        isento: isTotalIsento,
        isencaoBateria50: false,
        percentualIsencao: isTotalIsento ? 100 : 0,
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

      audit = buildAuditPayload(
        'Isenção Sócio',
        novaQtdIsentas > 0
          ? `Concedeu isenção de ${novaQtdIsentas}/3 parcela(s) (${formatBRL(novoValorIsento)}) para ${socio.nome}`
          : `Removeu isenção de parcelas do sócio ${socio.nome}`,
        novaQtdIsentas > 0
          ? `Motivo: ${motivoEscolhido} | Saldo Líquido a Pagar: ${formatBRL(Math.max(0, 105 - novoValorIsento - (pagasPix * 35)))}`
          : `Retornou para o plano padrão de R$ 105,00`
      );
    }

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
      isBateria50Selected
        ? `🥁 Isenção de 50% (Turma da Bateria: paga apenas R$ 52,50) aplicada para ${socio.nome}!`
        : (updates.parcelasIsentas > 0
          ? `👑 Isenção de ${updates.parcelasIsentas} parcela(s) (-${formatBRL(updates.valorIsento)}) aplicada para ${socio.nome}!`
          : `↩️ Isenção removida da ficha de ${socio.nome}.`)
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

  // ==========================================================================
  // 7. EVENTOS DO MODAL DE EDIÇÃO DE PRODUTOS / MATERIAIS DA LOJA OFICIAL TGA
  // ==========================================================================
  ['btnCloseEditMaterial', 'btnCancelEditMaterial'].forEach((id) => {
    document.getElementById(id)?.addEventListener('click', () => {
      const m = document.getElementById('modalEditMaterial');
      if (m) m.hidden = true;
    });
  });

  document.getElementById('editMatFotoInput')?.addEventListener('change', (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
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
        currentEditMaterialPhotoDataUrl = canvas.toDataURL('image/jpeg', 0.8);
        const previewImg = document.getElementById('editMatFotoPreviewImg');
        if (previewImg) previewImg.src = currentEditMaterialPhotoDataUrl;
      };
      tempImg.src = reader.result;
    };
    reader.readAsDataURL(file);
  });

  document.getElementById('btnResetEditMatFoto')?.addEventListener('click', () => {
    currentEditMaterialPhotoDataUrl = '/assets/logo-tga.jpg';
    const previewImg = document.getElementById('editMatFotoPreviewImg');
    if (previewImg) previewImg.src = currentEditMaterialPhotoDataUrl;
    const fileInput = document.getElementById('editMatFotoInput');
    if (fileInput) fileInput.value = '';
    showToast('🔄 Foto redefinida para o Logo Oficial da TGA.');
  });

  document.getElementById('formEditMaterial')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('editMatId')?.value;
    const idx = (appState.materiais || []).findIndex(m => m.id === id);
    if (idx === -1) return;

    const oldMat = appState.materiais[idx];
    const updates = {
      nome: document.getElementById('editMatNome')?.value.trim() || oldMat.nome,
      categoria: document.getElementById('editMatCategoria')?.value.trim() || 'Material Oficial TGA',
      valorSocio: Number(document.getElementById('editMatValorSocio')?.value) || 0,
      valorNaoSocio: Number(document.getElementById('editMatValorNaoSocio')?.value) || 0,
      estoqueStatus: document.getElementById('editMatEstoqueStatus')?.value || 'Disponível',
      tamanhos: document.getElementById('editMatTamanhos')?.value.trim() || 'P, M, G, GG, XG',
      descricao: document.getElementById('editMatDescricao')?.value.trim() || '',
      fotoDataUrl: currentEditMaterialPhotoDataUrl || oldMat.fotoDataUrl || '/assets/logo-tga.jpg'
    };

    const audit = buildAuditPayload(
      'Loja TGA',
      `Editou o produto da loja "${updates.nome}"`,
      `Sócio: ${formatBRL(updates.valorSocio)} | Não-Sócio: ${formatBRL(updates.valorNaoSocio)} | Tam: ${updates.tamanhos} | Status: ${updates.estoqueStatus}`
    );

    appState.materiais[idx] = { ...oldMat, ...updates };

    try {
      const res = await fetch(`/api/materiais/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...updates, _auditoria: audit })
      });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.materiais)) {
          appState.materiais = data.materiais;
        }
      }
    } catch (err) {}

    saveLocalBackup();
    const modal = document.getElementById('modalEditMaterial');
    if (modal) modal.hidden = true;
    renderAll();
    showToast(`✅ Produto "${updates.nome}" atualizado com sucesso na Loja Oficial TGA!`);
  });

  // Check-in Rápido de Ingresso no Card Matchday da Tela Inicial (Modelo 1)
  document.getElementById('formHomeQuickCheckin')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const cpfTyped = document.getElementById('inputHomeQuickCheckinCpf')?.value.trim() || '';
    openFeatureWindow('windowJogosEcrv');
    const chkInput = document.getElementById('chkSocioCpf');
    if (chkInput && cpfTyped) {
      chkInput.value = cpfTyped;
      const formChk = document.getElementById('formCheckinJogoSocio');
      if (formChk) {
        formChk.dispatchEvent(new Event('submit', { cancelable: true }));
      }
    }
  });

  // ==========================================================================
  // 8. EVENTOS DO MODAL DE EDIÇÃO DE JOGOS DO E.C.R.V. (MANDO DE CAMPO, DATA, PLACAR)
  // ==========================================================================
  ['btnCloseEditJogo', 'btnCancelEditJogo'].forEach((id) => {
    document.getElementById(id)?.addEventListener('click', () => {
      const m = document.getElementById('modalEditJogo');
      if (m) m.hidden = true;
    });
  });

  document.getElementById('formEditJogo')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('editJogoId')?.value;
    const idx = (appState.jogosEcrv || []).findIndex(j => j.id === id);
    if (idx === -1) return;

    const oldJogo = appState.jogosEcrv[idx];
    const updates = {
      campeonato: document.getElementById('editJogoCampeonato')?.value.trim() || oldJogo.campeonato || 'Campeonato Goiano',
      rodada: document.getElementById('editJogoRodada')?.value.trim() || oldJogo.rodada || 'Rodada 1',
      mando: document.getElementById('editJogoMando')?.value || 'Em Casa (Velosão)',
      mandoExplicit: true,
      status: document.getElementById('editJogoStatus')?.value || 'Agendado',
      adversario: document.getElementById('editJogoAdversario')?.value.trim() || oldJogo.adversario,
      dataJogo: document.getElementById('editJogoData')?.value || oldJogo.dataJogo,
      horario: document.getElementById('editJogoHorario')?.value.trim() || '16:00',
      placar: document.getElementById('editJogoPlacar')?.value.trim() || '',
      estadio: document.getElementById('editJogoEstadio')?.value.trim() || oldJogo.estadio
    };

    const audit = buildAuditPayload(
      'Jogos ECRV',
      `Editou o jogo "${updates.adversario}" (${updates.rodada})`,
      `Mando: ${updates.mando} | Data: ${formatDateBR(updates.dataJogo)} | Estádio: ${updates.estadio}`
    );

    appState.jogosEcrv[idx] = { ...oldJogo, ...updates };

    try {
      const res = await fetch(`/api/jogos/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...updates, _auditoria: audit })
      });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.jogosEcrv)) {
          appState.jogosEcrv = data.jogosEcrv;
        }
      }
    } catch (err) {}

    saveLocalBackup();
    const modal = document.getElementById('modalEditJogo');
    if (modal) modal.hidden = true;
    renderAll();
    showToast(`✅ Jogo "${updates.adversario}" atualizado com sucesso!`);
  });
});


function ensurePlanoAcaoIframeLoaded() {
  if (typeof window.__initTgaPlanoAcaoIframe === 'function') {
    window.__initTgaPlanoAcaoIframe();
  }
}
