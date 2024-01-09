import VerificationPage from "../../verificationPage";
import { updater } from "../../updateVerificationStatus";

export default async function Page({ params }) {
  await updater(decodeURIComponent(params.rowNumber), "number");
  return <VerificationPage verifiedWhat={"Number"} />;
}
