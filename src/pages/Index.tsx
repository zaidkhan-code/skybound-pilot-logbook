
import { ThemeProvider } from "@/components/ThemeProvider";
import Landing from "@/components/landing/Landing";

export default function Index() {
  return (
    <ThemeProvider>
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-12px); }
          }
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
        `}
      </style>
      <Landing />
    </ThemeProvider>
  );
}
