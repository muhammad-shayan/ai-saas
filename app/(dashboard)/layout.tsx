import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { getApiLimitCount } from "@/lib/api-limit";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const apiLimitCount = await getApiLimitCount();
  return (
    <>
      <div className="hidden fixed h-full md:flex md:w-72">
        <Sidebar apiLimitCount={apiLimitCount} />
      </div>
      <main className="md:pl-72">
        <Navbar apiLimitCount={apiLimitCount} />
        {children}
      </main>
    </>
  );
};

export default DashboardLayout;
