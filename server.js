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

function ensureMasterAndCollections(db) {
  db.socios = Array.isArray(db.socios) ? db.socios : [];
  db.caravanas = Array.isArray(db.caravanas) ? db.caravanas : [];
  db.inscricoesCaravana = Array.isArray(db.inscricoesCaravana) ? db.inscricoesCaravana : [];
  db.auditoriaLogs = Array.isArray(db.auditoriaLogs) ? db.auditoriaLogs : [];
  db.usuariosDiretoria = Array.isArray(db.usuariosDiretoria) ? db.usuariosDiretoria : [];

  if (db.config) {
    if (!db.config.whatsappDiretoria || db.config.whatsappDiretoria === '(64) 99220-9870') {
      db.config.whatsappDiretoria = '(64) 99330-2283';
    }
    if (!db.config.senhaAdmin || db.config.senhaAdmin === '2015') {
      db.config.senhaAdmin = 'Tga@2015';
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
    path.join(PUBLIC_DIR, cleanRel),
    path.join(__dirname, cleanRel),
    path.join(PUBLIC_DIR, 'assets', baseName),
    path.join(__dirname, baseName),
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
        planoNome: body.planoNome || 'Sócio Oficial Garra Alviverde (TGA)',
        valorPlano: Number(body.valorPlano) || 35.0,
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
  } catch (apiErr) {
    console.error('Erro na API:', apiErr);
    return sendJson(res, 500, { error: apiErr.message || 'Erro interno do servidor' });
  }

  // Static Files
  const staticFile = findStaticFile(pathname) || findStaticFile('/index.html');
  if (staticFile) {
    const ext = path.extname(staticFile).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType });
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
  });
}

module.exports = requestHandler;


