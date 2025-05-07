
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Check } from "lucide-react";
import Select from "react-select";
import { Link } from "react-router-dom";

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

// Default field configuration if none is found
const defaultFieldsConfig = [
  { id: "date", name: "Flight Date", required: true, enabled: true, section: "basic" },
  { id: "aircraft", name: "Aircraft", required: true, enabled: true, section: "basic" },
  { id: "takeoffTime", name: "Takeoff Time", required: true, enabled: true, section: "basic" },
  { id: "landingTime", name: "Landing Time", required: true, enabled: true, section: "basic" },
  { id: "departureAirport", name: "Departure Airport", required: true, enabled: true, section: "basic" },
  { id: "destinationAirport", name: "Destination Airport", required: true, enabled: true, section: "basic" },
  { id: "flightType", name: "Flight Type", required: true, enabled: true, section: "basic" },
  { id: "pilotFunction", name: "Pilot Function", required: true, enabled: true, section: "basic" },
  { id: "takeoffDay", name: "Day Takeoffs", required: false, enabled: true, section: "takeoffsLandings" },
  { id: "takeoffNight", name: "Night Takeoffs", required: false, enabled: true, section: "takeoffsLandings" },
  { id: "landingDay", name: "Day Landings", required: false, enabled: true, section: "takeoffsLandings" },
  { id: "landingNight", name: "Night Landings", required: false, enabled: true, section: "takeoffsLandings" },
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
    instrumentTime: 0,
    crossCountryTime: 0,
    nightTime: 0,
    remarks: "",
  });
  
  const [calculatedTime, setCalculatedTime] = useState({
    totalTime: "0.0",
  });
  
  const [fieldsConfig, setFieldsConfig] = useState(() => {
    // Try to get saved configuration from localStorage
    const savedConfig = localStorage.getItem("fieldsConfig");
    return savedConfig ? JSON.parse(savedConfig) : defaultFieldsConfig;
  });
  
  const [isPremium, setIsPremium] = useState(false);
  
  useEffect(() => {
    // Check premium status from localStorage
    const premium = localStorage.getItem("isPremium") === "true";
    setIsPremium(premium);
    
    // Reload fields config when component mounts
    const savedConfig = localStorage.getItem("fieldsConfig");
    if (savedConfig) {
      setFieldsConfig(JSON.parse(savedConfig));
    }
  }, []);
  
  // Get field configuration for a specific field
  const getFieldConfig = (fieldId) => {
    const config = fieldsConfig.find(field => field.id === fieldId);
    return config || { required: false, enabled: true };
  };
  
  // Enhanced React Select styles with light/dark mode support
  const selectStyles = {
    control: (base, state) => ({
      ...base,
      background: 'var(--background)',
      borderColor: state.isFocused ? 'var(--ring)' : 'var(--border)',
      borderRadius: 'var(--radius)',
      boxShadow: state.isFocused ? `0 0 0 1px var(--ring)` : 'none',
      '&:hover': {
        borderColor: state.isFocused ? 'var(--ring)' : 'var(--border)',
      },
      padding: '1px',
    }),
    menu: (base) => ({
      ...base,
      background: 'var(--popover)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius)',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
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
      ':active': {
        backgroundColor: !isSelected ? 'var(--accent)' : undefined,
      },
    }),
    multiValue: (base) => ({
      ...base,
      backgroundColor: 'var(--accent)',
      borderRadius: 'calc(var(--radius) - 2px)',
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: 'var(--accent-foreground)',
      fontSize: '0.875rem',
    }),
    multiValueRemove: (base) => ({
      ...base,
      color: 'var(--accent-foreground)',
      ':hover': {
        backgroundColor: 'var(--primary)',
        color: 'var(--primary-foreground)',
      },
    }),
    placeholder: (base) => ({
      ...base,
      color: 'var(--muted-foreground)',
    }),
    singleValue: (base) => ({
      ...base,
      color: 'var(--foreground)',
    }),
    input: (base) => ({
      ...base,
      color: 'var(--foreground)',
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
    
    // Check required fields based on field configuration
    const missingRequiredFields = [];
    
    fieldsConfig.forEach(field => {
      if (field.required && field.enabled) {
        const value = formState[field.id];
        if (value === null || value === "" || (Array.isArray(value) && value.length === 0)) {
          missingRequiredFields.push(field.name);
        }
      }
    });
    
    if (missingRequiredFields.length > 0) {
      toast({
        title: "Missing required fields",
        description: `Please fill in: ${missingRequiredFields.join(", ")}`,
        variant: "destructive",
      });
      return;
    }
    
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
      instrumentTime: 0,
      crossCountryTime: 0,
      nightTime: 0,
      remarks: "",
    });
    
    setCalculatedTime({ totalTime: "0.0" });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Log a Flight</h1>
          <p className="text-muted-foreground">
            Add a new flight to your logbook
          </p>
        </div>
        
        {isPremium && (
          <Button variant="outline" asChild size="sm" className="self-start">
            <Link to="/dashboard/field-config">
              <span className="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-settings"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                Configure Fields
              </span>
            </Link>
          </Button>
        )}
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
                  {getFieldConfig("date").enabled && (
                    <div className="space-y-2">
                      <Label htmlFor="date">
                        Flight Date
                        {getFieldConfig("date").required && <span className="text-destructive ml-1">*</span>}
                      </Label>
                      <Input
                        id="date"
                        type="date"
                        value={formState.date}
                        onChange={(e) => handleInputChange('date', e.target.value)}
                        required={getFieldConfig("date").required}
                      />
                    </div>
                  )}
                  
                  {getFieldConfig("aircraft").enabled && (
                    <div className="space-y-2">
                      <Label htmlFor="aircraft">
                        Aircraft
                        {getFieldConfig("aircraft").required && <span className="text-destructive ml-1">*</span>}
                      </Label>
                      <Select
                        id="aircraft"
                        options={aircraftOptions}
                        value={formState.aircraft}
                        onChange={(value) => handleInputChange('aircraft', value)}
                        styles={selectStyles}
                        isClearable
                        isSearchable
                        placeholder="Select or enter aircraft..."
                        className="react-select-container"
                        classNamePrefix="react-select"
                        required={getFieldConfig("aircraft").required}
                        isCreatable={true}
                      />
                    </div>
                  )}
                  
                  {getFieldConfig("takeoffTime").enabled && (
                    <div className="space-y-2">
                      <Label htmlFor="takeoff-time">
                        Takeoff Time
                        {getFieldConfig("takeoffTime").required && <span className="text-destructive ml-1">*</span>}
                      </Label>
                      <Input
                        id="takeoff-time"
                        type="time"
                        value={formState.takeoffTime}
                        onChange={(e) => handleInputChange('takeoffTime', e.target.value)}
                        required={getFieldConfig("takeoffTime").required}
                      />
                    </div>
                  )}
                  
                  {getFieldConfig("landingTime").enabled && (
                    <div className="space-y-2">
                      <Label htmlFor="landing-time">
                        Landing Time
                        {getFieldConfig("landingTime").required && <span className="text-destructive ml-1">*</span>}
                      </Label>
                      <Input
                        id="landing-time"
                        type="time"
                        value={formState.landingTime}
                        onChange={(e) => handleInputChange('landingTime', e.target.value)}
                        required={getFieldConfig("landingTime").required}
                      />
                    </div>
                  )}
                  
                  {getFieldConfig("departureAirport").enabled && (
                    <div className="space-y-2">
                      <Label htmlFor="departure-airport">
                        Departure Airport
                        {getFieldConfig("departureAirport").required && <span className="text-destructive ml-1">*</span>}
                      </Label>
                      <Select
                        id="departure-airport"
                        options={airportOptions}
                        value={formState.departureAirport}
                        onChange={(value) => handleInputChange('departureAirport', value)}
                        styles={selectStyles}
                        isClearable
                        isSearchable
                        placeholder="Select or enter airport..."
                        className="react-select-container"
                        classNamePrefix="react-select"
                        required={getFieldConfig("departureAirport").required}
                      />
                    </div>
                  )}
                  
                  {getFieldConfig("destinationAirport").enabled && (
                    <div className="space-y-2">
                      <Label htmlFor="destination-airport">
                        Destination Airport
                        {getFieldConfig("destinationAirport").required && <span className="text-destructive ml-1">*</span>}
                      </Label>
                      <Select
                        id="destination-airport"
                        options={airportOptions}
                        value={formState.destinationAirport}
                        onChange={(value) => handleInputChange('destinationAirport', value)}
                        styles={selectStyles}
                        isClearable
                        isSearchable
                        placeholder="Select or enter airport..."
                        className="react-select-container"
                        classNamePrefix="react-select"
                        required={getFieldConfig("destinationAirport").required}
                      />
                    </div>
                  )}
                  
                  {getFieldConfig("flightType").enabled && (
                    <div className="space-y-2">
                      <Label htmlFor="flight-type">
                        Flight Type
                        {getFieldConfig("flightType").required && <span className="text-destructive ml-1">*</span>}
                      </Label>
                      <Select
                        id="flight-type"
                        options={flightTypeOptions}
                        value={formState.flightType}
                        onChange={(value) => handleInputChange('flightType', value)}
                        styles={selectStyles}
                        isClearable
                        isSearchable
                        placeholder="Select flight type..."
                        className="react-select-container"
                        classNamePrefix="react-select"
                        required={getFieldConfig("flightType").required}
                      />
                    </div>
                  )}
                  
                  {getFieldConfig("pilotFunction").enabled && (
                    <div className="space-y-2">
                      <Label htmlFor="pilot-function">
                        Pilot Function
                        {getFieldConfig("pilotFunction").required && <span className="text-destructive ml-1">*</span>}
                      </Label>
                      <Select
                        id="pilot-function"
                        options={pilotFunctionOptions}
                        value={formState.pilotFunction}
                        onChange={(value) => handleInputChange('pilotFunction', value)}
                        styles={selectStyles}
                        isClearable
                        isSearchable
                        placeholder="Select pilot function..."
                        className="react-select-container"
                        classNamePrefix="react-select"
                        required={getFieldConfig("pilotFunction").required}
                      />
                    </div>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {getFieldConfig("takeoffDay").enabled && (
                    <div className="space-y-2">
                      <Label htmlFor="takeoffs-day">
                        Day Takeoffs
                        {getFieldConfig("takeoffDay").required && <span className="text-destructive ml-1">*</span>}
                      </Label>
                      <Input
                        id="takeoffs-day"
                        type="number"
                        min="0"
                        value={formState.takeoffDay}
                        onChange={(e) => handleInputChange('takeoffDay', parseInt(e.target.value) || 0)}
                        required={getFieldConfig("takeoffDay").required}
                      />
                    </div>
                  )}
                  
                  {getFieldConfig("takeoffNight").enabled && (
                    <div className="space-y-2">
                      <Label htmlFor="takeoffs-night">
                        Night Takeoffs
                        {getFieldConfig("takeoffNight").required && <span className="text-destructive ml-1">*</span>}
                      </Label>
                      <Input
                        id="takeoffs-night"
                        type="number"
                        min="0"
                        value={formState.takeoffNight}
                        onChange={(e) => handleInputChange('takeoffNight', parseInt(e.target.value) || 0)}
                        required={getFieldConfig("takeoffNight").required}
                      />
                    </div>
                  )}
                  
                  {getFieldConfig("landingDay").enabled && (
                    <div className="space-y-2">
                      <Label htmlFor="landings-day">
                        Day Landings
                        {getFieldConfig("landingDay").required && <span className="text-destructive ml-1">*</span>}
                      </Label>
                      <Input
                        id="landings-day"
                        type="number"
                        min="0"
                        value={formState.landingDay}
                        onChange={(e) => handleInputChange('landingDay', parseInt(e.target.value) || 0)}
                        required={getFieldConfig("landingDay").required}
                      />
                    </div>
                  )}
                  
                  {getFieldConfig("landingNight").enabled && (
                    <div className="space-y-2">
                      <Label htmlFor="landings-night">
                        Night Landings
                        {getFieldConfig("landingNight").required && <span className="text-destructive ml-1">*</span>}
                      </Label>
                      <Input
                        id="landings-night"
                        type="number"
                        min="0"
                        value={formState.landingNight}
                        onChange={(e) => handleInputChange('landingNight', parseInt(e.target.value) || 0)}
                        required={getFieldConfig("landingNight").required}
                      />
                    </div>
                  )}
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
              <CardContent className={`${!isPremium ? "text-center py-8" : "space-y-6"}`}>
                {!isPremium ? (
                  <>
                    <p>Advanced flight logging features available in the Premium plan.</p>
                    <Button variant="outline" className="mt-4" asChild>
                      <Link to="/checkout?plan=premium">Upgrade to Premium</Link>
                    </Button>
                  </>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="instrument-time">Instrument Time</Label>
                      <Input
                        id="instrument-time"
                        type="number"
                        min="0"
                        step="0.1"
                        value={formState.instrumentTime}
                        onChange={(e) => handleInputChange('instrumentTime', parseFloat(e.target.value) || 0)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="cross-country-time">Cross Country Time</Label>
                      <Input
                        id="cross-country-time"
                        type="number"
                        min="0"
                        step="0.1"
                        value={formState.crossCountryTime}
                        onChange={(e) => handleInputChange('crossCountryTime', parseFloat(e.target.value) || 0)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="night-time">Night Time</Label>
                      <Input
                        id="night-time"
                        type="number"
                        min="0"
                        step="0.1"
                        value={formState.nightTime}
                        onChange={(e) => handleInputChange('nightTime', parseFloat(e.target.value) || 0)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="remarks">Remarks</Label>
                      <textarea
                        id="remarks"
                        className="w-full min-h-[100px] p-2 border rounded-md bg-background text-foreground resize-y"
                        value={formState.remarks}
                        onChange={(e) => handleInputChange('remarks', e.target.value)}
                      />
                    </div>
                  </div>
                )}
              </CardContent>
              {isPremium && (
                <CardFooter>
                  <Button type="submit" className="w-full md:w-auto">Log Flight</Button>
                </CardFooter>
              )}
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
                {!isPremium ? (
                  <>
                    <p>Custom field configuration available in the Premium plan.</p>
                    <Button variant="outline" className="mt-4" asChild>
                      <Link to="/checkout?plan=premium">Upgrade to Premium</Link>
                    </Button>
                  </>
                ) : (
                  <>
                    <p>Configure your custom fields to tailor your logbook to your specific needs.</p>
                    <Button className="mt-4" asChild>
                      <Link to="/dashboard/field-config">Configure Fields</Link>
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </form>
      </Tabs>
    </div>
  );
}
