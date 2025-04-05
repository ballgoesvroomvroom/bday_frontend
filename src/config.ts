const DEVELOPMENT = {
	COOKIE_NAME: "monster",
	BACKEND_URL: "http://localhost:3001",
}

const PRODUCTION = {
	COOKIE_NAME: "monster",
	BACKEND_URL: "https://prod.blowmycandles.com",
}

export default (process.env.NODE_ENV === "production" ? PRODUCTION : DEVELOPMENT)
