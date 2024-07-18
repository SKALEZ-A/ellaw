"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Welcome from "@/app/components/subpages/home";

export default function Home() {
  const [inviterUsername, setInviterUsername] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const start = searchParams.get('start');
    if (start) {
      setInviterUsername(start);
    }

    const user = window.Telegram?.WebApp?.initDataUnsafe?.user;
    if (user) {
      registerUser(user, start);
    }
  }, [router]);

  const registerUser = async (user: any, inviterUsername: string | null) => {
    const response = await fetch('https://walledb.onrender.com/api/Cluster0/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: user.id,
        username: user.username,
        inviterUsername,
      }),
    });
    const data = await response.json();
    if (response.ok) {
      console.log('User registered successfully:', data);
    } else {
      console.error('Failed to register user:', data.message);
    }
  };

  return (
    <main className="flex flex-col items-center justify-between">
      <Welcome />
    </main>
  );
}
