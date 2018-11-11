"use strict"

const server = {
  purchase: 'https://api.expiup.com/purchase',
  enroll: 'https://api.expiup.com/enroll',
  course: 'https://api.expiup.com/course',
  learndesk: 'https://study.expiup.com/course'
}

export const authApi = {
  login: process.env.API_LOGIN || 'https://auth.expiup.com/auth/login',
  signup: process.env.API_SIGNUP || 'https://auth.expiup.com/auth/signup',
  check: process.env.API_CHECK || 'https://auth.expiup.com/check/user',
  resetPassword: process.env.API_RESET_PASSWORD || 'https://auth.expiup.com/auth/request_reset_password_link',
  update_password: 'https://auth.expiup.com/me/update_password',
  update_profile: 'https://auth.expiup.com/me/update_profile',
}

module.exports = { server, authApi }