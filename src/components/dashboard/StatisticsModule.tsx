
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer 
} from 'recharts';

// Sample data for charts
const monthlyHoursData = [
  { name: 'Jan', hours: 18.5 },
  { name: 'Feb', hours: 22.3 },
  { name: 'Mar', hours: 21.2 },
  { name: 'Apr', hours: 25.8 },
  { name: 'May', hours: 31.2 },
  { name: 'Jun', hours: 35.5 },
  { name: 'Jul', hours: 28.2 },
  { name: 'Aug', hours: 33.1 },
  { name: 'Sep', hours: 27.8 },
  { name: 'Oct', hours: 24.5 },
  { name: 'Nov', hours: 19.3 },
  { name: 'Dec', hours: 20.1 },
];

const flightTypeData = [
  { name: 'VFR', value: 65 },
  { name: 'IFR', value: 20 },
  { name: 'SVFR', value: 5 },
  { name: 'Training', value: 10 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const aircraftData = [
  { name: 'C172', flights: 75 },
  { name: 'PA28', flights: 32 },
  { name: 'C152', flights: 18 },
  { name: 'BE36', flights: 3 },
];

export default function StatisticsModule() {
  const [timeRange, setTimeRange] = useState("all");
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Flight Statistics</h1>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Time Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="month">Last Month</SelectItem>
            <SelectItem value="year">Last Year</SelectItem>
            <SelectItem value="all">All Time</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Flights" value="128" change="+12% from last year" />
        <StatCard title="Total Hours" value="432.5" change="+8% from last year" />
        <StatCard title="Airports Visited" value="37" change="4 new this year" />
        <StatCard title="Aircraft Flown" value="8" change="2 new this year" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle>Monthly Flight Hours</CardTitle>
            <CardDescription>Hours flown per month over the last year</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={monthlyHoursData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="hours" 
                    stroke="#3b82f6" 
                    activeDot={{ r: 8 }}
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Flight Types</CardTitle>
            <CardDescription>Breakdown by flight rules and type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={flightTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {flightTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Aircraft Types</CardTitle>
            <CardDescription>Flights by aircraft model</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={aircraftData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="flights" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>License Requirements Progress</CardTitle>
            <CardDescription>
              Track your progress toward various license requirements
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center text-muted-foreground py-8">
              <p>Detailed license requirement tracking available in the Premium plan.</p>
              <div className="mt-4">
                <a href="#pricing" className="text-primary hover:underline">
                  Upgrade to Premium
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatCard({ title, value, change }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground mt-1">{change}</p>
      </CardContent>
    </Card>
  );
}
