module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', 'f0f026a750d3176ceeadcddcb1bfc0c0'),
    },
  },
  bitly: {
    token: env('BITLY_AUTH_TOKEN'),
    url: 'https://api-ssl.bitly.com/v4/shorten',
  },
});
