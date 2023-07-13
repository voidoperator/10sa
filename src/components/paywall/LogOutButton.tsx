import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from '../TailwindStyled';
import { signOut } from 'firebase/auth';
import { auth } from '@/firebase/firebaseClient';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useAuthState } from 'react-firebase-hooks/auth';

const LogOutButton = () => {
  const [disabled, setDisabled] = useState<boolean>(false);
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();

  const handleLogout = async () => {
    if (loading) return;
    setDisabled(true);
    if (user && !error) {
      try {
        const logoutResponse = await axios.post('/api/logout', { uid: user.uid });
        const { SID } = logoutResponse.data;
        if (SID === 'empty') {
          localStorage.removeItem('agency');
          Cookies.remove('agency');
          Cookies.remove('UID');
          Cookies.remove('SID');
          await signOut(auth);
          router.replace('/');
          return;
        }
      } catch (error) {
        console.error(error);
        setDisabled(false);
      }
    }
    setDisabled(false);
  };

  return (
    <div className='bottom-4 left-4 fixed'>
      <Button type='button' onClick={handleLogout} className='border-0' disabled={disabled}>
        {disabled ? 'Loading' : 'Logout'}
      </Button>
    </div>
  );
};

export default LogOutButton;
