
export function validateEmail(email) {
  if (!email) {
    return false
  }
  return !!email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
}