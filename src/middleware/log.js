export default function log({ next, to }) {
  // eslint-disable-next-line no-console
  console.log(to.name);

  return next();
}
