

function TokenExpiredModal({ onSignOut }) {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Session Expired</h2>
        <p className="mb-6">
          Your session has expired. Please sign out and log in again.
        </p>
        <button
          onClick={onSignOut}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default TokenExpiredModal;
