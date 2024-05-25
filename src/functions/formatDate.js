export default function formatDate(dateString) {
  // Cria um novo objeto Date a partir da string da data usando UTC
  const date = new Date(Date.parse(dateString));

  // Extrai o dia, mês e ano
  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // getUTCMonth() retorna 0-11
  const year = date.getUTCFullYear();

  // Retorna a data formatada como dd/mm/yyyy
  return `${day}/${month}/${year}`;
}