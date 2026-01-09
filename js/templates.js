// Email Signature Templates
// All templates use inline styles and tables for maximum email client compatibility

// Helper: Get logo source (URL preferred for email, base64 fallback for preview)
function getLogoSrc(data) {
    return data.logoUrl || data.logoData || null;
}

/**
 * Template 1: Logo Left + Two Columns
 * Logo on left, name/title in middle, contact info on right
 */
function generateTemplate1(data) {
    const logoSize = data.logoSize || 80;
    const logoStyle = getLogoStyle(data.logoShape, logoSize);
    const accentColor = data.accentColor || '#0066cc';
    const socialIcons = generateSocialIconsHtml(data, 20);
    const legalFooter = data.showLegalFooter ? generateLegalFooter(data) : '';
    const disclaimer = data.showDisclaimer && data.disclaimer ? generateDisclaimer(data.disclaimer) : '';
    const logoSrc = getLogoSrc(data);

    return `
<table cellpadding="0" cellspacing="0" border="0" style="font-family: Arial, sans-serif; font-size: 14px; line-height: 1.4; color: #333333; max-width: 600px;">
    <tr>
        <td style="vertical-align: top; padding-right: 15px;">
            ${logoSrc ? `<img src="${logoSrc}" alt="Logo" width="${logoSize}" height="${logoSize}" style="${logoStyle}">` : ''}
            ${socialIcons ? `<div style="margin-top: 10px;">${socialIcons}</div>` : ''}
        </td>
        <td style="vertical-align: top; padding-right: 20px; border-right: 2px solid ${accentColor};">
            <table cellpadding="0" cellspacing="0" border="0">
                <tr>
                    <td style="font-size: 16px; font-weight: bold; color: ${accentColor}; padding-bottom: 2px;">
                        ${escapeHtml(data.nome || '')}
                    </td>
                </tr>
                ${data.ruolo ? `<tr><td style="font-size: 13px; color: #666666; padding-bottom: 2px;">${escapeHtml(data.ruolo)}</td></tr>` : ''}
                <tr>
                    <td style="font-size: 13px; font-weight: 600; color: #333333;">
                        ${escapeHtml(data.azienda || '')}
                    </td>
                </tr>
            </table>
        </td>
        <td style="vertical-align: top; padding-left: 20px;">
            <table cellpadding="0" cellspacing="0" border="0" style="font-size: 13px; color: #555555;">
                ${data.telefono ? `<tr><td style="padding-bottom: 3px;"><span style="color: ${accentColor};">T:</span> ${escapeHtml(data.telefono)}</td></tr>` : ''}
                ${data.cellulare ? `<tr><td style="padding-bottom: 3px;"><span style="color: ${accentColor};">M:</span> ${escapeHtml(data.cellulare)}</td></tr>` : ''}
                ${data.email ? `<tr><td style="padding-bottom: 3px;"><a href="mailto:${escapeHtml(data.email)}" style="color: ${accentColor}; text-decoration: none;">${escapeHtml(data.email)}</a></td></tr>` : ''}
                ${data.website ? `<tr><td style="padding-bottom: 3px;"><a href="${formatUrl(data.website)}" style="color: ${accentColor}; text-decoration: none;" target="_blank">${escapeHtml(data.website)}</a></td></tr>` : ''}
                ${data.indirizzo ? `<tr><td style="padding-bottom: 3px;">${escapeHtml(data.indirizzo)}</td></tr>` : ''}
            </table>
        </td>
    </tr>
    ${legalFooter ? `<tr><td colspan="3" style="padding-top: 15px;">${legalFooter}</td></tr>` : ''}
    ${disclaimer ? `<tr><td colspan="3" style="padding-top: 10px;">${disclaimer}</td></tr>` : ''}
</table>
    `.trim();
}

/**
 * Template 2: Logo Right
 * All text on left, logo on right side
 */
