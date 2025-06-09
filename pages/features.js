import React, { useState } from "react";
import Link from "next/link";

export default function FeaturesPage() {
  const [selected, setSelected] = useState([]);
  const [total, setTotal] = useState(199);

  const features = [
    { name: "AI Description Builder", price: 50 },
    { name: "AI Messenger Responder", price: 75 },
    { name: "Lead Follow-Up Automation", price: 75 },
    { name: "AI Voice Assistant", price: 100 },
    { name: "Document Scanner & Fraud Detection", price: 125 }
  ];

  const toggleFeature = (name, price) => {
    let updated;
    if (selected.includes(name)) {
      updated = selected.filter((item) => item !== name);
      setTotal((prev) => Math.max(199, prev - price));
    } else {
      updated = [...selected, name];
      setTotal((prev) => prev + price);
    }
    setSelected(updated);
  };

  return (
    <main className="min-h-screen bg-black text-white font-sans px-6 py-10">
      <header className="w-full max-w-6xl mx-auto flex justify-between items-center mb-10">
        <div className="flex items-center gap-3">
          <img src="/logo.svg" alt="DealerEase Logo" className="h-10 w-auto" />
          <span className="text-2xl font-semibold text-white">DealerEase</span>
        </div>
        <nav className="space-x-6 text-lg text-gray-300">
          <Link href="/"><span className="hover:text-white cursor-pointer">Home</span></Link>
          <Link href="/features"><span className="hover:text-white cursor-pointer">Features</span></Link>
          <Link href="#"><span className="hover:text-white cursor-pointer">About</span></Link>
          <Link href="#"><span className="hover:text-white cursor-pointer">Contact</span></Link>
        </nav>
      </header>

      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-bold text-white mb-10">DealerEase Features & Pricing</h1>

        <section className="w-full max-w-6xl mb-20">
          <h2 className="text-2xl font-bold text-white mb-6">Included Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <div key={idx} className="bg-neutral-900 p-6 rounded-2xl">
                <h3 className="text-xl font-semibold mb-2 text-white">{feature.name}</h3>
                <p className="text-gray-400">Add-on: ${feature.price}/mo</p>
              </div>
            ))}
          </div>
        </section>

        <section className="w-full max-w-4xl mb-20 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Build Your Plan</h2>
          <p className="text-gray-400 mb-4">Base Plan: $199/mo. Select the tools you want to add.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {features.map((feature, idx) => (
              <label key={idx} className="flex items-center gap-3 bg-neutral-800 px-4 py-3 rounded-xl cursor-pointer">
                <input
                  type="checkbox"
                  checked={selected.includes(feature.name)}
                  onChange={() => toggleFeature(feature.name, feature.price)}
                />
                <span>{feature.name} (+${feature.price})</span>
              </label>
            ))}
          </div>
          <div className="text-2xl font-semibold text-white mb-4">Total: ${total}/mo</div>
          <button className="bg-white text-black px-6 py-3 rounded-xl shadow hover:bg-gray-200 transition">
            Book a Demo
          </button>
        </section>
      </div>
    </main>
  );
}
