// Wait for DOM to load completely
document.addEventListener('DOMContentLoaded', function() {
    
    console.log('Split Wisely App Loaded! 🚀');
    
    // ===== MODAL ELEMENTS =====
    const modal = document.getElementById('expenseModal');
    const addExpenseBtn = document.querySelector('.add-expense-btn');
    const closeModalBtn = document.getElementById('closeModal');
    const cancelBtn = document.getElementById('cancelBtn');
    const expenseForm = document.getElementById('expenseForm');
    
    // ===== OPEN MODAL =====
    if (addExpenseBtn) {
        addExpenseBtn.addEventListener('click', function() {
            modal.classList.add('active');
            console.log('Modal opened');
            
            // Set today's date as default
            const today = new Date().toISOString().split('T')[0];
            document.getElementById('date').value = today;
        });
    }
    
    // ===== CLOSE MODAL FUNCTIONS =====
    function closeModal() {
        modal.classList.remove('active');
        expenseForm.reset();
        console.log('Modal closed');
    }
    
    // Close on X button
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }
    
    // Close on Cancel button
    if (cancelBtn) {
        cancelBtn.addEventListener('click', closeModal);
    }
    
    // Close when clicking outside modal
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Prevent modal from closing when clicking inside modal content
    const modalContent = document.querySelector('.modal-content');
    if (modalContent) {
        modalContent.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
    
    // ===== FORM SUBMISSION =====
    if (expenseForm) {
        expenseForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const description = document.getElementById('description').value;
            const amount = document.getElementById('amount').value;
            const paidBy = document.getElementById('paidBy').value;
            const splitWith = document.getElementById('splitWith').value;
            const date = document.getElementById('date').value;
            
            // Log the data (your teammate will send this to backend)
            console.log('New Expense Added:', {
                description: description,
                amount: '$' + amount,
                paidBy: paidBy,
                splitWith: splitWith,
                date: date
            });
            
            // Show success message
            alert(`Expense Added! 💰\n\nDescription: ${description}\nAmount: $${amount}\nPaid By: ${paidBy}\nSplit With: ${splitWith}\nDate: ${date}\n\n(Backend integration pending - your teammate will handle this)`);
            
            // Close modal and reset form
            closeModal();
        });
    }
    
    // ===== EXPENSE ITEMS CLICK FUNCTIONALITY =====
    const expenseItems = document.querySelectorAll('.expense-item');
    
    expenseItems.forEach(function(item) {
        item.addEventListener('click', function() {
            // Add a visual feedback when clicked
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);
            
            console.log('Expense clicked:', this.querySelector('h4').textContent);
        });
    });
    
    // ===== BALANCE CARDS ANIMATION ON LOAD =====
    const balanceCards = document.querySelectorAll('.balance-card');
    
    balanceCards.forEach(function(card, index) {
        // Add staggered animation delay
        setTimeout(function() {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'all 0.5s ease';
            
            setTimeout(function() {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 50);
        }, index * 100);
    });
    
    // ===== NAVIGATION LINKS =====
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Navigation clicked:', this.textContent);
            alert(`${this.textContent} page coming soon! 🚧`);
        });
    });
    
    // ===== KEYBOARD SHORTCUTS =====
    document.addEventListener('keydown', function(e) {
        // ESC key to close modal
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
    
});

// ===== UTILITY FUNCTIONS =====

// Function to format currency
function formatCurrency(amount) {
    return '$' + parseFloat(amount).toFixed(2);
}

// Function to calculate total balance
function calculateBalance(youOwe, youAreOwed) {
    return youAreOwed - youOwe;
}

// Example usage
console.log('Currency format example:', formatCurrency(245.50));
// ===== DARK MODE TOGGLE =====
    const themeToggle = document.getElementById('themeToggle');
    
    // Check if user had a preference saved
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        if (themeToggle) themeToggle.checked = true;
    }
    
    // Toggle dark mode on checkbox change
    if (themeToggle) {
        themeToggle.addEventListener('change', function() {
            if (this.checked) {
                // Enable dark mode
                document.body.classList.add('dark-mode');
                localStorage.setItem('theme', 'dark');
                console.log('Dark mode enabled 🌙');
            } else {
                // Disable dark mode (back to light)
                document.body.classList.remove('dark-mode');
                localStorage.removeItem('theme'); // Clear saved preference
                console.log('Light mode enabled ☀️');
            }
        });
    }
    
    // ===== TOTAL BALANCE COLOR LOGIC =====
    function updateBalanceColor() {
        const totalBalanceCard = document.querySelector('.balance-card.total .amount');
        if (totalBalanceCard) {
            const balanceText = totalBalanceCard.textContent;
            const balanceValue = parseFloat(balanceText.replace('$', '').replace(',', ''));
            
            // Remove existing color classes
            totalBalanceCard.classList.remove('balance-negative', 'balance-positive', 'balance-zero');
            
            if (balanceValue < 0) {
                // Negative: Red
                totalBalanceCard.classList.add('balance-negative');
            } else if (balanceValue > 0) {
                // Positive: Green
                totalBalanceCard.classList.add('balance-positive');
            } else {
                // Zero: White/Gray
                totalBalanceCard.classList.add('balance-zero');
            }
        }
    }
    
    // Run on page load
    updateBalanceColor();