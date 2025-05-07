
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Check } from "lucide-react";

// Default field configuration
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
  { id: "instrumentTime", name: "Instrument Time", required: false, enabled: true, section: "advanced" },
  { id: "crossCountryTime", name: "Cross Country Time", required: false, enabled: true, section: "advanced" },
  { id: "nightTime", name: "Night Time", required: false, enabled: true, section: "advanced" },
  { id: "remarks", name: "Remarks", required: false, enabled: true, section: "advanced" },
];

export default function FieldConfigModule() {
  const { toast } = useToast();
  const [fieldsConfig, setFieldsConfig] = useState(() => {
    // Try to get saved configuration from localStorage
    const savedConfig = localStorage.getItem("fieldsConfig");
    return savedConfig ? JSON.parse(savedConfig) : defaultFieldsConfig;
  });
  
  const [activeSection, setActiveSection] = useState("basic");
  const [isPremium, setIsPremium] = useState(() => localStorage.getItem("isPremium") === "true");
  
  // Group fields by section
  const sections = {
    basic: fieldsConfig.filter((field) => field.section === "basic"),
    takeoffsLandings: fieldsConfig.filter((field) => field.section === "takeoffsLandings"),
    advanced: fieldsConfig.filter((field) => field.section === "advanced"),
  };
  
  const handleToggleRequired = (fieldId: string) => {
    if (!isPremium) {
      toast({
        title: "Premium Feature",
        description: "Field configuration is only available in the premium plan.",
        variant: "destructive",
      });
      return;
    }
    
    setFieldsConfig((prevConfig) => {
      const newConfig = prevConfig.map((field) => {
        if (field.id === fieldId) {
          return { ...field, required: !field.required };
        }
        return field;
      });
      
      // Save to localStorage
      localStorage.setItem("fieldsConfig", JSON.stringify(newConfig));
      return newConfig;
    });
  };
  
  const handleToggleEnabled = (fieldId: string) => {
    if (!isPremium) {
      toast({
        title: "Premium Feature",
        description: "Field configuration is only available in the premium plan.",
        variant: "destructive",
      });
      return;
    }
    
    setFieldsConfig((prevConfig) => {
      const newConfig = prevConfig.map((field) => {
        if (field.id === fieldId) {
          return { ...field, enabled: !field.enabled };
        }
        return field;
      });
      
      // Save to localStorage
      localStorage.setItem("fieldsConfig", JSON.stringify(newConfig));
      return newConfig;
    });
  };
  
  const handleSave = () => {
    localStorage.setItem("fieldsConfig", JSON.stringify(fieldsConfig));
    
    toast({
      title: "Configuration Saved",
      description: "Your field configuration has been updated.",
    });
  };
  
  const handleReset = () => {
    setFieldsConfig(defaultFieldsConfig);
    localStorage.setItem("fieldsConfig", JSON.stringify(defaultFieldsConfig));
    
    toast({
      title: "Configuration Reset",
      description: "Your field configuration has been reset to defaults.",
    });
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Field Configuration</h1>
        <p className="text-muted-foreground">
          Customize which fields appear in your flight logging form and whether they're required
        </p>
      </div>
      
      {!isPremium && (
        <Card className="border-primary/25 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="bg-primary text-primary-foreground px-2 py-1 rounded text-sm">Premium</span>
              <span>Field Configuration</span>
            </CardTitle>
            <CardDescription>
              Customize your flight logging experience by configuring which fields are visible and required
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>This feature is only available in the Premium plan. Upgrade now to access field customization.</p>
          </CardContent>
          <CardFooter>
            <Button asChild className="mr-2">
              <Link to="/checkout?plan=premium">Upgrade to Premium</Link>
            </Button>
            <Button variant="outline" onClick={() => {
              // Demo mode - Enable premium features temporarily
              setIsPremium(true);
              localStorage.setItem("isPremium", "true");
              toast({
                title: "Demo mode activated",
                description: "Premium features are now available for demonstration",
              });
            }}>
              Try Demo
            </Button>
          </CardFooter>
        </Card>
      )}
      
      <RadioGroup value={activeSection} onValueChange={setActiveSection} className="flex flex-wrap gap-2 mb-6">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="basic" id="basic" />
          <Label htmlFor="basic">Basic Fields</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="takeoffsLandings" id="takeoffsLandings" />
          <Label htmlFor="takeoffsLandings">Takeoffs & Landings</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="advanced" id="advanced" />
          <Label htmlFor="advanced">Advanced Fields</Label>
        </div>
      </RadioGroup>
      
      <Card>
        <CardHeader>
          <CardTitle>
            {activeSection === "basic" && "Basic Fields"}
            {activeSection === "takeoffsLandings" && "Takeoffs & Landings"}
            {activeSection === "advanced" && "Advanced Fields"}
          </CardTitle>
          <CardDescription>
            Configure which fields are required and visible in your flight logging form
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-12 gap-4 font-medium text-sm border-b pb-2">
              <div className="col-span-5">Field Name</div>
              <div className="col-span-3 text-center">Required</div>
              <div className="col-span-4 text-center">Visible</div>
            </div>
            
            {sections[activeSection as keyof typeof sections].map((field) => (
              <div key={field.id} className="grid grid-cols-12 gap-4 items-center py-2 border-b border-border/40 last:border-0">
                <div className="col-span-5">{field.name}</div>
                <div className="col-span-3 flex justify-center">
                  <Switch
                    checked={field.required}
                    onCheckedChange={() => handleToggleRequired(field.id)}
                    disabled={!field.enabled || !isPremium}
                  />
                </div>
                <div className="col-span-4 flex justify-center">
                  <Switch
                    checked={field.enabled}
                    onCheckedChange={() => handleToggleEnabled(field.id)}
                    disabled={!isPremium}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleReset} disabled={!isPremium}>
            Reset to Defaults
          </Button>
          <Button onClick={handleSave} disabled={!isPremium}>
            Save Configuration
          </Button>
        </CardFooter>
      </Card>
      
      {isPremium && (
        <Card className="bg-primary/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Tips for Field Configuration</CardTitle>
          </CardHeader>
          <CardContent className="text-sm">
            <ul className="space-y-2">
              <li className="flex gap-2">
                <Check className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                <span>Set fields as "Required" to ensure they must be filled in when logging a flight.</span>
              </li>
              <li className="flex gap-2">
                <Check className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                <span>Toggle "Visible" off to hide fields you don't use for a cleaner logging experience.</span>
              </li>
              <li className="flex gap-2">
                <Check className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                <span>Changes will be applied to all future flight logging forms.</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
