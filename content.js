function toggleOverlay() {
  let overlay = document.getElementById('chatgpt-question-overlay');
  if (overlay) {
    overlay.remove();
    return;
  }

  overlay = document.createElement('div');
  overlay.id = 'chatgpt-question-overlay';
  overlay.style.cssText = [
    "position: fixed",
    "top: 10%",
    "left: 50%",
    "transform: translateX(-50%)",
    "height: 500px",
    "width: 900px",
    "background: #2c2c2e",
    "color: white",
    "border-radius: 12px",
    "padding: 24px",
    "z-index: 9999",
    "overflow-y: auto",
    "box-shadow: 0 0 20px rgba(0,0,0,0.6)",
    "font-family: sans-serif",
    "font-size: 14px"
  ].join("; ");

  const title = document.createElement('h3');
  title.textContent = "Conversation Questions";
  title.style.cssText = "margin-bottom: 16px; font-size: 18px; color: white; margin-top: 0;";
  overlay.appendChild(title);

  // Better selectors for ChatGPT's current structure
  const messageSelectors = [
    '[data-message-author-role="user"]',
    '[data-testid^="conversation-turn-"]',
    '.group.w-full',
    '[class*="group"][class*="w-full"]'
  ];

  let entries = [];

  // Try multiple selector strategies
  for (const selector of messageSelectors) {
    entries = [...document.querySelectorAll(selector)];
    if (entries.length > 0) break;
  }

  // Fallback: look for common patterns in ChatGPT messages
  if (entries.length === 0) {
    entries = [...document.querySelectorAll('main div')].filter(el => {
      const text = el.innerText?.trim();
      return text && text.length > 20 && text.length < 2000 &&
        !el.querySelector('button') &&
        !el.classList.contains('overflow-hidden');
    });
  }

  const seen = new Set();
  let questionCount = 0;

  entries.forEach((el) => {
    let messageText = '';
    let isUserMessage = false;

    // Try to determine if this is a user message and extract text
    if (el.hasAttribute('data-message-author-role')) {
      isUserMessage = el.getAttribute('data-message-author-role') === 'user';
      messageText = el.innerText?.trim() || '';
    } else {
      // Look for user indicators in the structure
      const possibleUserIndicators = [
        el.querySelector('[data-message-author-role="user"]'),
        el.closest('[data-message-author-role="user"]'),
        el.querySelector('.font-semibold')?.textContent?.includes('You'),
        el.previousElementSibling?.textContent?.includes('You')
      ];

      isUserMessage = possibleUserIndicators.some(indicator => indicator);
      messageText = el.innerText?.trim() || '';
    }

    // Skip if we've seen this element, no text, or it's too short/long
    if (!messageText || seen.has(el) || messageText.length < 10 || messageText.length > 1000) {
      return;
    }

    seen.add(el);

    // For user messages, we want to show them as questions
    if (isUserMessage || messageText.endsWith('?') || messageText.includes('How ') || messageText.includes('What ') || messageText.includes('Why ')) {
      questionCount++;

      const btn = document.createElement('button');
      const displayText = messageText.slice(0, 120) + (messageText.length > 120 ? '...' : '');
      btn.textContent = displayText;

      btn.onclick = () => {
        // Find the best scrolling target
        let scrollTarget = el;

        // Try to find a better parent container for scrolling
        const betterTarget = el.closest('[data-testid^="conversation-turn-"]') ||
          el.closest('.group.w-full') ||
          el.closest('[class*="group"][class*="w-full"]');

        if (betterTarget) {
          scrollTarget = betterTarget;
        }

        scrollTarget.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest'
        });

        // Highlight the target briefly
        scrollTarget.style.transition = 'background-color 0.3s ease';
        const originalBg = scrollTarget.style.backgroundColor;
        scrollTarget.style.backgroundColor = 'rgba(59, 130, 246, 0.1)';
        setTimeout(() => {
          scrollTarget.style.backgroundColor = originalBg;
        }, 1000);

        // Close overlay after clicking
        overlay.remove();
      };

      btn.style.cssText = [
        "display: block",
        "margin-bottom: 8px",
        "width: 100%",
        "text-align: left",
        "cursor: pointer",
        "border: none",
        "padding: 12px 16px",
        "border-radius: 8px",
        "background: #3a3a3c",
        "color: white",
        "font-weight: 500",
        "transition: background-color 0.2s ease",
        "line-height: 1.4"
      ].join("; ");

      // Add hover effect
      btn.onmouseenter = () => btn.style.backgroundColor = '#4a4a4c';
      btn.onmouseleave = () => btn.style.backgroundColor = '#3a3a3c';

      overlay.appendChild(btn);
    }
  });

  // Show message if no questions found
  if (questionCount === 0) {
    const empty = document.createElement('p');
    empty.textContent = "No questions found in this conversation. Try scrolling down to load more messages first.";
    empty.style.cssText = "color: #888; font-style: italic; text-align: center; margin-top: 40px;";
    overlay.appendChild(empty);
  }

  // Add close button
  const closeBtn = document.createElement('button');
  closeBtn.textContent = '×';
  closeBtn.style.cssText = [
    "position: absolute",
    "top: 12px",
    "right: 16px",
    "background: none",
    "border: none",
    "color: #888",
    "font-size: 24px",
    "cursor: pointer",
    "padding: 0",
    "width: 30px",
    "height: 30px",
    "display: flex",
    "align-items: center",
    "justify-content: center"
  ].join("; ");

  closeBtn.onclick = () => overlay.remove();
  closeBtn.onmouseenter = () => closeBtn.style.color = 'white';
  closeBtn.onmouseleave = () => closeBtn.style.color = '#888';

  overlay.appendChild(closeBtn);

  // Close overlay when clicking outside
  overlay.onclick = (e) => {
    if (e.target === overlay) {
      overlay.remove();
    }
  };

  document.body.appendChild(overlay);
}

// Add keyboard shortcut (Alt+Q)
document.addEventListener('keydown', (e) => {
  if (e.altKey && e.key === 'q') {
    e.preventDefault();
    toggleOverlay();
  }
});

toggleOverlay();