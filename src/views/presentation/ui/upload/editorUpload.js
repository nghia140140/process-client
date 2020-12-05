import { checkFileSize, checkDefaultImageType } from './checkUploadFile';
import { API_UPLOAD_URL, IMAGE_URL } from '~/configs';
import { getCookie } from '~/state/utils/session';

function saveToServer(file, editor) {
  const fd = new FormData();
  fd.append('file', file);

  const xhr = new XMLHttpRequest();
  xhr.open('POST', API_UPLOAD_URL, true);
  xhr.setRequestHeader('Authorization', getCookie('jwt'))
  xhr.onload = () => {
    if (xhr.status === 200) {
      const url = JSON.parse(xhr.responseText).data.file.origin;
      insertToEditor(url, editor);
    }
  };
  xhr.send(fd);
}

function insertToEditor(url, editor) {
  const range = editor.getSelection();
  editor.insertEmbed(range.index, 'image', `${IMAGE_URL}/${url}`);
}

function selectLocalImage(editor) {
  const input = document.createElement('input');
  input.setAttribute('type', 'file');
  input.click();

  input.onchange = () => {
    const file = input.files[0];

    if(checkFileSize(file) && checkDefaultImageType(file)){
      saveToServer(file, editor)
    }
    
  };
}
export default selectLocalImage