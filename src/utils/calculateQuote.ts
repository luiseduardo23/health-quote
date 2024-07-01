import { ApplicantInfo, HealthPlan, LifePlan, DentalPlan, CriticalIllnessPlan, Quote } from '../types';

export function calculateQuote(
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
