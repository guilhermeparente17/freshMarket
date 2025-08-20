import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Toaster } from "sonner";
import Routes from "./routes";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";

function App() {
  const token = localStorage.getItem("token");

  const { authenticated } = useAuthStore();

  useEffect(() => {
    if (token) {
      authenticated(token);
    }
  }, []);

  return (
    <>
      <Header cartItemsCount={0} />
      <Routes />
      <Footer />
      <Toaster position="top-right" richColors />
    </>
  );
}

export default App;
