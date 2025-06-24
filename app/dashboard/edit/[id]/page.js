"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { SidebarInset } from "@/components/ui/sidebar";
import { SiteHeader } from "@/app/_components/dashboard/site-header";

export default function EditExpensePage() {
  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState({
    amount: "",
    category: "",
    description: "",
    date: "",
  });

  const fetchExpense = async () => {
    const res = await fetch(`/api/expenses/${id}`);
    const json = await res.json();
    if (res.ok) {
      const { amount, category, description, date } = json.data;
      setForm({
        amount,
        category,
        description,
        date: date?.slice(0, 10), // convert to YYYY-MM-DD
      });
    } else {
      toast.error("Failed to fetch expense");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSelect = (value) => {
    setForm({ ...form, category: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`/api/expenses/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      toast.success("Expense updated successfully");
      router.push("/dashboard"); // ✅ go back to main page
    } else {
      toast.error("Failed to update expense");
    }
  };

  useEffect(() => {
    if (id) fetchExpense();
  }, [id]);

  return (
    <SidebarInset>
      <SiteHeader />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6"></div>
          <Card className="w-full max-w-xl mx-auto mt-10">
            <CardHeader>
              <CardTitle>Edit Expense</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="amount">Amount (₹)</Label>
                  <Input
                    id="amount"
                    name="amount"
                    type="number"
                    value={form.amount}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select value={form.category} onValueChange={handleSelect}>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {[
                        "Food",
                        "Transport",
                        "Health",
                        "Entertainment",
                        "Utilities",
                        "Other",
                      ].map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    value={form.date}
                    onChange={handleChange}
                    required
                  />
                </div>

                <Button type="submit" className="w-full">
                  Update Expense
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </SidebarInset>
  );
}
