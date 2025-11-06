import CaddieSelector from '../CaddieSelector';

export default function CaddieSelectorExample() {
  return (
    <div className="p-6 max-w-4xl">
      <CaddieSelector onSelectCaddie={(id) => console.log('Caddie selected:', id)} />
    </div>
  );
}
