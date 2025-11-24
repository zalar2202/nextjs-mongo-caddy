# Setting Up Admin User on VPS

Since your MongoDB is running on your VPS server, you have a few options:

## Option 1: Access MongoDB via Docker Container (Easiest)

SSH into your VPS, then:

```bash
# 1. Find your MongoDB container name
docker ps | grep mongo

# 2. Access MongoDB shell inside the container
docker exec -it app-mongo-1 mongosh

# Or if you need authentication:
docker exec -it app-mongo-1 mongosh -u YOUR_USERNAME -p YOUR_PASSWORD

# 3. Once in MongoDB shell, switch to your database (probably 'test' or check your .env)
use test

# 4. Update your user
db.users.updateOne(
  { email: "salarsafayi@gmail.com" },
  {
    $set: {
      firstName: "Super",
      lastName: "Admin",
      nationalId: "1234567890",  // Change to your actual national ID
      mobile: "09123456789",      // Change to your actual mobile number
      password: "$2a$12$o3ly5sD.oj5y.Q10hbfbFOv1mkC/ATBNXpb0wu170QuAWTzmuMWmu",  // Password: admin123
      username: "salarsafayi@gmail.com",
      status: "active",
      role: "admin"
    }
  }
)
```

## Option 2: Run Setup Script on VPS

If you have the code on your VPS:

```bash
# 1. SSH into your VPS
ssh user@your-vps-ip

# 2. Navigate to your project directory
cd /path/to/nextjs-mongo-caddy

# 3. Make sure .env file exists with MONGO_URI and JWT_SECRET
# 4. Run the setup script
node scripts/setup-admin-user.js
```

## Option 3: Copy Script to VPS and Run

If you want to run the script on VPS but don't have the full codebase:

```bash
# 1. On your laptop, copy the script to VPS
scp scripts/setup-admin-user.js user@your-vps-ip:/tmp/

# 2. SSH into VPS
ssh user@your-vps-ip

# 3. Copy the script to your project directory
cp /tmp/setup-admin-user.js /path/to/nextjs-mongo-caddy/scripts/

# 4. Navigate to project and run
cd /path/to/nextjs-mongo-caddy
node scripts/setup-admin-user.js
```

## Finding Your Database Name

To find which database your app uses:

```bash
# On VPS, check your .env file
cat .env | grep MONGO_URI

# Or check inside MongoDB container
docker exec -it app-mongo-1 mongosh
show dbs
```

## Login After Setup

Once updated, login at:
- URL: `https://portal.logaa.site/auth/admin/login` (or your VPS URL)
- Username: `salarsafayi@gmail.com`
- Password: `admin123`

