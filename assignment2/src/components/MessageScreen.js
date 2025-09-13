import { Link } from "react-router-dom";

export default function MessageScreen({
  loading = false,
  text = "Loading...",
  icon,
  title,
  description,
  callToAction,
}) {
  return (
    <div className="h-screen flex flex-col items-center justify-center px-6 text-center">
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

          {callToAction && (
            <Link
              to={callToAction.link}
              className="mt-8 inline-block bg-amber-900 text-rose-100 px-6 py-3 rounded-lg hover:bg-amber-800 transition font-medium"
            >
              ← {callToAction.label}
            </Link>
          )}
        </>
      )}
    </div>
  );
}
