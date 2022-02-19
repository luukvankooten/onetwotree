import { Loading } from "../Loading";
import Button from "./Button";

export function ButtonLoading() {
  return (
    <Button style={{ paddingTop: "0", paddingBottom: "0", height: "40px" }}>
      <Loading />
    </Button>
  );
}
