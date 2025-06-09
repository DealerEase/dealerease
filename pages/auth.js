{\rtf1\ansi\ansicpg1252\cocoartf2822
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 import \{ useState \} from "react";\
import \{ supabase \} from "../lib/supabaseClient";\
import \{ useRouter \} from "next/router";\
\
export default function AuthPage() \{\
  const [mode, setMode] = useState("login"); // or "signup"\
  const [email, setEmail] = useState("");\
  const [password, setPassword] = useState("");\
  const [error, setError] = useState(null);\
  const router = useRouter();\
\
  const handleSubmit = async () => \{\
    setError(null);\
    const fn = mode === "login" ? supabase.auth.signInWithPassword : supabase.auth.signUp;\
    const \{ data, error \} = await fn(\{ email, password \});\
\
    if (error) \{\
      setError(error.message);\
    \} else \{\
      router.push("/dashboard"); // redirect after login/signup\
    \}\
  \};\
\
  return (\
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">\
      <div className="bg-neutral-900 p-8 rounded-xl w-full max-w-md shadow-lg">\
        \{/* Logo */\}\
        <div className="flex justify-center mb-6">\
          <img src="/logo.svg" alt="DealerEase Logo" className="h-12" />\
        </div>\
\
        <h1 className="text-2xl font-semibold mb-6 text-center">\
          \{mode === "login" ? "Dealer Login" : "Dealer Signup"\}\
        </h1>\
\
        <input\
          type="email"\
          placeholder="Email"\
          value=\{email\}\
          onChange=\{(e) => setEmail(e.target.value)\}\
          className="w-full mb-4 px-4 py-2 rounded bg-neutral-800 text-white"\
        />\
\
        <input\
          type="password"\
          placeholder="Password"\
          value=\{password\}\
          onChange=\{(e) => setPassword(e.target.value)\}\
          className="w-full mb-4 px-4 py-2 rounded bg-neutral-800 text-white"\
        />\
\
        \{error && <p className="text-red-500 mb-4">\{error\}</p>\}\
\
        <button\
          onClick=\{handleSubmit\}\
          className="w-full bg-white text-black py-2 rounded hover:bg-gray-200 transition"\
        >\
          \{mode === "login" ? "Log In" : "Sign Up"\}\
        </button>\
\
        <p className="mt-4 text-center text-sm text-gray-400">\
          \{mode === "login" ? (\
            <>\
              Don\'92t have an account?\{" "\}\
              <span\
                onClick=\{() => setMode("signup")\}\
                className="underline cursor-pointer"\
              >\
                Sign Up\
              </span>\
            </>\
          ) : (\
            <>\
              Already have an account?\{" "\}\
              <span\
                onClick=\{() => setMode("login")\}\
                className="underline cursor-pointer"\
              >\
                Log In\
              </span>\
            </>\
          )\}\
        </p>\
      </div>\
    </div>\
  );\
\}\
}