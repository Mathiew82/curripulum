"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User } from "@supabase/supabase-js";
import { createClient } from "../../utils/supabase/client";
import "./Navbar.css";

interface NavbarProps {
  user: User;
}

export default function Navbar({ user }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/auth/login");
  };

  const initials = (user.email ?? "")
    .split("@")[0]
    .split(".")
    .map((s) => s.charAt(0).toUpperCase())
    .join("")
    .slice(0, 2);

  return (
    <nav className="navbar">
      <span className="navbar-logo">curripulum</span>
      <div className="navbar-user" ref={menuRef}>
        <button className="navbar-avatar" onClick={() => setOpen(!open)}>
          {initials}
        </button>
        <span className="navbar-email">{user.email}</span>
        {open && (
          <div className="navbar-menu">
            <button className="navbar-menu-item" onClick={() => setOpen(false)}>
              Mi cuenta
            </button>
            <button className="navbar-menu-item" onClick={handleLogout}>
              Cerrar sesión
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
