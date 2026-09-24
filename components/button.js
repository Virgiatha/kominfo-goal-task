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
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-5 py-2.5 text-sm font-semibold transition-colors duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-500/20";

  const variantStyle =
    variant === "secondary"
      ? "border border-slate-300 bg-white text-slate-700 shadow-none hover:bg-slate-50"
      : variant === "danger"
        ? "bg-red-700 text-white hover:bg-red-800"
      : "bg-[#1E5A82] text-white hover:bg-[#123B5D]";

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