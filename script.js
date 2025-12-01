// ==========================================
// STUDENT DATA - Hardcoded student lists
// ==========================================

const batchData = {
    'Batch-A': [
        'Arjun Kumar',
        'Karthik Raja',
        'Surya Prakash',
        'Vijay Shankar',
        'Arun Vel',
        'Dinesh Murugan',
        'Harish Kannan',
        'Naveen Ravi',
        'Praveen Anand',
        'Ramesh Siva',
        'Sanjay Mani',
        'Vikram Selva'
    ],
    'Batch-B': [
        'Ajith Krishna',
        'Bharath Ganesan',
        'Dheepan Senthil',
        'Ezhil Arasu',
        'Gowtham Cheran',
        'Ilango Pandian',
        'Jayaram Saravanan',
        'Kavin Madhavan',
        'Manikandan Subbu',
        'Nithin Vimal',
        'Prabhu Bala',
        'Rajesh Thiru'
    ]
};

// ==========================================
// APPLICATION STATE
// ==========================================

const state = {
    currentBatch: null,
    attendanceData: {}, // Stores attendance for current batch: { studentName: 'present'|'absent' }
    isSubmitted: false  // Prevents multiple submissions
};

// ==========================================
// DOM ELEMENTS - Cache for performance
// ==========================================

const elements = {
    // Views
    batchSelection: document.getElementById('batchSelection'),
    attendanceView: document.getElementById('attendanceView'),

    // Batch buttons
    batchABtn: document.getElementById('batchABtn'),
    batchBBtn: document.getElementById('batchBBtn'),

    // Attendance view elements
    batchTitle: document.getElementById('batchTitle'),
    studentList: document.getElementById('studentList'),
    submitBtn: document.getElementById('submitBtn'),
    backBtn: document.getElementById('backBtn'),
    errorMessage: document.getElementById('errorMessage'),

    // Modal elements
    modalOverlay: document.getElementById('modalOverlay'),
    modalBody: document.getElementById('modalBody'),
    modalCloseBtn: document.getElementById('modalCloseBtn'),
    modalOkBtn: document.getElementById('modalOkBtn')
};

// ==========================================
// EVENT LISTENERS
// ==========================================

// Batch selection buttons
elements.batchABtn.addEventListener('click', () => loadBatch('Batch-A'));
elements.batchBBtn.addEventListener('click', () => loadBatch('Batch-B'));

// Back button - return to batch selection
elements.backBtn.addEventListener('click', resetToSelection);

// Submit attendance button
elements.submitBtn.addEventListener('click', handleSubmit);

// Modal close buttons
elements.modalCloseBtn.addEventListener('click', closeModal);
elements.modalOkBtn.addEventListener('click', closeModal);

// Close modal when clicking overlay (outside modal content)
elements.modalOverlay.addEventListener('click', (e) => {
    if (e.target === elements.modalOverlay) {
        closeModal();
    }
});

// Close modal with ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !elements.modalOverlay.classList.contains('hidden')) {
        closeModal();
    }
});

// ==========================================
// CORE FUNCTIONS
// ==========================================

/**
 * Load and display the selected batch
 * @param {string} batchName - Name of the batch ('Batch-A' or 'Batch-B')
 */
function loadBatch(batchName) {
    // Reset state for new batch
    state.currentBatch = batchName;
    state.attendanceData = {};
    state.isSubmitted = false;

    // Hide error message
    elements.errorMessage.classList.add('hidden');

    // Update UI
    elements.batchTitle.textContent = `${batchName} Attendance`;

    // Render student list
    renderStudentList(batchName);

    // Show attendance view, hide batch selection
    elements.batchSelection.classList.add('hidden');
    elements.attendanceView.classList.remove('hidden');

    // Enable submit button
    elements.submitBtn.disabled = false;
}

/**
 * Render the list of students with radio buttons
 * @param {string} batchName - Name of the batch
 */
function renderStudentList(batchName) {
    // Clear previous content
    elements.studentList.innerHTML = '';

    // Get students for this batch
    const students = batchData[batchName];

    // Create a student item for each student
    students.forEach((studentName, index) => {
        const studentItem = createStudentItem(studentName, index);
        elements.studentList.appendChild(studentItem);
    });
}

/**
 * Create a student item DOM element
 * @param {string} studentName - Name of the student
 * @param {number} index - Index for unique ID generation
 * @returns {HTMLElement} Student item element
 */
function createStudentItem(studentName, index) {
    // Create container
    const div = document.createElement('div');
    div.className = 'student-item';
    div.setAttribute('role', 'listitem');

    // Student name
    const nameSpan = document.createElement('span');
    nameSpan.className = 'student-name';
    nameSpan.textContent = studentName;

    // Attendance options container
    const optionsDiv = document.createElement('div');
    optionsDiv.className = 'attendance-options';

    // Create Present radio button
    const presentGroup = createRadioGroup(
        studentName,
        'present',
        index,
        'Present'
    );

    // Create Absent radio button
    const absentGroup = createRadioGroup(
        studentName,
        'absent',
        index,
        'Absent'
    );

    // Assemble the student item
    optionsDiv.appendChild(presentGroup);
    optionsDiv.appendChild(absentGroup);
    div.appendChild(nameSpan);
    div.appendChild(optionsDiv);

    return div;
}

