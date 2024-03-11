import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { Header } from "./components/layout/Header";
import { Main } from "./components/layout/Main";
import { Footer } from "./components/layout/Footer";
import { PictOfTheDayPage } from "./pages/pictureOfTheDay/PictOfTheDayPage";
import { LocalStorageContextWrapper } from "./helpers/localStorage";
import { AppSettings, defaultAppSettings } from "./types/appSettings";
import { MarsPage } from "./pages/mars/MarsPage";
import { EarthPage } from "./pages/earth/EarthPage";
import { ProblemContextWrapper } from "./context/ProblemContext";

const queryClient = new QueryClient();

export function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <LocalStorageContextWrapper<AppSettings>
          localStorageKey="space_photos" defaultValue={defaultAppSettings}>
          <Routes>
            <Route Component={Layout}>
              <Route path={`/`} element={<PictOfTheDayPage />}></Route>
              <Route path={`/earth`} element={<EarthPage />}></Route>
              <Route path={`/mars`} element={<MarsPage />}></Route>
            </Route>
          </Routes>
        </LocalStorageContextWrapper>
      </QueryClientProvider>
    </BrowserRouter>
  )
}

function Layout() {
  return (
    <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
      <Header />
      <Main>
        <ProblemContextWrapper>
          <Outlet />
        </ProblemContextWrapper>
      </Main>
      <Footer />
    </div>
  );
}

