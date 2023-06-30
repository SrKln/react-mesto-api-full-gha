const router = require('express').Router();
const {
  getUsers,
  getUserId,
  getCurrentUser,
  updateProfUser,
  updateAvaUser,
} = require('../controllers/users');

const {
  userIdValidator,
  userInfoValidator,
  userAvatarValidator,
} = require('../middlewares/validation');

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.patch('/me', userInfoValidator, updateProfUser);
router.patch('/me/avatar', userAvatarValidator, updateAvaUser);
router.get('/:userId', userIdValidator, getUserId);
module.exports = router;
