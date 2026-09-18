import hljs from 'highlight.js/lib/core';
import powershell from 'highlight.js/lib/languages/powershell';
import dos from 'highlight.js/lib/languages/dos';
import markdown from 'highlight.js/lib/languages/markdown';
import bash from 'highlight.js/lib/languages/bash';
import ini from 'highlight.js/lib/languages/ini';

// Register specific languages for high performance
hljs.registerLanguage('powershell', powershell);
hljs.registerLanguage('ps1', powershell);
hljs.registerLanguage('dos', dos);
hljs.registerLanguage('bat', dos);
hljs.registerLanguage('batch', dos);
hljs.registerLanguage('cmd', dos);
hljs.registerLanguage('markdown', markdown);
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('ini', ini);

export interface HighlightedLine {
  lineNumber: number;
  html: string;
  rawText: string;
}

/**
 * Highlights a block of code and splits it into discrete lines preserving HTML syntax spans.
 */
export function highlightCodeLines(code: string, language: string): HighlightedLine[] {
  const normalizedCode = code.replace(/\r\n/g, '\n');
  const targetLang = language === 'bat' || language === 'batch' ? 'dos' : language;

  let highlightedHtml: string;
  try {
    if (targetLang && hljs.getLanguage(targetLang)) {
      highlightedHtml = hljs.highlight(normalizedCode, {
        language: targetLang,
        ignoreIllegals: true,
      }).value;
    } else {
      highlightedHtml = hljs.highlightAuto(normalizedCode).value;
    }
  } catch {
    highlightedHtml = escapeHtml(normalizedCode);
  }

  // Split safely preserving open/close tags across newlines
  return splitHighlightedHtmlIntoLines(highlightedHtml, normalizedCode);
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Splits highlighted HTML string by newlines while correctly tracking open tags
 * across line boundaries so each line can be rendered as an independent table row / div.
 */
function splitHighlightedHtmlIntoLines(html: string, rawCode: string): HighlightedLine[] {
  const rawLines = rawCode.split('\n');
  const result: HighlightedLine[] = [];
  
  // A robust token-stream approach to split HTML with open tags
  const openTags: string[] = [];
  const linesHtml: string[] = [];
  let currentLine = '';
  let i = 0;

  while (i < html.length) {
    if (html[i] === '\n') {
      // Close open tags for current line
      let closedLine = currentLine;
      for (let t = openTags.length - 1; t >= 0; t--) {
        closedLine += '</span>';
      }
      linesHtml.push(closedLine);

      // Reopen tags for next line
      currentLine = '';
      for (let t = 0; t < openTags.length; t++) {
        currentLine += openTags[t];
      }
      i++;
      continue;
    }

    if (html.slice(i, i + 2) === '<span') {
      const tagEnd = html.indexOf('>', i);
      if (tagEnd !== -1) {
        const fullTag = html.slice(i, tagEnd + 1);
        openTags.push(fullTag);
        currentLine += fullTag;
        i = tagEnd + 1;
        continue;
      }
    } else if (html.slice(i, i + 7) === '</span>') {
      openTags.pop();
      currentLine += '</span>';
      i += 7;
      continue;
    }

    currentLine += html[i];
    i++;
  }

  // Append any final remaining line
  let closedLine = currentLine;
  for (let t = openTags.length - 1; t >= 0; t--) {
    closedLine += '</span>';
  }
  linesHtml.push(closedLine);

  for (let idx = 0; idx < rawLines.length; idx++) {
    result.push({
      lineNumber: idx + 1,
      html: linesHtml[idx] ?? '',
      rawText: rawLines[idx] ?? '',
    });
  }

  return result;
}
