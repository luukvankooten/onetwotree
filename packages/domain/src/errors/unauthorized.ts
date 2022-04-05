class Unauthorized extends Error {
  constructor(message?: string) {
    super(message ?? "Not authorized");
    this.name = "Unauthorized";
  }
}

export default Unauthorized;
