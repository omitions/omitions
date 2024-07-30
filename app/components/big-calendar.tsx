import * as React from "react"
import {
  DayPicker,
  type DayButtonProps
} from "react-day-picker"

import { Lethargy } from 'lethargy-ts'
import { useWheel } from '@use-gesture/react'

import { id as localeId } from "date-fns/locale"
import { format, addMonths, subMonths } from "date-fns"

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger
} from "./ui/sheet"
import { Button } from "./ui/button"

import { cn } from "~/lib/utils"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

const lethargy = new Lethargy();

export default function BigCalendar() {
  const [month, setMonth] = React.useState(new Date());

  const nextMonth = addMonths(month, 1);
  const prevMonth = subMonths(month, 1);

  const bind = useWheel(({ event, first, memo: wait = false, direction }) => {
    if (!first) {
      const s = lethargy.check(event)
      if (s) {
        if (!wait) {
          const down = [0, -1];
          const up = [0, 1];
          const right = [1, 0];
          const left = [-1, 0];

          const dir = direction;

          const isGoToPrevMonth = (dir[0] === down[0] && dir[1] === down[1]) || (dir[0] === left[0] && dir[1] === left[1])
          const isGoToNextMonth = (dir[0] === up[0] && dir[1] === up[1]) || (dir[0] === right[0] && dir[1] === right[1])

          if (isGoToPrevMonth) {
            setMonth(prevMonth)
          }
          if (isGoToNextMonth) {
            setMonth(nextMonth)
          }
          return true
        }
      } else return false
    } else {
      return false
    }
  })

  return (
    <div className="relative max-h-[300px]" {...bind()}>
      <Header
        month={month}
        setMonth={setMonth}
      />
      <DayPicker
        showOutsideDays
        onDayClick={(v) => {
          console.log('v >>> ', v)
        }}
        month={month}
        hideNavigation
        locale={localeId}
        classNames={{
          root: "relative",

          month: "relative w-full mt-4",
          months: "relative w-full",
          month_grid: "mt-8 w-full h-[calc(100vh_-_180px)] max-h-[900px]",

          week: "relative p-0 last:border-b",
          weekdays: "flex absolute top-0 w-full",
          weekday: "flex-1 text-xs z-50 font-medium h-full py-2 flex items-center justify-start px-5 last:text-red-500",

          caption_label: "border border-red-500 absolute -top-11 right-0 hidden",
          day: "relative p-0 first:border-l border-r border-t last:text-red-500",
          day_button: "w-full h-full hover:rounded-lg border border-transparent hover:border-primary",
          outside: "text-muted-foreground/50"
        }}
        components={{
          DayButton: (props: DayButtonProps) => (
            <DayButton {...props} />
          ),
        }}
      />
    </div>
  )
}

function Header({ month, setMonth }: { month: Date, setMonth: React.Dispatch<React.SetStateAction<Date>> }) {
  const today = new Date();

  const nextMonth = addMonths(month, 1);
  const prevMonth = subMonths(month, 1);

  return (
    <div className="flex items-center justify-between border border-blue-500">
      <div>
        <h4 className="text-base font-semibold">{format(month, "MMMM yyyy", { locale: localeId })}</h4>
      </div>
      <div>
        <button onClick={() => setMonth(prevMonth)}>Prev</button>
        <button onClick={() => setMonth(nextMonth)}>Next</button>
        <button onClick={() => setMonth(today)}>Go to Today</button>
      </div>
    </div>
  )
}

