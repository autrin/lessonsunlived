# Autrin Hakimi — Portfolio

Personal portfolio site for Autrin Hakimi, a Software Systems Engineer based in Phoenix, AZ. Live at [autrin.github.io/](https://autrin.github.io/).

## About

I'm a Software Systems Engineer at ASM America, working across firmware, ML pipelines, robotics, and full-stack application development. I co-authored **HydroGAT** (ACM SIGSPATIAL 2025), a distributed deep learning system for flood prediction trained across 64 NVIDIA A100 GPUs on NERSC's Perlmutter supercomputer.

I'm looking for roles in embedded, robotics, distributed systems, applied ML, or infrastructure — anywhere the work touches real systems and the bar is correctness, not just velocity.

- **Email**: autrinhakimi@gmail.com
- **GitHub**: [github.com/autrin](https://github.com/autrin)
- **LinkedIn**: [linkedin.com/in/autrin](https://www.linkedin.com/in/autrin)

## Background

- **B.S. Computer Science**, Iowa State University, May 2025 (Magna Cum Laude, GPA 3.70)
- **Publication**: Co-author, HydroGAT, ACM SIGSPATIAL 2025 — [paper](https://arxiv.org/html/2509.02481v1) · [code](https://github.com/swapp-lab/HydroGAT)
- **Tech**: Python, C, C++, JavaScript, SQL, Rust (learning), Flask, PyTorch, Linux, Git
- **Interests**: Embedded systems, robotics, distributed systems, applied ML, systems programming

## Featured Projects

Code lives across separate repositories — the site surfaces them with context. Highlights:

- **[HydroGAT](https://github.com/swapp-lab/HydroGAT)** — Spatiotemporal deep learning for flood prediction. Heterogeneous graph + Transformer architecture, distributed training across 64 A100s with 15× speedup. NSE 0.97, KGE 0.96.
- **[Robotic Chess Player](https://github.com/autrin/robotic-chess-player)** — Autonomous UR10e arm with AprilTag-based perception and Stockfish integration.
- **[xv6-RISC-V Schedulers](https://github.com/autrin/xv6-riscv)** — Round-Robin and Stride schedulers implemented in the xv6 kernel.
- **[Multi-Threaded Encryptor](https://github.com/autrin/multi-threaded-text-file-encryptor)** — Five-stage concurrent encryption pipeline in C using pthreads, semaphores, and condition variables.
- **[Go-Back-N ARQ](https://github.com/autrin/gobackn)** — Reliable transport protocol over TCP with CRC and sliding-window retransmission.

---

## Repository Contents

This repository contains the source for the portfolio site itself: a static three-file site built with plain HTML, CSS, and vanilla JavaScript. No framework, no build step.

### Stack

- HTML5
- CSS3 (Grid, Flexbox, CSS variables)
- Vanilla JavaScript (no dependencies)
- Font Awesome for icons
- Google Fonts (Orbitron, Share Tech Mono)
- [Formspree](https://formspree.io/) for contact form handling

### Local Development

Clone and open `index.html` directly in a browser, or serve it locally:

```bash
git clone https://github.com/autrin/autrin.github.io.git
cd autrin.github.io
python3 -m http.server 8000
# open http://localhost:8000
```

### File Layout
```
.
├── index.html      # Page structure and content
├── styles.css      # Theme, layout, responsive design
├── script.js       # Navigation, contact form, scroll behavior
└── README.md
```

### Customization

Color scheme is defined as CSS variables in `styles.css`:

```css
:root {
    --primary-color: #4ade80;     /* green */
    --accent-color: #38bdf8;      /* blue */
    --bg-dark: #0f1115;
    /* ... */
}
```

Project cards in `index.html` follow a consistent pattern under `<section id="projects">` — duplicate one of the existing `.project-card` blocks to add a new entry.

### Browser Support

Tested in current Chrome, Firefox, Safari, and Edge.

## License

MIT. See [LICENSE](LICENSE).