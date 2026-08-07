"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const supabase = createClient();

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) alert(error.message);
    else window.location.href = "/dashboard";
  };

  const handleSocialLogin = (provider: "google" | "github" | "linkedin") => {
    supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  return (
    <form onSubmit={handleEmailLogin} className="tu-clase-css">
      <h1>Iniciar sesión</h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="tu-clase-css"
      />

      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="tu-clase-css"
      />

      <button type="submit">Entrar</button>

      <div>
        <button type="button" onClick={() => handleSocialLogin("google")}>
          Google
        </button>
        <button type="button" onClick={() => handleSocialLogin("github")}>
          GitHub
        </button>
        <button type="button" onClick={() => handleSocialLogin("linkedin")}>
          LinkedIn
        </button>
      </div>
    </form>
  );
}
