import React, { useState } from 'react';
import {
  Printer,
  Sparkles,
  ShieldCheck,
  Crown,
  CreditCard,
  LogIn,
  LogOut,
  Globe,
  ChevronDown,
  Menu,
  X,
  Coins,
} from 'lucide-react';
import { User } from '../types/auth';
import { CountryConfig, Language, SUPPORTED_COUNTRIES } from '../types/localization';
import { Translations } from '../utils/translations';

interface HeaderProps {
  onPrint: () => void;
  onReset: () => void;
  currentUser: User | null;
  onOpenAuth: () => void;
  onOpenSubscription: () => void;
  onOpenAdmin: () => void;
  onOpenCopyright: () => void;
  onLogout: () => void;
  pendingApprovalsCount: number;
  currentCountry: CountryConfig;
  onSelectCountry: (country: CountryConfig) => void;
  language: Language;
  onToggleLanguage: () => void;
  t: Translations;
}

export const Header: React.FC<HeaderProps> = ({
  onPrint,
  onReset,
  currentUser,
  onOpenAuth,
  onOpenSubscription,
  onOpenAdmin,
  onOpenCopyright,
  onLogout,
  pendingApprovalsCount,
  currentCountry,
  onSelectCountry,
  language,
  onToggleLanguage,
  t,
}) => {
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const isAdmin = currentUser?.role === 'admin' || currentUser?.email.toLowerCase() === 'omardahy5550@gmail.com';
  const isAr = language === 'ar';

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 no-print">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3 h-16">
          {/* Zone 1: Brand Wordmark with Logo & Omar Dahy Tag */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <a
              href="/"
              className="flex items-center gap-2 sm:gap-2.5 text-slate-900 hover:text-emerald-700 transition-colors"
            >
              <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl overflow-hidden shadow-2xs border border-slate-200 bg-white flex items-center justify-center shrink-0">
                <img
                  src="/src/assets/images/brand_logo_mark_1791796649033.jpg"
                  alt="Logo"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-emerald-600 text-white flex items-center justify-center font-black text-xs -z-10">
                  {currentCountry.currencyCode}
                </div>
              </div>

              <div className="flex flex-col">
                <span className="text-sm sm:text-base md:text-lg font-extrabold tracking-tight truncate max-w-[190px] sm:max-w-none">
                  {t.appTitle}
                </span>
                <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-slate-500 font-medium">
                  <span className="text-emerald-700 font-bold">{t.underSupervision}</span>
                  <span aria-hidden="true" className="text-slate-300">·</span>
                  <button
                    type="button"
                    onClick={onOpenCopyright}
                    className="hover:text-slate-900 underline underline-offset-2 cursor-pointer hidden xs:inline"
                  >
                    {t.copyrightLink}
                  </button>
                </div>
              </div>
            </a>
          </div>

          {/* Zone 2: Navigation Links for Desktop */}
          <nav className="hidden 2xl:flex items-center gap-6 text-xs font-semibold text-slate-600">
            <a href="#calculator-section" className="hover:text-emerald-600 transition-colors whitespace-nowrap">
              {t.navInputs}
            </a>
            <a href="#results-section" className="hover:text-emerald-600 transition-colors whitespace-nowrap">
              {t.navProfits}
            </a>
            <a href="#breakdown-section" className="hover:text-emerald-600 transition-colors whitespace-nowrap">
              {t.navBreakdown}
            </a>
            <a href="#advice-section" className="hover:text-emerald-600 transition-colors whitespace-nowrap">
              {t.navAdvice}
            </a>
            <a href="#simulator-section" className="hover:text-emerald-600 transition-colors whitespace-nowrap">
              {t.navSimulator}
            </a>
          </nav>

          {/* Zone 3: Country / Currency, Language, Subscription, Profile & Mobile Menu */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Country & Currency Selector Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1.5 text-xs font-bold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                title={t.country}
              >
                <span className="text-sm">{currentCountry.flag}</span>
                <span className="hidden sm:inline font-mono">{currentCountry.currencyCode}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {isCountryDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsCountryDropdownOpen(false)}
                  />
                  <div className={`absolute top-full mt-1.5 z-50 w-52 sm:w-56 bg-white border border-slate-200 rounded-xl shadow-xl py-1 text-xs max-h-80 overflow-y-auto animate-in fade-in zoom-in-95 duration-100 ${isAr ? 'left-0' : 'right-0'}`}>
                    <div className="px-3 py-1.5 font-bold text-[11px] text-slate-400 border-b border-slate-100">
                      {isAr ? 'اختر الدولة والعملة' : 'Select Country & Currency'}
                    </div>
                    {SUPPORTED_COUNTRIES.map((country) => (
                      <button
                        key={country.id}
                        type="button"
                        onClick={() => {
                          onSelectCountry(country);
                          setIsCountryDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 text-right hover:bg-slate-50 transition-colors cursor-pointer ${
                          currentCountry.id === country.id ? 'bg-emerald-50/70 font-bold text-emerald-800' : 'text-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-base">{country.flag}</span>
                          <span>{isAr ? country.nameAr : country.nameEn}</span>
                        </div>
                        <span className="font-mono text-[11px] text-slate-500 font-semibold">
                          {country.currencyCode} ({isAr ? country.currencySymbolAr : country.currencySymbolEn})
                        </span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Language Switch Button */}
            <button
              type="button"
              onClick={onToggleLanguage}
              className="inline-flex items-center gap-1 px-2 sm:px-2.5 py-1.5 text-xs font-bold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
              title={isAr ? 'Switch to English' : 'التحويل للعربية'}
            >
              <Globe className="w-3.5 h-3.5 text-slate-500" />
              <span>{isAr ? 'EN' : 'عربي'}</span>
            </button>

            {/* Subscription Button (Hidden on tiny screens, inside mobile drawer) */}
            <button
              onClick={onOpenSubscription}
              type="button"
              className="hidden md:inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-lg transition-colors cursor-pointer"
            >
              <CreditCard className="w-3.5 h-3.5 text-emerald-600" />
              <span>{t.subscribeFullBtn}</span>
            </button>

            {/* Admin Panel Button for Omar Dahy */}
            {isAdmin && (
              <button
                onClick={onOpenAdmin}
                type="button"
                className="hidden lg:inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors shadow-2xs cursor-pointer relative"
              >
                <Crown className="w-3.5 h-3.5 text-amber-400" />
                <span>{t.adminPanelBtn}</span>
                {pendingApprovalsCount > 0 && (
                  <span className="w-2 h-2 rounded-full bg-amber-400 ring-2 ring-slate-900" />
                )}
              </button>
            )}

            {/* User Profile or Login */}
            {currentUser ? (
              <div className="hidden sm:flex items-center gap-1.5 bg-slate-100 rounded-lg p-1 pr-2">
                <div className="text-right">
                  <span className="text-[11px] font-bold text-slate-800 block leading-tight truncate max-w-[80px] md:max-w-[120px]">
                    {currentUser.name.split(' ')[0]}
                  </span>
                  <span className="text-[9px] text-slate-500 block leading-tight">
                    {currentUser.role === 'admin' ? (isAr ? 'المالك' : 'Owner') : currentUser.status === 'active' ? (isAr ? 'مفعّل' : 'Active') : (isAr ? 'قيد المراجعة' : 'Pending')}
                  </span>
                </div>
                <button
                  onClick={onLogout}
                  type="button"
                  title={t.logout}
                  className="p-1 text-slate-400 hover:text-rose-600 rounded-md hover:bg-slate-200 transition-colors cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                type="button"
                className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>{t.loginRegister}</span>
              </button>
            )}

            {/* Print button on desktop */}
            <button
              onClick={onPrint}
              type="button"
              className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-slate-600" />
              <span>{isAr ? 'طباعة' : 'Print'}</span>
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden p-2 text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
              aria-label="القائمة"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      {isMobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-3 animate-in slide-in-from-top-2 duration-150">
          <div className="flex flex-col gap-2 pb-3 border-b border-slate-100">
            <button
              type="button"
              onClick={() => {
                onOpenSubscription();
                setIsMobileMenuOpen(false);
              }}
              className="w-full py-2.5 px-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl font-bold text-xs flex items-center justify-between cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-emerald-600" />
                <span>{t.subscribeFullBtn}</span>
              </span>
              <span className="text-[10px] bg-emerald-600 text-white px-2 py-0.5 rounded-full">200 {currentCountry.currencyCode}</span>
            </button>

            {isAdmin && (
              <button
                type="button"
                onClick={() => {
                  onOpenAdmin();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full py-2.5 px-3 bg-slate-900 text-white rounded-xl font-bold text-xs flex items-center justify-between cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <Crown className="w-4 h-4 text-amber-400" />
                  <span>{t.adminPanelBtn}</span>
                </span>
                {pendingApprovalsCount > 0 && (
                  <span className="bg-amber-500 text-slate-900 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {pendingApprovalsCount}
                  </span>
                )}
              </button>
            )}

            {currentUser ? (
              <div className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
                <div>
                  <span className="font-bold text-slate-900 text-xs block">{currentUser.name}</span>
                  <span className="text-[11px] text-slate-500 font-mono">{currentUser.email}</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    onLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="px-2.5 py-1 text-xs text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-lg font-bold"
                >
                  {t.logout}
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => {
                  onOpenAuth();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-bold text-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <LogIn className="w-4 h-4" />
                <span>{t.loginRegister}</span>
              </button>
            )}
          </div>

          <div className="flex flex-col gap-1 text-xs font-semibold text-slate-700 pt-1">
            <a
              href="#calculator-section"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-2 px-2 hover:bg-slate-50 rounded-lg"
            >
              {t.navInputs}
            </a>
            <a
              href="#results-section"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-2 px-2 hover:bg-slate-50 rounded-lg"
            >
              {t.navProfits}
            </a>
            <a
              href="#breakdown-section"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-2 px-2 hover:bg-slate-50 rounded-lg"
            >
              {t.navBreakdown}
            </a>
            <a
              href="#advice-section"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-2 px-2 hover:bg-slate-50 rounded-lg"
            >
              {t.navAdvice}
            </a>
            <a
              href="#simulator-section"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-2 px-2 hover:bg-slate-50 rounded-lg"
            >
              {t.navSimulator}
            </a>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <button
              type="button"
              onClick={() => {
                onOpenCopyright();
                setIsMobileMenuOpen(false);
              }}
              className="text-xs text-slate-500 hover:text-slate-800 underline"
            >
              {t.copyrightLink}
            </button>
            <button
              type="button"
              onClick={() => {
                onPrint();
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-800 bg-slate-100 rounded-lg"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{t.exportPdf}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
