"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Pencil, Loader2, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Session } from "next-auth";
import { loadUserFunds } from "@/services/api/dashboard/dashboard-actions";
import { formatNepaliCurrency, showErrorToasts } from "@/lib/utils";
import { toast } from "sonner";

// Define the form schema
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  bio: z.string().max(160, {
    message: "Bio must not exceed 160 characters.",
  }),
});

const fundsSchema = z.object({
  amount: z
    .number()
    .min(10, {
      message: "Minimum amount is Rs. 10.",
    })
    .max(100000, {
      message: "Maximum amount is Rs. 100,000.",
    }),
});

export default function UserProfileInformation({
  session,
  funds,
}: {
  session: Session | null;
  funds: {
    funds: number;
  };
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Enhanced mock user data
  const [user, setUser] = useState({
    name: session?.user.name,
    email: session?.user.email,
    avatar: `https://api.dicebear.com/6.x/avataaars/svg?seed=${session?.user.name}`,
    bio: "Passionate investor and tech enthusiast. Always learning, always growing.",
    joinDate: "January 15, 2023",
    totalTrades: 47,
    successRate: 68,
    favoriteStock: "NVDA",
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      bio: user.bio,
    },
  });

  const fundsForm = useForm<z.infer<typeof fundsSchema>>({
    resolver: zodResolver(fundsSchema),
    defaultValues: {
      amount: 0,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setUser((prevUser) => ({ ...prevUser, ...values }));
    setIsLoading(false);
    setIsOpen(false);
  };

  const onFundsSubmit = async (values: z.infer<typeof fundsSchema>) => {
    if (values.amount === 0) {
      toast.error("Please enter a valid amount.");
      return;
    }
    const response = await loadUserFunds({ amount: values.amount });
    if (response.success) {
      toast.success(response.message);
      fundsForm.reset();
    } else {
      showErrorToasts(response.errorData);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* User Info Section */}
      <Card className="md:col-span-2 bg-neutral-950 border border-zinc-800">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">
            Profile Information
          </CardTitle>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon">
                <Pencil className="h-4 w-4 text-[#a3a2a3]" />
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-mockstox-primary text-[#e5ebeb] border-gray-700">
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
              </DialogHeader>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="bg-[#1d1d1d] border-[#a3a2a3]"
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
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="bg-[#1d1d1d] border-[#a3a2a3]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bio</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="bg-[#1d1d1d] border-[#a3a2a3]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="bg-[#d5e14e] text-[#1d1d1d] hover:bg-[#c5d13e]"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      "Update Profile"
                    )}
                  </Button>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-4">
            <img
              src={user.avatar}
              alt="User Avatar"
              className="w-20 h-20 rounded-full"
            />
            <div>
              <h2 className="text-2xl font-semibold">{user.name}</h2>
              <p className="text-[#a3a2a3]">{user.email}</p>
            </div>
          </div>
          <p className="text-sm mb-4">{user.bio}</p>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-[#a3a2a3]">Member since</p>
              <p>{user.joinDate}</p>
            </div>
            <div>
              <p className="text-[#a3a2a3]">Total trades</p>
              <p>{user.totalTrades}</p>
            </div>
            <div>
              <p className="text-[#a3a2a3]">Success rate</p>
              <p>{user.successRate}%</p>
            </div>
            <div>
              <p className="text-[#a3a2a3]">Favorite stock</p>
              <p>{user.favoriteStock}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Funds Section */}
      <Card className="bg-neutral-950 border border-zinc-800">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Your Funds</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-[#d5e14e] mb-4">
            {formatNepaliCurrency(funds.funds)}
          </p>
          <Form {...fundsForm}>
            <form
              onSubmit={fundsForm.handleSubmit(onFundsSubmit)}
              className="space-y-4"
            >
              <FormField
                control={fundsForm.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Load Funds</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value))
                        }
                        className="bg-[#1d1d1d] border-[#a3a2a3]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full bg-[#d5e14e] text-[#1d1d1d] hover:bg-[#c5d13e]"
              >
                <DollarSign className="mr-2 h-4 w-4" />
                Load Funds
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
