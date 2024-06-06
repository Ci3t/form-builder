import Link from "next/link";

function Hero() {
  return (
    <section className="bg-gray-50 h-screen">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen ">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-extrabold sm:text-5xl">
            Create Forms Effortlessly
            <strong className="font-extrabold text-primary sm:block">
              Generate Custom Forms with AI Assistance
            </strong>
          </h1>

          <p className="mt-4 sm:text-xl/relaxed">
            Welcome to FormAi, the ultimate solution for creating survey forms
            with ease. Simply log in, describe your survey needs to our AI, and
            receive fully functional form code ready to use. Save time and
            enhance your productivity with our innovative tool.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <div
              className="block w-full rounded bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-[#C85D1B] focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
              href="#"
            >
              <Link href={"/dashboard"}>Create AI Form</Link>
            </div>
            <a
              className="block w-full rounded px-12 py-3 text-sm font-medium text-primary shadow hover:text-[#C85D1B] focus:outline-none focus:ring active:text-red-500 sm:w-auto"
              href="#"
            >
              Learn More
            </a>
            <blockquote>
              "FormAi has revolutionized the way we create surveys. It's fast,
              efficient, and incredibly easy to use!" - Jane Doe, Product
              Manager
            </blockquote>
            {/* Feature Highlights: */}
            {/* AI-Powered Form Creation: Instantly generate forms based on your requirements.
Customizable Templates: Tailor each form to match your unique needs.
Instant Form Code: Receive ready-to-use form code for easy integration */}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
