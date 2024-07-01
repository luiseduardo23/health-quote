import { calculateQuote } from '../utils/calculateQuote';
import { ApplicantInfo, HealthPlan, LifePlan, DentalPlan, CriticalIllnessPlan } from '../types';

test('calculateQuote returns correct estimate for all plans included', () => {
  const applicantInfo: ApplicantInfo = { firstName: 'John', lastName: 'Doe', dateOfBirth: '1990-01-01', age: 30, gender: 'male' };
  const healthPlan: HealthPlan = { id: '1', name: 'Plan ORO', type: 'health', details: 'Asegurado Principal', cost: 790.25, currency: 'USD', insuredPrimary: 790.25, spouse: 640.00, children: 282.96 };
  const lifePlan: LifePlan = { id: '2', name: 'Plan A', type: 'life', details: 'Q50,000', cost: 100, currency: 'USD', coverageAmount: 50000 };
  const dentalPlan: DentalPlan = { id: '3', name: 'Plan Dental', type: 'dental', details: '', cost: 50, currency: 'USD', included: true };
  const criticalIllnessPlan: CriticalIllnessPlan = { id: '4', name: 'Plan Regular A', type: 'criticalIllness', details: '', cost: 100.25, currency: 'USD', included: true };

  const quote = calculateQuote(applicantInfo, healthPlan, lifePlan, dentalPlan, criticalIllnessPlan);

  expect(quote.subTotal).toBeCloseTo(1763.46); // Sum of all costs
  expect(quote.tax).toBeCloseTo(264.519); // 15% tax
  expect(quote.totalAmount).toBeCloseTo(2027.979); // SubTotal + Tax
});