import fs from 'fs/promises';

const content = await fs.readFile('data.txt', 'utf-8');

const bag = {};
const consonants = {};
let total = 0;

for (let i = 0; i < content.length; i++) {
  const char = content[i];

  if (char >= '\u1000' && char <= '\u104F') {
    if (bag[char]) {
      bag[char]++;
    } else {
      bag[char] = 1;
    }
    total++;
  }

  if (char >= '\u1000' && char <= '\u1021') {
    if (consonants[char]) {
      consonants[char]++;
    } else {
      consonants[char] = 1;
    }
  }
}

// rank by frequency
const sorted = Object.entries(bag).sort((a, b) => b[1] - a[1]);

// write to result.txt

await fs.writeFile(
  'result.txt',
  sorted
    .map(
      ([char, count]) =>
        `${char}: ${count}          ${((count / total) * 100).toFixed(2)}%`
    )
    .join('\n')
);

// append　sorted consonants to result.txt
await fs.appendFile(
  'result.txt',
  '\n\nConsonants:\n' +
    Object.entries(consonants)
      .sort((a, b) => b[1] - a[1])
      .map(
        ([char, count]) =>
          `${char}: ${count}          ${((count / total) * 100).toFixed(2)}%`
      )
      .join('\n')
);
