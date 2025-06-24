import { SiteHeader } from "@/app/_components/dashboard/site-header";
import ExpenseForm from "@/app/_components/expenses/ExpenseForm";
import { auth } from "@/app/_lib/auth";
import { SidebarInset } from "@/components/ui/sidebar";

const page = async () => {
  const session = await auth();
  const userId = session.user.userId;
  return (
    <SidebarInset>
      <SiteHeader />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-6">
            <ExpenseForm userId={userId} />
          </div>
        </div>
      </div>
    </SidebarInset>
  );
};
export default page;
