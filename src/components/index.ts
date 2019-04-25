import Alert from './alert.vue';
import ConfirmationModal from './confirmation-modal.vue';
import AsyncBtn from './async-btn.vue';

const components = {
  Alert,
  ConfirmationModal,
  AsyncBtn
};

export default (vue) => {
  const prefix = 'X';
  Object.keys(components).forEach((key) => {
    vue.component(`${prefix}${key}`, components[key]);
  });
};