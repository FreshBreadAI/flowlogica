"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const PrivacyPolicyPage = () => {
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
            <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
            <p className="text-muted-foreground">Last Updated: June 19, 2025</p>
          </div>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">1. Introduction</h2>
            <p>
              At FlowLogica, we respect your privacy and are committed to protecting your personal data. 
              This privacy policy explains how we collect, use, and safeguard your information when you 
              visit our website or use our AI SDR services.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">2. Information We Collect</h2>
            <p>We may collect several types of information from and about users of our website, including:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Personal identifiers such as name, email address, phone number, and company information</li>
              <li>Usage data including how you interact with our website and services</li>
              <li>Marketing preferences and communication history</li>
              <li>Business relationship information</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">3. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide and improve our AI SDR services</li>
              <li>Communicate with you about our services</li>
              <li>Process transactions and send related information</li>
              <li>Send promotional materials and newsletters if you've opted in</li>
              <li>Analyze usage patterns to improve user experience</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">4. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect 
              your personal data against unauthorized access, alteration, disclosure, 
              or destruction. However, no method of transmission over the Internet or 
              electronic storage is 100% secure, so we cannot guarantee absolute security.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">5. Third-Party Services</h2>
            <p>
              We may use third-party service providers to help us operate our business and 
              the website or administer activities on our behalf. These parties may have 
              access to your personal information only to perform these tasks on our behalf.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">6. Your Rights</h2>
            <p>Depending on your location, you may have certain rights regarding your personal data, including:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>The right to access your data</li>
              <li>The right to rectify inaccurate data</li>
              <li>The right to erasure (the "right to be forgotten")</li>
              <li>The right to restrict processing</li>
              <li>The right to data portability</li>
              <li>The right to object to processing</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">7. Contact Us</h2>
            <p>
              If you have questions or concerns about this Privacy Policy or our data 
              practices, please contact us at: <span className="font-medium">info@flowlogica.com</span>
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

export default PrivacyPolicyPage;
