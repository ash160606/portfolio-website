import { Linkedin, FileText, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { ProfileConfig } from '@/lib/profile';

type SocialButtonsProps = {
  links: ProfileConfig['links'];
};

export function SocialButtons({ links }: SocialButtonsProps) {
  return (
    <div className="flex flex-wrap gap-3">
      <Button
        asChild
        size="lg"
        className="bg-orange-500 text-black hover:bg-accent/80 transition-colors"
      >
        <a
          href={links.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit LinkedIn profile"
        >
          <Linkedin className="mr-2 h-4 w-4" />
          LinkedIn
        </a>
      </Button>
      <Button
        asChild
        variant="outline"
        size="lg"
        className="border-border text-foreground hover:bg-secondary hover:text-secondary-foreground transition-colors"
      >
        <a
          href={links.resume}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View Resume"
        >
          <FileText className="mr-2 h-4 w-4" />
          Resume
        </a>
      </Button>
      <Button
        asChild
        size="lg"
        className="bg-orange-500 text-black hover:bg-accent/80 transition-colors"
      >
        <a
          href={links.email}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Send email"
        >
          <Mail />
          Get in Touch!
        </a>
      </Button>
    </div>
  );
}
