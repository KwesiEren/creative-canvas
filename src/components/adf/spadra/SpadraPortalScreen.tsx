import React, { useState } from "react";
import { useSpadra } from "@/lib/spadraStore";
import { SpadraGateway } from "./SpadraGateway";
import { SpadraShell, type PortalTabId } from "./SpadraShell";
import { SpadraDashboard } from "./SpadraDashboard";
import { SpadraDataInsights } from "./SpadraDataInsights";
import { SpadraResearch } from "./SpadraResearch";
import { SpadraResources } from "./SpadraResources";
import { SpadraOrganisations } from "./SpadraOrganisations";
import { SpadraProgrammes } from "./SpadraProgrammes";
import { SpadraEvents } from "./SpadraEvents";
import { SpadraProfile } from "./SpadraProfile";

export const SpadraPortalScreen: React.FC = () => {
  const { user } = useSpadra();
  const [active, setActive] = useState<PortalTabId>("dashboard");

  if (!user) {
    return <SpadraGateway />;
  }

  return (
    <SpadraShell active={active} onChange={setActive}>
      {active === "dashboard" && <SpadraDashboard onOpenTab={setActive} />}
      {active === "data" && <SpadraDataInsights />}
      {active === "research" && <SpadraResearch />}
      {active === "resources" && <SpadraResources />}
      {active === "organisations" && <SpadraOrganisations />}
      {active === "programmes" && <SpadraProgrammes />}
      {active === "events" && <SpadraEvents />}
      {active === "profile" && <SpadraProfile />}
    </SpadraShell>
  );
};
