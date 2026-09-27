import { useState } from "react";

const API_URL = "http://localhost:8000";

const platforms = [
  "Facebook",
  "LinkedIn",
  "Instagram",
  "Snapchat",
  "Twitter",
  "YouTube",
  "TikTok",
  "LINE",
  "KakaoTalk",
  "VKontakte",
  "WhatsApp",
  "WeChat",
];

const countries = [
  "India",
  "USA",
  "Canada",
  "Australia",
  "UK",
  "Germany",
  "Mexico",
  "Turkey",
  "France",
  "Other",
];

const initialForm = {
  age: 21,
  gender: "Male",
  country: "India",
  academic_level: "Undergraduate",
  most_used_platform: "Instagram",
  purpose_of_use: "Entertainment",
  avg_daily_usage_hours: 3,
  daily_unlocks: 40,
  study_hours: 4,
  physical_activity_hours: 1,
  sleep_hours_per_night: 7,
  stress_level: "Medium",
};

function App() {
  const [form, setForm] = useState(initialForm);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: [
        "age",
        "daily_unlocks",
      ].includes(name)
        ? Number(value)
        : [
            "avg_daily_usage_hours",
            "study_hours",
            "physical_activity_hours",
            "sleep_hours_per_night",
          ].includes(name)
        ? Number(value)
        : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch(`${API_URL}/predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData?.detail
            ? JSON.stringify(errorData.detail)
            : "Unable to get prediction"
        );
      }

      const data = await response.json();
      setResult(data.predicted_mental_health_score);
    } catch (err) {
      setError(
        err.message ||
          "Could not connect to the prediction server."
      );
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm(initialForm);
    setResult(null);
    setError("");
  };

  return (
    <div className="min-h-screen bg-[#f5f7fb] text-slate-900">
      {/* Background decoration */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-indigo-200/40 blur-3xl" />
        <div className="absolute -right-40 top-20 h-96 w-96 rounded-full bg-purple-200/40 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-cyan-100/40 blur-3xl" />
      </div>

      {/* Header */}
      <header className="border-b border-slate-200/70 bg-white/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 text-xl text-white shadow-lg shadow-indigo-200">
              🧠
            </div>

            <div>
              <h1 className="text-lg font-bold tracking-tight text-slate-900">
                MindScore
              </h1>
              <p className="text-xs text-slate-500">
                Student wellness insights
              </p>
            </div>
          </div>

          <div className="hidden items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700 sm:flex">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Prediction system online
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-8 lg:px-8 lg:py-12">
        {/* Hero */}
        <section className="mb-10 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white px-4 py-2 text-sm font-medium text-indigo-600 shadow-sm">
            <span>✨</span>
            AI-powered student wellness prediction
          </div>

          <h2 className="mx-auto max-w-3xl text-4xl font-black tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Understand your{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
              mental wellness
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-500 sm:text-lg">
            Enter a few lifestyle and academic details to receive a
            model-generated mental health score.
          </p>
        </section>

        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="overflow-hidden rounded-3xl border border-white/80 bg-white shadow-xl shadow-slate-200/50"
          >
            <div className="border-b border-slate-100 px-6 py-6 sm:px-8">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-xl">
                  👤
                </div>

                <div>
                  <h3 className="text-xl font-bold">
                    Student profile
                  </h3>
                  <p className="text-sm text-slate-500">
                    Tell us a little about yourself
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-8 p-6 sm:p-8">
              {/* Basic information */}
              <section>
                <SectionTitle
                  number="01"
                  title="Basic information"
                />

                <div className="grid gap-5 sm:grid-cols-2">
                  <InputField
                    label="Age"
                    name="age"
                    type="number"
                    min="10"
                    max="100"
                    value={form.age}
                    onChange={handleChange}
                  />

                  <SelectField
                    label="Gender"
                    name="gender"
                    value={form.gender}
                    onChange={handleChange}
                    options={["Male", "Female"]}
                  />

                  <SelectField
                    label="Country"
                    name="country"
                    value={form.country}
                    onChange={handleChange}
                    options={countries}
                  />

                  <SelectField
                    label="Academic level"
                    name="academic_level"
                    value={form.academic_level}
                    onChange={handleChange}
                    options={[
                      "Undergraduate",
                      "Graduate",
                      "High School",
                    ]}
                  />
                </div>
              </section>

              {/* Social media */}
              <section>
                <SectionTitle
                  number="02"
                  title="Digital habits"
                />

                <div className="grid gap-5 sm:grid-cols-2">
                  <SelectField
                    label="Most used platform"
                    name="most_used_platform"
                    value={form.most_used_platform}
                    onChange={handleChange}
                    options={platforms}
                  />

                  <SelectField
                    label="Main purpose"
                    name="purpose_of_use"
                    value={form.purpose_of_use}
                    onChange={handleChange}
                    options={[
                      "Networking",
                      "Education",
                      "Entertainment",
                      "News",
                    ]}
                  />
                </div>

                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  <RangeField
                    label="Daily social media usage"
                    name="avg_daily_usage_hours"
                    value={form.avg_daily_usage_hours}
                    onChange={handleChange}
                    min="0"
                    max="24"
                    step="0.5"
                    suffix="hours"
                  />

                  <RangeField
                    label="Daily phone unlocks"
                    name="daily_unlocks"
                    value={form.daily_unlocks}
                    onChange={handleChange}
                    min="0"
                    max="300"
                    step="1"
                    suffix="times"
                  />
                </div>
              </section>

              {/* Lifestyle */}
              <section>
                <SectionTitle
                  number="03"
                  title="Lifestyle & routine"
                />

                <div className="grid gap-6 sm:grid-cols-2">
                  <RangeField
                    label="Study hours per day"
                    name="study_hours"
                    value={form.study_hours}
                    onChange={handleChange}
                    min="0"
                    max="24"
                    step="0.5"
                    suffix="hours"
                  />

                  <RangeField
                    label="Physical activity"
                    name="physical_activity_hours"
                    value={form.physical_activity_hours}
                    onChange={handleChange}
                    min="0"
                    max="24"
                    step="0.5"
                    suffix="hours"
                  />

                  <RangeField
                    label="Sleep per night"
                    name="sleep_hours_per_night"
                    value={form.sleep_hours_per_night}
                    onChange={handleChange}
                    min="0"
                    max="24"
                    step="0.5"
                    suffix="hours"
                  />

                  <SelectField
                    label="Current stress level"
                    name="stress_level"
                    value={form.stress_level}
                    onChange={handleChange}
                    options={[
                      "Low",
                      "Medium",
                      "High",
                      "Very High",
                    ]}
                  />
                </div>
              </section>

              {/* Error */}
              {error && (
                <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                  <div className="flex gap-3">
                    <span>⚠️</span>
                    <div>
                      <p className="font-semibold">
                        Prediction failed
                      </p>
                      <p className="mt-1 break-words text-red-600">
                        {error}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Buttons */}
              <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                <button
                  type="submit"
                  disabled={loading}
                  className="group flex flex-1 items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4 font-bold text-white shadow-lg shadow-indigo-200 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-300 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <Spinner />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      Get my score
                      <span className="transition group-hover:translate-x-1">
                        →
                      </span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-2xl border border-slate-200 px-6 py-4 font-semibold text-slate-600 transition hover:bg-slate-50"
                >
                  Reset
                </button>
              </div>
            </div>
          </form>

          {/* Result panel */}
          <aside className="lg:sticky lg:top-8 lg:self-start">
            <div className="overflow-hidden rounded-3xl bg-slate-900 shadow-2xl shadow-slate-300">
              <div className="relative overflow-hidden p-7">
                <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-indigo-500/20 blur-2xl" />
                <div className="absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-purple-500/20 blur-2xl" />

                <div className="relative">
                  <div className="mb-7 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-400">
                        Your result
                      </p>
                      <h3 className="mt-1 text-xl font-bold text-white">
                        Mental health score
                      </h3>
                    </div>

                    <div className="rounded-xl bg-white/10 px-3 py-2 text-lg">
                      🧠
                    </div>
                  </div>

                  {result !== null ? (
                    <ResultScore score={result} />
                  ) : (
                    <EmptyResult />
                  )}

                  <div className="mt-7 rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs leading-5 text-slate-400">
                      This score is generated by your machine
                      learning model based on the information
                      provided. It is not a medical diagnosis.
                    </p>
                  </div>
                </div>
              </div>

              {/* Info cards */}
              <div className="grid grid-cols-3 border-t border-white/10">
                <InfoItem icon="🌙" text="Sleep" />
                <InfoItem icon="📚" text="Study" />
                <InfoItem icon="🏃" text="Activity" />
              </div>
            </div>

            {/* Tips */}
            <div className="mt-5 rounded-3xl border border-indigo-100 bg-indigo-50/70 p-6">
              <div className="flex gap-3">
                <div className="text-xl">💡</div>
                <div>
                  <h4 className="font-bold text-indigo-950">
                    Small habits matter
                  </h4>
                  <p className="mt-1 text-sm leading-6 text-indigo-700/70">
                    Consistent sleep, physical activity, study
                    breaks, and healthy digital habits can all
                    contribute to overall wellbeing.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>

        <footer className="mt-10 text-center text-xs text-slate-400">
          MindScore • Educational wellness prediction interface
        </footer>
      </main>
    </div>
  );
}

/* ---------------- Components ---------------- */

function SectionTitle({ number, title }) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-xs font-bold text-indigo-600">
        {number}
      </span>
      <h3 className="font-bold text-slate-800">{title}</h3>
    </div>
  );
}

function InputField({
  label,
  name,
  value,
  onChange,
  type = "text",
  min,
  max,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-700">
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        min={min}
        max={max}
        onChange={onChange}
        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
      />
    </div>
  );
}

function SelectField({
  label,
  name,
  value,
  onChange,
  options,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-700">
        {label}
      </label>

      <div className="relative">
        <select
          name={name}
          value={value}
          onChange={onChange}
          className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 pr-10 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
          ▾
        </span>
      </div>
    </div>
  );
}

function RangeField({
  label,
  name,
  value,
  onChange,
  min,
  max,
  step,
  suffix,
}) {
  const percentage =
    ((value - Number(min)) / (Number(max) - Number(min))) * 100;

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <label className="text-sm font-semibold text-slate-700">
          {label}
        </label>

        <span className="rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-bold text-indigo-600">
          {value} {suffix}
        </span>
      </div>

      <input
        type="range"
        name={name}
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={onChange}
        style={{
          background: `linear-gradient(to right, #6366f1 ${percentage}%, #e2e8f0 ${percentage}%)`,
        }}
        className="h-2 w-full cursor-pointer appearance-none rounded-full accent-indigo-600"
      />

      <div className="mt-2 flex justify-between text-[11px] text-slate-400">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}

