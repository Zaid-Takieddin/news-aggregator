import {
  useContext,
  createContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

export const SearchFilterContext = createContext<{
  source: string[];
  category: string[];
  setSource: Dispatch<SetStateAction<string[]>>;
  setCategory: Dispatch<SetStateAction<string[]>>;
}>({
  source: [],
  category: [],
  setSource: () => {},
  setCategory: () => {},
});

const SearchFilterContextProvider = ({ children }: { children: ReactNode }) => {
  const [source, setSource] = useState<string[]>([]);
  const [category, setCategory] = useState<string[]>([]);

  return (
    <SearchFilterContext.Provider
      value={{ source, category, setSource, setCategory }}
    >
      {children}
    </SearchFilterContext.Provider>
  );
};

export default SearchFilterContextProvider;
