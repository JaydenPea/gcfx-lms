import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();
    const { 
        data: session, 
    } = authClient.useSession() 

    async function signOut(){
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/"); // redirect to login page
          },
        },
      });
    }

  return (
    <div>
      <h1>Hi there!!!</h1>
      <ThemeToggle/>

      {session ? (
        <div>
          <p>{session.user.name}</p>
          <Button onClick={signOut}>Logout</Button>
        </div>
      ):(
      <Button>Login</Button>
      )}

    </div>
  )
}
