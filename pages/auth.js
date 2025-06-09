import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import Image from "next/image";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) return setMessage(error.message);
      setMessage("Successfully logged in!");
    } else {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) return setMessage(error.message);
      setMessage("Check your email to confirm signup.");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white px-6">
      <div className="w-full max-w-md bg-neutral-900 rounded-2xl p-8 shadow-xl">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Image src="/logo.svg" alt="DealerEase Logo" width={60} height={60} />
        </div>

        <h1 className="text-2xl font-bold text-center mb-6">
          {isLogin ? "Log In" : "Sign Up"}
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="px-4 py-2 rounded-lg text-black"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="px-4 py-2 rounded-lg text-black"
          />
          <button
            type="submit"
            className="bg-white text-black font-semibold py-2 rounded-lg hover:bg-gray-200 transition"
          >
            {isLogin ? "Log In" : "Sign Up"}
          </button>
        </form>

        {message && <p className="mt-4 text-sm text-red-400 text-center">{message}</p>}

        <p className="mt-6 text-center text-sm text-gray-400">
          {isLogin ? (
            <>
              Don’t have an account?{" "}
              <span className="text-blue-400 cursor-pointer" onClick={() => setIsLogin(false)}>
                Sign up
              </span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span className="text-blue-400 cursor-pointer" onClick={() => setIsLogin(true)}>
                Log in
              </span>
            </>
          )}
        </p>
      </div>
    </main>
  );
}
