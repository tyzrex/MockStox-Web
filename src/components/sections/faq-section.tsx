import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

export default function FAQSection() {
  return (
    <>
      <section
        id="faq"
        className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800"
      >
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
            Frequently Asked Questions
          </h2>
          <Accordion
            type="single"
            collapsible
            className="w-full max-w-3xl mx-auto"
          >
            <AccordionItem value="item-1">
              <AccordionTrigger>
                How accurate are the AI predictions?
              </AccordionTrigger>
              <AccordionContent>
                Our AI model is constantly learning and improving. While no
                prediction is 100% accurate, our system has shown a high degree
                of reliability in forecasting trends. We provide accuracy
                metrics for transparency.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                Can I use real money on the platform?
              </AccordionTrigger>
              <AccordionContent>
                No, StockSage AI is strictly a paper trading platform. You can
                practice and learn without risking real money. For actual
                trading, please use a licensed broker.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>
                How often is the market data updated?
              </AccordionTrigger>
              <AccordionContent>
                We provide real-time market data during trading hours. Our
                system updates stock prices and other relevant information as
                frequently as possible to give you the most current data for
                your virtual trades.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>Is my data safe?</AccordionTrigger>
              <AccordionContent>
                Yes, we take data security very seriously. We use
                industry-standard encryption and security measures to protect
                your personal information and trading data. We never share your
                data with third parties without your explicit consent.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </>
  );
}
