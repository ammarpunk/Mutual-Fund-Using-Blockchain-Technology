import { useRouter } from "next/router";
import React from "react";
import PrivateLayout from "./PrivateLayout";
import PublicLayout from "./PublicLayout";


const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const location = router.pathname;
  const isAdminPage = location.startsWith("/manager")

  return (
    <div>
      {isAdminPage ? (
        <PrivateLayout>{children}</PrivateLayout>
      ) : (
        <PublicLayout>{children}</PublicLayout>
      )}
    </div>
  );
};

export default Layout;
