export interface IValidation {
  phone?: string
  login: string
  password: string
}

export function validatePhone (phone: string): string {
  if (phone === '') {
    return 'Phone number is required'
  }
  if (!/^[+]?[(]?[0-9]{3}[)]?[-\s]?[0-9]{3}[-\s]?[0-9]{4,6}$/.test(phone)) {
    return 'Invalid phone number format'
  }
  return ''
}

export function validateLogin (login: string): string {
  if (login === '' || login.length < 3) {
    return 'Login is required and must contain more than 3 symbols'
  }
  return ''
}

export function validatePassword (password: string): string {
  if (password === '') {
    return 'Password is required'
  }
  if (!/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/.test(password)) {
    return 'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character'
  }
  return ''
}
