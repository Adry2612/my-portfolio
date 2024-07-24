import Header from "@/components/Header";
import Image from "next/image";
import AdrianImage from '/public/photo.jpg';
import DownloadIcon from "@/components/icons/DownloadIcon";
import Timelife from "@/components/Timelife";
import Job from "@/components/Job";
import Proyect from "@/components/Proyect";
import ThemeButton from "@/components/ThemeButton";
import { raleway } from "./fonts";
import { JobType, ProyectType } from "@/components/_types";
import TechnologiesFilter from "@/components/TechnologiesFilter";
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

async function getJobs() {
  const res = await fetch(`${baseUrl}/api/jobs`)
  if (!res.ok) {
    throw new Error(`Error al obtener la experiencia laboral - ${res}`)
  }

  return res.json();
}

async function getTechnologies() {
  const res = await fetch(`${baseUrl}/api/tecnologies`)
  if (!res.ok) {
    throw new Error(`Error al obtener las tecnologias - ${res}`)
  }

  return res.json();
}

async function getProyects() {
  const res = await fetch(`${baseUrl}/api/proyects`)
  if (!res.ok) {
    throw new Error(`Error al obtener los proyectos - ${res}`)
  }

  return res.json();
}

export default async function Home() {
  if (!baseUrl) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-4xl">No hay base url</h1>
      </div>
    );
  }

  const jobs = await getJobs();
  const technologies = await getTechnologies();
  const proyects = await getProyects();

  return (
    <main className="relative transition-all duration-700 dark:bg-backgrounddark dark:text-white">
      <Header />

      <div className="">
        <div className="flex flex-col items-center justify-around p-5 mt-10 mr-4 lg:flex-row">
          <div className="relative w-[20rem] h-[15rem] md:w-[30rem] md:h-[35rem] ">
            <Image src={AdrianImage} alt="Logo de Adrián" objectFit="cover" layout="fill" className="rounded-lg" />
          </div>

          <div className="flex flex-col mt-5 lg:mt-0 ">
            <p className="text-3xl"> Hola, Soy </p>
            <h1 className={`${raleway.className} text-6xl font-bold bg-gradient-to-r from-neutral-300 via-red-300 to-red-500 bg-clip-text text-transparent bg-300% animate-animatedGradient`}>Adrián Vidal</h1>
            <h2 className="text-4xl">Desarrollador full stack </h2>
            <a className="flex items-center justify-center mt-14" href="/files/curriculum.pdf" download="Curriculum de Adrián Vidal">
              <button className="flex flex-row items-center justify-around w-3/5 p-5 text-lg text-black transition-all duration-200 ease-in-out bg-gray-200 rounded-lg shadow-lg hover:bg-adriPink hover:text-white shadow-neutral-400">
                Descarga mi cv
                <DownloadIcon style="text-white" />
              </button>
            </a>
          </div>
        </div>

        <div id="treyectoria" className="flex flex-col items-center justify-center mx-4 mt-10">
          <div className={`${raleway.className}`}>
            <h1 className="mb-4 text-4xl font-bold"> Mi trayectoria
              <span className="text-adriPink"> profesional</span>
            </h1>
          </div>
          <Timelife />

          {
            jobs.jobs ? (
              <div className="flex flex-col-reverse items-center justify-center w-full gap-4 mt-4">
                {
                  jobs.jobs.map((job: JobType) => <Job key={job._id} job={job} />)
                }
              </div>
            ) : 'Cargando...'
          }

        </div>

        <div id="proyectos" className="flex flex-col items-center justify-center m-4 mt-10">
          <div className={`${raleway.className}`}>
            <h1 className="mb-4 text-4xl font-bold"> Mis
              <span className="text-adriPink"> proyectos</span>
            </h1>
          </div>

          <div className="grid w-full gap-6 my-6 grid-col md:grid-flow-row md:grid-cols-2 lg:w-3/4">
            {
              proyects.proyects.map((proyect: ProyectType) => (
                <Proyect key={proyect._id} proyect={proyect} />
              ))}
          </div>

          {/* <button className={`${raleway.className} p-4 text-lg text-white rounded-lg bg-adriPink`}> Ver más proyectos </button> */}
        </div>

        <div id="tecnologias" className="flex flex-col items-center justify-center m-4 mt-10">
          <div className={`${raleway.className}`}>
            <h1 className="mb-4 text-4xl font-bold"> Mis
              <span className="text-adriPink"> tecnologías </span>
            </h1>
          </div>
          {technologies ? (
            <TechnologiesFilter technologies={technologies.tecnologies} />
          ) : 'Cargando...'}
        </div>

      </div>

      <ThemeButton />
    </main >
  );
}
