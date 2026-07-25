import { LuSparkles } from "react-icons/lu";
import { FiX } from "react-icons/fi";

function RiskBadge({ status }) {
  const isAtRisk = status === "At Risk";

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
        isAtRisk
          ? "bg-red-100 text-red-700 ring-1 ring-inset ring-red-600/20"
          : "bg-emerald-100 text-emerald-700 ring-1 ring-inset ring-emerald-600/20"
      }`}
    >
      {status}
    </span>
  );
}

export default function StudentRiskModal({ student, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/50 p-4 sm:items-center">
      <div className="w-full max-w-2xl overflow-hidden rounded-xl bg-white shadow-lg">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 px-6 py-5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
              <span className="text-lg font-bold">
                {student.firstName.charAt(0)}
                {student.lastName.charAt(0)}
              </span>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-900">
                {student.firstName} {student.lastName}
              </h3>
              <p className="text-sm text-slate-500">{student.studentId}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <RiskBadge status={student.status} />

            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
            >
              <FiX size={20} />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="max-h-[60vh] overflow-y-auto px-6 py-6">
          {/* Score Cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-sm font-medium text-slate-500">SBA Score</p>
              <p className="mt-1 text-2xl font-bold">{student.sbaScore}</p>
            </div>

            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-sm font-medium text-slate-500">Exam Score</p>
              <p className="mt-1 text-2xl font-bold">{student.examScore}</p>
            </div>
          </div>

          {/* AI Analysis */}
          <div className="mt-6 rounded-xl border border-slate-100 bg-blue-50 p-5">
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                <LuSparkles size={16} />
              </div>

              <h4 className="text-base font-semibold">AI Risk Analysis</h4>
            </div>

            <div className="space-y-4">
              <div>
                <p className="font-medium text-slate-700">Explanation</p>
                <p className="text-sm text-slate-600">
                  {student.analysis.explanation}
                </p>
              </div>

              <div>
                <p className="font-medium text-slate-700">Root Cause</p>
                <p className="text-sm text-slate-600">
                  {student.analysis.rootCause}
                </p>
              </div>

              <div>
                <p className="font-medium text-slate-700">
                  Recommended Interventions
                </p>

                <ol className="list-decimal pl-5 mt-2 space-y-1 text-sm text-slate-600">
                  {student.analysis.remedialPlan.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ol>
              </div>

              <div>
                <p className="font-medium text-slate-700">
                  Suggested Quiz Topics
                </p>

                <div className="mt-2 flex flex-wrap gap-2">
                  {student.analysis.suggestedQuizTopics.map((topic, index) => (
                    <span
                      key={index}
                      className="rounded-full bg-white px-3 py-1 text-xs font-medium ring-1 ring-slate-200"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end border-t border-slate-100 px-6 py-4">
          <button
            onClick={onClose}
            className="rounded-xl bg-blue-600 px-5 py-2 text-white hover:bg-blue-700 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
