import { useNavigate } from 'react-router';

const PokemonCard = ({ data }) => {
  const redirectTo = useNavigate();

  const getStat = (statName) =>
    data?.stats?.find((item) => item?.stat?.name === statName)?.base_stat ?? '-';

  const hp = getStat('hp');
  const atk = getStat('attack');
  const def = getStat('defense');

  const types = data?.types?.map((item) => item?.type?.name).filter(Boolean) ?? [];
  const primaryType = data?.types?.find((item) => item?.slot === 1)?.type?.name ?? types[0];

  const typeColor = {
    normal: 'bg-stone-500',
    fire: 'bg-orange-500',
    water: 'bg-blue-500',
    electric: 'bg-yellow-500',
    grass: 'bg-green-600',
    ice: 'bg-cyan-400',
    fighting: 'bg-red-700',
    poison: 'bg-violet-600',
    ground: 'bg-amber-600',
    flying: 'bg-sky-500',
    psychic: 'bg-pink-500',
    bug: 'bg-lime-600',
    rock: 'bg-yellow-700',
    ghost: 'bg-indigo-700',
    dragon: 'bg-indigo-500',
    dark: 'bg-neutral-800',
    steel: 'bg-slate-500',
    fairy: 'bg-rose-400',
  };

  const headerBgClass = typeColor[primaryType] ?? 'bg-green-600';

  const formatText = (value) =>
    value
      ?.split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

  const imageUrl =
    data?.sprites?.other?.['official-artwork']?.front_default ||
    data?.sprites?.front_default ||
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data?.id}.png`;

  return (
    <div
      className="flex items-center w-full max-w-2xl bg-white rounded-xl shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => redirectTo(`/pokemon/${data?.id}`)}
    >
      <div className={`${headerBgClass} flex items-center justify-center w-20 h-20 shrink-0`}>
        <img
          className="w-16 h-16 object-contain"
          src={imageUrl}
          alt={data?.name || 'pokemon'}
        />
      </div>

      <div className="flex flex-col gap-1 flex-1 min-w-0 px-3">
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400 font-semibold">{`#${data?.id ?? '-'}`}</span>
          <h2 className="text-base font-bold text-gray-800 truncate">{formatText(data?.name) || '-'}</h2>
        </div>
        <div className="flex gap-1 flex-wrap">
          {types.map((typeName) => (
            <span
              key={typeName}
              className={`text-xs px-2 py-0.5 ${typeColor[typeName] ?? 'bg-green-600'} text-white rounded-full`}
            >
              {formatText(typeName)}
            </span>
          ))}
        </div>
      </div>

      <div className="flex gap-4 pr-4 shrink-0 text-center">
        <div className="flex flex-col">
          <span className="text-xs font-bold text-red-700">HP</span>
          <span className="text-sm text-gray-700">{hp}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-bold text-red-700">ATK</span>
          <span className="text-sm text-gray-700">{atk}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-bold text-blue-600">DEF</span>
          <span className="text-sm text-gray-700">{def}</span>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
