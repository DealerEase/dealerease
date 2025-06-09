import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full bg-black px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo & Brand Name */}
        <div className="flex items-center gap-4">
          <img src="/logo.svg" alt="DealerEase Logo" className="h-10 w-auto object-contain" />
          <span className="text-2xl font-semibold text-white">DealerEase</span>
        </div>

        {/* Navigation */}
      <nav className="hidden md:flex items-center space-x-6 text-lg text-gray-300">
  <Link href="/"><span className="hover:text-white cursor-pointer">Home</span></Link>
  <Link href="/features"><span className="hover:text-white cursor-pointer">Features</span></Link>
  <Link href="#"><span className="hover:text-white cursor-pointer">About</span></Link>
  <Link href="#"><span className="hover:text-white cursor-pointer">Contact</span></Link>
  <Link href="/auth"><span className="hover:text-white cursor-pointer">Log In</span></Link>
</nav>

      </div>
    </header>
  );
}
