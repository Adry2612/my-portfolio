'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ProyectType } from './_types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import {
  faArrowPointer,
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import FadeInComponent from './animation/FadeInComponent';

export default function Proyect({ proyect }: { proyect: ProyectType }) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [slide, setSlide] = useState<number>(0);
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

  const toggleOpen = () => setOpen((prev) => !prev);

  const startAutoplay = () => {
    if (images.length <= 1) return;
    setIsHovering(true);
    if (autoplayRef.current) return;
    autoplayRef.current = setInterval(() => {
      setSlide((prev) => (prev + 1) % images.length);
    }, AUTOPLAY_MS);
  };

  const stopAutoplay = () => {
    setIsHovering(false);
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
    setSlide(0);
  };

  useEffect(() => () => stopAutoplay(), []);

  const goToSlide = (event: React.MouseEvent, index: number) => {
    event.stopPropagation();
    setSlide(index);
  };

  const changeSlide = (event: React.MouseEvent, direction: 1 | -1) => {
    event.stopPropagation();
    setSlide((prev) => (prev + direction + images.length) % images.length);
  };

  return (
    <FadeInComponent>
      <motion.div
        className='project-card'
        whileHover={{ y: -8 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      >
        <div
          className='project-image-wrap'
          onClick={toggleOpen}
          onMouseEnter={startAutoplay}
          onMouseLeave={stopAutoplay}
        >
          <div className='project-carousel'>
            {images.map((image, index) => (
              <Image
                key={image}
                src={`/proyect-images/${image}`}
                fill
                sizes='(max-width: 768px) 100vw, 50vw'
                alt=''
                onLoadingComplete={() => index === 0 && setIsLoading(false)}
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
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
              <button
                type='button'
                onClick={(event) => changeSlide(event, 1)}
                className='project-carousel-arrow project-carousel-next'
                aria-label='Imagen siguiente'
              >
                <FontAwesomeIcon icon={faChevronRight} />
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
              <div className='project-links'>
                {proyect.deploy_url && (
                  <a
                    href={proyect.deploy_url}
                    target='_blank'
                    rel='noreferrer'
                    className='project-link'
                  >
                    <FontAwesomeIcon icon={faArrowPointer} /> Ver despliegue
                  </a>
                )}
                <a
                  href={proyect.repo_url}
                  target='_blank'
                  rel='noreferrer'
                  className='project-link'
                >
                  <FontAwesomeIcon icon={faGithub} /> Ver repositorio
                </a>
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
      </motion.div>
    </FadeInComponent>
  );
}
