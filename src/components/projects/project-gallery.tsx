'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import clsx from 'clsx'

export interface GalleryImage {
  url: string
  alt: string
  caption?: string
}

interface ProjectGalleryProps {
  images: GalleryImage[]
}

export function ProjectGallery({ images }: ProjectGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const isOpen = activeIndex !== null
  const activeImage = isOpen ? images[activeIndex] : null

  const close = useCallback(() => setActiveIndex(null), [])

  const showPrev = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null) return null
      return current === 0 ? images.length - 1 : current - 1
    })
  }, [images.length])

  const showNext = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null) return null
      return current === images.length - 1 ? 0 : current + 1
    })
  }, [images.length])

  useEffect(() => {
    if (!isOpen) return

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') close()
      if (event.key === 'ArrowLeft') showPrev()
      if (event.key === 'ArrowRight') showNext()
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen, close, showPrev, showNext])

  if (images.length === 0) return null

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <button
            key={`${image.url}-${index}`}
            type="button"
            onClick={() => setActiveIndex(index)}
            className="group relative aspect-[4/3] overflow-hidden shadow-md cursor-zoom-in text-left"
            aria-label={`Otevřít fotku ${index + 1} z ${images.length}`}
          >
            <Image
              src={image.url}
              alt={image.alt}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {image.caption && (
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-3 pointer-events-none">
                <p className="text-white text-sm">{image.caption}</p>
              </div>
            )}
          </button>
        ))}
      </div>

      {isOpen && activeImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label="Galerie fotek"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            className="absolute top-4 right-4 z-[110] rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
            aria-label="Zavřít galerii"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(event) => { event.stopPropagation(); showPrev() }}
                className="absolute left-2 sm:left-4 z-[110] rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20"
                aria-label="Předchozí fotka"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                type="button"
                onClick={(event) => { event.stopPropagation(); showNext() }}
                className="absolute right-2 sm:right-4 z-[110] rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20"
                aria-label="Další fotka"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          <div
            className="relative flex h-full w-full max-w-6xl flex-col items-center justify-center"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative h-[70vh] w-full">
              <Image
                src={activeImage.url}
                alt={activeImage.alt}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </div>
            <div className="mt-4 w-full text-center">
              {activeImage.caption && (
                <p className="text-white/90 text-sm sm:text-base">{activeImage.caption}</p>
              )}
              {images.length > 1 && (
                <p className={clsx('text-white/60 text-xs sm:text-sm', activeImage.caption && 'mt-1')}>
                  {(activeIndex ?? 0) + 1} / {images.length}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
