import BackDrop from '@/components/modal/backdrop';
import ModalView from '@/components/modal/modalView';
import { cls } from '@/utils/cls';
import SlateCompiler from '@/lib/client/write/slateCompiler';
import { Descendant } from 'slate';

export default function Preview({
  title,
  editorValue,
  closePreview,
  ...props
}: { title?: string; editorValue: Descendant[]; closePreview: () => void } & React.HTMLAttributes<HTMLDivElement>) {
  const slateCompiler = new SlateCompiler();
  const html = slateCompiler.toHtml(editorValue);
  console.log(title);

  return (
    <BackDrop onBackdropClick={closePreview}>
      <ModalView {...props}>
        <h1 className={!title?.length ? 'text-page1' : ''}>{title?.length ? title : '제목을 입력하세요'}</h1>
        <div dangerouslySetInnerHTML={{ __html: html }}></div>
      </ModalView>
    </BackDrop>
  );
}
