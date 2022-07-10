import fs from "fs";
import path from "path";
import { transformSync } from "@babel/core";

/*
Codes :

0 = Success
-5 = Not found file

*/

interface IBundleResource {
  sucess: boolean;
  result: string;
  code: number;
  error: string | null;
}

export default function bundle(
  filename: string,
  currentWorkingDirectory: string
): IBundleResource {
  const mainPath = path.resolve(currentWorkingDirectory);
  const resolvedPath = path.resolve(filename);

  const checkPath = fs.existsSync(resolvedPath);

  if (!checkPath) {
    return {
      sucess: false,
      result: "",
      code: -5,
      error: "Not found file",
    };
  }

  const fileContent = fs.readFileSync(resolvedPath).toString();

  const response = transformSync(fileContent, {
    plugins: [
      "@babel/plugin-transform-typescript",
      "@babel/plugin-transform-modules-commonjs",
    ],
  });

  return {
    sucess: true,
    // @ts-ignore
    result: response.code,
    code: 0,
    error: null,
  };
}
