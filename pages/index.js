import Image from 'next/image'
import { useRef, useEffect, useState } from 'react'
import DrawingTool from '../components/DrawingTool';
import PdfUpload from '../components/PdfUpload';
import React from 'react';
import Timeline from '../components/Timeline';
import { timelineData } from '../data/timeline';
import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  // New subscribe function
  const subscribe = async () => {
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: session.user.email }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen lg:flex flex-col text-lg">
      {/* Login section */}
      <div className="p-4">
        {!session ? (
          <button onClick={() => signIn("google")} className="px-4 py-2 bg-blue-600 text-white rounded">
            Sign in with Google
          </button>
        ) : (
          <div>
            <p className="mb-2">Signed in as {session.user.email}</p>
            <button onClick={() => signOut()} className="px-4 py-2 bg-red-600 text-white rounded">
              Sign Out
            </button>
            {/* New Subscribe button */}
            <button onClick={subscribe} className="ml-2 px-4 py-2 bg-green-600 text-white rounded">
              Subscribe
            </button>
          </div>
        )}
      </div>
      {/* Drawing tool section */}
      <DrawingTool />
      {/* PDF Upload section */}
      <PdfUpload />
      {/* Timeline section */}
      <Timeline items={timelineData} />
      {/* ...existing code if needed... */}
    </div>
  );
}
