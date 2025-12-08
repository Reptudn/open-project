# Open-Project — Fitness Tracker App

---

## Table of Contents

1. [Introduction](#chapter-i---introduction)
2. [Foreword](#chapter-ii---foreword)
3. [Subject](#chapter-iii---subject)
4. [Bonus](#chapter-iv---bonus)

---

## Chapter I - Introduction

Open-Project is a lightweight cross-platform fitness tracker built during the 42 curriculum. The app helps users track daily calories, meals, and body weight, and includes utilities such as barcode lookup and a food database. The goal is a clean, responsive experience with solid data handling and accessible UI.

---

## Chapter II - Foreword

Open-Project is presented here as the result of a semester-long exercise in software engineering and human-centered design. This document describes the specification, implementation, and evaluation of a cross-platform fitness tracker built during the 42 curriculum. The work aims to demonstrate sound engineering practices, robust data handling, and a usable interface suitable for mobile and web.

**NO PAIN NO GAIN!**

---

## Chapter III - Subject

### Project Information

| Field                         | Value                                                                                                                                                                                                  |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Program name**              | Open-Project (fitness tracker)                                                                                                                                                                         |
| **Turn-in directory**         | `./ (project root)`                                                                                                                                                                                    |
| **Files to turn in**          | `app/**`, `package.json`, `tsconfig.json`, `README.md`, `subject/*.tex`, `assets/`                                                                                                                     |
| **Allowed frameworks / libs** | Expo / React Native, TypeScript, expo-router, @gorhom/bottom-sheet, react-native-gesture-handler, @expo/vector-icons, local DB (SQLite / AsyncStorage), fetch / axios, OpenFoodFacts API (or local DB) |

### Project Description

Open-Project is a lightweight cross-platform fitness tracker. Users can search or scan food items, add specified quantities (grams or portions) to meals, log body weight, and view daily calorie summaries and charts. The app emphasizes a clean, responsive UI, reliable data handling and offline-friendly storage.

### Mandatory Features

The following features **must be implemented**:

- **Food input**: search and barcode scan (OpenFoodFacts or local DB)
- **Add food to meals**: Breakfast / Lunch / Dinner / Snacks with amount in grams or portions
- **Persisted daily data**: meals and weight (local DB or persistent storage)
- **Weight entry and history**: per day tracking
- **Daily summary UI**: calorie totals and a breakdown chart
- **Bottom-sheet flow**: quick add/edit of food entries
- **Theming**: light / dark mode and accessible UI (contrast, readable fonts)
- **Navigation**: back gesture support on mobile
- **Validation and error handling**: for inputs and network failures
- **Documentation**: README with build/run instructions and a short demo guide

### Deliverables

- **Complete source code** in the repository (all files listed above)
- **README** with steps to run (`make devcontainer`, `make`, `expo start`), required environment and demo steps
- **Subject PDF** (this document) describing architecture, decisions and known limitations
- **Demo materials**: screenshots showing core flows (scan/search, add grams/portions, weight entry, daily summary)

### Evaluation Criteria

The project will be evaluated on:

- **Feature completeness and correctness**: required features working
- **Usability and UI polish**: layout, theming, responsive behaviour
- **Code quality**: modular components, clear types, error handling
- **Stability**: no crashes, handles offline / bad input gracefully
- **Defense**: ability to explain architecture and implementation decisions

---

## Chapter IV - Bonus

### Optional Features

The following bonus features can be implemented for additional credit:

#### Low Effort / High Impact

- **Barcode DB caching**: cache scanned / fetched product records locally for faster lookups and offline availability
- **Export / Import**: CSV / JSON export of meals and weight history and an import option for backups or analysis
- **Scheduled reminders**: local notifications to remind users to log meals or weight
- **Localization & accessibility**: add one or more languages and improve screen-reader support and contrast options
- **Demo video & guided script**: a 2–3 minute walkthrough video and a short demo script for the defense

#### Medium Effort

- **User goals & progress**: allow users to set calorie/macros goals and display progress charts (daily / weekly)
- **Smart suggestions**: suggest foods or portion sizes based on the user's history and common entries
- **Offline-first sync**: queue local changes and synchronize with a remote backend when online; include simple conflict handling
- **Automated tests & CI**: basic end-to-end tests (Detox / Playwright) and a CI pipeline to verify builds and tests

#### High Effort (Optional)

- **Health platform integration**: sync weight and calories with Apple Health / Google Fit where available

### Recommended Bonus Features

For **maximum impact** with **reasonable effort**, we recommend implementing:

1. **Barcode DB caching** - improves UX and offline capability
2. **Export/Import** - data portability and backup
3. **Demo video** - excellent for defense presentation

These features are clearly demonstrable during defense and noticeably improve usability and robustness.

---

## Quick Start

### Prerequisites

- Node.js and npm/yarn
- Docker (for devcontainer)
- Expo CLI

### Build & Run

```bash
# Setup devcontainer
make devcontainer

# Build the project
make

# Start the app
cd app
expo start
```

### Testing

Navigate to the app and test the following flows:

1. **Search/Scan**: Use barcode scanner or search to find food
2. **Add to Meal**: Select grams or portions and add to a meal type
3. **Weight Entry**: Log daily weight
4. **Daily Summary**: View calorie breakdown and progress

---

**Good luck and happy coding! 💪**
