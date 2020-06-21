export default function actionTypeConstructor(namespace) {
  return action => `${namespace}/${action}`;
}
