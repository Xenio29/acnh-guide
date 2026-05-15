const fs = require('fs');
const path = require('path');

const jsonPath = path.resolve(__dirname, '..', 'Data', 'villagers_enriched.json');
const outPath = path.resolve(__dirname, '..', 'src', 'app', 'villagers', 'villagers.ts');

if (!fs.existsSync(jsonPath)) {
  console.error('Enriched JSON not found:', jsonPath);
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

const header = `import { Component } from '@angular/core';

const villagerData: Array<{
  en: string;
  fr: string;
  species_en: string;
  species_fr: string;
  gender_en: string;
  gender_fr: string;
  personality_en: string;
  personality_fr: string;
  hobby_en: string;
  hobby_fr: string;
  birthday: string;
  color1: string;
  color2: string;
}> = `;

function escapeStr(s) {
  return s.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$').replace(/'/g, "\\'");
}

const items = data.map(d => {
  return `  { en: '${escapeStr(d.en || '')}', fr: '${escapeStr(d.fr || '')}', species_en: '${escapeStr(d.species_en || '')}', species_fr: '${escapeStr(d.species_fr || '')}', gender_en: '${escapeStr(d.gender_en || '')}', gender_fr: '${escapeStr(d.gender_fr || '')}', personality_en: '${escapeStr(d.personality_en || '')}', personality_fr: '${escapeStr(d.personality_fr || '')}', hobby_en: '${escapeStr(d.hobby_en || '')}', hobby_fr: '${escapeStr(d.hobby_fr || '')}', birthday: '${escapeStr(d.birthday || '')}', color1: '${escapeStr(d.color1 || '')}', color2: '${escapeStr(d.color2 || '')}' }`;
}).join(',\n');

const footer = ` as const;

@Component({
  selector: 'app-villagers',
  imports: [],
  templateUrl: './villagers.html',
  styleUrl: './villagers.css',
})
export class Villagers {

}
`;

const content = header + '[\n' + items + '\n]' + footer;
fs.writeFileSync(outPath, content, 'utf8');
console.log('Wrote', outPath);
