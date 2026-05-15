const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');

const xlsxPath = process.argv[2] || '/Users/Tigane/Documents/Programmation/acnh-guide/Data Spreadsheet for Animal Crossing New Horizons.xlsx';
const sheetName = process.argv[3] || 'Villagers';
const villagersTsPath = path.resolve(__dirname, '..', 'src', 'app', 'villagers', 'villagers.ts');

function findKey(keys, substrings) {
  substrings = Array.isArray(substrings) ? substrings : [substrings];
  const lower = keys.map(k => k.toLowerCase());
  for (const s of substrings) {
    const idx = lower.findIndex(k => k.includes(s.toLowerCase()));
    if (idx !== -1) return keys[idx];
  }
  return null;
}

function translateFallback(value, mapping) {
  if (!value) return '';
  const key = value.toString().toLowerCase();
  return mapping[key] || value;
}

const speciesMap = {
  cat: 'Chat',
  dog: 'Chien',
  horse: 'Cheval',
  bird: 'Oiseau',
  frog: 'Grenouille',
  hamster: 'Hamster',
  mouse: 'Souris',
  rabbit: 'Lapin',
  duck: 'Canard',
  cow: 'Vache',
  deer: 'Cerf',
  bear: 'Ours',
  pig: 'Cochon',
  goat: 'Chèvre',
  kangaroo: 'Kangourou',
  koala: 'Koala',
  octopus: 'Poulpe',
  alligator: 'Alligator',
  sheep: 'Mouton',
  monkey: 'Singe',
  bird: 'Oiseau'
};

const genderMap = { male: 'Mâle', female: 'Femelle' };

const personalityMap = {
  cranky: 'Boudeur',
  jock: 'Sportif',
  lazy: 'Paresseux',
  smug: 'Mignon',
  snooty: 'Snob',
  normal: 'Normal',
  peppy: 'Pétillante',
  sisterly: 'Soeur',
  uchi: 'Uchi'
};

const hobbyMap = {
  education: 'Éducation',
  music: 'Musique',
  fitness: 'Fitness',
  nature: 'Nature',
  fashion: 'Mode',
  play: 'Jeux'
};

console.log('Reading workbook:', xlsxPath, 'sheet:', sheetName);
const wb = xlsx.readFile(xlsxPath);
const sheet = wb.Sheets[sheetName];
if (!sheet) {
  console.error('Sheet not found:', sheetName);
  process.exit(1);
}

const rows = xlsx.utils.sheet_to_json(sheet, { defval: '' });
if (!rows.length) {
  console.error('No rows found in sheet');
  process.exit(1);
}

const headers = Object.keys(rows[0]);
console.log('Detected headers:', headers.join(', '));

// heuristics for columns
const nameEnKey = findKey(headers, ['name', 'english', 'en']);
const nameFrKey = findKey(headers, ['french', 'français', 'fr']);
const speciesKey = findKey(headers, ['species']);
const speciesFrKey = findKey(headers, ['species', 'espèce', 'espec']);
const genderKey = findKey(headers, ['gender', 'sex']);
const personalityKey = findKey(headers, ['personality']);
const hobbyKey = findKey(headers, ['hobby']);
const birthdayKey = findKey(headers, ['birthday', 'bday', 'birth']);
const color1Key = findKey(headers, ['color1', 'colour1', 'color 1', 'primary color', 'primary_colour']);
const color2Key = findKey(headers, ['color2', 'colour2', 'color 2', 'secondary color', 'secondary_colour']);

console.log({ nameEnKey, nameFrKey, speciesKey, speciesFrKey, genderKey, personalityKey, hobbyKey, birthdayKey });

// Read existing villager names from villagers.ts to preserve order
const villagersTs = fs.readFileSync(villagersTsPath, 'utf8');
const nameRegex = /\{\s*en:\s*'([^']+)',\s*fr:\s*'([^']+)'\s*\}/g;
const existingNames = [];
let m;
while ((m = nameRegex.exec(villagersTs))) {
  existingNames.push({ en: m[1], fr: m[2] });
}
console.log('Found', existingNames.length, 'existing villagers');

function findRowByName(enName) {
  return rows.find(r => {
    for (const key of Object.keys(r)) {
      const v = (r[key] || '').toString();
      if (v.toLowerCase() === enName.toLowerCase()) return true;
    }
    return false;
  });
}

let sourceRows = [];
if (existingNames.length) {
  sourceRows = existingNames.map(n => findRowByName(n.en) || {});
} else {
  sourceRows = rows;
}

const enriched = sourceRows.map(row => {
  // if row came from existingNames mapping, it will be an object; if existingNames was empty,
  // rows are the sheet rows where the english name is at nameEnKey
  const enName = row[nameEnKey] || row['Name'] || row['name'] || (row.en || '');
  const frName = row[nameFrKey] || row['French Name'] || row.fr || enName;
  const r = row;
  const species_en = row[speciesKey] || '';
  const species_fr = row[speciesFrKey] || translateFallback(species_en, speciesMap);
  const gender_en = row[genderKey] || '';
  const gender_fr = translateFallback(gender_en, genderMap);
  const personality_en = row[personalityKey] || '';
  const personality_fr = translateFallback(personality_en, personalityMap);
  const hobby_en = row[hobbyKey] || '';
  const hobby_fr = translateFallback(hobby_en, hobbyMap);
  const birthday = row[birthdayKey] || '';
  const color1 = row[color1Key] || '';
  const color2 = row[color2Key] || '';

  return {
    en: enName || '',
    fr: frName || '',
    species_en: species_en || '',
    species_fr: species_fr || '',
    gender_en: gender_en || '',
    gender_fr: gender_fr || '',
    personality_en: personality_en || '',
    personality_fr: personality_fr || '',
    hobby_en: hobby_en || '',
    hobby_fr: hobby_fr || '',
    birthday: birthday || '',
    color1: color1 || '',
    color2: color2 || ''
  };
});

const outPath = path.resolve(__dirname, '..', 'Data', 'villagers_enriched.json');
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(enriched, null, 2), 'utf8');
console.log('Wrote enriched data to', outPath);

// Also print a short summary
console.log('Sample:', enriched.slice(0,5));

// Exit with success
process.exit(0);
