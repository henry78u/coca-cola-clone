import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageSquare, Sparkles } from "lucide-react";
import PageHero from "../components/PageHero";
import Container from "../components/Container";
import Card from "../components/Card";
import Button from "../components/Button";

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormState>({
    name: "",
    email: "",
    subject: "Class Project Feedback",
    message: "",
  });

  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (): boolean => {
    const newErrors: Partial<FormState> = {};
    if (!formData.name.trim()) newErrors.name = "Please enter your name.";
    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!formData.message.trim()) {
      newErrors.message = "Please write a brief message or question.";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters long.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
    }
  };

  return (
    <div className="w-full bg-[#000000] pb-24 md:pb-32">
      {/* Page Hero with Grid Background */}
      <PageHero
        eyebrow="SAY HELLO"
        title="Get in Touch"
        subtitle="Connect with our student design cohort regarding architecture critiques, design token discussions, or general inquiries."
        backgroundType="grid"
        shinyWord="Touch"
      />

      <Container className="mt-12 md:mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Contact info cards */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#F40009] font-medium">
                Communication Channels
              </span>
              <h2 className="text-3xl font-medium tracking-tighter text-white mt-1">
                We'd Love to Hear From You
              </h2>
              <p className="mt-3 text-sm text-white/80 leading-relaxed">
                Whether you are an instructor evaluating our class deliverable or a student curious about our motion physics and layout tokens, our channels are open.
              </p>
            </div>

            <Card className="p-6 space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#F40009]/15 border border-[#F40009]/30 flex items-center justify-center text-[#F40009] shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
                    Academic Inquiries
                  </h3>
                  <p className="text-sm text-white/80 mt-0.5">design-lab@cocacolaclone.edu</p>
                  <p className="text-xs text-white/50">Response within 24 business hours</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white shrink-0">
                  <Phone className="w-5 h-5 text-[#F40009]" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
                    Design Lab Studio
                  </h3>
                  <p className="text-sm text-white/80 mt-0.5">+1 (404) 555-0186</p>
                  <p className="text-xs text-white/50">Mon – Fri, 9:00 AM – 5:00 PM EST</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#F40009]/15 border border-[#F40009]/30 flex items-center justify-center text-[#F40009] shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
                    Academic Studio Location
                  </h3>
                  <p className="text-sm text-white/80 mt-0.5">Interactive Media Center, Hall 4B</p>
                  <p className="text-xs text-white/50">Atlanta, GA 30332</p>
                </div>
              </div>
            </Card>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-xs text-white/60 space-y-2">
              <p className="font-semibold text-white">Notice on Affiliation:</p>
              <p>
                This form communicates strictly with students in this academic course. All trademarks, recipes, and brand trademarks remain the intellectual property of their respective owners.
              </p>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <Card className="p-8 md:p-12 border border-white/10">
              {submitted ? (
                <div className="text-center py-12 space-y-5">
                  <div className="w-16 h-16 rounded-full bg-[#F40009]/20 border border-[#F40009] flex items-center justify-center text-[#F40009] mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-3xl font-medium tracking-tight text-white">
                    Message Delivered!
                  </h3>
                  <p className="text-sm text-white/80 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-white">{formData.name}</strong>. Your message regarding "{formData.subject}" has been successfully logged to our academic design repository.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: "",
                        email: "",
                        subject: "Class Project Feedback",
                        message: "",
                      });
                    }}
                    className="mt-6 px-8 py-3 rounded-full bg-[#F40009] hover:bg-[#C10007] text-white text-sm font-medium transition-all"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-medium text-white tracking-tight">
                      Send a Message
                    </h3>
                    <p className="text-xs text-white/60 mt-1">
                      Fill out the form below and our design cohort will review your inquiry.
                    </p>
                  </div>

                  {/* Name field */}
                  <div>
                    <label htmlFor="name-input" className="block text-xs uppercase tracking-wider text-white/80 font-medium mb-2">
                      Full Name *
                    </label>
                    <input
                      id="name-input"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex Mercer"
                      className={`w-full px-5 py-3.5 rounded-xl bg-white/5 border text-white placeholder-white/30 text-sm focus:outline-none transition-all ${
                        errors.name
                          ? "border-red-500 focus:ring-1 focus:ring-red-500"
                          : "border-white/10 focus:border-[#F40009] focus:ring-1 focus:ring-[#F40009]"
                      }`}
                    />
                    {errors.name && (
                      <p className="mt-1.5 text-xs text-red-400">{errors.name}</p>
                    )}
                  </div>

                  {/* Email field */}
                  <div>
                    <label htmlFor="email-input" className="block text-xs uppercase tracking-wider text-white/80 font-medium mb-2">
                      Email Address *
                    </label>
                    <input
                      id="email-input"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. alex@example.com"
                      className={`w-full px-5 py-3.5 rounded-xl bg-white/5 border text-white placeholder-white/30 text-sm focus:outline-none transition-all ${
                        errors.email
                          ? "border-red-500 focus:ring-1 focus:ring-red-500"
                          : "border-white/10 focus:border-[#F40009] focus:ring-1 focus:ring-[#F40009]"
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1.5 text-xs text-red-400">{errors.email}</p>
                    )}
                  </div>

                  {/* Subject select */}
                  <div>
                    <label htmlFor="subject-select" className="block text-xs uppercase tracking-wider text-white/80 font-medium mb-2">
                      Topic / Subject
                    </label>
                    <select
                      id="subject-select"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-5 py-3.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-sm focus:outline-none focus:border-[#F40009] focus:ring-1 focus:ring-[#F40009]"
                    >
                      <option value="Class Project Feedback">Class Project Feedback</option>
                      <option value="Design System & Token Critique">Design System & Token Critique</option>
                      <option value="Packaging & Environmental Questions">Packaging & Environmental Questions</option>
                      <option value="Store Locator Inquiries">Store Locator Inquiries</option>
                      <option value="General Greetings">General Greetings</option>
                    </select>
                  </div>

                  {/* Message textarea */}
                  <div>
                    <label htmlFor="message-textarea" className="block text-xs uppercase tracking-wider text-white/80 font-medium mb-2">
                      Your Message *
                    </label>
                    <textarea
                      id="message-textarea"
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Type your feedback, academic evaluation, or questions here..."
                      className={`w-full px-5 py-3.5 rounded-xl bg-white/5 border text-white placeholder-white/30 text-sm focus:outline-none transition-all ${
                        errors.message
                          ? "border-red-500 focus:ring-1 focus:ring-red-500"
                          : "border-white/10 focus:border-[#F40009] focus:ring-1 focus:ring-[#F40009]"
                      }`}
                    />
                    {errors.message && (
                      <p className="mt-1.5 text-xs text-red-400">{errors.message}</p>
                    )}
                  </div>

                  <Button
                    id="submit-contact-form"
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full justify-center"
                    icon={<Send className="w-4 h-4 ml-2" />}
                  >
                    Submit Inquiry
                  </Button>
                </form>
              )}
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Contact;
