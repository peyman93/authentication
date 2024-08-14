import { ZodTypeAny } from "zod";

// Helper functions to check different password complexity criteria
const containsUppercase = (ch: string) => /[A-Z]/.test(ch);
const containsLowercase = (ch: string) => /[a-z]/.test(ch);
const containsSpecialChar = (ch: string) =>
  /[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/.test(ch);
const containsNumber = (ch: string) => /\d/.test(ch);

// Function to check the overall password complexity
const checkPasswordComplexity = (password: string) => {
  let countOfUpperCase = 0,
    countOfLowerCase = 0,
    countOfNumbers = 0,
    countOfSpecialChar = 0;

  for (let ch of password) {
    if (containsNumber(ch)) countOfNumbers++;
    else if (containsUppercase(ch)) countOfUpperCase++;
    else if (containsLowercase(ch)) countOfLowerCase++;
    else if (containsSpecialChar(ch)) countOfSpecialChar++;
  }

  return (
    countOfLowerCase >= 1 &&
    countOfUpperCase >= 1 &&
    countOfSpecialChar >= 1 &&
    countOfNumbers >= 1
  );
};

// Wrapper function to apply custom validation logic
export function applyPasswordValidation<T extends ZodTypeAny>(schema: T) {
  return schema.superRefine(({ password }, checkPassComplexity) => {
    if (!checkPasswordComplexity(password)) {
      checkPassComplexity.addIssue({
        code: "custom",
        message: "Password does not meet complexity requirements",
      });
    }
  });
}
