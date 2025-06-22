import { CalendarIcon } from "lucide-react";
import {
  Button,
  DatePicker,
  Dialog,
  Group,
  Label,
  Popover,
} from "react-aria-components";
import { parseDate } from "@internationalized/date";

import { Calendar } from "@/components/ui/calendar-rac";
import { DateInput } from "@/components/ui/datefield-rac";

interface InputDatePickerProps {
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  required?: boolean;
}

export default function InputDatePicker({
  label = "Date picker",
  value,
  onChange,
  error,
  required = false,
}: InputDatePickerProps) {
  return (
    <div className="space-y-2">
      <DatePicker
        className="*:not-first:mt-2"
        value={value ? parseDate(value) : undefined}
        onChange={(date) => {
          if (onChange && date) {
            onChange(date.toString());
          }
        }}
      >
        <Label className="text-foreground text-sm font-medium">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
        <div className="flex">
          <Group className="w-full">
            <DateInput
              className={`pe-9 bg-transparent ${error ? "border-red-500" : ""}`}
            />
          </Group>
          <Button className="text-muted-foreground/80 hover:text-foreground data-focus-visible:border-ring data-focus-visible:ring-ring/50 z-10 -ms-9 -me-px flex w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none data-focus-visible:ring-[3px]">
            <CalendarIcon size={16} />
          </Button>
        </div>
        <Popover
          className="bg-background text-popover-foreground data-entering:animate-in data-exiting:animate-out data-[entering]:fade-in-0 data-[exiting]:fade-out-0 data-[entering]:zoom-in-95 data-[exiting]:zoom-out-95 data-[placement=bottom]:slide-in-from-top-2 data-[placement=left]:slide-in-from-right-2 data-[placement=right]:slide-in-from-left-2 data-[placement=top]:slide-in-from-bottom-2 z-50 rounded-lg border shadow-lg outline-hidden"
          offset={4}
        >
          <Dialog className="max-h-[inherit] overflow-auto p-2">
            <Calendar />
          </Dialog>
        </Popover>
      </DatePicker>
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
}
