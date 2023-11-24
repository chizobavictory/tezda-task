export function getDefaultValue(userInput, defaultValue) {
  if (!userInput || userInput === '') {
    return defaultValue;
  }
  return userInput;
}
