# Browser Dashboard - Requirements

## Technical Constraints

### TC-1: Technology Stack
- HTML for structure
- CSS for styling
- Vanilla JavaScript (no frameworks like React, Vue, etc.)
- No backend server required

### TC-2: Data Storage
- Use browser Local Storage API
- All data stored client-side only

### TC-3: Browser Compatibility
- Must work in modern browsers (Chrome, Firefox, Edge, Safari)
- Can be used as standalone web app or browser extension

## Non-Functional Requirements

### NFR-1: Simplicity
- Clean, minimal interface
- Easy to understand and use
- No complex setup required
- No test setup required

### NFR-2: Performance
- Fast load time
- Responsive UI interactions
- No noticeable lag when updating data

### NFR-3: Visual Design
- User-friendly aesthetic
- Clear visual hierarchy
- Readable typography

## Required Features (MVP)

### Greeting
- Show current time and date
- Show a greeting based on the time of day
- Custom name input for personalized greeting

### Focus Timer
- Pomodoro timer (default 25 minutes)
- Start, stop, and reset buttons
- Customizable timer duration (1-60 minutes)

### To-Do List
- Add tasks
- Edit tasks (double-click to edit)
- Mark tasks as done (single-click to toggle)
- Delete tasks
- Save tasks using Local Storage

### Quick Links
- Buttons that open favorite websites
- Add custom links with name and URL
- Delete links
- Links must be saved in Local Storage

### Theme
- Light/Dark mode toggle
- Theme preference saved in Local Storage

## Folder Rules
- Only 1 CSS file inside css/
- Only 1 JavaScript file inside js/
- Keep code clean and readable
