
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Check } from "lucide-react";
import Select from "react-select";

// Example aircraft options with creatable feature
const aircraftOptions = [
  { value: "C172-N54872", label: "C172 - N54872" },
  { value: "PA28-N12345", label: "PA28 - N12345" },
  { value: "C152-N67890", label: "C152 - N67890" },
];

// Example airport options with creatable feature
const airportOptions = [
  { value: "KPAO", label: "KPAO - Palo Alto Airport" },
  { value: "KSJC", label: "KSJC - San Jose International" },
  { value: "KSFO", label: "KSFO - San Francisco International" },
  { value: "KLAX", label: "KLAX - Los Angeles International" },
  { value: "KOAK", label: "KOAK - Oakland International" },
];

// Flight type options
const flightTypeOptions = [
  { value: "VFR", label: "VFR" },
  { value: "IFR", label: "IFR" },
  { value: "SVFR", label: "Special VFR" },
  { value: "TRAINING", label: "Training" },
  { value: "COMMERCIAL", label: "Commercial" },
];

// Pilot function options
const pilotFunctionOptions = [
  { value: "PIC", label: "PIC (Pilot In Command)" },
  { value: "SIC", label: "SIC (Second In Command)" },
  { value: "INSTRUCTOR", label: "Instructor" },
  { value: "STUDENT", label: "Student" },
  { value: "EXAMINER", label: "Examiner" },
];

