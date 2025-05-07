
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";

export default function ProfileModule() {
  const { toast } = useToast();
  const [personalInfo, setPersonalInfo] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Airport Way",
    city: "Aviationville",
    state: "CA",
    zip: "90001",
    country: "USA",
  });
  
  const [pilotInfo, setPilotInfo] = useState({
    license: "Commercial Pilot",
    licenseNumber: "CP123456",
    medicalClass: "1",
    medicalExpiry: "2023-12-31",
    ratings: "SEL, MEL, Instrument",
    restrictions: "None",
    homeAirport: "KPAO",
  });
  
  const handlePersonalInfoChange = (field, value) => {
    setPersonalInfo((prev) => ({ ...prev, [field]: value }));
  };
  
  const handlePilotInfoChange = (field, value) => {
    setPilotInfo((prev) => ({ ...prev, [field]: value }));
  };
  
  const handlePersonalInfoSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "Profile updated",
      description: "Your personal information has been saved.",
    });
  };
  
  const handlePilotInfoSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "Pilot information updated",
      description: "Your pilot details have been saved.",
    });
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
        <p className="text-muted-foreground">
          Manage your account details and preferences
        </p>
      </div>
      
      <Tabs defaultValue="personal">
        <TabsList className="grid w-full md:w-auto grid-cols-2">
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="pilot">Pilot Details</TabsTrigger>
        </TabsList>
        
        <TabsContent value="personal" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your personal details</CardDescription>
            </CardHeader>
            <form onSubmit={handlePersonalInfoSubmit}>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={personalInfo.name}
                      onChange={(e) => handlePersonalInfoChange("name", e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={personalInfo.email}
                      onChange={(e) => handlePersonalInfoChange("email", e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={personalInfo.phone}
                      onChange={(e) => handlePersonalInfoChange("phone", e.target.value)}
                    />
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={personalInfo.address}
                    onChange={(e) => handlePersonalInfoChange("address", e.target.value)}
                  />
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={personalInfo.city}
                      onChange={(e) => handlePersonalInfoChange("city", e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      value={personalInfo.state}
                      onChange={(e) => handlePersonalInfoChange("state", e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="zip">ZIP Code</Label>
                    <Input
                      id="zip"
                      value={personalInfo.zip}
                      onChange={(e) => handlePersonalInfoChange("zip", e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      value={personalInfo.country}
                      onChange={(e) => handlePersonalInfoChange("country", e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit">Save Changes</Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
        
        <TabsContent value="pilot" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pilot Information</CardTitle>
              <CardDescription>Update your pilot details and certifications</CardDescription>
            </CardHeader>
            <form onSubmit={handlePilotInfoSubmit}>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="license">License Type</Label>
                    <Input
                      id="license"
                      value={pilotInfo.license}
                      onChange={(e) => handlePilotInfoChange("license", e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="licenseNumber">License Number</Label>
                    <Input
                      id="licenseNumber"
                      value={pilotInfo.licenseNumber}
                      onChange={(e) => handlePilotInfoChange("licenseNumber", e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="medicalClass">Medical Class</Label>
                    <Input
                      id="medicalClass"
                      value={pilotInfo.medicalClass}
                      onChange={(e) => handlePilotInfoChange("medicalClass", e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="medicalExpiry">Medical Expiry Date</Label>
                    <Input
                      id="medicalExpiry"
                      type="date"
                      value={pilotInfo.medicalExpiry}
                      onChange={(e) => handlePilotInfoChange("medicalExpiry", e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="homeAirport">Home Airport</Label>
                    <Input
                      id="homeAirport"
                      value={pilotInfo.homeAirport}
                      onChange={(e) => handlePilotInfoChange("homeAirport", e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="ratings">Ratings and Endorsements</Label>
                    <Input
                      id="ratings"
                      value={pilotInfo.ratings}
                      onChange={(e) => handlePilotInfoChange("ratings", e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="restrictions">Restrictions</Label>
                    <Input
                      id="restrictions"
                      value={pilotInfo.restrictions}
                      onChange={(e) => handlePilotInfoChange("restrictions", e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit">Save Changes</Button>
              </CardFooter>
            </form>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Flight Experience</CardTitle>
              <CardDescription>Your overall pilot experience</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Total Flight Hours</p>
                  <p className="text-2xl font-bold">432.5</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">PIC Hours</p>
                  <p className="text-2xl font-bold">258.3</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">IFR Hours</p>
                  <p className="text-2xl font-bold">86.5</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Night Hours</p>
                  <p className="text-2xl font-bold">45.2</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
