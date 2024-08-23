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

const OfferController = () => import('#controllers/offer_controller')

const RecruiterController = () => import('#controllers/recruiter_controller')

const UserController = () => import('#controllers/user_controller')

const AuthController = () => import('#controllers/auth_controller')

const HomeController = () => import('#controllers/home_controller')

// Unauthenticated routes
router.get('/', [HomeController, 'index']).as('home')
router.post('/login', [AuthController, 'login'])
router.post('register', [AuthController, 'register'])
router.get('/login', [AuthController, 'showLogin']).as('login')
router.get('/register', [AuthController, 'showRegister']).as('register')

// authenticated routes
router
  .group(() => {
    router.get('/logout', [AuthController, 'logout']).as('logout')

    // profile
    router.get('/profile', [UserController, 'showProfile']).as('profile')
    router.patch('/profile', [UserController, 'updateProfile'])
    // todo: refactor - delete & patch route need id in query params
    router.delete('/profile', [UserController, 'deleteProfile'])
    router.patch('/profile/cv', [UserController, 'updateProfileCV'])
    router.delete('/profile/cv', [UserController, 'deleteProfileCV'])

    // recruiter
    router.get('/recruiter/create', [RecruiterController, 'show']).as('recruiter')
    router.post('/recruiter/create', [RecruiterController, 'create'])
    // update recruiter is implemented in patch user profile

    //offers
    router.get('/offers/create', [OfferController, 'show']).as('offers')
    router.post('/offers/create', [OfferController, 'create'])
    router.patch('/offers/update/:id', [OfferController, 'update'])
    router.delete('/offers/delete/:id', [OfferController, 'destroy'])
  })
  .use(middleware.auth())
