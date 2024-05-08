import { ReactNode } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/ui/popover";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/ui/tabs";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";

export default function UserBalanceButtonWithPopover(
  userBalance: () => string
) {
  return (
    <Popover>
      <PopoverTrigger>{userBalance}</PopoverTrigger>
      <PopoverContent>
        <Tabs defaultValue="deposit" className="flex flex-col">
          <TabsList className="m-auto">
            <TabsTrigger value="deposit">Deposit</TabsTrigger>
            <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
          </TabsList>
          <TabsContent value="deposit" className="flex flex-col">
            <div className="flex w-full items-center gap-2 mt-2">
              <Input type="number" placeholder="0" step={0.0001} min={0} />
              <Button>Max</Button>
            </div>
            <Button className="mt-2 self-stretch">Deposit</Button>
          </TabsContent>
          <TabsContent value="withdraw" className="flex flex-col">
            <div className="flex w-full items-center gap-2   mt-2">
              <Input type="number" placeholder="0" step={0.0001} min={0} />
              <Button>Max</Button>
            </div>
            <Button className="mt-2 self-stretch">Withdraw</Button>
          </TabsContent>
        </Tabs>
      </PopoverContent>
    </Popover>
  );
}
