'use client';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { FiLogOut } from 'react-icons/fi';

const LogoutButton = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  return (
    <div className="flex items-center gap-2">
      <button className="links" onClick={handleSignOut}>        
          <FiLogOut className='text-2xl' />        
      </button>
    </div>
  );
};

export default LogoutButton;