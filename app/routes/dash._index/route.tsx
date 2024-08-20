import { MetaFunction } from "@remix-run/node";

import {
  Bar,
  BarChart,
  Label,
  Rectangle,
  ReferenceLine,
  XAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "~/components/ui/chart";

import DashboardSidebar from "../dash/sidebar";

export const meta: MetaFunction = () => {
  return [
    { title: "Ringkasan | mybucks.today" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="mt-14 h-full md:mt-0">
      <div className="flex">
        <DashboardSidebar />
        <div className="relative h-full w-full md:ml-auto md:w-[calc(100%_-_var(--sidebar-width-xl))]">
          <div className="relative h-full w-full">
            <div className="mx-auto mt-[var(--header-height)] min-h-screen w-full max-w-screen-xl border-input md:mt-0">
              <Page />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Page() {
  return (
    <div className="py-6 md:px-6">
      <div className="flex flex-col gap-8">
        <div className="hidden flex-col gap-0.5 md:flex">
          <h2 className="text-xl font-bold">Ringkasan</h2>
          <p className="text-sm font-normal text-muted-foreground">
            Data Anda teranalisa disini
          </p>
        </div>
        <div>
          <Chart1 />
        </div>
      </div>
    </div>
  );
}

function Chart1() {
  return (
    <Card className="lg:max-w-md" x-chunk="charts-01-chunk-0">
      <CardHeader className="space-y-0 pb-2">
        <CardDescription>Today</CardDescription>
        <CardTitle className="text-4xl tabular-nums">
          12,584{" "}
          <span className="font-sans text-sm font-normal tracking-normal text-muted-foreground">
            steps
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            steps: {
              label: "Steps",
              color: "hsl(var(--chart-1))",
            },
          }}
        >
          <BarChart
            accessibilityLayer
            margin={{
              left: -4,
              right: -4,
            }}
            data={[
              {
                date: "2024-01-01",
                steps: 2000,
              },
              {
                date: "2024-01-02",
                steps: 2100,
              },
              {
                date: "2024-01-03",
                steps: 2200,
              },
              {
                date: "2024-01-04",
                steps: 1300,
              },
              {
                date: "2024-01-05",
                steps: 1400,
              },
              {
                date: "2024-01-06",
                steps: 2500,
              },
              {
                date: "2024-01-07",
                steps: 1600,
              },
            ]}
          >
            <Bar
              dataKey="steps"
              fill="var(--color-steps)"
              radius={5}
              fillOpacity={0.6}
              activeBar={<Rectangle fillOpacity={0.8} />}
            />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={4}
              tickFormatter={(value) => {
                return new Date(value).toLocaleDateString("en-US", {
                  weekday: "short",
                });
              }}
            />
            <ChartTooltip
              defaultIndex={2}
              content={
                <ChartTooltipContent
                  hideIndicator
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    });
                  }}
                />
              }
              cursor={false}
            />
            <ReferenceLine
              y={1200}
              stroke="hsl(var(--muted-foreground))"
              strokeDasharray="3 3"
              strokeWidth={2}
            >
              <Label
                position="insideBottomLeft"
                value="Average Steps"
                offset={10}
                fill="hsl(var(--foreground))"
              />
              <Label
                position="insideTopLeft"
                value="12,343"
                className="text-lg"
                fill="hsl(var(--foreground))"
                offset={10}
                startOffset={100}
              />
            </ReferenceLine>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-1">
        <CardDescription>
          Over the past 7 days, you have walked{" "}
          <span className="font-medium text-foreground">53,305</span> steps.
        </CardDescription>
        <CardDescription>
          You need <span className="font-medium text-foreground">12,584</span>{" "}
          more steps to reach your goal.
        </CardDescription>
      </CardFooter>
    </Card>
  );
}
