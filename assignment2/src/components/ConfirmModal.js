export default function ConfirmModal({ title, message, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full border border-stone-200">
        <h3 className="text-xl text-amber-900 mb-3 font-semibold">{title}</h3>
        <p className="text-stone-600 mb-6 leading-relaxed">{message}</p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg bg-stone-200 text-stone-700 hover:bg-stone-300 transition font-medium"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-amber-900 text-rose-100 hover:bg-amber-800 transition font-medium shadow-md"
          >
            Yes, clear it
          </button>
        </div>
      </div>
    </div>
  );
}
