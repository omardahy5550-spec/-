import React, { useState, useMemo, useEffect } from 'react';
import { Header } from './components/Header';
import { PricingForm } from './components/PricingForm';
import { ResultsDashboard } from './components/ResultsDashboard';
import { CpaAlertToast } from './components/CpaAlertToast';
import { AuthModal } from './components/AuthModal';
import { SubscriptionModal } from './components/SubscriptionModal';
import { AdminDashboardModal } from './components/AdminDashboardModal';
import { CopyrightNoticeModal } from './components/CopyrightNoticeModal';
import { PricingInputs } from './types/pricing';
import { calculatePricing } from './utils/calculations';
import { EGYPTIAN_MARKET_PRESETS } from './data/presets';
import {
  getCurrentUser,
  getUsers,
  setCurrentUser as persistCurrentUser,
} from './utils/authStorage';
import { User, SUBSCRIPTION_CONFIG } from './types/auth';
import { CountryConfig, Language, SUPPORTED_COUNTRIES } from './types/localization';
import { TRANSLATIONS } from './utils/translations';
import {
  ShieldCheck,
  CreditCard,
  Crown,
  Sparkles,
  Info,
  Clock,
  PhoneCall,
  CheckCircle2,
  Lock,
} from 'lucide-react';

export default function App() {
  // Localization states: Language & Country/Currency
  const [language, setLanguage] = useState<Language>('ar');
  const [currentCountry, setCurrentCountry] = useState<CountryConfig>(SUPPORTED_COUNTRIES[0]);

  // Sync document html dir and lang
  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const t = TRANSLATIONS[language];
  const isAr = language === 'ar';
  const currencySymbol = isAr ? currentCountry.currencySymbolAr : currentCountry.currencySymbolEn;
  const currencyCode = currentCountry.currencyCode;

  // Form Inputs
  const [inputs, setInputs] = useState<PricingInputs>(currentCountry.defaultInputs);
  const [activePreset, setActivePreset] = useState<string | null>('fashion');

  // Auth & Admin States
  const [currentUser, setCurrentUserState] = useState<User | null>(() => getCurrentUser());
  const [users, setUsers] = useState<User[]>(() => getUsers());
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState<boolean>(false);
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState<boolean>(false);
  const [isCopyrightModalOpen, setIsCopyrightModalOpen] = useState<boolean>(false);

  // Sync users when changed
  const refreshUsers = () => {
    const updated = getUsers();
    setUsers(updated);
    const current = getCurrentUser();
    setCurrentUserState(current);
  };

  const pendingApprovalsCount = users.filter((u) => u.status === 'pending_approval').length;

  // Compute live calculations
  const results = useMemo(() => {
    return calculatePricing(inputs);
  }, [inputs]);

  // Handle Country selection: load typical country defaults
  const handleSelectCountry = (country: CountryConfig) => {
    setCurrentCountry(country);
    setInputs(country.defaultInputs);
    setActivePreset('fashion');
  };

  const handleToggleLanguage = () => {
    setLanguage((prev) => (prev === 'ar' ? 'en' : 'ar'));
  };

  const handleSelectPreset = (presetId: string) => {
    const preset = EGYPTIAN_MARKET_PRESETS.find((p) => p.id === presetId);
    if (preset) {
      // If country is not Egypt, adapt preset numbers proportionally
      if (currentCountry.id !== 'eg') {
        const factor = currentCountry.defaultInputs.sellingPrice / 420;
        setInputs({
          productCost: Math.round(preset.inputs.productCost * factor * 10) / 10,
          sellingPrice: Math.round(preset.inputs.sellingPrice * factor * 10) / 10,
          customerShippingFee: Math.round(preset.inputs.customerShippingFee * factor * 10) / 10,
          actualShippingCost: Math.round(preset.inputs.actualShippingCost * factor * 10) / 10,
          returnRate: preset.inputs.returnRate,
          cpa: Math.round(preset.inputs.cpa * factor * 10) / 10,
          extraFees: Math.round(preset.inputs.extraFees * factor * 10) / 10,
        });
      } else {
        setInputs(preset.inputs);
      }
      setActivePreset(presetId);
    }
  };

  const handleCustomInputChange = (newInputs: PricingInputs) => {
    setInputs(newInputs);
    setActivePreset(null);
  };

  const handleCalculateClick = () => {
    const resultsElement = document.getElementById('results-section');
    if (resultsElement) {
      resultsElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleReset = () => {
    setInputs(currentCountry.defaultInputs);
    setActivePreset(null);
  };

  const handleApplyRecommendedCpa = (newCpa: number) => {
    setInputs((prev) => ({
      ...prev,
      cpa: newCpa,
    }));
  };

  const handlePrint = () => {
    window.print();
  };

  const handleAuthSuccess = (user: User) => {
    setCurrentUserState(user);
    persistCurrentUser(user);
    refreshUsers();
  };

  const handleLogout = () => {
    persistCurrentUser(null);
    setCurrentUserState(null);
  };

  return (
    <div className={`min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-emerald-500 selection:text-white ${isAr ? 'text-right' : 'text-left'}`}>
      {/* Top Header conforming to the 3-zone contract */}
      <Header
        onPrint={handlePrint}
        onReset={handleReset}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onOpenSubscription={() => setIsSubscriptionModalOpen(true)}
        onOpenAdmin={() => setIsAdminDashboardOpen(true)}
        onOpenCopyright={() => setIsCopyrightModalOpen(true)}
        onLogout={handleLogout}
        pendingApprovalsCount={pendingApprovalsCount}
        currentCountry={currentCountry}
        onSelectCountry={handleSelectCountry}
        language={language}
        onToggleLanguage={handleToggleLanguage}
        t={t}
      />

      {/* Official Watermark & Print Header */}
      <div className="hidden print-only p-6 border-b border-slate-300 text-center mb-6">
        <div className="flex items-center justify-center gap-3 mb-2">
          <img
            src="/src/assets/images/brand_logo_mark_1791796649033.jpg"
            alt="Logo"
            className="w-12 h-12 rounded-lg object-cover"
          />
          <h1 className="text-xl font-bold text-slate-900">
            {t.appTitle}
          </h1>
        </div>
        <p className="text-xs text-slate-600">
          {t.underSupervision} · {SUBSCRIPTION_CONFIG.cashWalletNumber} · {currentCountry.flag} {currentCountry.currencyCode}
        </p>
        <p className="text-[11px] text-slate-500 mt-1">
          {new Date().toLocaleDateString(isAr ? 'ar-EG' : 'en-US', { dateStyle: 'long' })} · © 2026 Omar Dahy
        </p>
      </div>

      {/* Pending Account Notice Banner */}
      {currentUser && currentUser.status === 'pending_approval' && (
        <div className="bg-amber-500/10 border-b border-amber-300 px-4 py-2.5 text-center text-xs text-amber-950 font-medium no-print flex flex-wrap items-center justify-center gap-2">
          <Clock className="w-4 h-4 text-amber-700 shrink-0" />
          <span>
            {isAr ? (
              <>
                مرحباً <strong>{currentUser.name}</strong>، حسابك قيد المراجعة والموافقة من قِبل الأستاذ <strong>عمر ضاحي</strong>. يمكنك استخدام الحاسبة، ولتسريع التفعيل أرسل إثبات التحويل عبر الواتساب إلى: <strong>{SUBSCRIPTION_CONFIG.cashWalletNumber}</strong>
              </>
            ) : (
              <>
                Welcome <strong>{currentUser.name}</strong>, your account is pending approval by <strong>Omar Dahy</strong>. To expedite activation, send payment proof via WhatsApp to: <strong>{SUBSCRIPTION_CONFIG.cashWalletNumber}</strong>
              </>
            )}
          </span>
          <button
            type="button"
            onClick={() => setIsSubscriptionModalOpen(true)}
            className="px-2.5 py-1 bg-amber-600 text-white rounded-lg text-[11px] font-bold hover:bg-amber-500 cursor-pointer"
          >
            {isAr ? 'تفاصيل التحويل' : 'Payment Details'}
          </button>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10">
        {/* Hero & Market Context Banner */}
        <section className="mb-6 sm:mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 sm:gap-5 bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-7 shadow-xs">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-emerald-700">
                <span className="flex items-center gap-1.5">
                  <span>{currentCountry.flag}</span>
                  <span>{isAr ? currentCountry.nameAr : currentCountry.nameEn}</span>
                  <span className="font-mono font-bold text-slate-800">({currencyCode})</span>
                </span>
                <span className="text-slate-300" aria-hidden="true">·</span>
                <span className="text-slate-900 font-bold">{t.underSupervision}</span>
                <span className="text-slate-300" aria-hidden="true">·</span>
                <button
                  type="button"
                  onClick={() => setIsCopyrightModalOpen(true)}
                  className="text-xs text-slate-500 hover:text-slate-900 underline cursor-pointer"
                >
                  {t.copyrightLink}
                </button>
              </div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                {t.appTitle}
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
                {t.appSubtitle}
              </p>
            </div>

            {/* Subscription & Pricing Promotion Callout */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 sm:gap-3 shrink-0 lg:min-w-[280px]">
              <div className="bg-emerald-50/80 border border-emerald-200 rounded-xl p-3.5">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-xs font-bold text-emerald-800">
                    {isAr ? 'خطة الاشتراك الشهري' : 'Monthly Subscription Plan'}
                  </span>
                  <span className="text-[10px] font-extrabold bg-emerald-600 text-white px-2 py-0.5 rounded-full">
                    {isAr ? 'أول شهر ببلاش 🎉' : '1st Month Free 🎉'}
                  </span>
                </div>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-2xl font-extrabold font-mono text-emerald-900">200</span>
                  <span className="text-xs font-bold text-slate-700">
                    {currentCountry.currencyCode} {isAr ? '/ شهرياً بعد التجربة' : '/ month'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsSubscriptionModalOpen(true)}
                  className="w-full mt-2.5 py-2 px-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer min-h-[38px]"
                >
                  <CreditCard className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{isAr ? 'طريقة التحويل وتأكيد الاشتراك' : 'Transfer & Activation Details'}</span>
                </button>
              </div>

              {/* Admin shortcut if Omar Dahy */}
              {(currentUser?.role === 'admin' || currentUser?.email.toLowerCase() === 'omardahy5550@gmail.com') && (
                <button
                  type="button"
                  onClick={() => setIsAdminDashboardOpen(true)}
                  className="py-2 px-3 bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 font-bold text-xs rounded-xl flex items-center justify-between cursor-pointer min-h-[38px]"
                >
                  <span className="flex items-center gap-1.5">
                    <Crown className="w-4 h-4 text-amber-600" />
                    <span>{t.adminPanelBtn}</span>
                  </span>
                  {pendingApprovalsCount > 0 && (
                    <span className="bg-amber-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {pendingApprovalsCount} {isAr ? 'جديد' : 'New'}
                    </span>
                  )}
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Main Grid: Form on the Right (in RTL), Results on the Left */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* Inputs Column */}
          <div className="lg:col-span-5 space-y-5 sm:space-y-6">
            <PricingForm
              inputs={inputs}
              onChange={handleCustomInputChange}
              onCalculate={handleCalculateClick}
              activePreset={activePreset}
              onSelectPreset={handleSelectPreset}
              currencySymbol={currencySymbol}
              currencyCode={currencyCode}
              t={t}
              language={language}
            />

            {/* Market Insights Quick Box */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs text-xs space-y-3 no-print">
              <h3 className="font-bold text-slate-900 flex items-center gap-2">
                <Info className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{t.marketFactsTitle}</span>
              </h3>
              <ul className="space-y-2 text-slate-600 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">•</span>
                  <span>{t.marketFact1}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">•</span>
                  <span>{t.marketFact2}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">•</span>
                  <span>{t.marketFact3}</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Results Dashboard Column */}
          <div className="lg:col-span-7">
            <ResultsDashboard
              inputs={inputs}
              results={results}
              onPrint={handlePrint}
              currencySymbol={currencySymbol}
              currencyCode={currencyCode}
              t={t}
              language={language}
            />
          </div>
        </div>
      </main>

      {/* Footer with Omar Dahy Official Copyright & Protection */}
      <footer className="mt-12 sm:mt-16 border-t border-slate-200 bg-white py-8 sm:py-10 text-xs text-slate-600 no-print">
        <div className="max-w-7xl mx-auto px-4 space-y-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src="/src/assets/images/brand_logo_mark_1791796649033.jpg"
                alt="Logo"
                className="w-9 h-9 rounded-lg object-cover border border-slate-200"
              />
              <div>
                <span className="font-bold text-slate-900 block text-sm">
                  {t.appTitle}
                </span>
                <span className="text-[11px] text-slate-500">
                  {t.underSupervision}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-slate-600 font-medium">
              <button
                type="button"
                onClick={() => setIsSubscriptionModalOpen(true)}
                className="hover:text-emerald-700 transition-colors cursor-pointer"
              >
                {t.subscribeBtn} (200 {currencyCode})
              </button>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <button
                type="button"
                onClick={() => setIsCopyrightModalOpen(true)}
                className="hover:text-emerald-700 transition-colors cursor-pointer"
              >
                {t.copyrightLink}
              </button>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <a
                href={`https://wa.me/201141345683`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-700 font-bold hover:underline"
              >
                WhatsApp: {SUBSCRIPTION_CONFIG.cashWalletNumber}
              </a>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-slate-500 text-[11px]">
            <p>
              {isAr
                ? 'جميع الحقوق محفوظة ومسجلة باسم: عمر ضاحي © 2026 Omar Dahy. يمنع نسخ الأداة أو استخدام الخوارزميات دون تصريح كتابي.'
                : 'All rights reserved & registered to: Omar Dahy © 2026. Unauthorized duplication or distribution is strictly prohibited.'}
            </p>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>{currentCountry.flag} {currencyCode} ({currencySymbol})</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Smart Toast Notification for CPA > 40% */}
      <CpaAlertToast
        sellingPrice={inputs.sellingPrice}
        cpa={inputs.cpa}
        onApplyRecommendedCpa={handleApplyRecommendedCpa}
        currencySymbol={currencySymbol}
        language={language}
      />

      {/* Modals */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />

      <SubscriptionModal
        isOpen={isSubscriptionModalOpen}
        onClose={() => setIsSubscriptionModalOpen(false)}
        userName={currentUser?.name}
        userPhone={currentUser?.phone}
      />

      <AdminDashboardModal
        isOpen={isAdminDashboardOpen}
        onClose={() => setIsAdminDashboardOpen(false)}
        users={users}
        onRefreshUsers={refreshUsers}
      />

      <CopyrightNoticeModal
        isOpen={isCopyrightModalOpen}
        onClose={() => setIsCopyrightModalOpen(false)}
      />
    </div>
  );
}
