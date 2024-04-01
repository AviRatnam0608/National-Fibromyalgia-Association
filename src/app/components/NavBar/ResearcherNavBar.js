import { NavBarContainer } from "./NavBar.styles";

function ResearcherNavBar() {
  return (
    <nav className={NavBarContainer}>
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">National Fibromyalgia Association</h1>
        <div>
          <a href="/login" className="px-4 hover:underline">
            Login
          </a>
          <a href="/" className="px-4 hover:underline">
            Home
          </a>
          <a href="/active-studies" className="px-4 hover:underline">
            Active Studies
          </a>
          <a href="/researcher-pending" className="px-4 hover:underline">
            Pending
          </a>
          <a href="/past-studies" className="px-4 hover:underline">
            Past Studies
          </a>
          <a href="/rpr-form" className="px-4 hover:underline">
            New Post
          </a>
        </div>
      </div>
    </nav>
  );
}

export default ResearcherNavBar;
