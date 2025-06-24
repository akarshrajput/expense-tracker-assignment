import { SidebarInset } from "@/components/ui/sidebar";
import { SiteHeader } from "../_components/dashboard/site-header";
import UserExpensesList from "../_components/expenses/ExpenseList";
import { auth } from "../_lib/auth";
import ExpenseCharts from "../_components/expenses/ExpenseCharts";

export default async function Page() {
  const session = await auth();
  const userId = session.user.userId;
  return (
    <SidebarInset>
      <SiteHeader />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-6">
            <ExpenseCharts userId={userId} />
            <UserExpensesList userId={userId} />
          </div>
        </div>
      </div>
    </SidebarInset>
  );
}
