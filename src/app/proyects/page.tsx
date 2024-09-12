import Header from "@/components/Header";
import Proyect from "@/components/Proyect";
import ThemeButton from "@/components/ThemeButton";
import { raleway } from "../fonts";
import { ProyectType } from "@/components/_types";
import ProyectFilter from "@/components/ProyectFilter";
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

async function getProyects() {
  const res = await fetch(`${baseUrl}/api/proyects`)
  if (!res.ok) {
    throw new Error(`Error al obtener los proyectos - ${res}`)
  }

  return res.json();
}

export default async function Proyects() {
  if (!baseUrl) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-4xl">No hay base url</h1>
      </div>
    );
  }

  const proyects = await getProyects();

  return (
    <main className="relative transition-all duration-700 dark:bg-backgrounddark dark:text-white">
      <div className="">
        <div id="proyectos" className="flex flex-col items-center justify-center m-4 mt-10">
          <div className={`${raleway.className}`}>
            <h1 className="mb-4 text-4xl font-bold"> Mis
              <span className="text-adriPink"> proyectos</span>
            </h1>
          </div>

          {
            <ProyectFilter proyects={proyects.proyects} main={false} />
          }
        </div>
      </div>

      <ThemeButton />
    </main >
  );
}
