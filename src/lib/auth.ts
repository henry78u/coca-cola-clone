/**
 * Client-side localStorage authentication engine for Coca-Cola Clone
 * Educational project demonstration (simulated auth, no server).
 */

export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: "admin" | "viewer";
  createdAt: string;
}

export interface Session {
  email: string;
  name: string;
  role: "admin" | "viewer";
  loginAt: string;
}

const USERS_KEY = "cokeclone_users";
const SESSION_KEY = "cokeclone_session";

function hashPassword(password: string): string {
  try {
    return btoa(password);
  } catch {
    return password;
  }
}

// Seed on module load
export function initAuthStore(): void {
  if (typeof window === "undefined") return;
  const existing = localStorage.getItem(USERS_KEY);
  if (!existing || existing === "[]") {
    const seedUsers: User[] = [
      {
        id: "usr_admin",
        name: "Admin",
        email: "admin@cokeclone.dev",
        passwordHash: hashPassword("admin123"),
        role: "admin",
        createdAt: new Date().toISOString(),
      },
      {
        id: "usr_demo",
        name: "Demo User",
        email: "demo@cokeclone.dev",
        passwordHash: hashPassword("demo123"),
        role: "viewer",
        createdAt: new Date().toISOString(),
      },
    ];
    localStorage.setItem(USERS_KEY, JSON.stringify(seedUsers));
  }
}

// Trigger initialization immediately
initAuthStore();

export function getUsers(): User[] {
  if (typeof window === "undefined") return [];
  initAuthStore();
  const raw = localStorage.getItem(USERS_KEY);
  try {
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function signUp(data: { name: string; email: string; password: string }): { success: boolean; error?: string; session?: Session } {
  initAuthStore();
  const users = getUsers();
  const normalizedEmail = data.email.trim().toLowerCase();

  if (users.some((u) => u.email.toLowerCase() === normalizedEmail)) {
    return { success: false, error: "An account with this email already exists." };
  }

  const role: "admin" | "viewer" = normalizedEmail === "admin@cokeclone.dev" ? "admin" : "viewer";
  const newUser: User = {
    id: `usr_${Date.now()}`,
    name: data.name.trim(),
    email: normalizedEmail,
    passwordHash: hashPassword(data.password),
    role,
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));

  const session: Session = {
    email: newUser.email,
    name: newUser.name,
    role: newUser.role,
    loginAt: new Date().toISOString(),
  };

  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  window.dispatchEvent(new Event("cokeclone_auth_change"));
  return { success: true, session };
}

export function signIn(data: { email: string; password: string }): { success: boolean; error?: string; session?: Session } {
  initAuthStore();
  const users = getUsers();
  const normalizedEmail = data.email.trim().toLowerCase();
  const inputHash = hashPassword(data.password);

  const matchedUser = users.find(
    (u) => u.email.toLowerCase() === normalizedEmail && u.passwordHash === inputHash
  );

  if (!matchedUser) {
    return { success: false, error: "Invalid email or password combination." };
  }

  const session: Session = {
    email: matchedUser.email,
    name: matchedUser.name,
    role: matchedUser.role,
    loginAt: new Date().toISOString(),
  };

  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  window.dispatchEvent(new Event("cokeclone_auth_change"));
  return { success: true, session };
}

export function signOut(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(SESSION_KEY);
  window.dispatchEvent(new Event("cokeclone_auth_change"));
}

export function getSession(): Session | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function isAuthed(): boolean {
  return getSession() !== null;
}

export function isAdmin(): boolean {
  const session = getSession();
  return session !== null && session.role === "admin";
}
