const express = require('express');
const userController = require('./../controllers/userController');


//Routing:
const router = express.Router();

router.route('/').get(userController.getAllUsers).post(userController.createUser);
router
  .route('/:id')
  .get(userController.getAUser)
  .patch(userController.updateUsers)
  .delete(userController.deleteUser);

//Exporting the module:
module.exports = router;