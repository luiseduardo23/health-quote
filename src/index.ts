import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());

// Type definitions
interface ApplicantInfo {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  age: number;
  gender: 'male' | 'female' | 'other';
}

interface Product {
  id: string;
  name: string;
  type: 'health' | 'life' | 'dental' | 'criticalIllness';
  details: string;
  cost: number;
  currency: string;
}

interface HealthPlan extends Product {
  insuredPrimary: number;
  spouse: number;
  children: number;
}

interface LifePlan extends Product {
  coverageAmount: number;
}

interface DentalPlan extends Product {
  included: boolean;
}

interface CriticalIllnessPlan extends Product {
  included: boolean;
}

interface Quote {
  applicantInfo: ApplicantInfo;
  healthPlan: HealthPlan;
  lifePlan?: LifePlan;
  dentalPlan?: DentalPlan;
  criticalIllnessPlan?: CriticalIllnessPlan;
  subTotal: number;
  tax: number;
  totalAmount: number;
}

// Function for calculating the quotation
function calculateQuote(
  applicantInfo: ApplicantInfo,
  healthPlan: HealthPlan,
  lifePlan?: LifePlan,
  dentalPlan?: DentalPlan,
  criticalIllnessPlan?: CriticalIllnessPlan
): Quote {
  const subTotal = healthPlan.cost +
    (lifePlan ? lifePlan.cost : 0) +
    (dentalPlan && dentalPlan.included ? dentalPlan.cost : 0) +
    (criticalIllnessPlan && criticalIllnessPlan.included ? criticalIllnessPlan.cost : 0);

  const tax = subTotal * 0.15; // Example of 15% tax
  const totalAmount = subTotal + tax;

  return {
    applicantInfo,
    healthPlan,
    lifePlan,
    dentalPlan,
    criticalIllnessPlan,
    subTotal,
    tax,
    totalAmount
  };
}

// Endpoint to create the quotation
app.post('/create-quote', (req: Request, res: Response) => {
  const applicantInfo: ApplicantInfo = req.body.applicantInfo;
  const healthPlan: HealthPlan = req.body.healthPlan;
  const lifePlan: LifePlan = req.body.lifePlan;
  const dentalPlan: DentalPlan = req.body.dentalPlan;
  const criticalIllnessPlan: CriticalIllnessPlan = req.body.criticalIllnessPlan;

  const quote = calculateQuote(applicantInfo, healthPlan, lifePlan, dentalPlan, criticalIllnessPlan);
  res.json(quote);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
