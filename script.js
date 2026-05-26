// Sample blog posts data


// DOM Elements
// const blogGrid = document.getElementById('blogGrid');
// const loadMoreBtn = document.getElementById('loadMoreBtn');
// const modal = document.getElementById('blogModal');
// const modalContent = document.getElementById('modalContent');
// const closeBtn = document.querySelector('.close');
// const navLinks = document.querySelectorAll('.nav-link');

// State
let currentPostIndex = 0;
const postsPerPage = 4;

// Initialize the website
document.addEventListener('DOMContentLoaded', function () {
  initializeWebsite();
});

function initializeWebsite() {
  // loadBlogPosts();
  setupEventListeners();
  setupSmoothScrolling();
  setupHeaderScroll();
}

function loadBlogPosts() {
  const postsToShow = blogPosts.slice(currentPostIndex, currentPostIndex + postsPerPage);

  postsToShow.forEach(post => {
    const postElement = createBlogCard(post);
    blogGrid.appendChild(postElement);
  });

  currentPostIndex += postsPerPage;

  // Hide load more button if all posts are shown
  if (currentPostIndex >= blogPosts.length) {
    loadMoreBtn.style.display = 'none';
  }
}

function createBlogCard(post) {
  const card = document.createElement('div');
  card.className = 'blog-card';
  card.innerHTML = `
        <h3>${post.title}</h3>
        <div class="date">${formatDate(post.date)}</div>
        <div class="excerpt">${post.excerpt}</div>
        <div class="tags">
            ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
    `;

  card.addEventListener('click', () => openBlogPost(post));
  return card;
}

function openBlogPost(post) {
  modalContent.innerHTML = post.content;
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';
}

function formatDate(dateString) {
  // Parse as local date to avoid timezone issues
  const [year, month, day] = dateString.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

function setupEventListeners() {
  // Load more button
  // loadMoreBtn.addEventListener('click', loadBlogPosts);

  // Modal close
  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Contact form
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', handleContactSubmit);
  }

  // Navigation
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      scrollToSection(targetId);
      updateActiveNavLink(link);
    });
  });
}

function closeModal() {
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';
}

function handleContactSubmit(e) {
  e.preventDefault();

  // Get form data
  const formData = new FormData(e.target);
  const name = formData.get('name');
  const email = formData.get('email');
  const message = formData.get('message');

  // Simple validation
  if (!name || !email || !message) {
    showNotification('Please fill in all fields.', 'error');
    return;
  }

  // Show sending notification
  showNotification('Sending message...', 'info');

  // Submit the form to Formspree
  fetch(e.target.action, {
    method: 'POST',
    body: formData,
    headers: {
      'Accept': 'application/json'
    }
  })
    .then(response => {
      if (response.ok) {
        showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
        e.target.reset();
      } else {
        showNotification('Failed to send message. Please try again.', 'error');
      }
    })
    .catch(error => {
      showNotification('Failed to send message. Please try again.', 'error');
    });
}

function showNotification(message, type = 'info') {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;

  // Style the notification
  notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#00ff41' : type === 'error' ? '#ff0080' : '#0080ff'};
        color: #000;
        padding: 1rem 2rem;
        border-radius: 5px;
        box-shadow: 0 0 20px rgba(0, 255, 65, 0.5);
        z-index: 3000;
        font-family: 'Share Tech Mono', monospace;
        font-weight: 600;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;

  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);

  // Remove after 5 seconds
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 5000);
}

function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    const headerHeight = document.querySelector('.header').offsetHeight;
    const targetPosition = section.offsetTop - headerHeight;

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  }
}

function updateActiveNavLink(activeLink) {
  navLinks.forEach(link => link.classList.remove('active'));
  activeLink.classList.add('active');
}

function setupSmoothScrolling() {
  // Update active nav link on scroll
  window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });
}

function setupHeaderScroll() {
  const header = document.querySelector('.header');
  let lastScrollTop = 0;

  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > 100) {
      // Scrolling down
      header.style.transform = 'translateY(-100%)';
    } else {
      // Scrolling up
      header.style.transform = 'translateY(0)';
    }

    lastScrollTop = scrollTop;
  });
}

// Matrix rain effect (optional enhancement)
function createMatrixRain() {
  const canvas = document.createElement('canvas');
  canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        opacity: 0.1;
    `;
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
  const matrixArray = matrix.split("");

  const fontSize = 10;
  const columns = canvas.width / fontSize;
  const drops = [];

  for (let x = 0; x < columns; x++) {
    drops[x] = 1;
  }

  function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#00ff41';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
      const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }

  setInterval(draw, 35);

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

// Uncomment the line below to enable matrix rain effect
createMatrixRain();

// Add some interactive elements
document.addEventListener('DOMContentLoaded', function () {
  // Add typing effect to hero subtitle
  const heroSubtitle = document.querySelector('.hero-subtitle');
  if (heroSubtitle) {
    const text = heroSubtitle.textContent;
    heroSubtitle.textContent = '';

    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        heroSubtitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      }
    };

    // Start typing effect after a short delay
    setTimeout(typeWriter, 1000);
  }

  // Add parallax effect to circuit board
  const circuitBoard = document.querySelector('.circuit-board');
  if (circuitBoard) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;
      circuitBoard.style.transform = `translateY(${rate}px)`;
    });
  }
}); 