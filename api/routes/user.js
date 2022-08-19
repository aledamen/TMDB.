const express = require('express')
const router = express.Router()
const UserController = require('../controllers/user.controller')

router.get('/', UserController.getAllUsers)
router.get('/:id', UserController.getUser)
router.get('/:id/favorites', UserController.getUserFavorites)
router.get('/search/:search', UserController.searchUser)

router.post('/', UserController.createUser)

router.put('/:id', UserController.editUser)
router.put('/:id/setfavorites', UserController.setFavorite)
router.put('/:id/removefavorites', UserController.deleteFavorite)

router.delete('/:id', UserController.deleteUser)


module.exports = router;
