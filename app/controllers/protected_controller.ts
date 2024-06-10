import type { HttpContext } from '@adonisjs/core/http'

export default class ProtectedController {
  async index({ response, auth }: HttpContext) {
    console.log(auth.user!.currentAccessToken)

    return response.status(200).json({
      message: 'Protected route accessed successfully',
    })
  }
}
