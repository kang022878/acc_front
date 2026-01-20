import { useEffect, useState } from "react";

interface IntroScreenProps {
  onDone: () => void;
}

export default function IntroScreen({ onDone }: IntroScreenProps) {
  const fullText = "Your accounts. Your control.";
  const [typedText, setTypedText] = useState("");
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    let index = 0;
    let timeoutId: number | undefined;

    const typeNext = () => {
      index += 1;
      setTypedText(fullText.slice(0, index));
      if (index < fullText.length) {
        timeoutId = window.setTimeout(typeNext, 70);
      } else {
        timeoutId = window.setTimeout(() => {
          setFadeOut(true);
          window.setTimeout(onDone, 800);
        }, 500);
      }
    };

    timeoutId = window.setTimeout(typeNext, 400);

    return () => {
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [fullText, onDone]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-slate-950 text-slate-100 transition-opacity duration-700 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="relative w-full h-full overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-40 -left-24 h-[420px] w-[420px] rounded-full bg-blue-500/20 blur-3xl" />
          <div className="absolute -bottom-44 -right-32 h-[520px] w-[520px] rounded-full bg-cyan-500/20 blur-3xl" />
          <div className="absolute inset-0 opacity-20 intro-stars" />
        </div>

        <div className="relative z-10 flex h-full items-center justify-center px-6">
          <div className="text-center">
            <div className="text-xs font-mono tracking-[0.4em] text-cyan-300/70 mb-4">
              ACCOUNT CONTROL CENTER
            </div>
            <div className="text-2xl sm:text-3xl md:text-5xl font-semibold text-cyan-100/95">
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
          animation: drift 20s linear infinite;
        }

        @keyframes drift {
          0% { transform: translateY(0); }
          100% { transform: translateY(-120px); }
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
