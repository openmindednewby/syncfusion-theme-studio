const LoginBackground = (): JSX.Element => (
  <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden" style={{ backgroundColor: 'var(--login-bg)' }}>
    <svg className="login-swoosh absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 1440 900">
      <path
        d="M-50,600 Q360,350 720,500 T1490,400"
        fill="none"
        stroke="var(--login-swoosh-primary)"
        strokeLinecap="round"
        strokeWidth="120"
      />
    </svg>
    <svg
      className="login-swoosh absolute inset-0 h-full w-full"
      preserveAspectRatio="none"
      style={{ animationDelay: '3s' }}
      viewBox="0 0 1440 900"
    >
      <path
        d="M-100,300 Q400,550 800,350 T1500,500"
        fill="none"
        stroke="var(--login-swoosh-secondary)"
        strokeLinecap="round"
        strokeWidth="90"
      />
    </svg>
    <svg
      className="login-swoosh absolute inset-0 h-full w-full"
      preserveAspectRatio="none"
      style={{ animationDelay: '7s' }}
      viewBox="0 0 1440 900"
    >
      <path
        d="M-80,750 Q500,500 900,700 T1520,550"
        fill="none"
        stroke="var(--login-swoosh-primary)"
        strokeLinecap="round"
        strokeWidth="70"
      />
    </svg>
  </div>
);

export default LoginBackground;
