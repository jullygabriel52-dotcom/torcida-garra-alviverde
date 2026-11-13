const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const IS_VERCEL = Boolean(process.env.VERCEL);

// Referências explícitas para o empacotador da Vercel (@vercel/nft) incluir todos os arquivos
const NFT_FILES = [
  path.join(__dirname, 'index.html'),
  path.join(__dirname, 'styles.css'),
  path.join(__dirname, 'app.js'),
  path.join(__dirname, 'logo-tga.jpg'),
  path.join(__dirname, 'escudo-ecrv.jpg'),
  path.join(__dirname, 'qrcode-pix.jpg'),
  path.join(__dirname, 'db.json'),
  path.join(__dirname, 'public', 'index.html'),
  path.join(__dirname, 'public', 'styles.css'),
  path.join(__dirname, 'public', 'app.js'),
  path.join(__dirname, 'public', 'assets', 'logo-tga.jpg'),
  path.join(__dirname, 'public', 'assets', 'escudo-ecrv.jpg'),
  path.join(__dirname, 'public', 'assets', 'qrcode-pix.jpg'),
  path.join(__dirname, 'data', 'db.json')
];

const DATA_DIR = IS_VERCEL ? '/tmp' : path.join(__dirname, 'data');
const DB_FILE = IS_VERCEL ? path.join('/tmp', 'db.json') : (
  fs.existsSync(path.join(__dirname, 'data', 'db.json'))
    ? path.join(__dirname, 'data', 'db.json')
    : path.join(__dirname, 'db.json')
);
const SEED_DB_FILE = fs.existsSync(path.join(__dirname, 'data', 'db.json'))
  ? path.join(__dirname, 'data', 'db.json')
  : path.join(__dirname, 'db.json');
const PUBLIC_DIR = path.join(__dirname, 'public');
const KV_KEY = 'tga_portal_db_v1';
const KV_BACKUP_KEY = 'tga_portal_backups_v1';
const BACKUPS_FILE = IS_VERCEL
  ? path.join('/tmp', 'backups.json')
  : path.join(__dirname, 'data', 'backups.json');
let lastBackupDateChecked = '';

