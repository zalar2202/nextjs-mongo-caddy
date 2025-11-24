import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

// MongoDB connection string - update this with your connection string
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/test';

// Configuration - UPDATE THESE VALUES
const USER_EMAIL = 'salarsafayi@gmail.com';
const NEW_PASSWORD = 'admin123'; // Change this to your desired password
const FIRST_NAME = 'Super';
const LAST_NAME = 'Admin';
const NATIONAL_ID = '1234567890'; // Update with a valid national ID
const MOBILE = '09123456789'; // Update with a valid mobile number

async function updateAdminUser() {
    try {
        // Connect to MongoDB
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');

        // Hash the new password
        const hashedPassword = await bcrypt.hash(NEW_PASSWORD, 12);
        console.log('Password hashed successfully');

        // Update the user document
        const User = mongoose.models.User || mongoose.model('User', new mongoose.Schema({}, { strict: false }));
        
        const result = await User.updateOne(
            { email: USER_EMAIL },
            {
                $set: {
                    firstName: FIRST_NAME,
                    lastName: LAST_NAME,
                    nationalId: NATIONAL_ID,
                    mobile: MOBILE,
                    password: hashedPassword,
                    username: USER_EMAIL,
                    status: 'active',
                    role: 'admin'
                }
            }
        );

        if (result.matchedCount === 0) {
            console.error('User not found!');
            process.exit(1);
        }

        if (result.modifiedCount > 0) {
            console.log('✅ User updated successfully!');
            console.log(`\nLogin credentials:`);
            console.log(`Username: ${USER_EMAIL}`);
            console.log(`Password: ${NEW_PASSWORD}`);
        } else {
            console.log('User found but no changes were made.');
        }

        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

updateAdminUser();

