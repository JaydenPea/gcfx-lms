"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { GithubIcon, Loader2, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

export function LoginForm() {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [email, setEmail] = useState("");

    // Debug logging
    console.log("Component rendered, isPending:", isPending);

    function signInWithEmail() {
        console.log("signInWithEmail called with email:", email);
        
        // Validate email
        if (!email || !email.includes('@')) {
            toast.error('Please enter a valid email address');
            return;
        }

        startTransition(async () => {
            try {
                console.log("Starting transition...");
                await authClient.emailOtp.sendVerificationOtp({
                    email: email,
                    type: 'sign-in',
                    fetchOptions: {
                        onSuccess: () => {
                            console.log("Success callback triggered");
                            toast.success('Email sent');
                            router.push('/verify-request');
                        },
                        onError: (error) => {
                            console.error('Error callback triggered:', error);
                            toast.error('Error sending email');
                        }
                    }
                });
            } catch (error) {
                console.error("Caught error:", error);
                toast.error('Something went wrong');
            }
        });
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        signInWithEmail();
    }

    return (
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle className="text-xl">Welcome Back!</CardTitle>
                <CardDescription>Login with your email account</CardDescription>
            </CardHeader>

            <CardContent>
                <form onSubmit={handleSubmit} className="grid gap-3">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                            id="email"
                            value={email} 
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}  
                            type="email" 
                            placeholder="m@example.com"
                            required
                            disabled={isPending}
                        />
                    </div>
                    
                    <Button 
                        type="submit" 
                        disabled={isPending || !email}
                        className="w-full flex items-center justify-center gap-2"
                    >
                        {isPending ? (
                            <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                <span>Loading...</span>
                            </>
                        ) : (
                            <>
                                <Send className="h-4 w-4" />
                                <span>Continue with email</span>
                            </>
                        )}
                    </Button>

                    {/* Debug button - remove in production */}
                    <button 
                        type="button"
                        onClick={() => alert("Test button clicked!")} 
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded text-sm"
                    >
                        Debug: Test Click
                    </button>
                </form>
            </CardContent>
        </Card>
    );
}