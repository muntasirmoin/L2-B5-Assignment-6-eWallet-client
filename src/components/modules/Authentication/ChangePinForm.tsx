import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { PasswordInputEye } from "@/utils/PasswordInputEye";
import { useChangePinMutation } from "@/redux/features/Auth/auth.api";

// ✅ Zod schema with validation
const changePinSchema = z
  .object({
    oldPin: z.string().regex(/^\d{4,5}$/, {
      message: "Old PIN must be 4–5 digits (numbers only).",
    }),
    newPin: z.string().regex(/^\d{4,5}$/, {
      message: "New PIN must be 4–5 digits (numbers only).",
    }),
    confirmPin: z.string().regex(/^\d{4,5}$/, {
      message: "Confirm PIN must be 4–5 digits (numbers only).",
    }),
  })
  .refine((data) => data.newPin === data.confirmPin, {
    path: ["confirmPin"],
    message: "New PIN and Confirm PIN do not match",
  })
  .refine((data) => data.newPin !== data.oldPin, {
    path: ["newPin"],
    message: "New PIN must be different from Old PIN",
  });

type ChangePinFormData = z.infer<typeof changePinSchema>;

// ✅ Final Form Component
export function ChangePinForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const form = useForm<ChangePinFormData>({
    resolver: zodResolver(changePinSchema),
    mode: "onChange",
  });
  const [changePin, { isLoading }] = useChangePinMutation();
  const onSubmit = async (data: ChangePinFormData) => {
    try {
      console.log("Change PIN Data:", data);

      // Fake API logic / mutation
      const res = await changePin({
        oldPin: data.oldPin,
        newPin: data.newPin,
      }).unwrap();

      if (res.success) {
        toast.success("PIN changed successfully");
        form.reset({
          oldPin: "",
          newPin: "",
          confirmPin: "",
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const errorSources = err?.data?.errorSources || [];
      const errorMessageFromSource = errorSources[0]?.message;

      const message = err?.data?.message;
      if (err) {
        if (errorMessageFromSource) {
          toast.error(errorMessageFromSource);
        } else if (message) {
          toast.error(message);
        } else {
          toast.error("Failed to change PIN");
        }
      }
      console.error("Failed to change PIN", err);
    }
  };

  return (
    <div className="min-h-[400px] sm:min-h-[500px] md:min-h-[500px] bg-gradient-to-r from-emerald-100 to-lime-200 flex items-center justify-center px-4 py-5">
      <div
        className={cn(
          "w-full max-w-md bg-white dark:bg-gray-900 shadow-2xl rounded-xl p-6 sm:p-8 md:p-10",
          className
        )}
        {...props}
      >
        <div className="flex flex-col items-center gap-2 text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-green-700 dark:text-green-300">
            Change e-Wallet PIN
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Update your wallet PIN securely.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="oldPin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Old PIN</FormLabel>
                  <FormControl>
                    <PasswordInputEye
                      {...field}
                      placeholder="*****"
                      maxLength={5}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="newPin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New PIN</FormLabel>
                  <FormControl>
                    <PasswordInputEye
                      {...field}
                      placeholder="*****"
                      maxLength={5}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm New PIN</FormLabel>
                  <FormControl>
                    <PasswordInputEye
                      {...field}
                      placeholder="*****"
                      maxLength={5}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={!form.formState.isValid}
            >
              {isLoading ? "Changing..." : "Change PIN"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
