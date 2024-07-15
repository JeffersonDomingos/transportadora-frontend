export const calculateFinalValue = (value: number, destination: string): number => {
    let finalValue = value;
    if (/bahia|alagoas|sergipe|pernambuco|paraíba|rio grande do norte|ceará|piauí|maranhão/i.test(destination)) {
      finalValue += value * 0.2; 
    } else if (/argentina/i.test(destination)) {
      finalValue += value * 0.4;
    } else if (/amazônia/i.test(destination)) {
      finalValue += value * 0.3; 
    }
    return finalValue;
  };
  