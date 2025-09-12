export default function MessageScreen({
  loading = false,
  text = "Loading...",
  icon,
  title,
  description,
}) {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      {loading ? (
        <>
          <div className="w-16 h-16 border-4 border-beige border-t-amber-800 rounded-full animate-spin mb-4"></div>
          {text && (
            <span className="text-stone-700 text-5xl font-black text-center">
              {text}
            </span>
          )}
        </>
      ) : (
        <>
          {icon && <div className="mb-6">{icon}</div>}

          {title && (
            <span className="text-5xl font-black text-center text-stone-700">
              {title}
            </span>
          )}

          {description && (
            <span className="text-xl mt-4 text-center text-stone-500">
              {description}
            </span>
          )}
        </>
      )}
    </div>
  );
}
