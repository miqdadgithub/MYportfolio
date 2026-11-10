(() => {
  const diagrams = {
    'compton': {
      vertices: [[128, 85], [280, 85]],
      lines: [
        { from: [51, 36], to: [128, 85] },
        { from: [51, 134], to: [128, 85], boson: true },
        { from: [128, 85], to: [280, 85], stage: 1 },
        { from: [280, 85], to: [357, 36], stage: 2 },
        { from: [280, 85], to: [357, 134], boson: true, stage: 2 },
      ],
      labels: [
        [33, 32, 'e⁻'], [33, 141, 'γ', true], [375, 32, 'e⁻'], [375, 141, 'γ', true], [204, 64, 'e⁻'],
      ],
    },
    'electron-muon': {
      vertices: [[204, 44], [204, 125]],
      lines: [
        { from: [51, 28], to: [204, 44] },
        { from: [51, 142], to: [204, 125] },
        { from: [204, 44], to: [204, 125], boson: true, stage: 1 },
        { from: [204, 44], to: [357, 28], stage: 2 },
        { from: [204, 125], to: [357, 142], stage: 2 },
      ],
      labels: [
        [33, 27, 'e⁻'], [33, 146, 'μ⁻'], [375, 27, 'e⁻'], [375, 146, 'μ⁻'], [226, 89, 'γ', true],
      ],
    },
    'beta-decay': {
      vertices: [[135, 49], [258, 110]],
      lines: [
        { from: [51, 49], to: [135, 49] },
        { from: [135, 49], to: [357, 32], stage: 1 },
        { from: [135, 49], to: [258, 110], boson: true, stage: 1 },
        { from: [258, 110], to: [357, 88], stage: 2 },
        { from: [258, 110], to: [357, 140], anti: true, stage: 2 },
      ],
      labels: [
        [33, 53, 'n'], [375, 35, 'p'], [375, 89, 'e⁻'], [375, 145, 'ν̄ₑ'], [180, 94, 'W⁻', true],
      ],
    },
    'neutrino': {
      vertices: [[184, 47], [228, 121]],
      lines: [
        { from: [51, 39], to: [184, 47] },
        { from: [51, 128], to: [228, 121] },
        { from: [184, 47], to: [228, 121], boson: true, stage: 1 },
        { from: [184, 47], to: [357, 31], stage: 2 },
        { from: [228, 121], to: [357, 144], stage: 2 },
      ],
      labels: [
        [32, 39, 'ν<tspan baseline-shift="sub" font-size="11">μ</tspan>'],
        [33, 133, 'e⁻'],
        [377, 31, 'ν<tspan baseline-shift="sub" font-size="11">μ</tspan>'],
        [375, 148, 'e⁻'],
        [233, 85, 'Z⁰', true],
      ],
    },
  };

  function wavePath(from, to) {
    const dx = to[0] - from[0];
    const dy = to[1] - from[1];
    const length = Math.hypot(dx, dy);
    const halfWaves = Math.max(6, Math.round(length / 15) * 2);
    const point = (fraction, normalOffset) => {
      const x = from[0] + fraction * dx - normalOffset * dy / length;
      const y = from[1] + fraction * dy + normalOffset * dx / length;
      return `${x.toFixed(2)},${y.toFixed(2)}`;
    };

    let path = `M ${from}`;
    for (let index = 0; index < halfWaves; index += 1) {
      const offset = index % 2 === 0 ? 6.5 : -6.5;
      path += ` C ${point((index + 1 / 3) / halfWaves, offset)} ${point((index + 2 / 3) / halfWaves, offset)} ${point((index + 1) / halfWaves, 0)}`;
    }
    return path;
  }

  function renderLine({ from, to, boson = false, anti = false, stage = 0 }) {
    const path = boson ? wavePath(from, to) : `M ${from} L ${to}`;
    let arrow = '';
    if (!boson) {
      const x = (from[0] + to[0]) / 2;
      const y = (from[1] + to[1]) / 2;
      const angle = Math.atan2(to[1] - from[1], to[0] - from[0]) * 180 / Math.PI + (anti ? 180 : 0);
      arrow = `<path class="arrow" d="M -4.5,-3.5 L 4.5,0 L -4.5,3.5 Z" transform="translate(${x} ${y}) rotate(${angle})"/>`;
    }
    return `<path class="line${boson ? ' boson' : ''}" d="${path}"/>
      ${arrow}
      <path class="trace" d="${path}" pathLength="1" style="--stage-delay: ${stage * 900}ms"/>`;
  }

  function renderDiagram(diagram) {
    return `<svg viewBox="0 0 408 170" aria-hidden="true" focusable="false">
      ${diagram.lines.map(renderLine).join('')}
      ${diagram.vertices.map(([x, y]) => `<circle class="vertex" cx="${x}" cy="${y}" r="3.15"/>`).join('')}
      ${diagram.labels.map(([x, y, label, boson]) => `<text class="label${boson ? ' boson-label' : ''}" x="${x}" y="${y}" text-anchor="middle">${label}</text>`).join('')}
    </svg>`;
  }

  const styles = `
    :host {
      --_ink: var(--diagram-ink, #76695d);
      --_accent: var(--diagram-accent, #a35a44);
      display: block;
      min-width: 0;
      aspect-ratio: 408 / 170;
      pointer-events: none;
    }

    svg { display: block; width: 100%; height: auto; }
    .line, .trace { fill: none; stroke-linecap: round; }
    .line { stroke: var(--_ink); stroke-width: 1.5; }
    .line.boson { stroke: var(--_accent); }
    .arrow { fill: var(--_ink); }
    .vertex { fill: var(--_accent); }
    .label { fill: var(--_ink); font: italic 19px Georgia, serif; }
    .boson-label { fill: var(--_accent); }

    .trace {
      opacity: 0;
      stroke: var(--_accent);
      stroke-width: 2.8;
      stroke-dasharray: .18 1.2;
      animation: interaction-pulse 4.8s linear infinite;
      animation-delay: calc(var(--diagram-delay, 0s) + var(--stage-delay));
      animation-play-state: paused;
    }

    :host([data-playing]) .trace { animation-play-state: running; }

    /* Each trace completes in 864 ms, before the next 900 ms stage begins. */
    @keyframes interaction-pulse {
      0% { opacity: 0; stroke-dashoffset: .18; }
      3%, 15% { opacity: .9; }
      18%, 100% { opacity: 0; stroke-dashoffset: -1; }
    }

    @media (prefers-reduced-motion: reduce) {
      .trace { animation: none; }
    }
  `;

  const visibility = 'IntersectionObserver' in window
    ? new IntersectionObserver(entries => {
      for (const entry of entries) {
        entry.target.toggleAttribute('data-playing', entry.isIntersecting);
      }
    })
    : null;

  class FeynmanDiagram extends HTMLElement {
    connectedCallback() {
      const process = this.dataset.process;
      if (!Object.hasOwn(diagrams, process)) return;

      if (!this.shadowRoot) {
        this.attachShadow({ mode: 'open' }).innerHTML = `<style>${styles}</style>${renderDiagram(diagrams[process])}`;
      }

      if (visibility) {
        visibility.observe(this);
      } else {
        this.setAttribute('data-playing', '');
      }
    }

    disconnectedCallback() {
      visibility?.unobserve(this);
      this.removeAttribute('data-playing');
    }
  }

  customElements.define('feynman-diagram', FeynmanDiagram);
})();