function generateTemplate2(data) {
    const logoSize = data.logoSize || 80;
    const logoStyle = getLogoStyle(data.logoShape, logoSize);
    const accentColor = data.accentColor || '#0066cc';
    const socialIcons = generateSocialIconsHtml(data, 20);
    const legalFooter = data.showLegalFooter ? generateLegalFooter(data) : '';
    const disclaimer = data.showDisclaimer && data.disclaimer ? generateDisclaimer(data.disclaimer) : '';
    const logoSrc = getLogoSrc(data);

    return `
<table cellpadding="0" cellspacing="0" border="0" style="font-family: Arial, sans-serif; font-size: 14px; line-height: 1.4; color: #333333; max-width: 600px;">
    <tr>
        <td style="vertical-align: top; padding-right: 20px;">
            <table cellpadding="0" cellspacing="0" border="0">
                <tr>
                    <td style="font-size: 18px; font-weight: bold; color: ${accentColor}; padding-bottom: 2px;">
                        ${escapeHtml(data.nome || '')}
                    </td>
                </tr>
                <tr>
                    <td style="font-size: 13px; color: #555555; padding-bottom: 10px;">
                        ${data.ruolo ? escapeHtml(data.ruolo) + ' / ' : ''}${escapeHtml(data.azienda || '')}
                    </td>
                </tr>
                <tr>
                    <td style="font-size: 13px; color: #555555;">
                        <table cellpadding="0" cellspacing="0" border="0">
                            ${data.telefono || data.cellulare ? `
                            <tr>
                                <td style="padding-bottom: 3px;">
                                    ${data.telefono ? `<span style="color: ${accentColor}; font-weight: 600;">P:</span> ${escapeHtml(data.telefono)}` : ''}
                                    ${data.telefono && data.cellulare ? '&nbsp;&nbsp;&nbsp;' : ''}
                                    ${data.cellulare ? `<span style="color: ${accentColor}; font-weight: 600;">M:</span> ${escapeHtml(data.cellulare)}` : ''}
                                </td>
                            </tr>` : ''}
                            ${data.email || data.website ? `
                            <tr>
                                <td style="padding-bottom: 3px;">
                                    ${data.email ? `<span style="color: ${accentColor}; font-weight: 600;">E:</span> <a href="mailto:${escapeHtml(data.email)}" style="color: #333333; text-decoration: none;">${escapeHtml(data.email)}</a>` : ''}
                                    ${data.email && data.website ? '&nbsp;&nbsp;&nbsp;' : ''}
                                    ${data.website ? `<span style="color: ${accentColor}; font-weight: 600;">W:</span> <a href="${formatUrl(data.website)}" style="color: #333333; text-decoration: none;" target="_blank">${escapeHtml(data.website)}</a>` : ''}
                                </td>
                            </tr>` : ''}
                            ${data.indirizzo ? `
                            <tr>
                                <td style="padding-bottom: 3px;">
                                    <span style="color: ${accentColor}; font-weight: 600;">A:</span> ${escapeHtml(data.indirizzo)}
                                </td>
                            </tr>` : ''}
                        </table>
                    </td>
                </tr>
                ${socialIcons ? `<tr><td style="padding-top: 10px;">${socialIcons}</td></tr>` : ''}
            </table>
        </td>
        <td style="vertical-align: top;">
            ${logoSrc ? `<img src="${logoSrc}" alt="Logo" width="${logoSize}" height="${logoSize}" style="${logoStyle}">` : ''}
        </td>
    </tr>
    ${legalFooter ? `<tr><td colspan="2" style="padding-top: 15px;">${legalFooter}</td></tr>` : ''}
    ${disclaimer ? `<tr><td colspan="2" style="padding-top: 10px;">${disclaimer}</td></tr>` : ''}
</table>
    `.trim();
}

/**
 * Template 3: Logo Left + Vertical Separator
 * Logo on left with separator line, all info on right
 */
