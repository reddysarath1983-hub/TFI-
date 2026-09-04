import React, { useState } from 'react';
import { Flame, CheckCircle2 } from 'lucide-react';

export default function HotTakePoll() {
  const [hasVoted, setHasVoted] = useState(false);
  const [agreePct, setAgreePct] = useState(76);
  const [disagreePct, setDisagreePct] = useState(24);

  const handleVote = (choice) => {
    if (choice === 'agree') {
      setAgreePct(77);
      setDisagreePct(23);
    } else {
      setAgreePct(75);
      setDisagreePct(25);
    }
    setHasVoted(true);
  };

  return (
    <section className="relative py-24 sm:py-32 my-12 border-y border-[rgba(244,238,227,0.08)] bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,rgba(225,68,24,0.22),transparent_65%),#0a0908] text-center rounded-3xl overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 space-y-6">
        
        {/* Label */}
        <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-widest text-[#ff6a35]">
          <Flame className="w-4 h-4 text-[#ff6a35]" />
          <span>TFI Hot Take Poll</span>
        </div>

        {/* Hot Take Quote */}
        <h2 className="font-display font-extrabold text-2xl sm:text-4xl lg:text-5xl text-[#f4efe4] tracking-tight leading-snug max-w-3xl mx-auto">
          "Pokiri is still better than 90% of modern action movies."
        </h2>

        {!hasVoted ? (
          /* Vote Buttons */
          <div className="flex items-center justify-center gap-4 pt-4 flex-wrap">
            <button
              onClick={() => handleVote('agree')}
              className="min-w-[200px] sm:min-w-[240px] py-4 sm:py-5 px-8 rounded-2xl border border-[rgba(244,238,227,0.14)] bg-[#161310] hover:bg-[#1e1a15] hover:border-[#d7a552] font-display font-bold text-xl sm:text-2xl text-[#f4efe4] hover:-translate-y-1 transition-all duration-200 cursor-pointer shadow-xl"
            >
              Agree
            </button>

            <button
              onClick={() => handleVote('disagree')}
              className="min-w-[200px] sm:min-w-[240px] py-4 sm:py-5 px-8 rounded-2xl border border-[rgba(244,238,227,0.14)] bg-[#161310] hover:bg-[#1e1a15] hover:border-[#e14418] font-display font-bold text-xl sm:text-2xl text-[#f4efe4] hover:-translate-y-1 transition-all duration-200 cursor-pointer shadow-xl"
            >
              Disagree
            </button>
          </div>
        ) : (
          /* Live Results Animated Bars */
          <div className="max-w-md mx-auto space-y-4 pt-4 text-left animate-fadeIn">
            <div>
              <div className="flex justify-between font-display font-bold text-base sm:text-lg mb-2 text-[#f4efe4]">
                <span>Agree</span>
                <span className="text-[#d7a552]">{agreePct}%</span>
              </div>
              <div className="h-3.5 w-full bg-[#1e1a15] rounded-full overflow-hidden border border-[rgba(244,238,227,0.08)]">
                <div 
                  className="h-full bg-gradient-to-r from-[#d7a552] to-[#f0c878] rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${agreePct}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-display font-bold text-base sm:text-lg mb-2 text-[#f4efe4]">
                <span>Disagree</span>
                <span className="text-[#ff6a35]">{disagreePct}%</span>
              </div>
              <div className="h-3.5 w-full bg-[#1e1a15] rounded-full overflow-hidden border border-[rgba(244,238,227,0.08)]">
                <div 
                  className="h-full bg-gradient-to-r from-[#e14418] to-[#ff6a35] rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${disagreePct}%` }}
                />
              </div>
            </div>

            <p className="text-xs text-[#7d7364] text-center font-medium pt-2">
              4,812 TFI fans have weighed in.
            </p>
          </div>
        )}

      </div>
    </section>
  );
}
