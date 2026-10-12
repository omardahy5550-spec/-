import React from 'react';
import {
  Package,
  Tag,
  Truck,
  RotateCcw,
  Megaphone,
  Layers,
  ArrowDown,
  Info,
} from 'lucide-react';
import { PricingInputs } from '../types/pricing';
import { EGYPTIAN_MARKET_PRESETS } from '../data/presets';
import { Translations } from '../utils/translations';
import { Language } from '../types/localization';

interface PricingFormProps {
  inputs: PricingInputs;
  onChange: (inputs: PricingInputs) => void;
  onCalculate: () => void;
  activePreset: string | null;
  onSelectPreset: (presetId: string) => void;
  currencySymbol: string;
  currencyCode: string;
  t: Translations;
  language: Language;
}

export const PricingForm: React.FC<PricingFormProps> = ({
  inputs,
  onChange,
  onCalculate,
  activePreset,
  onSelectPreset,
  currencySymbol,
  currencyCode,
  t,
  language,
}) => {
  const isAr = language === 'ar';

  const handleInputChange = (field: keyof PricingInputs, value: string) => {
    const num = parseFloat(value);
    onChange({
      ...inputs,
      [field]: isNaN(num) ? 0 : Math.max(0, num),
    });
  };

  const handleStep = (field: keyof PricingInputs, delta: number) => {
    const current = inputs[field] || 0;
    const nextVal = Math.max(0, current + delta);
    onChange({
      ...inputs,
      [field]: nextVal,
    });
  };

  const cpaRatio = inputs.sellingPrice > 0 ? (inputs.cpa / inputs.sellingPrice) * 100 : 0;
  const isCpaHigh = inputs.sellingPrice > 0 && cpaRatio > 40;

  return (
    <section id="calculator-section" className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-7 shadow-xs">
      {/* Category Presets Header */}
      <div className="mb-5 sm:mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 mb-3">
          <div>
            <h2 className="text-sm sm:text-base font-bold text-slate-900">
              {t.quickPresetsTitle}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {t.quickPresetsSubtitle}
            </p>
          </div>
        </div>

        {/* Preset Category Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none -mx-1 px-1">
          {EGYPTIAN_MARKET_PRESETS.map((preset) => {
            const isSelected = activePreset === preset.id;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => onSelectPreset(preset.id)}
                className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl whitespace-nowrap shrink-0 transition-all cursor-pointer min-h-[38px] ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-xs ring-2 ring-slate-900/10'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <span>{preset.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="h-px bg-slate-100 my-4 sm:my-5" />

      {/* Inputs Form Grid (responsive: 1 col on mobile, 2 cols on tablet/desktop) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        {/* Field 1: Product Cost */}
        <div className="space-y-1.5">
          <label className="flex items-center justify-between text-xs font-bold text-slate-800">
            <span className="flex items-center gap-1.5">
              <Package className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <span>{t.field1Label}</span>
            </span>
            <span className="text-[11px] font-normal text-slate-400 font-mono">{currencyCode}</span>
          </label>
          <div className="relative flex items-center">
            <input
              type="number"
              min="0"
              step="any"
              value={inputs.productCost || ''}
              onChange={(e) => handleInputChange('productCost', e.target.value)}
              placeholder="150"
              className={`w-full py-2.5 sm:py-3 text-sm font-semibold font-mono text-slate-900 bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-colors ${isAr ? 'pl-14 pr-3.5' : 'pr-14 pl-3.5'}`}
            />
            <span className={`absolute text-xs font-bold text-slate-400 pointer-events-none ${isAr ? 'left-3' : 'right-3'}`}>
              {currencySymbol}
            </span>
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-500">
            <span className="truncate max-w-[200px]">{t.field1Sub}</span>
            <div className="flex gap-1 shrink-0">
              <button
                type="button"
                onClick={() => handleStep('productCost', 10)}
                className="px-2 py-0.5 bg-slate-100 hover:bg-slate-200 rounded text-[10px] font-mono cursor-pointer"
              >
                +10
              </button>
              <button
                type="button"
                onClick={() => handleStep('productCost', 50)}
                className="px-2 py-0.5 bg-slate-100 hover:bg-slate-200 rounded text-[10px] font-mono cursor-pointer"
              >
                +50
              </button>
            </div>
          </div>
        </div>

        {/* Field 2: Target Selling Price */}
        <div className="space-y-1.5">
          <label className="flex items-center justify-between text-xs font-bold text-slate-800">
            <span className="flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>{t.field2Label}</span>
            </span>
            <span className="text-[11px] font-normal text-slate-400 font-mono">{currencyCode}</span>
          </label>
          <div className="relative flex items-center">
            <input
              type="number"
              min="0"
              step="any"
              value={inputs.sellingPrice || ''}
              onChange={(e) => handleInputChange('sellingPrice', e.target.value)}
              placeholder="450"
              className={`w-full py-2.5 sm:py-3 text-sm font-semibold font-mono text-emerald-700 bg-emerald-50/40 hover:bg-white focus:bg-white border border-emerald-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-colors ${isAr ? 'pl-14 pr-3.5' : 'pr-14 pl-3.5'}`}
            />
            <span className={`absolute text-xs font-bold text-emerald-700 pointer-events-none ${isAr ? 'left-3' : 'right-3'}`}>
              {currencySymbol}
            </span>
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-500">
            <span className="truncate max-w-[200px]">{t.field2Sub}</span>
            <div className="flex gap-1 shrink-0">
              <button
                type="button"
                onClick={() => handleStep('sellingPrice', 25)}
                className="px-2 py-0.5 bg-slate-100 hover:bg-slate-200 rounded text-[10px] font-mono cursor-pointer"
              >
                +25
              </button>
              <button
                type="button"
                onClick={() => handleStep('sellingPrice', 100)}
                className="px-2 py-0.5 bg-slate-100 hover:bg-slate-200 rounded text-[10px] font-mono cursor-pointer"
              >
                +100
              </button>
            </div>
          </div>
        </div>

        {/* Field 3: Shipping Fee Charged to Customer */}
        <div className="space-y-1.5">
          <label className="flex items-center justify-between text-xs font-bold text-slate-800">
            <span className="flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <span>{t.field3Label}</span>
            </span>
            <span className="text-[11px] font-normal text-slate-400 font-mono">{currencyCode}</span>
          </label>
          <div className="relative flex items-center">
            <input
              type="number"
              min="0"
              step="any"
              value={inputs.customerShippingFee !== undefined ? inputs.customerShippingFee : ''}
              onChange={(e) => handleInputChange('customerShippingFee', e.target.value)}
              placeholder="0"
              className={`w-full py-2.5 sm:py-3 text-sm font-semibold font-mono text-slate-900 bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-colors ${isAr ? 'pl-14 pr-3.5' : 'pr-14 pl-3.5'}`}
            />
            <span className={`absolute text-xs font-bold text-slate-400 pointer-events-none ${isAr ? 'left-3' : 'right-3'}`}>
              {currencySymbol}
            </span>
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-500">
            <span className="truncate max-w-[200px]">{t.field3Sub}</span>
            <button
              type="button"
              onClick={() => onChange({ ...inputs, customerShippingFee: 0 })}
              className="px-2 py-0.5 bg-slate-100 hover:bg-slate-200 rounded text-[10px] font-bold text-emerald-800 cursor-pointer shrink-0"
            >
              {t.freeShippingBtn}
            </button>
          </div>
        </div>

        {/* Field 4: Actual Shipping Cost */}
        <div className="space-y-1.5">
          <label className="flex items-center justify-between text-xs font-bold text-slate-800">
            <span className="flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
              <span>{t.field4Label}</span>
            </span>
            <span className="text-[11px] font-normal text-slate-400 font-mono">{currencyCode}</span>
          </label>
          <div className="relative flex items-center">
            <input
              type="number"
              min="0"
              step="any"
              value={inputs.actualShippingCost || ''}
              onChange={(e) => handleInputChange('actualShippingCost', e.target.value)}
              placeholder="60"
              className={`w-full py-2.5 sm:py-3 text-sm font-semibold font-mono text-slate-900 bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-colors ${isAr ? 'pl-14 pr-3.5' : 'pr-14 pl-3.5'}`}
            />
            <span className={`absolute text-xs font-bold text-slate-400 pointer-events-none ${isAr ? 'left-3' : 'right-3'}`}>
              {currencySymbol}
            </span>
          </div>
          <p className="text-[11px] text-slate-500">
            {t.field4Sub}
          </p>
        </div>

        {/* Field 5: Return Rate */}
        <div className="space-y-1.5">
          <label className="flex items-center justify-between text-xs font-bold text-slate-800">
            <span className="flex items-center gap-1.5">
              <RotateCcw className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span>{t.field5Label}</span>
            </span>
            <span className="text-[11px] font-normal text-slate-400 font-mono">%</span>
          </label>
          <div className="relative flex items-center">
            <input
              type="number"
              min="0"
              max="100"
              step="1"
              value={inputs.returnRate !== undefined ? inputs.returnRate : 15}
              onChange={(e) => handleInputChange('returnRate', e.target.value)}
              placeholder="15"
              className={`w-full py-2.5 sm:py-3 text-sm font-semibold font-mono text-slate-900 bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-colors ${isAr ? 'pl-12 pr-3.5' : 'pr-12 pl-3.5'}`}
            />
            <span className={`absolute text-xs font-bold text-slate-500 pointer-events-none ${isAr ? 'left-3' : 'right-3'}`}>
              %
            </span>
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-500">
            <span className="truncate max-w-[200px]">{t.field5Sub}</span>
            <div className="flex gap-1 shrink-0">
              <button
                type="button"
                onClick={() => onChange({ ...inputs, returnRate: 10 })}
                className="px-2 py-0.5 bg-slate-100 hover:bg-slate-200 rounded text-[10px] cursor-pointer"
              >
                10%
              </button>
              <button
                type="button"
                onClick={() => onChange({ ...inputs, returnRate: 20 })}
                className="px-2 py-0.5 bg-slate-100 hover:bg-slate-200 rounded text-[10px] cursor-pointer"
              >
                20%
              </button>
            </div>
          </div>
        </div>

        {/* Field 6: CPA (Ad Spend per Order) */}
        <div className="space-y-1.5">
          <label className="flex items-center justify-between text-xs font-bold text-slate-800">
            <span className="flex items-center gap-1.5">
              <Megaphone className={`w-3.5 h-3.5 shrink-0 ${isCpaHigh ? 'text-amber-600' : 'text-blue-500'}`} />
              <span>{t.field6Label}</span>
            </span>
            <div className="flex items-center gap-2">
              {isCpaHigh && (
                <span className="text-[11px] font-bold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded">
                  {Math.round(cpaRatio)}% {isAr ? 'من السعر' : 'of price'}
                </span>
              )}
              <span className="text-[11px] font-normal text-slate-400 font-mono">{currencyCode}</span>
            </div>
          </label>
          <div className="relative flex items-center">
            <input
              type="number"
              min="0"
              step="any"
              value={inputs.cpa !== undefined ? inputs.cpa : ''}
              onChange={(e) => handleInputChange('cpa', e.target.value)}
              placeholder="80"
              className={`w-full py-2.5 sm:py-3 text-sm font-semibold font-mono rounded-xl focus:outline-none transition-colors ${isAr ? 'pl-14 pr-3.5' : 'pr-14 pl-3.5'} ${
                isCpaHigh
                  ? 'text-amber-900 bg-amber-50/50 border-2 border-amber-400 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500'
                  : 'text-slate-900 bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600'
              }`}
            />
            <span className={`absolute text-xs font-bold text-slate-400 pointer-events-none ${isAr ? 'left-3' : 'right-3'}`}>
              {currencySymbol}
            </span>
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-500">
            <span>{t.field6Sub}</span>
            {isCpaHigh && (
              <span className="text-amber-700 font-semibold">{t.cpaExceedsWarning}</span>
            )}
          </div>
        </div>

        {/* Field 7: Packaging & Platform Fees */}
        <div className="space-y-1.5 md:col-span-2">
          <label className="flex items-center justify-between text-xs font-bold text-slate-800">
            <span className="flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-purple-500 shrink-0" />
              <span>{t.field7Label}</span>
            </span>
            <span className="text-[11px] font-normal text-slate-400 font-mono">{currencyCode}</span>
          </label>
          <div className="relative flex items-center">
            <input
              type="number"
              min="0"
              step="any"
              value={inputs.extraFees !== undefined ? inputs.extraFees : ''}
              onChange={(e) => handleInputChange('extraFees', e.target.value)}
              placeholder="20"
              className={`w-full py-2.5 sm:py-3 text-sm font-semibold font-mono text-slate-900 bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-colors ${isAr ? 'pl-14 pr-3.5' : 'pr-14 pl-3.5'}`}
            />
            <span className={`absolute text-xs font-bold text-slate-400 pointer-events-none ${isAr ? 'left-3' : 'right-3'}`}>
              {currencySymbol}
            </span>
          </div>
          <p className="text-[11px] text-slate-500">
            {t.field7Sub}
          </p>
        </div>
      </div>

      {/* Action Button: Calculate Now */}
      <div className="mt-6 sm:mt-7 pt-4 sm:pt-5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Info className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{t.realtimeNote}</span>
        </div>
        <button
          type="button"
          onClick={onCalculate}
          className="w-full sm:w-auto px-7 py-3 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 rounded-xl shadow-xs transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
        >
          <span>{t.calculateNow}</span>
          <ArrowDown className="w-4 h-4 text-white animate-bounce" />
        </button>
      </div>
    </section>
  );
};
