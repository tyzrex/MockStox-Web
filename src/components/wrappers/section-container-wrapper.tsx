import { cn } from "@/lib/utils";

export default function SectionContainerWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <section className={cn(" container ", className)}>{children}</section>;
}
