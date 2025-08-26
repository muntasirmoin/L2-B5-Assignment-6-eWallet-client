import React, { useEffect } from "react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

import {
  updateUserZodSchema,
  type UpdateUserInput,
} from "../Schema/updateUserSchema";
import {
  useLazyUserByPhoneNumberQuery,
  useUpdateProfileMutation,
} from "@/redux/features/User/user.api";

// <-- Import your user info query hook here
import { useUserInfoQuery } from "@/redux/features/User/user.api";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "@/redux/features/Auth/auth.api";
export function UserUpdateProfileForm() {
  // Fetch the user info from API
  const { data: userInfo, isLoading } = useUserInfoQuery(undefined);
  const user = userInfo?.data;

  const [logout] = useLogoutMutation();
  const navigate = useNavigate();

  // Initialize form with empty strings
  const form = useForm<UpdateUserInput>({
    resolver: zodResolver(updateUserZodSchema),
    defaultValues: {
      name: "",
      email: "",
      address: "",
      phone: "",
    },
    mode: "onChange",
  });

  // Reset form fields when user data is loaded/refreshed
  useEffect(() => {
    if (user) {
      form.reset({
        name: user.name || "",
        email: user.email || "",
        address: user.address || "",
        phone: user.phone || "",
      });
    }
  }, [user, form]);
  const [fetchUserByPhone] = useLazyUserByPhoneNumberQuery();
  const [updateProfile] = useUpdateProfileMutation();

  const onSubmit: SubmitHandler<UpdateUserInput> = async (data) => {
    let shouldLogout: boolean = false;
    try {
      const userResponse = await fetchUserByPhone(data.phone).unwrap();
      const userPhone = userResponse?.data?.phone;
      const userMessage = userResponse?.message;

      if (userPhone) {
        //Phone is already registered
        toast.error(
          "Already registered with this phone number. Try with another."
        );
        return;
      }

      if (userMessage === "With This Phone Number user not found") {
        console.log("Phone not found in database. Proceeding with update.");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const errorMessage = err?.data?.message;

      if (errorMessage === "With This Phone Number user not found") {
        console.log("Phone not found (via catch). Proceeding with update.");
      } else {
        toast.error("Something went wrong while checking the phone.");
        console.error(err);
        return;
      }
    }

    console.log("Submitting data:", data, "email:", user?.email);

    if (user?.email && data.email === "") {
      toast.error("Email cannot be removed. Please provide a valid email.");
      return;
    }
    if (user?.phone && data.phone === "") {
      toast.error(
        "Phone number cannot be removed. Please provide a valid number."
      );
      return;
    }
    if (user?.phone && data.phone !== user.phone) {
      shouldLogout = true;
    }

    try {
      const res = await updateProfile(data).unwrap();

      if (res.success) {
        toast.success("Profile updated successfully.");
      }

      if (shouldLogout) {
        await logout(undefined).unwrap();
        toast.info("You've been logged out due to phone number change.");
        navigate("/login"); // ✅ use navigate instead of router.push
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const errorSources = err?.data?.errorSources || [];
      const errorMessageFromSource = errorSources[0]?.message;

      const message = err?.data?.message;
      if (err) {
        if (errorMessageFromSource) {
          toast.error(errorMessageFromSource); // fallback to source error if available
        } else if (message) {
          toast.error(message); // fallback to general message
        } else {
          toast.error("Failed to update profile.");
        }
      }
      console.error("Update profile error:", err);
    }
  };

  if (isLoading) return <div>Loading user info...</div>;

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-900 shadow-md rounded-xl p-6 space-y-6">
      <h2 className="text-xl font-bold text-center text-green-700 dark:text-green-300">
        Update Your Profile
      </h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your name"
                    {...field}
                    className="border border-emerald-500"
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
                    className="border border-emerald-500"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email (Optional)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="you@example.com"
                    {...field}
                    className="border border-emerald-500"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address (Optional)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="City, Street"
                    {...field}
                    className="border border-emerald-500"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full cursor-pointer font-bold  hover:bg-green-600 hover:text-white transition-colors duration-200"
            disabled={!form.formState.isDirty}
          >
            Update Profile
          </Button>
        </form>
      </Form>
    </div>
  );
}
