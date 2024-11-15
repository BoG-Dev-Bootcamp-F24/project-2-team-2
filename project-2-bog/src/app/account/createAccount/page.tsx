'use client'
//katherine
import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import '../Auth.css';


const SignupPage: React.FC = () => {
  const router = useRouter();

  const handleSignup = (event: React.FormEvent) => {
    event.preventDefault();
    router.push('/logInPage'); //fix
  };

  return (
    <div className="auth-container">
      <header className="auth-header">
        {/* <img src="/logo.png" alt="Progress Logo" className="logo" />
        <h1>Progress</h1> */}
      </header>
      <form className="auth-form" onSubmit={handleSignup}>
        <h2>Create Account</h2>
        <input type="text" placeholder="Full Name" required />
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <input type="password" placeholder="Confirm Password" required />
        <label>
          <input type="checkbox" />
          Admin access
        </label>
        <button type="submit" className="auth-button">Sign up</button>
        <p>Already have an account? <Link href="/account/login">Sign in</Link></p>
      </form>
      <footer className="auth-footer">
        <p>Made by Chloe, Katherine, Kevin, and Lindsay ❤️</p>
      </footer>
    </div>
  );
};

export default SignupPage;
