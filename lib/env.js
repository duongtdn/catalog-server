"use strict"

const server = {
  purchase: 'https://api.expiup.com/purchase',
  enroll: 'https://api.expiup.com/enroll',
  course: 'https://api.expiup.com/course',
  learndesk: 'https://api.expiup.com/learndesk'
}

export const authApi = {
  login: process.env.API_LOGIN || 'https://auth.expiup.com/auth/login',
  signup: process.env.API_SIGNUP || 'https://auth.expiup.com/auth/signup',
  check: process.env.API_CHECK || 'https://auth.expiup.com/check/user',
  resetPassword: process.env.API_RESET_PASSWORD || 'https://auth.expiup.com/auth/request_reset_password_link',
}

module.exports = { server, authApi }