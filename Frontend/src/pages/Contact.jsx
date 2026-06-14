import { useState } from "react";
import toast from "react-hot-toast";

const FAQS = [
  {
    question: "Is HireWise free to use?",
    answer:
      "Yes, HireWise currently offers its core AI-powered features for free.",
  },
  {
    question: "How accurate is ATS analysis?",
    answer:
      "Our AI evaluates resumes using ATS-inspired scoring and recommendations.",
  },
  {
    question: "Are my resumes stored securely?",
    answer:
      "Yes. Your data remains private and accessible only to your account.",
  },
  {
    question: "Can I suggest new features?",
    answer:
      "Absolutely. We actively improve HireWise based on user feedback.",
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      return toast.error("Please fill in all required fields");
    }

    setLoading(true);

    // Simulate request — replace with actual API call
    setTimeout(() => {
      toast.success("Message sent! We'll get back to you soon.");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="relative min-h-screen bg-[#001E2B] text-white overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-green-500/20 blur-[120px]" />
      <div className="absolute bottom-20 right-10 h-72 w-72 rounded-full bg-emerald-400/20 blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-block px-4 py-2 rounded-full bg-[#00ED64]/10 border border-[#00ED64]/20 text-[#00ED64] text-sm">
            Contact HireWise
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mt-6">
            We'd love to
            <span className="block text-[#00ED64]">hear from you</span>
          </h1>

          <p className="text-gray-400 mt-6 text-base sm:text-lg">
            Questions, feedback, feature requests, or partnership
            opportunities? Reach out and we'll get back to you.
          </p>
        </div>

        {/* Main Section */}
        <div className="grid lg:grid-cols-5 gap-8 mt-16">
          {/* Form */}
          <div className="lg:col-span-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8">
            <h2 className="text-2xl font-semibold mb-6">Send a message</h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                  className="w-full bg-[#0C2A36] border border-[#1f3a47] rounded-xl px-4 py-4 outline-none focus:border-[#00ED64] focus:ring-2 focus:ring-[#00ED64]/20 transition placeholder-gray-500"
                />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your email"
                  required
                  className="w-full bg-[#0C2A36] border border-[#1f3a47] rounded-xl px-4 py-4 outline-none focus:border-[#00ED64] focus:ring-2 focus:ring-[#00ED64]/20 transition placeholder-gray-500"
                />
              </div>

              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject"
                className="w-full bg-[#0C2A36] border border-[#1f3a47] rounded-xl px-4 py-4 outline-none focus:border-[#00ED64] focus:ring-2 focus:ring-[#00ED64]/20 transition placeholder-gray-500"
              />

              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="6"
                placeholder="Write your message..."
                required
                className="w-full bg-[#0C2A36] border border-[#1f3a47] rounded-xl px-4 py-4 outline-none resize-none focus:border-[#00ED64] focus:ring-2 focus:ring-[#00ED64]/20 transition placeholder-gray-500"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#00ED64] text-black py-4 rounded-xl font-semibold hover:scale-[1.02] transition disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      />
                    </svg>
                    Sending...
                  </>
                ) : (
                  "Send message"
                )}
              </button>
            </form>
          </div>

          {/* Contact Cards */}
          <div className="lg:col-span-2 space-y-5">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-[#00ED64]/10 flex items-center justify-center text-[#00ED64] flex-shrink-0">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </span>
                <h3 className="text-[#00ED64] text-xl font-semibold">
                  Email support
                </h3>
              </div>

              <p className="text-gray-400 mt-3">support@hirewise.com</p>
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-[#00ED64]/10 flex items-center justify-center text-[#00ED64] flex-shrink-0">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </span>
                <h3 className="text-[#00ED64] text-xl font-semibold">
                  Response time
                </h3>
              </div>

              <p className="text-gray-400 mt-3">Usually within 24 hours.</p>
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-[#00ED64]/10 flex items-center justify-center text-[#00ED64] flex-shrink-0">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.121 9.9a5 5 0 117.072 0c-.567.567-.85 1.295-.85 2.057v1H9.514v-1c0-.762-.283-1.49-.85-2.057z"
                    />
                  </svg>
                </span>
                <h3 className="text-[#00ED64] text-xl font-semibold">
                  Feature requests
                </h3>
              </div>

              <p className="text-gray-400 mt-3">
                Suggest new AI features and improvements.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-[#00ED64]/10 flex items-center justify-center text-[#00ED64] flex-shrink-0">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0zM3.6 9h16.8M3.6 15h16.8M12 3a15 15 0 014 9 15 15 0 01-4 9 15 15 0 01-4-9 15 15 0 014-9z"
                    />
                  </svg>
                </span>
                <h3 className="text-[#00ED64] text-xl font-semibold">
                  Social links
                </h3>
              </div>

              <div className="flex gap-3 mt-4">
                <a
                  href="#"
                  className="bg-[#0C2A36] px-4 py-2 rounded-lg hover:bg-[#00ED64] hover:text-black transition"
                >
                  LinkedIn
                </a>

                <a
                  href="#"
                  className="bg-[#0C2A36] px-4 py-2 rounded-lg hover:bg-[#00ED64] hover:text-black transition"
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-20 sm:mt-24">
          <h2 className="text-3xl sm:text-4xl font-bold text-center">
            Frequently asked questions
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mt-12">
            {FAQS.map((faq) => (
              <div
                key={faq.question}
                className="bg-white/5 border border-white/10 rounded-2xl p-6"
              >
                <h3 className="font-semibold text-lg">{faq.question}</h3>
                <p className="text-gray-400 mt-3">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-20 sm:mt-24 bg-white/5 border border-white/10 rounded-3xl p-8 sm:p-12">
          <h2 className="text-3xl sm:text-4xl font-bold">
            Ready to improve your resume?
          </h2>

          <p className="text-gray-400 mt-4">
            Let HireWise analyze your resume and prepare you for your next
            opportunity.
          </p>

          <button className="mt-8 bg-[#00ED64] text-black px-8 py-4 rounded-xl font-semibold hover:scale-105 transition">
            Get started
          </button>
        </div>
      </div>
    </div>
  );
}