import { Response, Router } from 'express'
import UserController from '../controller/UserController'


const router = Router()

router.get('/', UserController.listAll)
router.post('/', UserController.newUser)


export default router