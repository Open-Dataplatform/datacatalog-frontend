/*
This is the environments file for the production environment, the base url is the link to the api
 */
export const environment = Object.assign({
  production: true,
  base: 'https://dpdatacatalogwebapi-appservice-prod.azurewebsites.net',
  oidcSettings: {
    client_id : '8cdf0892-b169-47e4-baa2-03a118a61804',
    authority: 'https://login.microsoftonline.com/f7619355-6c67-4100-9a78-1847f30742e2/v2.0/',
    response_type: 'code',
    post_logout_redirect_uri: 'https://dataplatform.energinet.dk/',
    loadUserInfo: false,
    redirect_uri: 'https://dataplatform.energinet.dk/login',
    silent_redirect_uri: 'https://dataplatform.energinet.dk/login',
    automaticSilentRenew: true,
    scope: 'api://8cdf0892-b169-47e4-baa2-03a118a61804/user_impersonation openid profile offline_access',
  }
},
  (window as any).dynamicEnvironment);
