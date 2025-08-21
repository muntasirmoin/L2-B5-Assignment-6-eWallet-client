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
import { useLoginMutation } from "@/redux/features/Auth/auth.api";
import { type FieldValues, type SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";

export function LoginForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const navigate = useNavigate();
  const form = useForm({
    mode: "onChange",
    // For development only
    // defaultValues: {
    //   phone: "muntasirmoinchowdhury099@gmail.com",
    //   pin: "Muntasir1!",
    // },
  });
  const [login] = useLoginMutation();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log("data", data);
    try {
      const res = await login(data).unwrap();
      console.log("res", res);

      if (res.success) {
        toast.success("Logged in successfully");
        navigate("/");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err);

      if (err.data.message === "Account is deleted") {
        toast.error("Account is deleted");
      }

      if (err.data.message === "Account is Blocked") {
        toast.error("Account is Blocked");
      }

      if (err.data.message === "Account does not exist") {
        toast.error("Account does not exist");
      }

      if (err.data.message === "Incorrect pin number") {
        toast.error("Incorrect pin number");
      }

      if (
        err.data.message ===
        "Too many login attempts. Please try again in 2 minutes."
      ) {
        toast.error("Too many login attempts.Please try again After 2 minute!");
      }

      if (err.data.message === "User is not verified") {
        toast.error("Your account is not verified");
        navigate("/verify", { state: data.email });
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
              name="phone"
              rules={{
                required: "Phone is required",
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account Number</FormLabel>
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

            <FormField
              control={form.control}
              name="pin"
              rules={{
                required: "PIN is required",
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>e-Wallet PIN</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      maxLength={5}
                      placeholder="*****"
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
              Login
            </Button>
          </form>
        </Form>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link to="/register" replace className="underline underline-offset-4">
          SignIn
        </Link>
      </div>
    </div>
  );
}
