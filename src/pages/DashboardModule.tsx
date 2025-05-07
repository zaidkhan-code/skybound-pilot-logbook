
import { useParams } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardHome from "@/components/dashboard/DashboardHome";
import ProfileModule from "@/components/dashboard/ProfileModule";
import FlightsModule from "@/components/dashboard/FlightsModule";
import LogFlightForm from "@/components/dashboard/LogFlightForm";
import StatisticsModule from "@/components/dashboard/StatisticsModule";
import FieldConfigModule from "@/components/dashboard/FieldConfigModule";

export default function DashboardModule() {
  const { module } = useParams();
  
  const renderModule = () => {
    switch (module) {
      case "profile":
        return <ProfileModule />;
      case "flights":
        return <FlightsModule />;
      case "log-flight":
        return <LogFlightForm />;
      case "statistics":
        return <StatisticsModule />;
      case "field-config":
        return <FieldConfigModule />;
      default:
        return <DashboardHome />;
    }
  };
  
  return (
    <DashboardLayout>
      {renderModule()}
    </DashboardLayout>
  );
}
