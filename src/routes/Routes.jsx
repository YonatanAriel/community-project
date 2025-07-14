import Dashboard from '@/pages/Home';
import Home from '@/pages/Home';
import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

// import ExamplePageComponent from "@/pages/ExamplePageComponent"
// const ExamplePageComponent = lazy(() => import("@/pages/ExamplePageComponent"));

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      {/* <Route
        path="some example path"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <ExamplePageComponent />
          </Suspense>
        }
      /> */}
    </Routes>
  );
}
export default AppRoutes;
