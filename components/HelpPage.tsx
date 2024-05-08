'use client';
import { getStore } from '@/lib/action';
import React, { useEffect, useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
interface StoreData {
  name: string;
  description: string;
  currency: string;
  address: string;
  email: string;
  faq: { question: string; answer: string }[];
  specialPage: { name: string; text: string }[];
  ig: string;
  fb: string;
  yt: string;
  customLink: string;
}

const HelpPage = () => {
  const [storeData, setStoreData] = useState<StoreData | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const store = await getStore();
        setStoreData(store);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  return (
    <section className="w-full p-2 py-6 flex flex-col gap-2">
      <div className="w-full flex flex-col gap-2 p-4 max-w-5xl mx-auto justify-evenly ">
        {storeData &&
          (storeData.address || storeData.ig || storeData.email) && (
            <>
              <h2 className="text-5xl text-center font-serif">Need Help?</h2>
              <div className="w-full flex md:flex-row flex-col md:gap-10 gap-4 p-2 mt-4 justify-evenly">
                {storeData && storeData.address && storeData.address !== '' && (
                  <div className="part flex-1  flex flex-col gap-2 border-2  dark:border-white border-[#120F0D] max-w-[20rem]  justify-center items-center p-2 py-5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-20 h-20"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                      />
                    </svg>

                    <h2 className="text-4xl font-medium font-serif">
                      Visit Us
                    </h2>
                    <p className="max-w-[65%] text-center opacity-70">
                      Explore our store in person and experience our wide range
                      of products.
                    </p>
                  </div>
                )}

                {storeData && storeData.ig && storeData.ig !== '' && (
                  <div className="part flex-1 flex flex-col gap-2 border-2 dark:border-white border-[#120F0D] max-w-[20rem]  justify-center items-center p-2 py-5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-20 h-20"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                      />
                    </svg>

                    <h2 className="text-4xl font-medium font-serif">
                      Contact Us
                    </h2>
                    <p className="max-w-[65%] text-center opacity-70">
                      Reach out to us via social media for any inquiries or
                      assistance.
                    </p>
                  </div>
                )}

                {storeData && storeData.email && storeData.email !== '' && (
                  <div className="part flex-1  flex flex-col gap-2 border-2 dark:border-white border-[#120F0D] max-w-[20rem]  justify-center items-center p-2 py-5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-20 h-20"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                      />
                    </svg>
                    <h2 className="text-4xl font-medium font-serif">
                      Email Us
                    </h2>
                    <p className="max-w-[65%] text-center opacity-70">
                      Submit an email and we will get back to you soon.
                    </p>
                  </div>
                )}
              </div>
            </>
          )}
        <h2 className="text-5xl  font-serif  mt-10">
          Frequently asked questions
        </h2>
        <div className="w-full h-0.5 bg-[#120F0D] dark:bg-white mt-2"></div>
        <Accordion type="single" collapsible>
          {storeData &&
            storeData.faq.length > 1 &&
            storeData.faq.map((question, index: number) => (
              <AccordionItem key={index} value={`item-1${index}`}>
                <AccordionTrigger>{question.question}</AccordionTrigger>
                <AccordionContent>{question.answer}</AccordionContent>
              </AccordionItem>
            ))}
        </Accordion>
      </div>
    </section>
  );
};

export default HelpPage;
