import { Link } from 'react-router'

export interface FooterProps {
  log: string
}

export default function Footer({ log }: FooterProps) {
  return (
    <div className="flex flex-col items-center justify-center fixed bottom-4 right-4 opacity-30">
      <Link
        target="_blank"
        to="https://joyco.studio"
        className="font-mono text-pretty whitespace-pre-wrap text-[8px] leading-[1.1] tracking-wide font-medium uppercase mt-2"
      >
        {log}
      </Link>
    </div>
  )
}
