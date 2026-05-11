const env = 'dev';

const envs = {
  dev: {
    baseUrl: 'http://127.0.0.1:8080/api',
    useMock: true
  },
  prod: {
    baseUrl: 'https://api.example.com/api',
    useMock: false
  }
};

const config = {
  env,
  ...envs[env],
  appName: '包厢预订',
  contactPhone: '400-000-0000',
  pageSize: 10
};

export default config;
