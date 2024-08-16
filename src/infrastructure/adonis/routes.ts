/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

const AuthController = () => import('#controllers/auth_controller')

const HomeController = () => import('#controllers/home_controller')

// Unauthenticated routes
router.get('/', [HomeController, 'index']).as('home')
router.post('/login', [AuthController, 'login'])
router.post('register', [AuthController, 'register'])
router.delete('/logout', [AuthController, 'logout'])
router.get('/login', [AuthController, 'showLogin'])
router.get('/register', [AuthController, 'showRegister'])
