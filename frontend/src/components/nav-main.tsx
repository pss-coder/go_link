import { IconCirclePlusFilled, IconMail, type Icon } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { PlusCircle } from "lucide-react"
import type { Link } from "@/app/dashboard/Dashboard"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip"

import React from "react"

export function NavMain({
  items,
  onSelectView,
  selectedView,
  onAddLink,
}: {
  items: Link[],
  selectedView?: string,
  onSelectView?: (view: string) => void,
  onAddLink?: (link: string) => void,
}) {
  const [popoverOpen, setPopoverOpen] = React.useState(false);

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
              <PopoverTrigger asChild>
                <Button
                  size="icon"
                  className="size-8 group-data-[collapsible=icon]:opacity-0"
                  variant="outline"
                  onClick={() => setPopoverOpen(true)}
                >
                  <PlusCircle />
                  <span className="sr-only">Add Link</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                {/* TODO: USE FORM - CHECK PREVIOUS SUBMISSIONS AND ONLY HAVE ONE INPUT */}
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="leading-none font-medium">Shorten Link</h4>
                    <p className="text-muted-foreground text-sm">
                      Enter the URL you want to shorten.
                    </p>
                  </div>
                  <div className="grid gap-2">
                    <div className="grid grid-cols-3 items-center gap-4">
                      <Label htmlFor="link">Link</Label>
                      <Input
                        id="link"
                        // defaultValue="https://example.com/some/very/long/url"
                        className="col-span-2 h-8"
                      />
                    </div>
                    <Button
                      onClick={() => {
                        const input = document.getElementById("link") as HTMLInputElement;
                        if (input && input.value) {
                          onAddLink?.(input.value);
                          setPopoverOpen(false);
                        }
                      }}
                      className="mt-2"
                    >
                      Shorten
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.id}>
              <Tooltip delayDuration={200} >
                <TooltipTrigger asChild >
                    <SidebarMenuButton
                    isActive={item.id === selectedView}
                    tooltip={item.short_address}
                    onClick={() => onSelectView?.(item.id)}
                  >
                    {/* {item.icon && <item.icon />} */}
                    <span>{item.short_address}</span>
                  </SidebarMenuButton>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>{item.source_address}</p>
                </TooltipContent>
              </Tooltip>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
