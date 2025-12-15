import React from 'react';
import { Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import SettingsForm from '@/components/Forms/SettingsForm';

const SettingsPanel = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
          <Settings className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-[#111] border-l border-white/10 text-white w-[400px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-white">Global Settings</SheetTitle>
          <SheetDescription className="text-gray-400">
            Configure application preferences.
          </SheetDescription>
        </SheetHeader>
        
        <div className="mt-6">
           <SettingsForm onClose={() => setOpen(false)} />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SettingsPanel;