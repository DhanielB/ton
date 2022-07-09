#!/usr/bin/env node

import bundle from "./bundle"
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import child_process from "child_process"

const argv = yargs(hideBin(process.argv))

argv.command('run [filename]', 'Bundle a javascript file', (allArguments) => {
  const filename = allArguments.argv["_"][1]
  const fileBundle = bundle(filename);

  const { result, error, sucess } = fileBundle

  if(sucess) {
    const runtime = eval(result)
  }else{
    console.log(error)
  }
})

argv.command('add [package]', 'Add a package', (allArguments) => {
  const packageToInstall = allArguments.argv["_"][1]

  child_process.exec(`yarn add ${packageToInstall}`)

  console.log('Installed with sucess!')
})

argv.parse()