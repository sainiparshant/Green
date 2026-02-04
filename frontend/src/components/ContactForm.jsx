import React, { useState } from "react";
import API from "../api/axios";
import { toast } from "react-toastify";
import emailjs from "@emailjs/browser";
import { Send, User, Mail, MessageSquare, FileText, Loader2 } from "lucide-react";

const ContactForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    subject: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const publicKey = import.meta.env.VITE_APP_PUBLIC_KEY;
  const serviceID = import.meta.env.VITE_APP_SERVICE_ID;
  const templateID = import.meta.env.VITE_APP_TEMPLATE_ID;

  // Validation function
  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstname.trim()) {
      newErrors.firstname = "First name is required";
    }

    if (!formData.lastname.trim()) {
      newErrors.lastname = "Last name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    // Validate form
    if (!validateForm()) {
      toast.error("Please fill all required fields correctly");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post("/contact/add", formData);

      if (res.status === 201) {
        toast.success("Message sent successfully");
      }

      const templateParams = {
        name: formData.firstname + " " + formData.lastname,
        email: formData.email,
        subject: formData.subject,
        message: formData.message
      };

      await emailjs.send(serviceID, templateID, templateParams, publicKey);

      // Call parent's onSuccess callback
      if (onSuccess) {
        onSuccess();
      }

      // Reset form
      setFormData({
        firstname: "",
        lastname: "",
        email: "",
        subject: "",
        message: ""
      });
      setErrors({});
    } catch (error) {
      console.error("Error submitting contact form:", error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle input change with error clearing
  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 md:p-8 shadow-lg border border-gray-100">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-2">
          Send us a Message
        </h2>
        <p className="text-sm md:text-base text-gray-600">
          Fill out the form below and we'll respond within 24 hours.
        </p>
      </div>

      <form onSubmit={submitHandler} className="space-y-5">
        {/* Name Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* First Name */}
          <div className="flex flex-col">
            <label
              htmlFor="firstname"
              className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2"
            >
              <User className="w-4 h-4 text-emerald-600" />
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              id="firstname"
              value={formData.firstname}
              onChange={(e) => handleInputChange("firstname", e.target.value)}
              className={`w-full border ${
                errors.firstname ? "border-red-500" : "border-gray-300"
              } rounded-lg p-3 outline-none text-sm text-gray-700 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all`}
              type="text"
              placeholder="John"
              disabled={loading}
            />
            {errors.firstname && (
              <span className="text-xs text-red-500 mt-1">{errors.firstname}</span>
            )}
          </div>

          {/* Last Name */}
          <div className="flex flex-col">
            <label
              htmlFor="lastname"
              className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2"
            >
              <User className="w-4 h-4 text-emerald-600" />
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              id="lastname"
              value={formData.lastname}
              onChange={(e) => handleInputChange("lastname", e.target.value)}
              className={`w-full border ${
                errors.lastname ? "border-red-500" : "border-gray-300"
              } rounded-lg p-3 outline-none text-sm text-gray-700 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all`}
              type="text"
              placeholder="Doe"
              disabled={loading}
            />
            {errors.lastname && (
              <span className="text-xs text-red-500 mt-1">{errors.lastname}</span>
            )}
          </div>
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label
            htmlFor="email"
            className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2"
          >
            <Mail className="w-4 h-4 text-emerald-600" />
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className={`w-full border ${
              errors.email ? "border-red-500" : "border-gray-300"
            } rounded-lg p-3 outline-none text-sm text-gray-700 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all`}
            type="email"
            placeholder="john.doe@example.com"
            disabled={loading}
          />
          {errors.email && (
            <span className="text-xs text-red-500 mt-1">{errors.email}</span>
          )}
        </div>

        {/* Subject */}
        <div className="flex flex-col">
          <label
            htmlFor="subject"
            className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2"
          >
            <FileText className="w-4 h-4 text-emerald-600" />
            Subject <span className="text-red-500">*</span>
          </label>
          <input
            id="subject"
            value={formData.subject}
            onChange={(e) => handleInputChange("subject", e.target.value)}
            className={`w-full border ${
              errors.subject ? "border-red-500" : "border-gray-300"
            } rounded-lg p-3 outline-none text-sm text-gray-700 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all`}
            type="text"
            placeholder="How can we help you?"
            disabled={loading}
          />
          {errors.subject && (
            <span className="text-xs text-red-500 mt-1">{errors.subject}</span>
          )}
        </div>

        {/* Message */}
        <div className="flex flex-col">
          <label
            htmlFor="message"
            className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2"
          >
            <MessageSquare className="w-4 h-4 text-emerald-600" />
            Message <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            value={formData.message}
            onChange={(e) => handleInputChange("message", e.target.value)}
            className={`w-full border ${
              errors.message ? "border-red-500" : "border-gray-300"
            } rounded-lg p-3 outline-none text-sm text-gray-700 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all resize-none`}
            placeholder="Tell us more about your inquiry..."
            rows={6}
            disabled={loading}
          />
          <div className="flex justify-between items-center mt-1">
            {errors.message ? (
              <span className="text-xs text-red-500">{errors.message}</span>
            ) : (
              <span className="text-xs text-gray-500">
                {formData.message.length} characters
              </span>
            )}
            <span className="text-xs text-gray-400">Min. 10 characters</span>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3.5 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Send Message
            </>
          )}
        </button>

        {/* Privacy Notice */}
        <p className="text-xs text-center text-gray-500 mt-4">
          By submitting this form, you agree to our{" "}
          <a href="/privacy" className="text-emerald-600 hover:underline">
            Privacy Policy
          </a>
          . We'll never share your information.
        </p>
      </form>
    </div>
  );
};

export default ContactForm;
