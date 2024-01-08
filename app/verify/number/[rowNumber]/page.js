import VerificationPage from "../../verificationPage";
import { updater } from "../../updateVerificationStatus";

export default function Page() {
  updater(params.rowNumber, "number");
  return <VerificationPage verifiedWhat={"Number"} />;
}
