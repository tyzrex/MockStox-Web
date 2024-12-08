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
            <FormLabel className="text-gray-400">{formLabel}</FormLabel>
            <FormControl>
              <Input
                placeholder={placeHolder}
                className="bg-zinc-800 border-zinc-700"
                {...field}
                {...props}
              />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
