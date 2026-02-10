import { ThemeProvider } from '../contexts/ThemeContext';
import { Header } from './Header';
import HeroSection from './HeroSection';
import ProcessSection from './ProcessSection';
import ProfessionalsSection from './ProfessionalsSection';
import SectorsAccordion from './SectorsAccordion';

export default function App() {
  return (
    <ThemeProvider>
      <div className="app-wrapper">
        <Header />
        <HeroSection />
        <ProcessSection />
        <ProfessionalsSection />
        <SectorsAccordion />
      </div>
    </ThemeProvider>
  );
}
