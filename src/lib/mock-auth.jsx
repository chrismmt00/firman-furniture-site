"use client";

import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);
const STORAGE_KEY = "firman.auth";

export const ROLES = [
  { value: "guest", label: "Guest" },
  { value: "shopper", label: "Shopper" },
  { value: "super", label: "Super Admin" },
  { value: "content", label: "Content Editor" },
  { value: "fulfillment", label: "Fulfillment" },
  { value: "cs", label: "Customer Service" },
];

const ADMIN_ROLES = ["super", "content", "fulfillment", "cs"];

function loadInitial() {
  if (typeof window === "undefined") return { user: null, role: "guest" };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { user: null, role: "guest" };
    return JSON.parse(raw);
  } catch {
    return { user: null, role: "guest" };
  }
}

export function MockAuthProvider({ children }) {
  const [state, setState] = useState({ user: null, role: "guest" });
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setState(loadInitial());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state, hydrated]);

  const signIn = (email, role = "shopper", name) => {
    setState({
      user: {
        email,
        name: name || email.split("@")[0],
        id: "c-1001",
      },
      role,
    });
  };

  const signOut = () => setState({ user: null, role: "guest" });

  const setRole = (role) =>
    setState((s) => ({
      ...s,
      role,
      user:
        s.user ||
        (role !== "guest"
          ? { email: "demo@firman.demo", name: "Demo User", id: "c-1001" }
          : null),
    }));

  return (
    <AuthContext.Provider
      value={{
        ...state,
        hydrated,
        isAdmin: ADMIN_ROLES.includes(state.role),
        signIn,
        signOut,
        setRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside MockAuthProvider");
  return ctx;
}
