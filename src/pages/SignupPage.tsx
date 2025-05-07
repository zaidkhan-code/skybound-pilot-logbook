
import SignupForm from "@/components/auth/SignupForm";
import { ThemeProvider } from "@/components/ThemeProvider";

export default function SignupPage() {
  return (
    <ThemeProvider>
      <SignupForm />
    </ThemeProvider>
  );
}
