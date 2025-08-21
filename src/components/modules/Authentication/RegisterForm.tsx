import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { type FieldValues, type SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegisterMutation } from "@/redux/features/User/user.apit";

const createUserZodSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long." })
    .max(50, { message: "Name cannot exceed 50 characters." }),

  phone: z.string().regex(/^(01)[3-9]\d{8}$/, {
    message:
      "Phone number must be a valid number (11 digits, starting with 01 followed by 3-9).",
  }),

  pin: z.string().regex(/^\d{4,5}$/, {
    message: "PIN must be 4–5 digits (numbers only).",
  }),

  address: z
    .string()
    .max(100, { message: "Address must not exceed 100 characters." })
    .optional()
    .or(z.literal("")),

  email: z
    .string()
    .email({ message: "Invalid email address format." })
    .optional()
    .or(z.literal("")),
});

type CreateUserInput = z.infer<typeof createUserZodSchema>;

function RegisterForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const navigate = useNavigate();
  const form = useForm<CreateUserInput>({
    resolver: zodResolver(createUserZodSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      phone: "",
      pin: "",
      address: "",
      email: "",
    },
  });
  const [register] = useRegisterMutation();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log("data", data);
    const transformedData = {
      ...data,
      email: data.email?.trim() === "" ? undefined : data.email,
      address: data.address?.trim() === "" ? undefined : data.address,
    };

    console.log("transformedData:", transformedData);
    try {
      const res = await register(transformedData).unwrap();
      console.log("res", res);

      if (res.success) {
        toast.success("Account Created Successfully");
        navigate("/login");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err);

      if (
        err.data.message === "An account with this phone number already exists."
      ) {
        toast.error("An account with this phone number already exists.");
      }
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">To your e-Wallet account</h1>
        {/* <p className="text-balance text-sm text-muted-foreground">
          Enter your email below to login to your account
        </p> */}
      </div>
      <div className="grid gap-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="John Doe"
                      {...field}
                      value={field.value || ""}
                      className="border border-rose-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="01XXXXXXXXX"
                      maxLength={11}
                      {...field}
                      value={field.value || ""}
                      className="border border-rose-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* PIN */}
            <FormField
              control={form.control}
              name="pin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>e-Wallet PIN</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="4–5 digit PIN"
                      maxLength={5}
                      {...field}
                      value={field.value || ""}
                      className="border border-rose-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email (Optional) */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      {...field}
                      value={field.value || ""}
                      className="border border-rose-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Address (Optional) */}
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Street, City, District"
                      maxLength={100}
                      {...field}
                      value={field.value || ""}
                      className="border border-rose-500"
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
              Sign In
            </Button>
          </form>
        </Form>
      </div>
      <div className="text-center text-sm">
        Have an account?{" "}
        <Link to="/login" replace className="underline underline-offset-4">
          login
        </Link>
      </div>
    </div>
  );
}

export default RegisterForm;
