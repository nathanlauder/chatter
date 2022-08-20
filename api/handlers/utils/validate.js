const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

const isValidEmail = (email) => emailRegexp.test(email);

const isValidUsername = (username) => username.length >= 5 && username.length <= 30;

const isValidPassword = (password) => password.length >= 10 && password.length <= 50;

module.exports = { isValidEmail, isValidUsername, isValidPassword };