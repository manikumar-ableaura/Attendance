# Attendance Management System

A clean, responsive static web application for managing student attendance across multiple batches. Built with vanilla HTML, CSS, and JavaScript - no frameworks or build tools required.

## Features

- **Batch Selection**: Choose between Batch A and Batch B
- **12 Students Per Batch**: Each batch contains 12 unique students
- **Radio Button Selection**: Mark each student as Present or Absent
- **Form Validation**: Ensures all students are marked before submission
- **Attendance Summary**: View detailed statistics in a custom modal
- **Fully Responsive**: Works seamlessly on mobile, tablet, and desktop
- **Accessible**: WCAG compliant with proper ARIA labels and keyboard navigation
- **No Dependencies**: Pure HTML/CSS/JavaScript - ready for GitHub Pages

## Technologies Used

- **HTML5**: Semantic markup for structure
- **CSS3**: Modern styling with CSS variables and flexbox/grid
- **Vanilla JavaScript (ES6+)**: Clean, commented code with no frameworks
- **GitHub Pages**: Free static site hosting

## Project Structure

```
Attendance/
├── index.html      # Main HTML structure with semantic elements
├── style.css       # Responsive styling with CSS variables
├── script.js       # Application logic and interactivity
└── README.md       # This file
```

## Local Development Setup

1. **Clone or download this repository**

2. **Navigate to the Attendance folder**
   ```bash
   cd Attendance
   ```

3. **Open in browser**
   - Simply double-click `index.html`, or
   - Use a local server (optional):
     ```bash
     # Python 3
     python -m http.server 8000

     # Python 2
     python -m SimpleHTTPServer 8000

     # Node.js (if you have http-server installed)
     npx http-server
     ```
   - Then visit `http://localhost:8000`

## GitHub Pages Deployment

Follow these steps to deploy your Attendance Management System to GitHub Pages:

### Step 1: Create a GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the **+** icon in the top-right corner
3. Select **New repository**
4. Enter a repository name (e.g., `attendance-system`)
5. Choose **Public** visibility
6. Click **Create repository**

### Step 2: Push Your Code to GitHub

1. **Initialize Git** (if not already done):
   ```bash
   cd C:\Kausi\Project\Attendance
   git init
   ```

2. **Add your files**:
   ```bash
   git add .
   ```

3. **Commit your changes**:
   ```bash
   git commit -m "Initial commit: Attendance Management System"
   ```

4. **Add remote repository** (replace `YOUR_USERNAME` and `YOUR_REPO`):
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   ```

5. **Push to GitHub**:
   ```bash
   git branch -M main
   git push -u origin main
   ```

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on **Settings** tab
3. Scroll down to **Pages** in the left sidebar
4. Under **Source**, select:
   - Branch: `main`
   - Folder: `/ (root)` or `/Attendance` (if files are in subfolder)
5. Click **Save**
6. Wait 1-2 minutes for deployment

### Step 4: Access Your Live Site

Your site will be available at:
```
https://YOUR_USERNAME.github.io/YOUR_REPO/
```

If files are in the `Attendance` subfolder:
```
https://YOUR_USERNAME.github.io/YOUR_REPO/Attendance/
```

## Usage Instructions

### Marking Attendance

1. **Select a Batch**
   - On the landing page, click either **Batch-A** or **Batch-B**

2. **Mark Attendance**
   - For each student, select either **Present** or **Absent**
   - You must mark all 12 students before submitting

3. **Submit**
   - Click the **Submit Attendance** button
   - If any students are unmarked, you'll see an error message
   - Once all students are marked, a success modal will appear

4. **View Summary**
   - The modal shows:
     - Batch name
     - Total students (12)
     - Number present
     - Number absent
     - Attendance percentage

5. **Close & Reset**
   - Click **OK** or the **X** button to close the modal
   - You'll return to the batch selection screen
   - You can now mark attendance for another batch

### Navigation

- **Back Button**: Click the pill-shaped back arrow (←) button at any time to return to batch selection
- **ESC Key**: Press ESC to close the modal
- **Click Overlay**: Click outside the modal to close it

## Student Lists

### Batch-A (12 Students)
1. Arjun Kumar
2. Karthik Raja
3. Surya Prakash
4. Vijay Shankar
5. Arun Vel
6. Dinesh Murugan
7. Harish Kannan
8. Naveen Ravi
9. Praveen Anand
10. Ramesh Siva
11. Sanjay Mani
12. Vikram Selva

### Batch-B (12 Students)
1. Ajith Krishna
2. Bharath Ganesan
3. Dheepan Senthil
4. Ezhil Arasu
5. Gowtham Cheran
6. Ilango Pandian
7. Jayaram Saravanan
8. Kavin Madhavan
9. Manikandan Subbu
10. Nithin Vimal
11. Prabhu Bala
12. Rajesh Thiru

## Key Features Explained

### Independent Batch States
- Each batch maintains its own attendance state
- Switching between batches resets the form
- No interference between Batch A and Batch B data

### Validation System
- Real-time validation as you mark attendance
- Error message appears if submission is attempted with incomplete data
- Submit button is disabled after successful submission

### Accessibility Features
- Semantic HTML5 elements
- ARIA labels for screen readers
- Keyboard navigation support
- Focus management in modal
- High contrast mode support
- Reduced motion support for users who prefer it

### Responsive Design
- **Mobile** (< 768px): Stacked layout, touch-friendly buttons
- **Tablet** (768px - 1023px): Optimized spacing and layout
- **Desktop** (1024px+): Full-width layout with maximum readability

### Custom Modal
- No browser `alert()` used
- Smooth fade-in animation
- Click outside to close
- ESC key support
- Prevents body scroll when open
- Success message with emoji

## Browser Compatibility

Works on all modern browsers:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Opera 76+

## Customization

### Changing Colors
Edit CSS variables in `style.css`:
```css
:root {
    --primary-color: #4A90E2;  /* Change to your brand color */
    --success-color: #28A745;
    --danger-color: #DC3545;
}
```

### Adding More Students
Edit the `batchData` object in `script.js`:
```javascript
const batchData = {
    'Batch A': [
        'New Student Name',
        // Add more students here
    ]
};
```

### Adding More Batches
1. Add batch to `batchData` in `script.js`
2. Add a button in `index.html` batch selection section
3. Add click event listener in `script.js`

## Future Enhancements

Potential features for future versions:
- Local storage to persist attendance data
- Export attendance to CSV/PDF
- Date selection for historical records
- Multiple class sessions per day
- Teacher authentication
- Student photos
- Attendance trends and analytics
- Dark mode toggle

## Troubleshooting

### Modal doesn't appear
- Check browser console for JavaScript errors
- Ensure all files (HTML, CSS, JS) are in the same folder
- Verify `script.js` is linked correctly in `index.html`

### Styling looks broken
- Ensure `style.css` is linked in `index.html`
- Clear browser cache (Ctrl+F5 or Cmd+Shift+R)
- Check for CSS syntax errors

### GitHub Pages not working
- Ensure repository is public
- Wait 2-5 minutes after enabling GitHub Pages
- Check Settings → Pages for deployment status
- Verify file paths are correct (case-sensitive on GitHub)

## Contributing

This is a static educational project, but feel free to:
1. Fork the repository
2. Create your feature branch
3. Make improvements
4. Submit a pull request

## License

This project is open source and available for educational purposes.

## Author

Created as a demonstration of vanilla web development best practices.

---

**Live Demo**: Deploy to see it in action!

**Need Help?** Check the [GitHub Pages documentation](https://docs.github.com/en/pages) for deployment assistance.
