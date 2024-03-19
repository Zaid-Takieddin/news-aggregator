import NavBar from "@/components/NavBar";
import { Container } from "@mui/material";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBar />
      <main>
        <Container>{children}</Container>
      </main>
    </>
  );
}
