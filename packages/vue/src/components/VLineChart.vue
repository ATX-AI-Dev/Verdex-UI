<script setup lang="ts">
import { computed } from 'vue'

/**
 * Sparkline chart component: displays data as a smooth SVG line with gradient fill.
 * Used to visualize metric trends (CPU, RAM, network, etc.) in a compact container.
 */
const props = withDefaults(
  defineProps<{
    /** Array of numerical values (0–100 range) to plot */
    data: number[]
    /** Maximum number of data points to display (older points are trimmed) */
    maxPoints?: number
    /** Stroke color for the line (CSS var or color) */
    strokeColor?: string
    /** Gradient ID for the fill area (must be unique per instance) */
    gradientId?: string
    /** Fill color for the area under the line */
    fillColor?: string
  }>(),
  {
    maxPoints: 30,
    strokeColor: 'var(--vx-accent)',
    gradientId: 'vx-line-chart-gradient',
    fillColor: 'rgba(46, 229, 157, 0.15)',
  },
)

const width = 100
const height = 40

// Pad or trim data to maxPoints
const processedData = computed(() => {
  const points = [...props.data]
  if (points.length === 0) {
    return Array(props.maxPoints).fill(0)
  }
  if (points.length < props.maxPoints) {
    const pad = Array(props.maxPoints - points.length).fill(points[0])
    return [...pad, ...points]
  }
  return points.slice(-props.maxPoints)
})

// Calculate SVG coordinate points (x, y)
const coordinates = computed(() => {
  const data = processedData.value
  const xSpacing = width / (props.maxPoints - 1)

  return data.map((val, idx) => {
    const x = idx * xSpacing
    // Map value (0-100) to height (40 to 0) with a small padding
    const y = height - (Math.min(Math.max(val, 0), 100) / 100) * (height - 4) - 2
    return { x, y }
  })
})

// Construct SVG path for the line (cubic bezier interpolation for smoothness)
const linePath = computed(() => {
  const coords = coordinates.value
  if (coords.length === 0) return ''

  let path = `M ${coords[0].x} ${coords[0].y}`

  // Use simple cubic bezier control points for smooth line (tension ~ 0.4)
  for (let i = 0; i < coords.length - 1; i++) {
    const curr = coords[i]
    const next = coords[i + 1]

    // Control points at 1/3 and 2/3 of horizontal distance
    const cp1x = curr.x + (next.x - curr.x) / 3
    const cp1y = curr.y
    const cp2x = curr.x + (2 * (next.x - curr.x)) / 3
    const cp2y = next.y

    path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${next.x} ${next.y}`
  }

  return path
})

// Construct SVG path for the filled area underneath the line
const fillPath = computed(() => {
  const coords = coordinates.value
  const line = linePath.value
  if (!line || coords.length === 0) return ''

  // Close the path by drawing line to bottom-right, then bottom-left, then close
  return `${line} L ${coords[coords.length - 1].x} ${height} L ${coords[0].x} ${height} Z`
})
</script>

<template>
  <div class="relative w-full h-full">
    <svg
      :viewBox="`0 0 ${width} ${height}`"
      class="w-full h-full overflow-visible"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <!-- Gradients for fill -->
        <linearGradient :id="gradientId" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" :stop-color="strokeColor" stop-opacity="0.35" />
          <stop offset="100%" :stop-color="strokeColor" stop-opacity="0.0" />
        </linearGradient>
      </defs>

      <!-- Gradient Fill Area -->
      <path
        :d="fillPath"
        :fill="`url(#${gradientId})`"
        class="transition-all duration-300 ease-out"
      />

      <!-- Stroke Line -->
      <path
        :d="linePath"
        fill="none"
        :stroke="strokeColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="transition-all duration-300 ease-out"
      />
    </svg>
  </div>
</template>
