import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css'
import scriptData from '../onuconfig.json'
import axios from 'axios';

interface CommandArg {
  id: string;
  type: string;
  name: string;
  description: string;
  value: string | number;
}
interface Step {
  id: string;
  name: string;
  description: string;
  command: string;
  args: Array<CommandArg>;
}

interface StepOutput {
  stdout: string;
  stderr: string;
}

function joinClassNames(...classes: Array<string | boolean | undefined>) {
  return classes.filter(Boolean).join(' ')
}

interface IconProps {
  classes: string;
}

const PlayIcon = ({ classes }: IconProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FFFFFF" className={classes}>
      <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
    </svg>

  )
}

const XIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#6b7280" className="w-6 h-6">
      <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clipRule="evenodd" />
    </svg>
  )
}

const CheckCircleIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#22c55e" className="w-10 h-10">
      <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
    </svg>

  )
}

const XCircleIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ef4444" className="w-10 h-10">
      <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clipRule="evenodd" />
    </svg>
  )
}



const RefreshIcon = ({ classes }: IconProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={classes}>
      <path fillRule="evenodd" d="M4.755 10.059a7.5 7.5 0 0112.548-3.364l1.903 1.903h-3.183a.75.75 0 100 1.5h4.992a.75.75 0 00.75-.75V4.356a.75.75 0 00-1.5 0v3.18l-1.9-1.9A9 9 0 003.306 9.67a.75.75 0 101.45.388zm15.408 3.352a.75.75 0 00-.919.53 7.5 7.5 0 01-12.548 3.364l-1.902-1.903h3.183a.75.75 0 000-1.5H2.984a.75.75 0 00-.75.75v4.992a.75.75 0 001.5 0v-3.18l1.9 1.9a9 9 0 0015.059-4.035.75.75 0 00-.53-.918z" clipRule="evenodd" />
    </svg>
  )
}

