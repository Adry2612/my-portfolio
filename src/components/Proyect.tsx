'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ProyectType } from './_types';
import ArrowUpRightIcon from './icons/ArrowUpRightIcon';
import ChevronLeftIcon from './icons/ChevronLeftIcon';
import ChevronRightIcon from './icons/ChevronRightIcon';
import GithubIcon from './icons/GithubIcon';
import FadeInComponent from './animation/FadeInComponent';
import { extractDominantColor } from '@/lib/dominantColor';

const toExternalUrl = (url: string) =>
  /^https?:\/\//i.test(url) ? url : `https://${url}`;

export default function Proyect({ proyect }: { proyect: ProyectType }) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [slide, setSlide] = useState<number>(0);
  const [imageColors, setImageColors] = useState<Record<string, string>>({});
  const [open, setOpen] = useState<boolean>(false);
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const AUTOPLAY_MS = 1600;

  const images =
    proyect.images && proyect.images.length > 0 ?
      proyect.images
    : String(proyect.img || '')
        .split(',')
        .map((image) => image.trim())
        .filter(Boolean);

  const activities =
    Array.isArray(proyect.activities) ? proyect.activities
    : proyect.activities ? [proyect.activities]
    : [];

  const toggleOpen = () => setOpen((prev) => !prev);

  const handleImageLoad = (
    event: React.SyntheticEvent<HTMLImageElement>,
    image: string,
    index: number,
  ) => {
    if (index === 0) setIsLoading(false);

    const color = extractDominantColor(event.currentTarget);
    if (!color) return;

    setImageColors((prev) =>
      prev[image] === color ? prev : { ...prev, [image]: color },
    );
  };

  const clearAutoplay = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  };

  const startAutoplayTimer = () => {
    clearAutoplay();
    autoplayRef.current = setInterval(() => {
      setSlide((prev) => (prev + 1) % images.length);
    }, AUTOPLAY_MS);
  };

  const startAutoplay = () => {
    if (images.length <= 1) return;
    setIsHovering(true);
    if (autoplayRef.current) return;
    startAutoplayTimer();
  };

  const stopAutoplay = () => {
    setIsHovering(false);
    clearAutoplay();
    setSlide(0);
  };

  useEffect(() => {
    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
        autoplayRef.current = null;
      }
    };
  }, []);

  const goToSlide = (event: React.MouseEvent, index: number) => {
    event.stopPropagation();
    setSlide(index);
    if (autoplayRef.current) startAutoplayTimer();
  };

  const changeSlide = (event: React.MouseEvent, direction: 1 | -1) => {
    event.stopPropagation();
    setSlide((prev) => (prev + direction + images.length) % images.length);
    if (autoplayRef.current) startAutoplayTimer();
  };

  const activeColor = imageColors[images[slide]];

  return (
    <FadeInComponent>
      <div className='project-card'>
        <div
          className='project-image-wrap'
          style={activeColor ? { backgroundColor: activeColor } : undefined}
          onClick={toggleOpen}
          onMouseEnter={startAutoplay}
          onMouseLeave={stopAutoplay}
        >
          {proyect.profesional && (
            <span className='project-badge'>{proyect.profesional}</span>
          )}
          <div className='project-carousel'>
            {images.map((image, index) => (
              <Image
                key={image}
                src={`/proyect-images/${image}`}
                fill
                sizes='(max-width: 768px) 100vw, 50vw'
                alt=''
                onLoad={(event) => handleImageLoad(event, image, index)}
                style={{
                  opacity:
                    isLoading ? 0
                    : index === slide ? 1
                    : 0,
                }}
                className='project-image'
              />
            ))}
          </div>
          {images.length > 1 && (
            <>
              <button
                type='button'
                onClick={(event) => changeSlide(event, -1)}
                className='project-carousel-arrow project-carousel-prev'
                aria-label='Imagen anterior'
              >
                <ChevronLeftIcon />
              </button>
              <button
                type='button'
                onClick={(event) => changeSlide(event, 1)}
                className='project-carousel-arrow project-carousel-next'
                aria-label='Imagen siguiente'
              >
                <ChevronRightIcon />
              </button>
              <div className='project-carousel-dots'>
                {images.map((image, index) => (
                  <button
                    key={image}
                    type='button'
                    onClick={(event) => goToSlide(event, index)}
                    className={`project-carousel-dot ${index === slide ? 'project-carousel-dot-active' : ''}`}
                    aria-label={`Ver imagen ${index + 1}`}
                  >
                    {index === slide && (
                      <span
                        key={isHovering ? `progress-${slide}` : 'idle'}
                        className={`project-carousel-dot-fill ${isHovering ? 'project-carousel-dot-fill-animate' : ''}`}
                        style={
                          isHovering ?
                            { animationDuration: `${AUTOPLAY_MS}ms` }
                          : undefined
                        }
                      />
                    )}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
        <div
          className={`project-info-wrap ${open ? '' : 'project-info-collapsed'}`}
        >
          <div className='project-info'>
            <div className='project-info-inner'>
              <h1> {proyect.name} </h1>
              {proyect.description && (
                <p className='project-description'>{proyect.description}</p>
              )}
              {activities.length > 0 && (
                <p className='project-activities'>{activities.join(', ')}</p>
              )}
              <div className='project-links'>
                {proyect.deploy_url && (
                  <a
                    href={toExternalUrl(proyect.deploy_url)}
                    target='_blank'
                    rel='noreferrer'
                    className='project-link'
                  >
                    <ArrowUpRightIcon /> Ver despliegue
                  </a>
                )}
                {proyect.repo_url && (
                  <a
                    href={toExternalUrl(proyect.repo_url)}
                    target='_blank'
                    rel='noreferrer'
                    className='project-link'
                  >
                    <GithubIcon /> Ver repositorio
                  </a>
                )}
              </div>
              <ul className='project-labels'>
                {Array.isArray(proyect.labels) ?
                  proyect.labels.map((label) => <li key={label}>{label}</li>)
                : String(proyect.labels)
                    .split(',')
                    .map((label) => <li key={label}>{label.trim()}</li>)
                }
              </ul>
            </div>
          </div>
        </div>
      </div>
    </FadeInComponent>
  );
}
