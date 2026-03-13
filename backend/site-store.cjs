const fs = require('fs');
const path = require('path');

const storageRoot = path.resolve(process.env.STORAGE_DIR || path.join(__dirname, '..', 'storage'));
const dataFile = path.resolve(process.env.DATA_FILE || path.join(storageRoot, 'db.json'));
const uploadsDir = path.resolve(process.env.UPLOADS_DIR || path.join(storageRoot, 'uploads'));
const bundledDataFile = path.join(__dirname, 'db.json');
const bundledUploadsDir = path.join(__dirname, '..', 'public', 'uploads');
const distDir = path.join(__dirname, '..', 'dist');
const publicDir = path.join(__dirname, '..', 'public');

const defaultData = {
  fleet: [],
  promoCars: [],
  carsForSale: [],
  posts: [],
  phones: { phone1: '', phone2: '', phone3: '' },
  socialLinks: { facebook: '', instagram: '', whatsapp: '' }
};

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function sanitizeData(value) {
  const source = value && typeof value === 'object' ? value : {};
  const { adminAuth, ...rest } = source;
  return {
    ...clone(defaultData),
    ...rest,
    fleet: Array.isArray(rest.fleet) ? rest.fleet : [],
    promoCars: Array.isArray(rest.promoCars) ? rest.promoCars : [],
    carsForSale: Array.isArray(rest.carsForSale) ? rest.carsForSale : [],
    posts: Array.isArray(rest.posts) ? rest.posts : [],
    phones: {
      ...defaultData.phones,
      ...(rest.phones && typeof rest.phones === 'object' ? rest.phones : {})
    },
    socialLinks: {
      ...defaultData.socialLinks,
      ...(rest.socialLinks && typeof rest.socialLinks === 'object' ? rest.socialLinks : {})
    }
  };
}

function readBundledData() {
  try {
    return sanitizeData(JSON.parse(fs.readFileSync(bundledDataFile, 'utf8')));
  } catch (_error) {
    return clone(defaultData);
  }
}

function ensureDirectory(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function syncBundledUploads() {
  ensureDirectory(uploadsDir);
  if (!fs.existsSync(bundledUploadsDir)) return;

  for (const entry of fs.readdirSync(bundledUploadsDir, { withFileTypes: true })) {
    if (!entry.isFile()) continue;
    const source = path.join(bundledUploadsDir, entry.name);
    const target = path.join(uploadsDir, entry.name);
    if (!fs.existsSync(target)) {
      try {
        fs.copyFileSync(source, target);
      } catch (e) {
        console.warn(`Warning: Could not sync bundled upload ${entry.name}: ${e.message}`);
      }
    }
  }
}

function ensureStorage() {
  ensureDirectory(path.dirname(dataFile));
  ensureDirectory(uploadsDir);

  if (!fs.existsSync(dataFile)) {
    fs.writeFileSync(dataFile, JSON.stringify(readBundledData(), null, 2));
  }

  syncBundledUploads();
}

function readData() {
  ensureStorage();
  try {
    return sanitizeData(JSON.parse(fs.readFileSync(dataFile, 'utf8')));
  } catch (_error) {
    const fallback = readBundledData();
    fs.writeFileSync(dataFile, JSON.stringify(fallback, null, 2));
    return fallback;
  }
}

function readPublicData() {
  return sanitizeData(readData());
}

function writeData(nextData) {
  const sanitized = sanitizeData(nextData);
  ensureStorage();
  fs.writeFileSync(dataFile, JSON.stringify(sanitized, null, 2));
  return sanitized;
}

function resetToBundledData() {
  const bundled = readBundledData();
  writeData(bundled);
  syncBundledUploads();
  return bundled;
}

module.exports = {
  dataFile,
  distDir,
  ensureStorage,
  publicDir,
  readData,
  readPublicData,
  resetToBundledData,
  uploadsDir,
  writeData
};
