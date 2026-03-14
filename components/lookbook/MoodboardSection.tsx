'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import type { QuizImage } from '@/types'

interface MoodboardSectionProps {
  images: QuizImage[]
}

// 12-image asymmetric grid (4 columns, 5 rows)
const GRID_CLASSES = [
  'col-span-2 row-span-2',  // 0 — large hero
  'col-span-1 row-span-1',  // 1
  'col-span-1 row-span-1',  // 2
  'col-span-1 row-span-1',  // 3
  'col-span-1 row-span-1',  // 4
  'col-span-1 row-span-2',  // 5 — tall
  'col-span-1 row-span-1',  // 6
  'col-span-2 row-span-1',  // 7 — wide
  'col-span-1 row-span-1',  // 8
  'col-span-1 row-span-1',  // 9
  'col-span-1 row-span-1',  // 10
  'col-span-2 row-span-1',  // 11 — wide
]

export function MoodboardSection({ images }: MoodboardSectionProps) {
  const displayImages = images.slice(0, 12)

  return (
    <section className="lookbook-section bg-stone-900 px-8 py-20">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex items-baseline justify-between mb-8"
      >
        <p className="text-xs tracking-[0.3em] uppercase text-white/30 font-medium">
          Your vibe board
        </p>
        <p className="text-xs text-white/20">
          {displayImages.length} images · picks + similar
        </p>
      </motion.div>

      <div className="grid grid-cols-4 grid-rows-5 gap-2 h-[85vh] max-h-[700px]">
        {displayImages.map((image, i) => (
          <motion.div
            key={image.id}
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.5 }}
            className={`relative overflow-hidden rounded-lg lookbook-card ${GRID_CLASSES[i] ?? ''}`}
          >
            <Image
              src={image.url}
              alt={image.alt}
              fill
              className="object-cover lookbook-image"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent mix-blend-multiply" />
          </motion.div>
        ))}
      </div>
    </section>
  )
}
