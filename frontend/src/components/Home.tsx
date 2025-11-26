import { NavLink } from "react-router";
import logo from "@/assets/favicon.svg";

const Home = () => {
  return (
    <div className="flex flex-1 flex-col">
      <header>
        <nav className="flex items-center justify-between border-b-4 border-b-gray-300 px-8 py-6">
          <div className="flex gap-2">
            <img src={logo} alt="Logo" className="h-8 w-8" />
            <span className="text-2xl font-medium">i2note</span>
          </div>

          <ul className="flex gap-4 font-medium">
            <li className="hover:scale-105">
              <NavLink to={"/sign-in"} className={"rounded-lg bg-gray-300 px-4 py-2"}>
                Sign In
              </NavLink>
            </li>
            <li className="hover:scale-105">
              <NavLink to={"/sign-up"} className={"rounded-lg bg-gray-300 px-4 py-2"}>
                Sign Up
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <main className="flex flex-1 items-center justify-center">
        <section className="flex flex-col items-center justify-center gap-4 rounded-xl bg-gray-100 px-32 py-32 text-xl font-medium">
          <p>Welcome to i2note Take control of your notes.</p>
          <p>Create, organize, and access them anytime, anywhere.</p>
        </section>
      </main>
    </div>
  );
};

export default Home;