function generateTemplate3(data) {
    const logoSize = data.logoSize || 80;
    const logoStyle = getLogoStyle(data.logoShape, logoSize);
    const accentColor = data.accentColor || '#0066cc';
    const socialIcons = generateSocialIconsHtml(data, 20);
    const legalFooter = data.showLegalFooter ? generateLegalFooter(data) : '';
    const disclaimer = data.showDisclaimer && data.disclaimer ? generateDisclaimer(data.disclaimer) : '';
    const logoSrc = getLogoSrc(data);

    return `
<table cellpadding="0" cellspacing="0" border="0" style="font-family: Arial, sans-serif; font-size: 14px; line-height: 1.4; color: #333333; max-width: 600px;">
    <tr>
        <td style="vertical-align: top; padding-right: 15px;">
            ${logoSrc ? `<img src="${logoSrc}" alt="Logo" width="${logoSize}" height="${logoSize}" style="${logoStyle}">` : ''}
        </td>
        <td style="vertical-align: top; border-left: 2px solid ${accentColor}; padding-left: 15px;">
            <table cellpadding="0" cellspacing="0" border="0">
                <tr>
                    <td style="font-size: 18px; font-weight: bold; color: ${accentColor}; padding-bottom: 2px;">
                        ${escapeHtml(data.nome || '')}
                    </td>
                </tr>
                <tr>
                    <td style="font-size: 13px; color: #555555; padding-bottom: 8px;">
                        ${data.ruolo ? escapeHtml(data.ruolo) + ' / ' : ''}${escapeHtml(data.azienda || '')}
                    </td>
                </tr>
                <tr>
                    <td style="font-size: 13px; color: #555555;">
                        <table cellpadding="0" cellspacing="0" border="0">
                            ${data.telefono || data.cellulare ? `
                            <tr>
                                <td style="padding-bottom: 3px;">
                                    ${data.telefono ? `<span style="color: ${accentColor}; font-weight: 600;">P:</span> ${escapeHtml(data.telefono)}` : ''}
                                    ${data.telefono && data.cellulare ? '&nbsp;&nbsp;&nbsp;' : ''}
                                    ${data.cellulare ? `<span style="color: ${accentColor}; font-weight: 600;">M:</span> ${escapeHtml(data.cellulare)}` : ''}
                                </td>
                            </tr>` : ''}
                            ${data.email || data.website ? `
                            <tr>
                                <td style="padding-bottom: 3px;">
                                    ${data.email ? `<span style="color: ${accentColor}; font-weight: 600;">E:</span> <a href="mailto:${escapeHtml(data.email)}" style="color: #333333; text-decoration: none;">${escapeHtml(data.email)}</a>` : ''}
                                    ${data.email && data.website ? '&nbsp;&nbsp;&nbsp;' : ''}
                                    ${data.website ? `<span style="color: ${accentColor}; font-weight: 600;">W:</span> <a href="${formatUrl(data.website)}" style="color: #333333; text-decoration: none;" target="_blank">${escapeHtml(data.website)}</a>` : ''}
                                </td>
                            </tr>` : ''}
                            ${data.indirizzo ? `
                            <tr>
                                <td style="padding-bottom: 3px;">
                                    <span style="color: ${accentColor}; font-weight: 600;">A:</span> ${escapeHtml(data.indirizzo)}
                                </td>
                            </tr>` : ''}
                        </table>
                    </td>
                </tr>
                ${socialIcons ? `<tr><td style="padding-top: 10px;">${socialIcons}</td></tr>` : ''}
            </table>
        </td>
    </tr>
    ${legalFooter ? `<tr><td colspan="2" style="padding-top: 15px;">${legalFooter}</td></tr>` : ''}
    ${disclaimer ? `<tr><td colspan="2" style="padding-top: 10px;">${disclaimer}</td></tr>` : ''}
</table>
    `.trim();
}

// Helper Functions

function getLogoStyle(shape, size) {
    const baseStyle = `display: block; max-width: ${size}px; max-height: ${size}px; width: auto; height: auto; object-fit: contain; border: 0;`;

    switch (shape) {
        case 'circle':
            return `display: block; width: ${size}px; height: ${size}px; object-fit: cover; border: 0; border-radius: 50%;`;
        case 'rounded':
            return baseStyle + ' border-radius: 8px;';
        default: // square
            return baseStyle + ' border-radius: 0;';
    }
}

function generateLegalFooter(data) {
    const parts = [];

    if (data.sedeLegale) {
        parts.push(`Sede Legale: ${escapeHtml(data.sedeLegale)}`);
    }
    if (data.piva) {
        parts.push(`P.IVA e C.F.: ${escapeHtml(data.piva)}`);
    }
    if (data.rea) {
        parts.push(`REA: ${escapeHtml(data.rea)}`);
    }

    let footer = '';
    if (parts.length > 0) {
        footer += `<div style="font-size: 11px; color: #888888; border-top: 1px solid #eeeeee; padding-top: 10px;">${parts.join(' | ')}</div>`;
    }
    if (data.capitale) {
        footer += `<div style="font-size: 11px; color: #888888;">Capitale Sociale: ${escapeHtml(data.capitale)}</div>`;
    }

    return footer;
}

function generateDisclaimer(text) {
    return `<div style="font-size: 10px; color: #999999; max-width: 500px; line-height: 1.3; margin-top: 5px;">${escapeHtml(text)}</div>`;
}

function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function formatUrl(url) {
    if (!url) return '';
    if (!/^https?:\/\//i.test(url)) {
        return 'https://' + url;
    }
    return url;
}

// Main function to generate signature based on template
function generateSignature(templateNum, data) {
    switch (templateNum) {
        case 1:
            return generateTemplate1(data);
        case 2:
            return generateTemplate2(data);
        case 3:
            return generateTemplate3(data);
        default:
            return generateTemplate1(data);
    }
}
