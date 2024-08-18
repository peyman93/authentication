const hashPassword = async (pass: string) => {
  return await Bun.password.hash(pass, {
    algorithm: "argon2id",
    memoryCost: 65536,
    timeCost: 3,
  });
};

export { hashPassword };
