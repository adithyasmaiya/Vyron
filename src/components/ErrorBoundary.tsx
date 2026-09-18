import { Component, type ErrorInfo, type ReactNode } from 'react';

export function RootErrorFallback() {
  const handleReload = () => {
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  return (
    <div
      role="alert"
      aria-live="assertive"
      className="flex min-h-screen w-full flex-col items-center justify-center bg-[#050507] px-6 text-center text-[#F2F4FB]"
    >
      <div className="relative mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] shadow-[0_0_40px_-10px_rgba(77,124,254,0.35)]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 64 64"
          className="h-8 w-8"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="err-g" x1="8" y1="10" x2="56" y2="54" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#F2F4FB" />
              <stop offset="52%" stopColor="#4D7CFE" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
          </defs>
          <path
            d="M14 16 L32 48 L50 16"
            stroke="url(#err-g)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </div>
      <p className="font-mono text-[10px] font-medium tracking-[0.35em] text-[#4D7CFE] uppercase">
        SYSTEM RECOVERY
      </p>
      <h1 className="mt-2 font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
        Something interrupted the experience.
      </h1>
      <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/55">
        An unexpected runtime event occurred. You can restore the connection by reloading the interface.
      </p>
      <button
        type="button"
        onClick={handleReload}
        className="mt-6 inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 text-[12px] font-semibold tracking-[0.16em] text-black transition-all duration-200 hover:bg-[#4D7CFE] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4D7CFE] active:scale-[0.98]"
      >
        RELOAD EXPERIENCE
      </button>
    </div>
  );
}

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn('[ErrorBoundary] Runtime error caught:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || null;
    }
    return this.props.children;
  }
}

