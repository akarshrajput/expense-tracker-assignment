'use client'

import { useEffect, useState } from 'react'
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#00c49f', '#ffbb28']

export default function ExpenseCharts({ userId }) {
  const [expenses, setExpenses] = useState([])

  const fetchExpenses = async () => {
    const res = await fetch(`/api/expenses?user=${userId}`)
    const json = await res.json()
    if (res.ok) {
      setExpenses(json.data)
    }
  }

  useEffect(() => {
    if (userId) fetchExpenses()
  }, [userId])

  const categoryData = expenses.reduce((acc, expense) => {
    const category = expense.category
    const existing = acc.find((e) => e.name === category)
    if (existing) {
      existing.value += expense.amount
    } else {
      acc.push({ name: category, value: expense.amount })
    }
    return acc
  }, [])

  const monthlyData = expenses.reduce((acc, expense) => {
    const date = new Date(expense.date)
    const month = date.toLocaleString('default', { month: 'short', year: 'numeric' })
    const existing = acc.find((e) => e.month === month)
    if (existing) {
      existing.total += expense.amount
    } else {
      acc.push({ month, total: expense.amount })
    }
    return acc
  }, [])

  if (!expenses.length) {
    return (
      <div className="mt-10 text-muted-foreground text-sm text-center">
        No expense data to display.
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
      {/* Pie Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Expense Distribution by Category</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                dataKey="value"
                data={categoryData}
                outerRadius={100}
                label
              >
                {categoryData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Bar Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Expense Summary</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="total" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}