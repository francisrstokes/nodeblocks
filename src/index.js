const { promisify } = require('util');
const getPixels = promisify(require('get-pixels'));
const chalk = require('chalk');

const block = [
  ' ',
  '▁',
  '▂',
  '▃',
  '▄',
  '▅',
  '▆',
  '▇',
  '█'
];

getPixels('img/emoji4.png').then(pixels => {
  const X = pixels.shape[0] * 4;
  const p = pixels.data;

  let out = '';

  for (let i = 0; i < p.length; i += 4) {
    const I = (p[i] + p[i + 1] + p[i + 2]) / 3;
    const lowRes = I >> 5;

    if (i % X === 0) out += '\n';
    const pixelValue = chalk.bold.rgb(p[i], p[i + 1], p[i + 2])(block[lowRes]);
    out += pixelValue + pixelValue;
  }
  process.stdout.write(out);
});
