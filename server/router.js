const express = require('express');
const AuthController = require('./controllers/auth');
const FileController = require('./controllers/file')
const auth = require('./middlewares/auth')
const router = new express.Router();


router.post('/api/login',AuthController.login)
router.post('/api/refresh',AuthController.refresh)
router.post('/api/logout',auth,AuthController.logout)
router.post('/api/get-file',auth,FileController.getAllFiles)
router.post('/api/rename-file',auth,FileController.renameFile)

module.exports = router