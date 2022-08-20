const router = require('express').Router();

const {
  createNewUser,
  loginUser,
  logoutUser,
  findUser,
  deleteUser,
  updateUsername,
  updateEmail
} = require('../handlers/users');

router.post('/signup', createNewUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.post('/find', findUser);
router.put('/changeUsername', updateUsername);
router.put('/changeEmail', updateEmail);
router.delete('/remove', deleteUser);

module.exports = router;