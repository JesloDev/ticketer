import "./loader.css";

const Loader = ({ className }) => {
  return (
    <div className={className}>
      <span className="loader mx-auto"></span>
    </div>
  );
};

export default Loader;
