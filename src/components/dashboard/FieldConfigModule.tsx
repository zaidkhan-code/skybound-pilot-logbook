
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Link as RouterLink } from "react-router-dom"; // Fixed import

interface FieldConfig {
  id: string;
  name: string;
  label: string;
  required: boolean;
  visible: boolean;
}

export default function FieldConfigModule() {
  const [fields, setFields] = useState<FieldConfig[]>([]);
  const [isPremium, setIsPremium] = useState<boolean>(false);

  useEffect(() => {
    // Check if user is premium
    const userIsPremium = localStorage.getItem("isPremium") === "true";
    setIsPremium(userIsPremium);

    // Load field configurations
    const storedFields = localStorage.getItem("fieldConfig");
    if (storedFields) {
      setFields(JSON.parse(storedFields));
    } else {
      // Default field configurations
      const defaultFields = [
        { id: "flightDate", name: "flightDate", label: "Flight Date", required: true, visible: true },
        { id: "aircraftType", name: "aircraftType", label: "Aircraft Type", required: true, visible: true },
        { id: "aircraftReg", name: "aircraftReg", label: "Aircraft Registration", required: true, visible: true },
        { id: "takeoffTime", name: "takeoffTime", label: "Takeoff Time", required: true, visible: true },
        { id: "landingTime", name: "landingTime", label: "Landing Time", required: true, visible: true },
        { id: "departureAirport", name: "departureAirport", label: "Departure Airport", required: true, visible: true },
        { id: "destinationAirport", name: "destinationAirport", label: "Destination Airport", required: true, visible: true },
        { id: "dayTakeoffs", name: "dayTakeoffs", label: "Day Takeoffs", required: false, visible: true },
        { id: "nightTakeoffs", name: "nightTakeoffs", label: "Night Takeoffs", required: false, visible: true },
        { id: "dayLandings", name: "dayLandings", label: "Day Landings", required: false, visible: true },
        { id: "nightLandings", name: "nightLandings", label: "Night Landings", required: false, visible: true },
        { id: "flightType", name: "flightType", label: "Flight Type", required: true, visible: true },
        { id: "pilotFunction", name: "pilotFunction", label: "Pilot Function", required: true, visible: true },
        { id: "remarks", name: "remarks", label: "Remarks", required: false, visible: true },
      ];
      setFields(defaultFields);
      localStorage.setItem("fieldConfig", JSON.stringify(defaultFields));
    }
  }, []);

  const toggleRequired = (id: string) => {
    if (!isPremium) {
      toast.error("Premium subscription required to change field requirements");
      return;
    }

    const updatedFields = fields.map(field => {
      if (field.id === id) {
        return { ...field, required: !field.required };
      }
      return field;
    });
    
    setFields(updatedFields);
    localStorage.setItem("fieldConfig", JSON.stringify(updatedFields));
    toast.success("Field requirement updated");
  };

  const toggleVisibility = (id: string) => {
    if (!isPremium) {
      toast.error("Premium subscription required to hide fields");
      return;
    }

    const updatedFields = fields.map(field => {
      if (field.id === id) {
        return { ...field, visible: !field.visible };
      }
      return field;
    });
    
    setFields(updatedFields);
    localStorage.setItem("fieldConfig", JSON.stringify(updatedFields));
    toast.success("Field visibility updated");
  };

  const resetToDefaults = () => {
    const defaultFields = [
      { id: "flightDate", name: "flightDate", label: "Flight Date", required: true, visible: true },
      { id: "aircraftType", name: "aircraftType", label: "Aircraft Type", required: true, visible: true },
      { id: "aircraftReg", name: "aircraftReg", label: "Aircraft Registration", required: true, visible: true },
      { id: "takeoffTime", name: "takeoffTime", label: "Takeoff Time", required: true, visible: true },
      { id: "landingTime", name: "landingTime", label: "Landing Time", required: true, visible: true },
      { id: "departureAirport", name: "departureAirport", label: "Departure Airport", required: true, visible: true },
      { id: "destinationAirport", name: "destinationAirport", label: "Destination Airport", required: true, visible: true },
      { id: "dayTakeoffs", name: "dayTakeoffs", label: "Day Takeoffs", required: false, visible: true },
      { id: "nightTakeoffs", name: "nightTakeoffs", label: "Night Takeoffs", required: false, visible: true },
      { id: "dayLandings", name: "dayLandings", label: "Day Landings", required: false, visible: true },
      { id: "nightLandings", name: "nightLandings", label: "Night Landings", required: false, visible: true },
      { id: "flightType", name: "flightType", label: "Flight Type", required: true, visible: true },
      { id: "pilotFunction", name: "pilotFunction", label: "Pilot Function", required: true, visible: true },
      { id: "remarks", name: "remarks", label: "Remarks", required: false, visible: true },
    ];
    
    setFields(defaultFields);
    localStorage.setItem("fieldConfig", JSON.stringify(defaultFields));
    toast.success("Reset to default settings");
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Flight Logging Field Configuration</CardTitle>
        <CardDescription>
          Customize which fields are visible and required when logging flights
        </CardDescription>
        {!isPremium && (
          <div className="mt-2 p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-md text-amber-800 dark:text-amber-300">
            <p className="text-sm flex items-center gap-2">
              <span className="font-medium">Premium Feature</span> - Some customizations are limited in the free version. 
              <RouterLink to="/checkout" className="text-primary hover:underline">
                Upgrade to Premium
              </RouterLink>
            </p>
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-12 gap-4 font-medium text-sm text-muted-foreground border-b pb-2">
            <div className="col-span-5">Field Name</div>
            <div className="col-span-3 text-center">Required</div>
            <div className="col-span-3 text-center">Visible</div>
            <div className="col-span-1"></div>
          </div>
          
          {fields.map(field => (
            <div key={field.id} className="grid grid-cols-12 gap-4 items-center py-2 border-b border-border/50 last:border-0">
              <div className="col-span-5">
                <Label htmlFor={field.id}>{field.label}</Label>
              </div>
              <div className="col-span-3 flex justify-center">
                <Switch
                  id={`${field.id}-required`}
                  checked={field.required}
                  onCheckedChange={() => toggleRequired(field.id)}
                  disabled={!isPremium}
                />
              </div>
              <div className="col-span-3 flex justify-center">
                <Switch
                  id={`${field.id}-visible`}
                  checked={field.visible}
                  onCheckedChange={() => toggleVisibility(field.id)}
                  disabled={!isPremium}
                />
              </div>
              <div className="col-span-1"></div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={resetToDefaults}>
          Reset to Defaults
        </Button>
        <Button>Save Configuration</Button>
      </CardFooter>
    </Card>
  );
}
