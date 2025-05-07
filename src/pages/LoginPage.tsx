
import LoginForm from "@/components/auth/LoginForm";
import { ThemeProvider } from "@/components/ThemeProvider";

export default function LoginPage() {
  return (
    <ThemeProvider>
      <LoginForm />
    </ThemeProvider>
  );
}
