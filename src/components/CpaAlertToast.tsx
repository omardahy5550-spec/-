import React, { useState, useEffect } from 'react';
import {
  AlertTriangle,
  X,
  ArrowDownRight,
} from 'lucide-react';
import { round } from '../utils/calculations';
import { Language } from '../types/localization';

interface CpaAlertToastProps {
  sellingPrice: number;
  cpa: number;
  onApplyRecommendedCpa: (newCpa: number) => void;
  currencySymbol?: string;
  language?: Language;
}

export const CpaAlertToast: React.FC<CpaAlertToastProps> = ({
  sellingPrice,
  cpa,
  onApplyRecommendedCpa,
  currencySymbol = 'ج.م',
  language = 'ar',
}) => {
  const [isDismissed, setIsDismissed] = useState<boolean>(false);
  const [lastAlertKey, setLastAlertKey] = useState<string>('');

  const isAr = language === 'ar';
  const cpaPercentage = sellingPrice > 0 ? (cpa / sellingPrice) * 100 : 0;
  const isExceeded = sellingPrice > 0 && cpaPercentage > 40;

  // Recommended safe CPA: ~25% to 28% of selling price
  const recommendedCpa = Math.max(1, Math.round(sellingPrice * 0.28));

  // If inputs change significantly, re-surface toast if still > 40%
  const currentKey = `${sellingPrice}-${cpa > 0 ? Math.round(cpa / 10) * 10 : 0}`;
  useEffect(() => {
    if (isExceeded && currentKey !== lastAlertKey) {
      setIsDismissed(false);
      setLastAlertKey(currentKey);
    }
  }, [isExceeded, currentKey, lastAlertKey]);

  if (!isExceeded || isDismissed) {
    return null;
  }

  return (
    <div
      role="alert"
      aria-live="assertive"
      className={`fixed bottom-4 sm:bottom-6 z-50 max-w-md w-[calc(100vw-1.5rem)] sm:w-full bg-white border-2 border-amber-400 rounded-2xl shadow-xl p-3.5 sm:p-5 transition-all animate-in fade-in slide-in-from-bottom-4 duration-300 no-print ${
        isAr ? 'left-3 sm:left-6 text-right' : 'right-3 sm:right-6 text-left'
      }`}
    >
      <div className="flex items-start gap-2.5 sm:gap-3">
        {/* Warning Icon */}
        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-500/10 text-amber-700 flex items-center justify-center shrink-0 border border-amber-300">
          <AlertTriangle className="w-5 h-5 text-amber-600 animate-pulse" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1">
            <h4 className="text-xs sm:text-sm font-extrabold text-amber-950 flex items-center gap-1.5">
              <span>{isAr ? 'تنبيه ذكي: الـ CPA يتخطى 40% من سعر البيع!' : 'Warning: CPA exceeds 40% of Selling Price!'}</span>
            </h4>
            <button
              onClick={() => setIsDismissed(true)}
              type="button"
              className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label={isAr ? 'إغلاق التنبيه' : 'Close alert'}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-slate-700 leading-relaxed mb-2.5">
            {isAr ? (
              <>
                تكلفة الإعلانات الحالية (<span className="font-mono font-bold text-slate-900">{cpa} {currencySymbol}</span>) تبتلع{' '}
                <strong className="text-amber-800 font-mono font-bold">{round(cpaPercentage, 1)}%</strong> من سعر بيع المنتج (
                <span className="font-mono">{sellingPrice} {currencySymbol}</span>). صرف هذه النسبة يستنزف السيولة ويهدد استمرارية نشاطك التجاري.
              </>
            ) : (
              <>
                Current CPA (<span className="font-mono font-bold text-slate-900">{cpa} {currencySymbol}</span>) consumes{' '}
                <strong className="text-amber-800 font-mono font-bold">{round(cpaPercentage, 1)}%</strong> of selling price (
                <span className="font-mono">{sellingPrice} {currencySymbol}</span>). This burns working capital and threatens business continuity.
              </>
            )}
          </p>

          <div className="p-2.5 bg-amber-50/70 border border-amber-200/80 rounded-xl mb-3 text-[11px] text-amber-900 leading-normal">
            <strong>{isAr ? '💡 اقتراح لضمان الاستمرارية:' : '💡 Actionable Recommendation:'}</strong>{' '}
            {isAr
              ? `النسبة الآمنة للاستحواذ الإعلاني لا تتعدى 25% - 28%. ننصح بتقليل تكلفة الإعلانات إلى `
              : `Safe e-commerce CPA threshold is 25% - 28%. Reduce target CPA to `}
            <strong className="font-mono text-slate-900">{recommendedCpa} {currencySymbol}</strong>
            {isAr ? ' عبر تحسين الفيديوهات (UGC) أو رفع سعر البيع.' : ' by optimizing video creative hooks or raising product price.'}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                onApplyRecommendedCpa(recommendedCpa);
                setIsDismissed(true);
              }}
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-amber-600 hover:bg-amber-500 active:bg-amber-700 rounded-lg shadow-xs transition-colors cursor-pointer min-h-[34px]"
            >
              <ArrowDownRight className="w-3.5 h-3.5" />
              <span>{isAr ? `تطبيق الـ CPA المقترح (${recommendedCpa} ${currencySymbol})` : `Apply Target CPA (${recommendedCpa} ${currencySymbol})`}</span>
            </button>
            <button
              onClick={() => setIsDismissed(true)}
              type="button"
              className="px-2.5 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer min-h-[34px]"
            >
              {isAr ? 'تجاهل التنبيه' : 'Dismiss'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
