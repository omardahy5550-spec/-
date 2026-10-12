import { User, UserStatus } from '../types/auth';

const STORAGE_USERS_KEY = 'ayadi_users_v1';
const STORAGE_CURRENT_USER_KEY = 'ayadi_current_user_v1';

export const INITIAL_USERS: User[] = [
  {
    id: 'admin_omar',
    name: 'عمر ضاحي (Omar Dahy)',
    email: 'Omardahy5550@gmail.com',
    phone: '00201141345683',
    role: 'admin',
    status: 'active',
    plan: 'admin_unlimited',
    registeredAt: '2026-01-01T00:00:00.000Z',
    notes: 'مالك ومطور الأداة والمنصة',
  },
  {
    id: 'user_ahmed',
    name: 'أحمد ممدوح (متجر كاجوال ستور)',
    email: 'ahmed.seller@gmail.com',
    phone: '01012345678',
    role: 'user',
    status: 'active',
    plan: 'monthly_200',
    registeredAt: '2026-02-15T10:30:00.000Z',
    lastPaymentDate: '2026-04-01T12:00:00.000Z',
    notes: 'تم تأكيد تحويل كاش 200 ج عبر الواتساب',
  },
  {
    id: 'user_sara',
    name: 'سارة إبراهيم (براند بيوتي كير)',
    email: 'sara.beauty@gmail.com',
    phone: '01198765432',
    role: 'user',
    status: 'pending_approval',
    plan: 'free_trial',
    registeredAt: '2026-04-10T14:20:00.000Z',
    trialExpiresAt: '2026-05-10T14:20:00.000Z',
    notes: 'طلب اشتراك جديد - بانتظار مراجعة عمر ضاحي',
  },
  {
    id: 'user_tarek',
    name: 'طارق عبد الرحمن (إلكترونيات المحافظات)',
    email: 'tarek.tech@gmail.com',
    phone: '01234567890',
    role: 'user',
    status: 'pending_approval',
    plan: 'monthly_200',
    registeredAt: '2026-04-11T09:15:00.000Z',
    notes: 'تم إرسال إيصال فودافون كاش على واتساب بانتظار التفعيل',
  },
];

export function getUsers(): User[] {
  try {
    const raw = localStorage.getItem(STORAGE_USERS_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(INITIAL_USERS));
      return INITIAL_USERS;
    }
    return JSON.parse(raw);
  } catch (e) {
    return INITIAL_USERS;
  }
}

export function saveUsers(users: User[]): void {
  try {
    localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users));
  } catch (e) {
    console.error('Failed to save users', e);
  }
}

export function getCurrentUser(): User | null {
  try {
    const raw = localStorage.getItem(STORAGE_CURRENT_USER_KEY);
    if (!raw) {
      // Default to Omar Dahy admin logged in for instant access
      const defaultUser = INITIAL_USERS[0];
      localStorage.setItem(STORAGE_CURRENT_USER_KEY, JSON.stringify(defaultUser));
      return defaultUser;
    }
    return JSON.parse(raw);
  } catch (e) {
    return INITIAL_USERS[0];
  }
}

export function setCurrentUser(user: User | null): void {
  try {
    if (user) {
      localStorage.setItem(STORAGE_CURRENT_USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_CURRENT_USER_KEY);
    }
  } catch (e) {
    console.error('Failed to set current user', e);
  }
}

export function registerUser(newUser: Omit<User, 'id' | 'role' | 'registeredAt'>): { success: boolean; message: string; user?: User } {
  const users = getUsers();
  const existing = users.find((u) => u.email.toLowerCase() === newUser.email.toLowerCase());
  if (existing) {
    return { success: false, message: 'هذا البريد الإلكتروني مسجل بالفعل، يمكنك تسجيل الدخول.' };
  }

  const id = `user_${Date.now()}`;
  const now = new Date();
  const trialEnd = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 days trial

  const createdUser: User = {
    ...newUser,
    id,
    role: newUser.email.toLowerCase() === 'omardahy5550@gmail.com' ? 'admin' : 'user',
    registeredAt: now.toISOString(),
    trialExpiresAt: trialEnd.toISOString(),
    // New non-admin users default to pending_approval until Omar Dahy approves them, or active for free trial
    status: newUser.email.toLowerCase() === 'omardahy5550@gmail.com' ? 'active' : 'pending_approval',
    plan: 'free_trial',
  };

  users.push(createdUser);
  saveUsers(users);
  setCurrentUser(createdUser);

  return { success: true, message: 'تم إنشاء الحساب بنجاح! طلبك قيد المراجعة لدى عمر ضاحي.', user: createdUser };
}

export function loginUser(email: string): { success: boolean; message: string; user?: User } {
  const users = getUsers();
  const cleanEmail = email.trim().toLowerCase();
  const found = users.find((u) => u.email.toLowerCase() === cleanEmail);

  if (!found) {
    return { success: false, message: 'لم يتم العثور على حساب بهذا البريد. يرجى إنشاء حساب جديد.' };
  }

  setCurrentUser(found);
  return { success: true, message: `مرحباً بك مجدداً يا ${found.name}`, user: found };
}

export function updateUserStatus(userId: string, newStatus: UserStatus): User[] {
  const users = getUsers();
  const updated = users.map((u) => (u.id === userId ? { ...u, status: newStatus } : u));
  saveUsers(updated);

  // If currently logged in user was modified, update their session
  const current = getCurrentUser();
  if (current && current.id === userId) {
    const updatedCurrent = updated.find((u) => u.id === userId);
    if (updatedCurrent) setCurrentUser(updatedCurrent);
  }

  return updated;
}

export function deleteUser(userId: string): User[] {
  const users = getUsers();
  const filtered = users.filter((u) => u.id !== userId);
  saveUsers(filtered);
  return filtered;
}
