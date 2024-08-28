import { cn } from "@/lib/utils";

export default function SectionWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("py-10 md:py-20", className)}>{children}</section>
  );
}