export default function LogFlightForm() {
  const { toast } = useToast();
  const [formState, setFormState] = useState({
    date: "",
    aircraft: null,
    takeoffTime: "",
    landingTime: "",
    departureAirport: null,
    destinationAirport: null,
    takeoffDay: 0,
    takeoffNight: 0,
    landingDay: 0,
    landingNight: 0,
    flightType: null,
    pilotFunction: null,
  });
  
  const [calculatedTime, setCalculatedTime] = useState({
    totalTime: "0.0",
  });
  
  const customStyles = {
    control: (base) => ({
      ...base,
      minHeight: '36px',
      background: 'var(--background)',
      borderColor: 'var(--border)',
      boxShadow: 'none',
      '&:hover': {
        borderColor: 'var(--ring)',
      }
    }),
    menu: (base) => ({
      ...base,
      background: 'var(--background)',
      border: '1px solid var(--border)',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      zIndex: 9999,
    }),
    option: (base, { isFocused, isSelected }) => ({
      ...base,
      backgroundColor: isSelected
        ? 'var(--primary)'
        : isFocused
        ? 'var(--accent)'
        : undefined,
      color: isSelected
        ? 'var(--primary-foreground)'
        : 'var(--foreground)',
    }),
  };
  
  const calculateTotalTime = () => {
    // This is a simplified calculation just for demo purposes
    // In a real app, you would parse the times and calculate the difference properly
    if (formState.takeoffTime && formState.landingTime) {
      const takeoff = formState.takeoffTime.split(':').map(Number);
      const landing = formState.landingTime.split(':').map(Number);
      
      let takeoffMinutes = takeoff[0] * 60 + takeoff[1];
      let landingMinutes = landing[0] * 60 + landing[1];
      
      // Handle overnight flights
      if (landingMinutes < takeoffMinutes) {
        landingMinutes += 24 * 60;
      }
      
      const diffMinutes = landingMinutes - takeoffMinutes;
      const hours = Math.floor(diffMinutes / 60);
      const minutes = diffMinutes % 60;
      
      setCalculatedTime({
        totalTime: `${hours}.${minutes < 10 ? '0' + minutes : minutes}`,
      });
    }
  };
  
  const handleInputChange = (field, value) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
    
    // Re-calculate total time when takeoff or landing times change
    if (field === 'takeoffTime' || field === 'landingTime') {
      setTimeout(calculateTotalTime, 100);
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // In a real app, you would validate and submit the form data
    toast({
      title: "Flight logged successfully",
      description: (
        <div className="flex items-center">
          <Check className="mr-2 h-4 w-4 text-green-500" />
          Your flight has been added to your logbook.
        </div>
      ),
    });
    
    // Reset the form
    setFormState({
      date: "",
      aircraft: null,
      takeoffTime: "",
      landingTime: "",
      departureAirport: null,
      destinationAirport: null,
      takeoffDay: 0,
      takeoffNight: 0,
      landingDay: 0,
      landingNight: 0,
      flightType: null,
      pilotFunction: null,
    });
    
    setCalculatedTime({ totalTime: "0.0" });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Log a Flight</h1>
        <p className="text-muted-foreground">
          Add a new flight to your logbook
        </p>
      </div>
      
      <Tabs defaultValue="basic">
        <TabsList className="grid w-full md:w-auto grid-cols-3">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
          <TabsTrigger value="custom">Custom Fields</TabsTrigger>
        </TabsList>
        
        <form onSubmit={handleSubmit}>
          <TabsContent value="basic" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Flight Details</CardTitle>
                <CardDescription>
                  Enter the basic information about your flight
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="date">Flight Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formState.date}
                      onChange={(e) => handleInputChange('date', e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="aircraft">Aircraft</Label>
                    <Select
                      id="aircraft"
                      options={aircraftOptions}
                      value={formState.aircraft}
                      onChange={(value) => handleInputChange('aircraft', value)}
                      styles={customStyles}
                      isClearable
                      isSearchable
                      placeholder="Select or enter aircraft..."
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="takeoff-time">Takeoff Time</Label>
                    <Input
                      id="takeoff-time"
                      type="time"
                      value={formState.takeoffTime}
                      onChange={(e) => handleInputChange('takeoffTime', e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="landing-time">Landing Time</Label>
                    <Input
                      id="landing-time"
                      type="time"
                      value={formState.landingTime}
                      onChange={(e) => handleInputChange('landingTime', e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="departure-airport">Departure Airport</Label>
                    <Select
                      id="departure-airport"
                      options={airportOptions}
                      value={formState.departureAirport}
                      onChange={(value) => handleInputChange('departureAirport', value)}
                      styles={customStyles}
                      isClearable
                      isSearchable
                      placeholder="Select or enter airport..."
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="destination-airport">Destination Airport</Label>
                    <Select
                      id="destination-airport"
                      options={airportOptions}
                      value={formState.destinationAirport}
                      onChange={(value) => handleInputChange('destinationAirport', value)}
                      styles={customStyles}
                      isClearable
                      isSearchable
                      placeholder="Select or enter airport..."
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="flight-type">Flight Type</Label>
                    <Select
                      id="flight-type"
                      options={flightTypeOptions}
                      value={formState.flightType}
                      onChange={(value) => handleInputChange('flightType', value)}
                      styles={customStyles}
                      isClearable
                      isSearchable
                      placeholder="Select flight type..."
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="pilot-function">Pilot Function</Label>
                    <Select
                      id="pilot-function"
                      options={pilotFunctionOptions}
                      value={formState.pilotFunction}
                      onChange={(value) => handleInputChange('pilotFunction', value)}
                      styles={customStyles}
                      isClearable
                      isSearchable
                      placeholder="Select pilot function..."
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="takeoffs-day">Day Takeoffs</Label>
                    <Input
                      id="takeoffs-day"
                      type="number"
                      min="0"
                      value={formState.takeoffDay}
                      onChange={(e) => handleInputChange('takeoffDay', parseInt(e.target.value) || 0)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="takeoffs-night">Night Takeoffs</Label>
                    <Input
                      id="takeoffs-night"
                      type="number"
                      min="0"
                      value={formState.takeoffNight}
                      onChange={(e) => handleInputChange('takeoffNight', parseInt(e.target.value) || 0)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="landings-day">Day Landings</Label>
                    <Input
                      id="landings-day"
                      type="number"
                      min="0"
                      value={formState.landingDay}
                      onChange={(e) => handleInputChange('landingDay', parseInt(e.target.value) || 0)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="landings-night">Night Landings</Label>
                    <Input
                      id="landings-night"
                      type="number"
                      min="0"
                      value={formState.landingNight}
                      onChange={(e) => handleInputChange('landingNight', parseInt(e.target.value) || 0)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Calculated Values</CardTitle>
                <CardDescription>
                  Automatically calculated based on your inputs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <Label className="text-muted-foreground">Total Flight Time</Label>
                    <div className="text-2xl font-bold mt-1">{calculatedTime.totalTime}</div>
                  </div>
                  
                  <div>
                    <Label className="text-muted-foreground">Total Takeoffs</Label>
                    <div className="text-2xl font-bold mt-1">
                      {(formState.takeoffDay || 0) + (formState.takeoffNight || 0)}
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-muted-foreground">Total Landings</Label>
                    <div className="text-2xl font-bold mt-1">
                      {(formState.landingDay || 0) + (formState.landingNight || 0)}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full md:w-auto">Log Flight</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="advanced" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Advanced Flight Details</CardTitle>
                <CardDescription>
                  Enter additional details about your flight
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center py-8">
                <p>Advanced flight logging features available in the Premium plan.</p>
                <Button variant="outline" className="mt-4">Upgrade to Premium</Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="custom" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Custom Fields</CardTitle>
                <CardDescription>
                  Add and configure custom fields for your logbook
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center py-8">
                <p>Custom field configuration available in the Premium plan.</p>
                <Button variant="outline" className="mt-4">Upgrade to Premium</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </form>
      </Tabs>
    </div>
  );
}
