import { useState } from 'react';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import LoginForm from '../../components/LoginForm/LoginForm';
import '../App/App.css';

export default function AuthPage({ setUser }) {
  const [showSignUp, setShowSignUp] = useState(false);
  return (
    <main className='lander'>
      <div className='grub'>
        <h2>Grub Finder</h2>
        <h2>🔍🐛</h2>
        <h3> We know where to look </h3>
      </div>

      <div className='lander-form'>
      <h2>Sign Up or Log In</h2>
      <button className="toggle"
      onClick={() => setShowSignUp(!showSignUp)}>{showSignUp ? 'Log In' : 'Sign Up'}</button>
      { showSignUp ?
          <SignUpForm setUser={setUser} />
          :
          <LoginForm setUser={setUser} />
      }
      </div>
    </main>
  );
}
