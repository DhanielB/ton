import fs from "fs"
import path from "path"
import { transformSync } from "@babel/core"

interface IBundleResource {
  sucess: boolean;
  result: string;
  error: string | null;
}

export default function bundle(filename): IBundleResource {
  const mainPath = path.resolve(process.cwd())
  const resolvedPath = path.resolve(filename)

  const checkPath = fs.existsSync(resolvedPath)

  if(!checkPath) {
    return {
      sucess: false,
      result: '',
      error: 'Not found file.'
    }
  }

  const fileContent = fs.readFileSync(resolvedPath).toString()

  const response = transformSync(fileContent, {
    plugins: ["@babel/plugin-transform-modules-commonjs"]
  });

  return {
    sucess: true,
    result: response.code,
    error: null
  }
}