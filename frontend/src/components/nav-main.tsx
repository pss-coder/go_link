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

export function NavMain({
  items,
  onSelectView,
  selectedView,
  onAddLink,
}: {
  items: string[],
  selectedView?: string,
  onSelectView?: (view: string) => void,
  onAddLink?: (link: string) => void,
}) {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            {/* <SidebarMenuButton
              tooltip="Quick Create"
              className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear"
            >
              <IconCirclePlusFilled />
              <span>Add Link</span>
            </SidebarMenuButton> */}
            <Button
              onClick={() => onAddLink?.("testLink")}
              size="icon"
              className="size-8 group-data-[collapsible=icon]:opacity-0"
              variant="outline"
            >
              <PlusCircle />
              <span className="sr-only">Add Link</span>
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item}>
              <SidebarMenuButton
                isActive={item === selectedView}
                tooltip={item}
                onClick={() => onSelectView?.(item)}
              >
                {/* {item.icon && <item.icon />} */}
                <span>{item}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
