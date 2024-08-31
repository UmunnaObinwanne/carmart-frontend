

const LogoutButton = () => {

  const handleLogout = () => {
    window.location.href = "http://localhost:5000/logout";
  };

  return (
    <button
      onClick={handleLogout}
      className="btn btn-ghost flex items-center space-x-2 text-white"
    >
      Log Out
    </button>
  );
};

export default LogoutButton;
