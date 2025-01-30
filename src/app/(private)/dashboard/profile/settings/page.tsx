import UserProfileInformation from "@/components/dashboard/profile/user-profile-information";
import { getSession } from "@/app/api/auth/[...nextauth]/options";
import { dashboardApi } from "@/services/api/mockstox-api";
import PageHeader from "@/components/shared/page-header";

export default async function UserProfilePage() {
  const session = await getSession();

  const { error, response: funds } = await dashboardApi.getUserFunds();

  return (
    <div>
      <div className="mx-auto">
        <PageHeader
          title="User Profile"
          description="Update your profile information and manage your funds."
        />

        <UserProfileInformation session={session} funds={funds} />
      </div>
    </div>
  );
}
