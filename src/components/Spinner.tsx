export default function Spinner({ size = 20 }: { size?: number }) {
  return (
    <div
      className="inline-block animate-spin rounded-full border-2 border-slate-300/40 border-t-blue-600"
      style={{ width: size, height: size }}
      aria-label="loading"
      role="status"
    />
  );
}
