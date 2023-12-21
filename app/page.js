import Link from "next/link";

function Hero() {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Welcome to Flexibl</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          <Link className="btn btn-primary" href="/kyc">
            Fill KYC form
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="">
      <Hero />
    </main>
  );
}
