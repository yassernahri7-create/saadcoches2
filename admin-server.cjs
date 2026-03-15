const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const {
  MAX_JSON_BYTES,
  clearSessionCookie,
  createCorsOptions,
  createSessionManager,
  createUploadMiddleware,
  getSessionToken,
  parsePort,
  setSessionCookie
} = require('./backend/server-common.cjs');
const { distDir, ensureStorage, readData, readPublicData, resetToBundledData, uploadsDir, writeData } = require('./backend/site-store.cjs');

const app = express();
const port = parsePort(process.env.ADMIN_PORT || process.env.PORT, 3109);
const devFrontendUrl = process.env.DEV_FRONTEND_URL || 'http://localhost:5173';
const distIndex = path.join(distDir, 'index.html');
const upload = createUploadMiddleware();
const sessions = createSessionManager();
const ADMIN_USER = process.env.ADMIN_USER || 'admin';
const ADMIN_PASS = process.env.ADMIN_PASS || '6543210';

if (!process.env.ADMIN_PASS) {
  console.warn('ADMIN_PASS is not set. Using development fallback credentials.');
}

ensureStorage();

app.use(cors(createCorsOptions()));
app.use(express.json({ limit: MAX_JSON_BYTES }));
app.use((req, _res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
  next();
});

function requireAuth(req, res, next) {
  if (!sessions.isValid(getSessionToken(req))) {
    res.status(401).json({ ok: false, error: 'unauthorized' });
    return;
  }
  next();
}

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'admin' });
});

app.post('/api/admin/login', (req, res) => {
  const username = typeof req.body?.username === 'string' ? req.body.username.trim() : '';
  const password = typeof req.body?.password === 'string' ? req.body.password.trim() : '';

  if (username !== ADMIN_USER || password !== ADMIN_PASS) {
    console.log(`LOGIN FAILED: user="${username}", pass="${password}" (expected "${ADMIN_USER}"/"${ADMIN_PASS}")`);
    res.status(401).json({ ok: false, error: 'invalid_credentials' });
    return;
  }

  console.log(`LOGIN SUCCESS: user="${username}"`);

  const token = sessions.create();
  setSessionCookie(res, token);
  res.json({ ok: true, user: ADMIN_USER });
});

app.get('/api/admin/session', (req, res) => {
  res.json({ ok: true, authenticated: sessions.isValid(getSessionToken(req)) });
});

app.post('/api/admin/logout', (req, res) => {
  sessions.remove(getSessionToken(req));
  clearSessionCookie(res);
  res.json({ ok: true });
});

app.get('/api/data', (_req, res) => {
  res.json(readPublicData());
});

app.get('/api/admin/data', requireAuth, (_req, res) => {
  res.json(readData());
});

app.post('/api/data', requireAuth, (req, res) => {
  const saved = writeData(req.body);
  res.json({ ok: true, data: saved });
});

app.post('/api/data/reset', requireAuth, (_req, res) => {
  const reset = resetToBundledData();
  res.json({ ok: true, data: reset });
});

app.post('/api/upload', requireAuth, (req, res, next) => {
  upload.single('image')(req, res, (error) => {
    if (error) {
      if (error.message === 'unsupported_file_type') {
        res.status(400).json({ ok: false, error: 'unsupported_file_type' });
        return;
      }
      if (error.code === 'LIMIT_FILE_SIZE') {
        res.status(413).json({ ok: false, error: 'file_too_large' });
        return;
      }
      next(error);
      return;
    }

    if (!req.file) {
      res.status(400).json({ ok: false, error: 'no_file_uploaded' });
      return;
    }

    res.json({ ok: true, url: `/uploads/${req.file.filename}` });
  });
});

app.use('/uploads', express.static(uploadsDir));
app.use(express.static(distDir, { index: false }));

app.get('/', (_req, res) => {
  res.redirect(302, '/admin');
});

app.get(/^\/admin(?:\/.*)?$/, (req, res) => {
  if (fs.existsSync(distIndex)) {
    res.sendFile(distIndex);
    return;
  }
  res.redirect(302, `${devFrontendUrl}${req.originalUrl || '/admin'}`);
});

app.use((_req, res) => {
  res.status(404).json({ ok: false, error: 'not_found' });
});

app.use((error, _req, res, _next) => {
  console.error('ADMIN SERVER ERROR:', error);
  res.status(500).json({ ok: false, error: 'internal_server_error' });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`NourCoches admin server running on 0.0.0.0:${port}`);
});
