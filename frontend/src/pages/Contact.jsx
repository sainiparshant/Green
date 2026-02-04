import React, { useState } from "react";
import ContactForm from "../components/ContactForm";
import ContactInfo from "../components/ContactInfo";
import { Clock, MapPin, Phone, Mail, CheckCircle } from "lucide-react";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  // Set page title and meta description
  useDocumentTitle(
    "Contact Us - Green Plant Store",
    "Get in touch with Green Plant Store. Visit us, call, or fill out our contact form for plant care advice and inquiries."
  );

  const businessHours = [
    { day: "Monday - Friday", hours: "9:00 AM - 6:00 PM" },
    { day: "Saturday", hours: "10:00 AM - 5:00 PM" },
    { day: "Sunday", hours: "Closed" },
  ];

  const faqs = [
    {
      question: "What are your store hours?",
      answer: "We're open Monday-Friday 9AM-6PM, Saturday 10AM-4PM, and closed on Sundays."
    },
    {
      question: "Do you offer plant care consultations?",
      answer: "Yes! Book a free 15-minute consultation with our plant experts either in-store or virtually."
    },
    {
      question: "What's your return policy?",
      answer: "We offer a 30-day satisfaction guarantee on all plants. If your plant isn't thriving, bring it back for a replacement or refund."
    },
    {
      question: "Do you deliver plants?",
      answer: "Yes, we offer local delivery within 20 miles for orders over ₹500. Free shipping on orders over ₹2000."
    }
  ];

  return (
    <div className="min-h-screen px-5 lg:px-10 bg-gray-200/20 pb-10">
      {/* Hero Section */}
      <div className="text-center pt-5 lg:pt-10">
        <h1 className="text-2xl md:text-5xl font-semibold text-gray-900">
          Get in Touch
        </h1>
        <p className="mt-2 md:mt-4 text-sm md:text-lg text-gray-600 max-w-3xl mx-auto">
          Have a question about our plants or need care advice?
          <br className="hidden md:block" /> 
          We'd love to hear from you.
        </p>
      </div>

      {/* Success Message */}
      {submitted && (
        <div className="max-w-4xl mx-auto mt-6 bg-emerald-50 border border-emerald-200 rounded-lg p-4 flex items-center gap-3">
          <CheckCircle className="w-6 h-6 text-emerald-600 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-emerald-900">Message Sent Successfully!</h3>
            <p className="text-sm text-emerald-700">
              Thank you for contacting us. We'll get back to you within 24 hours.
            </p>
          </div>
        </div>
      )}

      {/* Form + Info Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6 lg:gap-10 mt-8 lg:mt-10">
        {/* Contact Form */}
        <div>
          <ContactForm onSuccess={() => setSubmitted(true)} />
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          {/* Removed to add different components individually */}
          {/* <ContactInfo /> */}

          {/* Business Hours */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-emerald-600" />
              <h3 className="font-semibold text-lg text-gray-900">
                Opening Hours
              </h3>
            </div>
            <div className="space-y-3">
              {businessHours.map((schedule, index) => (
                <div 
                  key={index} 
                  className="flex justify-between items-center text-sm"
                >
                  <span className="text-gray-600">{schedule.day}</span>
                  <span className="font-medium text-gray-900">
                    {schedule.hours}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Contact */}
          <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-100">
            <h3 className="font-semibold text-lg text-gray-900 mb-4">
              Need Immediate Help?
            </h3>
            <div className="space-y-3">
              <a 
                href="tel:+911234567890" 
                className="flex items-center gap-3 text-sm hover:text-emerald-600 transition-colors group"
                aria-label="Call us"
              >
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
                  <Phone className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Call Us</p>
                  <p className="text-gray-600">+91 123 456 7890</p>
                </div>
              </a>
              
              <a 
                href="mailto:support@greenstore.com" 
                className="flex items-center gap-3 text-sm hover:text-emerald-600 transition-colors group"
                aria-label="Email us"
              >
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
                  <Mail className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Email Us</p>
                  <p className="text-gray-600">support@greenstore.com</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Visit Our Store Section */}
      <div className="bg-emerald-100/20 rounded-xl p-6 md:p-12 mt-10">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-4xl font-semibold text-gray-900">
            Visit Our Store
          </h2>
          <p className="mt-3 max-w-3xl mx-auto text-sm md:text-lg text-gray-700">
            Come see our plants in person! Our knowledgeable staff is ready to
            help you find the perfect addition to your space.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          {/* Store Image */}
          <div className="order-2 lg:order-1">
            <img
              src="/greenhouse.jpg"
              alt="Green Plant Store greenhouse with various indoor and outdoor plants"
              className="w-full h-64 md:h-96 object-cover rounded-xl shadow-lg"
              loading="lazy"
            />
          </div>

          {/* Store Details */}
          <div className="order-1 lg:order-2 bg-white rounded-xl p-6 md:p-8 shadow-sm">
            <div className="flex items-start gap-3 mb-6">
              <MapPin className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-xl text-gray-900 mb-2">
                  Store Location
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  123 Green Street, Plant District<br />
                  Mumbai, Maharashtra 400001<br />
                  India
                </p>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-sm">
                <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                <span className="text-gray-700">Free parking available</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                <span className="text-gray-700">Wheelchair accessible</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                <span className="text-gray-700">Near metro station</span>
              </div>
            </div>

            <a
              href="https://maps.google.com/?q=Green+Plant+Store+Mumbai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-full text-center bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              Get Directions
            </a>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-10 max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-4xl font-semibold text-gray-900 text-center mb-8">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <details 
              key={index} 
              className="bg-white rounded-lg border border-gray-200 p-5 group"
            >
              <summary className="font-semibold text-gray-900 cursor-pointer list-none flex justify-between items-center">
                <span>{faq.question}</span>
                <span className="text-emerald-600 group-open:rotate-180 transition-transform">
                  ▼
                </span>
              </summary>
              <p className="mt-3 text-gray-700 text-sm leading-relaxed">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contact;
