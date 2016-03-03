import { createAction } from 'reflux';
import { postMap2Pdf } from '../api';

export const share = createAction();
export const restoreShare = createAction();
export const feedback = createAction();
export const pdf = createAction();

pdf.listen( (body) => {
  postMap2Pdf({content: body}).then(file => {
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.style = 'display: none';
    const url = window.URL.createObjectURL(file);
    a.href = url;
    a.download = 'dashboard.pdf';
    a.click();
    window.URL.revokeObjectURL(url);
  });
});
