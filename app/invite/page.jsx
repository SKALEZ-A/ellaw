"use client"
import React, { useState, useEffect } from "react";
import Image from "next/image";
import shoe from "@/public/walle-shoe.png";
import Script from 'next/script';
import Link from "next/link";
import { GoHome } from "react-icons/go";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { HiOutlineUserGroup } from "react-icons/hi";

const Page = () => {
  const [username, setUsername] = useState('');
  const [inviteData, setInviteData] = useState(null);
  const [inviteLink, setInviteLink] = useState('');

  useEffect(() => {
    // Fetch the Telegram user data and set the username
    const user = window.Telegram?.WebApp?.initDataUnsafe?.user;
    if (user) {
      setUsername(user.username || 'Anon');
      setInviteLink(`https://t.me/walle_farm_bot/WallE_Farm_Bot?start=${user.username}`);
    }

    // Fetch invite data from the API
    const fetchInviteData = async () => {
      try {
        const response = await fetch(`https://walledb.onrender.com/api/Cluster0/invites/${user.username}`);
        const data = await response.json();
        if (response.ok) {
          setInviteData(data);
        } else {
          console.error('Failed to fetch invite data:', data.message);
        }
      } catch (error) {
        console.error('Error fetching invite data:', error);
      }
    };

    if (user) {
      fetchInviteData();
    }
  }, [username]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(inviteLink).then(() => {
      alert('Link copied to clipboard');
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  };

  const shareLink = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Hello Fren',
        text: 'Join me on this amazing app!',
        url: inviteLink,
      }).catch(err => {
        console.error('Error sharing: ', err);
      });
    } else {
      alert('Web Share API is not supported in your browser.');
    }
  };

  return (
    <div className="p-5 m-auto mb-10">
      <Script src="https://telegram.org/js/telegram-web-app.js" strategy="beforeInteractive" />
      <div className="flex justify-center items-center flex-col h-auto">
        <span className="pt-5 pb-1 text-3xl">👨‍👩‍👧‍👦</span>
        <h1 className="py-5 text-gray-200 font-bold text-lg">Invite Friends</h1>
        <div className="rounded-xl flex flex-col border border-[#302604] mb-5 gap-4 items-center justify-center p-5">
          <div className="flex flex-row">
            <Image src={shoe} className="w-8" alt="Diamond" />
            <h1 className="flex text-gray-200 font-bold gap-2 text-xl">{inviteData ? inviteData.referralBalance : 0}</h1>
          </div>
          <div
            onClick={copyToClipboard}
            className="mx-auto text-center bg-[#302604] text-white my-2 font-semibold text-md py-2 px-7 rounded-full hover:bg-black cursor-pointer"
            >
              Copy link
            </div>
          </div>
          <p className="text-sm text-gray-200 font-semibold text-center mb-5">
            Score 10% from buddies + 2.5% from their referrals. <br /> Get a play pass 🎫 for each friend.
          </p>
  
          <div className="flex flex-col border border-[#302604] rounded-lg p-5 text-start w-[70vw] text-gray-200">
            <p className="font-bold text-xl">{inviteData ? inviteData.length : 0} frens</p>
            {inviteData && inviteData.map((invitedUser) => (
              <div key={invitedUser._id} className="flex items-center justify-between w-full border-b border-[#302604] py-4">
                <div className="flex items-center">
                  <span className="flex mx-3 items-center justify-center w-12 h-12 rounded-full bg-blue-500 text-white">
                    {invitedUser.username.charAt(0)}
                  </span>
                  <p>{invitedUser.username}</p>
                </div>
                <h2 className="text-end flex">{invitedUser.score} <Image src={shoe} className="w-8" alt="Diamond" /></h2>
              </div>
            ))}
          </div>
          <div
            onClick={shareLink}
            className="mx-auto text-center w-[60vw] bg-[#302604] text-white my-2 font-semibold text-md py-2 rounded-full hover:bg-black cursor-pointer"
          >
            Share
          </div>
        </div>
  
        {/* footer */}
        <div className="bg-[#302604] text-white py-3 fixed bottom-0 left-0 w-full">
          <div className="flex justify-around">
            <Link href="/">
              <div className="cursor-pointer flex flex-col items-center">
                <GoHome size={24} />
                <span className="text-[10px]">Home</span>
              </div>
            </Link>
            <Link href="/task">
              <div className="cursor-pointer flex flex-col items-center">
                <AiOutlineUnorderedList size={24} />
                <span className="text-[10px]">Tasks</span>
              </div>
            </Link>
            <Link href="/invite">
              <div className="cursor-pointer flex flex-col items-center">
                <HiOutlineUserGroup size={24} />
                <span className="text-[10px]">Frens</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
  };
  
  export default Page;
  
