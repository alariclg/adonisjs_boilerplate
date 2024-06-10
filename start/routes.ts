/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

const AuthController = () => import('#controllers/auth_controller')
const ProtectedController = () => import('#controllers/protected_controller')

router
  .group(() => {
    router.post('auth/register', [AuthController, 'register'])
    router.post('auth/login', [AuthController, 'login'])
  })
  .prefix('api/v1')

router.get('/', [ProtectedController, 'index']).use(middleware.auth())
