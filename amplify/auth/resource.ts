import { defineAuth, secret } from "@aws-amplify/backend";

/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth = defineAuth({
  loginWith: {
    email: true,
    externalProviders: {
      oidc: [
        {
          name: 'GitHub',
          clientId: secret('GITHUB_CLIENT_ID'),
          clientSecret: secret('GITHUB_CLIENT_SECRET'),
          issuerUrl: 'https://github.com',
        },
      ],
      logoutUrls: ['http://localhost:3000/', 'https://main.d2zovfiqju0pfn.amplifyapp.com/'],
      callbackUrls: [
        'http://localhost:3000/profile',
        'https://main.d2zovfiqju0pfn.amplifyapp.com/profile',
      ],
    },
  },
});
