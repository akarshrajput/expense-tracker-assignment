import connectMongoDB from "@/app/_lib/mongoDB";
import Expense from "@/app/_models/expenseModel";
import APIFeatures from "@/app/_utils/apiFeatures";
import { NextResponse } from "next/server";


export async function GET(request) {
  try {
    await connectMongoDB();

    const url = new URL(request.url);
    const query = Object.fromEntries(url.searchParams.entries());

    const features = new APIFeatures(Expense.find(), query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const expenses = await features.query;

    return NextResponse.json(
      {
        status: "success",
        message: "Expenses retrieved successfully",
        results: expenses.length,
        data: expenses,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to fetch expenses",
        error: error?.message || "Internal Server Error",
      },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await connectMongoDB();
    const body = await request.json();

    const { amount, category, description, date, user } = body;

    if (!amount || !category || !date || !user) {
      return NextResponse.json(
        {
          status: "error",
          message: "Missing required fields (amount, category, date, user)",
        },
        { status: 400 }
      );
    }

    const newExpense = await Expense.create(body);

    return NextResponse.json(
      {
        status: "success",
        message: "Expense created successfully",
        data: newExpense,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to create expense",
        error: error?.message,
      },
      { status: 500 }
    );
  }
}