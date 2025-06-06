import React from "react";

export default function DealerEaseLanding() {
  return (
    <main className="min-h-screen bg-black text-white font-sans p-6 flex flex-col items-center justify-center">
      <div className="mb-8">
        <img src="/logo.svg" alt="DealerEase Logo" className="h-20 w-auto" />
      </div>
      <h1 className="text-5xl font-bold mb-4 tracking-tight">DealerEase</h1>
      <p className="text-lg text-gray-400 max-w-xl text-center mb-6">
        Smart automation tools for modern dealerships. Streamline listings, qualify leads, and handle customer communication — all powered by AI.
      </p>
      <button className="bg-white text-black px-6 py-3 rounded-2xl shadow-md hover:bg-gray-200 transition">
        Join the Waitlist
      </button>
    </main>
  );
}
