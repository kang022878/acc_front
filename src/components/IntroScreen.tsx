import { useEffect, useState } from "react";

interface IntroScreenProps {
  onDone?: () => void;
}

export default function IntroScreen({ onDone }: IntroScreenProps) {
  const fullText = "Your accounts. Your control.";
  const [typedText, setTypedText] = useState("");
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    let index = 0;
    let timeoutId: number | undefined;
    let fadeTimeoutId: number | undefined;
    let doneTimeoutId: number | undefined;

    const typeNext = () => {
      index += 1;
      setTypedText(fullText.slice(0, index));
      if (index < fullText.length) {
        timeoutId = window.setTimeout(typeNext, 85);
      } else {
        fadeTimeoutId = window.setTimeout(() => {
          setFadeOut(true);
          if (typeof onDone === "function") {
            doneTimeoutId = window.setTimeout(onDone, 1200);
          }
        }, 1600);
      }
    };

    timeoutId = window.setTimeout(typeNext, 500);

    return () => {
      if (timeoutId) window.clearTimeout(timeoutId);
      if (fadeTimeoutId) window.clearTimeout(fadeTimeoutId);
      if (doneTimeoutId) window.clearTimeout(doneTimeoutId);
    };
  }, [fullText, onDone]);

  return (
    <div
      className={`relative min-h-screen w-full flex items-center justify-center bg-[#050a1b] text-slate-100 transition-opacity duration-[2000ms] ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="relative w-full h-full overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(16,28,70,0.65),_rgba(5,10,27,0.98))]" />
          <div className="absolute -top-40 -left-24 h-[520px] w-[520px] rounded-full bg-blue-600/15 blur-3xl" />
          <div className="absolute -bottom-44 -right-32 h-[560px] w-[560px] rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="absolute inset-0 opacity-40 intro-stars" />
          <div className="absolute inset-0 opacity-30 intro-stars-secondary" />
        </div>

        <div className="relative z-10 flex h-full items-center justify-center px-6">
          <div className="text-center">
            <div className="text-xs font-mono tracking-[0.4em] text-cyan-300/70 mb-4">
              ACCOUNT CONTROL CENTER
            </div>
            <div className="text-2xl sm:text-3xl md:text-5xl font-semibold text-cyan-100/95 drop-shadow-[0_0_18px_rgba(56,189,248,0.4)]">
              <span className="inline-flex items-center">
                {typedText}
                <span className="ml-1 inline-block h-6 w-0.5 bg-cyan-200/80 animate-caret" />
              </span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .intro-stars {
          background-image:
            radial-gradient(2px 2px at 20% 30%, rgba(255, 255, 255, 0.3), transparent),
            radial-gradient(1px 1px at 60% 20%, rgba(255, 255, 255, 0.25), transparent),
            radial-gradient(1px 1px at 80% 70%, rgba(255, 255, 255, 0.18), transparent),
            radial-gradient(2px 2px at 35% 80%, rgba(255, 255, 255, 0.22), transparent),
            radial-gradient(1px 1px at 10% 60%, rgba(255, 255, 255, 0.2), transparent);
          background-size: 260px 260px;
          animation: drift 26s linear infinite, twinkle 3.6s ease-in-out infinite;
        }

        .intro-stars-secondary {
          background-image:
            radial-gradient(1px 1px at 15% 15%, rgba(255, 255, 255, 0.25), transparent),
            radial-gradient(1px 1px at 40% 45%, rgba(255, 255, 255, 0.2), transparent),
            radial-gradient(2px 2px at 75% 30%, rgba(255, 255, 255, 0.22), transparent),
            radial-gradient(1px 1px at 85% 85%, rgba(255, 255, 255, 0.18), transparent),
            radial-gradient(2px 2px at 55% 75%, rgba(255, 255, 255, 0.2), transparent);
          background-size: 340px 340px;
          animation: drift 32s linear infinite reverse, twinkle 4.2s ease-in-out infinite;
        }

        @keyframes drift {
          0% { transform: translateY(0); }
          100% { transform: translateY(-120px); }
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0.35; }
          45% { opacity: 0.6; }
          70% { opacity: 0.4; }
        }

        @keyframes caret {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }

        .animate-caret {
          animation: caret 1.1s step-end infinite;
        }
      `}</style>
    </div>
  );
}
