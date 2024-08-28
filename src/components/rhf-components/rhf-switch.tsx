import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { FieldValues, Path, useFormContext } from "react-hook-form";

type Props<T extends FieldValues> = {
  name: Path<T>;
  formLabel: string;
};

export default function RHFSwitch<T extends FieldValues>({
  name,
  formLabel,
  ...props
}: Props<T>) {
  const { control } = useFormContext();

  return (
    <>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <div className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base"> {formLabel}</FormLabel>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  defaultChecked={field.value}
                  onCheckedChange={field.onChange}
                  {...props}
                />
              </FormControl>
            </div>

            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
