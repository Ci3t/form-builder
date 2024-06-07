import Link from "next/link";

function Hero() {
  return (
    <section className="bg-gradient-to-t from-gray-900 to-black h-screen">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen ">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-light sm:text-5xl bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gray-400 via-gray-200 to-sky-100 bg-clip-text text-transparent">
            Create Forms Effortlessly
            <strong className="font-bold  sm:block bg-gradient-to-tl from-red-500 to-orange-500 bg-clip-text text-transparent">
              Generate Custom Forms with AI Assistance
            </strong>
          </h1>

          <p className="mt-4 sm:text-xl/relaxed text-white">
            Welcome to FormAi, the ultimate solution for creating survey forms
            with ease. Simply log in, describe your survey needs to our AI, and
            receive fully functional form code ready to use. Save time and
            enhance your productivity with our innovative tool.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4 text-white">
            <div
              className="block w-full rounded bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-[#C85D1B] focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
              href="#"
            >
              <Link href={"/dashboard"}>Create AI Form</Link>
            </div>
            <a
              className="block w-full rounded px-12 py-3 text-sm font-medium text-primary shadow hover:text-[#C85D1B] focus:outline-none focus:ring text-white active:text-red-500 sm:w-auto"
              href="#"
            >
              Learn More
            </a>
            <blockquote>
              "FormAi has revolutionized the way we create surveys. It's fast,
              efficient, and incredibly easy to use!"
              <br />
              <cite>
                <span className="text-orange-400">Feature Highlights:</span>{" "}
                AI-Powered Form Creation: Instantly generate forms based on your
                requirements. Customizable Templates: Tailor each form to match
                your unique needs. Instant Form Code: Receive ready-to-use form
                code for easy integration
              </cite>
            </blockquote>
            <p></p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
