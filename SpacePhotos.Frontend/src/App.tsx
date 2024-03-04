import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { Header } from "./components/layout/Header";
import { Main } from "./components/layout/Main";
import { Footer } from "./components/layout/Footer";
import { HomePage } from "./pages/home/HomePage";
import { LocalStorageContextWrapper } from "./helpers/localStorage";
import { AppSettings, defaultAppSettings } from "./types/appSettings";

const queryClient = new QueryClient();

export function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <LocalStorageContextWrapper<AppSettings>
          localStorageKey="space_photos" defaultValue={defaultAppSettings}>
          <Routes>
            <Route Component={Layout}>
              <Route path={`/`} element={<HomePage />}></Route>
            </Route>
          </Routes>
        </LocalStorageContextWrapper>
      </QueryClientProvider>
    </BrowserRouter>
  )
}

function Layout() {
  return (
    <div className="d-flex flex-column bg-dim" style={{ minHeight: '100vh' }}>
      <Header />
      <Main>
        <Outlet />
      </Main>
      <Footer />
    </div>
  );
}
