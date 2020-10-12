import { Request, Response, Router } from 'express'
import user from './user'

const routes = Router()

routes.get('/', (req, res) =>
    res.send(
        'This is a basic API using TypeScript, Node.js, TypeORM and PostgreSQL',
      ),    
)

routes.use('/signup', user)


export default routes