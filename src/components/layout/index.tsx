import { Toaster } from "../ui/sonner";
import Footer from "./footer";
import Header from "./header";

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="relative mx-auto flex max-w-md flex-col shadow">
      <Header />
      {/* Modify div height if height of header or footer changes */}
      <div className="h-[calc(100svh-66.08px-57px)] flex-grow overflow-y-auto">
        {children}
      </div>
      <Footer />
      <Toaster position="top-center" />
    </div>
  );
};

export default AppLayout;
