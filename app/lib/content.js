import fs from 'fs';
import path from 'path';

const contentRoot = path.join(process.cwd(), 'content');

function withTinaSource(value, queryId, sourcePath = []) {
  if (!value || typeof value !== 'object') return value;

  value._content_source = { queryId, path: sourcePath };

  if (Array.isArray(value)) {
    value.forEach((item, index) => withTinaSource(item, queryId, [...sourcePath, index]));
    return value;
  }

  Object.entries(value).forEach(([key, child]) => {
    if (key !== '_content_source') withTinaSource(child, queryId, [...sourcePath, key]);
  });

  return value;
}

export function readContent(relativePath, queryId) {
  const filePath = path.join(contentRoot, relativePath);
  return withTinaSource(JSON.parse(fs.readFileSync(filePath, 'utf8')), queryId);
}

export function getSite() {
  return readContent('site.json', 'siteSettings');
}

export function getPage(slug, queryId) {
  return readContent(`pages/${slug}.json`, queryId);
}

export function getDoctor(slug) {
  return readContent(`doctors/${slug}.json`, 'doctorPages');
}

export function getMedications() {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), 'data/medications.json'), 'utf8'));
}
