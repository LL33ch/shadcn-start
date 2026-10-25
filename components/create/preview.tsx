"use client"

import {
  BellIcon,
  CreditCardIcon,
  LogOutIcon,
  MoreHorizontalIcon,
  PlusIcon,
  SettingsIcon,
  ShieldCheckIcon,
  UserIcon,
} from "lucide-react"

import { Alert, AlertDescription, AlertIcon, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import { Label } from "@/components/ui/label"
import { Progress, ProgressLabel, ProgressValue } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

/* What the theme editor shows: the kit's components, as an app would put them together. */

const plans = [
  { label: "Personal", value: "personal" },
  { label: "Team", value: "team" },
  { label: "Enterprise", value: "enterprise" },
]

export function ThemePreview() {
  return (
    <div className="grid gap-4 xl:grid-cols-2 2xl:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
          <CardDescription>It takes a minute, and it is free.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="create-email">Email</Label>
            <Input id="create-email" placeholder="you@example.com" />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Plan</Label>
            <Select items={plans} defaultValue="team">
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {plans.map((p) => (
                  <SelectItem key={p.value} value={p.value}>
                    {p.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Label className="gap-3">
            <Checkbox defaultChecked /> Send me the changelog
          </Label>
        </CardContent>
        <CardFooter className="gap-2.5">
          <Button variant="soft" className="flex-1">
            Cancel
          </Button>
          <Button className="flex-1">Continue</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>Choose what reaches you.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Tabs defaultValue="email">
            <TabsList className="w-full">
              <TabsTrigger value="email">Email</TabsTrigger>
              <TabsTrigger value="push">Push</TabsTrigger>
              <TabsTrigger value="sms">SMS</TabsTrigger>
            </TabsList>
            <TabsContent value="email" className="flex flex-col gap-1">
              {["Mentions", "Weekly digest", "Security alerts"].map((t, i) => (
                <Label key={t} className="h-11 justify-between">
                  {t}
                  <Switch defaultChecked={i !== 1} />
                </Label>
              ))}
            </TabsContent>
            <TabsContent value="push" className="text-muted-foreground">
              Push notifications are off on this device.
            </TabsContent>
            <TabsContent value="sms" className="text-muted-foreground">
              Add a phone number to get texts.
            </TabsContent>
          </Tabs>
          <RadioGroup defaultValue="instant" className="gap-3">
            {["Instant", "Hourly", "Daily"].map((t) => (
              <Label key={t} className="gap-3">
                <RadioGroupItem value={t.toLowerCase()} /> {t}
              </Label>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Storage</CardTitle>
          <CardDescription>86 GB of 100 GB used.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <Progress value={86}>
            <ProgressLabel>This month</ProgressLabel>
            <ProgressValue />
          </Progress>
          <Progress value={94} meter>
            <ProgressLabel>Backups</ProgressLabel>
            <ProgressValue />
          </Progress>
          <div className="flex flex-col gap-3">
            <Label>Keep backups for</Label>
            <Slider defaultValue={[30]} max={90} />
          </div>
          <ToggleGroup spacing={0} defaultValue={["month"]} className="w-full">
            {["Day", "Week", "Month", "Year"].map((t) => (
              <ToggleGroupItem key={t} value={t.toLowerCase()} className="flex-1">
                {t}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Team</CardTitle>
          <CardDescription>Three people have access.</CardDescription>
        </CardHeader>
        <CardContent>
          <ItemGroup>
            {[
              { name: "Ada Lovelace", role: "Owner", tone: "default" as const },
              { name: "Alan Turing", role: "Admin", tone: "ok" as const },
              { name: "Grace Hopper", role: "Invited", tone: "warn" as const },
            ].map((p) => (
              <Item key={p.name} variant="muted" size="sm">
                <ItemMedia variant="icon">
                  <UserIcon />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>{p.name}</ItemTitle>
                  <ItemDescription>{p.role}</ItemDescription>
                </ItemContent>
                <ItemActions>
                  <Badge variant={p.tone} size="sm">
                    {p.role}
                  </Badge>
                </ItemActions>
              </Item>
            ))}
          </ItemGroup>
        </CardContent>
        <CardFooter className="gap-2.5">
          <Tooltip>
            <TooltipTrigger render={<Button variant="soft" size="icon" aria-label="Invite" />}>
              <PlusIcon />
            </TooltipTrigger>
            <TooltipContent>Invite someone</TooltipContent>
          </Tooltip>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={<Button variant="soft" size="icon" aria-label="More" />}
            >
              <MoreHorizontalIcon />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <SettingsIcon /> Settings
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CreditCardIcon /> Billing
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive">
                <LogOutIcon /> Leave team
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Dialog>
            <DialogTrigger render={<Button variant="red" className="ml-auto" />}>
              Remove team
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Remove the team?</DialogTitle>
                <DialogDescription>
                  Everyone loses access at once. This cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose render={<Button variant="soft" />}>Cancel</DialogClose>
                <DialogClose render={<Button variant="red" />}>Remove</DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>

      <div className="flex flex-col gap-4">
        <Alert>
          <AlertIcon>
            <BellIcon />
          </AlertIcon>
          <AlertTitle>Update available</AlertTitle>
          <AlertDescription>Version 2.4 brings faster sync.</AlertDescription>
        </Alert>
        <Alert variant="warn">
          <AlertIcon>
            <ShieldCheckIcon />
          </AlertIcon>
          <AlertTitle>Two-factor is off</AlertTitle>
          <AlertDescription>Turn it on to keep the account safe.</AlertDescription>
        </Alert>
        <div className="flex flex-wrap gap-2">
          <Badge>New</Badge>
          <Badge variant="ok">Paid</Badge>
          <Badge variant="warn">Due soon</Badge>
          <Badge variant="bad">Overdue</Badge>
          <Badge variant="soft">Draft</Badge>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button size="sm">Primary</Button>
          <Button size="sm" variant="tint">
            Tint
          </Button>
          <Button size="sm" variant="soft">
            Soft
          </Button>
          <Button size="sm" variant="ghost">
            Ghost
          </Button>
          <Button size="sm" loading>
            Saving
          </Button>
        </div>
      </div>
    </div>
  )
}
