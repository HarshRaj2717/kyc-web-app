import VerificationPage from "../../verificationPage";
import { updater } from "../../updateVerificationStatus";

export default async function Page({ params }) {
  updater(params.rowNumber, "email");
  return <VerificationPage verifiedWhat={"Email"} />;
}
