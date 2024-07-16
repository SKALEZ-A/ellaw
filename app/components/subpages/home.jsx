"use client";
import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';
import { useRouter } from 'next/navigation';
import Script from 'next/script';
import Image from 'next/image';
import Link from 'next/link';
import { AiFillHome, AiOutlineUnorderedList } from 'react-icons/ai';
import { GoHome } from "react-icons/go";
import { HiOutlineUserGroup } from "react-icons/hi";
import Particle from "@/app/components/subpages/Particles"
import Navbar from "@/app/components/subpages/navbar"
import StarsCanvas from './StarBackground';

const Welcome = () => {
  const [score, setScore] = useState(0);
  const [username, setUsername] = useState("Skalez");
  const router = useRouter();

  const handlePlayClick = () => {
    router.push('/play'); // Navigate to the play page
  };

  const handleTaskClick = () => {
    router.push('/subpages/task'); // Navigate to the task page
  };

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       console.log("Checking Telegram WebApp initialization...");
  //       console.log(window.Telegram);
  //       const user = window.Telegram?.WebApp?.initDataUnsafe?.user;
  //       console.log("User data fetched from Telegram:", user);
  //       if (user) {
  //         setUsername(user.username || "Anon");
  //       } else {
  //         console.warn("No user data found in Telegram WebApp");
  //       }
  //     } catch (error) {
  //       console.error("Failed to fetch user data:", error);
  //     }
  //   };

  //   if (typeof window !== 'undefined' && window.Telegram && window.Telegram.WebApp) {
  //     fetchUserData();
  //   } else {
  //     console.error("Telegram WebApp is not available");
  //   }
  // }, []);

  useEffect(() => {
    const fetchUserData = async () => {
        try {
            console.log("Checking Telegram WebApp initialization...");
            console.log(window.Telegram);
            const user = window.Telegram?.WebApp?.initDataUnsafe?.user;
            console.log("User data fetched from Telegram:", user);
            if (user) {
                setUsername(user.username || "Anon");
                const response = await fetch(`https://walledb.onrender.com/api/Cluster0/user/${user.username}`);
                const data = await response.json();
                if (response.ok) {
                    setScore(data.score);
                } else {
                    console.error('Failed to fetch user data:', data.message);
                }
            } else {
                console.warn("No user data found in Telegram WebApp");
            }
        } catch (error) {
            console.error("Failed to fetch user data:", error);
        }
    };

    if (typeof window !== 'undefined' && window.Telegram && window.Telegram.WebApp) {
        fetchUserData();
    } else {
        console.error("Telegram WebApp is not available");
    }
}, []);


    return (
        <>
        <Particle />
        <Navbar />
        <div className='flex flex-col m-8 mt-16 z-[9999]'>
            <Script src="https://telegram.org/js/telegram-web-app.js" strategy="beforeInteractive" />
            <div className=''>
                <div>
                    <div className="flex justify-center items-start">
                        <Image src="/walle-shoe.png" alt="Logo" width={100} height={100} className="diamond mt-2 rounded-full"  />
                    </div>
                    <div className='font-semibold text-lg mt-2 text-white text-center'>{username}</div>
                </div>
                <div className="flex justify-center items-start mt-4">
                    <Image src="/walle-shoe.png" alt="Logo" width={30} height={30} className="rounded-full" />
                    <div className='text-center my-auto text-white font-bold text-xl '>{score}</div>
                </div>

                <div className='bg w-[90vw] rounded-md border-[#302604] border-2 py-5 mt-[80px]'>
                    <div className='flex justify-center'>
                        {/* <Image src="/walle-shoe.png" alt="Logo" width={30} height={30} className="rounde" /> */}
                        <p className='text-2xl justify-center items-center'>🌱</p>
                    </div>
                    <div
                        className='mx-auto text-center w-[30vw] bg-[#302604] text-white my-2 font-semibold text-md py-2 rounded-full hover:bg-[#ff6ec7] cursor-pointer'
                        onClick={handlePlayClick}
                    >
                        Play
                    </div>
                </div>

                <div className='mx-auto text-center w-[90vw] bg-[#302604] text-white font-semibold text-md py-2 rounded-md mt-8 hover:bg-black hover:text-white cursor-pointer'>
                    Start Farming
                </div>
            </div>

            <div className='bg-[#302604] text-white py-3 fixed bottom-0 left-0 w-full'>
                <div className='flex justify-around'>
                    <Link href="/">
                    <div className='cursor-pointer flex flex-col items-center'>
                        <GoHome size={24} />
                        <span className='text-[10px]'>Home</span>
                    </div>
                    </Link>
                    <Link href="/task">
                    <div className='cursor-pointer flex flex-col items-center'>
                        <AiOutlineUnorderedList size={24} />
                        <span className='text-[10px]'>Tasks</span>
                    </div>
                    </Link>
                    <Link href="/invite">
                    <div className='cursor-pointer flex flex-col items-center'>
                        <HiOutlineUserGroup size={24} />
                        <span className='text-[10px]'>Frens</span>
                    </div>
                    </Link>
                </div>
            </div>
        </div>
        <StarsCanvas />
        </>
    );
};

export default Welcome;