export default function Wave({ mode = '' }) {
  return <div className={`wave ${mode}`} aria-hidden="true">{Array.from({ length: 28 }, (_, i) => <s key={i} style={{ '--i': i }} />)}</div>;
}
