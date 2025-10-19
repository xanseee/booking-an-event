export default class ErrorWithStatusCode extends Error {
	constructor(message, code) {
		super(message);
		this.statusCode = code;
	}
}