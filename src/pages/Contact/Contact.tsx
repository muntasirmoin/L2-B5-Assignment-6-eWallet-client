import { useState } from "react";
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
      // setSubmitted(true);
      setLoading(false);
      setFormData({ name: "", email: "", phone: "", message: "" });
      toast.success("Message sent successfully!");
    }, 1500);
  };

  return (
    <section className="min-h-screen px-4 py-16 md:px-8 bg-gradient-to-br from-indigo-900 via-blue-950 to-blue-900 text-white">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold sm:text-4xl text-center mb-6">
          Get in Touch
        </h2>
        <p className="text-center text-white/80 mb-10">
          Have questions or feedback? Fill out the form and we’ll get back to
          you shortly. For urgent issues, please call e-wallet 689 support at
          689 —available 24/7.
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-white/10 backdrop-blur-lg p-8 rounded-xl shadow-lg space-y-6"
        >
          <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
            <div className="md:w-1/2">
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md bg-white/90 text-black focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
            <div className="md:w-1/2">
              <label htmlFor="phone" className="block text-sm font-medium mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md bg-white/90 text-black focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-white/90 text-black focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-1">
              Message
            </label>
            <textarea
              name="message"
              required
              rows={5}
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-white/90 text-black focus:outline-none focus:ring-2 focus:ring-indigo-400"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full cursor-pointer bg-indigo-600 hover:bg-green-500 text-white font-semibold py-2 px-4 rounded-md transition"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
