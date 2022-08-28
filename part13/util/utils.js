const bcrypt = require('bcrypt')

const hashPassword = (password) => {
  const saltRounds = 10
  const passwordHash = bcrypt.hash(password, saltRounds)

  return passwordHash;
}

module.exports = {
  hashPassword
}