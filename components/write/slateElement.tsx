import CodeBlock from './codeBlock';
import ImageBlock from './imageBlock';

type TSlateElement = {
  attributes: React.HTMLAttributes<HTMLElement>;
  children: React.ReactNode;
  element: any;
};

export default function SlateElement({ attributes, children, element }: TSlateElement) {
  const style = { textAlign: element.align };
  switch (element.type) {
    case 'bulleted-list':
      return (
        <ul style={style} {...attributes}>
          {children}
        </ul>
      );
    case 'heading-one':
      return (
        <h1 style={style} {...attributes}>
          {children}
        </h1>
      );
    case 'heading-two':
      return (
        <h2 style={style} {...attributes}>
          {children}
        </h2>
      );
    case 'heading-three':
      return (
        <h3 style={style} {...attributes}>
          {children}
        </h3>
      );
    case 'list-item':
      return (
        <li style={style} {...attributes}>
          {children}
        </li>
      );
    case 'numbered-list':
      return (
        <ol style={style} {...attributes}>
          {children}
        </ol>
      );
    case 'code-block':
      return (
        <CodeBlock element={element} textAlign={style.textAlign} {...attributes}>
          {children}
        </CodeBlock>
      );
    case 'block-quote':
      return (
        <blockquote style={style} {...attributes}>
          {children}
        </blockquote>
      );
    case 'hbar':
      return (
        <p>
          <hr style={style} {...attributes} />
          {children}
        </p>
      );
    case 'image':
      return (
        <ImageBlock element={element} textAlign={style.textAlign} {...attributes}>
          {children}
        </ImageBlock>
      );
    default:
      return (
        <p style={style} {...attributes}>
          {children}
        </p>
      );
  }
}
