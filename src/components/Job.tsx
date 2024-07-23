import Image from 'next/image';
import { JobType } from './_types';

export default function Job({ job }: { job: JobType }) {

  return (
    <div className="relative flex flex-col items-center justify-between w-full p-4 overflow-hidden border border-gray-200 md:flex-row border-1 lg:w-2/3 gap-2 rounded-xl">
      <Image src={`/job-icons/${job.icon}`} alt={job.name} width={150} height={150} className='absolute right-3 -top-10 opacity-10' />
      <div className="flex flex-col items-center justify-center md:items-start">
        <div className="flex flex-col items-center justify-center md:flex-row md:mr-auto">
          <h2 className="font-bold text-md md:text-xl text-wrap text-adriPink"> {job.description} </h2>
          <span className='md:m-2'> - </span>
          <h3 className='text-lg text-gray-400'> {job.name}</h3>
        </div>

        <div>
          <h3 className="font-light"> {job.startDate} - {job.endDate} </h3>
        </div>

        <div className="w-full mt-4">
          <ol className='flex flex-row flex-wrap items-center justify-center gap-2 md:justify-start'>
            {
              job.tecnologies.map((tecnology) => (
                <li key={tecnology} className='p-2 text-white rounded-lg bg-adriPink'> {tecnology} </li>
              ))
            }
          </ol>
        </div>

        <div className="mx-4 mt-4">
          <ul className='list-disc list-inside'>
            {
              job.thingsDone.map((text) => (
                <li key={text}> {text} </li>
              ))
            }
          </ul>
        </div>

      </div>
    </div>
  )
}
