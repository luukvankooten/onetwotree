import Neode from "neode";

export default new Neode(
  process.env.NEO4J_HOST || "",
  process.env.NEO4J_USERNAME || "",
  process.env.NEO4J_PASSWORD || ""
);
