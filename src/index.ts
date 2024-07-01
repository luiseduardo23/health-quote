import express from 'express';
import { calculateQuote } from './utils/calculateQuote';
import { ApplicantInfo, HealthPlan, LifePlan, DentalPlan, CriticalIllnessPlan } from './types';

const app = express();
const port = 3000;

app.use(express.json());

app.post('/create-quote', (req, res) => {
  const {
    applicantInfo,
    healthPlan,
    lifePlan,
    dentalPlan,
    criticalIllnessPlan
  }: {
    applicantInfo: ApplicantInfo;
    healthPlan: HealthPlan;
    lifePlan?: LifePlan;
    dentalPlan?: DentalPlan;
    criticalIllnessPlan?: CriticalIllnessPlan;
  } = req.body;

  const quote = calculateQuote(applicantInfo, healthPlan, lifePlan, dentalPlan, criticalIllnessPlan);
  res.json(quote);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
