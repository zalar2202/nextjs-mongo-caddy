import bcrypt from 'bcryptjs';

const password = 'admin123';
const hash = '$2a$12$o3ly5sD.oj5y.Q10hbfbFOv1mkC/ATBNXpb0wu170QuAWTzmuMWmu';

async function testHash() {
    try {
        console.log('Testing password hash...');
        console.log('Password:', password);
        console.log('Hash:', hash);
        console.log('');
        
        const isValid = await bcrypt.compare(password, hash);
        
        if (isValid) {
            console.log('✅ Password hash is VALID!');
        } else {
            console.log('❌ Password hash is INVALID!');
        }
        
        // Also test with wrong password
        const wrongPassword = 'wrongpassword';
        const isWrong = await bcrypt.compare(wrongPassword, hash);
        console.log('Wrong password test:', isWrong ? '❌ Should be false' : '✅ Correctly rejected');
        
    } catch (error) {
        console.error('❌ Error testing hash:', error.message);
        console.error(error.stack);
    }
}

testHash();

