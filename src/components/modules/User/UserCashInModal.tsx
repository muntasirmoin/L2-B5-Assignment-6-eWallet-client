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
import { useAddMoneyMutation } from "@/redux/features/User/user.api";
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
  //
  source: z.enum(
    ["bank", "card", "bkash"],
    "Source must be one of: bank, card, bkash"
  ),
});

type CashInInput = z.infer<typeof cashInZodSchema>;

export function UserCashInModal() {
  const [open, setOpen] = useState(false);
  const form = useForm<CashInInput>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(cashInZodSchema) as any,
    mode: "onChange",
    defaultValues: {
      source: "bkash",
      amount: 0,
    },
  });

  //   const [addMoney, { isLoading, error, data }] = useAddMoneyMutation();

  const [addMoney] = useAddMoneyMutation();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    console.log("data", data);

    try {
      const res = await addMoney({
        source: data.source,
        amount: data.amount,
      }).unwrap();

      console.log("res", res);
      if (res.success) {
        // toast.success(`Cash In Done: ${data.amount} tk`);
        toast.success(res.message);

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

      if (errorMessageFromSource === "Amount must be greater than zero") {
        toast.error("Amount must be greater than equal zero");
      } else if (message) {
        toast.error("Something went wrong:", message);
      } else {
        toast.error("Something went wrong.");
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <DialogTrigger asChild>
          <Button className="cursor-pointer font-bold  hover:bg-green-600 hover:text-white transition-colors duration-200">
            Cash In
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Cash In</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form id="cash-in" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="source"
                render={() => (
                  <FormItem>
                    <FormLabel>Agent</FormLabel>
                    <FormControl>
                      <Input
                        value="bkash"
                        readOnly
                        disabled
                        className="font-bold border-2 border-rose-600 bg-blue-100 text-rose-800 rounded-md px-3 py-2"
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
            <Button
              type="submit"
              form="cash-in"
              className="cursor-pointer font-bold  hover:bg-green-600 hover:text-white transition-colors duration-200"
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
