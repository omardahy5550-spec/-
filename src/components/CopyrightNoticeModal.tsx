import React from 'react';
import { X, ShieldCheck, FileCheck, Lock, Award, CheckCircle2 } from 'lucide-react';

interface CopyrightNoticeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CopyrightNoticeModal: React.FC<CopyrightNoticeModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs no-print overflow-y-auto"
    >
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-right my-8 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 relative border-b border-slate-800">
          <button
            onClick={onClose}
            type="button"
            className="absolute top-4 left-4 p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>وثيقة حماية الملكية الفكرية والعلامة التجارية</span>
          </div>
          <h3 className="text-lg font-bold">
            حقوق الملكية والترخيص القانوني للأداة
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            المالك والمؤلف الحصري: <strong className="text-white">عمر ضاحي (Omar Dahy)</strong>
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 text-xs text-slate-700 leading-relaxed">
          <div className="p-3.5 bg-emerald-50/80 border border-emerald-200 rounded-xl space-y-1">
            <span className="font-bold text-emerald-900 block flex items-center gap-1.5">
              <Award className="w-4 h-4 text-emerald-700" />
              <span>إشعار حقوق النشر والملكية (Copyright Notice © 2026):</span>
            </span>
            <p className="text-emerald-800">
              جميع الحقوق الفكرية، البرمجية، اللوغاريتمات الحسابية، ونماذج تسعير السوق المصري الواردة في هذا التطبيق مسجلة ومملوكة حصرياً للأستاذ <strong>عمر ضاحي (Omar Dahy)</strong>.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-slate-900">شروط الاستخدام والترخيص التجاري:</h4>
            <ul className="space-y-1.5 text-slate-600">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                <span>الترخيص يمنح المشترك حق استخدام الأداة لإدارة وتسعير منتجات متجره الإلكتروني فقط.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                <span>يحظر تماماً إعادة بيع الأداة، استنساخ الشفرة البرمجية، أو استخراج الخوارزميات دون إذن كتابي رسمي من عمر ضاحي.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                <span>التقارير المالية المستخرجة تحمل صفة الترخيص المعتمد لحسابات الدفع عند الاستلام (COD) في مصر.</span>
              </li>
            </ul>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl font-mono text-[11px] text-slate-600 space-y-1">
            <div><strong>المالك والمشرف:</strong> عمر ضاحي (Omar Dahy)</div>
            <div><strong>رقم المحفظة والتواصل:</strong> 00201141345683</div>
            <div><strong>تاريخ التوثيق:</strong> 2026</div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
          >
            إغلاق الوثيقة
          </button>
        </div>
      </div>
    </div>
  );
};
