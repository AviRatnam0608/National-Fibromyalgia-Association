import { NavBarContainer } from "./NavBar.styles";

function AdminNavBar() {
  return (
    <nav className={NavBarContainer}>
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">National Fibromyalgia Association</h1>
        <div>
          <a href="/admin-dashboard" className="px-4 hover:underline">
            Dashboard
          </a>
          <a href="/admin-pending" className="px-4 hover:underline">
            Pending Studies
          </a>
          <a href="/admin-profiles" className="px-4 hover:underline">
            Pending Profiles
          </a>
        </div>
      </div>
    </nav>
  );
}

export default AdminNavBar;