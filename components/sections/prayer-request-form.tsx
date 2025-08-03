"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import {
  Heart,
  Send,
  CheckCircle,
  AlertCircle,
  Star,
  ArrowRight,
  Users,
  Shield,
  HandHeart,
} from "lucide-react";

interface FormData {
  fullName: string;
  phoneNumber: string;
  email: string;
  prayerRequest: string;
}

export function PrayerRequestForm() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    phoneNumber: "",
    email: "",
    prayerRequest: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Submit prayer request via API route
      const response = await fetch("/api/prayer-requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          phoneNumber: formData.phoneNumber,
          email: formData.email,
          prayerRequest: formData.prayerRequest,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit prayer request");
      }

      console.log("Prayer request submitted successfully:", result.data);

      // Send confirmation email to user
      try {
        const emailResponse = await fetch("/api/email/send-confirmation", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.fullName,
            email: formData.email,
            prayerRequest: formData.prayerRequest,
            requestId: result.data.id,
          }),
        });

        if (!emailResponse.ok) {
          console.error("Failed to send confirmation email");
        }
      } catch (emailError) {
        console.error("Error sending confirmation email:", emailError);
      }

      // Send admin notification
      try {
        const adminResponse = await fetch(
          "/api/email/send-admin-notification",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: formData.fullName,
              email: formData.email,
              phone: formData.phoneNumber,
              prayerRequest: formData.prayerRequest,
              requestId: result.data.id,
            }),
          }
        );

        if (!adminResponse.ok) {
          console.error("Failed to send admin notification");
        }
      } catch (adminError) {
        console.error("Error sending admin notification:", adminError);
      }

      setSubmitStatus("success");
      setFormData({
        fullName: "",
        phoneNumber: "",
        email: "",
        prayerRequest: "",
      });
    } catch (error) {
      console.error("Error submitting prayer request:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative pt-20 pb-12 md:pt-20 md:pb-16 lg:pt-24 lg:pb-24 overflow-hidden">
      {/* Enhanced Background with Glass Morphism */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-red-50/30 to-blue-50/30">
        {/* Static Background Elements for Better Performance */}
        <div className="absolute top-20 right-10 w-48 md:w-72 h-48 md:h-72 bg-gradient-to-r from-red-400/15 to-blue-400/15 rounded-full blur-2xl md:blur-3xl" />
        <div className="absolute bottom-20 left-10 w-64 md:w-96 h-64 md:h-96 bg-gradient-to-r from-blue-400/15 to-red-400/15 rounded-full blur-2xl md:blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 md:w-64 h-40 md:h-64 bg-gradient-to-r from-red-300/10 to-blue-300/10 rounded-full blur-xl md:blur-2xl" />
      </div>

      <Container className="relative z-10">
        {/* Enhanced Page Header */}
        <motion.div
          className="text-center mb-12 md:mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 mb-3 md:mb-4 px-3 md:px-4 py-2 bg-gradient-to-r from-red-50 to-blue-50 rounded-full border border-red-100">
            <Heart className="h-3 w-3 md:h-4 md:w-4 text-red-500" />
            <span className="text-xs md:text-sm font-medium text-gray-600">
              Prayer Ministry
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 md:mb-6">
            <span className="bg-gradient-to-r from-red-600 via-red-500 to-red-600 bg-clip-text text-transparent">
              Prayer Request
            </span>
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed px-4 lg:px-0">
            Share your prayer requests with the Prayer Team of Philadelphia
            Missionary Church. Whether it's personal challenges, family
            concerns, or other issues, you are not alone!
          </p>
        </motion.div>

        {/* Enhanced Message Section */}
        <motion.div
          className="mb-12 md:mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <div className="relative rounded-2xl md:rounded-3xl overflow-hidden group">
            <div className="bg-gradient-to-br from-red-500/5 via-blue-500/5 to-red-500/5 p-4 md:p-8 lg:p-12 border border-red-100">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 items-center">
                <div className="lg:col-span-2 space-y-4 md:space-y-6">
                  <div className="inline-flex items-center gap-2 px-2 md:px-3 py-1 bg-red-50 rounded-full border border-red-100 w-fit">
                    <Star className="h-3 w-3 md:h-4 md:w-4 text-red-500" />
                    <span className="text-xs md:text-sm font-medium text-red-600">
                      God's Promise
                    </span>
                  </div>
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800">
                    The Power of Prayer
                  </h2>
                  <div className="space-y-3 md:space-y-4 text-sm md:text-base lg:text-lg text-gray-700 leading-relaxed">
                    <p>
                      We firmly believe that prayer has powerful strength and
                      that God hears our prayers. As it says in the Bible:{" "}
                      <strong>"Pray without ceasing"</strong> (1 Thessalonians
                      5:17). Therefore, we encourage you to share your prayer
                      requests here and give other people the chance to pray for
                      you.
                    </p>
                    <p>
                      Your prayer requests will be treated confidentially. We
                      look forward to reading your prayer requests and praying
                      for you together. Let's stick together and support each
                      other in our challenges.
                    </p>
                    <div className="bg-gradient-to-r from-red-50 to-blue-50 p-4 md:p-6 rounded-xl md:rounded-2xl border-l-4 border-red-500">
                      <blockquote className="text-sm md:text-base lg:text-lg italic text-gray-700">
                        "Stay strong, be encouraged, and know that you are
                        loved!"
                        <footer className="mt-2 md:mt-3 text-xs md:text-sm font-semibold text-red-600 flex items-center gap-2">
                          <Heart className="h-3 w-3 md:h-4 md:w-4" />
                          PMC Church Prayer Team
                        </footer>
                      </blockquote>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center space-y-4 md:space-y-6">
                  <motion.div
                    className="p-4 md:p-6 bg-gradient-to-br from-red-500/10 to-red-600/10 rounded-xl md:rounded-2xl border border-red-100"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <Users className="h-8 w-8 md:h-12 md:w-12 text-red-600" />
                  </motion.div>
                  <motion.div
                    className="p-4 md:p-6 bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-xl md:rounded-2xl border border-blue-100"
                    whileHover={{ scale: 1.1, rotate: -5 }}
                  >
                    <Shield className="h-8 w-8 md:h-12 md:w-12 text-blue-600" />
                  </motion.div>
                  <motion.div
                    className="p-4 md:p-6 bg-gradient-to-br from-red-500/10 to-blue-500/10 rounded-xl md:rounded-2xl border border-red-100"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <HandHeart className="h-8 w-8 md:h-12 md:w-12 text-red-600" />
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Form Section */}
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          <div className="relative rounded-2xl md:rounded-3xl overflow-hidden group">
            <div className="absolute -inset-4 bg-gradient-to-r from-red-500/20 to-blue-500/20 rounded-2xl md:rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative bg-white p-4 md:p-8 lg:p-12 border border-gray-200">
              {submitStatus === "success" ? (
                <motion.div
                  className="text-center py-8 md:py-12"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div
                    className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-green-100 rounded-full mb-4 md:mb-6"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <CheckCircle className="w-8 h-8 md:w-10 md:h-10 text-green-600" />
                  </motion.div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-4">
                    Prayer Request Submitted!
                  </h3>
                  <p className="text-base md:text-lg lg:text-xl text-gray-600 mb-6 md:mb-8 max-w-2xl mx-auto px-4 lg:px-0">
                    Thank you for sharing your prayer request with us. Our
                    prayer team has been notified and will be praying for you.
                    Your request has been sent to our admin dashboard where our
                    team can track and manage it. May God bless you and provide
                    you with strength and peace.
                  </p>
                  <Button
                    onClick={() => setSubmitStatus("idle")}
                    variant="outline"
                    size="lg"
                    className="group text-sm md:text-base"
                  >
                    <ArrowRight className="mr-2 h-4 w-4 md:h-5 md:w-5 group-hover:translate-x-1 transition-transform" />
                    Submit Another Request
                  </Button>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-6 md:space-y-8"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    {/* Full Name */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                    >
                      <label
                        htmlFor="fullName"
                        className="block text-sm font-semibold text-gray-700 mb-2 md:mb-3"
                      >
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 md:px-6 py-3 md:py-4 border border-gray-300 rounded-lg md:rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white text-gray-900 placeholder-gray-500 transition-all duration-300 hover:border-red-300 text-sm md:text-base"
                        placeholder="Enter your full name"
                      />
                    </motion.div>

                    {/* Phone Number */}
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <label
                        htmlFor="phoneNumber"
                        className="block text-sm font-semibold text-gray-700 mb-2 md:mb-3"
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        className="w-full px-4 md:px-6 py-3 md:py-4 border border-gray-300 rounded-lg md:rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white text-gray-900 placeholder-gray-500 transition-all duration-300 hover:border-red-300 text-sm md:text-base"
                        placeholder="Enter your phone number"
                      />
                    </motion.div>
                  </div>

                  {/* Email */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-gray-700 mb-2 md:mb-3"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 md:px-6 py-3 md:py-4 border border-gray-300 rounded-lg md:rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white text-gray-900 placeholder-gray-500 transition-all duration-300 hover:border-red-300 text-sm md:text-base"
                      placeholder="Enter your email address"
                    />
                  </motion.div>

                  {/* Prayer Request */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <label
                      htmlFor="prayerRequest"
                      className="block text-sm font-semibold text-gray-700 mb-2 md:mb-3"
                    >
                      How Can We Pray For You? *
                    </label>
                    <textarea
                      id="prayerRequest"
                      name="prayerRequest"
                      value={formData.prayerRequest}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 md:px-6 py-3 md:py-4 border border-gray-300 rounded-lg md:rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white text-gray-900 placeholder-gray-500 transition-all duration-300 hover:border-red-300 resize-vertical text-sm md:text-base"
                      placeholder="Please share your prayer request here. You can include as much detail as you feel comfortable sharing..."
                    />
                  </motion.div>

                  {/* Submit Button */}
                  <motion.div
                    className="flex items-center justify-center pt-6 md:pt-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      size="lg"
                      className="relative overflow-hidden bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-lg md:rounded-xl text-sm md:text-base lg:text-lg font-semibold transition-all duration-300 group border-0 min-w-[200px] md:min-w-[250px] h-12 md:h-14"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-red-400/20 to-red-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 md:w-6 md:h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span className="relative z-10 ml-2 text-sm md:text-base">
                            Submitting...
                          </span>
                        </>
                      ) : (
                        <>
                          <Send className="h-5 w-5 md:h-6 md:w-6 mr-2 group-hover:scale-110 transition-transform" />
                          <span className="relative z-10">
                            Submit Prayer Request
                          </span>
                        </>
                      )}
                    </Button>
                  </motion.div>

                  {/* Error Message */}
                  {submitStatus === "error" && (
                    <motion.div
                      className="flex items-center justify-center p-4 md:p-6 bg-red-50 border border-red-200 rounded-lg md:rounded-xl"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <AlertCircle className="w-5 h-5 md:w-6 md:h-6 text-red-600 mr-2 md:mr-3" />
                      <span className="text-red-700 font-medium text-sm md:text-base">
                        There was an error submitting your prayer request.
                        Please try again.
                      </span>
                    </motion.div>
                  )}
                </form>
              )}
            </div>
          </div>
        </motion.div>

        {/* Privacy Notice */}
        <motion.div
          className="mt-8 md:mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-3 md:px-4 py-2 bg-gradient-to-r from-gray-50 to-gray-100 rounded-full border border-gray-200">
            <Shield className="h-3 w-3 md:h-4 md:w-4 text-gray-600" />
            <span className="text-xs md:text-sm text-gray-600">
              Your prayer requests are treated with the utmost confidentiality
              and respect
            </span>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
