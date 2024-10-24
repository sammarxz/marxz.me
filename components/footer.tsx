export function Footer() {
  return (
    <footer className="space-y-12">
      <div className="space-y-8">
        <div className="inline-flex flex-wrap gap-2 items-baseline">
          <h2 className="font-semibold text-lg text-neutral-200">
            Entre em contato
          </h2>
        </div>
        <p>
          Uau, você chegou até aqui. Isso é ótimo. De verdade. Tenho grande
          apreço por conhecer pessoas e suas histórias, seja para projetos
          profissionais, trocas de ideias ou simplesmente para bater um papo.
        </p>
      </div>
      <div className="divide-y divide-neutral-800 border-t border-neutral-800">
        <div className="py-4 flex justify-between items-center flex-wrap">
          <h3 className="text-neutral-200">Disponibilidade</h3>
          <p className="flex gap-2 items-center">
            <span className="block w-2 h-2 rounded-full bg-green-400" />{" "}
            Disponível para projetos
          </p>
        </div>
        <div className="py-4 flex justify-between items-center flex-wrap">
          <h3 className="text-neutral-200">Currículo</h3>
          <a href="#" className="underline link">
            Download
          </a>
        </div>
        <div className="py-4 flex justify-between items-center flex-wrap">
          <h3 className="text-neutral-200">Email</h3>
          <a href="#" className="link">
            sam@marxz.me
          </a>
        </div>
      </div>
    </footer>
  );
}
