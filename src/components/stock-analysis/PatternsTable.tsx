import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Pattern {
  pattern: string
  index: number
  date: string
}

interface PatternsTableProps {
  patterns: Pattern[]
}

export function PatternsTable({ patterns }: PatternsTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Pattern</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {patterns.map((pattern, index) => (
          <TableRow key={index}>
            <TableCell>{pattern.date}</TableCell>
            <TableCell>{pattern.pattern}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

