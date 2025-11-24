export const dynamic = 'force-dynamic';
export const revalidate = 0;
import { NextResponse } from 'next/server';
import dbConnect from '@/utils/dbConnect';
import { verifyPassword } from '@/utils/verifyPassword';
import { generateToken, generateRefreshToken } from '@/utils/jwt';
import Client from '@/models/Client';
import User from '@/models/User';

//CLIENT | USER LOGIN => "/api/auth/login"
export async function POST(req) {
    try {
        await dbConnect();

        const { searchParams } = new URL(req.url);
        const type = searchParams.get('type');

        if (!type || (type !== 'user' && type !== 'client')) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'نوع کاربری مشخص نشده است.',
                },
                { status: 400 }
            );
        }

        const formData = await req.formData();
        const username = formData.get('username');
        const password = formData.get('password');

        if (!username || !password) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'نام کاربری و رمز عبور الزامی است.',
                },
                { status: 400 }
            );
        }

        if (type === 'user') {
            const user = await User.findOne({ username });
            if (!user) {
                return NextResponse.json(
                    {
                        success: false,
                        message: 'کاربر با این نام کاربری پیدا نشد.',
                    },
                    { status: 404 }
                );
            }

            if (!user.password) {
                return NextResponse.json(
                    {
                        success: false,
                        message: 'خطا در اطلاعات کاربری.',
                    },
                    { status: 500 }
                );
            }

            if (user.status === 'banned') {
                return NextResponse.json(
                    {
                        success: false,
                        message: 'حساب کاربری شما مسدود شده است.',
                    },
                    { status: 403 }
                );
            }

            let isValid = false;
            try {
                isValid = await verifyPassword(password, user.password);
            } catch (verifyError) {
                console.error('Password verification error:', verifyError);
                return NextResponse.json(
                    {
                        success: false,
                        message: 'خطا در بررسی رمز عبور.',
                    },
                    { status: 500 }
                );
            }

            if (!isValid) {
                return NextResponse.json(
                    {
                        success: false,
                        message: 'نام کاربری یا رمز عبور صحیح نمی باشد.',
                    },
                    { status: 400 }
                );
            }

            // Generate new JWT tokens if they don't exist or are invalid
            let token = user.token;
            let refreshToken = user.refreshToken;

            // Check if token is a valid JWT (starts with eyJ which is base64 for {" )
            if (!token || !token.startsWith('eyJ')) {
                token = generateToken('user');
                refreshToken = generateRefreshToken('user');
                
                // Save tokens to database
                user.token = token;
                user.refreshToken = refreshToken;
                await user.save();
            }

            return NextResponse.json({
                success: true,
                token: token,
                refreshToken: refreshToken,
            });
        } else if (type === 'client') {
            const client = await Client.findOne({ username });
            if (!client) {
                return NextResponse.json(
                    {
                        success: false,
                        message: 'متقاضی با این نام کاربری پیدا نشد.',
                    },
                    { status: 404 }
                );
            }

            if (client.status === 'banned') {
                return NextResponse.json(
                    {
                        success: false,
                        message: 'حساب کاربری شما مسدود شده است.',
                    },
                    { status: 403 }
                );
            }

            if (!client.password) {
                return NextResponse.json(
                    {
                        success: false,
                        message: 'خطا در اطلاعات متقاضی.',
                    },
                    { status: 500 }
                );
            }

            let isValid = false;
            try {
                isValid = await verifyPassword(password, client.password);
            } catch (verifyError) {
                console.error('Password verification error:', verifyError);
                return NextResponse.json(
                    {
                        success: false,
                        message: 'خطا در بررسی رمز عبور.',
                    },
                    { status: 500 }
                );
            }

            if (!isValid) {
                return NextResponse.json(
                    { success: false, message: 'رمز عبور اشتباه است.' },
                    { status: 400 }
                );
            }

            // Generate new JWT tokens if they don't exist or are invalid
            let token = client.token;
            let refreshToken = client.refreshToken;

            // Check if token is a valid JWT (starts with eyJ which is base64 for {" )
            if (!token || !token.startsWith('eyJ')) {
                token = generateToken('client');
                refreshToken = generateRefreshToken('client');
                
                // Save tokens to database
                client.token = token;
                client.refreshToken = refreshToken;
                await client.save();
            }

            return NextResponse.json({
                success: true,
                token: token,
                refreshToken: refreshToken,
            });
        }

        // This should never be reached, but just in case
        return NextResponse.json(
            {
                success: false,
                message: 'خطای نامشخص',
            },
            { status: 400 }
        );
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { 
                success: false, 
                message: error.message || 'خطای سرور',
                error: process.env.NODE_ENV === 'development' ? error.stack : undefined
            },
            { status: 500 }
        );
    }
}
