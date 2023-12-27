export default function SlateLeaf({
  attributes,
  children,
  leaf,
}: {
  attributes: React.HTMLAttributes<HTMLElement>;
  children: React.ReactNode;
  leaf: any;
}) {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }
  if (leaf.strikethrough) {
    children = <del>{children}</del>;
  }

  return <span {...attributes}>{children}</span>;
}
