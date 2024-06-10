import Image from "next/image";
import Link from "next/link";

function Hero() {
  return (
    <section className="z-10">
      <div className="mx-auto  max-w-screen-xl px-4 pb-2 lg:flex  z-10">
        <div className="mx-auto max-w-xl text-center flex  items-center  flex-col z-10">
          <Image
            src={"/FormAiLogo.png"}
            width={450}
            height={450}
            className="drop-shadow-[5px_5px_0px_rgba(112,73,205,1)] relative  bottom-10"
          />
          <h1 className="text-3xl font-light sm:text-5xl bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gray-400 via-gray-200 to-sky-100 bg-clip-text text-transparent relative  bottom-20">
            Create Forms Effortlessly
            <strong className="font-bold  sm:block bg-gradient-to-tl from-[#3d11a4] to-[#f6f5f7] bg-clip-text text-transparent ">
              Generate Custom Forms with AI Assistance
            </strong>
          </h1>

          <p className="mt-4 sm:text-xl/relaxed text-white relative  bottom-20">
            Welcome to FormAi, the ultimate solution for creating survey forms
            with ease. Simply log in, describe your survey needs to our AI, and
            receive fully functional form code ready to use. Save time and
            enhance your productivity with our innovative tool.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4 text-white bottom-20 relative">
            <div
              className="block w-full rounded bg-[#472B89]  px-12 py-3 text-sm font-medium text-white shadow hover:bg-[#FBFCF6]  hover:text-[#472B89] focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
              href="#"
            >
              <Link href={"/dashboard"}>Create AI Form</Link>
            </div>
            <a
              className="block w-full rounded px-12 py-3 text-sm font-medium text-primary shadow hover:text-[#8c68e0] focus:outline-none focus:ring text-white active:text-red-500 sm:w-auto"
              href="#"
            >
              Learn More
            </a>
            {/* <blockquote>
              "FormAi has revolutionized the way we create surveys. It's fast,
              efficient, and incredibly easy to use!"
              <br />
              <cite>
                <span className="text-[#72B800]">Feature Highlights:</span>{" "}
                AI-Powered Form Creation: Instantly generate forms based on your
                requirements. Customizable Templates: Tailor each form to match
                your unique needs. Instant Form Code: Receive ready-to-use form
                code for easy integration
              </cite>
            </blockquote> */}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
