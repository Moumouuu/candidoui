/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from '#infrastructure/adonis/kernel'

const UserController = () => import('#controllers/user_controller')

const AuthController = () => import('#controllers/auth_controller')

const HomeController = () => import('#controllers/home_controller')

// Unauthenticated routes
router.get('/', [HomeController, 'index']).as('home')
router.post('/login', [AuthController, 'login'])
router.post('register', [AuthController, 'register'])
router.delete('/logout', [AuthController, 'logout'])
router.get('/login', [AuthController, 'showLogin'])
router.get('/register', [AuthController, 'showRegister'])

// authenticated routes
router
  .group(() => {
    router.get('/profile', [UserController, 'showProfile'])
    router.patch('/profile', [UserController, 'updateProfile'])
    router.delete('/profile', [UserController, 'deleteProfile'])
    router.patch('/profile/cv', [UserController, 'updateProfileCV'])
  })
  .use(middleware.auth())
