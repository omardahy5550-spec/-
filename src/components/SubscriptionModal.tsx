import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  Copy,
  Check,
  Send,
  Sparkles,
  ShieldCheck,
  PhoneCall,
  CreditCard,
  MessageCircle,
} from 'lucide-react';
import { SUBSCRIPTION_CONFIG } from '../types/auth';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName?: string;
  userPhone?: string;
}

export const SubscriptionModal: React.FC<SubscriptionModalProps> = ({
  isOpen,
  onClose,
  userName = 'تاجر إلكتروني',
  userPhone = '',
}) => {
  const [copiedNumber, setCopiedNumber] = useState<boolean>(false);
  const [senderWallet, setSenderWallet] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleCopyNumber = () => {
    navigator.clipboard.writeText(SUBSCRIPTION_CONFIG.cashWalletNumber);
    setCopiedNumber(true);
    setTimeout(() => setCopiedNumber(false), 2500);
  };

  const whatsappMessage = encodeURIComponent(
    `السلام عليكم أستاذ عمر ضاحي،
أنا المشترك: ${userName}
رقم الهاتف: ${userPhone || senderWallet || '—'}
أرغب في تأكيد اشتراكي في "حاسبة تسعير وأرباح التجارة الإلكترونية في مصر".
(مرفق إثبات تحويل الـ 200 ج.م على محفظة كاش ${SUBSCRIPTION_CONFIG.cashWalletNumber})`
  );

  const whatsappUrl = `https://wa.me/201141345683?text=${whatsappMessage}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs no-print overflow-y-auto"
    >
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-right my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-emerald-800 via-slate-900 to-slate-900 text-white p-6 relative">
          <button
            onClick={onClose}
            type="button"
            className="absolute top-4 left-4 p-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-300 mb-1.5">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>عرض الحماية والأرباح لتجار مصر</span>
          </div>
          <h3 className="text-xl font-extrabold tracking-tight">
            خطة الاشتراك الاحترافية في الأداة
          </h3>
          <p className="text-xs text-slate-300 mt-1">
            بإشراف وتطوير الخبير: <strong className="text-white font-bold">{SUBSCRIPTION_CONFIG.ownerName}</strong>
          </p>
        </div>

        {/* Pricing Plan Highlight */}
        <div className="p-6 space-y-6">
          <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-5 text-center">
            <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
              🎉 أول شهر مجاناً بالكامل (0 ج.م)
            </span>
            <div className="mt-3 flex items-baseline justify-center gap-1.5">
              <span className="text-4xl font-extrabold font-mono text-emerald-800">200</span>
              <span className="text-sm font-bold text-slate-700">جنيه مصري فقط / شهرياً</span>
            </div>
            <p className="text-xs text-slate-600 mt-2">
              بعد انتهاء الشهر المجاني الأول، يستمر اشتراكك بـ 200 ج.م شهرياً شامل كافة التحديثات ومحاكي المبيعات.
            </p>
          </div>

          {/* Features list */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-slate-800">ما الذي تحصل عليه مع الاشتراك؟</h4>
            <ul className="text-xs text-slate-600 space-y-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>حسابات وهوامش غير محدودة لجميع منتجاتك ومتجرك.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>نظام التنبيهات الذكي لرصد خسائر الـ CPA والمرتجعات.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>تصدير تقارير محاسبية رسمية PDF غير محدودة مع لوجو وحقوق الأداة.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>دعم وتوجيه تسعيري مباشر مع الخبير عمر ضاحي عبر الواتساب.</span>
              </li>
            </ul>
          </div>

          {/* Payment Instructions: Vodafone Cash / Orange / Etisalat / InstaPay */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4.5 space-y-3.5">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
              <CreditCard className="w-4 h-4 text-emerald-600" />
              <span>طريقة التحويل وتأكيد الاشتراك:</span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              يتم تحويل قيمة الاشتراك (200 ج.م) من خلال أي محفظة كاش (فودافون كاش، أورنج كاش، اتصالات كاش، وي باي، أو إنستاباي InstaPay) على الرقم التالي:
            </p>

            {/* Wallet Number Box */}
            <div className="flex items-center justify-between gap-3 p-3 bg-white border border-slate-300 rounded-xl">
              <div>
                <span className="text-[10px] text-slate-500 block">رقم محفظة كاش المعتمد:</span>
                <span className="text-base font-extrabold font-mono text-slate-900 tracking-wider">
                  {SUBSCRIPTION_CONFIG.cashWalletNumber}
                </span>
              </div>
              <button
                type="button"
                onClick={handleCopyNumber}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
              >
                {copiedNumber ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">تم النسخ</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-600" />
                    <span>نسخ الرقم</span>
                  </>
                )}
              </button>
            </div>

            <div className="p-3 bg-amber-50/80 border border-amber-200 rounded-xl text-xs text-amber-900 space-y-1.5 leading-relaxed">
              <strong className="block font-bold">خطوة الإثبات الإلزامية:</strong>
              <p>
                بعد إتمام التحويل، يرجى إرسال لقطة شاشة (Screenshot) أو صورة من إيصال التحويل على الواتساب على نفس الرقم:
                <strong className="font-mono text-slate-900 mx-1">{SUBSCRIPTION_CONFIG.whatsappNumber}</strong>
                وسيقوم الأستاذ <strong>عمر ضاحي</strong> بتفعيل حسابك فوراً من لوحة التحكم.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:flex-1 py-3 px-4 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>إرسال إثبات التحويل عبر الواتساب</span>
              </a>
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-colors cursor-pointer"
              >
                حسناً، فهمت
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
