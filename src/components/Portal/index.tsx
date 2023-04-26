import ReactDOM from "react-dom";

export type Props = {
  children: React.ReactNode;
};

export const Portal = ({ children }: Props) => {
  const container = document.getElementById("portal")!;

  return ReactDOM.createPortal(children, container);
};
