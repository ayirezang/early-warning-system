import React from "react";
import { LuBrain } from "react-icons/lu";
import { FaArrowRight } from "react-icons/fa";
import { FiShield, FiEdit3, FiActivity } from "react-icons/fi";
import { Link } from "react-router-dom";

const Home = () => {
  const steps = [
    {
      number: "01",
      icon: <FiEdit3 className="w-5 h-5 text-white" />,
      title: "Enter Scores",
      description:
        "Teachers log in and record student SBA (School-Based Assessment) and end-of-semester examination scores in a simple, clean form.",
    },
    {
      number: "02",
      icon: <LuBrain className="w-5 h-5 text-white" />,
      title: "AI Analyzes Risk",
      description:
        'Our AI-powered engine analyzes each student\'s performance and classifies them as "On Track" or "At Risk" with clear reasoning.',
    },
    {
      number: "03",
      icon: <FiActivity className="w-5 h-5 text-white" />,
      title: "Intervene Early",
      description:
        "Teachers and admins receive AI-generated intervention recommendations and suggested quiz topics so no student is left behind.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4 sm:py-5 bg-white border-b border-slate-100">
        <Link to="/" className="flex items-center gap-2 sm:gap-3">
          <div className="bg-blue-600 p-1.5 sm:p-2 rounded-lg">
            <FiShield className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <h1 className="text-base sm:text-xl font-bold text-slate-900 leading-tight">
            Early Warning System
          </h1>
        </Link>

        <div className="flex items-center gap-3">
          <Link to="/sign-up">
            <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg transition-colors">
              Get Started
            </button>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="flex flex-col items-center text-center px-4 sm:px-6 lg:px-8 py-16 sm:py-24 max-w-4xl mx-auto">
        <div className="flex items-center gap-2 px-4 py-1.5 bg-blue-50 rounded-full mb-6">
          <LuBrain className="w-4 h-4 text-blue-600" />
          <p className="text-sm font-medium text-blue-600">
            AI-Powered Academic Risk Detection
          </p>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 tracking-tight">
          Catch students before they{" "}
          <span className="text-blue-600"> {" "}fall behind</span>
        </h1>

        <p className="mt-6 text-base sm:text-lg lg:text-xl leading-relaxed text-slate-600 max-w-2xl mb-8">
          Early Warning System uses AI to analyze student scores and flag
          at-risk learners early so teachers and administrators can intervene
          while it still matters.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link to="/login">
            <button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors">
              Open Dashboard <FaArrowRight size={14} />
            </button>
          </Link>
          <button className="w-full sm:w-auto border border-slate-200 text-slate-700 hover:bg-slate-50 font-medium px-6 py-3 rounded-lg transition-colors">
            How It Works
          </button>
        </div>
      </section>

      {/* How it works */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 max-w-6xl mx-auto bg-slate-50/50">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            How it works
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            From score entry to AI-driven risk analysis in three simple steps
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {steps.map((step) => (
            <div
              key={step.number}
              className="bg-white rounded-xl shadow-sm border border-slate-100 p-6"
            >
              <div className="bg-blue-600 w-10 h-10 rounded-lg flex items-center justify-center mb-4">
                {step.icon}
              </div>
              <p className="text-blue-600 font-semibold text-sm mb-1">
                {step.number}
              </p>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-slate-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Built for schools */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-3">
          Built for schools that care
        </h2>
        <p className="text-lg text-slate-600 max-w-xl mx-auto">
          Simple tools to identify, track, and support every at-risk student.
        </p>
      </section>

      {/* CTA */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 max-w-6xl mx-auto">
        <div className="rounded-2xl bg-slate-900 px-6 sm:px-16 py-12 sm:py-20 text-center text-white">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Ready to protect your students?
          </h2>
          <p className="mt-4 text-lg text-slate-300 max-w-xl mx-auto mb-8">
            Open the dashboard and start entering scores. The AI will do the
            rest — flagging at-risk students so you can intervene early.
          </p>
          <Link to="/login">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg inline-flex items-center gap-2 transition-colors">
              Open Dashboard <FaArrowRight size={14} />
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-100 bg-slate-50/50 px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-1.5 rounded-lg">
              <FiShield className="w-4 h-4 text-white" />
            </div>
            <span className="text-base font-bold text-slate-900">
              Early Warning System
            </span>
          </div>
          <p className="text-sm text-slate-500 text-center">
            © 2026 Early Warning System. Intervene before it's too late.
          </p>
          <Link
            to="/login"
            className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
          >
            Dashboard
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default Home;

