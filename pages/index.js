import React from "react";
import Header from "../components/Header";

export default function HomePage() {
  return (
    <><main className="min-h-screen bg-black text-white font-sans px-6 py-10 flex flex-col items-center">
      <Header />

      <section className="text-center mb-20">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white">
          Streamline Your Dealership
        </h1>
        <p className="text-lg text-gray-400 mb-8">
          Powerful solutions to manage your dealership operations with ease.
        </p>
        <Link href="/auth">
  <button>Get Started</button>
</Link>
    </section><section className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        <div className="bg-neutral-900 p-6 rounded-2xl text-center">
          <h2 className="text-xl font-semibold mb-2 text-white">Features</h2>
          <p className="text-gray-400">
            Discover the tools we offer to simplify your business processes
          </p>
        </div>
        <div className="bg-neutral-900 p-6 rounded-2xl text-center">
          <h2 className="text-xl font-semibold mb-2 text-white">Testimonials</h2>
          <p className="text-gray-400">
            See how our solutions have transformed dealerships
          </p>
        </div>
      </section></>
    </main>
  );
}
