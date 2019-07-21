module.exports = {
	roots: ["."],
	testURL: "http://localhost",
	preset: 'ts-jest',
	globals: {
		'ts-jest': {
			tsConfig: 'tsconfig.json',
			babelConfig: true,
		},
	},
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
	transform: {
		"^.+\\.jsx$": "babel-jest",
		"^.+\\.js$" : "babel-jest"
	  },
	testMatch: [
		'**/*.spec.(ts|tsx)'
	],
	snapshotSerializers: ["enzyme-to-json/serializer"],
	setupFilesAfterEnv: ["jest-extended"],
	setupFiles: [
		"<rootDir>/test/setupTests.ts"
	  ],
	  moduleNameMapper:{
		"\\.(css|less|sass|scss)$": "<rootDir>/test/__mocks__/styleMock.js",
   	},
	transformIgnorePatterns: ['../node_modules/']
};