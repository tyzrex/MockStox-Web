import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { FieldValues, Path, useFormContext } from "react-hook-form";

type Props<T extends FieldValues> = {
  name: Path<T>;
  formLabel: string;
  placeHolder: string;
  content: string;
  description: string;
};

export default function RHFCheckBox<T extends FieldValues>({
  name,
  formLabel,
  placeHolder,
  ...props
}: Props<T>) {
  const { control } = useFormContext();
  return (
    <>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>{props.content}</FormLabel>
              <FormDescription>{props.description}</FormDescription>
            </div>
          </FormItem>
        )}
      />
    </>
  );
}
