import { Link } from "react-router-dom";

function UserBoard() {
  return (
    <div>
      I can see this because I am logged in
      <div>
        <Link to="/">
          <button>Go back to home</button>
        </Link>
      </div>
    </div>
  );
}

export default UserBoard;
