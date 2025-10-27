"use client";

import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="flex items-center justify-center p-4 min-h-screen">
      <div className="w-full bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome to Meeti
          </h1>
          <p className="text-gray-600">Your social meeting platform</p>
          {session?.user?.email && (
            <p className="text-sm text-gray-500 mt-2">
              안녕하세요, {session.user.email}님!
            </p>
          )}
        </div>

        <div className="space-y-4">
          <Button
            variant="default"
            size="lg"
            className="w-full"
            onClick={() => console.log("Primary clicked")}
          >
            Get Started
          </Button>

          <Button
            variant="secondary"
            size="default"
            className="w-full"
            onClick={() => console.log("Secondary clicked")}
          >
            Learn More
          </Button>

          <Button
            variant="outline"
            size="default"
            className="w-full"
            onClick={() => console.log("Outline clicked")}
          >
            Sign In
          </Button>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Built with Next.js + Tailwind CSS + Capacitor
          </p>
        </div>
      </div>
    </div>
  );
}
