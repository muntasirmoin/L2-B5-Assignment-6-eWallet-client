import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCashInMutation } from "@/redux/features/Agent/agent.api";
import { useLazyUserByPhoneNumberQuery } from "@/redux/features/User/user.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const cashInZodSchema = z.object({
  amount: z.preprocess(
    (val) => (val !== "" ? Number(val) : undefined),
    z
      .number({
        message: "Amount must be a number",
      })
      .nonnegative("Amount must be 0 or greater")
  ),
  phone: z.string().regex(/^(01)[3-9]\d{8}$/, {
    message:
      "Phone number must be a valid number (11 digits, starting with 01 followed by 3-9).",
  }),
});

type CashInInput = z.infer<typeof cashInZodSchema>;

export function AddMoneyModal() {
  const [open, setOpen] = useState(false);
  const form = useForm<CashInInput>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(cashInZodSchema) as any,
    mode: "onChange",
    defaultValues: {
      phone: "",
      amount: 0,
    },
  });

  const [fetchUserByPhone] = useLazyUserByPhoneNumberQuery();
  const [cashIn] = useCashInMutation();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    console.log("data", data);

    try {
      const userResponse = await fetchUserByPhone(data.phone).unwrap();

      const userId = userResponse?.data?.userId;

      if (!userId) {
        toast.error("User not found. Please enter a valid phone number.");
        return;
      }

      const res = await cashIn({
        // userId: data.phone,
        userId,
        amount: data.amount,
      }).unwrap();

      if (res.success) {
        toast.success(`Cash In Done: ${data.amount} tk`);

        form.reset(); //  Reset form
        setOpen(false); //  Close modal
      }

      form.reset();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error("error cash in", err);

      const errorSources = err?.data?.errorSources || [];
      const errorMessageFromSource = errorSources[0]?.message;

      const message = err?.data?.message;

      if (errorMessageFromSource === "Amount must be a number.") {
        toast.error("Amount must be a number.");
      } else if (message?.includes("Insufficient balance")) {
        toast.error(message);
      } else if (message === "Same agent & cash-in receiver.") {
        toast.error("Its Your Number");
      } else if (message === "Receiver must be a  User Role ObjectId.") {
        toast.error("It's Not a User Number");
      } else if (errorMessageFromSource) {
        toast.error(errorMessageFromSource); // fallback to source error if available
      } else if (message) {
        toast.error(message); // fallback to general message
      } else {
        toast.error("Something went wrong.");
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <DialogTrigger asChild>
          <Button className="cursor-pointer font-bold">Cash In</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Cash In</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form id="cash-in" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Phone Number"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem className="mt-4">
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Amount"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" form="cash-in">
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
