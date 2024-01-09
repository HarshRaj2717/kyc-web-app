import VerificationPage from "../../verificationPage";
import { updater } from "../../updateVerificationStatus";

export default async function Page({ params }) {
  await updater(decodeURIComponent(params.rowNumber), "college_email");
  return <VerificationPage verifiedWhat={"College Email"} />;
}
