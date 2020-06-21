export default function baseSelect(name) {
  return prop => state => state[name][prop];
}
