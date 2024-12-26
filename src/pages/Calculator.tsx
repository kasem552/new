import React, { useState, useEffect } from 'react';
import { Calculator as CalcIcon, DollarSign, History, Trash2, Save, ArrowRight, Star, Users, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import SplineBackground from '../components/SplineBackground';
import { useTranslation } from '../hooks/useTranslation';

interface Calculation {
  diamonds: number;
  usd: number;
  date: string;
}

export default function Calculator() {
  const { t, dir } = useTranslation();
  const [diamonds, setDiamonds] = useState<string>('');
  const [history, setHistory] = useState<Calculation[]>(() => {
    const saved = localStorage.getItem('calculationHistory');
    return saved ? JSON.parse(saved) : [];
  });
  const [showHistory, setShowHistory] = useState(false);

  const DIAMOND_TO_USD = 0.005;

  useEffect(() => {
    localStorage.setItem('calculationHistory', JSON.stringify(history));
  }, [history]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setDiamonds(value);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat().format(num);
  };

  const calculateUSD = (diamonds: string) => {
    const diamondCount = parseInt(diamonds) || 0;
    return (diamondCount * DIAMOND_TO_USD).toFixed(2);
  };

  const saveCalculation = () => {
    if (diamonds) {
      const newCalculation: Calculation = {
        diamonds: parseInt(diamonds),
        usd: parseFloat(calculateUSD(diamonds)),
        date: new Date().toLocaleString(),
      };
      setHistory([newCalculation, ...history.slice(0, 9)]);
      setDiamonds('');
    }
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('calculationHistory');
  };

  return (
    <>
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <SplineBackground />
        
        <div className="relative z-10 w-full py-32">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-gradient-shine backdrop-blur-xl bg-gradient-to-br from-black/40 via-primary/40 to-accent/20 rounded-3xl p-8 md:p-12 border border-white/10">
              <div className="text-center mb-8">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  {t.calculator.title}
                </h1>
                <p className="text-xl text-white/90">
                  {t.calculator.subtitle}
                </p>
              </div>

              <div className="max-w-xl mx-auto space-y-8">
                {/* Calculator Input */}
                <div className="space-y-4">
                  <label htmlFor="diamonds" className="block text-lg font-medium text-white">
                    {t.calculator.inputLabel}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="diamonds"
                      value={diamonds}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                      placeholder="0"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50">
                      💎
                    </div>
                  </div>
                </div>

                {/* Calculation Result */}
                <div className="bg-white/10 rounded-xl p-6 border border-white/20">
                  <div className="flex items-center justify-between">
                    <span className="text-white/90">{t.calculator.estimatedEarnings}</span>
                    <div className="flex items-center text-2xl font-bold">
                      <DollarSign className="text-accent" size={24} />
                      <span className="text-white">{calculateUSD(diamonds)}</span>
                      <span className="text-white/90 text-lg ml-2">USD</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <button
                    onClick={saveCalculation}
                    disabled={!diamonds}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-accent text-white rounded-xl hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                  >
                    <Save size={20} />
                    {t.calculator.saveCalculation}
                  </button>
                  <button
                    onClick={() => setShowHistory(!showHistory)}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all duration-300"
                  >
                    <History size={20} />
                    {showHistory ? t.calculator.hideHistory : t.calculator.showHistory}
                  </button>
                </div>

                {/* Calculation History */}
                {showHistory && (
                  <div className="space-y-4">
                    {history.length > 0 ? (
                      <>
                        <div className="space-y-3">
                          {history.map((calc, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-4 bg-white/10 rounded-xl border border-white/20"
                            >
                              <div>
                                <p className="text-white/60 text-sm">{calc.date}</p>
                                <p className="text-white">
                                  💎 {formatNumber(calc.diamonds)} {t.calculator.diamonds}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="text-accent font-bold">
                                  ${calc.usd.toFixed(2)}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                        <button
                          onClick={clearHistory}
                          className="flex items-center justify-center gap-2 text-red-400 hover:text-red-300 transition-colors"
                        >
                          <Trash2 size={16} />
                          {t.calculator.clearHistory}
                        </button>
                      </>
                    ) : (
                      <p className="text-center text-white/60 py-4">
                        {t.calculator.noCalculations}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 overflow-hidden">
        <SplineBackground />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-gradient-shine backdrop-blur-xl bg-gradient-to-br from-black/40 via-primary/40 to-accent/20 rounded-3xl p-8 md:p-12 border border-white/10">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                {t.calculator.readyToGrow}
              </h2>
              <p className="text-xl text-white/90 max-w-3xl mx-auto">
                {t.calculator.joinSuccess}
              </p>
            </div>

            <div className="flex justify-center mb-16">
              <Link
                to="/signup"
                className="group inline-flex items-center justify-center px-8 py-4 bg-accent text-white rounded-xl hover:bg-accent-hover transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-accent/50"
              >
                {t.calculator.getStartedNow}
                <ArrowRight className={`ml-2 group-hover:translate-x-1 transition-transform ${dir === 'rtl' ? 'rotate-180' : ''}`} size={20} />
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8">
              <div className="flex items-center text-white/80">
                <Users className="w-5 h-5 mr-2 text-accent" />
                <span>{t.calculator.trustIndicators.activeCreators}</span>
              </div>
              <div className="flex items-center text-white/80">
                <TrendingUp className="w-5 h-5 mr-2 text-accent" />
                <span>{t.calculator.trustIndicators.successRate}</span>
              </div>
              <div className="flex items-center text-white/80">
                <Star className="w-5 h-5 mr-2 text-accent" />
                <span>{t.calculator.trustIndicators.creatorRating}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}