/**
 * Create a radio button group with label
 * @param {string} studentName - Name of the student
 * @param {string} status - 'present' or 'absent'
 * @param {number} index - Index for unique ID
 * @param {string} labelText - Label text to display
 * @returns {HTMLElement} Radio group element
 */
function createRadioGroup(studentName, status, index, labelText) {
    const group = document.createElement('div');
    group.className = 'radio-group';

    // Create radio input
    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = `attendance-${index}`; // Group by student using index
    radio.value = status;
    radio.id = `${status}-${index}`;

    // Add change event listener
    radio.addEventListener('change', () => {
        updateAttendance(studentName, status);
    });

    // Create label
    const label = document.createElement('label');
    label.htmlFor = `${status}-${index}`;
    label.textContent = labelText;

    // Assemble
    group.appendChild(radio);
    group.appendChild(label);

    return group;
}

/**
 * Update attendance state when a radio button is changed
 * @param {string} studentName - Name of the student
 * @param {string} status - 'present' or 'absent'
 */
function updateAttendance(studentName, status) {
    state.attendanceData[studentName] = status;

    // Hide error message when user makes a selection
    if (!elements.errorMessage.classList.contains('hidden')) {
        elements.errorMessage.classList.add('hidden');
    }
}

/**
 * Validate that all students have been marked
 * @returns {boolean} True if all students marked, false otherwise
 */
function validateAttendance() {
    const students = batchData[state.currentBatch];
    const markedStudents = Object.keys(state.attendanceData);

    // Check if all students have been marked
    return students.length === markedStudents.length;
}

/**
 * Calculate attendance summary
 * @returns {Object} Summary object with counts
 */
function calculateSummary() {
    const students = batchData[state.currentBatch];
    let presentCount = 0;
    let absentCount = 0;

    // Count present and absent
    Object.values(state.attendanceData).forEach(status => {
        if (status === 'present') {
            presentCount++;
        } else if (status === 'absent') {
            absentCount++;
        }
    });

    // Calculate percentage
    const totalStudents = students.length;
    const attendancePercentage = totalStudents > 0
        ? Math.round((presentCount / totalStudents) * 100)
        : 0;

    return {
        batchName: state.currentBatch,
        totalStudents,
        present: presentCount,
        absent: absentCount,
        percentage: attendancePercentage
    };
}

/**
 * Handle submit button click
 */
function handleSubmit() {
    // Prevent multiple submissions
    if (state.isSubmitted) {
        return;
    }

    // Validate attendance
    if (!validateAttendance()) {
        // Show error message
        elements.errorMessage.classList.remove('hidden');

        // Scroll to top to show error
        elements.attendanceView.scrollIntoView({ behavior: 'smooth' });
        return;
    }

    // Mark as submitted
    state.isSubmitted = true;

    // Disable submit button
    elements.submitBtn.disabled = true;

    // Calculate summary
    const summary = calculateSummary();

    // Show modal with summary
    showModal(summary);
}

/**
 * Display the modal with attendance summary
 * @param {Object} summary - Summary object
 */
function showModal(summary) {
    // Create summary HTML
    const summaryHTML = `
        <div class="summary-info">
            <div class="summary-item">
                <span class="summary-label">Batch:</span>
                <span class="summary-value">${summary.batchName}</span>
            </div>
            <div class="summary-item">
                <span class="summary-label">Total Students:</span>
                <span class="summary-value">${summary.totalStudents}</span>
            </div>
            <div class="summary-item">
                <span class="summary-label">Present:</span>
                <span class="summary-value" style="color: var(--success-color);">${summary.present}</span>
            </div>
            <div class="summary-item">
                <span class="summary-label">Absent:</span>
                <span class="summary-value" style="color: var(--danger-color);">${summary.absent}</span>
            </div>
            <div class="summary-item">
                <span class="summary-label">Attendance Rate:</span>
                <span class="summary-value">${summary.percentage}%</span>
            </div>
        </div>
    `;

    // Insert summary into modal
    elements.modalBody.innerHTML = summaryHTML;

    // Show modal
    elements.modalOverlay.classList.remove('hidden');

    // Prevent body scroll
    document.body.classList.add('modal-open');

    // Focus on OK button for accessibility
    setTimeout(() => {
        elements.modalOkBtn.focus();
    }, 100);
}

/**
 * Close the modal
 */
function closeModal() {
    // Hide modal
    elements.modalOverlay.classList.add('hidden');

    // Re-enable body scroll
    document.body.classList.remove('modal-open');

    // Reset to batch selection view
    resetToSelection();
}

/**
 * Reset view to batch selection screen
 */
function resetToSelection() {
    // Clear state
    state.currentBatch = null;
    state.attendanceData = {};
    state.isSubmitted = false;

    // Clear student list
    elements.studentList.innerHTML = '';

    // Hide error message
    elements.errorMessage.classList.add('hidden');

    // Show batch selection, hide attendance view
    elements.attendanceView.classList.add('hidden');
    elements.batchSelection.classList.remove('hidden');

    // Re-enable submit button
    elements.submitBtn.disabled = false;
}

// ==========================================
// INITIALIZATION
// ==========================================

// Log initialization (for debugging)
console.log('Attendance Management System initialized');
console.log('Available batches:', Object.keys(batchData));
