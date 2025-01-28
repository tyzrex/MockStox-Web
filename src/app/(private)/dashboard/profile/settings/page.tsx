import * as z from "zod";
import { TrendingUp, Award, BookOpen } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import UserProfileInformation from "@/components/dashboard/profile/user-profile-information";
import { getSession } from "@/app/api/auth/[...nextauth]/options";
import { dashboardApi } from "@/services/api/mockstox-api";

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
      message: "Minimum amount is $10.",
    })
    .max(100000, {
      message: "Maximum amount is $100,000.",
    }),
});

export default async function UserProfilePage() {
  const session = await getSession();

  const { error, response: funds } = await dashboardApi.getUserFunds();

  console.log(funds);

  return (
    <div>
      <div className="mx-auto">
        <h1 className="text-4xl font-bold mb-5">User Profile</h1>

        <UserProfileInformation session={session} funds={funds} />
      </div>
    </div>
  );
}
