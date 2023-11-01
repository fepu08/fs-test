import FS from './fs/FS';
import crypto from 'crypto';

const myFs = new FS(__dirname);
const content =
  'Zombie ipsum reversus ab viral inferno nam rick Souless carnis oculis, per brid voodoo malus De bat carnem quaeritis horrenda, stalking ipsa incipere incessu illud in enim arm religionis. Cricket dictum RE:dead viventium Romero animated sit screams of est nostram, infecti malus an ingdead undead reanimator terrenti plan est corpses, fascinati mortui In qui Qui eaters horribilem mortuum putrid. Craven finem nos horrenda sunt, z? nostra daze zombi contagium, staggering sacerdos The. Arm plague Is sunt caule ipsum de qui Hi brains viventium, dead et incipere moveri soulless cerebro monstra guts Vivens corpora, eof wal an tattered terror voodoo crabs daemonum walking.';
const hashedContent = crypto.createHash('md5').update(content).digest('hex');
const fileName = 'zombie-ipsum-1';

async function main() {
  try {
    await myFs.store(fileName, content);
    console.log(`created: ${fileName}`);

    const testContent = await myFs.get(fileName);
    console.log(testContent === content);

    await myFs.storeWithHash(content);
    console.log(`created: ${hashedContent}`);

    const testContent2 = await myFs.get(hashedContent);
    console.log(testContent2 === content);
  } catch (e) {
    console.error(e);
  }
}

main()
  .then(() => console.log('Finished'))
  .catch((err) => console.error(err));
