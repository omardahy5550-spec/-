import React, { useState } from 'react';
import {
  X,
  Users,
  CheckCircle2,
  XCircle,
  Clock,
  Trash2,
  Phone,
  MessageCircle,
  Search,
  Plus,
  ShieldAlert,
  ShieldCheck,
  CreditCard,
  FileText,
  UserCheck,
  UserX,
} from 'lucide-react';
import { User, UserStatus } from '../types/auth';
import { updateUserStatus, deleteUser, getUsers } from '../utils/authStorage';

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  users: User[];
  onRefreshUsers: () => void;
}

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({
  isOpen,
  onClose,
  users,
  onRefreshUsers,
}) => {
  const [filter, setFilter] = useState<'all' | 'pending' | 'active' | 'suspended'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);

  if (!isOpen) return null;

  const showFeedback = (msg: string) => {
    setActionFeedback(msg);
    setTimeout(() => setActionFeedback(null), 3000);
  };

  const handleApprove = (userId: string, userName: string) => {
    updateUserStatus(userId, 'active');
    onRefreshUsers();
    showFeedback(`تم قبول وتفعيل اشتراك المستخدم: ${userName} بنجاح ✅`);
  };

  const handleSuspend = (userId: string, userName: string) => {
    updateUserStatus(userId, 'suspended');
    onRefreshUsers();
    showFeedback(`تم إلغاء / تعليق اشتراك المستخدم: ${userName} ⛔`);
  };

  const handleDelete = (userId: string, userName: string) => {
    if (confirm(`هل أنت متأكد من حذف المستخدم "${userName}" نهائياً؟`)) {
      deleteUser(userId);
      onRefreshUsers();
      showFeedback(`تم حذف المستخدم: ${userName}`);
    }
  };

  const pendingCount = users.filter((u) => u.status === 'pending_approval').length;
  const activeCount = users.filter((u) => u.status === 'active').length;
  const suspendedCount = users.filter((u) => u.status === 'suspended').length;
  const estimatedRevenue = users.filter((u) => u.status === 'active' && u.plan === 'monthly_200').length * 200;

  const filteredUsers = users.filter((u) => {
    const matchesFilter =
      filter === 'all'
        ? true
        : filter === 'pending'
        ? u.status === 'pending_approval'
        : filter === 'active'
        ? u.status === 'active'
        : u.status === 'suspended';

    const matchesSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.phone.includes(searchQuery);

    return matchesFilter && matchesSearch;
  });

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/75 backdrop-blur-xs no-print overflow-y-auto"
    >
      <div className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-right my-6 max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800 shrink-0">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>لوحة التحكم والإدارة الحصرية</span>
              <span className="text-slate-500" aria-hidden="true">·</span>
              <span>المالك والمشرف: عمر ضاحي</span>
            </div>
            <h3 className="text-xl font-extrabold tracking-tight">
              إدارة وقبول المشتركين في حاسبة التجارة الإلكترونية
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              تحكم كامل في قبول طلبات التحويل، تفعيل الاشتراكات الجديدة، أو إلغائها فورياً
            </p>
          </div>

          <button
            onClick={onClose}
            type="button"
            className="self-end sm:self-center p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action feedback toast */}
        {actionFeedback && (
          <div className="bg-emerald-50 border-b border-emerald-200 px-6 py-2.5 text-xs font-bold text-emerald-800 flex items-center justify-between animate-in fade-in duration-150">
            <span>{actionFeedback}</span>
            <button onClick={() => setActionFeedback(null)} className="text-emerald-600 hover:text-emerald-900">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Content Body */}
        <div className="p-5 sm:p-6 space-y-6 overflow-y-auto flex-1">
          {/* Quick KPIs strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] font-semibold text-slate-500 block mb-1">إجمالي المستخدمين</span>
              <span className="text-2xl font-bold font-mono text-slate-900">{users.length}</span>
            </div>

            <div className={`p-3.5 rounded-xl border ${pendingCount > 0 ? 'bg-amber-50/70 border-amber-300' : 'bg-slate-50 border-slate-200'}`}>
              <span className="text-[11px] font-semibold text-amber-800 block mb-1">بانتظار الموافقة (Pending)</span>
              <span className="text-2xl font-bold font-mono text-amber-700">{pendingCount}</span>
            </div>

            <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200">
              <span className="text-[11px] font-semibold text-emerald-800 block mb-1">الاشتراكات النشطة</span>
              <span className="text-2xl font-bold font-mono text-emerald-700">{activeCount}</span>
            </div>

            <div className="p-3.5 rounded-xl bg-indigo-50/60 border border-indigo-200">
              <span className="text-[11px] font-semibold text-indigo-800 block mb-1">تحصيلات كاش الشهرية</span>
              <span className="text-2xl font-bold font-mono text-indigo-700">{estimatedRevenue} ج.م</span>
            </div>
          </div>

          {/* Filters & Search Toolbar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setFilter('all')}
                className={`flex-1 sm:flex-initial px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  filter === 'all' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                الكل ({users.length})
              </button>
              <button
                type="button"
                onClick={() => setFilter('pending')}
                className={`flex-1 sm:flex-initial px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  filter === 'pending' ? 'bg-amber-600 text-white shadow-2xs' : 'text-amber-800 hover:text-amber-950'
                }`}
              >
                بانتظار الموافقة ({pendingCount})
              </button>
              <button
                type="button"
                onClick={() => setFilter('active')}
                className={`flex-1 sm:flex-initial px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  filter === 'active' ? 'bg-emerald-600 text-white shadow-2xs' : 'text-emerald-800 hover:text-emerald-950'
                }`}
              >
                المفعلون ({activeCount})
              </button>
              <button
                type="button"
                onClick={() => setFilter('suspended')}
                className={`flex-1 sm:flex-initial px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  filter === 'suspended' ? 'bg-rose-600 text-white shadow-2xs' : 'text-rose-800 hover:text-rose-950'
                }`}
              >
                الملغيون ({suspendedCount})
              </button>
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="بحث بالاسم أو الهاتف أو الإيميل..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
            </div>
          </div>

          {/* Users Table */}
          <div className="border border-slate-200 rounded-xl overflow-x-auto">
            <table className="w-full text-xs text-right border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                  <th className="py-2.5 px-3.5">المستخدم والنشاط</th>
                  <th className="py-2.5 px-3.5">بيانات الاتصال</th>
                  <th className="py-2.5 px-3.5">خطة الاشتراك</th>
                  <th className="py-2.5 px-3.5">الحالة</th>
                  <th className="py-2.5 px-3.5 text-center">إجراءات عمر ضاحي</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800">
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-slate-500">
                      لا يوجد مستخدمين مطابقين لمعايير البحث الحالية.
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => {
                    const isPending = user.status === 'pending_approval';
                    const isActive = user.status === 'active';
                    const isSuspended = user.status === 'suspended';
                    const isAdmin = user.role === 'admin';

                    const cleanPhone = user.phone.replace(/[^0-9]/g, '');
                    const whatsappDirectUrl = `https://wa.me/${cleanPhone.startsWith('0') ? '2' + cleanPhone : cleanPhone}?text=${encodeURIComponent(`مرحباً أستاذ ${user.name}، معك عمر ضاحي بخصوص اشتراكك في حاسبة تسعير وأرباح التجارة الإلكترونية.`)}`;

                    return (
                      <tr key={user.id} className="hover:bg-slate-50/70 transition-colors">
                        {/* Name & Role */}
                        <td className="py-3 px-3.5">
                          <div className="font-bold text-slate-900 flex items-center gap-1.5">
                            <span>{user.name}</span>
                            {isAdmin && (
                              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded">
                                المالك
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-slate-500 block mt-0.5">
                            سجل في: {new Date(user.registeredAt).toLocaleDateString('ar-EG')}
                          </span>
                        </td>

                        {/* Contacts */}
                        <td className="py-3 px-3.5">
                          <span className="block font-mono text-slate-800">{user.email}</span>
                          <span className="block font-mono text-slate-600 mt-0.5">{user.phone}</span>
                        </td>

                        {/* Plan */}
                        <td className="py-3 px-3.5">
                          {user.plan === 'free_trial' && (
                            <span className="text-emerald-700 font-semibold block">
                              شهر مجاني (تجريبي)
                            </span>
                          )}
                          {user.plan === 'monthly_200' && (
                            <span className="text-slate-900 font-bold block">
                              شهري (200 ج.م)
                            </span>
                          )}
                          {user.plan === 'admin_unlimited' && (
                            <span className="text-purple-700 font-bold block">
                              ترخيص مالك دائم
                            </span>
                          )}
                          {user.notes && (
                            <span className="text-[10px] text-slate-400 block mt-0.5">
                              {user.notes}
                            </span>
                          )}
                        </td>

                        {/* Status */}
                        <td className="py-3 px-3.5">
                          {isPending && (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md">
                              <Clock className="w-3 h-3" />
                              <span>بانتظار الموافقة</span>
                            </span>
                          )}
                          {isActive && (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                              <CheckCircle2 className="w-3 h-3" />
                              <span>مفعّل ومقبول</span>
                            </span>
                          )}
                          {isSuspended && (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-md">
                              <XCircle className="w-3 h-3" />
                              <span>ملغي / معلّق</span>
                            </span>
                          )}
                        </td>

                        {/* Actions */}
                        <td className="py-3 px-3.5 text-center">
                          <div className="flex items-center justify-center gap-1.5">
                            {/* WhatsApp button */}
                            <a
                              href={whatsappDirectUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              title="محادثة واتساب مباشرة"
                              className="p-1.5 text-emerald-700 hover:text-white hover:bg-emerald-600 rounded-lg transition-colors cursor-pointer"
                            >
                              <MessageCircle className="w-4 h-4" />
                            </a>

                            {/* Approve button if pending or suspended */}
                            {!isActive && (
                              <button
                                type="button"
                                onClick={() => handleApprove(user.id, user.name)}
                                title="قبول وتفعيل المستخدم"
                                className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors cursor-pointer"
                              >
                                <UserCheck className="w-3 h-3" />
                                <span>قبول وتفعيل</span>
                              </button>
                            )}

                            {/* Suspend button if active */}
                            {isActive && !isAdmin && (
                              <button
                                type="button"
                                onClick={() => handleSuspend(user.id, user.name)}
                                title="إلغاء أو تعليق الحساب"
                                className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg transition-colors cursor-pointer"
                              >
                                <UserX className="w-3 h-3" />
                                <span>إلغاء</span>
                              </button>
                            )}

                            {/* Delete button (non-admin) */}
                            {!isAdmin && (
                              <button
                                type="button"
                                onClick={() => handleDelete(user.id, user.name)}
                                title="حذف المستخدم نهائياً"
                                className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
