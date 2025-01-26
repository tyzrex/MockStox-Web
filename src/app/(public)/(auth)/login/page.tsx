import LoginForm from "@/components/forms/login-form";
import {
  GraduationCap,
  Users,
  Settings,
  Shield,
  BarChart,
  CandlestickChart,
  SquareActivity,
  CircleDollarSign,
} from "lucide-react";

export default function LoginPage() {
  return (
    <div className="grid min-h-screen md:grid-cols-2">
      <div className="flex items-center h-full justify-center px-8 py-12 md:px-12">
        <div className="w-full max-w-lg space-y-8">
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded bg-brand-primary">
                <CandlestickChart className="h-8 w-8 text-white p-1" />
              </div>
              <span className="text-[24px] font-semibold text-brand-primary">
                MockStox
              </span>
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-semibold tracking-tight">
                Log in to your Account
              </h1>
              <p className="text-sm text-muted-foreground">
                Welcome back! Select method to log in:
              </p>
            </div>
          </div>
          <div className="grid gap-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Sign in with username
                </span>
              </div>
            </div>
            <div className="grid gap-2">
              <LoginForm />
            </div>
          </div>
        </div>
      </div>

      <div className="relative bg-brand-primary md:block">
        <div className="flex flex-col h-full items-center justify-center p-12 text-center text-white">
          <div className="md:grid hidden grid-cols-2 w-64">
            {/* System Management Illustration */}
            <div className="top-0 -translate-x-1/3 flex h-32 w-32 items-center justify-center rounded-lg bg-white/10 backdrop-blur-sm">
              <SquareActivity className="h-12 w-12 text-white" />
            </div>
            <div className="flex h-32 w-32 -translate-y-1/3 items-center justify-center rounded-lg bg-white/20 backdrop-blur-sm">
              <Shield className="h-12 w-12 text-white" />
            </div>
            <div className="-translate-x-1/3 translate-y-1/3 flex h-32 w-32 items-center justify-center rounded-lg bg-white/15 backdrop-blur-sm">
              <CircleDollarSign className="h-12 w-12 text-white" />
            </div>
            <div className="top-0 flex h-32 w-32 items-center justify-center rounded-lg bg-white/25 backdrop-blur-sm">
              <Users className="h-12 w-12 text-white" />
            </div>
          </div>
          <h2 className="md:mt-20 text-2xl font-semibold">
            Start managing your investments
          </h2>
          <p className="mt-2 text-blue-100 max-w-xl">
            With MockStox, you can manage your investments, track your
            portfolio, using AI to predict stock prices, and much more.
          </p>
        </div>
      </div>
    </div>
  );
}
