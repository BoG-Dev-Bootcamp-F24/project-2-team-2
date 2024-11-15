'use client'
//katherine
import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import '../Auth.css';

const LoginPage: React.FC = () => {
  const router = useRouter();

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    router.push('/home'); // need to fix so that it redirects to correct page after log in
  };

  return (
    <div className="auth-container">
      <header className="auth-header">
        {/* <img src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.shutterstock.com%2Fsearch%2Fdog-paw-logo&psig=AOvVaw3_3mjmgqoT4QonPPxAWLBi&ust=1731715565064000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCPigxLCF3YkDFQAAAAAdAAAAABAE" alt="Progress Logo" className="logo" /> */}
        {/* <h1>Progress</h1> */}
      </header>
      <form className="auth-form" onSubmit={handleLogin}>
        <h2>Login</h2>
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <button type="submit" className="auth-button">Log in</button>
        <p>Don't have an account? <Link href="/account/createAccount">Sign up</Link></p>
      </form>
      <footer className="auth-footer">
        <p>Made by Chloe, Katherine, Kevin, and Lindsay ❤️</p>
      </footer>
    </div>
  );
};

export default LoginPage;