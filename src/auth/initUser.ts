import { type User } from 'oidc-client-ts';
import ReactDOM from 'react-dom/client';

import { userManager } from './userManager';
// import { getSavedProjectKey, LAST_PROJECT_KEY_COOKIE } from 'helpers';

// async function fetchXapisUser(email?: string) {
//   if (!email) return Promise.resolve(null);
//   const data = await Xapis.User.get(email);
//   return data.status === 200 ? data.data : null;
// }

export async function initUser(root: ReactDOM.Root): Promise<User | null> {
  root.render('Loading...');
  await new Promise((res) => setTimeout(res, 1000));
  const authUser = await userManager.getUser().catch((err) => {
    console.error('initUser::error:', err);
    return null;
  });
  console.log('initUser::authUser:', authUser);

  return Promise.resolve(authUser);
}
