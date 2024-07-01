import { ApplicantInfo, HealthPlan, LifePlan, DentalPlan, CriticalIllnessPlan, Quote } from '../types';

export function calculateQuote(
  applicantInfo: ApplicantInfo,
  healthPlan: HealthPlan,
  lifePlan?: LifePlan,
  dentalPlan?: DentalPlan,
  criticalIllnessPlan?: CriticalIllnessPlan
): Quote {
  //business logic
  const healthPlanTotal = healthPlan.insuredPrimary + healthPlan.spouse + healthPlan.children;
  const lifePlanTotal = lifePlan ? lifePlan.cost : 0;
  const dentalPlanTotal = dentalPlan && dentalPlan.included ? dentalPlan.cost : 0;
  const criticalIllnessPlanTotal = criticalIllnessPlan && criticalIllnessPlan.included ? criticalIllnessPlan.cost : 0;

  const subTotal = healthPlanTotal + lifePlanTotal + dentalPlanTotal + criticalIllnessPlanTotal;

  const tax = subTotal * 0.15; // 15% tax
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