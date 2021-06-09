/*
This is the environments file for the preprod environment, the base url is the link to the api
 */
import { WebStorageStateStore } from 'oidc-client';

export const environment = Object.assign({
  production: false,
  base: 'https://dpdatacatalogwebapi-appservice-preprod.azurewebsites.net',
  oidcSettings: {
    client_id : '8cdf0892-b169-47e4-baa2-03a118a61804',
    authority: 'https://login.microsoftonline.com/f7619355-6c67-4100-9a78-1847f30742e2/v2.0/',
    response_type: 'code',
    post_logout_redirect_uri: 'https://dpdatacatalogwebapp-appservice-preprod.azurewebsites.net/',
    loadUserInfo: false,
    redirect_uri: 'https://dpdatacatalogwebapp-appservice-preprod.azurewebsites.net/login',
    silent_redirect_uri: 'https://dpdatacatalogwebapp-appservice-preprod.azurewebsites.net/login',
    automaticSilentRenew: true,
    scope: 'api://8cdf0892-b169-47e4-baa2-03a118a61804/user_impersonation openid profile offline_access',
    userStore: new WebStorageStateStore({ store: window.localStorage })
  }
},
  (window as any).dynamicEnvironment);
