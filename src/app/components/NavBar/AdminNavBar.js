import { NavBarContainer } from "./NavBar.styles";

function NavBar() {
  return (
    <nav className={NavBarContainer}>
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">National Fibromyalgia Association</h1>
        <div>
          <a href="/login" className="px-4 hover:underline">
            Login
          </a>
          <a href="/admin-dashboard" className="px-4 hover:underline">
            Dashboard
          </a>
          <a href="/signup" className="px-4 hover:underline">
            Pending Approval
          </a>
          <a href="/researcher-form" className="px-4 hover:underline">
            Research Post Request
          </a>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
