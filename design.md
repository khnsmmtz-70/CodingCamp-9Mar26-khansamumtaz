# Browser Dashboard - Design Document

## Architecture Overview

### File Structure
```
project/
├── index.html          # Main HTML structure
├── css/
│   └── style.css      # All styling (light/dark themes)
├── js/
│   └── app.js         # All JavaScript logic
└── docs/
    ├── requirements.md
    ├── design.md
    └── tasks.md
```

## Component Design

### 1. Theme System
**Purpose:** Toggle between light and dark modes

**UI Elements:**
- Fixed position toggle button (top-right corner)
- Icon changes: 🌙 (light mode) / ☀️ (dark mode)

**Data Storage:**
- Key: `theme`
- Values: `'light'` | `'dark'`

**Styling:**
- Light mode: Purple gradient background (#667eea → #764ba2)
- Dark mode: Dark blue gradient (#1a1a2e → #16213e)
- Smooth transitions (0.3s)

---

### 2. Greeting Section
**Purpose:** Display personalized greeting with date/time

**UI Elements:**
- Greeting text (changes based on time of day)
- Current date and time (updates every second)
- Name input field (centered, max-width 300px)

**Logic:**
- Morning: 00:00 - 11:59
- Afternoon: 12:00 - 17:59
- Evening: 18:00 - 23:59

**Data Storage:**
- Key: `userName`
- Value: String (user's name)

---

### 3. Focus Timer (Pomodoro)
**Purpose:** Countdown timer for focus sessions

**UI Elements:**
- Large timer display (MM:SS format)
- Control buttons: Start, Stop, Reset
- Duration input (1-60 minutes)
- Set button to apply new duration

**State Management:**
- `timerInterval`: Interval ID for countdown
- `timerDuration`: Minutes (default 25)
- `timeLeft`: Seconds remaining

**Data Storage:**
- Key: `timerDuration`
- Value: Number (minutes)

**Behavior:**
- Start: Begin countdown (1 second intervals)
- Stop: Pause countdown
- Reset: Reset to configured duration
- Alert when timer reaches 0

---

### 4. To-Do List
**Purpose:** Task management with CRUD operations

**UI Elements:**
- Input field + Add button
- List of tasks with:
  - Task text (editable on double-click)
  - Done state (toggle on single-click)
  - Delete button

**Data Structure:**
```javascript
[
  { text: "Task name", done: false },
  { text: "Completed task", done: true }
]
```

**Data Storage:**
- Key: `todos`
- Value: JSON array of task objects

**Interactions:**
- Single-click task: Toggle done state
- Double-click task: Enable editing
- Enter key: Save edit
- Blur: Save edit and exit editing mode

---

### 5. Quick Links
**Purpose:** Fast access to favorite websites

**UI Elements:**
- Name input + URL input + Add button
- Grid of link buttons (responsive, min 150px)
- Delete button (×) on each link (top-right corner)

**Data Structure:**
```javascript
[
  { name: "Google", url: "https://google.com" },
  { name: "GitHub", url: "https://github.com" }
]
```

**Data Storage:**
- Key: `links`
- Value: JSON array of link objects

**Behavior:**
- Click link button: Open URL in new tab
- Click delete (×): Remove link from list

---

## Color Scheme

### Light Mode
- Background: Linear gradient (#667eea → #764ba2)
- Cards: White (#ffffff)
- Text: Dark gray (#333333)
- Primary buttons: Purple (#667eea)
- Delete buttons: Red (#e74c3c)
- Link buttons: Dark purple (#764ba2)

### Dark Mode
- Background: Linear gradient (#1a1a2e → #16213e)
- Cards: Dark blue (#0f3460)
- Text: Light gray (#e0e0e0)
- Inputs: Darker blue (#1a1a2e)
- Todo items: Dark blue (#16213e)

---

## Responsive Design
- Container max-width: 800px
- Centered layout
- Grid for links: auto-fill, min 150px columns
- Mobile-friendly padding and spacing

---

## Local Storage Keys Summary
| Key | Type | Description |
|-----|------|-------------|
| `theme` | String | 'light' or 'dark' |
| `userName` | String | User's custom name |
| `timerDuration` | Number | Timer duration in minutes |
| `todos` | JSON Array | List of todo items |
| `links` | JSON Array | List of quick links |
