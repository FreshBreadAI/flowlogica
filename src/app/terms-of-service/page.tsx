"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const TermsOfServicePage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <header className="py-6 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="font-bold text-xl">FlowLogica - AI SDRs</div>
            <Button 
              variant="ghost" 
              onClick={() => router.push('/')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="space-y-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-6">Terms of Service</h1>
            <p className="text-muted-foreground">Last Updated: June 19, 2025</p>
          </div>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">1. Introduction</h2>
            <p>
              Welcome to FlowLogica's AI SDR platform. These Terms of Service ("Terms") govern your 
              access to and use of our website and services. By using our services, you agree to 
              be bound by these Terms. Please read them carefully.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">2. Definitions</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><span className="font-medium">"Service"</span> refers to FlowLogica's AI SDR platform, including all content, features and functionality</li>
              <li><span className="font-medium">"User"</span> refers to any individual or entity that accesses or uses the Service</li>
              <li><span className="font-medium">"Content"</span> refers to all information and materials provided through the Service</li>
              <li><span className="font-medium">"Subscription"</span> refers to the paid access to certain features of the Service</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">3. Service Terms</h2>
            <p>
              Our Service provides AI-powered sales development representation to help businesses generate 
              qualified meetings and leads. By using our Service, you acknowledge that:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>You must provide accurate information when registering for an account</li>
              <li>You are responsible for maintaining the security of your account</li>
              <li>FlowLogica reserves the right to modify, suspend, or discontinue the Service at any time</li>
              <li>Results may vary based on industry, target audience, and messaging strategy</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">4. Subscription and Billing</h2>
            <p>
              Certain features of the Service require a paid Subscription. By subscribing to our Service:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>You agree to pay the fees as outlined in your subscription plan</li>
              <li>Billing occurs on a monthly or annual basis as specified in your plan</li>
              <li>You may cancel your Subscription at any time with 30 days notice</li>
              <li>FlowLogica reserves the right to change pricing with 30 days notice</li>
              <li>No refunds are provided for partial months of service</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">5. Intellectual Property Rights</h2>
            <p>
              The Service and its Content are owned by FlowLogica and protected by copyright, 
              trademark, and other intellectual property laws. Users may not:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Reproduce, distribute, or create derivative works based on our Content</li>
              <li>Use any automated systems or software to extract data from the Service</li>
              <li>Remove any copyright, trademark, or other proprietary notices</li>
              <li>Use the FlowLogica name or logo without prior written consent</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">6. Limitation of Liability</h2>
            <p>
              FlowLogica shall not be liable for any indirect, incidental, special, consequential, 
              or punitive damages resulting from your use or inability to use the Service. In no event 
              shall our total liability exceed the amount paid by you for the Service during the twelve 
              months preceding the claim.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">7. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the State of 
              California, without regard to its conflict of law provisions. Any legal action arising out 
              of these Terms shall be brought exclusively in the courts located in San Francisco County, California.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">8. Contact Information</h2>
            <p>
              If you have any questions about these Terms, please contact us at: 
              <span className="font-medium"> info@flowlogica.com</span>
            </p>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 bg-muted/50 border-t border-border mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} FlowLogica, Inc. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default TermsOfServicePage;
