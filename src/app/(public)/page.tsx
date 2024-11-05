import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary to-primary-foreground text-black">
      <main className="text-center space-y-8 p-8">
        <h1 className="text-6xl font-bold mb-4">Mockstox</h1>
        <p className="text-2xl mb-8">Your Ultimate Paper Trading Platform</p>
        <div className="bg-background/20 backdrop-blur-lg rounded-lg p-8 space-y-6">
          <h2 className="text-4xl font-semibold">Coming Soon</h2>
          <p className="text-xl">
            Get ready to experience risk-free trading and sharpen your
            investment skills!
          </p>
          <div className="flex justify-center space-x-4 mt-8">
            <Button asChild>
              <Link href="/register">Register</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/login">Login</Link>
            </Button>
          </div>
        </div>
      </main>
      <footer className="mt-auto p-4 text-center text-sm">
        © 2024 Mockstox. All rights reserved.
      </footer>
    </div>
  );
}
