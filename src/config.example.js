var ENVIRONMENT="local"

function getConfig() {
  switch (ENVIRONMENT) {
  case "native":
    return {
      API_URL: 'http://10.0.2.2:5000',
      API_VERSION: 1,
      VERSION: 'debug',
      DEBUG: true,
      TIMEOUT: 10000,
      DATETIMEFORMAT: "MM/DD/YYYY hh:mm A",
    };
  case "local":
    return {
      API_URL: 'http://localhost:5000',
      API_VERSION: 1,
      VERSION: 'debug',
      DEBUG: true,
      TIMEOUT: 2000,
      DATETIMEFORMAT: "MM/DD/YYYY hh:mm A",
    };
  case "staging":
    return {
      API_URL: 'http://api.example.com/',
      API_VERSION: 1,
      VERSION: 'demo',
      DEBUG: false,
      TIMEOUT: 20000,
      DATETIMEFORMAT: "MM/DD/YYYY hh:mm A",
    };
  case "production":
    return {
      API_URL: 'http://api.example.com/',
      API_VERSION: 1,
      VERSION: 'production',
      DEBUG: false,
      TIMEOUT: 20000,
      DATETIMEFORMAT: "MM/DD/YYYY hh:mm A",
    };
  default:
    return {
      API_URL: 'http://localhost:5000',
      API_VERSION: 1,
      VERSION: 'debug',
      DEBUG: true,
      TIMEOUT: 20000,
      DATETIMEFORMAT: "MM/DD/YYYY hh:mm A",
    };
  }
}

const config = getConfig();
config.GUEST_ENABLED=false
config.APPNAME="Template App"
config.COPYRIGHTDATE="2017"
export default config
