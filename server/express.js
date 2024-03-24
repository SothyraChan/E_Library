import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import Template from './../template.js'
import bookRoutes from './routes/book.routes.js'
import path from 'path'



const app = express()
const CURRENT_WORKING_DIR = process.cwd()


app.get('/', (req, res) => {
    res.status(200).send(Template()) 
    })
    
app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', bookRoutes)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(compress())
app.use(helmet())
app.use(cors())
export default app
