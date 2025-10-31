import HomeContentHeader from "./HomeContentHeader";
import HomeContentCore from "./HomeContentCore";

const HomeContent = () => {
  return (
    <div className="flex flex-1 flex-col">
      <HomeContentHeader />
      <HomeContentCore />
    </div>
  );
};

export default HomeContent;