const DEFAULT_DB = {
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

function ensureMasterAndCollections(db) {
  db.socios = Array.isArray(db.socios) ? db.socios : [];
  db.caravanas = Array.isArray(db.caravanas) ? db.caravanas : [];
  db.inscricoesCaravana = Array.isArray(db.inscricoesCaravana) ? db.inscricoesCaravana : [];
  db.auditoriaLogs = Array.isArray(db.auditoriaLogs) ? db.auditoriaLogs : [];
  db.usuariosDiretoria = Array.isArray(db.usuariosDiretoria) ? db.usuariosDiretoria : [];
  db.materiais = Array.isArray(db.materiais) ? db.materiais : JSON.parse(JSON.stringify(DEFAULT_DB.materiais));
  db.pedidosMateriais = Array.isArray(db.pedidosMateriais) ? db.pedidosMateriais : [];
  db.jogosEcrv = Array.isArray(db.jogosEcrv) ? db.jogosEcrv : JSON.parse(JSON.stringify(DEFAULT_DB.jogosEcrv));
  db.checkinsJogos = Array.isArray(db.checkinsJogos) ? db.checkinsJogos : [];
  db.eventosTga = Array.isArray(db.eventosTga) && db.eventosTga.length > 0
    ? db.eventosTga
    : JSON.parse(JSON.stringify(DEFAULT_DB.eventosTga));
  db.participantesEventos = Array.isArray(db.participantesEventos) ? db.participantesEventos : [];

  if (db.config) {
    if (!db.config.muralAviso) {
      db.config.muralAviso = DEFAULT_DB.config.muralAviso;
    }
    if (typeof db.config.linkGrupoVipWhatsapp !== 'string') {
      db.config.linkGrupoVipWhatsapp = '';
    }
    if (!db.config.whatsappDiretoria || db.config.whatsappDiretoria === '(64) 99220-9870') {
      db.config.whatsappDiretoria = '(64) 99330-2283';
    }
    if (!db.config.senhaAdmin || db.config.senhaAdmin === '2015') {
      db.config.senhaAdmin = 'Tga@2015';
    }
    if (!Array.isArray(db.config.planos) || db.config.planos.length === 0 || Number(db.config.planos[0].valor) < 105) {
      db.config.planos = JSON.parse(JSON.stringify(DEFAULT_DB.config.planos));
    } else {
      db.config.planos[0].valorParcela = Number(db.config.planos[0].valorParcela) || Math.round((Number(db.config.planos[0].valor) / 3) * 100) / 100;
      db.config.planos[0].maxParcelas = 3;
      db.config.planos[0].beneficios = DEFAULT_DB.config.planos[0].beneficios;
    }
  }

  const masterPass = (db.config && db.config.senhaAdmin) ? db.config.senhaAdmin : 'Tga@2015';
  const masterIdx = db.usuariosDiretoria.findIndex((u) => u.isMaster || u.id === 'dir-master' || (u.usuario && u.usuario.toLowerCase() === 'jully'));
  const masterObj = {
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
    db.usuariosDiretoria.unshift(masterObj);
  } else {
    db.usuariosDiretoria[masterIdx] = {
      ...db.usuariosDiretoria[masterIdx],
      ...masterObj,
      nome: db.usuariosDiretoria[masterIdx].nome || masterObj.nome,
      usuario: db.usuariosDiretoria[masterIdx].usuario || 'jully',
      senha: masterPass
    };
  }
  return db;
}

function appendAuditLog(db, auditPayload) {
  if (!auditPayload || typeof auditPayload !== 'object') return;
  db.auditoriaLogs = Array.isArray(db.auditoriaLogs) ? db.auditoriaLogs : [];
  db.auditoriaLogs.unshift({
    id: 'log-' + Date.now() + '-' + Math.random().toString(36).slice(2, 6),
    dataHora: new Date().toISOString(),
    diretorNome: auditPayload.diretorNome || 'Diretoria TGA',
    diretorUsuario: auditPayload.diretorUsuario || 'diretoria',
    categoria: auditPayload.categoria || 'Sistema',
    acao: auditPayload.acao || 'Alteração realizada no painel',
    detalhes: auditPayload.detalhes || ''
  });
  if (db.auditoriaLogs.length > 500) {
    db.auditoriaLogs = db.auditoriaLogs.slice(0, 500);
  }
}

function getKvConfig() {
  let url =
    process.env.KV_REST_API_URL ||
    process.env.UPSTASH_REDIS_REST_URL ||
    process.env.STORAGE_KV_REST_API_URL ||
    process.env.STORAGE_REST_API_URL;
  let token =
    process.env.KV_REST_API_TOKEN ||
    process.env.UPSTASH_REDIS_REST_TOKEN ||
    process.env.STORAGE_KV_REST_API_TOKEN ||
    process.env.STORAGE_REST_API_TOKEN;

  if (!url || !token) {
    for (const key of Object.keys(process.env)) {
      if (!url && key.endsWith('REST_API_URL') && process.env[key]) {
        url = process.env[key];
      }
      if (!token && key.endsWith('REST_API_TOKEN') && process.env[key]) {
        token = process.env[key];
      }
    }
  }

  if (url && token) return { url: url.replace(/\/$/, ''), token };
  return null;
}

function getFirebaseUrl() {
  const fb = process.env.FIREBASE_DATABASE_URL || process.env.FIREBASE_DB_URL;
  return fb ? fb.replace(/\/$/, '') : null;
}

function ensureLocalDb() {
  try {
    const dir = path.dirname(DB_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    if (!fs.existsSync(DB_FILE)) {
      if (IS_VERCEL && fs.existsSync(SEED_DB_FILE)) {
        const seed = fs.readFileSync(SEED_DB_FILE, 'utf8');
        fs.writeFileSync(DB_FILE, seed, 'utf8');
      } else {
        fs.writeFileSync(DB_FILE, JSON.stringify(DEFAULT_DB, null, 2), 'utf8');
      }
    }
  } catch (e) {
    console.warn('Aviso ao preparar arquivo local:', e.message);
  }
}

async function readDb() {
  const kv = getKvConfig();
  if (kv) {
    try {
      const res = await fetch(kv.url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${kv.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(['GET', KV_KEY])
      });
      if (res.ok) {
        const data = await res.json();
        if (data && data.result) {
          return typeof data.result === 'string' ? JSON.parse(data.result) : data.result;
        }
        await writeDb(DEFAULT_DB);
        return JSON.parse(JSON.stringify(DEFAULT_DB));
      }
    } catch (err) {
      console.error('Erro ao ler do Vercel KV / Upstash:', err.message);
    }
  }

  const fbUrl = getFirebaseUrl();
  if (fbUrl) {
    try {
      const res = await fetch(`${fbUrl}/${KV_KEY}.json`);
      if (res.ok) {
        const data = await res.json();
        if (data && data.config) {
          return {
            config: data.config || DEFAULT_DB.config,
            caravanas: data.caravanas || [],
            socios: data.socios || [],
            inscricoesCaravana: data.inscricoesCaravana || []
          };
        }
        await writeDb(DEFAULT_DB);
        return JSON.parse(JSON.stringify(DEFAULT_DB));
      }
    } catch (err) {
      console.error('Erro ao ler do Firebase:', err.message);
    }
  }

  ensureLocalDb();
  try {
    const raw = fs.readFileSync(DB_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    return JSON.parse(JSON.stringify(DEFAULT_DB));
  }
}

async function writeDb(data) {
  const kv = getKvConfig();
  if (kv) {
    try {
      await fetch(kv.url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${kv.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(['SET', KV_KEY, JSON.stringify(data)])
      });
      return;
    } catch (err) {
      console.error('Erro ao gravar no Vercel KV / Upstash:', err.message);
    }
  }

  const fbUrl = getFirebaseUrl();
  if (fbUrl) {
    try {
      await fetch(`${fbUrl}/${KV_KEY}.json`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      return;
    } catch (err) {
      console.error('Erro ao gravar no Firebase:', err.message);
    }
  }

  ensureLocalDb();
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error('Erro ao gravar arquivo local:', err.message);
  }
}

function getBrasiliaDateString() {
  try {
    return new Date().toLocaleDateString('sv-SE', { timeZone: 'America/Sao_Paulo' });
  } catch (e) {
    return new Date().toISOString().slice(0, 10);
  }
}

async function readBackups() {
  const kv = getKvConfig();
  if (kv) {
    try {
      const res = await fetch(kv.url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${kv.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(['GET', KV_BACKUP_KEY])
      });
      if (res.ok) {
        const data = await res.json();
        if (data && data.result) {
          const parsed = typeof data.result === 'string' ? JSON.parse(data.result) : data.result;
          if (Array.isArray(parsed)) return parsed;
        }
        return [];
      }
    } catch (err) {
      console.error('Erro ao ler backups do Upstash:', err.message);
    }
  }

  const fbUrl = getFirebaseUrl();
  if (fbUrl) {
    try {
      const res = await fetch(`${fbUrl}/${KV_BACKUP_KEY}.json`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) return data;
      }
    } catch (err) {
      console.error('Erro ao ler backups do Firebase:', err.message);
    }
  }

  ensureLocalDb();
  try {
    if (fs.existsSync(BACKUPS_FILE)) {
      const raw = fs.readFileSync(BACKUPS_FILE, 'utf8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (err) {
    console.error('Erro ao ler arquivo local de backups:', err.message);
  }
  return [];
}

async function writeBackups(backupsList) {
  const trimmed = Array.isArray(backupsList) ? backupsList.slice(0, 30) : [];
  const kv = getKvConfig();
  if (kv) {
    try {
      await fetch(kv.url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${kv.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(['SET', KV_BACKUP_KEY, JSON.stringify(trimmed)])
      });
    } catch (err) {
      console.error('Erro ao gravar backups no Upstash:', err.message);
    }
  }

  const fbUrl = getFirebaseUrl();
  if (fbUrl) {
    try {
      await fetch(`${fbUrl}/${KV_BACKUP_KEY}.json`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(trimmed)
      });
    } catch (err) {
      console.error('Erro ao gravar backups no Firebase:', err.message);
    }
  }

  ensureLocalDb();
  try {
    fs.writeFileSync(BACKUPS_FILE, JSON.stringify(trimmed, null, 2), 'utf8');
  } catch (err) {
    console.error('Erro ao gravar arquivo local de backups:', err.message);
  }
  return trimmed;
}

function buildBackupEntry(db, tipo = 'Automático (00:00)', autor = 'Sistema Automático (00:00)') {
  const dataReferencia = getBrasiliaDateString();
  return {
    id: 'bkp-' + Date.now() + '-' + Math.random().toString(36).slice(2, 6),
    dataReferencia,
    dataHora: new Date().toISOString(),
    tipo,
    autor,
    resumo: {
      totalSocios: Array.isArray(db.socios) ? db.socios.length : 0,
      totalCaravanas: Array.isArray(db.caravanas) ? db.caravanas.length : 0,
      totalInscritosCaravana: Array.isArray(db.inscricoesCaravana) ? db.inscricoesCaravana.length : 0,
      totalMateriais: Array.isArray(db.materiais) ? db.materiais.length : 0,
      totalPedidosMateriais: Array.isArray(db.pedidosMateriais) ? db.pedidosMateriais.length : 0,
      totalJogos: Array.isArray(db.jogosEcrv) ? db.jogosEcrv.length : 0,
      totalCheckins: Array.isArray(db.checkinsJogos) ? db.checkinsJogos.length : 0,
      totalEventos: Array.isArray(db.eventosTga) ? db.eventosTga.length : 0,
      totalParticipantesEventos: Array.isArray(db.participantesEventos) ? db.participantesEventos.length : 0,
      totalDiretores: Array.isArray(db.usuariosDiretoria) ? db.usuariosDiretoria.length : 0,
      totalLogs: Array.isArray(db.auditoriaLogs) ? db.auditoriaLogs.length : 0
    },
    snapshot: {
      config: db.config || DEFAULT_DB.config,
      caravanas: Array.isArray(db.caravanas) ? db.caravanas : [],
      socios: Array.isArray(db.socios) ? db.socios : [],
      inscricoesCaravana: Array.isArray(db.inscricoesCaravana) ? db.inscricoesCaravana : [],
      materiais: Array.isArray(db.materiais) ? db.materiais : [],
      pedidosMateriais: Array.isArray(db.pedidosMateriais) ? db.pedidosMateriais : [],
      jogosEcrv: Array.isArray(db.jogosEcrv) ? db.jogosEcrv : [],
      checkinsJogos: Array.isArray(db.checkinsJogos) ? db.checkinsJogos : [],
      eventosTga: Array.isArray(db.eventosTga) ? db.eventosTga : [],
      participantesEventos: Array.isArray(db.participantesEventos) ? db.participantesEventos : [],
      usuariosDiretoria: Array.isArray(db.usuariosDiretoria) ? db.usuariosDiretoria : [],
      auditoriaLogs: Array.isArray(db.auditoriaLogs) ? db.auditoriaLogs.slice(0, 250) : []
    }
  };
}

async function ensureDailyBackup(db, forceCheck = false) {
  const today = getBrasiliaDateString();
  if (!forceCheck && lastBackupDateChecked === today) {
    return null;
  }
  try {
    const backups = await readBackups();
    const alreadyHasToday = backups.some(
      (b) => b.dataReferencia === today && String(b.tipo || '').includes('Automático')
    );
    lastBackupDateChecked = today;
    if (!alreadyHasToday) {
      const entry = buildBackupEntry(db, 'Automático (00:00)', 'Agendador Diário 00:00');
      backups.unshift(entry);
      await writeBackups(backups);
      return entry;
    }
  } catch (err) {
    console.error('Aviso ao verificar backup diário:', err.message);
  }
  return null;
}

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store, no-cache, must-revalidate',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  });
  res.end(JSON.stringify(payload));
}

function parseBody(req) {
  if (req.body && typeof req.body === 'object' && Object.keys(req.body).length > 0) {
    return Promise.resolve(req.body);
  }
  if (typeof req.body === 'string' && req.body.trim().length > 0) {
    try {
      return Promise.resolve(JSON.parse(req.body));
    } catch (e) {
      return Promise.reject(new Error('JSON inválido'));
    }
  }
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
      if (body.length > 8 * 1024 * 1024) {
        reject(new Error('Payload muito grande (máx 8MB)'));
      }
    });
    req.on('end', () => {
      if (!body) return resolve({});
      try {
        resolve(JSON.parse(body));
      } catch (e) {
        reject(new Error('JSON inválido'));
      }
    });
    req.on('error', reject);
  });
}

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.ico': 'image/x-icon'
};

