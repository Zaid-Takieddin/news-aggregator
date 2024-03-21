import NavBar from "@/components/NavBar";
import FeedCustomizationContextProvider from "@/context/feedCustomizationContext";
import SearchFilterContextProvider from "@/context/searchFilterContext";
import { Container } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBar />
      <main>
        <Container>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <FeedCustomizationContextProvider>
              <SearchFilterContextProvider>
                {children}
              </SearchFilterContextProvider>
            </FeedCustomizationContextProvider>
          </LocalizationProvider>
        </Container>
      </main>
    </>
  );
}
