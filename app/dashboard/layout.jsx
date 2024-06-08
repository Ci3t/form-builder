import { SignedIn } from "@clerk/nextjs";

import SideNav from "./_components/SideNav";
import { checkSubscription } from "@/configs/subscription";

const DashboardLayout = async ({ children }) => {
  const isPro = await checkSubscription();
  return (
    <SignedIn>
      <div>
        <div className="md:w-64 md:fixed md:inline-block hidden ">
          <SideNav isPro={isPro} />
        </div>
        <div className="md:ml-64"> {children}</div>
      </div>
    </SignedIn>
  );
};

export default DashboardLayout;
