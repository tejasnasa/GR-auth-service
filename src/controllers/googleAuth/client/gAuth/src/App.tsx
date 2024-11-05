// import { useState } from 'react';
import { auth, googleProvider } from './firebase';
import { signInWithPopup, UserCredential } from 'firebase/auth';

function App() {
  const handleGoogleSignIn = async (): Promise<void> => {
    try {
      const result: UserCredential = await signInWithPopup(auth, googleProvider);
      console.log(result);
      
      // The getIdToken method is a function, so it needs to be called.
      const token = await result.user.getIdToken();

      const response = await fetch('https://localhost:3001/api/protected', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const userData = await response.json();
      console.log('User Data', userData);
    } catch (error) {
      console.error('Error during sign-in', error);
    }
  };

  return (
    <div>
      <button onClick={handleGoogleSignIn}>Sign in with Google</button>
    </div>
  );
}

export default App;