const makeId = (length: number) => {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export default function Home() {

  const [steps, setSteps] = useState<Array<Step>>([]);
  const [scenario, setScenario] = useState<Array<Step>>([]);
  const [stepOutput, setStepOutput] = useState<Array<StepOutput>>([]);
  const [scenarioExecuted, setScenarioExecuted] = useState(false);

  useEffect(() => {
    // add a base value to each script
    const newScripts: Array<Step> = scriptData.scripts.map(script => {
      return {
        id: makeId(6),
        name: script.name,
        description: script.description,
        command: script.command,
        args: script.args ? script.args.map(arg => { return { id: makeId(6), type: arg.type, description: arg.description, name: arg.name, value: arg.type === "string" ? "" : 0 } }) : []
      }
    })
    setSteps(newScripts);
  }, [])

  const addToScenario = (step: Step) => {
    if (scenarioExecuted) {
      // The user has already executed their scenario. Show an alert telling them to 
      // Clear the current scenario before making updates
      alert('You must clear your existing scenario before creating a new one')
      return;
    }
    // give the step it's own ID
    let scenarioStep = { ...step, id: makeId(6) }
    scenarioStep.args = scenarioStep.args.map(ss => { return { ...ss, id: makeId(6) } })
    setScenario(scenario.concat([scenarioStep]));
  }

  const removeAtId = (stepId: string) => {
    // Removes the step with the given id
    const newArray = scenario.filter(element => element.id !== stepId)
    setScenario(newArray);
  }

  const updateScenarioStepValue = (stepId: string, argId: string, value: string | number) => {
    const newArray = scenario.map((scenarioStep, i) => {
      if (scenarioStep.id !== stepId) {
        return scenarioStep;
      }
      const updatedStep = Object.assign({}, scenarioStep)
      for (let sArg of updatedStep.args) {
        if (sArg.id === argId) {
          sArg.value = value
        }
      }
      return updatedStep;
    })
    setScenario(newArray)

  }

  const runScenario = async () => {
    // clear step output if there is any
    setStepOutput([]);
    let userId = "unset";
    let output: Array<StepOutput> = []
    // runs each step in the scenario
    for (let scenarioStep of scenario) {
      const data = {
        userId,
        command: scenarioStep.command,
        args: scenarioStep.args.map(arg => { return { type: arg.type, value: arg.value } })
      }
      const response = await axios.post('http://localhost:8000/execute', data);
      output = output.concat([response.data.output])

      // Terrible hack to get demo to work
      if (response.data.output.stdout.includes("Created user ")) {
        userId = response.data.output.stdout.trim().split(" ")[2]
      }
    }

    setStepOutput(output)
    setScenarioExecuted(true);

  }

  const clearScenario = () => {
    // clear current output
    setStepOutput([]);
    setScenario([]);
    setScenarioExecuted(false);
  }

  const runButtonDisabled = scenario.length === 0;

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className='flex flex-row justify-start w-full h-full'>
          <div className='border-2 flex flex-col border-transparent border-r-black pr-12'>
            <p className='text-xl font-medium self-center mb-16'>Steps</p>
            {steps.map((step, i) => {
              return (
                <div key={step.id}>
                  <div className='bg-gray-200 w-80 px-5 py-5 rounded-t-lg'>
                    <p className='font-bold text-lg mb-1'>{step.name}</p>
                    <p className='italic mb-2 text-sm text-gray-600'>{step.description}</p>
                    <p className="text-gray-600 font-bold mb-1">Script</p>
                    <p className='font-mono mb-4 bg-white text-sm rounded-md px-3 py-1 text-indigo-500 font-semibold'>{step.command}</p>
                    <p className="text-gray-600 font-bold mb-1">Inputs</p>
                    <div>
                      {step.args.map((arg, i) => (
                        <p className='font-bold text-gray-600 text-sm mb-1' key={`${arg.id}-${i}`}>{arg.name}: <span className='capitalize font-normal'>{arg.type}</span></p>
                      ))}
                    </div>

                  </div>
                  <div onClick={() => addToScenario(step)} className='px-3 py-2 bg-indigo-400 rounded-b-lg mb-6 flex justify-center text-white font-semibold cursor-pointer'>
                    Add
                  </div>
                </div>
              )
            })}
          </div>
          <div className='flex flex-col w-full px-3'>
            <div className='flex flex-col  justify-center items-center'>
              <p className='text-xl font-medium'>
                Scenario
              </p>

            </div>
            <div className='flex justify-end mb-6'>
              <button onClick={clearScenario} className='px-3 py-2 bg-white border-2 border-gray-400 rounded-lg text-gray-500 font-bold flex flex-row items-center'>
                Clear <RefreshIcon classes={"w-5 h-5 ml-2"} />
              </button>
              <button disabled={runButtonDisabled} onClick={runScenario} className={joinClassNames(runButtonDisabled ? 'bg-gray-500' : 'bg-green-500', 'ml-5 px-3 py-2 rounded-lg text-white font-bold flex flex-row items-center')}>
                Run <PlayIcon classes={"w-6 h-6 ml-1"} />
              </button>
            </div>



            <div>
              {scenario.map((scenarioStep, i) => {
                const isSuccess = stepOutput[i] && !!stepOutput[i].stdout;
                const isFailure = stepOutput[i] && !!stepOutput[i].stderr;
                return (
                  <div className='w-full mb-6' key={`scenariostep${scenarioStep.id}`}>
                    <div className={joinClassNames(isFailure ? 'border-red-500' : isSuccess ? 'border-green-500' : 'border-gray-200', 'bg-gray-200 border-2 px-5 py-3 mb-3 rounded-lg')}>
                      <div className='flex flex-row w-full justify-between'>

                        <p className='font-bold mb-2 text-lg'>{scenarioStep.name}</p>
                        {!scenarioExecuted && <div onClick={() => removeAtId(scenarioStep.id)}>
                          <XIcon />
                        </div>}

                      </div>
                      <p className='text-sm italic text-gray-600'>{scenarioStep.description}</p>

                      <div className='flex flex-col pt-5'>
                        {scenarioStep.args?.map((arg, j) => {
                          return (
                            <div key={`step${scenarioStep.id}arg${arg.id}`} className='mb-5'>
                              <p className='font-bold text-sm text-gray-500'>{`${arg.name} (${arg.type})`}</p>
                              <p className='text-sm italic text-gray-500'>{arg.description}</p>
                              <input className='rounded-md px-2 py-1 border border-gray-300' type={"text"} value={arg.value} onChange={(e) => updateScenarioStepValue(scenarioStep.id, arg.id, e.target.value)} />
                            </div>
                          )
                        })}
                      </div>
                      <div className='w-full flex flex-row justify-end'>
                        {isSuccess ? <CheckCircleIcon /> : isFailure ?
                          <XCircleIcon /> : null}
                      </div>


                    </div>
                    <div>
                      {/* Step output goes here */}
                      {stepOutput[i] && (
                        <div className={joinClassNames(isFailure ? 'bg-red-200' : 'bg-green-200', 'px-3 py-3 flex flex-col rounded-lg')}>
                          <p className={joinClassNames(isFailure ? 'text-red-800' : 'text-green-800', 'text-sm')}>Output:</p>
                          <pre className='font-mono text-xs text-gray-800'>{stepOutput[i].stdout ? stepOutput[i].stdout : stepOutput[i].stderr}</pre>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

        </div>



      </main >

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div >
  )
}
