import React from "react";
import { AppSidebar } from "@/components/app-sidebar"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

import data from "./data.json"


// TODO: MAIN STATES HANDLING - DONE HERE
// FETCHING DATA, UPDATING, ETC...

const sidebarLinks = [
  "Dashboard",
  "Lifecycle",
  "Analytics",
  "Projects",
  "Team",
]


export default function Dashboard() {
  // Import data.json inside the function to ensure 'data' is in scope
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  // const data = require("./data.json");
  const [selectedView, setSelectedView] = React.useState("Dashboard");
  const [links, setLinks] = React.useState(sidebarLinks);


  const addLink = (newLink: string) => {
    setLinks((prevLinks) => [...prevLinks, newLink + links.length]);
  };

  // Optionally, map view names to components
  const renderContent = () => {
    switch (selectedView) {
      case "Dashboard":
        return (
          <>
            <SectionCards />
            <div className="px-4 lg:px-6">
              <ChartAreaInteractive />
            </div>
            {/* <DataTable data={data} /> */}
          </>
        );
      case "Lifecycle":
        return <div className="p-8">Lifecycle View</div>;
      case "Analytics":
        return <div className="p-8">Analytics View</div>;
      case "Projects":
        return <div className="p-8">Projects View</div>;
      case "Team":
        return <div className="p-8">Team View</div>;
      default:
        return <div className="p-8">Not implemented</div>;
    }
  };

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" data={links} onSelectView={setSelectedView} selectedView={selectedView} onAddLink={addLink} />
      <SidebarInset>
        <SiteHeader selectedView={selectedView} />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              {renderContent()}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
