export default function Contact() {
  return (
    <div className="min-h-screen bg-[#001E2B] text-white overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-green-500/20 blur-[120px]" />
      <div className="absolute bottom-20 right-10 h-72 w-72 rounded-full bg-emerald-400/20 blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">

        {/* Hero */}

        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-block px-4 py-2 rounded-full bg-[#00ED64]/10 border border-[#00ED64]/20 text-[#00ED64] text-sm">
            Contact HireWise
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mt-6">
            We'd Love To
            <span className="block text-[#00ED64]">
              Hear From You
            </span>
          </h1>

          <p className="text-gray-400 mt-6 text-lg">
            Questions, feedback, feature requests, or partnership
            opportunities? Reach out and we'll get back to you.
          </p>
        </div>

        {/* Main Section */}

        <div className="grid lg:grid-cols-5 gap-8 mt-16">

          {/* Form */}

          <div className="lg:col-span-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8">

            <h2 className="text-2xl font-semibold mb-6">
              Send a Message
            </h2>

            <form className="space-y-5">

              <input
                type="text"
                placeholder="Your Name"
                className="w-full bg-[#0C2A36] border border-[#1f3a47] rounded-xl px-4 py-4 outline-none focus:border-[#00ED64]"
              />

              <input
                type="email"
                placeholder="Your Email"
                className="w-full bg-[#0C2A36] border border-[#1f3a47] rounded-xl px-4 py-4 outline-none focus:border-[#00ED64]"
              />

              <input
                type="text"
                placeholder="Subject"
                className="w-full bg-[#0C2A36] border border-[#1f3a47] rounded-xl px-4 py-4 outline-none focus:border-[#00ED64]"
              />

              <textarea
                rows="6"
                placeholder="Write your message..."
                className="w-full bg-[#0C2A36] border border-[#1f3a47] rounded-xl px-4 py-4 outline-none resize-none focus:border-[#00ED64]"
              />

              <button
                type="submit"
                className="w-full bg-[#00ED64] text-black py-4 rounded-xl font-semibold hover:scale-[1.02] transition"
              >
                Send Message
              </button>

            </form>
          </div>

          {/* Contact Cards */}

          <div className="lg:col-span-2 space-y-5">

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
              <h3 className="text-[#00ED64] text-xl font-semibold">
                📧 Email Support
              </h3>

              <p className="text-gray-400 mt-3">
                support@hirewise.com
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
              <h3 className="text-[#00ED64] text-xl font-semibold">
                ⏱ Response Time
              </h3>

              <p className="text-gray-400 mt-3">
                Usually within 24 hours.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
              <h3 className="text-[#00ED64] text-xl font-semibold">
                💡 Feature Requests
              </h3>

              <p className="text-gray-400 mt-3">
                Suggest new AI features and improvements.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
              <h3 className="text-[#00ED64] text-xl font-semibold">
                🌐 Social Links
              </h3>

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

        <div className="mt-24">

          <h2 className="text-4xl font-bold text-center">
            Frequently Asked Questions
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mt-12">

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="font-semibold text-lg">
                Is HireWise free to use?
              </h3>

              <p className="text-gray-400 mt-3">
                Yes, HireWise currently offers its core
                AI-powered features for free.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="font-semibold text-lg">
                How accurate is ATS analysis?
              </h3>

              <p className="text-gray-400 mt-3">
                Our AI evaluates resumes using ATS-inspired
                scoring and recommendations.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="font-semibold text-lg">
                Are my resumes stored securely?
              </h3>

              <p className="text-gray-400 mt-3">
                Yes. Your data remains private and accessible
                only to your account.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="font-semibold text-lg">
                Can I suggest new features?
              </h3>

              <p className="text-gray-400 mt-3">
                Absolutely. We actively improve HireWise
                based on user feedback.
              </p>
            </div>

          </div>
        </div>

        {/* CTA */}

        <div className="text-center mt-24 bg-white/5 border border-white/10 rounded-3xl p-12">

          <h2 className="text-4xl font-bold">
            Ready To Improve Your Resume?
          </h2>

          <p className="text-gray-400 mt-4">
            Let HireWise analyze your resume and prepare
            you for your next opportunity.
          </p>

          <button className="mt-8 bg-[#00ED64] text-black px-8 py-4 rounded-xl font-semibold hover:scale-105 transition">
            Get Started
          </button>

        </div>

      </div>
    </div>
  );
}