// Social Media Icons as Base64 Data URIs
// These are optimized SVG icons encoded for use in email signatures

const SOCIAL_ICONS = {
    linkedin: {
        // LinkedIn blue icon
        colored: `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cmVjdCB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHJ4PSI0IiBmaWxsPSIjMDA3N0I1Ii8+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTcuNSAxOC41di05aDNodjloLTN6bTEuNS0xMC4yNWMtLjk3IDAtMS43NS0uNzgtMS43NS0xLjc1czAuNzgtMS43NSAxLjc1LTEuNzUgMS43NS43OCAxLjc1IDEuNzUtLjc4IDEuNzUtMS43NSAxLjc1em0xMC41IDEwLjI1aC0zdi00LjVjMC0xLjUtLjc1LTIuMjUtMS44NzUtMi4yNXMtMi4xMjUuNzUtMi4xMjUgMi4yNXY0LjVoLTN2LTloM3YxLjI3NWMuNS0uNzc1IDEuNS0xLjUyNSAzLTEuNTI1IDIuMjUgMCAzLjc1IDEuNSAzLjc1IDQuMjV2NXoiLz48L3N2Zz4=`,
        // White icon for dark backgrounds
        white: `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cmVjdCB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHJ4PSI0IiBmaWxsPSIjZmZmIi8+PHBhdGggZmlsbD0iIzAwNzdCNSIgZD0iTTcuNSAxOC41di05aDNodjloLTN6bTEuNS0xMC4yNWMtLjk3IDAtMS43NS0uNzgtMS43NS0xLjc1czAuNzgtMS43NSAxLjc1LTEuNzUgMS43NS43OCAxLjc1IDEuNzUtLjc4IDEuNzUtMS43NSAxLjc1em0xMC41IDEwLjI1aC0zdi00LjVjMC0xLjUtLjc1LTIuMjUtMS44NzUtMi4yNXMtMi4xMjUuNzUtMi4xMjUgMi4yNXY0LjVoLTN2LTloM3YxLjI3NWMuNS0uNzc1IDEuNS0xLjUyNSAzLTEuNTI1IDIuMjUgMCAzLjc1IDEuNSAzLjc1IDQuMjV2NXoiLz48L3N2Zz4=`
    },
    twitter: {
        // X (Twitter) black icon
        colored: `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cmVjdCB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHJ4PSI0IiBmaWxsPSIjMDAwIi8+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTEzLjggMTAuNDdMMTguNjcgNWgtMS4xNWwtNC4yMiA0Ljc1TDkuNzUgNUg1Ljg4bDUuMSA3LjE4TDUuODggMThINy4wM2w0LjQ1LTUuMDFMMTUuMTMgMThoMy44N2wtNS4yLTcuNTN6bS0xLjU3IDEuNzdMOS45NyA5Ljc4bC0yLjE4LTMuMDJoMS41bDIuMDggMi44OGwuNDcuNjVsMy45MyA1LjQzaC0xLjVsLTIuMDQtMi44eiIvPjwvc3ZnPg==`,
        // White icon
        white: `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cmVjdCB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHJ4PSI0IiBmaWxsPSIjZmZmIi8+PHBhdGggZmlsbD0iIzAwMCIgZD0iTTEzLjggMTAuNDdMMTguNjcgNWgtMS4xNWwtNC4yMiA0Ljc1TDkuNzUgNUg1Ljg4bDUuMSA3LjE4TDUuODggMThINy4wM2w0LjQ1LTUuMDFMMTUuMTMgMThoMy44N2wtNS4yLTcuNTN6bS0xLjU3IDEuNzdMOS45NyA5Ljc4bC0yLjE4LTMuMDJoMS41bDIuMDggMi44OGwuNDcuNjVsMy45MyA1LjQzaC0xLjVsLTIuMDQtMi44eiIvPjwvc3ZnPg==`
    },
    instagram: {
        // Instagram gradient icon
        colored: `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9Imluc3RhR3JhZCIgeDE9IjAlIiB5MT0iMTAwJSIgeDI9IjEwMCUiIHkyPSIwJSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iI0ZFREExMSIvPjxzdG9wIG9mZnNldD0iNTAlIiBzdG9wLWNvbG9yPSIjRkQ1MDhFIi8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjOEE0RkZGIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiByeD0iNiIgZmlsbD0idXJsKCNpbnN0YUdyYWQpIi8+PHJlY3QgeD0iNS41IiB5PSI1LjUiIHdpZHRoPSIxMyIgaGVpZ2h0PSIxMyIgcng9IjMiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIxLjUiLz48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIzIiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMS41Ii8+PGNpcmNsZSBjeD0iMTYuNSIgY3k9IjcuNSIgcj0iMS4yNSIgZmlsbD0iI2ZmZiIvPjwvc3ZnPg==`,
        // White icon
        white: `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cmVjdCB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHJ4PSI2IiBmaWxsPSIjZmZmIi8+PHJlY3QgeD0iNS41IiB5PSI1LjUiIHdpZHRoPSIxMyIgaGVpZ2h0PSIxMyIgcng9IjMiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0U0NDA1RiIgc3Ryb2tlLXdpZHRoPSIxLjUiLz48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIzIiBmaWxsPSJub25lIiBzdHJva2U9IiNFNDQwNUYiIHN0cm9rZS13aWR0aD0iMS41Ii8+PGNpcmNsZSBjeD0iMTYuNSIgY3k9IjcuNSIgcj0iMS4yNSIgZmlsbD0iI0U0NDA1RiIvPjwvc3ZnPg==`
    },
    facebook: {
        // Facebook blue icon
        colored: `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cmVjdCB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHJ4PSI0IiBmaWxsPSIjMTg3N0YyIi8+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTE1Ljg5IDEzLjc1bC4zNy0yLjVoLTIuMzl2LTEuNjJjMC0uNjguMzMtMS4zNSAxLjM5LTEuMzVoMS4wOFY2LjE4cy0uOTgtLjE3LTEuOTItLjE3Yy0xLjk2IDAtMy4yNCAxLjItMy4yNCAzLjM2djEuODhoLTIuMTh2Mi41aDIuMTh2Ni4wM2gyLjY5di02LjAzaDIuMDJ6Ii8+PC9zdmc+`,
        // White icon
        white: `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cmVjdCB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHJ4PSI0IiBmaWxsPSIjZmZmIi8+PHBhdGggZmlsbD0iIzE4NzdGMiIgZD0iTTE1Ljg5IDEzLjc1bC4zNy0yLjVoLTIuMzl2LTEuNjJjMC0uNjguMzMtMS4zNSAxLjM5LTEuMzVoMS4wOFY2LjE4cy0uOTgtLjE3LTEuOTItLjE3Yy0xLjk2IDAtMy4yNCAxLjItMy4yNCAzLjM2djEuODhoLTIuMTh2Mi41aDIuMTh2Ni4wM2gyLjY5di02LjAzaDIuMDJ6Ii8+PC9zdmc+`
    }
};

// Function to get icon HTML for email signatures
function getSocialIconHtml(platform, url, size = 24) {
    if (!url || !SOCIAL_ICONS[platform]) return '';

    const icon = SOCIAL_ICONS[platform].colored;

    return `<a href="${url}" target="_blank" style="text-decoration: none; margin-right: 8px;">
        <img src="${icon}" alt="${platform}" width="${size}" height="${size}" style="display: inline-block; vertical-align: middle; border: 0;">
    </a>`;
}

// Generate all social icons HTML
function generateSocialIconsHtml(data, size = 24) {
    let html = '';

    if (data.linkedin) {
        html += getSocialIconHtml('linkedin', data.linkedin, size);
    }
    if (data.twitter) {
        html += getSocialIconHtml('twitter', data.twitter, size);
    }
    if (data.instagram) {
        html += getSocialIconHtml('instagram', data.instagram, size);
    }
    if (data.facebook) {
        html += getSocialIconHtml('facebook', data.facebook, size);
    }

    return html;
}
