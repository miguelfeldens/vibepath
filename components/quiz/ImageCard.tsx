'use client'

import { motion } from 'framer-motion'
import type { QuizImage } from '@/types'
import Image from 'next/image'

interface ImageCardProps {
  image: QuizImage
  isSelected: boolean
  selectionOrder: number | null // 1-3, null if not selected
  onToggle: (image: QuizImage) => void
  disabled?: boolean
}

export function ImageCard({ image, isSelected, selectionOrder, onToggle, disabled }: ImageCardProps) {
  return (
    <motion.button
      onClick={() => !disabled && onToggle(image)}
      className={`relative w-full aspect-video sm:aspect-auto sm:h-full rounded-xl overflow-hidden cursor-pointer group
        focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60
        ${disabled ? 'cursor-not-allowed opacity-70' : ''}
      `}
      whileHover={disabled ? {} : { scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      transition={{ duration: 0.15 }}
      aria-label={isSelected ? `Deselect ${image.alt}` : `Select ${image.alt}`}
      aria-pressed={isSelected}
    >
      {/* Image */}
      <Image
        src={image.url}
        alt={image.alt}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-105"
        sizes="(max-width: 768px) 50vw, 33vw"
      />

      {/* Dark overlay when not selected */}
      <div
        className={`absolute inset-0 transition-opacity duration-200 bg-black
          ${isSelected ? 'opacity-20' : 'opacity-0 group-hover:opacity-10'}
        `}
      />

      {/* Selected ring */}
      {isSelected && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 rounded-xl ring-2 ring-white pointer-events-none"
        />
      )}

      {/* Selection number badge */}
      {isSelected && selectionOrder !== null && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white text-black
            text-xs font-bold flex items-center justify-center shadow-lg"
        >
          {selectionOrder}
        </motion.div>
      )}
    </motion.button>
  )
}
