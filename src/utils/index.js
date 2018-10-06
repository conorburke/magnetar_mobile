const url = {};

if (process.env.NODE_ENV === 'production') {
  url.api = 'http://localhost:7777'; // can be different than Dev if needed
} else {
  url.api = 'http://localhost:7777';
}

export default url;
