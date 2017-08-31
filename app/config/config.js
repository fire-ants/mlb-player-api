function getProdMongoUri() {
  try {
    const services = JSON.parse(process.env.VCAP_SERVICES);
    return services.mlab[0].credentials.uri;
  } catch (err) {
    return '';
  }
}

const config = {
  production: {
    port: process.env.PORT,
    mongo: {
      uri: getProdMongoUri()
    }
  },
  development: {
    port: process.env.PORT || '8080',
    mongo: {
      uri: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mlb-player-api-dev'
    }
  },
  test: {
    port: process.env.PORT || '8000',
    mongo: {
      uri: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mlb-player-api-test'
    }
  }
};

exports.get = function get(env) {
  return config[env] || config.production;
};
