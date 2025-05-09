
// Import needed libraries and components
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import Select from "react-select";
import CreatableSelect from "react-select/creatable"; // Import CreatableSelect

// Define types for form data
interface Flight {
  id: string;
  flightDate: string;
  aircraftType: string;
  aircraftReg: string;
  takeoffTime: string;
  landingTime: string;
  departureAirport: string;
  destinationAirport: string;
  dayTakeoffs: number;
  nightTakeoffs: number;
  dayLandings: number;
  nightLandings: number;
  flightType: string;
  pilotFunction: string;
  remarks: string;
  totalTime: string;
  createdAt: string;
}

interface FieldConfig {
  id: string;
  name: string;
  label: string;
  required: boolean;
  visible: boolean;
}

export default function LogFlightForm() {
  // State for form data
  const [flight, setFlight] = useState<Partial<Flight>>({
    flightDate: new Date().toISOString().substring(0, 10),
    aircraftType: "",
    aircraftReg: "",
    takeoffTime: "",
    landingTime: "",
    departureAirport: "",
    destinationAirport: "",
    dayTakeoffs: 1,
    nightTakeoffs: 0,
    dayLandings: 1,
    nightLandings: 0,
    flightType: "",
    pilotFunction: "",
    remarks: "",
    totalTime: "00:00",
  });

  // State for field configuration
  const [fieldConfig, setFieldConfig] = useState<FieldConfig[]>([]);

  // State for aircraft and airport options
  const [aircraftOptions, setAircraftOptions] = useState<
    { value: string; label: string }[]
  >([]);
  const [airportOptions, setAirportOptions] = useState<
    { value: string; label: string }[]
  >([]);

  // State for flight type and pilot function options
  const flightTypeOptions = [
    { value: "VFR", label: "VFR" },
    { value: "IFR", label: "IFR" },
    { value: "Training", label: "Training" },
    { value: "Commercial", label: "Commercial" },
    { value: "Ferry", label: "Ferry" },
    { value: "Test", label: "Test" },
  ];

  const pilotFunctionOptions = [
    { value: "Captain", label: "Captain" },
    { value: "Co-Pilot", label: "Co-Pilot" },
    { value: "Instructor", label: "Instructor" },
    { value: "Student", label: "Student" },
    { value: "Examiner", label: "Examiner" },
    { value: "Observer", label: "Observer" },
  ];

  // Load field configuration and aircraft/airport data
  useEffect(() => {
    // Load field configuration
    const storedFields = localStorage.getItem("fieldConfig");
    if (storedFields) {
      setFieldConfig(JSON.parse(storedFields));
    } else {
      const defaultFields = [
        {
          id: "flightDate",
          name: "flightDate",
          label: "Flight Date",
          required: true,
          visible: true,
        },
        {
          id: "aircraftType",
          name: "aircraftType",
          label: "Aircraft Type",
          required: true,
          visible: true,
        },
        {
          id: "aircraftReg",
          name: "aircraftReg",
          label: "Aircraft Registration",
          required: true,
          visible: true,
        },
        {
          id: "takeoffTime",
          name: "takeoffTime",
          label: "Takeoff Time",
          required: true,
          visible: true,
        },
        {
          id: "landingTime",
          name: "landingTime",
          label: "Landing Time",
          required: true,
          visible: true,
        },
        {
          id: "departureAirport",
          name: "departureAirport",
          label: "Departure Airport",
          required: true,
          visible: true,
        },
        {
          id: "destinationAirport",
          name: "destinationAirport",
          label: "Destination Airport",
          required: true,
          visible: true,
        },
        {
          id: "dayTakeoffs",
          name: "dayTakeoffs",
          label: "Day Takeoffs",
          required: false,
          visible: true,
        },
        {
          id: "nightTakeoffs",
          name: "nightTakeoffs",
          label: "Night Takeoffs",
          required: false,
          visible: true,
        },
        {
          id: "dayLandings",
          name: "dayLandings",
          label: "Day Landings",
          required: false,
          visible: true,
        },
        {
          id: "nightLandings",
          name: "nightLandings",
          label: "Night Landings",
          required: false,
          visible: true,
        },
        {
          id: "flightType",
          name: "flightType",
          label: "Flight Type",
          required: true,
          visible: true,
        },
        {
          id: "pilotFunction",
          name: "pilotFunction",
          label: "Pilot Function",
          required: true,
          visible: true,
        },
        {
          id: "remarks",
          name: "remarks",
          label: "Remarks",
          required: false,
          visible: true,
        },
      ];
      setFieldConfig(defaultFields);
      localStorage.setItem("fieldConfig", JSON.stringify(defaultFields));
    }

    // Load aircraft data
    const storedAircraft = localStorage.getItem("aircraftData");
    if (storedAircraft) {
      const parsedAircraft = JSON.parse(storedAircraft);
      setAircraftOptions(
        parsedAircraft.map((a: string) => ({ value: a, label: a }))
      );
    } else {
      const defaultAircraft = [
        "Cessna 152",
        "Cessna 172",
        "Piper PA-28",
        "Cirrus SR22",
        "Diamond DA40",
      ];
      setAircraftOptions(
        defaultAircraft.map((a) => ({ value: a, label: a }))
      );
      localStorage.setItem("aircraftData", JSON.stringify(defaultAircraft));
    }

    // Load airport data
    const storedAirports = localStorage.getItem("airportData");
    if (storedAirports) {
      const parsedAirports = JSON.parse(storedAirports);
      setAirportOptions(
        parsedAirports.map((a: string) => ({ value: a, label: a }))
      );
    } else {
      const defaultAirports = [
        "KJFK - John F. Kennedy Intl",
        "KLAX - Los Angeles Intl",
        "KORD - O'Hare Intl",
        "KDFW - Dallas/Fort Worth Intl",
        "KATL - Hartsfield-Jackson Atlanta Intl",
        "EGLL - London Heathrow",
        "LFPG - Paris Charles de Gaulle",
      ];
      setAirportOptions(
        defaultAirports.map((a) => ({ value: a, label: a }))
      );
      localStorage.setItem("airportData", JSON.stringify(defaultAirports));
    }
  }, []);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFlight({ ...flight, [name]: value });
    
    if (name === "takeoffTime" || name === "landingTime") {
      calculateTotalTime();
    }
  };

  // Handle select change
  const handleSelectChange = (
    value: any,
    actionMeta: { name?: string }
  ) => {
    if (actionMeta.name) {
      setFlight({ ...flight, [actionMeta.name]: value.value });
    }
  };

  // Calculate total flight time
  const calculateTotalTime = () => {
    if (flight.takeoffTime && flight.landingTime) {
      const takeoff = new Date(`2000-01-01T${flight.takeoffTime}`);
      const landing = new Date(`2000-01-01T${flight.landingTime}`);

      // Handle overnight flights (landing time < takeoff time)
      let diffMs = landing.getTime() - takeoff.getTime();
      if (diffMs < 0) {
        diffMs += 24 * 60 * 60 * 1000; // Add one day in milliseconds
      }

      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      
      const totalTime = `${String(diffHours).padStart(2, "0")}:${String(diffMins).padStart(2, "0")}`;
      
      setFlight({ ...flight, totalTime });
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    let isValid = true;
    const errors: string[] = [];

    fieldConfig.forEach(field => {
      if (field.required && field.visible) {
        const value = flight[field.name as keyof typeof flight];
        if (!value && value !== 0) {
          isValid = false;
          errors.push(`${field.label} is required`);
        }
      }
    });

    if (!isValid) {
      toast.error(`Please fill all required fields: ${errors.join(", ")}`);
      return;
    }

    // Add flight to localStorage
    const flights = JSON.parse(localStorage.getItem("flights") || "[]");
    
    // Create new flight with ID and timestamp
    const newFlight = {
      ...flight,
      id: `flight-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    
    flights.push(newFlight);
    localStorage.setItem("flights", JSON.stringify(flights));
    
    // Clear form and show success message
    toast.success("Flight logged successfully");
    
    // Update aircraft and airport options if new values were added
    const aircraftType = flight.aircraftType;
    const departureAirport = flight.departureAirport;
    const destinationAirport = flight.destinationAirport;
    
    if (aircraftType && !aircraftOptions.find(a => a.value === aircraftType)) {
      const updatedAircraft = [...aircraftOptions.map(a => a.value), aircraftType];
      localStorage.setItem("aircraftData", JSON.stringify(updatedAircraft));
      setAircraftOptions(updatedAircraft.map(a => ({ value: a, label: a })));
    }
    
    if (departureAirport && !airportOptions.find(a => a.value === departureAirport)) {
      const updatedAirports = [...airportOptions.map(a => a.value), departureAirport];
      localStorage.setItem("airportData", JSON.stringify(updatedAirports));
      setAirportOptions(updatedAirports.map(a => ({ value: a, label: a })));
    }
    
    if (destinationAirport && !airportOptions.find(a => a.value === destinationAirport)) {
      const updatedAirports = [...airportOptions.map(a => a.value), destinationAirport];
      localStorage.setItem("airportData", JSON.stringify(updatedAirports));
      setAirportOptions(updatedAirports.map(a => ({ value: a, label: a })));
    }
    
    // Reset form to defaults
    setFlight({
      flightDate: new Date().toISOString().substring(0, 10),
      aircraftType: "",
      aircraftReg: "",
      takeoffTime: "",
      landingTime: "",
      departureAirport: "",
      destinationAirport: "",
      dayTakeoffs: 1,
      nightTakeoffs: 0,
      dayLandings: 1,
      nightLandings: 0,
      flightType: "",
      pilotFunction: "",
      remarks: "",
      totalTime: "00:00",
    });
  };

  // Custom styles for react-select
  const selectStyles = {
    control: (base: any, state: any) => ({
      ...base,
      backgroundColor: 'var(--background)',
      borderColor: state.isFocused ? 'var(--primary)' : 'var(--border)',
      boxShadow: state.isFocused ? '0 0 0 1px var(--primary)' : 'none',
      '&:hover': {
        borderColor: 'var(--primary)',
      },
      borderRadius: 'var(--radius)',
    }),
    menu: (base: any) => ({
      ...base,
      backgroundColor: 'var(--background)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius)',
      boxShadow: '0 4px 25px -3px rgba(0, 0, 0, 0.15)',
      zIndex: 999,
    }),
    option: (base: any, { isFocused, isSelected }: { isFocused: boolean; isSelected: boolean }) => ({
      ...base,
      backgroundColor: isSelected 
        ? 'var(--primary)' 
        : isFocused 
          ? 'var(--accent)' 
          : 'var(--background)',
      color: isSelected 
        ? 'var(--primary-foreground)' 
        : isFocused 
          ? 'var(--accent-foreground)' 
          : 'var(--foreground)',
      '&:active': {
        backgroundColor: 'var(--accent)',
      },
    }),
    placeholder: (base: any) => ({
      ...base,
      color: 'var(--muted-foreground)',
    }),
    singleValue: (base: any) => ({
      ...base,
      color: 'var(--foreground)',
    }),
    input: (base: any) => ({
      ...base,
      color: 'var(--foreground)',
    }),
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Log a Flight</CardTitle>
          <CardDescription>
            Enter the details of your flight. Required fields are marked with an
            asterisk (*).
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Flight Date */}
          {fieldConfig.find(field => field.name === "flightDate")?.visible && (
            <div className="space-y-2">
              <Label htmlFor="flightDate">
                Flight Date
                {fieldConfig.find(field => field.name === "flightDate")?.required && (
                  <span className="text-destructive"> *</span>
                )}
              </Label>
              <Input
                type="date"
                id="flightDate"
                name="flightDate"
                value={flight.flightDate}
                onChange={handleInputChange}
                required={fieldConfig.find(field => field.name === "flightDate")?.required}
              />
            </div>
          )}

          {/* Aircraft Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Aircraft Type */}
            {fieldConfig.find(field => field.name === "aircraftType")?.visible && (
              <div className="space-y-2">
                <Label htmlFor="aircraftType">
                  Aircraft Type
                  {fieldConfig.find(field => field.name === "aircraftType")?.required && (
                    <span className="text-destructive"> *</span>
                  )}
                </Label>
                <CreatableSelect
                  id="aircraftType"
                  options={aircraftOptions}
                  value={flight.aircraftType ? { value: flight.aircraftType, label: flight.aircraftType } : null}
                  onChange={(value) => handleSelectChange(value, { name: "aircraftType" })}
                  styles={selectStyles}
                  placeholder="Select or type aircraft type..."
                  formatCreateLabel={(inputValue) => `Add "${inputValue}"`}
                  className="react-select-container"
                  classNamePrefix="react-select"
                  required={fieldConfig.find(field => field.name === "aircraftType")?.required}
                />
              </div>
            )}

            {/* Aircraft Registration */}
            {fieldConfig.find(field => field.name === "aircraftReg")?.visible && (
              <div className="space-y-2">
                <Label htmlFor="aircraftReg">
                  Aircraft Registration
                  {fieldConfig.find(field => field.name === "aircraftReg")?.required && (
                    <span className="text-destructive"> *</span>
                  )}
                </Label>
                <Input
                  type="text"
                  id="aircraftReg"
                  name="aircraftReg"
                  placeholder="N12345"
                  value={flight.aircraftReg}
                  onChange={handleInputChange}
                  required={fieldConfig.find(field => field.name === "aircraftReg")?.required}
                />
              </div>
            )}
          </div>

          {/* Flight Times */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Takeoff Time */}
            {fieldConfig.find(field => field.name === "takeoffTime")?.visible && (
              <div className="space-y-2">
                <Label htmlFor="takeoffTime">
                  Takeoff Time
                  {fieldConfig.find(field => field.name === "takeoffTime")?.required && (
                    <span className="text-destructive"> *</span>
                  )}
                </Label>
                <Input
                  type="time"
                  id="takeoffTime"
                  name="takeoffTime"
                  value={flight.takeoffTime}
                  onChange={handleInputChange}
                  required={fieldConfig.find(field => field.name === "takeoffTime")?.required}
                />
              </div>
            )}

            {/* Landing Time */}
            {fieldConfig.find(field => field.name === "landingTime")?.visible && (
              <div className="space-y-2">
                <Label htmlFor="landingTime">
                  Landing Time
                  {fieldConfig.find(field => field.name === "landingTime")?.required && (
                    <span className="text-destructive"> *</span>
                  )}
                </Label>
                <Input
                  type="time"
                  id="landingTime"
                  name="landingTime"
                  value={flight.landingTime}
                  onChange={handleInputChange}
                  required={fieldConfig.find(field => field.name === "landingTime")?.required}
                />
              </div>
            )}
          </div>

          {/* Total Time (Calculated) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="totalTime">Total Flight Time</Label>
              <Input
                type="text"
                id="totalTime"
                name="totalTime"
                value={flight.totalTime}
                disabled
                className="bg-muted"
              />
            </div>
          </div>

          {/* Airports */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Departure Airport */}
            {fieldConfig.find(field => field.name === "departureAirport")?.visible && (
              <div className="space-y-2">
                <Label htmlFor="departureAirport">
                  Departure Airport
                  {fieldConfig.find(field => field.name === "departureAirport")?.required && (
                    <span className="text-destructive"> *</span>
                  )}
                </Label>
                <CreatableSelect
                  id="departureAirport"
                  options={airportOptions}
                  value={flight.departureAirport ? { value: flight.departureAirport, label: flight.departureAirport } : null}
                  onChange={(value) => handleSelectChange(value, { name: "departureAirport" })}
                  styles={selectStyles}
                  placeholder="Select or type departure airport..."
                  formatCreateLabel={(inputValue) => `Add "${inputValue}"`}
                  className="react-select-container"
                  classNamePrefix="react-select"
                  required={fieldConfig.find(field => field.name === "departureAirport")?.required}
                />
              </div>
            )}

            {/* Destination Airport */}
            {fieldConfig.find(field => field.name === "destinationAirport")?.visible && (
              <div className="space-y-2">
                <Label htmlFor="destinationAirport">
                  Destination Airport
                  {fieldConfig.find(field => field.name === "destinationAirport")?.required && (
                    <span className="text-destructive"> *</span>
                  )}
                </Label>
                <CreatableSelect
                  id="destinationAirport"
                  options={airportOptions}
                  value={flight.destinationAirport ? { value: flight.destinationAirport, label: flight.destinationAirport } : null}
                  onChange={(value) => handleSelectChange(value, { name: "destinationAirport" })}
                  styles={selectStyles}
                  placeholder="Select or type destination airport..."
                  formatCreateLabel={(inputValue) => `Add "${inputValue}"`}
                  className="react-select-container"
                  classNamePrefix="react-select"
                  required={fieldConfig.find(field => field.name === "destinationAirport")?.required}
                />
              </div>
            )}
          </div>

          {/* Takeoffs and Landings */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Day Takeoffs */}
            {fieldConfig.find(field => field.name === "dayTakeoffs")?.visible && (
              <div className="space-y-2">
                <Label htmlFor="dayTakeoffs">
                  Day Takeoffs
                  {fieldConfig.find(field => field.name === "dayTakeoffs")?.required && (
                    <span className="text-destructive"> *</span>
                  )}
                </Label>
                <Input
                  type="number"
                  id="dayTakeoffs"
                  name="dayTakeoffs"
                  value={flight.dayTakeoffs}
                  onChange={handleInputChange}
                  min="0"
                  required={fieldConfig.find(field => field.name === "dayTakeoffs")?.required}
                />
              </div>
            )}

            {/* Night Takeoffs */}
            {fieldConfig.find(field => field.name === "nightTakeoffs")?.visible && (
              <div className="space-y-2">
                <Label htmlFor="nightTakeoffs">
                  Night Takeoffs
                  {fieldConfig.find(field => field.name === "nightTakeoffs")?.required && (
                    <span className="text-destructive"> *</span>
                  )}
                </Label>
                <Input
                  type="number"
                  id="nightTakeoffs"
                  name="nightTakeoffs"
                  value={flight.nightTakeoffs}
                  onChange={handleInputChange}
                  min="0"
                  required={fieldConfig.find(field => field.name === "nightTakeoffs")?.required}
                />
              </div>
            )}

            {/* Day Landings */}
            {fieldConfig.find(field => field.name === "dayLandings")?.visible && (
              <div className="space-y-2">
                <Label htmlFor="dayLandings">
                  Day Landings
                  {fieldConfig.find(field => field.name === "dayLandings")?.required && (
                    <span className="text-destructive"> *</span>
                  )}
                </Label>
                <Input
                  type="number"
                  id="dayLandings"
                  name="dayLandings"
                  value={flight.dayLandings}
                  onChange={handleInputChange}
                  min="0"
                  required={fieldConfig.find(field => field.name === "dayLandings")?.required}
                />
              </div>
            )}

            {/* Night Landings */}
            {fieldConfig.find(field => field.name === "nightLandings")?.visible && (
              <div className="space-y-2">
                <Label htmlFor="nightLandings">
                  Night Landings
                  {fieldConfig.find(field => field.name === "nightLandings")?.required && (
                    <span className="text-destructive"> *</span>
                  )}
                </Label>
                <Input
                  type="number"
                  id="nightLandings"
                  name="nightLandings"
                  value={flight.nightLandings}
                  onChange={handleInputChange}
                  min="0"
                  required={fieldConfig.find(field => field.name === "nightLandings")?.required}
                />
              </div>
            )}
          </div>

          {/* Flight Type and Pilot Function */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Flight Type */}
            {fieldConfig.find(field => field.name === "flightType")?.visible && (
              <div className="space-y-2">
                <Label htmlFor="flightType">
                  Flight Type
                  {fieldConfig.find(field => field.name === "flightType")?.required && (
                    <span className="text-destructive"> *</span>
                  )}
                </Label>
                <Select
                  id="flightType"
                  options={flightTypeOptions}
                  value={flight.flightType ? { value: flight.flightType, label: flight.flightType } : null}
                  onChange={(value) => handleSelectChange(value, { name: "flightType" })}
                  styles={selectStyles}
                  placeholder="Select flight type..."
                  className="react-select-container"
                  classNamePrefix="react-select"
                  required={fieldConfig.find(field => field.name === "flightType")?.required}
                />
              </div>
            )}

            {/* Pilot Function */}
            {fieldConfig.find(field => field.name === "pilotFunction")?.visible && (
              <div className="space-y-2">
                <Label htmlFor="pilotFunction">
                  Pilot Function
                  {fieldConfig.find(field => field.name === "pilotFunction")?.required && (
                    <span className="text-destructive"> *</span>
                  )}
                </Label>
                <Select
                  id="pilotFunction"
                  options={pilotFunctionOptions}
                  value={flight.pilotFunction ? { value: flight.pilotFunction, label: flight.pilotFunction } : null}
                  onChange={(value) => handleSelectChange(value, { name: "pilotFunction" })}
                  styles={selectStyles}
                  placeholder="Select pilot function..."
                  className="react-select-container"
                  classNamePrefix="react-select"
                  required={fieldConfig.find(field => field.name === "pilotFunction")?.required}
                />
              </div>
            )}
          </div>

          {/* Remarks */}
          {fieldConfig.find(field => field.name === "remarks")?.visible && (
            <div className="space-y-2">
              <Label htmlFor="remarks">
                Remarks
                {fieldConfig.find(field => field.name === "remarks")?.required && (
                  <span className="text-destructive"> *</span>
                )}
              </Label>
              <Textarea
                id="remarks"
                name="remarks"
                placeholder="Additional notes, passenger info, etc."
                value={flight.remarks}
                onChange={handleInputChange}
                required={fieldConfig.find(field => field.name === "remarks")?.required}
              />
            </div>
          )}
        </CardContent>
        
        <CardFooter className="flex justify-between">
          <Button type="reset" variant="outline">
            Clear
          </Button>
          <Button type="submit">Log Flight</Button>
        </CardFooter>
      </Card>
    </form>
  );
}
