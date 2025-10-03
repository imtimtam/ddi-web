# Drug Library (Frontend)

<p align="center">
  <img src="./images/screenshots/updated_webpage-search.png" alt="DDI Frontend" />
  <br>
  <em>View potential interactions and reported adverse events instantly.</em>
</p>

**Drug Library** is a responsive web application for exploring drugs, identifying potential drug-drug interactions (DDIs), and reviewing shared receptor targets. The site integrates with a FastAPI backend that processes multi-million row pharmacological and FDA datasets, enabling accurate and scalable results across thousands of drugs and reported adverse events. The API can be found [here](https://github.com/imtimtam/ddi-api).

## Demo Features
- **Drug Interaction Search**: Enter two drugs to check for potential interactions from a backend API.

<p align="center">
  <img src="./images/screenshots/updated_webpage-safe.png" alt="Safe Interaction Results" />
  <br>
  <em>Clear and reliable results when no adverse events are found.</em>
</p>

- **Drug Target Search**: Explore drug targets (planned).
- **Symptom Checker**: Explore drug-related symptoms and what may be causing them (planned).

## Design Features
- **Responsive Frontend**: Works seamlessly across desktop and mobile devices.
- **Autocomplete Search**: Improves usability when working with thousands of available drug names.
- **Modular CSS**: Styles organized into reusable components for maintainability.
- **CSS Variables**: Centralized control of colors, fonts, and backgrounds for theme consistency.
- **BEM Design**: Structure follows Block Element Modifier methodology to ensure predictable and clear design.
- **Flexbox Layouts**: Ensures balanced, adaptive alignment across devices.
- **Interactive JavaScript**: Powers autocomplete and dynamic rendering of search results.
- **Minimalist Header & Navigation**: Clean design with hover and active states.
- **Google Fonts Integration**: `Open Sans` used for modern, readable typography.

## Technologies
- HTML5
- CSS3
- Google Fonts: `Open Sans`

## Getting Started

**Prerequisites**

- A modern web browser (Chrome, Firefox, etc.)
- Live Server extension in VS Code

**1. Clone and move to the repository**

    git clone https://github.com/imtimtam/ddi-web

**2. Run with Live Server**
- Right-click `index.html` and **Open with Live Server**.

## Roadmap
- Improve responsive design and add potential animations.

## License

This project is licensed under the MIT License.

## Credits

- **Icons and Images** – Pixabay (free under [Pixabay License](https://pixabay.com/service/license/))