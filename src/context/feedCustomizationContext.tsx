import {
  createContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

export const FeedCustomizationContext = createContext<{
  source: string[];
  date: string;
  setSource: Dispatch<SetStateAction<string[]>>;
  setDate: Dispatch<SetStateAction<string>>;
}>({
  source: [],
  date: "",
  setSource: () => {},
  setDate: () => {},
});

const FeedCustomizationContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [source, setSource] = useState<string[]>([]);
  const [date, setDate] = useState<string>("");

  return (
    <FeedCustomizationContext.Provider
      value={{ source, date, setSource, setDate }}
    >
      {children}
    </FeedCustomizationContext.Provider>
  );
};

export default FeedCustomizationContextProvider;
