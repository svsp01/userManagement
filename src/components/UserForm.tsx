import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formConfig } from "@/config/formConfig";
import { states, cities } from "@/config/masterData";

interface User {
  id?: string;
  name: string;
  email: string;
  linkedinUrl: string;
  gender: string;
  address: {
    line1: string;
    line2: string;
    state: string;
    city: string;
    pin: string;
  };
}

interface UserFormProps {
  user?: User;
  onSubmit: (data: User) => void;
  onClose: () => void;
}

const formSchema: any = z.object({
  name: z
    .string()
    .min(formConfig.name.minLength)
    .max(formConfig.name.maxLength),
  email: z.string().email(),
  linkedinUrl: z
    .string()
    .url()
    .regex(formConfig.linkedinUrl.pattern, "Invalid LinkedIn URL"),
  gender: z.enum(["male", "female", "other"]),
  address: z.object({
    line1: z.string().min(1, "Address line 1 is required"),
    line2: z.string().optional(),
    state: z.string().min(1, "State is required"),
    city: z.string().min(1, "City is required"),
    pin: z.string().regex(formConfig.pin.pattern, "PIN must be 6 digits"),
  }),
});

export function UserForm({ user, onSubmit, onClose }: UserFormProps) {
  const [selectedState, setSelectedState] = useState(user?.address.state || "");

  const form = useForm<any>({
    resolver: zodResolver(formSchema),
    defaultValues: user || {
      name: "",
      email: "",
      linkedinUrl: "",
      gender: "other",
      address: {
        line1: "",
        line2: "",
        state: "",
        city: "",
        pin: "",
      },
    },
  });

  function handleSubmit(values: z.infer<typeof formSchema>) {
    if (values?.id) {
      onSubmit({
        ...values,
      });
    } else {
      onSubmit({
        ...values,
        id: `${values.name}123`,
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormDescription>Your full name</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="john@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="linkedinUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>LinkedIn URL</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://www.linkedin.com/in/johndoe"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address.line1"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address Line 1</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address.line2"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address Line 2</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address.state"
          render={({ field }) => (
            <FormItem>
              <FormLabel>State</FormLabel>
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  setSelectedState(value);
                  form.setValue("address.city", "");
                }}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {states.map((state) => (
                    <SelectItem key={state} value={state}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address.city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select city" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {cities[selectedState]?.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address.pin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>PIN Code</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
      </form>
    </Form>
  );
}
