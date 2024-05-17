// module.exports = {
//   preset: "ts-jest",
//   testEnvironment: "node",
//   automock: false,
//   setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
//   testTimeout: 30000,
//   moduleNameMapper: {
//     "react-lottie": "<rootDir>/__mocks__/react-lottie.js",
//   },
// };

module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  automock: false,
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
  testTimeout: 30000,
  moduleNameMapper: {
    "react-lottie": "<rootDir>/__mocks__/react-lottie.js",
    "lottie-web": "<rootDir>/__mocks__/lottie-web.js",
  },
};
