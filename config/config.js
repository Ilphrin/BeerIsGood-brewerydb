if (process.env.MONGODB_USER === undefined) {
  console.error('ERR: Environment variables not set for MongoDB');
  console.error('     Set MONDOB_USER and MONGODB_PASSWORD');
}

const config = {
  sandboxUrl: 'https://sandbox-api.brewerydb.com/v2/',
  sandboxKey: 'a8b5ff97b5e5648758085913db9595dc',
  port: 3005,
  heroku: {
    mongo: `mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@ds060749.mlab.com:60749/beerisgood`
  }
};

module.exports = config;
