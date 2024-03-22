import Footer from "./footer";
import Header from "./header";

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="relative mx-auto flex max-w-md flex-col shadow">
      <Header />
      <div className="h-[calc(100svh-66.08px-53px)] flex-grow overflow-y-auto">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default AppLayout;
