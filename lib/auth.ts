import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./db";
import { Github } from "lucide-react";
import { emailOTP } from "better-auth/plugins"
import { resend } from "./resend";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),
    plugins: [
        emailOTP({ 
                async sendVerificationOTP({ email, otp}) { 
					 await resend.emails.send({
                        from: 'GCFX LLMS <onboarding@resend.dev>',
                        to: [email],
                        subject: 'GCFX LLMS - Verify your email',
                        html: `<p>Your OTP is <strong>${otp}</strong></p>`,
                    });
				}, 
        }) 
    ]
})