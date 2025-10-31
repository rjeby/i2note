import HomeContent from "./HomeContent";
import HomeSidebar from "./HomeSidebar";

const Home = () => {
  return (
    <div className="flex h-screen w-screen flex-1">
      <HomeSidebar />
      <HomeContent />
    </div>
  );
};

export default Home;
