import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PlaneTakeoff, Clock, Calendar, MapPin } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import RecentFlightsList from "./RecentFlightsList";

const stats = [
  {
    title: "Total Flights",
    value: "128",
    icon: <PlaneTakeoff className="h-5 w-5" />,
    change: "+12% from last month",
    positive: true,
  },
  {
    title: "Flight Hours",
    value: "432.5",
    icon: <Clock className="h-5 w-5" />,
    change: "+8% from last month",
    positive: true,
  },
  {
    title: "This Month",
    value: "24.2",
    icon: <Calendar className="h-5 w-5" />,
    change: "6 flights logged",
    positive: true,
  },
  {
    title: "Airports Visited",
    value: "37",
    icon: <MapPin className="h-5 w-5" />,
    change: "+2 new this month",
    positive: true,
  },
];

const flightHoursData = [
  { name: "Jan", hours: 18.5 },
  { name: "Feb", hours: 22.3 },
  { name: "Mar", hours: 21.2 },
  { name: "Apr", hours: 25.8 },
  { name: "May", hours: 31.2 },
  { name: "Jun", hours: 35.5 },
];

export default function DashboardHome() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome back, John!
        </h1>
        <p className="text-muted-foreground">
          Here's your logbook activity and recent flights.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <div className="h-4 w-4 text-muted-foreground">{stat.icon}</div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p
                className={`text-xs ${
                  stat.positive ? "text-green-500" : "text-red-500"
                }`}
              >
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Progress to Goals */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Progress to Commercial License</CardTitle>
            <CardDescription>250 hours required</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span>Total Flight Hours</span>
                <span className="font-medium">432.5 / 250</span>
              </div>
              <Progress value={100} className="h-2" />
              <div className="text-sm text-muted-foreground mt-2 flex items-center gap-2">
                <svg
                  viewBox="0 0 100 100"
                  className="h-5 w-5 text-green-500 fill-current"
                >
                  <path d="M50 100A50 50 0 1 1 50 0a50 50 0 0 1 0 100zM37 56.2l-9.2-9.2a4 4 0 1 0-5.6 5.6l12 12a4 4 0 0 0 5.6 0l28-28a4 4 0 1 0-5.6-5.6l-25.2 25.2z" />
                </svg>
                <span>Requirement complete</span>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex justify-between text-sm">
                <span>Cross-Country</span>
                <span className="font-medium">76 / 50</span>
              </div>
              <Progress value={100} className="h-2" />
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex justify-between text-sm">
                <span>Night Flying</span>
                <span className="font-medium">12 / 10</span>
              </div>
              <Progress value={100} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Monthly Flight Hours</CardTitle>
            <CardDescription>Last 6 months</CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={flightHoursData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="hours" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Flights */}
      <div className="grid gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Flights</CardTitle>
              <CardDescription>Your latest logged flights</CardDescription>
            </div>
            <Link to="/dashboard/flights">
              <Button variant="outline">View All</Button>
            </Link>
          </CardHeader>
          <CardContent>
            <RecentFlightsList />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
