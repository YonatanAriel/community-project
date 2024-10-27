import MainContext from "@/context/MainContext";
import AppRoutes from "@/routes/Routes";

function Layout() {
  return (
    <MainContext>
      <AppRoutes />
    </MainContext>
  );
}
export default Layout;
