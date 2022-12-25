import { Request, Response, Router } from 'express';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.status(200).json({ healthy: true });
});

export default router;
