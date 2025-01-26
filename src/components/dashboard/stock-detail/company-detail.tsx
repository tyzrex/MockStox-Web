import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function CompanyInfoCard({ company }: { company: any }) {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{company.name}</CardTitle>
        <Badge
          variant="outline"
          className="text-green-400 border-green-400 w-fit"
        >
          {company.symbol}
        </Badge>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="">Core Capital</p>
          <p className="font-semibold">
            {company.core_capital.toLocaleString()} NPR
          </p>
        </div>

        <div>
          <p className="">Listed Date</p>
          <p className="font-semibold">
            {company.listed_date === "" ? "-" : company.listed_date}
          </p>
        </div>
        <div>
          <p className="">Expired Date</p>
          <p className="font-semibold">
            {company.expired_date === "" ? "-" : company.expired_date}
          </p>
        </div>
        <div>
          <p className="">Share Registrar</p>
          <p className="font-semibold">{company.share_registar}</p>
        </div>
        <div>
          <p className="">Sector</p>
          <p className="font-semibold">Hydropower</p>
        </div>
        <div>
          <p className="">Promoter Shares</p>
          <p className="font-semibold">{company.promoter_shares}%</p>
        </div>
        <div>
          <p className="">Public Shares</p>
          <p className="font-semibold">{company.public_shares}%</p>
        </div>
        <div className="col-span-2">
          <p className="">Status</p>
          <div className="flex space-x-2 mt-1">
            <Badge
              variant={company.is_merged === "true" ? "default" : "secondary"}
              className="text-xs text-black"
            >
              {company.is_merged === "true" ? "Merged" : "Not Merged"}
            </Badge>
            <Badge
              variant={
                company.is_delisted === "false" ? "destructive" : "secondary"
              }
              className="text-xs"
            >
              {company.is_delisted === "true" ? "Delisted" : "Listed"}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
