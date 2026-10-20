module.exports = async function handler(req, res) {
  try {
    const requestHandler = require('./server');
    return await requestHandler(req, res);
  } catch (err) {
    console.error('Erro fatal na função Vercel:', err);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify({
      error: err.message,
      stack: err.stack
    }));
  }
};
