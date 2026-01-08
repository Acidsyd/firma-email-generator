// Export Functions for Email Signature Generator

/**
 * Copy HTML code to clipboard
 * @param {string} html - The HTML signature code
 * @returns {Promise<boolean>} - Success status
 */
async function copyHtmlToClipboard(html) {
    try {
        await navigator.clipboard.writeText(html);
        return true;
    } catch (err) {
        // Fallback for older browsers
        return fallbackCopyText(html);
    }
}

/**
 * Copy rich text (formatted signature) to clipboard
 * This allows pasting the formatted signature directly into email clients
 * @param {string} html - The HTML signature code
 * @returns {Promise<boolean>} - Success status
 */
async function copyRichTextToClipboard(html) {
    try {
        // Create a blob with HTML content
        const blob = new Blob([html], { type: 'text/html' });
        const plainBlob = new Blob([stripHtml(html)], { type: 'text/plain' });

        // Use Clipboard API with ClipboardItem
        const clipboardItem = new ClipboardItem({
            'text/html': blob,
            'text/plain': plainBlob
        });

        await navigator.clipboard.write([clipboardItem]);
        return true;
    } catch (err) {
        console.warn('Clipboard API failed, trying fallback:', err);
        // Fallback: copy using execCommand
        return fallbackCopyRichText(html);
    }
}

/**
 * Download signature as HTML file
 * @param {string} html - The HTML signature code
 * @param {string} filename - The filename for download
 */
function downloadHtmlFile(html, filename = 'firma-email.html') {
    // Create a complete HTML document
    const fullHtml = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Email Signature</title>
</head>
<body>
${html}
</body>
</html>`;

    const blob = new Blob([fullHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
}

// Fallback Functions

/**
 * Fallback for copying plain text
 */
function fallbackCopyText(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    textarea.style.top = '-9999px';
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();

    try {
        const successful = document.execCommand('copy');
        document.body.removeChild(textarea);
        return successful;
    } catch (err) {
        document.body.removeChild(textarea);
        return false;
    }
}

/**
 * Fallback for copying rich text using execCommand
 */
function fallbackCopyRichText(html) {
    // Create a temporary container
    const container = document.createElement('div');
    container.innerHTML = html;
    container.style.position = 'fixed';
    container.style.left = '-9999px';
    container.style.top = '-9999px';
    document.body.appendChild(container);

    // Select the content
    const range = document.createRange();
    range.selectNodeContents(container);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);

    try {
        const successful = document.execCommand('copy');
        selection.removeAllRanges();
        document.body.removeChild(container);
        return successful;
    } catch (err) {
        selection.removeAllRanges();
        document.body.removeChild(container);
        return false;
    }
}

/**
 * Strip HTML tags to get plain text
 */
function stripHtml(html) {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
}

// Toast Notification Helper
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    if (!toast) return;

    toast.textContent = message;
    toast.className = `toast ${type}`;

    // Show toast
    setTimeout(() => toast.classList.remove('hidden'), 10);

    // Hide after 3 seconds
    setTimeout(() => {
        toast.classList.add('hidden');
    }, 3000);
}
