import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth';

export const PostLogin = () => {
  const navigate = useNavigate();
  //   const { setXapisUser } = useUserProvider();

  const auth = useAuth();
  const { isAuthenticated = false, isLoading = false, error, user } = auth;

  console.log('PostLogin::', { isAuthenticated, isLoading, user });
  const redirectUrl = (auth?.user?.state as { path: string })?.path || '/';

  // TODO: Better error handling
  // 1. IF XAPIS user not found
  // 2. IF user has no projects

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      const path = redirectUrl || '/';
      navigate(path, { replace: true });
    }
  }, [
    isAuthenticated,
    isLoading,
    navigate,
    redirectUrl,
    user?.access_token,
    user?.profile.email,
  ]);

  if (error) {
    const { message } = error;
    console.error('auth.error: ', error);
    return <div>Post Login: Oops... {message}</div>;
  }
  return <div>Post Login</div>;
};
