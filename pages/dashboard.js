import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import Header from "../components/Header";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (error) console.error("Error fetching user:", error);
      else setUser(user);
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      const { data, error } = await supabase
        .from("profiles")
        .select("first_name, last_name, company, phone, email")
        .eq("id", user.id)
        .single();

      if (error) console.error("Error fetching profile:", error);
      else setProfile(data);
      setLoading(false);
    };

    fetchProfile();
  }, [user]);

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white font-sans">
        <Header />
        <div className="flex items-center justify-center h-screen">
          <p>Loading...</p>
        </div>
      </main>
    );
  }

  if (!profile) {
    return (
      <main className="min-h-screen bg-black text-white font-sans">
        <Header />
        <div className="flex items-center justify-center h-screen">
          <p>No profile found.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white font-sans px-6 py-10">
      <Header />
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Welcome, {profile.first_name}!</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-neutral-900 p-6 rounded-xl">
            <h2 className="text-xl font-semibold mb-2">Your Info</h2>
            <p><strong>Full Name:</strong> {profile.first_name} {profile.last_name}</p>
            <p><strong>Company:</strong> {profile.company}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Phone:</strong> {profile.phone}</p>
          </div>

          <div className="bg-neutral-900 p-6 rounded-xl">
            <h2 className="text-xl font-semibold mb-2">Next Step</h2>
            <p className="text-gray-400 mb-4">Start creating for-sale listings using our AI Description Builder.</p>
            <a
              href="/description-builder"
              className="inline-block bg-white text-black px-6 py-2 rounded-full font-semibold shadow hover:bg-gray-200 transition"
            >
              Open Description Builder
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
