import User from '#models/user'
import { registerUserValidator, loginUserValidator } from '#validators/user_validator'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  async register({ request, response }: HttpContext) {
    const payload = await registerUserValidator.validate(request.all())

    await User.create(payload)

    return response.status(201).json({
      message: 'User created successfully',
    })
  }

  async login({ request, response }: HttpContext) {
    const { email, password } = await loginUserValidator.validate(request.all())

    const user = await User.verifyCredentials(email, password)

    const token = await User.accessTokens.create(user)

    return response.status(200).json({
      message: 'User logged in successfully',
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
      },
      token,
    })
  }
}
