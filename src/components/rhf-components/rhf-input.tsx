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
import { FieldValues, Path, useFormContext } from "react-hook-form";

type Props<T extends FieldValues> = {
  name: Path<T>;
  formLabel: string;
  placeHolder: string;
} & InputProps;

export default function RHFInput<T extends FieldValues>({
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
          <FormItem>
            <FormLabel>{formLabel}</FormLabel>
            <FormControl>
              <Input placeholder={placeHolder} {...field} {...props} />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
