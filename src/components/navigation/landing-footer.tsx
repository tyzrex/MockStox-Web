import Link from "next/link";
import SectionContainerWrapper from "../wrappers/section-container-wrapper";

export default function Footer() {
  return (
    <>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <SectionContainerWrapper className="flex justify-between items-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            © 2024 MockStox. All rights reserved.
          </p>
          <nav className="sm:ml-auto flex gap-4 sm:gap-6">
            <Link
              className="text-xs hover:underline underline-offset-4"
              href="#"
            >
              Terms of Service
            </Link>
            <Link
              className="text-xs hover:underline underline-offset-4"
              href="#"
            >
              Privacy
            </Link>
          </nav>
        </SectionContainerWrapper>
      </footer>
    </>
  );
}
