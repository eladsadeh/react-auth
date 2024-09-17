import { WebStorageStateStore } from 'oidc-client-ts';
const { protocol, hostname, port } = window.location;
const origin = `${protocol}//${hostname}${port ? `:${port}` : ''}`;

export const oidcConfig = {
  authority: 'https://sso-stg.transperfect.com',
  client_id: 'CqCVnyVRs72RyJT8NhEmI4oqXx8t3Maq2',
  redirect_uri: `${origin}/post_login`,
  post_logout_redirect_uri: `${origin}/post_logout`,
  silent_redirect_uri: `${origin}/silent_renew`,
  scope: 'openid email GlobalLinkGO clients offline_access',
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
