const bcrypt = require('bcryptjs');

const password = process.argv[2] || '123456';
const saltRounds = 12;

console.log(`Generating hash for password: "${password}"...`);

try {
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);

    console.log('\n---------------------------------------------------');
    console.log('SUCCESS! Here is your new password hash details:');
    console.log('---------------------------------------------------');
    console.log(`Password: ${password}`);
    console.log(`Hash:     ${hash}`);
    console.log('---------------------------------------------------');
    console.log('\nRun this command in your MongoDB shell to update the admin user:');
    console.log('\ndb.users.updateOne(');
    console.log('  { email: "salarsafayi@gmail.com" },');
    console.log(`  { $set: { password: "${hash}" } }`);
    console.log(')');
    console.log('\n---------------------------------------------------');

} catch (error) {
    console.error('Error generating hash:', error);
    console.log('\nMake sure you have installed dependencies with "npm install" before running this script.');
}
