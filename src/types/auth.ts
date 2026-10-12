export type UserRole = 'admin' | 'user';

export type UserStatus = 'active' | 'pending_approval' | 'suspended';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  status: UserStatus;
  plan: 'free_trial' | 'monthly_200' | 'admin_unlimited';
  registeredAt: string;
  trialExpiresAt?: string;
  lastPaymentDate?: string;
  paymentProofUrl?: string;
  notes?: string;
}

export interface SubscriptionInfo {
  cashWalletNumber: string;
  monthlyFee: number;
  firstMonthFree: boolean;
  whatsappNumber: string;
  ownerName: string;
}

export const SUBSCRIPTION_CONFIG: SubscriptionInfo = {
  cashWalletNumber: '00201141345683',
  monthlyFee: 200,
  firstMonthFree: true,
  whatsappNumber: '00201141345683',
  ownerName: 'عمر ضاحي (Omar Dahy)',
};
