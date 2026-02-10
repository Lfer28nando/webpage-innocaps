import { useRef, useCallback } from 'react';
import SolutionsManifesto from './SolutionsManifesto';
import SolutionsPillars from './SolutionsPillars';
import TilvalosinaCaseStudy from './TilvalosinaCaseStudy';
import ServiceModel from './ServiceModel';

/* ═══════════════════════════════════════════
   SOLUTIONS PAGE — Main orchestrator
   Assembles all 4 sections:
    1. Manifesto (hero intro)
    2. 4 Pillars of Impact (interactive 3D)
    3. Tilvalosina Case Study (trust signal)
    4. Service Model (I+D as a Service)
   ═══════════════════════════════════════════ */

export default function SolutionsPage() {
  const ecosistemaRef = useRef(null);

  const scrollToEcosistema = useCallback(() => {
    const el = document.getElementById('ecosistema');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  return (
    <div className="bg-slate-950 min-h-screen">
      <SolutionsManifesto onCTAClick={scrollToEcosistema} />
      <SolutionsPillars />
      <TilvalosinaCaseStudy />
      <ServiceModel />
    </div>
  );
}
