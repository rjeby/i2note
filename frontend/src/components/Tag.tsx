import iconTag from "../assets/icon-tag.svg";

const Tag = () => {
  return (
    <button className="flex items-center gap-2">
      <img src={iconTag} alt="Tag Icon" />
      <span className="text-md">Cooking</span>
    </button>
  );
};

export default Tag;
