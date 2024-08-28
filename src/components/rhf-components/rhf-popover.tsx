import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input, InputProps } from "@/components/ui/input";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { FieldValues, Path, useFormContext } from "react-hook-form";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";

type Props<T extends FieldValues> = {
  name: Path<T>;
  formLabel: string;
  placeHolder: string;
  options: {
    id: number;
    name: string;
  }[];
};

export default function RHFPopover<T extends FieldValues>({
  name,
  formLabel,
  placeHolder,
  options,
}: Props<T>) {
  const { control, setValue, clearErrors } = useFormContext();
  return (
    <>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{formLabel}</FormLabel>
            <FormControl>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-full justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? options?.find((option) => option.id === field.value)
                            ?.name
                        : "Select option"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="p-0 ">
                  <Command className="h-[300px] w-[400px] ">
                    <CommandInput placeholder={placeHolder} className="px-12" />
                    <CommandEmpty>No option found.</CommandEmpty>
                    <CommandGroup className="overflow-y-scroll">
                      {options.map((option) => (
                        <CommandItem
                          value={option.name}
                          key={option.id}
                          onSelect={() => {
                            setValue(name, option.id as any);
                            clearErrors(name);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              option.id === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {option.name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
