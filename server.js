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
  path.join(__dirname, 'db.json'),
  path.join(__dirname, 'public', 'index.html'),
  path.join(__dirname, 'public', 'styles.css'),
  path.join(__dirname, 'public', 'app.js'),
  path.join(__dirname, 'public', 'assets', 'logo-tga.jpg'),
  path.join(__dirname, 'public', 'assets', 'escudo-ecrv.jpg'),
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
      const db = await readDb();
      db.socios = Array.isArray(db.socios) ? db.socios : [];
      db.caravanas = Array.isArray(db.caravanas) ? db.caravanas : [];
      db.inscricoesCaravana = Array.isArray(db.inscricoesCaravana) ? db.inscricoesCaravana : [];
      db.storageMode = getKvConfig() ? 'upstash-redis' : (getFirebaseUrl() ? 'firebase' : 'local-file');
      return sendJson(res, 200, db);
    }

    if (pathname === '/api/socios' && req.method === 'POST') {
      const body = await parseBody(req);
      const db = await readDb();
      db.socios = Array.isArray(db.socios) ? db.socios : [];
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
        pelotao: body.pelotao || 'Sede Central / Velosão',
        cidade: body.cidade || 'Rio Verde - GO',
        tamanhoCamisa: body.tamanhoCamisa || 'G',
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
      const db = await readDb();
      db.socios = Array.isArray(db.socios) ? db.socios : [];
      const idx = db.socios.findIndex((s) => s.id === id);
      if (idx === -1) return sendJson(res, 404, { error: 'Sócio não encontrado' });
      db.socios[idx] = { ...db.socios[idx], ...body };
      await writeDb(db);
      return sendJson(res, 200, db.socios[idx]);
    }

    if (pathname.startsWith('/api/socios/') && req.method === 'DELETE') {
      const id = pathname.replace('/api/socios/', '');
      const db = await readDb();
      db.socios = (db.socios || []).filter((s) => s.id !== id);
      await writeDb(db);
      return sendJson(res, 200, { deleted: id });
    }

    if (pathname === '/api/inscricoes-caravana' && req.method === 'POST') {
      const body = await parseBody(req);
      const db = await readDb();
      db.caravanas = Array.isArray(db.caravanas) ? db.caravanas : [];
      db.inscricoesCaravana = Array.isArray(db.inscricoesCaravana) ? db.inscricoesCaravana : [];
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
      const db = await readDb();
      db.inscricoesCaravana = Array.isArray(db.inscricoesCaravana) ? db.inscricoesCaravana : [];
      const idx = db.inscricoesCaravana.findIndex((i) => i.id === id);
      if (idx === -1) return sendJson(res, 404, { error: 'Inscrição não encontrada' });
      db.inscricoesCaravana[idx] = { ...db.inscricoesCaravana[idx], ...body };
      await writeDb(db);
      return sendJson(res, 200, db.inscricoesCaravana[idx]);
    }

    if (pathname.startsWith('/api/inscricoes-caravana/') && req.method === 'DELETE') {
      const id = pathname.replace('/api/inscricoes-caravana/', '');
      const db = await readDb();
      db.caravanas = Array.isArray(db.caravanas) ? db.caravanas : [];
      db.inscricoesCaravana = Array.isArray(db.inscricoesCaravana) ? db.inscricoesCaravana : [];
      const target = db.inscricoesCaravana.find((i) => i.id === id);
      if (target) {
        const caravana = db.caravanas.find((c) => c.id === target.caravanaId);
        if (caravana && caravana.vagasOcupadas > 0) {
          caravana.vagasOcupadas -= 1;
        }
      }
      db.inscricoesCaravana = db.inscricoesCaravana.filter((i) => i.id !== id);
      await writeDb(db);
      return sendJson(res, 200, { deleted: id });
    }

    if (pathname === '/api/caravanas' && req.method === 'POST') {
      const body = await parseBody(req);
      const db = await readDb();
      db.caravanas = Array.isArray(db.caravanas) ? db.caravanas : [];
      const novaCaravana = {
        id: 'car-' + Date.now(),
        jogo: body.jogo || 'Nova Caravana Garra Alviverde',
        adversario: body.adversario || '',
        estadio: body.estadio || '',
        dataJogo: body.dataJogo || '',
        horarioSaida: body.horarioSaida || '',
        localSaida: body.localSaida || 'Estádio Mozart Veloso do Carmo (Velosão)',
        valorSocio: Number(body.valorSocio) || 0,
        valorNaoSocio: Number(body.valorNaoSocio) || 0,
        vagasTotais: Number(body.vagasTotais) || 45,
        vagasOcupadas: 0,
        incluiIngresso: body.incluiIngresso || 'Ônibus Ida e Volta saindo de Rio Verde - GO',
        status: 'Aberta'
      };
      db.caravanas.unshift(novaCaravana);
      await writeDb(db);
      return sendJson(res, 201, novaCaravana);
    }

    if (pathname.startsWith('/api/caravanas/') && req.method === 'PATCH') {
      const id = pathname.replace('/api/caravanas/', '');
      const body = await parseBody(req);
      const db = await readDb();
      db.caravanas = Array.isArray(db.caravanas) ? db.caravanas : [];
      const idx = db.caravanas.findIndex((c) => c.id === id);
      if (idx === -1) return sendJson(res, 404, { error: 'Caravana não encontrada' });
      db.caravanas[idx] = { ...db.caravanas[idx], ...body };
      await writeDb(db);
      return sendJson(res, 200, db.caravanas[idx]);
    }

    if (pathname.startsWith('/api/caravanas/') && req.method === 'DELETE') {
      const id = pathname.replace('/api/caravanas/', '');
      const db = await readDb();
      db.caravanas = (db.caravanas || []).filter((c) => c.id !== id);
      await writeDb(db);
      return sendJson(res, 200, { deleted: id });
    }

    if (pathname === '/api/config' && req.method === 'PUT') {
      const body = await parseBody(req);
      const db = await readDb();
      db.config = { ...db.config, ...body };
      await writeDb(db);
      return sendJson(res, 200, db.config);
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

// Inicializa o servidor HTTP tanto localmente quanto no preset Node.js da Vercel
if (!global.__tgaServerStarted) {
  global.__tgaServerStarted = true;
  ensureLocalDb();
  const server = http.createServer(requestHandler);
  server.listen(PORT, () => {
    console.log(`Portal Garra Alviverde (TGA) rodando na porta ${PORT}`);
  });
}

module.exports = requestHandler;
