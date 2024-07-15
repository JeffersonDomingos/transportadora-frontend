const regioesNordeste: string[] = [
  'Alagoas',
  'Bahia',
  'Ceará',
  'Maranhão',
  'Paraíba',
  'Pernambuco',
  'Piauí',
  'Rio Grande do Norte',
  'Sergipe'
];

const isDestinationInNordeste = (destination: string): boolean => {
  return regioesNordeste.some(regiao => destination.includes(regiao));
};

export default isDestinationInNordeste;
