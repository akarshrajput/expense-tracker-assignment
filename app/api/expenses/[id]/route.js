import connectMongoDB from "@/app/_lib/mongoDB";
import Expense from "@/app/_models/expenseModel";
import { NextResponse } from "next/server";


export async function GET(request, { params }) {
  try {
    await connectMongoDB();
    const expense = await Expense.findById(params.id);

    if (!expense) {
      return NextResponse.json(
        {
          status: "error",
          message: `Expense not found with ID: ${params.id}`,
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        status: "success",
        message: "Expense fetched successfully",
        data: expense,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to fetch expense",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function PATCH(request, { params }) {
  try {
    const updateData = await request.json();

    await connectMongoDB();
    const updatedExpense = await Expense.findByIdAndUpdate(params.id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedExpense) {
      return NextResponse.json(
        {
          status: "error",
          message: `Expense not found with ID: ${params.id}`,
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        status: "success",
        message: "Expense updated successfully",
        data: updatedExpense,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to update expense",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectMongoDB();
    const deletedExpense = await Expense.findByIdAndDelete(params.id);

    if (!deletedExpense) {
      return NextResponse.json(
        {
          status: "error",
          message: `Expense not found with ID: ${params.id}`,
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        status: "success",
        message: "Expense deleted successfully",
        data: deletedExpense,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to delete expense",
        error: error.message,
      },
      { status: 500 }
    );
  }
}