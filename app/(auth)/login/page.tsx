import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GithubIcon } from "lucide-react";


export default function LoginPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Welcome Back!</CardTitle>
        <CardDescription>Login with your email account</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="grid gap-3">
            <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input type="email" placeholder="m@example.com"></Input>
            </div>
            <Button>Continue with email</Button>
        </div>
      </CardContent>

    </Card>
  );
}