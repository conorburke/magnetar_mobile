const url = {};

if (process.env.NODE_ENV === 'production') {
  url.api = 'http://localhost:7000'; // can be different than Dev if needed
} else if (process.env.NODE_ENV === 'development') {
  url.api = 'http://localhost:8080/api';
}

export default url;
