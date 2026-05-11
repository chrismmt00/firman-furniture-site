"use client";

import { useAuth } from "@/lib/mock-auth";

export default function RoleGate({ allow = [], children, fallback = null }) {
  const { role, hydrated } = useAuth();
  if (!hydrated) return null;
  if (!allow.includes(role)) return fallback;
  return <>{children}</>;
}
