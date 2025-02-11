import LoadingPageConnecting from "./LoadingPageConnecting";
import LoadingPageProgressBar from "./LoadingPageProgressBar";
import "./LoadingPage.css";

interface Props {
  message: string;
  progress: number;
}

const LoadingPage = ({ message, progress }: Props) => {
  return progress == 0 ? (
    <LoadingPageConnecting />
  ) : (
    <LoadingPageProgressBar progress={progress} />
  );
};

export default LoadingPage;
