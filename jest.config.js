module.exports = {
    transform: {
        "^.+\\.tsx?$" : "ts-jest"
    },
    setupFilesAfterEnv: [
        "@testing-library/jest-dom/extend-expect"
    ],
    testRegex:"(/__test__/.*|(\\.|/)(test|spec))\\.tsx?$",
    moduleFileExtensions:["ts","tsx","js","jsx","json","node"],
    globals: {
        'ts-jest' :{
           tsconfig: 'tsconfig.test.json'
        }
    }
}