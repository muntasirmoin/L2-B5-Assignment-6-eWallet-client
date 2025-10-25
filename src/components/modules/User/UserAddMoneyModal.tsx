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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

export const TransactionSourceEnum = {
  Bank: "bank",
  Card: "card",
  Bkash: "bkash",
} as const;

export type TransactionSourceEnum = keyof typeof TransactionSourceEnum;
const cashInZodSchema = z.object({
  amount: z.preprocess(
    (val) => (val !== "" ? Number(val) : undefined),
    z
      .number({
        message: "Amount must be a number",
      })
      .nonnegative("Amount must be 0 or greater")
  ),

  source: z.enum(
    ["bank", "card", "bkash"],
    "Source must be one of: bank, card, bkash"
  ),
});

type CashInInput = z.infer<typeof cashInZodSchema>;

export function UserAddMoneyModal() {
  const [open, setOpen] = useState(false);
  const form = useForm<CashInInput>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(cashInZodSchema) as any,
    mode: "onChange",
    defaultValues: {
      source: "bank",
      amount: 0,
    },
  });

  const transactionSourceOptions = Object.entries(TransactionSourceEnum).map(
    ([key, value]) => ({
      label: key.charAt(0).toUpperCase() + key.slice(1).toLowerCase(),
      value: value,
    })
  );

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
        toast.success(res.message);

        form.reset();
        setOpen(false);
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
        toast.error(`Something went wrong:${message}`);
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
            Add Money
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Money</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form id="add-money" onSubmit={form.handleSubmit(onSubmit)}>
              {/* source */}
              <FormField
                control={form.control}
                name="source"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Transaction Source</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Source" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {transactionSourceOptions.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* source end*/}
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem className="mt-4">
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Amount"
                        {...field}
                        value={field.value || ""}
                        onChange={(e) => {
                          const val = e.target.value;
                          field.onChange(val === "" ? "" : Number(val));
                        }}
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
              <Button variant="outline" className="cursor-pointer">
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              form="add-money"
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
