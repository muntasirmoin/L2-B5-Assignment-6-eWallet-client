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
import { useUpdateProfileMutation } from "@/redux/features/User/user.api";

import { useUserInfoQuery } from "@/redux/features/User/user.api";
import ErrorLoading from "@/utils/ErrorLoading";
import { Skeleton } from "@/components/ui/skeleton";

export function UpdateProfileForm() {
  // Fetch  user info
  const {
    data: userInfo,
    isLoading,
    isError,
    refetch,
  } = useUserInfoQuery(undefined);
  const user = userInfo?.data;

  // Initialize form with empty strings
  const form = useForm<UpdateUserInput>({
    resolver: zodResolver(updateUserZodSchema),
    defaultValues: {
      name: "",
      email: "",
      address: "",
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
      });
    }
  }, [user, form]);

  const [updateProfile] = useUpdateProfileMutation();

  const onSubmit: SubmitHandler<UpdateUserInput> = async (data) => {
    console.log("Submitting data:", data, "email:", user?.email);

    if (user?.email && data.email === "") {
      toast.error("Email cannot be removed. Please provide a valid email.");
      return;
    }

    try {
      const res = await updateProfile(data).unwrap();

      if (res.success) {
        toast.success("Profile updated successfully.");
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
          toast.error("Failed to update profile.");
        }
      }
      console.error("Update profile error:", err);
    }
  };

  if (isLoading)
    return (
      <div className="w-full max-w-sm p-4 border rounded-md shadow-sm bg-white dark:bg-gray-900">
        <Skeleton className="h-6 w-3/4 mb-4 rounded" />
        <Skeleton className="h-4 w-full mb-2 rounded" />
        <Skeleton className="h-4 w-full mb-2 rounded" />
        <Skeleton className="h-4 w-2/3 rounded" />
      </div>
    );

  if (isError)
    return (
      <ErrorLoading
        message="Failed to load!"
        onRetry={() => {
          void refetch();
        }}
      />
    );

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
