"use client";

export default function Button({
  children,
  variant = "primary",
  loading = false,
  disabled = false,
  type = "button",
  onClick,
  className = "",
  ...props
}) {
  const isDisabled = disabled || loading;

  const baseStyle =
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#167A52]/20";

  const variantStyle =
    variant === "secondary"
      ? "border border-slate-300 bg-slate-100 text-slate-700 shadow-none hover:bg-slate-200"
      : variant === "danger"
        ? "bg-red-700 text-white hover:bg-red-800"
        : "bg-[#167A52] text-white hover:bg-[#0B5D3B]";

  const disabledStyle = isDisabled
    ? "cursor-not-allowed opacity-65"
    : "cursor-pointer";

  return (
    <button
      {...props}
      type={type}
      disabled={isDisabled}
      onClick={onClick}
      aria-busy={loading || undefined}
      className={`${baseStyle} ${variantStyle} ${disabledStyle} ${className}`.trim()}
    >
      {loading ? "Memuat..." : children}
    </button>
  );
}
