"use strict"

export const api = {
  login: process.env.API_LOGIN || 'https://auth.expiup.com/auth/login',
  signup: process.env.API_SIGNUP || 'https://auth.expiup.com/auth/signup',
  check: process.env.API_CHECK || 'https://auth.expiup.com/check/user',
  resetPassword: process.env.API_RESET_PASSWORD || 'https://auth.expiup.com/auth/request_reset_password_link',
}

