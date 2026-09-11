import Header from '@/components/Header';
import Image from 'next/image';
// import AdrianImage from '../../public/photo.jpg';
import DownloadIcon from '@/components/icons/DownloadIcon';
import Timelife from '@/components/Timelife';
import Job from '@/components/Job';
import ThemeButton from '@/components/animation/ThemeButton';
import TechnologiesFilter from '@/components/TechnologiesFilter';
import ProyectFilter from '@/components/ProyectFilter';
import ProyectSkeleton from '@/components/skeleton/ProyectSkeleton';
import Footer from '@/components/Footer';

import { GeneralSansLight, SatoshiBold } from './fonts';
import { JobType } from '@/components/_types';
import FadeInSection from '@/components/animation/FadeInComponent';
import { headers } from 'next/headers';

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

async function getApiBaseUrl() {
  const requestHeaders = await headers();
  const host = requestHeaders.get('host');
  const protocol = requestHeaders.get('x-forwarded-proto') ?? 'http';

  return host ? `${protocol}://${host}` : baseUrl;
}

async function getJobs(apiBaseUrl: string) {
  try {
    const res = await fetch(`${apiBaseUrl}/api/jobs`);
    return res.ok ? await res.json() : { jobs: [] };
  } catch {
    return { jobs: [] };
  }
}

async function getTechnologies(apiBaseUrl: string) {
  try {
    const res = await fetch(`${apiBaseUrl}/api/tecnologies`);
    return res.ok ? res.json() : { tecnologies: [] };
  } catch {
    return { tecnologies: [] };
  }
}

async function getProyects(apiBaseUrl: string) {
  try {
    const res = await fetch(`${apiBaseUrl}/api/proyects`);
    return res.ok ? res.json() : { proyects: [] };
  } catch {
    return { proyects: [] };
  }
}

export default async function Home() {
  if (!baseUrl) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <h1 className='text-4xl'>No hay base url</h1>
      </div>
    );
  }

  const apiBaseUrl = await getApiBaseUrl();

  if (!apiBaseUrl) {
    return <div className='empty-page'>No hay una URL de API configurada.</div>;
  }

  const jobs = await getJobs(apiBaseUrl);
  const technologies = await getTechnologies(apiBaseUrl);
  const proyects = await getProyects(apiBaseUrl);

  return (
    <main className='site-shell'>
      <Header />
      <div className='site-content'>
        <section
          className='hero-section'
          id='sobremi'
        >
          <FadeInSection>
            <div className='hero-grid'>
              <div className='hero-copy'>
                <p className='eyebrow'>
                  <span className='eyebrow-dot' /> Disponibilidad completa
                </p>
                <h1 className={`${SatoshiBold.className} hero-title`}>
                  Diseño y código con <em>criterio.</em>
                </h1>
                <p className='hero-intro'>
                  Soy Adrián Vidal, desarrollador full stack con más de 5 años
                  de experiencia. Transformo ideas y necesidades reales en
                  productos digitales claros, rápidos y fáciles de mantener.
                </p>
                <div className='hero-actions'>
                  <a
                    className='primary-action'
                    href='#proyectos'
                  >
                    Ver proyectos <span>↗</span>
                  </a>
                  <a
                    className='secondary-action'
                    href='/files/Adrian Vidal Lopez-CV(es).pdf'
                    download='Curriculum de Adrian Vidal'
                  >
                    Descargar CV <DownloadIcon style='currentColor' />
                  </a>
                </div>
                <p className='hero-note'>
                  Full stack · Multiplataforma · Valencia / remoto
                </p>
              </div>
              <div className='hero-portrait-wrap'>
                <div className='hero-index'>
                  01 <span>/</span> 04
                </div>
                <div className='hero-portrait'>
                  <Image
                    src='/photo.jpg'
                    alt='Adrián Vidal trabajando como desarrollador'
                    fill
                    priority
                    sizes='(max-width: 768px) 90vw, 43vw'
                    className='hero-image'
                  />
                </div>
                <div className='portrait-caption'>
                  <span>AV / 2025</span>
                  <span className='caption-line' />
                  <span>Construyendo en público</span>
                </div>
              </div>
            </div>
          </FadeInSection>
        </section>

        <div
          className='ticker'
          aria-label='Especialidades'
        >
          <span>FRONTEND</span>
          <b>✳</b>
          <span>BACKEND</span>
          <b>✳</b>
          <span>PRODUCTO</span>
          <b>✳</b>
          <span>APRENDER HACIENDO</span>
        </div>

        <section
          className='section-block trajectory-section'
          id='treyectoria'
        >
          <div className='section-heading'>
            <p className='section-kicker'>02 / Trayectoria</p>
            <h2 className={`${SatoshiBold.className}`}>
              Experiencia que
              <br />
              <em>deja huella.</em>
            </h2>
            <p className='section-summary'>
              Una selección de los contextos donde he convertido ideas,
              necesidades y procesos en software útil.
            </p>
          </div>
          <Timelife />
          {jobs.jobs ?
            <div className='jobs-list'>
              {jobs.jobs.reverse().map((job: JobType, index: number) => (
                <Job
                  key={job._id}
                  job={job}
                  index={index}
                />
              ))}
            </div>
          : <p className='loading-copy'>Cargando experiencia...</p>}
        </section>

        <section
          className='section-block projects-section'
          id='proyectos'
        >
          <div className='section-heading section-heading-wide'>
            <p className='section-kicker'>03 / Proyectos</p>
            <h2 className={`${SatoshiBold.className}`}>
              Trabajo que
              <br />
              <em>habla solo.</em>
            </h2>
            <p className='section-summary'>
              Productos, experimentos y sistemas que combinan una interfaz
              cuidada con una base técnica sólida.
            </p>
          </div>
          {proyects.proyects ?
            <ProyectFilter proyects={proyects.proyects} />
          : <ProyectSkeleton />}
        </section>

        <section
          className='section-block stack-section'
          id='tecnologias'
        >
          <div className='section-heading'>
            <p className='section-kicker'>04 / Stack</p>
            <h2 className={`${SatoshiBold.className}`}>
              Las herramientas
              <br />
              <em>son el medio.</em>
            </h2>
            <p className='section-summary'>
              Tecnologías que uso para pensar, construir y entregar sin perder
              de vista a las personas.
            </p>
          </div>
          {technologies ?
            <TechnologiesFilter technologies={technologies.tecnologies} />
          : <p className='loading-copy'>Cargando tecnologías...</p>}
        </section>

        <section className='contact-section'>
          <p className='section-kicker'>05 / Siguiente paso</p>
          <h2 className={`${SatoshiBold.className}`}>
            ¿Hacemos algo
            <br />
            <em>que importe?</em>
          </h2>
          <a
            className='primary-action contact-action'
            href='mailto:adrianvidal2612@gmail.com'
          >
            Hablemos <span>↗</span>
          </a>
        </section>
      </div>
      <Footer />
      <ThemeButton />
    </main>
  );
}
