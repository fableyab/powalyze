import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isToday,
} from 'date-fns'

function Calendar({
  className,
  classNames,
  mode = "single",
  selected,
  onSelect,
  disabled,
  locale,
  ...props
}) {
  const [currentMonth, setCurrentMonth] = React.useState(selected || new Date())

  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const calendarStart = startOfWeek(monthStart, { locale })
  const calendarEnd = endOfWeek(monthEnd, { locale })

  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd })

  const handlePreviousMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1))
  }

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1))
  }

  const handleDayClick = (day) => {
    if (disabled && disabled(day)) {
      return
    }
    if (onSelect) {
      onSelect(day)
    }
  }

  const weekDays = []
  for (let i = 0; i < 7; i++) {
    const day = days[i]
    weekDays.push(
      format(day, 'EEE', { locale })
    )
  }

  return (
    <div className={cn("p-3", className)} {...props}>
      <div className="flex items-center justify-between mb-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={handlePreviousMonth}
          className="h-7 w-7 p-0"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="text-sm font-medium">
          {format(currentMonth, 'MMMM yyyy', { locale })}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleNextMonth}
          className="h-7 w-7 p-0"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {weekDays.map((day, i) => (
          <div
            key={i}
            className={cn(
              "text-center text-xs font-medium pb-2",
              classNames?.head_cell
            )}
          >
            {day}
          </div>
        ))}

        {days.map((day, i) => {
          const isSelected = selected && isSameDay(day, selected)
          const isCurrentMonth = isSameMonth(day, currentMonth)
          const isTodayDate = isToday(day)
          const isDisabled = disabled && disabled(day)

          return (
            <button
              key={i}
              onClick={() => handleDayClick(day)}
              disabled={isDisabled}
              className={cn(
                "h-9 w-9 p-0 font-normal transition-colors rounded-md",
                classNames?.day,
                !isCurrentMonth && "text-muted-foreground opacity-50",
                isDisabled && "opacity-50 cursor-not-allowed",
                isSelected && (classNames?.day_selected || "bg-primary text-primary-foreground"),
                isTodayDate && !isSelected && (classNames?.day_today || "bg-accent text-accent-foreground"),
                !isDisabled && !isSelected && "hover:bg-accent hover:text-accent-foreground"
              )}
            >
              {format(day, 'd')}
            </button>
          )
        })}
      </div>
    </div>
  )
}

Calendar.displayName = "Calendar"

export { Calendar }
