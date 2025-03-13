import Header from '@/components/Header';
import Image from 'next/image';
import AdrianImage from '/public/photo.jpg';
import DownloadIcon from '@/components/icons/DownloadIcon';
import Timelife from '@/components/Timelife';
import Job from '@/components/Job';
import ThemeButton from '@/components/animation/ThemeButton';
import TechnologiesFilter from '@/components/TechnologiesFilter';
import ProyectFilter from '@/components/ProyectFilter';
import ProyectSkeleton from '@/components/skeleton/ProyectSkeleton';
import Footer from '@/components/Footer';

import { GeneralSansLight, SatoshiBold} from './fonts';
import { JobType } from '@/components/_types';
import FadeInSection from '@/components/animation/FadeInComponent';

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

async function getJobs() {
  const res = await fetch(`${baseUrl}/api/jobs`);
  if (!res.ok) {
    throw new Error(`Error al obtener la experiencia laboral - ${res}`);
  }

  return res.json();
}

async function getTechnologies() {
  const res = await fetch(`${baseUrl}/api/tecnologies`);
  if (!res.ok) {
    throw new Error(`Error al obtener las tecnologias - ${res}`);
  }

  return res.json();
}

async function getProyects() {
  const res = await fetch(`${baseUrl}/api/proyects`);
  if (!res.ok) {
    throw new Error(`Error al obtener los proyectos - ${res}`);
  }

  return res.json();
}

export default async function Home() {
  if (!baseUrl) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <h1 className='text-4xl'>No hay base url</h1>
      </div>
    );
  }

  const jobs = await getJobs();
  const technologies = await getTechnologies();
  const proyects = await getProyects();

  return (
    <main className='relative transition-all duration-700 dark:bg-backgrounddark dark:text-white bg-[url("../../public/pattern.jpeg)] bg-cover bg-center'>
          <Header />
      <div className=''>
        <div className='flex flex-col w-screen lg:h-screen '>
          <FadeInSection>
            <div className='flex flex-col items-center justify-around p-5 mt-10 mr-4 lg:flex-row'>
              <div className='relative w-2/3 md:w-[35rem] h-[20rem] lg:w-[30rem] lg:h-[35rem] '>
                <Image
                  src={AdrianImage}
                  alt='Logo de Adrián'
                  objectFit='cover'
                  layout='fill'
                  className='rounded-lg'
                />
              </div>
              <div className='flex flex-col mt-8 ml-5 lg:mt-0'>
              <h3 className={`${GeneralSansLight.className} lg:text-2xl text-xl text-grey-500`}> Haciendo lo complejo, simple y funcional.</h3>

                <h1
                  className={`${SatoshiBold.className} lg:text-8xl text-6xl font-bold bg-gradient-to-r from-neutral-300 via-red-300 to-red-500 bg-clip-text text-transparent bg-300% animate-animatedGradient`}
                >
                  Adrián Vidal
                </h1>
                <h2 className='text-2xl text-gray-600 lg:text-3xl dark:text-white'>Desarrollador full stack multiplataforma</h2>

                <a
                  className='flex items-center justify-center mt-5 lg:mt-24'
                  href='/files/curriculum.pdf'
                  download='Curriculum de Adrián Vidal'
                >
                  <button className='flex flex-row items-center justify-around gap-4 p-5 text-lg text-black transition-all duration-200 ease-in-out bg-gray-200 rounded-lg shadow-lg hover:bg-adriPink hover:text-white shadow-neutral-400'>
                    Descarga mi cv
                    <DownloadIcon style='text-white' />
                  </button>
                </a>
              </div>
            </div>
          </FadeInSection>
        </div>

        <div
          id='treyectoria'
          className='flex flex-col items-center justify-center mx-4 mt-10'
        >
          <div className={`${SatoshiBold.className}`}>
            <h1 className='mb-8 text-5xl font-bold text-gray-600 dark:text-white text-shadow-md text-shadow-gray-400'>
              Mi trayectoria
              <span className='text-adriPink'> profesional</span>
            </h1>
          </div>
          <Timelife />
          {jobs.jobs ? (
            <div className='flex flex-col-reverse items-center justify-center w-full gap-4 mt-4'>
              {jobs.jobs.map((job: JobType, index: number) => (
                <Job
                  key={job._id}
                  job={job}
                  index={index}
                />
              ))}
            </div>
          ) : (
            'Cargando...'
          )}
        </div>

        <div
          id='proyectos'
          className='flex flex-col items-center justify-center m-4 mt-10'
        >
          <div className={`${SatoshiBold.className}`}>
            <h1 className='mb-8 text-5xl font-bold text-gray-600 dark:text-white'>
              Mis
              <span className='text-adriPink'> proyectos</span>
            </h1>
          </div>

          {proyects.proyects ? (
            <ProyectFilter proyects={proyects.proyects} />
          ) : (
            <div className='flex-row w-full'>
              <ProyectSkeleton />
            </div>
          )}

          {/* <Link href="/proyects"><button className={`${raleway.className} p-4 text-lg text-white rounded-lg bg-adriPink`}> Ver más proyectos </button></Link> */}
        </div>

        <div
          id='tecnologias'
          className='flex flex-col items-center justify-center m-4 mt-10'
        >
          <div className={`${SatoshiBold.className}`}>
            <h1 className='mb-8 text-5xl font-bold text-gray-600 dark:text-white'>
              Mis
              <span className='text-adriPink'> tecnologías </span>
            </h1>
          </div>
          {technologies ? (
            <TechnologiesFilter technologies={technologies.tecnologies} />
          ) : (
            'Cargando...'
          )}
        </div>
      </div>

      <Footer />

      <ThemeButton />
    </main>
  );
}
