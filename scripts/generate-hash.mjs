import bcrypt from 'bcryptjs';

const password = 'admin123';
const hash = await bcrypt.hash(password, 12);

console.log('\nPassword:', password);
console.log('Hash:', hash);
console.log('\nUse this hash in your MongoDB update command.\n');

