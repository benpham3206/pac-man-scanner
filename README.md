# PAC-MAN: SCANNER

A Scanner Sombre-inspired reimagining of the classic PAC-MAN arcade game. Navigate through complete darkness using only a LIDAR scanner to reveal your surroundings.

![PAC-MAN: SCANNER](https://img.shields.io/badge/PAC--MAN-SCANNER-yellow?style=for-the-badge)

## 🎮 Features

### Core Gameplay
- **LIDAR Scanning**: Hold left mouse button to scan and reveal the environment
- **Pellet Collection**: Find and collect all pellets to win
- **Ghost Avoidance**: Avoid ghosts or eat them when powered up
- **Power Pellets**: Large pellets that let you eat ghosts temporarily

### Scan Modes
| Key | Mode | Description |
|-----|------|-------------|
| **Q** | Default | Random Scatter (Center-biased) |
| **E** | Beam | Flashlight Cone |
| **R** | Spiral | Archimedes Spiral |
| **T** | Line | Horizontal 180° / Vertical Toggle |

### Visual Features
- **LIDAR point cloud visualization**
- **Distance-based coloring**
- **Vibrant Ghost Colors**
- **Minimap** (Tab)
- **Ghost Point Fade**: Scanned ghost particles fade after 5 seconds
- **Permanent Pellets**: Scanned pellet locations stay visible
- **Minimap**: Real-time top-down view of scanned areas
- **Expanded Map (Tab)**: Hold Tab for fullscreen map overlay

### Audio
- **Web Audio**: Immersive soundscape with reverb and directional cues.
- **Atmospheric Reverb**: Cave-like echo on all sounds
- **Scan Sounds**: Subtle scanning audio feedback
- **Ghost Proximity**: Low-frequency hum that intensifies near ghosts
- **Classic Sounds**: Wakka-wakka pellet collection

### Quality of Life
- **Wall Sliding**: Diagonal movement slides along walls
- **Proximity Indicator**: Red pulsing ring on minimap when ghosts are near
- **Restart Button**: Quick restart from HUD
- **Multiple End Screens**: Win and Game Over with menu/restart options

## 🕹️ Controls

| Input | Action |
|-------|--------|
| **WASD** | Move |
| **Mouse** | Look around |
| **LMB (Hold)** | Scan |
| **Q/E/R/T** | Change scan mode |
| **Tab (Hold)** | Open expanded map |
| **Escape** | Unlock cursor / Close map |

## 🚀 Getting Started

1. Download `pacman3d.html`
2. Open in any modern browser (Chrome/Edge/Firefox)
3. Click "BEGIN" to start
4. Click the game window to lock your cursor
5. Start scanning!

## 🛠️ Technical Details

- **Single HTML File**: No build process required
- **Dependencies**: React 18, Three.js 0.160.0 (loaded via CDN)
- **Web Audio API**: Custom sounds with convolver reverb
- **Canvas 2D**: Minimap and expanded map rendering

## 📜 License

MIT License - Feel free to modify and share!

---

*Inspired by Scanner Sombre by Introversion Software*
