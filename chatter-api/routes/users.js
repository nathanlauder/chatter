const express = require('express');

const router = express.Router();

const {
  createNewUser,
  findUser,
  deleteUser,
  updateUsername,
  updateEmail
} = require('../handlers/users');

router.post('/new', createNewUser);
router.post('/find', findUser);
router.put('/changeUsername', updateUsername);
router.put('/changeEmail', updateEmail);
router.delete('/remove', deleteUser);

module.exports = router;