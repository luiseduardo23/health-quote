export interface ApplicantInfo {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    age: number;
    gender: 'male' | 'female' | 'other';
  }
  
  export interface Product {
    id: string;
    name: string;
    type: 'health' | 'life' | 'dental' | 'criticalIllness';
    details: string;
    cost: number;
    currency: string;
  }
  
  export interface HealthPlan extends Product {
    insuredPrimary: number;
    spouse: number;
    children: number;
  }
  
  export interface LifePlan extends Product {
    coverageAmount: number;
  }
  
  export interface DentalPlan extends Product {
    included: boolean;
  }
  
  export interface CriticalIllnessPlan extends Product {
    included: boolean;
  }
  
  export interface Quote {
    applicantInfo: ApplicantInfo;
    healthPlan: HealthPlan;
    lifePlan?: LifePlan;
    dentalPlan?: DentalPlan;
    criticalIllnessPlan?: CriticalIllnessPlan;
    subTotal: number;
    tax: number;
    totalAmount: number;
  }
  