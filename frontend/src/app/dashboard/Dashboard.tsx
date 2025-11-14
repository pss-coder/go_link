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


const sidebarLinks: Link[] = []


export type Link = {
  id: string,
  source_address: string,
  short_address: string,
  visits : number,
}


export default function Dashboard() {
  // Import data.json inside the function to ensure 'data' is in scope
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  // const data = require("./data.json");
  const [selectedView, setSelectedView] = React.useState("");
  const [links, setLinks] = React.useState(sidebarLinks);


  const addLink = (newLink: string) => {
    setLinks((prevLinks) => [...prevLinks, { 
      id: newLink + links.length, 
      source_address: newLink,
      short_address: newLink,
      visits: 0
     }]);
  };

  const deleteLink = (linkId: string) => {
    setLinks((prevLinks) => prevLinks.filter(link => link.id !== linkId));
    setSelectedView(""); // reset view
  };

  // Optionally, map view names to components
  const renderContent = () => {
    const selectedLink = links.find(link => link.id === selectedView);
    if (selectedLink) {
      return (
        <div className="p-8">
          <h2 className="text-2xl font-bold mb-4">Link Details</h2>
          <p><strong>Source Address:</strong> {selectedLink.source_address}</p>
          <p><strong>Short Address:</strong> {selectedLink.short_address}</p>
          <p><strong>Visits:</strong> {selectedLink.visits}</p>
        </div>
      );
    }
    return <><div className="p-8">Welcome! Please select a link from the sidebar.</div></>;
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
        <SiteHeader selectedView={selectedView} onLinkDelete={deleteLink} />
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
