# Word Translation Dashboard

## Overview
This project is a web application built with React and TypeScript that allows users to manage and view word translations in multiple languages. It includes two main views:
- **Management Dashboard**: For editing translations, adding new keywords, and sorting keywords via drag-and-drop.
- **Public View**: For displaying keywords and translations with a language switcher.

## Features
- Edit translations for pre-set keywords in English, Persian, and Arabic.
- Add new keywords with translations for a specific language.
- Sort keywords by dragging them in the Management Dashboard.
- Switch languages in both views, with empty translations displayed as "No translation yet".
- Data is stored in `localStorage` and updated after every change.

## Setup Instructions
1. Clone the repository:
   ```bash
   git clone <repository-url>