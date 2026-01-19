interface ConnectionLineProps {
  from: 'top-left' | 'top-right' | 'left' | 'right';
}

export default function ConnectionLine({ from }: ConnectionLineProps) {
  const getPath = () => {
    switch (from) {
      case 'top-left':
        return 'M 0 0 Q 100 50, 300 200';
      case 'top-right':
        return 'M 0 0 Q -100 50, -300 200';
      case 'left':
        return 'M 0 0 L 200 0';
      case 'right':
        return 'M 0 0 L -200 0';
      default:
        return '';
    }
  };

  return (
    <svg 
      className="absolute pointer-events-none" 
      style={{ 
        width: '400px', 
        height: '300px',
        zIndex: 0,
        ...(from === 'top-left' && { top: '100%', left: '50%' }),
        ...(from === 'top-right' && { top: '100%', right: '50%' }),
        ...(from === 'left' && { top: '50%', left: '100%' }),
        ...(from === 'right' && { top: '50%', right: '100%' }),
      }}
    >
      <defs>
        <linearGradient id={`gradient-${from}`} gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="rgba(59, 130, 246, 0.6)" />
          <stop offset="50%" stopColor="rgba(59, 130, 246, 0.3)" />
          <stop offset="100%" stopColor="rgba(59, 130, 246, 0.1)" />
        </linearGradient>
      </defs>
      <path
        d={getPath()}
        stroke={`url(#gradient-${from})`}
        strokeWidth="2"
        fill="none"
        strokeDasharray="8,4"
        className="animate-dash"
      />
      <style>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -100;
          }
        }
        .animate-dash {
          animation: dash 20s linear infinite;
        }
      `}</style>
    </svg>
  );
}
