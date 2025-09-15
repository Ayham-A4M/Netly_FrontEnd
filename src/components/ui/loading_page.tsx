import Logo from "../../assets/svgs/logo.svg"

const LoadingPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="flex flex-col items-center space-y-6">
          <img src={Logo} alt="Logo svg" className="size-16 animate-pulse [animation-duration:5s]" />

        <div className="flex space-x-2">
          <span className="size-2.5 bg-ring rounded-full animate-bounce [animation-delay:-0.3s]" />
          <span className="size-2.5 bg-ring rounded-full animate-bounce [animation-delay:-0.15s]" />
          <span className="size-2.5 bg-ring rounded-full animate-bounce" />
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;
