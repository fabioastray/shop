module.exports = {
  'authentication': {
    'resetAccount': {
      'expiresIn': 20 * 60 * 1000 // 20 minutes
    }
  },
  'authorization': {
    'headerKey': 'authorization',
    'jwt': {
      'secret': 'super-secret',
      'expiresIn': 86400 // 24 hours
    }
  }
}