import { WebStorageStateStore } from 'oidc-client-ts';
const { protocol, hostname, port } = window.location;
const origin = `${protocol}//${hostname}${port ? `:${port}` : ''}`;

const { VITE_OICD_CLIENT_ID, VITE_AUTH_AUTHORITY, VITE_OIDC_SCOPE } =
  import.meta.env;

export const oidcConfig = {
  authority: `${VITE_AUTH_AUTHORITY}`,
  client_id: `${VITE_OICD_CLIENT_ID}`,
  redirect_uri: `${origin}/post_login`,
  post_logout_redirect_uri: `${origin}/post_logout`,
  silent_redirect_uri: `${origin}/silent_renew`,
  scope: `${VITE_OIDC_SCOPE}`,
  /*
   * offline_access:
   * is needed for localhost, SSO iframe relies on a secure network
   * provides a refresh_token for renewing the access_token
   */
  response_type: 'code',
  automaticSilentRenew: false,
  revokeAccessTokenOnSignout: true,
  filterProtocolClaims: true,
  loadUserInfo: true,
  silentRequestTimeoutInSeconds: 59, // seconds needed for renewal to timeout
  onSigninCallback: () => {
    window.history.replaceState(
      {},
      window.document.title,
      window.location.origin + window.location.pathname
    );
  },
  userStore: new WebStorageStateStore({ store: window.localStorage }),
};
