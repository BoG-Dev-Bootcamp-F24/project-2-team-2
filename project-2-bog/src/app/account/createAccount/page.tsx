"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
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
    event.preventDefault(); // Prevent the default form submit behavior

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Logging the data to ensure the fields are filled out correctly
    console.log("Sending data:", { fullName, email, password, isAdmin });

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
        return; // Stop further execution if the response is not OK
      }

      const data = await response.json();
      if (data.error) {
        setError(data.error);
        return;
      }

      // Redirect to login page after successful signup
      router.push("/account/login");
    } catch (error) {
      // Handle unexpected errors
      setError(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    }
  };

  return (
    <div className="auth-container">
      <header className="auth-header">
        {/* <img src="/logo.png" alt="Logo" className="logo" />
        <h1>Progress</h1> */}
      </header>
      <form className="auth-form" onSubmit={handleSignup}>
        <h2>Create Account</h2>
        {error && <p className="error-message">{error}</p>} {/* Display error if it exists */}
        
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
  );
};

export default SignupPage;