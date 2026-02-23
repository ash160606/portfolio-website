import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import {
  Waves,
  School,
  Fullscreen,
  PartyPopper,
  Wrench,
  DollarSign,
  LibraryBig,
  Layers,
  Drama,
  CirclePile,
} from 'lucide-react';
import JourneyItem from '@/components/JourneyItem';
export default function VTimeline() {
  return (
    <VerticalTimeline animate={true} lineColor="#ff6925">
      <JourneyItem
        date="Sep 2024 - Current"
        title="Started Undergrad @ UBC"
        subtitle="CS + Stats"
        icon={<School />}
      >
        Start of a long journey at one of Canada's best institutions
      </JourneyItem>
      <JourneyItem
        date="Jan 2025"
        title="Built Tidal Height Regression Model"
        subtitle="Used real data from Steveston Harbor"
        icon={<Waves />}
      >
        Building a strong base in Python (TensorFlow, scikit-learn) and
        developed an intuition for data science + analysis.
      </JourneyItem>
      <JourneyItem
        date="March 2025 - April 2025"
        title="Developed a Snooker Scorekeeping App"
        subtitle="Used Java Swing to track scores for multiple concurrent snooker games"
        icon={<CirclePile />}
      >
        Intro to Software Construction, OOP Best Practices and Test Driven
        Development
      </JourneyItem>
      <JourneyItem
        date="March - April 2025"
        title="Trained a Binary Classifier on the MNIST Dataset"
        subtitle="Entered the world of Machine Learning through image classification - 99% accuracy on held out test set"
        icon={<Fullscreen />}
      >
        Getting proficient with Python, understanding vectorized scripting, ML
        Training principles (k-fold cross-validation, parameter fine-tuning,
        blind testing)
      </JourneyItem>
      <JourneyItem
        date="May 2025"
        title="Finished off first-year strong"
        subtitle="Accepted to UBC Science Co-op as a first year applicant"
        icon={<PartyPopper />}
      >
        Finished the year of strong academically with a 90%+ GPA.
      </JourneyItem>
      <JourneyItem
        date="June 2025"
        title="Built a personal tool - the UBC Email Summarizer"
        subtitle="Developed a web automation to solve a problem in my own life, hosted it on Google Cloud Connsole"
        icon={<Wrench />}
      >
        Applying what I learnt from a year of Computer Science and experimenting
        in my own time
      </JourneyItem>
      <JourneyItem
        date="June 2025 - July 2025"
        title="Meter Data Management Intern @ Abjayon Technologies"
        subtitle="First internship experience, working with production-scale data"
        icon={<DollarSign />}
      >
        Applying my python proficiency and statistical principles to a place
        where every mistake had a $$$ cost attached to it
      </JourneyItem>
      <JourneyItem
        date="Sept 2025 - Dec 2025"
        title="Second Year @ UBC Begins!"
        subtitle="Diving Deeper into Low Level Development - C, C++, ASM"
        icon={<LibraryBig />}
      >
        Making a simulation that runs MIPS Based ASM as part of coursework,
        diving deep into data structures, pathfinding algorithms and C compilers
      </JourneyItem>
      <JourneyItem
        date="Jan 2026 - Current"
        title="ONGOING WORK - InsightUBC"
        subtitle="Working on a fullstack web-app to host complex queries over historical course offerings at UBC"
        icon={<Layers />}
      >
        Using TypeScript + Express.js to design a RESTFul API, support large
        batch uploads through .zip files, design a React frontend to support
        CRUD Operations
      </JourneyItem>
      <JourneyItem
        date="Feb 2026 - Current"
        title="ONGOING WORK - DraMake OS"
        subtitle="Prototyping a white labelled automation service for a micro-drama production company"
        icon={<Drama />}
      >
        Automate script upload and AI analysis through n8n, Use LLM to fill out
        contract PDF templates and automatically email to parties involved,
        streamline daily budget tracking to address critical pain points in the
        micro drama production industry.
      </JourneyItem>
    </VerticalTimeline>
  );
}
