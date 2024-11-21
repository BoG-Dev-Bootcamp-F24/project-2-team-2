"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import TopBar from "../../../components/TopBar";
import "../Auth.css";

const SignupPage: React.FC = () => {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignup = async (event: React.FormEvent) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          email,
          password,
          confirmPassword,
          isAdmin,
        }),
      });

      if (!response.ok) {
        const responseData = await response.json();
        setError(responseData.error || "Failed to sign up. Please try again.");
        return;
      }

      const data = await response.json();
      if (data.error) {
        setError(data.error);
        return;
      }
      router.push("/account/login");
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    }
  };

  return (
    <>
      <TopBar />
      <div className="auth-container">
        <header className="auth-header">
          {/* <img src="/logo.png" alt="Logo" className="logo" />
        <h1>Progress</h1> */}
        </header>
        <form className="auth-form" onSubmit={handleSignup}>
          <h2>Create Account</h2>
          {error && <p className="error-message">{error}</p>}{" "}
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <label>
            <input
              type="checkbox"
              checked={isAdmin}
              onChange={() => setIsAdmin(!isAdmin)}
            />
            Admin access
          </label>
          <button type="submit" className="auth-button">
            Sign up
          </button>
          <p>
            Already have an account? <Link href="/account/login">Sign in</Link>
          </p>
        </form>

        <footer className="auth-footer">
          <p>Made by Chloe, Katherine, Kevin, and Lindsay ❤️</p>
        </footer>
      </div>
    </>
  );
};

export default SignupPage;
