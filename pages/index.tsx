import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css'
import scriptData from '../onuconfig.json'

interface CommandArg {
  type: string;
  name: string;
  description: string;
}
interface Step {
  name: string;
  description: string;
  command: string;
  args: Array<CommandArg>;
}

export default function Home() {

  const [steps, setSteps] = useState<Array<Step>>([]);

  useEffect(() => {
    setSteps(scriptData.scripts)
  }, [])


  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className='flex flex-row justify-start w-full h-full'>
          <div className='border-2 border-transparent border-r-black pr-12'>
            {steps.map((step, i) => {
              return (
                <div key={`step${i}`} className='bg-gray-100 drop-shadow-lg px-5 py-3 mb-6'>
                  <p className='font-bold mb-2'>{step.name}</p>
                  <p className='italic mb-2'>{step.description}</p>
                  <p className='font-mono mb-4 bg-gray-200 rounded-md px-3 py-1 text-blue-600'>{step.command}</p>
                  <div className='px-3 py-2 bg-blue-300 rounded-lg'>
                    Add
                  </div>
                </div>
              )
            })}
          </div>
          <div>
            Main content goes here
          </div>
        </div >


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
