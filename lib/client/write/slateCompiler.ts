import hljs from 'highlight.js';
import escapeHtml from 'escape-html';
import { Descendant, Text } from 'slate';
import { CodeBlockElement, CustomElement, CustomText } from '@/types/slate_custom_types';

class SlateCompiler {
  highlightCodeBlock(codeBlock: CodeBlockElement) {
    const code = codeBlock.children.map((paragraph) => paragraph.children[0].text).join('\n');
    const language = codeBlock.language;
    return `<div><pre className='relative pt-30'><code spellCheck='false' translate='no'>${hljs
      .highlight(code, { language })
      .value.replace(/" "/g, '&nbsp; ')}</code></pre></div>`;
  }
  toHtml(node: Descendant[]) {
    return node.map((n) => this.toHtmlChild(n)).join('');
  }

  toHtmlChild(node: CustomElement | CustomText) {
    if (Text.isText(node)) {
      let string = escapeHtml(node.text);
      if (node.bold) {
        string = `<strong>${string}</strong>`;
      }
      if (node.italic) {
        string = `<em>${string}</em>`;
      }
      if (node.underline) {
        string = `<u>${string}</u>`;
      }
      if (node.strikethrough) {
        string = `<del>${string}</del>`;
      }
      if (node.code) {
        string = `<code>${string}</code>`;
      }
      return string;
    }

    const children = node.children.map((n) => this.toHtmlChild(n)).join('') as string;

    switch (node.type) {
      case 'paragraph':
        return `<p>${children}</p>`;
      case 'heading-one':
        return `<h1>${children}</h1>`;
      case 'heading-two':
        return `<h2>${children}</h2>`;
      case 'heading-three':
        return `<h3>${children}</h3>`;
      case 'list-item':
        return `<li>${children}</li>`;
      case 'numbered-list':
        return `<ol>${children}</ol>`;
      case 'block-quote':
        return `<blockquote><p>${children}</p></blockquote>`;
      case 'bulleted-list':
        return `<ul>${children}</ul>`;
      case 'hbar':
        return `<p><hr/>${children}</p>`;
      case 'code-block':
        return this.highlightCodeBlock(node);

      case 'link':
        return `<a href="${escapeHtml(node.url)}">${children}</a>`;

      default:
        return children;
    }
  }
}

const codeBlockHtml = (children: string) =>
  `<div><pre className='relative pt-30'><code data-language='python' data-theme='default' spellCheck='false' translate='no'>${children}</code></pre></div>`;

export default SlateCompiler;
