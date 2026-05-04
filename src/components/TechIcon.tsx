interface TechIconProps {
  path: string
  color?: string
  size?: number
}

export function TechIcon({ path, color = 'currentColor', size = 28 }: TechIconProps) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d={path} />
    </svg>
  )
}
