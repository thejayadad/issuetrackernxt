'use client'
import { signIn } from 'next-auth/react';
import { FaGoogle } from 'react-icons/fa';

const LoginWithGoogle = () => {
  return (
    <button
      onClick={() => signIn('google')}
      className="text-black  py-2 px-4 rounded-md flex items-center">
      <FaGoogle className="mr-2" />
      <span>Sign In with Google</span>
    </button>
  );
};

export default LoginWithGoogle;
