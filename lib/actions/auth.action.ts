'use server';

import { auth, db } from "@/firebase/admin";
import { cookies } from "next/headers";

import path from "path";
import { id } from "zod/v4/locales";
const ONE_WEEK= 60 * 60 * 24 * 7 * 1000; 

export async function signUp(params: SignUpParams) {
    const { email, uid, name } = params;

    try {
        const userRecord = await db.collection('users').doc(uid).get();

        if (userRecord.exists) {
            return {
                success: false,
                message: 'User already exists with this email.'
            };
        }

        await db.collection('users').doc(uid).set({ email, name });

        return {
    success: true,
    message: 'User created successfully.'
}

    } catch (error: any) {
        console.error('Error signing up:', error);

        if (error.code === 'auth/email-already-exists') {
            return {
                success: false,
                message: 'Email already exists. Please use a different email.'
            }
        }

        return {
            success: false,
            message: 'An error occurred during sign up. Please try again later.'
        };
    }
}

export async function setSessionCookie(idToken: string) {
    const cookieStore = await cookies();
    const sessionCookie = await auth.createSessionCookie(idToken, { expiresIn: ONE_WEEK * 1000 });

    cookieStore.set('session', sessionCookie, {
        maxAge: ONE_WEEK,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
    });
}


export async function signIn(params: SignInParams) {
    const { email, idToken } = params;

    try {
        const userRecord = await auth.getUserByEmail(email);
        if (!userRecord) {
            return {
                success: false,
                message: 'No user found with this email.'
            };
        }

        await setSessionCookie(idToken);

    } catch (error) {
        console.error('Error signing in:', error);
        return {
            success: false,
            message: 'An error occurred during sign in. Please try again later.'
        };
    }
}


export async function getCurrentuser(): promise<User | null> {
    
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session')?.value;

    if (!sessionCookie) {
        return null;
    }

    try {
        const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);
        const userRecord = await db.collection('users').doc(decodedClaims.uid).get();

        if( !userRecord.exists) {
            return null;
        }
        return {
            ...userRecord.data(),
            id: userRecord.id,
        } as User;


    } catch (error) {
        console.error('Error getting current user:', error);
        return null;
        
    }
}
 
export async function isAuthenticated() {
    const user = await getCurrentuser();
    return !!user;  
}