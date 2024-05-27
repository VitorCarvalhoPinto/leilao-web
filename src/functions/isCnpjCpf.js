export function isCNPJ() {
    const cpfCnpj = sessionStorage.getItem('cpfcnpj');
  
    if (!cpfCnpj) {
      throw new Error("O valor de 'cpfcnpj' não está definido no sessionStorage.");
    }
  
    if (cpfCnpj.length === 18) {
      return true;
    } else if (cpfCnpj.length === 14) {
      return false; 
    } else {
      throw new Error("O valor de 'cpfcnpj' não é válido.");
    }
  }