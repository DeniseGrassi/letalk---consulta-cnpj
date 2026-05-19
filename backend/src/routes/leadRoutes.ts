import { Router } from 'express'
import { enrichLead } from '../controllers/leadController'

const router = Router()

router.post('/enrich', enrichLead)

export default router