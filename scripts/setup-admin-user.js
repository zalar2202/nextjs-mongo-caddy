import dbConnect from '../utils/dbConnect.js';
import User from '../models/User.js';
import { hashPassword } from '../utils/hashPassword.js';
import { generateToken, generateRefreshToken } from '../utils/jwt.js';

// Configuration - UPDATE THESE VALUES
const USER_EMAIL = 'salarsafayi@gmail.com';
const NEW_PASSWORD = 'admin123'; // Change this to your desired password
const FIRST_NAME = 'Super';
const LAST_NAME = 'Admin';
const NATIONAL_ID = '1234567890'; // Update with a valid national ID
const MOBILE = '09123456789'; // Update with a valid mobile number

async function setupAdminUser() {
    try {
        // Connect to database
        await dbConnect();
        console.log('✅ Connected to database');

        // Find the user
        const user = await User.findOne({ email: USER_EMAIL });
        
        if (!user) {
            console.error(`❌ User with email ${USER_EMAIL} not found!`);
            process.exit(1);
        }

        // Hash the new password
        const hashedPassword = await hashPassword(NEW_PASSWORD);
        console.log('✅ Password hashed successfully');

        // Generate tokens
        const token = generateToken('user');
        const refreshToken = generateRefreshToken('user');
        console.log('✅ Tokens generated');

        // Update the user
        user.firstName = FIRST_NAME;
        user.lastName = LAST_NAME;
        user.nationalId = NATIONAL_ID;
        user.mobile = MOBILE;
        user.password = hashedPassword;
        user.username = USER_EMAIL;
        user.status = 'active';
        user.role = 'admin';
        user.token = token;
        user.refreshToken = refreshToken;

        await user.save();
        console.log('✅ User updated successfully!');

        console.log('\n📋 Login Credentials:');
        console.log(`   Username: ${USER_EMAIL}`);
        console.log(`   Password: ${NEW_PASSWORD}`);
        console.log('\n✅ You can now login at: /auth/admin/login\n');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

setupAdminUser();