function ResultScore({ score }) {
  const percentage = Math.min(Math.max((score / 10) * 100, 0), 100);

  return (
    <div className="text-center">
      <div className="relative mx-auto flex h-52 w-52 items-center justify-center">
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `conic-gradient(#818cf8 ${percentage}%, rgba(255,255,255,0.08) ${percentage}%)`,
          }}
        />

        <div className="absolute inset-3 flex flex-col items-center justify-center rounded-full bg-slate-900">
          <span className="text-5xl font-black tracking-tight text-white">
            {Number(score).toFixed(2)}
          </span>

          <span className="mt-1 text-sm text-slate-400">
            out of 10
          </span>
        </div>
      </div>

      <div className="mt-6">
        <p className="text-sm font-medium text-indigo-300">
          Predicted score
        </p>

        <p className="mt-2 text-sm leading-6 text-slate-400">
          Your model has generated a score based on your
          lifestyle, academic and digital-use inputs.
        </p>
      </div>
    </div>
  );
}

function EmptyResult() {
  return (
    <div className="flex min-h-[350px] flex-col items-center justify-center text-center">
      <div className="mb-5 flex h-28 w-28 items-center justify-center rounded-full border border-white/10 bg-white/5 text-5xl">
        ✨
      </div>

      <h4 className="text-lg font-bold text-white">
        Your score is waiting
      </h4>

      <p className="mt-2 max-w-xs text-sm leading-6 text-slate-400">
        Complete the form and click{" "}
        <span className="text-indigo-300">
          “Get my score”
        </span>{" "}
        to see your prediction.
      </p>
    </div>
  );
}

function InfoItem({ icon, text }) {
  return (
    <div className="flex flex-col items-center gap-2 py-4">
      <span className="text-lg">{icon}</span>
      <span className="text-xs font-medium text-slate-400">
        {text}
      </span>
    </div>
  );
}

function Spinner() {
  return (
    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
  );
}

export default App;
