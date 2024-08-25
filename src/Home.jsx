import { Link } from "react-router-dom";
import Logout from "./Authentication/Logout/Logout";
import { useSelector } from "react-redux";
import PageList from "./ContentManagement/PageList";

function Home() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  console.log("Auth Check Route:", isAuthenticated);

  return (
    <div>
      <h1>I am privileged to see this!</h1>
      <div>
        <PageList />
        {isAuthenticated ? (
          <Logout />
        ) : (
          <button className="underline my-2">
            <Link to="/login">Login</Link>
          </button>
        )}
      </div>
      {!isAuthenticated && (
        <div>
          <button className="underline my-2">
            <Link to="/register">Register</Link>
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;