function DayButton({ className, children, day }: DayButtonProps) {
  const date = day.date;
  const isToday = day.dateLib.isSameDay(new Date(date), new Date())

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div
          role="button"
          className={cn(className, "flex items-start justify-start")}
        >
          <div className="flex flex-col gap-1.5 h-full w-full relative">
            <div className="px-4 mt-2">
              <p
                className={cn(
                  "h-6 w-6 flex items-center justify-center rounded-full text-xs font-semibold",
                  isToday && "bg-primary text-white")
                }
              >
                {children}
              </p>
            </div>
            {/* <div className="bg-primary/30 mx-2 px-1.5 py-0.5 rounded-sm flex flex-col">
              <span className="text-[10px] text-black font-bold">Rp7,210,000</span>
            </div>
            <div className="bg-red-500/30 mx-2 px-1.5 py-0.5 rounded-sm flex flex-col">
              <span className="text-[10px] text-black font-bold">Rp255.200</span>
            </div> */}
          </div>
        </div>
      </SheetTrigger>
      <SheetContent className="w-[420px]">
        <div className="relative">
          <div className="h-screen">
            <p>content</p>
            <p>{format(date, "dd MMMM yyyy", { locale: localeId })}</p>
          </div>
          <div className="sticky w-full bottom-0 right-0 py-4 flex flex-col gap-2">
            <Button
              variant="default"
              className="w-full"
            >
              Buat Transaksi
            </Button>
            <SheetClose asChild>
              <Button
                variant="outline"
                className="w-full"
              >
                Tutup
              </Button>
            </SheetClose>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

// import {
//   DayPicker,
//   type DayButtonProps
// } from "react-day-picker"
// import React from "react"

// import { id as localeId } from "date-fns/locale"
// import { format, addMonths, subMonths } from "date-fns"

// import {
//   Sheet,
//   SheetClose,
//   SheetContent,
//   SheetTrigger
// } from "./ui/sheet"
// import { Button } from "./ui/button"

// import { cn } from "~/lib/utils"

// export default function BigCalendar() {
//   const today = new Date();

//   const [month, setMonth] = React.useState(today);

//   const nextMonth = addMonths(month, 1);
//   const prevMonth = subMonths(month, 1);

//   return (
//     <div className="relative">
//       {/* <div className="flex items-center justify-between border border-blue-500">
//         <div>
//           <h4>{format(month, "MMMM yyyy", { locale: localeId })}</h4>
//         </div>
//         <div>
//           <button onClick={() => setMonth(prevMonth)}>Prev</button>
//           <button onClick={() => setMonth(nextMonth)}>Next</button>
//           <button onClick={() => setMonth(today)}>Go to Today</button>
//         </div>
//       </div> */}
//       <DayPicker
//         showOutsideDays={true}
//         // month={month}
//         // onMonthChange={setMonth}
//         hideNavigation
//         locale={localeId}
//         classNames={{
//           root: "relative",

//           month: "relative w-full mt-4",
//           months: "relative w-full",
//           month_grid: "mt-8 w-full h-[calc(100vh_-_210px)] max-h-[900px]",

//           week: "relative p-0",
//           weekdays: "flex absolute top-0 w-full",
//           weekday: "flex-1 text-xs z-50 font-medium h-full py-2 flex items-center justify-start px-5",

//           caption_label: "border border-red-500 absolute -top-11 right-0 hidden",
//           day: "relative p-0",
//           day_button: "w-full h-full border border-transparent rounded-lg hover:border-primary",
//           outside: "bg-background"
//         }}
//         components={{
//           DayButton: (props: DayButtonProps) => (
//             <DayButton {...props} />
//           ),
//         }}
//       />
//     </div>
//   )
// }

// function DayButton({ className, children, day }: DayButtonProps) {
//   const date = day.date;
//   const isToday = day.dateLib.isSameDay(new Date(date), new Date())

//   return (
//     <Sheet>
//       <SheetTrigger asChild>
//         <div
//           role="button"
//           className={cn(className, "flex items-start justify-start")}
//         >
//           <div className="flex flex-col gap-1.5 h-full w-full relative">
//             <div className="px-4 mt-2">
//               <p
//                 className={cn(
//                   "h-6 w-6 flex items-center justify-center rounded-full text-xs font-semibold",
//                   isToday && "bg-primary text-white")
//                 }
//               >
//                 {children}
//               </p>
//             </div>
//             {/* <div className="bg-primary/30 mx-2 px-1.5 py-0.5 rounded-sm flex flex-col">
//               <span className="text-[10px] text-black font-bold">Rp7,210,000</span>
//             </div>
//             <div className="bg-red-500/30 mx-2 px-1.5 py-0.5 rounded-sm flex flex-col">
//               <span className="text-[10px] text-black font-bold">Rp255.200</span>
//             </div> */}
//           </div>
//         </div>
//       </SheetTrigger>
//       <SheetContent className="w-[420px]">
//         <div className="relative">
//           <div className="h-screen">
//             <p>content</p>
//             <p>{format(date, "dd MMMM yyyy", { locale: localeId })}</p>
//           </div>
//           <div className="sticky w-full bottom-0 right-0 py-4 flex flex-col gap-2">
//             <Button
//               variant="default"
//               className="w-full"
//             >
//               Buat Transaksi
//             </Button>
//             <SheetClose asChild>
//               <Button
//                 variant="outline"
//                 className="w-full"
//               >
//                 Tutup
//               </Button>
//             </SheetClose>
//           </div>
//         </div>
//       </SheetContent>
//     </Sheet>
//   )
// }