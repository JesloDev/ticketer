import { cn } from "../lib/utils";
import { useLoader } from "../stores/useLoader";
import Loader from "./Loader";

const Button = ({ text, className, onClick, ...rest }) => {
  const { loader } = useLoader();
  return (
    <button
      type={rest.type || "button"}
      onClick={onClick}
      className={cn(
        "py-1 px-8 rounded-full mx-auto text-sm cursor-pointer block",
        className
      )}
      {...rest}
    >
      {loader ? <Loader className="min-w-[60px]" /> : text}
    </button>
  );
};

export default Button;
