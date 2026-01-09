// Email Signature Generator - Main Application

document.addEventListener('DOMContentLoaded', function() {
    // State
    let currentTemplate = 1;
    let logoData = null;

    // DOM Elements
    const form = document.getElementById('signatureForm');
    const preview = document.getElementById('signaturePreview');
    const templateBtns = document.querySelectorAll('.template-btn');
    const themeToggle = document.getElementById('themeToggle');
    const logoInput = document.getElementById('logo');
    const logoPreview = document.getElementById('logoPreview');
    const removeLogo = document.getElementById('removeLogo');
    const accentColor = document.getElementById('accentColor');
    const accentColorText = document.getElementById('accentColorText');

    // Initialize
    init();

    function init() {
        // Load saved theme
        loadTheme();

        // Load saved form data
        loadFormData();

        // Set up event listeners
        setupFormListeners();
        setupTemplateSelector();
        setupThemeToggle();
        setupLogoUpload();
        setupColorPicker();
        setupExportButtons();
        setupCollapsibleGroups();

        // Initial render
        updatePreview();
    }

    // Save/Load Form Data
    function saveFormData() {
        const data = {
            nome: form.nome.value,
            ruolo: form.ruolo.value,
            azienda: form.azienda.value,
            telefono: form.telefono.value,
            cellulare: form.cellulare.value,
            email: form.email.value,
            website: form.website.value,
            indirizzo: form.indirizzo.value,
            sedeLegale: form.sedeLegale.value,
            piva: form.piva.value,
            rea: form.rea.value,
            capitale: form.capitale.value,
            showLegalFooter: form.showLegalFooter.checked,
            linkedin: form.linkedin.value,
            twitter: form.twitter.value,
            instagram: form.instagram.value,
            facebook: form.facebook.value,
            logoShape: form.logoShape.value,
            logoSize: form.logoSize.value,
            accentColor: form.accentColor.value,
            disclaimer: form.disclaimer.value,
            showDisclaimer: form.showDisclaimer.checked,
            logoData: logoData,
            logoUrl: form.logoUrl.value,
            currentTemplate: currentTemplate
        };
        localStorage.setItem('signatureFormData', JSON.stringify(data));
    }

    function loadFormData() {
        const saved = localStorage.getItem('signatureFormData');
        if (!saved) return;

        try {
            const data = JSON.parse(saved);

            // Restore text fields
            if (data.nome) form.nome.value = data.nome;
            if (data.ruolo) form.ruolo.value = data.ruolo;
            if (data.azienda) form.azienda.value = data.azienda;
            if (data.telefono) form.telefono.value = data.telefono;
            if (data.cellulare) form.cellulare.value = data.cellulare;
            if (data.email) form.email.value = data.email;
            if (data.website) form.website.value = data.website;
            if (data.indirizzo) form.indirizzo.value = data.indirizzo;
            if (data.sedeLegale) form.sedeLegale.value = data.sedeLegale;
            if (data.piva) form.piva.value = data.piva;
            if (data.rea) form.rea.value = data.rea;
            if (data.capitale) form.capitale.value = data.capitale;
            if (data.linkedin) form.linkedin.value = data.linkedin;
            if (data.twitter) form.twitter.value = data.twitter;
            if (data.instagram) form.instagram.value = data.instagram;
            if (data.facebook) form.facebook.value = data.facebook;
            if (data.disclaimer) form.disclaimer.value = data.disclaimer;
            if (data.logoUrl) form.logoUrl.value = data.logoUrl;

            // Restore checkboxes
            form.showLegalFooter.checked = data.showLegalFooter !== false;
            form.showDisclaimer.checked = data.showDisclaimer === true;

            // Restore selects
            if (data.logoShape) form.logoShape.value = data.logoShape;
            if (data.logoSize) form.logoSize.value = data.logoSize;
            if (data.accentColor) {
                form.accentColor.value = data.accentColor;
                accentColorText.value = data.accentColor;
            }

            // Restore logo
            if (data.logoData) {
                logoData = data.logoData;
                logoPreview.innerHTML = `<img src="${logoData}" alt="Logo preview">`;
                logoPreview.classList.add('has-image');
                removeLogo.classList.remove('hidden');
            }

            // Restore template
            if (data.currentTemplate) {
                currentTemplate = data.currentTemplate;
                templateBtns.forEach(btn => {
                    btn.classList.toggle('active', parseInt(btn.dataset.template) === currentTemplate);
                });
            }
        } catch (e) {
            console.warn('Could not load saved form data:', e);
        }
    }

    // Form Data Collection
    function getFormData() {
        return {
            nome: form.nome.value,
            ruolo: form.ruolo.value,
            azienda: form.azienda.value,
            telefono: form.telefono.value,
            cellulare: form.cellulare.value,
            email: form.email.value,
            website: form.website.value,
            indirizzo: form.indirizzo.value,
            sedeLegale: form.sedeLegale.value,
            piva: form.piva.value,
            rea: form.rea.value,
            capitale: form.capitale.value,
            showLegalFooter: form.showLegalFooter.checked,
            linkedin: form.linkedin.value,
            twitter: form.twitter.value,
            instagram: form.instagram.value,
            facebook: form.facebook.value,
            logoData: logoData,
            logoUrl: form.logoUrl.value,
            logoShape: form.logoShape.value,
            logoSize: parseInt(form.logoSize.value),
            accentColor: form.accentColor.value,
            disclaimer: form.disclaimer.value,
            showDisclaimer: form.showDisclaimer.checked
        };
    }

    // Preview Update
    function updatePreview() {
        const data = getFormData();
        const html = generateSignature(currentTemplate, data);
        preview.innerHTML = html;
    }

    // Form Listeners
    function setupFormListeners() {
        // Listen to all form inputs
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                updatePreview();
                saveFormData();
            });
            input.addEventListener('change', () => {
                updatePreview();
                saveFormData();
            });
        });
    }

    // Template Selector
    function setupTemplateSelector() {
        templateBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Update active state
                templateBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');

                // Update current template
                currentTemplate = parseInt(this.dataset.template);
                updatePreview();
                saveFormData();
            });
        });
    }

    // Theme Toggle
    function setupThemeToggle() {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark');
            saveTheme();
        });
    }

    function loadTheme() {
        const savedTheme = localStorage.getItem('signatureTheme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark');
        }
    }

    function saveTheme() {
        const isDark = document.body.classList.contains('dark');
        localStorage.setItem('signatureTheme', isDark ? 'dark' : 'light');
    }

    // Logo Upload
    function setupLogoUpload() {
        // Click to upload
        logoPreview.addEventListener('click', function() {
            logoInput.click();
        });

        // Drag and drop
        logoPreview.addEventListener('dragover', function(e) {
            e.preventDefault();
            this.style.borderColor = 'var(--primary)';
        });

        logoPreview.addEventListener('dragleave', function(e) {
            e.preventDefault();
            this.style.borderColor = '';
        });

        logoPreview.addEventListener('drop', function(e) {
            e.preventDefault();
            this.style.borderColor = '';
            const file = e.dataTransfer.files[0];
            if (file && file.type.startsWith('image/')) {
                handleLogoFile(file);
            }
        });

        // File input change
        logoInput.addEventListener('change', function() {
            if (this.files && this.files[0]) {
                handleLogoFile(this.files[0]);
            }
        });

        // Remove logo
        removeLogo.addEventListener('click', function() {
            logoData = null;
            logoInput.value = '';
            logoPreview.innerHTML = `
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                    <polyline points="21 15 16 10 5 21"></polyline>
                </svg>
                <span>Clicca o trascina</span>
            `;
            logoPreview.classList.remove('has-image');
            this.classList.add('hidden');
            updatePreview();
            saveFormData();
        });
    }

    function handleLogoFile(file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            logoData = e.target.result;
            logoPreview.innerHTML = `<img src="${logoData}" alt="Logo preview">`;
            logoPreview.classList.add('has-image');
            removeLogo.classList.remove('hidden');
            updatePreview();
            saveFormData();
        };
        reader.readAsDataURL(file);
    }

    // Color Picker
    function setupColorPicker() {
        // Sync color picker with text input
        accentColor.addEventListener('input', function() {
            accentColorText.value = this.value;
            updatePreview();
        });

        accentColorText.addEventListener('input', function() {
            const value = this.value;
            if (/^#[0-9A-Fa-f]{6}$/.test(value)) {
                accentColor.value = value;
                updatePreview();
            }
        });

        accentColorText.addEventListener('blur', function() {
            // Validate and fix on blur
            let value = this.value;
            if (!value.startsWith('#')) {
                value = '#' + value;
            }
            if (/^#[0-9A-Fa-f]{6}$/.test(value)) {
                this.value = value;
                accentColor.value = value;
                updatePreview();
            } else {
                this.value = accentColor.value;
            }
        });
    }

    // Export Buttons
    function setupExportButtons() {
        // Copy HTML
        document.getElementById('copyHtml').addEventListener('click', async function() {
            const data = getFormData();
            const html = generateSignature(currentTemplate, data);

            const success = await copyHtmlToClipboard(html);
            if (success) {
                showToast('Codice HTML copiato!', 'success');
            } else {
                showToast('Errore durante la copia', 'error');
            }
        });

        // Copy Rich Text
        document.getElementById('copyRichText').addEventListener('click', async function() {
            const data = getFormData();
            const html = generateSignature(currentTemplate, data);

            const success = await copyRichTextToClipboard(html);
            if (success) {
                showToast('Firma copiata! Incolla nel tuo client email.', 'success');
            } else {
                showToast('Errore durante la copia', 'error');
            }
        });

        // Download HTML
        document.getElementById('downloadHtml').addEventListener('click', function() {
            const data = getFormData();
            const html = generateSignature(currentTemplate, data);
            const filename = `firma-${data.nome.replace(/\s+/g, '-').toLowerCase() || 'email'}.html`;

            downloadHtmlFile(html, filename);
            showToast('File scaricato!', 'success');
        });
    }

    // Collapsible Groups
    function setupCollapsibleGroups() {
        const headers = document.querySelectorAll('.group-header');

        headers.forEach(header => {
            header.addEventListener('click', function() {
                const group = this.closest('.form-group');
                group.classList.toggle('open');
            });
        });
    }
});
