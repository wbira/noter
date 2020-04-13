
const MIN_PASSWORD_LENGTH = 8;

export function validatePassword(password) {
  return password && password.length >= MIN_PASSWORD_LENGTH
}

export function validateConfirmPassword(password, confirmPassword) {
  return validatePassword(confirmPassword) && password === confirmPassword
}