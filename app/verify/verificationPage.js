export default function VerificationPage({ verifiedWhat }) {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold my-5">
            {verifiedWhat} Verification Successful 👍🏻
          </h1>
          <a href="\" className="btn btn-primary m-3">
            Go Back Home
          </a>
        </div>
      </div>
    </div>
  );
}
