"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setFormData({ name: "", email: "", phone: "", message: "" });
      toast.success("Message sent successfully!");
    }, 1500);
  };

  return (
    <section
      className="relative min-h-screen px-4 py-10 md:px-8 overflow-hidden 
                        bg-gradient-to-br from-indigo-50 via-blue-100 to-indigo-200 
                        dark:from-[#0f172a] dark:via-[#1e293b] dark:to-[#0f172a] 
                        transition-colors duration-700"
    >
      {/* Subtle moving gradient background blob */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3, scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
        className="absolute top-20 left-1/4 w-96 h-96 bg-gradient-to-tr from-indigo-400 via-purple-500 to-pink-400 
                   blur-[120px] rounded-full opacity-30 pointer-events-none"
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.25, scale: [1, 1.3, 1] }}
        transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
        className="absolute bottom-10 right-1/4 w-96 h-96 bg-gradient-to-tr from-blue-500 via-cyan-400 to-indigo-500 
                   blur-[120px] rounded-full opacity-25 pointer-events-none"
      />

      {/* Content Container */}
      <div className="max-w-3xl mx-auto relative z-10 text-center">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-4xl sm:text-5xl font-extrabold mb-4 
                     bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 
                     bg-clip-text text-transparent drop-shadow-lg"
        >
          Get in Touch
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-gray-700 dark:text-gray-300 mb-3 max-w-xl mx-auto text-lg leading-relaxed"
        >
          Have questions or feedback? Fill out the form below — we’ll get back
          to you shortly. For urgent issues, call our support at{" "}
          <span className="font-semibold text-indigo-500 dark:text-indigo-400">
            689
          </span>{" "}
          (24/7).
        </motion.p>
      </div>

      {/* Form Card */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative max-w-3xl mx-auto bg-white/70 dark:bg-white/5 backdrop-blur-2xl 
                   border border-white/20 dark:border-white/10 p-10 rounded-3xl 
                   shadow-[0_0_60px_-10px_rgba(99,102,241,0.4)] space-y-2
                   transition-all duration-500"
      >
        {/* Floating glow border accent */}
        <div
          className="absolute inset-0 rounded-3xl border border-transparent bg-gradient-to-r 
                        from-indigo-500 via-purple-500 to-blue-500 opacity-10 blur-md -z-10"
        />

        {/* Input fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <label
              htmlFor="name"
              className="block text-sm font-semibold mb-2 text-gray-800 dark:text-gray-200"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-white/90 dark:bg-gray-900 text-black dark:text-white 
                         focus:outline-none focus:ring-2 focus:ring-indigo-400 transition placeholder:text-gray-400"
              placeholder=""
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <label
              htmlFor="phone"
              className="block text-sm font-semibold mb-2 text-gray-800 dark:text-gray-200"
            >
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-white/90 dark:bg-gray-900 text-black dark:text-white 
                         focus:outline-none focus:ring-2 focus:ring-indigo-400 transition placeholder:text-gray-400"
              placeholder=""
            />
          </motion.div>
        </div>

        {/* Email */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <label
            htmlFor="email"
            className="block text-sm font-semibold mb-2 text-gray-800 dark:text-gray-200"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-white/90 dark:bg-gray-900 text-black dark:text-white 
                       focus:outline-none focus:ring-2 focus:ring-indigo-400 transition placeholder:text-gray-400"
            placeholder=""
          />
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <label
            htmlFor="message"
            className="block text-sm font-semibold mb-2 text-gray-800 dark:text-gray-200"
          >
            Message
          </label>
          <textarea
            name="message"
            required
            rows={5}
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-white/90 dark:bg-gray-900 text-black dark:text-white 
                       focus:outline-none focus:ring-2 focus:ring-indigo-400 transition placeholder:text-gray-400 resize-none"
            placeholder="Write your message..."
          ></textarea>
        </motion.div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-gradient-to-r from-indigo-600 via-purple-500 to-blue-500 
                     hover:shadow-[0_0_25px_rgba(99,102,241,0.6)] text-white font-semibold 
                     py-3 px-6 rounded-xl transition-all duration-300 cursor-pointer"
        >
          {loading ? "Sending..." : "Send Message"}
        </motion.button>
      </motion.form>
    </section>
  );
};

export default Contact;
