
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  PlaneTakeoff,
  PlaneLanding,
  Clock,
  Calendar,
  MapPin,
  Info,
  User,
} from "lucide-react";

// Sample flight data
const recentFlights = [
  {
    id: "FL1234",
    date: "2023-06-10",
    aircraft: "C172 - N54872",
    from: "KPAO",
    to: "KSJC",
    duration: "1.2",
    type: "VFR",
    role: "PIC",
    night: true,
  },
  {
    id: "FL1235",
    date: "2023-06-08",
    aircraft: "PA28 - N12345",
    from: "KSJC",
    to: "KOAK",
    duration: "0.8",
    type: "VFR",
    role: "PIC",
    night: false,
  },
  {
    id: "FL1236",
    date: "2023-06-05",
    aircraft: "C172 - N54872",
    from: "KOAK",
    to: "KPAO",
    duration: "0.9",
    type: "IFR",
    role: "PIC",
    night: false,
  },
  {
    id: "FL1237",
    date: "2023-06-02",
    aircraft: "PA28 - N12345",
    from: "KPAO",
    to: "KMOD",
    duration: "1.5",
    type: "VFR",
    role: "PIC",
    night: false,
  },
  {
    id: "FL1238",
    date: "2023-05-28",
    aircraft: "C172 - N54872",
    from: "KMOD",
    to: "KPAO",
    duration: "1.4",
    type: "VFR",
    role: "PIC",
    night: true,
  },
];

export default function RecentFlightsList() {
  const [selectedFlight, setSelectedFlight] = useState<any>(null);

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Aircraft</TableHead>
              <TableHead>Route</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentFlights.map((flight) => (
              <TableRow key={flight.id}>
                <TableCell>{flight.date}</TableCell>
                <TableCell>{flight.aircraft}</TableCell>
                <TableCell>
                  {flight.from} → {flight.to}
                </TableCell>
                <TableCell>{flight.duration}h</TableCell>
                <TableCell>
                  <Badge variant={flight.type === "IFR" ? "default" : "outline"}>
                    {flight.type}
                  </Badge>
                  {flight.night && (
                    <Badge variant="secondary" className="ml-2">
                      Night
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedFlight(flight)}
                      >
                        View Details
                      </Button>
                    </DialogTrigger>
                    {selectedFlight && (
                      <DialogContent className="sm:max-w-[525px]">
                        <DialogHeader>
                          <DialogTitle>Flight Details</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="flex gap-4 items-center">
                            <div className="bg-primary/10 p-3 rounded-full">
                              <PlaneTakeoff className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-medium">Flight {selectedFlight.id}</h3>
                              <p className="text-sm text-muted-foreground">
                                {selectedFlight.from} → {selectedFlight.to}
                              </p>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 pt-4">
                            <div className="flex items-start gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground mt-0.5" />
                              <div>
                                <p className="text-sm font-medium">Date</p>
                                <p className="text-sm text-muted-foreground">
                                  {selectedFlight.date}
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex items-start gap-2">
                              <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
                              <div>
                                <p className="text-sm font-medium">Duration</p>
                                <p className="text-sm text-muted-foreground">
                                  {selectedFlight.duration} hours
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex items-start gap-2">
                              <PlaneTakeoff className="h-4 w-4 text-muted-foreground mt-0.5" />
                              <div>
                                <p className="text-sm font-medium">Aircraft</p>
                                <p className="text-sm text-muted-foreground">
                                  {selectedFlight.aircraft}
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex items-start gap-2">
                              <User className="h-4 w-4 text-muted-foreground mt-0.5" />
                              <div>
                                <p className="text-sm font-medium">Role</p>
                                <p className="text-sm text-muted-foreground">
                                  {selectedFlight.role}
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex items-start gap-2">
                              <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                              <div>
                                <p className="text-sm font-medium">Departure</p>
                                <p className="text-sm text-muted-foreground">
                                  {selectedFlight.from}
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex items-start gap-2">
                              <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                              <div>
                                <p className="text-sm font-medium">Destination</p>
                                <p className="text-sm text-muted-foreground">
                                  {selectedFlight.to}
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex items-start gap-2">
                              <Info className="h-4 w-4 text-muted-foreground mt-0.5" />
                              <div>
                                <p className="text-sm font-medium">Flight Type</p>
                                <p className="text-sm text-muted-foreground">
                                  {selectedFlight.type}
                                  {selectedFlight.night ? ", Night Flight" : ""}
                                </p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="border-t pt-4 mt-4">
                            <h4 className="font-medium mb-2">Notes</h4>
                            <p className="text-sm text-muted-foreground">
                              No notes recorded for this flight.
                            </p>
                          </div>
                        </div>
                      </DialogContent>
                    )}
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
