import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  Instagram,
  Dribbble,
  Youtube,
  Globe,
  Phone,
  type LucideIcon,
} from "lucide-react";
import type { IconName, SocialLink } from "../../data/portfolio";

const ICONS: Record<IconName, LucideIcon> = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  mail: Mail,
  instagram: Instagram,
  dribbble: Dribbble,
  youtube: Youtube,
  globe: Globe,
  phone: Phone,
};

interface Props {
  links: SocialLink[];
  className?: string;
}

export function SocialIcons({ links, className = "" }: Props) {
  return (
    <ul className={`flex items-center gap-2 ${className}`}>
      {links.map((link) => {
        const Icon = ICONS[link.icon] ?? Globe;
        const isMail = link.href.startsWith("mailto:") || link.href.startsWith("tel:");
        return (
          <li key={link.label}>
            <a
              href={link.href}
              aria-label={link.label}
              title={link.label}
              {...(!isMail ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition-colors hover:border-brand-400 hover:text-brand-600 dark:border-slate-700 dark:text-slate-300 dark:hover:border-brand-500 dark:hover:text-brand-300"
            >
              <Icon className="h-5 w-5" aria-hidden="true" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
