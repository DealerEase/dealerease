import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { supabase } from "../lib/supabaseClient";
import Header from "../components/Header";
import Image from "next/image";

export default function AuthPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (router.query.signup === "true") {
      setIsLogin(false);
    }
  }, [router.query.signup]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) return setMessage(error.message);
      setMessage("Successfully logged in!");
    } else {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) return setMessage(error.message);

      const userId = data.session?.user?.id || data.user?.id;
      if (userId) {
        const { error: profileError } = await supabase
        .from("profiles")
        .insert([
          {
            id: userId,
            email,
            first_name: firstName,
            last_name: lastName,
            company,
            phone,
          },
        ]);

        if (profileError) {
          console.log("userId being inserted:", userId);
          console.error("Profile Insert Error:", profileError);
          return setMessage(`Signup succeeded, but profile creation failed: ${profileError.message}`);
        }
      }

      setMessage("Check your email to confirm signup.");
    }
  };

  return (
    <main className="min-h-screen bg-black text-white font-sans">
      <Header />

      <div className="flex flex-col items-center justify-center px-6 py-12">
        <div className="flex justify-center mb-6">
          <Image src="/logo.svg" alt="DealerEase Logo" width={60} height={60} />
        </div>

        <h1 className="text-2xl font-bold text-center mb-6">
          {isLogin ? "Log In" : "Sign Up"}
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md">
          {!isLogin && (
            <>
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="px-4 py-2 rounded-lg text-black"
              />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                className="px-4 py-2 rounded-lg text-black"
              />
              <input
                type="text"
                placeholder="Company Name"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                required
                className="px-4 py-2 rounded-lg text-black"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="px-4 py-2 rounded-lg text-black"
              />
            </>
          )}

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
            className="bg-white text-black font-semibold py-2 rounded-full hover:bg-gray-200 transition"
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
