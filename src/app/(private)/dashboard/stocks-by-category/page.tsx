import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const stockData = {
  Capital: [],
  "Commercial Banks": [],
  "Corporate Debenture": [],
  "Development Bank Limited": [],
  Finance: [],
  "Government Bond": [],
  "Hotels And Tourism": [],
  "Hydro Power": [],
  Investment: [],
  "Life Insurance": [],
  "Manufacturing And Processing": [],
  Microfinance: [],
  "Mutual Fund": [],
  "Non-Life Insurance": [],
  Others: [],
  "Promotor Share": [],
  Tradings: [],
};

const categories = Object.keys(stockData);

export default function StockCategories() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Stock Categories</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Index</TableHead>
            <TableHead>Category</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category, index) => (
            <TableRow key={category}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{category}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
