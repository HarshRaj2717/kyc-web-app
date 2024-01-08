import VerificationPage from "../../verificationPage";
import { updater } from "../../updateVerificationStatus";

export default function Page() {
  updater(params.rowNumber, "college_email");
  return <VerificationPage verifiedWhat={"College Email"} />;
}
