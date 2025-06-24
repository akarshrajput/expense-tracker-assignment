'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Trash, Pencil } from 'lucide-react'
import { toast } from 'sonner'

export default function UserExpensesList({ userId }) {
  const [expenses, setExpenses] = useState([])
  const router = useRouter()

  const fetchExpenses = async () => {
    const res = await fetch(`/api/expenses?user=${userId}`)
    const json = await res.json()
    if (res.ok) {
      setExpenses(json.data)
    }
  }

  const handleDelete = async (id) => {
    const res = await fetch(`/api/expenses/${id}`, { method: 'DELETE' })
    if (res.ok) {
      toast.success('Expense deleted successfully')
      fetchExpenses()
    } else {
      toast.error('Failed to delete expense')
    }
  }

  const handleEdit = (id) => {
    router.push(`/dashboard/edit/${id}`)
  }

  useEffect(() => {
    if (userId) fetchExpenses()
  }, [userId])

  return (
    <div className="mt-8 space-y-4">
      <h2 className="text-xl font-semibold">Your Expenses</h2>
      {expenses.length === 0 ? (
        <p className="text-muted-foreground">No expenses found.</p>
      ) : (
        expenses.map((expense) => (
          <Card key={expense._id}>
            <CardHeader className="flex flex-row justify-between items-center">
              <div className="space-y-1">
                <CardTitle>₹{expense.amount}</CardTitle>
                <Badge variant="outline">{expense.category}</Badge>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" onClick={() => handleEdit(expense._id)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="destructive" size="icon" onClick={() => handleDelete(expense._id)}>
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{expense.description}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {new Date(expense.date).toLocaleDateString()}
              </p>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  )
}