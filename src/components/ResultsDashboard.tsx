import React, { useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Copy,
  Printer,
  Sliders,
  Target,
  BarChart3,
  Check,
} from 'lucide-react';
import { PricingInputs, CalculationResults } from '../types/pricing';
import {
  generateEgyptianExpertAdvice,
  simulateMonthlyVolume,
  calculateTargetPriceForMargin,
  round,
} from '../utils/calculations';
import { Translations } from '../utils/translations';
import { Language } from '../types/localization';

interface ResultsDashboardProps {
  inputs: PricingInputs;
  results: CalculationResults;
  onPrint: () => void;
  currencySymbol: string;
  currencyCode: string;
  t: Translations;
  language: Language;
}

export const ResultsDashboard: React.FC<ResultsDashboardProps> = ({
  inputs,
  results,
  onPrint,
  currencySymbol,
  currencyCode,
  t,
  language,
}) => {
  const [monthlyVolume, setMonthlyVolume] = useState<number>(300);
  const [targetMarginGoal, setTargetMarginGoal] = useState<number>(25);
  const [copied, setCopied] = useState<boolean>(false);

  const isAr = language === 'ar';
  const adviceList = generateEgyptianExpertAdvice(inputs, results, currencySymbol, language);
  const simulation = simulateMonthlyVolume(inputs, results, monthlyVolume);
  const calculatedTargetPrice = calculateTargetPriceForMargin(inputs, targetMarginGoal);

  const handleCopySummary = () => {
    const summaryText = isAr
      ? `📊 تقرير تسعير وأرباح المنتج:
----------------------------------
📦 سعر البيع للعميل: ${inputs.sellingPrice} ${currencySymbol}
💰 تكلفة المنتج (شاملة الشحن): ${inputs.productCost} ${currencySymbol}
🚚 شحن العميل: ${inputs.customerShippingFee} ${currencySymbol} | الشحن الفعلي: ${inputs.actualShippingCost} ${currencySymbol}
🔄 نسبة المرتجع المتوقعة: ${inputs.returnRate}% (تكلفة المرتجع: ${results.returnImpact} ${currencySymbol})
📢 تكلفة الإعلانات (CPA): ${inputs.cpa} ${currencySymbol}
📦 مصاريف التغليف والعمولات: ${inputs.extraFees} ${currencySymbol}
----------------------------------
🎯 صافي الربح الحقيقي بعد المرتجعات: ${results.realNetProfit} ${currencySymbol}
📈 نسبة هامش الربح الحقيقي: ${results.realMargin}%
🛑 أقصى CPA مسموح قبل الخسارة: ${results.maxCpa} ${currencySymbol}
⚖️ نقطة التعادل للإعلانات (ROAS): ${results.breakEvenRoas}x
🚚 رصيد الشحن والمرتجع: ${results.shippingAndReturnBalance} ${currencySymbol}
----------------------------------
تم حسابه عبر: حاسبة تسعير وأرباح التجارة الإلكترونية`
      : `📊 E-Commerce Financial & Profit Report:
----------------------------------
📦 Selling Price: ${inputs.sellingPrice} ${currencySymbol}
💰 Product Cost: ${inputs.productCost} ${currencySymbol}
🚚 Customer Shipping: ${inputs.customerShippingFee} ${currencySymbol} | Courier Cost: ${inputs.actualShippingCost} ${currencySymbol}
🔄 Expected Returns: ${inputs.returnRate}% (Return Loss: ${results.returnImpact} ${currencySymbol})
📢 Ad Spend CPA: ${inputs.cpa} ${currencySymbol}
📦 Packaging & Fees: ${inputs.extraFees} ${currencySymbol}
----------------------------------
🎯 Real Net Profit (Post-Returns): ${results.realNetProfit} ${currencySymbol}
📈 Real Margin: ${results.realMargin}%
🛑 Max Break-even CPA: ${results.maxCpa} ${currencySymbol}
⚖️ Break-even ROAS: ${results.breakEvenRoas}x
🚚 Shipping & Return Balance: ${results.shippingAndReturnBalance} ${currencySymbol}
----------------------------------
Calculated by: E-Commerce Pricing & Profit Calculator`;

    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const isProfitable = results.isProfitable;

  return (
    <div id="results-section" className="space-y-5 sm:space-y-6">
      {/* 1. Final Result Card (Green if profitable, Red if loss) */}
      <section
        className={`rounded-2xl border p-5 sm:p-8 transition-all ${
          isProfitable
            ? 'bg-gradient-to-br from-emerald-950/5 via-emerald-50/70 to-emerald-100/50 border-emerald-200'
            : 'bg-gradient-to-br from-rose-950/5 via-rose-50/70 to-rose-100/50 border-rose-200'
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 sm:gap-6">
          <div className="space-y-2.5 sm:space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`text-xs font-semibold px-2.5 py-1 rounded-md ${
                  isProfitable
                    ? 'bg-emerald-600 text-white'
                    : 'bg-rose-600 text-white'
                }`}
              >
                {isProfitable ? t.productProfitable : t.productLosing}
              </span>
              <span className="text-[11px] sm:text-xs text-slate-500">
                {t.fullDeductionNote}
              </span>
            </div>

            <div>
              <p className="text-xs font-semibold text-slate-600 mb-1">
                {t.realNetProfitTitle}
              </p>
              <div className="flex flex-wrap items-baseline gap-2">
                <span
                  className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold font-mono tracking-tight tabular-nums ${
                    isProfitable ? 'text-emerald-700' : 'text-rose-700'
                  }`}
                >
                  {results.realNetProfit > 0 ? `+${results.realNetProfit}` : results.realNetProfit}
                </span>
                <span className="text-sm sm:text-base font-bold text-slate-700">
                  {currencySymbol} / {t.perUnit}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:gap-4 pt-1 text-xs text-slate-600">
              <div>
                <span>{t.realMarginRate} </span>
                <span
                  className={`font-mono font-bold text-sm ${
                    isProfitable ? 'text-emerald-700' : 'text-rose-700'
                  }`}
                >
                  {results.realMargin}%
                </span>
              </div>
              <span className="text-slate-300 hidden sm:inline" aria-hidden="true">·</span>
              <div>
                <span>{t.deliveredProfitBeforeReturn} </span>
                <span className="font-mono font-bold text-slate-800">
                  {results.deliveredProfit} {currencySymbol}
                </span>
              </div>
              <span className="text-slate-300 hidden sm:inline" aria-hidden="true">·</span>
              <div>
                <span>{t.returnLossPerOrder} </span>
                <span className="font-mono font-bold text-amber-700">
                  -{results.returnImpact} {currencySymbol}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Metrics Badge Column (responsive on phones) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-2.5 sm:gap-3 shrink-0 md:min-w-[220px]">
            <div className="bg-white/85 backdrop-blur-xs border border-slate-200/80 rounded-xl p-3 sm:p-3.5 shadow-2xs">
              <span className="text-[11px] font-semibold text-slate-500 block mb-1">
                {t.cpaLimitTitle}
              </span>
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-base sm:text-lg font-bold font-mono text-slate-900 tabular-nums">
                  {results.maxCpa} {currencySymbol}
                </span>
                <span className="text-[10px] text-slate-500">{t.cpaLimitSub}</span>
              </div>
            </div>

            <div className="bg-white/85 backdrop-blur-xs border border-slate-200/80 rounded-xl p-3 sm:p-3.5 shadow-2xs">
              <span className="text-[11px] font-semibold text-slate-500 block mb-1">
                {t.breakEvenRoasTitle}
              </span>
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-base sm:text-lg font-bold font-mono text-slate-900 tabular-nums">
                  {results.breakEvenRoas > 0 ? `${results.breakEvenRoas}x` : '—'}
                </span>
                <span className="text-[10px] text-slate-500">
                  {results.breakEvenRoas > 0 ? t.breakEvenRoasSub : (isAr ? 'عجز أولي' : 'Deficit')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Detailed Cost Breakdown (Table / Cards) */}
      <section id="breakdown-section" className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-7 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5 sm:mb-6">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-slate-700 shrink-0" />
              <span>{t.costBreakdownTitle}</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {t.costBreakdownSub}
            </p>
          </div>
          <div className="flex items-center gap-2 no-print shrink-0">
            <button
              onClick={handleCopySummary}
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer min-h-[36px]"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">{t.copiedSuccess}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-500" />
                  <span>{t.copyReport}</span>
                </>
              )}
            </button>
            <button
              onClick={onPrint}
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer min-h-[36px]"
            >
              <Printer className="w-3.5 h-3.5 text-slate-200" />
              <span>{t.exportPdf}</span>
            </button>
          </div>
        </div>

        {/* Highlight Summary Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-xs text-slate-600 font-medium block mb-1">
              {t.productAndAds}
            </span>
            <span className="text-lg sm:text-xl font-bold font-mono text-slate-900 tabular-nums">
              {results.productAndAdsCost} {currencySymbol}
            </span>
            <span className="text-[11px] text-slate-500 block mt-1">
              {inputs.productCost} + {inputs.cpa} {currencySymbol}
            </span>
          </div>

          <div className={`p-3.5 sm:p-4 rounded-xl border ${
            results.shippingAndReturnBalance >= 0
              ? 'bg-emerald-50/50 border-emerald-200 text-emerald-950'
              : 'bg-rose-50/50 border-rose-200 text-rose-950'
          }`}>
            <span className="text-xs font-medium block mb-1">
              {t.shippingReturnBalance}
            </span>
            <span className={`text-lg sm:text-xl font-bold font-mono tabular-nums ${
              results.shippingAndReturnBalance >= 0 ? 'text-emerald-700' : 'text-rose-700'
            }`}>
              {results.shippingAndReturnBalance > 0
                ? `+${results.shippingAndReturnBalance}`
                : results.shippingAndReturnBalance} {currencySymbol}
            </span>
            <span className="text-[11px] text-slate-600 block mt-1">
              {results.shippingAndReturnBalance < 0
                ? t.shippingSubsidized
                : t.shippingCovered}
            </span>
          </div>

          <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-xs text-slate-600 font-medium block mb-1">
              {t.cpaLimitTitle}
            </span>
            <span className="text-lg sm:text-xl font-bold font-mono text-blue-700 tabular-nums">
              {results.maxCpa} {currencySymbol}
            </span>
            <span className="text-[11px] text-slate-500 block mt-1">
              {t.cpaLimitSub}
            </span>
          </div>
        </div>

        {/* Itemized Table (with horizontal scroll on tiny screens) */}
        <div className="overflow-x-auto border border-slate-200 rounded-xl">
          <table className="w-full text-xs text-right border-collapse min-w-[500px]">
            <thead>
              <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                <th className={`py-2.5 px-3.5 ${isAr ? 'text-right' : 'text-left'}`}>{t.tableColItem}</th>
                <th className={`py-2.5 px-3.5 ${isAr ? 'text-right' : 'text-left'}`}>{t.tableColType}</th>
                <th className={`py-2.5 px-3.5 font-mono ${isAr ? 'text-left' : 'text-right'}`}>{t.tableColAmount}</th>
                <th className={`py-2.5 px-3.5 font-mono ${isAr ? 'text-left' : 'text-right'}`}>{t.tableColShare}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
              <tr>
                <td className="py-2.5 px-3.5 font-semibold text-slate-900">{t.field2Label}</td>
                <td className="py-2.5 px-3.5 text-emerald-700 font-semibold">{isAr ? 'إيراد أساسي (+)' : 'Revenue (+)'}</td>
                <td className={`py-2.5 px-3.5 font-mono font-bold ${isAr ? 'text-left' : 'text-right'}`}>{inputs.sellingPrice} {currencySymbol}</td>
                <td className={`py-2.5 px-3.5 font-mono ${isAr ? 'text-left' : 'text-right'}`}>100.0%</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3.5">{t.field3Label}</td>
                <td className="py-2.5 px-3.5 text-emerald-700">{isAr ? 'إيراد شحن (+)' : 'Shipping Fee (+)'}</td>
                <td className={`py-2.5 px-3.5 font-mono ${isAr ? 'text-left' : 'text-right'}`}>{inputs.customerShippingFee} {currencySymbol}</td>
                <td className={`py-2.5 px-3.5 font-mono ${isAr ? 'text-left' : 'text-right'}`}>
                  {inputs.sellingPrice > 0 ? round((inputs.customerShippingFee / inputs.sellingPrice) * 100, 1) : 0}%
                </td>
              </tr>
              <tr className="bg-slate-50/50">
                <td className="py-2.5 px-3.5 font-bold text-slate-900">{isAr ? 'إجمالي الإيراد المقبوض من العميل' : 'Total Revenue Collected'}</td>
                <td className="py-2.5 px-3.5 text-slate-600 font-semibold">{isAr ? 'إجمالي الفاتورة (=)' : 'Total Invoice (=)'}</td>
                <td className={`py-2.5 px-3.5 font-mono font-bold text-slate-900 ${isAr ? 'text-left' : 'text-right'}`}>{results.totalRevenue} {currencySymbol}</td>
                <td className={`py-2.5 px-3.5 font-mono text-slate-500 ${isAr ? 'text-left' : 'text-right'}`}>—</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3.5">{t.field1Label}</td>
                <td className="py-2.5 px-3.5 text-rose-700">{isAr ? 'تكلفة بضاعة (-)' : 'Product Cost (-)'}</td>
                <td className={`py-2.5 px-3.5 font-mono ${isAr ? 'text-left' : 'text-right'}`}>-{inputs.productCost} {currencySymbol}</td>
                <td className={`py-2.5 px-3.5 font-mono ${isAr ? 'text-left' : 'text-right'}`}>
                  {inputs.sellingPrice > 0 ? round((inputs.productCost / inputs.sellingPrice) * 100, 1) : 0}%
                </td>
              </tr>
              <tr>
                <td className="py-2.5 px-3.5">{t.field4Label}</td>
                <td className="py-2.5 px-3.5 text-rose-700">{isAr ? 'شحن فعلي (-)' : 'Courier Shipping (-)'}</td>
                <td className={`py-2.5 px-3.5 font-mono ${isAr ? 'text-left' : 'text-right'}`}>-{inputs.actualShippingCost} {currencySymbol}</td>
                <td className={`py-2.5 px-3.5 font-mono ${isAr ? 'text-left' : 'text-right'}`}>
                  {inputs.sellingPrice > 0 ? round((inputs.actualShippingCost / inputs.sellingPrice) * 100, 1) : 0}%
                </td>
              </tr>
              <tr>
                <td className="py-2.5 px-3.5">{t.field6Label}</td>
                <td className="py-2.5 px-3.5 text-rose-700">{isAr ? 'تسويق وإعلانات (-)' : 'Ad Spend CPA (-)'}</td>
                <td className={`py-2.5 px-3.5 font-mono ${isAr ? 'text-left' : 'text-right'}`}>-{inputs.cpa} {currencySymbol}</td>
                <td className={`py-2.5 px-3.5 font-mono ${isAr ? 'text-left' : 'text-right'}`}>
                  {inputs.sellingPrice > 0 ? round((inputs.cpa / inputs.sellingPrice) * 100, 1) : 0}%
                </td>
              </tr>
              <tr>
                <td className="py-2.5 px-3.5">{t.field7Label}</td>
                <td className="py-2.5 px-3.5 text-rose-700">{isAr ? 'تشغيل وتعبئة (-)' : 'Packaging & Fees (-)'}</td>
                <td className={`py-2.5 px-3.5 font-mono ${isAr ? 'text-left' : 'text-right'}`}>-{inputs.extraFees} {currencySymbol}</td>
                <td className={`py-2.5 px-3.5 font-mono ${isAr ? 'text-left' : 'text-right'}`}>
                  {inputs.sellingPrice > 0 ? round((inputs.extraFees / inputs.sellingPrice) * 100, 1) : 0}%
                </td>
              </tr>
              <tr className="bg-slate-50/50">
                <td className="py-2.5 px-3.5 font-bold text-slate-800">{isAr ? 'تكلفة الطلب الناجح (قبل المرتجعات)' : 'Delivered Order Total Cost'}</td>
                <td className="py-2.5 px-3.5 text-slate-600 font-semibold">{isAr ? 'مجموع التكاليف (=)' : 'Total Cost (=)'}</td>
                <td className={`py-2.5 px-3.5 font-mono font-bold ${isAr ? 'text-left' : 'text-right'}`}>{results.deliveredOrderCost} {currencySymbol}</td>
                <td className={`py-2.5 px-3.5 font-mono ${isAr ? 'text-left' : 'text-right'}`}>
                  {inputs.sellingPrice > 0 ? round((results.deliveredOrderCost / inputs.sellingPrice) * 100, 1) : 0}%
                </td>
              </tr>
              <tr>
                <td className="py-2.5 px-3.5 font-bold text-slate-900">{t.deliveredProfitBeforeReturn}</td>
                <td className="py-2.5 px-3.5 text-emerald-700 font-semibold">{isAr ? 'ربح أولي (+)' : 'Initial Profit (+)'}</td>
                <td className={`py-2.5 px-3.5 font-mono font-bold text-emerald-700 ${isAr ? 'text-left' : 'text-right'}`}>{results.deliveredProfit} {currencySymbol}</td>
                <td className={`py-2.5 px-3.5 font-mono font-bold text-emerald-700 ${isAr ? 'text-left' : 'text-right'}`}>{results.deliveredMargin}%</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3.5 text-amber-900">
                  {t.returnLossPerOrder}
                  <span className="block text-[10px] text-amber-700 font-normal">
                    {inputs.returnRate}% x {inputs.actualShippingCost} {currencySymbol}
                  </span>
                </td>
                <td className="py-2.5 px-3.5 text-amber-700">{isAr ? 'خصم المرتجع (-)' : 'Return Deduction (-)'}</td>
                <td className={`py-2.5 px-3.5 font-mono font-bold text-amber-700 ${isAr ? 'text-left' : 'text-right'}`}>-{results.returnImpact} {currencySymbol}</td>
                <td className={`py-2.5 px-3.5 font-mono text-amber-700 ${isAr ? 'text-left' : 'text-right'}`}>
                  {inputs.sellingPrice > 0 ? round((results.returnImpact / inputs.sellingPrice) * 100, 1) : 0}%
                </td>
              </tr>
              <tr className={isProfitable ? 'bg-emerald-50/70 font-bold' : 'bg-rose-50/70 font-bold'}>
                <td className="py-3 px-3.5 text-xs sm:text-sm font-bold text-slate-900">
                  {t.realNetProfitTitle}
                </td>
                <td className="py-3 px-3.5 text-xs">
                  {isProfitable ? (
                    <span className="text-emerald-700">{isAr ? 'صافي ربح نهائي' : 'Final Net Profit'}</span>
                  ) : (
                    <span className="text-rose-700">{isAr ? 'صافي خسارة' : 'Final Net Loss'}</span>
                  )}
                </td>
                <td className={`py-3 px-3.5 font-mono text-sm sm:text-base font-extrabold ${isAr ? 'text-left' : 'text-right'} ${
                  isProfitable ? 'text-emerald-700' : 'text-rose-700'
                }`}>
                  {results.realNetProfit} {currencySymbol}
                </td>
                <td className={`py-3 px-3.5 font-mono text-sm sm:text-base font-extrabold ${isAr ? 'text-left' : 'text-right'} ${
                  isProfitable ? 'text-emerald-700' : 'text-rose-700'
                }`}>
                  {results.realMargin}%
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 3. Smart Expert Advice */}
      <section id="advice-section" className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-7 shadow-xs">
        <div className="flex items-center gap-2.5 mb-4 sm:mb-5">
          <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-200 shrink-0">
            <Lightbulb className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900">
              {t.smartAdviceTitle}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {t.smartAdviceSub}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {adviceList.map((advice) => {
            let borderColor = 'border-slate-200 bg-slate-50/50';
            let badgeBg = 'bg-slate-100 text-slate-700';

            if (advice.severity === 'urgent') {
              borderColor = 'border-rose-200 bg-rose-50/40';
              badgeBg = 'bg-rose-100 text-rose-800';
            } else if (advice.severity === 'warning') {
              borderColor = 'border-amber-200 bg-amber-50/40';
              badgeBg = 'bg-amber-100 text-amber-800';
            } else if (advice.severity === 'success') {
              borderColor = 'border-emerald-200 bg-emerald-50/40';
              badgeBg = 'bg-emerald-100 text-emerald-800';
            } else if (advice.severity === 'tip') {
              borderColor = 'border-blue-200 bg-blue-50/40';
              badgeBg = 'bg-blue-100 text-blue-800';
            }

            return (
              <div
                key={advice.id}
                className={`p-3.5 sm:p-4 rounded-xl border ${borderColor} transition-all`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 mb-1.5">
                  <h4 className="text-xs font-bold text-slate-900 flex items-center gap-2">
                    {advice.severity === 'urgent' && <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0" />}
                    {advice.severity === 'warning' && <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />}
                    {advice.severity === 'success' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />}
                    <span>{advice.title}</span>
                  </h4>
                  {advice.metricHighlight && (
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md font-mono self-start sm:self-auto ${badgeBg}`}>
                      {advice.metricHighlight}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {advice.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Advanced Interactive Tools: Monthly Simulator & Reverse Target Calculator */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 no-print">
        {/* Simulator: Monthly Profit Projection */}
        <section id="simulator-section" className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sliders className="w-4 h-4 text-emerald-600 shrink-0" />
              <h3 className="text-sm font-bold text-slate-900">
                {t.monthlySimulatorTitle}
              </h3>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              {t.monthlySimulatorSub}
            </p>

            {/* Quick volume buttons */}
            <div className="grid grid-cols-4 gap-1.5 sm:gap-2 mb-4">
              {[100, 250, 500, 1000].map((count) => (
                <button
                  key={count}
                  type="button"
                  onClick={() => setMonthlyVolume(count)}
                  className={`py-1.5 text-xs font-semibold rounded-lg font-mono transition-colors cursor-pointer min-h-[36px] ${
                    monthlyVolume === count
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {count}
                </button>
              ))}
            </div>

            {/* Slider */}
            <div className="space-y-1 mb-5">
              <div className="flex justify-between text-xs font-medium text-slate-700">
                <span>{isAr ? 'العدد المحدد:' : 'Selected Volume:'}</span>
                <span className="font-mono font-bold">{monthlyVolume} {t.ordersCount}</span>
              </div>
              <input
                type="range"
                min="50"
                max="2000"
                step="25"
                value={monthlyVolume}
                onChange={(e) => setMonthlyVolume(parseInt(e.target.value) || 50)}
                className="w-full accent-emerald-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
              />
            </div>
          </div>

          <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex justify-between items-center text-xs text-slate-600">
              <span>{t.grossRevenue}</span>
              <span className="font-mono font-bold text-slate-900">{simulation.grossRevenue.toLocaleString()} {currencySymbol}</span>
            </div>
            <div className="flex justify-between items-center text-xs text-slate-600">
              <span>{t.deliveredOrdersCount}</span>
              <span className="font-mono font-semibold text-emerald-700">{simulation.deliveredOrders}</span>
            </div>
            <div className="flex justify-between items-center text-xs text-slate-600">
              <span>{t.returnedOrdersCount}</span>
              <span className="font-mono font-semibold text-rose-700">{simulation.returnedOrders}</span>
            </div>
            <div className="flex justify-between items-center text-xs text-slate-600">
              <span>{t.totalAdSpend}</span>
              <span className="font-mono font-semibold text-blue-700">{simulation.totalAdSpend.toLocaleString()} {currencySymbol}</span>
            </div>
            <div className="h-px bg-slate-200 my-2" />
            <div className="flex justify-between items-center text-xs sm:text-sm font-bold text-slate-900">
              <span>{t.monthlyNetProfitCash}</span>
              <span className={`font-mono text-sm sm:text-base font-extrabold ${
                simulation.totalNetProfit >= 0 ? 'text-emerald-700' : 'text-rose-700'
              }`}>
                {simulation.totalNetProfit >= 0 ? `+${simulation.totalNetProfit.toLocaleString()}` : simulation.totalNetProfit.toLocaleString()} {currencySymbol}
              </span>
            </div>
          </div>
        </section>

        {/* Reverse Calculator: Target Selling Price for a Desired Margin */}
        <section className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-4 h-4 text-indigo-600 shrink-0" />
              <h3 className="text-sm font-bold text-slate-900">
                {t.targetPriceCalcTitle}
              </h3>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              {t.targetPriceCalcSub}
            </p>

            {/* Quick Margin Goals */}
            <div className="grid grid-cols-4 gap-1.5 sm:gap-2 mb-4">
              {[15, 20, 25, 30].map((goal) => (
                <button
                  key={goal}
                  type="button"
                  onClick={() => setTargetMarginGoal(goal)}
                  className={`py-1.5 text-xs font-semibold rounded-lg font-mono transition-colors cursor-pointer min-h-[36px] ${
                    targetMarginGoal === goal
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {goal}%
                </button>
              ))}
            </div>

            {/* Input custom goal */}
            <div className="space-y-1 mb-5">
              <label className="text-xs font-semibold text-slate-700">
                {t.targetMarginInputLabel}
              </label>
              <div className="relative flex items-center">
                <input
                  type="number"
                  min="5"
                  max="70"
                  step="1"
                  value={targetMarginGoal}
                  onChange={(e) => setTargetMarginGoal(Math.min(90, Math.max(1, parseFloat(e.target.value) || 10)))}
                  className={`w-full py-2 text-xs font-semibold font-mono text-slate-900 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 ${isAr ? 'pl-10 pr-3.5' : 'pr-10 pl-3.5'}`}
                />
                <span className={`absolute text-xs font-bold text-slate-400 pointer-events-none ${isAr ? 'left-3' : 'right-3'}`}>%</span>
              </div>
            </div>
          </div>

          <div className="p-3.5 sm:p-4 rounded-xl bg-indigo-50/50 border border-indigo-200 space-y-1.5">
            <span className="text-xs font-semibold text-indigo-900 block">
              {t.targetPriceResult}
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl sm:text-3xl font-extrabold font-mono text-indigo-700 tabular-nums">
                {calculatedTargetPrice > 0 ? calculatedTargetPrice : '—'}
              </span>
              <span className="text-xs font-bold text-slate-700">{currencySymbol}</span>
            </div>
            <p className="text-[11px] text-slate-600 leading-normal">
              {calculatedTargetPrice > inputs.sellingPrice
                ? (isAr
                    ? `تحتاج لرفع سعرك الحالي بمقدار ${round(calculatedTargetPrice - inputs.sellingPrice)} ${currencySymbol} للوصول لهذا الهامش.`
                    : `Raise your current price by ${round(calculatedTargetPrice - inputs.sellingPrice)} ${currencySymbol} to achieve this margin.`)
                : (isAr
                    ? `سعرك الحالي (${inputs.sellingPrice} ${currencySymbol}) يغطي الهدف ويمنحك مرونة لتقديم عروض.`
                    : `Your current price (${inputs.sellingPrice} ${currencySymbol}) already reaches this margin.`)}
            </p>
          </div>
        </section>
      </div>

      {/* Break-even Return Rate Sensitivity Card */}
      <section className="bg-slate-900 text-white rounded-2xl p-4 sm:p-6 shadow-sm no-print">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold text-emerald-400">
              {t.returnSafetyThresholdTitle}
            </span>
            <h4 className="text-sm sm:text-base font-bold text-white">
              {t.returnSafetyThresholdSub}
            </h4>
            <p className="text-xs text-slate-300">
              {isAr
                ? 'طالما نسبة المرتجع في شركتك أقل من هذا الرقم، فأنت في منطقة الربح الآمن'
                : 'As long as your return rate stays below this figure, your operation remains net profitable.'}
            </p>
          </div>
          <div className={`${isAr ? 'text-left sm:text-right' : 'text-right sm:text-left'} shrink-0`}>
            <span className="text-3xl sm:text-4xl font-extrabold font-mono text-emerald-400 tabular-nums">
              {results.maxSustainableReturnRate}%
            </span>
            <span className="text-xs text-slate-400 block mt-0.5">
              ({isAr ? 'معدلك الحالي:' : 'Your current:'} {inputs.returnRate}%)
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};
