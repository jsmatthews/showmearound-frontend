let backendHost;
let hostname;

if (window && window.location && window.location.hostname) {
	hostname = window.location;
} else {
	hostname = 'http://localhost:3000';
}

if (hostname === 'http://localhost:3000') {
	backendHost = 'http://localhost:3001';
} else {
	backendHost = process.env.REACT_APP_BACKEND_HOST || 'http://localhost:3001';
}

export const API_ROOT = `${backendHost}`;