function findStaticFile(requestPathname) {
  const cleanRel = requestPathname === '/' ? 'index.html' : requestPathname.replace(/^\/+/, '');
  const baseName = path.basename(cleanRel);

  const candidates = [
    path.join(__dirname, cleanRel),
    path.join(PUBLIC_DIR, cleanRel),
    path.join(__dirname, baseName),
    path.join(PUBLIC_DIR, 'assets', baseName),
    ...NFT_FILES.filter((p) => path.basename(p) === baseName)
  ];

  for (const candidate of candidates) {
    const resolved = path.normalize(candidate);
    if (!resolved.startsWith(__dirname)) continue;
    if (baseName === 'server.js' || baseName === 'index.js' || baseName === 'package.json' || baseName === 'vercel.json') {
      continue;
    }
    if (fs.existsSync(resolved) && fs.statSync(resolved).isFile()) {
      return resolved;
    }
  }
  return null;
}

async function requestHandler(req, res) {
  const host = req.headers.host || 'localhost:3000';
  const parsedUrl = new URL(req.url || '/', `http://${host}`);
  const pathname = parsedUrl.pathname;

  if (req.method === 'OPTIONS') {
    return sendJson(res, 200, { ok: true });
  }

  // API Routes
  try {
    if (pathname === '/api/state' && req.method === 'GET') {
      const db = ensureMasterAndCollections(await readDb());
      await ensureDailyBackup(db);
      db.storageMode = getKvConfig() ? 'upstash-redis' : (getFirebaseUrl() ? 'firebase' : 'local-file');
      return sendJson(res, 200, db);
    }

    if (pathname === '/api/socios' && req.method === 'POST') {
      const body = await parseBody(req);
      const db = ensureMasterAndCollections(await readDb());
      const seq = 1 + db.socios.length;
      const sigla = (db.config && db.config.sigla) ? db.config.sigla : 'TGA';
      const numFormatted = String(seq).padStart(3, '0');
      const novoSocio = {
        id: 'soc-' + Date.now(),
        matricula: `${sigla}-${new Date().getFullYear()}-${numFormatted}`,
        nome: body.nome || '',
        apelido: body.apelido || '',
        cpf: body.cpf || '',
        rg: body.rg || '',
        dataNascimento: body.dataNascimento || '',
        whatsapp: body.whatsapp || '',
        email: body.email || '',
        pelotao: body.pelotao || '',
        cidade: body.cidade || 'Rio Verde - GO',
        tamanhoCamisa: body.tamanhoCamisa || 'G',
        numeroCamisa: body.numeroCamisa || '',
        tipoSanguineo: body.tipoSanguineo || 'Não informado',
        planoId: body.planoId || 'socio-unico',
        planoNome: body.planoNome || 'Sócio Garra Alviverde (TGA)',
        formaPagamento: body.formaPagamento || 'À Vista no PIX (R$ 105,00)',
        valorPlano: Number(body.valorPlano) || 105.0,
        valorEntradaPix: Number(body.valorEntradaPix) || 105.0,
        valorPago: Number(body.valorPago) || 0,
        parcelasPagas: Number(body.parcelasPagas) || 0,
        boletosEnviados: Boolean(body.boletosEnviados),
        statusPagamento: body.statusPagamento || 'Pendente PIX',
        fotoDataUrl: body.fotoDataUrl || '',
        observacoes: body.observacoes || '',
        createdAt: new Date().toISOString()
      };
      db.socios.unshift(novoSocio);
      await writeDb(db);
      return sendJson(res, 201, novoSocio);
    }

    if (pathname.startsWith('/api/socios/') && req.method === 'PATCH') {
      const id = pathname.replace('/api/socios/', '');
      const body = await parseBody(req);
      const db = ensureMasterAndCollections(await readDb());
      const idx = db.socios.findIndex((s) => s.id === id);
      if (idx === -1) return sendJson(res, 404, { error: 'Sócio não encontrado' });
      const { _auditoria, ...fields } = body;
      db.socios[idx] = { ...db.socios[idx], ...fields };
      if (_auditoria) appendAuditLog(db, _auditoria);
      await writeDb(db);
      return sendJson(res, 200, { socio: db.socios[idx], auditoriaLogs: db.auditoriaLogs });
    }

    if (pathname.startsWith('/api/socios/') && req.method === 'DELETE') {
      const id = pathname.replace('/api/socios/', '');
      const body = await parseBody(req).catch(() => ({}));
      const db = ensureMasterAndCollections(await readDb());
      db.socios = (db.socios || []).filter((s) => s.id !== id);
      if (body && body._auditoria) appendAuditLog(db, body._auditoria);
      await writeDb(db);
      return sendJson(res, 200, { deleted: id, auditoriaLogs: db.auditoriaLogs });
    }

    if (pathname === '/api/inscricoes-caravana' && req.method === 'POST') {
      const body = await parseBody(req);
      const db = ensureMasterAndCollections(await readDb());
      const caravana = db.caravanas.find((c) => c.id === body.caravanaId);
      const novaInscricao = {
        id: 'ins-' + Date.now(),
        caravanaId: body.caravanaId || '',
        caravanaTitulo: caravana ? caravana.jogo : (body.caravanaTitulo || 'Caravana TGA'),
        nome: body.nome || '',
        documento: body.documento || '',
        whatsapp: body.whatsapp || '',
        pelotao: body.pelotao || 'Sede Central / Velosão',
        tipoPassageiro: body.tipoPassageiro || 'Sócio (Com Desconto)',
        numeroMatricula: body.numeroMatricula || '-',
        valorPago: Number(body.valorPago) || 0,
        onibusEscolhido: body.onibusEscolhido || 'Ônibus 01 - Comando TGA (Bateria/Faixas)',
        statusPix: body.statusPix || 'Aguardando PIX',
        createdAt: new Date().toISOString()
      };
      db.inscricoesCaravana.unshift(novaInscricao);
      if (caravana) {
        caravana.vagasOcupadas = (Number(caravana.vagasOcupadas) || 0) + 1;
      }
      await writeDb(db);
      return sendJson(res, 201, { inscricao: novaInscricao, caravana });
    }

    if (pathname.startsWith('/api/inscricoes-caravana/') && req.method === 'PATCH') {
      const id = pathname.replace('/api/inscricoes-caravana/', '');
      const body = await parseBody(req);
      const db = ensureMasterAndCollections(await readDb());
      const idx = db.inscricoesCaravana.findIndex((i) => i.id === id);
      if (idx === -1) return sendJson(res, 404, { error: 'Inscrição não encontrada' });
      const { _auditoria, ...fields } = body;
      db.inscricoesCaravana[idx] = { ...db.inscricoesCaravana[idx], ...fields };
      if (_auditoria) appendAuditLog(db, _auditoria);
      await writeDb(db);
      return sendJson(res, 200, { inscricao: db.inscricoesCaravana[idx], auditoriaLogs: db.auditoriaLogs });
    }

    if (pathname.startsWith('/api/inscricoes-caravana/') && req.method === 'DELETE') {
      const id = pathname.replace('/api/inscricoes-caravana/', '');
      const body = await parseBody(req).catch(() => ({}));
      const db = ensureMasterAndCollections(await readDb());
      const target = db.inscricoesCaravana.find((i) => i.id === id);
      if (target) {
        const caravana = db.caravanas.find((c) => c.id === target.caravanaId);
        if (caravana && caravana.vagasOcupadas > 0) {
          caravana.vagasOcupadas -= 1;
        }
      }
      db.inscricoesCaravana = db.inscricoesCaravana.filter((i) => i.id !== id);
      if (body && body._auditoria) appendAuditLog(db, body._auditoria);
      await writeDb(db);
      return sendJson(res, 200, { deleted: id, auditoriaLogs: db.auditoriaLogs });
    }

    if (pathname === '/api/caravanas' && req.method === 'POST') {
      const body = await parseBody(req);
      const db = ensureMasterAndCollections(await readDb());
      const { _auditoria, ...fields } = body;
      const novaCaravana = {
        id: 'car-' + Date.now(),
        jogo: fields.jogo || 'Nova Caravana Garra Alviverde',
        adversario: fields.adversario || '',
        estadio: fields.estadio || '',
        dataJogo: fields.dataJogo || '',
        horarioSaida: fields.horarioSaida || '',
        localSaida: fields.localSaida || 'Estádio Mozart Veloso do Carmo (Velosão)',
        valorSocio: Number(fields.valorSocio) || 0,
        valorNaoSocio: Number(fields.valorNaoSocio) || 0,
        vagasTotais: Number(fields.vagasTotais) || 45,
        vagasOcupadas: 0,
        incluiIngresso: fields.incluiIngresso || 'Ônibus Ida e Volta saindo de Rio Verde - GO',
        status: 'Aberta'
      };
      db.caravanas.unshift(novaCaravana);
      if (_auditoria) appendAuditLog(db, _auditoria);
      await writeDb(db);
      return sendJson(res, 201, novaCaravana);
    }

    if (pathname.startsWith('/api/caravanas/') && req.method === 'PATCH') {
      const id = pathname.replace('/api/caravanas/', '');
      const body = await parseBody(req);
      const db = ensureMasterAndCollections(await readDb());
      const idx = db.caravanas.findIndex((c) => c.id === id);
      if (idx === -1) return sendJson(res, 404, { error: 'Caravana não encontrada' });
      const { _auditoria, ...fields } = body;
      db.caravanas[idx] = { ...db.caravanas[idx], ...fields };
      if (_auditoria) appendAuditLog(db, _auditoria);
      await writeDb(db);
      return sendJson(res, 200, db.caravanas[idx]);
    }

    if (pathname.startsWith('/api/caravanas/') && req.method === 'DELETE') {
      const id = pathname.replace('/api/caravanas/', '');
      const body = await parseBody(req).catch(() => ({}));
      const db = ensureMasterAndCollections(await readDb());
      db.caravanas = (db.caravanas || []).filter((c) => c.id !== id);
      if (body && body._auditoria) appendAuditLog(db, body._auditoria);
      await writeDb(db);
      return sendJson(res, 200, { deleted: id, auditoriaLogs: db.auditoriaLogs });
    }

    if (pathname === '/api/config' && req.method === 'PUT') {
      const body = await parseBody(req);
      const db = ensureMasterAndCollections(await readDb());
      const { _auditoria, ...fields } = body;
      db.config = { ...db.config, ...fields };
      ensureMasterAndCollections(db);
      if (_auditoria) appendAuditLog(db, _auditoria);
      await writeDb(db);
      return sendJson(res, 200, db.config);
    }

    if (pathname === '/api/diretores' && req.method === 'POST') {
      const body = await parseBody(req);
      const db = ensureMasterAndCollections(await readDb());
      const { _auditoria, ...fields } = body;
      const loginClean = String(fields.usuario || '').trim().toLowerCase();
      if (!loginClean) {
        return sendJson(res, 400, { error: 'Usuário inválido' });
      }
      if (db.usuariosDiretoria.some((u) => String(u.usuario || '').toLowerCase() === loginClean)) {
        return sendJson(res, 409, { error: 'Este nome de usuário já existe' });
      }
      const novoDiretor = {
        id: 'dir-' + Date.now(),
        usuario: loginClean,
        nome: fields.nome || loginClean,
        cargo: fields.cargo || 'Diretor TGA',
        senha: fields.senha || 'Tga@2026',
        isMaster: false,
        ativo: true,
        permissoes: {
          aprovarPixSocio: Boolean(fields.permissoes?.aprovarPixSocio),
          editarSocio: Boolean(fields.permissoes?.editarSocio),
          excluirSocio: Boolean(fields.permissoes?.excluirSocio),
          aprovarPixCaravana: Boolean(fields.permissoes?.aprovarPixCaravana),
          excluirPassageiroCaravana: Boolean(fields.permissoes?.excluirPassageiroCaravana),
          gerenciarCaravanas: Boolean(fields.permissoes?.gerenciarCaravanas),
          exportarPlanilhas: Boolean(fields.permissoes?.exportarPlanilhas),
          alterarConfiguracoes: false
        },
        createdAt: new Date().toISOString()
      };
      db.usuariosDiretoria.push(novoDiretor);
      if (_auditoria) appendAuditLog(db, _auditoria);
      await writeDb(db);
      return sendJson(res, 201, { diretor: novoDiretor, usuariosDiretoria: db.usuariosDiretoria, auditoriaLogs: db.auditoriaLogs });
    }

    if (pathname.startsWith('/api/diretores/') && req.method === 'PATCH') {
      const id = pathname.replace('/api/diretores/', '');
      const body = await parseBody(req);
      const db = ensureMasterAndCollections(await readDb());
      const idx = db.usuariosDiretoria.findIndex((u) => u.id === id);
      if (idx === -1) return sendJson(res, 404, { error: 'Diretor não encontrado' });
      const { _auditoria, ...fields } = body;
      const target = db.usuariosDiretoria[idx];
      if (target.isMaster) {
        if (fields.senha) {
          target.senha = fields.senha;
          if (db.config) db.config.senhaAdmin = fields.senha;
        }
        if (fields.nome) target.nome = fields.nome;
      } else {
        db.usuariosDiretoria[idx] = {
          ...target,
          ...fields,
          isMaster: false,
          permissoes: fields.permissoes ? { ...target.permissoes, ...fields.permissoes, alterarConfiguracoes: false } : target.permissoes
        };
      }
      if (_auditoria) appendAuditLog(db, _auditoria);
      await writeDb(db);
      return sendJson(res, 200, { diretor: db.usuariosDiretoria[idx], usuariosDiretoria: db.usuariosDiretoria, auditoriaLogs: db.auditoriaLogs });
    }

    if (pathname.startsWith('/api/diretores/') && req.method === 'DELETE') {
      const id = pathname.replace('/api/diretores/', '');
      const body = await parseBody(req).catch(() => ({}));
      const db = ensureMasterAndCollections(await readDb());
      const target = db.usuariosDiretoria.find((u) => u.id === id);
      if (target && target.isMaster) {
        return sendJson(res, 403, { error: 'Não é permitido excluir o usuário Master' });
      }
      db.usuariosDiretoria = db.usuariosDiretoria.filter((u) => u.id !== id);
      if (body && body._auditoria) appendAuditLog(db, body._auditoria);
      await writeDb(db);
      return sendJson(res, 200, { deleted: id, usuariosDiretoria: db.usuariosDiretoria, auditoriaLogs: db.auditoriaLogs });
    }

    if (pathname === '/api/auditoria' && req.method === 'POST') {
      const body = await parseBody(req);
      const db = ensureMasterAndCollections(await readDb());
      appendAuditLog(db, body);
      await writeDb(db);
      return sendJson(res, 201, { auditoriaLogs: db.auditoriaLogs });
    }

    if (pathname === '/api/backup/cron' && (req.method === 'GET' || req.method === 'POST')) {
      const db = ensureMasterAndCollections(await readDb());
      const created = await ensureDailyBackup(db, true);
      const backups = await readBackups();
      return sendJson(res, 200, {
        ok: true,
        executadoEm: new Date().toISOString(),
        dataReferencia: getBrasiliaDateString(),
        novoBackupCriado: Boolean(created),
        totalBackupsSalvos: backups.length
      });
    }

    if (pathname === '/api/backups' && req.method === 'GET') {
      const db = ensureMasterAndCollections(await readDb());
      await ensureDailyBackup(db, true);
      const backups = await readBackups();
      return sendJson(res, 200, { backups });
    }

    if (pathname === '/api/backups' && req.method === 'POST') {
      const body = await parseBody(req).catch(() => ({}));
      const db = ensureMasterAndCollections(await readDb());
      const backups = await readBackups();
      const entry = buildBackupEntry(
        db,
        body.tipo || 'Manual (Master)',
        body.autor || 'Jully Gabriel (Master)'
      );
      backups.unshift(entry);
      const savedBackups = await writeBackups(backups);
      if (body && body._auditoria) {
        appendAuditLog(db, body._auditoria);
        await writeDb(db);
      }
      return sendJson(res, 201, {
        backup: entry,
        backups: savedBackups,
        auditoriaLogs: db.auditoriaLogs
      });
    }

    if (pathname === '/api/backups/restore' && req.method === 'POST') {
      const body = await parseBody(req);
      const currentDb = ensureMasterAndCollections(await readDb());
      const backups = await readBackups();

      let targetSnapshot = null;
      let origemDescricao = 'Arquivo de Backup (.JSON)';

      if (body.backupId) {
        const found = backups.find((b) => b.id === body.backupId);
        if (!found || !found.snapshot) {
          return sendJson(res, 404, { error: 'Ponto de backup não encontrado no cofre.' });
        }
        targetSnapshot = found.snapshot;
        origemDescricao = `${found.tipo} de ${found.dataReferencia}`;
      } else if (body.snapshot && typeof body.snapshot === 'object') {
        targetSnapshot = body.snapshot.snapshot ? body.snapshot.snapshot : body.snapshot;
        origemDescricao = body.origem || 'Arquivo .JSON enviado pelo Master';
      } else {
        return sendJson(res, 400, { error: 'Dados de restauração inválidos.' });
      }

      // Salva um backup automático de segurança do estado imediatamente anterior à restauração
      const safetyBackup = buildBackupEntry(
        currentDb,
        'Pré-Restauração (Segurança)',
        body.autor || 'Jully Gabriel (Master)'
      );
      backups.unshift(safetyBackup);
      const savedBackups = await writeBackups(backups);

      const restoredDb = ensureMasterAndCollections({
        config: targetSnapshot.config || currentDb.config,
        caravanas: Array.isArray(targetSnapshot.caravanas) ? targetSnapshot.caravanas : [],
        socios: Array.isArray(targetSnapshot.socios) ? targetSnapshot.socios : [],
        inscricoesCaravana: Array.isArray(targetSnapshot.inscricoesCaravana) ? targetSnapshot.inscricoesCaravana : [],
        materiais: Array.isArray(targetSnapshot.materiais) ? targetSnapshot.materiais : currentDb.materiais,
        pedidosMateriais: Array.isArray(targetSnapshot.pedidosMateriais) ? targetSnapshot.pedidosMateriais : currentDb.pedidosMateriais,
        jogosEcrv: Array.isArray(targetSnapshot.jogosEcrv) ? targetSnapshot.jogosEcrv : currentDb.jogosEcrv,
        checkinsJogos: Array.isArray(targetSnapshot.checkinsJogos) ? targetSnapshot.checkinsJogos : currentDb.checkinsJogos,
        eventosTga: Array.isArray(targetSnapshot.eventosTga) ? targetSnapshot.eventosTga : currentDb.eventosTga,
        participantesEventos: Array.isArray(targetSnapshot.participantesEventos) ? targetSnapshot.participantesEventos : currentDb.participantesEventos,
        usuariosDiretoria: Array.isArray(targetSnapshot.usuariosDiretoria) ? targetSnapshot.usuariosDiretoria : currentDb.usuariosDiretoria,
        auditoriaLogs: Array.isArray(targetSnapshot.auditoriaLogs) ? targetSnapshot.auditoriaLogs : []
      });

      appendAuditLog(restoredDb, body._auditoria || {
        diretorNome: 'Jully Gabriel (Master)',
        diretorUsuario: 'jully',
        categoria: 'Configurações',
        acao: `Restaurou o sistema a partir de um Backup (${origemDescricao})`,
        detalhes: `Sócios restaurados: ${restoredDb.socios.length} | Passageiros: ${restoredDb.inscricoesCaravana.length}`
      });

      await writeDb(restoredDb);
      return sendJson(res, 200, {
        ok: true,
        state: restoredDb,
        backups: savedBackups
      });
    }

    // ========================================================================
    // ROTAS DA LOJA DE MATERIAIS TGA & PEDIDOS COM DESCONTO DE SÓCIO
    // ========================================================================
    if (pathname === '/api/materiais' && req.method === 'POST') {
      const body = await parseBody(req);
      const db = ensureMasterAndCollections(await readDb());
      const { _auditoria, ...fields } = body;
      const novoMaterial = {
        id: 'mat-' + Date.now(),
        nome: fields.nome || 'Material Oficial TGA',
        categoria: fields.categoria || 'Material Oficial',
        descricao: fields.descricao || '',
        valorSocio: Number(fields.valorSocio) || 0,
        valorNaoSocio: Number(fields.valorNaoSocio) || 0,
        tamanhos: fields.tamanhos || 'P, M, G, GG, XG',
        estoqueStatus: fields.estoqueStatus || 'Disponível',
        fotoDataUrl: fields.fotoDataUrl || '/assets/logo-tga.jpg',
        createdAt: new Date().toISOString()
      };
      db.materiais.unshift(novoMaterial);
      if (_auditoria) appendAuditLog(db, _auditoria);
      await writeDb(db);
      return sendJson(res, 201, { material: novoMaterial, materiais: db.materiais, auditoriaLogs: db.auditoriaLogs });
    }

    if (pathname.startsWith('/api/materiais/') && req.method === 'PATCH') {
      const id = pathname.replace('/api/materiais/', '');
      const body = await parseBody(req);
      const db = ensureMasterAndCollections(await readDb());
      const idx = db.materiais.findIndex((m) => m.id === id);
      if (idx === -1) return sendJson(res, 404, { error: 'Material não encontrado' });
      const { _auditoria, ...fields } = body;
      db.materiais[idx] = { ...db.materiais[idx], ...fields };
      if (_auditoria) appendAuditLog(db, _auditoria);
      await writeDb(db);
      return sendJson(res, 200, { material: db.materiais[idx], materiais: db.materiais, auditoriaLogs: db.auditoriaLogs });
    }

    if (pathname.startsWith('/api/materiais/') && req.method === 'DELETE') {
      const id = pathname.replace('/api/materiais/', '');
      const body = await parseBody(req).catch(() => ({}));
      const db = ensureMasterAndCollections(await readDb());
      db.materiais = (db.materiais || []).filter((m) => m.id !== id);
      if (body && body._auditoria) appendAuditLog(db, body._auditoria);
      await writeDb(db);
      return sendJson(res, 200, { deleted: id, materiais: db.materiais, auditoriaLogs: db.auditoriaLogs });
    }

    if (pathname === '/api/pedidos-materiais' && req.method === 'POST') {
      const body = await parseBody(req);
      const db = ensureMasterAndCollections(await readDb());
      const novoPedido = {
        id: 'ped-' + Date.now(),
        materialId: body.materialId || '',
        materialNome: body.materialNome || 'Material Oficial TGA',
        compradorNome: body.compradorNome || '',
        cpf: body.cpf || '',
        whatsapp: body.whatsapp || '',
        tamanho: body.tamanho || 'G',
        quantidade: Number(body.quantidade) || 1,
        isSocioDesconto: Boolean(body.isSocioDesconto),
        statusSocioVerificado: body.statusSocioVerificado || 'Não-Sócio',
        valorUnitario: Number(body.valorUnitario) || 0,
        valorTotal: Number(body.valorTotal) || 0,
        statusPix: body.statusPix || 'Pendente PIX',
        createdAt: new Date().toISOString()
      };
      db.pedidosMateriais.unshift(novoPedido);
      await writeDb(db);
      return sendJson(res, 201, { pedido: novoPedido, pedidosMateriais: db.pedidosMateriais });
    }

    if (pathname.startsWith('/api/pedidos-materiais/') && req.method === 'PATCH') {
      const id = pathname.replace('/api/pedidos-materiais/', '');
      const body = await parseBody(req);
      const db = ensureMasterAndCollections(await readDb());
      const idx = db.pedidosMateriais.findIndex((p) => p.id === id);
      if (idx === -1) return sendJson(res, 404, { error: 'Pedido não encontrado' });
      const { _auditoria, ...fields } = body;
      db.pedidosMateriais[idx] = { ...db.pedidosMateriais[idx], ...fields };
      if (_auditoria) appendAuditLog(db, _auditoria);
      await writeDb(db);
      return sendJson(res, 200, { pedido: db.pedidosMateriais[idx], pedidosMateriais: db.pedidosMateriais, auditoriaLogs: db.auditoriaLogs });
    }

    if (pathname.startsWith('/api/pedidos-materiais/') && req.method === 'DELETE') {
      const id = pathname.replace('/api/pedidos-materiais/', '');
      const body = await parseBody(req).catch(() => ({}));
      const db = ensureMasterAndCollections(await readDb());
      db.pedidosMateriais = (db.pedidosMateriais || []).filter((p) => p.id !== id);
      if (body && body._auditoria) appendAuditLog(db, body._auditoria);
      await writeDb(db);
      return sendJson(res, 200, { deleted: id, pedidosMateriais: db.pedidosMateriais, auditoriaLogs: db.auditoriaLogs });
    }

    // ========================================================================
    // ROTAS DA TABELA DE JOGOS DO E.C.R.V. & CHECK-IN DE INGRESSOS NO VELOSÃO
    // ========================================================================
    if (pathname === '/api/jogos' && req.method === 'POST') {
      const body = await parseBody(req);
      const db = ensureMasterAndCollections(await readDb());
      const { _auditoria, ...fields } = body;
      const novoJogo = {
        id: 'jog-' + Date.now(),
        campeonato: fields.campeonato || 'Campeonato Goiano',
        rodada: fields.rodada || 'Rodada Oficial',
        mando: fields.mando || 'Em Casa (Velosão)',
        adversario: fields.adversario || 'Esporte Clube Rio Verde (E.C.R.V.) vs. Adversário',
        dataJogo: fields.dataJogo || '',
        horario: fields.horario || '16:00',
        estadio: fields.estadio || 'Estádio Mozart Veloso do Carmo (Velosão) — Rio Verde - GO',
        placar: fields.placar || '',
        status: fields.status || 'Check-in de Ingresso Aberto'
      };
      db.jogosEcrv.unshift(novoJogo);
      if (_auditoria) appendAuditLog(db, _auditoria);
      await writeDb(db);
      return sendJson(res, 201, { jogo: novoJogo, jogosEcrv: db.jogosEcrv, auditoriaLogs: db.auditoriaLogs });
    }

    if (pathname.startsWith('/api/jogos/') && req.method === 'PATCH') {
      const id = pathname.replace('/api/jogos/', '');
      const body = await parseBody(req);
      const db = ensureMasterAndCollections(await readDb());
      const idx = db.jogosEcrv.findIndex((j) => j.id === id);
      if (idx === -1) return sendJson(res, 404, { error: 'Jogo não encontrado' });
      const { _auditoria, ...fields } = body;
      db.jogosEcrv[idx] = { ...db.jogosEcrv[idx], ...fields };
      if (_auditoria) appendAuditLog(db, _auditoria);
      await writeDb(db);
      return sendJson(res, 200, { jogo: db.jogosEcrv[idx], jogosEcrv: db.jogosEcrv, auditoriaLogs: db.auditoriaLogs });
    }

    if (pathname.startsWith('/api/jogos/') && req.method === 'DELETE') {
      const id = pathname.replace('/api/jogos/', '');
      const body = await parseBody(req).catch(() => ({}));
      const db = ensureMasterAndCollections(await readDb());
      db.jogosEcrv = (db.jogosEcrv || []).filter((j) => j.id !== id);
      if (body && body._auditoria) appendAuditLog(db, body._auditoria);
      await writeDb(db);
      return sendJson(res, 200, { deleted: id, jogosEcrv: db.jogosEcrv, auditoriaLogs: db.auditoriaLogs });
    }

    if (pathname === '/api/checkins-jogos' && req.method === 'POST') {
      const body = await parseBody(req);
      const db = ensureMasterAndCollections(await readDb());
      const cleanCpf = String(body.socioCpf || '').replace(/\D/g, '');
      const already = db.checkinsJogos.find(
        (c) => c.jogoId === body.jogoId && String(c.socioCpf || '').replace(/\D/g, '') === cleanCpf
      );
      if (already) {
        return sendJson(res, 200, { checkin: already, checkinsJogos: db.checkinsJogos, duplicate: true });
      }
      const novoCheckin = {
        id: 'chk-' + Date.now(),
        jogoId: body.jogoId || '',
        jogoTitulo: body.jogoTitulo || 'Jogo do E.C.R.V. no Velosão',
        socioId: body.socioId || '',
        socioNome: body.socioNome || '',
        socioCpf: body.socioCpf || '',
        socioNumeroCamisa: body.socioNumeroCamisa || '—',
        socioStatusPagamento: body.socioStatusPagamento || 'Em Dia',
        socioWhatsapp: body.socioWhatsapp || '',
        statusPortaria: 'Ingresso Garantido ✔',
        createdAt: new Date().toISOString()
      };
      db.checkinsJogos.unshift(novoCheckin);
      await writeDb(db);
      return sendJson(res, 201, { checkin: novoCheckin, checkinsJogos: db.checkinsJogos });
    }

    if (pathname.startsWith('/api/checkins-jogos/') && req.method === 'DELETE') {
      const id = pathname.replace('/api/checkins-jogos/', '');
      const body = await parseBody(req).catch(() => ({}));
      const db = ensureMasterAndCollections(await readDb());
      db.checkinsJogos = (db.checkinsJogos || []).filter((c) => c.id !== id);
      if (body && body._auditoria) appendAuditLog(db, body._auditoria);
      await writeDb(db);
      return sendJson(res, 200, { deleted: id, checkinsJogos: db.checkinsJogos, auditoriaLogs: db.auditoriaLogs });
    }

    // ========================================================================
    // ROTAS DO PAINEL DE EVENTOS & AÇÕES SOCIAIS DA TGA (DOAÇÃO DE SANGUE, PÁSCOA, NATAL, DIA DAS CRIANÇAS)
    // ========================================================================
    if (pathname === '/api/eventos' && req.method === 'POST') {
      const body = await parseBody(req);
      const db = ensureMasterAndCollections(await readDb());
      const { _auditoria, ...fields } = body;
      const novoEvento = {
        id: 'ev-' + Date.now(),
        categoria: fields.categoria || 'Ações Sociais',
        titulo: fields.titulo || 'Evento Oficial Garra Alviverde',
        dataEvento: fields.dataEvento || '',
        horario: fields.horario || '08:00',
        local: fields.local || 'Estádio Mozart Veloso do Carmo (Velosão) — Rio Verde - GO',
        descricao: fields.descricao || '',
        isentaParcela: fields.isentaParcela !== false,
        status: fields.status || 'Aberto',
        createdAt: new Date().toISOString()
      };
      db.eventosTga.unshift(novoEvento);
      if (_auditoria) appendAuditLog(db, _auditoria);
      await writeDb(db);
      return sendJson(res, 201, { evento: novoEvento, eventosTga: db.eventosTga, auditoriaLogs: db.auditoriaLogs });
    }

    if (pathname.startsWith('/api/eventos/') && req.method === 'PATCH') {
      const id = pathname.replace('/api/eventos/', '');
      const body = await parseBody(req);
      const db = ensureMasterAndCollections(await readDb());
      const idx = db.eventosTga.findIndex((ev) => ev.id === id);
      if (idx === -1) return sendJson(res, 404, { error: 'Evento não encontrado' });
      const { _auditoria, ...fields } = body;
      db.eventosTga[idx] = { ...db.eventosTga[idx], ...fields };
      if (_auditoria) appendAuditLog(db, _auditoria);
      await writeDb(db);
      return sendJson(res, 200, { evento: db.eventosTga[idx], eventosTga: db.eventosTga, auditoriaLogs: db.auditoriaLogs });
    }

    if (pathname.startsWith('/api/eventos/') && req.method === 'DELETE') {
      const id = pathname.replace('/api/eventos/', '');
      const body = await parseBody(req).catch(() => ({}));
      const db = ensureMasterAndCollections(await readDb());
      db.eventosTga = (db.eventosTga || []).filter((ev) => ev.id !== id);
      if (body && body._auditoria) appendAuditLog(db, body._auditoria);
      await writeDb(db);
      return sendJson(res, 200, { deleted: id, eventosTga: db.eventosTga, auditoriaLogs: db.auditoriaLogs });
    }

    if (pathname === '/api/participantes-eventos' && req.method === 'POST') {
      const body = await parseBody(req);
      const db = ensureMasterAndCollections(await readDb());
      const cleanCpf = String(body.cpf || '').replace(/\D/g, '');
      if (cleanCpf.length >= 6) {
        const dup = db.participantesEventos.find(
          (p) => p.eventoId === body.eventoId && String(p.cpf || '').replace(/\D/g, '') === cleanCpf
        );
        if (dup) {
          return sendJson(res, 200, { participante: dup, participantesEventos: db.participantesEventos, duplicate: true });
        }
      }
      const novoParticipante = {
        id: 'part-' + Date.now(),
        eventoId: body.eventoId || '',
        eventoTitulo: body.eventoTitulo || 'Evento TGA',
        eventoCategoria: body.eventoCategoria || 'Ações Sociais',
        socioId: body.socioId || '',
        socioMatricula: body.socioMatricula || '',
        isSocio: Boolean(body.isSocio),
        nome: body.nome || '',
        cpf: body.cpf || '',
        whatsapp: body.whatsapp || '',
        tipoSanguineo: body.tipoSanguineo || 'Não informado',
        modalidadeParticipacao: body.modalidadeParticipacao || 'Participação Voluntária',
        statusPresenca: body.statusPresenca || 'Inscrito',
        parcelaIsentaAplicada: Boolean(body.parcelaIsentaAplicada),
        createdAt: new Date().toISOString()
      };
      db.participantesEventos.unshift(novoParticipante);
      await writeDb(db);
      return sendJson(res, 201, { participante: novoParticipante, participantesEventos: db.participantesEventos });
    }

    if (pathname.startsWith('/api/participantes-eventos/') && req.method === 'PATCH') {
      const id = pathname.replace('/api/participantes-eventos/', '');
      const body = await parseBody(req);
      const db = ensureMasterAndCollections(await readDb());
      const idx = db.participantesEventos.findIndex((p) => p.id === id);
      if (idx === -1) return sendJson(res, 404, { error: 'Participante não encontrado' });
      const { _auditoria, ...fields } = body;
      db.participantesEventos[idx] = { ...db.participantesEventos[idx], ...fields };
      if (_auditoria) appendAuditLog(db, _auditoria);
      await writeDb(db);
      return sendJson(res, 200, {
        participante: db.participantesEventos[idx],
        participantesEventos: db.participantesEventos,
        auditoriaLogs: db.auditoriaLogs
      });
    }

    if (pathname.startsWith('/api/participantes-eventos/') && req.method === 'DELETE') {
      const id = pathname.replace('/api/participantes-eventos/', '');
      const body = await parseBody(req).catch(() => ({}));
      const db = ensureMasterAndCollections(await readDb());
      db.participantesEventos = (db.participantesEventos || []).filter((p) => p.id !== id);
      if (body && body._auditoria) appendAuditLog(db, body._auditoria);
      await writeDb(db);
      return sendJson(res, 200, { deleted: id, participantesEventos: db.participantesEventos, auditoriaLogs: db.auditoriaLogs });
    }
  } catch (apiErr) {
    console.error('Erro na API:', apiErr);
    return sendJson(res, 500, { error: apiErr.message || 'Erro interno do servidor' });
  }

  // Static Files
  const staticFile = findStaticFile(pathname) || findStaticFile('/index.html');
  if (staticFile) {
    const ext = path.extname(staticFile).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      Pragma: 'no-cache',
      Expires: '0'
    });
    fs.createReadStream(staticFile).pipe(res);
  } else {
    res.writeHead(404);
    res.end('Arquivo não encontrado');
  }
}

// Inicializa o servidor HTTP apenas localmente (na Vercel o index.js exporta o requestHandler para @vercel/node)
if (!IS_VERCEL && require.main === module) {
  ensureLocalDb();
  const server = http.createServer(requestHandler);
  server.listen(Number(process.env.PORT || 3000), () => {
    console.log(`Portal Garra Alviverde (TGA) rodando na porta ${PORT}`);
    // Verifica/cria o backup diário logo ao iniciar e a cada minuto (dispara exatamente às 00:00)
    readDb().then((db) => ensureDailyBackup(ensureMasterAndCollections(db), true)).catch(() => {});
    setInterval(async () => {
      try {
        const db = ensureMasterAndCollections(await readDb());
        await ensureDailyBackup(db, false);
      } catch (e) {}
    }, 60 * 1000);
  });
}

module.exports = requestHandler;


