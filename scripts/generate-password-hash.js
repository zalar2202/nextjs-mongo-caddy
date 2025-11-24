import bcrypt from 'bcryptjs';

// Change this to your desired password
const PASSWORD = 'admin123';

async function generateHash() {
    const hash = await bcrypt.hash(PASSWORD, 12);
    console.log('\nPassword:', PASSWORD);
    console.log('Hash:', hash);
    console.log('\nCopy the hash above and use it in MongoDB update command.\n');
}

generateHash();

