import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchPage from "@/pages/SearchPage";
import NotFound from "@/pages/NotFound";
import { Layout } from "@/layout";

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<SearchPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export { AppRoutes };
