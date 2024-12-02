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
    <div className="text-[#e5ebeb] ">
      <div className="mx-auto">
        <h1 className="text-4xl font-bold mb-8">User Profile</h1>

        <UserProfileInformation session={session} funds={funds} />

        {/* Trading Stats Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="bg-neutral-950 border border-zinc-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Profit/Loss
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-[#d5e14e]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+$1,234.56</div>
              <p className="text-xs text-[#a3a2a3]">+14.2% from last month</p>
              <Progress value={68} className="mt-2" />
            </CardContent>
          </Card>
          <Card className="bg-neutral-950 border border-zinc-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Best Performing Stock
              </CardTitle>
              <Award className="h-4 w-4 text-[#d5e14e]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">AAPL</div>
              <p className="text-xs text-[#a3a2a3]">+27.5% return</p>
            </CardContent>
          </Card>
          <Card className="bg-neutral-950 border border-zinc-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Trading Streak
              </CardTitle>
              <BookOpen className="h-4 w-4 text-[#d5e14e]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">15 Days</div>
              <p className="text-xs text-[#a3a2a3]">Keep it up!</p>
            </CardContent>
          </Card>
        </div>

        {/* Guided Paragraphs */}
        <div className="mt-8 bg-neutral-950 p-4 border border-zinc-800 rounded-lg">
          <h3 className="text-2xl font-bold mb-4">Your Trading Journey</h3>
          <p className="mb-4">
            Welcome to your personalized trading dashboard, {session?.user.name}
            ! Here, you can track your progress, manage your funds, and gain
            insights into your trading performance. Remember, successful trading
            is a marathon, not a sprint. Keep learning, stay disciplined, and
            always manage your risk.
          </p>
          <p className="mb-4">
            Your current success rate of -% is impressive. To improve further,
            consider the following tips:
          </p>
          <ul className="list-disc list-inside mb-4 space-y-2">
            <li>Regularly review and update your trading strategy</li>
            <li>
              Keep a trading journal to learn from your successes and mistakes
            </li>
            <li>Stay informed about market trends and economic news</li>
            <li>
              Practice proper risk management by diversifying your portfolio
            </li>
          </ul>
          <p>
            Remember, the Load Funds feature allows you to add virtual currency
            to your account for paper trading. This is a great way to test new
            strategies without risking real money. Happy trading!
          </p>
        </div>
      </div>
    </div>
  );
}
